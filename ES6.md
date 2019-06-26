
对象的扩展
```javascript
function getObj(key, value) {
 return {[key], value}
}
// a得到的就是一个对象
var a = getObj('a': 2),
// 而如果直接写成如下形式
```
```javascript
function getObj(key,value){
    return {key,value}
}
var obj = {
 [propKey]: true,
 ['a' + 'bc']: 123
}
// 得到
{foo: true, abc: 123}

var property = 'a'
var obj = {
    property:122,
    'b':212
}
```

Promise.all方法返回一个promise实例，此实例在 iterable 参数内所有的 promise 都“完成（resolved）”或参数中不包含 promise 时回调完成（resolve）；如果参数中promise 有一个失败（rejected），此实例回调失败（reject），失败原因的是第一个失败 promise 的结果。


componentWillReceiveProps生命周期
是这样一个生命周期：在某一个生命周期里面可以同时拿到当前的状态和即将到来的状态。并作相应的处理,一般用来监听事件


浅拷贝和深拷贝
```javascript
var obj1 = {
    a: 1,
    b: {c: 1}
}
var obj2 = {
    ...obj
}
...运算符实际是浅拷贝，obj1 === obj2 //false
obj1.a === obj2.a
obj1.b === obj2.a
内部引用的属性用的是同一个物理地址，但外部的obj1 和 obj2 不一样
```
```javascript
// 深拷贝
var newObj = JSON.parse(JSON.stringify(obj1))
newObj.b === obj1.b //false
// 内部所有的属性的物理地址都改变了
```

virtual dom 算法知识整理

创建一个二维数组：
```javascript
var d = Array.from({ length: len2 + 1 })
    .map(
        () => Array.from({ length: len1 + 1 })
    )
```

```
let [a, b] = [1,2]
```
解构

promise
```javascript
setTimeout(function () {
    var a = 100;
    console.log(a)
    setTimeout(function () {
        var b = 200
        console.log(b)
        setTimeout(function () {
            var c = 300
            console.log(c)
        }, 1000)
    }, 1000)
}, 1000)

new Promise(function (resolve,reject) {
    setTimeout(function () {
        var a = 100
        resolve(a)
    }, 1000)
}).then(function(res){
    console.log(res)
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            var b = 200
            resolve(b)
        }, 1000)
    })
}).then(function(res){
    console.log(res)
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            var c = 300
            resolve(c)
        },1000)
    })
}).then(function(res){
    console.log(res)
})
```