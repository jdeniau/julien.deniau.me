---
date: 2024-09-23
title: Know the latest branches I did work on git
emphasis: Go back to a recent git branch
icon: code
lang: en
---

If you want to know the latest branches that you did workon in git, you can use this simple command

```sh
git reflog | grep 'checkout: moving' | awk -F ' to ' '{print $2}' | head -n 10
```
