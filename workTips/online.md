react class组件 和 function 函数区别
1、 ref 
  ```js
  class MyComponent extends React.Component {
  constructor(props) {
    super(props)
    this.myRef = React.createRef()
  }
  render() {
    return <div ref={this.myRef} />
    }
  }

  // 访问ref
  const node = this.myRef.current
  ```

  ```js
  function CustomTextInput(props) {
  let textInput = React.createRef()
  function handleClick() {
    textInput.current.focus()
  }
  return (
    <div>
      <input
        type="text" 
        ref={textInput}
      />
      <input
        type="button"
        value="Focus the text input"
        onClick={handleClick}
        />
    </div>
  )
}
  ```


  浏览器内核
  - 微软IE的 Trident
  - 火狐 Gecko
  - Webkit
  - Opera 的 Presto




online 踩坑

 - `React.createRef()` 
  - `function component` 在每次状态更新 `updateState` 的时候都会重刷页面，如果 `const video = React.createRef()` 放在 `function component` 中，那么 `setState` 之后 会重新 `React.createRef()`,拿到的 `video.current === null` ，将  `const video = React.createRef()`当成全局变量放在组件外部，则可以保证每次拿到的 `video` 都是原始的，但是多个视频组件被调用就会有问题，多个视频组件触发的行为都是同一个视频组件的。

 - `useRef` 解决了这种问题，更新状态后 始终拿到的是该视频组件的 `video` 
 - `functional component` 还是多使用hook吧，官方文档也都是用的 `useRef`



底部导航

解决方案：如果不需要保底逻辑（未加载完成的时候显示文字），可以直接服务端渲染，效果类似icon宫格
如果需要保底逻辑。对比差别：
先清除缓存，图片下载结束会立即更新，
如果是已有缓存，因为判断图片加载完成需要在客户端进行，所以底部导航也有变化的过程，比icon宫格还是慢一点，和市场部广告出现的时间是一致的。


Tips: 
  - 尝试： 更改样式，文字始终展示，图片加载成功自动覆盖文字。解决image onload判断时间长的问题。