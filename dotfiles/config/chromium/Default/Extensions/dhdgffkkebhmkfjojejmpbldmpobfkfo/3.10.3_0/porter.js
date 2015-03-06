Registry.require(["promise","helper","convert"],function(){var f=Registry.get("promise"),q=Registry.get("helper"),k=Registry.get("convert"),h=function(){var b=f();Registry.vendor(["vendor/saveas/filesaver"],function(){h=f.Pledge;b.resolve()});return b.promise()},p=function(){var b=f();Registry.vendor(["vendor/zip_js/zip","vendor/zip_js/inflate","vendor/zip_js/deflate"],function(){p=f.Pledge;zip.workerScriptsPath=rea.extension.getURL("/vendor/zip_js/");b.resolve()});return b.promise()},l=function(){var b,
c=!1,e,d=function(){var a=f();return e=a};return{write:function(){var a=f();c=!1;zip.createWriter(new zip.BlobWriter,function(d){b=d;a.resolve(d)},a.reject);return a.promise()},open:function(a){var r=d();c=!0;zip.createReader(new zip.BlobReader(a),function(a){b=a;r.resolve(a)},function(a){e&&e.reject(a)});return r.promise()},entries:function(){var a=d();b.getEntries(function(d){a.resolve(d)});return a.promise()},get:function(a){var b=d(),e=new zip.TextWriter;a.getData(e,b.resolve);return b.promise()},
put:function(a,e,c){var m=d();try{b.add(a,new zip.TextReader(e),m.resolve,function(){},{lastModDate:c?new Date(c):void 0})}catch(f){m.reject(f)}return m.promise()},end:function(){var a=d();c?(b.close(),a.resolve()):b.close(a.resolve);return a.promise()}}}(),n={zip:{create:function(b,c){var e=f(),d=0;p().then(function(){return l.write()}).then(function(a){var c=f(),g={},m=function(a,d){var c=[a,d].join(".");if(g[c]){var b;do b=a+" ("+g[c]+")",c=[b,d].join("."),g[c]++;while(g[c]);return m(b,d)}g[c]=
1;return c},h=b.length,t=function(){if(!b.length)return c.resolve();var a=b.shift(),s=m(a.meta.name,"user.js"),g=m(a.meta.name,"options.json"),k=m(a.meta.name,"storage.json"),p=JSON.stringify({options:a.options,settings:a.settings,meta:a.meta}),n=a.storage?JSON.stringify(a.storage):null;d+=a.source.length;console.log("porter: add to zip",s,d);e.notify({item:h-b.length,of:h});l.put(s,a.source,a.meta.modified).then(function(){d+=p.length;console.log("porter: add to zip",g,d);return l.put(g,p)}).then(function(){if(!n)return f.Pledge();
d+=n.length;console.log("porter: add to zip",k,d);return l.put(k,n)}).fail(function(a){console.log("porter: add to zip failed",a)}).always(function(){console.log("porter: add to zip -> next round");window.setTimeout(t,5)})};t();return c.promise()}).then(function(){console.log("porter: add global props");return c?l.put("Tampermonkey.global.json",JSON.stringify(c)):f.Pledge()}).then(function(){return l.end()}).done(function(a){e.resolve(a)}).fail(function(){e.reject()});return e.promise()},read:function(b){var c=
f();p().then(function(){return l.open(b)}).then(function(c){return l.entries()}).then(function(b){var d=f(),a={},h=b.length,g=function(){if(b.length){var f=b.shift();console.log("porter: read from zip",f.filename);l.get(f).done(function(c){var b=f.filename.match(/(.*)\.(storage\.json|options\.json|global\.json|user\.js)$/);if(b&&!(3>b.length))try{var d=b[1],e=b[2];a[d]=a[d]||{};"global.json"!=e&&("user.js"==e?a[d].source=c:"options.json"==e?a[d].options=JSON.parse(c):"storage.json"==e&&(a[d].storage=
JSON.parse(c)))}catch(g){console.warn("porter: read from zip failed",g)}}).always(function(){c.notify({item:h-b.length,of:h});window.setTimeout(g,5)})}else{var k=[];q.each(a,function(a,b){var c=a.options||{};c.source=a.source;c.storage=a.storage;k.push(c)});d.resolve(k)}};g();return d.promise()}).done(function(b){c.resolve(b)}).fail(function(){c.reject()});return c.promise()},download:function(b){var c=f();h().then(function(){return n.zip.create(b).progress(function(b){c.notify(b)})}).done(function(b){saveAs(b,
"tmScripts.zip");c.resolve.apply(this,arguments)}).fail(function(){c.reject.apply(this,arguments)});return c.promise()}},plain:{download:function(b,c){return h().done(function(){var e=new Blob([c],{type:"text/plain"});saveAs(e,b+".user.js")})}},json:{create:function(b,c){var e=f();h().done(function(){var c={created_by:"Tampermonkey",version:"1",scripts:[]};b.forEach(function(a){a={name:a.meta.name,options:a.options,storage:a.storage,enabled:a.settings.enabled,position:a.settings.position,file_url:a.meta.file_url,
uuid:a.meta.uuid,source:k.Base64.encode(k.UTF8.encode(a.source))};c.scripts.push(a)});e.resolve(JSON.stringify(c))});return e.promise()},read:function(b){var c=f();h().done(function(){var e=function(b){if(b.trim()){var a=null;try{return a=JSON.parse(b),a.scripts=q.map(a.scripts,function(a){a.source=k.UTF8.decode(k.Base64.decode(a.source));return a}),c.resolve(a)}catch(f){if(-1!=b.search("<body>")){var a=b.indexOf("<body>"),g=b.lastIndexOf("</body>");if(-1!=a&&-1!=g)return b=b.substr(a+6,g-(a+6)),
e(b)}}}c.reject()};e(b)});return c.promise()},download:function(b){return h().then(function(){return n.json.create(b)}).done(function(b){b=new Blob([b],{type:"text/plain"});saveAs(b,"tmScripts.txt")})}}};Registry.register("porter","3",n)});