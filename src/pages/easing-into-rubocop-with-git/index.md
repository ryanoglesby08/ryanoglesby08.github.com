---
title: Easing into Rubocop with git
date: "2015-02-25T20:08:31.000Z"
layout: post
---

## Dropping Rubocop into an existing codebase

We (my team) recently introduced [rubocop](https://github.com/bbatsov/rubocop) to a Rails app and a
Sinatra app to encourage (aka enforce) us to follow established Ruby style and semantics. This was
my first experience with dropping a static code analyzer into an established codebase. Just for
reference, our Rails app is not huge - 16 controllers, 25 models, 10 services, and a smattering of
other files.

Even so, the first run of `bundle exec rubocop` on the entire application revealed about 2,500
warnings. Whomp whomp. Thankfully, Rubocop comes with a handy-dandy autocorrect feature. A quick
`bundle exec rubocop --auto-correct` fixed almost half of them. Good, but not quite there yet.

<!-- more -->

## Incremental Rubocoping

We wanted to Rubocop to execute as part of our pre-commit task, and we wanted it to fail the task if
it produced warnings or errors. So, our options were:

1. Have someone sit down with a case or two of Red Bull and don't stop until everything is fixed.
2. Use the "Automatically Generated Configuration" from Rubocop, which generates a config file for
   you from all the warnings with all those cops turned off, letting you choose when to enable them.
3. Configure Rubocop to only run on a subset of files or directories. Fix all those warnings before
   adding more files, rinse and repeat until the entire app is added.

We went with...... kind of 3. We liked the idea of incrementally rubocop-ing our app as we worked on
it. So our solution is based on the
[Boy Scout Rule](http://programmer.97things.oreilly.com/wiki/index.php/The_Boy_Scout_Rule) - strive
to always leave any code you touch in a better state than when you found it. Applying that to
Rubocop means every time you commit, Rubocop gets run ONLY on the files you have touched in that
commit. Over time, we should cover more and more of the app until eventually we can run Rubocop on
the entire app with every commit! Boom!

The one caveat is that you must remember to run the task BEFORE you do `git commit` in order for the
task to pick up your changed files. I'm sure we could put in some more effort to account for that,
but haven't done so yet.

## The Gist of it

`embed:easing-into-rubocop-with-git/git_rubocop.ruby`
