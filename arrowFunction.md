箭头函数使用
```javascript
const multiply = num => num * num;

const multiply = function (num) {
    return num * num
}
// 传入多个参数
const multiply = (num1, num2) => num1 * num2

// 传入可变参数
const sum = (num1,num2,...rest) => {
    let result = num1 + num2;
    for (let i = 0; i < rest.length; i++) {
        result += rest[i]
    }
    return result 
}

// 如果返回的是对象
const func = val => ({value: val})
```
箭头函数不适用的场景
-1.
```javascript
// 正常情况对象定义方法
const obj = {
    x: 1,
    print() {
        console.log(this === window)
        console.log(this.x)
    }
}
obj.print() // false , 1
// 使用箭头函数
const obj = {
    x: 1,
    print: () => {
        console.log(this === window)
        console.log(this.x)
    }
}
obj.print() // true , undefied
// 其内部的 this 指向的还是上下文 window，上下文中并没有定义 x
```

-2.
```javascript
// 同样的规则也适用于原型方法的定义，使用箭头函数会导致运行时的执行上下文错误。
function Cat (name) {
    this.name = name;
}

Cat.prototype.sayCatName = () => {
    console.log(this === window); // => true
    return this.name;
};

const cat = new Cat('Miao');
cat.sayCatName(); // => undefined

// 解决办法是：用回传统的函数表达式，像下面这样：
Cat.prototype.sayCatName = function () {
    console.log(this === cat); // => true
    return this.name;
};

```

-3. 事件的回调
```javascript
const btn = document.getElementById('myButton');
btn.addEventListener('click', () => {
  console.log(this === window); // => true
  this.innerHTML = 'Clicked button';
});
// 解决办法：用函数表达式代替箭头函数。像这样：
btn.addEventListener('click', function() {
    console.log(this === btn); // => true
    this.innerHTML = 'Clicked button';
});

```

-4. 构造函数
```javascript
const Message = (text) => {
    this.text = text;
};

var helloMessage = new Message('Hello World!');
// Uncaught TypeError: Message is not a constructor
// 解析：从报错信息可以看出，箭头函数没有 constructor 方法，所以不能用作构造函数。 JavaScript 会通过抛出异常的方式，进行隐式地预防。

// 解决方法：用函数表达式代替箭头函数。
```
