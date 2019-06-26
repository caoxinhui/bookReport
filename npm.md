通过命令`npm install --save-dev iscroll@5.1.1`将iscroll的版本固定为5.1.1
npm 版本 `~` 和`^`的区别
* ~ 会匹配最近的小版本依赖包，比如~1.2.3会匹配所有的1.2.x版本
* ^ 会匹配最新的大版本依赖包，比如^1.2.3会匹配所有的1.x.x版本

npm模块安装机制。
安装之前，npm install会先检查，node_modules目录之中是否已经存在指定模块。如果存在，就不再重新安装了，即使远程仓库已经有了一个新版本，也是如此。
如果你希望，一个模块不管是否安装过，npm 都要强制重新安装，可以使用-f或--force参数。
$ npm install <packageName> --force
如果想更新已安装模块，就要用到npm update命令

