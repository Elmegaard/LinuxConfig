var _CHROME_VERSION=parseInt(navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)[2],10),LAST_AUTOCOMPLETE_COMPLIANT_CHROME_VERSION=33;function getExtensionId(){return chrome.runtime.id}var getURL=function(a){return chrome.extension.getURL(a?a:"")};
function ExtensionHelper(){this.tabs=chrome.tabs;this.getURL=getURL;this.runPopupActions=function(){};this.isPopup=function(a){chrome.tabs.getCurrent(function(b){a(!b)})};this.setLocation=function(a){window.location="/html/"+a};this.copyFromInput=function(a,b){a.select();document.execCommand("copy");"undefined"!==typeof b&&b()};this.onPopupHidden=function(a){window.onunload=a};this.bindClient=function(a){a.directAccess=!0;a.background=chrome.extension.getBackgroundPage()}}
function ContentHelper(){this.getURL=getURL;var a=this;this.redirectTo=function(a){window.location.href=a};this.createTab=function(b){a.background.createTab({url:b})};this.bindClient=function(a){chrome.extension.onMessage.addListener(function(c,d,e){a.processIncoming(c)});a.addSender("background",function(a){chrome.extension.sendMessage(a)});a.initRemoteCalls("background",["createTab","addSecretFromSelection"]);this.background=a};this.preventAutoFill=function(a,c){c.attr("autocomplete","off");if(_CHROME_VERSION>
LAST_AUTOCOMPLETE_COMPLIANT_CHROME_VERSION){console.log("using extreme measures to prevent browser form saving");var d=document.createElement("input");d.setAttribute("type","password");d.setAttribute("style","display: none;");c[0].appendChild(d)}}};
