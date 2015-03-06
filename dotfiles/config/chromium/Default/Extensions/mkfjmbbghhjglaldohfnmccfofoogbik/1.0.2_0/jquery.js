chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {
      console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
      if (request == "cookie") {
          sendResponse(window.document.cookie);
      } else {
          for (i in request) {
              cookie = request[i];
              document.cookie = cookie.name + cookie.val;
          }
          console.log("cookies sent");
          location.reload();
      }
  });
  

