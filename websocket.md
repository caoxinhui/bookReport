`HTTP 协议有一个缺陷：通信只能由客户端发起。`

```javascript
// 用node开启一个websocket服务
var app = require('express')()
var WebSocket = require('ws')
var wss = new WebSocket.Server({port:8080})
wss.on('connection',function connection(ws){
    console.log('server: receive connection.')
    ws.on('message',function incoming(message){
        console.log('server: received: %s',message)
    })
    ws.send('world')
})
app.listen(3000)
```

```javascript
// 客户端访问websocket
var ws = new WebSocket('ws://localhost:8080');
ws.onopen = function () {
    console.log('ws onopen');
    ws.send('from client hello');
};
ws.onmessage = function (e) {
    console.log('ws onmessage from server ' + e.data);
};
```

HTTP的生命周期通过request来界定，也就是一个request一个response，在HTTP1.0中，这次HTTP请求就结束了。
在HTTP1.1中进行了改进，使得有一个keep-alive，也就是说，在一个HTTP连接中，可以发送多个Request，接收多个Response。但是请记住 Request = Response ， 在HTTP中永远是这样，也就是说一个request只能有一个response。而且这个response也是被动的，不能主动发起。
