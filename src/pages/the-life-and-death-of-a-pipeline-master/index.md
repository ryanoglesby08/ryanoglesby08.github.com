---
title: The Life and Death of a Pipeline Master
date: "2018-11-12T00:17:42.000Z"
---

_Originally posted in late 2015 or early 2016 as an internal blog post. It tells the story of
introducing and later abandoning a strategy for improving build pipeline culture. The setting is a
100+ person program, distributed between India and USA, maybe 10 teams, dozens of services and apps,
doing trunk-based development on a Java monorepo._

## Beginnings

The time was July, 2015. It was a different time then. A wild west of sorts. We had a build
pipeline, but it was horribly untrustworthy. Our user journey tests failed often, both because of
broken functionality and because of our own deficiencies with asynchronous testing. The underlying
infrastructure was extremely unstable. Dropped database connections happened multiple times a day.

These problems contributed to a growing cultural disease of inattention to the information coming
out of our build pipeline. Developers often committed on a red build, whether it was because they
did not trust it, because they felt like they could not fix it anyway, or because they assumed that
someone else must be working on it. Gradually, the team was developing bad habits.

So, we felt that establishing a rotating role would give us more organization and discipline around
our build pipeline hygiene. The role would be the go-to person for build hygiene issues. The
Pipeline Masters were responsible for ensuring that a broken build was fixed in a timely manner,
though they were not necessarily responsible for doing the actual work to fix it. Their core value
was as an organizer, communicator, and enforcer. They would help identify trends of common problems
so that the teams could prioritize the most important. And their power even extended as far as being
able to revert any check ins when they were committed on top of an already red build.

## Deterioration

What started out with good intentions began to devolve within a few rotations. One of the first
things we noticed was inconsistent hand-offs from one Pipeline Master to the next, resulting in a
loss of context and continuity. The tracking of persistent problem areas and common fixes died off
soon.

Instead of a more ideal scenario of shared responsibility for the build pipeline, a culture began to
take shape around reliance on the Pipeline Masters to enforce hygiene. Because the Pipeline Masters
would send out an email titled “Build Broken - Don’t Commit,” we got into the practice of relying on
that to tell us if the build is healthy instead of using radiators or other notification tooling.
Not to mention, that produced a lot of extra noise in our already busy email inboxes!

## All Things Come to an End

Over time, people began to ask why we needed the Pipeline Masters more and more. Shouldn’t proper
build etiquette be a contract shared amongst everyone on the project? Eventually, other duties even
started to creep into the Pipeline Master role. “They are already in charge of the build, so they
can just do this other kind-of-pipeline-related thing too.”

What started as a way to reset build pipeline behavior had reached a point where it was no longer
realizing the advertised benefits, and even becoming detrimental to the account culture. The role
was also being replaced by better alternatives. We turned on build radiators. People started being
more disciplined about using [GoCD](https://www.gocd.org/) comments when the build was broken. The
underlying infrastructure became a bit more stable. Our tests got more reliable. We even built a
script that checked that status of all gating builds, which anyone could run locally before pushing.

Though our build pipeline etiquette is not perfect, we are exhibiting much more collective
ownership. We have published a wiki entry with the expectations of all developers that outlines the
expected contract: following the
“[Check In Dance](http://codebetter.com/jeremymiller/2005/07/25/using-continuous-integration-better-do-the-check-in-dance/),”
placing comments in GoCD for communication, assuming ownership especially after checking in code,
and ensuring the build is not red at the end of the day.

## Final Thoughts

In retrospect, it is hard to say whether we would have ended up at the same place now if we had
never implemented the Pipeline Masters. From time to time, suggestions get raised of other ways of
“forcing” proper build etiquette, such as a pre-commit script that will not let you push if builds
are green. I believe that these types of ideas are anti-patterns, and instead we should be focusing
on the culture of the teams. It’s a people issue, not a technology issue.

Green builds for all!
