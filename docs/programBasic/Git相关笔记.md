---
title: Git学习笔记
date: 2021-1-4
tags: [SVN,Git,静态博客Hexo]
categories: 版本控制 
toc: true 
cover: https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Git相关/gaitubao_0_png.png
---
# 系统的学习Git

## 1.版本控制方式分类

* 集中式 SVN (全称 Apache Subversion)
* 分布式 Git

Linus一直痛恨的CVS及SVN都是集中式的版本控制系统，而Git是分布式版本控制系统，集中式和分布式版本控制系统有什么区别呢？

先说集中式版本控制系统，版本库是集中存放在中央服务器的，而干活的时候，用的都是自己的电脑，所以要先从中央服务器取得最新的版本，然后开始干活，干完活了，再把自己的活推送给中央服务器。中央服务器就好比是一个图书馆，你要改一本书，必须先从图书馆借出来，然后回到家自己改，改完了，再放回图书馆。

![l](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Git相关/l.jpg)

集中式版本控制系统最大的毛病就是必须联网才能工作，如果在局域网内还好，带宽够大，速度够快，可如果在互联网上，遇到网速慢的话，可能提交一个10M的文件就需要5分钟，这还不得把人给憋死啊。

那分布式版本控制系统与集中式版本控制系统有何不同呢？首先，分布式版本控制系统根本没有“中央服务器”，每个人的电脑上都是一个完整的版本库，这样，你工作的时候，就不需要联网了，因为版本库就在你自己的电脑上。既然每个人电脑上都有一个完整的版本库，那多个人如何协作呢？比方说你在自己电脑上改了文件A，你的同事也在他的电脑上改了文件A，这时，你们俩之间只需把各自的修改推送给对方，就可以互相看到对方的修改了。

和集中式版本控制系统相比，分布式版本控制系统的安全性要高很多，因为每个人电脑里都有完整的版本库，某一个人的电脑坏掉了不要紧，随便从其他人那里复制一个就可以了。而集中式版本控制系统的中央服务器要是出了问题，所有人都没法干活了。

在实际使用分布式版本控制系统的时候，其实很少在两人之间的电脑上推送版本库的修改，因为可能你们俩不在一个局域网内，两台电脑互相访问不了，也可能今天你的同事病了，他的电脑压根没有开机。因此，分布式版本控制系统通常也有一台充当“中央服务器”的电脑，但这个服务器的作用仅仅是用来方便“交换”大家的修改，没有它大家也一样干活，只是交换修改不方便而已。(来自廖雪峰的git教程)

## 2.SVN

![rLb0I0](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Git相关/rLb0I0.png)

### 2.1 下载

* 提供SVN服务的版本控制服务器。VisualSVN：https://www.visualsvn.com/

* 安装VisualSVN，端口如果被占用，就点击右侧向下箭头，换另一个端口

  ![rLXI7d](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Git相关/rLXI7d.png)

* 创建项目仓库，可以添加成员权限

  ![rOiyrt.md](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Git相关/rOiyrt.md.png)

* 项目成员下载的，用于与服务端VisualSVN交互 。TortoiseSVN ：https://tortoisesvn.net/

### 2.2 操作流程

* 检出代码：在没有源代码的情况下，在本地建一个新目录，右键SVN Checkout ，输入仓库地址，User中成员的账号密码，可以把仓库中的代码下载下来

* 提交代码：新建了一个文件，在项目目录空白处，右键 SVN  commit ，添加对应备注信息

  <img src="https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Git相关/rOP30f.png" alt="rOP30f"  />

* 项目目录空白处，右键 SVN update ,就会获取最新版本的代码。**情况一**：服务器文件1【内容：苹果】，本地文件1，我们改了【内容：香蕉】，update就会冲突。**情况二**：服务器文件1【内容：苹果】，本地我们加一个文件2，update不会冲突，会直接把服务器的文件1下载下来，本地文件2不会。

* 所以协同办公时，自己负责自己的模块/文件，不要改动别人的模块/文件，就不会有冲突

