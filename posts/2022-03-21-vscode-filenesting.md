---
date: 2022-03-21
title: VSCode file nesting
emphasis: For users who want to keep their file tree clean.
icon: gear
image: /images/file-nesting/file-nesting.png
lang: en
---

## Too much configuration files!

One of the things I do not like in current project workflow is the number of files that pollutes the root directory of a project.

![file-nesting-before](/images/file-nesting/file-nesting-before.png)

What I would like to have is a `.config` folder or something like that to keep every tool configuration "hidden".

https://twitter.com/iansu/status/1500318980845686787

Unfortunately, [the discussion has been closed](https://github.com/nodejs/tooling/issues/79#issuecomment-708599043) by the NodeJS tooling community since no consensus could be found.

So the only solution seems to make PR on every project to handle a `.config` folder. And every project can reject a PR because X, Y or Z.

Moreover there are some important drawbacks to this approach:

- Do `package.json` should be in the `.config` folder?
- Same question for `.gitignore`?

Event Kent C. Dodds [changes his mind about that](https://twitter.com/kentcdodds/status/1500690674106068996).

[bref.](https://www.youtube.com/watch?v=JmghDKkeiik), things are not going to advance here.

## IDE to the rescue 🦸

VSCode did enable the "fileNesting" experimental feature. It allows VSCode to display a file as a directory, and to "nest" list of related files behind it.

To do that you need to activate the following settings : `explorer.experimental.fileNesting.enabled`

Automatically, on a JavaScript project, files like `.npmrc` and `yarn.lock` or `package-lock.json` will be hidden behind the `package.json` file:

![file-nesting-before](/images/file-nesting/file-nesting-after.png)

For my case, I configured it like this:

`package.json`: `package-lock.json, .npmrc, yarn.lock, .yarnrc, pnpm-lock.yaml,.eslint*,.prettier*,.babel*,rollup.config.*,tsconfig.json,Jenkinsfile`

And the output is the following:

![file-nesting-before](/images/file-nesting/file-nesting-optimized.png)

The package.json does "hide" all the configuration files I want behind `package.json`:

![file-nesting-before](/images/file-nesting/file-nesting-optimized-expanded.png)
