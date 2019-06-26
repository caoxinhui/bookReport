1、React 的虚拟DOM的生成可以在任何支持JavaScript的环境生成。
2、虚拟DOM可以直接转成string
3、插入到HTML中输出给浏览器

客户端： 虚拟DOM --- > DOM Element

服务端： 虚拟DOM --- > HTML String


1、 在浏览器里，React 通过 ReactDom 的 render 方法将虚拟 Dom 渲染到真实的 Dom 树上，生成网页
2、 但是在 Node 环境下是没有渲染引擎的，所以 React 提供了另外两个方法：：ReactDOMServer.renderToString 和 ReactDOMServer.renderToStaticMarkup 可将其渲染为 HTML 字符串



在服务端上 Component 生命周期只会到 componentWillMount，客户端则是完整的。