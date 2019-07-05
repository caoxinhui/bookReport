[chrome 开发者工具](https://developers.google.com/web/tools/chrome-devtools/network/?hl=zh-cn)

Network Get started
- network  -> ctrl + shift + J 打开控制台
- 右击 network log 头部，选择 Domain， 展示每个请求的域 ：Method, Protocol,Scheme,Remote Address,Priority……
- 点击 capture screenshots 记录 页面加载的过程
- 点击 search ，找 请求头或者请求体 中的内容
- filter ，可 输入正则表达式
- control + shift + P open Command menu
- Block request
  - ctrl+shift+p 输入block， add pattern 输入要block的文件名

Network issues Guide
- HTTP/1.0 或者 HTTP/1.1，chrome允许每个主机同时并发请求6个TCP连接。使用HTTP/2 或者异步请求

Performance Get started
- Performance ctrl+shft + I
- capture setting can set CPU slow down
- open the FPS meter
  - ctrl + shift + p -> show rendering -> in rendering tab -> enable FPS meter -> press escape to close rendering tab
- <font color = "red">todo optimize website speed</font>