webpackJsonp([0xdf32efdd9dc1],{510:function(e,t){e.exports={data:{site:{siteMetadata:{title:"Ryan Oglesby"}},markdownRemark:{id:"/Users/ryanoglesby/Projects/blog/src/src/pages/the-life-and-death-of-a-pipeline-master/index.md absPath of file >>> MarkdownRemark",html:'<p><em>Originally posted in late 2015 or early 2016 as an internal blog post. It tells the story of\nintroducing and later abandoning a strategy for improving build pipeline culture. The setting is a\n100+ person program, distributed between India and USA, maybe 10 teams, dozens of services and apps,\ndoing trunk-based development on a Java monorepo.</em></p>\n<h2>Beginnings</h2>\n<p>The time was July, 2015. It was a different time then. A wild west of sorts. We had a build\npipeline, but it was horribly untrustworthy. Our user journey tests failed often, both because of\nbroken functionality and because of our own deficiencies with asynchronous testing. The underlying\ninfrastructure was extremely unstable. Dropped database connections happened multiple times a day.</p>\n<p>These problems contributed to a growing cultural disease of inattention to the information coming\nout of our build pipeline. Developers often committed on a red build, whether it was because they\ndid not trust it, because they felt like they could not fix it anyway, or because they assumed that\nsomeone else must be working on it. Gradually, the team was developing bad habits.</p>\n<p>So, we felt that establishing a rotating role would give us more organization and discipline around\nour build pipeline hygiene. The role would be the go-to person for build hygiene issues. The\nPipeline Masters were responsible for ensuring that a broken build was fixed in a timely manner,\nthough they were not necessarily responsible for doing the actual work to fix it. Their core value\nwas as an organizer, communicator, and enforcer. They would help identify trends of common problems\nso that the teams could prioritize the most important. And their power even extended as far as being\nable to revert any check ins when they were committed on top of an already red build.</p>\n<h2>Deterioration</h2>\n<p>What started out with good intentions began to devolve within a few rotations. One of the first\nthings we noticed was inconsistent hand-offs from one Pipeline Master to the next, resulting in a\nloss of context and continuity. The tracking of persistent problem areas and common fixes died off\nsoon.</p>\n<p>Instead of a more ideal scenario of shared responsibility for the build pipeline, a culture began to\ntake shape around reliance on the Pipeline Masters to enforce hygiene. Because the Pipeline Masters\nwould send out an email titled “Build Broken - Don’t Commit,” we got into the practice of relying on\nthat to tell us if the build is healthy instead of using radiators or other notification tooling.\nNot to mention, that produced a lot of extra noise in our already busy email inboxes!</p>\n<h2>All Things Come to an End</h2>\n<p>Over time, people began to ask why we needed the Pipeline Masters more and more. Shouldn’t proper\nbuild etiquette be a contract shared amongst everyone on the project? Eventually, other duties even\nstarted to creep into the Pipeline Master role. “They are already in charge of the build, so they\ncan just do this other kind-of-pipeline-related thing too.”</p>\n<p>What started as a way to reset build pipeline behavior had reached a point where it was no longer\nrealizing the advertised benefits, and even becoming detrimental to the account culture. The role\nwas also being replaced by better alternatives. We turned on build radiators. People started being\nmore disciplined about using <a href="https://www.gocd.org/">GoCD</a> comments when the build was broken. The\nunderlying infrastructure became a bit more stable. Our tests got more reliable. We even built a\nscript that checked that status of all gating builds, which anyone could run locally before pushing.</p>\n<p>Though our build pipeline etiquette is not perfect, we are exhibiting much more collective\nownership. We have published a wiki entry with the expectations of all developers that outlines the\nexpected contract: following the\n“<a href="http://codebetter.com/jeremymiller/2005/07/25/using-continuous-integration-better-do-the-check-in-dance/">Check In Dance</a>,”\nplacing comments in GoCD for communication, assuming ownership especially after checking in code,\nand ensuring the build is not red at the end of the day.</p>\n<h2>Final Thoughts</h2>\n<p>In retrospect, it is hard to say whether we would have ended up at the same place now if we had\nnever implemented the Pipeline Masters. From time to time, suggestions get raised of other ways of\n“forcing” proper build etiquette, such as a pre-commit script that will not let you push if builds\nare green. I believe that these types of ideas are anti-patterns, and instead we should be focusing\non the culture of the teams. It’s a people issue, not a technology issue.</p>\n<p>Green builds for all!</p>',frontmatter:{title:"The Life and Death of a Pipeline Master",date:"November 12, 2018"}}},pathContext:{slug:"/the-life-and-death-of-a-pipeline-master/",previous:{fields:{slug:"/software-development-is-a-team-sport/"},frontmatter:{title:"Software Development is a Team Sport"}},next:!1}}}});
//# sourceMappingURL=path---the-life-and-death-of-a-pipeline-master-168a8e5c060481c507f5.js.map