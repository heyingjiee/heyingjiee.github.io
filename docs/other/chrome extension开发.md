# chrome extension开发

## 组件
* manifest.json 配置文件
* background.js  
* popup.html (可引入js，css)
* options.html 插件配置页

## 关系

**background.js**  生命周期特别长，跟随浏览器的打开/关闭

**popup.js** 生命周期限于弹窗弹出时

background.js 和 popup中的js 只能通过content-script来调用当前用户打开网页的dom

```js
//获取用户打开的页面的tab
let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
//使用chrome.scripting.executeScript，对用户页面的dom进行操作
chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: setPageBackgroundColor,
});
function setPageBackgroundColor() {
    chrome.storage.sync.get("color", ({ color }) => {
      document.body.style.backgroundColor = color;
    });
}
```

