var registerLiveSearch=function(g,n,a){var p=function(b,l){for(var a=b.find(".search-this-value").text().toLocaleLowerCase(),e=[],c=0;c<l.length;++c)0<=a.indexOf(l[c])?e.push(1):e.push(0);return e},m=function(b){var a=$(n);b=b.toLocaleLowerCase();for(var g=[b].concat(b.match(/\S+/g)),e={},c=0;c<a.length;++c){var d=$(a[c]),h=[],f=0;if(b)for(var h=p(d,g),f=1024*h[0],k=1;k<h.length;++k)if(h[k])f+=h[k];else{f=0;break}e[d.attr("id")]=f;0<f||!b?(d.attr("data-matches",!0),d.show()):(d.attr("data-matches",
!1),d.hide())}b=a.parent();a.detach().sort(function(a,b){var c=e[$(a).attr("id")],d=e[$(b).attr("id")];return c===d?lowercaseCompare($(a).find(".search-this-value").text().trim().toLocaleLowerCase(),$(b).find(".search-this-value").text().trim().toLocaleLowerCase()):d>c?1:-1});b.append(a)};g.keyup(function(){var b=g.val();a&&(b?a.removeClass("hide"):a.addClass("hide"));m(b)});a&&a.click(function(){a.addClass("hide");g.val("").focus();m("")})};
