每次周末都没事做，平时工作日积累下没有来得及整理的内容记录下来

https://gist.github.com/Rich-Harris/fd6c3c73e6e707e312d7c5d7d0f3b2f9

只用 react-hooks 来做状态管理的介绍文章。
https://kentcdodds.com/blog/application-state-management-with-react

https://webpack.docschina.org/guides/tree-shaking/
tree shaking


https://twitter.com/dan_abramov/status/1120971795425832961



ref某些情况下你需要在典型数据流外强制修改子组件


原型地址


sourcetree使用方法学习


检测是否是合法的json数据格式
```js
export function handleCheckIsJSON(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}
```

ctrl + P 查找文件


请求接口获得参数后转换名字
```js
let { a: newName } = this.get()
// a,this.get()返回的参数

```


文章推荐
https://mp.weixin.qq.com/s/l0Wx2ubdDGfNeE7blMQkjw
https://mp.weixin.qq.com/s/7GrwURsC-4ksrySv2ww7UA


高阶组件

react-imvc框架

connect是一个高阶函数，第一次调用时接受selector函数作为参数，返回withData函数
withData函数接受一个React组件作为参数，返回新的react组件，withData会将selector函数返回的数据，作为props传入新的react组件。

```js
import React from 'react'
import connect from 'react-imvc/hoc/connect'
const withData = connect(({state}) => {
  return {
    content: state.loadingText
  }
})
export default withData(Loading)
function Loading(props){
  if(!props.content){
    return null
  }
  return (
    <div id="wxloading" className="wx_loading">
      <div className="wx_loading_inner">
        <i className="wx_loading_icon"/>
        {props.content}
      </div>
    </div>
  )
}
```

React 实现服务端渲染
https://juejin.im/post/5af443856fb9a07abc29f1eb 
prd




函数式编程思想推荐阅读
https://zhuanlan.zhihu.com/p/63744358?utm_source=wechat_session&utm_medium=social&utm_oi=940270556197728256


sourcetree学习
git学习 https://www.w3cschool.cn/isrekq/gkw3iozt.html


学习react源码，react-imvc源码，relite源码，react渲染机制


缓动曲线类似于二阶函数，函数变化率越高，速度越快。
其中变量是t，c是变化率，b是常亮

```js
const easeFunctions = {
  easeInQuad: function (t, b, c, d) {
    t /= d;
    return c * t * t + b;
  },
  easeOutQuad: function (t, b, c, d) {
    t /= d;
    return -c * t* (t - 2) + b;
  }
}
const moveTo = new MoveTo({
  tolerance: activeTop,
  duration: 200,
  easing: 'easeOutQuad'
}, easeFunctions)
moveTo.move(targetEle)
}
```

业务中，当没有请求到定位目的地的时候，会开启客户端渲染。

开启客户端渲染的时候，会对市场部广告的占位产生影响

关闭服务端渲染，对页面不应该有影响

当判断在客户端时，也要给占位设置高度


https://github.com/521xueweihan/git-tips  git 命令

你不知道的js 继续阅读


https://github.com/metafizzy/zdog 3D 动画 

react-imvc中this.context { req,res } 是何时赋值进去的


node-proxy 接口封装

conf/ gateway 文档阅读

[映杰分享](https://www.weibo.com/ttarticle/p/show?id=2309404382107785933493#_0)



[React setState 实现原理](https://imweb.io/topic/5b189d04d4c96b9b1b4c4ed6)


[开发网站](https://dev.to/)



[利用webpack搭建脚手架一套完整流程](https://mp.weixin.qq.com/s/23f64lu-qAEAK76lFYyzow)