"undefined"==typeof WeakMap&&!function(){var a=Object.defineProperty,b=Date.now()%1e9,c=function(){this.name="__st"+(1e9*Math.random()>>>0)+(b++ +"__")};c.prototype={set:function(b,c){var d=b[this.name];return d&&d[0]===b?d[1]=c:a(b,this.name,{value:[b,c],writable:!0}),this},get:function(a){var b;return(b=a[this.name])&&b[0]===a?b[1]:void 0},"delete":function(a){var b=a[this.name];return b&&b[0]===a?(b[0]=b[1]=void 0,!0):!1},has:function(a){var b=a[this.name];return b?b[0]===a:!1}},window.WeakMap=c}(),function(a){function b(a){u.push(a),t||(t=!0,p(d))}function c(a){return window.ShadowDOMPolyfill&&window.ShadowDOMPolyfill.wrapIfNeeded(a)||a}function d(){t=!1;var a=u;u=[],a.sort(function(a,b){return a.uid_-b.uid_});var b=!1;a.forEach(function(a){var c=a.takeRecords();e(a),c.length&&(a.callback_(c,a),b=!0)}),b&&d()}function e(a){a.nodes_.forEach(function(b){var c=q.get(b);c&&c.forEach(function(b){b.observer===a&&b.removeTransientObservers()})})}function f(a,b){for(var c=a;c;c=c.parentNode){var d=q.get(c);if(d)for(var e=0;e<d.length;e++){var f=d[e],g=f.options;if(c===a||g.subtree){var h=b(g);h&&f.enqueue(h)}}}}function g(a){this.callback_=a,this.nodes_=[],this.records_=[],this.uid_=++v}function h(a,b){this.type=a,this.target=b,this.addedNodes=[],this.removedNodes=[],this.previousSibling=null,this.nextSibling=null,this.attributeName=null,this.attributeNamespace=null,this.oldValue=null}function i(a){var b=new h(a.type,a.target);return b.addedNodes=a.addedNodes.slice(),b.removedNodes=a.removedNodes.slice(),b.previousSibling=a.previousSibling,b.nextSibling=a.nextSibling,b.attributeName=a.attributeName,b.attributeNamespace=a.attributeNamespace,b.oldValue=a.oldValue,b}function j(a,b){return w=new h(a,b)}function k(a){return x?x:(x=i(w),x.oldValue=a,x)}function l(){w=x=void 0}function m(a){return a===x||a===w}function n(a,b){return a===b?a:x&&m(a)?x:null}function o(a,b,c){this.observer=a,this.target=b,this.options=c,this.transientObservedNodes=[]}var p,q=new WeakMap;if(/Trident|Edge/.test(navigator.userAgent))p=setTimeout;else if(window.setImmediate)p=window.setImmediate;else{var r=[],s=String(Math.random());window.addEventListener("message",function(a){if(a.data===s){var b=r;r=[],b.forEach(function(a){a()})}}),p=function(a){r.push(a),window.postMessage(s,"*")}}var t=!1,u=[],v=0;g.prototype={observe:function(a,b){if(a=c(a),!b.childList&&!b.attributes&&!b.characterData||b.attributeOldValue&&!b.attributes||b.attributeFilter&&b.attributeFilter.length&&!b.attributes||b.characterDataOldValue&&!b.characterData)throw new SyntaxError;var d=q.get(a);d||q.set(a,d=[]);for(var e,f=0;f<d.length;f++)if(d[f].observer===this){e=d[f],e.removeListeners(),e.options=b;break}e||(e=new o(this,a,b),d.push(e),this.nodes_.push(a)),e.addListeners()},disconnect:function(){this.nodes_.forEach(function(a){for(var b=q.get(a),c=0;c<b.length;c++){var d=b[c];if(d.observer===this){d.removeListeners(),b.splice(c,1);break}}},this),this.records_=[]},takeRecords:function(){var a=this.records_;return this.records_=[],a}};var w,x;o.prototype={enqueue:function(a){var c=this.observer.records_,d=c.length;if(c.length>0){var e=c[d-1],f=n(e,a);if(f)return void(c[d-1]=f)}else b(this.observer);c[d]=a},addListeners:function(){this.addListeners_(this.target)},addListeners_:function(a){var b=this.options;b.attributes&&a.addEventListener("DOMAttrModified",this,!0),b.characterData&&a.addEventListener("DOMCharacterDataModified",this,!0),b.childList&&a.addEventListener("DOMNodeInserted",this,!0),(b.childList||b.subtree)&&a.addEventListener("DOMNodeRemoved",this,!0)},removeListeners:function(){this.removeListeners_(this.target)},removeListeners_:function(a){var b=this.options;b.attributes&&a.removeEventListener("DOMAttrModified",this,!0),b.characterData&&a.removeEventListener("DOMCharacterDataModified",this,!0),b.childList&&a.removeEventListener("DOMNodeInserted",this,!0),(b.childList||b.subtree)&&a.removeEventListener("DOMNodeRemoved",this,!0)},addTransientObserver:function(a){if(a!==this.target){this.addListeners_(a),this.transientObservedNodes.push(a);var b=q.get(a);b||q.set(a,b=[]),b.push(this)}},removeTransientObservers:function(){var a=this.transientObservedNodes;this.transientObservedNodes=[],a.forEach(function(a){this.removeListeners_(a);for(var b=q.get(a),c=0;c<b.length;c++)if(b[c]===this){b.splice(c,1);break}},this)},handleEvent:function(a){switch(a.stopImmediatePropagation(),a.type){case"DOMAttrModified":var b=a.attrName,c=a.relatedNode.namespaceURI,d=a.target,e=new j("attributes",d);e.attributeName=b,e.attributeNamespace=c;var g=a.attrChange===MutationEvent.ADDITION?null:a.prevValue;f(d,function(a){return!a.attributes||a.attributeFilter&&a.attributeFilter.length&&-1===a.attributeFilter.indexOf(b)&&-1===a.attributeFilter.indexOf(c)?void 0:a.attributeOldValue?k(g):e});break;case"DOMCharacterDataModified":var d=a.target,e=j("characterData",d),g=a.prevValue;f(d,function(a){return a.characterData?a.characterDataOldValue?k(g):e:void 0});break;case"DOMNodeRemoved":this.addTransientObserver(a.target);case"DOMNodeInserted":var h,i,m=a.target;"DOMNodeInserted"===a.type?(h=[m],i=[]):(h=[],i=[m]);var n=m.previousSibling,o=m.nextSibling,e=j("childList",a.target.parentNode);e.addedNodes=h,e.removedNodes=i,e.previousSibling=n,e.nextSibling=o,f(a.relatedNode,function(a){return a.childList?e:void 0})}l()}},a.JsMutationObserver=g,a.MutationObserver||(a.MutationObserver=g)}(window),window.CustomElements=window.CustomElements||{flags:{}},function(a){var b=a.flags,c=[],d=function(a){c.push(a)},e=function(){c.forEach(function(b){b(a)})};a.addModule=d,a.initializeModules=e,a.hasNative=Boolean(document.registerElement),a.isIE=/Trident/.test(navigator.userAgent),a.useNative=!b.register&&a.hasNative&&!window.ShadowDOMPolyfill&&(!window.HTMLImports||window.HTMLImports.useNative)}(window.CustomElements),window.CustomElements.addModule(function(a){function b(a,b){c(a,function(a){return b(a)?!0:void d(a,b)}),d(a,b)}function c(a,b,d){var e=a.firstElementChild;if(!e)for(e=a.firstChild;e&&e.nodeType!==Node.ELEMENT_NODE;)e=e.nextSibling;for(;e;)b(e,d)!==!0&&c(e,b,d),e=e.nextElementSibling;return null}function d(a,c){for(var d=a.shadowRoot;d;)b(d,c),d=d.olderShadowRoot}function e(a,b){f(a,b,[])}function f(a,b,c){if(a=window.wrap(a),!(c.indexOf(a)>=0)){c.push(a);for(var d,e=a.querySelectorAll("link[rel="+g+"]"),h=0,i=e.length;i>h&&(d=e[h]);h++)d["import"]&&f(d["import"],b,c);b(a)}}var g=window.HTMLImports?window.HTMLImports.IMPORT_LINK_TYPE:"none";a.forDocumentTree=e,a.forSubtree=b}),window.CustomElements.addModule(function(a){function b(a,b){return c(a,b)||d(a,b)}function c(b,c){return a.upgrade(b,c)?!0:void(c&&g(b))}function d(a,b){t(a,function(a){return c(a,b)?!0:void 0})}function e(a){x.push(a),w||(w=!0,setTimeout(f))}function f(){w=!1;for(var a,b=x,c=0,d=b.length;d>c&&(a=b[c]);c++)a();x=[]}function g(a){v?e(function(){h(a)}):h(a)}function h(a){a.__upgraded__&&!a.__attached&&(a.__attached=!0,a.attachedCallback&&a.attachedCallback())}function i(a){j(a),t(a,function(a){j(a)})}function j(a){v?e(function(){k(a)}):k(a)}function k(a){a.__upgraded__&&a.__attached&&(a.__attached=!1,a.detachedCallback&&a.detachedCallback())}function l(a){for(var b=a,c=window.wrap(document);b;){if(b==c)return!0;b=b.parentNode||b.nodeType===Node.DOCUMENT_FRAGMENT_NODE&&b.host}}function m(a){if(a.shadowRoot&&!a.shadowRoot.__watched){s.dom&&console.log("watching shadow-root for: ",a.localName);for(var b=a.shadowRoot;b;)p(b),b=b.olderShadowRoot}}function n(a,c){if(s.dom){var d=c[0];if(d&&"childList"===d.type&&d.addedNodes&&d.addedNodes){for(var e=d.addedNodes[0];e&&e!==document&&!e.host;)e=e.parentNode;var f=e&&(e.URL||e._URL||e.host&&e.host.localName)||"";f=f.split("/?").shift().split("/").pop()}console.group("mutations (%d) [%s]",c.length,f||"")}var g=l(a);c.forEach(function(a){"childList"===a.type&&(y(a.addedNodes,function(a){a.localName&&b(a,g)}),y(a.removedNodes,function(a){a.localName&&i(a)}))}),s.dom&&console.groupEnd()}function o(a){for(a=window.wrap(a),a||(a=window.wrap(document));a.parentNode;)a=a.parentNode;var b=a.__observer;b&&(n(a,b.takeRecords()),f())}function p(a){if(!a.__observer){var b=new MutationObserver(n.bind(this,a));b.observe(a,{childList:!0,subtree:!0}),a.__observer=b}}function q(a){a=window.wrap(a),s.dom&&console.group("upgradeDocument: ",a.baseURI.split("/").pop());var c=a===window.wrap(document);b(a,c),p(a),s.dom&&console.groupEnd()}function r(a){u(a,q)}var s=a.flags,t=a.forSubtree,u=a.forDocumentTree,v=!window.MutationObserver||window.MutationObserver===window.JsMutationObserver;a.hasPolyfillMutations=v;var w=!1,x=[],y=Array.prototype.forEach.call.bind(Array.prototype.forEach),z=Element.prototype.createShadowRoot;z&&(Element.prototype.createShadowRoot=function(){var a=z.call(this);return window.CustomElements.watchShadow(this),a}),a.watchShadow=m,a.upgradeDocumentTree=r,a.upgradeDocument=q,a.upgradeSubtree=d,a.upgradeAll=b,a.attached=g,a.takeRecords=o}),window.CustomElements.addModule(function(a){function b(b,d){if(!b.__upgraded__&&b.nodeType===Node.ELEMENT_NODE){var e=b.getAttribute("is"),f=a.getRegisteredDefinition(b.localName)||a.getRegisteredDefinition(e);if(f&&(e&&f.tag==b.localName||!e&&!f["extends"]))return c(b,f,d)}}function c(b,c,e){return g.upgrade&&console.group("upgrade:",b.localName),c.is&&b.setAttribute("is",c.is),d(b,c),b.__upgraded__=!0,f(b),e&&a.attached(b),a.upgradeSubtree(b,e),g.upgrade&&console.groupEnd(),b}function d(a,b){Object.__proto__?a.__proto__=b.prototype:(e(a,b.prototype,b["native"]),a.__proto__=b.prototype)}function e(a,b,c){for(var d={},e=b;e!==c&&e!==HTMLElement.prototype;){for(var f,g=Object.getOwnPropertyNames(e),h=0;f=g[h];h++)d[f]||(Object.defineProperty(a,f,Object.getOwnPropertyDescriptor(e,f)),d[f]=1);e=Object.getPrototypeOf(e)}}function f(a){a.createdCallback&&a.createdCallback()}var g=a.flags;a.upgrade=b,a.upgradeWithDefinition=c,a.implementPrototype=d}),window.CustomElements.addModule(function(a){function b(b,d){var i=d||{};if(!b)throw new Error("document.registerElement: first argument `name` must not be empty");if(b.indexOf("-")<0)throw new Error("document.registerElement: first argument ('name') must contain a dash ('-'). Argument provided was '"+String(b)+"'.");if(e(b))throw new Error("Failed to execute 'registerElement' on 'Document': Registration failed for type '"+String(b)+"'. The type name is invalid.");if(j(b))throw new Error("DuplicateDefinitionError: a type with name '"+String(b)+"' is already registered");return i.prototype||(i.prototype=Object.create(HTMLElement.prototype)),i.__name=b.toLowerCase(),i.lifecycle=i.lifecycle||{},i.ancestry=f(i["extends"]),g(i),h(i),c(i.prototype),k(i.__name,i),i.ctor=l(i),i.ctor.prototype=i.prototype,i.prototype.constructor=i.ctor,a.ready&&r(document),i.ctor}function c(a){if(!a.setAttribute._polyfilled){var b=a.setAttribute;a.setAttribute=function(a,c){d.call(this,a,c,b)};var c=a.removeAttribute;a.removeAttribute=function(a){d.call(this,a,null,c)},a.setAttribute._polyfilled=!0}}function d(a,b,c){a=a.toLowerCase();var d=this.getAttribute(a);c.apply(this,arguments);var e=this.getAttribute(a);this.attributeChangedCallback&&e!==d&&this.attributeChangedCallback(a,d,e)}function e(a){for(var b=0;b<w.length;b++)if(a===w[b])return!0}function f(a){var b=j(a);return b?f(b["extends"]).concat([b]):[]}function g(a){for(var b,c=a["extends"],d=0;b=a.ancestry[d];d++)c=b.is&&b.tag;a.tag=c||a.__name,c&&(a.is=a.__name)}function h(a){if(!Object.__proto__){var b=HTMLElement.prototype;if(a.is){var c=document.createElement(a.tag);b=Object.getPrototypeOf(c)}for(var d,e=a.prototype,f=!1;e;)e==b&&(f=!0),d=Object.getPrototypeOf(e),d&&(e.__proto__=d),e=d;f||console.warn(a.tag+" prototype not found in prototype chain for "+a.is),a["native"]=b}}function i(a){return t(z(a.tag),a)}function j(a){return a?x[a.toLowerCase()]:void 0}function k(a,b){x[a]=b}function l(a){return function(){return i(a)}}function m(a,b,c){return a===y?n(b,c):A(a,b)}function n(a,b){a&&(a=a.toLowerCase()),b&&(b=b.toLowerCase());var c=j(b||a);if(c){if(a==c.tag&&b==c.is)return new c.ctor;if(!b&&!c.is)return new c.ctor}var d;return b?(d=n(a),d.setAttribute("is",b),d):(d=z(a),a.indexOf("-")>=0&&u(d,HTMLElement),d)}function o(a,b){var c=a[b];a[b]=function(){var a=c.apply(this,arguments);return s(a),a}}var p,q=a.isIE,r=a.upgradeDocumentTree,s=a.upgradeAll,t=a.upgradeWithDefinition,u=a.implementPrototype,v=a.useNative,w=["annotation-xml","color-profile","font-face","font-face-src","font-face-uri","font-face-format","font-face-name","missing-glyph"],x={},y="http://www.w3.org/1999/xhtml",z=document.createElement.bind(document),A=document.createElementNS.bind(document);p=Object.__proto__||v?function(a,b){return a instanceof b}:function(a,b){if(a instanceof b)return!0;for(var c=a;c;){if(c===b.prototype)return!0;c=c.__proto__}return!1},o(Node.prototype,"cloneNode"),o(document,"importNode"),q&&!function(){var a=document.importNode;document.importNode=function(){var b=a.apply(document,arguments);if(b.nodeType==b.DOCUMENT_FRAGMENT_NODE){var c=document.createDocumentFragment();return c.appendChild(b),c}return b}}(),document.registerElement=b,document.createElement=n,document.createElementNS=m,a.registry=x,a["instanceof"]=p,a.reservedTagList=w,a.getRegisteredDefinition=j,document.register=document.registerElement}),function(a){function b(){g(window.wrap(document)),window.CustomElements.ready=!0;var a=window.requestAnimationFrame||function(a){setTimeout(a,16)};a(function(){setTimeout(function(){window.CustomElements.readyTime=Date.now(),window.HTMLImports&&(window.CustomElements.elapsed=window.CustomElements.readyTime-window.HTMLImports.readyTime),document.dispatchEvent(new CustomEvent("WebComponentsReady",{bubbles:!0}))})})}var c=a.useNative,d=a.initializeModules,e=a.isIE;if(c){var f=function(){};a.watchShadow=f,a.upgrade=f,a.upgradeAll=f,a.upgradeDocumentTree=f,a.upgradeSubtree=f,a.takeRecords=f,a["instanceof"]=function(a,b){return a instanceof b}}else d();var g=a.upgradeDocumentTree,h=a.upgradeDocument;if(window.wrap||(window.ShadowDOMPolyfill?(window.wrap=window.ShadowDOMPolyfill.wrapIfNeeded,window.unwrap=window.ShadowDOMPolyfill.unwrapIfNeeded):window.wrap=window.unwrap=function(a){return a}),window.HTMLImports&&(window.HTMLImports.__importsParsingHook=function(a){a["import"]&&h(wrap(a["import"]))}),e&&"function"!=typeof window.CustomEvent&&(window.CustomEvent=function(a,b){b=b||{};var c=document.createEvent("CustomEvent");return c.initCustomEvent(a,Boolean(b.bubbles),Boolean(b.cancelable),b.detail),c.preventDefault=function(){Object.defineProperty(this,"defaultPrevented",{get:function(){return!0}})},c},window.CustomEvent.prototype=window.Event.prototype),"complete"===document.readyState||a.flags.eager)b();else if("interactive"!==document.readyState||window.attachEvent||window.HTMLImports&&!window.HTMLImports.ready){var i=window.HTMLImports&&!window.HTMLImports.ready?"HTMLImportsLoaded":"DOMContentLoaded";window.addEventListener(i,b)}else b()}(window.CustomElements);