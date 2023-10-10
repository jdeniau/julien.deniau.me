---
date: 2023-10-10
title: Oh wait ! I just develop another fetch mocking library !
emphasis: A simple fetch mocking library that loves native `fetch` method
icon: code
lang: en
---

### TLDR;

I created a fetch mocking library named [`metch-fock`](https://github.com/mapado/metch-fock) that does work great with native `fetch` call on NodeJS 18+.


## What happened yesterday ?

I did migrate some code from one internal package to another, but I struggled with [Jest](https://jestjs.io/), our testing framework.

After spending half the day being unable to migrate those test, despite the fact that we have jest in both packages, and nearly the same configuration, I decided to test [Vitest](https://vitest.dev/), another testing framework that is compatible with Jest, but with native TypeScript support.

### Migrating to Vitest

For nearly all the tests, it just did work by just importing tests helpers (`define`, `test`, `expect`, `afterEach` and `beforeEach` from `vitest`).

The only tests that still failed were those with `fetch` calls.

### nock did not work

To mock `fetch`, we previously used [nock](https://github.com/nock/nock), with did serve us well for the last years.

nock was designed some years ago, when fetch was not supported in NodeJS (it was introduced in [v17.5.0](https://nodejs.org/en/blog/release/v17.5.0#add-fetch-api), behind an experimental flag, and release for all in [v18.0.0](https://nodejs.org/en/blog/announcements/v18-release-announce#fetch-experimental)).

As our packages came from older version of node, we previously did inject this code in our tests:

```ts
require('isomorphic-fetch');
```

It does allow fetch in NodeJS before version 18.

But this does not work in our new test under vitest. As a matter of fact, there is an issue and a warning on `nock` homepage telling that:

> [nock is currently not compatible with Node's experimental native fetch implementation.](https://github.com/nock/nock/issues/2397)

## Just fix the tests

I spent some time, but did not manage to make it work. In order to make my migration work, I decided to make a simple thing: 

> fetch is just a function of `globalThis` (aka. `window` or `global`). 
> JS is flexible, let's override this function to [make it work](https://dev.to/weeklydevtips/make-it-work-make-it-right-make-it-fast).

### The quick fix

First replace nock `disableNetConnect` by "something" that will forbid all call to any resource.
```diff
  beforeEach(() => {
-   nock.disableNetConnect();
+   window.fetch = async () => {
+     throw new Error('all fetch should be mocked');
+   };
  });
```

Then in all tests, replace all nock mocks

```diff
- nock('https://preprod.domain.net/v1')
-   .put('/carts/1', () => true)
-   .query(true)
-   .reply(200, { foo: 'bar' });

+  window.fetch = async (
+      input: RequestInfo | URL,
+      options: RequestInit | undefined
+    ) => {
+        return new Response(
+          JSON.stringify({ foo: 'bar' })),
+          { status: 200, statusText: 'OK' }
+        );
+    };
```

And it simply works ! 🎉

### Making things robust again

What I did next is making things a little more robust by matching only wanted requests:

```diff
  window.fetch = async (
    input: RequestInfo | URL,
    options: RequestInit | undefined
  ) => {
+   if (
+     typeof input !== 'string' ||
+     !input.startsWith('https://preprod.domain.net/v1/carts/1?')
+   ) {
+     throw new Error('fetch should be called with the proper url');
+   }  
+   if (options?.method !== 'PUT') {
+     throw new Error('fetch should be called with the proper method');
+   }
    
    return new Response(
      JSON.stringify({ foo: 'bar' }),
      { status: 200, statusText: 'OK' }
    );
  }
```

## Another fetch mocking library

Oh wait ! I just develop a new fetch mocking library that does work fine with native `fetch` ! 🤯

After making things work, I was just a little line of code to making things right : the API was not easy to write. I only got two tests, migrating hundreds of test would be far more hard.

The things I did next is exporting a function to override simply `globalThis.fetch` (if you do not know `globalThis`, [it it a replacement of `window` in the browser or `global` in node](https://blog.logrocket.com/what-is-globalthis-why-use-it/)).

```ts
export function fetchMock(matcher: MatcherFunction, response: Response): void;
```

```ts
fetchMock(
  (input: RequestInfo | URL, options: RequestInit | undefined) => {
    if (
      typeof input !== "string" ||
      !input.startsWith("https://preprod.domain.net/v1/carts/1?")
    ) {
      return false;
    }
    if (options?.method !== "PUT") {
      return false;
    }

    return true;
  },
  new Response(JSON.stringify({ foo: "bar" }), {
    status: 200,
    statusText: "OK",
  })
);
```

This did work fine, but it is a little verbose, mainly because input may be anything other than a string, and options might be undefined, so I make two helper functions:

```ts
fetchMock(
  (input: RequestInfo | URL, options: RequestInit | undefined) => {
    return (
      getInputUrl(input).startsWith("https://preprod.domain.net/v1/carts/1?") &&
      getOptionMethod(options) === "PUT"
    );
  },
  new Response(JSON.stringify({ foo: "bar" }), {
    status: 200,
    statusText: "OK",
  })
);
```

I also like the nock syntactic sugar, so I integrated similar functions:

```ts
fetchMock.put.startsWith(
  "https://preprod.domain.net/v1/carts/1?",
  new Response(JSON.stringify({ foo: "bar" }), {
    status: 200,
    statusText: "OK",
  })
);
```

This library is named `metch-fock` and is [available on npmjs](https://www.npmjs.com/package/metch-fock). You can see the code on github: [github.com/mapado/metch-fock](https://github.com/mapado/metch-fock).
