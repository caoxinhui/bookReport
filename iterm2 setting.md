`cat /etc/shells`
查看系统有几个shell bash是mac中terminal自带的shell，把它换成zsh，这个的功能要多得多。拥有语法高亮，命令行tab补全，自动提示符，显示Git仓库状态等功能 
`chsh -s /bin/zsh` 设置默认shell
`cd ~/.ssh` 进入ssh文件夹
`open ~/.ssh` 打开ssh文件夹
`cmd + w` 关闭当前页
`history` 查看命令
`cd ~`  访问用户目录
`cd /` 访问根目录
`clear` 清空
`pwd` 显示当前目录


安装 oh my zsh
`sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"`


安装`oh my zsh`插件

安装方法如下（oh-my-zsh 插件管理的方式安装）：

1.Clone项目到$ZSH_CUSTOM/plugins文件夹下 (默认为 ~/.oh-my-zsh/custom/plugins)
`git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
`

2.在 Oh My Zsh 的配置文件 (~/.zshrc)中设置
`plugins=(其他插件 zsh-syntax-highlighting)`

3.运行 source ~/.zshrc 更新配置后重启item2:

快捷命令
`z` 快速进入常用文件
`trash` 相当于 `rm -rf` 删除某个文件，但是会放到垃圾箱里面
