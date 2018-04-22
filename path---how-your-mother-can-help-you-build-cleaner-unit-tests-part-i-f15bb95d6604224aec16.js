webpackJsonp([0x9a4b33a49521],{451:function(n,s){n.exports={data:{site:{siteMetadata:{title:"Ryan Oglesby"}},markdownRemark:{id:"/Users/ryanoglesby/Projects/blog/src/src/pages/how-your-mother-can-help-you-build-cleaner-unit-tests/part-i/index.md absPath of file >>> MarkdownRemark",html:'<p>Over the past few months on my project, a pattern emerged for using Builders and Object Mothers to\nbuild-up objects for unit testing. We were able to keep our tests minimal and clean, decouple test\ncode from production code, and solve some design issues such as constructors with too many\nparameters. In this multi-part series, I will take you through the evolution of the pattern over a\nseries of refactorings.</p>\n<!-- more -->\n<h2>The Scenario:</h2>\n<p><em>Note: This is contrived for simplicity</em></p>\n<p><strong>The basics:</strong> We are building a system that schedules shipments of widgets to a specified address.</p>\n<p><strong>The interesting bit:</strong> We have an <code>Address</code> class that we use quite often in our tests. By “use”,\nI mean instantiate one with some valid data to either exercise it or assert against it.</p>\n<h2>1) Initial Code</h2>\n<div class="gatsby-highlight">\n      <pre class="language-java"><code class="language-java"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Address</span> <span class="token punctuation">{</span>\n  <span class="token keyword">private</span> <span class="token keyword">final</span> String lineOne<span class="token punctuation">;</span>\n  <span class="token keyword">private</span> <span class="token keyword">final</span> String lineTwo<span class="token punctuation">;</span>\n  <span class="token keyword">private</span> <span class="token keyword">final</span> String city<span class="token punctuation">;</span>\n  <span class="token keyword">private</span> String state<span class="token punctuation">;</span>\n\n  <span class="token keyword">public</span> <span class="token function">Address</span><span class="token punctuation">(</span>String lineOne<span class="token punctuation">,</span> String lineTwo<span class="token punctuation">,</span> String city<span class="token punctuation">,</span> String state<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>lineOne <span class="token operator">=</span> lineOne<span class="token punctuation">;</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>lineTwo <span class="token operator">=</span> lineTwo<span class="token punctuation">;</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>city <span class="token operator">=</span> city<span class="token punctuation">;</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> state<span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setState</span><span class="token punctuation">(</span>String state<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> state<span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token comment">// ... other methods omitted for brevity</span>\n<span class="token punctuation">}</span>\n\n\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ShippingServiceTest</span> <span class="token punctuation">{</span>\n  <span class="token keyword">private</span> Address shippingAddress<span class="token punctuation">;</span>\n\n  <span class="token annotation punctuation">@Before</span>\n  <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setUp</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    shippingAddress <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Address</span><span class="token punctuation">(</span><span class="token string">"123 Main St"</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">,</span> <span class="token string">"Chicago"</span><span class="token punctuation">,</span> <span class="token string">"IL"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token annotation punctuation">@Test</span>\n  <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">shipsToTheAddress</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    ShippingService service <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ShippingService</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    Shipment shipment <span class="token operator">=</span> service<span class="token punctuation">.</span><span class="token function">shipTo</span><span class="token punctuation">(</span>shippingAddress<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token function">assertTrue</span><span class="token punctuation">(</span>shipment<span class="token punctuation">.</span><span class="token function">wasSuccessful</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span>shipment<span class="token punctuation">.</span><span class="token function">getDeliveryAddress</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> shippingAddress<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token annotation punctuation">@Test</span>\n  <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">cannotShipToHawaii</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    ShippingService service <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ShippingService</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    shippingAddress<span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token string">"HI"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    Shipment shipment <span class="token operator">=</span> service<span class="token punctuation">.</span><span class="token function">shipTo</span><span class="token punctuation">(</span>shippingAddress<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token function">assertFalse</span><span class="token punctuation">(</span>shipment<span class="token punctuation">.</span><span class="token function">wasSuccessful</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span>shipment<span class="token punctuation">.</span><span class="token function">getFailureReason</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">"Cannot ship to Hawaii."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>The two hot spots here are the <code>Address</code> constructor and the customization of the <code>Address</code> fields\nin the tests.</p>\n<p>Let’s talk about the constructor:</p>\n<ol>\n<li><strong>It has <a href="http://c2.com/cgi/wiki?TooManyParameters">too many parameters</a></strong> - four! (And you could\nimagine a real <code>Address</code> object having at least a couple more) And, multiple parameters in a row\nof the same type is even worse. If I accidentally swap <code>state</code> and <code>city</code> my program will still\ncompile as both parameters are Strings, but it will probably fail at an unexpected time later.</li>\n<li><strong>The arbitrary values used to construct the <code>Address</code> do not reveal intention.</strong> Why “123 Main\nSt”? Why “IL”? Could I change that to be any state? Which values are effecting the outcome of\neach test and which are completely arbitrary?</li>\n<li><strong>Optional parameters.</strong> <code>lineTwo</code> seems to be optional because of the empty String. Should we\noverload the constructor instead? Provide a setter?</li>\n</ol>\n<p>And customizing the <code>Address</code> fields for each test:</p>\n<ol>\n<li><strong>Prefer immutable state.</strong> The <code>setState</code> method makes <code>Address</code> mutable. Before that, we had a\nnice, happy immutable object, as you can see by the presence of the <code>final</code> keyword on the other\ninstance fields. <br/> Because we were using the same <code>Address</code> object in many tests and we\nneeded a different value for only one field, we added a setter instead of calling the constructor\nagain. On the upside though, at least this test reveals its intention - that this test only cares\nabout the <code>state</code> field.</li>\n<li><strong>Keep test-only code out of production code.</strong> It’s very likely that <code>setState</code> was added for\nthis one test, and is not called by any production code. This is a smell that should be avoided.</li>\n</ol>\n<h2>2) Introducing a Builder</h2>\n<p>First, we attempt to give <code>Address</code> it’s immutability back and avoid adding telescoping constructors\nby introducing a <a href="http://c2.com/cgi/wiki?BuilderPattern">Builder</a>. The Builder allows us to separate\nthe steps for constructing an object from the final representation of it.</p>\n<div class="gatsby-highlight">\n      <pre class="language-java"><code class="language-java"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Address</span> <span class="token punctuation">{</span>\n  <span class="token keyword">private</span> <span class="token keyword">final</span> String lineOne<span class="token punctuation">;</span>\n  <span class="token keyword">private</span> <span class="token keyword">final</span> String lineTwo<span class="token punctuation">;</span>\n  <span class="token keyword">private</span> <span class="token keyword">final</span> String city<span class="token punctuation">;</span>\n  <span class="token keyword">private</span> <span class="token keyword">final</span> String state<span class="token punctuation">;</span>\n\n  <span class="token keyword">public</span> <span class="token function">Address</span><span class="token punctuation">(</span>String lineOne<span class="token punctuation">,</span> String lineTwo<span class="token punctuation">,</span> String city<span class="token punctuation">,</span> String state<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>lineOne <span class="token operator">=</span> lineOne<span class="token punctuation">;</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>lineTwo <span class="token operator">=</span> lineTwo<span class="token punctuation">;</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>city <span class="token operator">=</span> city<span class="token punctuation">;</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> state<span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token comment">// ... other methods omitted for brevity</span>\n<span class="token punctuation">}</span>\n\n\n<span class="token comment">// Test only builder class</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AddressBuilder</span> <span class="token punctuation">{</span>\n  <span class="token keyword">private</span> String lineOne <span class="token operator">=</span> <span class="token string">"123 Main St"</span><span class="token punctuation">;</span>\n  <span class="token keyword">private</span> String lineTwo <span class="token operator">=</span> <span class="token string">""</span><span class="token punctuation">;</span>\n  <span class="token keyword">private</span> String city <span class="token operator">=</span> <span class="token string">"Chicago"</span><span class="token punctuation">;</span>\n  <span class="token keyword">private</span> String state <span class="token operator">=</span> <span class="token string">"IL"</span><span class="token punctuation">;</span>\n\n  <span class="token keyword">public</span> AddressBuilder <span class="token function">lineOne</span><span class="token punctuation">(</span>String lineOne<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>lineOne <span class="token operator">=</span> lineOne<span class="token punctuation">;</span>\n    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token keyword">public</span> AddressBuilder <span class="token function">lineTwo</span><span class="token punctuation">(</span>String lineTwo<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>lineTwo <span class="token operator">=</span> lineTwo<span class="token punctuation">;</span>\n    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token comment">// ... other methods omitted for brevity</span>\n\n  <span class="token keyword">public</span> Address <span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Address</span><span class="token punctuation">(</span>lineOne<span class="token punctuation">,</span> lineTwo<span class="token punctuation">,</span> city<span class="token punctuation">,</span> state<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ShippingServiceTest</span> <span class="token punctuation">{</span>\n  <span class="token keyword">private</span> Address shippingAddress<span class="token punctuation">;</span>\n\n  <span class="token annotation punctuation">@Before</span>\n  <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setUp</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    shippingAddress <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">AddressBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token annotation punctuation">@Test</span>\n  <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">shipsToTheAddress</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    ShippingService service <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ShippingService</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    Shipment shipment <span class="token operator">=</span> service<span class="token punctuation">.</span><span class="token function">shipTo</span><span class="token punctuation">(</span>shippingAddress<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token function">assertTrue</span><span class="token punctuation">(</span>shipment<span class="token punctuation">.</span><span class="token function">wasSuccessful</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span>shipment<span class="token punctuation">.</span><span class="token function">getDeliveryAddress</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> shippingAddress<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token annotation punctuation">@Test</span>\n  <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">cannotShipToHawaii</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    ShippingService service <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ShippingService</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    shippingAddress <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">AddressBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">state</span><span class="token punctuation">(</span><span class="token string">"HI"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    Shipment shipment <span class="token operator">=</span> service<span class="token punctuation">.</span><span class="token function">shipTo</span><span class="token punctuation">(</span>shippingAddress<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token function">assertFalse</span><span class="token punctuation">(</span>shipment<span class="token punctuation">.</span><span class="token function">wasSuccessful</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span>shipment<span class="token punctuation">.</span><span class="token function">getFailureReason</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">"Cannot ship to Hawaii."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<table>\n  <thead>\n    <tr>\n      <th>Looking good</th>\n      <th>Needs improvement</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td>\n        <p>\n          The Builder lets tests construct <code>Address</code> instances without invoking the public constructor, reducing the coupling to it.\n        </p>\n        <p>\n          The addition of default values to the Builder pulls that arbitrary data out of the tests themselves, which further helps to highlight any tests that need a specific value, and without needing a setter.\n        </p>\n        <p>\n          <code>Address</code> is immutable. :)\n        </p>\n      </td>\n      <td>\n        <p>\n          This is yet another class to maintain.\n        </p>\n        <p>\n          By making the Builder a separate object, we still need <code>Address</code>\'s public all-args constructor. Any other test could easily bypass the builder. And, because the constructor is still there, all the problems from before remain.\n        </p>\n        <p>\n          Additionally, our Builder actually has two responsibilities. First is <em>how</em> to construct the <code>Address</code>, as in, which parameters to pass into the constructor. Second, <em>what</em> to construct it with, because the Builder has default values.\n        </p>\n      </td>\n    </tr>\n  </tbody>\n</table>\n<p><a href="/how-your-mother-can-help-you-build-cleaner-unit-tests/part-ii">Part II</a> will look at moving the\nBuilder into a static inner class to fix the constructor with too many parameters issue.</p>',frontmatter:{title:"How your 'Mother' can help you 'Build' cleaner unit tests - Part I",date:"June 23, 2016"}}},pathContext:{slug:"/how-your-mother-can-help-you-build-cleaner-unit-tests/part-i/",previous:{fields:{slug:"/yagni-aint-a-design-principle/"},frontmatter:{title:"YAGNI a'int a Design Principle"}},next:{fields:{slug:"/how-your-mother-can-help-you-build-cleaner-unit-tests/part-ii/"},frontmatter:{title:"How your 'Mother' can help you 'Build' cleaner unit tests - Part II"}}}}}});
//# sourceMappingURL=path---how-your-mother-can-help-you-build-cleaner-unit-tests-part-i-f15bb95d6604224aec16.js.map