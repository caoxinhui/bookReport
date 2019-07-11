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