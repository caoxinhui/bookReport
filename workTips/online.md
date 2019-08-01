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
  - 操作： 
  ```js
  let emitFailed = statusDefault === 'failed'

  let imgFailed = emitFailed && showImg
   let imgStyle = {
    width: imgReady ? `${imgWidth / 100}rem` : (imgFailed ? '0' : '1.48rem'),
    height: imgReady ? `${imgHeight / 100}rem` : (imgFailed ? '0' : '0.98rem')
  }

  <p>{text}</p>

  ```
  问题：如果图片加载失败，会展示一段时间的失败图片，再被替换







```js
<ImageHelper imgUniqueId={imgUniqueId} textUniqueId={textUniqueId}/>

function ImageHelper({imgUniqueId, textUniqueId }) {
  let script = `<script type="text/javascript">
  var targetImage_${imgUniqueId} = document.querySelector('#${imgUniqueId}');
  var targetText_${textUniqueId} = document.querySelector('#${textUniqueId}');

  function setImageStyle(textNode, imageNode) {
    if(textNode && imageNode) {
      textNode.style.display = 'none';
      imageNode.style.height = imageNode.naturalHeight / 100 + 'rem';
      imageNode.style.width = imageNode.naturalWidth / 100 + 'rem';
    }
  }
  if(targetImage_${imgUniqueId}) {
    if(!!targetImage_${imgUniqueId}.naturalHeight) {
      setImageStyle(targetText_${textUniqueId}, targetImage_${imgUniqueId})
    } else {
      targetImage_${imgUniqueId}.onload = function() {
        setImageStyle(targetText_${textUniqueId}, targetImage_${imgUniqueId})
      }
    }
  }
  </script>`;

  return <div dangerouslySetInnerHTML={{__html:script }} /> 
}
```

chrome 模拟图片加载失败， 不显示任何图片
`chrome://settings/content `


