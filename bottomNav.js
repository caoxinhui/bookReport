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

/**
 * 通过offline下发的图片尺寸自动更新img大小
 */
let img = new Image()
img.src = finalShowImage
console.log(img.width, img.height)

/**
 * 这个时候打印出来的img.width 和 img.height 有可能是 0。
 * 宽高都是0的这个结果很正常，因为图片的相关数据都没有被加载前它的宽高默认就是0，我们需要它加载完所有的相关数据再获取宽和高
 * 
 * 因此： 需要 onload 加载所有的相关数据后，取宽高
 */


let img = new Image()
img.src = finalShowImage
img.onload = () => {
  setImgSize({ imgWidth: img.width, imgHeight: img.height })
}


/**
 * 通过onload就能获取到图片的宽高了。但onload大一点的图通常都比较慢，
 * 不实用，但只要图片被浏览器缓存，那么图片加载几乎就不用等待即可触发onload，我们要的是占位符。
 * 所以有些人通过缓存获取也可以这么写。
 */

let img = new Image()
img.src = finalShowImage
if (img.complete) {
  console.log(img.width, img.height)
} else {
  img.onload = function () {
    console.log(img.width, img.height)
  }
}



/**
 * 通过定时循环检测获取
 * 各浏览器执行结果都能看到通过快速获取图片大小的方法几乎都在200毫秒以内，
 * 而onload至少五秒以上，这差别之大说明快速获取图片宽高非常实用。
 */
let start_time = new Date().getTime()
let img = new Image()
img.src = finalShowImage
let check = () => {
  if (img.width > 0 || img.height > 0) {
    clearInterval(set)
  }
}
let set = setInterval(check, 40)


/**
 * 这些操作过程要等到componentDidMount之后才能开始进行。所以会比较慢。
 * 有了缓存之后onload就比较快了
 */


/**
 * 底部导航图片已经加装完成，但是却没有立刻渲染。原因
 *   会二次调用 useImage判断图片是否加载完成，useImage也没有占用太多时间，主要是要等到componentDidFirstMount之后才会触发事件
 *
 * 所以图片会先加载，然后调用useImage判断图片是否加载完成，而这个过程一定要等到 componentDidFirstMount ，因此造成 图片加载完成却没有立刻渲染的现象
 *
 * useImage 中的 useEffect 只会执行四次
 * 
 *  但是在network里面是能看到图片的请求的
 */
