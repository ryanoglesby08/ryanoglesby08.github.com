webpackJsonp([0x9ff3667d324],{28:function(e,t,n){"use strict";function i(e){return e&&"object"==typeof e&&"default"in e?e.default:e}var o=i(n(50)),a=/^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|accept|acceptCharset|accessKey|action|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|default|defer|dir|disabled|download|draggable|encType|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|itemProp|itemScope|itemType|itemID|itemRef|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan)|(on[A-Z].*)|((data|aria)-.*))$/,r=o(RegExp.prototype.test.bind(a));e.exports=r},31:function(e,t,n){"use strict";function i(e){return e&&"object"==typeof e&&"default"in e?e.default:e}function o(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e.__proto__=t}function a(e){this.setState({theme:e})}function r(){void 0!==this.context[p]&&(this.unsubscribe=this.context[p].subscribe(a.bind(this)))}function l(){void 0!==this.unsubscribe&&this.context[p].unsubscribe(this.unsubscribe)}function s(e,t){var n=function(i,a){function s(){return"."+u}var c,d,u,p;void 0!==a&&(c=a.e,d=a.label,u=a.target,p=a.shouldForwardProp);var v=i.__emotion_real===i,b=void 0===c?v&&i.__emotion_base||i:i;return"function"!=typeof p&&(p="string"==typeof b&&b.charAt(0)===b.charAt(0).toLowerCase()?h:m),function(){function h(){var n=this.props,i=this.state;this.mergedProps=g(y,{},n,{theme:null!==i&&i.theme||n.theme||{}});var o="",a=[];return n.className&&(o+=void 0===c?e.getRegisteredStyles(a,n.className):n.className+" "),o+=void 0===c?e.css.apply(this,w.concat(a)):c,void 0!==u&&(o+=" "+u),t.createElement(b,g(p,{},n,{className:o,ref:n.innerRef}))}var m=arguments,w=v&&void 0!==i.__emotion_styles?i.__emotion_styles.slice(0):[];if(void 0!==d&&w.push("label:"+d+";"),void 0===c)if(null==m[0]||void 0===m[0].raw)w.push.apply(w,m);else{w.push(m[0][0]);for(var S=m.length,k=1;k<S;k++)w.push(m[k],m[0][k])}var E=function(e){function t(){return e.apply(this,arguments)||this}o(t,e);var n=t.prototype;return n.componentWillMount=r,n.componentWillUnmount=l,n.render=h,t}(t.Component);return E.displayName=void 0!==d?d:"Styled("+("string"==typeof b?b:b.displayName||b.name||"Component")+")",E.contextTypes=f,E.__emotion_styles=w,E.__emotion_base=b,E.__emotion_real=E,Object.defineProperty(E,"toString",{enumerable:!1,value:s}),E.withComponent=function(e,t){return n(e,void 0!==t?g(y,{},a,t):a).apply(void 0,w)},E}};return n}var c,d=i(n(7)),u=i(n(28)),p="__EMOTION_THEMING__",f=(c={},c[p]=d.object,c),h=u,m=function(e){return"theme"!==e&&"innerRef"!==e},y=function(){return!0},g=function(e,t){for(var n=2,i=arguments.length;n<i;n++){var o=arguments[n],a=void 0;for(a in o)e(a)&&(t[a]=o[a])}return t};e.exports=s},389:function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function o(){return"undefined"==typeof k&&"undefined"!=typeof window&&window.IntersectionObserver&&(k=new window.IntersectionObserver(function(e){e.forEach(function(e){E.forEach(function(t){t[0]===e.target&&(e.isIntersecting||e.intersectionRatio>0)&&(k.unobserve(t[0]),t[1]())})})},{rootMargin:"200px"})),k}t.__esModule=!0;var a=n(34),r=i(a),l=n(53),s=i(l),c=n(52),d=i(c),u=n(174),p=i(u),f=n(173),h=i(f),m=n(2),y=i(m),g=n(391),v=i(g),b=function(e){var t=(0,h.default)({},e);return t.responsiveResolution&&(t.resolutions=t.responsiveResolution,delete t.responsiveResolution),t.responsiveSizes&&(t.sizes=t.responsiveSizes,delete t.responsiveSizes),t},w={},S=function(e){var t=b(e),n=t.sizes?t.sizes.src:t.resolutions.src;return!!w[n]||(w[n]=!0,!1)},k=void 0,E=[],T=function(e,t){o().observe(e),E.push([e,t])},x=null,_=function(){if(null!==x)return x;var e="undefined"!=typeof window?window.document.createElement("canvas"):{};return x=!(!e.getContext||!e.getContext("2d"))&&0===e.toDataURL("image/webp").indexOf("data:image/webp")},O=function(e){var t=e.src?'src="'+e.src+'" ':'src=""',n=e.srcSet?'srcset="'+e.srcSet+'" ':"",i=e.sizes?'sizes="'+e.sizes+'" ':"",o=e.title?'title="'+e.title+'" ':"",a=e.alt?'alt="'+e.alt+'" ':'alt=""',r=e.width?'width="'+e.width+'" ':"",l=e.height?'height="'+e.height+'" ':"",s=e.opacity?e.opacity:"1",c=e.transitionDelay?e.transitionDelay:"0.5s";return"<img "+r+l+t+n+a+o+i+'style="position:absolute;top:0;left:0;transition:opacity 0.5s;transition-delay:'+c+";opacity:"+s+';width:100%;height:100%;object-fit:cover;object-position:center"/>'},L=function(e){var t=e.style,n=e.onLoad,i=(0,p.default)(e,["style","onLoad"]);return y.default.createElement("img",(0,h.default)({},i,{onLoad:n,style:(0,h.default)({position:"absolute",top:0,left:0,transition:"opacity 0.5s",width:"100%",height:"100%",objectFit:"cover",objectPosition:"center"},t)}))};L.propTypes={style:v.default.object,onLoad:v.default.func};var M=function(e){function t(n){(0,r.default)(this,t);var i=(0,s.default)(this,e.call(this,n)),o=!0,a=!0,l=!1,c=S(n);return!c&&"undefined"!=typeof window&&window.IntersectionObserver&&(o=!1,a=!1,l=!0),"undefined"==typeof window&&(o=!1,a=!1),i.state={isVisible:o,imgLoaded:a,IOSupported:l},i.handleRef=i.handleRef.bind(i),i}return(0,d.default)(t,e),t.prototype.handleRef=function(e){var t=this;this.state.IOSupported&&e&&T(e,function(){t.setState({isVisible:!0,imgLoaded:!1})})},t.prototype.render=function(){var e=this,t=b(this.props),n=t.title,i=t.alt,o=t.className,a=t.outerWrapperClassName,r=t.style,l=void 0===r?{}:r,s=t.imgStyle,c=void 0===s?{}:s,d=t.sizes,u=t.resolutions,p=t.backgroundColor,f=t.Tag,m=void 0;m="boolean"==typeof p?"lightgray":p;var g=(0,h.default)({opacity:this.state.imgLoaded?0:1,transitionDelay:"0.25s"},c),v=(0,h.default)({opacity:this.state.imgLoaded||this.props.fadeIn===!1?1:0},c);if(d){var w=d;return w.srcWebp&&w.srcSetWebp&&_()&&(w.src=w.srcWebp,w.srcSet=w.srcSetWebp),y.default.createElement(f,{className:(a?a:"")+" gatsby-image-outer-wrapper",style:{position:"absolute"===l.position?"initial":"relative"}},y.default.createElement(f,{className:(o?o:"")+" gatsby-image-wrapper",style:(0,h.default)({position:"relative",overflow:"hidden"},l),ref:this.handleRef},y.default.createElement(f,{style:{width:"100%",paddingBottom:100/w.aspectRatio+"%"}}),w.base64&&y.default.createElement(L,{alt:i,title:n,src:w.base64,style:g}),w.tracedSVG&&y.default.createElement(L,{alt:i,title:n,src:w.tracedSVG,style:g}),m&&y.default.createElement(f,{title:n,style:{backgroundColor:m,position:"absolute",top:0,bottom:0,opacity:this.state.imgLoaded?0:1,transitionDelay:"0.35s",right:0,left:0}}),this.state.isVisible&&y.default.createElement(L,{alt:i,title:n,srcSet:w.srcSet,src:w.src,sizes:w.sizes,style:v,onLoad:function(){e.state.IOSupported&&e.setState({imgLoaded:!0}),e.props.onLoad&&e.props.onLoad()}}),y.default.createElement("noscript",{dangerouslySetInnerHTML:{__html:O((0,h.default)({alt:i,title:n},w))}})))}if(u){var S=u,k=(0,h.default)({position:"relative",overflow:"hidden",display:"inline-block",width:S.width,height:S.height},l);return"inherit"===l.display&&delete k.display,S.srcWebp&&S.srcSetWebp&&_()&&(S.src=S.srcWebp,S.srcSet=S.srcSetWebp),y.default.createElement(f,{className:(a?a:"")+" gatsby-image-outer-wrapper",style:{position:"absolute"===l.position?"initial":"relative"}},y.default.createElement(f,{className:(o?o:"")+" gatsby-image-wrapper",style:k,ref:this.handleRef},S.base64&&y.default.createElement(L,{alt:i,title:n,src:S.base64,style:g}),S.tracedSVG&&y.default.createElement(L,{alt:i,title:n,src:S.tracedSVG,style:g}),m&&y.default.createElement(f,{title:n,style:{backgroundColor:m,width:S.width,opacity:this.state.imgLoaded?0:1,transitionDelay:"0.25s",height:S.height}}),this.state.isVisible&&y.default.createElement(L,{alt:i,title:n,width:S.width,height:S.height,srcSet:S.srcSet,src:S.src,style:v,onLoad:function(){e.setState({imgLoaded:!0}),e.props.onLoad&&e.props.onLoad()}}),y.default.createElement("noscript",{dangerouslySetInnerHTML:{__html:O((0,h.default)({alt:i,title:n,width:S.width,height:S.height},S))}})))}return null},t}(y.default.Component);M.defaultProps={fadeIn:!0,alt:"",Tag:"div"},M.propTypes={responsiveResolution:v.default.object,responsiveSizes:v.default.object,resolutions:v.default.object,sizes:v.default.object,fadeIn:v.default.bool,title:v.default.string,alt:v.default.string,className:v.default.oneOfType([v.default.string,v.default.object]),outerWrapperClassName:v.default.oneOfType([v.default.string,v.default.object]),style:v.default.object,imgStyle:v.default.object,position:v.default.string,backgroundColor:v.default.oneOfType([v.default.string,v.default.bool]),onLoad:v.default.func,Tag:v.default.string},t.default=M},149:function(e,t,n){function i(e){var t=++a;return o(e)+t}var o=n(148),a=0;e.exports=i},9:function(e,t,n){"use strict";function i(e){return e&&"object"==typeof e&&"default"in e?e.default:e}Object.defineProperty(t,"__esModule",{value:!0});var o=i(n(2)),a=n(62),r=i(n(31)),l=r(a,o);t.default=l,Object.keys(a).forEach(function(e){t[e]=a[e]})},100:function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function o(e,t){var n={};for(var i in e)t.indexOf(i)>=0||Object.prototype.hasOwnProperty.call(e,i)&&(n[i]=e[i]);return n}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}t.__esModule=!0,t.TWITTER=t.RSS=t.LOCATION=t.LINKEDIN=t.LAPTOP=t.GITHUB=void 0;var s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e},c=n(2),d=i(c),u=n(7),p=i(u),f=n(149),h=i(f),m=t.GITHUB={d:"M8 0.198c-4.418 0-8 3.582-8 8 0 3.535 2.292 6.533 5.471 7.591 0.4 0.074 0.547-0.174 0.547-0.385 0-0.191-0.008-0.821-0.011-1.489-2.226 0.484-2.695-0.944-2.695-0.944-0.364-0.925-0.888-1.171-0.888-1.171-0.726-0.497 0.055-0.486 0.055-0.486 0.803 0.056 1.226 0.824 1.226 0.824 0.714 1.223 1.872 0.869 2.328 0.665 0.072-0.517 0.279-0.87 0.508-1.070-1.777-0.202-3.645-0.888-3.645-3.954 0-0.873 0.313-1.587 0.824-2.147-0.083-0.202-0.357-1.015 0.077-2.117 0 0 0.672-0.215 2.201 0.82 0.638-0.177 1.322-0.266 2.002-0.269 0.68 0.003 1.365 0.092 2.004 0.269 1.527-1.035 2.198-0.82 2.198-0.82 0.435 1.102 0.162 1.916 0.079 2.117 0.513 0.56 0.823 1.274 0.823 2.147 0 3.073-1.872 3.749-3.653 3.947 0.287 0.248 0.543 0.735 0.543 1.481 0 1.070-0.009 1.932-0.009 2.195 0 0.213 0.144 0.462 0.55 0.384 3.177-1.059 5.466-4.057 5.466-7.59 0-4.418-3.582-8-8-8z",allyTitle:"Github",allyDescription:"The Github logo is an octocat."},y=t.LAPTOP={d:"M14 11v-8c0-0.55-0.45-1-1-1h-10c-0.55 0-1 0.45-1 1v8h-2v3h16v-3h-2zM10 13h-4v-1h4v1zM13 11h-10v-7.998c0.001-0.001 0.001-0.001 0.002-0.002h9.996c0.001 0.001 0.001 0.001 0.002 0.002v7.998z",allyTitle:"A laptop",allyDescription:"An open laptop computer"},g=t.LINKEDIN={d:"M6 6h2.767v1.418h0.040c0.385-0.691 1.327-1.418 2.732-1.418 2.921 0 3.461 1.818 3.461 4.183v4.817h-2.885v-4.27c0-1.018-0.021-2.329-1.5-2.329-1.502 0-1.732 1.109-1.732 2.255v4.344h-2.883v-9z M1 6h3v9h-3v-9z M4 3.5c0 0.828-0.672 1.5-1.5 1.5s-1.5-0.672-1.5-1.5c0-0.828 0.672-1.5 1.5-1.5s1.5 0.672 1.5 1.5z",allyTitle:"Linked In",allyDescription:"The Linked In logo is the word in displayed in lower case text inside of a square."},v=t.LOCATION={d:"M8 0c-2.761 0-5 2.239-5 5 0 5 5 11 5 11s5-6 5-11c0-2.761-2.239-5-5-5zM8 8c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z",allyTitle:"Map pin",allyDescription:"A map pin"},b=t.RSS={d:"M2.13 11.733c-1.175 0-2.13 0.958-2.13 2.126 0 1.174 0.955 2.122 2.13 2.122 1.179 0 2.133-0.948 2.133-2.122-0-1.168-0.954-2.126-2.133-2.126zM0.002 5.436v3.067c1.997 0 3.874 0.781 5.288 2.196 1.412 1.411 2.192 3.297 2.192 5.302h3.080c-0-5.825-4.739-10.564-10.56-10.564zM0.006 0v3.068c7.122 0 12.918 5.802 12.918 12.932h3.076c0-8.82-7.176-16-15.994-16z",allyTitle:"RSS Feed",allyDescription:"The RSS Feed logo is ."},w=t.TWITTER={d:"M16 3.538c-0.588 0.263-1.222 0.438-1.884 0.516 0.678-0.406 1.197-1.050 1.444-1.816-0.634 0.375-1.338 0.65-2.084 0.797-0.6-0.638-1.453-1.034-2.397-1.034-1.813 0-3.281 1.469-3.281 3.281 0 0.256 0.028 0.506 0.084 0.747-2.728-0.138-5.147-1.444-6.766-3.431-0.281 0.484-0.444 1.050-0.444 1.65 0 1.138 0.578 2.144 1.459 2.731-0.538-0.016-1.044-0.166-1.488-0.409 0 0.013 0 0.028 0 0.041 0 1.591 1.131 2.919 2.634 3.219-0.275 0.075-0.566 0.116-0.866 0.116-0.212 0-0.416-0.022-0.619-0.059 0.419 1.303 1.631 2.253 3.066 2.281-1.125 0.881-2.538 1.406-4.078 1.406-0.266 0-0.525-0.016-0.784-0.047 1.456 0.934 3.181 1.475 5.034 1.475 6.037 0 9.341-5.003 9.341-9.341 0-0.144-0.003-0.284-0.009-0.425 0.641-0.459 1.197-1.038 1.637-1.697z",allyTitle:"Twitter",allyDescription:"The Twitter logo is a small bird in flight."},S=function(e){function t(){return a(this,t),r(this,e.apply(this,arguments))}return l(t,e),t.prototype.componentWillMount=function(){this.setState({id:(0,h.default)("icon-")})},t.prototype.render=function(){var e=this.props,t=e.icon,n=o(e,["icon"]),i=this.state.id+"_title",a=this.state.id+"_description",r=[i,a].join(" ");return d.default.createElement("svg",s({},n,{id:this.state.id,width:"16",height:"16",viewBox:"0 0 16 16",fill:"#000000",role:"link","aria-labelledby":r}),d.default.createElement("title",{id:i},t.allyTitle),d.default.createElement("desc",{id:a},t.allyDescription),d.default.createElement("path",{d:t.d}))},t}(d.default.Component);S.propTypes={icon:p.default.oneOf([m,y,g,v,b,w]).isRequired},t.default=S},279:function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}t.__esModule=!0,t.query=void 0;var o=n(2),a=i(o),r=n(9),l=i(r),s=n(96),c=i(s),d=n(389),u=i(d),p=n(21),f=n(100),h=i(f),m=(0,l.default)("div",{target:"e13mta500"})({display:"flex",flexDirection:"column","@media (min-width: 576px)":{flexDirection:"row",flexWrap:"nowrap",justifyContent:"space-between"}}),y=(0,l.default)("div",{target:"e13mta501"})({display:"flex",flexDirection:"column",marginBottom:(0,p.rhythm)(1),"@media (min-width: 576px)":{marginRight:(0,p.rhythm)(1)}}),g={borderRadius:"50%"},v=function(e){var t=e.data,n=t.site.siteMetadata.title,i=t.profilePic.resolutions;return a.default.createElement("div",null,a.default.createElement(m,null,a.default.createElement(c.default,{title:"About Me | "+n}),a.default.createElement(y,null,a.default.createElement(u.default,{alt:"Ryan's profile photo",resolutions:i,imgStyle:g}),a.default.createElement("span",null,a.default.createElement(h.default,{icon:f.LOCATION})," Denver, CO, USA"),a.default.createElement("span",null,a.default.createElement(h.default,{icon:f.LAPTOP})," Frontend Developer")),a.default.createElement("div",null,a.default.createElement("p",null,"Hi! I'm Ryan."),a.default.createElement("p",null,"I'm a software developer doing mostly frontend things these days. In particular I'm passionate about design systems, the React ecosystem, and open source software."),a.default.createElement("p",null,"When I'm not coding I'm staying active - rock climbing, snowboarding, or galavanting around the world."))),a.default.createElement("p",null,"A few of my articles are featured on the"," ",a.default.createElement("a",{href:"https://www.thoughtworks.com/profiles/ryan-oglesby"},"ThoughtWorks Insights")," blog. And I occassionally speak at Meetups and conferences."),a.default.createElement("ul",null,a.default.createElement("li",null,"ThoughtWorks XConf North America, 2018:"," ",a.default.createElement("a",{href:"https://thoughtworks.wistia.com/medias/k859w116wy"},'"Scaling the front end"')),a.default.createElement("li",null,"Various Meetups, 2018:"," ",a.default.createElement("a",{href:"https://speakerdeck.com/ryanoglesby08/engineering-a-design-system"},'"Engineering a design system"'),"; ",a.default.createElement("a",{href:"https://www.youtube.com/watch?v=n5_FK_QZsq4"},"Video from React Chicago")),a.default.createElement("li",null,"Chicago Coders Conference, 2017:"," ",a.default.createElement("a",{href:"https://speakerdeck.com/ryanoglesby08/ui-components-by-design-bridging-the-designer-developer-gap"},'"UI Components by Design: Bridging the Designer Developer Gap"')),a.default.createElement("li",null,'OSCON, 2016: "Transitioning to Microservices" (workshop)')))};t.default=v;t.query="** extracted graphql fragment **"}});
//# sourceMappingURL=component---src-pages-about-index-js-1e3ef197043d2ec403ea.js.map