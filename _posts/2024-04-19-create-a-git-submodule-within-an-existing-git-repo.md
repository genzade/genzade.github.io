---
layout: post
title: create a git submodule within an existing git repo
date: 2024-04-18 19:27 +0200
toc: true
tags: git misc
---

This guide will breakdown the steps needed when working with git repositories and
git submodules.

# Introduction

The scenario here is the following:

You have a project with multiple repositories within it. When you began this project,
it was small and manageable. You check it in to [version control](https://en.wikipedia.org/wiki/Version_control){:target="\_blank"}
as you continue to work on it. Over time, you will find that the project is growing
in size and scope. If you are at this stage and think it would be a good idea to
separate out the subdirectories in your project into their own sub-projects, that
is, check them in to version control and develop them independently, then this is
the guide for you.

## Prerequisites

This article assumes you have the following prerequisites:

1. Have [`git`](https://git-scm.com/){:target="\_blank"} installed on your machine.
1. Have a Github account, follow [this guide](https://docs.github.com/en/get-started/start-your-journey/creating-an-account-on-github){:target="\_blank"} if you do not have one already. (note I am only using Github as it is my preferred choice, you can substitute is for your own Git hosting platform of choice)

# TL;DR

Assuming you have a repo in your home directory called `~/parent_repo`, within
which you have another repository called `child`, and the tree looks something
like this:

```bash
$ tree ~/parent_repo
parent_repo
├── child                       # this will become a submodule
│   └── something
│       ├── something-else.file
│       └── foo
│           ├── bar.file
│           └── baz.file
├── ipsum.html
├── lorem.xml
├── package.json
└── another-child
    ├── docker.html
    ├── misc.html
    └── raspberrypi.html
```

Copy the repo you want to submodulise (not sure if that is a word but you know what
I mean. I hope)

```bash
$ cp -R ~/parent_repo/child  # done in `home`, you can choose anywhere you want to store it
```

```bash
$ cd ~/child
$ ~/child
$ git init
$ git add .
$ git commit -m 'initial commit'
```

Go to GitHub and create a repository, and call it whatever you want. I would call
it `child` since the local repo is also called that, and consistency is a good thing.
Once you have done this, run the following from within the `~/child` repo:

```bash
git remote add origin git@github.com:<USERNAME>/child.git
git branch -M main
git push -u origin main
```

If all is done correctly, you should have a remote repo called 'child' at `https://github.com/<USERNAME>/child`.

Now back to the terminal.

```bash
$ cd ~/parent_repo
$ git rm -r --cached child
$ rm -rf child
$ git submodule add git@github.com:<USERNAME>/child.git child
$ git commit -m 'added submodule'
$ git push origin main
```

# A few things to note with this approach

## When cloning a repo with git submodules

When cloning a repo with git submodules, you will find that it is not enough just
to clone the repo (`$ git clone <URL>`) as the submodule repo's will just be empty
and you have to update the submodules first in order to get the latest versions
of them.

This is should be done with the following command:

```bash
$ git clone <URL_of_project_with_submodule>
$ cd to/path/of/project/with/submodule
$ git submodule update --init --recursive
```

This could also be achieved with one line as well:

```bash
$ git clone --recursive-submodules <URL_of_project_with_submodule>
```

## When pulling in latest changes from submodule remote

Changes have been made in the submodule project, committed, and pushed to Github.
You wish to pull in those changes to your parent repo. This can be done with the
following command:

```bash
$ git submodule update --recursive --remote
```

Note that the above command will pull in the latest changes from all git submodules
that exist in your project.

Now you can check the [git diff](https://git-scm.com/docs/git-diff){:target="\_blank"} with the
`--submodule` flag in your project and you will see that the submodule `HEAD`
commit has changed and points to the latests commit of that submodule.

Side note: you can set this to be the default behaviour in your git config with
the following command;

```bash
$ git config --global diff.submodule log
```

Similarly, you can set `$ git config status.submodulesummary 1` so that running
`$ git status` will show you a summary of the git status of your submodules.

## When working on the submodule

It is important to make sure all submodule changes have been pushed properly and
luckily check this with `$ git push --recurse-submodules=check` and this behaviour
can be made the default with;

```bash
$ git config push.recurseSubmodules check
```

# Wrapping up

This was a good approach for me personally as I implemented this directly into my
[dotfiles repo](https://github.com/genzade/dotfiles){:target="\_blank"} where I wanted to work on some
of those configurations separately from the main folder and check them into version
control. Have a look at my [dotfiles repo](https://github.com/genzade/dotfiles){:target="\_blank"} (parent)
and my [nvim config](https://github.com/genzade/nvim){:target="\_blank"} (child) setup.

### sources

_[submodule docs](https://git-scm.com/search/results?search=submodule){:target="\_blank"}_

_[stack overflow post](https://stackoverflow.com/questions/28306781/how-to-convert-a-git-repo-to-a-submodule-which-is-nested-in-another-parent-gi){:target="\_blank"}_

_[a very nicely done youtube video](https://www.youtube.com/watch?v=wTGIDDg0tK8){:target="\_blank"}_

_[a very nicely written article](https://phoenixnap.com/kb/git-pull-submodule){:target="\_blank"}_
