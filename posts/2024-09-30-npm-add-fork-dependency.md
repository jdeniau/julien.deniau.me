---
date: 2024-09-30
title: Add a forked dependency into a project
emphasis: And do include builded files
icon: code
lang: en
---

If you work on a Javascript environment, you might have ran into the issue where you do open a PR on a package, but want to use your fork while the PR is being merged.

with `npm` or `yarn`, you can add a "github" version doing that:

```sh
yarn add lodash@github:lodash/lodash
```

_See [yarn documentation of yarn add](https://yarnpkg.com/cli/add)_

But if you do that, you will likely have this in your `node_modules` folder:

```
node_modules/
  some-package/
    package.json
    README.md
```

You can see that there is no JS files here !

Why ? Because a lot of javascript package rely on a "build" step before publishing to npmjs.org.

I though that the only way to solve this would be to "namespace" the package under `"@jdeniau/some-package"` by modifying the `package.json` name key, 
but I found [this stackoverflow answer](https://stackoverflow.com/a/57829251/2111353) explaining how "npm prepare" works and that's exacly what I want to do in that case.

I just have to add a prepare script in the `package.json` file, and it will work perfecly fine:

```diff
    "scripts": {
+     "prepare": "npm run build"
    }
```

This way I can add the package doing `yarn add some-package@jdeniau/some-package` and the `dist` folder will be included in the `node_modules`.

⚠️ Be careful not including that in your PR though, as it should be only a temporary solution until the PR is merged. If it is not, due to inactivity, you might want to use the namespace alternative.
