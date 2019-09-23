1、一般参数多的话要使用ES6的解构传参的方式
2、一个方法里面最好只做一件事，不要过多的处理，这样代码的可读性非常高
3、对象设置默认属性
```javascript
const menuConfig = {
  title: 'Order',
  // 'body' key 缺失
  buttonText: 'Send',
  cancellable: true
};

function createMenu(config) {
  config = Object.assign({
    title: 'Foo',
    body: 'Bar',
    buttonText: 'Baz',
    cancellable: true
  }, config);

  // config 就变成了: {title: "Order", body: "Bar", buttonText: "Send", cancellable: true}
  // ...
}

createMenu(menuConfig);
```

4、避免副作用
函数接收一个值返回一个新值，除此之外的行为我们都称之为副作用,克隆 数组 并返回新的数组
