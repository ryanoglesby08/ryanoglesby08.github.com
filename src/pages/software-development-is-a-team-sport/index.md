---
title: Software Development is a Team Sport
date: "2018-04-21"
---

What does it mean to be a member of a “software development team?” Is the team a single collective,
or a collection of individuals?

When team members act like individuals who happen to be working on the same codebase at the same
time, it leads to tensions that lower the team's overall productivity and lessen the average
individual's fulfillment. A team of software developers is most effective when they value the team
over the individual.

Everyone has preferences for the way they like to work and write code. That's human. But, putting
those preferences over the needs of the team is selfish and unprofessional.

## Code style

Having your own code style on a software team doesn't make sense. Code style isn’t about your
preference. You don’t format code so _you_ can write it, and you don’t format code so _you_ can read
it. You format code so _others_ can read it. You’ll write it once, and then it will be read a
thousand times by people who are not even on the team yet.

Tools that apply formatting to code automatically, such as [prettier](https://prettier.io/) or
[gofmt](https://golang.org/cmd/gofmt/), fit perfectly into the team sport mindset. Some people
complain, saying “I don’t like the style that prettier applies.” The point is that the style doesn’t
matter. What matters is that the code will be of the same style, and that you don’t have to think
about it anymore. A codebase that looks like it was written by a single entity is easier to read and
understand. And when you spend less time thinking and talking about code style, you can spend more
time focusing on architecture, performance, and the domain.

**A team values a unified code style over individual preference.**

## Trunk-Based development

Long-lived feature branches is a sign of a collection of individuals who call themselves a “team.”
The tendency to want to work on your own isolated branch for a long period of time signifies a
mindset of “this is my code over here, and that is your code over there.” Furthermore, when
developers of this mindset submit their code to merge into the mainline, they tend to think “I’m
done with that and now its someone else’s responsibility, time for me to work on something else”. It
becomes easy to lose sight of what others are doing and what else is going on in the codebase. It
can also lead to specialized knowledge silos, which further separates the team members and is a risk
to the success of the project.

[Trunk-Based Development](https://trunkbaseddevelopment.com/) supports the idea that there is one
codebase that every member of the team owns equally. There is no mine and yours. There is no
hand-off and change of responsibility. It is much easier to see what else is happening in the
codebase simultaneously. Large scale refactoring is safer and easier. Merge hell is less likely, as
long as integration with trunk is frequent. Having only one long-lived code branch provides an
anchor for the team to rally around.

**A team values collective code ownership over individual pride.**

## Pair programming

Pairing has a lot of benefits: code review happens immediately, new team members can be brought on
board quickly, knowledge silos are less likely, and so on. Pairing is also taxing. Not everyone has
the mental and emotional energy to pair program day in and day out. Experienced developers often
don’t want to pair because they feel that they are more productive when working alone.

The interesting part is that most of the reasons is support of pair programming relate to team
optimizations, while most of the reasons against it speak to the individual. While pair programming
is a positive thing for most teams, it is possible to over do it, to the detriment of the happiness
of the humans. So, rather than treating pair programming as an all or nothing dogma, the critical
concept is that the team is in a constant state of collaboration in one way or another.

Teams that don’t prioritize the overall shared knowledge of the team perpetuate the rockstar coder
stereotype that is too prevalent in the industry. By not working in a culture of collaboration,
individuals are put on pedestals, seen as invaluable, and rewarded. This only hurts the team. What
happens to all their specialized knowledge when they are sick, or worse, they leave the team? How
long does it take new team members to ramp up when the most experienced dev is always working alone?

**A team values shared knowledge over individual productivity.**

## Values over practices

The most productive and happy teams I’ve worked on have operated as a team, not as individuals.
Those teams built a set of values shared among the team members, and derived practices in support of
them.

I like being on teams that value collaboration, feedback, openness, trust, purpose, and flexibility.
Those values tend to lead to practices such as Agile methodologies, Trunk-Based Development, pair
programming, code quality, and face-to-face communication, but those specific practices are less
important to me.

What is more important is that the team operates as a team, optimizing for its effectiveness while
not sacrificing the humanity of the individuals.
