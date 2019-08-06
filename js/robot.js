document.addEventListener('DOMContentLoaded', function()
{
  console.log('谢局生成器');
  injectCustomJs("js/inject.js");
});

function injectCustomJs(jsPath)
{
  jsPath = jsPath || 'js/inject.js';
  var temp = document.createElement('script');
  temp.setAttribute('type', 'text/javascript');
  // 获得的地址类似：chrome-extension://abc123/js/inject.js
  temp.src = chrome.extension.getURL(jsPath);
  console.log("inject", temp.src);

  (document.head||document.documentElement).appendChild(temp);
}
