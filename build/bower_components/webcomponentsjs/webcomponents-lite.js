window.WebComponents=window.WebComponents||{},function(a){var b=a.flags||{},c="webcomponents-lite.js",d=document.querySelector('script[src*="'+c+'"]');if(!b.noOpts){if(location.search.slice(1).split("&").forEach(function(a){var c,d=a.split("=");d[0]&&(c=d[0].match(/wc-(.+)/))&&(b[c[1]]=d[1]||!0)}),d)for(var e,f=0;e=d.attributes[f];f++)"src"!==e.name&&(b[e.name]=e.value||!0);if(b.log){var g=b.log.split(",");b.log={},g.forEach(function(a){b.log[a]=!0})}else b.log={}}b.shadow=b.shadow||b.shadowdom||b.polyfill,"native"===b.shadow?b.shadow=!1:b.shadow=b.shadow||!HTMLElement.prototype.createShadowRoot,b.register&&(window.CustomElements=window.CustomElements||{flags:{}},window.CustomElements.flags.register=b.register),a.flags=b}(window.WebComponents),function(a){"use strict";function b(a){return void 0!==m[a]}function c(){h.call(this),this._isInvalid=!0}function d(a){return""==a&&c.call(this),a.toLowerCase()}function e(a){var b=a.charCodeAt(0);return b>32&&127>b&&-1==[34,35,60,62,63,96].indexOf(b)?a:encodeURIComponent(a)}function f(a){var b=a.charCodeAt(0);return b>32&&127>b&&-1==[34,35,60,62,96].indexOf(b)?a:encodeURIComponent(a)}function g(a,g,h){function i(a){t.push(a)}var j=g||"scheme start",k=0,l="",r=!1,s=!1,t=[];a:for(;(a[k-1]!=o||0==k)&&!this._isInvalid;){var u=a[k];switch(j){case"scheme start":if(!u||!p.test(u)){if(g){i("Invalid scheme.");break a}l="",j="no scheme";continue}l+=u.toLowerCase(),j="scheme";break;case"scheme":if(u&&q.test(u))l+=u.toLowerCase();else{if(":"!=u){if(g){if(o==u)break a;i("Code point not allowed in scheme: "+u);break a}l="",k=0,j="no scheme";continue}if(this._scheme=l,l="",g)break a;b(this._scheme)&&(this._isRelative=!0),j="file"==this._scheme?"relative":this._isRelative&&h&&h._scheme==this._scheme?"relative or authority":this._isRelative?"authority first slash":"scheme data"}break;case"scheme data":"?"==u?(this._query="?",j="query"):"#"==u?(this._fragment="#",j="fragment"):o!=u&&"	"!=u&&"\n"!=u&&"\r"!=u&&(this._schemeData+=e(u));break;case"no scheme":if(h&&b(h._scheme)){j="relative";continue}i("Missing scheme."),c.call(this);break;case"relative or authority":if("/"!=u||"/"!=a[k+1]){i("Expected /, got: "+u),j="relative";continue}j="authority ignore slashes";break;case"relative":if(this._isRelative=!0,"file"!=this._scheme&&(this._scheme=h._scheme),o==u){this._host=h._host,this._port=h._port,this._path=h._path.slice(),this._query=h._query,this._username=h._username,this._password=h._password;break a}if("/"==u||"\\"==u)"\\"==u&&i("\\ is an invalid code point."),j="relative slash";else if("?"==u)this._host=h._host,this._port=h._port,this._path=h._path.slice(),this._query="?",this._username=h._username,this._password=h._password,j="query";else{if("#"!=u){var v=a[k+1],w=a[k+2];("file"!=this._scheme||!p.test(u)||":"!=v&&"|"!=v||o!=w&&"/"!=w&&"\\"!=w&&"?"!=w&&"#"!=w)&&(this._host=h._host,this._port=h._port,this._username=h._username,this._password=h._password,this._path=h._path.slice(),this._path.pop()),j="relative path";continue}this._host=h._host,this._port=h._port,this._path=h._path.slice(),this._query=h._query,this._fragment="#",this._username=h._username,this._password=h._password,j="fragment"}break;case"relative slash":if("/"!=u&&"\\"!=u){"file"!=this._scheme&&(this._host=h._host,this._port=h._port,this._username=h._username,this._password=h._password),j="relative path";continue}"\\"==u&&i("\\ is an invalid code point."),j="file"==this._scheme?"file host":"authority ignore slashes";break;case"authority first slash":if("/"!=u){i("Expected '/', got: "+u),j="authority ignore slashes";continue}j="authority second slash";break;case"authority second slash":if(j="authority ignore slashes","/"!=u){i("Expected '/', got: "+u);continue}break;case"authority ignore slashes":if("/"!=u&&"\\"!=u){j="authority";continue}i("Expected authority, got: "+u);break;case"authority":if("@"==u){r&&(i("@ already seen."),l+="%40"),r=!0;for(var x=0;x<l.length;x++){var y=l[x];if("	"!=y&&"\n"!=y&&"\r"!=y)if(":"!=y||null!==this._password){var z=e(y);null!==this._password?this._password+=z:this._username+=z}else this._password="";else i("Invalid whitespace in authority.")}l=""}else{if(o==u||"/"==u||"\\"==u||"?"==u||"#"==u){k-=l.length,l="",j="host";continue}l+=u}break;case"file host":if(o==u||"/"==u||"\\"==u||"?"==u||"#"==u){2!=l.length||!p.test(l[0])||":"!=l[1]&&"|"!=l[1]?0==l.length?j="relative path start":(this._host=d.call(this,l),l="",j="relative path start"):j="relative path";continue}"	"==u||"\n"==u||"\r"==u?i("Invalid whitespace in file host."):l+=u;break;case"host":case"hostname":if(":"!=u||s){if(o==u||"/"==u||"\\"==u||"?"==u||"#"==u){if(this._host=d.call(this,l),l="",j="relative path start",g)break a;continue}"	"!=u&&"\n"!=u&&"\r"!=u?("["==u?s=!0:"]"==u&&(s=!1),l+=u):i("Invalid code point in host/hostname: "+u)}else if(this._host=d.call(this,l),l="",j="port","hostname"==g)break a;break;case"port":if(/[0-9]/.test(u))l+=u;else{if(o==u||"/"==u||"\\"==u||"?"==u||"#"==u||g){if(""!=l){var A=parseInt(l,10);A!=m[this._scheme]&&(this._port=A+""),l=""}if(g)break a;j="relative path start";continue}"	"==u||"\n"==u||"\r"==u?i("Invalid code point in port: "+u):c.call(this)}break;case"relative path start":if("\\"==u&&i("'\\' not allowed in path."),j="relative path","/"!=u&&"\\"!=u)continue;break;case"relative path":if(o!=u&&"/"!=u&&"\\"!=u&&(g||"?"!=u&&"#"!=u))"	"!=u&&"\n"!=u&&"\r"!=u&&(l+=e(u));else{"\\"==u&&i("\\ not allowed in relative path.");var B;(B=n[l.toLowerCase()])&&(l=B),".."==l?(this._path.pop(),"/"!=u&&"\\"!=u&&this._path.push("")):"."==l&&"/"!=u&&"\\"!=u?this._path.push(""):"."!=l&&("file"==this._scheme&&0==this._path.length&&2==l.length&&p.test(l[0])&&"|"==l[1]&&(l=l[0]+":"),this._path.push(l)),l="","?"==u?(this._query="?",j="query"):"#"==u&&(this._fragment="#",j="fragment")}break;case"query":g||"#"!=u?o!=u&&"	"!=u&&"\n"!=u&&"\r"!=u&&(this._query+=f(u)):(this._fragment="#",j="fragment");break;case"fragment":o!=u&&"	"!=u&&"\n"!=u&&"\r"!=u&&(this._fragment+=u)}k++}}function h(){this._scheme="",this._schemeData="",this._username="",this._password=null,this._host="",this._port="",this._path=[],this._query="",this._fragment="",this._isInvalid=!1,this._isRelative=!1}function i(a,b){void 0===b||b instanceof i||(b=new i(String(b))),this._url=a,h.call(this);var c=a.replace(/^[ \t\r\n\f]+|[ \t\r\n\f]+$/g,"");g.call(this,c,null,b)}var j=!1;if(!a.forceJURL)try{var k=new URL("b","http://a");k.pathname="c%20d",j="http://a/c%20d"===k.href}catch(l){}if(!j){var m=Object.create(null);m.ftp=21,m.file=0,m.gopher=70,m.http=80,m.https=443,m.ws=80,m.wss=443;var n=Object.create(null);n["%2e"]=".",n[".%2e"]="..",n["%2e."]="..",n["%2e%2e"]="..";var o=void 0,p=/[a-zA-Z]/,q=/[a-zA-Z0-9\+\-\.]/;i.prototype={toString:function(){return this.href},get href(){if(this._isInvalid)return this._url;var a="";return(""!=this._username||null!=this._password)&&(a=this._username+(null!=this._password?":"+this._password:"")+"@"),this.protocol+(this._isRelative?"//"+a+this.host:"")+this.pathname+this._query+this._fragment},set href(a){h.call(this),g.call(this,a)},get protocol(){return this._scheme+":"},set protocol(a){this._isInvalid||g.call(this,a+":","scheme start")},get host(){return this._isInvalid?"":this._port?this._host+":"+this._port:this._host},set host(a){!this._isInvalid&&this._isRelative&&g.call(this,a,"host")},get hostname(){return this._host},set hostname(a){!this._isInvalid&&this._isRelative&&g.call(this,a,"hostname")},get port(){return this._port},set port(a){!this._isInvalid&&this._isRelative&&g.call(this,a,"port")},get pathname(){return this._isInvalid?"":this._isRelative?"/"+this._path.join("/"):this._schemeData},set pathname(a){!this._isInvalid&&this._isRelative&&(this._path=[],g.call(this,a,"relative path start"))},get search(){return this._isInvalid||!this._query||"?"==this._query?"":this._query},set search(a){!this._isInvalid&&this._isRelative&&(this._query="?","?"==a[0]&&(a=a.slice(1)),g.call(this,a,"query"))},get hash(){return this._isInvalid||!this._fragment||"#"==this._fragment?"":this._fragment},set hash(a){this._isInvalid||(this._fragment="#","#"==a[0]&&(a=a.slice(1)),g.call(this,a,"fragment"))},get origin(){var a;if(this._isInvalid||!this._scheme)return"";switch(this._scheme){case"data":case"file":case"javascript":case"mailto":return"null"}return a=this.host,a?this._scheme+"://"+a:""}};var r=a.URL;r&&(i.createObjectURL=function(a){return r.createObjectURL.apply(r,arguments)},i.revokeObjectURL=function(a){r.revokeObjectURL(a)}),a.URL=i}}(this),"undefined"==typeof WeakMap&&!function(){var a=Object.defineProperty,b=Date.now()%1e9,c=function(){this.name="__st"+(1e9*Math.random()>>>0)+(b++ +"__")};c.prototype={set:function(b,c){var d=b[this.name];return d&&d[0]===b?d[1]=c:a(b,this.name,{value:[b,c],writable:!0}),this},get:function(a){var b;return(b=a[this.name])&&b[0]===a?b[1]:void 0},"delete":function(a){var b=a[this.name];return b&&b[0]===a?(b[0]=b[1]=void 0,!0):!1},has:function(a){var b=a[this.name];return b?b[0]===a:!1}},window.WeakMap=c}(),function(a){function b(a){u.push(a),t||(t=!0,p(d))}function c(a){return window.ShadowDOMPolyfill&&window.ShadowDOMPolyfill.wrapIfNeeded(a)||a}function d(){t=!1;var a=u;u=[],a.sort(function(a,b){return a.uid_-b.uid_});var b=!1;a.forEach(function(a){var c=a.takeRecords();e(a),c.length&&(a.callback_(c,a),b=!0)}),b&&d()}function e(a){a.nodes_.forEach(function(b){var c=q.get(b);c&&c.forEach(function(b){b.observer===a&&b.removeTransientObservers()})})}function f(a,b){for(var c=a;c;c=c.parentNode){var d=q.get(c);if(d)for(var e=0;e<d.length;e++){var f=d[e],g=f.options;if(c===a||g.subtree){var h=b(g);h&&f.enqueue(h)}}}}function g(a){this.callback_=a,this.nodes_=[],this.records_=[],this.uid_=++v}function h(a,b){this.type=a,this.target=b,this.addedNodes=[],this.removedNodes=[],this.previousSibling=null,this.nextSibling=null,this.attributeName=null,this.attributeNamespace=null,this.oldValue=null}function i(a){var b=new h(a.type,a.target);return b.addedNodes=a.addedNodes.slice(),b.removedNodes=a.removedNodes.slice(),b.previousSibling=a.previousSibling,b.nextSibling=a.nextSibling,b.attributeName=a.attributeName,b.attributeNamespace=a.attributeNamespace,b.oldValue=a.oldValue,b}function j(a,b){return w=new h(a,b)}function k(a){return x?x:(x=i(w),x.oldValue=a,x)}function l(){w=x=void 0}function m(a){return a===x||a===w}function n(a,b){return a===b?a:x&&m(a)?x:null}function o(a,b,c){this.observer=a,this.target=b,this.options=c,this.transientObservedNodes=[]}var p,q=new WeakMap;if(/Trident|Edge/.test(navigator.userAgent))p=setTimeout;else if(window.setImmediate)p=window.setImmediate;else{var r=[],s=String(Math.random());window.addEventListener("message",function(a){if(a.data===s){var b=r;r=[],b.forEach(function(a){a()})}}),p=function(a){r.push(a),window.postMessage(s,"*")}}var t=!1,u=[],v=0;g.prototype={observe:function(a,b){if(a=c(a),!b.childList&&!b.attributes&&!b.characterData||b.attributeOldValue&&!b.attributes||b.attributeFilter&&b.attributeFilter.length&&!b.attributes||b.characterDataOldValue&&!b.characterData)throw new SyntaxError;var d=q.get(a);d||q.set(a,d=[]);for(var e,f=0;f<d.length;f++)if(d[f].observer===this){e=d[f],e.removeListeners(),e.options=b;break}e||(e=new o(this,a,b),d.push(e),this.nodes_.push(a)),e.addListeners()},disconnect:function(){this.nodes_.forEach(function(a){for(var b=q.get(a),c=0;c<b.length;c++){var d=b[c];if(d.observer===this){d.removeListeners(),b.splice(c,1);break}}},this),this.records_=[]},takeRecords:function(){var a=this.records_;return this.records_=[],a}};var w,x;o.prototype={enqueue:function(a){var c=this.observer.records_,d=c.length;if(c.length>0){var e=c[d-1],f=n(e,a);if(f)return void(c[d-1]=f)}else b(this.observer);c[d]=a},addListeners:function(){this.addListeners_(this.target)},addListeners_:function(a){var b=this.options;b.attributes&&a.addEventListener("DOMAttrModified",this,!0),b.characterData&&a.addEventListener("DOMCharacterDataModified",this,!0),b.childList&&a.addEventListener("DOMNodeInserted",this,!0),(b.childList||b.subtree)&&a.addEventListener("DOMNodeRemoved",this,!0)},removeListeners:function(){this.removeListeners_(this.target)},removeListeners_:function(a){var b=this.options;b.attributes&&a.removeEventListener("DOMAttrModified",this,!0),b.characterData&&a.removeEventListener("DOMCharacterDataModified",this,!0),b.childList&&a.removeEventListener("DOMNodeInserted",this,!0),(b.childList||b.subtree)&&a.removeEventListener("DOMNodeRemoved",this,!0)},addTransientObserver:function(a){if(a!==this.target){this.addListeners_(a),this.transientObservedNodes.push(a);var b=q.get(a);b||q.set(a,b=[]),b.push(this)}},removeTransientObservers:function(){var a=this.transientObservedNodes;this.transientObservedNodes=[],a.forEach(function(a){this.removeListeners_(a);for(var b=q.get(a),c=0;c<b.length;c++)if(b[c]===this){b.splice(c,1);break}},this)},handleEvent:function(a){switch(a.stopImmediatePropagation(),a.type){case"DOMAttrModified":var b=a.attrName,c=a.relatedNode.namespaceURI,d=a.target,e=new j("attributes",d);e.attributeName=b,e.attributeNamespace=c;var g=a.attrChange===MutationEvent.ADDITION?null:a.prevValue;f(d,function(a){return!a.attributes||a.attributeFilter&&a.attributeFilter.length&&-1===a.attributeFilter.indexOf(b)&&-1===a.attributeFilter.indexOf(c)?void 0:a.attributeOldValue?k(g):e});break;case"DOMCharacterDataModified":var d=a.target,e=j("characterData",d),g=a.prevValue;f(d,function(a){return a.characterData?a.characterDataOldValue?k(g):e:void 0});break;case"DOMNodeRemoved":this.addTransientObserver(a.target);case"DOMNodeInserted":var h,i,m=a.target;"DOMNodeInserted"===a.type?(h=[m],i=[]):(h=[],i=[m]);var n=m.previousSibling,o=m.nextSibling,e=j("childList",a.target.parentNode);e.addedNodes=h,e.removedNodes=i,e.previousSibling=n,e.nextSibling=o,f(a.relatedNode,function(a){return a.childList?e:void 0})}l()}},a.JsMutationObserver=g,a.MutationObserver||(a.MutationObserver=g)}(window),window.HTMLImports=window.HTMLImports||{flags:{}},function(a){function b(a,b){b=b||o,d(function(){f(a,b)},b)}function c(a){return"complete"===a.readyState||a.readyState===r}function d(a,b){if(c(b))a&&a();else{var e=function(){("complete"===b.readyState||b.readyState===r)&&(b.removeEventListener(s,e),d(a,b))};b.addEventListener(s,e)}}function e(a){a.target.__loaded=!0}function f(a,b){function c(){i==j&&a&&a({allImports:h,loadedImports:k,errorImports:l})}function d(a){e(a),k.push(this),i++,c()}function f(a){l.push(this),i++,c()}var h=b.querySelectorAll("link[rel=import]"),i=0,j=h.length,k=[],l=[];if(j)for(var m,n=0;j>n&&(m=h[n]);n++)g(m)?(i++,c()):(m.addEventListener("load",d),m.addEventListener("error",f));else c()}function g(a){return l?a.__loaded||a["import"]&&"loading"!==a["import"].readyState:a.__importParsed}function h(a){for(var b,c=0,d=a.length;d>c&&(b=a[c]);c++)i(b)&&j(b)}function i(a){return"link"===a.localName&&"import"===a.rel}function j(a){var b=a["import"];b?e({target:a}):(a.addEventListener("load",e),a.addEventListener("error",e))}var k="import",l=Boolean(k in document.createElement("link")),m=Boolean(window.ShadowDOMPolyfill),n=function(a){return m?window.ShadowDOMPolyfill.wrapIfNeeded(a):a},o=n(document),p={get:function(){var a=window.HTMLImports.currentScript||document.currentScript||("complete"!==document.readyState?document.scripts[document.scripts.length-1]:null);return n(a)},configurable:!0};Object.defineProperty(document,"_currentScript",p),Object.defineProperty(o,"_currentScript",p);var q=/Trident/.test(navigator.userAgent),r=q?"complete":"interactive",s="readystatechange";l&&(new MutationObserver(function(a){for(var b,c=0,d=a.length;d>c&&(b=a[c]);c++)b.addedNodes&&h(b.addedNodes)}).observe(document.head,{childList:!0}),function(){if("loading"===document.readyState)for(var a,b=document.querySelectorAll("link[rel=import]"),c=0,d=b.length;d>c&&(a=b[c]);c++)j(a)}()),b(function(a){window.HTMLImports.ready=!0,window.HTMLImports.readyTime=(new Date).getTime();var b=o.createEvent("CustomEvent");b.initCustomEvent("HTMLImportsLoaded",!0,!0,a),o.dispatchEvent(b)}),a.IMPORT_LINK_TYPE=k,a.useNative=l,a.rootDocument=o,a.whenReady=b,a.isIE=q}(window.HTMLImports),function(a){var b=[],c=function(a){b.push(a)},d=function(){b.forEach(function(b){b(a)})};a.addModule=c,a.initializeModules=d}(window.HTMLImports),window.HTMLImports.addModule(function(a){var b=/(url\()([^)]*)(\))/g,c=/(@import[\s]+(?!url\())([^;]*)(;)/g,d={resolveUrlsInStyle:function(a,b){var c=a.ownerDocument,d=c.createElement("a");return a.textContent=this.resolveUrlsInCssText(a.textContent,b,d),a},resolveUrlsInCssText:function(a,d,e){var f=this.replaceUrls(a,e,d,b);return f=this.replaceUrls(f,e,d,c)},replaceUrls:function(a,b,c,d){return a.replace(d,function(a,d,e,f){var g=e.replace(/["']/g,"");return c&&(g=new URL(g,c).href),b.href=g,g=b.href,d+"'"+g+"'"+f})}};a.path=d}),window.HTMLImports.addModule(function(a){var b={async:!0,ok:function(a){return a.status>=200&&a.status<300||304===a.status||0===a.status},load:function(c,d,e){var f=new XMLHttpRequest;return(a.flags.debug||a.flags.bust)&&(c+="?"+Math.random()),f.open("GET",c,b.async),f.addEventListener("readystatechange",function(a){if(4===f.readyState){var c=f.getResponseHeader("Location"),g=null;if(c)var g="/"===c.substr(0,1)?location.origin+c:c;d.call(e,!b.ok(f)&&f,f.response||f.responseText,g)}}),f.send(),f},loadDocument:function(a,b,c){this.load(a,b,c).responseType="document"}};a.xhr=b}),window.HTMLImports.addModule(function(a){var b=a.xhr,c=a.flags,d=function(a,b){this.cache={},this.onload=a,this.oncomplete=b,this.inflight=0,this.pending={}};d.prototype={addNodes:function(a){this.inflight+=a.length;for(var b,c=0,d=a.length;d>c&&(b=a[c]);c++)this.require(b);this.checkDone()},addNode:function(a){this.inflight++,this.require(a),this.checkDone()},require:function(a){var b=a.src||a.href;a.__nodeUrl=b,this.dedupe(b,a)||this.fetch(b,a)},dedupe:function(a,b){if(this.pending[a])return this.pending[a].push(b),!0;return this.cache[a]?(this.onload(a,b,this.cache[a]),this.tail(),!0):(this.pending[a]=[b],!1)},fetch:function(a,d){if(c.load&&console.log("fetch",a,d),a)if(a.match(/^data:/)){var e=a.split(","),f=e[0],g=e[1];g=f.indexOf(";base64")>-1?atob(g):decodeURIComponent(g),setTimeout(function(){this.receive(a,d,null,g)}.bind(this),0)}else{var h=function(b,c,e){this.receive(a,d,b,c,e)}.bind(this);b.load(a,h)}else setTimeout(function(){this.receive(a,d,{error:"href must be specified"},null)}.bind(this),0)},receive:function(a,b,c,d,e){this.cache[a]=d;for(var f,g=this.pending[a],h=0,i=g.length;i>h&&(f=g[h]);h++)this.onload(a,f,d,c,e),this.tail();this.pending[a]=null},tail:function(){--this.inflight,this.checkDone()},checkDone:function(){this.inflight||this.oncomplete()}},a.Loader=d}),window.HTMLImports.addModule(function(a){var b=function(a){this.addCallback=a,this.mo=new MutationObserver(this.handler.bind(this))};b.prototype={handler:function(a){for(var b,c=0,d=a.length;d>c&&(b=a[c]);c++)"childList"===b.type&&b.addedNodes.length&&this.addedNodes(b.addedNodes)},addedNodes:function(a){this.addCallback&&this.addCallback(a);for(var b,c=0,d=a.length;d>c&&(b=a[c]);c++)b.children&&b.children.length&&this.addedNodes(b.children)},observe:function(a){this.mo.observe(a,{childList:!0,subtree:!0})}},a.Observer=b}),window.HTMLImports.addModule(function(a){function b(a){return"link"===a.localName&&a.rel===k}function c(a){var b=d(a);return"data:text/javascript;charset=utf-8,"+encodeURIComponent(b)}function d(a){return a.textContent+e(a)}function e(a){var b=a.ownerDocument;b.__importedScripts=b.__importedScripts||0;var c=a.ownerDocument.baseURI,d=b.__importedScripts?"-"+b.__importedScripts:"";return b.__importedScripts++,"\n//# sourceURL="+c+d+".js\n"}function f(a){var b=a.ownerDocument.createElement("style");return b.textContent=a.textContent,g.resolveUrlsInStyle(b),b}var g=a.path,h=a.rootDocument,i=a.flags,j=a.isIE,k=a.IMPORT_LINK_TYPE,l="link[rel="+k+"]",m={documentSelectors:l,importsSelectors:[l,"link[rel=stylesheet]:not([type])","style:not([type])","script:not([type])",'script[type="application/javascript"]','script[type="text/javascript"]'].join(","),map:{link:"parseLink",script:"parseScript",style:"parseStyle"},dynamicElements:[],parseNext:function(){var a=this.nextToParse();a&&this.parse(a)},parse:function(a){if(this.isParsed(a))return void(i.parse&&console.log("[%s] is already parsed",a.localName));var b=this[this.map[a.localName]];b&&(this.markParsing(a),b.call(this,a))},parseDynamic:function(a,b){this.dynamicElements.push(a),b||this.parseNext()},markParsing:function(a){i.parse&&console.log("parsing",a),this.parsingElement=a},markParsingComplete:function(a){a.__importParsed=!0,this.markDynamicParsingComplete(a),a.__importElement&&(a.__importElement.__importParsed=!0,this.markDynamicParsingComplete(a.__importElement)),this.parsingElement=null,i.parse&&console.log("completed",a)},markDynamicParsingComplete:function(a){var b=this.dynamicElements.indexOf(a);b>=0&&this.dynamicElements.splice(b,1)},parseImport:function(a){if(a["import"]=a.__doc,window.HTMLImports.__importsParsingHook&&window.HTMLImports.__importsParsingHook(a),a["import"]&&(a["import"].__importParsed=!0),this.markParsingComplete(a),a.__resource&&!a.__error?a.dispatchEvent(new CustomEvent("load",{bubbles:!1})):a.dispatchEvent(new CustomEvent("error",{bubbles:!1})),a.__pending)for(var b;a.__pending.length;)b=a.__pending.shift(),b&&b({target:a});this.parseNext()},parseLink:function(a){b(a)?this.parseImport(a):(a.href=a.href,this.parseGeneric(a))},parseStyle:function(a){var b=a;a=f(a),b.__appliedElement=a,a.__importElement=b,this.parseGeneric(a)},parseGeneric:function(a){this.trackElement(a),this.addElementToDocument(a)},rootImportForElement:function(a){for(var b=a;b.ownerDocument.__importLink;)b=b.ownerDocument.__importLink;return b},addElementToDocument:function(a){var b=this.rootImportForElement(a.__importElement||a);b.parentNode.insertBefore(a,b)},trackElement:function(a,b){var c=this,d=function(e){a.removeEventListener("load",d),a.removeEventListener("error",d),b&&b(e),c.markParsingComplete(a),c.parseNext()};if(a.addEventListener("load",d),a.addEventListener("error",d),j&&"style"===a.localName){var e=!1;if(-1==a.textContent.indexOf("@import"))e=!0;else if(a.sheet){e=!0;for(var f,g=a.sheet.cssRules,h=g?g.length:0,i=0;h>i&&(f=g[i]);i++)f.type===CSSRule.IMPORT_RULE&&(e=e&&Boolean(f.styleSheet))}e&&setTimeout(function(){a.dispatchEvent(new CustomEvent("load",{bubbles:!1}))})}},parseScript:function(b){var d=document.createElement("script");d.__importElement=b,d.src=b.src?b.src:c(b),a.currentScript=b,this.trackElement(d,function(b){d.parentNode&&d.parentNode.removeChild(d),a.currentScript=null}),this.addElementToDocument(d)},nextToParse:function(){return this._mayParse=[],!this.parsingElement&&(this.nextToParseInDoc(h)||this.nextToParseDynamic())},nextToParseInDoc:function(a,c){if(a&&this._mayParse.indexOf(a)<0){this._mayParse.push(a);for(var d,e=a.querySelectorAll(this.parseSelectorsForNode(a)),f=0,g=e.length;g>f&&(d=e[f]);f++)if(!this.isParsed(d))return this.hasResource(d)?b(d)?this.nextToParseInDoc(d.__doc,d):d:void 0}return c},nextToParseDynamic:function(){return this.dynamicElements[0]},parseSelectorsForNode:function(a){var b=a.ownerDocument||a;return b===h?this.documentSelectors:this.importsSelectors},isParsed:function(a){return a.__importParsed},needsDynamicParsing:function(a){return this.dynamicElements.indexOf(a)>=0},hasResource:function(a){return b(a)&&void 0===a.__doc?!1:!0}};a.parser=m,a.IMPORT_SELECTOR=l}),window.HTMLImports.addModule(function(a){function b(a){return c(a,g)}function c(a,b){return"link"===a.localName&&a.getAttribute("rel")===b}function d(a){return!!Object.getOwnPropertyDescriptor(a,"baseURI")}function e(a,b){var c=document.implementation.createHTMLDocument(g);c._URL=b;var e=c.createElement("base");e.setAttribute("href",b),c.baseURI||d(c)||Object.defineProperty(c,"baseURI",{value:b});var f=c.createElement("meta");return f.setAttribute("charset","utf-8"),c.head.appendChild(f),c.head.appendChild(e),c.body.innerHTML=a,window.HTMLTemplateElement&&HTMLTemplateElement.bootstrap&&HTMLTemplateElement.bootstrap(c),c}var f=a.flags,g=a.IMPORT_LINK_TYPE,h=a.IMPORT_SELECTOR,i=a.rootDocument,j=a.Loader,k=a.Observer,l=a.parser,m={documents:{},documentPreloadSelectors:h,importsPreloadSelectors:[h].join(","),loadNode:function(a){n.addNode(a)},loadSubtree:function(a){var b=this.marshalNodes(a);n.addNodes(b)},marshalNodes:function(a){return a.querySelectorAll(this.loadSelectorsForNode(a))},loadSelectorsForNode:function(a){var b=a.ownerDocument||a;return b===i?this.documentPreloadSelectors:this.importsPreloadSelectors},loaded:function(a,c,d,g,h){if(f.load&&console.log("loaded",a,c),c.__resource=d,c.__error=g,b(c)){var i=this.documents[a];void 0===i&&(i=g?null:e(d,h||a),i&&(i.__importLink=c,this.bootDocument(i)),this.documents[a]=i),c.__doc=i}l.parseNext()},bootDocument:function(a){this.loadSubtree(a),this.observer.observe(a),l.parseNext()},loadedAll:function(){l.parseNext()}},n=new j(m.loaded.bind(m),m.loadedAll.bind(m));if(m.observer=new k,!document.baseURI){var o={get:function(){var a=document.querySelector("base");return a?a.href:window.location.href},configurable:!0};Object.defineProperty(document,"baseURI",o),Object.defineProperty(i,"baseURI",o)}a.importer=m,a.importLoader=n}),window.HTMLImports.addModule(function(a){var b=a.parser,c=a.importer,d={added:function(a){for(var d,e,f,g,h=0,i=a.length;i>h&&(g=a[h]);h++)d||(d=g.ownerDocument,e=b.isParsed(d)),f=this.shouldLoadNode(g),f&&c.loadNode(g),this.shouldParseNode(g)&&e&&b.parseDynamic(g,f)},shouldLoadNode:function(a){return 1===a.nodeType&&e.call(a,c.loadSelectorsForNode(a))},shouldParseNode:function(a){return 1===a.nodeType&&e.call(a,b.parseSelectorsForNode(a))}};c.observer.addCallback=d.added.bind(d);var e=HTMLElement.prototype.matches||HTMLElement.prototype.matchesSelector||HTMLElement.prototype.webkitMatchesSelector||HTMLElement.prototype.mozMatchesSelector||HTMLElement.prototype.msMatchesSelector}),function(a){function b(){window.HTMLImports.importer.bootDocument(e)}var c=a.initializeModules,d=a.isIE;if(!a.useNative){d&&"function"!=typeof window.CustomEvent&&(window.CustomEvent=function(a,b){b=b||{};var c=document.createEvent("CustomEvent");return c.initCustomEvent(a,Boolean(b.bubbles),Boolean(b.cancelable),b.detail),c.preventDefault=function(){Object.defineProperty(this,"defaultPrevented",{get:function(){return!0}})},c},window.CustomEvent.prototype=window.Event.prototype),c();var e=a.rootDocument;"complete"===document.readyState||"interactive"===document.readyState&&!window.attachEvent?b():document.addEventListener("DOMContentLoaded",b)}}(window.HTMLImports),window.CustomElements=window.CustomElements||{flags:{}},function(a){var b=a.flags,c=[],d=function(a){c.push(a)},e=function(){c.forEach(function(b){b(a)})};a.addModule=d,a.initializeModules=e,a.hasNative=Boolean(document.registerElement),a.isIE=/Trident/.test(navigator.userAgent),a.useNative=!b.register&&a.hasNative&&!window.ShadowDOMPolyfill&&(!window.HTMLImports||window.HTMLImports.useNative)}(window.CustomElements),window.CustomElements.addModule(function(a){function b(a,b){c(a,function(a){return b(a)?!0:void d(a,b)}),d(a,b)}function c(a,b,d){var e=a.firstElementChild;if(!e)for(e=a.firstChild;e&&e.nodeType!==Node.ELEMENT_NODE;)e=e.nextSibling;for(;e;)b(e,d)!==!0&&c(e,b,d),e=e.nextElementSibling;return null}function d(a,c){for(var d=a.shadowRoot;d;)b(d,c),d=d.olderShadowRoot}function e(a,b){f(a,b,[])}function f(a,b,c){if(a=window.wrap(a),!(c.indexOf(a)>=0)){c.push(a);for(var d,e=a.querySelectorAll("link[rel="+g+"]"),h=0,i=e.length;i>h&&(d=e[h]);h++)d["import"]&&f(d["import"],b,c);b(a)}}var g=window.HTMLImports?window.HTMLImports.IMPORT_LINK_TYPE:"none";a.forDocumentTree=e,a.forSubtree=b}),window.CustomElements.addModule(function(a){function b(a,b){return c(a,b)||d(a,b)}function c(b,c){return a.upgrade(b,c)?!0:void(c&&g(b))}function d(a,b){t(a,function(a){return c(a,b)?!0:void 0})}function e(a){x.push(a),w||(w=!0,setTimeout(f))}function f(){w=!1;for(var a,b=x,c=0,d=b.length;d>c&&(a=b[c]);c++)a();x=[]}function g(a){v?e(function(){h(a)}):h(a)}function h(a){a.__upgraded__&&!a.__attached&&(a.__attached=!0,a.attachedCallback&&a.attachedCallback())}function i(a){j(a),t(a,function(a){j(a)})}function j(a){v?e(function(){k(a)}):k(a)}function k(a){a.__upgraded__&&a.__attached&&(a.__attached=!1,a.detachedCallback&&a.detachedCallback())}function l(a){for(var b=a,c=window.wrap(document);b;){if(b==c)return!0;b=b.parentNode||b.nodeType===Node.DOCUMENT_FRAGMENT_NODE&&b.host}}function m(a){if(a.shadowRoot&&!a.shadowRoot.__watched){s.dom&&console.log("watching shadow-root for: ",a.localName);for(var b=a.shadowRoot;b;)p(b),b=b.olderShadowRoot}}function n(a,c){if(s.dom){var d=c[0];if(d&&"childList"===d.type&&d.addedNodes&&d.addedNodes){for(var e=d.addedNodes[0];e&&e!==document&&!e.host;)e=e.parentNode;var f=e&&(e.URL||e._URL||e.host&&e.host.localName)||"";f=f.split("/?").shift().split("/").pop()}console.group("mutations (%d) [%s]",c.length,f||"")}var g=l(a);c.forEach(function(a){"childList"===a.type&&(y(a.addedNodes,function(a){a.localName&&b(a,g)}),y(a.removedNodes,function(a){a.localName&&i(a)}))}),s.dom&&console.groupEnd()}function o(a){for(a=window.wrap(a),a||(a=window.wrap(document));a.parentNode;)a=a.parentNode;var b=a.__observer;b&&(n(a,b.takeRecords()),f())}function p(a){if(!a.__observer){var b=new MutationObserver(n.bind(this,a));b.observe(a,{childList:!0,subtree:!0}),a.__observer=b}}function q(a){a=window.wrap(a),s.dom&&console.group("upgradeDocument: ",a.baseURI.split("/").pop());var c=a===window.wrap(document);b(a,c),p(a),s.dom&&console.groupEnd()}function r(a){u(a,q)}var s=a.flags,t=a.forSubtree,u=a.forDocumentTree,v=!window.MutationObserver||window.MutationObserver===window.JsMutationObserver;a.hasPolyfillMutations=v;var w=!1,x=[],y=Array.prototype.forEach.call.bind(Array.prototype.forEach),z=Element.prototype.createShadowRoot;z&&(Element.prototype.createShadowRoot=function(){var a=z.call(this);return window.CustomElements.watchShadow(this),a}),a.watchShadow=m,a.upgradeDocumentTree=r,a.upgradeDocument=q,a.upgradeSubtree=d,a.upgradeAll=b,a.attached=g,a.takeRecords=o}),window.CustomElements.addModule(function(a){function b(b,d){if(!b.__upgraded__&&b.nodeType===Node.ELEMENT_NODE){var e=b.getAttribute("is"),f=a.getRegisteredDefinition(b.localName)||a.getRegisteredDefinition(e);if(f&&(e&&f.tag==b.localName||!e&&!f["extends"]))return c(b,f,d)}}function c(b,c,e){return g.upgrade&&console.group("upgrade:",b.localName),c.is&&b.setAttribute("is",c.is),d(b,c),b.__upgraded__=!0,f(b),e&&a.attached(b),a.upgradeSubtree(b,e),g.upgrade&&console.groupEnd(),b}function d(a,b){Object.__proto__?a.__proto__=b.prototype:(e(a,b.prototype,b["native"]),a.__proto__=b.prototype)}function e(a,b,c){for(var d={},e=b;e!==c&&e!==HTMLElement.prototype;){for(var f,g=Object.getOwnPropertyNames(e),h=0;f=g[h];h++)d[f]||(Object.defineProperty(a,f,Object.getOwnPropertyDescriptor(e,f)),d[f]=1);e=Object.getPrototypeOf(e)}}function f(a){a.createdCallback&&a.createdCallback()}var g=a.flags;a.upgrade=b,a.upgradeWithDefinition=c,a.implementPrototype=d}),window.CustomElements.addModule(function(a){function b(b,d){var i=d||{};if(!b)throw new Error("document.registerElement: first argument `name` must not be empty");if(b.indexOf("-")<0)throw new Error("document.registerElement: first argument ('name') must contain a dash ('-'). Argument provided was '"+String(b)+"'.");if(e(b))throw new Error("Failed to execute 'registerElement' on 'Document': Registration failed for type '"+String(b)+"'. The type name is invalid.");if(j(b))throw new Error("DuplicateDefinitionError: a type with name '"+String(b)+"' is already registered");return i.prototype||(i.prototype=Object.create(HTMLElement.prototype)),i.__name=b.toLowerCase(),i.lifecycle=i.lifecycle||{},i.ancestry=f(i["extends"]),g(i),h(i),c(i.prototype),k(i.__name,i),i.ctor=l(i),i.ctor.prototype=i.prototype,i.prototype.constructor=i.ctor,a.ready&&r(document),i.ctor}function c(a){if(!a.setAttribute._polyfilled){
var b=a.setAttribute;a.setAttribute=function(a,c){d.call(this,a,c,b)};var c=a.removeAttribute;a.removeAttribute=function(a){d.call(this,a,null,c)},a.setAttribute._polyfilled=!0}}function d(a,b,c){a=a.toLowerCase();var d=this.getAttribute(a);c.apply(this,arguments);var e=this.getAttribute(a);this.attributeChangedCallback&&e!==d&&this.attributeChangedCallback(a,d,e)}function e(a){for(var b=0;b<w.length;b++)if(a===w[b])return!0}function f(a){var b=j(a);return b?f(b["extends"]).concat([b]):[]}function g(a){for(var b,c=a["extends"],d=0;b=a.ancestry[d];d++)c=b.is&&b.tag;a.tag=c||a.__name,c&&(a.is=a.__name)}function h(a){if(!Object.__proto__){var b=HTMLElement.prototype;if(a.is){var c=document.createElement(a.tag);b=Object.getPrototypeOf(c)}for(var d,e=a.prototype,f=!1;e;)e==b&&(f=!0),d=Object.getPrototypeOf(e),d&&(e.__proto__=d),e=d;f||console.warn(a.tag+" prototype not found in prototype chain for "+a.is),a["native"]=b}}function i(a){return t(z(a.tag),a)}function j(a){return a?x[a.toLowerCase()]:void 0}function k(a,b){x[a]=b}function l(a){return function(){return i(a)}}function m(a,b,c){return a===y?n(b,c):A(a,b)}function n(a,b){a&&(a=a.toLowerCase()),b&&(b=b.toLowerCase());var c=j(b||a);if(c){if(a==c.tag&&b==c.is)return new c.ctor;if(!b&&!c.is)return new c.ctor}var d;return b?(d=n(a),d.setAttribute("is",b),d):(d=z(a),a.indexOf("-")>=0&&u(d,HTMLElement),d)}function o(a,b){var c=a[b];a[b]=function(){var a=c.apply(this,arguments);return s(a),a}}var p,q=a.isIE,r=a.upgradeDocumentTree,s=a.upgradeAll,t=a.upgradeWithDefinition,u=a.implementPrototype,v=a.useNative,w=["annotation-xml","color-profile","font-face","font-face-src","font-face-uri","font-face-format","font-face-name","missing-glyph"],x={},y="http://www.w3.org/1999/xhtml",z=document.createElement.bind(document),A=document.createElementNS.bind(document);p=Object.__proto__||v?function(a,b){return a instanceof b}:function(a,b){if(a instanceof b)return!0;for(var c=a;c;){if(c===b.prototype)return!0;c=c.__proto__}return!1},o(Node.prototype,"cloneNode"),o(document,"importNode"),q&&!function(){var a=document.importNode;document.importNode=function(){var b=a.apply(document,arguments);if(b.nodeType==b.DOCUMENT_FRAGMENT_NODE){var c=document.createDocumentFragment();return c.appendChild(b),c}return b}}(),document.registerElement=b,document.createElement=n,document.createElementNS=m,a.registry=x,a["instanceof"]=p,a.reservedTagList=w,a.getRegisteredDefinition=j,document.register=document.registerElement}),function(a){function b(){g(window.wrap(document)),window.CustomElements.ready=!0;var a=window.requestAnimationFrame||function(a){setTimeout(a,16)};a(function(){setTimeout(function(){window.CustomElements.readyTime=Date.now(),window.HTMLImports&&(window.CustomElements.elapsed=window.CustomElements.readyTime-window.HTMLImports.readyTime),document.dispatchEvent(new CustomEvent("WebComponentsReady",{bubbles:!0}))})})}var c=a.useNative,d=a.initializeModules,e=a.isIE;if(c){var f=function(){};a.watchShadow=f,a.upgrade=f,a.upgradeAll=f,a.upgradeDocumentTree=f,a.upgradeSubtree=f,a.takeRecords=f,a["instanceof"]=function(a,b){return a instanceof b}}else d();var g=a.upgradeDocumentTree,h=a.upgradeDocument;if(window.wrap||(window.ShadowDOMPolyfill?(window.wrap=window.ShadowDOMPolyfill.wrapIfNeeded,window.unwrap=window.ShadowDOMPolyfill.unwrapIfNeeded):window.wrap=window.unwrap=function(a){return a}),window.HTMLImports&&(window.HTMLImports.__importsParsingHook=function(a){a["import"]&&h(wrap(a["import"]))}),e&&"function"!=typeof window.CustomEvent&&(window.CustomEvent=function(a,b){b=b||{};var c=document.createEvent("CustomEvent");return c.initCustomEvent(a,Boolean(b.bubbles),Boolean(b.cancelable),b.detail),c.preventDefault=function(){Object.defineProperty(this,"defaultPrevented",{get:function(){return!0}})},c},window.CustomEvent.prototype=window.Event.prototype),"complete"===document.readyState||a.flags.eager)b();else if("interactive"!==document.readyState||window.attachEvent||window.HTMLImports&&!window.HTMLImports.ready){var i=window.HTMLImports&&!window.HTMLImports.ready?"HTMLImportsLoaded":"DOMContentLoaded";window.addEventListener(i,b)}else b()}(window.CustomElements),"undefined"==typeof HTMLTemplateElement&&!function(){function a(a){switch(a){case"&":return"&amp;";case"<":return"&lt;";case">":return"&gt;";case" ":return"&nbsp;"}}function b(b){return b.replace(g,a)}var c="template",d=document.implementation.createHTMLDocument("template"),e=!0;HTMLTemplateElement=function(){},HTMLTemplateElement.prototype=Object.create(HTMLElement.prototype),HTMLTemplateElement.decorate=function(a){a.content||(a.content=d.createDocumentFragment());for(var c;c=a.firstChild;)a.content.appendChild(c);if(e)try{Object.defineProperty(a,"innerHTML",{get:function(){for(var a="",c=this.content.firstChild;c;c=c.nextSibling)a+=c.outerHTML||b(c.data);return a},set:function(a){for(d.body.innerHTML=a,HTMLTemplateElement.bootstrap(d);this.content.firstChild;)this.content.removeChild(this.content.firstChild);for(;d.body.firstChild;)this.content.appendChild(d.body.firstChild)},configurable:!0})}catch(f){e=!1}},HTMLTemplateElement.bootstrap=function(a){for(var b,d=a.querySelectorAll(c),e=0,f=d.length;f>e&&(b=d[e]);e++)HTMLTemplateElement.decorate(b)},window.addEventListener("DOMContentLoaded",function(){HTMLTemplateElement.bootstrap(document)});var f=document.createElement;document.createElement=function(){"use strict";var a=f.apply(document,arguments);return"template"==a.localName&&HTMLTemplateElement.decorate(a),a};var g=/[&\u00A0<>]/g}(),function(a){var b=document.createElement("style");b.textContent="body {transition: opacity ease-in 0.2s; } \nbody[unresolved] {opacity: 0; display: block; overflow: hidden; position: relative; } \n";var c=document.querySelector("head");c.insertBefore(b,c.firstChild)}(window.WebComponents);