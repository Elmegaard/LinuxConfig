var lib = chrome.extension.getBackgroundPage();

var example_location = {
  "protocol": "http",
  "hostname": "www.example.com",
  "port": 8080,
  "pathname": "/sub/path",
  "search": "?arg=value",
  "hash": "hash",
};

var example_title = "My Example Page";

document.addEventListener('DOMContentLoaded', function() {
  $('restore').addEventListener('click', restoreOptionsToDefault);
  $('save').addEventListener('click', saveOptions);
  $('format').addEventListener('input', updateExample);

  var tags_table = $("tags-table");
  for (var tag in lib.tags) {
    var tag_name = "{" + tag + "}";

    var example_value = lib.formatPageTitle(
        tag_name, example_location, example_title);

    var row = tags_table.insertRow(-1);
    row.insertCell(-1).appendChild(createTextElem("kbd", tag_name));
    row.insertCell(-1).innerHTML = lib.tags[tag].description;
    row.insertCell(-1).appendChild(createTextElem("code", example_value));
  }

  restoreOptions();
  saveOptions();
});

function getOptionsFormat() {
  return $("format").value;
}

function updateExample() {
  $("example").innerText = lib.formatPageTitle(
    getOptionsFormat(), example_location, example_title);
}

function restoreOptions() {
  console.debug();
  $("format").value = lib.getFormat();

  updateExample();
}

function restoreOptionsToDefault() {
  delete lib.localStorage["format"];
  restoreOptions();
}

function saveOptions() {
  lib.localStorage["format"] = getOptionsFormat();
}

// Helpers

function $(id) {
  return document.getElementById(id);
}

function createTextElem(tag_name, text) {
  var elem = document.createElement(tag_name);
  elem.innerText = text;
  return elem;
}

