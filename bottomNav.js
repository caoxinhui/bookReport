const checkIsCurrentBottom = () => {
  const isBottom =
    window.pageYOffset + document.body.clientHeight ===
    document.documentElement.scrollHeight;
  return isBottom;
};
const handleScrollCallBack = () => {
  /**
   * 判断滚动条是否到达页面最底部
   */
  const isCurrentBottom = checkIsCurrentBottom();
  handleAddGap(isCurrentBottom);
};
useEffect(() => {
  handleScrollCallBack();
  window.addEventListener("scroll", handleScrollCallBack);
  return () => window.removeEventListener("scroll", handleScrollCallBack);
});

/**
 * bottomNav是一个function 函数
 * 在这个函数里面更新一个全局的状态，会导致调用爆栈
 * 1、Render methods should be a pure function of props and state; 
 * triggering nested component updates from render is not allowed. 
 * If necessary, trigger nested updates in componentDidUpdate.
 * Check the render method of BottomNavigation.
 * 
 * 2、Maximum update depth exceeded. 
 * This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. 
 * React limits the number of nested updates to prevent infinite loops.
 */
/**
 *  tangram 这个项目对css的敏感度要求比较高。底部导航的问题，本来以为只有offline需要修改，前端js这边并没有限制，
 *  后来offline发布后，前端的显示尺寸还是一样的。原因就是css限制了图片的展示大小。应该要先看下css的。
 *  从这也可以看出函数式编程的重要性了，代码中不应该或者尽量少的常量值，尽可能多的配置项，不然offline一修改，你这边也得跟着修改
 *  就算是css的水平垂直居中，也不应该使用固定元素宽高的那种方式。哎！惨遭打脸
 */