```js
import React, { useRef } from "react";
import cx from "classnames";
import useImageRefSize from '../../../hooks/useImageRefSize'

const zIndex1000 = {
  zIndex: 1000
};

export default function BottomNavigation({
  templateConfig,
  handlers,
  state,
  floorId,
  traceValue = {},
}) {
  const { iPhoneX, isSSR } = state; // 是否 iPhoneX 设备已经存储在 state 里, 兼容服务端 & 客户端, 不需要再重新判断

  const {
    defaultSelected,
    contentList,
    selectedTextColor = "#0086F6",
    defaultTextColor = "#333333",
    type,
    backgroundImage,
    backgroundColor
  } = templateConfig;

  let bottomList = [];
  try {
    bottomList = JSON.parse(contentList);
  } catch (err) {
    console.log(err)
  }

  return (
    <div
      className={cx("nav_bottom_wrapper expose_dom", {
        nav_bottom_wrapper_x_or: iPhoneX
      })}
      style={zIndex1000}
      data-expose-key="tang_page_module_expo"
      data-trace-value={JSON.stringify(traceValue)}
    >
      <div
        className="nav_bottom_flex"
        style={{
          backgroundColor,
          backgroundImage: backgroundImage && `url(${backgroundImage})`
        }}
      >
        {bottomList.map((bottomAnchor, index) => {
          const isCurrent = index === Number(defaultSelected);
          return (
            <BottomNav
              bottomAnchor={bottomAnchor}
              floorId={floorId}
              key={index}
              index={index}
              isCurrent={isCurrent}
              traceValue={traceValue}
              handlers={handlers}
              selectedTextColor={selectedTextColor}
              defaultTextColor={defaultTextColor}
              type={type}
              isSSR={isSSR}
            />
          );
        })}
      </div>
    </div>
  );
}

function BottomNav({
  bottomAnchor,
  index,
  isCurrent,
  traceValue,
  handlers,
  selectedTextColor,
  defaultTextColor,
  floorId,
  type,
  isSSR
}) {
  const buttonSortIndex = index + 1

  const { handleLogClickTrace, handleClick } = handlers;
  const { selectedImage, defaultImage, text } = bottomAnchor;

  const handleClickBottom = (e) => {
    e.preventDefault()
    if (isCurrent) return
    handleGotoNav(e, bottomAnchor);
  }

  const handleGotoNav = (e, urls) => {
    const { clickLinkHttp, clickLinkNative, clickLinkHybrid, clickLinkMiniProgram } = urls;
    handleLogClickTrace(e);
    handleClick({ clickLinkHttp, clickLinkNative, clickLinkHybrid, clickLinkMiniProgram });
  };

  const showImg = type === "0";
  let finalShowImage = isCurrent ? selectedImage : defaultImage

  const imageRef = useRef();
  let [imgWidth, imgHeight] = useImageRefSize(imageRef);

  // 服务端已经加载完成图片, 没有触发onload事件时, 直接判断原始高度 or 触发onload事件时获得的高度
  // 若客户端图片加载失败 imageHasLoaded 返回的是宽高 0，hideText 是 false
  // 客户端的代码一直会执行，
  let imageHasLoaded = (imageRef.current && imageRef.current.naturalHeight || imgWidth)

  let hideText = showImg && imageHasLoaded;

  let imgStyle = {
    width: imgWidth ? `${imgWidth / 100}rem` : 0,
    height: imgHeight ? `${imgHeight / 100}rem` : 0
  }

  // 服务端渲染宽高初始值设置为0，后面计算出高度的时候再覆盖
  if (isSSR) imgStyle = { width: '0', height: '0' }

  let textColor = getTextColor(
    isCurrent,
    type,
    selectedTextColor,
    defaultTextColor
  );

  let imgUniqueId = `bottom_img_${floorId}_${index}`;
  let textUniqueId = `bottom_text_${floorId}_${index}`;

  return (
    <div
      data-trace-key="tang_page_button_click"
      data-trace-value={JSON.stringify({
        ...traceValue,
        button: "bottomtab",
        button_sort: buttonSortIndex,
        tabname: text
      })}
      className={cx("nav_bottom_item", {
        nav_bottom_item_img: hideText
      })}
      onClick={handleClickBottom}
      style={{
        color: textColor
      }}
    >
      {!hideText && <p id={textUniqueId}>{text}</p>}
      {showImg && <img src={finalShowImage} id={imgUniqueId} ref={imageRef} style={imgStyle} />}
      {showImg && <ImageHelper imgUniqueId={imgUniqueId} textUniqueId={textUniqueId} />}
    </div>
  );
}

/**
 * 服务端代码，先于任何生命周期之前执行。
 * 当dom上的img获取到 naturalHeight 或者 监听到 图片的 onload 事件，将图片的大小改变。
 * 服务端渲染时，图片的原始大小一定要设置成 0，因为 如果图片加载失败，会显示一个失败的标签。设置成0 后，就算加载失败，宽高也是0，不会影响展示。
 * 
 * 客户端渲染时，ImageHelper 这段代码不会执行。
 * 通过 useImage 方法判断 图片是否加载完成，图片加载失败 返回的 宽高是 0，也是失败状态
 * 
 * 
 * 
 * 先判断 naturalHeight 高度，是因为服务端加载图片 可能非常快，代码还没执行到 onload，图片已经下载完成，
 * 那就一直都不会触发onload事件，所以先要判断 naturalHeight， 如果 naturalHeight 不为 0，说明图片已经加载完成。
 */
function ImageHelper({ imgUniqueId, textUniqueId }) {
  let script = `<script type="text/javascript">
  var targetImage_${imgUniqueId} = document.querySelector('#${imgUniqueId}');
  var targetText_${textUniqueId} = document.querySelector('#${textUniqueId}');

  function setImageStyle(textNode, imageNode) {
    if(textNode && imageNode) {
      textNode.style.display = 'none';
      imageNode.style.height = imageNode.naturalHeight / 100 + 'rem';
      imageNode.style.width = imageNode.naturalWidth / 100 + 'rem';
    }
  }
  if(targetImage_${imgUniqueId}) {
    if(!!targetImage_${imgUniqueId}.naturalHeight) {
      setImageStyle(targetText_${textUniqueId}, targetImage_${imgUniqueId})
    } else {
      targetImage_${imgUniqueId}.onload = function() {
        setImageStyle(targetText_${textUniqueId}, targetImage_${imgUniqueId})
      }
    }
  }
  </script>`;

  return <div dangerouslySetInnerHTML={{ __html: script }} />
}

const getTextColor = (isCurrent, type, selectedTextColor, defaultTextColor) => {
  let textColor = "";
  if (type === "1") {
    textColor = isCurrent ? "#0086F6" : "#333333";
  } else {
    textColor = isCurrent ? selectedTextColor : defaultTextColor;
  }
  return textColor;
};
```


[全局获取的状态 curVideoId 放到 useEffect 中，报错curVideo is not defined](https://overreacted.io/zh-hans/a-complete-guide-to-useeffect/)

useEffect  [] 中传入的变量，要在useEffect外部声明，而不是在useEffect里面声明，在里面声明报 not defined


组件 没有`import React from react` 报服务端错误？？？？

获取DOM元素宽度
`document.querySelector(".classname")`,使用better-scroll, ul外面的包裹层与ul等款，绑定wrapper的宽度应当固定



获取视频真实宽高
```js
document.querySelector("video").videoWidth
document.querySelector("video").videoHeight
```
