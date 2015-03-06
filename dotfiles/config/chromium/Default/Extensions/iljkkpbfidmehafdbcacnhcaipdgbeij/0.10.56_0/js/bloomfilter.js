var BloomFilter;
(function(){var l="undefined"!==typeof ArrayBuffer;BloomFilter=function(c,e){var d;"number"!==typeof c&&(d=c,c=32*d.length);this.m=c;this.k=e;var f=Math.ceil(c/32),b=-1;if(l){var a=1<<Math.ceil(Math.log(Math.ceil(Math.log(c)/Math.LN2/8))/Math.LN2),h=1===a?Uint8Array:2===a?Uint16Array:Uint32Array,a=new ArrayBuffer(a*e),g=this.buckets=new Int32Array(f);if(d)for(;++b<f;)g[b]=d[b];this._locations=new h(a)}else{g=this.buckets=[];if(d)for(;++b<f;)g[b]=d[b];else for(;++b<f;)g[b]=0;this._locations=[]}};BloomFilter.prototype.locations=
function(c){for(var e=this.k,d=this.m,f=this._locations,b=c.length,a=2166136261,h,g,k=-1;++k<b;){h=c.charCodeAt(k);if(g=h&4278190080)a^=g>>24,a+=(a<<1)+(a<<4)+(a<<7)+(a<<8)+(a<<24);if(g=h&16711680)a^=g>>16,a+=(a<<1)+(a<<4)+(a<<7)+(a<<8)+(a<<24);if(g=h&65280)a^=g>>8,a+=(a<<1)+(a<<4)+(a<<7)+(a<<8)+(a<<24);a^=h&255;a+=(a<<1)+(a<<4)+(a<<7)+(a<<8)+(a<<24)}a+=a<<13;a^=a>>7;a+=a<<3;a^=a>>17;b=c=a+(a<<5)&4294967295;b+=(b<<1)+(b<<4)+(b<<7)+(b<<8)+(b<<24);b+=b<<13;b^=b>>7;b+=b<<3;b^=b>>17;b=b+(b<<5)&4294967295;
a=-1;for(c%=d;++a<e;)f[a]=0>c?c+d:c,c=(c+b)%d;return f};BloomFilter.prototype.add=function(c){c=this.locations(c+"");for(var e=-1,d=this.k,f=this.buckets;++e<d;)f[Math.floor(c[e]/32)]|=1<<c[e]%32};BloomFilter.prototype.test=function(c){c=this.locations(c+"");for(var e=-1,d=this.k,f,b=this.buckets;++e<d;)if(f=c[e],0===(b[Math.floor(f/32)]&1<<f%32))return!1;return!0};BloomFilter.prototype.size=function(){for(var c=this.buckets,e=0,d=0,f=c.length;d<f;++d)var b=c[d],b=b-(b>>1&1431655765),b=(b&858993459)+
(b>>2&858993459),e=e+(16843009*(b+(b>>4)&252645135)>>24);return-this.m*Math.log(1-e/this.m)/this.k};"undefined"!==typeof exports&&(exports.BloomFilter=BloomFilter)})();
