```javascript
<div className="baidu-footer" dangerouslySetInnerHTML={{ __html: footer }} />
<script
    dangerouslySetInnerHTML={{
    __html: `
    (function() {
        window.__INITIAL_STATE__ = ${JSON.stringify(props.initialState)}
        window.__APP_SETTINGS__ = ${JSON.stringify(props.appSettings)}
        window.__PUBLIC_PATH__ = '${props.publicPath}'
        __APP_SETTINGS__.context.locationOrigin = '//' + location.hostname
    })()
    `
    }}
/>
```


锚点导航 初始加载锚不中的问题：
    页面初始加载的时候，各个楼层占位高度与实际加载完成高度不一致，导致点击锚点的时候，计算出来的滑动距离按照占位高度计算，而不是实际高度，所以计算距离不准确，导致锚不正确。


    页面加载所有产品的展示不是同时请求的，只有当页面滑到可视区域的时候会请求接口，所以就算页面静止很久也会出现锚点锚不中的问题。
    解决方案：当点击锚点页面滑到某个区域，需要记录下点击的锚点