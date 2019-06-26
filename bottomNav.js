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

