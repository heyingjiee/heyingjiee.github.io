---
title: Linux基础-学习笔记
date: 2020-4-15
tags: [常用Linux命令,命令格式]
categories: 版本控制  
toc: true 
cover: https://gitee.com/hyj1270433876/blog-img/raw/master/Git相关/下载.jpg
---
# Linux常用命令

## Linux 第三方中文学习文档

很重要，文档写的很好[文档](http://c.biancheng.net/view/720.html)

## Linux命令基本格式

### 命令提示符

登录Linux系统后，第一眼看到的内容是：

```shell
[root@localhost ~]#
```

这就是 Linux 系统的命令提示符。那么，这个提示符的含义是什么呢？

- []：这是提示符的分隔符号，没有特殊含义。
- root：显示的是当前的登录用户，笔者现在使用的是 root 用户登录。
- @：分隔符号，没有特殊含义。
- localhost：当前系统的简写主机名（完整主机名是 localhost.localdomain）。
- ~：代表用户当前所在的目录，此例中用户当前所在的目录是家目录。
- \#：命令提示符，Linux 用这个符号标识登录的用户权限等级。如果是超级用户，提示符就是 #；如果是普通用户，提示符就是 $。


家目录（又称主目录）是什么？ Linux 系统是纯字符界面，用户登录后，要有一个初始登录的位置，这个初始登录位置就称为用户的家：

- 超级用户的家目录：/root。
- 普通用户的家目录：/home/用户名。


用户在自己的家目录中拥有完整权限，所以我们也建议操作实验可以放在家目录中进行。我们切换一下用户所在目录，看看有什么效果。

```shell
[root@localhost ~]# cd /usr/local
[root@localhost local]#
```

仔细看，如果切换用户所在目录，那么命令提示符中的会变成用户当前所在目录的最后一个目录（不显示完整的所在目录 /usr/ local，只显示最后一个目录 local)。

### 命令的基本格式

接下来看看 Linux 命令的基本格式:

```shell
[root@localhost ~]# 命令[选项][参数]
```

命令格式中的 [] 代表可选项，也就是有些命令可以不写选项或参数，也能执行。那么，我们就用 Linux 中最常见的 ls 命令来解释一下命令的格式。如果按照命令的分类，那么 ls 命令应该属于目录操作命令。

```shell
[root@localhost ~]# ls
anaconda-ks.cfg install.log install.log.syslog
```

#### 1) 选项的作用

ls 命令之后不加选项和参数也能执行，不过只能执行最基本的功能，即显示当前目录下的文件名。那么加入一个选项，会出现什么结果？

```
[root@localhost ~]# Is -l
总用量44
-rw-------.1 root root 1207 1 月 14 18:18 anaconda-ks.cfg
-rw-r--r--.1 root root 24772 1 月 14 18:17 install.log
-rw-r--r--.1 root root 7690 1 月 14 18:17 install.log.syslog
```

如果加一个"-l"选项，则可以看到显示的内容明显增多了。"-l"是长格式（long list）的意思，也就是显示文件的详细信息。至于 "-l" 选项的具体含义，我们稍后再详细讲解。可以看到选项的作用是调整命令功能。如果没有选项，那么命令只能执行最基本的功能；而一旦有选项，则可以显示更加丰富的数据。

Linux 的选项又分为**短格式选项**（-l）和**长格式选项**（--all）。短格式选项是英文的简写，用一个减号调用，例如：

```sh
[root@localhost ~]# ls -l
```

而长格式选项是英文完整单词，一般用两个减号调用，例如：

```shell
[root@localhost ~]# ls --all
```

一般情况下，短格式选项是长格式选项的缩写，也就是一个短格式选项会有对应的长格式选项。当然也有例外，比如 ls 命令的短格式选项 -l 就没有对应的长格式选项。所以具体的命令选项可以通过后面我们要学习的帮助命令来进行査询。

#### 2) 参数的作用

参数是命令的操作对象，一般文件、目录、用户和进程等可以作为参数被命令操作。例如：

```shell
[root@localhost ~]# ls -l anaconda-ks.cfg
-rw-------.1 root root 1207 1 月 14 18:18 anaconda-ks.cfg
```

但是为什么一开始 ls 命令可以省略参数？那是因为有默认参数。命令一般都需要加入参数，用于指定命令操作的对象是谁。如果可以省略参数，则一般都有默认参数。例如：

```shell
[root@localhost ~]# ls
anaconda-ks.cfg install.log install.log.syslog
```

这个 ls 命令后面没有指定参数，默认参数是当前所在位置，所以会显示当前目录下的文件名。

## 目录相关

`cd 文件夹名` :移动到对应文件夹 。 注：`cd ../`返回上一级

`ls` ：显示当前目录下所有文件和文件夹 。 注：`ls -a`显示当前目录下所有文件和文件夹，还有被隐藏的文件和文件夹

## 文件夹操作

`mkdir 文件夹名` :当前目录创建文件夹

`rmdir 文件夹名`：只能删除空文件夹

`rm -rf 文件夹名/文件名`：删除文件夹和文件【超强，啥都能删除】

## 文件操作

`touch 文件名`:创建文件

`cat 文件名`：查看文件内容，当文件内容很多，会直接显示到文件末尾，可以向上滚动滑轮，找开头

