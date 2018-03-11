---
title: GOTO Chicago 2014 Experience Report
date: "2014-05-26T13:31:00.000Z"
type: post
---

I had the privilege of attending [Goto;con 2014](http://gotocon.com/chicago-2014/) in Chicago. It was smaller than I anticipated, spread over just a few conference rooms in a small corner of the Drake Hotel, with no more than 400 attendees. This gave the conference a fairly informal, casual vibe. The talks were spread over a variety of tracks, from distributed systems to UX to functional programming languages, which kept things fresh over the 2 day conference.

Here I will capture summaries and my key takeaways from some of the sessions I attended (which represents only a small fraction of the 40+ presentations).

<!-- more -->

## Camille Fournier: So You Want to Rewrite That…

**Head of Engineering, Rent the Runway**

Camille extrapolated some lessons from a successful rewrite of PHP Drupal system to a more modular platform built on a Ruby frontend with supporting Java microservices. Two of her main suggestions in order to make a rewrite sustainable were to 1. change as little as possible, and 2. to change only one thing at a time. Keep it small and incremental. She went on to discuss how to sell a rewrite to the business by making it clear what "done" will look like for the stakeholders. She also mentioned potential pitfalls, such as a version 2 that tries to do everything because of too many additional features being added during the rewrite. There is also the worry of over engineering. And if the team does not have a good idea of what done means, you could end up never really getting there.

Her overall message was that a rewrite can be successful, and to make that happen you should make incremental changes that provide value.

## Reid Draper: Forty Years of Pretending

**Profesional Erlang Developer, Works on Riak**

Reid spoke about the recent resurgence of RPC-style architectures in JavaScript heavy web apps. At first I did not quite buy it, was he saying we are going back towards RPC? No way! But he ended up connecting the dots in the end.

He reminded us of some of the glaring problems with RPC:

* It is difficult to keep consistent code on every node. If you need to update code, then you have to update it everywhere. Think of JS on clients as the nodes. You don’t control which version of the JS the client has. With JS on browsers, how to you deliver updated code? Do you force users to reload the page?
* How do you handle failure? HTTP is inherently unstable.
* How do you serialize complex objects such as DB connection objects?
* Streaming

He went on to talk about how, since we can write JS on the front end and back end now, we may be tempted to use this RPC-style architecture and run the same code on both ends. He briefly noted a few JS-RPC libraries and advised against using them, since we already know the shortcomings of this approach.

He then walked through the [Fallacies of Distributed Computing](http://en.wikipedia.org/wiki/Fallacies_of_Distributed_Computing):

1. The network is reliable
2. Latency is zero
3. Bandwidth is infinite
4. The network is secure
5. The network topology does not change
6. There is a single network admin
7. Transport cost is 0
8. The network is homogeneous

I have been kind of unconsciously aware of these while developing web and mobile applications, but it was awesome to make them really explicit. He used them to stress the difficulties in developing JS web apps and brought up a great final point.

> “Even a simple web app is a distributed system”

## Michael Nygard: Five Years of DevOps: Where are we Now?

**Author of "Release It!"**

It was pretty great to hear a talk about DevOps from Michael Nygard. He started with the basics and growth of DevOps, including CAMS (Culture, Automation, Measurement, Sharing). He made a good point by applying Donella Meadows' [“Leverage Points in a System”](http://www.donellameadows.org/archives/leverage-points-places-to-intervene-in-a-system/) to DevOps, and how the best place to affect an organization with DevOps comes at the information flow level and goals of the organization. Eventually, he outlined that DevOps over the past few years has come to mean:

> CAMS + human factors + Agile values + Continuous Delivery = DevOps

I really enjoyed his scorecard of where we are currently at with DevOps:

<table>
  <thead>
    <tr>
      <th>Category</th><th>Score</th><th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Deployments</td><td>A</td><td>Most deployment tech right now targets a single machine, not a cluster</td>
    </tr>
    <tr>
      <td>Provisioning</td><td>B</td><td></td>
    </tr>
    <tr>
      <td>Logging</td><td>A+</td><td></td>
    </tr>
    <tr>
      <td>Monitoring</td><td>A+</td><td>Graph all the the things!</td>
    </tr>
    <tr>
      <td>Anomaly Detection</td><td>C</td><td></td>
    </tr>
    <tr>
      <td>System Comprehension</td><td>D+</td><td>We are not very good at connecting a machine being down to the implications on the rest of the system and to the bottom line of the organization</td>
    </tr>
  </tbody>
</table>

Going forward, some more things to expect in this space:

* More focus on _anti-fragility_ - systems that improve from randomness. He used the [Symian Army](https://github.com/Netflix/SimianArmy) from Netflix as a current example.
* A culture shift to viewing development infrastructure as mission critical. “Development is Production”

Finally, some cautions:
Michael thinks DevOps is at the top of the "innovative technology adoption curve" right now.

![Innovative technology adoption curve](http://s9.postimg.org/8unpmxe2n/Technology_Adoption_Curve.png)

There is a market penetration and DevOps is the most popular one at the party. He warned against trying to emulate practices without adopting the DevOps culture though. There is no such thing as DevOps-in-a-box. Having a separate DevOps team is also an anti-pattern.

## Martin Odersky: Scala - The Simple Parts

**Creator of Scala, Co-founder and Chairman of Typesafe**

Martin basically wanted to address some bad rap Scala has gotten lately about it being overly complex and huge (I think so too). He called it a growable and modular language. It is growable in the sense that it is easy to build a DSL on top to expand its capabilities (such as [Spark](http://spark.apache.org/), [Chisel](https://chisel.eecs.berkeley.edu/), [Akka](http://akka.io/), etc). It is a language for growth - you can start fast, with a 1-liner program. You can experiment fast. Then, it can grow very huge by using a combination of OO and functional programming. Large systems need both. This leads to also viewing Scala as a modular language. Modules are essential pieces of both OO and functional languages. With modular programming, your focus in on combining modules to do interesting things. Scala give you the power to choose how to combine modules, and which programming paradigm to use.

Martin was trying to stress that Scala has some simple building blocks (remember that [simple != easy](http://www.infoq.com/presentations/Simple-Made-Easy)):

1. Everything is an expression
2. Scopes allow you to nest everything (functions inside of functions)
3. Patterns and case classes
4. Recursion and more importantly, tail recursion
5. Function values
6. Collections. Think transformations, not CRUD operations
7. vars. Combine a little bit of mutable state

Overall, to me the talk actually had the opposite effect, it showed me how little I understand of some of the principles on which Scala is built. During the last half of the talk, Martin dived deeper into some architecture choices in the collections libraries to illustrate additional crazy Scala language choices and features. But he lost me and, from speaking with some of the other attendees, many others too.

## Aaron Bedra: The Future of Web Security isn't Preventing Attacks

**Senior Fellow, Groupon**

I quite enjoyed Aaron's talk. He had a lot of energy, which was great for an afternoon talk on the final day. Aaron made his point right away that _you cannot prevent attacks_ any more than you can prevent someone from mugging you on the street. We should stop treating security as purely preventative. He used the analogy of a casino, and our web applications already ID visitors like casinos. However, unlike casinos, once a visitor is in we stop caring and assume its all ok! Casinos are watching everyone, everywhere, all the time.

So what do we do? According to Aaron, the first thing to do is to _aggregate your logs_, drop a query engine on top, and generate graphs. Beyond tools, we should analyze what the risks are in having our security breached, and have a well-thought out plan for when breaches occur. Do you have a plan? We should not design security without intent, and security should be part of the design process of our system. Security should be responsive, intelligent, and focused.

Great security should not only tell us what, when, and how, but also _who_ and _why_. This is what we should strive for. The attackers will always be one step ahead of us. So instead of focusing on prevention, we should focus on getting great at detection and response.
