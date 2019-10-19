function foo() {
  var name = "kj";
  return function () {
    console.log(name);
  };
}
var bar = foo();
bar();

var count = 0;
function add() {
  count = count + 1;
  console.log(count);
}
add();

function addCount() {
  var count = 0;
  return function () {
    count = count + 1;
    return count;
  };
}

for (var i = 0; i < 4; i++) {
  setTimeout(function () {
    console.log(i);
  }, 300);
}

for (var i = 0; i < 4; i++) {
  setTimeout(function (i) {
    return function () {
      console.log(i);
    };
  }, 1000);
}

// lodash源码apply方法重写
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0:
      return func.call(thisArg);
    case 1:
      return func.call(thisArg, args[0]);
    case 2:
      return func.call(thisArg, args[0], args[1]);
    case 3:
      return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}


/**
 * 为什么 async/await 会对返回值产生一次 then 属性访问 ? 
 */
var test = async () => new Proxy({}, {
  get(target, name) {
    console.log('get', name)
    return 1
  },
  set(target, key, value) {
    console.log('set', key)
    return true
  },
  has(target, key) {
    console.log('has', key)
    return true
  }
})

/**
 * Promise.resolve(value)方法返回一个以给定值解析后的Promise对象。但如果这个值是个thenable（即带有then方法），
 * 返回的promise会“跟随”这个thenable的对象，
 * 采用它的最终状态（指resolved/rejected/pending/settled）；否则以该值为成功状态返回promise对象。
 * Promise/A+ 规范明确了 thenable 的概念，可以让不同的 promise 实现通过 thenable 互相转换
 */

var test1 = async () => {
  return { then(resolve, reject) { resolve(1) } }
}
console.log(await test1())





```js
function always(value) {
  return function(){
    return value
  }
}
var f = always(function(){})
var g = always(function(){})
f() === f()  // true 闭包会捕获一个值（或引用），并多次返回相同的值
g() === f()  // false 每一个新的闭包都会捕获不一样的值
```
