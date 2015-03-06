var mitro=mitro||{};
(function(){function d(a){this.items={};this.count=0;null==a&&(a=-1);this.maxSize=a;this.fillFactor=0.75;this.purgeSize=Math.round(this.maxSize*this.fillFactor);this.stats={};this.stats.hits=0;this.stats.misses=0}mitro.cache={};"undefined"!==typeof module&&module.exports&&(module.exports=mitro.cache);var e=mitro.cache,f=function(a){if(!a)throw Error("Assertion failed");};d.prototype.getItem=function(a){var b=this.items[a];null!=b&&(this._isExpired(b)?(this._removeItem(a),b=null):b.lastAccessed=(new Date).getTime());
a=null;null!=b?(a=b.value,this.stats.hits++):this.stats.misses++;return a};d.prototype.setItem=function(a,b,c){null!=this.items[a]&&this._removeItem(a);this._addItem(new function(a,b,c){if(null==a||""==a)throw Error("key cannot be null or empty");this.key=a;this.value=b;null==c&&(c={});null!=c.expirationAbsolute&&(c.expirationAbsolute=c.expirationAbsolute.getTime());null==c.priority&&(c.priority=2);this.options=c;this.lastAccessed=(new Date).getTime()}(a,b,c));0<this.maxSize&&this.count>this.maxSize&&
this._purge()};d.prototype.clear=function(){for(var a in this.items)this._removeItem(a)};d.prototype._purge=function(){var a=[],b;for(b in this.items){var c=this.items[b];this._isExpired(c)?this._removeItem(b):a.push(c)}if(a.length>this.purgeSize)for(a=a.sort(function(a,b){return a.options.priority!=b.options.priority?b.options.priority-a.options.priority:b.lastAccessed-a.lastAccessed});a.length>this.purgeSize;)b=a.pop(),this._removeItem(b.key)};d.prototype._addItem=function(a){this.items[a.key]=
a;this.count++};d.prototype._removeItem=function(a){var b=this.items[a];delete this.items[a];this.count--;null!=b.options.callback&&setTimeout(function(){b.options.callback(b.key,b.value)},0)};d.prototype._isExpired=function(a){var b=(new Date).getTime(),c=!1;a.options.expirationAbsolute&&a.options.expirationAbsolute<b&&(c=!0);!c&&a.options.expirationSliding&&a.lastAccessed+1E3*a.options.expirationSliding<b&&(c=!0);return c};d.prototype.toHtmlString=function(){var a=this.count+" item(s) in cache<br /><ul>",
b;for(b in this.items)var c=this.items[b],a=a+"<li>"+c.key.toString()+" = "+c.value.toString()+"</li>";return a+"</ul>"};e.LRUCache=d;e.makeKey=function(){for(var a=Array.prototype.slice.call(arguments),b="",c=0;c<a.length;++c)f(-1===(""+a[c]).indexOf("\u009e")),b+=a[c],b+="\u009e";f(0<b.length);return b};e.hash=function(a){return a.split("").reduce(function(a,c){a=(a<<5)-a+c.charCodeAt(0);return a&a},0)}})();
