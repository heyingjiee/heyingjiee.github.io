# 持续集成(CI )与持续部署(CD)

## 流程介绍

简单来说，开发人员每次合并代码上传代码仓库后，自动将最新的代码编译打包，自动发布到对应的环境（生产或测试）

![image-20220807235250312](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Go/20220807235250%20.png)

## Git分布式版本控制系统

### 前提

首先，需要一台Linux服务器

本地练习整个流程，也可以[安装虚拟机](https://heyingjiee.github.io/otherLanguage/Linux%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0.html#%E8%99%9A%E6%8B%9F%E6%9C%BA%E5%AE%89%E8%A3%85)来模拟

### 服务端

**安装Git**

```shell
yum install git -y
```

**配置Git服务**

创建系统用户，设置密码

```shell
useradd git #系统默认生成一个用户组，组名和用户名一样(这里用户名和用户组都是git)
passwd git #修改git用户的密码
```

初始化仓库

```shell
mkdir /git-root/ #创建库目录
cd /git-root/

git init --bare shell.git #初始为裸仓库，名为shell.git（可任意起名）。裸仓库：没有.git文件夹，不能执行git操作，只是单纯用来记录git历史数据，所以常用来初始化远端仓库
```

修改git用户的权限为库文件的所有者

```shell
chown -R git:git shell.git #chown将指定文件的拥有者改为指定的用户或组（冒号前是用户名，后是用户组），-R处理指定目录以及其子目录下的所有文件
su  - git # 切换为git用户
```

配置SSH免密码认证

```shell
# 创建秘钥对，需要指定生成的私钥放置在哪个文件中（回车，默认位置即可），设置使用密码（回车，默认不使用密码）
ssh-keygen -t rsa
# 查看公钥文件
vi ~/.ssh/id_rsa.pub
#进入存储公钥文件的目录
cd .ssh/
#将公钥文件复制为新文件authorized_keys
cp id_rsa.pub authorized_keys

#退出登录（前面切换为用户git了，这里就是退出这个用户）
logout 
```

文件authorized_keys中的公钥

![image-20221113212019045](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20221113212019%20.png)

### 客户端

安装Git

```shell
yum install git -y
```

创建秘钥对，并将客户端公钥写入服务端`/.ssh/user/authorized_key`文件中

```shell
# 创建秘钥对 ，这里特别注意下，设置密码直接回车，就是不设置密码，这样每次git push就不用输密码了
ssh-keygen -t rsa
# 查看公钥文件
vi ~/.ssh/id_rsa.pub
# ssh-copy-id [user@]machine ,用于将key写到远程机器的 ~/.ssh/[user]/authorized_key 文件中
ssh-copy-id git@192.168.174.137 #这里的IP是服务端的IP地址
```

查看服务端的文件authorized_keys，发现增加了一个新的公钥

![image-20221113212135946](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20221113212136%20.png)

克隆服务端的那个裸仓库`shell.git`，本地会多一个`shell`文件夹，说明克隆成功

```shell
git clone git@192.168.174.137:/git-root/shell.git #这里的IP是服务端的IP地址
```

配置先Git的信息，来进行提交的操作

```
git config --global user.email "xxx@gmail.com"
git config --global user.name "hedaodao"
```

创建一个文件，并提交到服务端仓库

```shell
vi a.js
git add .
git commit -m "init"
git push master origin
```

### Gitlab（暂时省略）

## Jenkins

[Jenkins官网](https://www.jenkins.io/zh/)

![jenkins使用](https://pic1.zhimg.com/v2-5a908e9178bb03a79cc05aee0d747ee8_720w.jpg?source=172ae18b)

### 特点介绍

* 开源的CI/CD工具（Java编写）
* 易于安装部署，可直接使用yum方便的安装部署
* 消息通知，项目发布构建完成后可进行通知，并生产测试报告
* 支持分布式构建
* 丰富的插件生态

### Jenkins的CI/CD

基本分为两种

* 经典流程：开发人员提交代码到Git仓库，Jenkins从Git仓库拉取代码并自动化部署

  ![image-20221113224032815](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20221113224033%20.png)

* 容器化流程：

  ![image-20221113224240567](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20221113224240%20.png)



两种方式的最大区别，经典流程交付代码（或编译后产物）到服务器，容器化流程交付镜像到服务器



### 安装与配置

[下载页面](https://www.jenkins.io/zh/download/)

![image-20221113225635119](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20221113225635%20.png)

目前官网推荐，使用yum进行安装

![image-20221113225849964](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20221113225850%20.png)

**注意**：

yum install jenkins安装失败，可能是由于使用国外的镜像源导致的，换用国内的镜像 [解决方案](https://www.likecs.com/show-203951696.html#sc=634)

```shell
yum install jenkins https://mirror.tuna.tsinghua.edu.cn/jenkins/redhat-stable/jenkins-2.332.1-1.1.noarch.rpm
```

### 启动

```
```







