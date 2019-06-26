```javascript
// 通过props传递值
export default class App extends React.Component {
  render() {
    return <Toolbar theme="dark"/>
  }
}
function Toolbar(props) {
  return (
    <div>
      <ThemeButton theme={props.theme}/>
    </div>
  )
}
class ThemeButton extends React.Component {
  render() {
    return <Button theme={this.props.theme}/>
  }
}
class Button extends React.Component {
  render() {
    return <input type="button" value="按钮" theme={this.props.theme}/>
  }
}
```



```javascript
// 使用context传递值
const ThemeContext = React.createContext({
  background: 'red',
  color: 'white'
});
class App extends React.Component {
  render () {
    return (
      <ThemeContext.Provider value={{background: 'green', color: 'white'}}>
        <Header />
      </ThemeContext.Provider>
    );
  }
}
class Header extends React.Component {
  render () {
    return (
      <Title>Hello React Context API</Title>
    );
  }
}
 
class Title extends React.Component {
  render () {
    return (
      <ThemeContext.Consumer>
        {context => (
          <h1 style={{background: context.background, color: context.color}}>
            {this.props.children}
          </h1>
        )}
      </ThemeContext.Consumer>
    );
  }
}
export default App
```


```javascript
// 高阶组件由来
// react-imvc 高阶组件源码
/**
 * 
 * connect 是一个高阶函数，第一次调用时接受 selector 函数作为参数，返回 withData 函数。
 * withData 函数接受一个 React 组件作为参数，返回新的 React 组件。withData 会将 selector 函数返回的数据，作为 props 传入新的 React 组件
 * selector({ state, handlers, actions }) 函数将得到一个 data 参数，其中包含三个字段 state, handlers, acitons，分别对应 controller 里的 global state, global handlers 和 actions 对象。
*/

import React from 'react'
import GlobalContext from '../context'

const returnNull = () => null
export default (selector = returnNull) => InputComponent => {
	return function Connector(props) {
		return (
			<GlobalContext.Consumer>
				{({ state, handlers, actions }) => {
					return (
						<InputComponent
							{...props}
							{...selector({ state, handlers, actions, props })}
						/>
					)
				}}
			</GlobalContext.Consumer>
		)
	}
}

```

了解同构