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
