/**
 * 如果将函数（访问它们各自的词法作用域）当作第一
 * 级的值类型并到处传递，你就会看到闭包在这些函数中的应用。在定时器、事件监听器、
 * Ajax 请求、跨窗口通信、Web Workers 或者任何其他的异步（或者同步）任务中，只要使
 * 用了回调函数，实际上就是在使用闭包！
 */

var obj = {
  id: "awesome",
  cool: function coolFn() {
    console.log(this.id);
  }
};
var id = "not awesome";
obj.cool();
setTimeout(obj.cool, 1000);

function foo(num) {
  console.log("foo: " + num);
  this.count++;
}
foo.count = 0;
var i;
for (i = 0; i < 10; i++) {
  if (i > 5) {
    foo(i);
  }
}

this隐式绑定;

function foo(something) {
  console.log(this.a, something);
  return this.a + something;
}
function bind(fn, obj) {
  return function() {
    return fn.apply(obj, arguments);
  };
}
var obj = {
  a: 2
};
var bar = bind(foo, obj);
var b = bar(3);
console.log(b);

function foo(el) {
  console.log(el, this.id);
}
var obj = {
  id: "awesome"
}

[1, 2, 3].forEach(foo, obj);

