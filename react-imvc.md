app.config.js 的作用是什么

Pageheader 在 layout 里面用到了，然后在中间件也用到了，为何，传递的 headerIdentify 有什么用

dangerouslySetInnerHTML，为何引入 style 组件也会用 dangerouslySetInnerHTML

如果一个方法返回了一个 HTML 字符串，包括<br/>等，这个方法放在正常的 HTML 页面里面，它是会换行的，但是 React 不会，因为 react 不会自动帮你解析 html 代码，因为不合时宜的 innerHTML 可能会导致跨站脚本攻击 XSS。dangerouslySetInnerHTML 这个 prop 的命名是故意这么设计的，以此来警告，它的 prop 值（ 一个对象而不是字符串 ）应该被用来表明净化后的数据。这么做的意义在于，{\_\_html:...} 背后的目的是表明它会被当成 "type/taint" 类型处理。 这种包裹对象，可以通过方法调用返回净化后的数据，随后这种标记过的数据可以

如果在 react 里面不使用 dangerouslySetInnerHTML，他就是 type/taint 类型的，不会执行。加入 dangerouslySetInnerHTML 是可以执行 HTML 或者 JavaScript，HTML，CSS 脚本

Layout 传入的 props 是通过中间件 res.locals 传进 props 的

在外层 view 中传递值给内层引用的小组件。例如

```javascript
function View({ state, handlers, actions }) {}
<Main state={state} handlers={handlers} />;
```

内层小组件拿到这些 state 和 handlers 的方式
如果是`function 组件`
`function({state,handlers,actions}){}`
如果是`class 组件`
`this.props.handlers,this.props.state,this.props.actions`

imvc 中 export default View({state,handlers}),传入 state，handlers

待学习网站
https://philippspiess.com/scheduling-in-react/
http://www.cs.kent.edu/~jmaletic/papers/ICPC2010-CamelCaseUnderScoreClouds.pdf
http://paultaylor.eu/~pt/prafm/
http://lucifier129.github.io/webppt/07.html#/
https://overreacted.io/a-complete-guide-to-useeffect/ useEffect 的完全指南
https://addyosmani.com/blog/react-window/
https://www.youtube.com/watch?v=UNMkLHzofQI
https://zhuanlan.zhihu.com/p/57131643
https://developers.google.com/web/updates/2019/03/kv-storage
http://lucifier129.github.io/webppt/10.html#/3 graphql 分享

https://github.com/Lucifier129/static-server-toy
https://overreacted.io/writing-resilient-components/

编程面试题之最大并行任务池：1）给定一个 taskList 和 poolSize；2）task 是异步的，返回 promise；3）task 不会失败。要求：1）同时不能有超过 poolSize 的 task 在执行；2）所有 taskList 里的 task 最终都执行完毕

如何实现一个 useInterval(f, interval)，只在 document.hidden 为 false 时，按照 interval 指定的间隔，定时调用 f ？
先实现 useVisibility，获取到 document 是否可见
再基于 useVisibility，实现 useInterval，只在 visibility 为 true 时启动一个定时器
visibility 作为 useEffect 的 dependencies，当它变化时， cleanup 先被执行，清理掉上次的定时器，然后注册的 effect 函数里，发现 visibility 为 false 不去启动定时器
在页面可见状态下，每隔 10 秒去获取一下消息数量。
详见图片 1.png 2.png 3.png

https://overreacted.io/making-setinterval-declarative-with-react-hooks/

学习 Rxjs

https://dev.to/jfet97/the-shortest-way-to-conditional-insert-properties-into-an-object-literal-4ag7
https://gist.github.com/Lucifier129/526d5533128813008059a53fd1199328
codesandbox 添加高阶函数例子，ref 例子，context 例子，熟悉 react 高阶属性

