(function(){var e=function(){var k=[],e=function(a,c,b){a="string"===typeof a?[a]:a;var g=1,d=function(){return a.every(function(a){return!!h[a]})},e=function(){k.push(function(){d()?b():e()})},f=function(a){0==--g&&b&&(c||d()?b():e())};a.forEach(function(a){void 0===h[a]&&(h[a]=null,l.loadFile(rea.extension.getURL(a+".js"),function(){f(a)}),g++)});f()},h={},d={},f={},l={init:function(){},verify:function(a){var c=[],b;for(b in d)d.hasOwnProperty(b)&&(3<d[b].length&&"###"===d[b].substr(0,3)?console.debug("self.verify: development version detected @ "+
b):d[b]!==a&&(console.warn("self.verify: expected version "+a+" and detected "+d[b]+" @ "+b),c.push({name:b,version:d[b],expected:a})));return c},register:function(a,c,b,g){if(!h[a]||g)for(d[a]=c,h[a]=b,a=k,k=[];a.length;)a.pop()()},registerRaw:function(a,c,b,g){if(!f[a]||g)d[a]=c,f[a]=b},vendor:function(a,c){return e(a,!0,c)},require:function(a,c){return e(a,!1,c)},getRaw:function(a){var c=null;if(void 0!==f[a])c=f[a];else{var b=rea.extension.getURL(a);try{var d=new XMLHttpRequest;d.open("GET",b,
!1);d.send(null);(c=d.responseText)||console.log("WARN: content of "+a+" is null!")}catch(e){console.log("getRawContent "+e)}}return c},loadFile:function(a,c){try{var b=document.createElement("script");b.setAttribute("src",a);b.onload=function(){c&&c(a)};(document.head||document.body||document.documentElement||document).appendChild(b)}catch(d){console.log("Error: self.load "+a+" failed! "+d.message)}},isDevVersion:function(a){return d[a]&&"###"===d[a].substr(0,3)},get:function(a){var c,b=h[a];"function"===
typeof b?(c=Array.prototype.slice.call(arguments,1),c=b.apply(this,c)):b&&(c=b);return c}};return l}();window.setTimeout(e.init,1);rea.globals.Registry=e})();