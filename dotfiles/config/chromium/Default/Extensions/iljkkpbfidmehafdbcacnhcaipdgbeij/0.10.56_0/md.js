(function(){function e(a){a.md=a.md||{};a.md.algorithms={md5:a.md5,sha1:a.sha1,sha256:a.sha256};a.md.md5=a.md5;a.md.sha1=a.sha1;a.md.sha256=a.sha256}if("function"!==typeof define)if("object"===typeof module&&module.exports){var h=!0;define=function(a,c){c(require,module)}}else return"undefined"===typeof forge&&(forge={}),e(forge);var f,k=function(a,c){c.exports=function(b){var c=f.map(function(b){return a(b)}).concat(e);b=b||{};b.defined=b.defined||{};if(b.defined.md)return b.md;b.defined.md=!0;for(var d=
0;d<c.length;++d)c[d](b);return b.md}},g=define;define=function(a,c){f="string"===typeof a?c.slice(2):a.slice(2);if(h)return delete define,g.apply(null,Array.prototype.slice.call(arguments,0));define=g;return define.apply(null,Array.prototype.slice.call(arguments,0))};define(["require","module","./md5","./sha1","./sha256"],function(){k.apply(null,Array.prototype.slice.call(arguments,0))})})();