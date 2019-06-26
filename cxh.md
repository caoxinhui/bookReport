# 2019 年 第 4 周 曹昕卉

## 2019-01-21 (周一)
- 解决聚合页提交订单，取消，回到聚合页，点击 保障内容、 生效日期、 交费方式的时候， 都会多次打开webview，虽然功能上并没有多大影响，但是会造成很不好的用户体验。 这里暂时不知道是为什么多次触发，通过`event.stopPropagation()`方法能够有效阻止多次触发。发现只要进入到选择被保人页面，回来之后就不会多次触发了，联想到可能是退出页面后需要reload一下，不然页面还没有更新。
    这与之前价格更新是一个道理，虽然选择被保人之后，缓存中已经保存了正确的价格，但是关闭webview之后，回到聚合页的webview，页面还是之前的样子，并没有重新渲染

- 尝试在页面回退到聚合页的时候添加`callback:function(){location.reload()}`刷新当前页面，则不会再多次打开webview
问题？ 为何同样是离开当前页面，为何提交订单进入到健康告知页就会出现多次打开的问题呢？
同样是离开健康告知页回到聚合页，为何选择被保人不会多次打开webview，而 保障内容部分要多次打开webview

## 2019-01-22 (周二)
- 完成选择电话号码区号页面重构
- 完成投保人解释说明页重构
- 梳理发票编辑（包括新增、编辑已有发票）逻辑。
    - 聚合页，选择需要发票信息，进入“是否需要发票页”(choose_invoice),
    - 是否需要发票页(choose_invoice)，请求用户发票信息。
        1. 用户未登录，请求到的数据为空；
        2. 用户登录，但是没有保存发票信息，则请求到的发票信息也为空。
        3. 用户登录且存有发票信息，请求到发票，默认展示第一个发票信息

        1 和 2 两种情况，需用户填写完正确的发票信息。
            1. 返回聚合页，保存invoice
            2. 返回聚合页，保存invoice，同时，第二次进入的时候，会默认填充发票信息。

        3 可以继续进入选择发票页(select_invoice)继续选择发票。
            - 选择发票页，首先请求用户所有的发票信息，并展示出来。
            - 改页面可以进入 编辑发票页，编辑发票页是 新增发票信息 和 编辑已有发票信息 的融合。更加url传递的不同，页面显示会有不同。编程发票页面上的完成按钮，会上传或者编辑已有发票信息，下次再请求的时候，会拿到最新的发票信息。 


## 2019-01-23 (周三)
- 学习node.js，实现一个简单的express应用
    - mkdir express && cd express
    - npm install express --registry=https://registry.npm.taobao.org
    - ls node_modules
    - npm list(与上一步等价)
    - touch app.js(新建一个app.js文件)
    - node app.js(启动服务)

- 使用外部模块
    - npm init 新建package.json文件
    - npm install express utility --save 安装express utility两个模块 ,没有指定registry，默认从npm官方安装，--save在安装依赖的同时，自动写入package.json,在package.json中多了一个dependencies字段

- 实现网络爬虫
    - 同时安装几个模块 npm install 模块1 模块2 --save
- cluster集群
- pm2 
    - pm2 start app.js -i aNumber()

## 2019-01-24 (周四)
 - 打包成一个文件
 ```javascript
const path = require('path')
module.exports = {
    entry: './webpack.entry.js',
    output: {
        filename: 'webpack.bundle.js',
        path: path.resolve(__dirname, './build'),
        publicPath: ''
    },
    context: __dirname,
    module: {
        rules: [{
            test: /\.css$/,
            use:['style-loader','css-loader']
        },
        {
            test: /\.(jpg|png)$/,
            use: ['url-loader?limit=10000&name=img/[name].[ext]']
        },
        {
            test: /\.html$/,
            use: ['html-loader']
        }
    ]
    }
}
 ```
 - HTML和CSS都分开打包
 ```javascript
 var path = require('path')
HtmlWebpackPlugin = require('html-webpack-plugin'),
ExtractTextPlugin = require('extract-text-webpack-plugin')
module.exports = {
    entry: './webpack.entry.js',
    output: {
        filename: 'webpack.bundle.js',
        path: path.resolve(__dirname,'./build'),
        publicPath:''
    },
    context: __dirname,
    module: {
        rules: [{
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback:"style-loader",
                use:'css-loader'
            })
        },
        {
            test:/\.(jpg|png)$/,
            use:['url-loader?limit=10000&name=img/[name].[ext]']
        },
        {
            test:/\.html$/,
            use:['html-loader']
        }
    ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        }),
        new ExtractTextPlugin("style.css")
    ]
}
 ```
 - 实现热加载
 ```javascript
 var path = require('path')
HtmlWebpackPlugin = require('html-webpack-plugin'),
ExtractTextPlugin = require('extract-text-webpack-plugin')
webpack = require('webpack')
module.exports = {
    entry:[
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        './webpack.entry.js'
    ],
    output: {
        filename: 'webpack.bundle.js',
        path: path.resolve(__dirname,'./build'),
        publicPath:''
    },
    context: __dirname,
    module: {
        rules: [{
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback:"style-loader",
                use:'css-loader'
            })
        },
        {
            test:/\.(jpg|png)$/,
            use:['url-loader?limit=10000&name=img/[name].[ext]']
        },
        {
            test:/\.html$/,
            use:['html-loader']
        }
    ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        }),
        new ExtractTextPlugin("style.css"),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ],
    devServer: {
        contentBase: path.resolve(__dirname,'src'),
        hot: true,
        noInfo: false
    }
}
 ```
## 2019-01-25 (周五)
- 发布资源
    - touch .npmignore
    - 写入 node_modules/
    - 登录npm账号
    - npm publish

刚开始publish的时候提示 npm ERR! publish Failed PUT 401,通过
    - npm config set registry https://registry.npmjs.org/
    - npm login 
    - npm publish 解决

react 片段的使用方式
```javascript
    <React.Fragment></React.Fragment>
    // 或者
    <></> //语法糖
```
- 视图层View.js写法的学习
    - 可以通过调用方法返回参数的形式，返回需要的数据信息，视图层可以直接调用该方法，并将得到的参数缓存，传递给组件。(这边我以前一般的做法是放到状态里，可以随时拿到。但是这种状态并不需要怎么改变。是不是通过调用方法返回参数的形式比较好。)


图片热区 取消map area点击时候的边框
```css
map area{
  outline: none
}
```