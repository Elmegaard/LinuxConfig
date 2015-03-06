var ty,tyaa=tyaa||{},tya=this,tyb=function(a){return void 0!==a},tyba=function(a){a=a.split(".");for(var b=tya,c;c=a.shift();)if(null!=b[c])b=b[c];else return null;return b},tyca=function(){},tyda=function(a){a.Ua=function(){return a.bn?a.bn:a.bn=new a}},tyea=function(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&
"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";else if("function"==b&&"undefined"==typeof a.call)return"object";return b},tyc=function(a){return"array"==tyea(a)},tyfa=function(a){var b=tyea(a);return"array"==b||"object"==b&&"number"==typeof a.length},tyd=function(a){return"string"==
typeof a},tyga=function(a){return"number"==typeof a},tye=function(a){return"function"==tyea(a)},tyf=function(a){var b=typeof a;return"object"==b&&null!=a||"function"==b},tyja=function(a){return a[tyha]||(a[tyha]=++tyia)},tyha="closure_uid_"+(1E9*Math.random()>>>0),tyia=0,tyka=function(a,b,c){return a.call.apply(a.bind,arguments)},tyla=function(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);
Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}},tyg=function(a,b,c){tyg=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?tyka:tyla;return tyg.apply(null,arguments)},tyma=function(a,b){var c=Array.prototype.slice.call(arguments,1);return function(){var b=c.slice();b.push.apply(b,arguments);return a.apply(this,b)}},tyh=Date.now||function(){return+new Date},tyoa=function(a){if(tya.execScript)tya.execScript(a,
"JavaScript");else if(tya.eval)if(null==tyna&&(tya.eval("var _et_ = 1;"),"undefined"!=typeof tya._et_?(delete tya._et_,tyna=!0):tyna=!1),tyna)tya.eval(a);else{var b=tya.document,c=b.createElement("script");c.type="text/javascript";c.defer=!1;c.appendChild(b.createTextNode(a));b.body.appendChild(c);b.body.removeChild(c)}else throw Error("goog.globalEval not available");},tyna=null,typa=function(a,b){var c=a.split("."),d=tya;c[0]in d||!d.execScript||d.execScript("var "+c[0]);for(var e;c.length&&(e=
c.shift());)!c.length&&tyb(b)?d[e]=b:d=d[e]?d[e]:d[e]={}},tyi=function(a,b){function c(){}c.prototype=b.prototype;a.B=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.Ix=function(a,c,f){for(var g=Array(arguments.length-2),h=2;h<arguments.length;h++)g[h-2]=arguments[h];return b.prototype[c].apply(a,g)}};
Function.prototype.bind=Function.prototype.bind||function(a,b){if(1<arguments.length){var c=Array.prototype.slice.call(arguments,1);c.unshift(this,a);return tyg.apply(null,c)}return tyg(this,a)};var tyj=function(a){if(Error.captureStackTrace)Error.captureStackTrace(this,tyj);else{var b=Error().stack;b&&(this.stack=b)}a&&(this.message=String(a))};tyi(tyj,Error);tyj.prototype.name="CustomError";var tyqa;var tyra=function(a,b){for(var c=a.split("%s"),d="",e=Array.prototype.slice.call(arguments,1);e.length&&1<c.length;)d+=c.shift()+e.shift();return d+c.join("%s")},tysa=function(a){return/^[\s\xa0]*$/.test(a)},tyta=function(a){return a.replace(/[\t\r\n ]+/g," ").replace(/^[\t\r\n ]+|[\t\r\n ]+$/g,"")},tyua=String.prototype.trim?function(a){return a.trim()}:function(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")},tyCa=function(a){if(!tyva.test(a))return a;-1!=a.indexOf("&")&&(a=a.replace(tywa,"&amp;"));
-1!=a.indexOf("<")&&(a=a.replace(tyxa,"&lt;"));-1!=a.indexOf(">")&&(a=a.replace(tyya,"&gt;"));-1!=a.indexOf('"')&&(a=a.replace(tyza,"&quot;"));-1!=a.indexOf("'")&&(a=a.replace(tyAa,"&#39;"));-1!=a.indexOf("\x00")&&(a=a.replace(tyBa,"&#0;"));return a},tywa=/&/g,tyxa=/</g,tyya=/>/g,tyza=/"/g,tyAa=/'/g,tyBa=/\x00/g,tyva=/[\x00&<>"']/,tyDa={"\x00":"\\0","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\x0B",'"':'\\"',"\\":"\\\\"},tyEa={"'":"\\'"},tyFa=function(a){a=String(a);if(a.quote)return a.quote();
for(var b=['"'],c=0;c<a.length;c++){var d=a.charAt(c),e=d.charCodeAt(0),f=c+1,g;if(!(g=tyDa[d])){if(!(31<e&&127>e))if(d in tyEa)d=tyEa[d];else if(d in tyDa)d=tyEa[d]=tyDa[d];else{e=d;g=d.charCodeAt(0);if(31<g&&127>g)e=d;else{if(256>g){if(e="\\x",16>g||256<g)e+="0"}else e="\\u",4096>g&&(e+="0");e+=g.toString(16).toUpperCase()}d=tyEa[d]=e}g=d}b[f]=g}b.push('"');return b.join("")},tyGa=function(a,b){return Array(b+1).join(a)},tyHa=function(a){a=tyb(void 0)?a.toFixed(void 0):String(a);var b=a.indexOf(".");
-1==b&&(b=a.length);return tyGa("0",Math.max(0,2-b))+a},tyIa=function(){return Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^tyh()).toString(36)},tyKa=function(a,b){for(var c=0,d=tyua(String(a)).split("."),e=tyua(String(b)).split("."),f=Math.max(d.length,e.length),g=0;0==c&&g<f;g++){var h=d[g]||"",k=e[g]||"",l=/(\d*)(\D*)/g,m=/(\d*)(\D*)/g;do{var n=l.exec(h)||["","",""],p=m.exec(k)||["","",""];if(0==n[0].length&&0==p[0].length)break;c=tyJa(0==n[1].length?
0:parseInt(n[1],10),0==p[1].length?0:parseInt(p[1],10))||tyJa(0==n[2].length,0==p[2].length)||tyJa(n[2],p[2])}while(0==c)}return c},tyJa=function(a,b){return a<b?-1:a>b?1:0};Math.random();var tyLa=function(){return"menuKey".replace(/([A-Z])/g,"-$1").toLowerCase()},tyMa=function(a){isFinite(a)&&(a=String(a));return tyd(a)?/^\s*-?0x/i.test(a)?parseInt(a,16):parseInt(a,10):NaN};var tyNa=function(a){return a},tyOa=function(a){return a};var tyk=Array.prototype,tyPa=tyk.indexOf?function(a,b,c){return tyk.indexOf.call(a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;if(tyd(a))return tyd(b)&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},tyl=tyk.forEach?function(a,b,c){tyk.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=tyd(a)?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)},tyQa=function(a,b){for(var c=tyd(a)?a.split(""):a,d=a.length-1;0<=d;--d)d in c&&b.call(void 0,
c[d],d,a)},tyRa=tyk.filter?function(a,b,c){return tyk.filter.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=[],f=0,g=tyd(a)?a.split(""):a,h=0;h<d;h++)if(h in g){var k=g[h];b.call(c,k,h,a)&&(e[f++]=k)}return e},tySa=tyk.map?function(a,b,c){return tyk.map.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=Array(d),f=tyd(a)?a.split(""):a,g=0;g<d;g++)g in f&&(e[g]=b.call(c,f[g],g,a));return e},tyTa=tyk.some?function(a,b,c){return tyk.some.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=tyd(a)?a.split(""):
a,f=0;f<d;f++)if(f in e&&b.call(c,e[f],f,a))return!0;return!1},tyUa=tyk.every?function(a,b,c){return tyk.every.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=tyd(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&!b.call(c,e[f],f,a))return!1;return!0},tyWa=function(a){var b;t:{b=tyVa;for(var c=a.length,d=tyd(a)?a.split(""):a,e=0;e<c;e++)if(e in d&&b.call(void 0,d[e],e,a)){b=e;break t}b=-1}return 0>b?null:tyd(a)?a.charAt(b):a[b]},tyXa=function(a,b){for(var c=tyd(a)?a.split(""):a,d=a.length-1;0<=d;d--)if(d in
c&&b.call(void 0,c[d],d,a))return d;return-1},tym=function(a,b){return 0<=tyPa(a,b)},tyYa=function(a,b){var c=tyPa(a,b),d;(d=0<=c)&&tyk.splice.call(a,c,1);return d},tyZa=function(a){return tyk.concat.apply(tyk,arguments)},ty_a=function(a){var b=a.length;if(0<b){for(var c=Array(b),d=0;d<b;d++)c[d]=a[d];return c}return[]},ty1a=function(a,b,c,d){tyk.splice.apply(a,ty0a(arguments,1))},ty0a=function(a,b,c){return 2>=arguments.length?tyk.slice.call(a,b):tyk.slice.call(a,b,c)},ty3a=function(a,b){a.sort(b||
ty2a)},ty2a=function(a,b){return a>b?1:a<b?-1:0};var ty4a=function(){return null},ty5a=function(a){return a};var ty6a=function(a,b,c){return Math.min(Math.max(a,b),c)};var ty7a="StopIteration"in tya?tya.StopIteration:Error("StopIteration"),ty8a=function(){};ty8a.prototype.next=function(){throw ty7a;};ty8a.prototype.Le=function(){return this};
var ty9a=function(a){if(a instanceof ty8a)return a;if("function"==typeof a.Le)return a.Le(!1);if(tyfa(a)){var b=0,c=new ty8a;c.next=function(){for(;;){if(b>=a.length)throw ty7a;if(b in a)return a[b++];b++}};return c}throw Error("Not implemented");},ty$a=function(a,b){if(tyfa(a))try{tyl(a,b,void 0)}catch(c){if(c!==ty7a)throw c;}else{a=ty9a(a);try{for(;;)b.call(void 0,a.next(),void 0,a)}catch(d){if(d!==ty7a)throw d;}}};var tyab=function(a,b,c){for(var d in a)b.call(c,a[d],d,a)},tybb=function(a){var b=[],c=0,d;for(d in a)b[c++]=a[d];return b},tycb=function(a){var b=[],c=0,d;for(d in a)b[c++]=d;return b},tydb=function(a,b){for(var c in a)if(a[c]==b)return!0;return!1},tyeb=function(a,b,c){for(var d in a)if(b.call(c,a[d],d,a))return d},tyfb=function(a,b){var c=tyeb(a,b,void 0);return c&&a[c]},tygb=function(a){for(var b in a)return!1;return!0},tyhb=function(a,b,c){if(b in a)throw Error('The object already contains the key "'+
b+'"');a[b]=c},tyib="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" "),tyjb=function(a,b){for(var c,d,e=1;e<arguments.length;e++){d=arguments[e];for(c in d)a[c]=d[c];for(var f=0;f<tyib.length;f++)c=tyib[f],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}},tykb=function(a){var b=arguments.length;if(1==b&&tyc(arguments[0]))return tykb.apply(null,arguments[0]);for(var c={},d=0;d<b;d++)c[arguments[d]]=!0;return c};var tyn=function(a,b){this.na={};this.X=[];this.Vd=this.ea=0;var c=arguments.length;if(1<c){if(c%2)throw Error("Uneven number of arguments");for(var d=0;d<c;d+=2)this.set(arguments[d],arguments[d+1])}else a&&this.Tc(a)};ty=tyn.prototype;ty.zb=function(){return this.ea};ty.Ca=function(){tylb(this);for(var a=[],b=0;b<this.X.length;b++)a.push(this.na[this.X[b]]);return a};ty.$b=function(){tylb(this);return this.X.concat()};ty.xc=function(a){return tymb(this.na,a)};
ty.Ue=function(a){for(var b=0;b<this.X.length;b++){var c=this.X[b];if(tymb(this.na,c)&&this.na[c]==a)return!0}return!1};ty.wa=function(a,b){if(this===a)return!0;if(this.ea!=a.zb())return!1;var c=b||tynb;tylb(this);for(var d,e=0;d=this.X[e];e++)if(!c(this.get(d),a.get(d)))return!1;return!0};var tynb=function(a,b){return a===b};tyn.prototype.Ad=function(){return 0==this.ea};tyn.prototype.clear=function(){this.na={};this.Vd=this.ea=this.X.length=0};
tyn.prototype.remove=function(a){return tymb(this.na,a)?(delete this.na[a],this.ea--,this.Vd++,this.X.length>2*this.ea&&tylb(this),!0):!1};var tylb=function(a){if(a.ea!=a.X.length){for(var b=0,c=0;b<a.X.length;){var d=a.X[b];tymb(a.na,d)&&(a.X[c++]=d);b++}a.X.length=c}if(a.ea!=a.X.length){for(var e={},c=b=0;b<a.X.length;)d=a.X[b],tymb(e,d)||(a.X[c++]=d,e[d]=1),b++;a.X.length=c}};ty=tyn.prototype;ty.get=function(a,b){return tymb(this.na,a)?this.na[a]:b};
ty.set=function(a,b){tymb(this.na,a)||(this.ea++,this.X.push(a),this.Vd++);this.na[a]=b};ty.Tc=function(a){var b;a instanceof tyn?(b=a.$b(),a=a.Ca()):(b=tycb(a),a=tybb(a));for(var c=0;c<b.length;c++)this.set(b[c],a[c])};ty.forEach=function(a,b){for(var c=this.$b(),d=0;d<c.length;d++){var e=c[d],f=this.get(e);a.call(b,f,e,this)}};ty.clone=function(){return new tyn(this)};
ty.Le=function(a){tylb(this);var b=0,c=this.X,d=this.na,e=this.Vd,f=this,g=new ty8a;g.next=function(){for(;;){if(e!=f.Vd)throw Error("The map has changed since the iterator was created");if(b>=c.length)throw ty7a;var g=c[b++];return a?g:d[g]}};return g};var tymb=function(a,b){return Object.prototype.hasOwnProperty.call(a,b)};var tyob,typb,tyqb={id:"hitType",name:"t",valueType:"text",maxLength:void 0,defaultValue:void 0},tyrb={id:"sessionControl",name:"sc",valueType:"text",maxLength:void 0,defaultValue:void 0},tysb={id:"eventCategory",name:"ec",valueType:"text",maxLength:150,defaultValue:void 0},tytb={id:"eventAction",name:"ea",valueType:"text",maxLength:500,defaultValue:void 0},tyub={id:"eventLabel",name:"el",valueType:"text",maxLength:500,defaultValue:void 0},tyvb={id:"eventValue",name:"ev",valueType:"integer",maxLength:void 0,
defaultValue:void 0},tywb={qv:tyqb,Du:{id:"anonymizeIp",name:"aip",valueType:"boolean",maxLength:void 0,defaultValue:void 0},Ov:{id:"queueTime",name:"qt",valueType:"integer",maxLength:void 0,defaultValue:void 0},Ku:{id:"cacheBuster",name:"z",valueType:"text",maxLength:void 0,defaultValue:void 0},qw:tyrb,sw:{id:"sessionGroup",name:"sg",valueType:"text",maxLength:void 0,defaultValue:void 0},zx:{id:"userId",name:"uid",valueType:"text",maxLength:void 0,defaultValue:void 0},Gv:{id:"nonInteraction",name:"ni",
valueType:"boolean",maxLength:void 0,defaultValue:void 0},Yu:{id:"description",name:"cd",valueType:"text",maxLength:2048,defaultValue:void 0},Xw:{id:"title",name:"dt",valueType:"text",maxLength:1500,defaultValue:void 0},Gu:{id:"appId",name:"aid",valueType:"text",maxLength:150,defaultValue:void 0},Hu:{id:"appInstallerId",name:"aiid",valueType:"text",maxLength:150,defaultValue:void 0},jv:tysb,iv:tytb,kv:tyub,lv:tyvb,Gw:{id:"socialNetwork",name:"sn",valueType:"text",maxLength:50,defaultValue:void 0},
Fw:{id:"socialAction",name:"sa",valueType:"text",maxLength:50,defaultValue:void 0},Hw:{id:"socialTarget",name:"st",valueType:"text",maxLength:2048,defaultValue:void 0},$w:{id:"transactionId",name:"ti",valueType:"text",maxLength:500,defaultValue:void 0},Zw:{id:"transactionAffiliation",name:"ta",valueType:"text",maxLength:500,defaultValue:void 0},ax:{id:"transactionRevenue",name:"tr",valueType:"currency",maxLength:void 0,defaultValue:void 0},bx:{id:"transactionShipping",name:"ts",valueType:"currency",
maxLength:void 0,defaultValue:void 0},cx:{id:"transactionTax",name:"tt",valueType:"currency",maxLength:void 0,defaultValue:void 0},Vu:{id:"currencyCode",name:"cu",valueType:"text",maxLength:10,defaultValue:void 0},uv:{id:"itemPrice",name:"ip",valueType:"currency",maxLength:void 0,defaultValue:void 0},vv:{id:"itemQuantity",name:"iq",valueType:"integer",maxLength:void 0,defaultValue:void 0},sv:{id:"itemCode",name:"ic",valueType:"text",maxLength:500,defaultValue:void 0},tv:{id:"itemName",name:"in",valueType:"text",
maxLength:500,defaultValue:void 0},rv:{id:"itemCategory",name:"iv",valueType:"text",maxLength:500,defaultValue:void 0},Qu:{id:"campaignSource",name:"cs",valueType:"text",maxLength:100,defaultValue:void 0},Ou:{id:"campaignMedium",name:"cm",valueType:"text",maxLength:50,defaultValue:void 0},Pu:{id:"campaignName",name:"cn",valueType:"text",maxLength:100,defaultValue:void 0},Nu:{id:"campaignKeyword",name:"ck",valueType:"text",maxLength:500,defaultValue:void 0},Lu:{id:"campaignContent",name:"cc",valueType:"text",
maxLength:500,defaultValue:void 0},Mu:{id:"campaignId",name:"ci",valueType:"text",maxLength:100,defaultValue:void 0},pv:{id:"gclid",name:"gclid",valueType:"text",maxLength:void 0,defaultValue:void 0},Wu:{id:"dclid",name:"dclid",valueType:"text",maxLength:void 0,defaultValue:void 0},Kv:{id:"pageLoadTime",name:"plt",valueType:"integer",maxLength:void 0,defaultValue:void 0},Zu:{id:"dnsTime",name:"dns",valueType:"integer",maxLength:void 0,defaultValue:void 0},Sw:{id:"tcpConnectTime",name:"tcp",valueType:"integer",
maxLength:void 0,defaultValue:void 0},ow:{id:"serverResponseTime",name:"srt",valueType:"integer",maxLength:void 0,defaultValue:void 0},Jv:{id:"pageDownloadTime",name:"pdt",valueType:"integer",maxLength:void 0,defaultValue:void 0},Sv:{id:"redirectResponseTime",name:"rrt",valueType:"integer",maxLength:void 0,defaultValue:void 0},Tw:{id:"timingCategory",name:"utc",valueType:"text",maxLength:150,defaultValue:void 0},Ww:{id:"timingVar",name:"utv",valueType:"text",maxLength:500,defaultValue:void 0},Vw:{id:"timingValue",
name:"utt",valueType:"integer",maxLength:void 0,defaultValue:void 0},Uw:{id:"timingLabel",name:"utl",valueType:"text",maxLength:500,defaultValue:void 0},nv:{id:"exDescription",name:"exd",valueType:"text",maxLength:150,defaultValue:void 0},ov:{id:"exFatal",name:"exf",valueType:"boolean",maxLength:void 0,defaultValue:"1"}};var tyxb=function(a,b){for(var c=0,d=a.length-1,e=0;c<=d;){var f=Math.floor((c+d)/2),e=a[f];if(b<=e){d=0==f?0:a[f-1];if(b>d)return(d+1).toString()+"-"+e.toString();d=f-1}else if(b>e){if(f>=a.length-1)return(a[a.length-1]+1).toString()+"+";c=f+1}}return"<= 0"};var tyyb=function(){this.Ij=[]};tyyb.prototype.when=function(a){this.Ij.push(a);return this};tyyb.prototype.vu=function(a){var b=arguments;this.when(function(a){return tym(b,a.Nk)});return this};tyyb.prototype.$o=function(a,b){var c=ty0a(arguments,1);this.when(function(b){return tym(c,b.Cf.get(a))});return this};var tyzb=function(a,b){if(tyf(a.ub))throw Error("Filter has already been set.");a.ub=tyf(void 0)?tyg(b,void 0):b;return a};
tyyb.prototype.Uc=function(){if(0==this.Ij.length)throw Error("Must specify at least one predicate using #when or a helper method.");if(!tyf(this.ub))throw Error("Must specify a delegate filter using #applyFilter.");return tyg(function(a){tyUa(this.Ij,function(b){return b(a)})&&this.ub(a)},this)};var tyAb=function(){this.Op=!1;this.Zr="";this.hu=!1;this.Yg=null},tyBb=function(a){var b=new tyAb;if(null!=b.Yg)throw Error("LabelerBuilder: Only one labeling strategy may be used.");b.Yg=tyg(function(b){var d=b.Cf.get(tyvb),e=b.Cf.get(tyub);tyga(d)&&(d=a(d),null!=e&&this.Op&&(d=e+this.Zr+d),b.Cf.set(tyub,d))},b);return b};
tyAb.prototype.Uc=function(){if(null==this.Yg)throw Error("LabelerBuilder: a labeling strategy must be specified prior to calling build().");return tyzb((new tyyb).vu("event"),tyg(function(a){this.Yg(a);this.hu&&a.Cf.remove(tyvb)},this)).Uc()};var tyo=function(){this.ae=this.ae;this.Gd=this.Gd};tyo.prototype.ae=!1;tyo.prototype.isDisposed=function(){return this.ae};tyo.prototype.S=function(){this.ae||(this.ae=!0,this.D())};var tyCb=function(a,b){a.ae?b.call(void 0):(a.Gd||(a.Gd=[]),a.Gd.push(tyb(void 0)?tyg(b,void 0):b))};tyo.prototype.D=function(){if(this.Gd)for(;this.Gd.length;)this.Gd.shift()()};
var tyDb=function(a){a&&"function"==typeof a.S&&a.S()},tyEb=function(a){for(var b=0,c=arguments.length;b<c;++b){var d=arguments[b];tyfa(d)?tyEb.apply(null,d):tyDb(d)}};var typ=function(a,b){this.type=a;this.currentTarget=this.target=b;this.defaultPrevented=this.Id=!1;this.ko=!0};typ.prototype.stopPropagation=function(){this.Id=!0};typ.prototype.preventDefault=function(){this.defaultPrevented=!0;this.ko=!1};var tyFb=function(a){a.preventDefault()};var tyGb=[],tyHb=[],tyIb=!1,tyJb=function(a){tyGb[tyGb.length]=a;if(tyIb)for(var b=0;b<tyHb.length;b++)a(tyg(tyHb[b].bp,tyHb[b]))};var tyKb=function(a){tyKb[" "](a);return a};tyKb[" "]=tyca;var tyLb;t:{var tyMb=tya.navigator;if(tyMb){var tyNb=tyMb.userAgent;if(tyNb){tyLb=tyNb;break t}}tyLb=""}var tyq=function(a){return-1!=tyLb.indexOf(a)};var tyOb=function(){return tyq("iPhone")&&!tyq("iPod")&&!tyq("iPad")};var tyPb=tyq("Opera")||tyq("OPR"),tyr=tyq("Trident")||tyq("MSIE"),tys=tyq("Gecko")&&-1==tyLb.toLowerCase().indexOf("webkit")&&!(tyq("Trident")||tyq("MSIE")),tyt=-1!=tyLb.toLowerCase().indexOf("webkit");tyt&&tyq("Mobile");var tyQb=tyq("Macintosh"),tyRb=tyq("Windows"),tySb=tyq("Linux")||tyq("CrOS"),tyTb=tya.navigator||null;tyTb&&(tyTb.appVersion||"").indexOf("X11");
var tyUb=tyq("Android"),tyVb=tyOb(),tyWb=tyq("iPad"),tyXb=function(){var a=tya.document;return a?a.documentMode:void 0},tyYb=function(){var a="",b;if(tyPb&&tya.opera)return a=tya.opera.version,tye(a)?a():a;tys?b=/rv\:([^\);]+)(\)|;)/:tyr?b=/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/:tyt&&(b=/WebKit\/(\S+)/);b&&(a=(a=b.exec(tyLb))?a[1]:"");return tyr&&(b=tyXb(),b>parseFloat(a))?String(b):a}(),tyZb={},tyu=function(a){return tyZb[a]||(tyZb[a]=0<=tyKa(tyYb,a))},ty0b=function(a){return tyr&&ty_b>=a},ty1b=tya.document,
ty_b=ty1b&&tyr?tyXb()||("CSS1Compat"==ty1b.compatMode?parseInt(tyYb,10):5):void 0;var ty2b=!tyr||ty0b(9),ty3b=!tyr||ty0b(9),ty4b=tyr&&!tyu("9"),ty5b=!tyt||tyu("528"),ty6b=tys&&tyu("1.9b")||tyr&&tyu("8")||tyPb&&tyu("9.5")||tyt&&tyu("528"),ty7b=tys&&!tyu("8")||tyr&&!tyu("9");var ty8b=function(a,b){typ.call(this,a?a.type:"");this.relatedTarget=this.currentTarget=this.target=null;this.charCode=this.keyCode=this.button=this.screenY=this.screenX=this.clientY=this.clientX=this.offsetY=this.offsetX=0;this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1;this.state=null;this.Hj=!1;this.ab=null;a&&this.init(a,b)};tyi(ty8b,typ);var ty9b=[1,4,2];
ty8b.prototype.init=function(a,b){this.ab=a;var c=this.type=a.type;this.target=a.target||a.srcElement;this.currentTarget=b;var d=a.relatedTarget;if(d){if(tys){var e;t:{try{tyKb(d.nodeName);e=!0;break t}catch(f){}e=!1}e||(d=null)}}else"mouseover"==c?d=a.fromElement:"mouseout"==c&&(d=a.toElement);this.relatedTarget=d;Object.defineProperties?Object.defineProperties(this,{offsetX:{configurable:!0,enumerable:!0,get:this.jm,set:this.Ft},offsetY:{configurable:!0,enumerable:!0,get:this.km,set:this.Gt}}):
(this.offsetX=this.jm(),this.offsetY=this.km());this.clientX=void 0!==a.clientX?a.clientX:a.pageX;this.clientY=void 0!==a.clientY?a.clientY:a.pageY;this.screenX=a.screenX||0;this.screenY=a.screenY||0;this.button=a.button;this.keyCode=a.keyCode||0;this.charCode=a.charCode||("keypress"==c?a.keyCode:0);this.ctrlKey=a.ctrlKey;this.altKey=a.altKey;this.shiftKey=a.shiftKey;this.metaKey=a.metaKey;this.Hj=tyQb?a.metaKey:a.ctrlKey;this.state=a.state;a.defaultPrevented&&this.preventDefault()};
var ty$b=function(a){return(ty2b?0==a.ab.button:"click"==a.type?!0:!!(a.ab.button&ty9b[0]))&&!(tyt&&tyQb&&a.ctrlKey)};ty=ty8b.prototype;ty.stopPropagation=function(){ty8b.B.stopPropagation.call(this);this.ab.stopPropagation?this.ab.stopPropagation():this.ab.cancelBubble=!0};ty.preventDefault=function(){ty8b.B.preventDefault.call(this);var a=this.ab;if(a.preventDefault)a.preventDefault();else if(a.returnValue=!1,ty4b)try{if(a.ctrlKey||112<=a.keyCode&&123>=a.keyCode)a.keyCode=-1}catch(b){}};ty.lc=function(){return this.ab};
ty.jm=function(){return tyt||void 0!==this.ab.offsetX?this.ab.offsetX:this.ab.layerX};ty.Ft=function(a){Object.defineProperties(this,{offsetX:{writable:!0,enumerable:!0,configurable:!0,value:a}})};ty.km=function(){return tyt||void 0!==this.ab.offsetY?this.ab.offsetY:this.ab.layerY};ty.Gt=function(a){Object.defineProperties(this,{offsetY:{writable:!0,enumerable:!0,configurable:!0,value:a}})};var tyac="closure_listenable_"+(1E6*Math.random()|0),tybc=function(a){return!(!a||!a[tyac])},tycc=0;var tydc=function(a,b,c,d,e){this.listener=a;this.proxy=null;this.src=b;this.type=c;this.jg=!!d;this.Pg=e;this.key=++tycc;this.removed=this.ig=!1},tyec=function(a){a.removed=!0;a.listener=null;a.proxy=null;a.src=null;a.Pg=null};var tyfc=function(a){this.src=a;this.bb={};this.Tf=0};tyfc.prototype.add=function(a,b,c,d,e){var f=a.toString();a=this.bb[f];a||(a=this.bb[f]=[],this.Tf++);var g=tygc(a,b,d,e);-1<g?(b=a[g],c||(b.ig=!1)):(b=new tydc(b,this.src,f,!!d,e),b.ig=c,a.push(b));return b};tyfc.prototype.remove=function(a,b,c,d){a=a.toString();if(!(a in this.bb))return!1;var e=this.bb[a];b=tygc(e,b,c,d);return-1<b?(tyec(e[b]),tyk.splice.call(e,b,1),0==e.length&&(delete this.bb[a],this.Tf--),!0):!1};
var tyhc=function(a,b){var c=b.type;if(!(c in a.bb))return!1;var d=tyYa(a.bb[c],b);d&&(tyec(b),0==a.bb[c].length&&(delete a.bb[c],a.Tf--));return d};tyfc.prototype.removeAll=function(a){a=a&&a.toString();var b=0,c;for(c in this.bb)if(!a||c==a){for(var d=this.bb[c],e=0;e<d.length;e++)++b,tyec(d[e]);delete this.bb[c];this.Tf--}return b};tyfc.prototype.ef=function(a,b,c,d){a=this.bb[a.toString()];var e=-1;a&&(e=tygc(a,b,c,d));return-1<e?a[e]:null};
var tygc=function(a,b,c,d){for(var e=0;e<a.length;++e){var f=a[e];if(!f.removed&&f.listener==b&&f.jg==!!c&&f.Pg==d)return e}return-1};var tyic="closure_lm_"+(1E6*Math.random()|0),tyjc={},tykc=0,tyv=function(a,b,c,d,e){if(tyc(b)){for(var f=0;f<b.length;f++)tyv(a,b[f],c,d,e);return null}c=tylc(c);return tybc(a)?a.listen(b,c,d,e):tymc(a,b,c,!1,d,e)},tymc=function(a,b,c,d,e,f){if(!b)throw Error("Invalid event type");var g=!!e,h=tync(a);h||(a[tyic]=h=new tyfc(a));c=h.add(b,c,d,e,f);if(c.proxy)return c;d=tyoc();c.proxy=d;d.src=a;d.listener=c;a.addEventListener?a.addEventListener(b.toString(),d,g):a.attachEvent(typc(b.toString()),d);tykc++;
return c},tyoc=function(){var a=tyqc,b=ty3b?function(c){return a.call(b.src,b.listener,c)}:function(c){c=a.call(b.src,b.listener,c);if(!c)return c};return b},tyrc=function(a,b,c,d,e){if(tyc(b)){for(var f=0;f<b.length;f++)tyrc(a,b[f],c,d,e);return null}c=tylc(c);return tybc(a)?a.listenOnce(b,c,d,e):tymc(a,b,c,!0,d,e)},tysc=function(a,b,c,d,e){if(tyc(b))for(var f=0;f<b.length;f++)tysc(a,b[f],c,d,e);else c=tylc(c),tybc(a)?a.Z(b,c,d,e):a&&(a=tync(a))&&(b=a.ef(b,c,!!d,e))&&tytc(b)},tytc=function(a){if(tyga(a)||
!a||a.removed)return!1;var b=a.src;if(tybc(b))return tyhc(b.zc,a);var c=a.type,d=a.proxy;b.removeEventListener?b.removeEventListener(c,d,a.jg):b.detachEvent&&b.detachEvent(typc(c),d);tykc--;(c=tync(b))?(tyhc(c,a),0==c.Tf&&(c.src=null,b[tyic]=null)):tyec(a);return!0},typc=function(a){return a in tyjc?tyjc[a]:tyjc[a]="on"+a},tyvc=function(a,b,c,d){var e=!0;if(a=tync(a))if(b=a.bb[b.toString()])for(b=b.concat(),a=0;a<b.length;a++){var f=b[a];f&&f.jg==c&&!f.removed&&(f=tyuc(f,d),e=e&&!1!==f)}return e},
tyuc=function(a,b){var c=a.listener,d=a.Pg||a.src;a.ig&&tytc(a);return c.call(d,b)},tyqc=function(a,b){if(a.removed)return!0;if(!ty3b){var c=b||tyba("window.event"),d=new ty8b(c,this),e=!0;if(!(0>c.keyCode||void 0!=c.returnValue)){t:{var f=!1;if(0==c.keyCode)try{c.keyCode=-1;break t}catch(g){f=!0}if(f||void 0==c.returnValue)c.returnValue=!0}c=[];for(f=d.currentTarget;f;f=f.parentNode)c.push(f);for(var f=a.type,h=c.length-1;!d.Id&&0<=h;h--){d.currentTarget=c[h];var k=tyvc(c[h],f,!0,d),e=e&&k}for(h=
0;!d.Id&&h<c.length;h++)d.currentTarget=c[h],k=tyvc(c[h],f,!1,d),e=e&&k}return e}return tyuc(a,new ty8b(b,this))},tync=function(a){a=a[tyic];return a instanceof tyfc?a:null},tywc="__closure_events_fn_"+(1E9*Math.random()>>>0),tylc=function(a){if(tye(a))return a;a[tywc]||(a[tywc]=function(b){return a.handleEvent(b)});return a[tywc]};tyJb(function(a){tyqc=a(tyqc)});var tyw=function(){tyo.call(this);this.zc=new tyfc(this);this.Cp=this;this.Ej=null};tyi(tyw,tyo);tyw.prototype[tyac]=!0;ty=tyw.prototype;ty.ie=function(){return this.Ej};ty.kk=function(a){this.Ej=a};ty.addEventListener=function(a,b,c,d){tyv(this,a,b,c,d)};ty.removeEventListener=function(a,b,c,d){tysc(this,a,b,c,d)};
ty.dispatchEvent=function(a){var b,c=this.ie();if(c){b=[];for(var d=1;c;c=c.ie())b.push(c),++d}c=this.Cp;d=a.type||a;if(tyd(a))a=new typ(a,c);else if(a instanceof typ)a.target=a.target||c;else{var e=a;a=new typ(d,c);tyjb(a,e)}var e=!0,f;if(b)for(var g=b.length-1;!a.Id&&0<=g;g--)f=a.currentTarget=b[g],e=tyxc(f,d,!0,a)&&e;a.Id||(f=a.currentTarget=c,e=tyxc(f,d,!0,a)&&e,a.Id||(e=tyxc(f,d,!1,a)&&e));if(b)for(g=0;!a.Id&&g<b.length;g++)f=a.currentTarget=b[g],e=tyxc(f,d,!1,a)&&e;return e};
ty.D=function(){tyw.B.D.call(this);this.Zn();this.Ej=null};ty.listen=function(a,b,c,d){return this.zc.add(String(a),b,!1,c,d)};ty.listenOnce=function(a,b,c,d){return this.zc.add(String(a),b,!0,c,d)};ty.Z=function(a,b,c,d){return this.zc.remove(String(a),b,c,d)};ty.Zn=function(a){return this.zc?this.zc.removeAll(a):0};
var tyxc=function(a,b,c,d){b=a.zc.bb[String(b)];if(!b)return!0;b=b.concat();for(var e=!0,f=0;f<b.length;++f){var g=b[f];if(g&&!g.removed&&g.jg==c){var h=g.listener,k=g.Pg||g.src;g.ig&&tyhc(a.zc,g);e=!1!==h.call(k,d)&&e}}return e&&0!=d.ko};tyw.prototype.ef=function(a,b,c,d){return this.zc.ef(String(a),b,c,d)};var tyyc=function(a){tya.setTimeout(function(){throw a;},0)},tyzc,tyAc=function(){var a=tya.MessageChannel;"undefined"===typeof a&&"undefined"!==typeof window&&window.postMessage&&window.addEventListener&&!tyq("Presto")&&(a=function(){var a=document.createElement("iframe");a.style.display="none";a.src="";document.documentElement.appendChild(a);var b=a.contentWindow,a=b.document;a.open();a.write("");a.close();var c="callImmediate"+Math.random(),d="file:"==b.location.protocol?"*":b.location.protocol+
"//"+b.location.host,a=tyg(function(a){if(("*"==d||a.origin==d)&&a.data==c)this.port1.onmessage()},this);b.addEventListener("message",a,!1);this.port1={};this.port2={postMessage:function(){b.postMessage(c,d)}}});if("undefined"!==typeof a&&!tyq("Trident")&&!tyq("MSIE")){var b=new a,c={},d=c;b.port1.onmessage=function(){if(tyb(c.next)){c=c.next;var a=c.il;c.il=null;a()}};return function(a){d.next={il:a};d=d.next;b.port2.postMessage(0)}}return"undefined"!==typeof document&&"onreadystatechange"in document.createElement("script")?
function(a){var b=document.createElement("script");b.onreadystatechange=function(){b.onreadystatechange=null;b.parentNode.removeChild(b);b=null;a();a=null};document.documentElement.appendChild(b)}:function(a){tya.setTimeout(a,0)}},tyBc=ty5a;tyJb(function(a){tyBc=a});var tyHc=function(a,b){tyCc||tyDc();tyEc||(tyCc(),tyEc=!0);tyFc.push(new tyGc(a,b))},tyCc,tyDc=function(){if(tya.Promise&&tya.Promise.resolve){var a=tya.Promise.resolve();tyCc=function(){a.then(tyIc)}}else tyCc=function(){var a=tyIc,a=tyBc(a);!tye(tya.setImmediate)||tya.Window&&tya.Window.prototype.setImmediate==tya.setImmediate?(tyzc||(tyzc=tyAc()),tyzc(a)):tya.setImmediate(a)}},tyEc=!1,tyFc=[],tyIc=function(){for(;tyFc.length;){var a=tyFc;tyFc=[];for(var b=0;b<a.length;b++){var c=a[b];try{c.Eq.call(c.scope)}catch(d){tyyc(d)}}}tyEc=
!1},tyGc=function(a,b){this.Eq=a;this.scope=b};var tyJc=function(a){a.prototype.then=a.prototype.then;a.prototype.$goog_Thenable=!0},tyKc=function(a){if(!a)return!1;try{return!!a.$goog_Thenable}catch(b){return!1}};var tyMc=function(a,b){this.G=0;this.Nc=void 0;this.Fb=this.O=null;this.Ig=this.Ki=!1;try{var c=this;a.call(b,function(a){tyLc(c,2,a)},function(a){tyLc(c,3,a)})}catch(d){tyLc(this,3,d)}};tyMc.prototype.then=function(a,b,c){return tyNc(this,tye(a)?a:null,tye(b)?b:null,c)};tyJc(tyMc);tyMc.prototype.cancel=function(a){0==this.G&&tyHc(function(){var b=new tyOc(a);tyPc(this,b)},this)};
var tyPc=function(a,b){if(0==a.G)if(a.O){var c=a.O;if(c.Fb){for(var d=0,e=-1,f=0,g;g=c.Fb[f];f++)if(g=g.Te)if(d++,g==a&&(e=f),0<=e&&1<d)break;0<=e&&(0==c.G&&1==d?tyPc(c,b):(d=c.Fb.splice(e,1)[0],tyQc(c,d,3,b)))}}else tyLc(a,3,b)},tySc=function(a,b){a.Fb&&a.Fb.length||2!=a.G&&3!=a.G||tyRc(a);a.Fb||(a.Fb=[]);a.Fb.push(b)},tyNc=function(a,b,c,d){var e={Te:null,Jn:null,Nn:null};e.Te=new tyMc(function(a,g){e.Jn=b?function(c){try{var e=b.call(d,c);a(e)}catch(l){g(l)}}:a;e.Nn=c?function(b){try{var e=c.call(d,
b);!tyb(e)&&b instanceof tyOc?g(b):a(e)}catch(l){g(l)}}:g});e.Te.O=a;tySc(a,e);return e.Te};tyMc.prototype.Uo=function(a){this.G=0;tyLc(this,2,a)};tyMc.prototype.Vo=function(a){this.G=0;tyLc(this,3,a)};
var tyLc=function(a,b,c){if(0==a.G){if(a==c)b=3,c=new TypeError("Promise cannot resolve to itself");else{if(tyKc(c)){a.G=1;c.then(a.Uo,a.Vo,a);return}if(tyf(c))try{var d=c.then;if(tye(d)){tyTc(a,c,d);return}}catch(e){b=3,c=e}}a.Nc=c;a.G=b;tyRc(a);3!=b||c instanceof tyOc||tyUc(a,c)}},tyTc=function(a,b,c){a.G=1;var d=!1,e=function(b){d||(d=!0,a.Uo(b))},f=function(b){d||(d=!0,a.Vo(b))};try{c.call(b,e,f)}catch(g){f(g)}},tyRc=function(a){a.Ki||(a.Ki=!0,tyHc(a.Aq,a))};
tyMc.prototype.Aq=function(){for(;this.Fb&&this.Fb.length;){var a=this.Fb;this.Fb=[];for(var b=0;b<a.length;b++)tyQc(this,a[b],this.G,this.Nc)}this.Ki=!1};var tyQc=function(a,b,c,d){if(2==c)b.Jn(d);else{if(b.Te)for(;a&&a.Ig;a=a.O)a.Ig=!1;b.Nn(d)}},tyUc=function(a,b){a.Ig=!0;tyHc(function(){a.Ig&&tyVc.call(null,b)})},tyVc=tyyc,tyOc=function(a){tyj.call(this,a)};tyi(tyOc,tyj);tyOc.prototype.name="cancel";/*
 Portions of this code are from MochiKit, received by
 The Closure Authors under the MIT license. All other code is Copyright
 2005-2009 The Closure Authors. All Rights Reserved.
*/
var tyx=function(a,b){this.Jd=[];this.Hn=a;this.wl=b||null;this.jf=this.Bc=!1;this.Nc=void 0;this.Ak=this.Rp=this.oi=!1;this.Th=0;this.O=null;this.gg=0};tyx.prototype.cancel=function(a){if(this.Bc)this.Nc instanceof tyx&&this.Nc.cancel();else{if(this.O){var b=this.O;delete this.O;a?b.cancel(a):(b.gg--,0>=b.gg&&b.cancel())}this.Hn?this.Hn.call(this.wl,this):this.Ak=!0;this.Bc||this.V(new tyWc)}};tyx.prototype.pl=function(a,b){this.oi=!1;tyXc(this,a,b)};
var tyXc=function(a,b,c){a.Bc=!0;a.Nc=c;a.jf=!b;tyYc(a)};tyx.prototype.kl=function(){if(this.Bc){if(!this.Ak)throw new tyZc;this.Ak=!1}};tyx.prototype.callback=function(a){this.kl();tyXc(this,!0,a)};tyx.prototype.V=function(a){this.kl();tyXc(this,!1,a)};tyx.prototype.addCallback=function(a,b){return tyy(this,a,null,b)};var ty_c=function(a,b,c){tyy(a,null,b,c)},tyy=function(a,b,c,d){a.Jd.push([b,c,d]);a.Bc&&tyYc(a);return a};
tyx.prototype.then=function(a,b,c){var d,e,f=new tyMc(function(a,b){d=a;e=b});tyy(this,d,function(a){a instanceof tyWc?f.cancel():e(a)});return f.then(a,b,c)};tyJc(tyx);var ty0c=function(a,b){b instanceof tyx?a.addCallback(tyg(b.qd,b)):a.addCallback(function(){return b})};tyx.prototype.qd=function(a){var b=new tyx;tyy(this,b.callback,b.V,b);a&&(b.O=this,this.gg++);return b};
var ty1c=function(a){return tyTa(a.Jd,function(a){return tye(a[1])})},tyYc=function(a){if(a.Th&&a.Bc&&ty1c(a)){var b=a.Th,c=ty2c[b];c&&(c.kt(),delete ty2c[b]);a.Th=0}a.O&&(a.O.gg--,delete a.O);for(var b=a.Nc,d=c=!1;a.Jd.length&&!a.oi;){var e=a.Jd.shift(),f=e[0],g=e[1],e=e[2];if(f=a.jf?g:f)try{var h=f.call(e||a.wl,b);tyb(h)&&(a.jf=a.jf&&(h==b||h instanceof Error),a.Nc=b=h);tyKc(b)&&(d=!0,a.oi=!0)}catch(k){b=k,a.jf=!0,ty1c(a)||(c=!0)}}a.Nc=b;d&&(h=tyg(a.pl,a,!0),d=tyg(a.pl,a,!1),b instanceof tyx?(tyy(b,
h,d),b.Rp=!0):b.then(h,d));c&&(b=new ty3c(b),ty2c[b.Da]=b,a.Th=b.Da)},ty4c=function(a){var b=new tyx;b.callback(a);return b},ty5c=function(a){var b=new tyx;b.V(a);return b},tyZc=function(){tyj.call(this)};tyi(tyZc,tyj);tyZc.prototype.message="Deferred has already fired";tyZc.prototype.name="AlreadyCalledError";var tyWc=function(){tyj.call(this)};tyi(tyWc,tyj);tyWc.prototype.message="Deferred was canceled";tyWc.prototype.name="CanceledError";
var ty3c=function(a){this.Da=tya.setTimeout(tyg(this.ku,this),0);this.pg=a};ty3c.prototype.ku=function(){delete ty2c[this.Da];throw this.pg;};ty3c.prototype.kt=function(){tya.clearTimeout(this.Da)};var ty2c={};var ty6c=function(){tyw.call(this);this.Jc="google-analytics";this.fb=chrome.storage.local;chrome.storage.onChanged.addListener(tyg(this.Aj,this))};tyi(ty6c,tyw);ty6c.prototype.Aj=function(a){ty7c(this,a)&&this.dispatchEvent("a")};var ty7c=function(a,b){return tyTa(tycb(b),function(a){return 0==a.lastIndexOf(this.Jc,0)},a)};
ty6c.prototype.get=function(a){var b=new tyx,c=this.Jc+"."+a;this.fb.get(c,function(a){chrome.runtime.lastError?b.V(chrome.runtime.lastError):(a=a[c],b.callback(null!=a?a.toString():void 0))});return b};ty6c.prototype.set=function(a,b){var c=new tyx,d={};d[this.Jc+"."+a]=b;this.fb.set(d,function(){chrome.runtime.lastError?c.V(chrome.runtime.lastError):c.callback()});return c};tykb("area base br col command embed hr img input keygen link meta param source track wbr".split(" "));var ty9c=function(){this.th="";this.wp=ty8c};ty9c.prototype.Ml=function(){return 1};var ty8c={};var tyad=function(){this.th="";this.vp=ty$c;this.Zd=null};tyad.prototype.Ml=function(){return this.Zd};var tybd=function(a){return a instanceof tyad&&a.constructor===tyad&&a.vp===ty$c?a.th:"type_error:SafeHtml"};tykb("action","cite","data","formaction","href","manifest","poster","src");tykb("embed","iframe","link","object","script","style","template");var ty$c={};tyad.prototype.an=function(a,b){this.th=a;this.Zd=b;return this};var tycd=(new tyad).an("",0);var tyz=function(a,b){this.x=tyb(a)?a:0;this.y=tyb(b)?b:0};tyz.prototype.clone=function(){return new tyz(this.x,this.y)};var tydd=function(a,b){return new tyz(a.x-b.x,a.y-b.y)};tyz.prototype.ceil=function(){this.x=Math.ceil(this.x);this.y=Math.ceil(this.y);return this};tyz.prototype.floor=function(){this.x=Math.floor(this.x);this.y=Math.floor(this.y);return this};tyz.prototype.round=function(){this.x=Math.round(this.x);this.y=Math.round(this.y);return this};var tyed=function(a,b){this.width=a;this.height=b};ty=tyed.prototype;ty.clone=function(){return new tyed(this.width,this.height)};ty.Ad=function(){return!(this.width*this.height)};ty.ceil=function(){this.width=Math.ceil(this.width);this.height=Math.ceil(this.height);return this};ty.floor=function(){this.width=Math.floor(this.width);this.height=Math.floor(this.height);return this};ty.round=function(){this.width=Math.round(this.width);this.height=Math.round(this.height);return this};var tyfd=!tyr||ty0b(9),tygd=!tys&&!tyr||tyr&&ty0b(9)||tys&&tyu("1.9.1"),tyhd=tyr&&!tyu("9"),tyid=tyr||tyPb||tyt;var tyB=function(a){return a?new tyjd(tyA(a)):tyqa||(tyqa=new tyjd)},tyld=function(a,b){var c=b||document,d=null;return(d=c.querySelectorAll&&c.querySelector?c.querySelector("."+a):tykd(document,"*",a,b)[0])||null},tymd=function(a,b){return tyld(a,b)},tykd=function(a,b,c,d){a=d||a;b=b&&"*"!=b?b.toUpperCase():"";if(a.querySelectorAll&&a.querySelector&&(b||c))return a.querySelectorAll(b+(c?"."+c:""));if(c&&a.getElementsByClassName){a=a.getElementsByClassName(c);if(b){d={};for(var e=0,f=0,g;g=a[f];f++)b==
g.nodeName&&(d[e++]=g);d.length=e;return d}return a}a=a.getElementsByTagName(b||"*");if(c){d={};for(f=e=0;g=a[f];f++)b=g.className,"function"==typeof b.split&&tym(b.split(/\s+/),c)&&(d[e++]=g);d.length=e;return d}return a},tyod=function(a,b){tyab(b,function(b,d){"style"==d?a.style.cssText=b:"class"==d?a.className=b:"for"==d?a.htmlFor=b:d in tynd?a.setAttribute(tynd[d],b):0==d.lastIndexOf("aria-",0)||0==d.lastIndexOf("data-",0)?a.setAttribute(d,b):a[d]=b})},tynd={cellpadding:"cellPadding",cellspacing:"cellSpacing",
colspan:"colSpan",frameborder:"frameBorder",height:"height",maxlength:"maxLength",role:"role",rowspan:"rowSpan",type:"type",usemap:"useMap",valign:"vAlign",width:"width"},typd=function(a){a=(a||window).document;a="CSS1Compat"==a.compatMode?a.documentElement:a.body;return new tyed(a.clientWidth,a.clientHeight)},tyqd=function(a){return tyt||"CSS1Compat"!=a.compatMode?a.body||a.documentElement:a.documentElement},tyrd=function(a){return a?a.parentWindow||a.defaultView:window},tytd=function(a,b,c){return tysd(document,
arguments)},tysd=function(a,b){var c=b[0],d=b[1];if(!tyfd&&d&&(d.name||d.type)){c=["<",c];d.name&&c.push(' name="',tyCa(d.name),'"');if(d.type){c.push(' type="',tyCa(d.type),'"');var e={};tyjb(e,d);delete e.type;d=e}c.push(">");c=c.join("")}c=a.createElement(c);d&&(tyd(d)?c.className=d:tyc(d)?c.className=d.join(" "):tyod(c,d));2<b.length&&tyud(a,c,b,2);return c},tyud=function(a,b,c,d){function e(c){c&&b.appendChild(tyd(c)?a.createTextNode(c):c)}for(;d<c.length;d++){var f=c[d];!tyfa(f)||tyf(f)&&0<
f.nodeType?e(f):tyl(tyvd(f)?ty_a(f):f,e)}},tywd=function(a,b){tyud(tyA(a),a,arguments,1)},tyxd=function(a){for(var b;b=a.firstChild;)a.removeChild(b)},tyyd=function(a){return a&&a.parentNode?a.parentNode.removeChild(a):null},tyzd=function(a){if(void 0!=a.firstElementChild)a=a.firstElementChild;else for(a=a.firstChild;a&&1!=a.nodeType;)a=a.nextSibling;return a},tyAd=function(a){return tyf(a)&&1==a.nodeType},tyBd=function(a){var b;if(tyid&&!(tyr&&tyu("9")&&!tyu("10")&&tya.SVGElement&&a instanceof tya.SVGElement)&&
(b=a.parentElement))return b;b=a.parentNode;return tyAd(b)?b:null},tyCd=function(a,b){if(a.contains&&1==b.nodeType)return a==b||a.contains(b);if("undefined"!=typeof a.compareDocumentPosition)return a==b||Boolean(a.compareDocumentPosition(b)&16);for(;b&&a!=b;)b=b.parentNode;return b==a},tyA=function(a){return 9==a.nodeType?a:a.ownerDocument||a.document},tyC=function(a,b){if("textContent"in a)a.textContent=b;else if(3==a.nodeType)a.data=b;else if(a.firstChild&&3==a.firstChild.nodeType){for(;a.lastChild!=
a.firstChild;)a.removeChild(a.lastChild);a.firstChild.data=b}else{tyxd(a);var c=tyA(a);a.appendChild(c.createTextNode(String(b)))}},tyDd={SCRIPT:1,STYLE:1,HEAD:1,IFRAME:1,OBJECT:1},tyEd={IMG:" ",BR:"\n"},tyHd=function(a){return tyFd(a)&&tyGd(a)},tyId=function(a,b){b?a.tabIndex=0:(a.tabIndex=-1,a.removeAttribute("tabIndex"))},tyFd=function(a){a=a.getAttributeNode("tabindex");return null!=a&&a.specified},tyGd=function(a){a=a.tabIndex;return tyga(a)&&0<=a&&32768>a},tyKd=function(a){if(tyhd&&"innerText"in
a)a=a.innerText.replace(/(\r\n|\r|\n)/g,"\n");else{var b=[];tyJd(a,b,!0);a=b.join("")}a=a.replace(/ \xAD /g," ").replace(/\xAD/g,"");a=a.replace(/\u200B/g,"");tyhd||(a=a.replace(/ +/g," "));" "!=a&&(a=a.replace(/^\s*/,""));return a},tyLd=function(a){var b=[];tyJd(a,b,!1);return b.join("")},tyJd=function(a,b,c){if(!(a.nodeName in tyDd))if(3==a.nodeType)c?b.push(String(a.nodeValue).replace(/(\r\n|\r|\n)/g,"")):b.push(a.nodeValue);else if(a.nodeName in tyEd)b.push(tyEd[a.nodeName]);else for(a=a.firstChild;a;)tyJd(a,
b,c),a=a.nextSibling},tyvd=function(a){if(a&&"number"==typeof a.length){if(tyf(a))return"function"==typeof a.item||"string"==typeof a.item;if(tye(a))return"function"==typeof a.item}return!1},tyMd=function(){var a=document;try{return a&&a.activeElement}catch(b){}return null},tyjd=function(a){this.va=a||tya.document||document};ty=tyjd.prototype;ty.H=tyB;ty.ya=function(){return this.va};ty.A=function(a){return tyd(a)?this.va.getElementById(a):a};ty.L=function(a,b){return tyld(a,b||this.va)};
ty.Lb=function(a,b){return tyld(a,b||this.va)};ty.F=function(a,b,c){return tysd(this.va,arguments)};ty.createElement=function(a){return this.va.createElement(a)};ty.createTextNode=function(a){return this.va.createTextNode(String(a))};var tyNd=function(a){return"CSS1Compat"==a.va.compatMode};tyjd.prototype.getWindow=function(){var a=this.va;return a.parentWindow||a.defaultView};
var tyOd=function(a){var b=a.va;a=tyqd(b);b=b.parentWindow||b.defaultView;return tyr&&tyu("10")&&b.pageYOffset!=a.scrollTop?new tyz(a.scrollLeft,a.scrollTop):new tyz(b.pageXOffset||a.scrollLeft,b.pageYOffset||a.scrollTop)};ty=tyjd.prototype;ty.appendChild=function(a,b){a.appendChild(b)};ty.append=tywd;ty.removeNode=tyyd;ty.getChildren=function(a){return tygd&&void 0!=a.children?a.children:tyRa(a.childNodes,function(a){return 1==a.nodeType})};ty.contains=tyCd;
ty.Hc=function(a){var b;(b="A"==a.tagName||"INPUT"==a.tagName||"TEXTAREA"==a.tagName||"SELECT"==a.tagName||"BUTTON"==a.tagName?!a.disabled&&(!tyFd(a)||tyGd(a)):tyHd(a))&&tyr?(a=tye(a.getBoundingClientRect)?a.getBoundingClientRect():{height:a.offsetHeight,width:a.offsetWidth},a=null!=a&&0<a.height&&0<a.width):a=b;return a};var tyPd={id:"apiVersion",name:"v",valueType:"text",maxLength:void 0,defaultValue:void 0},tyQd={id:"appName",name:"an",valueType:"text",maxLength:100,defaultValue:void 0},tyRd={id:"appVersion",name:"av",valueType:"text",maxLength:100,defaultValue:void 0},tySd={id:"clientId",name:"cid",valueType:"text",maxLength:void 0,defaultValue:void 0},tyTd={id:"language",name:"ul",valueType:"text",maxLength:20,defaultValue:void 0},tyUd={id:"libVersion",name:"_v",valueType:"text",maxLength:void 0,defaultValue:void 0},
tyVd={id:"sampleRateOverride",name:"usro",valueType:"integer",maxLength:void 0,defaultValue:void 0},tyWd={id:"screenColors",name:"sd",valueType:"text",maxLength:20,defaultValue:void 0},tyXd={id:"screenResolution",name:"sr",valueType:"text",maxLength:20,defaultValue:void 0},tyYd={id:"trackingId",name:"tid",valueType:"text",maxLength:void 0,defaultValue:void 0},tyZd={id:"viewportSize",name:"vp",valueType:"text",maxLength:20,defaultValue:void 0},ty_d={Eu:tyPd,Iu:tyQd,Ju:tyRd,Su:tySd,wv:tyTd,yv:tyUd,
iw:tyVd,jw:tyWd,kw:tyXd,Yw:tyYd,Ex:tyZd},ty1d=function(a){if(!tyd(a))return a;var b=ty0d(a,tywb);if(tyf(b))return b;b=ty0d(a,ty_d);if(tyf(b))return b;b=/^dimension(\d+)$/.exec(a);if(null!==b){a=parseInt(b[1],10);if(1>a||200<a)throw Error("Expected dimension index range 1-200, but was : "+a);return{id:"dimension"+a,name:"cd"+a,valueType:"text",maxLength:150,defaultValue:void 0}}b=/^metric(\d+)$/.exec(a);if(null!==b){a=parseInt(b[1],10);if(1>a||200<a)throw Error("Expected metric index range 1-200, but was : "+
a);return{id:"metric"+a,name:"cm"+a,valueType:"integer",maxLength:void 0,defaultValue:void 0}}throw Error(a+" is not a valid parameter name.");},ty0d=function(a,b){var c=tyfb(b,function(b){return b.id==a&&"metric"!=a&&"dimension"!=a});return tyf(c)?c:null};var ty3d=function(a,b){var c=Array.prototype.slice.call(arguments),d=c.shift();if("undefined"==typeof d)throw Error("[goog.string.format] Template required");return d.replace(/%([0\-\ \+]*)(\d+)?(\.(\d+))?([%sfdiu])/g,function(a,b,d,h,k,l,m,n){if("%"==l)return"%";var p=c.shift();if("undefined"==typeof p)throw Error("[goog.string.format] Not enough arguments");arguments[0]=p;return ty2d[l].apply(null,arguments)})},ty2d={s:function(a,b,c){return isNaN(c)||""==c||a.length>=c?a:a=-1<b.indexOf("-",0)?
a+tyGa(" ",c-a.length):tyGa(" ",c-a.length)+a},f:function(a,b,c,d,e){d=a.toString();isNaN(e)||""==e||(d=a.toFixed(e));var f;f=0>a?"-":0<=b.indexOf("+")?"+":0<=b.indexOf(" ")?" ":"";0<=a&&(d=f+d);if(isNaN(c)||d.length>=c)return d;d=isNaN(e)?Math.abs(a).toString():Math.abs(a).toFixed(e);a=c-d.length-f.length;0<=b.indexOf("-",0)?d=f+d+tyGa(" ",a):(b=0<=b.indexOf("0",0)?"0":" ",d=f+tyGa(b,a)+d);return d},d:function(a,b,c,d,e,f,g,h){return ty2d.f(parseInt(a,10),b,c,d,0,f,g,h)}};ty2d.i=ty2d.d;ty2d.u=ty2d.d;var ty4d=function(a){if("function"==typeof a.zb)a=a.zb();else if(tyfa(a)||tyd(a))a=a.length;else{var b=0,c;for(c in a)b++;a=b}return a},ty5d=function(a){if("function"==typeof a.Ca)return a.Ca();if(tyd(a))return a.split("");if(tyfa(a)){for(var b=[],c=a.length,d=0;d<c;d++)b.push(a[d]);return b}return tybb(a)},ty6d=function(a){if("function"==typeof a.$b)return a.$b();if("function"!=typeof a.Ca){if(tyfa(a)||tyd(a)){var b=[];a=a.length;for(var c=0;c<a;c++)b.push(c);return b}return tycb(a)}},ty7d=function(a,
b){if("function"==typeof a.forEach)a.forEach(b,void 0);else if(tyfa(a)||tyd(a))tyl(a,b,void 0);else for(var c=ty6d(a),d=ty5d(a),e=d.length,f=0;f<e;f++)b.call(void 0,d[f],c&&c[f],a)},ty8d=function(a,b){if("function"==typeof a.every)return a.every(b,void 0);if(tyfa(a)||tyd(a))return tyUa(a,b,void 0);for(var c=ty6d(a),d=ty5d(a),e=d.length,f=0;f<e;f++)if(!b.call(void 0,d[f],c&&c[f],a))return!1;return!0};var ty9d=function(a){this.Ib=new tyn;if(0<arguments.length%2)throw Error("Uneven number of arguments to ParameterMap constructor.");for(var b=arguments,c=0;c<b.length;c+=2)this.set(b[c],b[c+1])};ty9d.prototype.set=function(a,b){if(null==b)throw Error("undefined-or-null value for key: "+a.name);this.Ib.set(a.name,{key:a,value:b})};ty9d.prototype.remove=function(a){this.Ib.remove(a.name)};ty9d.prototype.get=function(a){a=this.Ib.get(a.name,null);return null===a?null:a.value};ty9d.prototype.Tc=function(a){this.Ib.Tc(a.Ib)};
var ty$d=function(a,b){tyl(a.Ib.Ca(),function(a){b(a.key,a.value)})};ty9d.prototype.clone=function(){var a=new ty9d;a.Ib=this.Ib.clone();return a};ty9d.prototype.wa=function(a){return this.Ib.length!==a.Ib.length?!1:tyUa(this.Ib.Ca(),function(b){return b.value==a.get(b.key)})};ty9d.prototype.contains=function(a){return tyUa(a.Ib.Ca(),tyg(function(a){return a.value==this.get(a.key)},this))};ty9d.prototype.toString=function(){var a={};ty$d(this,function(b,c){a[b.id]=c});return JSON.stringify(a)};var tyae=function(a,b){this.$p=b;this.ib=b.Qi();this.Sn=new ty9d;this.Eo=!1};tyae.prototype.set=function(a,b){if(null==b)throw Error("Value must be defined and not null. Parameter="+a.id);var c=ty1d(a);this.Sn.set(c,b)};tyae.prototype.od=function(a){this.$p.od(a)};tyae.prototype.send=function(a,b){var c=this.Sn.clone();b instanceof ty9d?c.Tc(b):tyf(b)&&tyab(b,function(a,b){null!=a&&c.set(ty1d(b),a)},this);this.Eo&&(this.Eo=!1,c.set(tyrb,"start"));return this.ib.send(a,c)};var tyee=function(a){var b=tybe(),c;typb||(c=tybe(),typb=new tyce(c,new tyde(c,"https://www.google-analytics.com/collect",8192)));c=typb;this.$r="ca1.6.0prerelease";this.Mp="Google Play Music";this.Np=a;this.Qa=b;this.Zp=c};var tyfe=function(a,b){tyw.call(this);this.zd=a||1;this.Fe=b||tya;this.pi=tyg(this.lu,this);this.kj=tyh()};tyi(tyfe,tyw);ty=tyfe.prototype;ty.enabled=!1;ty.Na=null;ty.setInterval=function(a){this.zd=a;this.Na&&this.enabled?(this.stop(),this.start()):this.Na&&this.stop()};
ty.lu=function(){if(this.enabled){var a=tyh()-this.kj;0<a&&a<.8*this.zd?this.Na=this.Fe.setTimeout(this.pi,this.zd-a):(this.Na&&(this.Fe.clearTimeout(this.Na),this.Na=null),this.dispatchEvent("tick"),this.enabled&&(this.Na=this.Fe.setTimeout(this.pi,this.zd),this.kj=tyh()))}};ty.start=function(){this.enabled=!0;this.Na||(this.Na=this.Fe.setTimeout(this.pi,this.zd),this.kj=tyh())};ty.stop=function(){this.enabled=!1;this.Na&&(this.Fe.clearTimeout(this.Na),this.Na=null)};
ty.D=function(){tyfe.B.D.call(this);this.stop();delete this.Fe};var tyge=function(a,b,c){if(tye(a))c&&(a=tyg(a,c));else if(a&&"function"==typeof a.handleEvent)a=tyg(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<b?-1:tya.setTimeout(a,b||0)};var tyhe=function(){tyw.call(this);this.Jc="google-analytics";this.fb=window.localStorage;tyv(window,"storage",tyg(this.Aj,this),!1)};tyi(tyhe,tyw);tyhe.prototype.get=function(a){var b=this.Im(a),c=new tyx;tyge(function(){c.callback(b)});return c};tyhe.prototype.set=function(a,b){b!=this.Im(a)&&(this.fb.setItem(this.Jc+"."+a,b),this.dispatchEvent("a"));var c=new tyx;tyge(function(){c.callback()});return c};
tyhe.prototype.Aj=function(a){a instanceof StorageEvent||"storage"!=a.type||(a=window.event);if(!("storageArea"in a))throw Error('"storageArea" property missing from event type: '+a.type);if(!("key"in a))throw Error('"key" property missing from event type: '+a.type);a.storageArea==this.fb&&0==a.key.lastIndexOf(this.Jc,0)&&this.dispatchEvent("a")};tyhe.prototype.Im=function(a){a=this.fb.getItem(this.Jc+"."+a);return null!=a?a:void 0};var tyie=function(){};tyda(tyie);tyie.prototype.send=function(){return ty4c()};var tyje=function(a){this.Li=[];this.ub=a};tyje.prototype.od=function(a){if(!tye(a))throw Error("Invalid filter. Must be a function.");this.Li.push(a)};tyje.prototype.send=function(a,b){for(var c=new tyke(a,b),d=0;d<this.Li.length&&(this.Li[d](c),!c.ti);d++);return c.ti?ty4c():this.ub.send(a,b)};var tyke=function(a,b){this.Nk=a;this.Cf=b;this.ti=!1};tyke.prototype.cancel=function(){this.ti=!0};var tyle=function(a){this.oq=a};tyle.prototype.send=function(a,b){this.oq.push({Lr:a,parameters:b});return ty4c()};var tyme=function(a,b,c){this.Qa=a;this.be=[];this.rd={enabled:new tyle(this.be),disabled:c};this.ib=this.rd.enabled;tyy(this.Qa.ye.qd(),tyma(this.Ns,b),this.Ms,this)};tyme.prototype.Ns=function(a){if(null===this.be)throw Error("Channel setup already completed.");this.rd.enabled=a();tyne(this);tyl(this.be,function(a){this.send(a.Lr,a.parameters)},this);this.be=null;tyoe(this.Qa,tyg(this.Ls,this))};
tyme.prototype.Ms=function(){if(null===this.be)throw Error("Channel setup already completed.");this.ib=this.rd.enabled=this.rd.disabled;this.be=null};tyme.prototype.send=function(a,b){return this.ib.send(a,b)};var tyne=function(a){a.ib=type(a.Qa)?a.rd.enabled:a.rd.disabled};tyme.prototype.Ls=function(a){switch(a){case "analytics.tracking-permitted":tyne(this)}};var tyqe=function(a,b){this.qi=[];var c=tyg(function(){this.tg=new tyje(b.Qi());tyl(this.qi,function(a){this.tg.od(a)},this);this.qi=null;return this.tg},this);this.ib=new tyme(a,c,tyie.Ua())};tyqe.prototype.Qi=function(){return this.ib};tyqe.prototype.od=function(a){this.tg?this.tg.od(a):this.qi.push(a)};var tyce=function(a,b){this.Qa=a;this.Yt=b};tyce.prototype.create=function(){return new tyqe(this.Qa,this.Yt)};var tyre=function(a,b,c,d,e,f){tyx.call(this,e,f);this.nj=a;this.Ci=[];this.Dl=!!b;this.Dq=!!c;this.eq=!!d;for(b=this.Cn=0;b<a.length;b++)tyy(a[b],tyg(this.Km,this,b,!0),tyg(this.Km,this,b,!1));0!=a.length||this.Dl||this.callback(this.Ci)};tyi(tyre,tyx);tyre.prototype.Km=function(a,b,c){this.Cn++;this.Ci[a]=[b,c];this.Bc||(this.Dl&&b?this.callback([a,c]):this.Dq&&!b?this.V(c):this.Cn==this.nj.length&&this.callback(this.Ci));this.eq&&!b&&(c=null);return c};
tyre.prototype.V=function(a){tyre.B.V.call(this,a);for(a=0;a<this.nj.length;a++)this.nj[a].cancel()};var tyse=function(a){return(new tyre(a,!1,!0)).addCallback(function(a){for(var c=[],d=0;d<a.length;d++)c[d]=a[d][1];return c})};var tyte=function(a){this.fb=a;this.mt=100;this.jl=[];this.ph=this.Rk=null;this.ye=this.ej();this.ye.addCallback(function(){this.Jo=tyv(this.fb,"a",tyg(this.yr,this))},this)};tyte.prototype.ej=function(){return tyse([tyue(this),tyve(this)]).addCallback(function(){return this},this)};tyte.prototype.yr=function(){tywe(this);var a=this.gf(),b=type(this);tyse([tyue(this),tyve(this)]).addCallback(function(){if(a!=this.gf())throw Error("User ID changed unexpectedly!");b!=type(this)&&tyxe(this)},this)};
var tyoe=function(a,b){tywe(a);a.jl.push(b)},type=function(a){tywe(a);if(a=a.ph)a=tya._gaUserPrefs,a=!(a&&a.ioo&&a.ioo());return a},tyue=function(a){return a.fb.get("analytics.tracking-permitted").addCallback(function(a){this.ph=!0;if(tyb(a))switch(a){case "true":this.ph=!0;break;case "false":this.ph=!1}},a)};tyte.prototype.gf=function(){tywe(this);if(!tyd(this.Rk))throw Error("Invalid state. UserID is not a string.");return this.Rk};
var tyve=function(a){return a.fb.get("analytics.user-id").addCallback(function(a){if(!tyb(a)){a="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".split("");for(var c=0,d=a.length;c<d;c++)switch(a[c]){case "x":a[c]=Math.floor(16*Math.random()).toString(16);break;case "y":a[c]=(Math.floor(4*Math.random())+8).toString(16)}a=a.join("");this.fb.set("analytics.user-id",a)}this.Rk=a},a)},tyye=function(a){tywe(a);return a.mt},tyxe=function(a){tyl(a.jl,function(a){a("analytics.tracking-permitted")})};
tyte.prototype.S=function(){null!=this.Jo&&tytc(this.Jo)};var tywe=function(a){if(!a.ye.qd().Bc)throw Error("Settings object accessed prior to entering ready state.");};var tyD=function(a){tyo.call(this);this.pe=a;this.X={}};tyi(tyD,tyo);var tyze=[];tyD.prototype.listen=function(a,b,c,d){tyc(b)||(b&&(tyze[0]=b.toString()),b=tyze);for(var e=0;e<b.length;e++){var f=tyv(a,b[e],c||this.handleEvent,d||!1,this.pe||this);if(!f)break;this.X[f.key]=f}return this};tyD.prototype.listenOnce=function(a,b,c,d){return tyAe(this,a,b,c,d)};
var tyAe=function(a,b,c,d,e,f){if(tyc(c))for(var g=0;g<c.length;g++)tyAe(a,b,c[g],d,e,f);else{b=tyrc(b,c,d||a.handleEvent,e,f||a.pe||a);if(!b)return a;a.X[b.key]=b}return a};tyD.prototype.Z=function(a,b,c,d,e){if(tyc(b))for(var f=0;f<b.length;f++)this.Z(a,b[f],c,d,e);else c=c||this.handleEvent,e=e||this.pe||this,c=tylc(c),d=!!d,b=tybc(a)?a.ef(b,c,d,e):a?(a=tync(a))?a.ef(b,c,d,e):null:null,b&&(tytc(b),delete this.X[b.key]);return this};tyD.prototype.removeAll=function(){tyab(this.X,tytc);this.X={}};
tyD.prototype.D=function(){tyD.B.D.call(this);this.removeAll()};tyD.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented");};var tyBe=function(){tyw.call(this);this.I=new tyD(this);ty5b&&(ty6b?this.I.listen(ty7b?document.body:window,["online","offline"],this.Lm):(this.Pn=this.re(),this.Na=new tyfe(250),this.I.listen(this.Na,"tick",this.Br),this.Na.start()))};tyi(tyBe,tyw);tyBe.prototype.re=function(){return ty5b?navigator.onLine:!0};tyBe.prototype.Br=function(){var a=this.re();a!=this.Pn&&(this.Pn=a,this.Lm())};tyBe.prototype.Lm=function(){this.dispatchEvent(this.re()?"online":"offline")};
tyBe.prototype.D=function(){tyBe.B.D.call(this);this.I.S();this.I=null;this.Na&&(this.Na.S(),this.Na=null)};var tyCe=function(a,b){this.Qa=a;this.ub=b};tyCe.prototype.send=function(a,b){b.set(tySd,this.Qa.gf());return this.ub.send(a,b)};var tyDe=function(a){this.ub=a};tyDe.prototype.send=function(a,b){tyEe(b);tyFe(b);return this.ub.send(a,b)};var tyEe=function(a){ty$d(a,function(b,c){tyb(b.maxLength)&&"text"==b.valueType&&0<b.maxLength&&c.length>b.maxLength&&a.set(b,c.substring(0,b.maxLength))})},tyFe=function(a){ty$d(a,function(b,c){tyb(b.defaultValue)&&c==b.defaultValue&&a.remove(b)})};var tyGe={status:"device-offline",details:void 0},tyHe={status:"rate-limited",details:void 0},tyIe={status:"sampled-out",details:void 0},tyJe={status:"sent",details:void 0};var tyKe=function(a,b){this.ou=a;this.ub=b};tyKe.prototype.send=function(a,b){var c;c=this.ou;var d=c.Mo(),e=Math.floor((d-c.on)*c.Cq);0<e&&(c.Qe=Math.min(c.Qe+e,c.js),c.on=d);1>c.Qe?c=!1:(--c.Qe,c=!0);return c||"item"==a||"transaction"==a?this.ub.send(a,b):ty4c(tyHe)};var tyLe=function(){this.Qe=60;this.js=500;this.Cq=5E-4;this.Mo=function(){return(new Date).getTime()};this.on=this.Mo()};var tyMe=function(a,b){this.Qa=a;this.ub=b};tyMe.prototype.send=function(a,b){var c=b.get(tySd),c=parseInt(c.split("-")[1],16),d;"timing"!=a?d=tyye(this.Qa):((d=b.get(tyVd))&&b.remove(tyVd),d=d||tyye(this.Qa));return c<655.36*d?this.ub.send(a,b):ty4c(tyIe)};var tyNe=tya.JSON.stringify;var tyE=function(a){this.na=new tyn;a&&this.Tc(a)},tyOe=function(a){var b=typeof a;return"object"==b&&a||"function"==b?"o"+tyja(a):b.substr(0,1)+a};ty=tyE.prototype;ty.zb=function(){return this.na.zb()};ty.add=function(a){this.na.set(tyOe(a),a)};ty.Tc=function(a){a=ty5d(a);for(var b=a.length,c=0;c<b;c++)this.add(a[c])};ty.removeAll=function(a){a=ty5d(a);for(var b=a.length,c=0;c<b;c++)this.remove(a[c])};ty.remove=function(a){return this.na.remove(tyOe(a))};ty.clear=function(){this.na.clear()};
ty.Ad=function(){return this.na.Ad()};ty.contains=function(a){return this.na.xc(tyOe(a))};ty.en=function(a){var b=new tyE;a=ty5d(a);for(var c=0;c<a.length;c++){var d=a[c];this.contains(d)&&b.add(d)}return b};ty.Di=function(a){var b=this.clone();b.removeAll(a);return b};ty.Ca=function(){return this.na.Ca()};ty.clone=function(){return new tyE(this)};ty.wa=function(a){return this.zb()==ty4d(a)&&tyPe(this,a)};
var tyPe=function(a,b){var c=ty4d(b);if(a.zb()>c)return!1;!(b instanceof tyE)&&5<c&&(b=new tyE(b));return ty8d(a,function(a){var c=b;return"function"==typeof c.contains?c.contains(a):"function"==typeof c.Ue?c.Ue(a):tyfa(c)||tyd(c)?tym(c,a):tydb(c,a)})};tyE.prototype.Le=function(){return this.na.Le(!1)};var tyQe=function(a,b,c){c=c||tya;var d=c.onerror,e=!!b;tyt&&!tyu("535.3")&&(e=!e);c.onerror=function(b,c,h,k,l){d&&d(b,c,h,k,l);a({message:b,fileName:c,Rx:h,Kx:k,error:l});return e}},tySe=function(a){for(var b=[],c=arguments.callee.caller,d=0;c&&(!a||d<a);){b.push(tyRe(c));b.push("()\n");try{c=c.caller}catch(e){b.push("[exception trying to get caller]\n");break}d++;if(50<=d){b.push("[...long stack...]");break}}a&&d>=a?b.push("[...reached max depth limit...]"):b.push("[end]");return b.join("")},tyRe=
function(a){if(tyTe[a])return tyTe[a];a=String(a);if(!tyTe[a]){var b=/function ([^\(]+)/.exec(a);tyTe[a]=b?b[1]:"[Anonymous]"}return tyTe[a]},tyTe={};var tyUe=function(a){this.Ed=a;this.La=this.O=null},tyVe=function(a){tya.console&&(tya.console.timeStamp?tya.console.timeStamp(a):tya.console.markTimeline&&tya.console.markTimeline(a));tya.msWriteProfilerMark&&tya.msWriteProfilerMark(a)};ty=tyUe.prototype;ty.getName=function(){return this.Ed};ty.getParent=function(){return this.O};ty.getChildren=function(){this.La||(this.La={});return this.La};ty.log=function(){};ty.xo=function(){};ty.uu=function(){};
var tyWe=null,tyXe=function(){tyWe||(tyWe=new tyUe(""));return tyWe};var tyYe=function(){};var tyZe=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#(.*))?$/,ty0e=function(a){if(ty_e){ty_e=!1;var b=tya.location;if(b){var c=b.href;if(c&&(c=(c=ty0e(c)[3]||null)?decodeURI(c):c)&&c!=b.hostname)throw ty_e=!0,Error();}}return a.match(tyZe)},ty_e=tyt,ty1e=function(a,b){for(var c=a.split("&"),d=0;d<c.length;d++){var e=c[d].indexOf("="),f=null,g=null;0<=e?(f=c[d].substring(0,e),g=c[d].substring(e+1)):f=c[d];b(f,g?decodeURIComponent(g.replace(/\+/g,
" ")):"")}},ty2e=/#|$/,ty3e=function(a){var b=window.location.href,c=b.search(ty2e),d;t:{d=0;for(var e=a.length;0<=(d=b.indexOf(a,d))&&d<c;){var f=b.charCodeAt(d-1);if(38==f||63==f)if(f=b.charCodeAt(d+e),!f||61==f||38==f||35==f)break t;d+=e+1}d=-1}if(!(0>d)){e=b.indexOf("&",d);if(0>e||e>c)e=c;d+=a.length+1;b.substr(d,e-d).replace(/\+/g," ")}};var ty4e=function(){};ty4e.prototype.gl=null;ty4e.prototype.Cg=function(){var a;(a=this.gl)||(a={},ty5e(this)&&(a[0]=!0,a[1]=!0),a=this.gl=a);return a};var ty6e,ty7e=function(){};tyi(ty7e,ty4e);var ty8e=function(a){return(a=ty5e(a))?new ActiveXObject(a):new XMLHttpRequest},ty5e=function(a){if(!a.Ym&&"undefined"==typeof XMLHttpRequest&&"undefined"!=typeof ActiveXObject){for(var b=["MSXML2.XMLHTTP.6.0","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP","Microsoft.XMLHTTP"],c=0;c<b.length;c++){var d=b[c];try{return new ActiveXObject(d),a.Ym=d}catch(e){}}throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");}return a.Ym};
ty6e=new ty7e;var tyF=function(a){tyw.call(this);this.headers=new tyn;this.ai=a||null;this.Ia=!1;this.$h=this.R=null;this.qn=this.ah="";this.rf=0;this.sf="";this.yd=this.dj=this.Sg=this.Hi=!1;this.Qf=0;this.Ph=null;this.jo="";this.Wh=this.xu=!1};tyi(tyF,tyw);var ty9e=/^https?$/i,ty$e=["POST","PUT"],tyaf=[],tybf=function(a,b,c,d,e){var f=new tyF;tyaf.push(f);b&&f.listen("complete",b);f.listenOnce("ready",f.aq);f.send(a,c,d,e)};tyF.prototype.aq=function(){this.S();tyYa(tyaf,this)};
tyF.prototype.send=function(a,b,c,d){if(this.R)throw Error("[goog.net.XhrIo] Object is active with another request="+this.ah+"; newUri="+a);b=b?b.toUpperCase():"GET";this.ah=a;this.sf="";this.rf=0;this.qn=b;this.Hi=!1;this.Ia=!0;this.R=this.ai?ty8e(this.ai):ty8e(ty6e);this.$h=this.ai?this.ai.Cg():ty6e.Cg();this.R.onreadystatechange=tyg(this.Mn,this);try{tyYe(tycf(this,"Opening Xhr")),this.dj=!0,this.R.open(b,String(a),!0),this.dj=!1}catch(e){tyYe(tycf(this,"Error opening Xhr: "+e.message));this.pg(5,
e);return}a=c||"";var f=this.headers.clone();d&&ty7d(d,function(a,b){f.set(b,a)});d=tyWa(f.$b());c=tya.FormData&&a instanceof tya.FormData;!tym(ty$e,b)||d||c||f.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");f.forEach(function(a,b){this.R.setRequestHeader(b,a)},this);this.jo&&(this.R.responseType=this.jo);"withCredentials"in this.R&&(this.R.withCredentials=this.xu);try{tydf(this),0<this.Qf&&(this.Wh=tyef(this.R),tyYe(tycf(this,"Will abort after "+this.Qf+"ms if incomplete, xhr2 "+
this.Wh)),this.Wh?(this.R.timeout=this.Qf,this.R.ontimeout=tyg(this.No,this)):this.Ph=tyge(this.No,this.Qf,this)),tyYe(tycf(this,"Sending request")),this.Sg=!0,this.R.send(a),this.Sg=!1}catch(g){tyYe(tycf(this,"Send error: "+g.message)),this.pg(5,g)}};var tyef=function(a){return tyr&&tyu(9)&&tyga(a.timeout)&&tyb(a.ontimeout)},tyVa=function(a){return"content-type"==a.toLowerCase()};
tyF.prototype.No=function(){"undefined"!=typeof tyaa&&this.R&&(this.sf="Timed out after "+this.Qf+"ms, aborting",this.rf=8,tycf(this,this.sf),this.dispatchEvent("timeout"),this.abort(8))};tyF.prototype.pg=function(a,b){this.Ia=!1;this.R&&(this.yd=!0,this.R.abort(),this.yd=!1);this.sf=b;this.rf=a;tyff(this);tygf(this)};var tyff=function(a){a.Hi||(a.Hi=!0,a.dispatchEvent("complete"),a.dispatchEvent("error"))};
tyF.prototype.abort=function(a){this.R&&this.Ia&&(tycf(this,"Aborting"),this.Ia=!1,this.yd=!0,this.R.abort(),this.yd=!1,this.rf=a||7,this.dispatchEvent("complete"),this.dispatchEvent("abort"),tygf(this))};tyF.prototype.D=function(){this.R&&(this.Ia&&(this.Ia=!1,this.yd=!0,this.R.abort(),this.yd=!1),tygf(this,!0));tyF.B.D.call(this)};tyF.prototype.Mn=function(){this.isDisposed()||(this.dj||this.Sg||this.yd?tyhf(this):this.yf())};tyF.prototype.yf=function(){tyhf(this)};
var tyhf=function(a){if(a.Ia&&"undefined"!=typeof tyaa)if(a.$h[1]&&4==a.je()&&2==a.getStatus())tycf(a,"Local request error detected and ignored");else if(a.Sg&&4==a.je())tyge(a.Mn,0,a);else if(a.dispatchEvent("readystatechange"),a.Rr()){tycf(a,"Request complete");a.Ia=!1;try{if(a.ln())a.dispatchEvent("complete"),a.dispatchEvent("success");else{a.rf=6;var b;try{b=2<a.je()?a.R.statusText:""}catch(c){b=""}a.sf=b+" ["+a.getStatus()+"]";tyff(a)}}finally{tygf(a)}}},tygf=function(a,b){if(a.R){tydf(a);var c=
a.R,d=a.$h[0]?tyca:null;a.R=null;a.$h=null;b||a.dispatchEvent("ready");try{c.onreadystatechange=d}catch(e){}}},tydf=function(a){a.R&&a.Wh&&(a.R.ontimeout=null);tyga(a.Ph)&&(tya.clearTimeout(a.Ph),a.Ph=null)};ty=tyF.prototype;ty.pf=function(){return!!this.R};ty.Rr=function(){return 4==this.je()};
ty.ln=function(){var a=this.getStatus(),b;t:switch(a){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:b=!0;break t;default:b=!1}if(!b){if(a=0===a)a=ty0e(String(this.ah))[1]||null,!a&&self.location&&(a=self.location.protocol,a=a.substr(0,a.length-1)),a=!ty9e.test(a?a.toLowerCase():"");b=a}return b};ty.je=function(){return this.R?this.R.readyState:0};ty.getStatus=function(){try{return 2<this.je()?this.R.status:-1}catch(a){return-1}};
ty.Yq=function(){try{return this.R?this.R.responseText:""}catch(a){return""}};var tycf=function(a,b){return b+" ["+a.qn+" "+a.ah+" "+a.getStatus()+"]"};tyJb(function(a){tyF.prototype.yf=a(tyF.prototype.yf)});var tyif=function(a,b){var c;if(a instanceof tyif)this.Nb=tyb(b)?b:a.Nb,tyjf(this,a.Pc),c=a.Ud,tyG(this),this.Ud=c,c=a.ge(),tyG(this),this.ic=c,tykf(this,a.kd),tylf(this,a.cb),tymf(this,a.Xa.clone()),tynf(this,a.td);else if(a&&(c=ty0e(String(a)))){this.Nb=!!b;tyjf(this,c[1]||"",!0);var d=c[2]||"";tyG(this);this.Ud=tyof(d);d=c[3]||"";tyG(this);this.ic=tyof(d,!0);tykf(this,c[4]);tylf(this,c[5]||"",!0);tymf(this,c[6]||"",!0);tynf(this,c[7]||"",!0)}else this.Nb=!!b,this.Xa=new typf(null,0,this.Nb)};
ty=tyif.prototype;ty.Pc="";ty.Ud="";ty.ic="";ty.kd=null;ty.cb="";ty.td="";ty.Ur=!1;ty.Nb=!1;
ty.toString=function(){var a=[],b=this.Pc;b&&a.push(tyqf(b,tyrf,!0),":");if(b=this.ge()){a.push("//");var c=this.Ud;c&&a.push(tyqf(c,tyrf,!0),"@");a.push(encodeURIComponent(String(b)).replace(/%25([0-9a-fA-F]{2})/g,"%$1"));b=this.kd;null!=b&&a.push(":",String(b))}if(b=this.cb)this.ic&&"/"!=b.charAt(0)&&a.push("/"),a.push(tyqf(b,"/"==b.charAt(0)?tysf:tytf,!0));(b=this.Xa.toString())&&a.push("?",b);(b=this.td)&&a.push("#",tyqf(b,tyuf));return a.join("")};
ty.resolve=function(a){var b=this.clone(),c=!!a.Pc;c?tyjf(b,a.Pc):c=!!a.Ud;if(c){var d=a.Ud;tyG(b);b.Ud=d}else c=!!a.ic;c?(d=a.ge(),tyG(b),b.ic=d):c=null!=a.kd;d=a.cb;if(c)tykf(b,a.kd);else if(c=!!a.cb){if("/"!=d.charAt(0))if(this.ic&&!this.cb)d="/"+d;else{var e=b.cb.lastIndexOf("/");-1!=e&&(d=b.cb.substr(0,e+1)+d)}e=d;if(".."==e||"."==e)d="";else if(-1!=e.indexOf("./")||-1!=e.indexOf("/.")){for(var d=0==e.lastIndexOf("/",0),e=e.split("/"),f=[],g=0;g<e.length;){var h=e[g++];"."==h?d&&g==e.length&&
f.push(""):".."==h?((1<f.length||1==f.length&&""!=f[0])&&f.pop(),d&&g==e.length&&f.push("")):(f.push(h),d=!0)}d=f.join("/")}else d=e}c?tylf(b,d):c=""!==a.Xa.toString();c?tymf(b,tyof(a.Xa.toString())):c=!!a.td;c&&tynf(b,a.td);return b};ty.clone=function(){return new tyif(this)};var tyjf=function(a,b,c){tyG(a);a.Pc=c?tyof(b,!0):b;a.Pc&&(a.Pc=a.Pc.replace(/:$/,""));return a};tyif.prototype.ge=function(){return this.ic};
var tykf=function(a,b){tyG(a);if(b){b=Number(b);if(isNaN(b)||0>b)throw Error("Bad port number "+b);a.kd=b}else a.kd=null},tylf=function(a,b,c){tyG(a);a.cb=c?tyof(b,!0):b},tymf=function(a,b,c){tyG(a);b instanceof typf?(a.Xa=b,a.Xa.Zj(a.Nb)):(c||(b=tyqf(b,tyvf)),a.Xa=new typf(b,0,a.Nb))};tyif.prototype.Kt=function(a){tymf(this,a,void 0)};tyif.prototype.Ti=function(){return this.Xa.toString()};
var tynf=function(a,b,c){tyG(a);a.td=c?tyof(b):b},tyG=function(a){if(a.Ur)throw Error("Tried to modify a read-only Uri");};tyif.prototype.Zj=function(a){this.Nb=a;this.Xa&&this.Xa.Zj(a);return this};
var tywf=function(a,b){return a instanceof tyif?a.clone():new tyif(a,b)},tyof=function(a,b){return a?b?decodeURI(a):decodeURIComponent(a):""},tyqf=function(a,b,c){return tyd(a)?(a=encodeURI(a).replace(b,tyxf),c&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null},tyxf=function(a){a=a.charCodeAt(0);return"%"+(a>>4&15).toString(16)+(a&15).toString(16)},tyrf=/[#\/\?@]/g,tytf=/[\#\?:]/g,tysf=/[\#\?]/g,tyvf=/[\#\?@]/g,tyuf=/#/g,typf=function(a,b,c){this.wb=a||null;this.Nb=!!c},tyyf=function(a){a.ma||
(a.ma=new tyn,a.ea=0,a.wb&&ty1e(a.wb,function(b,c){a.add(decodeURIComponent(b.replace(/\+/g," ")),c)}))};ty=typf.prototype;ty.ma=null;ty.ea=null;ty.zb=function(){tyyf(this);return this.ea};ty.add=function(a,b){tyyf(this);this.wb=null;a=tyzf(this,a);var c=this.ma.get(a);c||this.ma.set(a,c=[]);c.push(b);this.ea++;return this};ty.remove=function(a){tyyf(this);a=tyzf(this,a);return this.ma.xc(a)?(this.wb=null,this.ea-=this.ma.get(a).length,this.ma.remove(a)):!1};
ty.clear=function(){this.ma=this.wb=null;this.ea=0};ty.Ad=function(){tyyf(this);return 0==this.ea};ty.xc=function(a){tyyf(this);a=tyzf(this,a);return this.ma.xc(a)};ty.Ue=function(a){var b=this.Ca();return tym(b,a)};ty.$b=function(){tyyf(this);for(var a=this.ma.Ca(),b=this.ma.$b(),c=[],d=0;d<b.length;d++)for(var e=a[d],f=0;f<e.length;f++)c.push(b[d]);return c};
ty.Ca=function(a){tyyf(this);var b=[];if(tyd(a))this.xc(a)&&(b=tyZa(b,this.ma.get(tyzf(this,a))));else{a=this.ma.Ca();for(var c=0;c<a.length;c++)b=tyZa(b,a[c])}return b};ty.set=function(a,b){tyyf(this);this.wb=null;a=tyzf(this,a);this.xc(a)&&(this.ea-=this.ma.get(a).length);this.ma.set(a,[b]);this.ea++;return this};ty.get=function(a,b){var c=a?this.Ca(a):[];return 0<c.length?String(c[0]):b};
ty.toString=function(){if(this.wb)return this.wb;if(!this.ma)return"";for(var a=[],b=this.ma.$b(),c=0;c<b.length;c++)for(var d=b[c],e=encodeURIComponent(String(d)),d=this.Ca(d),f=0;f<d.length;f++){var g=e;""!==d[f]&&(g+="="+encodeURIComponent(String(d[f])));a.push(g)}return this.wb=a.join("&")};ty.clone=function(){var a=new typf;a.wb=this.wb;this.ma&&(a.ma=this.ma.clone(),a.ea=this.ea);return a};var tyzf=function(a,b){var c=String(b);a.Nb&&(c=c.toLowerCase());return c};
typf.prototype.Zj=function(a){a&&!this.Nb&&(tyyf(this),this.wb=null,this.ma.forEach(function(a,c){var d=c.toLowerCase();c!=d&&(this.remove(c),this.remove(d),0<a.length&&(this.wb=null,this.ma.set(tyzf(this,d),ty_a(a)),this.ea+=a.length))},this));this.Nb=a};var tyAf=function(a,b,c){this.rt=a;this.gh=b;this.ws=c};tyAf.prototype.send=function(a,b){if(!this.ws.re())return ty5c(tyGe);var c=new tyx,d=tyBf(a,b);d.length>this.gh?c.V({status:"payload-too-big",details:ty3d("Encoded hit length == %s, but should be <= %s.",d.length,this.gh)}):tybf(this.rt,function(){c.callback(tyJe)},"POST",d);return c};var tyBf=function(a,b){var c=new typf;c.add(tyqb.name,a);ty$d(b,function(a,b){c.add(a.name,b.toString())});return c.toString()};var tyde=function(a,b,c){this.Qa=a;this.pt=b;this.gh=c};tyde.prototype.Qi=function(){if(!this.ib){if(!this.Qa.ye.qd().Bc)throw Error("Cannot construct shared channel prior to settings being ready.");var a=new tyBe,a=new tyDe(new tyAf(this.pt,this.gh,a)),b=new tyLe;this.ib=new tyCe(this.Qa,new tyMe(this.Qa,new tyKe(b,a)))}return this.ib};var tyCf=new tyn,tybe=function(){if(!tyob){var a="chrome-extension:"==tya.location.protocol?new ty6c:new tyhe;tyob=new tyte(a)}return tyob};var tyH=function(a){this.st=a};tyH.prototype.toString=function(){return this.st};var tyI=function(a){return tyI.cn(a)};tyI.cn=function(a){return a+"_"};tyI.Sx=function(){throw Error("xid.literal must not be used in COMPILED mode.");};tyI.object=function(a){if(a&&a.constructor&&a.constructor.toString()===Object.toString()){var b={},c;for(c in a)a.hasOwnProperty(c)&&(b[tyI.cn(c)]=a[c]);return b}throw Error("xid.object must be called with an object literal.");};tyI.ev=!0;tyI.Hx=function(a){return a};tyI.Qx=function(){return"a_"!=tyI("a")};new tyH(tyI("goog.ui.ActivityMonitor"));new tyH(tyI("fava.app.AppLifetimeService"));new tyH(tyI("fava.base.AsyncOperationServices"));new tyH(tyI("fava.net.BrowserChannelServices"));new tyH(tyI("fava.canvas.CanvasService"));new tyH(tyI("fava.canvas.CanvasConfiguration"));new tyH(tyI("fava.diagnostics.CsiService"));new tyH(tyI("fava.data.DataServices"));new tyH(tyI("fava.data.DataStoreUpdaterService"));new tyH(tyI("fava.locale.DateTimeFormatService"));new tyH(tyI("fava.debug.DeobfuscationService"));
new tyH(tyI("fava.diagnostics.Diagnostics"));new tyH(tyI("fava.component.DomServices"));new tyH(tyI("fava.app.DragDropService"));new tyH(tyI("fava.browser.ExportService"));new tyH(tyI("fava.layout.FixedLayoutHelper"));new tyH(tyI("fava.gbar.GbarService"));new tyH(tyI("fava.gloader.GoogleLoaderService"));new tyH(tyI("fava.controls.help.HelpOverlayService"));new tyH(tyI("fava.view.HistoryInterface"));new tyH(tyI("fava.view.HistoryManager"));new tyH(tyI("fava.view.HistoryRegistry"));new tyH(tyI("fava.identity.IdentityService"));
new tyH(tyI("fava.browser.IeCutCopyHandle"));new tyH(tyI("fava.diagnostics.Impressions"));new tyH(tyI("fava.browser.KeyboardShortcutHandler"));new tyH(tyI("fava.browser.KeyboardShortcutRegistry"));new tyH(tyI("fava.mail.MailServices"));new tyH(tyI("fava.controls.mole.MoleManager"));new tyH(tyI("fava.app.NavBarService"));new tyH(tyI("fava.view.NavigationServices"));new tyH(tyI("fava.net.NetworkDiagnosticsService"));new tyH(tyI("fava.app.NotificationService"));new tyH(tyI("fava.request.OauthService"));
new tyH(tyI("fava.net.OfflineServices"));new tyH(tyI("fava.modules.PrefetchService"));new tyH(tyI("fava.controls.RelativeDateControl"));new tyH(tyI("fava.request.RequestService"));new tyH(tyI("fava.base.Scheduler"));new tyH(tyI("fava.net.ServerErrorService"));new tyH(tyI("fava.dom.SoyRenderer"));new tyH(tyI("fava.dom.SoyRendererConfig"));new tyH(tyI("fava.app.TearoffManager"));new tyH(tyI("fava.app.TearoffSharedData"));new tyH(tyI("fava.app.TearoffRegistry"));new tyH(tyI("fava.app.TitleBar"));new tyH(tyI("fava.controls.Toast"));
new tyH(tyI("fava.app.UserActionService"));new tyH(tyI("fava.browser.ViewportServices"));new tyH(tyI("fava.diagnostics.ViewDiagnostics"));new tyH(tyI("fava.view.ViewManagerInterface"));new tyH(tyI("fava.view.ViewRegistry"));new tyH(tyI("fava.browser.WindowService"));new tyH(tyI("fava.browser.WindowOpenerUtil"));new tyH(tyI("fava.app.WindowWidget"));new tyH(tyI("fava.request.XsrfService"));var tyDf=new tyH("a");var tyFf=function(){var a,b=tyCf.get("Google Play Music",null);if(null===b){if("chrome-extension:"==tya.location.protocol)b=chrome.runtime.getManifest().version;else{if(!tyd(void 0)||tysa(void 0))throw Error("Invalid version. Must be non-empty string.");b=void 0}b=new tyee(b);tyCf.set("Google Play Music",b)}a=b;b=new tyae(0,a.Zp.create());b.set(tyUd,a.$r);b.set(tyPd,1);b.set(tyQd,a.Mp);b.set(tyRd,a.Np);b.set(tyYd,"UA-19995902-12");(a=navigator.language||navigator.browserLanguage)&&b.set(tyTd,a);(a=
screen.colorDepth+"-bit")&&b.set(tyWd,a);(a=[screen.width,screen.height].join("x"))&&b.set(tyXd,a);a=typd();(a=[a.width,a.height].join("x"))&&b.set(tyZd,a);b.od(tyEf([0,1,100,500,1E3,5E3,1E4,2E4,5E4,1E5,25E4,5E5,75E4,1E6],"Music Source File Count"));b.od(tyEf([0,1,10,20,50,100,200,500,1E3,2E3,5E3,1E4,2E4,5E4,1E5,25E4,5E5,75E4,1E6],"Upload Failure Count"));this.ia=b;new tyn},tyGf=function(a,b,c){a.ia.send("event",{eventCategory:"Mini Player",eventAction:b,eventLabel:c,eventValue:void 0})},tyEf=function(a,
b){var c=tyBb(tyma(tyxb,a)).Uc();return tyzb((new tyyb).$o(tysb,"Uploads").$o(tytb,b),c).Uc()};new tyH("b");var tyHf=new tyH("c");var tyIf={PAUSE:3,Dw:4,ew:6,$u:7,wx:8,$v:9,Wv:10,Au:11,cv:12,dw:13,Cw:14,mx:15,tw:16,ww:17,Yv:18,hw:19,Aw:20,Cx:21,Tv:22,Pv:23,Bx:24,xx:25,Xv:26,zv:27,sx:28,Bw:29,ox:101,qx:102,jx:103,gx:104,px:105,Iv:106,cw:107,Lv:108,ix:109,ux:110,vx:111,hx:112,Ow:201,lw:202,mw:203,Qv:204,dv:205,Tu:206,Uu:207,Uv:208,nx:209,Rw:210,aw:301,kx:302,uw:303,Vv:304,fx:305,fw:306,rx:307,Rv:308,Qw:309,gw:312,tx:313,lx:314,bw:315,Zv:316,Hv:317};var tyJ=function(){},tyK=function(a,b,c,d){a.Zh={};b||(b=[]);a.Tx=void 0;a.Oe=-1;a.Ya=b;t:{if(a.Ya.length){b=a.Ya.length-1;var e=a.Ya[b];if(e&&"object"==typeof e&&"number"!=typeof e.length){a.Ef=b-a.Oe;a.cf=e;break t}}-1<c?(a.Ef=c,a.cf=a.Ya[c+a.Oe]={}):a.Ef=Number.MAX_VALUE}if(d)for(c=0;c<d.length;c++)b=d[c],b<a.Ef?(b+=a.Oe,a.Ya[b]=a.Ya[b]||[]):a.cf[b]=a.cf[b]||[]},tyL=function(a,b){return b<a.Ef?a.Ya[b+a.Oe]:a.cf[b]},tyM=function(a,b,c){b<a.Ef?a.Ya[b+a.Oe]=c:a.cf[b]=c},tyJf=function(a,b,c,d){if(!a.Zh[c]){var e=
tyL(a,c);if(d||e)a.Zh[c]=new b(e)}return a.Zh[c]},tyKf=function(a,b){var c=b?b.Ya:b;a.Zh[1]=b;tyM(a,1,c)};tyJ.prototype.Qj=function(){return tya.JSON&&tya.JSON.stringify?tya.JSON.stringify(this.Ya):tyNe(this.Ya)};tyJ.prototype.toString=function(){return this.Ya.toString()};
var tyLf=function(a,b){if(tyf(a)&&tyf(b)){var c={},d,e,f;for(d in a)a.hasOwnProperty(d)&&(c[d]=0);for(d in b)b.hasOwnProperty(d)&&(c[d]=0);for(d in c){var c=a[d],g=b[d];if(tyf(c)&&!tyc(c)){if(void 0!==e)throw Error("invalid jspb state");e=tygb(c)?void 0:c;c=void 0}if(tyf(g)&&!tyc(g)){if(void 0!==f)throw Error("invalid jspb state");f=tygb(g)?void 0:g;g=void 0}if(!tyLf(c,g))return!1}return e||f?tyLf(e,f):!0}return a==b};var tyNf=function(a){tyK(this,a,-1,tyMf)};tyi(tyNf,tyJ);var tyMf=[5];var tyOf=function(a){tyK(this,a,-1,null)};tyi(tyOf,tyJ);var tyPf=function(a){tyK(this,a,-1,null)};tyi(tyPf,tyJ);var tyQf=function(a){tyK(this,a,-1,null)};tyi(tyQf,tyJ);ty=tyQf.prototype;ty.po=function(a){tyM(this,1,a)};ty.setVolume=function(a){tyM(this,3,a)};ty.getTime=function(){return tyL(this,4)};ty.setTime=function(a){tyM(this,4,a)};ty.Ht=function(a){tyM(this,5,a)};var tyRf=function(a){tyK(this,a,-1,null)};tyi(tyRf,tyJ);var tySf=function(a){tyK(this,a,-1,null)};tyi(tySf,tyJ);var tyTf=function(a){tyK(this,a,-1,null)};tyi(tyTf,tyJ);tyTf.prototype.getId=function(){return tyL(this,1)};tyTf.prototype.Md=function(a){tyM(this,1,a)};var tyUf=function(a){tyK(this,a,-1,null)};tyi(tyUf,tyJ);var tyVf=function(a){tyK(this,a,-1,null)};tyi(tyVf,tyJ);tyVf.prototype.getId=function(){return tyL(this,1)};tyVf.prototype.Md=function(a){tyM(this,1,a)};var tyWf=function(a){tyK(this,a,-1,null)};tyi(tyWf,tyJ);var tyXf=function(a){tyK(this,a,-1,null)};tyi(tyXf,tyJ);ty=tyXf.prototype;ty.getId=function(){return tyL(this,1)};ty.Md=function(a){tyM(this,1,a);return this};ty.getName=function(){return tyL(this,2)};ty.ro=function(a){tyM(this,2,a);return this};ty.Hl=function(){return tyL(this,3)};ty.Sj=function(a){tyM(this,3,a);return this};ty.Ql=function(){return tyL(this,5)};ty.wo=function(a){tyM(this,10,a);return this};ty.oo=function(a){tyM(this,11,a);return this};ty.ll=function(){tyM(this,11,void 0);return this};
ty.Wq=function(){return tyL(this,12)};ty.uo=function(a){tyM(this,12,a);return this};var tyYf=function(a){tyK(this,a,-1,null)};tyi(tyYf,tyJ);tyYf.prototype.Gl=function(){return tyL(this,3)};var tyZf=function(a){tyK(this,a,-1,null)};tyi(tyZf,tyJ);var ty_f=function(a){tyK(this,a,-1,null)};tyi(ty_f,tyJ);ty_f.prototype.Wi=function(){return tyL(this,1)};ty_f.prototype.setVersion=function(a){tyM(this,1,a)};var ty0f=function(a){tyK(this,a,-1,null)};tyi(ty0f,tyJ);ty0f.prototype.Dg=function(){return tyL(this,1)};ty0f.prototype.to=function(a){tyM(this,1,a)};var ty1f=function(a){tyK(this,a,-1,null)};tyi(ty1f,tyJ);ty1f.prototype.setEnabled=function(a){tyM(this,1,a)};var ty2f=function(a){tyK(this,a,-1,null)};tyi(ty2f,tyJ);ty2f.prototype.am=function(){return tyL(this,1)};var ty4f=function(a){tyK(this,a,-1,ty3f)};tyi(ty4f,tyJ);var ty3f=[1];var ty5f=function(a){tyK(this,a,-1,null)};tyi(ty5f,tyJ);ty5f.prototype.setEnabled=function(a){tyM(this,1,a)};var ty6f=function(a){tyK(this,a,-1,null)};tyi(ty6f,tyJ);var ty7f=function(a){tyK(this,a,-1,null)};tyi(ty7f,tyJ);ty7f.prototype.gf=function(){return tyL(this,3)};var ty9f=function(a){tyK(this,a,-1,ty8f)};tyi(ty9f,tyJ);var ty8f=[2];ty9f.prototype.po=function(a){tyM(this,1,a)};var ty$f=function(a){tyK(this,a,-1,null)};tyi(ty$f,tyJ);var tyag=function(a){tyK(this,a,-1,null)};tyi(tyag,tyJ);var tybg=function(a){tyK(this,a,-1,null)};tyi(tybg,tyJ);var tycg=function(a){tyK(this,a,-1,null)};tyi(tycg,tyJ);ty=tycg.prototype;ty.setActive=function(a){tyM(this,1,a);return this};ty.getCurrentTime=function(){return tyL(this,3)};ty.setCurrentTime=function(a){tyM(this,3,a);return this};ty.$q=function(){return tyL(this,4)};ty.Xq=function(){return tyL(this,5)};ty.getState=function(){return tyL(this,9)};ty.Pa=function(a){tyM(this,9,a);return this};ty.Em=function(){return tyL(this,14)};var tydg=function(a){tyK(this,a,-1,null)};tyi(tydg,tyJ);var tyeg=function(a){tyK(this,a,-1,null)};tyi(tyeg,tyJ);var tyfg=function(a){tyK(this,a,-1,null)};tyi(tyfg,tyJ);var tygg=function(a){tyK(this,a,-1,null)};tyi(tygg,tyJ);var tyig=function(a){tyK(this,a,-1,tyhg)};tyi(tyig,tyJ);var tyhg=[2];var tykg=function(a){tyK(this,a,-1,tyjg)};tyi(tykg,tyJ);var tyjg=[1];var tymg=function(a){tyK(this,a,-1,tylg)};tyi(tymg,tyJ);var tylg=[2,3,4,5];var tyog=function(a){tyK(this,a,-1,tyng)};tyi(tyog,tyJ);var tyng=[3,4];var typg=function(a){tyK(this,a,-1,null)};tyi(typg,tyJ);var tyrg=function(a){tyK(this,a,-1,tyqg)};tyi(tyrg,tyJ);var tyqg=[3,4];tyrg.prototype.am=function(){return tyL(this,6)};var tysg=function(a){tyK(this,a,-1,null)};tyi(tysg,tyJ);tysg.prototype.gf=function(){return tyL(this,3)};var tytg=function(a){tyK(this,a,-1,null)};tyi(tytg,tyJ);var tyug=function(a){tyK(this,a,-1,null)};tyi(tyug,tyJ);tyug.prototype.At=function(){tyM(this,1,1)};tyug.prototype.Kl=function(){return tyL(this,2)};var tywg=function(a){tyK(this,a,-1,tyvg)};tyi(tywg,tyJ);var tyvg=[1,18,28];tywg.prototype.Vi=function(){return tyL(this,13)};tywg.prototype.Kl=function(){return tyL(this,14)};var tyxg=function(a){tyK(this,a,-1,null)};tyi(tyxg,tyJ);tyxg.prototype.Em=function(){return tyL(this,2)};var tyyg=function(a){tyK(this,a,-1,null)};tyi(tyyg,tyJ);tyyg.prototype.Si=function(){return tyJf(this,tytg,1)};tyyg.prototype.qo=function(a){tyKf(this,a)};var tyzg=function(a){tyK(this,a,-1,null)};tyi(tyzg,tyJ);var tyAg=function(a){switch(a){case 3:return chrome.i18n.getMessage("6233107584508657559");case 4:case 9:case 10:case 13:case 14:return chrome.i18n.getMessage("7080245643233785574");case 7:return chrome.i18n.getMessage("548629550059508920");case 8:return chrome.i18n.getMessage("7194376132387780145");case 11:return chrome.i18n.getMessage("3782346097595894324");case 12:return chrome.i18n.getMessage("4082846773463542695");case 15:return chrome.i18n.getMessage("569766142833422558");default:return chrome.i18n.getMessage("7664246845088850317")+
a}};chrome.i18n.getMessage("607779708716020188");for(var tyBg=0;63>tyBg;tyBg++);var tyCg=new tyH("d");var tyEg=function(a){tyw.call(this);this.Me=new tyE;this.ei=!1;null!=a&&tyDg(this,a)};tyi(tyEg,tyw);var tyDg=function(a,b){if(a.ei){var c=new tyE(b),d=a.Me.Di(c),c=c.Di(a.Me);a.Me.removeAll(d);a.Me.Tc(c);if(0<d.zb()||0<c.zb())d=new tyFg(c.Ca(),d.Ca()),a.dispatchEvent(d)}else a.ei=!0,a.Me.Tc(b),a.dispatchEvent("f")},tyFg=function(){typ.call(this,"g")};tyi(tyFg,typ);var tyGg=function(){tyw.call(this);this.tu=[];this.qu=[];this.Oh=null;this.getAuthToken(!1)};tyi(tyGg,tyw);ty=tyGg.prototype;ty.getAuthToken=function(a,b){var c=new tyx;tyb(b)&&c.addCallback(tyg(this.$n,this,b));c.addCallback(tyg(this.at,this,a));c.callback();return c};ty.$n=function(a){var b=new tyx;chrome.identity.removeCachedAuthToken({token:a},function(){b.callback()});return b};
ty.at=function(a){var b=new tyx;chrome.identity.getAuthToken({interactive:a},tyg(function(a){if(tyb(a)){var d=null===this.Oh;this.Oh=tyh();b.callback(a);d&&this.dispatchEvent("b")}else b.V(Error("The user is not signed in."))},this));return b};
ty.jt=function(a){var b=new tyx,c={Authorization:"Bearer "+a};this.Qp=a;tybf("https://www.googleapis.com/oauth2/v1/userinfo?alt=json",function(a){a=a.target;a.ln()?(a=JSON.parse(a.Yq()),b.callback(a.email)):b.V(a.getStatus())},"GET",null,c);b.addCallback(this.Vt,this);return b};
ty.Vi=function(){if(tyb(this.Qk))return ty4c(this.Qk);var a=new tyx;a.addCallback(tyg(this.getAuthToken,this,!1));a.addCallback(this.jt,this);ty_c(a,function(a){if(401==a)return a=new tyx,a.addCallback(tyg(this.$n,this,this.Qp)),a.addCallback(ty5c),a.callback(),a},this);a.callback();return a};ty.Vt=function(a){tyb(this.Xh)&&(tya.clearTimeout(this.Xh),this.Xh=void 0);this.Qk=a;this.Xh=tyge(function(){this.Xh=this.Qk=void 0},36E5,this)};
ty.Gl=function(){return null==this.Oh||144E5<tyh()-this.Oh?1:0<this.tu.length?3:0<this.qu.length?4:2};var tyHg=function(a,b){var c;c=b instanceof tyif?b:tywf(b);if(c.Pc||c.ic||null!=c.kd)return null;if(a){if(a.cb&&c.cb&&"/"!=c.cb.charAt(0)){var d=a.cb;"/"!=d.charAt(d.length-1)&&(d+="/");var e=new tyif(a);tylf(e,d+c.cb);""!==c.Xa.toString()&&e.Kt(c.Ti());c.td&&tynf(e,c.td);return e}return a.resolve(c)}return c};var tyIg=function(a,b){this.Jc=a;this.Nk=b;this.constructor.al||(this.constructor.al={});this.constructor.al[this.toString()]=this};tyIg.prototype.Qj=function(){return this.toString()};tyIg.prototype.toString=function(){this.Oo||(this.Oo=this.Jc.Oq()+":"+this.Nk);return this.Oo};var tyJg=function(a,b){tyIg.call(this,a,b)};tyi(tyJg,tyIg);var tyKg=function(a){this.Ed=a};tyKg.prototype.Oq=function(){return this.Ed};new tyKg("lib");var tyMg=function(a){tyo.call(this);this.Ld={};this.lj={};this.zh={};this.Kd={};this.el={};this.Bn={};this.Al=a?a.Al:new tyw;this.Zt=!a;this.Df=null;a?(this.Df=a,this.zh=a.zh,this.Kd=a.Kd,this.lj=a.lj,this.el=a.el):tyh();a=tyLg(this);this!=a&&(a.kg?a.kg.push(this):a.kg=[this])};tyi(tyMg,tyo);Math.random();var tyLg=function(a){for(;a.Df;)a=a.Df;return a};
tyMg.prototype.get=function(a){var b;t:{for(b=this;b;b=b.Df){if(b.isDisposed())throw Error("AppContext is disposed.");if(b.Ld[a]){b=b.Ld[a][0];break t}if(b.Bn[a])break}if(b=this.zh[a]){b=b(this);if(null==b)throw Error("Factory method for service "+a+" returned null or undefined.");tyN(this,a,b)}else b=null}if(null==b)throw new tyNg(a);return b};
var tyOg=function(a,b){return!(!a.Ld[b]&&!a.zh[b])},tyN=function(a,b,c){if(a.isDisposed())tyDb(c);else{a.Ld[b]=[c,!0];c=tyPg(a,a,b);for(var d=0;d<c.length;d++)c[d].callback(null);delete a.lj[b]}},tyPg=function(a,b,c){var d=[],e=a.Kd[c];e&&(tyQa(e,function(a){var c;t:{for(c=a.Lp;c;){if(c==b){c=!0;break t}c=c.Df}c=!1}c&&(d.push(a.Mx),tyYa(e,a))}),0==e.length&&delete a.Kd[c]);return d},tyQg=function(a,b){a.Kd&&ty7d(a.Kd,function(a,d,e){tyQa(a,function(d){d.Lp==b&&tyYa(a,d)});0==a.length&&delete e[d]})};
tyMg.prototype.D=function(){if(tyLg(this)==this){var a=this.kg;if(a)for(;a.length;)a[0].S()}else for(var a=tyLg(this).kg,b=0;b<a.length;b++)if(a[b]==this){a.splice(b,1);break}for(var c in this.Ld)a=this.Ld[c],a[1]&&"undefined"!=typeof a[0].S&&a[0].S();this.Ld=null;this.Zt&&this.Al.S();tyQg(this,this);this.Kd=null;tyDb(this.Ts);this.Bn=this.Ts=null;tyMg.B.D.call(this)};var tyNg=function(a){tyj.call(this);this.id=a;this.message='Service for "'+a+'" is not registered'};tyi(tyNg,tyj);var tyRg=new tyKg("fva");
new tyJg(tyRg,1);var tySg=function(){if(null==tya.APPCONTEXT)throw"No registered AppContext.";return tya.APPCONTEXT};var tyTg=function(){tyw.call(this)};tyi(tyTg,tyw);tyTg.prototype.ym=function(a){return tyHg(null,a||"")};var tyUg=new tyH("e");new tyH("f");new tyH("g");new tyH("h");new tyH("i");new tyH("j");var tyVg=new tyH("k"),tyWg=new tyH("l");new tyH("m");new tyH("n");var tyXg=window.PERSISTENT,tyYg=window.TEMPORARY;var tyZg=function(a){this.fb=a};tyZg.prototype.get=function(a,b){var c=new tyx;this.fb.get(a,function(d){var e=chrome.runtime?chrome.runtime.lastError:void 0;e?c.V(e):(d=d[a],c.callback(tyb(d)?d:b))});return c};tyZg.prototype.set=function(a,b){var c=new tyx,d={};d[a]=b;this.fb.set(d,function(){var a=chrome.runtime?chrome.runtime.lastError:void 0;a?c.V(a):c.callback()});return c};
tyZg.prototype.clear=function(){var a=new tyx;this.fb.clear(function(){var b=chrome.runtime?chrome.runtime.lastError:void 0;b?a.V(b):a.callback()});return a};var ty_g=function(a,b,c){tyo.call(this);this.oj=a;this.zd=b||0;this.pe=c;this.Xp=tyg(this.qq,this)};tyi(ty_g,tyo);ty=ty_g.prototype;ty.Da=0;ty.D=function(){ty_g.B.D.call(this);this.stop();delete this.oj;delete this.pe};ty.start=function(a){this.stop();this.Da=tyge(this.Xp,tyb(a)?a:this.zd)};ty.stop=function(){this.pf()&&tya.clearTimeout(this.Da);this.Da=0};ty.pf=function(){return 0!=this.Da};ty.qq=function(){this.Da=0;this.oj&&this.oj.call(this.pe)};var ty1g=function(a){tyw.call(this);this.qt=a||ty0g};tyi(ty1g,tyw);var ty0g=tywf("https://play.google.com/music/"),ty2g=function(a){if(!tyOg(a,tyUg)){var b=new ty1g;tyN(a,tyUg,b);return ty4c()}a=new tyx;a.callback();return a};ty1g.prototype.ym=function(a){return tyHg(this.qt,a||"")};new tyH("o");new tyH("p");new tyH("q");new tyH("r");new tyH("s");new tyH("t");var ty3g=new tyH("u");new tyH("v");new tyH("w");new tyH("x");new tyH("y");new tyH("z");new tyH("A");new tyH("B");new tyH("C");new tyH("D");new tyH("E");new tyH("F");new tyH("G");new tyH("H");new tyH("I");new tyH("J");var ty5g=function(a,b){tyw.call(this);this.ia=a.get(tyDf);this.dh=new tyZg(b);this.hg=new tyn;this.Wp=ty4g(this)};tyi(ty5g,tyw);
var ty6g={Bu:"lsAlwaysUseDefaultDownloadLocation",Fu:"lsAppActivated",Xu:"lsDefaultDownloadLocationId",av:"lsDragAndDropActivated",xv:"lsLastTrackFailureLoggingTime",Av:"miniPlayerAlwaysOnTop",Pw:"lsSyncMusicEnabled",yx:"lsUserAddedMusicSourceIds",Ax:"lsUserSelectedDownloadDirId",Ew:"lsSJFEBase"},ty4g=function(a){var b=new tyx;tyl(tybb(ty6g),function(a){b.addCallback(tyg(this.dh.get,this.dh,a,null));b.addCallback(function(b){this.hg.set(a,b)},this)},a);b.callback();return b},ty7g=function(a,b){if(tyb(b))if(a.hg.get("miniPlayerAlwaysOnTop")===
b)ty4c(b);else{a.hg.set("miniPlayerAlwaysOnTop",b);var c=new tyx;c.addCallback(tyg(a.dh.set,a.dh,"miniPlayerAlwaysOnTop",b));tyy(c,function(){this.dispatchEvent({type:"v",value:b})},function(){},a);c.callback()}else ty5c(Error("LocalSettings can not store undefined value."))};ty5g.prototype.gr=function(a){var b=new tyx;ty0c(b,this.Wp);b.addCallback(function(){return this.hg.get(a)},this);b.callback();return b};
var ty8g=function(a){var b=new tyx;b.addCallback(tyg(a.gr,a,"miniPlayerAlwaysOnTop"));b.addCallback(function(a){return"boolean"==typeof a&&a?!0:!1});b.callback();return b};var tyah=function(a,b){tyb(a.name)?(this.name=a.name,this.code=ty9g[a.name]):(this.code=a.code,this.name=ty$g(a.code));tyj.call(this,tyra("%s %s",this.name,b))};tyi(tyah,tyj);
var ty$g=function(a){var b=tyeb(ty9g,function(b){return a==b});if(!tyb(b))throw Error("Invalid code: "+a);return b},ty9g={AbortError:3,EncodingError:5,InvalidModificationError:9,InvalidStateError:7,NotFoundError:1,NotReadableError:4,NoModificationAllowedError:6,PathExistsError:12,QuotaExceededError:10,SecurityError:2,SyntaxError:8,TypeMismatchError:11};var tybh=function(a,b){typ.call(this,a.type,b);this.ab=a};tyi(tybh,typ);var tych=function(a){a=a.slice(0,a.lastIndexOf("/")+1);/^\/+$/.test(a)||(a=a.replace(/\/+$/,""));return a};var tydh=function(a){tyw.call(this);this.Oc=a;this.Oc.onwritestart=tyg(this.$d,this);this.Oc.onprogress=tyg(this.$d,this);this.Oc.onwrite=tyg(this.$d,this);this.Oc.onabort=tyg(this.$d,this);this.Oc.onerror=tyg(this.$d,this);this.Oc.onwriteend=tyg(this.$d,this)};tyi(tydh,tyw);tydh.prototype.abort=function(){try{this.Oc.abort()}catch(a){throw new tyah(a,"aborting save");}};tydh.prototype.je=function(){return this.Oc.readyState};tydh.prototype.$d=function(a){this.dispatchEvent(new tybh(a,this))};
tydh.prototype.D=function(){delete this.Oc;tydh.B.D.call(this)};var tyeh=function(a){tydh.call(this,a);this.Sk=a};tyi(tyeh,tydh);tyeh.prototype.Zl=function(){return this.Sk.length};tyeh.prototype.write=function(a){try{this.Sk.write(a)}catch(b){throw new tyah(b,"writing file");}};tyeh.prototype.seek=function(a){try{this.Sk.seek(a)}catch(b){throw new tyah(b,"seeking in file");}};var tyfh=function(a,b){this.Kb=a;this.ce=b};ty=tyfh.prototype;ty.isFile=function(){return this.ce.isFile};ty.getName=function(){return this.ce.name};ty.mc=function(){return this.ce.fullPath};ty.copyTo=function(a,b){var c=new tyx;this.ce.copyTo(a.Zd,b,tyg(function(a){c.callback(a.isFile?new tygh(this.Kb,a):new tyhh(this.Kb,a))},this),tyg(function(d){c.V(new tyah(d,"copying "+this.mc()+" into "+a.mc()+(b?", renaming to "+b:"")))},this));return c};
ty.remove=function(){var a=new tyx;this.ce.remove(tyg(a.callback,a,!0),tyg(function(b){a.V(new tyah(b,"removing "+this.mc()))},this));return a};ty.getParent=function(){var a=new tyx;this.ce.getParent(tyg(function(b){a.callback(new tyhh(this.Kb,b))},this),tyg(function(b){a.V(new tyah(b,"getting parent of "+this.mc()))},this));return a};var tyhh=function(a,b){tyfh.call(this,a,b);this.Zd=b};tyi(tyhh,tyfh);
tyhh.prototype.getFile=function(a,b){var c=new tyx;this.Zd.getFile(a,tyih(b),tyg(function(a){c.callback(new tygh(this.Kb,a))},this),tyg(function(b){c.V(new tyah(b,"loading file "+a+" from "+this.mc()))},this));return c};tyhh.prototype.getDirectory=function(a,b){var c=new tyx;this.Zd.getDirectory(a,tyih(b),tyg(function(a){c.callback(new tyhh(this.Kb,a))},this),tyg(function(b){c.V(new tyah(b,"loading directory "+a+" from "+this.mc()))},this));return c};
tyhh.prototype.rl=function(a){function b(a){if(!d.length)return ty4c(a);var c=d.shift();return(".."==c?a.getParent():"."==c?ty4c(a):a.getDirectory(c,2)).addCallback(b)}if(0==a.lastIndexOf("/",0)){var c=this.Kb.Ui();if(this.mc()!=c.mc())return c.rl(a)}var d=tyRa(a.split("/"),ty5a);return b(this)};var tyih=function(a){return 2==a?{create:!0}:3==a?{create:!0,exclusive:!0}:{}},tygh=function(a,b){tyfh.call(this,a,b);this.Bq=b};tyi(tygh,tyfh);
tygh.prototype.createWriter=function(){var a=new tyx;this.Bq.createWriter(function(b){a.callback(new tyeh(b))},tyg(function(b){a.V(new tyah(b,"creating writer for "+this.mc()))},this));return a};var tyjh=function(a){this.Kb=a};tyjh.prototype.getName=function(){return this.Kb.name};tyjh.prototype.Ui=function(){return new tyhh(this,this.Kb.root)};var tykh=function(a,b){var c=tya.requestFileSystem||tya.webkitRequestFileSystem;if(!tye(c))return ty5c(Error("File API unsupported"));var d=new tyx;c(a,b,function(a){d.callback(new tyjh(a))},function(a){d.V(new tyah(a,"requesting filesystem"))});return d},tylh=function(a){return tykh(0,a)},tymh=function(a){return tykh(1,a)},tynh=function(a){var b=tya.BlobBuilder||tya.WebKitBlobBuilder;if(tyb(b)){for(var b=new b,c=0;c<arguments.length;c++)b.append(arguments[c]);return b.getBlob()}b=ty_a(arguments);
c=tya.BlobBuilder||tya.WebKitBlobBuilder;if(tyb(c)){for(var c=new c,d=0;d<b.length;d++)c.append(b[d],void 0);b=c.getBlob(void 0)}else if(tyb(tya.Blob))b=new Blob(b,{});else throw Error("This browser doesn't seem to support creating Blobs");return b};var tyoh=function(a,b){this.Ke=new tyx;this.ej(a,b)};tyoh.prototype.ej=function(a,b){tyy(typh(a,b).addCallback(function(){return(a==tyXg?tymh:tylh)(b)},this),function(a){this.Kb=a;this.Ke.callback()},function(){},this)};
var typh=function(a,b){var c=new tyx;(a==tyXg?navigator.webkitPersistentStorage:navigator.webkitTemporaryStorage).requestQuota(b,function(a){c.callback(a)},function(a){c.callback(a)});return c},tyqh=function(a,b){var c=new tyx;a.Ke.qd().addCallback(function(){var a=this.Kb.Ui(),e=tych(b).split("/"),f=tyg(function(a){for(var b="";tysa(b)&&0!=e.length;)b=e.shift();b.length?tyy(a.getDirectory(b,2),function(a){e.length?f(a):c.callback(a)},function(a){c.V(a)},this):c.callback(a)},this);f(a)},a);return c},
tyrh=function(a,b){var c=b.slice(b.lastIndexOf("/")+1),d=new tyx;tyy(tyqh(a,b).addCallback(function(a){return a.getFile(c,2)}),function(a){d.callback(a)},function(a){d.V(a)},a);return d};
tyoh.prototype.write=function(a,b,c){var d=new tyx,e,f=tyg(function(a){d.V(a)},this);tyy(tyrh(this,a).addCallback(function(a){e=a;return e.createWriter()}),function(a){a.addEventListener("writeend",function(){d.callback(e)});a.addEventListener("error",f);a.Zl()>=b.byteLength+c?(a.seek(c),a.write(tynh(b))):d.V(Error("Tried to write past the preallocated file size"))},f,this);return d};
var tysh=function(a){var b=new tyoh(tyXg,1073741824);tyN(a,tyVg,b)},tyth=function(a){var b=new tyoh(tyYg,536870912);tyN(a,tyWg,b)};var tyuh=new tyH("K"),tyvh=new tyH("L");new tyH("M");new tyH("N");var tywh=function(a){a.get(tyWg);this.Tn=a.get(tyVg);this.ia=a.get(tyDf)},tyxh=function(a){tyOg(a,tyuh)||tyN(a,tyuh,new tywh(a));a.get(tyuh)},tyyh=function(a){var b=new tyx;tyy(tyqh(a,"/"),function(){b.callback(a.Kb)},function(a){b.V(a)});return b};tywh.prototype.Rq=function(){return tyyh(this.Tn)};tywh.prototype.Sq=function(){return tyqh(this.Tn,"/")};
tywh.prototype.Fm=function(a,b){var c=new tyx;chrome.fileSystem.chooseEntry({type:"openDirectory"},function(d){null!=d?chrome.fileSystem.getDisplayPath(d,function(a){a={entry:new tyhh(new tyjh(d.filesystem),d),name:a,lt:b?chrome.fileSystem.retainEntry(d):void 0};c.callback(a)}):c.cancel(a||!1)});return c};new tyH("O");tyr&&tyu(8);var tyzh={},tyAh={},tyBh={},tyCh=function(){throw Error("Do not instantiate directly");};tyCh.prototype.xi=null;tyCh.prototype.Dc=function(){return this.content};tyCh.prototype.toString=function(){return this.content};var tyDh=function(a){if(!tyf(a))return String(a);if(a instanceof tyCh){if(a.Ve===tyzh)return tyNa(a.Dc());if(a.Ve===tyBh)return tyCa(a.Dc())}return"zSoyz"},tyEh={};var tyFh=function(a,b){null!=a&&this.append.apply(this,arguments)};ty=tyFh.prototype;ty.tb="";ty.set=function(a){this.tb=""+a};ty.append=function(a,b,c){this.tb+=a;if(null!=b)for(var d=1;d<arguments.length;d++)this.tb+=arguments[d];return this};ty.clear=function(){this.tb=""};ty.Zl=function(){return this.tb.length};ty.toString=function(){return this.tb};var tyGh=function(a){if(null!=a)switch(a.xi){case 1:return 1;case -1:return-1;case 0:return 0}return null},tyHh=function(){tyCh.call(this)};tyi(tyHh,tyCh);tyHh.prototype.Ve=tyzh;var tyIh=function(a){return null!=a&&a.Ve===tyzh?a:a instanceof tyad?tyO(tybd(a),a.Ml()):tyO(tyCa(String(String(a))),tyGh(a))},tyO=function(a){function b(a){this.content=a}b.prototype=a.prototype;return function(a,d){var e=new b(String(a));void 0!==d&&(e.xi=d);return e}}(tyHh);
(function(a){function b(a){this.content=a}b.prototype=a.prototype;return function(a,d){var e=String(a);if(!e)return"";e=new b(e);void 0!==d&&(e.xi=d);return e}})(tyHh);
var tyNh=function(a){return null!=a&&a.Ve===tyzh?(a=a.Dc(),a=String(a).replace(tyJh,"").replace(tyKh,"&lt;"),String(a).replace(tyLh,tyMh)):tyCa(String(a))},tyRh=function(a){if(null!=a&&a.Ve===tyAh)return String(a).replace(tyOh,tyPh);a instanceof ty9c?(a=a instanceof ty9c&&a.constructor===ty9c&&a.wp===ty8c?a.th:"type_error:SafeUrl",a=String(a).replace(tyOh,tyPh)):(a=String(a),a=tyQh.test(a)?a.replace(tyOh,tyPh):"#zSoyz");return a},tySh={"\x00":"&#0;","\t":"&#9;","\n":"&#10;","\x0B":"&#11;","\f":"&#12;",
"\r":"&#13;"," ":"&#32;",'"':"&quot;","&":"&amp;","'":"&#39;","-":"&#45;","/":"&#47;","<":"&lt;","=":"&#61;",">":"&gt;","`":"&#96;","\u0085":"&#133;","\u00a0":"&#160;","\u2028":"&#8232;","\u2029":"&#8233;"},tyMh=function(a){return tySh[a]},tyTh={"\x00":"%00","\u0001":"%01","\u0002":"%02","\u0003":"%03","\u0004":"%04","\u0005":"%05","\u0006":"%06","\u0007":"%07","\b":"%08","\t":"%09","\n":"%0A","\x0B":"%0B","\f":"%0C","\r":"%0D","\u000e":"%0E","\u000f":"%0F","\u0010":"%10","\u0011":"%11","\u0012":"%12",
"\u0013":"%13","\u0014":"%14","\u0015":"%15","\u0016":"%16","\u0017":"%17","\u0018":"%18","\u0019":"%19","\u001a":"%1A","\u001b":"%1B","\u001c":"%1C","\u001d":"%1D","\u001e":"%1E","\u001f":"%1F"," ":"%20",'"':"%22","'":"%27","(":"%28",")":"%29","<":"%3C",">":"%3E","\\":"%5C","{":"%7B","}":"%7D","\u007f":"%7F","\u0085":"%C2%85","\u00a0":"%C2%A0","\u2028":"%E2%80%A8","\u2029":"%E2%80%A9","\uff01":"%EF%BC%81","\uff03":"%EF%BC%83","\uff04":"%EF%BC%84","\uff06":"%EF%BC%86","\uff07":"%EF%BC%87","\uff08":"%EF%BC%88",
"\uff09":"%EF%BC%89","\uff0a":"%EF%BC%8A","\uff0b":"%EF%BC%8B","\uff0c":"%EF%BC%8C","\uff0f":"%EF%BC%8F","\uff1a":"%EF%BC%9A","\uff1b":"%EF%BC%9B","\uff1d":"%EF%BC%9D","\uff1f":"%EF%BC%9F","\uff20":"%EF%BC%A0","\uff3b":"%EF%BC%BB","\uff3d":"%EF%BC%BD"},tyPh=function(a){return tyTh[a]},tyLh=/[\x00\x22\x27\x3c\x3e]/g,tyOh=/[\x00- \x22\x27-\x29\x3c\x3e\\\x7b\x7d\x7f\x85\xa0\u2028\u2029\uff01\uff03\uff04\uff06-\uff0c\uff0f\uff1a\uff1b\uff1d\uff1f\uff20\uff3b\uff3d]/g,tyQh=/^(?![^#?]*\/(?:\.|%2E){2}(?:[\/?#]|$))(?:(?:https?|mailto):|[^&:\/?#]*(?:[\/?#]|$))/i,
tyJh=/<(?:!|\/?([a-zA-Z][a-zA-Z0-9:\-]*))(?:[^>'"]|"[^"]*"|'[^']*')*>/g,tyKh=/</g;var tyUh=function(a){this.la=void 0;this.Ka={};if(a){var b=ty6d(a);a=ty5d(a);for(var c=0;c<b.length;c++)this.set(b[c],a[c])}};tyUh.prototype.set=function(a,b){tyVh(this,a,b,!1)};tyUh.prototype.add=function(a,b){tyVh(this,a,b,!0)};
var tyVh=function(a,b,c,d){for(var e=0;e<b.length;e++){var f=b.charAt(e);a.Ka[f]||(a.Ka[f]=new tyUh);a=a.Ka[f]}if(d&&void 0!==a.la)throw Error('The collection already contains the key "'+b+'"');a.la=c},tyWh=function(a,b){for(var c=a,d=0;d<b.length;d++)if(c=c.Ka[b.charAt(d)],!c)return;return c};tyUh.prototype.get=function(a){return(a=tyWh(this,a))?a.la:void 0};tyUh.prototype.Ca=function(){var a=[];tyXh(this,a);return a};
var tyXh=function(a,b){void 0!==a.la&&b.push(a.la);for(var c in a.Ka)tyXh(a.Ka[c],b)};tyUh.prototype.$b=function(a){var b=[];if(a){for(var c=this,d=0;d<a.length;d++){var e=a.charAt(d);if(!c.Ka[e])return[];c=c.Ka[e]}tyYh(c,a,b)}else tyYh(this,"",b);return b};var tyYh=function(a,b,c){void 0!==a.la&&c.push(b);for(var d in a.Ka)tyYh(a.Ka[d],b+d,c)};ty=tyUh.prototype;ty.xc=function(a){return void 0!==this.get(a)};
ty.Ue=function(a){if(this.la===a)return!0;for(var b in this.Ka)if(this.Ka[b].Ue(a))return!0;return!1};ty.clear=function(){this.Ka={};this.la=void 0};ty.remove=function(a){for(var b=this,c=[],d=0;d<a.length;d++){var e=a.charAt(d);if(!b.Ka[e])throw Error('The collection does not have the key "'+a+'"');c.push([b,e]);b=b.Ka[e]}a=b.la;for(delete b.la;0<c.length;)if(e=c.pop(),b=e[0],e=e[1],b.Ka[e].Ad())delete b.Ka[e];else break;return a};ty.clone=function(){return new tyUh(this)};ty.zb=function(){return ty4d(this.Ca())};
ty.Ad=function(){return void 0===this.la&&tygb(this.Ka)};var tyZh=function(a){tyK(this,a,67,null)};tyi(tyZh,tyJ);ty=tyZh.prototype;ty.ke=function(){return tyL(this,1)};ty.Sc=function(a){tyM(this,1,a)};ty.Hg=function(){return tyL(this,12)};ty.Lf=function(a){tyM(this,12,a)};ty.zg=function(){return tyL(this,13)};ty.Jf=function(a){tyM(this,13,a)};ty.Bm=function(){return tyL(this,33)};ty.uk=function(a){tyM(this,33,a)};ty.Ll=function(){return null!=tyL(this,2)?tyL(this,2):!1};ty.If=function(a){tyM(this,2,a)};ty.Jl=function(){return tyL(this,51)};
ty.Bh=function(a){tyM(this,51,a)};ty.Vl=function(){return tyL(this,32)};ty.Eh=function(a){tyM(this,32,a)};ty.zm=function(){return null!=tyL(this,19)?tyL(this,19):!1};ty.Lh=function(a){tyM(this,19,a)};ty.Am=function(){return null!=tyL(this,52)?tyL(this,52):!1};ty.Mh=function(a){tyM(this,52,a)};ty.Il=function(){return null!=tyL(this,20)?tyL(this,20):!1};ty.Ah=function(a){tyM(this,20,a)};ty.nm=function(){return tyL(this,60)};ty.Jh=function(a){tyM(this,60,a)};
ty.Nl=function(){return null!=tyL(this,3)?tyL(this,3):!1};ty.Tj=function(a){tyM(this,3,a)};ty.Lq=function(){return null!=tyL(this,4)?tyL(this,4):!1};ty.Ct=function(a){tyM(this,4,a)};ty.bm=function(){return tyL(this,65)};ty.ck=function(a){tyM(this,65,a)};ty.dr=function(){return tyL(this,9)};ty.Qt=function(a){tyM(this,9,a)};ty.er=function(){return tyL(this,10)};ty.Rt=function(a){tyM(this,10,a)};ty.fr=function(){return tyL(this,11)};ty.St=function(a){tyM(this,11,a)};
ty.cr=function(){return null!=tyL(this,14)?tyL(this,14):!1};ty.Pt=function(a){tyM(this,14,a)};ty.Sl=function(){return null!=tyL(this,34)?tyL(this,34):!1};ty.Wj=function(a){tyM(this,34,a)};ty.Pl=function(){return tyL(this,15)};ty.Ch=function(a){tyM(this,15,a)};ty.Wl=function(){return tyL(this,16)};ty.$j=function(a){tyM(this,16,a)};ty.Yl=function(){return tyL(this,17)};ty.bk=function(a){tyM(this,17,a)};ty.Cm=function(){return tyL(this,18)};ty.Tt=function(a){tyM(this,18,a)};
ty.Dm=function(){return tyL(this,45)};ty.Ut=function(a){tyM(this,45,a)};ty.Nq=function(){return tyL(this,22)};ty.Dt=function(a){tyM(this,22,a)};ty.Xl=function(){return tyL(this,54)};ty.ak=function(a){tyM(this,54,a)};ty.Ol=function(){return tyL(this,21)};ty.Uj=function(a){tyM(this,21,a)};ty.Hq=function(){return null!=tyL(this,23)?tyL(this,23):!1};ty.wt=function(a){tyM(this,23,a)};ty.getToken=function(){return tyL(this,24)};ty.setToken=function(a){tyM(this,24,a)};ty.hr=function(){return tyL(this,36)};
ty.Wt=function(a){tyM(this,36,a)};ty.ar=function(){return null!=tyL(this,6)?tyL(this,6):!1};ty.Nt=function(a){tyM(this,6,a)};ty.Zq=function(){return tyL(this,26)};ty.Mt=function(a){tyM(this,26,a)};ty.Ul=function(){return tyL(this,30)};ty.Yj=function(a){tyM(this,30,a)};ty.Gm=function(){return tyL(this,31)};ty.wk=function(a){tyM(this,31,a)};ty.mm=function(){return tyL(this,27)};ty.jk=function(a){tyM(this,27,a)};ty.Vq=function(){return tyL(this,28)};ty.Lt=function(a){tyM(this,28,a)};
ty.tm=function(){return tyL(this,57)};ty.pk=function(a){tyM(this,57,a)};ty.um=function(){return tyL(this,58)};ty.qk=function(a){tyM(this,58,a)};ty.rm=function(){return tyL(this,59)};ty.nk=function(a){tyM(this,59,a)};ty.vm=function(){return null!=tyL(this,35)?tyL(this,35):!1};ty.rk=function(a){tyM(this,35,a)};ty.wm=function(){return null!=tyL(this,41)?tyL(this,41):!1};ty.sk=function(a){tyM(this,41,a)};ty.pm=function(){return null!=tyL(this,64)?tyL(this,64):!1};ty.mk=function(a){tyM(this,64,a)};
ty.im=function(){return null!=tyL(this,48)?tyL(this,48):!1};ty.ik=function(a){tyM(this,48,a)};ty.sm=function(){return null!=tyL(this,49)?tyL(this,49):!1};ty.ok=function(a){tyM(this,49,a)};ty.fm=function(){return null!=tyL(this,37)?tyL(this,37):!1};ty.gk=function(a){tyM(this,37,a)};ty.Gq=function(){return tyL(this,38)};ty.vt=function(a){tyM(this,38,a)};ty.Fq=function(){return tyL(this,39)};ty.tt=function(a){tyM(this,39,a)};ty.gm=function(){return tyL(this,40)};ty.hk=function(a){tyM(this,40,a)};
ty.Rl=function(){return tyL(this,42)};ty.Vj=function(a){tyM(this,42,a)};ty.Kq=function(){return tyL(this,43)};ty.Bt=function(a){tyM(this,43,a)};ty.Uq=function(){return tyL(this,44)};ty.Jt=function(a){tyM(this,44,a)};ty.Tq=function(){return tyL(this,62)};ty.It=function(a){tyM(this,62,a)};ty.hm=function(){return tyL(this,46)};ty.Ih=function(a){tyM(this,46,a)};ty.om=function(){return tyL(this,61)};ty.lk=function(a){tyM(this,61,a)};ty.Tl=function(){return tyL(this,50)};ty.Xj=function(a){tyM(this,50,a)};
ty.em=function(){return tyL(this,53)};ty.fk=function(a){tyM(this,53,a)};ty.dm=function(){return tyL(this,55)};ty.ek=function(a){tyM(this,55,a)};ty.xm=function(){return tyL(this,56)};ty.tk=function(a){tyM(this,56,a)};ty.Hm=function(){return tyL(this,63)};ty.xk=function(a){tyM(this,63,a)};ty.cm=function(){return tyL(this,66)};ty.dk=function(a){tyM(this,66,a)};var tyP=function(){tyK(this,void 0,67,null)};tyi(tyP,tyZh);tyP.prototype.zt=function(a){this.vq=a};tyP.prototype.Jq=function(){return this.vq};tyP.prototype.yt=function(a){this.uq=a};tyP.prototype.Iq=function(){return this.uq};var ty1h=function(){if(!ty_h){var a=ty_h=new tyUh,b;for(b in ty0h)a.add(b,ty0h[b])}},ty_h,tyQ=function(a,b){this.types=a;this.Xt=b},ty0h={a:new tyQ([1,0],[tyP.prototype.Uj,tyP.prototype.tk]),b:new tyQ([1,0],[tyP.prototype.wt,tyP.prototype.vt]),c:new tyQ([1,0],[tyP.prototype.If,tyP.prototype.tt]),cc:new tyQ([1],[tyP.prototype.Bh]),ci:new tyQ([1],[tyP.prototype.Eh]),d:new tyQ([1],[tyP.prototype.Tj]),e:new tyQ([0],[tyP.prototype.Ch]),f:new tyQ([2],[tyP.prototype.$j]),fg:new tyQ([1],[tyP.prototype.Wj]),
fh:new tyQ([1],[tyP.prototype.Yj]),ft:new tyQ([1],[tyP.prototype.Xj]),fv:new tyQ([1],[tyP.prototype.wk]),g:new tyQ([1],[tyP.prototype.Pt]),h:new tyQ([1,0],[tyP.prototype.Ct,tyP.prototype.Jf]),i:new tyQ([1],[tyP.prototype.Dt]),ip:new tyQ([1],[tyP.prototype.ak]),j:new tyQ([2],[tyP.prototype.yt]),k:new tyQ([1,0],[tyP.prototype.bk,tyP.prototype.Vj]),l:new tyQ([0],[tyP.prototype.Jt]),lf:new tyQ([1],[tyP.prototype.ck]),m:new tyQ([0],[tyP.prototype.xk]),mv:new tyQ([1],[tyP.prototype.dk]),n:new tyQ([1],[tyP.prototype.Ah]),
nc:new tyQ([1],[tyP.prototype.ek]),nd:new tyQ([1],[tyP.prototype.fk]),no:new tyQ([1],[tyP.prototype.gk]),ns:new tyQ([1],[tyP.prototype.hk]),nt0:new tyQ([2],[tyP.prototype.Wt]),nu:new tyQ([1],[tyP.prototype.Ih]),nw:new tyQ([1],[tyP.prototype.ik]),o:new tyQ([1,2],[tyP.prototype.jk,tyP.prototype.zt]),p:new tyQ([1,0],[tyP.prototype.Lh,tyP.prototype.Bt]),pa:new tyQ([1],[tyP.prototype.lk]),pd:new tyQ([1],[tyP.prototype.Jh]),pp:new tyQ([1],[tyP.prototype.Mh]),q:new tyQ([2],[tyP.prototype.Lt]),r:new tyQ([1,
0],[tyP.prototype.Nt,tyP.prototype.Mt]),rg:new tyQ([1],[tyP.prototype.nk]),rh:new tyQ([1],[tyP.prototype.ok]),rj:new tyQ([1],[tyP.prototype.pk]),rp:new tyQ([1],[tyP.prototype.qk]),rw:new tyQ([1],[tyP.prototype.rk]),rwu:new tyQ([1],[tyP.prototype.sk]),rwa:new tyQ([1],[tyP.prototype.mk]),s:new tyQ([1,0],[tyP.prototype.uk,tyP.prototype.Sc]),t:new tyQ([2],[tyP.prototype.setToken]),u:new tyQ([1],[tyP.prototype.Tt]),ut:new tyQ([1],[tyP.prototype.Ut]),v:new tyQ([0],[tyP.prototype.It]),w:new tyQ([0],[tyP.prototype.Lf]),
x:new tyQ([0],[tyP.prototype.Qt]),y:new tyQ([0],[tyP.prototype.Rt]),z:new tyQ([0],[tyP.prototype.St])},ty2h=function(a,b){ty3d("For token '%s': %s",a,b)};
ty1h.prototype.parse=function(a){var b=new tyP,c=new tyP;if(""==a)a=!0;else{a=a.split("-");for(var d=!0,e=0;e<a.length;e++){var f=a[e],g=f.substring(0,1);if("O"==g||"J"==g){for(g="";12>g.length&&e<a.length;)f=a[e],g=g+"-"+f,e++;f=g.substring(1)}var g=b,h=c;if(0==f.length)f=!1;else{var k=void 0;for(var l=ty_h,m=void 0,k=f.substring(0,1).toLowerCase()+f.substring(1),m=1;m<=k.length;++m){var n=l,p=k.substring(0,m);if(0==p.length?n.Ad():!tyWh(n,p))break}k=1==m?null:(l=l.get(k.substring(0,m-1)))?{Rs:f.substring(0,
m-1),value:f.substring(m-1),attributes:l}:null;if(k){m=void 0;n:{var m=k.Rs,l=k.value,k=k.attributes,n=[],p=[],q=void 0;for(q in k.types){var r=k.types[q],t=k.Xt[q],t=ty3h(this,r)(m,l,g,h,t);if(null===t){m=!0;break n}n.push(r);p.push(t)}for(q in p)r=n[q],t=p[q],ty4h(this,r)(f,t);m=!1}f=m}else f=!1}d=d&&f}a=d}return new ty5h(b,c,a)};var ty6h=function(a,b,c,d,e){e.apply(c,[b]);a=a.substring(0,1);e.apply(d,[a==a.toUpperCase()])};ty=ty1h.prototype;
ty.Vs=function(a,b,c,d,e){if(""==b)return 0;b=tyMa(b);if(isNaN(b))return 1;ty6h(a,b,c,d,e);return null};ty.ds=function(a,b){switch(b){case 1:ty2h(a,"Option value could not be interpreted as an integer.");break;case 0:ty2h(a,"Missing value for integer option.")}};ty.Us=function(a,b,c,d,e){if(""!=b)return 2;ty6h(a,!0,c,d,e);return null};ty.cs=function(a,b){switch(b){case 2:ty2h(a,"Unexpected value specified for boolean option.")}};ty.Ws=function(a,b,c,d,e){if(""==b)return 0;ty6h(a,b,c,d,e);return null};
ty.fs=function(a,b){switch(b){case 0:ty2h(a,"Missing value for string option.")}};var ty3h=function(a,b){switch(b){case 0:return tyg(a.Vs,a);case 1:return tyg(a.Us,a);case 2:return tyg(a.Ws,a);default:return function(){}}},ty4h=function(a,b){switch(b){case 0:return tyg(a.ds,a);case 1:return tyg(a.cs,a);case 2:return tyg(a.fs,a);default:return function(){}}},ty5h=function(a,b,c){this.Je=a;this.Ao=b;this.Wf=c};ty5h.prototype.mn=function(){return this.Wf};var ty8h=function(a){this.Fj=null;this.Ub=[];this.Pb=null;ty7h(this,a)},ty9h=function(a){null==a.Fj&&(a.Fj=new ty1h);return a.Fj},ty7h=function(a,b){a.Pb=b?tyd(b)?ty9h(a).parse(b):b:ty9h(a).parse("")},tyR=function(a,b,c,d){b||"number"==typeof b&&0==b||(b=void 0);var e=a.Pb.Je;a=a.Pb.Ao;var f=c.call(e);b!=f&&(void 0!=f&&c.call(a),d.call(e,b))};ty=ty8h.prototype;ty.If=function(a){a&&ty$h(this);tyR(this,a,tyP.prototype.Ll,tyP.prototype.If);return this};
ty.Tj=function(a){tyR(this,a,tyP.prototype.Nl,tyP.prototype.Tj);return this};ty.Jf=function(a){null!=a&&this.Sc();tyR(this,a,tyP.prototype.zg,tyP.prototype.Jf);return this};ty.uk=function(a){a&&ty$h(this);tyR(this,a,tyP.prototype.Bm,tyP.prototype.uk);return this};ty.$j=function(a){a&&(a=a.replace(";",":"));tyR(this,a,tyP.prototype.Wl,tyP.prototype.$j);return this};ty.Yj=function(a){tyR(this,a,tyP.prototype.Ul,tyP.prototype.Yj);return this};
ty.wk=function(a){tyR(this,a,tyP.prototype.Gm,tyP.prototype.wk);return this};ty.Eh=function(a){a&&ty$h(this);tyR(this,a,tyP.prototype.Vl,tyP.prototype.Eh);return this};ty.Bh=function(a){a&&ty$h(this);tyR(this,a,tyP.prototype.Jl,tyP.prototype.Bh);return this};ty.Wj=function(a){tyR(this,a,tyP.prototype.Sl,tyP.prototype.Wj);return this};ty.Xj=function(a){tyR(this,a,tyP.prototype.Tl,tyP.prototype.Xj);return this};ty.bk=function(a){tyR(this,a,tyP.prototype.Yl,tyP.prototype.bk);return this};
ty.Uj=function(a){tyR(this,a,tyP.prototype.Ol,tyP.prototype.Uj);return this};ty.Sc=function(a){tyf(a)&&(a=Math.max(a.width,a.height));null!=a&&(this.Lf(),this.Jf());tyR(this,a,tyP.prototype.ke,tyP.prototype.Sc);return this};ty.Lh=function(a){a&&ty$h(this);tyR(this,a,tyP.prototype.zm,tyP.prototype.Lh);return this};ty.Mh=function(a){a&&ty$h(this);tyR(this,a,tyP.prototype.Am,tyP.prototype.Mh);return this};ty.Ah=function(a){a&&ty$h(this);tyR(this,a,tyP.prototype.Il,tyP.prototype.Ah);return this};
ty.Jh=function(a){a&&ty$h(this);tyR(this,a,tyP.prototype.nm,tyP.prototype.Jh);return this};ty.lk=function(a){tyR(this,a,tyP.prototype.om,tyP.prototype.lk);return this};ty.Lf=function(a){null!=a&&this.Sc();tyR(this,a,tyP.prototype.Hg,tyP.prototype.Lf);return this};ty.Ch=function(a){tyR(this,a,tyP.prototype.Pl,tyP.prototype.Ch);return this};ty.rk=function(a){tyR(this,a,tyP.prototype.vm,tyP.prototype.rk);return this};ty.sk=function(a){tyR(this,a,tyP.prototype.wm,tyP.prototype.sk);return this};
ty.mk=function(a){tyR(this,a,tyP.prototype.pm,tyP.prototype.mk);return this};ty.ik=function(a){tyR(this,a,tyP.prototype.im,tyP.prototype.ik);return this};ty.ok=function(a){tyR(this,a,tyP.prototype.sm,tyP.prototype.ok);return this};ty.pk=function(a){tyR(this,a,tyP.prototype.tm,tyP.prototype.pk);return this};ty.qk=function(a){tyR(this,a,tyP.prototype.um,tyP.prototype.qk);return this};ty.nk=function(a){tyR(this,a,tyP.prototype.rm,tyP.prototype.nk);return this};
ty.jk=function(a){tyR(this,a,tyP.prototype.mm,tyP.prototype.jk);return this};ty.fk=function(a){tyR(this,a,tyP.prototype.em,tyP.prototype.fk);return this};ty.ek=function(a){tyR(this,a,tyP.prototype.dm,tyP.prototype.ek);return this};ty.ak=function(a){tyR(this,a,tyP.prototype.Xl,tyP.prototype.ak);return this};ty.gk=function(a){tyR(this,a,tyP.prototype.fm,tyP.prototype.gk);return this};ty.hk=function(a){tyR(this,a,tyP.prototype.gm,tyP.prototype.hk);return this};
ty.Ih=function(a){tyR(this,a,tyP.prototype.hm,tyP.prototype.Ih);return this};ty.Vj=function(a){tyR(this,a,tyP.prototype.Rl,tyP.prototype.Vj);return this};ty.tk=function(a){tyR(this,a,tyP.prototype.xm,tyP.prototype.tk);return this};ty.xk=function(a){tyR(this,a,tyP.prototype.Hm,tyP.prototype.xk);return this};ty.ck=function(a){tyR(this,a,tyP.prototype.bm,tyP.prototype.ck);return this};ty.dk=function(a){tyR(this,a,tyP.prototype.cm,tyP.prototype.dk);return this};
var ty$h=function(a){a.Ah();a.Bh();a.If();a.Eh();a.Jh();a.Lh();a.Mh()};
ty8h.prototype.Uc=function(){this.Ub.length=0;var a=this.Pb.Je;a.Cm()||a.Dm()?a.ke()||this.Sc(0):(a=this.Pb.Je,a.ke()||a.Hg()||a.zg()||(this.Sc(),this.Jf(),this.Lf(),ty$h(this)));tyS(this,"s",tyP.prototype.ke);tyS(this,"w",tyP.prototype.Hg);tyT(this,"c",tyP.prototype.Ll);tyS(this,"c",tyP.prototype.Fq,16,6);tyT(this,"d",tyP.prototype.Nl);tyS(this,"h",tyP.prototype.zg);tyT(this,"s",tyP.prototype.Bm);tyT(this,"h",tyP.prototype.Lq);tyT(this,"p",tyP.prototype.zm);tyT(this,"pa",tyP.prototype.om);tyT(this,
"pd",tyP.prototype.nm);tyT(this,"pp",tyP.prototype.Am);tyS(this,"p",tyP.prototype.Kq);tyT(this,"n",tyP.prototype.Il);tyS(this,"r",tyP.prototype.Zq);tyT(this,"r",tyP.prototype.ar);tyT(this,"fh",tyP.prototype.Ul);tyT(this,"fv",tyP.prototype.Gm);tyT(this,"cc",tyP.prototype.Jl);tyT(this,"ci",tyP.prototype.Vl);tyT(this,"o",tyP.prototype.mm);tyai(this,"o",tyP.prototype.Jq);tyai(this,"j",tyP.prototype.Iq);tyS(this,"x",tyP.prototype.dr);tyS(this,"y",tyP.prototype.er);tyS(this,"z",tyP.prototype.fr);tyT(this,
"g",tyP.prototype.cr);tyT(this,"fg",tyP.prototype.Sl);tyT(this,"ft",tyP.prototype.Tl);tyS(this,"e",tyP.prototype.Pl);tyai(this,"f",tyP.prototype.Wl);tyT(this,"k",tyP.prototype.Yl);tyS(this,"k",tyP.prototype.Rl);tyT(this,"u",tyP.prototype.Cm);tyT(this,"ut",tyP.prototype.Dm);tyT(this,"i",tyP.prototype.Nq);tyT(this,"ip",tyP.prototype.Xl);tyT(this,"a",tyP.prototype.Ol);tyS(this,"a",tyP.prototype.xm);tyS(this,"m",tyP.prototype.Hm);tyT(this,"lf",tyP.prototype.bm);tyT(this,"mv",tyP.prototype.cm);tyT(this,
"b",tyP.prototype.Hq);tyS(this,"b",tyP.prototype.Gq);tyai(this,"t",tyP.prototype.getToken);tyai(this,"nt0",tyP.prototype.hr);tyT(this,"rw",tyP.prototype.vm);tyT(this,"rwu",tyP.prototype.wm);tyT(this,"rwa",tyP.prototype.pm);tyT(this,"nw",tyP.prototype.im);tyT(this,"rh",tyP.prototype.sm);tyT(this,"nc",tyP.prototype.dm);tyT(this,"nd",tyP.prototype.em);tyT(this,"no",tyP.prototype.fm);tyai(this,"q",tyP.prototype.Vq);tyT(this,"ns",tyP.prototype.gm);tyS(this,"l",tyP.prototype.Uq);tyS(this,"v",tyP.prototype.Tq);
tyT(this,"nu",tyP.prototype.hm);tyT(this,"rj",tyP.prototype.tm);tyT(this,"rp",tyP.prototype.um);tyT(this,"rg",tyP.prototype.rm);return this.Ub.join("-")};
var tyS=function(a,b,c,d,e){var f=c.call(a.Pb.Je);if(void 0!=f&&null!=f){var g;g=void 0==d?10:10!=d&&16!=d?10:d;f=f.toString(g);d=new tyFh;d.append(16==g?"0x":"");void 0==e?e="":(e-=f.length,e=0>=e?"":tyGa("0",e));d.append(e);d.append(f);tybi(a,b,d.toString(),c)}},tyT=function(a,b,c){c.call(a.Pb.Je)&&tybi(a,b,"",c)},tyai=function(a,b,c){var d=c.call(a.Pb.Je);d&&tybi(a,b,d,c)},tybi=function(a,b,c,d){d.call(a.Pb.Ao)&&(b=b.substring(0,1).toUpperCase()+b.substring(1));a.Ub.push(b+c)};var tyci=/^[^\/]*\/\//,tydi=function(){};tydi.prototype.parse=function(a){return new tyei(a)};
var tyei=function(a){this.zf=a;this.nh="";(a=this.zf.match(tyci))&&a[0]?(this.nh=a[0],a=this.nh.match(/\w+/)?this.zf:"http://"+this.zf.substring(this.nh.length)):a="http://"+this.zf;this.Vf=tywf(a,!0);this.Wf=!0;this.Fn=!1},tyfi=["image","proxy","public"],tyhi=function(a){if(void 0==a.Ub){a.Ub=a.Vf.cb.substring(1).split("/");var b=a.Ub.length;if(7==b||2==b)tygi(a.Ub[0])||(a.Wf=!1);else if(7<b||2<b&&5>b||0==b)a.Wf=!1;if(2>=b){a.Fn=!0;var b=b-1,c=a.Ub[b],d=c.indexOf("=");-1!=d&&(a.Ub[b]=c.substr(0,
d),a.Ub.push(c.substr(d+1)))}}return a.Ub};tyei.prototype.mn=function(){tyhi(this);return this.Wf};var tyii=function(a){tyhi(a);return a.Fn};tyei.prototype.ge=function(){var a=this.Vf.kd;return this.Vf.ge()+(a?":"+a:"")};tyei.prototype.mc=function(){return this.Vf.cb};tyei.prototype.Ti=function(){return this.Vf.Xa.toString()};
var tyji=function(a){if(void 0!=a.oh)return a.oh;var b=tyhi(a);tygi(b[0])?a.oh=b[0]:a.oh=null;return a.oh},tyki=function(a){switch(tyhi(a).length){case 7:return!0;case 6:return null==tyji(a);case 5:return!1;case 3:return!0;case 2:return null==tyji(a);case 1:return!1;default:return!1}},tyli=function(a,b){var c;if(tyii(a))t:{c=null!=tyji(a)?1:0;switch(b){case 6:c=0+c;break;case 4:if(!tyki(a)){c=null;break t}c=1+c;break;default:c=null;break t}c=tyhi(a)[c]}else t:{c=null!=tyji(a)?1:0;switch(b){case 0:c=
0+c;break;case 1:c=1+c;break;case 2:c=2+c;break;case 3:c=3+c;break;case 4:if(!tyki(a)){c=null;break t}c=4+c;break;case 5:var d=tyki(a)?1:0;c=4+c+d;break;default:c=null;break t}c=tyhi(a)[c]}return c};tyei.prototype.Qq=function(){void 0==this.En&&(this.En=tyli(this,0));return this.En};var tymi=function(a){void 0==a.Un&&(a.Un=tyli(a,1));return a.Un},tyni=function(a){void 0==a.Zm&&(a.Zm=tyli(a,2));return a.Zm},tyoi=function(a){void 0==a.Bo&&(a.Bo=tyli(a,3));return a.Bo};
tyei.prototype.Cg=function(){void 0==this.Rn&&(this.Rn=tyli(this,4));return this.Rn};var typi=function(a){if(void 0==a.Pb){var b=a.Cg();b||(b="");a.Pb=(new ty1h).parse(b)}return a.Pb};tyei.prototype.Ql=function(){void 0==this.Cl&&(this.Cl=tyli(this,5));return this.Cl};var tygi=function(a){return!(!a||!tym(tyfi,a))};var tyri=function(a){this.Wa=null;a instanceof tyei||(void 0==tyqi&&(tyqi=new tydi),a=tyqi.parse(a.toString()));this.Wa=a;ty8h.call(this,typi(this.Wa));this.$s=this.Wa.nh;this.ic=this.Wa.ge();this.Xn=this.Wa.Ti()},tyqi;tyi(tyri,ty8h);
tyri.prototype.Uc=function(){if(!this.Wa.mn())return this.Wa.zf;var a=tyri.B.Uc.call(this),b=[];null!=tyji(this.Wa)&&b.push(tyji(this.Wa));if(tyii(this.Wa)){var c=this.Wa;void 0==c.Dn&&(c.Dn=tyli(c,6));b.push(c.Dn+(a?"="+a:""))}else b.push(this.Wa.Qq()),b.push(tymi(this.Wa)),b.push(tyni(this.Wa)),b.push(tyoi(this.Wa)),a&&b.push(a),b.push(this.Wa.Ql());return this.$s+this.ic+"/"+b.join("/")+(this.Xn?"?"+this.Xn:"")};var tysi=/^(https?:)?\/\/(lh|gp|ci|gm)[3-6](-tt|-d[a-g,z])?\.((ggpht)|(googleusercontent)|(google))\.com\//i,tyti=/^(https?:)?\/\/sp[1-4]\.((ggpht)|(googleusercontent))\.com\//i,tyui=/^(https?:)?\/\/(qa(-red|-blue)?|dev2)-lighthouse\.sandbox\.google\.com\//i,tyvi=/^(https?:)?\/\/lighthouse-(qa(-red|-blue)?|dev2)\.corp\.google\.com\//i,tywi=function(a){return tysi.test(a)||tyti.test(a)||tyui.test(a)||tyvi.test(a)};var tyxi={hv:["BC","AD"],gv:["Before Christ","Anno Domini"],Ev:"JFMAMJJASOND".split(""),Jw:"JFMAMJJASOND".split(""),Cv:"January February March April May June July August September October November December".split(" "),Iw:"January February March April May June July August September October November December".split(" "),xw:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),Lw:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),Fx:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
Nw:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),zw:"Sun Mon Tue Wed Thu Fri Sat".split(" "),Mw:"Sun Mon Tue Wed Thu Fri Sat".split(" "),Fv:"SMTWTFS".split(""),Kw:"SMTWTFS".split(""),yw:["Q1","Q2","Q3","Q4"],Nv:["1st quarter","2nd quarter","3rd quarter","4th quarter"],Cu:["AM","PM"],Tk:["EEEE, MMMM d, y","MMMM d, y","MMM d, y","M/d/yy"],Yk:["h:mm:ss a zzzz","h:mm:ss a z","h:mm:ss a","h:mm a"],ep:["{1} 'at' {0}","{1} 'at' {0}","{1}, {0}","{1}, {0}"],jp:6,Gx:[5,6],kp:5};var tyAi=function(a,b,c){tyga(a)?(this.date=tyyi(a,b||0,c||1),tyzi(this,c||1)):tyf(a)?(this.date=tyyi(a.getFullYear(),a.getMonth(),a.getDate()),tyzi(this,a.getDate())):(this.date=new Date(tyh()),this.date.setHours(0),this.date.setMinutes(0),this.date.setSeconds(0),this.date.setMilliseconds(0))},tyyi=function(a,b,c){b=new Date(a,b,c);0<=a&&100>a&&b.setFullYear(b.getFullYear()-1900);return b};ty=tyAi.prototype;ty.ug=tyxi.jp;ty.vg=tyxi.kp;
ty.clone=function(){var a=new tyAi(this.date);a.ug=this.ug;a.vg=this.vg;return a};ty.getFullYear=function(){return this.date.getFullYear()};ty.getYear=function(){return this.getFullYear()};ty.getMonth=function(){return this.date.getMonth()};ty.getDate=function(){return this.date.getDate()};ty.getTime=function(){return this.date.getTime()};ty.getUTCHours=function(){return this.date.getUTCHours()};ty.getTimezoneOffset=function(){return this.date.getTimezoneOffset()};
var tyBi=function(a){a=a.getTimezoneOffset();if(0==a)a="Z";else{var b=Math.abs(a)/60,c=Math.floor(b),b=60*(b-c);a=(0<a?"-":"+")+tyHa(c)+":"+tyHa(b)}return a};ty=tyAi.prototype;ty.set=function(a){this.date=new Date(a.getFullYear(),a.getMonth(),a.getDate())};ty.setFullYear=function(a){this.date.setFullYear(a)};ty.setMonth=function(a){this.date.setMonth(a)};ty.setDate=function(a){this.date.setDate(a)};ty.setTime=function(a){this.date.setTime(a)};
ty.add=function(a){if(a.zu||a.rs){var b=this.getMonth()+a.rs+12*a.zu,c=this.getYear()+Math.floor(b/12),b=b%12;0>b&&(b+=12);var d;t:{switch(b){case 1:d=0!=c%4||0==c%100&&0!=c%400?28:29;break t;case 5:case 8:case 10:case 3:d=30;break t}d=31}d=Math.min(d,this.getDate());this.setDate(1);this.setFullYear(c);this.setMonth(b);this.setDate(d)}a.mq&&(a=new Date((new Date(this.getYear(),this.getMonth(),this.getDate(),12)).getTime()+864E5*a.mq),this.setDate(1),this.setFullYear(a.getFullYear()),this.setMonth(a.getMonth()),
this.setDate(a.getDate()),tyzi(this,a.getDate()))};ty.Rh=function(a,b){return[this.getFullYear(),tyHa(this.getMonth()+1),tyHa(this.getDate())].join(a?"-":"")+(b?tyBi(this):"")};ty.wa=function(a){return!(!a||this.getYear()!=a.getYear()||this.getMonth()!=a.getMonth()||this.getDate()!=a.getDate())};ty.toString=function(){return this.Rh()};var tyzi=function(a,b){a.getDate()!=b&&a.date.setUTCHours(a.date.getUTCHours()+(a.getDate()<b?1:-1))};tyAi.prototype.valueOf=function(){return this.date.valueOf()};
var tyCi=function(a,b,c,d,e,f,g){this.date=tyga(a)?new Date(a,b||0,c||1,d||0,e||0,f||0,g||0):new Date(a?a.getTime():tyh())};tyi(tyCi,tyAi);ty=tyCi.prototype;ty.getHours=function(){return this.date.getHours()};ty.getMinutes=function(){return this.date.getMinutes()};ty.getSeconds=function(){return this.date.getSeconds()};ty.getUTCHours=function(){return this.date.getUTCHours()};ty.setHours=function(a){this.date.setHours(a)};ty.setMinutes=function(a){this.date.setMinutes(a)};ty.setSeconds=function(a){this.date.setSeconds(a)};
ty.setMilliseconds=function(a){this.date.setMilliseconds(a)};ty.setUTCHours=function(a){this.date.setUTCHours(a)};ty.add=function(a){tyAi.prototype.add.call(this,a);a.Mr&&this.setHours(this.date.getHours()+a.Mr);a.ms&&this.setMinutes(this.date.getMinutes()+a.ms);a.ot&&this.setSeconds(this.date.getSeconds()+a.ot)};
ty.Rh=function(a,b){var c=tyAi.prototype.Rh.call(this,a);return a?c+" "+tyHa(this.getHours())+":"+tyHa(this.getMinutes())+":"+tyHa(this.getSeconds())+(b?tyBi(this):""):c+"T"+tyHa(this.getHours())+tyHa(this.getMinutes())+tyHa(this.getSeconds())+(b?tyBi(this):"")};ty.wa=function(a){return this.getTime()==a.getTime()};ty.toString=function(){return this.Rh()};ty.clone=function(){var a=new tyCi(this.date);a.ug=this.ug;a.vg=this.vg;return a};var tyDi=function(){this.Yn=tyh()};new tyDi;tyDi.prototype.set=function(a){this.Yn=a};tyDi.prototype.get=function(){return this.Yn};var tyEi={fp:".",lp:",",Wk:"%",zp:"0",Mv:"+",Bv:"-",hp:"E",Xk:"\u2030",Vk:"\u221e",Dv:"NaN",Uk:"#,##0.###",xp:"#E0",qp:"#,##0%",dp:"\u00a4#,##0.00",gp:"USD"},tyU=tyEi,tyU=tyEi;var tyFi=function(a,b,c,d){this.top=a;this.right=b;this.bottom=c;this.left=d};ty=tyFi.prototype;ty.Hg=function(){return this.right-this.left};ty.zg=function(){return this.bottom-this.top};ty.clone=function(){return new tyFi(this.top,this.right,this.bottom,this.left)};ty.contains=function(a){return this&&a?a instanceof tyFi?a.left>=this.left&&a.right<=this.right&&a.top>=this.top&&a.bottom<=this.bottom:a.x>=this.left&&a.x<=this.right&&a.y>=this.top&&a.y<=this.bottom:!1};
ty.ceil=function(){this.top=Math.ceil(this.top);this.right=Math.ceil(this.right);this.bottom=Math.ceil(this.bottom);this.left=Math.ceil(this.left);return this};ty.floor=function(){this.top=Math.floor(this.top);this.right=Math.floor(this.right);this.bottom=Math.floor(this.bottom);this.left=Math.floor(this.left);return this};ty.round=function(){this.top=Math.round(this.top);this.right=Math.round(this.right);this.bottom=Math.round(this.bottom);this.left=Math.round(this.left);return this};var tyV=function(a,b,c,d){this.left=a;this.top=b;this.width=c;this.height=d};ty=tyV.prototype;ty.clone=function(){return new tyV(this.left,this.top,this.width,this.height)};ty.en=function(a){var b=Math.max(this.left,a.left),c=Math.min(this.left+this.width,a.left+a.width);if(b<=c){var d=Math.max(this.top,a.top);a=Math.min(this.top+this.height,a.top+a.height);if(d<=a)return this.left=b,this.top=d,this.width=c-b,this.height=a-d,!0}return!1};
ty.Di=function(a){var b;i:{b=Math.max(this.left,a.left);var c=Math.min(this.left+this.width,a.left+a.width);if(b<=c){var d=Math.max(this.top,a.top),e=Math.min(this.top+this.height,a.top+a.height);if(d<=e){b=new tyV(b,d,c-b,e-d);break i}}b=null}if(b&&b.height&&b.width){b=[];var c=this.top,d=this.height,e=this.left+this.width,f=this.top+this.height,g=a.left+a.width,h=a.top+a.height;a.top>this.top&&(b.push(new tyV(this.left,this.top,this.width,a.top-this.top)),c=a.top,d-=a.top-this.top);h<f&&(b.push(new tyV(this.left,
h,this.width,f-h)),d=h-c);a.left>this.left&&b.push(new tyV(this.left,c,a.left-this.left,d));g<e&&b.push(new tyV(g,c,e-g,d));a=b}else a=[this.clone()];return a};ty.contains=function(a){return a instanceof tyV?this.left<=a.left&&this.left+this.width>=a.left+a.width&&this.top<=a.top&&this.top+this.height>=a.top+a.height:a.x>=this.left&&a.x<=this.left+this.width&&a.y>=this.top&&a.y<=this.top+this.height};ty.ke=function(){return new tyed(this.width,this.height)};
ty.ceil=function(){this.left=Math.ceil(this.left);this.top=Math.ceil(this.top);this.width=Math.ceil(this.width);this.height=Math.ceil(this.height);return this};ty.floor=function(){this.left=Math.floor(this.left);this.top=Math.floor(this.top);this.width=Math.floor(this.width);this.height=Math.floor(this.height);return this};ty.round=function(){this.left=Math.round(this.left);this.top=Math.round(this.top);this.width=Math.round(this.width);this.height=Math.round(this.height);return this};var tyGi=function(a,b){var c=tyA(a);return c.defaultView&&c.defaultView.getComputedStyle&&(c=c.defaultView.getComputedStyle(a,null))?c[b]||c.getPropertyValue(b)||"":""},tyHi=function(a,b){return tyGi(a,b)||(a.currentStyle?a.currentStyle[b]:null)||a.style&&a.style[b]},tyIi=function(a){return tyHi(a,"position")},tyKi=function(a,b,c){var d;b instanceof tyz?(d=b.x,b=b.y):(d=b,b=c);a.style.left=tyJi(d,!1);a.style.top=tyJi(b,!1)},tyLi=function(a){a=a?tyA(a):document;return!tyr||ty0b(9)||tyNd(tyB(a))?a.documentElement:
a.body},tyMi=function(a){var b;try{b=a.getBoundingClientRect()}catch(c){return{left:0,top:0,right:0,bottom:0}}tyr&&a.ownerDocument.body&&(a=a.ownerDocument,b.left-=a.documentElement.clientLeft+a.body.clientLeft,b.top-=a.documentElement.clientTop+a.body.clientTop);return b},tyNi=function(a){if(tyr&&!ty0b(8))return a.offsetParent;var b=tyA(a),c=tyHi(a,"position"),d="fixed"==c||"absolute"==c;for(a=a.parentNode;a&&a!=b;a=a.parentNode)if(11==a.nodeType&&a.host&&(a=a.host),c=tyHi(a,"position"),d=d&&"static"==
c&&a!=b.documentElement&&a!=b.body,!d&&(a.scrollWidth>a.clientWidth||a.scrollHeight>a.clientHeight||"fixed"==c||"absolute"==c||"relative"==c))return a;return null},tyPi=function(a){for(var b=new tyFi(0,Infinity,Infinity,0),c=tyB(a),d=c.ya().body,e=c.ya().documentElement,f=tyqd(c.va);a=tyNi(a);)if(!(tyr&&0==a.clientWidth||tyt&&0==a.clientHeight&&a==d)&&a!=d&&a!=e&&"visible"!=tyHi(a,"overflow")){var g=tyOi(a),h=new tyz(a.clientLeft,a.clientTop);g.x+=h.x;g.y+=h.y;b.top=Math.max(b.top,g.y);b.right=Math.min(b.right,
g.x+a.clientWidth);b.bottom=Math.min(b.bottom,g.y+a.clientHeight);b.left=Math.max(b.left,g.x)}d=f.scrollLeft;f=f.scrollTop;b.left=Math.max(b.left,d);b.top=Math.max(b.top,f);c=typd(c.getWindow());b.right=Math.min(b.right,d+c.width);b.bottom=Math.min(b.bottom,f+c.height);return 0<=b.top&&0<=b.left&&b.bottom>b.top&&b.right>b.left?b:null},tyOi=function(a){var b=tyA(a);tyHi(a,"position");var c=new tyz(0,0),d=tyLi(b);if(a==d)return c;a=tyMi(a);b=tyOd(tyB(b));c.x=a.left+b.x;c.y=a.top+b.y;return c},tyQi=
function(a){a=tyMi(a);return new tyz(a.left,a.top)},tyRi=function(a){if(1==a.nodeType)return tyQi(a);var b=tye(a.lc),c=a;a.targetTouches&&a.targetTouches.length?c=a.targetTouches[0]:b&&a.lc().targetTouches&&a.lc().targetTouches.length&&(c=a.lc().targetTouches[0]);return new tyz(c.clientX,c.clientY)},tySi=function(a,b,c){if(b instanceof tyed)c=b.height,b=b.width;else if(void 0==c)throw Error("missing height argument");a.style.width=tyJi(b,!0);a.style.height=tyJi(c,!0)},tyJi=function(a,b){"number"==
typeof a&&(a=(b?Math.round(a):a)+"px");return a},tyUi=function(a){var b=tyTi;if("none"!=tyHi(a,"display"))return b(a);var c=a.style,d=c.display,e=c.visibility,f=c.position;c.visibility="hidden";c.position="absolute";c.display="inline";a=b(a);c.display=d;c.position=f;c.visibility=e;return a},tyTi=function(a){var b=a.offsetWidth,c=a.offsetHeight,d=tyt&&!b&&!c;return tyb(b)&&!d||!a.getBoundingClientRect?new tyed(b,c):(a=tyMi(a),new tyed(a.right-a.left,a.bottom-a.top))},tyVi=function(a,b){var c=a.style;
"opacity"in c?c.opacity=b:"MozOpacity"in c?c.MozOpacity=b:"filter"in c&&(c.filter=""===b?"":"alpha(opacity="+100*b+")")},tyW=function(a,b){a.style.display=b?"":"none"},tyWi=function(a){return"rtl"==tyHi(a,"direction")},tyXi=tys?"MozUserSelect":tyt?"WebkitUserSelect":null,tyYi=function(a,b,c){c=c?null:a.getElementsByTagName("*");if(tyXi){if(b=b?"none":"",a.style[tyXi]=b,c){a=0;for(var d;d=c[a];a++)d.style[tyXi]=b}}else if(tyr||tyPb)if(b=b?"on":"",a.setAttribute("unselectable",b),c)for(a=0;d=c[a];a++)d.setAttribute("unselectable",
b)},tyZi=function(a,b){if(/^\d+px?$/.test(b))return parseInt(b,10);var c=a.style.left,d=a.runtimeStyle.left;a.runtimeStyle.left=a.currentStyle.left;a.style.left=b;var e=a.style.pixelLeft;a.style.left=c;a.runtimeStyle.left=d;return e},ty_i=function(a,b){var c=a.currentStyle?a.currentStyle[b]:null;return c?tyZi(a,c):0},ty0i={thin:2,medium:4,thick:6},ty1i=function(a,b){if("none"==(a.currentStyle?a.currentStyle[b+"Style"]:null))return 0;var c=a.currentStyle?a.currentStyle[b+"Width"]:null;return c in ty0i?
ty0i[c]:tyZi(a,c)},ty2i=function(a){if(tyr&&!ty0b(9)){var b=ty1i(a,"borderLeft"),c=ty1i(a,"borderRight"),d=ty1i(a,"borderTop");a=ty1i(a,"borderBottom");return new tyFi(d,c,a,b)}b=tyGi(a,"borderLeftWidth");c=tyGi(a,"borderRightWidth");d=tyGi(a,"borderTopWidth");a=tyGi(a,"borderBottomWidth");return new tyFi(parseFloat(d),parseFloat(c),parseFloat(a),parseFloat(b))};var ty3i=!1,ty4i=function(a){if(a=a.match(/[\d]+/g))a.length=3};
if(navigator.plugins&&navigator.plugins.length){var ty5i=navigator.plugins["Shockwave Flash"];ty5i&&(ty3i=!0,ty5i.description&&ty4i(ty5i.description));navigator.plugins["Shockwave Flash 2.0"]&&(ty3i=!0)}else if(navigator.mimeTypes&&navigator.mimeTypes.length){var ty6i=navigator.mimeTypes["application/x-shockwave-flash"];(ty3i=ty6i&&ty6i.enabledPlugin)&&ty4i(ty6i.enabledPlugin.description)}else try{var ty7i=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7"),ty3i=!0;ty4i(ty7i.GetVariable("$version"))}catch(ty8i){try{ty7i=
new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6"),ty3i=!0}catch(ty9i){try{ty7i=new ActiveXObject("ShockwaveFlash.ShockwaveFlash"),ty3i=!0,ty4i(ty7i.GetVariable("$version"))}catch(ty$i){}}};var tyaj=function(){this.di=[];this.yp=0},tybj;tyaj.prototype.addListener=function(a,b){var c=String(this.yp++);this.di.push({eventName:a,handler:b,key:c});return c};tyaj.prototype.Zn=function(){this.di=[]};
typa("SJBpost",function(a,b,c){var d;tyb(tybj)||(tybj=new tyaj);d=tybj;var e={eventName:a,eventSrc:b||{},payload:c||{}},f=!1;if(window.SJBfullyLoaded)for(b=d.di,c=b.length,d=0;d<c&&d<b.length;d++){var g=b[d];g&&g.eventName==a&&(g="function"==typeof g.handler?g.handler:window[g.handler])&&(f|=g(e))}else window.SJBdelayedEvents.push({eventName:a,eventSrc:b,payload:c})});window.SJBdelayedEvents=[];window.SJBfullyLoaded=!1;var tycj,tydj=function(){if(null==tycj)throw"No registered ExperimentsManager.";return tycj};var tyej=new tytg([2,100,-1,15,1E4,60,4,"/s/e043d17bb08f0877a3f49ffe2382097a/","http://www.google.com/support/music/bin/answer.py?answer=1229970",,"https://play.google.com/store/search?c=music&q=","https://play.google.com/about/play-terms.html","https://www.google.com/policies/privacy/","https://play.google.com/store/search?c=music&feature=music_play_menu&q=",18E4,,1E3,[[[1,10],[2,15],[3,10,5],[4,10,5],[5,10,5],[6,5,3],[7,10,4],[8,30]]],500,"http://www.google.com/support/music/bin/answer.py?answer=1229970",
"http://www.google.com/support/music/bin/answer.py?answer=1075570&topic=1234609",,"unknown","GoogleMusic","https://play.google.com/log","F05C50C9",1E4,"",1,0,5E3,5E3,105834,"https://play.googleapis.com/play/log",["MjdmNzMxM2UtZjc1ZC00NDVh","a790bb39c49dbf094a22ee9f","LWFjOTktNTYzODZhNWZlODc5","ZTlkZjY4YTEyOTA2ZDI4NDgx"]]);var tyfj=function(){tyw.call(this);this.Ni=tyb(tya.FLAGS)?new tytg(tya.FLAGS):tyej};tyi(tyfj,tyw);tyda(tyfj);tyfj.prototype.Si=function(){return this.Ni};tyfj.prototype.qo=function(a){var b=this.Ni;if(b==a||b&&a&&b instanceof a.constructor&&tyLf(b.Ya,a.Ya))return!1;this.Ni=a;this.dispatchEvent("D");return!0};var tygj=function(a){if(!a||!tywi(a))return a;try{var b=new tyri(a);ty7h(b,"");var c=b.If(!0).Ch(100)}catch(d){return a}c.Ih(!0);1.5<tya.devicePixelRatio?c.Sc(592):c.Sc(296);return(a=c.Uc())&&tywi(a)?tyjf(tywf(a),"https").toString():a};var tyhj=function(){};tyda(tyhj);
var tyij=/[\!\#\%\&\'\(\)\*\+\\\-\:\;\<\=\>\?\@\^\_\`\{\|\}\~\"\[\]\.,]/g,tyjj=/[\_\-\:\/]/g,tykj={$:"s","\u00c0":"a","\u00c1":"a","\u00c2":"a","\u00c3":"a","\u00c4":"a","\u00c5":"a","\u00c6":"ae","\u00c7":"c","\u00c8":"e","\u00c9":"e","\u00ca":"e","\u00cb":"e","\u00cc":"i","\u00cd":"i","\u00ce":"i","\u00cf":"i","\u00d0":"d","\u00d1":"n","\u00d2":"o","\u00d3":"o","\u00d4":"o","\u00d5":"o","\u00d6":"o","\u00d7":" ","\u00d8":"o","\u00d9":"u","\u00da":"u","\u00db":"u","\u00dc":"u","\u00dd":"y","\u00de":"t",
"\u00df":"s","\u00e0":"a","\u00e1":"a","\u00e2":"a","\u00e3":"a","\u00e4":"a","\u00e5":"a","\u00e6":"ae","\u00e7":"c","\u00e8":"e","\u00e9":"e","\u00ea":"e","\u00eb":"e","\u00ec":"i","\u00ed":"i","\u00ee":"i","\u00ef":"i","\u00f0":"d","\u00f1":"n","\u00f2":"o","\u00f3":"o","\u00f4":"o","\u00f5":"o","\u00f6":"o","\u00f7":" ","\u00f8":"o","\u00f9":"u","\u00fa":"u","\u00fb":"u","\u00fc":"u","\u00fd":"y","\u00fe":"t","\u00ff":"y","\u0100":"a","\u0101":"a","\u0102":"a","\u0103":"a","\u0104":"a","\u0105":"a",
"\u0106":"c","\u0107":"c","\u0108":"c","\u0109":"c","\u010a":"c","\u010b":"c","\u010c":"c","\u010d":"c","\u010e":"d","\u010f":"d","\u0110":"d","\u0111":"d","\u0112":"e","\u0113":"e","\u0114":"e","\u0115":"e","\u0116":"e","\u0117":"e","\u0118":"e","\u0119":"e","\u011a":"e","\u011b":"e","\u011c":"g","\u011d":"g","\u011e":"g","\u011f":"g","\u0120":"g","\u0121":"g","\u0122":"g","\u0123":"g","\u0124":"h","\u0125":"h","\u0126":"h","\u0127":"h","\u0128":"i","\u0129":"i","\u012a":"i","\u012b":"i","\u012c":"i",
"\u012d":"i","\u012e":"i","\u012f":"i","\u0130":"i","\u0131":"i","\u0132":"ij","\u0133":"ij","\u0134":"j","\u0135":"j","\u0136":"k","\u0137":"k","\u0138":"k","\u0139":"l","\u013a":"l","\u013b":"l","\u013c":"l","\u013d":"l","\u013e":"l","\u013f":"l","\u0140":"l","\u0141":"l","\u0142":"l","\u0143":"n","\u0144":"n","\u0145":"n","\u0146":"n","\u0147":"n","\u0148":"n","\u0149":"n","\u014a":"n","\u014b":"n","\u014c":"o","\u014d":"o","\u014e":"o","\u014f":"o","\u0150":"o","\u0151":"o","\u0152":"oe","\u0153":"oe",
"\u0154":"r","\u0155":"r","\u0156":"r","\u0157":"r","\u0158":"r","\u0159":"r","\u015a":"s","\u015b":"s","\u015c":"s","\u015d":"s","\u015e":"s","\u015f":"s","\u0160":"s","\u0161":"s","\u0162":"t","\u0163":"t","\u0164":"t","\u0165":"t","\u0166":"t","\u0167":"t","\u0168":"u","\u0169":"u","\u016a":"u","\u016b":"u","\u016c":"u","\u016d":"u","\u016e":"u","\u016f":"u","\u0170":"u","\u0171":"u","\u0172":"u","\u0173":"u","\u0174":"w","\u0175":"w","\u0176":"y","\u0177":"y","\u0178":"y","\u0179":"z","\u017a":"z",
"\u017b":"z","\u017c":"z","\u017d":"z","\u017e":"z","\u017f":"s","\u0180":"b","\u0181":"b","\u0182":"b","\u0183":"b","\u0184":"b","\u0185":"b","\u0186":"c","\u0187":"c","\u0188":"c","\u0189":"d","\u018a":"d","\u018b":"d","\u018c":"d","\u018d":"d","\u018e":"e","\u018f":"e","\u0190":"e","\u0191":"f","\u0192":"f","\u0193":"g","\u0194":"g","\u0195":"h","\u0196":"i","\u0197":"i","\u0198":"k","\u0199":"k","\u019a":"l","\u019b":"l","\u019c":"m","\u019d":"n","\u019e":"n","\u019f":"o","\u01a0":"o","\u01a1":"o",
"\u01a2":"oi","\u01a3":"oi","\u01a4":"p","\u01a5":"p","\u01a6":"r","\u01a7":"s","\u01a8":"s","\u01a9":"s","\u01aa":"s","\u01ab":"t","\u01ac":"t","\u01ad":"t","\u01ae":"t","\u01af":"u","\u01b0":"u","\u01b1":"u","\u01b2":"v","\u01b3":"y","\u01b4":"y","\u01b5":"z","\u01b6":"z","\u01c4":"dz","\u01c5":"dz","\u01c6":"dz","\u01c7":"lj","\u01c8":"lj","\u01c9":"lj","\u01ca":"nj","\u01cb":"nj","\u01cc":"nj","\u01cd":"a","\u01ce":"a","\u01cf":"i","\u01d0":"i","\u01d1":"o","\u01d2":"o","\u01d3":"u","\u01d4":"u",
"\u01d5":"u","\u01d6":"u","\u01d7":"u","\u01d8":"u","\u01d9":"u","\u01da":"u","\u01db":"u","\u01dc":"u","\u01dd":"e","\u01de":"a","\u01df":"a","\u01e0":"a","\u01e1":"a","\u01e2":"ae","\u01e3":"ae","\u01e4":"g","\u01e5":"g","\u01e6":"g","\u01e7":"g","\u01e8":"k","\u01e9":"k","\u01ea":"o","\u01eb":"o","\u01ec":"o","\u01ed":"o","\u01f0":"j","\u01f1":"dz","\u01f2":"dz","\u01f3":"dz","\u01f4":"g","\u01f5":"g","\u01f8":"n","\u01f9":"n","\u01fa":"a","\u01fb":"a","\u01fc":"ae","\u01fd":"ae","\u01fe":"o",
"\u01ff":"o","\u0200":"a","\u0201":"a","\u0202":"a","\u0203":"a","\u0204":"e","\u0205":"e","\u0206":"e","\u0207":"e","\u0208":"i","\u0209":"i","\u020a":"i","\u020b":"i","\u020c":"o","\u020d":"o","\u020e":"o","\u020f":"o","\u0210":"r","\u0211":"r","\u0212":"r","\u0213":"r","\u0214":"u","\u0215":"u","\u0216":"u","\u0217":"u","\u0218":"s","\u0219":"s","\u021a":"t","\u021b":"t","\u021e":"h","\u021f":"h","\u0220":"n","\u0221":"d","\u0222":"ou","\u0223":"ou","\u0224":"z","\u0225":"z","\u0226":"a","\u0227":"a",
"\u0228":"e","\u0229":"e","\u022a":"o","\u022b":"o","\u022c":"o","\u022d":"o","\u022e":"o","\u022f":"o","\u0230":"o","\u0231":"o","\u0232":"y","\u0233":"y","\u0234":"l","\u0235":"n","\u0236":"t","\u0237":"j","\u0238":"db","\u0239":"qp","\u023a":"a","\u023b":"c","\u023c":"c","\u023d":"l","\u023e":"t","\u023f":"s","\u0240":"z","\u0243":"b","\u0244":"u","\u0245":"v","\u0246":"e","\u0247":"e","\u0248":"j","\u0249":"j","\u024a":"q","\u024b":"q","\u024c":"r","\u024d":"r","\u024e":"y","\u024f":"y","\u1edd":"o",
"\u2010":"-"},tylj=/^(the|a|an)\s/,tymj=/\s(and|&|et|y)\s/;tyhj.prototype.normalize=function(a){if(tysa(null==a?"":String(a)))return a;for(var b=a,c="",d=0;d<b.length;++d)c=tykj[b[d]]?c+tykj[b[d]]:c+b[d];b=c.toLowerCase();b=b.replace(tymj," and ");b=b.replace(tylj,"");b=b.replace(tyjj," ");b=b.replace(/[\s\xa0]+/g," ").replace(/^\s+|\s+$/g,"");b=b.replace(tyij,"");return tysa(null==b?"":String(b))?a:b};new tywg(tya.USER_CONTEXT);var tynj=function(a){if("chrome-extension:"==tya.location.protocol){var b=new tyx,c=new XMLHttpRequest;c.open("GET",a,!0);c.responseType="blob";c.onload=function(){var a=new FileReader;a.onload=function(){b.callback(a.result)};a.readAsDataURL(c.response)};c.onerror=function(){b.V()};c.send();return b}return null};var tyoj={Dx:"vib-request"};var typj=new tyH("P");new tyH("Q");var tyqj=function(a,b,c){typ.call(this,"G");this.ls=a;this.message=b;this.ul=c};tyi(tyqj,typ);var tyrj=function(a,b,c){typ.call(this,a.toString());this.message=b;this.ul=c};tyi(tyrj,typ);var tysj=function(a){tyw.call(this);this.Ji=a;this.Da=tyIa();this.I=new tyD(this);tyCb(this,tyma(tyDb,this.I));this.fj()};tyi(tysj,tyw);ty=tysj.prototype;ty.fj=function(){this.I.listen(this.Ji,"F",this.mr);this.I.listen(this.Ji,"G",this.pr)};ty.mr=function(){this.dispatchEvent("H");this.S()};ty.pr=function(a){this.dispatchEvent(new tyrj(a.ls.toString(),a.message,a.ul))};ty.Gg=function(){return this.Da};ty.sendMessage=function(a,b,c){this.Ji.sendMessage(a,b,c)};var tytj=function(){tyw.call(this);this.Sh=[];this.qg=new tyn;this.cq=null};tyi(tytj,tyw);var tyuj=function(a,b,c,d){var e=a.qg.get(b.Gg());tyb(e)||(e=new tyD(a),a.qg.set(b.Gg(),e),tyCb(a,tyma(tyDb,e)));e.listen(b,c.toString(),d)};tytj.prototype.$k=function(){};tytj.prototype.forEach=function(a){tyl(this.Sh,function(b){try{a.call(this,b)}catch(c){this.cq.uu(),this.yl(b)}},this)};tytj.prototype.yl=function(a){tyYa(this.Sh,a);var b=this.qg.get(a.Gg());tyb(b)&&(this.qg.remove(a.Gg()),b.S())};var tyvj=function(a){switch(a){case 3:return tyog;case 4:return tyWf;case 6:return null;case 7:return ty9f;case 8:return null;case 9:return tySf;case 10:return null;case 11:return null;case 12:return tyPf;case 13:return null;case 14:return null;case 15:return typg;case 16:return tyTf;case 17:return tyUf;case 18:return null;case 19:return null;case 20:return null;case 21:return ty7f;case 22:return null;case 23:return null;case 24:return null;case 25:return null;case 26:return tyOf;case 27:return tyzg;
case 28:return ty4f;case 29:return null;case 101:return tyrg;case 102:return tymg;case 103:return tykg;case 104:return tyZf;case 105:return ty1f;case 108:return tyQf;case 109:return tyig;case 110:return ty5f;case 111:return ty6f;case 112:return tyNf;case 201:return tygg;case 202:return tyfg;case 203:return tyeg;case 204:return tydg;case 205:return ty$f;case 316:return tyag;case 317:return tybg;case 206:return null;case 207:return null;case 208:return tyRf;case 209:return tyxg;case 301:return null;
case 302:return ty_f;case 303:return tyVf;case 304:return null;case 305:return tyYf;case 306:return null;case 307:return ty2f;case 308:return null;case 309:return null;case 312:return null;case 314:return ty0f;case 313:return tyyg;case "vib-request":return tysg;default:return null}},tywj;for(tywj in tyIf);var tyyj=function(a){tyw.call(this);this.ap=a;this.xs=++tyxj};tyi(tyyj,tyw);var tyxj=0;tyyj.prototype.toString=function(){return"<EventPort."+this.xs+">"};tyyj.prototype.sendMessage=function(a,b,c){chrome.runtime.sendMessage({type:a,message:tyb(b)?b.Ya:void 0,dataBuffer:c,sentFrom:this.ap})};var tyzj=function(a){tysj.call(this,a)};tyi(tyzj,tysj);var tyAj=function(a){tysj.call(this,a)};tyi(tyAj,tyzj);tyAj.prototype.Uh=function(a){var b=new typg;tyKf(b,a);this.sendMessage(15,b)};var tyBj=function(a,b,c,d,e,f){var g=new tyQf;g.po(b);tyb(c)&&tyM(g,2,c);tyb(d)&&g.setVolume(d);tyb(e)&&g.setTime(e);tyb(f)&&g.Ht(f);a.sendMessage(108,g)},tyCj=function(a,b){var c=new tyAj(b);tyN(a,typj,c);return c};var tyDj=tyq("Firefox"),tyEj=tyOb()||tyq("iPod"),tyFj=tyq("iPad"),tyGj=!(tyq("Chrome")||tyq("CriOS"))&&tyq("Android"),tyHj=tyq("Chrome")||tyq("CriOS"),tyIj=tyq("Safari")&&!tyq("Chrome")&&!tyq("CriOS")&&!tyq("Android");var tyKj=function(a){var b=tyU.dp,c=["0"];a=tyJj[a][0]&7;if(0<a){c.push(".");for(var d=0;d<a;d++)c.push("0")}return b.replace(/0.00/g,c.join(""))},tyJj={AED:[2,"dh","\u062f.\u0625.","DH"],ALL:[0,"Lek","Lek"],AUD:[2,"$","AU$"],BDT:[2,"\u09f3","Tk"],BGN:[2,"lev","lev"],BRL:[2,"R$","R$"],CAD:[2,"$","C$"],CDF:[2,"FrCD","CDF"],CHF:[2,"CHF","CHF"],CLP:[0,"$","CL$"],CNY:[2,"\u00a5","RMB\u00a5"],COP:[0,"$","COL$"],CRC:[0,"\u20a1","CR\u20a1"],CZK:[50,"K\u010d","K\u010d"],DKK:[18,"kr","kr"],DOP:[2,"$","RD$"],
EGP:[2,"\u00a3","LE"],ETB:[2,"Birr","Birr"],EUR:[2,"\u20ac","\u20ac"],GBP:[2,"\u00a3","GB\u00a3"],HKD:[2,"$","HK$"],HRK:[2,"kn","kn"],HUF:[0,"Ft","Ft"],IDR:[0,"Rp","Rp"],ILS:[2,"\u20aa","IL\u20aa"],INR:[2,"\u20b9","Rs"],IRR:[0,"Rial","IRR"],ISK:[0,"kr","kr"],JMD:[2,"$","JA$"],JPY:[0,"\u00a5","JP\u00a5"],KRW:[0,"\u20a9","KR\u20a9"],LKR:[2,"Rs","SLRs"],LTL:[2,"Lt","Lt"],MNT:[0,"\u20ae","MN\u20ae"],MVR:[2,"Rf","MVR"],MXN:[2,"$","Mex$"],MYR:[2,"RM","RM"],NOK:[50,"kr","NOkr"],PAB:[2,"B/.","B/."],PEN:[2,
"S/.","S/."],PHP:[2,"\u20b1","Php"],PKR:[0,"Rs","PKRs."],PLN:[50,"z\u0142","z\u0142"],RON:[2,"RON","RON"],RSD:[0,"din","RSD"],RUB:[50,"\u0440\u0443\u0431.","\u0440\u0443\u0431."],SAR:[2,"Rial","Rial"],SEK:[2,"kr","kr"],SGD:[2,"$","S$"],THB:[2,"\u0e3f","THB"],TRY:[2,"TL","YTL"],TWD:[2,"NT$","NT$"],TZS:[0,"TSh","TSh"],UAH:[2,"\u20b4","UAH"],USD:[2,"$","US$"],UYU:[2,"$","$U"],VND:[0,"\u20ab","VN\u20ab"],YER:[0,"Rial","Rial"],ZAR:[2,"R","ZAR"]};var tyLj=function(a,b,c){this.of=b||tyU.gp;this.lq=c||0;this.vj=1;this.cu=0;this.qj=3;this.uj=this.uf=0;this.sh=this.xe="";this.Fd="-";this.wf="";this.jh=1;this.Pk=!1;this.wi=0;"number"==typeof a?this.cg(a):this.vc(a)};
tyLj.prototype.vc=function(a){a.replace(/ /g,"\u00a0");var b=[0];this.xe=tyMj(this,a,b);for(var c=b[0],d=-1,e=0,f=0,g=0,h=-1,k=a.length,l=!0;b[0]<k&&l;b[0]++)switch(a.charAt(b[0])){case "#":0<f?g++:e++;0<=h&&0>d&&h++;break;case "0":if(0<g)throw Error('Unexpected "0" in pattern "'+a+'"');f++;0<=h&&0>d&&h++;break;case ",":h=0;break;case ".":if(0<=d)throw Error('Multiple decimal separators in pattern "'+a+'"');d=e+f+g;break;case "E":if(this.Pk)throw Error('Multiple exponential symbols in pattern "'+
a+'"');this.Pk=!0;this.uj=0;for(b[0]+1<k&&"+"==a.charAt(b[0]+1)&&b[0]++;b[0]+1<k&&"0"==a.charAt(b[0]+1);)b[0]++,this.uj++;if(1>e+f||1>this.uj)throw Error('Malformed exponential pattern "'+a+'"');l=!1;break;default:b[0]--,l=!1}0==f&&0<e&&0<=d&&(f=d,0==f&&f++,g=e-f,e=f-1,f=1);if(0>d&&0<g||0<=d&&(d<e||d>e+f)||0==h)throw Error('Malformed pattern "'+a+'"');g=e+f+g;this.qj=0<=d?g-d:0;0<=d&&(this.uf=e+f-d,0>this.uf&&(this.uf=0));this.vj=(0<=d?d:g)-e;this.Pk&&0==this.qj&&0==this.vj&&(this.vj=1);Math.max(0,
h);c=b[0]-c;this.sh=tyMj(this,a,b);b[0]<a.length&&";"==a.charAt(b[0])?(b[0]++,this.Fd=tyMj(this,a,b),b[0]+=c,this.wf=tyMj(this,a,b)):(this.Fd=this.xe+this.Fd,this.wf+=this.sh)};tyLj.prototype.cg=function(a){switch(a){case 1:this.vc(tyU.Uk);break;case 2:this.vc(tyU.xp);break;case 3:this.vc(tyU.qp);break;case 4:this.vc(tyKj(this.of));break;case 5:tyNj(this,1);break;case 6:tyNj(this,2);break;default:throw Error("Unsupported pattern type.");}};
var tyNj=function(a,b){a.wi=b;a.vc(tyU.Uk);a.uf=0;a.qj=2;if(0<a.uf)throw Error("Can't combine significant digits and minimum fraction digits");a.cu=2};
tyLj.prototype.parse=function(a,b){var c=b||[0];if(0!=this.wi)throw Error("Parsing of compact numbers is unimplemented");var d=NaN;a=a.replace(/ /g,"\u00a0");var e=a.indexOf(this.xe,c[0])==c[0],f=a.indexOf(this.Fd,c[0])==c[0];e&&f&&(this.xe.length>this.Fd.length?f=!1:this.xe.length<this.Fd.length&&(e=!1));e?c[0]+=this.xe.length:f&&(c[0]+=this.Fd.length);if(a.indexOf(tyU.Vk,c[0])==c[0])c[0]+=tyU.Vk.length,d=Infinity;else{var d=a,g=!1,h=!1,k=!1,l=1,m=tyU.fp,n=tyU.lp,p=tyU.hp;if(0!=this.wi)throw Error("Parsing of compact style numbers is not implemented");
for(var q="";c[0]<d.length;c[0]++){var r=d.charAt(c[0]),t=tyOj(r);if(0<=t&&9>=t)q+=t,k=!0;else if(r==m.charAt(0)){if(g||h)break;q+=".";g=!0}else if(r==n.charAt(0)&&("\u00a0"!=n.charAt(0)||c[0]+1<d.length&&0<=tyOj(d.charAt(c[0]+1)))){if(g||h)break}else if(r==p.charAt(0)){if(h)break;q+="E";h=!0}else if("+"==r||"-"==r)q+=r;else if(r==tyU.Wk.charAt(0)){if(1!=l)break;l=100;if(k){c[0]++;break}}else if(r==tyU.Xk.charAt(0)){if(1!=l)break;l=1E3;if(k){c[0]++;break}}else break}d=parseFloat(q)/l}if(e){if(a.indexOf(this.sh,
c[0])!=c[0])return NaN;c[0]+=this.sh.length}else if(f){if(a.indexOf(this.wf,c[0])!=c[0])return NaN;c[0]+=this.wf.length}return f?-d:d};
var tyOj=function(a){a=a.charCodeAt(0);if(48<=a&&58>a)return a-48;var b=tyU.zp.charCodeAt(0);return b<=a&&a<b+10?a-b:-1},tyMj=function(a,b,c){for(var d="",e=!1,f=b.length;c[0]<f;c[0]++){var g=b.charAt(c[0]);if("'"==g)c[0]+1<f&&"'"==b.charAt(c[0]+1)?(c[0]++,d+="'"):e=!e;else if(e)d+=g;else switch(g){case "#":case "0":case ",":case ".":case ";":return d;case "\u00a4":if(c[0]+1<f&&"\u00a4"==b.charAt(c[0]+1))c[0]++,d+=a.of;else switch(a.lq){case 0:d+=tyJj[a.of][1];break;case 2:var g=a.of,h=tyJj[g],d=
d+(g==h[1]?g:g+" "+h[1]);break;case 1:d+=tyJj[a.of][2]}break;case "%":if(1!=a.jh)throw Error("Too many percent/permill");a.jh=100;d+=tyU.Wk;break;case "\u2030":if(1!=a.jh)throw Error("Too many percent/permill");a.jh=1E3;d+=tyU.Xk;break;default:d+=g}}return d};chrome.i18n.getMessage("3125342991297920614");chrome.i18n.getMessage("7224832103566723854");chrome.i18n.getMessage("2840006222747077107");chrome.i18n.getMessage("1781759902625939771");chrome.i18n.getMessage("5464364716831469679");chrome.i18n.getMessage("1595478688335662057");var tyPj=chrome.i18n.getMessage("3936240281193464170"),tyQj=chrome.i18n.getMessage("445149490695787423");chrome.i18n.getMessage("5593848105713936399");chrome.i18n.getMessage("5432330868773114140");chrome.i18n.getMessage("3624852760485534285");
chrome.i18n.getMessage("537543696442379345");chrome.i18n.getMessage("730022297859142476");chrome.i18n.getMessage("762389150316771008");chrome.i18n.getMessage("5497512316841934820");chrome.i18n.getMessage("7192513315706728552");chrome.i18n.getMessage("953268105555355822");chrome.i18n.getMessage("1604878361972859546");chrome.i18n.getMessage("3313128122800055613");
var tyRj=chrome.i18n.getMessage("1179345224084080955"),tySj=chrome.i18n.getMessage("4754400438927203898"),tyTj=chrome.i18n.getMessage("192481666606780833"),tyUj=chrome.i18n.getMessage("2982463607788408741"),tyVj=chrome.i18n.getMessage("5671499827182863671");var tyX=function(a,b){this.type=a;var c=b||[];this.id=tyc(c)?c:c.Mq?c.Mq():[];this.id.toString=function(){return tyWj(this)};this.id.mu=function(){return tyWj(this,!0)}};new tyX("ap",["shared-with-me"]);new tyX("ap",["queue"]);new tyX("ap",["auto-playlist-trash"]);new tyX("all");new tyX("albums");new tyX("artists");new tyX("genres");new tyX("start");new tyX("uq");new tyX("now");new tyX("settings");new tyX("labs");new tyX("exprec");new tyX("expgenres");new tyX("exptop");new tyX("expnew");new tyX("imfl");
new tyX("ap",["auto-playlist-thumbs-up"]);new tyX("ap",["auto-playlist-recent"]);new tyX("ap",["auto-playlist-promo"]);new tyX("rd");new tyX("manager");new tyX("ap",["sound-search"]);new tyX("ap",["purchased-and-uploaded"]);new tyX("ap",["added-from-all-access"]);new tyX("splash");new tyX("signup",["welcome"]);new tyX("signup",["checkout"]);new tyX("signup",["completed"]);new tyX("signup",["nuq-genres"]);new tyX("signup",["nuq-artists"]);new tyX("signup",["nuq-completed"]);new tyX("mv",[]);
new tyX("almv",[]);new tyX("armv",[]);var tyWj=function(a,b){if(!a)return"";var c=tyXa(a,function(a){return!!a}),c=a.slice(0,c+1);b&&(c=tySa(c,function(a){return tyhj.Ua().normalize(a)}));return tySa(c,function(a){return encodeURIComponent(a).replace(/%20/g,"+")}).join("/")};tyX.prototype.toString=function(a){return(a=a?this.id.mu():this.id.toString())?"/"+this.type+"/"+a:"/"+this.type};tyX.prototype.wa=function(a){return a?"all"==this.type&&"all"==a.type?!0:this.toString()==a.toString():!1};new tyH("R");new tyH("S");new tyH("T");var tyXj=new tyH("U");new tyH("V");var tyYj=function(a,b){this.Xs=[];this.Ye=b||tyxi;"number"==typeof a?this.cg(a):this.vc(a)},tyZj=[/^\'(?:[^\']|\'\')*\'/,/^(?:G+|y+|M+|k+|S+|E+|a+|h+|K+|H+|c+|L+|Q+|d+|m+|s+|v+|w+|z+|Z+)/,/^[^\'GyMkSEahKHcLQdmsvwzZ]+/];tyYj.prototype.vc=function(a){for(;a;)for(var b=0;b<tyZj.length;++b){var c=a.match(tyZj[b]);if(c){c=c[0];a=a.substring(c.length);0==b&&("''"==c?c="'":(c=c.substring(1,c.length-1),c=c.replace(/\'\'/,"'")));this.Xs.push({text:c,type:b});break}}};
tyYj.prototype.cg=function(a){var b;if(4>a)b=this.Ye.Tk[a];else if(8>a)b=this.Ye.Yk[a-4];else if(12>a)b=this.Ye.ep[a-8],b=b.replace("{1}",this.Ye.Tk[a-8]),b=b.replace("{0}",this.Ye.Yk[a-8]);else{this.cg(10);return}this.vc(b)};new tyYj(11);var ty_j=function(a){if(a.classList)return a.classList;a=a.className;return tyd(a)&&a.match(/\S+/g)||[]},ty0j=function(a,b){return a.classList?a.classList.contains(b):tym(ty_j(a),b)},tyY=function(a,b){a.classList?a.classList.add(b):ty0j(a,b)||(a.className+=0<a.className.length?" "+b:b)},ty1j=function(a,b){if(a.classList)tyl(b,function(b){tyY(a,b)});else{var c={};tyl(ty_j(a),function(a){c[a]=!0});tyl(b,function(a){c[a]=!0});a.className="";for(var d in c)a.className+=0<a.className.length?" "+d:d}},
tyZ=function(a,b){a.classList?a.classList.remove(b):ty0j(a,b)&&(a.className=tyRa(ty_j(a),function(a){return a!=b}).join(" "))},ty2j=function(a,b){a.classList?tyl(b,function(b){tyZ(a,b)}):a.className=tyRa(ty_j(a),function(a){return!tym(b,a)}).join(" ")},ty_=function(a,b,c){c?tyY(a,b):tyZ(a,b)};var ty3j;var ty4j=function(a,b){b?a.setAttribute("role",b):a.removeAttribute("role")},ty0=function(a,b,c){tyc(c)&&(c=c.join(" "));var d="aria-"+b;""===c||void 0==c?(ty3j||(ty3j={atomic:!1,autocomplete:"none",dropeffect:"none",haspopup:!1,live:"off",multiline:!1,multiselectable:!1,orientation:"vertical",readonly:!1,relevant:"additions text",required:!1,sort:"none",busy:!1,disabled:!1,hidden:!1,invalid:"false"}),c=ty3j,b in c?a.setAttribute(d,c[b]):a.removeAttribute(d)):a.setAttribute(d,c)},ty5j=function(a,
b){var c=a.getAttribute("aria-"+b);return null==c||void 0==c?"":String(c)};var ty8j=function(a,b,c,d,e){if(!(tyr||tyt&&tyu("525")))return!0;if(tyQb&&e)return ty6j(a);if(e&&!d)return!1;tyga(b)&&(b=ty7j(b));if(!c&&(17==b||18==b||tyQb&&91==b))return!1;if(tyt&&d&&c)switch(a){case 220:case 219:case 221:case 192:case 186:case 189:case 187:case 188:case 190:case 191:case 192:case 222:return!1}if(tyr&&d&&b==a)return!1;switch(a){case 13:return!0;case 27:return!tyt}return ty6j(a)},ty6j=function(a){if(48<=a&&57>=a||96<=a&&106>=a||65<=a&&90>=a||tyt&&0==a)return!0;switch(a){case 32:case 63:case 107:case 109:case 110:case 111:case 186:case 59:case 189:case 187:case 61:case 188:case 190:case 191:case 192:case 222:case 219:case 220:case 221:return!0;
default:return!1}},ty7j=function(a){if(tys)a=ty9j(a);else if(tyQb&&tyt)t:switch(a){case 93:a=91;break t}return a},ty9j=function(a){switch(a){case 61:return 187;case 59:return 186;case 173:return 189;case 224:return 91;case 0:return 224;default:return a}};var ty$j=function(a){var b=a.offsetLeft,c=a.offsetParent;c||"fixed"!=tyIi(a)||(c=tyA(a).documentElement);if(!c)return b;if(tys)var d=ty2i(c),b=b+d.left;else ty0b(8)&&!ty0b(9)&&(d=ty2i(c),b-=d.left);return tyWi(c)?c.clientWidth-(b+a.offsetWidth):b};var tyak=function(a,b,c){tyw.call(this);this.target=a;this.handle=b||a;this.bh=c||new tyV(NaN,NaN,NaN,NaN);this.va=tyA(a);this.I=new tyD(this);tyCb(this,tyma(tyDb,this.I));tyv(this.handle,["touchstart","mousedown"],this.Do,!1,this)};tyi(tyak,tyw);var tybk=tyr||tys&&tyu("1.9.3");ty=tyak.prototype;ty.clientX=0;ty.clientY=0;ty.screenX=0;ty.screenY=0;ty.Fo=0;ty.Go=0;ty.deltaX=0;ty.deltaY=0;ty.$a=!0;ty.Xc=!1;ty.Wm=0;ty.ih=0;ty.Or=!1;ty.Td=!1;ty.Yc=function(a){this.Td=a};ty.getHandler=function(){return this.I};
ty.setEnabled=function(a){this.$a=a};ty.D=function(){tyak.B.D.call(this);tysc(this.handle,["touchstart","mousedown"],this.Do,!1,this);this.I.removeAll();tybk&&this.va.releaseCapture();this.handle=this.target=null};var tyck=function(a){tyb(a.tc)||(a.tc=tyWi(a.target));return a.tc};
tyak.prototype.Do=function(a){var b="mousedown"==a.type;if(!this.$a||this.Xc||b&&!ty$b(a))this.dispatchEvent("earlycancel");else{tydk(a);if(0==this.Wm)if(this.dispatchEvent(new tyek("start",this,a.clientX,a.clientY)))this.Xc=!0,a.preventDefault();else return;else a.preventDefault();var b=this.va,c=b.documentElement,d=!tybk;this.I.listen(b,["touchmove","mousemove"],this.rr,d);this.I.listen(b,["touchend","mouseup"],this.og,d);tybk?(c.setCapture(!1),this.I.listen(c,"losecapture",this.og)):this.I.listen(tyrd(b),
"blur",this.og);tyr&&this.Or&&this.I.listen(b,"dragstart",tyFb);this.nt&&this.I.listen(this.nt,"scroll",this.Ks,d);this.clientX=this.Fo=a.clientX;this.clientY=this.Go=a.clientY;this.screenX=a.screenX;this.screenY=a.screenY;this.deltaX=this.Td?ty$j(this.target):this.target.offsetLeft;this.deltaY=this.target.offsetTop;this.Dj=tyOd(tyB(this.va));this.ih=tyh()}};
tyak.prototype.og=function(a){this.I.removeAll();tybk&&this.va.releaseCapture();if(this.Xc){tydk(a);this.Xc=!1;var b=tyfk(this,this.deltaX),c=tygk(this,this.deltaY);this.dispatchEvent(new tyek("end",this,a.clientX,a.clientY,0,b,c))}else this.dispatchEvent("earlycancel")};var tydk=function(a){var b=a.type;"touchstart"==b||"touchmove"==b?a.init(a.lc().targetTouches[0],a.currentTarget):"touchend"!=b&&"touchcancel"!=b||a.init(a.lc().changedTouches[0],a.currentTarget)};
tyak.prototype.rr=function(a){if(this.$a){tydk(a);var b=(this.Td&&tyck(this)?-1:1)*(a.clientX-this.clientX),c=a.clientY-this.clientY;this.clientX=a.clientX;this.clientY=a.clientY;this.screenX=a.screenX;this.screenY=a.screenY;if(!this.Xc){var d=this.Fo-this.clientX,e=this.Go-this.clientY;if(d*d+e*e>this.Wm)if(this.dispatchEvent(new tyek("start",this,a.clientX,a.clientY)))this.Xc=!0;else{this.isDisposed()||this.og(a);return}}c=tyhk(this,b,c);b=c.x;c=c.y;this.Xc&&this.dispatchEvent(new tyek("beforedrag",
this,a.clientX,a.clientY,0,b,c))&&(tyik(this,a,b,c),a.preventDefault())}};var tyhk=function(a,b,c){var d=tyOd(tyB(a.va));b+=d.x-a.Dj.x;c+=d.y-a.Dj.y;a.Dj=d;a.deltaX+=b;a.deltaY+=c;b=tyfk(a,a.deltaX);a=tygk(a,a.deltaY);return new tyz(b,a)};tyak.prototype.Ks=function(a){var b=tyhk(this,0,0);a.clientX=this.clientX;a.clientY=this.clientY;tyik(this,a,b.x,b.y)};
var tyik=function(a,b,c,d){a.Ai(c,d);a.dispatchEvent(new tyek("drag",a,b.clientX,b.clientY,0,c,d))},tyfk=function(a,b){var c=a.bh,d=isNaN(c.left)?null:c.left,c=isNaN(c.width)?0:c.width;return Math.min(null!=d?d+c:Infinity,Math.max(null!=d?d:-Infinity,b))},tygk=function(a,b){var c=a.bh,d=isNaN(c.top)?null:c.top,c=isNaN(c.height)?0:c.height;return Math.min(null!=d?d+c:Infinity,Math.max(null!=d?d:-Infinity,b))};
tyak.prototype.Ai=function(a,b){this.Td&&tyck(this)?this.target.style.right=a+"px":this.target.style.left=a+"px";this.target.style.top=b+"px"};tyak.prototype.qf=function(){return this.Xc};var tyek=function(a,b,c,d,e,f,g){typ.call(this,a);this.clientX=c;this.clientY=d;this.left=tyb(f)?f:b.deltaX;this.top=tyb(g)?g:b.deltaY;this.Fi=b};tyi(tyek,typ);var tyjk=function(a){tyw.call(this);this.C=a;a=tyr?"focusout":"blur";this.as=tyv(this.C,tyr?"focusin":"focus",this,!tyr);this.bs=tyv(this.C,a,this,!tyr)};tyi(tyjk,tyw);tyjk.prototype.handleEvent=function(a){var b=new ty8b(a.lc());b.type="focusin"==a.type||"focus"==a.type?"focusin":"focusout";this.dispatchEvent(b)};tyjk.prototype.D=function(){tyjk.B.D.call(this);tytc(this.as);tytc(this.bs);delete this.C};var tykk=function(){};tyda(tykk);tykk.prototype.yj=0;var ty1=function(a){tyw.call(this);this.Hb=a||tyB();this.tc=tylk;this.Da=null;this.N=!1;this.C=null;this.dd=void 0;this.Tb=this.La=this.O=this.wj=null;this.Yo=!1};tyi(ty1,tyw);ty1.prototype.Nr=tykk.Ua();
var tylk=null,tymk=function(a,b){switch(a){case 1:return b?"disable":"enable";case 2:return b?"highlight":"unhighlight";case 4:return b?"activate":"deactivate";case 8:return b?"select":"unselect";case 16:return b?"check":"uncheck";case 32:return b?"focus":"blur";case 64:return b?"open":"close"}throw Error("Invalid component state");};ty=ty1.prototype;ty.getId=function(){return this.Da||(this.Da=":"+(this.Nr.yj++).toString(36))};
ty.Md=function(a){if(this.O&&this.O.Tb){var b=this.O.Tb,c=this.Da;c in b&&delete b[c];tyhb(this.O.Tb,a,this)}this.Da=a};ty.A=function(){return this.C};ty.L=function(a){return this.C?this.Hb.L(a,this.C):null};ty.Lb=function(a){return this.L(a)};ty.getHandler=function(){this.dd||(this.dd=new tyD(this));return this.dd};
ty.Kh=function(a){if(this==a)throw Error("Unable to set parent component");if(a&&this.O&&this.Da&&tynk(this.O,this.Da)&&this.O!=a)throw Error("Unable to set parent component");this.O=a;ty1.B.kk.call(this,a)};ty.getParent=function(){return this.O};ty.kk=function(a){if(this.O&&this.O!=a)throw Error("Method not supported");ty1.B.kk.call(this,a)};ty.H=function(){return this.Hb};ty.F=function(){this.C=this.Hb.createElement("div")};ty.render=function(a){tyok(this,a)};
var tyok=function(a,b,c){if(a.N)throw Error("Component already rendered");a.C||a.F();b?b.insertBefore(a.C,c||null):a.Hb.ya().body.appendChild(a.C);a.O&&!a.O.N||a.J()};ty=ty1.prototype;ty.fa=function(a){if(this.N)throw Error("Component already rendered");if(a&&this.Sb(a)){this.Yo=!0;var b=tyA(a);this.Hb&&this.Hb.ya()==b||(this.Hb=tyB(a));this.kb(a);this.J()}else throw Error("Invalid element to decorate");};ty.Sb=function(){return!0};ty.kb=function(a){this.C=a};
ty.J=function(){this.N=!0;this.Cc(function(a){!a.N&&a.A()&&a.J()})};ty.xa=function(){this.Cc(function(a){a.N&&a.xa()});this.dd&&this.dd.removeAll();this.N=!1};ty.D=function(){this.N&&this.xa();this.dd&&(this.dd.S(),delete this.dd);this.Cc(function(a){a.S()});!this.Yo&&this.C&&tyyd(this.C);this.O=this.wj=this.C=this.Tb=this.La=null;ty1.B.D.call(this)};ty.Pq=function(){return this.wj};ty.Et=function(a){this.wj=a};ty.Eb=function(a,b){this.gi(a,this.ad(),b)};
ty.gi=function(a,b,c){if(a.N&&(c||!this.N))throw Error("Component already rendered");if(0>b||b>this.ad())throw Error("Child component index out of bounds");this.Tb&&this.La||(this.Tb={},this.La=[]);if(a.getParent()==this){var d=a.getId();this.Tb[d]=a;tyYa(this.La,a)}else tyhb(this.Tb,a.getId(),a);a.Kh(this);ty1a(this.La,b,0,a);a.N&&this.N&&a.getParent()==this?(c=this.ba(),b=c.childNodes[b]||null,b!=a.A()&&c.insertBefore(a.A(),b)):c?(this.C||this.F(),b=this.Zb(b+1),tyok(a,this.ba(),b?b.C:null)):this.N&&
!a.N&&a.C&&a.C.parentNode&&1==a.C.parentNode.nodeType&&a.J()};ty.ba=function(){return this.C};ty.Ab=function(){null==this.tc&&(this.tc=tyWi(this.N?this.C:this.Hb.ya().body));return this.tc};ty.Be=function(a){if(this.N)throw Error("Component already rendered");this.tc=a};ty.ad=function(){return this.La?this.La.length:0};var tynk=function(a,b){var c;a.Tb&&b?(c=a.Tb,c=(b in c?c[b]:void 0)||null):c=null;return c};ty1.prototype.Zb=function(a){return this.La?this.La[a]||null:null};
ty1.prototype.Cc=function(a,b){this.La&&tyl(this.La,a,b)};var typk=function(a,b){return a.La&&b?tyPa(a.La,b):-1};ty1.prototype.removeChild=function(a,b){if(a){var c=tyd(a)?a:a.getId();a=tynk(this,c);if(c&&a){var d=this.Tb;c in d&&delete d[c];tyYa(this.La,a);b&&(a.xa(),a.C&&tyyd(a.C));a.Kh(null)}}if(!a)throw Error("Child is not in parent component");return a};var tyqk=function(a,b){ty1.call(this,b);this.ru=!!a;this.se=null};tyi(tyqk,ty1);ty=tyqk.prototype;ty.Oi=null;ty.Ha=!1;ty.rb=null;ty.Sa=null;ty.fc=null;ty.ni=!1;ty.M=function(){return"t-modalpopup"};ty.xg=function(){return this.rb};ty.F=function(){tyqk.B.F.call(this);var a=this.A(),b=tyua(this.M()).split(" ");ty1j(a,b);tyId(a,!0);tyW(a,!1);tyrk(this);tysk(this)};
var tyrk=function(a){if(a.ru&&!a.Sa){var b;b=a.H().F("iframe",{frameborder:0,style:"border:0;vertical-align:bottom;",src:'javascript:""'});a.Sa=b;a.Sa.className=a.M()+"-Nc";tyW(a.Sa,!1);tyVi(a.Sa,0)}a.rb||(a.rb=a.H().F("div",a.M()+"-Nc"),tyW(a.rb,!1))},tysk=function(a){a.fc||(a.fc=a.H().createElement("span"),tyW(a.fc,!1),tyId(a.fc,!0),a.fc.style.position="absolute")};ty=tyqk.prototype;ty.io=function(){this.ni=!1};ty.Sb=function(a){return!!a&&"DIV"==a.tagName};
ty.kb=function(a){tyqk.B.kb.call(this,a);a=tyua(this.M()).split(" ");ty1j(this.A(),a);tyrk(this);tysk(this);tyId(this.A(),!0);tyW(this.A(),!1)};ty.J=function(){if(this.Sa){var a=this.A();a.parentNode&&a.parentNode.insertBefore(this.Sa,a)}a=this.A();a.parentNode&&a.parentNode.insertBefore(this.rb,a);tyqk.B.J.call(this);a=this.A();a.parentNode&&a.parentNode.insertBefore(this.fc,a.nextSibling);this.Oi=new tyjk(this.H().ya());this.getHandler().listen(this.Oi,"focusin",this.onFocus);tytk(this,!1)};
ty.xa=function(){this.ca()&&this.da(!1);tyDb(this.Oi);tyqk.B.xa.call(this);tyyd(this.Sa);tyyd(this.rb);tyyd(this.fc)};ty.da=function(a){a!=this.Ha&&(this.we&&this.we.stop(),this.Se&&this.Se.stop(),this.ve&&this.ve.stop(),this.Re&&this.Re.stop(),this.N&&tytk(this,a),a?this.bu():this.Kr())};
var tytk=function(a,b){if(b){a.qe||(a.qe=[]);for(var c=a.H(),c=c.getChildren(c.ya().body),d=0;d<c.length;d++){var e=c[d];e==a.C||ty5j(e,"hidden")||(ty0(e,"hidden",!0),a.qe.push(e))}}else if(a.qe){for(d=0;d<a.qe.length;d++)a.qe[d].removeAttribute("aria-hidden");a.qe=null}};
tyqk.prototype.bu=function(){if(this.dispatchEvent("beforeshow")){try{this.se=this.H().ya().activeElement}catch(a){}this.Pj();this.ld();this.getHandler().listen(this.H().getWindow(),"resize",this.Pj);tyuk(this,!0);this.focus();this.Ha=!0;this.we&&this.Se?(tyrc(this.we,"end",this.mh,!1,this),this.Se.play(),this.we.play()):this.mh()}};
tyqk.prototype.Kr=function(){if(this.dispatchEvent("beforehide")){this.getHandler().Z(this.H().getWindow(),"resize",this.Pj);this.Ha=!1;this.ve&&this.Re?(tyrc(this.ve,"end",this.lh,!1,this),this.Re.play(),this.ve.play()):this.lh();t:{try{var a=this.H(),b=a.ya().body,c=a.ya().activeElement||b;if(!this.se||this.se==b){this.se=null;break t}(c==b||a.contains(this.A(),c))&&this.se.focus()}catch(d){}this.se=null}}};var tyuk=function(a,b){a.Sa&&tyW(a.Sa,b);a.rb&&tyW(a.rb,b);tyW(a.A(),b);tyW(a.fc,b)};
ty=tyqk.prototype;ty.mh=function(){this.dispatchEvent("show")};ty.lh=function(){tyuk(this,!1);this.dispatchEvent("hide")};ty.ca=function(){return this.Ha};ty.focus=function(){this.El()};
ty.Pj=function(){this.Sa&&tyW(this.Sa,!1);this.rb&&tyW(this.rb,!1);var a=this.H().ya(),b=typd(tyrd(a)||window),c=Math.max(b.width,Math.max(a.body.scrollWidth,a.documentElement.scrollWidth)),a=Math.max(b.height,Math.max(a.body.scrollHeight,a.documentElement.scrollHeight));this.Sa&&(tyW(this.Sa,!0),tySi(this.Sa,c,a));this.rb&&(tyW(this.rb,!0),tySi(this.rb,c,a))};
ty.ld=function(){var a=this.H().ya(),b=tyrd(a)||window;if("fixed"==tyIi(this.A()))var c=a=0;else c=tyOd(this.H()),a=c.x,c=c.y;var d=tyUi(this.A()),b=typd(b),a=Math.max(a+b.width/2-d.width/2,0),c=Math.max(c+b.height/2-d.height/2,0);tyKi(this.A(),a,c);tyKi(this.fc,a,c)};ty.onFocus=function(a){this.ni?this.io():a.target==this.fc&&tyge(this.El,0,this)};ty.El=function(){try{tyr&&this.H().ya().body.focus(),this.A().focus()}catch(a){}};
ty.D=function(){tyDb(this.we);this.we=null;tyDb(this.ve);this.ve=null;tyDb(this.Se);this.Se=null;tyDb(this.Re);this.Re=null;tyqk.B.D.call(this)};var ty2=function(a,b,c){tyqk.call(this,b,c);this.Za=a||"modal-Fc";this.Rb=(new tyvk).qb(tywk,!0).qb(tyxk,!1,!0)};tyi(ty2,tyqk);ty=ty2.prototype;ty.zq=!0;ty.bj=!0;ty.zn=!0;ty.tq=!0;ty.eg=.5;ty.He="";ty.jb=null;ty.Wc=null;ty.pq=!1;ty.ta=null;ty.gb=null;ty.Qh=null;ty.ob=null;ty.Vb=null;ty.ua=null;ty.Jj="dialog";ty.M=function(){return this.Za};ty.setTitle=function(a){this.He=a;this.gb&&tyC(this.gb,a)};ty.Qc=function(a){this.jb=a=(new tyad).an(a,null);this.Vb&&(this.Vb.innerHTML=tybd(a))};
ty.Dc=function(){return null!=this.jb?tybd(this.jb):""};ty.cd=function(){return this.Jj};ty.ba=function(){this.A()||this.render();return this.Vb};ty.xg=function(){this.A()||this.render();return ty2.B.xg.call(this)};var tyyk=function(a,b){a.eg=b;if(a.A()){var c=a.xg();c&&tyVi(c,a.eg)}},tyzk=function(a,b){var c=tyua(a.Za+"-zb-draggable").split(" ");a.A()&&(b?ty1j(a.ta,c):ty2j(a.ta,c));b&&!a.Wc?(a.Wc=new tyak(a.A(),a.ta),ty1j(a.ta,c),tyv(a.Wc,"start",a.xt,!1,a)):!b&&a.Wc&&(a.Wc.S(),a.Wc=null)};ty=ty2.prototype;
ty.F=function(){ty2.B.F.call(this);var a=this.A(),b=this.H();this.ta=b.F("div",this.Za+"-zb",this.gb=b.F("span",{className:this.Za+"-zb-f",id:this.getId()},this.He),this.ob=b.F("span",this.Za+"-zb-Db"));tywd(a,this.ta,this.Vb=b.F("div",this.Za+"-gb"),this.ua=b.F("div",this.Za+"-buttons"));ty4j(this.gb,"heading");ty4j(this.ob,"button");tyId(this.ob,!0);ty0(this.ob,"label",tyAk);this.Qh=this.gb.id;ty4j(a,this.cd());ty0(a,"labelledby",this.Qh||"");this.jb&&(this.Vb.innerHTML=tybd(this.jb));tyW(this.ob,
this.bj);this.Rb&&(a=this.Rb,a.C=this.ua,a.render());tyW(this.ua,!!this.Rb);tyyk(this,this.eg)};
ty.kb=function(a){ty2.B.kb.call(this,a);a=this.A();var b=this.Za+"-gb";this.Vb=tykd(document,null,b,a)[0];this.Vb||(this.Vb=this.H().F("div",b),this.jb&&(this.Vb.innerHTML=tybd(this.jb)),a.appendChild(this.Vb));var b=this.Za+"-zb",c=this.Za+"-zb-f",d=this.Za+"-zb-Db";(this.ta=tykd(document,null,b,a)[0])?(this.gb=tykd(document,null,c,this.ta)[0],this.ob=tykd(document,null,d,this.ta)[0]):(this.ta=this.H().F("div",b),a.insertBefore(this.ta,this.Vb));this.gb?(this.He=tyKd(this.gb),this.gb.id||(this.gb.id=
this.getId())):(this.gb=tytd("span",{className:c,id:this.getId()}),this.ta.appendChild(this.gb));this.Qh=this.gb.id;ty0(a,"labelledby",this.Qh||"");this.ob||(this.ob=this.H().F("span",d),this.ta.appendChild(this.ob));tyW(this.ob,this.bj);b=this.Za+"-buttons";(this.ua=tykd(document,null,b,a)[0])?(this.Rb=new tyvk(this.H()),this.Rb.fa(this.ua)):(this.ua=this.H().F("div",b),a.appendChild(this.ua),this.Rb&&(a=this.Rb,a.C=this.ua,a.render()),tyW(this.ua,!!this.Rb));tyyk(this,this.eg)};
ty.J=function(){ty2.B.J.call(this);this.getHandler().listen(this.A(),"keydown",this.Kn).listen(this.A(),"keypress",this.Kn);this.getHandler().listen(this.ua,"click",this.Cs);tyzk(this,this.tq);this.getHandler().listen(this.ob,"click",this.Ps);var a=this.A();ty4j(a,this.cd());""!==this.gb.id&&ty0(a,"labelledby",this.gb.id);if(!this.zn){this.zn=!1;if(this.N){var a=this.H(),b=this.xg();a.removeNode(this.Sa);a.removeNode(b)}this.ca()&&tytk(this,!1)}};
ty.xa=function(){this.ca()&&this.da(!1);tyzk(this,!1);ty2.B.xa.call(this)};ty.da=function(a){a!=this.ca()&&(this.N||this.render(),ty2.B.da.call(this,a))};ty.mh=function(){ty2.B.mh.call(this);this.dispatchEvent("aftershow")};ty.lh=function(){ty2.B.lh.call(this);this.dispatchEvent("afterhide");this.pq&&this.S()};
ty.xt=function(){var a=this.H().ya(),b=typd(tyrd(a)||window),c=Math.max(a.body.scrollWidth,b.width),a=Math.max(a.body.scrollHeight,b.height),d=tyUi(this.A());"fixed"==tyIi(this.A())?(b=new tyV(0,0,Math.max(0,b.width-d.width),Math.max(0,b.height-d.height)),this.Wc.bh=b||new tyV(NaN,NaN,NaN,NaN)):this.Wc.bh=new tyV(0,0,c-d.width,a-d.height)||new tyV(NaN,NaN,NaN,NaN)};ty.Ps=function(){tyBk(this)};
var tyBk=function(a){if(a.bj){var b=a.Rb,c=b&&b.ri;c?(b=b.get(c),a.dispatchEvent(new tyCk(c,b))&&a.da(!1)):a.da(!1)}};ty2.prototype.D=function(){this.ua=this.ob=null;ty2.B.D.call(this)};ty2.prototype.Cs=function(a){t:{for(a=a.target;null!=a&&a!=this.ua;){if("BUTTON"==a.tagName)break t;a=a.parentNode}a=null}if(a&&!a.disabled){a=a.name;var b=this.Rb.get(a);this.dispatchEvent(new tyCk(a,b))&&this.da(!1)}};
ty2.prototype.Kn=function(a){var b=!1,c=!1,d=this.Rb,e=a.target;if("keydown"==a.type)if(this.zq&&27==a.keyCode){var f=d&&d.ri,e="SELECT"==e.tagName&&!e.disabled;f&&!e?(c=!0,b=d.get(f),b=this.dispatchEvent(new tyCk(f,b))):e||(b=!0)}else{if(9==a.keyCode&&a.shiftKey&&e==this.A()){this.ni=!0;try{this.fc.focus()}catch(g){}tyge(this.io,0,this)}}else if(13==a.keyCode){if("BUTTON"==e.tagName&&!e.disabled)f=e.name;else if(e==this.ob)tyBk(this);else if(d){var h=d.Bi,k;if(k=h)t:{k=d.C.getElementsByTagName("BUTTON");
for(var l=0,m;m=k[l];l++)if(m.name==h||m.id==h){k=m;break t}k=null}e=("TEXTAREA"==e.tagName||"SELECT"==e.tagName||"A"==e.tagName)&&!e.disabled;!k||k.disabled||e||(f=h)}f&&d&&(c=!0,b=this.dispatchEvent(new tyCk(f,String(d.get(f)))))}else e==this.ob&&32==a.keyCode&&tyBk(this);if(b||c)a.stopPropagation(),a.preventDefault();b&&this.da(!1)};var tyCk=function(a,b){this.type="dialogselect";this.key=a;this.caption=b};tyi(tyCk,typ);var tyvk=function(a){this.Hb=a||tyB();tyn.call(this)};tyi(tyvk,tyn);ty=tyvk.prototype;
ty.Za="t-buttonset";ty.Bi=null;ty.C=null;ty.ri=null;ty.set=function(a,b,c,d){tyn.prototype.set.call(this,a,b);c&&(this.Bi=a);d&&(this.ri=a);return this};ty.qb=function(a,b,c){return this.set(a.key,a.caption,b,c)};ty.render=function(){if(this.C){this.C.innerHTML=tybd(tycd);var a=tyB(this.C);this.forEach(function(b,c){var d=a.F("button",{name:c},b);c==this.Bi&&(d.className=this.Za+"-default");this.C.appendChild(d)},this)}};
ty.fa=function(a){if(a&&1==a.nodeType){this.C=a;a=this.C.getElementsByTagName("button");for(var b=0,c,d,e;c=a[b];b++)if(d=c.name||c.id,e=tyKd(c)||c.value,d){var f=0==b;this.set(d,e,f,"cancel"==c.name);f&&tyY(c,this.Za+"-default")}}};ty.A=function(){return this.C};ty.H=function(){return this.Hb};
var tyDk=chrome.i18n.getMessage("6814976743136440069"),tyEk=chrome.i18n.getMessage("4263959392548297550"),tyFk=chrome.i18n.getMessage("2881621988818346391"),tyGk=chrome.i18n.getMessage("66116513409922755"),tyHk=chrome.i18n.getMessage("4396890764725725469"),tyIk=chrome.i18n.getMessage("9084816336314899019"),tyAk=chrome.i18n.getMessage("2139683490477275175"),tywk={key:"ok",caption:tyDk},tyxk={key:"cancel",caption:tyEk},tyJk={key:"yes",caption:tyFk},tyKk={key:"no",caption:tyGk},tyLk={key:"save",caption:tyHk},
tyMk={key:"continue",caption:tyIk};"undefined"!=typeof document&&((new tyvk).qb(tywk,!0,!0),(new tyvk).qb(tywk,!0).qb(tyxk,!1,!0),(new tyvk).qb(tyJk,!0).qb(tyKk,!1,!0),(new tyvk).qb(tyJk).qb(tyKk,!0).qb(tyxk,!1,!0),(new tyvk).qb(tyMk).qb(tyLk).qb(tyxk,!0,!0));tyIa();ty3e("u");ty3e("hl");(new tyug).At();chrome.i18n.getMessage("6652787256443519035");chrome.i18n.getMessage("2038618429165152799");chrome.i18n.getMessage("5594762259680838005");chrome.i18n.getMessage("1686917835491599951");chrome.i18n.getMessage("8385464685117997940");chrome.i18n.getMessage("5003850562831597565");chrome.i18n.getMessage("8961985815150856927");chrome.i18n.getMessage("1026450251988549367");chrome.i18n.getMessage("5971001229987621398");chrome.i18n.getMessage("6718773735728815040");chrome.i18n.getMessage("9024489874326845912");chrome.i18n.getMessage("6504449653938065974");
chrome.i18n.getMessage("7116872031464114568");chrome.i18n.getMessage("5518817744725858296");chrome.i18n.getMessage("7009828133009731416");chrome.i18n.getMessage("8325100368677049569");chrome.i18n.getMessage("5049432650728491454");chrome.i18n.getMessage("848933194605193751");var tyNk=function(a){return(a=a.exec(tyLb))?a[1]:""},tyOk=function(){if(tyDj)return tyNk(/Firefox\/([0-9.]+)/);if(tyr||tyPb)return tyYb;if(tyHj)return tyNk(/Chrome\/([0-9.]+)/);if(tyIj&&!(tyOb()||tyq("iPad")||tyq("iPod")))return tyNk(/Version\/([0-9.]+)/);if(tyEj||tyFj){var a;if(a=/Version\/(\S+).*Mobile\/(\S+)/.exec(tyLb))return a[1]+"."+a[2]}else if(tyGj)return(a=tyNk(/Android\s+([0-9.]+)/))?a:tyNk(/Version\/([0-9.]+)/);return""}();new tyH("W");new tyH("X");new tyH("Y");new tyH("Z");var tySk=function(a,b,c,d,e,f,g,h,k){var l=tyPk(c),m;m=tyOi(a);var n=tyUi(a);m=new tyV(m.x,m.y,n.width,n.height);(n=tyPi(a))&&m.en(new tyV(n.left,n.top,n.right-n.left,n.bottom-n.top));var n=tyB(a),p=tyB(c);if(n.ya()!=p.ya()){var q=n.ya().body,p=p.getWindow(),r=new tyz(0,0),t=tyrd(tyA(q)),v=q;do{var w=t==p?tyOi(v):tyQi(v);r.x+=w.x;r.y+=w.y}while(t&&t!=p&&t!=t.parent&&(v=t.frameElement)&&(t=t.parent));q=tydd(r,tyOi(q));!tyr||ty0b(9)||tyNd(n)||(q=tydd(q,tyOd(n)));m.left+=q.x;m.top+=q.y}a=tyQk(a,b);b=
new tyz(a&2?m.left+m.width:m.left,a&1?m.top+m.height:m.top);b=tydd(b,l);e&&(b.x+=(a&2?-1:1)*e.x,b.y+=(a&1?-1:1)*e.y);var u;if(g)if(k)u=k;else if(u=tyPi(c))u.top-=l.y,u.right-=l.x,u.bottom-=l.y,u.left-=l.x;return tyRk(b,c,d,f,u,g,h)},tyPk=function(a){var b;if(a=a.offsetParent){var c="HTML"==a.tagName||"BODY"==a.tagName;c&&"static"==tyIi(a)||(b=tyOi(a),c||(c=(c=tyWi(a))&&tys?-a.scrollLeft:!c||tyr&&tyu("8")||"visible"==tyHi(a,"overflowX")?a.scrollLeft:a.scrollWidth-a.clientWidth-a.scrollLeft,b=tydd(b,
new tyz(c,a.scrollTop))))}return b||new tyz},tyRk=function(a,b,c,d,e,f,g){a=a.clone();var h=tyQk(b,c);c=tyUi(b);g=g?g.clone():c.clone();a=a.clone();g=g.clone();var k=0;if(d||0!=h)h&2?a.x-=g.width+(d?d.right:0):d&&(a.x+=d.left),h&1?a.y-=g.height+(d?d.bottom:0):d&&(a.y+=d.top);if(f){if(e){d=a;h=g;k=0;65==(f&65)&&(d.x<e.left||d.x>=e.right)&&(f&=-2);132==(f&132)&&(d.y<e.top||d.y>=e.bottom)&&(f&=-5);d.x<e.left&&f&1&&(d.x=e.left,k|=1);if(f&16){var l=d.x;d.x<e.left&&(d.x=e.left,k|=4);d.x+h.width>e.right&&
(h.width=Math.min(e.right-d.x,l+h.width-e.left),h.width=Math.max(h.width,0),k|=4)}d.x+h.width>e.right&&f&1&&(d.x=Math.max(e.right-h.width,e.left),k|=1);f&2&&(k=k|(d.x<e.left?16:0)|(d.x+h.width>e.right?32:0));d.y<e.top&&f&4&&(d.y=e.top,k|=2);f&32&&(l=d.y,d.y<e.top&&(d.y=e.top,k|=8),d.y+h.height>e.bottom&&(h.height=Math.min(e.bottom-d.y,l+h.height-e.top),h.height=Math.max(h.height,0),k|=8));d.y+h.height>e.bottom&&f&4&&(d.y=Math.max(e.bottom-h.height,e.top),k|=2);f&8&&(k=k|(d.y<e.top?64:0)|(d.y+h.height>
e.bottom?128:0));e=k}else e=256;k=e}f=new tyV(0,0,0,0);f.left=a.x;f.top=a.y;f.width=g.width;f.height=g.height;e=k;if(e&496)return e;tyKi(b,new tyz(f.left,f.top));g=f.ke();c==g||c&&g&&c.width==g.width&&c.height==g.height||(c=g,g=tyA(b),a=tyNd(tyB(g)),!tyr||tyu("10")||a&&tyu("8")?(b=b.style,tys?b.MozBoxSizing="border-box":tyt?b.WebkitBoxSizing="border-box":b.boxSizing="border-box",b.width=Math.max(c.width,0)+"px",b.height=Math.max(c.height,0)+"px"):(g=b.style,a?(tyr?(a=ty_i(b,"paddingLeft"),f=ty_i(b,
"paddingRight"),d=ty_i(b,"paddingTop"),h=ty_i(b,"paddingBottom"),a=new tyFi(d,f,h,a)):(a=tyGi(b,"paddingLeft"),f=tyGi(b,"paddingRight"),d=tyGi(b,"paddingTop"),h=tyGi(b,"paddingBottom"),a=new tyFi(parseFloat(d),parseFloat(f),parseFloat(h),parseFloat(a))),b=ty2i(b),g.pixelWidth=c.width-b.left-a.left-a.right-b.right,g.pixelHeight=c.height-b.top-a.top-a.bottom-b.bottom):(g.pixelWidth=c.width,g.pixelHeight=c.height)));return e},tyQk=function(a,b){return(b&4&&tyWi(a)?b^2:b)&-5};/*

 Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
 This code may only be used under the BSD style license found at
 http://polymer.github.io/LICENSE.txt. The complete set of authors may be
 found at http://polymer.github.io/AUTHORS.txt. The complete set of
 contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt. Code
 distributed by Google as part of the polymer project is also subject to an
 additional IP rights grant found at http://polymer.github.io/PATENTS.txt.
*/
var tyTk=function(a,b){tyw.call(this);a&&this.dg(a,b)};tyi(tyTk,tyw);ty=tyTk.prototype;ty.C=null;ty.Wg=null;ty.ij=null;ty.Xg=null;ty.Bb=-1;ty.hd=-1;ty.ki=!1;
var tyUk={3:13,12:144,63232:38,63233:40,63234:37,63235:39,63236:112,63237:113,63238:114,63239:115,63240:116,63241:117,63242:118,63243:119,63244:120,63245:121,63246:122,63247:123,63248:44,63272:46,63273:36,63275:35,63276:33,63277:34,63289:144,63302:45},tyVk={Up:38,Down:40,Left:37,Right:39,Enter:13,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123,"U+007F":46,Home:36,End:35,PageUp:33,PageDown:34,Insert:45},tyWk=tyr||tyt&&tyu("525"),tyXk=tyQb&&tys;ty=tyTk.prototype;
ty.Fc=function(a){tyt&&(17==this.Bb&&!a.ctrlKey||18==this.Bb&&!a.altKey||tyQb&&91==this.Bb&&!a.metaKey)&&(this.hd=this.Bb=-1);-1==this.Bb&&(a.ctrlKey&&17!=a.keyCode?this.Bb=17:a.altKey&&18!=a.keyCode?this.Bb=18:a.metaKey&&91!=a.keyCode&&(this.Bb=91));tyWk&&!ty8j(a.keyCode,this.Bb,a.shiftKey,a.ctrlKey,a.altKey)?this.handleEvent(a):(this.hd=ty7j(a.keyCode),tyXk&&(this.ki=a.altKey))};ty.or=function(a){this.hd=this.Bb=-1;this.ki=a.altKey};
ty.handleEvent=function(a){var b=a.lc(),c,d,e=b.altKey;tyr&&"keypress"==a.type?(c=this.hd,d=13!=c&&27!=c?b.keyCode:0):tyt&&"keypress"==a.type?(c=this.hd,d=0<=b.charCode&&63232>b.charCode&&ty6j(c)?b.charCode:0):tyPb?(c=this.hd,d=ty6j(c)?b.keyCode:0):(c=b.keyCode||this.hd,d=b.charCode||0,tyXk&&(e=this.ki),tyQb&&63==d&&224==c&&(c=191));var f=c=ty7j(c),g=b.keyIdentifier;c?63232<=c&&c in tyUk?f=tyUk[c]:25==c&&a.shiftKey&&(f=9):g&&g in tyVk&&(f=tyVk[g]);a=f==this.Bb;this.Bb=f;b=new tyYk(f,d,a,b);b.altKey=
e;this.dispatchEvent(b)};ty.A=function(){return this.C};ty.dg=function(a,b){this.Xg&&this.detach();this.C=a;this.Wg=tyv(this.C,"keypress",this,b);this.ij=tyv(this.C,"keydown",this.Fc,b,this);this.Xg=tyv(this.C,"keyup",this.or,b,this)};ty.detach=function(){this.Wg&&(tytc(this.Wg),tytc(this.ij),tytc(this.Xg),this.Xg=this.ij=this.Wg=null);this.C=null;this.hd=this.Bb=-1};ty.D=function(){tyTk.B.D.call(this);this.detach()};
var tyYk=function(a,b,c,d){ty8b.call(this,d);this.type="key";this.keyCode=a;this.charCode=b;this.repeat=c};tyi(tyYk,ty8b);var tyZk=function(){},ty_k;tyda(tyZk);var ty0k={button:"pressed",checkbox:"checked",menuitem:"selected",menuitemcheckbox:"checked",menuitemradio:"checked",radio:"checked",tab:"selected",treeitem:"selected"};ty=tyZk.prototype;ty.vd=function(){};ty.F=function(a){return a.H().F("div",this.fe(a).join(" "),a.Dc())};ty.ba=function(a){return a};ty.$e=function(a,b,c){if(a=a.A?a.A():a){var d=[b];tyr&&!tyu("7")&&(d=ty1k(ty_j(a),b),d.push(b));(c?ty1j:ty2j)(a,d)}};ty.Sb=function(){return!0};
ty.fa=function(a,b){b.id&&a.Md(b.id);var c=this.ba(b);c&&c.firstChild?ty2k(a,c.firstChild.nextSibling?ty_a(c.childNodes):c.firstChild):a.jb=null;var d=0,e=this.M(),f=this.M(),g=!1,h=!1,k=!1,l=ty_a(ty_j(b));tyl(l,function(a){g||a!=e?h||a!=f?d|=this.Eg(a):h=!0:(g=!0,f==e&&(h=!0));1==this.Eg(a)&&tyHd(c)&&tyId(c,!1)},this);a.G=d;g||(l.push(e),f==e&&(h=!0));h||l.push(f);var m=a.Yb;m&&l.push.apply(l,m);if(tyr&&!tyu("7")){var n=ty1k(l);0<n.length&&(l.push.apply(l,n),k=!0)}if(!g||!h||m||k)b.className=l.join(" ");
return b};ty.fd=function(a){a.Ab()&&this.Be(a.A(),!0);a.isEnabled()&&this.Rc(a,a.ca())};var ty3k=function(a,b,c){if(a=c||a.vd())c=b.getAttribute("role")||null,a!=c&&ty4j(b,a)},ty4k=function(a,b,c){var d=b.bl;null!=d&&a.Rj(c,d);b.ca()||ty0(c,"hidden",!b.ca());b.isEnabled()||a.uc(c,1,!b.isEnabled());ty3(b,8)&&a.uc(c,8,b.isSelected());ty3(b,16)&&a.uc(c,16,b.gd());ty3(b,64)&&a.uc(c,64,b.fn())};ty=tyZk.prototype;ty.Rj=function(a,b){ty0(a,"label",b)};ty.Ff=function(a,b){tyYi(a,!b,!tyr&&!tyPb)};
ty.Be=function(a,b){this.$e(a,this.M()+"-rtl",b)};ty.Hc=function(a){var b;return ty3(a,32)&&(b=a.Ba())?tyHd(b):!1};ty.Rc=function(a,b){var c;if(ty3(a,32)&&(c=a.Ba())){if(!b&&a.G&32){try{c.blur()}catch(d){}a.G&32&&a.xd(null)}tyHd(c)!=b&&tyId(c,b)}};ty.da=function(a,b){tyW(a,b);a&&ty0(a,"hidden",!b)};ty.Pa=function(a,b,c){var d=a.A();if(d){var e=this.df(b);e&&this.$e(a,e,c);this.uc(d,b,c)}};
ty.uc=function(a,b,c){ty_k||(ty_k={1:"disabled",8:"selected",16:"checked",64:"expanded"});b=ty_k[b];var d=a.getAttribute("role")||null;d&&(d=ty0k[d]||b,b="checked"==b||"selected"==b?d:b);b&&ty0(a,b,c)};ty.Qc=function(a,b){var c=this.ba(a);if(c&&(tyxd(c),b))if(tyd(b))tyC(c,b);else{var d=function(a){if(a){var b=tyA(c);c.appendChild(tyd(a)?b.createTextNode(a):a)}};tyc(b)?tyl(b,d):!tyfa(b)||"nodeType"in b?d(b):tyl(ty_a(b),d)}};ty.Ba=function(a){return a.A()};ty.M=function(){return"t-control"};
ty.fe=function(a){var b=this.M(),c=[b],d=this.M();d!=b&&c.push(d);b=a.getState();for(d=[];b;){var e=b&-b;d.push(this.df(e));b&=~e}c.push.apply(c,d);(a=a.Yb)&&c.push.apply(c,a);tyr&&!tyu("7")&&c.push.apply(c,ty1k(c));return c};var ty1k=function(a,b){var c=[];b&&(a=a.concat([b]));tyl([],function(d){!tyUa(d,tyma(tym,a))||b&&!tym(d,b)||c.push(d.join("_"))});return c};tyZk.prototype.df=function(a){this.lg||ty5k(this);return this.lg[a]};
tyZk.prototype.Eg=function(a){if(!this.Io){this.lg||ty5k(this);var b=this.lg,c={},d;for(d in b)c[b[d]]=d;this.Io=c}a=parseInt(this.Io[a],10);return isNaN(a)?0:a};var ty5k=function(a){var b=a.M();b.replace(/\xa0|\s/g," ").indexOf(" ");a.lg={1:b+"-o",2:b+"-R",4:b+"-U",8:b+"-i",16:b+"-checked",32:b+"-S",64:b+"-T"}};var ty7k=function(a,b){if(!a)throw Error("Invalid class name "+a);if(!tye(b))throw Error("Invalid decorator function "+b);ty6k[a]=b},ty8k={},ty6k={};var ty4=function(a,b,c){ty1.call(this,c);if(!b){b=this.constructor;for(var d;b;){d=tyja(b);if(d=ty8k[d])break;b=b.B?b.B.constructor:null}b=d?tye(d.Ua)?d.Ua():new d:null}this.K=b;this.jb=tyb(a)?a:null;this.bl=null};tyi(ty4,ty1);ty=ty4.prototype;ty.jb=null;ty.G=0;ty.Pf=39;ty.Pe=255;ty.Of=0;ty.Ha=!0;ty.Yb=null;ty.Mg=!0;ty.bg=!1;ty.Jj=null;var ty$k=function(a,b){a.N&&b!=a.Mg&&ty9k(a,b);a.Mg=b};ty=ty4.prototype;ty.Ba=function(){return this.K.Ba(this)};ty.Ag=function(){return this.Ea||(this.Ea=new tyTk)};
ty.Ec=function(){return this.K};ty.Dp=function(a){a&&(this.Yb?tym(this.Yb,a)||this.Yb.push(a):this.Yb=[a],this.K.$e(this,a,!0))};ty.$e=function(a,b){b?this.Dp(a):a&&this.Yb&&tyYa(this.Yb,a)&&(0==this.Yb.length&&(this.Yb=null),this.K.$e(this,a,!1))};ty.F=function(){var a=this.K.F(this);this.C=a;ty3k(this.K,a,this.cd());this.bg||this.K.Ff(a,!1);this.ca()||this.K.da(a,!1)};ty.cd=function(){return this.Jj};ty.Rj=function(a){this.bl=a;var b=this.A();b&&this.K.Rj(b,a)};ty.ba=function(){return this.K.ba(this.A())};
ty.Sb=function(a){return this.K.Sb(a)};ty.kb=function(a){this.C=a=this.K.fa(this,a);ty3k(this.K,a,this.cd());this.bg||this.K.Ff(a,!1);this.Ha="none"!=a.style.display};ty.J=function(){ty4.B.J.call(this);ty4k(this.K,this,this.C);this.K.fd(this);if(this.Pf&-2&&(this.Mg&&ty9k(this,!0),ty3(this,32))){var a=this.Ba();if(a){var b=this.Ag();b.dg(a);this.getHandler().listen(b,"key",this.ac).listen(a,"focus",this.Kg).listen(a,"blur",this.xd)}}};
var ty9k=function(a,b){var c=a.getHandler(),d=a.A();b?(c.listen(d,"mouseover",a.ne).listen(d,"mousedown",a.le).listen(d,"mouseup",a.oe).listen(d,"mouseout",a.Ng),a.kf!=tyca&&c.listen(d,"contextmenu",a.kf),tyr&&c.listen(d,"dblclick",a.Mm)):(c.Z(d,"mouseover",a.ne).Z(d,"mousedown",a.le).Z(d,"mouseup",a.oe).Z(d,"mouseout",a.Ng),a.kf!=tyca&&c.Z(d,"contextmenu",a.kf),tyr&&c.Z(d,"dblclick",a.Mm))};
ty4.prototype.xa=function(){ty4.B.xa.call(this);this.Ea&&this.Ea.detach();this.ca()&&this.isEnabled()&&this.K.Rc(this,!1)};ty4.prototype.D=function(){ty4.B.D.call(this);this.Ea&&(this.Ea.S(),delete this.Ea);delete this.K;this.Yb=this.jb=null};ty4.prototype.Dc=function(){return this.jb};ty4.prototype.Qc=function(a){this.K.Qc(this.A(),a);this.jb=a};var ty2k=function(a,b){a.jb=b};ty=ty4.prototype;ty.yg=function(){var a=this.Dc();if(!a)return"";a=tyd(a)?a:tyc(a)?tySa(a,tyLd).join(""):tyKd(a);return tyta(a)};
ty.Be=function(a){ty4.B.Be.call(this,a);var b=this.A();b&&this.K.Be(b,a)};ty.Ff=function(a){this.bg=a;var b=this.A();b&&this.K.Ff(b,a)};ty.ca=function(){return this.Ha};ty.da=function(a,b){if(b||this.Ha!=a&&this.dispatchEvent(a?"show":"hide")){var c=this.A();c&&this.K.da(c,a);this.isEnabled()&&this.K.Rc(this,a);this.Ha=a;return!0}return!1};ty.isEnabled=function(){return!(this.G&1)};
ty.setEnabled=function(a){var b=this.getParent();b&&"function"==typeof b.isEnabled&&!b.isEnabled()||!tyal(this,1,!a)||(a||(this.setActive(!1),this.mb(!1)),this.ca()&&this.K.Rc(this,a),this.Pa(1,!a,!0))};ty.mb=function(a){tyal(this,2,a)&&this.Pa(2,a)};ty.pf=function(){return!!(this.G&4)};ty.setActive=function(a){tyal(this,4,a)&&this.Pa(4,a)};ty.isSelected=function(){return!!(this.G&8)};ty.gd=function(){return!!(this.G&16)};ty.Hf=function(a){tyal(this,16,a)&&this.Pa(16,a)};
ty.fn=function(){return!!(this.G&64)};var tybl=function(a,b){tyal(a,64,b)&&a.Pa(64,b)};ty4.prototype.getState=function(){return this.G};ty4.prototype.Pa=function(a,b,c){c||1!=a?ty3(this,a)&&b!=!!(this.G&a)&&(this.K.Pa(this,a,b),this.G=b?this.G|a:this.G&~a):this.setEnabled(!b)};var ty3=function(a,b){return!!(a.Pf&b)};ty4.prototype.eb=function(a,b){if(this.N&&this.G&a&&!b)throw Error("Component already rendered");!b&&this.G&a&&this.Pa(a,!1);this.Pf=b?this.Pf|a:this.Pf&~a};
var tycl=function(a,b){return!!(a.Pe&b)&&ty3(a,b)},tyal=function(a,b,c){return ty3(a,b)&&!!(a.G&b)!=c&&(!(a.Of&b)||a.dispatchEvent(tymk(b,c)))&&!a.isDisposed()};ty=ty4.prototype;ty.ne=function(a){(!a.relatedTarget||!tyCd(this.A(),a.relatedTarget))&&this.dispatchEvent("enter")&&this.isEnabled()&&tycl(this,2)&&this.mb(!0)};ty.Ng=function(a){a.relatedTarget&&tyCd(this.A(),a.relatedTarget)||!this.dispatchEvent("leave")||(tycl(this,4)&&this.setActive(!1),tycl(this,2)&&this.mb(!1))};ty.kf=tyca;
ty.le=function(a){this.isEnabled()&&(tycl(this,2)&&this.mb(!0),ty$b(a)&&(tycl(this,4)&&this.setActive(!0),this.K.Hc(this)&&this.Ba().focus()));!this.bg&&ty$b(a)&&a.preventDefault()};ty.oe=function(a){this.isEnabled()&&(tycl(this,2)&&this.mb(!0),this.pf()&&this.Kc(a)&&tycl(this,4)&&this.setActive(!1))};ty.Mm=function(a){this.isEnabled()&&this.Kc(a)};
ty.Kc=function(a){tycl(this,16)&&this.Hf(!this.gd());tycl(this,8)&&tyal(this,8,!0)&&this.Pa(8,!0);tycl(this,64)&&tybl(this,!this.fn());var b=new typ("action",this);a&&(b.altKey=a.altKey,b.ctrlKey=a.ctrlKey,b.metaKey=a.metaKey,b.shiftKey=a.shiftKey,b.Hj=a.Hj);return this.dispatchEvent(b)};ty.Kg=function(){tycl(this,32)&&tyal(this,32,!0)&&this.Pa(32,!0)};ty.xd=function(){tycl(this,4)&&this.setActive(!1);tycl(this,32)&&tyal(this,32,!1)&&this.Pa(32,!1)};
ty.ac=function(a){return this.ca()&&this.isEnabled()&&this.oc(a)?(a.preventDefault(),a.stopPropagation(),!0):!1};ty.oc=function(a){return 13==a.keyCode&&this.Kc(a)};if(!tye(ty4))throw Error("Invalid component class "+ty4);if(!tye(tyZk))throw Error("Invalid renderer class "+tyZk);var tydl=tyja(ty4);ty8k[tydl]=tyZk;ty7k("t-control",function(){return new ty4(null)});var tyel=function(){this.ui=[]};tyi(tyel,tyZk);tyda(tyel);var tyfl=function(a,b){var c=a.ui[b];if(!c){switch(b){case 0:c=a.M()+"-hb";break;case 1:c=a.M()+"-m";break;case 2:c=a.M()+"-gb"}a.ui[b]=c}return c};ty=tyel.prototype;ty.vd=function(){return"menuitem"};ty.F=function(a){var b=a.H().F("div",this.fe(a).join(" "),tygl(this,a.Dc(),a.H()));tyhl(this,a,b,ty3(a,8)||ty3(a,16));return b};ty.ba=function(a){return a&&a.firstChild};
ty.fa=function(a,b){var c=tyzd(b),d=tyfl(this,2);c&&ty0j(c,d)||b.appendChild(tygl(this,b.childNodes,a.H()));ty0j(b,"t-ib")&&(a.Gf(!0),this.Gf(a,b,!0));return tyel.B.fa.call(this,a,b)};ty.Qc=function(a,b){var c=this.ba(a),d=tyil(this,a)?c.firstChild:null;tyel.B.Qc.call(this,a,b);d&&!tyil(this,a)&&c.insertBefore(d,c.firstChild||null)};var tygl=function(a,b,c){a=tyfl(a,2);return c.F("div",a,b)};tyel.prototype.vo=function(a,b,c){a&&b&&tyhl(this,a,b,c)};
tyel.prototype.Gf=function(a,b,c){a&&b&&tyhl(this,a,b,c)};var tyil=function(a,b){var c=a.ba(b);if(c){var c=c.firstChild,d=tyfl(a,1);return!!c&&tyAd(c)&&ty0j(c,d)}return!1},tyhl=function(a,b,c,d){ty3k(a,c,b.cd());ty4k(a,b,c);d!=tyil(a,c)&&(ty_(c,"t-ib",d),c=a.ba(c),d?(a=tyfl(a,1),c.insertBefore(b.H().F("div",a),c.firstChild||null)):c.removeChild(c.firstChild))};tyel.prototype.df=function(a){switch(a){case 2:return tyfl(this,0);case 16:case 8:return"t-ib-i";default:return tyel.B.df.call(this,a)}};
tyel.prototype.Eg=function(a){var b=tyfl(this,0);switch(a){case "t-ib-i":return 16;case b:return 2;default:return tyel.B.Eg.call(this,a)}};tyel.prototype.M=function(){return"t-u"};var ty5=function(a,b,c,d){ty4.call(this,a,d||tyel.Ua(),c);this.nb(b)};tyi(ty5,ty4);ty=ty5.prototype;ty.ja=function(){var a=this.Pq();return null!=a?a:this.yg()};ty.nb=function(a){this.Et(a)};ty.eb=function(a,b){ty5.B.eb.call(this,a,b);switch(a){case 8:this.gd()&&!b&&this.Hf(!1);var c=this.A();c&&this.Ec().vo(this,c,b);break;case 16:(c=this.A())&&this.Ec().Gf(this,c,b)}};ty.vo=function(a){this.eb(8,a)};ty.Gf=function(a){this.eb(16,a)};
ty.yg=function(){var a=this.Dc();return tyc(a)?(a=tySa(a,function(a){return tyAd(a)&&(ty0j(a,"t-u-fb")||ty0j(a,"t-u-jb-lb"))?"":tyLd(a)}).join(""),tyta(a)):ty5.B.yg.call(this)};ty.oe=function(a){var b=this.getParent();if(b){var c=b.Qn;b.Qn=null;if(b=c&&tyga(a.clientX))b=new tyz(a.clientX,a.clientY),b=c==b?!0:c&&b?c.x==b.x&&c.y==b.y:!1;if(b)return}ty5.B.oe.call(this,a)};ty.oc=function(a){return a.keyCode==this.Bg()&&this.Kc(a)?!0:ty5.B.oc.call(this,a)};ty.Bg=function(){return this.Ux};ty7k("t-u",function(){return new ty5(null)});
ty5.prototype.cd=function(){return ty3(this,16)?"menuitemcheckbox":ty3(this,8)?"menuitemradio":ty5.B.cd.call(this)};ty5.prototype.getParent=function(){return ty4.prototype.getParent.call(this)};ty5.prototype.ie=function(){return ty4.prototype.ie.call(this)};var tyjl=function(){};tyjl.prototype.ld=function(){};var tykl=function(a,b,c){this.element=a;this.yi=b;this.Ss=c};tyi(tykl,tyjl);tykl.prototype.ld=function(a,b,c){tySk(this.element,this.yi,a,b,void 0,c,this.Ss)};var tyll=function(a,b,c,d){tykl.call(this,a,b);this.tf=c?5:0;this.Cj=d||void 0};tyi(tyll,tykl);tyll.prototype.Fh=function(a){this.tf=a};tyll.prototype.ld=function(a,b,c,d){var e=tySk(this.element,this.yi,a,b,null,c,10,d,this.Cj);if(e&496){var f=tyml(e,this.yi);b=tyml(e,b);e=tySk(this.element,f,a,b,null,c,10,d,this.Cj);e&496&&(f=tyml(e,f),b=tyml(e,b),tySk(this.element,f,a,b,null,c,this.tf,d,this.Cj))}};var tyml=function(a,b){a&48&&(b^=2);a&192&&(b^=1);return b};var tynl=function(a,b,c,d){tyll.call(this,a,b,c||d);(c||d)&&this.Fh(65|(d?32:132))};tyi(tynl,tyll);var tyol=function(a,b){this.mg=a instanceof tyz?a:new tyz(a,b)};tyi(tyol,tyjl);tyol.prototype.ld=function(a,b,c,d){var e;e=tyA(a);var f=e.body;e=e.documentElement;e=new tyz(f.scrollLeft||e.scrollLeft,f.scrollTop||e.scrollTop);f=this.mg.x+e.x;e=this.mg.y+e.y;var g=tyPk(a),f=f-g.x;e-=g.y;tyRk(new tyz(f,e),a,b,c,null,null,d)};var typl=function(a,b){tyol.call(this,a,b)};tyi(typl,tyol);typl.prototype.tf=0;typl.prototype.Fh=function(a){this.tf=a};typl.prototype.ld=function(a,b,c,d){var e=tyLi(a),e=tyPi(e),f;f=tyB(a);f=tyqd(f.va);f=new tyz(this.mg.x+f.scrollLeft,this.mg.y+f.scrollTop);var g=b,h=tyRk(f,a,g,c,e,10,d);if(0!=(h&496)){if(h&16||h&32)g^=2;if(h&64||h&128)g^=1;h=tyRk(f,a,g,c,e,10,d);0!=(h&496)&&tyRk(f,a,b,c,e,this.tf,d)}};var tyql=function(a){this.cl=a};tyda(tyql);tyql.prototype.vd=function(){return this.cl};var tyrl=function(a,b){a&&(a.tabIndex=b?0:-1)};tyql.prototype.F=function(a){return a.H().F("div",this.fe(a).join(" "))};tyql.prototype.ba=function(a){return a};tyql.prototype.Sb=function(a){return"DIV"==a.tagName};
tyql.prototype.fa=function(a,b){b.id&&a.Md(b.id);var c=this.M(),d=!1,e=ty_j(b);e&&tyl(e,function(b){b==c?d=!0:b&&(b==c+"-o"?a.setEnabled(!1):b==c+"-horizontal"?a.setOrientation("horizontal"):b==c+"-vertical"&&a.setOrientation("vertical"))},this);d||tyY(b,c);tysl(this,a,this.ba(b));return b};
var tysl=function(a,b,c){if(c)for(var d=c.firstChild,e;d&&d.parentNode==c;){e=d.nextSibling;if(1==d.nodeType){var f=a.Ri(d);f&&(f.C=d,b.isEnabled()||f.setEnabled(!1),b.Eb(f),f.fa(d))}else d.nodeValue&&""!=tyua(d.nodeValue)||c.removeChild(d);d=e}};ty=tyql.prototype;ty.Ri=function(a){t:{var b;a=ty_j(a);for(var c=0,d=a.length;c<d;c++)if(b=a[c],b=b in ty6k?ty6k[b]():null){a=b;break t}a=null}return a};ty.fd=function(a){a=a.A();tyYi(a,!0,tys);tyr&&(a.hideFocus=!0);var b=this.vd();b&&ty4j(a,b)};ty.Ba=function(a){return a.A()};
ty.M=function(){return"t-d"};ty.fe=function(a){var b=this.M(),c=[b,"horizontal"==a.lm()?b+"-horizontal":b+"-vertical"];a.isEnabled()||c.push(b+"-o");return c};var tytl=function(a,b,c){ty1.call(this,c);this.K=b||tyql.Ua();this.ka=a||"vertical"};tyi(tytl,ty1);ty=tytl.prototype;ty.jj=null;ty.Ea=null;ty.K=null;ty.ka=null;ty.Ha=!0;ty.$a=!0;ty.Pi=!0;ty.ga=-1;ty.Fa=null;ty.Cd=!1;ty.Gp=!1;ty.Qs=!0;ty.wc=null;ty.Ba=function(){return this.jj||this.K.Ba(this)};ty.Ag=function(){return this.Ea||(this.Ea=new tyTk(this.Ba()))};ty.Ec=function(){return this.K};ty.F=function(){this.C=this.K.F(this)};ty.ba=function(){return this.K.ba(this.A())};ty.Sb=function(a){return this.K.Sb(a)};
ty.kb=function(a){this.C=this.K.fa(this,a);"none"==a.style.display&&(this.Ha=!1)};
ty.J=function(){tytl.B.J.call(this);this.Cc(function(a){a.N&&tyul(this,a)},this);var a=this.A();this.K.fd(this);this.da(this.Ha,!0);this.getHandler().listen(this,"enter",this.$i).listen(this,"highlight",this.nr).listen(this,"unhighlight",this.Cr).listen(this,"open",this.tr).listen(this,"close",this.kr).listen(a,"mousedown",this.le).listen(tyA(a),"mouseup",this.lr).listen(a,["mousedown","mouseup","mouseover","mouseout","contextmenu"],this.jr);this.Hc()&&tyvl(this,!0)};
var tyvl=function(a,b){var c=a.getHandler(),d=a.Ba();b?c.listen(d,"focus",a.Kg).listen(d,"blur",a.xd).listen(a.Ag(),"key",a.ac):c.Z(d,"focus",a.Kg).Z(d,"blur",a.xd).Z(a.Ag(),"key",a.ac)};ty=tytl.prototype;ty.xa=function(){this.md(-1);this.Fa&&tybl(this.Fa,!1);this.Cd=!1;tytl.B.xa.call(this)};ty.D=function(){tytl.B.D.call(this);this.Ea&&(this.Ea.S(),this.Ea=null);this.K=this.Fa=this.wc=this.jj=null};ty.$i=function(){return!0};
ty.nr=function(a){var b=typk(this,a.target);if(-1<b&&b!=this.ga){var c=this.Zb(this.ga);c&&c.mb(!1);this.ga=b;c=this.Zb(this.ga);this.Cd&&c.setActive(!0);this.Qs&&this.Fa&&c!=this.Fa&&(ty3(c,64)?tybl(c,!0):tybl(this.Fa,!1))}b=this.A();null!=a.target.A()&&ty0(b,"activedescendant",a.target.A().id)};ty.Cr=function(a){a.target==this.Zb(this.ga)&&(this.ga=-1);this.A().removeAttribute("aria-activedescendant")};
ty.tr=function(a){(a=a.target)&&a!=this.Fa&&a.getParent()==this&&(this.Fa&&tybl(this.Fa,!1),this.Fa=a)};ty.kr=function(a){a.target==this.Fa&&(this.Fa=null)};ty.le=function(a){this.$a&&(this.Cd=!0);var b=this.Ba();b&&tyHd(b)?b.focus():a.preventDefault()};ty.lr=function(){this.Cd=!1};
ty.jr=function(a){var b;t:{b=a.target;if(this.wc)for(var c=this.A();b&&b!==c;){var d=b.id;if(d in this.wc){b=this.wc[d];break t}b=b.parentNode}b=null}if(b)switch(a.type){case "mousedown":b.le(a);break;case "mouseup":b.oe(a);break;case "mouseover":b.ne(a);break;case "mouseout":b.Ng(a);break;case "contextmenu":b.kf(a)}};ty.Kg=function(){};ty.xd=function(){this.md(-1);this.Cd=!1;this.Fa&&tybl(this.Fa,!1)};
ty.ac=function(a){return this.isEnabled()&&this.ca()&&(0!=this.ad()||this.jj)&&this.oc(a)?(a.preventDefault(),a.stopPropagation(),!0):!1};
ty.oc=function(a){var b=this.Zb(this.ga);if(b&&"function"==typeof b.ac&&b.ac(a)||this.Fa&&this.Fa!=b&&"function"==typeof this.Fa.ac&&this.Fa.ac(a))return!0;if(a.shiftKey||a.ctrlKey||a.metaKey||a.altKey)return!1;switch(a.keyCode){case 27:if(this.Hc())this.Ba().blur();else return!1;break;case 36:tywl(this);break;case 35:tyxl(this);break;case 38:if("vertical"==this.ka)tyyl(this);else return!1;break;case 37:if("horizontal"==this.ka)this.Ab()?tyzl(this):tyyl(this);else return!1;break;case 40:if("vertical"==
this.ka)tyzl(this);else return!1;break;case 39:if("horizontal"==this.ka)this.Ab()?tyyl(this):tyzl(this);else return!1;break;default:return!1}return!0};var tyul=function(a,b){var c=b.A(),c=c.id||(c.id=b.getId());a.wc||(a.wc={});a.wc[c]=b};ty=tytl.prototype;ty.Eb=function(a,b){tytl.B.Eb.call(this,a,b)};
ty.gi=function(a,b,c){a.Of|=2;a.Of|=64;!this.Hc()&&this.Gp||a.eb(32,!1);ty$k(a,!1);var d=a.getParent()==this?typk(this,a):-1;tytl.B.gi.call(this,a,b,c);a.N&&this.N&&tyul(this,a);a=d;-1==a&&(a=this.ad());a==this.ga?this.ga=Math.min(this.ad()-1,b):a>this.ga&&b<=this.ga?this.ga++:a<this.ga&&b>this.ga&&this.ga--};
ty.removeChild=function(a,b){if(a=tyd(a)?tynk(this,a):a){var c=typk(this,a);-1!=c&&(c==this.ga?(a.mb(!1),this.ga=-1):c<this.ga&&this.ga--);var d=a.A();d&&d.id&&this.wc&&(c=this.wc,d=d.id,d in c&&delete c[d])}a=tytl.B.removeChild.call(this,a,b);ty$k(a,!0);return a};ty.lm=function(){return this.ka};ty.setOrientation=function(a){if(this.A())throw Error("Component already rendered");this.ka=a};ty.ca=function(){return this.Ha};
ty.da=function(a,b){if(b||this.Ha!=a&&this.dispatchEvent(a?"show":"hide")){this.Ha=a;var c=this.A();c&&(tyW(c,a),this.Hc()&&tyrl(this.Ba(),this.$a&&this.Ha),b||this.dispatchEvent(this.Ha?"aftershow":"afterhide"));return!0}return!1};ty.isEnabled=function(){return this.$a};
ty.setEnabled=function(a){this.$a!=a&&this.dispatchEvent(a?"enable":"disable")&&(a?(this.$a=!0,this.Cc(function(a){a.Zo?delete a.Zo:a.setEnabled(!0)})):(this.Cc(function(a){a.isEnabled()?a.setEnabled(!1):a.Zo=!0}),this.Cd=this.$a=!1),this.Hc()&&tyrl(this.Ba(),a&&this.Ha))};ty.Hc=function(){return this.Pi};ty.Rc=function(a){a!=this.Pi&&this.N&&tyvl(this,a);this.Pi=a;this.$a&&this.Ha&&tyrl(this.Ba(),a)};ty.md=function(a){(a=this.Zb(a))?a.mb(!0):-1<this.ga&&this.Zb(this.ga).mb(!1)};
ty.mb=function(a){this.md(typk(this,a))};var tywl=function(a){tyAl(a,function(a,c){return(a+1)%c},a.ad()-1)},tyxl=function(a){tyAl(a,function(a,c){a--;return 0>a?c-1:a},0)},tyzl=function(a){tyAl(a,function(a,c){return(a+1)%c},a.ga)},tyyl=function(a){tyAl(a,function(a,c){a--;return 0>a?c-1:a},a.ga)},tyAl=function(a,b,c){c=0>c?typk(a,a.Fa):c;var d=a.ad();c=b.call(a,c,d);for(var e=0;e<=d;){var f=a.Zb(c);if(f&&a.hl(f)){a.md(c);break}e++;c=b.call(a,c,d)}};
tytl.prototype.hl=function(a){return a.ca()&&a.isEnabled()&&ty3(a,2)};var tyBl=function(){};tyi(tyBl,tyZk);tyda(tyBl);tyBl.prototype.M=function(){return"t-menuheader"};var tyCl=function(a,b,c){ty4.call(this,a,c||tyBl.Ua(),b);this.eb(1,!1);this.eb(2,!1);this.eb(4,!1);this.eb(32,!1);this.G=1};tyi(tyCl,ty4);ty7k("t-menuheader",function(){return new tyCl(null)});var tyDl=function(){};tyi(tyDl,tyZk);tyda(tyDl);tyDl.prototype.F=function(a){return a.H().F("div",this.M())};tyDl.prototype.fa=function(a,b){b.id&&a.Md(b.id);if("HR"==b.tagName){var c=b;b=this.F(a);c.parentNode&&c.parentNode.insertBefore(b,c);tyyd(c)}else tyY(b,this.M());return b};tyDl.prototype.Qc=function(){};tyDl.prototype.M=function(){return"t-mb"};var tyEl=function(a,b){ty4.call(this,null,a||tyDl.Ua(),b);this.eb(1,!1);this.eb(2,!1);this.eb(4,!1);this.eb(32,!1);this.G=1};tyi(tyEl,ty4);tyEl.prototype.J=function(){tyEl.B.J.call(this);ty4j(this.A(),"separator")};ty7k("t-mb",function(){return new tyEl});var tyFl=function(a){this.cl=a||"menu"};tyi(tyFl,tyql);tyda(tyFl);ty=tyFl.prototype;ty.Sb=function(a){return"UL"==a.tagName||tyFl.B.Sb.call(this,a)};ty.Ri=function(a){return"HR"==a.tagName?new tyEl:tyFl.B.Ri.call(this,a)};ty.sd=function(a,b){return tyCd(a.A(),b)};ty.M=function(){return"t-s"};ty.fd=function(a){tyFl.B.fd.call(this,a);ty0(a.A(),"haspopup","true")};var tyGl=function(a){tyEl.call(this,tyDl.Ua(),a)};tyi(tyGl,tyEl);ty7k("t-mb",function(){return new tyEl});var tyHl=function(a,b){tytl.call(this,"vertical",b||tyFl.Ua(),a);this.Rc(!1)};tyi(tyHl,tytl);ty=tyHl.prototype;ty.ag=!0;ty.Hp=!1;ty.M=function(){return this.Ec().M()};ty.sd=function(a){if(this.Ec().sd(this,a))return!0;for(var b=0,c=this.ad();b<c;b++){var d=this.Zb(b);if("function"==typeof d.sd&&d.sd(a))return!0}return!1};ty.da=function(a,b,c){(b=tyHl.B.da.call(this,a,b))&&a&&this.N&&this.ag&&this.Ba().focus();this.Qn=a&&c&&tyga(c.clientX)?new tyz(c.clientX,c.clientY):null;return b};
ty.$i=function(a){this.ag&&this.Ba().focus();return tyHl.B.$i.call(this,a)};ty.hl=function(a){return(this.Hp||a.isEnabled())&&a.ca()&&ty3(a,2)};ty.kb=function(a){var b=this.Ec(),c;c=this.H();c=tykd(c.va,"div",b.M()+"-gb",a);for(var d=c.length,e=0;e<d;e++)tysl(b,this,c[e]);tyHl.B.kb.call(this,a)};ty.oc=function(a){var b=tyHl.B.oc.call(this,a);b||this.Cc(function(c){!b&&c.Bg&&c.Bg()==a.keyCode&&(this.isEnabled()&&this.mb(c),b=c.ac(a))},this);return b};
ty.md=function(a){tyHl.B.md.call(this,a);var b=this.Zb(a);if(b){a=this.A();var c=b.A(),d=tyOi(c),b=tyOi(a),e=ty2i(a),f=d.x-b.x-e.left,d=d.y-b.y-e.top,g=a.clientWidth-c.offsetWidth,c=a.clientHeight-c.offsetHeight,h=a.scrollLeft,k=a.scrollTop;if(a==document.body||a==document.documentElement)h=b.x+e.left,k=b.y+e.top,tyr&&!ty0b(10)&&(h+=e.left,k+=e.top);h+=Math.min(f,Math.max(f-g,0));k+=Math.min(d,Math.max(d-c,0));b=new tyz(h,k);a.scrollLeft=b.x;a.scrollTop=b.y}};var tyIl=function(a,b){tyHl.call(this,a,b);this.ag=!0;this.Rc(!0);this.da(!1,!0);this.gc=new tyn};tyi(tyIl,tyHl);ty=tyIl.prototype;ty.Po=!1;ty.pn=0;ty.kb=function(a){tyIl.B.kb.call(this,a);(a=a.getAttribute("for")||a.htmlFor)&&this.dg(this.H().A(a),1)};ty.J=function(){tyIl.B.J.call(this);this.gc.forEach(this.fl,this);var a=this.getHandler();a.listen(this,"action",this.zs);a.listen(this.H().ya(),"mousedown",this.In,!0);tyt&&a.listen(this.H().ya(),"contextmenu",this.In,!0)};
ty.dg=function(a,b,c,d,e){a&&this.gc.xc(tyja(a))||(a?(b={C:a,Ko:b,ks:c,Bl:d?"contextmenu":"mousedown",hs:e},this.gc.set(tyja(a),b),a=b):a=null,this.N&&this.fl(a))};ty.fl=function(a){this.getHandler().listen(a.C,a.Bl,this.On)};ty.detach=function(a){if(!a||!this.gc.xc(tyja(a)))throw Error("Menu not attached to provided element, unable to detach.");a=tyja(a);if(this.N){var b=this.gc.get(a);this.getHandler().Z(b.C,b.Bl,this.On)}this.gc.remove(a)};
var tyJl=function(a,b,c,d){var e=a.ca();a.Sr()&&a.Po?a.hide():a.dispatchEvent("beforeshow")&&(c="undefined"!=typeof c?c:4,e||(a.A().style.visibility="hidden"),tyW(a.A(),!0),b.ld(a.A(),c,d),e||(a.A().style.visibility="visible"),a.md(-1),a.da(!0))};ty=tyIl.prototype;ty.showMenu=function(a,b,c){b=tyb(a.Ko)?new tyll(a.C,a.Ko,!0):new typl(b,c);b.Fh&&b.Fh(5);tyJl(this,b,a.ks,a.hs)};ty.hide=function(){this.ca()&&(this.da(!1),this.ca()||(this.pn=tyh()))};ty.Sr=function(){return this.ca()||150>tyh()-this.pn};
ty.zs=function(){this.hide()};ty.On=function(a){for(var b=this.gc.$b(),c=0;c<b.length;c++){var d=this.gc.get(b[c]);if(d.C==a.currentTarget){this.showMenu(d,a.clientX,a.clientY);a.preventDefault();a.stopPropagation();break}}};ty.In=function(a){this.ca()&&!this.sd(a.target)&&this.hide()};ty.xd=function(a){tyIl.B.xd.call(this,a);this.hide()};ty.D=function(){tyIl.B.D.call(this);this.gc&&(this.gc.clear(),delete this.gc)};tyr&&tyu("11");new tyH("$");chrome.i18n.getMessage("5359972686439530616");chrome.i18n.getMessage("1072679467482196927");chrome.i18n.getMessage("2853841969129372162");chrome.i18n.getMessage("8082269310659310085");chrome.i18n.getMessage("4882534557068236871");chrome.i18n.getMessage("3370288955750739075");chrome.i18n.getMessage("2395448436346696473");chrome.i18n.getMessage("2488986379365136440");chrome.i18n.getMessage("2235236867069413571");chrome.i18n.getMessage("8668688673488857062");chrome.i18n.getMessage("7588107080089998106");
chrome.i18n.getMessage("1168628503345801417");chrome.i18n.getMessage("7973992586253470062");chrome.i18n.getMessage("4697182936858386680");chrome.i18n.getMessage("1361015519033136245");chrome.i18n.getMessage("8499447471548910222");chrome.i18n.getMessage("1758518900736299270");chrome.i18n.getMessage("5703992909435466308");chrome.i18n.getMessage("6648321575857011667");var tyKl=function(){tyw.call(this);this.G=0;this.endTime=this.startTime=null};tyi(tyKl,tyw);tyKl.prototype.kh=function(){this.Gb("begin")};tyKl.prototype.ue=function(){this.Gb("end")};tyKl.prototype.onStop=function(){this.Gb("stop")};tyKl.prototype.Gb=function(a){this.dispatchEvent(a)};var tyLl=function(){tyKl.call(this);this.Mc=[]};tyi(tyLl,tyKl);tyLl.prototype.add=function(a){tym(this.Mc,a)||(this.Mc.push(a),tyv(a,"finish",this.Gn,!1,this))};tyLl.prototype.remove=function(a){tyYa(this.Mc,a)&&tysc(a,"finish",this.Gn,!1,this)};tyLl.prototype.D=function(){tyl(this.Mc,function(a){a.S()});this.Mc.length=0;tyLl.B.D.call(this)};var tyMl=function(){tyLl.call(this);this.Mi=0};tyi(tyMl,tyLl);
tyMl.prototype.play=function(a){if(0==this.Mc.length)return!1;if(a||0==this.G)this.Mi=0,this.kh();else if(1==this.G)return!1;this.Gb("play");-1==this.G&&this.Gb("resume");var b=-1==this.G&&!a;this.startTime=tyh();this.endTime=null;this.G=1;tyl(this.Mc,function(c){b&&-1!=c.G||c.play(a)});return!0};tyMl.prototype.stop=function(a){tyl(this.Mc,function(b){0==b.G||b.stop(a)});this.G=0;this.endTime=tyh();this.onStop();this.ue()};
tyMl.prototype.Gn=function(){this.Mi++;this.Mi==this.Mc.length&&(this.endTime=tyh(),this.G=0,this.Gb("finish"),this.ue())};var tyNl={},tyOl=null,tyPl=function(a){a=tyja(a);delete tyNl[a];tygb(tyNl)&&tyOl&&tyOl.stop()},tyRl=function(){tyOl||(tyOl=new ty_g(function(){tyQl()},20));var a=tyOl;a.pf()||a.start()},tyQl=function(){var a=tyh();tyab(tyNl,function(b){tySl(b,a)});tygb(tyNl)||tyRl()};var tyTl=function(a,b,c,d){tyKl.call(this);if(!tyc(a)||!tyc(b))throw Error("Start and end parameters must be arrays");if(a.length!=b.length)throw Error("Start and end points must be the same length");this.Nf=a;this.xq=b;this.duration=c;this.Zk=d;this.coords=[];this.Td=!1;this.progress=0};tyi(tyTl,tyKl);tyTl.prototype.Yc=function(a){this.Td=a};
tyTl.prototype.play=function(a){if(a||0==this.G)this.progress=0,this.coords=this.Nf;else if(1==this.G)return!1;tyPl(this);this.startTime=a=tyh();-1==this.G&&(this.startTime-=this.duration*this.progress);this.endTime=this.startTime+this.duration;this.progress||this.kh();this.Gb("play");-1==this.G&&this.Gb("resume");this.G=1;var b=tyja(this);b in tyNl||(tyNl[b]=this);tyRl();tySl(this,a);return!0};
tyTl.prototype.stop=function(a){tyPl(this);this.G=0;a&&(this.progress=1);tyUl(this,this.progress);this.onStop();this.ue()};tyTl.prototype.D=function(){0==this.G||this.stop(!1);this.Gb("destroy");tyTl.B.D.call(this)};
var tySl=function(a,b){a.progress=(b-a.startTime)/(a.endTime-a.startTime);1<=a.progress&&(a.progress=1);tyUl(a,a.progress);1==a.progress?(a.G=0,tyPl(a),a.Gb("finish"),a.ue()):1==a.G&&a.zj()},tyUl=function(a,b){tye(a.Zk)&&(b=a.Zk(b));a.coords=Array(a.Nf.length);for(var c=0;c<a.Nf.length;c++)a.coords[c]=(a.xq[c]-a.Nf[c])*b+a.Nf[c]};tyTl.prototype.zj=function(){this.Gb("animate")};tyTl.prototype.Gb=function(a){this.dispatchEvent(new tyVl(a,this))};
var tyVl=function(a,b){typ.call(this,a);this.coords=b.coords;this.x=b.coords[0];this.y=b.coords[1];this.z=b.coords[2];this.duration=b.duration;this.progress=b.progress;this.state=b.G};tyi(tyVl,typ);var tyWl=function(a,b,c,d,e){tyTl.call(this,b,c,d,e);this.element=a};tyi(tyWl,tyTl);ty=tyWl.prototype;ty.Ie=tyca;ty.Ab=function(){tyb(this.tc)||(this.tc=tyWi(this.element));return this.tc};ty.zj=function(){this.Ie();tyWl.B.zj.call(this)};ty.ue=function(){this.Ie();tyWl.B.ue.call(this)};ty.kh=function(){this.Ie();tyWl.B.kh.call(this)};var tyXl=function(a,b,c,d,e){if(2!=b.length||2!=c.length)throw Error("Start and end points must be 2D");tyWl.apply(this,arguments)};tyi(tyXl,tyWl);
tyXl.prototype.Ie=function(){var a=this.Td&&this.Ab()?"right":"left";this.element.style[a]=Math.round(this.coords[0])+"px";this.element.style.top=Math.round(this.coords[1])+"px"};var tyYl=function(a,b,c,d,e){tyWl.call(this,a,[b],[c],d,e)};tyi(tyYl,tyWl);tyYl.prototype.Ie=function(){this.element.style.width=Math.round(this.coords[0])+"px"};var tyZl=function(a,b,c,d,e){tyWl.call(this,a,[b],[c],d,e)};tyi(tyZl,tyWl);tyZl.prototype.Ie=function(){this.element.style.height=Math.round(this.coords[0])+"px"};var ty_l=function(a){this.length=a.length||a;for(var b=0;b<this.length;b++)this[b]=a[b]||0};ty_l.prototype.BYTES_PER_ELEMENT=4;ty_l.prototype.set=function(a,b){b=b||0;for(var c=0;c<a.length&&b+c<this.length;c++)this[b+c]=a[c]};ty_l.prototype.toString=Array.prototype.join;
"undefined"==typeof Float32Array&&(ty_l.BYTES_PER_ELEMENT=4,ty_l.prototype.BYTES_PER_ELEMENT=ty_l.prototype.BYTES_PER_ELEMENT,ty_l.prototype.set=ty_l.prototype.set,ty_l.prototype.toString=ty_l.prototype.toString,typa("Float32Array",ty_l));var ty0l=function(a){this.length=a.length||a;for(var b=0;b<this.length;b++)this[b]=a[b]||0};ty0l.prototype.BYTES_PER_ELEMENT=8;ty0l.prototype.set=function(a,b){b=b||0;for(var c=0;c<a.length&&b+c<this.length;c++)this[b+c]=a[c]};ty0l.prototype.toString=Array.prototype.join;
if("undefined"==typeof Float64Array){try{ty0l.BYTES_PER_ELEMENT=8}catch(ty1l){}ty0l.prototype.BYTES_PER_ELEMENT=ty0l.prototype.BYTES_PER_ELEMENT;ty0l.prototype.set=ty0l.prototype.set;ty0l.prototype.toString=ty0l.prototype.toString;typa("Float64Array",ty0l)};var ty2l=function(){var a=Array(3);a[0]=0;a[1]=0;a[2]=0};var ty3l=function(){var a=Array(4);a[0]=0;a[1]=0;a[2]=0;a[3]=0};ty2l();ty2l();ty3l();ty3l();ty3l();new Float32Array(16);var ty4l=function(){this.ui=[]};tyi(ty4l,tyel);tyda(ty4l);ty4l.prototype.F=function(a){var b=ty4l.B.F.call(this,a);tyY(b,"t-nb");ty5l(this,a,b);return b};ty4l.prototype.fa=function(a,b){b=ty4l.B.fa.call(this,a,b);tyY(b,"t-nb");ty5l(this,a,b);var c=tykd(document,"div","t-s",b);if(c.length){var d=new tyHl(a.H()),c=c[0];tyW(c,!1);a.H().ya().body.appendChild(c);d.fa(c);ty6l(a,d)}return b};
ty4l.prototype.Qc=function(a,b){var c=this.ba(a),d=c&&c.lastChild;ty4l.B.Qc.call(this,a,b);d&&c.lastChild!=d&&ty0j(d,"t-nb-ob")&&c.appendChild(d)};ty4l.prototype.fd=function(a){ty4l.B.fd.call(this,a);var b=a.ba(),c=a.H(),c=tykd(c.va,"span","t-nb-ob",b)[0];ty7l(a,c);c!=b.lastChild&&b.appendChild(c);ty0(a.A(),"haspopup","true")};
var ty5l=function(a,b,c){var d=b.H().F("span");d.className="t-nb-ob";ty7l(b,d);a.ba(c).appendChild(d)},ty7l=function(a,b){a.Ab()?(tyY(b,"t-nb-ob-rtl"),tyC(b,a.$f?"\u25c4":"\u25ba")):(tyZ(b,"t-nb-ob-rtl"),tyC(b,a.$f?"\u25ba":"\u25c4"))};var ty8l=function(a,b,c,d){ty5.call(this,a,b,c,d||ty4l.Ua())};tyi(ty8l,ty5);ty=ty8l.prototype;ty.Ze=null;ty.zk=null;ty.sj=!1;ty.Ga=null;ty.sg=!1;ty.$f=!0;ty.Tr=!1;ty.J=function(){ty8l.B.J.call(this);this.getHandler().listen(this.getParent(),"hide",this.Ln);this.Ga&&ty9l(this,this.Ga,!0)};ty.xa=function(){this.getHandler().Z(this.getParent(),"hide",this.Ln);this.Ga&&(ty9l(this,this.Ga,!1),this.sg||(this.Ga.xa(),tyyd(this.Ga.A())));ty8l.B.xa.call(this)};
ty.D=function(){this.Ga&&!this.sg&&this.Ga.S();this.Ga=null;ty8l.B.D.call(this)};ty.mb=function(a,b){ty8l.B.mb.call(this,a);b&&(this.he().Cd=!0);a||(this.Ze&&tya.clearTimeout(this.Ze),this.Ze=tyge(this.yc,218,this))};ty.yk=function(){var a=this.getParent();a&&a.Zb(a.ga)==this&&(ty$l(this,!0),tyam(this))};ty.yc=function(){var a=this.Ga;a&&a.getParent()==this&&(ty$l(this,!1),a.Cc(function(a){"function"==typeof a.yc&&a.yc()}))};var tybm=function(a){a.Ze&&tya.clearTimeout(a.Ze);a.zk&&tya.clearTimeout(a.zk)};
ty8l.prototype.da=function(a,b){var c=ty8l.B.da.call(this,a,b);c&&!this.ca()&&this.yc();return c};var tyam=function(a){a.getParent().Cc(function(a){a!=this&&"function"==typeof a.yc&&(a.yc(),tybm(a))},a)};ty=ty8l.prototype;ty.ac=function(a){var b=a.keyCode,c=this.Ab()?37:39,d=this.Ab()?39:37;if(!this.sj){if(!this.isEnabled()||b!=c&&b!=this.Bg())return!1;this.yk();tywl(this.he());tybm(this)}else if(!this.he().ac(a))if(b==d)this.yc();else return!1;a.preventDefault();return!0};
ty.Ds=function(){this.Ga.getParent()==this&&(tybm(this),this.ie().mb(this),tyam(this))};ty.Ln=function(a){a.target==this.ie()&&(this.yc(),tybm(this))};ty.ne=function(a){this.isEnabled()&&(tybm(this),this.zk=tyge(this.yk,218,this));ty8l.B.ne.call(this,a)};ty.Kc=function(a){tybm(this);if(ty3(this,8))return ty8l.B.Kc.call(this,a);this.yk();return!0};
var ty$l=function(a,b){a.dispatchEvent(tymk(64,b));var c=a.he();b!=a.sj&&ty_(a.A(),"t-nb-T",b);if(b!=c.ca()&&(b&&(c.N||c.render(),c.md(-1)),c.da(b),b)){var c=new tyll(a.A(),a.$f?6:4,a.Tr),d=a.he(),e=d.A();d.ca()||(e.style.visibility="hidden",tyW(e,!0));c.ld(e,a.$f?4:6);d.ca()||(tyW(e,!1),e.style.visibility="visible")}a.sj=b},ty9l=function(a,b,c){var d=a.getHandler();(c?d.listen:d.Z).call(d,b,"enter",a.Ds)};
ty8l.prototype.he=function(){this.Ga?this.sg&&this.Ga.getParent()!=this&&this.Ga.Kh(this):ty6l(this,new tyHl(this.H()));this.Ga.A()||this.Ga.F();return this.Ga};var ty6l=function(a,b){var c=a.Ga;b!=c&&(c&&(a.yc(),a.N&&ty9l(a,c,!1)),a.Ga=b,a.sg=!1,b&&(b.Kh(a),b.da(!1,!0),b.ag=!1,b.Rc(!1),a.N&&ty9l(a,b,!0)))};ty8l.prototype.sd=function(a){return this.he().sd(a)};ty7k("t-nb",function(){return new ty8l(null)});chrome.i18n.getMessage("3239052796417276147");chrome.i18n.getMessage("3624948107517969571");chrome.i18n.getMessage("2395136813547607194");chrome.i18n.getMessage("4298797223016826648");chrome.i18n.getMessage("6223255458060266606");chrome.i18n.getMessage("8833465340266211620");chrome.i18n.getMessage("8146596754377240594");chrome.i18n.getMessage("3199328506415818264");chrome.i18n.getMessage("2203397136690479355");chrome.i18n.getMessage("1558113021895652337");chrome.i18n.getMessage("2763267855550833920");chrome.i18n.getMessage("3901889124080689046");chrome.i18n.getMessage("8338465287076872825");chrome.i18n.getMessage("5071594083516657121");chrome.i18n.getMessage("8239380670132570074");chrome.i18n.getMessage("5930857699885919881");chrome.i18n.getMessage("2328554046256236832");chrome.i18n.getMessage("2506718393130237030");chrome.i18n.getMessage("5761798931116026691");
chrome.i18n.getMessage("997742287268027221");chrome.i18n.getMessage("5378532290721565403");chrome.i18n.getMessage("6898179631823558149");chrome.i18n.getMessage("8001758142015238809");var tycm=function(a){var b="";a=chrome.i18n.getMessage("210173405987284279",["</a>",'<a href="'+tyNh(tyRh(a.mj))+'" target="_blank">']);return tyO(b+a)},tydm=function(a){var b="";a=chrome.i18n.getMessage("2139100152161431685",["</a>",'<a href="'+tyNh(tyRh(a.mj))+'" target="_blank">']);return tyO(b+a)},tyem=function(){var a="",b=chrome.i18n.getMessage("7035822615949880851");return tyO(a+b)};/*

Math.uuid.js (v1.4)
http://www.broofa.com
mailto:robert@broofa.com
Copyright (c) 2010 Robert Kieffer
Dual licensed under the MIT and GPL licenses.
*/
new tyX("ap",["original_queue"]);(tyEj||tyFj)&&tyu("533.17.9");chrome.i18n.getMessage("1053534453293466081");chrome.i18n.getMessage("8090573223674035778");chrome.i18n.getMessage("117315057265021884");var tyfm=function(a,b){this.Hb=b||tyB();this.Ce=a||null},tygm=function(a,b,c){var d;t:{var e=a.Ce?a.Ce.getData():{};d=(a.Hb||tyB()).createElement("DIV");b=tyDh(b(c||tyEh,void 0,e));d.innerHTML=b;if(1==d.childNodes.length&&(b=d.firstChild,1==b.nodeType)){d=b;break t}}a.aj(d);return d},ty6=function(a,b,c,d){var e=a.Ce?a.Ce.getData():{};b.innerHTML=tyDh(c(d||tyEh,void 0,e));a.aj(b)};tyfm.prototype.render=function(a,b){var c=a(b||{},void 0,this.Ce?this.Ce.getData():{});this.aj();return String(c)};
tyfm.prototype.aj=tyca;var tyhm=function(){tyw.call(this)};tyi(tyhm,tyw);ty=tyhm.prototype;ty.la=0;ty.dc=0;ty.Ob=100;ty.xb=0;ty.Qd=1;ty.qc=!1;ty.te=!1;ty.nb=function(a){a=tyim(this,a);this.la!=a&&(this.la=a+this.xb>this.Ob?this.Ob-this.xb:a<this.dc?this.dc:a,this.qc||this.te||this.dispatchEvent("change"))};ty.ja=function(){return tyim(this,this.la)};ty.Dh=function(a){a=tyim(this,a);this.xb!=a&&(this.xb=0>a?0:this.la+a>this.Ob?this.Ob-this.la:a,this.qc||this.te||this.dispatchEvent("change"))};
ty.bd=function(){var a=this.xb;return null==this.Qd?a:Math.round(a/this.Qd)*this.Qd};ty.Hh=function(a){if(this.dc!=a){var b=this.qc;this.qc=!0;this.dc=a;a+this.xb>this.Ob&&(this.xb=this.Ob-this.dc);a>this.la&&this.nb(a);a>this.Ob&&(this.xb=0,this.Gh(a),this.nb(a));(this.qc=b)||this.te||this.dispatchEvent("change")}};ty.Ma=function(){return tyim(this,this.dc)};
ty.Gh=function(a){a=tyim(this,a);if(this.Ob!=a){var b=this.qc;this.qc=!0;this.Ob=a;a<this.la+this.xb&&this.nb(a-this.xb);a<this.dc&&(this.xb=0,this.Hh(a),this.nb(this.Ob));a<this.dc+this.xb&&(this.xb=this.Ob-this.dc);(this.qc=b)||this.te||this.dispatchEvent("change")}};ty.Va=function(){return tyim(this,this.Ob)};ty.ff=function(){return this.Qd};var tyim=function(a,b){return null==a.Qd?b:a.dc+Math.round((b-a.dc)/a.Qd)*a.Qd};chrome.i18n.getMessage("1592343229807767687");chrome.i18n.getMessage("5851160910663331658");new tyYj(1);var tyjm=tyfj.Ua().Si();Math.max(6E4*tyL(tyjm,6),12E4);chrome.i18n.getMessage("2696899443781392801");var tykm=function(){};tyi(tykm,tyZk);tyda(tykm);tykm.prototype.F=function(a){var b=a.H().F("span",this.fe(a).join(" "));tylm(this,b,a.Vc);return b};tykm.prototype.fa=function(a,b){b=tykm.B.fa.call(this,a,b);var c=ty_j(b),d=!1;tym(c,tymm(this,null))?d=null:tym(c,tymm(this,!0))?d=!0:tym(c,tymm(this,!1))&&(d=!1);a.Vc=d;ty0(b,"checked",null==d?"mixed":1==d?"true":"false");return b};tykm.prototype.vd=function(){return"checkbox"};
var tylm=function(a,b,c){if(b){var d=tymm(a,c);ty0j(b,d)||(tyab(tynm,function(a){a=tymm(this,a);ty_(b,a,a==d)},a),ty0(b,"checked",null==c?"mixed":1==c?"true":"false"))}};tykm.prototype.M=function(){return"t-m"};var tymm=function(a,b){var c=a.M();if(1==b)return c+"-checked";if(0==b)return c+"-unchecked";if(null==b)return c+"-undetermined";throw Error("Invalid checkbox state: "+b);};var tyom=function(a,b,c){c=c||tykm.Ua();ty4.call(this,null,c,b);this.Vc=tyb(a)?a:!1};tyi(tyom,ty4);var tynm={Ru:!0,dx:!1,ex:null};ty=tyom.prototype;ty.bc=null;ty.gd=function(){return 1==this.Vc};ty.Hf=function(a){a!=this.Vc&&(this.Vc=a,tylm(this.Ec(),this.A(),this.Vc))};ty.toggle=function(){this.Hf(this.Vc?!1:!0)};
ty.J=function(){tyom.B.J.call(this);if(this.Mg){var a=this.getHandler();this.bc&&a.listen(this.bc,"click",this.Zi).listen(this.bc,"mouseover",this.ne).listen(this.bc,"mouseout",this.Ng).listen(this.bc,"mousedown",this.le).listen(this.bc,"mouseup",this.oe);a.listen(this.A(),"click",this.Zi)}a=this.C;if(this.bc&&a!=this.bc&&tysa(ty5j(a,"label"))){if(!this.bc.id){var b=this.bc,c;c=this.getId()+".lbl";b.id=c}ty0(a,"labelledby",this.bc.id)}};
ty.setEnabled=function(a){tyom.B.setEnabled.call(this,a);if(a=this.A())a.tabIndex=this.isEnabled()?0:-1};ty.Zi=function(a){a.stopPropagation();var b=this.Vc?"uncheck":"check";this.isEnabled()&&!a.target.href&&this.dispatchEvent(b)&&(a.preventDefault(),this.toggle(),this.dispatchEvent("change"))};ty.oc=function(a){32==a.keyCode&&(this.Kc(a),this.Zi(a));return!1};ty7k("t-m",function(){return new tyom});chrome.i18n.getMessage("3224702327278720862");var typm=function(a,b){tyo.call(this);this.zl=this.ql=null;this.un=b;this.ud=[];if(a>this.un)throw Error("[goog.structs.SimplePool] Initial cannot be greater than max");for(var c=0;c<a;c++)this.ud.push(this.We())};tyi(typm,tyo);var tyqm=function(a){return a.ud.length?a.ud.pop():a.We()},tyrm=function(a,b){a.ud.length<a.un?a.ud.push(b):a.Ei(b)};typm.prototype.We=function(){return this.ql?this.ql():{}};typm.prototype.Ei=function(a){if(this.zl)this.zl(a);else if(tyf(a))if(tye(a.S))a.S();else for(var b in a)delete a[b]};
typm.prototype.D=function(){typm.B.D.call(this);for(var a=this.ud;a.length;)this.Ei(a.pop());delete this.ud};var tyum=function(){this.Jb=[];this.Hd=new tyn;this.pu=this.Jk=this.Kk=this.fu=0;this.Nh=new tyn;this.dq=this.Qo=0;this.yj=1;this.af=new typm(0,4E3);this.af.We=function(){return new tysm};this.Ho=new typm(0,50);this.Ho.We=function(){return new tytm};var a=this;this.mf=new typm(0,2E3);this.mf.We=function(){return String(a.yj++)};this.mf.Ei=function(){};this.nq=3};tyum.prototype.bi=1E3;var tytm=function(){this.Yh=this.time=this.count=0};
tytm.prototype.toString=function(){var a=[];a.push(this.type," ",this.count," (",Math.round(10*this.time)/10," ms)");this.Yh&&a.push(" [VarAlloc = ",this.Yh,"]");return a.join("")};var tysm=function(){},tyxm=function(a,b,c,d){var e=[];-1==c?e.push("    "):e.push(tyvm(a.eventTime-c));e.push(" ",tywm(a.eventTime-b));0==a.bf?e.push(" Start        "):1==a.bf?(e.push(" Done "),e.push(tyvm(a.gu-a.startTime)," ms ")):e.push(" Comment      ");e.push(d,a);0<a.Rf&&e.push("[VarAlloc ",a.Rf,"] ");return e.join("")};
tysm.prototype.toString=function(){return null==this.type?this.comment:"["+this.type+"] "+this.comment};var tyym=function(){var a=ty7.Ox;return a&&a.isTracing()?a.totalVarAlloc:-1};
tyum.prototype.toString=function(){for(var a=[],b=-1,c=[],d=0;d<this.Jb.length;d++){var e=this.Jb[d];1==e.bf&&c.pop();a.push(" ",tyxm(e,this.fu,b,c.join("")));b=e.eventTime;a.push("\n");0==e.bf&&c.push("|  ")}if(0!=this.Hd.zb()){var f=tyh();a.push(" Unstopped timers:\n");ty$a(this.Hd,function(b){a.push("  ",b," (",f-b.startTime," ms, started at ",tywm(b.startTime),")\n")})}b=this.Nh.$b();for(d=0;d<b.length;d++)c=this.Nh.get(b[d]),1<c.count&&a.push(" TOTAL ",c,"\n");a.push("Total tracers created ",
this.Qo,"\n","Total comments created ",this.dq,"\n","Overhead start: ",this.Kk," ms\n","Overhead end: ",this.Jk," ms\n","Overhead comment: ",this.pu," ms\n");return a.join("")};var tyvm=function(a){a=Math.round(a);var b="";1E3>a&&(b=" ");100>a&&(b="  ");10>a&&(b="   ");return b+a},tywm=function(a){a=Math.round(a);return String(100+a/1E3%60).substring(1,3)+"."+String(1E3+a%1E3).substring(1,4)},ty7=new tyum;var tyzm=function(a){tyo.call(this);this.yq=a;this.yu=!0;this.Zs=!1};tyi(tyzm,tyo);tyzm.prototype.Ep=!1;tyzm.prototype.bp=function(a){return tyAm(this,a)};tyzm.prototype.unwrap=function(a){return a[tyBm(this,!1)]||a};
var tyBm=function(a,b){return(b?"__wrapper_":"__protected_")+tyja(a)+"__"},tyAm=function(a,b){var c=tyBm(a,!0);b[c]||((b[c]=tyCm(a,b))[tyBm(a,!1)]=b);return b[c]},tyCm=function(a,b){var c=a.Ep;if(c)var d=tySe(15);var e=function(){if(a.isDisposed())return b.apply(this,arguments);if(c){var e=d,g=[];g.push("##PE_STACK_START##");g.push(e.replace(/(\r\n|\r|\n)/g,"##STACK_BR##"));g.push("##PE_STACK_END##");var h="protectedEntryPoint: "+g.join(""),e=tyh(),k=tyym(),l=ty7.Hd.zb();if(ty7.Jb.length+l>ty7.bi){if(ty7.Jb.length>
ty7.bi/2){for(var m=0;m<ty7.Jb.length;m++)g=ty7.Jb[m],g.id&&tyrm(ty7.mf,g.id),tyrm(ty7.af,g);ty7.Jb.length=0}l>ty7.bi/2&&ty7.Hd.clear()}tyVe("Start : "+h);g=tyqm(ty7.af);g.Rf=k;g.bf=0;g.id=Number(tyqm(ty7.mf));g.comment=h;g.type=void 0;ty7.Jb.push(g);ty7.Hd.set(String(g.id),g);ty7.Qo++;h=tyh();g.startTime=g.eventTime=h;ty7.Kk+=h-e;e=g.id}try{return b.apply(this,arguments)}catch(n){a.yq(n);if(!a.yu)throw a.Zs&&("object"===typeof n?n.message="Error in protected function: "+n.message:n="Error in protected function: "+
n),n;throw new tyDm(n);}finally{if(c&&(h=e,e=tyh(),k=ty7.nq,g=ty7.Hd.get(String(h)),null!=g)){ty7.Hd.remove(String(h));var p,h=e-g.startTime;if(h<k)for(k=ty7.Jb.length-1;0<=k;k--){if(ty7.Jb[k]==g){ty7.Jb.splice(k,1);tyrm(ty7.mf,g.id);tyrm(ty7.af,g);break}}else p=tyqm(ty7.af),p.bf=1,p.startTime=g.startTime,p.comment=g.comment,p.type=g.type,p.gu=p.eventTime=e,ty7.Jb.push(p);k=g.type;l=null;k&&(l=ty7,m=l.Nh.get(k),m||(m=tyqm(l.Ho),m.type=k,l.Nh.set(k,m)),l=m,l.count++,l.time+=h);p&&(tyVe("Stop : "+p.comment),
p.Rf=tyym(),l&&(l.Yh+=p.Rf-g.Rf));p=tyh();ty7.Jk+=p-e}}};e[tyBm(a,!1)]=b;return e},tyEm=function(a,b){var c=tyba("window"),d=c[b];c[b]=function(b,c){tyd(b)&&(b=tyma(tyoa,b));b=tyAm(a,b);return d.call?d.call(this,b,c):d(b,c)};c[b][tyBm(a,!1)]=d};tyzm.prototype.D=function(){var a=tyba("window");a.setTimeout=this.unwrap(a.setTimeout);a.setInterval=this.unwrap(a.setInterval);tyzm.B.D.call(this)};
var tyDm=function(a){tyj.call(this,"Error in protected function: "+(a&&a.message?String(a.message):String(a)));(a=(this.cause=a)&&a.stack)&&tyd(a)&&(this.stack=a)};tyi(tyDm,tyj);chrome.i18n.getMessage("1911052916191472518");chrome.i18n.getMessage("2818892450650920953");new tyE;chrome.i18n.getMessage("1357694012211254786");new tyw;var tyFm=function(a,b,c){this.Ed=b.name||null;this.ol=b.Lx;this.$c={};for(a=0;a<c.length;a++)b=c[a],this.$c[b.Mb()]=b};tyFm.prototype.getName=function(){return this.Ed};tyFm.prototype.wd=function(){return this.ol?this.ol.W():null};var tyGm=function(a){a=tybb(a.$c);ty3a(a,function(a,c){return a.Mb()-c.Mb()});return a};var tyHm=function(a,b,c){this.O=a;this.iu=b;this.Ed=c.name;this.Vr=!!c.Yx;this.Ac=c.Zc;this.vs=c.type};tyHm.prototype.Mb=function(){return this.iu};tyHm.prototype.wd=function(){return this.O.prototype.W()};tyHm.prototype.getName=function(){return this.Ed};tyHm.prototype.Vg=function(){return this.Vr};var tyIm=function(){this.Ra={};this.$c=this.W().$c;this.vb=this.rn=null},tyJm=function(a,b,c){c=c||a;for(var d in a.Ra){var e=Number(d);a.$c[e]||b.call(c,e,a.Ra[d])}};ty=tyIm.prototype;ty.has=function(a){a.wd();this.W();return null!=this.Ra[a.Mb()]};ty.get=function(a,b){a.wd();this.W();return tyKm(this,a.Mb(),b)};ty.set=function(a,b){a.wd();this.W();tyLm(this,a.Mb(),b)};ty.add=function(a,b){a.wd();this.W();tyMm(this,a.Mb(),b)};
ty.clear=function(a){a.wd();this.W();a=a.Mb();delete this.Ra[a];this.vb&&delete this.vb[a]};ty.wa=function(a){if(!a||this.constructor!=a.constructor)return!1;for(var b=tyGm(this.W()),c=0;c<b.length;c++){var d=b[c],e=d.Mb();if(null!=this.Ra[e]!=(null!=a.Ra[e]))return!1;if(null!=this.Ra[e]){var f=11==d.Ac||10==d.Ac,g=tyNm(this,e),e=tyNm(a,e);if(d.Vg()){if(g.length!=e.length)return!1;for(d=0;d<g.length;d++){var h=g[d],k=e[d];if(f?!h.wa(k):h!=k)return!1}}else if(f?!g.wa(e):g!=e)return!1}}return!0};
var tyOm=function(a,b){for(var c=tyGm(a.W()),d=0;d<c.length;d++){var e=c[d],f=e.Mb();if(null!=b.Ra[f]){a.vb&&delete a.vb[e.Mb()];var g=11==e.Ac||10==e.Ac;if(e.Vg())for(var e=tyNm(b,f)||[],h=0;h<e.length;h++)tyMm(a,f,g?e[h].clone():e[h]);else e=tyNm(b,f),g?(g=tyNm(a,f))?tyOm(g,e):tyLm(a,f,e.clone()):tyLm(a,f,e)}}};tyIm.prototype.clone=function(){var a=new this.constructor;a!=this&&(a.Ra={},a.vb&&(a.vb={}),tyOm(a,this));return a};
var tyNm=function(a,b){var c=a.Ra[b];return null==c?null:a.rn?b in a.vb?a.vb[b]:(c=a.rn.Nx(a,a.$c[b],c),a.vb[b]=c):c},tyKm=function(a,b,c){var d=tyNm(a,b);return a.$c[b].Vg()?d[c||0]:d},tyLm=function(a,b,c){a.Ra[b]=c;a.vb&&(a.vb[b]=c)},tyMm=function(a,b,c){a.Ra[b]||(a.Ra[b]=[]);a.Ra[b].push(c);a.vb&&delete a.vb[b]},tyPm=function(a,b){var c=[],d=b[0],e;for(e in b)0!=e&&c.push(new tyHm(a,e,b[e]));return new tyFm(0,d,c)};var tyQm=function(){tyIm.call(this)},tyRm;tyi(tyQm,tyIm);tyQm.prototype.Nd=function(a){tyLm(this,1,a)};tyQm.prototype.Od=function(a){tyLm(this,2,a)};var tySm=function(){tyIm.call(this)},tyTm;tyi(tySm,tyIm);tySm.prototype.Wi=function(){return tyKm(this,1)};tySm.prototype.setVersion=function(a){tyLm(this,1,a)};tyQm.prototype.W=function(){tyRm||(tyRm=tyPm(tyQm,{0:{name:"Version",wg:"buzz.channel.Version"},1:{name:"major_version",Zc:5,type:Number},2:{name:"minor_version",Zc:5,type:Number}}));return tyRm};
tyQm.ctor=tyQm;tyQm.ctor.W=tyQm.prototype.W;tySm.prototype.W=function(){tyTm||(tyTm=tyPm(tySm,{0:{name:"ProtocolVersion",wg:"buzz.channel.ProtocolVersion"},1:{name:"version",Zc:11,type:tyQm}}));return tyTm};tySm.ctor=tySm;tySm.ctor.W=tySm.prototype.W;var tyUm=function(){};var tyVm=function(a,b){this.Wo=!!b};tyi(tyVm,tyUm);tyVm.prototype.Qj=function(a){var b=new tyWm;tyXm(this,a,b);return b.toString()};
var tyXm=function(a,b,c){var d=tyGm(b.W());tyl(d,function(a){if(b.has(a)){var d;a.wd();b.W();d=a.Mb();d=b.$c[d].Vg()?null!=b.Ra[d]?b.Ra[d].length:0:null!=b.Ra[d]?1:0;for(var g=0;g<d;++g){c.append(a.getName());11==a.Ac||10==a.Ac?(c.append(" {"),tyYm(c),c.Gc+=2):c.append(": ");tyZm(this,b.get(a,g),a,c);if(11==a.Ac||10==a.Ac)c.Gc-=2,c.append("}");tyYm(c)}}},a);tyJm(b,function(a,b){ty_m(this,a,b,c)},a)},ty_m=function(a,b,c,d){if(null!=c)if(tyc(c))tyl(c,function(a){ty_m(this,b,a,d)},a);else{if(tyf(c)){d.append(b);
d.append(" {");tyYm(d);d.Gc+=2;if(c instanceof tyIm)tyXm(a,c,d);else for(var e in c)ty_m(a,tyMa(e),c[e],d);d.Gc-=2;d.append("}")}else tyd(c)&&(c=tyFa(c)),d.append(b),d.append(": "),d.append(c.toString());tyYm(d)}},tyZm=function(a,b,c,d){switch(c.Ac){case 1:case 2:case 3:case 4:case 5:case 13:case 6:case 7:case 8:case 15:case 16:case 17:case 18:d.append(b);break;case 12:case 9:b=tyFa(b.toString());d.append(b);break;case 14:if(!a.Wo){var e=!1;tyab(c.vs,function(a,c){a==b&&(d.append(c),e=!0)})}e&&!a.Wo||
d.append(b.toString());break;case 10:case 11:tyXm(a,b,d)}},tyWm=function(){this.Gc=0;this.tb=[];this.Oj=!0};tyWm.prototype.toString=function(){return this.tb.join("")};tyWm.prototype.append=function(a){if(this.Oj){for(var b=0;b<this.Gc;++b)this.tb.push(" ");this.Oj=!1}this.tb.push(a.toString())};var tyYm=function(a){a.tb.push("\n");a.Oj=!0};var ty0m=new tyVm;tyIm.prototype.toString=function(){return ty0m.Qj(this)};(function(){var a;return tyRb?(a=/Windows NT ([0-9.]+)/,(a=a.exec(tyLb))?a[1]:"0"):tyQb?(a=/10[_.][0-9_.]+/,(a=a.exec(tyLb))?a[0].replace(/_/g,"."):"10"):tyUb?(a=/Android\s+([^\);]+)(\)|;)/,(a=a.exec(tyLb))?a[1]:""):tyVb||tyWb?(a=/(?:iPhone|CPU)\s+OS\s+(\S+)/,(a=a.exec(tyLb))?a[1].replace(/_/g,"."):""):""})();var ty1m=new tySm,ty2m=new tyQm;ty2m.Nd(3);ty2m.Od(2);ty1m.setVersion(ty2m);var ty3m=new tyQm;ty3m.Nd(3);ty3m.Od(2);var ty4m=new tyQm;ty4m.Nd(3);ty4m.Od(2);new tyE([1,2,3]);new tyE([1,2]);var ty5m={1:"NativeMessagingTransport",2:"FrameElementMethodTransport",3:"IframeRelayTransport",4:"IframePollingTransport",5:"FlashTransport",6:"NixTransport",7:"DirectTransport"};var ty6m=function(a){tyo.call(this);this.sq=a||tyB()};tyi(ty6m,tyo);ty6m.prototype.To=0;ty6m.prototype.getWindow=function(){return this.sq.getWindow()};ty6m.prototype.getName=function(){return ty5m[String(this.To)]||""};var ty7m=function(a,b){ty6m.call(this,b);this.ib=a;this.ib.Qa.ye.qd();this.ib.Qa.ye.qd();this.yh=[]},ty8m;tyi(ty7m,ty6m);ty=ty7m.prototype;ty.To=4;ty.Jd=0;ty.Xo=!1;ty.Xf=3800;ty.send=function(a,b){var c=a+":"+b;if(!tyr||b.length<=this.Xf)this.yh.push("|"+c);else for(var d=b.length,e=Math.ceil(d/this.Xf),f=0,g=1;f<d;)this.yh.push(","+g+"/"+e+"|"+c.substr(f,this.Xf)),g++,f+=this.Xf;!this.Xo&&this.yh.length&&(c=this.yh.shift(),++this.Jd,this.Vx.send(this.Jd+c),this.Xo=!0)};
ty.D=function(){ty7m.B.D.call(this);var a=ty9m;tyYa(a,this.ts);tyYa(a,this.Bp);this.ts=this.Bp=null;tyyd(this.ss);tyyd(this.Ap);this.ss=this.Ap=null};var ty9m=[],ty$m=tyg(function(){var a=ty9m,b,c=!1;try{for(var d=0;b=a[d];d++)c=c||b.receive()}catch(e){if(b.$x.ib.Xx(),!a.length)return}a=tyh();c&&(ty8m=a);window.setTimeout(ty$m,1E3>a-ty8m?10:100)},ty7m);var tyan=function(){tyIm.call(this)},tybn;tyi(tyan,tyIm);tyan.prototype.Nd=function(a){tyLm(this,1,a)};tyan.prototype.Od=function(a){tyLm(this,2,a)};var tycn=function(){tyIm.call(this)},tydn;tyi(tycn,tyIm);tycn.prototype.Wi=function(){return tyKm(this,1)};tycn.prototype.setVersion=function(a){tyLm(this,1,a)};var tyen=function(){tyIm.call(this)},tyfn;tyi(tyen,tyIm);tyen.prototype.Ot=function(){tyLm(this,1,1)};tyen.prototype.getName=function(){return tyKm(this,2)};
tyen.prototype.ro=function(a){tyLm(this,2,a)};tyan.prototype.W=function(){tybn||(tybn=tyPm(tyan,{0:{name:"Version",wg:"ipc.invalidation.Version"},1:{name:"major_version",Zc:5,type:Number},2:{name:"minor_version",Zc:5,type:Number}}));return tybn};tyan.ctor=tyan;tyan.ctor.W=tyan.prototype.W;tycn.prototype.W=function(){tydn||(tydn=tyPm(tycn,{0:{name:"ProtocolVersion",wg:"ipc.invalidation.ProtocolVersion"},1:{name:"version",Zc:11,type:tyan}}));return tydn};tycn.ctor=tycn;tycn.ctor.W=tycn.prototype.W;
tyen.prototype.W=function(){tyfn||(tyfn=tyPm(tyen,{0:{name:"ObjectIdP",wg:"ipc.invalidation.ObjectIdP"},1:{name:"source",Zc:5,type:Number},2:{name:"name",Zc:12,type:String}}));return tyfn};tyen.ctor=tyen;tyen.ctor.W=tyen.prototype.W;var ty8=function(a,b){this.oa=a|0;this.T=b|0},tygn={},tyhn=function(a){if(-128<=a&&128>a){var b=tygn[a];if(b)return b}b=new ty8(a|0,0>a?-1:0);-128<=a&&128>a&&(tygn[a]=b);return b},tymn=function(a){return isNaN(a)||!isFinite(a)?tyin:a<=-tyjn?tykn:a+1>=tyjn?tyln:0>a?ty9(tymn(-a)):new ty8(a%4294967296|0,a/4294967296|0)},tyjn=4294967296*4294967296/2,tyin=tyhn(0),tynn=tyhn(1),tyon=tyhn(-1),tyln=new ty8(-1,2147483647),tykn=new ty8(0,-2147483648),typn=tyhn(16777216);
ty8.prototype.toString=function(a){a=a||10;if(2>a||36<a)throw Error("radix out of range: "+a);if(tyqn(this))return"0";if(0>this.T){if(this.wa(tykn)){var b=tymn(a),c=tyrn(this,b),b=tysn(c.multiply(b),this);return c.toString(a)+b.oa.toString(a)}return"-"+ty9(this).toString(a)}for(var c=tymn(Math.pow(a,6)),b=this,d="";;){var e=tyrn(b,c),f=tysn(b,e.multiply(c)).oa.toString(a),b=e;if(tyqn(b))return f+d;for(;6>f.length;)f="0"+f;d=""+f+d}};
var tytn=function(a){return 0<=a.oa?a.oa:4294967296+a.oa},tyqn=function(a){return 0==a.T&&0==a.oa};ty8.prototype.wa=function(a){return this.T==a.T&&this.oa==a.oa};ty8.prototype.compare=function(a){if(this.wa(a))return 0;var b=0>this.T,c=0>a.T;return b&&!c?-1:!b&&c?1:0>tysn(this,a).T?-1:1};var ty9=function(a){return a.wa(tykn)?tykn:(new ty8(~a.oa,~a.T)).add(tynn)};
ty8.prototype.add=function(a){var b=this.T>>>16,c=this.T&65535,d=this.oa>>>16,e=a.T>>>16,f=a.T&65535,g=a.oa>>>16,h;h=0+((this.oa&65535)+(a.oa&65535));a=0+(h>>>16);a+=d+g;d=0+(a>>>16);d+=c+f;c=0+(d>>>16);c=c+(b+e)&65535;return new ty8((a&65535)<<16|h&65535,c<<16|d&65535)};var tysn=function(a,b){return a.add(ty9(b))};
ty8.prototype.multiply=function(a){if(tyqn(this)||tyqn(a))return tyin;if(this.wa(tykn))return 1==(a.oa&1)?tykn:tyin;if(a.wa(tykn))return 1==(this.oa&1)?tykn:tyin;if(0>this.T)return 0>a.T?ty9(this).multiply(ty9(a)):ty9(ty9(this).multiply(a));if(0>a.T)return ty9(this.multiply(ty9(a)));if(0>this.compare(typn)&&0>a.compare(typn))return tymn((4294967296*this.T+tytn(this))*(4294967296*a.T+tytn(a)));var b=this.T>>>16,c=this.T&65535,d=this.oa>>>16,e=this.oa&65535,f=a.T>>>16,g=a.T&65535,h=a.oa>>>16;a=a.oa&
65535;var k,l,m,n;n=0+e*a;m=0+(n>>>16);m+=d*a;l=0+(m>>>16);m=(m&65535)+e*h;l+=m>>>16;m&=65535;l+=c*a;k=0+(l>>>16);l=(l&65535)+d*h;k+=l>>>16;l&=65535;l+=e*g;k+=l>>>16;l&=65535;k=k+(b*a+c*h+d*g+e*f)&65535;return new ty8(m<<16|n&65535,k<<16|l)};
var tyrn=function(a,b){if(tyqn(b))throw Error("division by zero");if(tyqn(a))return tyin;if(a.wa(tykn)){if(b.wa(tynn)||b.wa(tyon))return tykn;if(b.wa(tykn))return tynn;var c;c=1;if(0==c)c=a;else{var d=a.T;c=32>c?new ty8(a.oa>>>c|d<<32-c,d>>c):new ty8(d>>c-32,0<=d?0:-1)}c=tyrn(c,b).shiftLeft(1);if(c.wa(tyin))return 0>b.T?tynn:tyon;d=tysn(a,b.multiply(c));return c.add(tyrn(d,b))}if(b.wa(tykn))return tyin;if(0>a.T)return 0>b.T?tyrn(ty9(a),ty9(b)):ty9(tyrn(ty9(a),b));if(0>b.T)return ty9(tyrn(a,ty9(b)));
for(var e=tyin,d=a;0<=d.compare(b);){c=Math.max(1,Math.floor((4294967296*d.T+tytn(d))/(4294967296*b.T+tytn(b))));for(var f=Math.ceil(Math.log(c)/Math.LN2),f=48>=f?1:Math.pow(2,f-48),g=tymn(c),h=g.multiply(b);0>h.T||0<h.compare(d);)c-=f,g=tymn(c),h=g.multiply(b);tyqn(g)&&(g=tynn);e=e.add(g);d=tysn(d,h)}return e};ty8.prototype.shiftLeft=function(a){a&=63;if(0==a)return this;var b=this.oa;return 32>a?new ty8(b<<a,this.T<<a|b>>>32-a):new ty8(0,b<<a-32)};var tyun=new tycn,tyvn=new tyan;tyvn.Nd(3);tyvn.Od(2);tyun.setVersion(tyvn);var tywn=new tyan;tywn.Nd(3);tywn.Od(2);var tyxn=new tyan;tyxn.Nd(3);tyxn.Od(20140825);var tyyn=new tyen;tyyn.ro("");tyyn.Ot();var tyzn=[];typa("invalidation.getDebugJson",function(){var a={};tyl(tyzn,function(b){a[b.Jx||b.Wx]=b.Zx.Px()});return a});var tyAn=function(){tyw.call(this);this.Lc=1};tyi(tyAn,tyw);tyAn.prototype.to=function(a){this.Lc!=a&&(this.Lc=a,this.dispatchEvent("fa"))};tyAn.prototype.Dg=function(){return this.Lc};var tyBn=function(a,b){tyw.call(this);this.C=a;var c=tyAd(this.C)?this.C:this.C?this.C.body:null;this.Wr=!!c&&tyWi(c);this.tn=tyv(this.C,tys?"DOMMouseScroll":"mousewheel",this,b)};tyi(tyBn,tyw);
tyBn.prototype.handleEvent=function(a){var b=0,c=0,d=0;a=a.lc();if("mousewheel"==a.type){c=1;if(tyr||tyt&&(tyRb||tyu("532.0")))c=40;d=tyCn(-a.wheelDelta,c);tyb(a.wheelDeltaX)?(b=tyCn(-a.wheelDeltaX,c),c=tyCn(-a.wheelDeltaY,c)):c=d}else d=a.detail,100<d?d=3:-100>d&&(d=-3),tyb(a.axis)&&a.axis===a.HORIZONTAL_AXIS?b=d:c=d;tyga(this.vn)&&(b=ty6a(b,-this.vn,this.vn));tyga(this.wn)&&(c=ty6a(c,-this.wn,this.wn));this.Wr&&(b=-b);b=new tyDn(d,a,b,c);this.dispatchEvent(b)};
var tyCn=function(a,b){return tyt&&(tyQb||tySb)&&0!=a%b?a:a/b};tyBn.prototype.D=function(){tyBn.B.D.call(this);tytc(this.tn);this.tn=null};var tyDn=function(a,b,c,d){ty8b.call(this,b);this.type="mousewheel";this.detail=a;this.deltaX=c;this.deltaY=d};tyi(tyDn,ty8b);var ty$=function(a,b){ty1.call(this,a);this.hi=null;this.Y=new tyhm;this.Yr=b||ty4a;tyv(this.Y,"change",this.Pm,!1,this)};tyi(ty$,ty1);ty=ty$.prototype;ty.ka="horizontal";ty.Tg=!1;ty.An=!1;ty.hc=10;ty.hh=0;ty.Ug=!0;ty.ih=0;ty.mp=1E3;ty.$a=!0;ty.yb=!1;ty.F=function(){ty$.B.F.call(this);var a=this.H().F("div",this.M(this.ka));this.kb(a)};
ty.kb=function(a){ty$.B.kb.call(this,a);tyY(a,this.M(this.ka));a=this.A();var b=tykd(document,null,"t-Wb-Xb",a)[0];b||(b=this.kq(),a.appendChild(b));this.P=this.lb=b;ty4j(this.A(),"slider");tyEn(this)};ty.J=function(){ty$.B.J.call(this);this.pb=new tyak(this.P);this.Xb=new tyak(this.lb);this.pb.Yc(this.yb);this.Xb.Yc(this.yb);this.pb.Ai=this.Xb.Ai=tyca;this.Ea=new tyTk(this.A());tyFn(this,!0);this.A().tabIndex=0;this.Vh()};
var tyFn=function(a,b){b?(a.getHandler().listen(a.pb,"beforedrag",a.Jg).listen(a.Xb,"beforedrag",a.Jg).listen(a.pb,["start","end"],a.Og).listen(a.Xb,["start","end"],a.Og).listen(a.Ea,"key",a.Fc).listen(a.A(),"click",a.Lg).listen(a.A(),"mousedown",a.Lg),a.Ug&&tyGn(a,!0)):(a.getHandler().Z(a.pb,"beforedrag",a.Jg).Z(a.Xb,"beforedrag",a.Jg).Z(a.pb,["start","end"],a.Og).Z(a.Xb,["start","end"],a.Og).Z(a.Ea,"key",a.Fc).Z(a.A(),"click",a.Lg).Z(a.A(),"mousedown",a.Lg),a.Ug&&tyGn(a,!1))};ty=ty$.prototype;
ty.xa=function(){ty$.B.xa.call(this);tyEb(this.pb,this.Xb,this.Ea,this.Dd)};ty.Jg=function(a){var b=a.Fi==this.pb?this.P:this.lb,c;"vertical"==this.ka?(c=this.A().clientHeight-b.offsetHeight,c=(c-a.top)/c*(this.Va()-this.Ma())+this.Ma()):c=a.left/(this.A().clientWidth-b.offsetWidth)*(this.Va()-this.Ma())+this.Ma();c=a.Fi==this.pb?Math.min(Math.max(c,this.Ma()),this.ja()+this.bd()):Math.min(Math.max(c,this.ja()),this.Va());tyHn(this,b,c)};
ty.Og=function(a){var b="start"==a.type;ty_(this.A(),"t-Wb-dragging",b);ty_(a.target.handle,"t-Wb-Xb-dragging",b);a=a.Fi==this.pb;b?(this.dispatchEvent("sb"),this.dispatchEvent(a?"ob":"qb")):(this.dispatchEvent("tb"),this.dispatchEvent(a?"pb":"rb"))};
ty.Fc=function(a){var b=!0;switch(a.keyCode){case 36:tyIn(this,this.Ma());break;case 35:tyIn(this,this.Va());break;case 33:tyJn(this,this.hc);break;case 34:tyJn(this,-this.hc);break;case 37:var c=this.yb&&this.Ab()?1:-1;tyJn(this,a.shiftKey?c*this.hc:c*this.Uf);break;case 40:tyJn(this,a.shiftKey?-this.hc:-this.Uf);break;case 39:c=this.yb&&this.Ab()?-1:1;tyJn(this,a.shiftKey?c*this.hc:c*this.Uf);break;case 38:tyJn(this,a.shiftKey?this.hc:this.Uf);break;default:b=!1}b&&a.preventDefault()};
ty.Lg=function(a){this.A().focus&&this.A().focus();var b=a.target;tyCd(this.P,b)||tyCd(this.lb,b)||(b="click"==a.type,b&&tyh()<this.ih+this.mp||(b||(this.ih=tyh()),this.An?tyIn(this,tyKn(this,a)):(this.Fk(a),this.Qb=tyLn(this,tyKn(this,a)),this.$m="vertical"==this.ka?this.Zg<this.Qb.offsetTop:this.Zg>tyMn(this,this.Qb)+this.Qb.offsetWidth,a=tyA(this.A()),this.getHandler().listen(a,"mouseup",this.Ek,!0).listen(this.A(),"mousemove",this.Fk),this.ed||(this.ed=new tyfe(200),this.getHandler().listen(this.ed,
"tick",this.Sm)),this.Sm(),this.ed.start())))};ty.Om=function(a){tyJn(this,(0<a.detail?-1:1)*this.Uf);a.preventDefault()};ty.Sm=function(){var a;if("vertical"==this.ka){var b=this.Zg,c=this.Qb.offsetTop;this.$m?b<c&&(a=tyNn(this,this.Qb)+this.hc):b>c+this.Qb.offsetHeight&&(a=tyNn(this,this.Qb)-this.hc)}else b=this.Zg,c=tyMn(this,this.Qb),this.$m?b>c+this.Qb.offsetWidth&&(a=tyNn(this,this.Qb)+this.hc):b<c&&(a=tyNn(this,this.Qb)-this.hc);tyb(a)&&tyHn(this,this.Qb,a)};
ty.Ek=function(){this.ed&&this.ed.stop();var a=tyA(this.A());this.getHandler().Z(a,"mouseup",this.Ek,!0).Z(this.A(),"mousemove",this.Fk)};var tyOn=function(a,b){var c,d=a.A();c=tyRi(b);d=tyRi(d);c=new tyz(c.x-d.x,c.y-d.y);return"vertical"==a.ka?c.y:a.yb&&a.Ab()?a.A().clientWidth-c.x:c.x};ty$.prototype.Fk=function(a){this.Zg=tyOn(this,a)};
var tyKn=function(a,b){var c=a.Ma(),d=a.Va();if("vertical"==a.ka){var e=a.P.offsetHeight,f=a.A().clientHeight-e,e=tyOn(a,b)-e/2;return(d-c)*(f-e)/f+c}e=a.P.offsetWidth;f=a.A().clientWidth-e;e=tyOn(a,b)-e/2;return(d-c)*e/f+c},tyNn=function(a,b){if(b==a.P)return a.Y.ja();if(b==a.lb)return a.Y.ja()+a.Y.bd();throw Error("Illegal thumb element. Neither minThumb nor maxThumb");};ty$.prototype.qf=function(){return this.pb.qf()||this.Xb.qf()};
var tyJn=function(a,b){Math.abs(b)<a.ff()&&(b=(0==b?0:0>b?-1:1)*a.ff());var c=tyNn(a,a.P)+b,d=tyNn(a,a.lb)+b,c=ty6a(c,a.Ma(),a.Va()-a.hh),d=ty6a(d,a.Ma()+a.hh,a.Va());tyPn(a,c,d-c)},tyHn=function(a,b,c){var d=tyim(a.Y,c);c=b==a.P?d:a.Y.ja();b=b==a.lb?d:a.Y.ja()+a.Y.bd();c>=a.Ma()&&b>=c+a.hh&&a.Va()>=b&&tyPn(a,c,b-c)},tyPn=function(a,b,c){a.Ma()<=b&&b<=a.Va()-c&&a.hh<=c&&c<=a.Va()-b&&(b!=a.ja()||c!=a.bd())&&(a.Y.te=!0,a.Y.Dh(0),a.Y.nb(b),a.Y.Dh(c),a.Y.te=!1,a.Pm())};ty$.prototype.Ma=function(){return this.Y.Ma()};
ty$.prototype.Hh=function(a){this.Y.Hh(a)};ty$.prototype.Va=function(){return this.Y.Va()};ty$.prototype.Gh=function(a){this.Y.Gh(a)};var tyLn=function(a,b){return b<=a.Y.ja()+a.Y.bd()/2?a.P:a.lb};ty$.prototype.Pm=function(){this.Vh();tyEn(this);this.dispatchEvent("change")};
ty$.prototype.Vh=function(){if(this.P&&!this.Tg){var a=tyQn(this,tyNn(this,this.P)),b=tyQn(this,tyNn(this,this.lb));if("vertical"==this.ka)this.P.style.top=a.y+"px",this.lb.style.top=b.y+"px",this.ra&&(a=tyRn(b.y,a.y,this.P.offsetHeight),this.ra.style.top=a.offset+"px",this.ra.style.height=a.size+"px");else{var c=this.yb&&this.Ab()?"right":"left";this.P.style[c]=a.x+"px";this.lb.style[c]=b.x+"px";this.ra&&(a=tyRn(a.x,b.x,this.P.offsetWidth),this.ra.style[c]=a.offset+"px",this.ra.style.width=a.size+
"px")}}};
var tyRn=function(a,b,c){var d=Math.ceil(c/2);return{offset:a+d,size:Math.max(b-a+c-2*d,0)}},tyQn=function(a,b){var c=new tyz;if(a.P){var d=a.Ma(),e=a.Va(),e=b==d&&d==e?0:(b-d)/(e-d);"vertical"==a.ka?(d=a.A().clientHeight-a.P.offsetHeight,e=Math.round(e*d),c.x=tyMn(a,a.P),c.y=d-e):(d=Math.round(e*(a.A().clientWidth-a.P.offsetWidth)),c.x=d,c.y=a.P.offsetTop)}return c},tyIn=function(a,b){b=ty6a(b,a.Ma(),a.Va());a.Tg&&a.ng.stop(!0);var c=new tyMl,d,e=tyLn(a,b),f=a.ja(),g=a.bd(),h=tyNn(a,e),k=tyQn(a,
h);d=a.ff();Math.abs(b-h)<d&&(b=ty6a(h+(b>h?d:-d),a.Ma(),a.Va()));tyHn(a,e,b);h=tyQn(a,tyNn(a,e));d="vertical"==a.ka?[tyMn(a,e),h.y]:[h.x,e.offsetTop];k=new tyXl(e,[k.x,k.y],d,100);k.Yc(a.yb);c.add(k);a.ra&&tySn(a,e,f,g,h,c);a.hi&&(e=tyTn(a.hi,f,b),tyl(e,function(a){c.add(a)}));a.ng=c;a.getHandler().listen(c,"end",a.wq);a.Tg=!0;c.play(!1)},tySn=function(a,b,c,d,e,f){var g=tyQn(a,c),h=tyQn(a,c+d);c=g;d=h;b==a.P?c=e:d=e;"vertical"==a.ka?(b=tyRn(h.y,g.y,a.P.offsetHeight),g=tyRn(d.y,c.y,a.P.offsetHeight),
e=new tyXl(a.ra,[tyMn(a,a.ra),b.offset],[tyMn(a,a.ra),g.offset],100),b=new tyZl(a.ra,b.size,g.size,100)):(b=tyRn(g.x,h.x,a.P.offsetWidth),g=tyRn(c.x,d.x,a.P.offsetWidth),e=new tyXl(a.ra,[b.offset,a.ra.offsetTop],[g.offset,a.ra.offsetTop],100),b=new tyYl(a.ra,b.size,g.size,100));e.Yc(a.yb);b.Yc(a.yb);f.add(e);f.add(b)};ty=ty$.prototype;ty.wq=function(){this.Tg=!1};
ty.setOrientation=function(a){if(this.ka!=a){var b=this.M(this.ka),c=this.M(a);this.ka=a;this.A()&&(a=this.A(),ty0j(a,b)&&(tyZ(a,b),tyY(a,c)),b=this.yb&&this.Ab()?"right":"left",this.P.style[b]=this.P.style.top="",this.lb.style[b]=this.lb.style.top="",this.ra&&(this.ra.style[b]=this.ra.style.top="",this.ra.style.width=this.ra.style.height=""),this.Vh())}};ty.lm=function(){return this.ka};
ty.D=function(){ty$.B.D.call(this);this.ed&&this.ed.S();delete this.ed;this.ng&&this.ng.S();delete this.ng;delete this.P;delete this.lb;this.ra&&delete this.ra;this.Y.S();delete this.Y;this.Ea&&(this.Ea.S(),delete this.Ea);this.Dd&&(this.Dd.S(),delete this.Dd);this.pb&&(this.pb.S(),delete this.pb);this.Xb&&(this.Xb.S(),delete this.Xb)};ty.Uf=1;ty.ff=function(){return this.Y.ff()};ty.ja=function(){return this.Y.ja()};ty.nb=function(a){tyHn(this,this.P,a)};ty.bd=function(){return this.Y.bd()};
ty.Dh=function(a){tyHn(this,this.lb,this.Y.ja()+a)};ty.da=function(a){tyW(this.A(),a);a&&this.Vh()};var tyEn=function(a){var b=a.A();b&&(ty0(b,"valuemin",a.Ma()),ty0(b,"valuemax",a.Va()),ty0(b,"valuenow",a.ja()),ty0(b,"valuetext",a.Yr(a.ja())||""))},tyUn=function(a){a.N&&0!=a.Ug&&tyGn(a,!1);a.Ug=!1},tyGn=function(a,b){b?(a.Dd||(a.Dd=new tyBn(a.A())),a.getHandler().listen(a.Dd,"mousewheel",a.Om)):a.getHandler().Z(a.Dd,"mousewheel",a.Om)};
ty$.prototype.setEnabled=function(a){this.$a!=a&&this.dispatchEvent(a?"enable":"disable")&&(this.$a=a,tyFn(this,a),a||this.Ek(),ty_(this.A(),"t-Wb-o",!a))};ty$.prototype.isEnabled=function(){return this.$a};var tyMn=function(a,b){return a.yb?ty$j(b):b.offsetLeft};var tyVn=function(a,b){ty$.call(this,a,b);this.Y.Dh(0)};tyi(tyVn,ty$);tyVn.prototype.M=function(a){return"vertical"==a?"t-Wb-vertical":"t-Wb-horizontal"};tyVn.prototype.kq=function(){var a=this.H().F("div","t-Wb-Xb");ty4j(a,"button");return a};/*

 Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
 This code may only be used under the BSD style license found at
 http://polymer.github.io/LICENSE.txt. The complete set of authors may be
 found at http://polymer.github.io/AUTHORS.txt. The complete set of
 contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt. Code
 distributed by Google as part of the polymer project is also subject to an
 additional IP rights grant found at http://polymer.github.io/PATENTS.txt.
*/
chrome.i18n.getMessage("2885588583451993603");new tyYj(1);new tyLj(1);chrome.i18n.getMessage("6588162415744257525");chrome.i18n.getMessage("595142360727489397");chrome.i18n.getMessage("2120603839336392434");chrome.i18n.getMessage("7586136400217442714");var tyWn={8:"backspace",9:"tab",13:"enter",16:"shift",17:"ctrl",18:"alt",19:"pause",20:"caps-lock",27:"esc",32:"space",33:"pg-up",34:"pg-down",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down",45:"insert",46:"delete",48:"0",49:"1",50:"2",51:"3",52:"4",53:"5",54:"6",55:"7",56:"8",57:"9",59:"semicolon",61:"equals",65:"a",66:"b",67:"c",68:"d",69:"e",70:"f",71:"g",72:"h",73:"i",74:"j",75:"k",76:"l",77:"m",78:"n",79:"o",80:"p",81:"q",82:"r",83:"s",84:"t",85:"u",86:"v",87:"w",88:"x",89:"y",90:"z",
93:"context",96:"num-0",97:"num-1",98:"num-2",99:"num-3",100:"num-4",101:"num-5",102:"num-6",103:"num-7",104:"num-8",105:"num-9",106:"num-multiply",107:"num-plus",109:"num-minus",110:"num-period",111:"num-division",112:"f1",113:"f2",114:"f3",115:"f4",116:"f5",117:"f6",118:"f7",119:"f8",120:"f9",121:"f10",122:"f11",123:"f12",186:"semicolon",187:"equals",189:"dash",188:",",190:".",191:"/",192:"`",219:"open-square-bracket",220:"\\",221:"close-square-bracket",222:"single-quote",224:"win"};var tyZn=function(a){tyw.call(this);this.Xe=this.Mf={};this.$g=0;this.ir=tykb(tyXn);this.ju=tykb(tyYn);this.Jp=!0;this.Fp=this.Kp=!1;this.os=!0;this.Ip=!1;this.fi=null;this.Ic=a;tyv(this.Ic,"keydown",this.Fc,!1,this);tys&&tyv(this.Ic,"keyup",this.Nm,!1,this);tyRb&&!tys&&(tyv(this.Ic,"keypress",this.Tm,!1,this),tyv(this.Ic,"keyup",this.Um,!1,this))},ty_n;tyi(tyZn,tyw);var ty0n=function(a){this.yo=a||null;this.next=a?null:{}},tyXn=[27,112,113,114,115,116,117,118,119,120,121,122,123,19],tyYn="color date datetime datetime-local email month number password search tel text time url week".split(" ");
tyZn.prototype.Oa=function(a,b){ty1n(this.Mf,ty2n(arguments),a)};var ty2n=function(a){if(tyd(a[1]))a=tySa(ty3n(a[1]),function(a){return a.keyCode&255|a.ps<<8});else{var b=a,c=1;tyc(a[1])&&(b=a[1],c=0);for(a=[];c<b.length;c+=2)a.push(b[c]&255|b[c+1]<<8)}return a};
tyZn.prototype.D=function(){tyZn.B.D.call(this);this.Mf={};tysc(this.Ic,"keydown",this.Fc,!1,this);tys&&tysc(this.Ic,"keyup",this.Nm,!1,this);tyRb&&!tys&&(tysc(this.Ic,"keypress",this.Tm,!1,this),tysc(this.Ic,"keyup",this.Um,!1,this));this.Ic=null};
var ty3n=function(a){a=a.replace(/[ +]*\+[ +]*/g,"+").replace(/[ ]+/g," ").toLowerCase();a=a.split(" ");for(var b=[],c,d=0;c=a[d];d++){var e=c.split("+"),f=null;c=0;for(var g,h=0;g=e[h];h++){switch(g){case "shift":c|=1;continue;case "ctrl":c|=2;continue;case "alt":c|=4;continue;case "meta":c|=8;continue}e=g;if(!ty_n){f={};g=void 0;for(g in tyWn)f[tyWn[g]]=ty7j(parseInt(g,10));ty_n=f}f=ty_n[e];break}b.push({keyCode:f,ps:c})}return b};
tyZn.prototype.Nm=function(a){if(tyQb){if(224==a.keyCode){this.yn=!0;tyge(function(){this.yn=!1},400,this);return}var b=a.metaKey||this.yn;67!=a.keyCode&&88!=a.keyCode&&86!=a.keyCode||!b||(a.metaKey=b,this.Fc(a))}32==this.fi&&32==a.keyCode&&a.preventDefault();this.fi=null};var ty4n=function(a){return tyRb&&!tys&&a.ctrlKey&&a.altKey&&!a.shiftKey};tyZn.prototype.Tm=function(a){32<a.keyCode&&ty4n(a)&&(this.hn=!0)};tyZn.prototype.Um=function(a){!this.hn&&ty4n(a)&&this.Fc(a)};
var ty1n=function(a,b,c){var d=b.shift(),e=a[d];if(e&&(0==b.length||e.yo))throw Error("Keyboard shortcut conflicts with existing shortcut");b.length?(d=d.toString(),e=new ty0n,e=d in a?a[d]:a[d]=e,ty1n(e.next,b,c)):a[d]=new ty0n(c)};
tyZn.prototype.Fc=function(a){var b;b=a.keyCode;if(16==b||17==b||18==b)b=!1;else{var c=a.target,d="TEXTAREA"==c.tagName||"INPUT"==c.tagName||"BUTTON"==c.tagName||"SELECT"==c.tagName,e=!d&&(c.isContentEditable||c.ownerDocument&&"on"==c.ownerDocument.designMode);b=!d&&!e||this.ir[b]||this.Fp?!0:e?!1:this.os&&(a.altKey||a.ctrlKey||a.metaKey)?!0:"INPUT"==c.tagName&&this.ju[c.type]?13==b:"INPUT"==c.tagName||"BUTTON"==c.tagName?this.Ip?!0:32!=b:!1}if(b)if("keydown"==a.type&&ty4n(a))this.hn=!1;else{b=ty7j(a.keyCode);
c=b&255|((a.shiftKey?1:0)|(a.ctrlKey?2:0)|(a.altKey?4:0)|(a.metaKey?8:0))<<8;if(!this.Xe[c]||1500<=tyh()-this.$g)this.Xe=this.Mf,this.$g=tyh();if(c=this.Xe[c])c.next?(this.Xe=c.next,this.$g=tyh(),a.preventDefault()):(this.Xe=this.Mf,this.$g=tyh(),this.Jp&&a.preventDefault(),this.Kp&&a.stopPropagation(),c=c.yo,d=a.target,e=this.dispatchEvent(new ty5n("shortcut",c,d)),(e&=this.dispatchEvent(new ty5n("shortcut_"+c,c,d)))||a.preventDefault(),tys&&(this.fi=b))}};
var ty5n=function(a,b,c){typ.call(this,a,c);this.identifier=b};tyi(ty5n,typ);chrome.i18n.getMessage("828700836558117968");chrome.i18n.getMessage("7194651457266894775");chrome.i18n.getMessage("7366108491311712519");/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
new ArrayBuffer(0);Object.freeze(new Date(0));Object.freeze({});/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2015 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.

 @fileoverview Provides default comparators. The comparators in this file
 use the following logic for compare: whoever has a bigger array index wins.
 For example, DESC order for (3, 5), since 3 shall have a bigger array index
 when sorted descending, it wins the comparison.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2015 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
new tyn(0,new tyE([1,4]),1,new tyE([2]),2,new tyE([3,5,6]),3,new tyE([2]),4,new tyE([7]),5,new tyE([7]),6,new tyE([7]));/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*

 Copyright 2014 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
chrome.i18n.getMessage("4095000796706848124");chrome.i18n.getMessage("3742493136298597541");var ty6n=function(a){tyyj.call(this,a);this.fj()};tyi(ty6n,tyyj);ty6n.prototype.fj=function(){chrome.runtime.onMessage.addListener(tyg(this.qr,this))};ty6n.prototype.qr=function(a){if(a.sentFrom!=this.ap){var b=a.type,c=a.message;a=a.dataBuffer;var d=tyvj(b),c=null===d?void 0:new d(c),b=tydb(tyoj,b)||tydb(tyIf,b)?b:null;null===b||this.dispatchEvent(new tyqj(b,c,a))}};var ty7n=new tyH("aa");var ty8n=function(){};ty8n.prototype.$l=function(){return chrome.i18n.getMessage("@@ui_locale")};var ty9n=function(a,b,c,d){tytj.call(this);this.Pd=b;this.ee=c;this.Lc=d;tym(this.Sh,a);this.Sh.push(a);tyuj(this,a,"H",tyma(this.yl,a));this.$k(a)};tyi(ty9n,tytj);ty=ty9n.prototype;ty.$k=function(a){tyuj(this,a,305,this.Dr);tyuj(this,a,302,this.Er);tyuj(this,a,15,this.Gr);tyuj(this,a,307,this.Hr);tyuj(this,a,313,this.Ir);tyuj(this,a,314,this.Fr)};ty.Dr=function(a){a=a.message.Gl();var b=this.Pd;b.Zf=a;2!=b.Lc.Dg()&&3!=b.Zf&&(b.qh=new tycg);b.Rd()};ty.Er=function(a){this.Sd(a.message.Wi())};
ty.Gr=function(a){this.Uh(tyJf(a.message,tycg,1,1))};ty.Hr=function(a){a=a.message;this.Ok(a.am(),tyL(a,2))};ty.Ir=function(a){var b=a.message;a=tyJf(b,tywg,2);b=b.Si();tyfj.Ua().qo(b);tyDg(this.ee,tyL(a,18));b=this.Pd;b.Vm=0!=a.Kl();b.Rd()};ty.Fr=function(a){this.Lc.to(a.message.Dg())};ty.Sd=function(a){this.Pd.Sd(a)};ty.Uh=function(a){this.Pd.Uh(a)};ty.Ok=function(a,b){this.Pd.Ok(a,b)};var ty$n=["MusicManager.log","Peer.db","ServerDatabase.db"];new tyH("ba");var tyao=new tyH("ca");var tybo=function(a){this.kc=a.get(tyuh)};ty=tybo.prototype;ty.br=function(){var a=new tyx;a.addCallback(this.kc.Rq,this.kc);a.addCallback(function(a){this.Co=a.Ui()},this);a.callback();return a};ty.gq=function(){var a=new tyx;ty$n.forEach(function(b){a.addCallback(tyg(this.hq,this,b))},this);a.addCallback(this.fq,this);a.callback();return a};
ty.hq=function(a){var b=new tyx;b.addCallback(function(a){return this.Co.getFile(a)},this);tyy(b,function(a){return a.copyTo(this.Lo)},function(){return ty4c()},this);b.callback(a);return b};ty.fq=function(){var a=new tyx;a.addCallback(function(){return this.Co.getDirectory("MusicChromeAppLogs",1)},this);tyy(a,function(a){return a.copyTo(this.Lo)},function(){return ty4c()},this);a.callback();return a};
ty.jq=function(a){var b=new tyx,c=(new tyCi).getTime();a=a.entry;b.addCallback(tyma(a.rl,"google_play_music_logs_"+c),a);b.addCallback(function(a){this.Lo=a},this);b.callback();return b};var tyco=tywf("/music/listen"),tydo=function(a){var b;b=tyb(void 0)?void 0:tyco;var c=tySg();if(!tyOg(c,tyUg)){var d=new tyTg;tyN(c,tyUg,d)}b=c.get(tyUg).ym(b);if(null!==b)return tyb(a)&&(tyG(b),b.Xa.set("utm_source",a),tyG(b),b.Xa.set("utm_medium","chrome_app"),tyG(b),b.Xa.set("utm_campaign","chrome")),b.toString()},tyeo=function(a){var b=tyb(chrome.browser)&&tyb(chrome.browser.openTab),c=new tyx;b?chrome.browser.openTab({url:a},function(){chrome.runtime.lastError&&c.V(chrome.runtime.lastError.message);
c.callback()}):(b=(tyb(void 0)?void 0:tya).document.createElement("a"),b.href=a,b.target="_blank",b.click(),c.callback())};var tyfo=function(){tya.tyliumStubList||(tya.tyliumStubList=[]);return tya.tyliumStubList};var tyjo=function(){return tyO("<div class='pb-qb rb'>"+tygo()+tyho()+tyO('<div class="Wb-p rb"><div class="Wb t-Wb-horizontal t-Wb-xb"><div class="Ib-Zb-ac"><div class="Yb-Wb"></div></div><div class="t-Wb-Xb"></div></div></div>')+tyio()+'<div class="gc rb"></div><div class="Dc-sc"></div><div class="sc-tc rb"></div></div>')},tygo=function(){var a="",b=chrome.i18n.getMessage("2714752802779336020"),c=chrome.i18n.getMessage("2102825898069375693"),d=chrome.i18n.getMessage("8931700495296520714");return tyO(a+
('<div class="ub-vb"><button class="wb-x-w"></button><div class="bc-zb"><p>'+b+'</p></div><div class="xb-yb"><div class="zb"><a class="zb-Ab"></a></div><div class="Bb"><a class="Bb-Ab"></a></div></div><button class="ub-h Cb tb" title=\''+c+'\' aria-haspopup="true"></button><button class="ub-h Db" title=\''+d+"'></button></div>"))},tyho=function(){var a="",b=chrome.i18n.getMessage("5501301484140201550"),c=chrome.i18n.getMessage("4456793125873199230"),d=chrome.i18n.getMessage("3483193414050571677"),
e=chrome.i18n.getMessage("3609204150605625912"),f=chrome.i18n.getMessage("7704516203792990151"),g=chrome.i18n.getMessage("8741366833297918126");return tyO(a+('<div class="Tb-Ub"><img class="Vb" class="image" tabindex="-1" aria-hidden="true" /><button id="ifl-large-button" class="bc bc-ec" aria-labelledby="ifl-text-lg"></button><label id="ifl-text-lg" class="bc-f" for="ifl-large-button">'+b+'</label><button class="bc bc-fc rb" title=\''+c+"'></button><button class=\"Nb Nb-r off rb\" title='"+d+"'></button><button class=\"Nb Nb-Ob off rb\" title='"+
e+"'></button><span class=\"e-Fb rb\" aria-label='"+f+"'></span><span class=\"xb-Eb rb\" aria-label='"+g+"'></span></div>"))},tyio=function(){var a="",b=chrome.i18n.getMessage("6211429203092739745"),c=chrome.i18n.getMessage("5455360062863417200");return tyO(a+('<div class="qb-vb"><button class="Q-h Mb" value="NO_REPEAT" disabled></button><button class="Q-h Kb" disabled title=\''+b+'\'></button><button class="Q-h wb wb-Hb"></button><button class="Q-h Jb" disabled title=\''+c+'\'></button><button class="Q-h Lb" value="NO_SHUFFLE" disabled></button></div>'))},
tyko=function(){return tyO('<div class="Db"></div><div class="sc-w"></div><div class="sc-zb"></div><div class="sc-uc"></div><button class="sc-vc-h"></button><div class="sc-wc"></div>')},tylo=function(){var a="",b=chrome.i18n.getMessage("1044946868924904798");return tyO(a+b)},tymo=function(){var a="",b=chrome.i18n.getMessage("95869773684474447");return tyO(a+b)},tyno=function(){var a="",b=chrome.i18n.getMessage("5497627646066282315");return tyO(a+('<div class="zc-Ac-Bc-zb">'+b+"</div>"))},tyoo=function(a){var b=
"";a=chrome.i18n.getMessage("6650888720096194474",[tyIh(a.Gi),"</span>",'<span class="mini-player-user-email">']);return tyO(b+a)},typo=function(){var a="",b=chrome.i18n.getMessage("1504214836895903832");return tyO(a+('<div class="zc-Ac-Bc-zb">'+b+"</div>"))},tyqo=function(){var a="",b=chrome.i18n.getMessage("1729815731089690989");return tyO(a+b)},tyro=function(){var a="",b=chrome.i18n.getMessage("3872632959071287956"),c=chrome.i18n.getMessage("5578390534357178026");return tyO(a+('<p class="zc-Ac-Bc-uc-Cc">'+
b+'</p><p class="zc-Ac-Bc-uc-Cc">'+c+"</p>"))},tyso=function(){var a="",b=chrome.i18n.getMessage("5889126665299129466");return tyO(a+b)},tyto=function(){var a="",b=chrome.i18n.getMessage("1372788343021542418");return tyO(a+b)},tyuo=function(){var a="",b=chrome.i18n.getMessage("8619410898472620495");return tyO(a+b)},tyvo=function(){var a="",b=chrome.i18n.getMessage("7354691783317064273");return tyO(a+('<p class="zc-Ac-Bc-uc-Cc">'+b+"</p>"))},tywo=function(){return tyO('<p class="zc-Ac-Bc-uc-Cc"></p>')},
tyxo=function(){var a="",b=chrome.i18n.getMessage("819996403327805209");return tyO(a+b)},tyyo=function(){var a="",b=chrome.i18n.getMessage("8679806927601731663");return tyO(a+b)},tyzo=function(){var a="",b=chrome.i18n.getMessage("840692109692540367");return tyO(a+b)},tyAo=function(){var a="",b=chrome.i18n.getMessage("3381844160250536550");return tyO(a+b)},tyBo=function(){var a="",b=chrome.i18n.getMessage("3163044740176820503");return tyO(a+b)},tyCo=function(){var a="",b=chrome.i18n.getMessage("3849149261610050417");
return tyO(a+b)},tyDo=function(a){var b="";a=chrome.i18n.getMessage("3839679337223320857",[tyIh(a.Gi)]);return tyO(b+a)},tyEo=function(a){var b="";a=chrome.i18n.getMessage("8992323138519095501",[tyIh(a.artistName),tyIh(a.eu)]);return tyO(b+a)},tyFo=function(a){var b="",c=chrome.i18n.getMessage("1726363342938046830"),d=chrome.i18n.getMessage("4075286221500750156",[tyIh(a.Sp),tyIh(a.version)]),e=chrome.i18n.getMessage("8639048757911329468",["</span>",tyIh(a.us),"<span class='gc-ic-hc'>"]),f=chrome.i18n.getMessage("1722592106949807025"),
g=chrome.i18n.getMessage("4357737589458300153",["</a>",'<a class="gc-oc-pc" href="'+tyNh(tyRh(a.url))+'">']),h=chrome.i18n.getMessage("2544569632476723854"),k=chrome.i18n.getMessage("8440128775129354214"),b=b+('<button class="gc-Db"></button><div class="gc-zb">'+c+'</div><div class="gc-hc">'+d+'</div><div class="gc-ic-hc-d">'+e+'</div><div class="gc-jc-kc-d"><button class="gc-jc-kc">'+f+'</button></div><div class="gc-gc-f">'+g+'</div><div class="gc-lc-mc"><a class="gc-nc" href="'+tyNh(tyRh(a.url))+
'">'+h+'</a> - <a class="gc-mc" href="'+tyNh(tyRh(a.url))+'">'+k+"</a></div>");return tyO(b)},tyGo=function(a){a=a||{};var b="";if(a.tj){var c=Math.ceil(a.tj/1E3);a=Math.floor(c/3600);var d=Math.floor(c/60)-60*a,c=c-3600*a-60*d,b=b+((0<a?tyIh(a)+":":"")+(10>d&&0<a?"0":"")+tyIh(d)+":"+(10>c?"0":"")+tyIh(c))}else b+="0:00";return tyO(b)},tyHo=function(){return tyO('<div class="Ec-Fc-gb"><div>Drag files here or select files to copy to the app\'s persistent storage</div><input type="file" class="Ec-Fc-copy-file-h" name="copyfile"><ul class="Ec-Fc-file-copy-H"></ul><div class="Ec-Fc-environment-Qb"></div></div>')},
tyIo=function(a){return tyO("<li>"+(a.Xr?tyIh(a.filename)+" is copied.":tyIh(a.filename)+" is not copied: "+tyIh(a.error)+".")+"</li>")};var tyJo=chrome.i18n.getMessage("8542907888351533629"),tyKo=function(a){ty1.call(this);this.za=new tyfm;this.Vd=chrome.runtime.getManifest().version;this.vf=tyJo;this.Tp=chrome.runtime.getManifest().build_mode||"";this.eh=a.get(ty7n).$l()};tyi(tyKo,ty1);var tyLo=chrome.i18n.getMessage("8971282019539581965");ty=tyKo.prototype;ty.F=function(){this.C=tygm(this.za,tyFo,{version:this.Vd,us:this.vf,Sp:this.Tp})};
ty.J=function(){tyKo.B.J.call(this);var a=this.getHandler(),b=this.L("gc-nc"),c=this.L("gc-mc"),d=this.L("gc-oc-pc"),e=this.L("gc-Db");tyod(e,{title:tyLo});var f=this.L("gc-jc-kc");a.listen(b,"click",this.zr);a.listen(c,"click",this.vr);a.listen(d,"click",this.Ar);a.listen(e,"click",function(){this.dispatchEvent("Hb")});a.listen(f,"click",function(){this.dispatchEvent("Ib")})};ty.zr=function(){tyeo("https://play.google.com/intl/"+this.eh+"/about/play-terms.html")};
ty.vr=function(){tyeo("https://www.google.com/policies/privacy/?hl="+this.eh)};ty.Ar=function(){chrome.app.window.create("thirdparty.html")};ty.Sd=function(a){this.vf=a?a:tyJo;tyC(this.L("gc-ic-hc"),this.vf)};var tyMo=function(a){ty1.call(this);this.ia=a.get(tyDf);this.ji="";this.xl=1.5<tya.devicePixelRatio?"resources/images/miniplayer/default_album_art_296_card_x2.png":"resources/images/miniplayer/default_album_art_296_card.png"};tyi(tyMo,ty1);ty=tyMo.prototype;ty.F=function(){this.C=tygm(new tyfm,tyho)};
ty.J=function(){tyMo.B.J.call(this);var a=this.getHandler();this.zi=this.L("e-Fb");this.Lk=this.L("xb-Eb");this.ii=this.L("Vb");this.De=this.L("Nb-r");this.Ee=this.L("Nb-Ob");this.nf=this.L("bc-ec");this.Rg=this.L("bc-fc");this.Pr=this.L("bc-f");a.listen(this.A(),"click",this.xf);a.listen(this.A(),"mouseover",this.Js);a.listen(this.A(),"mouseout",this.Is)};
ty.oo=function(a){a=a||this.xl;this.ji!==a&&(this.ji=a,a=tywf(tygj(a)),tyjf(a,"https"),a=tynj(a.toString()),a.addCallback(function(a){this.ii.src=a},this),ty_c(a,function(){this.ii.src=this.xl},this))};ty.ll=function(){this.ji=this.ii.src=""};ty.setCurrentTime=function(a){tyC(this.zi,tyGo({tj:a}).toString())};ty.wo=function(a){tyC(this.Lk,tyGo({tj:a}).toString())};
ty.Kf=function(a){ty_(this.Ee,"rb",!a);ty_(this.De,"rb",!a);ty_(this.Rg,"rb",!a);ty_(this.Rg,"rb",!a);ty_(this.zi,"rb",!a);ty_(this.Lk,"rb",!a);ty_(this.nf,"rb",a);ty_(this.Pr,"rb",a)};ty.uo=function(a){switch(a){case 5:tyZ(this.De,"i");tyY(this.Ee,"i");break;case 1:tyZ(this.Ee,"i");tyY(this.De,"i");break;default:tyZ(this.De,"i"),tyZ(this.Ee,"i")}};
ty.xf=function(a){var b;switch(a.target){case this.Ee:b="Lb";a="Thumbs Up Toggle";break;case this.De:b="Kb";a="Thumbs Down Toggle";break;case this.nf:b="Jb";a="IFL Radio Large";break;case this.Rg:b="Jb";a="IFL Radio Small";break;default:return}tyGf(this.ia,"Button Clicked",a);this.dispatchEvent(b)};ty.Js=function(){tyNo(this,!0);tyY(this.nf,"cc")};ty.Is=function(){tyNo(this,!1);tyZ(this.nf,"cc")};ty.Ae=function(a){ty_(this.nf,"sb",!a);ty_(this.Ee,"sb",!a);ty_(this.De,"sb",!a);tyNo(this,a)};
var tyNo=function(a,b){ty_(a.zi,"sb",!b);ty_(a.Lk,"sb",!b);ty_(a.Rg,"sb",!b)};var tyOo=function(){};tyi(tyOo,tyZk);tyda(tyOo);ty=tyOo.prototype;ty.vd=function(){return"button"};ty.uc=function(a,b,c){switch(b){case 8:case 16:ty0(a,"pressed",c);break;default:case 64:case 1:tyOo.B.uc.call(this,a,b,c)}};ty.F=function(a){var b=tyOo.B.F.call(this,a);this.vk(b,a.Fg());var c=a.ja();c&&this.nb(b,c);ty3(a,16)&&this.uc(b,16,a.gd());return b};ty.fa=function(a,b){b=tyOo.B.fa.call(this,a,b);var c=this.ja(b);a.la=c;a.Ik=this.Fg(b);ty3(a,16)&&this.uc(b,16,a.gd());return b};ty.ja=tyca;
ty.nb=tyca;ty.Fg=function(a){return a.title};ty.vk=function(a,b){a&&(b?a.title=b:a.removeAttribute("title"))};ty.M=function(){return"t-h"};var tyPo=function(){};tyi(tyPo,tyOo);tyda(tyPo);ty=tyPo.prototype;ty.vd=function(){};ty.F=function(a){ty$k(a,!1);a.Pe&=-256;a.eb(32,!1);return a.H().F("button",{"class":this.fe(a).join(" "),disabled:!a.isEnabled(),title:a.Fg()||"",value:a.ja()||""},a.yg()||"")};ty.Sb=function(a){return"BUTTON"==a.tagName||"INPUT"==a.tagName&&("button"==a.type||"submit"==a.type||"reset"==a.type)};
ty.fa=function(a,b){ty$k(a,!1);a.Pe&=-256;a.eb(32,!1);if(b.disabled){var c=tyNa(this.df(1));tyY(b,c)}return tyPo.B.fa.call(this,a,b)};ty.fd=function(a){a.getHandler().listen(a.A(),"click",a.Kc)};ty.Ff=tyca;ty.Be=tyca;ty.Hc=function(a){return a.isEnabled()};ty.Rc=tyca;ty.Pa=function(a,b,c){tyPo.B.Pa.call(this,a,b,c);(a=a.A())&&1==b&&(a.disabled=c)};ty.ja=function(a){return a.value};ty.nb=function(a,b){a&&(a.value=b)};ty.uc=tyca;var tyQo=function(a,b,c){ty4.call(this,a,b||tyPo.Ua(),c)};tyi(tyQo,ty4);ty=tyQo.prototype;ty.ja=function(){return this.la};ty.nb=function(a){this.la=a;this.Ec().nb(this.A(),a)};ty.Fg=function(){return this.Ik};ty.vk=function(a){this.Ik=a;this.Ec().vk(this.A(),a)};ty.D=function(){tyQo.B.D.call(this);delete this.la;delete this.Ik};ty.J=function(){tyQo.B.J.call(this);if(ty3(this,32)){var a=this.Ba();a&&this.getHandler().listen(a,"keyup",this.oc)}};
ty.oc=function(a){return 13==a.keyCode&&"key"==a.type||32==a.keyCode&&"keyup"==a.type?this.Kc(a):32==a.keyCode};ty7k("t-h",function(){return new tyQo(null)});var tyRo=function(a,b,c,d){ty5.call(this,a,b,c,d)};tyi(tyRo,ty5);ty7k("t-combobox-I",function(){return new tyRo(null)});var tySo=function(a){ty2.call(this);this.K=new tyfm;this.kc=a.get(tyuh);this.pj=a.get(ty3g)};tyi(tySo,ty2);tySo.prototype.J=function(){tySo.B.J.call(this);this.setTitle("Debug");this.Qc(this.K.render(tyHo));var a=this.ba(),b=this.getHandler();b.listen(a,"dragover",this.Fs);b.listen(a,"dragleave",this.Es);b.listen(a,"drop",this.Gs);tyTo(this)};tySo.prototype.xa=function(){tySo.B.xa.call(this)};
var tyTo=function(a){var b=tymd("Ec-Fc-copy-file-h",tyOa(a.ba()));b.onchange=tyg(function(){tyUo(this,b.files)},a)};tySo.prototype.Fs=function(a){a.preventDefault();a.stopPropagation();ty_(this.ba(),"Ec-Fc-Gc-Hc",!0)};tySo.prototype.Es=function(){ty_(this.ba(),"Ec-Fc-Gc-Hc",!1)};tySo.prototype.Gs=function(a){a.preventDefault();a.stopPropagation();ty_(this.ba(),"Ec-Fc-Gc-Hc",!1);a=a.lc().dataTransfer;tyb(a)&&tyb(a.types)&&(a=a.files,tyb(a)&&tyUo(this,a))};
var tyUo=function(a,b){tyl(b,function(a){tyVo(this,a)},a)},tyVo=function(a,b){var c=new tyx;c.addCallback(a.kc.Sq,a.kc);c.addCallback(function(a){return a.getFile(b.name,2)},a);c.addCallback(function(a){return a.createWriter()},a);c.addCallback(function(a){try{a.write(b),tyWo(this,b,!0)}catch(c){tyWo(this,b,!1,c.name)}},a);c.callback()},tyWo=function(a,b,c,d){tymd("Ec-Fc-file-copy-H",tyOa(a.ba())).appendChild(tygm(a.K,tyIo,{filename:b.name,Xr:c,error:d}))};var tyXo=function(a,b){ty1.call(this);this.ia=a.get(tyDf);this.za=new tyfm;this.Xm=a.get(tyHf);this.eh=a.get(ty7n).$l();this.jn=b};tyi(tyXo,ty1);tyXo.prototype.F=function(){this.C=tygm(this.za,tyko);this.nl=this.Lb("Db");tyW(this.nl,this.jn);this.Qg=this.Lb("sc-w");this.ta=this.Lb("sc-zb");this.ua=this.Lb("sc-vc-h");this.Ta=this.Lb("sc-uc");this.Fl=this.Lb("sc-wc")};
tyXo.prototype.J=function(){tyXo.B.J.call(this);this.Xm.Vi().addCallback(function(a){ty6(this.za,this.Fl,tyDo,{Gi:a})},this);var a=this.getHandler();a.listen(this.ua,"click",this.Vp);a.listen(this.nl,"click",function(){this.dispatchEvent("Nb")})};
var ty2o=function(a,b,c){a.Yd=b;switch(b){case "could-not-connect":b=c.gs;tyYo(a,null);tyb(b)&&0!=b&&2!=b?(b=tyAg(b),ty6(a.za,a.Ta,tywo),tyC(tyzd(a.Ta),b),tyZo(a,tyyo),ty_o(a,typo)):(ty6(a.za,a.Ta,tyvo),tyZo(a,null),ty_o(a,tyno));ty0o(a,!1);tyGf(a.ia,"Showing ErrorView",a.Yd);break;case "no-music-account":ty1o(a);break;case "offline":tyYo(a,a.jn?null:"xc-w");ty_o(a,tylo);ty6(a.za,a.Ta,tyqo);tyZo(a,null);ty0o(a,!1);break;case "user-not-logged-into-chrome":tyYo(a,"Rb-w");tyZo(a,tyAo);ty0o(a,!1);ty6(a.za,
a.Ta,tyso);ty_o(a,null);tyGf(a.ia,"Showing ErrorView",a.Yd);break;case "user-not-logged-into-skyjam":tyYo(a,"Rb-w");tyZo(a,tyzo);ty0o(a,!1);ty6(a.za,a.Ta,tyto);ty_o(a,null);tyGf(a.ia,"Showing ErrorView",a.Yd);break;case "verified-user-not-logged-in":tyYo(a,null);tyZo(a,tyxo);ty0o(a,!0);ty6(a.za,a.Ta,tyro);ty_o(a,typo);tyGf(a.ia,"Showing ErrorView",a.Yd);break;case "account-type-changed":tyYo(a,null);ty_o(a,null);tyC(a.Ta,tyRj);tyZo(a,tyPj);ty0o(a,!1);break;case "another-stream-being-played":tyYo(a,
null);ty_o(a,tySj);ty6(a.za,a.Ta,tycm,{mj:"http://www.google.com/support/music/bin/answer.py?answer=1229932"});tyZo(a,null);ty0o(a,!1);break;case "generic-playback-error":tyYo(a,"yc-sc-w");ty_o(a,tymo);ty6(a.za,a.Ta,tyuo);tyZo(a,tyCo);ty0o(a,!1);break;case "segment-streaming-rate-limit-reached":tyYo(a,null);ty_o(a,tyTj);ty6(a.za,a.Ta,tyem,{});tyZo(a,null);ty0o(a,!1);break;case "stream-rate-limit-reached":tyYo(a,null);ty_o(a,tyTj);ty6(a.za,a.Ta,tydm,{mj:"http://www.google.com/support/music/bin/answer.py?answer=1248948"});
tyZo(a,null);ty0o(a,!1);break;case "other-authenticated-user":tyYo(a,null);ty_o(a,null);tyC(a.Ta,tyVj);tyZo(a,tyQj);ty0o(a,!1);break;case "unauthenticated-user":tyYo(a,null),ty_o(a,null),tyC(a.Ta,tyUj),tyZo(a,tyPj),ty0o(a,!1)}},ty1o=function(a){a.Xm.Vi().addCallback(function(a){tyYo(this,"Rb-w");ty_o(this,null);ty6(this.za,this.Ta,tyoo,{Gi:a});tyZo(this,tyBo);ty0o(this,!1)},a)},tyYo=function(a,b){if(null===b)tyW(a.Qg,!1);else{if(tyb(a.tl)){var c=a.Qg,d=a.tl;ty0j(c,d)&&(tyZ(c,d),tyY(c,b))}else tyY(a.Qg,
b);a.tl=b;tyW(a.Qg,!0)}},ty_o=function(a,b){null===b?tyW(a.ta,!1):(tye(b)?ty6(a.za,a.ta,b):tyC(a.ta,b),tyW(a.ta,!0))},tyZo=function(a,b){null===b?tyW(a.ua,!1):(tye(b)?ty6(a.za,a.ua,b):tyC(a.ua,b),tyW(a.ua,!0))},ty0o=function(a,b){tyW(a.Fl,b)};
tyXo.prototype.Vp=function(){tyGf(this.ia,"Button Clicked",this.Yd);switch(this.Yd){case "verified-user-not-logged-in":tyeo("https://support.google.com/chrome/answer/185277?hl="+this.eh);break;case "could-not-connect":case "user-not-logged-into-chrome":this.dispatchEvent({type:"Ob"});break;case "user-not-logged-into-skyjam":var a=tyNa(tydo("chrome_app_unconnected"));tyeo(a);break;case "no-music-account":a=tywf(tyNa(tydo("chrome_app")));tyG(a);a.Xa.set("utm_campaign","get_started_sign_up_button");
tyeo(a.toString());break;case "account-type-changed":case "unauthenticated-user":this.dispatchEvent("Pb");break;case "other-authenticated-user":this.dispatchEvent("Mb");break;case "generic-playback-error":this.dispatchEvent("Qb")}};tyXo.prototype.Ae=function(a){ty_(this.ua,"sb",!a);ty_(this.Ta,"sb",!a)};var ty3o=function(a){typ.call(this,"bc");this.delta=a};tyi(ty3o,typ);var ty4o=function(a){ty1.call(this);this.ia=a.get(tyDf);this.gn=!1};tyi(ty4o,ty1);var ty5o=chrome.i18n.getMessage("305389607483289974"),ty6o=chrome.i18n.getMessage("4776903542722844646"),ty7o=chrome.i18n.getMessage("2722441731984880542"),ty8o=chrome.i18n.getMessage("2026335465374096346"),ty9o=chrome.i18n.getMessage("4183640380235728062"),ty$o=chrome.i18n.getMessage("6242354668932209396"),tyap=chrome.i18n.getMessage("7293925053370285812");ty4o.prototype.F=function(){this.C=tygm(new tyfm,tyio)};
ty4o.prototype.J=function(){ty4o.B.J.call(this);this.xj=this.Lb("Jb");this.Kj=this.Lb("Kb");this.Cb=this.Lb("wb-Hb");tyod(this.Cb,{title:ty5o});this.sc=this.Lb("Mb");this.ec=this.Lb("Lb");this.getHandler().listen(this.A(),"click",this.xf)};var tybp=function(a,b){a.gn=b;var c=ty5o;a.gn?tyY(a.Cb,"Ib"):(c=ty6o,tyZ(a.Cb,"Ib"));tyod(a.Cb,{title:c})},tycp=function(a){a.sc.value="NO_REPEAT";tyod(a.sc,{title:ty9o})},tydp=function(a){a.ec.disabled=!1;a.ec.value="NO_SHUFFLE";tyod(a.ec,{title:ty7o})};
ty4o.prototype.xf=function(a){var b,c;switch(a.target){case this.xj:b="ic";c="Next";break;case this.Kj:b="jc";c="Previous";break;case this.Cb:b="kc";c="PlayPause Toggle";break;case this.sc:b="lc";c="Repeat Toggle";break;case this.ec:b="mc",c="Shuffle Toggle"}b&&c&&(tyGf(this.ia,"Button Clicked",c),this.dispatchEvent(b));a.preventDefault();a.target.blur()};var tyep=new tyH("da");var tyfp=function(a){ty1.call(this);this.ia=a.get(tyDf)};tyi(tyfp,ty1);
tyfp.prototype.J=function(){tyfp.B.J.call(this);var a=new tyZn(document);a.Oa("Esc",27);a.Oa("Close Window",92,87);a.Oa("Close Window",91,87);a.Oa("Play/Pause",80);a.Oa("Play/Pause",32);a.Oa("Stop",88);a.Oa("Previous",66);a.Oa("Previous",37);a.Oa("Next",78);a.Oa("Next",39);a.Oa("Repeat",82);a.Oa("Shuffle",83);a.Oa("Thumbs Up",107);a.Oa("Thumbs Up",187);a.Oa("Thumbs Down",109);a.Oa("Volume Down",40);a.Oa("Volume Up",38);this.nn=a;this.getHandler().listen(this.nn,"shortcut",this.xr)};
tyfp.prototype.xa=function(){this.nn.S();tyfp.B.xa.call(this)};tyfp.prototype.xr=function(a){tyGf(this.ia,"Shortcut Typed",a.identifier);this.dispatchEvent(a.identifier)};var tygp=!tyr,tyhp=function(a,b){tygp&&a.dataset?a.dataset.menuKey=b:a.setAttribute("data-"+tyLa(),b)};var tyip=function(a,b,c){ty5.call(this,a,b,c);this.Gf(!0)};tyi(tyip,ty5);ty7k("t-m-u",function(){return new tyip(null)});var tyjp=function(a){ty1.call(this);this.ia=a.get(tyDf);this.hj=!1};tyi(tyjp,ty1);var tykp=55/3E3,tylp=chrome.i18n.getMessage("2056726623536384731");ty=tyjp.prototype;ty.F=function(){this.C=tygm(new tyfm,tygo)};
ty.J=function(){tyjp.B.J.call(this);var a=this.getHandler();this.Vn=this.L("wb-x-w");tyod(this.Vn,{title:tylp});this.So=this.L("xb-yb");this.Pp=this.L("Bb");this.Xd=this.L("Bb-Ab");this.ta=this.L("zb");this.Ge=this.L("zb-Ab");this.bq=this.L("Db");this.Af=this.L("Cb");this.Qr=this.L("bc-zb");var b=new tyIl,c=chrome.i18n.getMessage("5128240607770067472"),c=new ty5(c),d=chrome.i18n.getMessage("4275466320467620600");this.Ne=new tyip(d);b.Po=!0;0<=tyKa(tyOk,34)&&(b.Eb(this.Ne,!0),b.Eb(new tyGl,!0));b.Eb(c,
!0);b.render(tyBd(this.A()));tyY(b.C,"t-s-eb");tyhp(c.A(),"about");0<=tyKa(tyOk,34)&&tyhp(this.Ne.A(),"always-on-top");this.xn=b;a.listen(this.A(),"click",this.xf);a.listen(this.A(),"mouseover",this.lo);a.listen(this.xn,"action",this.Hs)};ty.setTitle=function(a){this.He!=a&&(this.He=a,tyC(this.Ge,a),tymp([this.Hk,this.Gk]),this.Hk=tynp(this,this.Ge,!1),this.Gk=tynp(this,this.Ge,!0))};
ty.Sj=function(a){this.dl!=a&&(this.dl=a,tyC(this.Xd,a),tymp([this.mi,this.li]),this.mi=tynp(this,this.Xd,!1),this.li=tynp(this,this.Xd,!0))};ty.Kf=function(a){ty_(this.Qr,"rb",a)};var tymp=function(a){tyl(a,function(a){null!=a&&a.stop()})};
tyjp.prototype.xf=function(a){var b;switch(a.target){case this.Vn:a="Play Music Icon";b="tc";break;case this.Ge:a="Title";b="qc";break;case this.Xd:a="Artist";b="rc";break;case this.bq:a="Close";b="oc";break;case this.Af:a="3 Dot Menu";this.au();break;default:return}tyGf(this.ia,"Button Clicked",a);b&&this.dispatchEvent(b)};tyjp.prototype.au=function(){tyZ(this.Af,"tb");tyJl(this.xn,new tynl(this.Af,1,!0),2,null)};
var tynp=function(a,b,c){var d=tyBd(b);a=b.offsetWidth<=a.So.offsetWidth?0:b.offsetWidth-a.So.offsetWidth+3;var e=a/tykp;b=b.offsetLeft-3;return c?new tyXl(d,[b-a,0],[b,0],e):new tyXl(d,[b,0],[b-a,0],e)};tyjp.prototype.lo=function(){!this.hj&&this.dl&&this.He&&(tyop(this,this.mi,this.li),tyop(this,this.Hk,this.Gk))};var tyop=function(a,b,c){tyv(b,"finish",function(){c.play()});tyv(c,"finish",function(){this.hj=!1},!1,a);a.hj=!0;b.play()};
tyjp.prototype.Hs=function(a){a=a.target.A();a=tygp&&a.dataset?"menuKey"in a.dataset?a.dataset.menuKey:null:a.getAttribute("data-"+tyLa());tyGf(this.ia,"Menu Item Clicked",String(a));var b;switch(a){case "about":b="pc";break;case "always-on-top":tyGf(this.ia,"Changed Always On Top Setting",this.Ne.gd()?"On":"Off");b="nc";break;case "copy-debug-file":b="sc"}b&&this.dispatchEvent(b)};var tyqp=function(a){ty1.call(this);this.ia=a.get(tyDf);this.Ia=!1;this.Wb=this.Sf=0;this.Gj=!1;this.za=new tyfm;this.ha=new tyVn;this.Aa=new tyjp(a);this.hb=new tyMo(a);this.qa=new ty4o(a);this.Wd=new tyKo(a);this.jc=new tyXo(a,!1);this.jd=new tyXo(a,!0);this.Db=a.get(tyep);this.pj=a.get(ty3g);ty8g(this.pj).addCallback(function(a){this.Aa.Ne.Hf(a);typp(this,a)},this);this.Eb(this.ha);this.Eb(this.qa);this.gj=this.Bd=!1;this.aa=a;tya.uuddlrlrba=tyg(this.zo,this);tyGf(this.ia,"Miniplayer Window Opened")};
tyi(tyqp,ty1);tyqp.prototype.F=function(){this.C=tygm(this.za,tyjo);this.rq=tykd(document,"title",void 0,document)[0];this.Dk=this.L("Wb-p");this.Bk=this.L("Wb");this.Ck=this.L("Yb-Wb");this.L("t-Wb-Xb");this.Wn=this.L("qb-vb");this.Jr=this.L("ub-vb");this.Yp=this.L("Tb-Ub");this.Yf=this.L("gc");this.Eb(this.Wd);this.Wd.render(this.Yf);this.Ii=this.L("sc-tc");this.Eb(this.jc);this.jc.render(this.Ii);this.Bf=this.L("Dc-sc");this.Eb(this.jc);this.jd.render(this.Bf)};
tyqp.prototype.J=function(){tyqp.B.J.call(this);var a=this.getHandler();this.ha=new tyVn;this.du=new tyrp(this.ha,this.Ck);this.ha.setOrientation("horizontal");this.ha.hi=this.du;this.ha.An=!0;this.ha.Hh(0);tyUn(this.ha);this.Eb(this.ha);this.ha.fa(this.Bk);a.listen(this.ha,"change",this.Os);a.listen(this.ha,"pb",this.np);this.Aa.fa(this.Jr);a.listen(this.Aa,"tc",this.hf);a.listen(this.Aa,"qc",this.Xi);a.listen(this.Aa,"rc",this.Yi);a.listen(this.Aa,"oc",this.vi);a.listen(this.Aa,"nc",function(){typp(this)});
a.listen(this.Aa,"sc",this.zo);a.listen(this.Aa,"pc",this.$t);this.hb.fa(this.Yp);a.listen(this.hb,"Lb",this.ho);a.listen(this.hb,"Kb",this.fo);a.listen(this.hb,"Jb",this.uh);this.qa.fa(this.Wn);a.listen(this.qa,"ic",this.wh);a.listen(this.qa,"jc",this.xh);a.listen(this.qa,"kc",this.bo);a.listen(this.qa,"lc",this.co);a.listen(this.qa,"mc",this.eo);a.listen(this.jc,"Ob",this.Qm);a.listen(this.jc,"Qb",this.hf);a.listen(this.jc,"Pb",this.Rm);a.listen(this.jc,"Mb",this.Jm);a.listen(this.jd,"Ob",this.Qm);
a.listen(this.jd,"Qb",this.hf);a.listen(this.jd,"Pb",this.Rm);a.listen(this.jd,"Mb",this.Jm);a.listen(this.jd,"Nb",this.vi);this.Db.fa(this.A());a.listen(this.Db,"Esc",this.cj);a.listen(this.Db,"Close Window",this.vi);a.listen(this.Db,"Play/Pause",this.bo);a.listen(this.Db,"Stop",this.Lj);a.listen(this.Db,"Repeat",this.co);a.listen(this.Db,"Shuffle",this.eo);a.listen(this.Db,"Previous",this.ur);a.listen(this.Db,"Next",this.sr);a.listen(this.Db,"Thumbs Down",this.fo);a.listen(this.Db,"Thumbs Up",this.ho);
a.listen(this.Db,"Volume Down",this.Mj);a.listen(this.Db,"Volume Up",this.Nj);a.listen(tya.document.body,"mouseover",this.Bs);a.listen(tya.document.body,"mouseout",this.As);a.listen(this.Wd,"Hb",this.ys);a.listen(this.Wd,"Ib",this.iq);a.listen(this.Wd,"click",this.cj);this.qa.Cb.focus();tyW(this.Bf,!1);tysp(this)};tyqp.prototype.vi=function(){tya.close()};
tyqp.prototype.Pa=function(a){switch(a.getState()){case 1:tytp();tyup(this);this.Bd&&tyvp(this);break;case 2:case 3:case 4:this.qa.Cb.disabled=!1;var b=this.Ro,c=tyJf(a,tyXf,2);this.Ro=c.getId()||"";this.Aa.Sj(c.Hl()||"");this.Aa.setTitle(c.getName()||"");this.hb.uo(c.Wq()||0);this.hb.oo(tyL(c,11)||"");this.Wb=a.getCurrentTime()||0;this.Sf=tyL(c,10)||0;this.hb.setCurrentTime(this.Wb);this.hb.wo(this.Sf);tywp(this);var d=this.qa;switch(a.Xq()||1){case 1:tycp(d);break;case 2:d.sc.value="SINGLE_REPEAT";
tyod(d.sc,{title:tyap});break;case 3:d.sc.value="LIST_REPEAT",tyod(d.sc,{title:ty$o})}d=this.qa;switch(a.$q()||1){case 1:tydp(d);break;case 2:d.ec.disabled=!1;d.ec.value="ALL_SHUFFLE";tyod(d.ec,{title:ty8o});break;case 4:d.ec.disabled=!0}tybp(this.qa,3==a.getState());b!==this.Ro&&(b=this.Aa,b.Pp.style.left="0px",b.ta.style.left="0px",b.lo(),ty6(this.za,this.rq,tyEo,{eu:c.getName(),artistName:c.Hl()}));2==a.getState()&&(this.qa.Cb.disabled=!0);this.Ia||(this.Ia=!0,this.Aa.Kf(this.Ia),this.hb.Kf(this.Ia),
a=this.qa,a.Cb.disabled=!1,a.sc.disabled=!1,a.ec.disabled=!1,a.xj.disabled=!1,a.Kj.disabled=!1,this.qa.Cb.disabled=!1,tyZ(this.Dk,"rb"),tyY(this.A(),"U"));this.Bd&&tyvp(this);break;case 5:tytp();tyup(this);c=!this.Bd;switch(a.Em()){case 1:a="account-type-changed";break;case 2:a="another-stream-being-played";break;case 6:a="segment-streaming-rate-limit-reached";break;case 7:a="stream-rate-limit-reached";break;case 9:a="unauthenticated-user";break;case 12:a="other-authenticated-user";break;default:c=
!1,a="generic-playback-error"}c?(ty2o(this.jd,a,void 0),tyW(this.Bf,!0)):tyxp(this,a)}};var tyup=function(a){if(a.Ia){a.Ia=!1;a.Aa.Kf(a.Ia);a.Aa.Sj("");a.Aa.setTitle("");a.hb.Kf(a.Ia);a.hb.ll();tybp(a.qa,!1);var b=a.qa;b.Cb.disabled=!0;b.sc.disabled=!0;b.ec.disabled=!0;b.xj.disabled=!0;b.Kj.disabled=!0;b.sc.value="NO_REPEAT";b.ec.value="NO_SHUFFLE";tycp(b);tydp(b);tyY(a.Dk,"rb");tyZ(a.A(),"U")}},tytp=function(){var a=chrome.i18n.getMessage("3645577032204040606");tya.document.title=a};
tyqp.prototype.Qm=function(){this.dispatchEvent("$b")};tyqp.prototype.Rm=function(){};tyqp.prototype.Jm=function(){};var tyxp=function(a,b,c){ty2o(a.jc,b,c);tyup(a);a.Bd=!0;tyyp(a);ty_(a.Ii,"rb",!1)},tyvp=function(a){a.Bd=!1;tyyp(a);ty_(a.Ii,"rb",!0)};ty=tyqp.prototype;ty.ho=function(){this.dispatchEvent("fc")};ty.fo=function(){this.dispatchEvent("ec")};ty.Mj=function(){this.dispatchEvent("gc")};ty.Nj=function(){this.dispatchEvent("hc")};ty.bo=function(){this.Ia?this.dispatchEvent("Yb"):this.uh()};
ty.co=function(){this.dispatchEvent("ac")};ty.eo=function(){this.dispatchEvent("cc")};ty.ur=function(){tyMd()==this.Bk?this.ze(-5E3):this.xh()};ty.sr=function(){tyMd()==this.Bk?this.ze(5E3):this.wh()};ty.ze=function(a){if(0!==a){var b=this.Wb+a;b>this.Sf?a=this.Sf-this.Wb:0>b&&(a=0-this.Wb);this.dispatchEvent(new ty3o(a))}};ty.uh=function(){this.dispatchEvent("Ub")};ty.wh=function(){tybp(this.qa,!1);this.qa.Cb.disabled=!0;this.dispatchEvent("Xb")};
ty.xh=function(){tybp(this.qa,!1);this.qa.Cb.disabled=!0;this.dispatchEvent("Zb")};ty.Lj=function(){this.dispatchEvent("dc")};ty.hf=function(){this.dispatchEvent("Wb")};ty.Xi=function(){this.dispatchEvent("Sb")};ty.Yi=function(){this.dispatchEvent("Tb")};ty.iq=function(){this.dispatchEvent("Vb")};var tywp=function(a){a.ha.qf()||(a.Gj=!0,a.ha.Gh(a.Sf),a.ha.nb(a.Wb),a.Gj=!1)},typp=function(a,b){var c=tyb(b)?b:a.Aa.Ne.gd();chrome.app.window.current().setAlwaysOnTop(c);ty7g(a.pj,c)};ty=tyqp.prototype;
ty.Bs=function(){tyZ(this.Aa.Af,"tb")};ty.As=function(){tyY(this.Aa.Af,"tb")};ty.Os=function(){this.Ck.style.width=this.ha.P.style.left;this.Gj||this.ha.qf()||this.ze(this.ha.ja()-this.Wb)};ty.np=function(){this.Ck.style.width=this.ha.P.style.left;this.ze(this.ha.ja()-this.Wb)};ty.ys=function(){tyGf(this.ia,"Button Clicked","About Page Close");this.cj()};ty.$t=function(){this.gj=!0;tyyp(this);tyZ(this.Yf,"rb");this.Yf.focus()};ty.cj=function(){this.gj=!1;tyyp(this);tyY(this.Yf,"rb")};
ty.zo=function(){tyb(this.vl)||(this.vl=new tySo(this.aa));this.vl.da(!0)};var tyzp=function(a,b){ty_(a.Wn,"sb",!b);ty_(a.Dk,"sb",!b)},tyyp=function(a){a.gj?(a.jc.Ae(!1),a.hb.Ae(!1),tyzp(a,!a.Bd)):a.Bd?(a.jc.Ae(!0),a.hb.Ae(!1),tyzp(a,!1)):(a.hb.Ae(!0),tyzp(a,!0))};tyqp.prototype.Sd=function(a){this.Wd.Sd(a)};
var tyrp=function(a,b){this.ha=a;this.Ys=b},tysp=function(a){tyge(function(){ty_(this.A(),"rb",!1);var a=tya.outerHeight/tya.innerHeight,c=this.A().offsetWidth*a,a=this.A().offsetHeight*a;chrome.app.window.current().resizeTo(c,a);c=this.Aa;c.Hk=tynp(c,c.Ge,!1);c.Gk=tynp(c,c.Ge,!0);c.mi=tynp(c,c.Xd,!1);c.li=tynp(c,c.Xd,!0);c=this.Wb;this.Wb=this.ha.Ma();tywp(this);this.Wb=c;tywp(this)},100,a)},tyTn=function(a,b,c){return[new tyYl(a.Ys,tyQn(a.ha,b).x,tyQn(a.ha,c+2).x,100)]};var tyAp=function(a,b){this.aa=a;this.Pd=b;this.ee=tydj();this.I=new tyD(this);this.ee.ei?this.ao():this.I.listen(this.ee,"f",this.ao)};
tyAp.prototype.ao=function(){var a;a=new tyqp(this.aa);a.render(tyld("mini-player-container"));var b=this.Pd;b.U=a;b.I.listen(b.U,"$b",b.ct);b.I.listen(b.U,"Vb",b.bt);b.I.listen(b.U,"bc",b.wr);b.I.listen(b.U,"Ub",b.uh);b.I.listen(b.U,"Xb",b.wh);b.I.listen(b.U,"Zb",b.xh);b.I.listen(b.U,"dc",b.Lj);b.I.listen(b.U,"Yb",b.dt);b.I.listen(b.U,"ac",b.et);b.I.listen(b.U,"cc",b.gt);b.I.listen(b.U,"fc",b.it);b.I.listen(b.U,"ec",b.ht);b.I.listen(b.U,"Sb",b.Xi);b.I.listen(b.U,"Tb",b.Yi);b.I.listen(b.U,"Wb",b.hf);
b.I.listen(b.U,"gc",b.Mj);b.I.listen(b.U,"hc",b.Nj);b.Ke.callback()};var tyBp=function(a){this.ia=a.get(tyDf);this.ee=tydj();this.Ke=new tyx;this.U=null;this.Ja=a.get(typj);this.Ja.sendMessage(309);this.su=new tybo(a);this.Lc=a.get(tyXj);this.Bj=a.get(tyvh);this.qh=new tycg;this.Vm=!0;this.I=new tyD(this);this.I.listen(this.ee,["f","g"],this.Rd);this.I.listen(this.Lc,"fa",this.Rd);this.I.listen(this.Bj,["online","offline"],this.Rd)};ty=tyBp.prototype;ty.dt=function(){tyBj(this.Ja,1)};ty.et=function(){tyBj(this.Ja,7)};ty.gt=function(){tyBj(this.Ja,6)};
ty.it=function(){tyBj(this.Ja,4)};ty.ht=function(){tyBj(this.Ja,5)};ty.Mj=function(){tyBj(this.Ja,15)};ty.Nj=function(){tyBj(this.Ja,14)};ty.Xi=function(){tyBj(this.Ja,13);tyCp()};ty.Yi=function(){tyBj(this.Ja,12);tyCp()};ty.Lj=function(){tyGf(this.ia,"Button Clicked","Stop");tyBj(this.Ja,10)};ty.xh=function(){tyBj(this.Ja,3)};ty.ct=function(){this.Ja.sendMessage(308)};
ty.bt=function(){var a=this.su,b=new tyx;b.addCallback(tyg(a.kc.Fm,a.kc,!0,!1));b.addCallback(a.jq,a);b.addCallback(a.br,a);b.addCallback(a.gq,a);b.callback()};ty.wr=function(a){this.ze(a.delta)};ty.ze=function(a){tyBj(this.Ja,8,a)};ty.uh=function(){tyBj(this.Ja,11)};ty.wh=function(){tyBj(this.Ja,2,void 0,void 0,void 0,5)};var tyCp=function(){1<tyfo().length&&tyfo()[1].focusWindow()};ty=tyBp.prototype;
ty.hf=function(){if(1<tyfo().length)tyCp();else{var a=tyNa(tydo("chrome_app_miniplayer_play_music_icon"));tyeo(a)}};ty.Uh=function(a){this.qh=a;this.Rd()};ty.Ok=function(a,b){this.Mk=a;this.wu=b;this.Rd()};ty.Sd=function(a){this.vf=a;this.Ke.addCallback(function(){this.U.Sd(this.vf)},this)};
ty.Rd=function(){this.Ke.addCallback(function(){if(1==this.Zf)this.Bj.re()?tyxp(this.U,"user-not-logged-into-chrome"):tyxp(this.U,"offline");else if(this.Vm)if(2==this.Lc.Dg())if(this.U.Pa(this.qh),this.Bj.re())tyW(this.U.Bf,!1);else{var a=this.U;ty2o(a.jd,"offline",void 0);tyW(a.Bf,!0)}else 4==this.Zf?tyxp(this.U,"verified-user-not-logged-in"):2==this.Zf?tyxp(this.U,"user-not-logged-into-skyjam"):tyb(this.Mk)&&1!=this.Mk?tyxp(this.U,"could-not-connect",{gs:this.Mk,ay:this.wu}):this.U.Pa(this.qh);
else tyxp(this.U,"no-music-account")},this)};var tyEp=function(a){this.kc=a.get(tyuh);this.Ja=a.get(typj);tyDp(this)},tyDp=function(a){var b=new tyx;b.addCallback(tyg(a.kc.Fm,a.kc,!1,!0));tyy(b,function(a){var b=this.Ja;a=a.lt;var e=new tyVf;e.Md(a);b.sendMessage(303,e)},function(){return!0},a);b.addCallback(tya.window.close);b.callback()};var tyFp=chrome.i18n.getMessage("6502885021177224543"),tyGp=chrome.i18n.getMessage("1700078784075267898"),tyHp=chrome.i18n.getMessage("2246437904181111020");chrome.i18n.getMessage("7283335227149007409");var tyIp=function(){var a=new tyMg;this.aa=tya.APPCONTEXT=a};
tyIp.prototype.start=function(){ty2g(this.aa).addCallback(function(){var a;switch(tya.window.location.pathname){case "/dirchooser.html":a=this.aa;var b=new tyFf;tyN(a,tyDf,b);tysh(this.aa);tyth(this.aa);tyxh(this.aa);tyCj(this.aa,new ty6n("dc"));new tyEp(this.aa);a=tyFp;break;case "/miniplayer.html":a=new tyEg;tyN(tySg(),tyCg,a);tycj=a;var b=this.aa,c=new tyFf;tyN(b,tyDf,c);tysh(this.aa);tyth(this.aa);tyxh(this.aa);b=this.aa;tyOg(b,tyao)||tyN(b,tyao,new tybo(b));b.get(tyao);tyN(this.aa,ty7n,new ty8n);
b=this.aa;tyOg(b,tyHf)||tyN(b,tyHf,new tyGg);b.get(tyHf);b=this.aa;c=chrome.storage.local;tyOg(b,ty3g)||tyN(b,ty3g,new ty5g(b,c));b.get(ty3g);c=this.aa;b=new tyAn;tyN(c,tyXj,b);var c=this.aa,d=new tyBe;tyN(c,tyvh,d);c.get(tyvh);c=this.aa;d=new tyfp(c);tyN(c,tyep,d);c=tyCj(this.aa,new ty6n("mp"));d=new tyBp(this.aa);new tyAp(this.aa,d);new ty9n(c,d,a,b);c.sendMessage(306);c.sendMessage(304);c.sendMessage(107);c.sendMessage(301);c.sendMessage(312);c.sendMessage(315);a=tyGp;break;case "/picker.html":a=
tyHp}a&&(tya.document.title=a)},this)};var tyJp=function(a){a&&tyXe().xo()},tyKp=function(){tyXe().xo()};var tyLp=function(){(new tyIp).start()};new function(){for(var a=this.de=new tyzm(tyKp),b=tyba("window"),c=["requestAnimationFrame","mozRequestAnimationFrame","webkitAnimationFrame","msRequestAnimationFrame"],d=0;d<c.length;d++){var e=c[d];c[d]in b&&tyEm(a,e)}tyEm(this.de,"setTimeout");tyEm(this.de,"setInterval");tyqc=tyAm(this.de,tyqc);tyF.prototype.yf=tyAm(this.de,tyF.prototype.yf);a=this.de;tyIb=!0;b=tyg(a.bp,a);for(c=0;c<tyGb.length;c++)tyGb[c](b);tyHb.push(a);tyl(tya,tyma(tyQe,tyJp,!1))};
tyJb(function(a){tyLp=a(tyLp)});tyv(tya,"load",tyLp);
