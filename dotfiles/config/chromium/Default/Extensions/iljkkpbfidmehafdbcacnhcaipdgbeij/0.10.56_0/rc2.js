(function(){function t(c){var h=[217,120,249,196,25,221,181,237,40,233,253,121,74,160,216,157,198,126,55,131,43,118,83,142,98,76,100,136,68,139,251,162,23,154,89,245,135,179,79,19,97,69,109,141,9,129,125,50,189,143,64,235,134,183,123,11,240,149,33,34,92,107,78,130,84,214,101,147,206,96,178,28,115,86,192,20,167,140,241,220,18,117,202,31,59,190,228,209,66,61,212,48,163,60,182,38,111,191,14,218,70,105,7,87,39,242,29,155,188,148,67,3,248,17,199,246,144,239,62,231,6,195,213,47,200,102,30,215,8,232,234,
222,128,82,238,247,132,170,114,172,53,77,106,42,150,26,210,113,90,21,73,116,75,159,208,94,4,24,164,236,194,224,65,110,15,81,203,204,36,145,175,80,161,244,112,57,153,124,58,133,35,184,180,122,252,2,54,91,37,85,151,49,45,93,250,152,227,138,146,174,5,223,41,16,103,108,186,201,211,0,230,207,225,158,168,44,99,22,1,63,88,226,137,169,13,56,52,27,171,51,255,176,187,72,12,95,185,177,205,46,197,243,219,71,229,165,156,119,10,166,32,104,254,127,193,173],e=[1,2,3,5];c.rc2=c.rc2||{};c.rc2.expandKey=function(b,
n){"string"===typeof b&&(b=c.util.createBuffer(b));n=n||128;var f=b,e=b.length(),k=n,l=Math.ceil(k/8),k=255>>(k&7),g;for(g=e;128>g;g++)f.putByte(h[f.at(g-1)+f.at(g-e)&255]);f.setAt(128-l,h[f.at(128-l)&k]);for(g=127-l;0<=g;g--)f.setAt(g,h[f.at(g+1)^f.at(g+l)]);return f};var m=function(b,n,f){var h=!1,k=null,l=null,g=null,m,r,a,p,q=[];b=c.rc2.expandKey(b,n);for(a=0;64>a;a++)q.push(b.getInt16Le());f?(m=function(d){for(a=0;4>a;a++)d[a]+=q[p]+(d[(a+3)%4]&d[(a+2)%4])+(~d[(a+3)%4]&d[(a+1)%4]),d[a]=d[a]<<
e[a]&65535|(d[a]&65535)>>16-e[a],p++},r=function(d){for(a=0;4>a;a++)d[a]+=q[d[(a+3)%4]&63]}):(m=function(d){for(a=3;0<=a;a--)d[a]=(d[a]&65535)>>e[a]|d[a]<<16-e[a]&65535,d[a]-=q[p]+(d[(a+3)%4]&d[(a+2)%4])+(~d[(a+3)%4]&d[(a+1)%4]),p--},r=function(d){for(a=3;0<=a;a--)d[a]-=q[d[(a+3)%4]&63]});var s=null;return s={start:function(a,b){a&&"string"===typeof a&&(a=c.util.createBuffer(a));h=!1;k=c.util.createBuffer();l=b||new c.util.createBuffer;g=a;s.output=l},update:function(d){for(h||k.putBuffer(d);8<=k.length();){d=
[[5,m],[1,r],[6,m],[1,r],[5,m]];var b=[];for(a=0;4>a;a++){var c=k.getInt16Le();null!==g&&(f?c^=g.getInt16Le():g.putInt16Le(c));b.push(c&65535)}p=f?0:63;for(c=0;c<d.length;c++)for(var e=0;e<d[c][0];e++)d[c][1](b);for(a=0;4>a;a++)null!==g&&(f?g.putInt16Le(b[a]):b[a]^=g.getInt16Le()),l.putInt16Le(b[a])}},finish:function(a){var b=!0;if(f)if(a)b=a(8,k,!f);else{var c=8===k.length()?8:8-k.length();k.fillWithByte(c,c)}b&&(h=!0,s.update());!f&&(b=0===k.length())&&(a?b=a(8,l,!f):(a=l.length(),c=l.at(a-1),c>
a?b=!1:l.truncate(c)));return b}}};c.rc2.startEncrypting=function(b,e,f){b=c.rc2.createEncryptionCipher(b,128);b.start(e,f);return b};c.rc2.createEncryptionCipher=function(b,c){return m(b,c,!0)};c.rc2.startDecrypting=function(b,e,f){b=c.rc2.createDecryptionCipher(b,128);b.start(e,f);return b};c.rc2.createDecryptionCipher=function(b,c){return m(b,c,!1)}}if("function"!==typeof define)if("object"===typeof module&&module.exports){var w=!0;define=function(c,h){h(require,module)}}else return"undefined"===
typeof forge&&(forge={}),t(forge);var u,x=function(c,h){h.exports=function(e){var h=u.map(function(b){return c(b)}).concat(t);e=e||{};e.defined=e.defined||{};if(e.defined.rc2)return e.rc2;e.defined.rc2=!0;for(var b=0;b<h.length;++b)h[b](e);return e.rc2}},v=define;define=function(c,h){u="string"===typeof c?h.slice(2):c.slice(2);if(w)return delete define,v.apply(null,Array.prototype.slice.call(arguments,0));define=v;return define.apply(null,Array.prototype.slice.call(arguments,0))};define(["require",
"module","./util"],function(){x.apply(null,Array.prototype.slice.call(arguments,0))})})();
