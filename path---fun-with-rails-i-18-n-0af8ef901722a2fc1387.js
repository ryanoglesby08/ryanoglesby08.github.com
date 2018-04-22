webpackJsonp([70650898739072],{477:function(n,s){n.exports={data:{site:{siteMetadata:{title:"Ryan Oglesby"}},markdownRemark:{id:"/Users/ryanoglesby/Projects/blog/src/src/pages/fun-with-rails-i18n/index.md absPath of file >>> MarkdownRemark",html:'<h2>Skipping the Basics…</h2>\n<p>Anyone wanting to develop a truly internationalized application needs to address translating the\ntext of the app into the supported languages. Fortunately for you Rails devs out there, the\nframework provides an easy mechanism for managing and performing those translations, I18n.translate\nor shortly I18n.t being the forefront. I am just going to mention the basics here and then move\nright on to some of the more fun features of Rails translations that every Rails ninja needs to\nknow.</p>\n<p>So we all know how to do basic translations:</p>\n<div class="gatsby-highlight">\n      <pre class="language-yaml"><code class="language-yaml"><span class="token key atrule">en</span><span class="token punctuation">:</span>\n  <span class="token key atrule">hello-world</span><span class="token punctuation">:</span> <span class="token string">\'Oh hai, World, you are looking nice\'</span>\n  <span class="token key atrule">views</span><span class="token punctuation">:</span>\n    <span class="token key atrule">welcome</span><span class="token punctuation">:</span> <span class="token string">\'Welcome, %{user_name}\'</span></code></pre>\n      </div>\n<div class="gatsby-highlight">\n      <pre class="language-ruby"><code class="language-ruby"><span class="token function">t</span><span class="token punctuation">(</span><span class="token string">\'hello-world\'</span><span class="token punctuation">)</span>  <span class="token comment"># Oh hai, World, you are looking nice</span>\n<span class="token function">t</span><span class="token punctuation">(</span><span class="token string">\'views.welcome\'</span><span class="token punctuation">,</span> user_name<span class="token punctuation">:</span> <span class="token string">\'OptimusPrime\'</span><span class="token punctuation">)</span>  <span class="token comment"># Welcome, OptimusPrime</span></code></pre>\n      </div>\n<p>Now some things you may not know about.</p>\n<h2>Pluralization</h2>\n<p>When you do translations you don’t have to try to hack together interpolated strings using\n<code class="language-text">ActiveSupport#pluralize</code>. Pluralizations are baked right in.</p>\n<div class="gatsby-highlight">\n      <pre class="language-yaml"><code class="language-yaml"><span class="token key atrule">en</span><span class="token punctuation">:</span>\n  <span class="token key atrule">views</span><span class="token punctuation">:</span>\n    <span class="token key atrule">messages</span><span class="token punctuation">:</span>\n      <span class="token key atrule">zero</span><span class="token punctuation">:</span> <span class="token string">\'You got no messages here fool!\'</span>\n      <span class="token key atrule">one</span><span class="token punctuation">:</span> <span class="token string">\'Only 1 message right now.\'</span>\n      <span class="token key atrule">other</span><span class="token punctuation">:</span> <span class="token string">\'You have %{count} messages.\'</span></code></pre>\n      </div>\n<div class="gatsby-highlight">\n      <pre class="language-ruby"><code class="language-ruby"><span class="token function">t</span><span class="token punctuation">(</span><span class="token string">\'views.messages\'</span><span class="token punctuation">,</span> count<span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">)</span>  <span class="token comment"># You got no messages here fool!</span>\n<span class="token function">t</span><span class="token punctuation">(</span><span class="token string">\'views.messages\'</span><span class="token punctuation">,</span> count<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">)</span>  <span class="token comment"># Only 1 message right now.</span>\n<span class="token function">t</span><span class="token punctuation">(</span><span class="token string">\'views.messages\'</span><span class="token punctuation">,</span> count<span class="token punctuation">:</span> <span class="token number">5</span><span class="token punctuation">)</span>  <span class="token comment"># You have 5 messages.</span></code></pre>\n      </div>\n<h2>HTML Safe</h2>\n<p>As a general rule, I avoid putting HTML markup in a translation string. HTML markup should be in the\nview where it belongs. However, despite my best efforts, sometimes it is unavoidable - which is okay\nin certain situations. Furthermore, sometimes the variables passed into a translation will contain\nHTML markup. The default strategy in this situation that I have seen is to use <code class="language-text">raw</code> or <code class="language-text">html_safe</code>.\nWhile this does the job, it adds unnecessary method calls when the HTML safe-ification can be\nhandled directly by I18n using the <code class="language-text">_html</code> suffix.</p>\n<div class="gatsby-highlight">\n      <pre class="language-yaml"><code class="language-yaml"><span class="token key atrule">en</span><span class="token punctuation">:</span>\n  <span class="token key atrule">views</span><span class="token punctuation">:</span>\n    <span class="token key atrule">account-will-be-locked_html</span><span class="token punctuation">:</span> <span class="token string">\'Your account is about to be &lt;strong>locked&lt;/strong>\'</span>\n    <span class="token key atrule">remaining-characters</span><span class="token punctuation">:</span>\n      <span class="token key atrule">html</span><span class="token punctuation">:</span> <span class="token string">\'Remaining characters: %{amount}\'</span></code></pre>\n      </div>\n<div class="gatsby-highlight">\n      <pre class="language-ruby"><code class="language-ruby"><span class="token function">t</span><span class="token punctuation">(</span><span class="token string">\'views.account-will-be-locked_html\'</span><span class="token punctuation">)</span>  <span class="token comment"># \'Your account is about to be &lt;strong>locked&lt;/strong>\' (marked HTML safe for the view)</span>\n<span class="token function">t</span><span class="token punctuation">(</span><span class="token string">\'views.remaining-characters.html\'</span><span class="token punctuation">,</span> amount<span class="token punctuation">:</span> <span class="token string">\'&lt;em>50&lt;/em>\'</span><span class="token punctuation">)</span>  <span class="token comment"># \'Remaining characters: &lt;em>50&lt;/em>\' (marked HTML safe for the view)</span></code></pre>\n      </div>\n<p>Though you do receive the added benefit of avoiding unnecessary <code class="language-text">html_safe</code> calls, the real winner\nhere it that by being explicit in the locale file, you tell any other developers looking at it which\nstrings are expected to have HTML. Easy win for visibility and communication.</p>\n<h2>Watch Out for yes/no!</h2>\n<p>This is a weird one. I am actually not sure why this happens, and would appreciate if anyone can\nshed some light on the underlying reason for this. If you try to use the key “yes” or “no,” I18n.t\nwill not be able to find it.</p>\n<div class="gatsby-highlight">\n      <pre class="language-yaml"><code class="language-yaml"><span class="token key atrule">en</span><span class="token punctuation">:</span>\n  <span class="token key atrule">views</span><span class="token punctuation">:</span>\n    <span class="token key atrule">yes</span><span class="token punctuation">:</span> <span class="token string">\'Sure thing\'</span>\n    <span class="token key atrule">no</span><span class="token punctuation">:</span> <span class="token string">\'No way!\'</span></code></pre>\n      </div>\n<div class="gatsby-highlight">\n      <pre class="language-ruby"><code class="language-ruby"><span class="token function">t</span><span class="token punctuation">(</span><span class="token string">\'views.yes\'</span><span class="token punctuation">)</span>  <span class="token comment"># &lt;span class="translation_missing" title="translation missing: en.views.yes">Yes&lt;/span></span>\n<span class="token function">t</span><span class="token punctuation">(</span><span class="token string">\'views.no\'</span><span class="token punctuation">)</span>  <span class="token comment"># &lt;span class="translation_missing" title="translation missing: en.view.yes">No&lt;/span></span></code></pre>\n      </div>\n<p>Only solution I know is just to not use “yes” or “no” as keys, which is not ideal if you are adding\na translation for those exact words.</p>\n<h2>Literal Naming FTW</h2>\n<p>It can be quite tempting to use semantic keys in your locale YML files. I see things like “title,”\n“introduction-1,” or “header-text.” While this will work fine, I prefer to use literal keys that\nreflect the actual content of the translation (in the default locale) so my views are easier to read\nfor myself and other developers.</p>\n<div class="gatsby-highlight">\n      <pre class="language-haml"><code class="language-haml"><span class="token punctuation">-</span><span class="token code"> <span class="token comment"># Hard to read. I have to jump out of my code just to read my own code! Ergggggghhhh</span></span>\n<span class="token tag">.header</span>\n  <span class="token punctuation">=</span><span class="token code"> <span class="token function">t</span><span class="token punctuation">(</span><span class="token string">\'views.header.user-intro\'</span><span class="token punctuation">,</span> user<span class="token punctuation">:</span> <span class="token variable">@current_user</span><span class="token punctuation">)</span></span>\n\n<span class="token tag">.main-content</span>\n  <span class="token tag">%p</span>\n    <span class="token punctuation">=</span><span class="token code"> <span class="token function">t</span><span class="token punctuation">(</span><span class="token string">\'views.common.site-description-1\'</span><span class="token punctuation">)</span></span>\n  <span class="token tag">%p</span>\n    <span class="token punctuation">=</span><span class="token code"> <span class="token function">t</span><span class="token punctuation">(</span><span class="token string">\'views.common.site-description-2\'</span><span class="token punctuation">)</span></span>\n\n  <span class="token tag">%ul</span>\n    <span class="token tag">%li</span>\n      <span class="token punctuation">=</span><span class="token code"> <span class="token function">t</span><span class="token punctuation">(</span><span class="token string">\'views.common.user-perks-1\'</span><span class="token punctuation">)</span></span></code></pre>\n      </div>\n<div class="gatsby-highlight">\n      <pre class="language-haml"><code class="language-haml"><span class="token punctuation">-</span><span class="token code"> <span class="token comment"># Easy to read. I understand my own code. Yessssssssss</span></span>\n<span class="token tag">.header</span>\n  <span class="token punctuation">=</span><span class="token code"> <span class="token function">t</span><span class="token punctuation">(</span><span class="token string">\'views.header.welcome-to-the-site\'</span><span class="token punctuation">,</span> user<span class="token punctuation">:</span> <span class="token variable">@current_user</span><span class="token punctuation">)</span></span>\n\n<span class="token tag">.main-content</span>\n  <span class="token tag">%p</span>\n    <span class="token punctuation">=</span><span class="token code"> <span class="token function">t</span><span class="token punctuation">(</span><span class="token string">\'views.common.we-have-doo-dads\'</span><span class="token punctuation">)</span></span>\n  <span class="token tag">%p</span>\n    <span class="token punctuation">=</span><span class="token code"> <span class="token function">t</span><span class="token punctuation">(</span><span class="token string">\'views.common.and-foo-bar-widgets\'</span><span class="token punctuation">)</span></span>\n\n  <span class="token tag">%ul</span>\n    <span class="token tag">%li</span>\n      <span class="token punctuation">=</span><span class="token code"> <span class="token function">t</span><span class="token punctuation">(</span><span class="token string">\'views.common.receive-service-any-time\'</span><span class="token punctuation">)</span></span></code></pre>\n      </div>\n<p>That’s all for now! Most of this plus everything else you wanted to know about i18n can be found in\nthe <a href="http://guides.rubyonrails.org/i18n.html">Rails Guides</a>.</p>\n<p>Bye! Adios! Adieu! Aloha!</p>',frontmatter:{title:"Fun With Rails I18n",date:"January 29, 2013"}}},pathContext:{slug:"/fun-with-rails-i18n/",previous:{fields:{slug:"/rails-controller-specs-dont-always-play-nice-with-hashie/"},frontmatter:{title:"Rails Controller Specs Don't Always Play Nice With Hashie"}},next:{fields:{slug:"/meet-lazydoc/"},frontmatter:{title:"Meet LazyDoc"}}}}}});
//# sourceMappingURL=path---fun-with-rails-i-18-n-0af8ef901722a2fc1387.js.map