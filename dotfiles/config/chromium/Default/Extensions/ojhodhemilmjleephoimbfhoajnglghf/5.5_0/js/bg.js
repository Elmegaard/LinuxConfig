// BLOCK PANDORA FROM MAKING ANY AD REQUESTS
chrome.webRequest.onBeforeRequest.addListener(function(info){
	var url = info.url;
	if(url.match(/proxyAdRequest|mediaserverPublicRedirect|brokenAd/i) != null)
	{
	
		chrome.tabs.query({}, function(tabs) {
			for (var i=0; i<tabs.length; ++i) {
				chrome.tabs.sendMessage(tabs[i].id, {action: "restartOnEnd"}, function(response) {});
			}
		});
		
		return {cancel:true};
	}
	else
	{
		return {cancel:false};
	}
},
{
	urls: ["<all_urls>"],
	types: ["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", "other"]
},
["blocking"]);