Registry.require(["promise","helper"],function(){var l=Registry.get("helper"),g=Registry.get("promise"),e={},m=function(a){for(var b=0;0==b||void 0!==e[b];)b="_"+l.createUUID();e[b]=a;return b},n=function(a){var b=g();rea.tabs.getSelected(null,function(c){c=c?c.index:void 0;rea.tabs.create({url:rea.extension.getURL("ask.html")+"?aid="+a,active:!0,index:c},function(a){a||(console.error("rea.tabs.create failed -> giving up now!"),b.reject({error:"rea.tabs.create failed -> giving up now!"}));b.resolve({close:function(){rea.tabs.remove(a.id)}})})});
return b.promise()},q=function(){var a=(new Date).getTime(),b=e;e={};for(var c in b){var d=b[c];d&&a-d.ts<p&&(e[c]=d)}},p=18E4,h=!1,f=function(a,b){h||k.init();var c=g(),d={ts:(new Date).getTime(),com:c,preparat:b,type:a},d=m(d);return n(d).then(function(a){return c.promise().always(function(b){b.ok&&a.close()})})},k={init:function(){h||(h=!0,window.setInterval(q,3E5))},onMessage:function(a){var b=g(),c=a.aid,d=e[c];if(d)if(d.aborter&&(window.clearTimeout(d.aborter),delete d.aborter),"ping"==a.method)e[c].ts=
(new Date).getTime(),b.resolve({pong:!0});else if("preparat"==a.method)b.resolve({preparat:d.preparat,type:d.type});else if("install"==a.method)d.com.resolve({ok:!0}),b.resolve({}),delete e[c];else if("import"==a.method)d.com.resolve({ok:!0,import_ids:a.import_ids}),b.resolve({}),delete e[c];else if("permission"==a.method)d.com.resolve({ok:!0,granted:a.granted,permission:a.permission}),b.resolve({}),delete e[c];else{if("unload"==a.method||"abort"==a.method){b.resolve({});var f=function(){d.com.resolve({ok:!1,
aborted:!0});delete e[c]};"abort"==a.method?f():d.aborter=window.setTimeout(f,1E4)}}else b.reject({error:"unknown_id",action:"close"});return b.promise()},install:function(a){return f("install",a)},import:function(a){return f("import",a)},askForPermission:function(a,b,c){return f("permission",{permission:a,title:b,message:c})},installError:function(a){return f("install_error",a)}};Registry.register("asker","3",k)});
