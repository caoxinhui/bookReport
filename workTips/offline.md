FormData 接口提供了一种表示表单数据的键值对的构造方式，经过它的数据可以使用 XMLHttpRequest.send() 方法送出

```js
let finalPrams = new FormData()
for (let key in params) {
  finalPrams.append(key, params[key])
}
```

离开页面时，接口拿到的 `"content-type"` 是 `"multipart/form-data"` , 因为传参传入的是 `new FormData()` 类型的数据