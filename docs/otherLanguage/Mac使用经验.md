# Mac使用经验

## 显示隐藏文件

在Mac中一些系统级别的或者以`.`开头的文件/文件夹会被系统默认隐藏

可是我们有时需要修改隐藏文件中的一些文件，来修改某些配置

**如何显示被隐藏文件夹**

```shell
defaults write com.apple.finder AppleShowAllFiles TRUE
killall Finder
```

灰色的文件夹就是原本被隐藏的文件夹

![image-20220210171649327](https://gitee.com/hyj1270433876/blog-img/raw/master/Mac/image-20220210171649327%20.png)

**如何重新隐藏文件夹**

```shell
defaults write com.apple.finder AppleShowAllFiles FALSE
killall Finder
```

## Mac文件系统目录结构

参考：https://zhuanlan.zhihu.com/p/91852414

磁盘下根目录结构如下：

![image-20220210171649327](https://gitee.com/hyj1270433876/blog-img/raw/master/Mac/image-20220210171649327%20.png)

`/System`（系统） ： 包含大多数系统配置和操作系统文

`/Applications` （应用程序）：大多数用户应用程序

`/Users` ：所有常规用户主目录的默认位置（包含文档，图片，电影，桌面等的子目录）【文件夹小房子图标是当前登录的用户，路径一般用`~`代替】

![image-20220210174832027](https://gitee.com/hyj1270433876/blog-img/raw/master/Mac/image-20220210174832027%20.png)

`/Library `（资源库）包含应用程序库，文档和应用程序设置

`/bin`： 包含任何用户可以执行的二进制命令

![image-20220210175450533](https://gitee.com/hyj1270433876/blog-img/raw/master/Mac/image-20220210175450533%20.png)

`/cores`： 内核转储文件存放目录。当一个进程崩溃时，如果系统允许则会产生转储文件。

`/etc`： 包含大多数系统配置（这里是快捷方式，真正的地址：`/private /etc`）, bash和zsh的配置文件也在该目录下

`/home`：（这里是快捷方式，`/System/Volumes/Data/home`）

`/opt`

`/private`：操作系统信息`var`、`etc`、`tmp`都在这个目录下

`/sbin`： 包含超级用户（root）可执行文件

![image-20220210180852613](https://gitee.com/hyj1270433876/blog-img/raw/master/Mac/image-20220210180852613%20.png)

`/tmp`： 包含应用程序使用的临时文件（这里是快捷方式，真正的地址：`/private /tmp`）

`/usr`： 存储大量可执行文件

`/var`：包含日志文件和假脱机/内容目录（这里是快捷方式，真正的地址：`/private /var`）

`/Volumes` ：磁盘的快捷方式

![image-20220210181534029](https://gitee.com/hyj1270433876/blog-img/raw/master/Mac/image-20220210181534029%20.png)


## Mac修改环境变量

看下Mac上使用的哪个终端软件 ，

`bash`的配置文件在`User/用户名/.bash_profile`

`zsh`的配置文件在`User/用户名/.zshrc`

```shell
export PATH=～/Documents/test/flutter/flutter/bin:$PATH
```


## Mac推荐软件

### 截图软件Xnip

可直接在App Store 搜索下载，这个软件对软件界面的截图带阴影效，而且支持长截图

### 图片上传软件uPic

将这个软件和`typora`相配合，实现图片自动上传的效果。这里是我配置的自己的`Gitee`仓库

![image-20220130170808296](https://gitee.com/hyj1270433876/blog-img/raw/master/Mac/image-20220130170808296%20.png)

### Host工具SwitchHosts

可以将配置的host分类，根据自己需要通过后面的`switch`开关，选择是否开启

![image-20220130171114360](https://gitee.com/hyj1270433876/blog-img/raw/master/Mac/image-20220130171114360%20.png)

