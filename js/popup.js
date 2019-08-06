// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';
let KEY_CONTENT = "content";
let content = document.getElementById('contents');
chrome.storage.sync.get(function (data) {
  content.value = data[KEY_CONTENT] || "谢局晚上好。";
  console.log("loaded", content.value);
});

let submitBtn = document.getElementById('sbBtn');
submitBtn.onclick = function (element) {
  let new_content = content.value;
  let data = {};
  data[KEY_CONTENT] = new_content;
  chrome.storage.sync.set(data);
  let b64 = btoa(unescape(encodeURIComponent(new_content)));
  console.log("encodeb64:", b64);

  // reconcile task.  post commit
  chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
    let code  = "var myScript = document.createElement('script');"
      + "myScript.textContent = 'shite_inject.cmtGen(\"" + b64 + "\");';"
      + "document.head.appendChild(myScript);";
    chrome.tabs.executeScript(
      tabs[0].id,
      {code: code});
  });
};