* **情况三**：用户A和用户B，同时都是服务端**文件1**最新版本2【内容是：苹果】。之后，用户A修改【内容：苹果A】并提交服务端最新版本变为3。用户B修改【苹果B】，也提交，这时候报错，提示目前的版本和服务端版本3不一样，用户B，使用SVN update，获取最新版本。这时候发现出现冲突，因为服务端的内容是【苹果A】，而自己的则是【苹果B】，则就需要两个用户商量，解决冲突

* 右键 TortoiseSVN  ，选择Show log ，就可以看到已有的提交记录

## 3.Git的使用



非常好的文章

* [Git常用命令清单](http://www.ruanyifeng.com/blog/2015/12/git-cheat-sheet.html)
* [Git分支管理策略](http://www.ruanyifeng.com/blog/2012/07/git.html)大型团队使用的
* [Git工作流程](http://www.ruanyifeng.com/blog/2015/12/git-workflow.html?utm_source=tuicool&utm_medium=referral)

![image-20210109090743961](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Git相关/image-20210109090743961.png)

以下命令会打开一个网页帮助文档

```shell
git 指令名 --help
//比如
git remote --help
git add --help
```

### 3.1安装

* 远程仓库，一般托管在GitHub或者是Gitee上，不用下载

* 本地仓库，需要下载Git软件 ，[官网](https://git-scm.com/downloads)

  ```shell
  //进入cmd窗口,验证是否安装成功
  git --version
  ```

* git命令输入位置

  注意：Git Bash和Windows PowerShell，都能支持Linux命令，但是cmd不支持

  ```shell
  //1.进入对应目录，在地址栏输入cmd，打回车
  
  //2.进入对应目录，右键Git Bash Here
  
  //3.win10左侧搜索栏，搜索Windows PowerShell，点击打开
  ```

  ![image-20210108095402992](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Git相关/image-20210108095402992.png)

### 3.2 使用Git命令

查阅更多内容[Git常用命令清单](http://www.ruanyifeng.com/blog/2015/12/git-cheat-sheet.html)

先进入要执行命令的位置，打开Git Bash

* 初始化git ,在当前目录生成`.git`文件

  ```shell
  git init
  ```

  也可以使用

  ```shell
  git init 文件夹名
  //会自动在当前目录，建一个文件夹，以自己输入的文件夹名命名，然后初始化
  ```

* 电脑上新安装Git，需要配置仓库信息。如果需要修改用户名和邮箱，也是以下命令

  注意：执行后，x项目文件夹下`.git`文件夹中生成`.gitconfig`文件

  ```shell
  git config --global user.name '用户名'   //设置用户名
  git config --global user.email '用户邮箱'  //用户邮箱
  ```

  查看git配置

  ```shell
  git config --list
  ```

  ![image-20210108115437140](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Git相关/image-20210108115437140.png)

* 查看暂存区状态

  ```shell
  git status
  //nothing to commit (create/copy files and use "git add" to track)  代表暂存区没有文件
  
  ```

* 添加 工作区 到 暂存区

  有时候项目文件a.txt和b.txt都改变了，但是我可以先add  a.txt 之后commit一个版本，然后再add b.txt 后，commit一个版本。分成两个版本提交项目

  ```shell
  git add 文件名 //提交对应文件名文件的修改
  git add a.txt b.txt //提交多个文件，用空格隔开
  git add . //提交工作区所有文件的修改
  ```

  如果提交到暂存区后，不想把修改提交到本地仓库

  ```shell
  git rm --cached 文件名
  ```

  【恢复】

  如果工作区【文件版本1】提交到暂存区后，工作区发生更改，成了【文件版本2】。使用以下命令将工作区**恢复**【版本1】

  ```shell
  git checkout 文件名
  ```

* 提交 暂存区 到 本地仓库

  注意：可以提交很多版本到本地仓库，最后一起`git push`到远程Git仓库

  ```shell
  git commit -m "提交备注"
  ```

  注意：输入命令`git commit`就会进入vi编辑器模式，使用`i`进入编辑模式，输入要提交的备注。按`ESC`退出编辑模式，输入`:wq`回车，保存并退出

  【恢复】

  将**一个文件**提交到本地仓库的版本，恢复到工作区和暂存区

  ```shell
  git log //复制想要恢复的那次提交的一串编号
  git checkout 提交编号 文件名
  ```

  将**最近一次**提交到本地仓库的**所有文件**，恢复到工作区和暂存区

  ```shell
  git reset --hard
  ```

  将指定提交编号的那次提交到本地仓库的**所有文件**，恢复到工作区和暂存区

  ```shell
  git reset 提交编号
  ```

* 查看提交到本地仓库的记录

  注意：有时候log内容太多，会进入`less`命令阅读文件的模式，这种情况下需要按`q`键退出

  ```shell
  git log
  ```

  ![image-20210108104424356](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Git相关/image-20210108104424356.png)

  打开图形界面，查看提交记录

  ```shell
  gitk
  ```

  ![image-20210108115031271](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Git相关/image-20210108115031271.png)

* 提交到远程在线仓库

  * 常用远程在线仓库：GitHub，Gitee 码云，Coding

  * 提交远程仓库

    ```shell
    git push 
    ```

### 3.3 GitHub上托管流程

**情况一：GitHub新建空项目，本地没有项目，克隆到本地开发** 

git会在本地有一个远程仓库列表，git clone 下来的项目，git软件会把克隆的项目地址起一个别名：origin，存到远程仓库列表中，然后git push的时候实际上是直接把本地仓库的内容提交到origin

* 在github上建一个新的仓库，复制仓库地址

  ![image-20210108161845084](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Git相关/image-20210108161845084.png)

* 进入想要放置项目的目录，在Git Bash下输入`git clone 仓库地址` 项目空文件夹，就被下载到本地了

* 在本地添加文件后

  ```sh
  git add .
  git commit -m "第一次提交"
  git push 
  //因为是自己本地仓库clone下来的项目，默认.git文件夹下，就配置好了，推送的仓库origin和推送到master分支
  ```

之后会弹出登录GitHub的登录框

![image-20210108154740807](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Git相关/image-20210108154740807.png)

我发现这个登录框，输入正确的也登陆不上，会直接提示登录失败，然会让你输入用户名

![image-20210108155038157](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Git相关/image-20210108155038157.png)

输入用户名后，弹出框按要求输入密码，输入正确的密码就可以登陆，在GitHub上提交文件了

![image-20210108155149864](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Git相关/image-20210108155149864.png)

  

**情况二：本地已有项目，托管到GitHub**【没有初始化Git，即根目录没有`.git`文件】

在本地项目的目录下

```shell
git init //先初始化本地项目
touch README.md //添加readme文件（可不添加）
git add .
git commit -m "提交备注"
```

然后再GitHub上新建一个仓库，复制项目地址

```shell
git remote add 仓库别名 仓库地址
git push  -u 仓库别名 分支名 //给本地分支和远程分支建立关联，以后就可以直接用git push，不必指定分支名了

//仓库别名一般是origin
//master是主分支名，一个新仓库默认只有master分支
//我们在本地仓库创建新的分支后，必须用上面的命令才能，把新分支推送到远程仓库
```

```sh
//补充:查看本地仓库列表
git remote show 
```

之后会提示登录框。登陆的GitHub账户是 上面添加的那个仓库地址 所在的GitHub账户

![image-20210108154740807](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Git相关/image-20210108154740807.png)

这个登录框，输入正确的也登陆不上，会直接提示登录失败，然会让你输入用户名

![image-20210108155038157](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Git相关/image-20210108155038157.png)

输入用户名后，弹出框按要求输入密码，输入正确的密码就可以登陆了

![image-20210108155149864](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Git相关/image-20210108155149864.png)

之后提交到GitHub,就不用输入`git remote add 别名 仓库地址`了

```sh
//直接这样提交就行
git push 仓库别名 分支名
```

如果不想每次提交到远程仓库都输入分支名，可以使用命令提交一次，就会记住 仓库和分支：

```
git push --set-upstream 别名 分支名
```

之后的每次提交直接输入`git push`就会提交到记住的 仓库和分支

### 3.4 分支管理

默认主分支是master，创建的各个分支之间，互不影响。Git中出现的`HEAD`指的是当前的分支

* 查看所有分支

  ```sh
  git branch
  ```

* 在本地仓库创建分支，仍保留在原来分支

  ```shell
  git branch 新分支名
  ```

  在本地仓库创建分支，并切换到该分支

  ```sh
  git checkout -b 新分支名
  ```

  注意：创建新分支，相当于把当前的分支复制了一份。分支仅仅是在本地建立，远程仓库并没有新建的分支需要把分支推送到远程仓库

  ```shell
  git push 仓库别名 分支名
  ```

  一般`git clone`下来的项目，默认别名是origin.可以通过`git remote show`查看仓库别名

* 将暂存区，本地仓库切换指定分支

  ```sh
  git checkout 分支名
  ```

  注意：

  在分支1，工作区文件改动，切换到分支2，工作区文件任然是改动后的。工作区不会跟着分支切换变动

  当处在分支1，修改文件，并提交到本地仓库。切换成分支2后，文件仍然是原来的样子，且没有该次提交记录。

* 合并分支

  切换到master主分支后，将分支1与主分支合并。

  记住，合并前两个分支都要把工作区的变动，提交到本地仓库，否则不能合并

  ```sh
  git merge 要合并的分支名
  ```

  合并后，如果两个分支对同一个内容修改成了不同的，那就会产生冲突，需要在master分支上手动修改解决冲突部分

  **这时**，分支1仍然是未解决冲突的版本，需要切换到分支1，`git merge master`，因为master是解决冲突的版本，即使master和分支1，仍然是冲突的部分，但是不会报错，按照master的覆盖掉

  拉取远程仓库的某个分支，与本地仓库**当前分支**合并

  ```sh
  git pull 远程仓库别名 要拉取的远程分支名
  //两个分支可以是不一样的分支，比如，拉取远程的dev分支，与本地分支master合并
  ```

  

* 删除分支

  删除分支1，当前必须处其他分支，才能删除

  ```sh
  git branch -d 分支名
  ```

### 3.5 多人协作GitHub Collabrators

原本只有仓库所在的账户才能提交代码，所以要在GitHub上添加协作者，添加进来的协作者就可以在该仓库提交代码。

![image-20210108230251049](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Git相关/image-20210108230251049.png)

### 3.6 Git工作流程

详细内容查阅[Git工作流程](http://www.ruanyifeng.com/blog/2015/12/git-workflow.html?utm_source=tuicool&utm_medium=referral)

目前广泛使用的工作流程：

- Git flow【大型项目团队使用】

  - 添加协作者，在各自的分支上开发，合并到develop，最后合并到master（最终发布的版本） 。详细请阅读[Git分支管理策略](http://www.ruanyifeng.com/blog/2012/07/git.html)

- Github flow【一般用于：给别人的开源项目提交代码】

  - 在别人的仓库点击Fork，就能复制别人的仓库，到自己的仓库

  - 自己clone到本地进行开发，开发完成后，git push 到自己的仓库

  - 在GitHub上找到Pull requests选项，选择New pull request，向原作者发起提交请求

    ![image-20210108231937900](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Git相关/image-20210108231937900.png)

    

- Gitlab flow

  > GitLab是啥？
  >
  > 目前第三方代码仓库托管服务有很多，其中 Github 最火，但是如果想要托管私有项目收费比较高,而且在国内受限于网络环境影响,鲜少有公司使用。例如京东、淘宝这种级别的公司，也不太常用别的第三方的托管服务。Gitlab是一个开源的类似于Github的一个系统，且开源免费，可以部署自己的公司内容。

## 4.GitHub搭建静态博客

### 4.1 必须注意

本地初始化的是**Hexo的整个项目**，但是发布的是把本地项目变成**静态页面的项目**

GitHub中发布的**静态页面的项目**不能直接修改相关内容，必须通过修改本地的**Hexo的整个项目**然后才能发布

**所以**必须在GitHub项目上建一个分支，存放本地的**Hexo的整个项目**

每次添加新的MarkDown文章后，先推送本地的**Hexo的整个项目**，然后再**发布**

### 4.2 Hexo框架

* [官网](https://hexo.io/zh-cn/)

  基于Nodejs的静态博客系统

* 登录GitHub，新建仓库

  ![image-20210107182255258](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Git相关/image-20210107182255258.png)

* 复制项目地址，然后克隆到本地

  ![image-20210107182517458](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Git相关/image-20210107182517458.png)

  本地找一个目录，进入cmd窗口，输入`git clone github项目地址`即可【过程中需要输入github的用户名和密码】

* 开始本地初始化

  ```javascript
  //因为是全局安装，所以在任意目录下进入cmd都可以
  npm install hexo-cli -g
  
  //本地新建一个文件夹，初始化博客，生成博客文件
  hexo init 博客名
  
  //移动到博客文件夹
  cd 博客名
  
  //安装依赖
  npm install
  
  //启动本地服务器，默认127.0.0.1：4000。可以在本地预览，之后发布才会在github静态页上显示
  //本地修改完内容，ctrl+C ,需要从新 输入 hexo server 重启，不能热更新
  hexo server
  
  //新建文章，执行后，在博客根目录的source/-post文件夹下，就会生成新的markdown文件，然后在生成的文件中添加内容
  hexo new 文章标题
  ```

* 发布到GitHub

  修改`_config.yml文件`参数

  `type`,`repo`的键和值之间有一个空格

  `repo`参数：部署静态页仓库的地址 ，在//后加上  “用户名:github密码@”

  ```
  deploy:
      type: git
      repo: https://heyingjiee:heyingjie1996@github.com/heyingjiee/heyingjiee.github.io.git
  ```

  用命令发布

  ```
  //cmd进入本地博客目录下
  
  //安装部署插件
  npm install hexo-deployer-git --save
  
  //发布到github静态页
  hexo deploy
  ```

* 添加或修改 markdown文件

  博客根目录的source/-post文件夹下，把自己写好的markdown复制进去，然后在**markdown文档开头**加上（注意：键值对之间有一个空格）

  ```
  ---
  title: 文章标题
  ---
  ```

* 添加或修改 markdown文件后，最好使用以下命令发布（不用 hexo deplay 命令）

  ```
  //cmd进入本地博客目录下
  hexo generate --deploy
  ```

* 打开网页 https://heyingjiee.github.io/ ，就能显示博客了

### 4.3 主题

* 官网主题https://hexo.io/themes/
* 选择需要的主题，进入对应的主题的github页，有对应的使用说明
* 我选用的主题 [hexo-theme-simple99](https://github.com/shuxhan/hexo-theme-simple99)

```
#加在MakeDown文档开头

title: hello,world
date: 2020-12-17  # 发布时间
tags: 标签  #多个标签写成数组形式[A,B,C]
categories: 分类
top: 9   # 文章是否置顶，默认不写top，不置顶；如果置顶可选择数字，如果有多个置顶，根据数字大小进行排序
toc: true # 是否生成目录(true生成；默认不写toc则不生成)
cover:  # 标题背景图片,直接把图片网址放上去就行
---
```

```
这个插件可以每次修改完本地项目，直接刷新网页就可以看到变化
npm install --save hexo-browsersync
```

## Git命令补充

这一部分补充的是一些我用到过的非主要的Git命令

### 记住密码

安装Git后，直接clone一个私有仓库，就会在终端中看到Git的提示，要求输入账户和密码

这个命令更改配置，使得其可以记住账号密码

```shell
git config --global credential.helper store
```

### 克隆深度

可以阅读这篇文章：https://blog.csdn.net/qq_43827595/article/details/104833980

```
git clone --depth 1  仓库地址 [克隆到指定文件夹]
```

### 等待研究

```shell
git rev-parse --is-inside-work-tree # timeout=10
git config remote.origin.url xxxx.git # timeout=10
git fetch --tags --progress xxx.git +refs/heads/*:refs/remotes/origin/* # timeout=10
 git rev-parse origin/master^{commit} # timeout=10
 git config core.sparsecheckout # timeout=10
 git checkout -f 4c19199584aeb46bd7f69cd51a9c176c6868f316 # timeout=10
  git rev-list --no-walk ea7fb01329a95aac9fe151c7b030a4e4bdd3a98f # timeout=10
```

日志

```shell
git log --all --after="2022-06-23 00:00:00" --before=="2022-06-23 23:30:00" --pretty=tformat: --numstat ':(exclude,glob)package-lock.json' ':(exclude,glob)**/package-lock.json' ':(exclude,glob)yarn.lock' ':(exclude,glob)**/yarn.lock' ':(exclude,glob)assets/**/*' ':(exclude,glob)**/assets/*' | awk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "%s,%s,%s", add, subs, loc }'
```

