// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var jsArea, jsonArea;

function click(e) {
  chrome.tabs.executeScript(null,
      {code:"document.body.style.backgroundColor='" + e.target.id + "'"});
  window.close();
}

function convertJS2JSON() {
  try {
    var objKeysRegex = /({|,)(?:\s*)(?:')?([A-Za-z_$\.][A-Za-z0-9_ \-\.$]*)(?:')?(?:\s*):/g;// look for object names
    var val = jsArea.value.replace(/(\r\n|\n|\r)/gm," ");
    var jsonObj = val.replace(objKeysRegex, "$1\"$2\":");
    jsonArea.value = JSON.stringify(jsonObj, null, "\t");
  }
  catch (e) {
    // error parsing
    jsonArea.value = "Parsing error";
  }
}

document.addEventListener('DOMContentLoaded', function () {
  //var divs = document.querySelectorAll('div');
  //for (var i = 0; i < divs.length; i++) {
  //  divs[i].addEventListener('click', click);
  //}

  jsArea = document.getElementById('jsArea');
  jsonArea = document.getElementById('jsonArea');

  var convert2Json = document.getElementById('convert2JSON');
  var convert2Js = document.getElementById('convert2JS');

  convert2Json.addEventListener('click', convertJS2JSON);
});
