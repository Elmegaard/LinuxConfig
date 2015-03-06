function updateTitle() {
  if (document.orig_title == undefined) {
    document.orig_title = document.title;
  }

  chrome.extension.sendRequest({
      'location': document.location,
      'title': document.orig_title,
    }, function(response) {
      document.title = response.formatted_title;
    });
}

if (!document.cannot_update_title) {
  updateTitle();
}

