(function(){function l(h){var f="undefined"!==typeof process&&process.versions&&process.versions.node,c=null;!h.disableNativeCode&&f&&(c=require("crypto"));(h.prng=h.prng||{}).create=function(f){function n(d){if(32<=a.pools[0].messageLength)return m(),d();a.seedFile(32-a.pools[0].messageLength<<5,function(b,e){if(b)return d(b);a.collect(e);m();d()})}function m(){var d=a.plugin.md.create();d.update(a.pools[0].digest().getBytes());a.pools[0].start();for(var b=1,e=1;32>e;++e)b=31===b?2147483648:b<<2,
0===b%a.reseeds&&(d.update(a.pools[e].digest().getBytes()),a.pools[e].start());b=d.digest().getBytes();d.start();d.update(b);d=d.digest().getBytes();a.key=a.plugin.formatKey(b);a.seed=a.plugin.formatSeed(d);a.reseeds=4294967295===a.reseeds?0:a.reseeds+1;a.generated=0}function l(a){var b=null;if("undefined"!==typeof window){var e=window.crypto||window.msCrypto;e&&e.getRandomValues&&(b=function(a){return e.getRandomValues(a)})}var k=h.util.createBuffer();if(b)for(;k.length()<a;){var g=Math.max(1,Math.min(a-
k.length(),65536)/4),c=new Uint32Array(Math.floor(g));try{for(b(c),g=0;g<c.length;++g)k.putInt32(c[g])}catch(f){if(!("undefined"!==typeof QuotaExceededError&&f instanceof QuotaExceededError))throw f;}}if(k.length()<a)for(b=Math.floor(65536*Math.random());k.length()<a;)for(g=16807*(b&65535),b=16807*(b>>16),g+=(b&32767)<<16,g+=b>>15,g=(g&2147483647)+(g>>31),b=g&4294967295,g=0;3>g;++g)c=b>>>(g<<3),c^=Math.floor(256*Math.random()),k.putByte(String.fromCharCode(c&255));return k.getBytes(a)}var a={plugin:f,
key:null,seed:null,time:null,reseeds:0,generated:0};f=f.md;for(var p=Array(32),q=0;32>q;++q)p[q]=f.create();a.pools=p;a.pool=0;a.generate=function(d,b){function e(m){if(m)return b(m);if(l.length()>=d)return b(null,l.getBytes(d));1048575<a.generated&&(a.key=null);if(null===a.key)return h.util.nextTick(function(){n(e)});m=k(a.key,a.seed);a.generated+=m.length;l.putBytes(m);a.key=c(k(a.key,g(a.seed)));a.seed=f(k(a.key,a.seed));h.util.setImmediate(e)}if(!b)return a.generateSync(d);var k=a.plugin.cipher,
g=a.plugin.increment,c=a.plugin.formatKey,f=a.plugin.formatSeed,l=h.util.createBuffer();a.key=null;e()};a.generateSync=function(d){var b=a.plugin.cipher,e=a.plugin.increment,k=a.plugin.formatKey,g=a.plugin.formatSeed;a.key=null;for(var c=h.util.createBuffer();c.length()<d;){1048575<a.generated&&(a.key=null);null===a.key&&(32<=a.pools[0].messageLength||a.collect(a.seedFileSync(32-a.pools[0].messageLength<<5)),m());var f=b(a.key,a.seed);a.generated+=f.length;c.putBytes(f);a.key=k(b(a.key,e(a.seed)));
a.seed=g(b(a.key,a.seed))}return c.getBytes(d)};c?(a.seedFile=function(a,b){c.randomBytes(a,function(a,d){if(a)return b(a);b(null,d.toString())})},a.seedFileSync=function(a){return c.randomBytes(a).toString()}):(a.seedFile=function(a,b){try{b(null,l(a))}catch(e){b(e)}},a.seedFileSync=l);a.collect=function(d){for(var b=d.length,e=0;e<b;++e)a.pools[a.pool].update(d.substr(e,1)),a.pool=31===a.pool?0:a.pool+1};a.collectInt=function(d,b){for(var e="",c=0;c<b;c+=8)e+=String.fromCharCode(d>>c&255);a.collect(e)};
a.registerWorker=function(c){c===self?a.seedFile=function(a,c){function d(a){a=a.data;a.forge&&a.forge.prng&&(self.removeEventListener("message",d),c(a.forge.prng.err,a.forge.prng.bytes))}self.addEventListener("message",d);self.postMessage({forge:{prng:{needed:a}}})}:c.addEventListener("message",function(b){b=b.data;b.forge&&b.forge.prng&&a.seedFile(b.forge.prng.needed,function(a,b){c.postMessage({forge:{prng:{err:a,bytes:b}}})})})};return a}}if("function"!==typeof define)if("object"===typeof module&&
module.exports){var s=!0;define=function(h,f){f(require,module)}}else return"undefined"===typeof forge&&(forge={}),l(forge);var p,t=function(h,f){f.exports=function(c){var f=p.map(function(c){return h(c)}).concat(l);c=c||{};c.defined=c.defined||{};if(c.defined.prng)return c.prng;c.defined.prng=!0;for(var n=0;n<f.length;++n)f[n](c);return c.prng}},r=define;define=function(h,f){p="string"===typeof h?f.slice(2):h.slice(2);if(s)return delete define,r.apply(null,Array.prototype.slice.call(arguments,0));
define=r;return define.apply(null,Array.prototype.slice.call(arguments,0))};define(["require","module","./md","./util"],function(){t.apply(null,Array.prototype.slice.call(arguments,0))})})();