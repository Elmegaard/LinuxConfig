var URI,URIQuery;
(function(){function g(a,b){var c=/^(.*)\//;return a.authority&&!a.path?"/"+b:a.getPath().match(c)[0]+b}function e(a){if(!a)return"";a=a.replace(/\/\.\//g,"/");for(a=a.replace(/\/\.$/,"/");a.match(f);)a=a.replace(f,"/");for(a=a.replace(/\/([^\/]*)\/\.\.$/,"/");a.match(/\/\.\.\//);)a=a.replace(/\/\.\.\//,"/");return a}var f=/\/((?!\.\.\/)[^\/]*)\/\.\.\//;URI=function(a){a||(a="");a=a.match(/^(?:([^:\/?\#]+):)?(?:\/\/([^\/?\#]*))?([^?\#]*)(?:\?([^\#]*))?(?:\#(.*))?/);var b=a[1]||null,c=a[2]||null,d=
a[3]||null,e=a[4]||null,f=a[5]||null;this.getScheme=function(){return b};this.setScheme=function(a){b=a};this.getAuthority=function(){return c};this.setAuthority=function(a){c=a};this.getPath=function(){return d};this.setPath=function(a){d=a};this.getQuery=function(){return e};this.setQuery=function(a){e=a};this.getFragment=function(){return f};this.setFragment=function(a){f=a}};URI.prototype.toString=function(){var a="";this.getScheme()&&(a+=this.getScheme()+":");this.getAuthority()&&(a+="//"+this.getAuthority());
this.getPath()&&(a+=this.getPath());this.getQuery()&&(a+="?"+this.getQuery());this.getFragment()&&(a+="#"+this.getFragment());return a};URI.prototype.resolve=function(a){var b=new URI;this.getScheme()?(b.setScheme(this.getScheme()),b.setAuthority(this.getAuthority()),b.setPath(e(this.getPath())),b.setQuery(this.getQuery())):(this.getAuthority()?(b.setAuthority(this.getAuthority()),b.setPath(e(this.getPath())),b.setQuery(this.getQuery())):(this.getPath()?("/"===this.getPath().charAt(0)?b.setPath(e(this.getPath())):
(b.setPath(g(a,this.getPath())),b.setPath(e(b.getPath()))),b.setQuery(this.getQuery())):(b.setPath(a.getPath()),this.getQuery()?b.setQuery(this.getQuery()):b.setQuery(a.getQuery())),b.setAuthority(a.getAuthority())),b.setScheme(a.getScheme()));b.setFragment(this.getFragment());return b};URI.prototype.parseQuery=function(){return URIQuery.fromString(this.getQuery())};URIQuery=function(){this.params={};this.separator="&"};URIQuery.fromString=function(a,b){var c=new URIQuery;b&&(c.separator=b);c.addStringParams(a);
return c};URIQuery.prototype.addStringParams=function(a){a=a.split(this.separator);for(var b,c,d=0;d<a.length;d++)b=a[d].split("=",2),c=b[0].replace(/\+/g," "),b=b[1].replace(/\+/g," "),this.params.hasOwnProperty(c)||(this.params[c]=[]),this.params[c].push(b)};URIQuery.prototype.getParam=function(a){return this.params.hasOwnProperty(a)?this.params[a][0]:null};URIQuery.prototype.toString=function(){var a=[],b;b=this.params;var c=[],d;for(d in b)b.hasOwnProperty(d)&&c.push(d);b=c.sort();for(c=0;c<b.length;c++)for(d=
0;d<this.params[b[c]].length;d++)a.push(b[c].replace(/ /g,"+")+"="+this.params[b[c]][d].replace(/ /g,"+"));return a.join(this.separator)}})();
