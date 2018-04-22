webpackJsonp([0xb8ba0f61fd75],{443:function(n,a){n.exports={data:{site:{siteMetadata:{title:"Ryan Oglesby"}},markdownRemark:{id:"/Users/ryanoglesby/Projects/blog/src/src/pages/easing-into-rubocop-with-git/index.md absPath of file >>> MarkdownRemark",html:'<h2>Dropping Rubocop into an existing codebase</h2>\n<p>We (my team) recently introduced <a href="https://github.com/bbatsov/rubocop">rubocop</a> to a Rails app and a\nSinatra app to encourage (aka enforce) us to follow established Ruby style and semantics. This was\nmy first experience with dropping a static code analyzer into an established codebase. Just for\nreference, our Rails app is not huge - 16 controllers, 25 models, 10 services, and a smattering of\nother files.</p>\n<p>Even so, the first run of <code>bundle exec rubocop</code> on the entire application revealed about 2,500\nwarnings. Whomp whomp. Thankfully, Rubocop comes with a handy-dandy autocorrect feature. A quick\n<code>bundle exec rubocop --auto-correct</code> fixed almost half of them. Good, but not quite there yet.</p>\n<!-- more -->\n<h2>Incremental Rubocoping</h2>\n<p>We wanted to Rubocop to execute as part of our pre-commit task, and we wanted it to fail the task if\nit produced warnings or errors. So, our options were:</p>\n<ol>\n<li>Have someone sit down with a case or two of Red Bull and don’t stop until everything is fixed.</li>\n<li>Use the “Automatically Generated Configuration” from Rubocop, which generates a config file for\nyou from all the warnings with all those cops turned off, letting you choose when to enable them.</li>\n<li>Configure Rubocop to only run on a subset of files or directories. Fix all those warnings before\nadding more files, rinse and repeat until the entire app is added.</li>\n</ol>\n<p>We went with… kind of 3. We liked the idea of incrementally rubocop-ing our app as we worked on\nit. So our solution is based on the\n<a href="http://programmer.97things.oreilly.com/wiki/index.php/The_Boy_Scout_Rule">Boy Scout Rule</a> - strive\nto always leave any code you touch in a better state than when you found it. Applying that to\nRubocop means every time you commit, Rubocop gets run ONLY on the files you have touched in that\ncommit. Over time, we should cover more and more of the app until eventually we can run Rubocop on\nthe entire app with every commit! Boom!</p>\n<p>The one caveat is that you must remember to run the task BEFORE you do <code>git commit</code> in order for the\ntask to pick up your changed files. I’m sure we could put in some more effort to account for that,\nbut haven’t done so yet.</p>\n<h2>The Gist of it</h2>\n<p><div class="gatsby-highlight">\n        <pre class="language-ruby"><code>desc <span class="token string">\'Run Rubocop on uncommitted changed files\'</span>\ntask <span class="token symbol">:git_rubocop</span> <span class="token keyword">do</span>\n  <span class="token constant">RUBY_FILENAME_PATTERNS</span> <span class="token operator">=</span> <span class="token string">%w(Gemfile Rakefile .rb .rake)</span>\n  <span class="token keyword">def</span> ruby_file<span class="token operator">?</span><span class="token punctuation">(</span>filename<span class="token punctuation">)</span>\n    <span class="token constant">RUBY_FILENAME_PATTERNS</span><span class="token punctuation">.</span><span class="token keyword">each</span> <span class="token keyword">do</span> <span class="token operator">|</span>pattern<span class="token operator">|</span>\n      <span class="token keyword">return</span> <span class="token keyword">true</span> <span class="token keyword">if</span> filename<span class="token punctuation">.</span>include<span class="token operator">?</span> pattern\n    <span class="token keyword">end</span>\n\n    <span class="token keyword">false</span>\n  <span class="token keyword">end</span>\n\n  <span class="token keyword">def</span> deleted<span class="token operator">?</span><span class="token punctuation">(</span>git_file<span class="token punctuation">)</span>\n    git_file<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">\' \'</span><span class="token punctuation">)</span><span class="token punctuation">.</span>first<span class="token punctuation">.</span>include<span class="token operator">?</span> <span class="token string">\'D\'</span>\n  <span class="token keyword">end</span>\n\n  <span class="token keyword">def</span> <span class="token function">filename_from</span><span class="token punctuation">(</span>git_file<span class="token punctuation">)</span>\n    git_file<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">\' \'</span><span class="token punctuation">)</span><span class="token punctuation">.</span>last\n  <span class="token keyword">end</span>\n\n  git_files <span class="token operator">=</span> `git status <span class="token operator">-</span>uno <span class="token operator">--</span>porcelain`\n  filenames <span class="token operator">=</span> git_files<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">"\\n"</span><span class="token punctuation">)</span>\n                  <span class="token punctuation">.</span>reject <span class="token punctuation">{</span> <span class="token operator">|</span>git_file<span class="token operator">|</span> deleted<span class="token operator">?</span><span class="token punctuation">(</span>git_file<span class="token punctuation">)</span> <span class="token punctuation">}</span>\n                  <span class="token punctuation">.</span>map <span class="token punctuation">{</span> <span class="token operator">|</span>git_file<span class="token operator">|</span> <span class="token function">filename_from</span><span class="token punctuation">(</span>git_file<span class="token punctuation">)</span> <span class="token punctuation">}</span>\n                  <span class="token punctuation">.</span>select <span class="token punctuation">{</span> <span class="token operator">|</span>filename<span class="token operator">|</span> ruby_file<span class="token operator">?</span><span class="token punctuation">(</span>filename<span class="token punctuation">)</span> <span class="token punctuation">}</span>\n                  <span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">\' \'</span><span class="token punctuation">)</span>\n\n  sh <span class="token string">"bundle exec rubocop <span class="token interpolation"><span class="token delimiter tag">#{</span>filenames<span class="token delimiter tag">}</span></span>"</span> <span class="token keyword">unless</span> filenames<span class="token punctuation">.</span>empty<span class="token operator">?</span>\n<span class="token keyword">end</span>\n</code></pre>\n        </div></p>',frontmatter:{title:"Easing into Rubocop with git",date:"February 25, 2015"}}},pathContext:{slug:"/easing-into-rubocop-with-git/",previous:{fields:{slug:"/how-to-support-apprentices-on-an-agile-development-team/"},frontmatter:{title:"How to Support Apprentices on an Agile Development Team"}},next:{fields:{slug:"/watching-the-watchers-in-angularjs/"},frontmatter:{title:"Watching the Watchers in AngularJS"}}}}}});
//# sourceMappingURL=path---easing-into-rubocop-with-git-784b025a4396a95dd6cf.js.map