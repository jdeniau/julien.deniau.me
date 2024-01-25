---
date: 2024-01-26
title: Writing a custom Behat formatter
emphasis: How to write a custom formatter in Behat PHP testing library
icon: code
lang: en
---

## Introdution

### What is behat ?

According to [Behat official documentation](https://behat.org), it is "A **php** framework for autotesting your **business** expectations."

Another way of explaining: it's a PHP testing framework, but the way you write tests do change in comparaison with package like PHPUnit or other more "unit-testing" frameworks.

It does use the [gherkin syntax](https://cucumber.io/docs/gherkin/reference/) that does looks like that: 

```gherkin
Feature: Guess the word

  # The first example has two steps
  Scenario: Maker starts a game
    When the Maker starts a game
    Then the Maker waits for a Breaker to join

  # The second example has three steps
  Scenario: Breaker joins a game
    Given the Maker has started a game with the word "silky"
    When the Breaker joins the Maker's game
    Then the Breaker must guess a word with 5 characters
```

### Why a custom formatter ?

Behat has three native formatters:

- **pretty**: the default formatter, that does print every line in green (in case of a successful test) or red (if it does fail), 
- **progress**: print a "dot" for each test, and a recap of all failing tests at the end,
- **junit**: outputs a [junit](https://junit.org/) compatible XML file.

Those are nice, and worked for me for the last 10 years. Generally I use the "progress" one for the CI, and the "pretty" for development.

But recently, I discovered [reviewdog](https://github.com/reviewdog/reviewdog), a global review tool that takes input of linters or testers, and that can send "checks" on github, bitbucket or gitlab PR.

Reviewdog can handle [two types of input](https://github.com/reviewdog/reviewdog#input-format):

- any stdin, coupled with an "errorformat" (a Vim inspired format that can convert text string to machine-readable errors),
- a ["Reviewdog Diagnostic Format"](https://github.com/reviewdog/reviewdog/tree/48b25a0aafb8494e751387e16f729faee9522c46/proto/rdf): a JSON with error data that reviewdog can parse.

In my case, I tried parsing behat's output with errorformat, but I do not know this language, and the multi-line behat output with "dots" didn't make it simple. So I decided to create a custom formatter for Behat.

This way, I will still have behat's human-readable stdout, and a JSON file written that reviewdog can understand.

## Let's dive

Behat allows us to load "extensions", that can add features to the language. In fact, it is a core functionnality to implement PHP functions behind gherkin texts. Those extensions are simple classes, that are loaded in Behat. 

Behat is powered by Symfony: if you know it, you will already know the concepts under the hood, if you don't, that's not a problem and not required to create your extension.

### Anatomy of a formatter extension

A formatter extension requires three things to work:

- a class that "defines" the extension, to make you extension work with behat,
- a "formatter", that can listen to behat events, and converts behat's tests result to anything you want,
- an "output printer", that does write the converted data anywhere you want (mainly the stdout, a file or a directory).

### Create the extension

Any behat extensions must implements `Behat\Testwork\ServiceContainer\Extension`. Under the hood, it does implements Symfony `CompilerPass`. It is a way to inject anything you want into Behat's kernel.

It our case, we need to load the "formatter" in behat's kernel, and tagged it as an output formatter. This way behat will allows our extension to be configured as a formatter. You can register multiple formatters with the same extension if you like.

```php
<?php

declare(strict_types=1);

namespace JDeniau\BehatReviewdogFormatter;

use Behat\Testwork\Output\ServiceContainer\OutputExtension;
use Behat\Testwork\ServiceContainer\Extension;
use Behat\Testwork\ServiceContainer\ExtensionManager;
use Symfony\Component\Config\Definition\Builder\ArrayNodeDefinition;
use Symfony\Component\DependencyInjection\ContainerBuilder;

class ReviewdogFormatterExtension implements Extension
{
    public function getConfigKey()
    {
        return 'reviewdog_formatter';
    }

    /**
     * This is the only method that we will configure to inject our formatter
     */
    public function load(ContainerBuilder $container, array $config): void
    {
        // register the "ReviewdogFormatter" class in behat's kernel
        $definition = $container->register(ReviewdogFormatter::class);
        
        // add some arguments that will be called in the constructor. 
        // That's not required but in my cas I inject behats base path, to remove it from the absolute file path later.
        $definition->addArgument('%paths.base%');

        // tag the formatter as an "output.formatter", this way behat will add it to it's formatter list.
        $definition->addTag(OutputExtension::FORMATTER_TAG, ['priority' => 100]);
    }

    public function configure(ArrayNodeDefinition $builder): void { }

    public function initialize(ExtensionManager $extensionManager): void { }

    public function process(ContainerBuilder $container): void { }
}
```

### Create the formatter

The formatter will listen to behat's events, and create output data depending on the type of event, the current state, etc.

```php
<?php

namespace JDeniau\BehatReviewdogFormatter;

use Behat\Behat\EventDispatcher\Event\AfterStepTested;
use Behat\Behat\EventDispatcher\Event\StepTested;
use Behat\Behat\Tester\Result\ExecutedStepResult;
use Behat\Testwork\EventDispatcher\Event\BeforeExerciseCompleted;
use Behat\Testwork\Output\Formatter;
use Behat\Testwork\Output\Printer\OutputPrinter;

class ReviewdogFormatter implements Formatter
{
    private readonly ReviewdogOutputPrinter $outputPrinter;

    public function __construct(private readonly string $pathsBase)
    {
        // create the output printer that the formatter will call
        $this->outputPrinter = new ReviewdogOutputPrinter();
    }

    /**
     * setParameter will be called for each key given to the formatter in your behat.yml file. 
     * We will see that later in the "integration".
     * In our case, the only allowed parameter is a "file_name" that must be a string : the JSON file that we will write.
     */
    public function setParameter($name, $value): void
    {
        switch ($name) {
            case 'file_name':
                if (!is_string($value)) {
                    throw new \RuntimeException('file_name must be a string');
                }

                $this->outputPrinter->setFileName($value);
                break;
            default:
                throw new \Exception('Unknown parameter ' . $name);
        }
    }

    /**
     * I do not call this, so no need to define an implementation
     */
    public function getParameter($name) { }

    /**
     * Our formatter is a Symfony EventSubscriber. 
     * This method tells behat where we want to "hook" in the process.
     * Here we want to be called:
     *   - at start, when the test is launched with the `BeforeExerciseCompleted::BEFORE` event,
     *   - when a step has ended with the `StepTested::AFTER` event.
     * 
     * There is a lot of other that can be found here: https://github.com/Behat/Behat/tree/2a3832d9cb853a794af3a576f9e524ae460f3340/src/Behat/Testwork/EventDispatcher/Event
     */
    public static function getSubscribedEvents()
    {
        return [
            // call the `onBeforeExercise` method on startup
            BeforeExerciseCompleted::BEFORE => 'onBeforeExercise',
            // cann the `onAfterStepTested` method after each step
            StepTested::AFTER => 'onAfterStepTested',
        ];
    }

    /**
     * This is the name of the formatter, that will be used in the behat.yml file
     */
    public function getName(): string
    {
        return 'reviewdog';
    }

    public function getDescription(): string
    {
        return 'Reviewdog formatter';
    }

    public function getOutputPrinter(): OutputPrinter
    {
        return $this->outputPrinter;
    }

    /**
     * When we launch a test, let's inform the printer that we want a fresh new file
     */
    public function onBeforeExercise(BeforeExerciseCompleted $event):void
    {
        $this->outputPrinter->removeOldFile();
    }

    public function onAfterStepTested(AfterStepTested $event):void
    {
        $testResult = $event->getTestResult();
        $step = $event->getStep();

        // In the reviewdog formatter, we just want to print errors, so ignore all steps that are not a failure executed test
        // but you might want to handle things differently here !
        if ($testResult->isPassed() || !$testResult instanceof ExecutedStepResult) {
            return;
        }

        // get the relative path
        $path = str_replace($this->pathsBase . '/', '', $event->getFeature()->getFile() ?? '');

        // do prepare the data that we will send to the printer…
        $line = [
            'message' => $testResult->getException()?->getMessage() ?? 'Failed step',
            'location' => [
                'path' => $path,
                'range' => [
                    'start' => [
                        'line' => $step->getLine(),
                        'column' => 0,
                    ],
                ],
            ],
            'severity' => 'ERROR',
            'source' => [
                'name' => 'behat',
            ],
        ];

        $json = json_encode($line, \JSON_THROW_ON_ERROR);

        // …and send it
        $this->getOutputPrinter()->writeln($json);
    }

}
```

### Create the output printer

The latest file that we need to implement is the printer. In you case it's a simple class that can write lines to a file.

```php
<?php

namespace JDeniau\BehatReviewdogFormatter;

use Behat\Testwork\Output\Printer\OutputPrinter;

class ReviewdogOutputPrinter implements OutputPrinter
{
    private ?bool $isOutputDecorated;

    /** the outputPath where we will write the output file */
    private ?string $outputPath = null;

    /** The default filename, if none is provided */
    private string $fileName = 'reviewdog-behat.json';

    public function __construct(private readonly string $pathBase) { }

    /**
     * as the formatter can inform us of the filename, we need to store that
     */
    public function setFileName(string $fileName): void
    {
        $this->fileName = $fileName;
    }

    /**
     * outputPath is a special parameter that you can give to behat formatter under th key `output_path`
     */
    public function setOutputPath($path): void
    {
        $this->outputPath = $path;
    }

    /**
     * The output path, defaults to behat's base path
     */
    public function getOutputPath(): string
    {
        return $this->outputPath ?? $this->pathBase;
    }

    /** Sets output styles. */
    public function setOutputStyles(array $styles): void { }

    /** @deprecated */
    public function getOutputStyles()
    {
        return [];
    }

    /** Forces output to be decorated. */
    public function setOutputDecorated($decorated): void
    {
        $this->isOutputDecorated = (bool) $decorated;
    }

    /** @deprecated */
    public function isOutputDecorated()
    {
        return $this->isOutputDecorated;
    }

    /**
     * Behat can have mutliple verbosity level, you may want to handle it to display more informations.
     * For reviewdog, I do not need that.
     */
    public function setOutputVerbosity($level): void { }

    /** @deprecated */
    public function getOutputVerbosity()
    {
        return 0;
    }

    /**
     * Writes message(s) to output stream.
     * 
     * @param string|array<string> $messages
     */
    public function write($messages): void
    {
        if (!is_array($messages)) {
            $messages = [$messages];
        }

        $this->doWrite($messages, false);
    }

    /**
     * Writes newlined message(s) to output stream.
     * 
     * @param string|array<string> $messages
     */
     
    public function writeln($messages = ''): void
    {
        if (!is_array($messages)) {
            $messages = [$messages];
        }

        $this->doWrite($messages, true);
    }

    /**
     * Clear output stream, so on next write formatter will need to init (create) it again.
     * Not needed in my case.
     */
    public function flush(): void
    {
    }

    /**
     * Called by the formatted when test starts
     */
    public function removeOldFile(): void
    {
        $filePath = $this->getFilePath();

        if (file_exists($filePath)) {
            unlink($filePath);
        }
    }

    /**
     * @param array<string> $messages
     */
    private function doWrite(array $messages, bool $append): void
    {
        // create the output path if if does not exists.
        if (!is_dir($this->getOutputPath())) {
            mkdir($this->getOutputPath(), 0777, true);
        }

        // write data to the file
        file_put_contents($this->getFilePath(), implode("\n", $messages) . "\n", $append ? \FILE_APPEND : 0);
    }

    private function getFilePath(): string
    {
        return $this->getOutputPath() . '/' . $this->fileName;
    }
}
```

### Integration in your project

You need to add the extension in you behat configuration file (default is `behat.yml`) and configure it to use the formatter: 

```yaml
default:
  extensions:
    JDeniau\BehatReviewdogFormatter\ReviewdogFormatterExtension: ~
    
  formatters:
    pretty: true
    reviewdog: # "reviewdog" here is the "name" given in our formatter
      # outputh_path is optional and handled directy by behat
      output_path: 'build/logs/behat'
      # file_name is optional and a custom parameter that we inject into the printer
      file_name: 'reviewdog-behat.json'
```

#### Different output per profile

You can active the extension only for a certain profile by specifying a profile in your command (ex: `--profile=ci`)

For example if you want the pretty formatter by default, but both progress and reviewdog on your CI, you can configure it like that:

```yaml
default:
  extensions:
    JDeniau\BehatReviewdogFormatter\ReviewdogFormatterExtension: ~
    
  formatters:
    pretty: true

ci:
  formatters:
    pretty: false
    progress: true
    reviewdog:
      output_path: 'build/logs/behat'
      file_name: 'reviewdog-behat.json'

```


## Enjoy !

That's how you can write a simple custom behat formatter !

If you have much more complex logic, and you need to formatter to be more dynamic, behat do provide a FormatterFactory interface. You can see usage examples directly in [behat's codebase](https://github.com/Behat/Behat/tree/2a3832d9cb853a794af3a576f9e524ae460f3340/src/Behat/Behat/Output/ServiceContainer/Formatter), but in a lot of cases, the simple formatter should work.


## Want to use reviewdog and the custom formatter yourself ?

If you want to use the reviewdog custom formatter, you can find it on github: https://github.com/jdeniau/behat-reviewdog-formatter

There are other behat custom formatters in the wild, especially [BehatHtmlFormatterPlugin](https://github.com/dutchiexl/BehatHtmlFormatterPlugin), that I did not test, but helped me understand how does behat formatter system works, and can output an HTML file that can help you understand why your CI is failing.


## Using prettier ?

Another thing if you are using [prettier](https://prettier.io) (an opinionated code formatter) and behat: I made a prettier plugin that can automatically format your behat/gherkin files : https://github.com/mapado/prettier-plugin-gherkin