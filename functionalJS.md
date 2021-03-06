<h2> chapter 4 柯里化 </h2>

高阶函数：将函数作为参数或者返回值是函数的函数。
```js
var add = function (x) {
  return function (y) {
    return x + y
  }
}

// ES6 写法
let add = a => b => a + b
```


<h2> chapter 5 </h2>
  - 代码组合

```js
var compose = function (f, g) {
  return function (x) {
    return f(g(x))
  }
}
```
组合

```js
var toUpperCase = function (x) { return x.toUpperCase() }
var exclaim = function (x) { return x + '!' }
```

左倾 函数，函数从右向左执行。
```js
var compose = function (f, g) {
  return function (x) {
    return f(g(x))
  }
}

var head = function (x) {
  return x[0]
}
var reverse = function (x) {
  return x.reduce((arr, item) => {
    return [item].concat(arr)
  }, [])
}

var last = compose(head, reverse)

last(['jumpkick', 'roundhouse', 'uppercut'])
```

结合律
```js
var associative = compose(f, compose(g, h)) == compose(compose(f, g), h);
```

pointfree(永远不必说出你的数据)

非pointfree
```js
var compose = function (f, g) {
  return function (x) {
    return f(g(x))
  }
}

var toUpperCase = function (x) {
  return x.toUpperCase()
}
var head = function (x) {
  return x[0]
}
var initials = function (name) {
  return name.split(' ').join('. ')
}
initials("hunter stockton thompson");
```

pointfree
```js
var compose = function (f, g) {
  return function (x) {
    return f(g(x))
  }
}

var split = function (x) {
  return x.split(' ')
}
var join = function (x) {
  return x.join('. ')
}

var initials = compose(join, split)
initials("hunter stockton thompson");
```


<h2> chapter 6 </h2>

声明式代码

命令式：命令式的循环要求你必须先实例化一个数组，而且执行完这个实例化语句之后，解释器才继续执行后面的代码

```js
// 命令式
var authenticate = function (form) {
  var user = toUser(form)
  return logIn(user)
}
// 声明式
var authenticate = compose(logIn, toUser)
```

<h2> chapter 7 Hindley-Milner 类型签名</h2>

- 注释？

<h2> chapter 8 特百惠 </h2>


给容器一个属性

```js
var Container = function (x) {
  this.__value = x
}
Container.of = function (x) {
  return new Container(x)
}
Container.of(3)
Container.of("hotdogs")
Container.of(Container.of({ name: "yoda" }))
```

functor : 提供一个方法让别的函数操作容器中的值

```js
Container.prototype.map = function (f) {
  return Container.of(f(this.__value))
}
Container.of(2).map(function (two) { return two + 2 })
```


```js
var Maybe = function (x) {
  this.__value = x
}
Maybe.of = function (x) {
  return new Maybe(x)
}
Maybe.prototype.isNothing = function () {
  return (this.__value === null || this.__value === undefined)
}
Maybe.prototype.map = function (f) {
  return this.isNothing() ? Maybe.of(null) : Maybe.of(f(this.__value))
}
```

match 方法实现
```js
var Maybe = function (x) {
  this.__value = x
}
Maybe.of = function (x) {
  return new Maybe(x)
}
Maybe.prototype.isNothing = function () {
  return (this.__value === null || this.__value === undefined)
}
Maybe.prototype.map = function (f) {
  return this.isNothing() ? Maybe.of(null) : Maybe.of(f(this.__value))
}
var matchReg = function (x) {
  return this.__value.match(x)
}
Maybe.of("Malkovich Malkovich").map(matchReg(/a/ig))
```

错误处理

```js
var Left = function (x) {
  this.__value = x
}
Left.of = function (x) {
  return new Left()
}
Left.prototype.map = function (f) {
  return this
}
var Right = function (x) {
  this.__value = x
}
Right.of = function (x) {
  return new Right(x)
}
Right.prototype.map = function (f) {
  return Right.of(f(this.__value))
}

Right.of("rain").map(function (str) { return "b" + str; });
Right.of({ host: 'localhost', port: 80 }).map(function (str) { return str.host })
```
