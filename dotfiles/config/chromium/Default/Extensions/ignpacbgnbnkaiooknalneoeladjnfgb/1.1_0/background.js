// Appends the domain name of each tab to its title.
// For instance, the title of a page http://www.example.com/dir/page.html having
// "Page title" as title becomes:
// "Page title - http://www.example.com/"
//
// Only HTTP and HTTPS pages are affected.
//
// Used by password managers to recognize pages by domain instead of title, for
// more security and stability: page titles change from time to time, are
// language-dependent, and sometimes are too generic (e.g. "Login").

var DEFAULT_FORMAT = "{title} - {protocol}://{hostname}{port}/";

function getFormat() {
  var format = localStorage["format"];
  if (format == undefined) {
    format = DEFAULT_FORMAT;
  }
  return format;
}

var tags = {
  "title": {
    compute: function(location, title) { return title; },
    description: "The page title.",
  },
  "protocol": {
    compute: function(location, title) {
      return location.protocol.replace(":", "");
    },
    description: "The URL protocol, without '<code>://</code>' suffix.",
  },
  "hostname": {
    compute: function(location, title) { return location.hostname; },
    description: "The URL hostname.",
  },
  "port": {
    compute: function(location, title) { return location.port && (":" + location.port); },
    description: "The URL port, prefixed with '<code>?</code>' if not empty.",
  },
  "path": {
    compute: function(location, title) {
      return location.pathname.replace(/^\/?/, "");
    },
    description: "The URL path, without '<code>/</code>' prefix.",
  },
  "args": {
    compute: function(location, title) { return location.search; },
    description: "The URL arguments, prefixed with '<code>?</code>' if not empty.",
  },
  "hash": {
    compute: function(location, title) { return location.hash; },
    description: "The URL hash, prefixed with '<code>#</code>' if not empty.",
  },
};

var _format_regexp = function() {
  tag_names = [];
  for (tag in tags) {
    tag_names.push(tag);
  }
  return new RegExp("{(" + tag_names.join("|") + ")}", "g");
}();

function formatPageTitle(format, location, title) {
  return format.replace(_format_regexp, function(format, tag) {
    return tags[tag].compute(location, title);
  });
}

chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {
    var formatted_title =
        formatPageTitle(getFormat(), request.location, request.title);
    sendResponse({formatted_title: formatted_title});
  });

