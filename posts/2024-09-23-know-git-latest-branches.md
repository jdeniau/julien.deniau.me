---
date: 2024-09-23
title: Know the latest branches I did work on git
emphasis: Go back to a recent git branch
icon: code
lang: en
---

If you want to know the latest branches that you did workon in git, you can use this command

```sh
git reflog | grep 'checkout: moving' | awk -F ' to ' '{print $2}' | awk 'seen[0]++' | head -n 20
```

In detail:

- `git reflog` gives you your git history
- `grep 'checkout: moving'` to filter only on latest "moving" operations. Will give you something like `6f6071873 HEAD@{1}: checkout: moving from branchname-a to branchname-b`
- `awk -F ' to ' '{print $2}'` keeps only the branchname of the line (`branchname-b`)
- `awk 'seen[0]++'` to remove duplicates
- `head -n 20` to keep only 20 latest lines

You can make it a git alias in your gitconfig file (watch out for the backslashes):

```
[alias]
    latest-branches = "!bash -c \"git reflog | grep 'checkout: moving' | awk -F ' to ' '{print \\$2}' | awk '!seen[\\$0]++' | head -n 20\""
```