学习 redux，学习 redux 源码
[redux](https://github.com/ecmadao/Coding-Guide/blob/master/Notes/React/Redux/Redux%E5%85%A5%E5%9D%91%E8%BF%9B%E9%98%B6-%E6%BA%90%E7%A0%81%E8%A7%A3%E6%9E%90.md#%E6%9F%AF%E9%87%8C%E5%8C%96%E5%87%BD%E6%95%B0curry)
了解 redux 思想，并了解 react-imvc 实现过程

const a = {
'2':3,
'3':4,
length:2,
splice:Array.prototype.splice,
push:Array.prototype.push
}
a.push(3)

```js
const withData = connect(({ state }) => {
  return {
    content: state.loadingText
  };
});

export default withData(Loading);

connect(selector)(ReactComponent);
// connect 是一个高阶函数，第一次调用时接受 selector 函数作为参数，返回 withData 函数。
// withData 函数接受一个 React 组件作为参数，返回新的 React 组件
// withData 会将 selector 函数返回的数据，作为 props 传入新的 React 组件。
```

```js
Object.defineProperties(exports, {
  For: { enumerable: true, value: For },
  __esModule: { value: true }
});
Object.defineProperties(obj, props);
// __esModule表示引入的是es6模块
Object.defineProperty(obj, prop, descriptor);
```

为什么通常在发送数据埋点请求的时候使用的是 1x1 像素的透明 gif 图片

react-imvc 服务端渲染，服务端请求到的数据，都放到 initialState 里面

中间件 res.locals 中挂载的内容均可用于 Layout 中的 props

取消浏览器记录滚动条位置

```js
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
} else {
  window.onunload = () => window.scrollTo(0, 0);
}
```

history.scrollRestoration 是新增的一个属性，值为 auto|manual,默认为 auto 记录滚动条位置, 设为 manual 时就禁用记录位置的功能

```js
componentDidMount(){
  history.scrollRestoration = 'manual';
}
componentWillUnMount() {
  history.scrollRestoration = 'auto';
}
```

项目中的 routes 文件夹目录起到的是什么作用？

服务端 routes 代码只会在页面初始化的时候执行一次，所以改动了之后要重新启动

静态资源：js、css、img 等非服务器动态运行生成的文件。

asset.vendor 是如何生成的

<h1> webpack </h1>

package.json 中 start 后面跟着 "webpack"，webpack 会找到 webpack.config.js 文件。然后根据配置的入口文件，进行打包

单文件打包

```js
module.exports = {
  entry: {
    index: [path.resolve(__dirname, "../src/single/index.js")]
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].[chunkhash:8].js"
  }
};
```

webpack 中对代码进行了哪些操作？
1、 多文件时可以进行代码切割

- 若入口（pageA,pageB）都用到了 utilB，我们希望把它抽离成单独文件，并且当用户访问 pageA 和 pageB 的时候都能去加载 utilB 这个公共模块，而不是存在于各自的入口文件中。
- pageB 中 utilC 不是页面一开始加载时候就需要的内容，假如 utilC 很大，我们不希望页面加载时就直接加载 utilC，而是当用户达到某种条件(如：点击按钮)才去异步加载 utilC，这时候我们需要将 utilC 抽离成单独文件，当用户需要的时候再去加载该文件。

多文件打包示例

```js
const webpack = require("webpack");
const path = require("path");

module.exports = {
  entry: {
    pageA: [path.resolve(__dirname, "./src/multiple/pageA.js")],
    pageB: path.resolve(__dirname, "./src/multiple/pageB.js")
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].[chunkhash:8].js"
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: "initial",
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0
        },
        vendor: {
          test: /node_modules/,
          chunks: "initial",
          name: "vendor",
          priority: 10,
          enforce: true
        }
      }
    }
  }
};
```

打包出来分为：
1、 业务代码文件，
2、 共同模块文件
3、 异步加载的文件会直接抽离



react-imvc preload是如何实现的？ 

preload提前加载的方式
```html
<!-- 使用 link 标签静态标记需要预加载的资源 -->
<link rel="preload" href="/path/to/style.css" as="style">
```

```js
// 或使用脚本动态创建一个 link 标签后插入到 head 头部
// 当浏览器解析到这行代码就会去加载 href 中对应的资源但不执行，待到真正使用到的时候再执行
const link = document.createElement('link');
link.rel = 'preload';
link.as = 'style';
link.href = '/path/to/style.css';
document.head.appendChild(link);
```

```js
// 在 HTTP 响应头中加上 preload 字段
```


react imvc 中 Model 里面 html:{title}是如何对应到页面的title的 



shark
客户端请求，通过nodejs中间件拦截，对返回的数据进行处理，res就是接口返回的内容。
通过res.json返回JSON格式的数据

fetch 方法会自动补足根域名，只需要自己填写pathname比如说是 /deals/接口名,就可以去请求参数



服务端渲染 关闭服务端渲染与开启服务端渲染，两端渲染不一致问题。
产品列表数据请求了但是没有更新到状态里面
原因是请求接口的地方没有await需要等到接口请求结束之后，才能更新状态，不然UPDATE_STAET更新的可能是空数据



映杰分享
https://v8.dev/blog/cost-of-javascript-2019  在 2019 年里 JS 执行层面的开销
相比 js 字面量作为 initial-state，套一层 JSON.parse 可以得到更快的启动速度



React.createContext() 创建上下文

react-imvc 对 context 上下文的应用。通过 context 提供一个全局态的 store， init component传递的参数(props, context) 中的 context就是 React中的上下文

React组件还有很多个地方可以直接访问父组件提供的Context：
  - 构造方法
  ```js
    constructor(props, context)
  ```
  - 生命周期
  ```js
   - componentWillReceiveProps(nextProps, nextContext)
   - shouldComponentUpdate(nextProps, nextState, nextContext)
   - componetWillUpdate(nextProps, nextState, nextContext)
  ```
  - 对于面向函数的无状态组件，可以通过函数的参数直接访问组件的context
  ```js
  const StatelessComponent = (props, context) => (
    ....
  )
  ```

  react-hooks useContext
  https://frontarm.com/james-k-nelson/usecontext-react-hook/ 

React.createContext 用法欠缺点。对于嵌套很深的context使用起来很臃肿
```js
import React from 'react'

const CurrentRoute = React.createContext({ path: '/welcome' })
const CurrentUser = React.createContext({name:'33'})
const IsStatic = React.createContext(false)

export default function App() {
  return (
    <CurrentRoute.Consumer>
      {currentRoute =>
        <CurrentUser.Consumer>
          {currentUser =>
            <IsStatic.Consumer>
              {isStatic =>
                !isStatic &&
                currentRoute.path === '/welcome' &&
                (currentUser
                  ? `Welcome back, ${currentUser.name}!`
                  : 'Welcome!'
                )
              }
            </IsStatic.Consumer>
          }
        </CurrentUser.Consumer>
      }
    </CurrentRoute.Consumer>
  )
}
```
useContext优化: 不用写各种 Consumer

```js
import React, { useContext } from 'react'

const CurrentRoute = React.createContext({ path: '/welcome' })
const CurrentUser = React.createContext(undefined)
const IsStatic = React.createContext(false)

export default function App() {
  let currentRoute = useContext(CurrentRoute)
  let currentUser = useContext(CurrentUser)
  let isStatic = useContext(IsStatic)

  return (
    !isStatic &&
    currentRoute.path === '/welcome' &&
    (currentUser
      ? `Welcome back, ${currentUser.name}!`
      : 'Welcome!'
    )
  )
}
```


react-imvc 获取 controller实例

```js
export default React.createContext()
```


```js
import { useContext } from 'react'
import GlobalContext from '../context'
export default () => {
  let { ctrl } = useContext(GlobalContext)
  return ctrl
}
```