`less 文件名`：窗口不能输入命令了，直接从开头显示整个文件，向下滚轮，看文件。注意：按q键，退出

`rm 文件名`删除文件

## vi编辑器

【vim是vi的增强版】

分为编辑模式和命令模式

`vi 文件名`进入编辑器，打开文件内容，处于命令模式

`i`键进入编辑模式，可通过方向键移动光标，输入进行修改



`ESC`键退出编辑模式

输入`:w`回车，保存当前修改

输入`:q`回车，退出编辑器

输入`:wq`，保存并退出

在命令模式下也可以移动光标，但是不能编辑文件内容，输入的内容会作为命令，回车执行

**注意**：输入命令`:w`和`:q`前，必须是命令模式，否则就是直接把命令写进文件里了。命令中的冒号是英文冒号

## 其他命令

`clear` 清空命令行

## 用户相关

**切换用户——命令基本格式**

```shell
[root@localhost ~]# su [选项] 用户名
```

**切换root用户**

当前用户切换为指定用户的身份，同时所用的工作环境也切换为此用户的环境（包括 PATH 变量、MAIL 变量等），使用 - 选项可省略用户名，默认会切换为 root 用户。

```shell
sudo su -
```

**修改用户密码——命令的基本格式**

```shell
[root@localhost ~]# passwd [选项] 用户名
```

- -S：查询用户密码的状态，也就是 /etc/shadow 文件中此用户密码的内容。仅 root 用户可用；
- -l：暂时锁定用户，该选项会在 /etc/shadow 文件中指定用户的加密密码串前添加 "!"，使密码失效。仅 root 用户可用；
- -u：解锁用户，和 -l 选项相对应，也是只能 root 用户使用；
- --stdin：可以将通过管道符输出的数据作为用户的密码。主要在批量添加用户时使用；
- -n 天数：设置该用户修改密码后，多长时间不能再次修改密码，也就是修改 /etc/shadow 文件中各行密码的第 4 个字段；
- -x 天数：设置该用户的密码有效期，对应 /etc/shadow 文件中各行密码的第 5 个字段；
- -w 天数：设置用户密码过期前的警告天数，对于 /etc/shadow 文件中各行密码的第 6 个字段；
- -i 日期：设置用户密码失效日期，对应 /etc/shadow 文件中各行密码的第 7 个字段;

**修改root用户密码**

```shell
sudo passwd root
```

## 进程管理

[Systemd 入门教程：命令篇——阮一峰](http://www.ruanyifeng.com/blog/2016/03/systemd-tutorial-commands.html)

**init**

历史上，Linux 的启动一直采用init进程。

下面的命令用来启动服务

```shell
$ sudo /etc/init.d/apache2 start
#或者 
$ service apache2 start 
```

这种方法有两个缺点。

一、是启动时间长。init进程是串行启动，只有前一个进程启动完，才会启动下一个进程。

二、是启动脚本复杂。init进程只是执行启动脚本，不管其他事情。脚本需要自己处理各种情况，这往往使得脚本变得很长。

**Systemd 概述**

Systemd 就是为了解决这些问题而诞生的。它的设计目标是，为系统的启动和管理提供一套完整的解决方案。

根据 Linux 惯例，字母d是守护进程（daemon）的缩写。 Systemd 这个名字的含义，就是它要守护整个系统。

使用了 Systemd，就不需要再用init了。Systemd 取代了initd，成为系统的第一个进程（PID 等于 1），其他进程都是它的子进程。

```shell
$ systemctl --version #查看 Systemd 的版本。
```

Systemd 可以管理所有系统资源。不同的资源统称为 Unit（单位）

最常用的命令

```shell
#显示系统状态
$ systemctl status

# 显示单个 Unit 的状态
$ sysystemctl status <服务名>

# 立即启动一个服务
$ sudo systemctl start <服务名>

# 立即停止一个服务
$ sudo systemctl stop <服务名>

# 重启一个服务
$ sudo systemctl restart <服务名>

# 杀死一个服务的所有子进程
$ sudo systemctl kill <服务名>

# 重新加载一个服务的配置文件
$ sudo systemctl reload <服务名>

# 重载所有修改过的配置文件
$ sudo systemctl daemon-reload

# 显示某个 Unit 的所有底层参数
$ systemctl show <服务名>

# 显示某个 Unit 的指定属性的值
$ systemctl show -p CPUShares <服务名>

# 设置某个 Unit 的指定属性
$ sudo systemctl set-property <服务名> CPUShares=500
```

举个例子

```shell
systemctl restart docker #重启docker
```

```shell
systemctl stop firewalld #关闭防火墙
```

## SSH配置

SSH 为 Secure Shell 的缩写，专为远程登录会话和其他网络服务提供安全性的协议（连接远程服务器时使用）。如果一个用户从本地计算机，使用SSH协议登录另一台远程计算机，我们就可以认为，这种登录是安全的，即使被中途截获，密码也不会泄露

当远程主机中开启openssh服务，那么就对外开放了远程连接的接口，ssh为openssh服务的客户端，sshd为openssh服务的服务端

![image-20220319114440731](https://gitee.com/hyj1270433876/blog-img/raw/master/Linux/image-20220319114440731%20.png)

![image-20220319114703993](https://gitee.com/hyj1270433876/blog-img/raw/master/Linux/image-20220319114703993%20.png)
