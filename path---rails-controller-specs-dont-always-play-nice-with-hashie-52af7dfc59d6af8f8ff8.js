webpackJsonp([0xcdfc267a3681],{467:function(s,n){s.exports={data:{site:{siteMetadata:{title:"Ryan Oglesby"}},markdownRemark:{id:"/Users/ryanoglesby/Projects/blog/gatsby-blog/src/pages/rails-controller-specs-dont-always-play-nice-with-hashie/index.md absPath of file >>> MarkdownRemark",html:'<h2>Hashie and Rspec - The Problem:</h2>\n<p><a href="https://github.com/intridea/hashie">Hashie</a> is a neat little Ruby gem that extends Hash and gives\nobject-like access and functionality to hashes. Classes can extend from Hashie and add other\nfunctionality as needed. It is especially useful when marshaling JSON or XML data from a service\nlayer into your business models.</p>\n<p>While Hashie is very useful, we have to be careful using this gem with ActionController Rspec tests.\nWhen creating the <code>assigns</code> hash used in controller tests, Rspec creates a\n<code>HashWithIndifferentAccess</code>, which is dangerous with objects that act like Hash (such as Hashie\nobjects). Rspec ends up converting user-defined objects that inherit from Hashie into\n<code>HashWithIndifferentAccess</code> objects, causing us to lose any data that exists outside of the backing\nhash.</p>\n<h2>The Setup:</h2>\n<p>Lets imagine our Rails application talks to an Employee API exposing JSON data. We have already\nimplemented the service layer that makes the API call and returns Employee objects that extend\nHashie. In the EmployeeController we make the service call and assign the resulting Employee object.</p>\n<div class="gatsby-highlight">\n      <pre class="language-ruby"><code class="language-ruby"><span class="token comment"># employee.rb</span>\n\n<span class="token keyword">class</span> <span class="token class-name">Employee</span> <span class="token operator">&lt;</span> <span class="token constant">Hashie</span><span class="token punctuation">:</span><span class="token punctuation">:</span><span class="token constant">Dash</span>\n  property <span class="token symbol">:first_name</span>\n  property <span class="token symbol">:last_name</span>\n\n  <span class="token comment"># foo is not specified using "property" because it does not come from the EmployeeService</span>\n  <span class="token comment">#   JSON response. We are separating what comes from the service and what does not.</span>\n  attr_accessor <span class="token symbol">:foo</span>\n<span class="token keyword">end</span>\n</code></pre>\n      </div>\n<div class="gatsby-highlight">\n      <pre class="language-ruby"><code class="language-ruby"><span class="token comment"># employee_controller.rb</span>\n\n<span class="token keyword">class</span> <span class="token class-name">EmployeeController</span> <span class="token operator">&lt;</span> <span class="token constant">ActionController</span>\n  <span class="token keyword">def</span> show\n    <span class="token variable">@employee</span> <span class="token operator">=</span> <span class="token constant">EmployeeService</span><span class="token punctuation">.</span><span class="token function">find_by_id</span><span class="token punctuation">(</span>params<span class="token punctuation">[</span><span class="token symbol">:id</span><span class="token punctuation">]</span><span class="token punctuation">)</span>\n    <span class="token variable">@employee</span><span class="token punctuation">.</span>foo <span class="token operator">=</span> <span class="token string">\'extra info\'</span>\n  <span class="token keyword">end</span>\n<span class="token keyword">end</span>\n</code></pre>\n      </div>\n<h2>The Tests (Where the conflict occurs):</h2>\n<p>We should be able to write some simple specs to test the controller, specifically, that the result\nof the service call is stored in the correct variable passed into the view and that we assign\nwhatever extra processing we need to do outside of the service layer into “foo.”</p>\n<div class="gatsby-highlight">\n      <pre class="language-ruby"><code class="language-ruby"><span class="token comment"># employee_controller_spec.rb</span>\n\n<span class="token keyword">require</span> <span class="token string">\'spec_helper\'</span>\n\ndescribe <span class="token constant">EmployeeController</span> <span class="token keyword">do</span>\n  describe <span class="token string">\'show\'</span> <span class="token keyword">do</span>\n    it <span class="token string">\'should assign the employee\'</span> <span class="token keyword">do</span>\n      <span class="token constant">EmployeeService</span><span class="token punctuation">.</span><span class="token function">stub</span><span class="token punctuation">(</span><span class="token symbol">:find_by_id</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token constant">Employee</span><span class="token punctuation">.</span><span class="token keyword">new</span> <span class="token punctuation">}</span>\n\n      get <span class="token symbol">:show</span><span class="token punctuation">,</span> id<span class="token punctuation">:</span> <span class="token string">\'employee_id\'</span>\n\n      assigns<span class="token punctuation">[</span><span class="token symbol">:employee</span><span class="token punctuation">]</span><span class="token punctuation">.</span>should be_an <span class="token constant">Employee</span>\n      assigns<span class="token punctuation">[</span><span class="token symbol">:employee</span><span class="token punctuation">]</span><span class="token punctuation">.</span>foo<span class="token punctuation">.</span>should <span class="token operator">==</span> <span class="token string">\'extra info\'</span>\n    <span class="token keyword">end</span>\n  <span class="token keyword">end</span>\n<span class="token keyword">end</span>\n</code></pre>\n      </div>\n<p>You would assume this test would pass right? Nope! Fail!</p>\n<p>The output of both assertions would be:</p>\n<div class="gatsby-highlight">\n      <pre class="language-ruby"><code class="language-ruby">expected <span class="token punctuation">{</span><span class="token string">"first_name"</span><span class="token operator">=</span><span class="token operator">></span><span class="token string">"John"</span><span class="token punctuation">,</span> <span class="token string">"last_name"</span><span class="token operator">=</span><span class="token operator">></span><span class="token string">"Smith"</span><span class="token punctuation">}</span> to be a kind of <span class="token constant">Employee</span>\n\n<span class="token constant">NoMethodError</span><span class="token punctuation">:</span> undefined method <span class="token string">\'foo\'</span> <span class="token keyword">for</span> <span class="token punctuation">{</span><span class="token string">"first_name"</span><span class="token operator">=</span><span class="token operator">></span><span class="token string">"John"</span><span class="token punctuation">,</span> <span class="token string">"last_name"</span><span class="token operator">=</span><span class="token operator">></span><span class="token string">"Smith"</span><span class="token punctuation">}</span><span class="token symbol">:ActiveSupport</span><span class="token punctuation">:</span><span class="token punctuation">:</span><span class="token constant">HashWithIndifferentAccess</span>\n</code></pre>\n      </div>\n<p>As you can see, Rails has converted our Employee object into a\n<a href="http://api.rubyonrails.org/classes/ActiveSupport/HashWithIndifferentAccess.html">HashWithIndifferentAccess</a>!\nHow dare you Rails?!</p>\n<h2>Why would Rails do this?</h2>\n<p>Well, don’t be too quick to point the finger, this is actually a combination of Rspec and Rails\n(ActiveSupport). Rspec is trying to make it easier for you to use the ActionController\n<code>view_assigns</code> hash by converting it into a <code>HashWithIndifferentAccess</code>. Diving into\n<code>ActionDispatch::TestProcess</code> we find the method definition for <code>assigns</code>:</p>\n<div class="gatsby-highlight">\n      <pre class="language-ruby"><code class="language-ruby"><span class="token comment"># test_process.rb</span>\n\n<span class="token keyword">module</span> <span class="token constant">ActionDispatch</span>\n  <span class="token keyword">module</span> <span class="token constant">TestProcess</span>\n    <span class="token keyword">def</span> <span class="token function">assigns</span><span class="token punctuation">(</span>key <span class="token operator">=</span> <span class="token keyword">nil</span><span class="token punctuation">)</span>\n      assigns <span class="token operator">=</span> <span class="token variable">@controller</span><span class="token punctuation">.</span>view_assigns<span class="token punctuation">.</span>with_indifferent_access\n      key<span class="token punctuation">.</span><span class="token keyword">nil</span><span class="token operator">?</span> <span class="token operator">?</span> assigns <span class="token punctuation">:</span> assigns<span class="token punctuation">[</span>key<span class="token punctuation">]</span>\n    <span class="token keyword">end</span>\n<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>\n</code></pre>\n      </div>\n<p>The easy access to the <code>view_assigns</code> hash is great, but looking deeper into the internals of the\n<code>with_indifferent_access</code> method we find that while creating the <code>HashWithIndifferentAccess</code>, any\nassigns variable that is a <code>Hash</code> is converted into a <code>HashWithIndifferentAccess</code>! Since Hashie\nclasses return true when asked if they are a <code>Hash</code>, they also get converted, therefore, losing\ntheir original object identity. To me ActiveSupport is stepping over the line here. Yes, give us\neasy access to the assigns hash, but don’t mess with the actual values of that hash unless I tell\nyou to.</p>\n<h2>Easy workaround:</h2>\n<p>First, this problem is unique to Rspec tests - production code does not have this same problem. One\nsolution would be to monkey patch <code>ActiveSuport::TestProcess</code> and\n<code>ActiveSupport::HashWithIndifferentAccess</code>. But, since I try to stay away from monkey patching\nwhenever possible, the quick solution is just to not use <code>assigns</code> when your object under test is a\nHash and you care about it not being converted to a <code>HashWithIndifferentAccess</code> for testing\npurposes.</p>\n<p>Instead, use the controller’s <code>view_assigns</code> hash directly to avoid the conversion to\n<code>HashWithIndifferentAccess</code>:</p>\n<div class="gatsby-highlight">\n      <pre class="language-ruby"><code class="language-ruby"><span class="token comment"># employee_controller_spec.rb</span>\n\n<span class="token keyword">require</span> <span class="token string">\'spec_helper\'</span>\n\ndescribe <span class="token constant">EmployeeController</span> <span class="token keyword">do</span>\n  describe <span class="token string">\'show\'</span> <span class="token keyword">do</span>\n    it <span class="token string">\'should assign the employee\'</span> <span class="token keyword">do</span>\n      <span class="token constant">EmployeeService</span><span class="token punctuation">.</span><span class="token function">stub</span><span class="token punctuation">(</span><span class="token symbol">:find_by_id</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token constant">Employee</span><span class="token punctuation">.</span><span class="token keyword">new</span> <span class="token punctuation">}</span>\n\n      get <span class="token symbol">:show</span><span class="token punctuation">,</span> id<span class="token punctuation">:</span> <span class="token string">\'employee-id\'</span>\n\n      <span class="token comment"># Can not use assigns[:employee] here because Employee inherits from Hashie</span>\n      controller<span class="token punctuation">.</span>view_assigns<span class="token punctuation">[</span><span class="token string">\'employee\'</span><span class="token punctuation">]</span><span class="token punctuation">.</span>should be_an <span class="token constant">Employee</span>\n      controller<span class="token punctuation">.</span>view_assigns<span class="token punctuation">[</span><span class="token string">\'employee\'</span><span class="token punctuation">]</span><span class="token punctuation">.</span>foo<span class="token punctuation">.</span>should <span class="token operator">==</span> <span class="token string">\'extra info\'</span>\n    <span class="token keyword">end</span>\n  <span class="token keyword">end</span>\n<span class="token keyword">end</span>\n</code></pre>\n      </div>\n<p>In the end, its an easy workaround for a slightly annoying “feature” of Rspec.</p>',frontmatter:{title:"Rails Controller Specs Don't Always Play Nice With Hashie",date:"December 26, 2012"}}},pathContext:{slug:"/rails-controller-specs-dont-always-play-nice-with-hashie/",previous:!1,next:{fields:{slug:"/fun-with-rails-i18n/"},frontmatter:{title:"Fun With Rails I18n"}}}}}});
//# sourceMappingURL=path---rails-controller-specs-dont-always-play-nice-with-hashie-52af7dfc59d6af8f8ff8.js.map