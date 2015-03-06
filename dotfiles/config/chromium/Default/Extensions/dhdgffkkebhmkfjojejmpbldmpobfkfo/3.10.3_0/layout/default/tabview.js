Registry.require(["crcrc","helper"],function(){var m=Registry.get("helper"),v=Registry.get("crcrc").cr,g=Registry.get("crcrc").crc,b={};Registry.register("layout/default/tabview","3",{create:function(r,l,f){var a=m.filter(r,/[0-9a-zA-Z]/g);r=!1;void 0==f&&(f={tv:"tv",tv_table:"tv_table",tr_tabs:"tr_tabs",tr_content:"tr_content",td_content:"td_content",td_tabs:"td_tabs",tv_tabs_fill:"tv_tabs_fill",tv_tabs_table:"tv_tabs_table",tv_tabs_align:"tv_tabs_align",tv_contents:"tv_contents",
tv_tab_selected:"tv_tab tv_selected",tv_tab_close:"tv_tab_close",tv_tab:"tv_tab",tv_content:"tv_content"});var h=g("div",f.tv,"main"+a),s=g("table",f.tv_table+" noborder","main_table"+a);s.inserted?r=!0:(b[a]={},b[a].g_entries={},b[a].g_selectedId=null);var w=g("tr",f.tr_tabs,"tabs"+l.id+a),x=g("td",f.td_tabs,"pages"+a),y=g("div",f.tv_tabs_fill,"tv_tabs_fill"+a),z=g("div",f.tv_tabs_table,"tv_tabs_table"+a),t=g("div",f.tv_tabs_align,"tv_tabs_align"+a),A=g("tr",f.tr_content,"content"+l.id+a),B=g("td",
f.td_content,"content"+a),C=g("div",f.tv_contents,"tv_content"+a);z.appendChild(t);y.appendChild(z);x.appendChild(y);w.appendChild(x);s.appendChild(w);B.appendChild(C);A.appendChild(B);s.appendChild(A);h.appendChild(s);l.appendChild(h);var D=function(a,b,e){b?a.setAttribute("style",e?m.staticVars.visible_move:m.staticVars.visible):a.setAttribute("style",e?m.staticVars.invisible_move:m.staticVars.invisible);a.setAttribute("vis",b.toString())},E=function(d,c){var e=d.getId();b[a].g_entries[e]&&c!=b[a].g_entries[e].visible&&
(b[a].g_entries[e].visible=c,D(b[a].g_entries[e].tab,c))},u=function(a,b){a&&D(a.content,b,!1)},G=function(d){for(var c in b[a].g_entries){var e=b[a].g_entries[c];if(e.tab.id==d.id)return e}return null};l=function(d){for(var c in b[a].g_entries){var e=b[a].g_entries[c];if(e.entry.getId()==d)return e.entry}return null};var F=function(d){d.hide();d=d.getId();if(d=b[a].g_entries[d]){d.tab.parentNode.removeChild(d.tab);d.content.parentNode.removeChild(d.content);var c;a:{for(c in b[a].g_entries)if(b[a].g_entries[c].tab.id==
d.tab.id)break a;c=null}c&&delete b[a].g_entries[c]}else console.log("tv: WARN: tab not part of tabview!")},h=null;r?h=b[a].tv:(h={getTabById:l,removeTab:F,appendTab:function(a,b,e,f,g){return this.insertTab(void 0,a,b,e,f,g)},insertTab:function(d,c,e,h,m,l){null===d&&(d=t.firstChild);var k=v("div",c,"content"+a),n=void 0!==k.inserted&&!0==k.inserted,p=v("div",c,"head_text"+a);e.appendChild(p);l&&(p=g("div",f.tv_tab_close,c,"tv_close"+a,"tab_close"),p.inserted||p.addEventListener("click",function(){l()}),
p.innerHTML="&#215;",e.appendChild(p));if(n){if(n=G(k))return n.entry;console.log("tv: WARN: old tab, but not in tabs collection!")}var q,n=function(a){""!=a.target.className&&a.target.className==f.tv_tab_close||q.select()};k.setAttribute("tv_id"+a,c);k.addEventListener("click",n);e.setAttribute("tv_id"+a,c);e.addEventListener("click",n);k.setAttribute("name","tabview_tab"+a);k.setAttribute("class",f.tv_tab);k.appendChild(e);d?t.insertBefore(k,d):t.appendChild(k);h.setAttribute("name","tabview_content"+
a);h.setAttribute("tv_id"+a,c);h.setAttribute("class",f.tv_content);C.appendChild(h);q={getId:function(){return c},isVisible:function(){return"true"==k.getAttribute("vis")},isSelected:function(){return b[a].g_selectedId==this.getId()},remove:function(){F(this)},hide:function(){var c=this.getId(),e=c==b[a].g_selectedId;b[a].g_entries[c]?E(this,!1):console.log("tv: WARN: tab not part of tabview!");if(e){var e=c=null,d;for(d in b[a].g_entries)b[a].g_entries[d].visible&&(c=b[a].g_entries[d],e||c.closable||
(e=c));c.closable||(c=e);c?c.entry.select():(b[a].g_selectedId=null,console.log("tv: WARN: selected tab set, but entry collection empty!"))}},show:function(){var c=this.getId();b[a].g_entries[c]?E(this,!0):console.log("tv: WARN: tab not part of tabview!")},select:function(){if(this.getId()!=b[a].g_selectedId){var c=this.getId();b[a].g_selectedId&&u(b[a].g_entries[b[a].g_selectedId],!1);for(var e in b[a].g_entries){var d=b[a].g_entries[e];d.entry.getId()==c?d.visible?d.selected||(d.tab.setAttribute("class",
f.tv_tab_selected),u(d,!0),d.selected=!0):console.log("tv: WARN: tab selected but not visible!"):d.selected&&(d.tab.setAttribute("class",f.tv_tab),u(d,!1),d.selected=!1)}b[a].g_selectedId=c}m&&m()},setHeading:function(a){e.firstChild.textContent=a}};b[a].g_entries[c]={entry:q,tab:k,content:h,closable:null!=l};u(b[a].g_entries[c],!1);q.show();return q}},b[a].tv=h);return h}})});
