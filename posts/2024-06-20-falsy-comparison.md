---
date: 2024-06-20
title: PHP if condition and "falsy" values
emphasis: Help static analysis tool with better comparisons!
icon: video
image: /images/falsy-comparison.png
lang: en
---

In PHP, you can test empty array, empty string or `0` directly in a `if` statement:

```php
$array = [];

if (!$array) {
    // this will  be executed as $array is empty
}
```

It's quite useful in general, but it may be harder for static analysis to perform efficient work if you work with a union type with null.

Imagine the following code:

```php
/** @return null|array<string, mixed> */
function getCustomer(string $id): null|array
{
	return random_int(1,2) === 1 ? ['id' => $id] : null;
}

function main(string $id): void {
	$customer = getCustomer($id);

	if ($id) {
		if (null === $customer) {
			throw new \RuntimeException('customer should not be null !');
		}
	} else {
		$customer = ['id' => 'new customer'];
	}

	if (!$customer) {
		// do log something because customer does not exist
	}
}
```

Static analysis tools, like PHPStan, won't be able to detect that the all `if (!$customer)` is useless here !

Why ? Because the only case where it will be executed, is when `getCustomer` returns an empty array, which is never the case.

Try it live: https://phpstan.org/r/adeb5299-2819-4453-9530-0c628d5179be

You have two solutions here to help static analysis:

### Declare a better return type for `getCustomer`

With PHPStan, you can declare [array "shapes"](https://phpstan.org/writing-php-code/phpdoc-types#array-shapes) like this:

```diff
- /** @return null|array<string, mixed> */
+ /** @return null|array{"id": string} */
  function getCustomer(string $id): null|array
```

This way, PHPStan will know that line 42, `$customer` will be either `null`, or a non-empty array, and trigger an error

Try it live: https://phpstan.org/r/579be31c-3e57-47fb-8efb-8fd476eb6160

### Compare to `null`

A probable better solution here would be to compare directly to `null` on line 20:

```diff
- if (!$customer) {
+ if (null === $customer) {
```

This way, you avoid the "falsy" comparison, as it's the right comparision to do here.

### Do not use array for object

This is out of scope, and kind of a troll, but you may want to consider using a proper object instead of an array instead of array shapes 😉.
