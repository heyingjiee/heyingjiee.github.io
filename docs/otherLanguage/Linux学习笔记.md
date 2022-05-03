---
title: Linux基础-学习笔记
date: 2020-4-15
tags: [常用Linux命令,命令格式]
categories: 版本控制  
toc: true 
cover: https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Git相关/下载.jpg
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

## vim编辑器

### 介绍

vim是vi的增强版，是 Linux 众多发行版的默认文本编辑器，所以，通常系统都已经默认安装好了 vi 或 vim 文本编辑器

注意：CentOS中使用到的是vi，没有vim

如果输入vim，出现下面的提示，就证明没有安装vim

```shell
vim:Command not found
```

使用yum安装下，就可以了

```
yum install vim
```

### vim与vi

vim的这些优势主要体现在以下几个方面：

* 多级撤消
  在vi里，按u只能撤消上次命令，而在vim里可以无限制的撤消
* 易用性
  vi只能运行于unix中，vim可以运行于unix,windows ,mac等多操作平台
* 语法加亮
  vim可以用不同的颜色来加亮你的代码
* 对vi的完全兼容
  某些情况下，你可以把vim当成vi来使用。

### vim的日常使用

打开文件

```
vim 文件名
```

vim分为命令模式、编辑模式、输入模式

![image-20220501005817502](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Nginx/image-20220501005817502.png)

* 命令模式（打开文件后的的模式）

  **切换光标**

  上下左右键就行

  **查找**

  如果有多个查找结果，按**n**，切换下一个结果

  找不到：pattern not found

  | vim指令 | 描述                                               |
  | ------- | -------------------------------------------------- |
  | /abc    | 从光标所在位置向后查找字符串 abc，查不到就从头查找 |
  | /^abc   | 查找以 abc 为行首的行                              |
  | /abc$   | 查找以 abc 为行尾的行                              |

  **复制与粘贴**

  | vim指令 | 描述                         |
  | ------- | ---------------------------- |
  | p       | 将剪贴板中的内容粘贴到光标后 |
  | y       | 复制已选中的文本到剪贴板     |

  **撤销和恢复**

  | vim指令 | 描述           |
  | ------- | -------------- |
  | u       | 撤销一次       |
  | Ctrl+r  | 恢复上次的撤销 |

* 输入模式（`i`键进入编辑模式，可通过方向键移动光标，输入进行修改；`ESC`键退出编辑模式）

  ![image-20220501010222253](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Nginx/image-20220501010222253.png)

* 编辑模式

  输入`:w`回车，保存当前修改

  输入`:q`回车，不保存，直接退出编辑器

  输入`:wq`，保存并退出

























在命令模式下也可以移动光标，但是不能编辑文件内容，输入的内容会作为命令，回车执行

**注意**：输入命令`:w`和`:q`前，必须是命令模式，否则就是直接把命令写进文件里了。命令中的冒号是英文冒号

## 打包与压缩

### 名词解释

**打包** ：也称为归档，指的是将一个***文件***或***目录***的集合存储在一个文件中。注意：归档文件没有经过压缩，因此，它占用的空间是其中所有文件和目录的总和

**压缩**：压缩**文件**的体积（不能直接压缩目录，需要先打包目录，才能压缩打包后的目录）

### 打包与解打包

**打包**

使用 tar 命令打包的包通常称为 tar 包（以“.tar”结尾）

```shell
tar [选项] 源文件或目录
```

| 选项    | 描述                                                         |
| ------- | ------------------------------------------------------------ |
| -c      | 将多个文件或目录进行打包。                                   |
| -v      | 显示打包文件过程；                                           |
| -f 包名 | 指定包的文件名。包的扩展名是用来给管理员识别格式的，所以一定要正确指定扩展名； |
| -A      | 追加 tar 文件到归档文件。                                    |

一般习惯用法是使用选项 "-cvf" 

```shell
tar -cvf a.tar b.txt #把b.txt打包为a.tar
```

也可以打包多个文件和目录，用空格分开

```shell
tar -cvf a.tar b.txt c.cpp /text #把b.txt、c.cpp、/text目录 打包为a.tar
```

**解打包**

解开的包只能是.tar结尾

```shell
tar [选项] 解包的包名 #.tar为后缀
```

| 选项         | 含义                                                       |
| ------------ | ---------------------------------------------------------- |
| -x           | 对 tar 包做解打包操作。                                    |
| -v           | 显示解打包的具体过程。                                     |
| -f解包的包名 | 指定要解压的 tar 包的包名。                                |
| -t           | 只查看 tar 包中有哪些文件或目录，不对 tar 包做解打包操作。 |
| -C 目录      | 指定解打包位置。默认当前目录                               |

一般习惯用法是使用选项 "-xvf" 

```shell
tar -xvf a.tar #解包到当前目录

tar -xvf a.tar -C /tmp #指定解包后，输出的目录
```

另一种用法是使用选项 "-tvf" 

```shell
tar -tvf a.tar #会用长格式显示a.tar文件包中文件的详细信息

##比如：
#  -rw-r-r- root/root 0 2022-05-1 8:00 b.txt 
#  -rw-r-r- root/root 0 2022-05-2 8:00 c.cpp
```

### 压缩与解压缩

**.tar.gz和.tar.bz2**

上面我们说了目录不能直接压缩，需要先打包在压缩，但是在Linux中将tar命令，只需要加入一个参数，就能在打包后直接压缩。这样就不用区分目录还是文件了，一个tar命令就能【打包+压缩】+【解压缩+解打包】

- `-z`：压缩和解压缩 ".tar.gz" 格式
- `-j`：压缩和解压缩 ".tar.bz2"格式

```shell
#压缩为.tar.gz
tar -zcvf a.tar.gz b.txt c.cpp /text

#解压.tar.gz格式,到/temp目录下
tar -zxvf a.tar.gz -C /temp
```

**zip格式**，**gz格式**，**bz2格式**

注意：zip格式的压缩文件是 Windows 和 Linux 系统都通用的压缩文件类

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

### init进程

历史上，Linux 的启动一直采用init进程。下面的命令用来启动服务：

```shell
$ sudo /etc/init.d/apache2 start
#或者 
$ service apache2 start 
```

这种方法有两个缺点。

一、是启动时间长。init进程是串行启动，只有前一个进程启动完，才会启动下一个进程。

二、是启动脚本复杂。init进程只是执行启动脚本，不管其他事情。脚本需要自己处理各种情况，这往往使得脚本变得很长。

### Systemd进程

Systemd 就是为了解决这些问题而诞生的。它的设计目标是，为系统的启动和管理提供一套完整的解决方案。

根据 Linux 惯例，字母d是守护进程（daemon）的缩写。 Systemd 这个名字的含义，就是它要守护整个系统。

使用了 Systemd，就不需要再用init了。Systemd 取代了initd，成为系统的第一个进程（PID 等于 1），其他进程都是它的子进程。

```shell
$ systemctl --version #查看 Systemd 的版本。
```

Systemd 可以管理所有系统资源。不同的资源统称为 Unit（单位）

**操作进程**

最常用的命令

```shell
#显示系统状态
$ systemctl status

# 显示单个 Unit 的状态
$ sysystemctl status <服务名>

# 立即启动一个服务
$ systemctl start <服务名>

# 立即停止一个服务
$ systemctl stop <服务名>

# 重启一个服务
$ systemctl restart <服务名>

# 杀死一个服务的所有子进程
$ systemctl kill <服务名>

# 重新加载一个服务的配置文件
$ systemctl reload <服务名>

# 重载所有修改过的配置文件
$ systemctl daemon-reload

# 显示某个 Unit 的所有底层参数
$ systemctl show <服务名>

# 显示某个 Unit 的指定属性的值
$ systemctl show -p CPUShares <服务名>

# 设置某个 Unit 的指定属性
$ sudo systemctl set-property <服务名> CPUShares=500
```

```shell
# 设置开机启动
$ systemctl enable <服务名>
# 禁止开机启动
$ systemctl disable <服务名>
```

举个例子

```shell
systemctl restart docker #重启docker
```

```shell
systemctl stop firewalld #关闭防火墙
```

**查看进程**

查看占用端口号的进程信息

```shell
lsof -i:端口号

##如果提示没有lsof,就要先安装下
yum install -y lsof
```

**结束进程**

```
kill -9 进程号
```

### 注册进程 

我们可以把Linux中的一些可执行文件，注册到进程中，那么就可以用Systemd来统一管理了

内容参考[Centos7 自定义systemctl服务脚本](https://www.cnblogs.com/wang-yc/p/8876155.html)

system的脚本放置在/usr/lib/systemd下：

- /usr/lib/systemd/system  **系统服务，开机不需要登录就能运行的程序（相当于开机自启）**
- /usr/lib/systemd/user    **用户服务，需要登录后才能运行的程序**

system和user的目录下又存在两种类型的文件：

- `*.service `  **服务unit文件**
- `.target ` **开机级别unit**

实现把可执行文件，注册到进程中，实际上就是写一个`.service`文件，其主要分为三个区域：[Unit]、[Service]、[Install]

```shell
[Unit]   # 主要是服务说明
Description=test   # 简单描述服务
After=network.target    # 描述服务类别，表示本服务需要在network服务启动后在启动
Before=xxx.service      # 表示需要在某些服务启动之前启动，After和Before字段只涉及启动顺序，不涉及依赖关系。

[Service]  # 核心区域
Type=forking     # 表示后台运行模式。
User=user        # 设置服务运行的用户
Group=user       # 设置服务运行的用户组
KillMode=control-group   # 定义systemd如何停止服务
PIDFile=/usr/local/test/test.pid    # 存放PID的绝对路径
Restart=no        # 定义服务进程退出后，systemd的重启方式，默认是不重启
ExecStart=/usr/local/test/bin/startup.sh    # 服务启动命令，命令需要绝对路径
PrivateTmp=true                               # 表示给服务分配独立的临时空间
   
[Install]   
WantedBy=multi-user.target  # 多用户
```

```shell
Type的类型有：
    simple(默认）：# 以ExecStart字段启动的进程为主进程
    forking:  # ExecStart字段以fork()方式启动，此时父进程将退出，子进程将成为主进程（后台运行）。一般都设置为forking
    oneshot:  # 类似于simple，但只执行一次，systemd会等它执行完，才启动其他服务
    dbus：    # 类似于simple, 但会等待D-Bus信号后启动
    notify:   # 类似于simple, 启动结束后会发出通知信号，然后systemd再启动其他服务
    idle：    # 类似于simple，但是要等到其他任务都执行完，才会启动该服务。
    
EnvironmentFile:
    指定配置文件，和连词号组合使用，可以避免配置文件不存在的异常。

Environment:
    后面接多个不同的shell变量。
    例如：
    Environment=DATA_DIR=/data/elk
    Environment=LOG_DIR=/var/log/elasticsearch
    Environment=PID_DIR=/var/run/elasticsearch
    EnvironmentFile=-/etc/sysconfig/elasticsearch
    
连词号（-）：在所有启动设置之前，添加的变量字段，都可以加上连词号
    表示抑制错误，即发生错误时，不影响其他命令的执行。
    比如`EnviromentFile=-/etc/sysconfig/xxx` 表示即使文件不存在，也不会抛异常
    
KillMode的类型：
    control-group(默认)：# 当前控制组里的所有子进程，都会被杀掉
    process: # 只杀主进程
    mixed:   # 主进程将收到SIGTERM信号，子进程收到SIGKILL信号
    none:    # 没有进程会被杀掉，只是执行服务的stop命令
Restart的类型：
    no(默认值)： # 退出后无操作
    on-success:  # 只有正常退出时（退出状态码为0）,才会重启
    on-failure:  # 非正常退出时，重启，包括被信号终止和超时等
    on-abnormal: # 只有被信号终止或超时，才会重启
    on-abort:    # 只有在收到没有捕捉到的信号终止时，才会重启
    on-watchdog: # 超时退出时，才会重启
    always:      # 不管什么退出原因，都会重启
    # 对于守护进程，推荐用on-failure
RestartSec字段：
    表示systemd重启服务之前，需要等待的秒数：RestartSec: 30 
    
各种Exec*字段：
    # Exec* 后面接的命令，仅接受“指令 参数 参数..”格式，不能接受<>|&等特殊字符，很多bash语法也不支持。如果想支持bash语法，需要设置Tyep=oneshot
    ExecStart：    # 启动服务时执行的命令
    ExecReload：   # 重启服务时执行的命令 
    ExecStop：     # 停止服务时执行的命令 
    ExecStartPre： # 启动服务前执行的命令 
    ExecStartPost：# 启动服务后执行的命令 
    ExecStopPost： # 停止服务后执行的命令

    
WantedBy字段：
    multi-user.target: # 表示多用户命令行状态，这个设置很重要
    graphical.target:  # 表示图形用户状体，它依赖于multi-user.target
```

实战

```shell
vi /usr/lib/systemd/system/xxx.service
[Unit]
Description=xxx
 
[Service]
Type=forking
ExecStart=/usr/local/xxx
 
[Install]
WantedBy=multi-user.target
```



## 防火墙

查看防火墙规则 

```shell
firewall-cmd --list-ports #所有开启的端口

firewall-cmd --list-all #所有开启的规则
```

开放某端口

```shell
firewall-cmd --zone=public --add-port=80/tcp --permanent
```

 `--zone` 作用域   

`--add-port=80/tcp`  添加端口，格式为：端口/通讯协议  

`--permanent`  永久生效，没有此参数重启后失效

关闭某端口

```shell
 firewall-cmd --remove-port=80/tcp --permanent
```

添加rich规则

```shell
firewall-cmd --permanent --add-rich-rule="rule family="ipv4" source address="192.168.44.101" port protocol="tcp" port="8080" accept"
```

移除rich规则

```shell
firewall-cmd --permanent --remove-rich-rule="rule family="ipv4" source address="192.168.44.101" port port="8080" protocol="tcp" accept"
```

注：开启后需要重启防火墙才生效   

```shell
firewall-cmd --reload

//或者
systemctl restart firewalld
```

## SSH会话(连接远程服务器)

SSH 为 Secure Shell 的缩写，专为远程登录会话和其他网络服务提供安全性的协议（连接远程服务器时使用）

如果一个用户从本地计算机，使用SSH协议登录另一台远程计算机，我们就可以认为，这种登录是安全的，即使被中途截获，密码也不会泄露

当远程主机中开启openssh服务，那么就对外开放了远程连接的接口，ssh为openssh服务的客户端，sshd为openssh服务的服务端

我们购买的云主机一般ssh是默认开启的

所以我们可以用SSH工具连接远程主机，你可以使用PuTTY或者其他客户端，我这里使用WebStorm内置的SSH工具做演示

![image-20220319114440731](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Linux/image-20220319114440731%20.png)

身份验证类型使用"密码"，这个密码就是在购买云主机时，设置设置的

![image-20220319114703993](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Linux/image-20220319114703993%20.png)

## 安装Linux软件

Linux下的软件包几乎都是经 GPL 授权、免费开源（GPL，全称 General Public License，中文名称“通用性公开许可证”，简单理解 GPL 就是一个保护软件自由的一个协议，经 GPL 协议授权的软件必须开源）

Linux下的软件分为两种：

* **源码包**：源码包一般包含多个文件，为了方便发布，通常会将源码包做打包压缩处理，Linux 中最常用的打包压缩格式为`tar.gz`(回忆下**打包与压缩**部分的内容)，需要用户下载后，解压编译后安装。源码包中一般包含：
  - 源代码文件。
  - 配置和检测程序（如 configure 或 config 等）。
  - 软件安装说明和软件说明（如 INSTALL 或 README）
* **二进制包**：源码包经过成功编译之后产生的包（因为已经编译过了，用户省去了编译的时间，所以安装软件的速度更快）

### 源码包

平时我们下载的`.tar.gz`格式的软件包，就是把源码打包+压缩之后的文件

**准备**

* Linux 系统中，绝大多数软件的源代码都是用 C 语言编写的（少部分用C++或其他语言）。因此要想安装源码包，必须安装 gcc 编译器（如果涉及 C++ 源码程序，还需要安装 gcc-c++）

  ```shell
  yum install -y gcc
  ```

* 安装 make 编译命令。编译源码包，我们需要处理包中含大量的源码文件之间复杂的关联，使用 make 命令可以完成对源码包的自动编译

  ```shell
  yum install -y make
  ```

**安装**

* 去软件官网下载源码包（.tar.gz或者.tar.bz2）,通过FTP工具上传到主机中

* 解压+解打包

  ```shell
  tar -zxvf a.tar.gz # tar.gz格式
  
  tar -jxvf a.tar.bz2# tar.bz2格式
  ```

* 启动软件包的配置和检测程序

  configure 不是系统命令，而是源码包软件自带的一个脚本程序，所以必须采用 `./configure`方式执行（`./`代表在当前目录下）

  ```shell
  cd xxx #进入解压解打包后，生成的目录
  
  ./configure --prefix=安装路径 #【习惯于把源码包放在`/usr/src`或 `/usr/local/src`】
  ```

  注意：

  * 检测系统环境是否符合安装要求
  * 定义安装时，源码包安装的功能
  * 把系统环境的检测结果和定义好的功能选项写入 Makefile 文件，后续的编译和安装需要依赖这个文件的内容

* make 编译。make 会调用 gcc 编译器，并读取 Makefile 文件中的信息进行系统软件编译。编译的目的就是把源码程序转变为能被 Linux 识别的可执行文件，这些可执行文件保存在当前目录下

  ```shell
  make
  ```

* 正式开始安装软件，这里通常会返回程序的安装位置（前面的prefix设置的）

  ```
  make install 
  ```

  注意：如果在 `./configure` 或 `make`编译中报错，则在重新执行命令前一定要执行 `make clean` 命令，它会清空 Makefile 文件或编译产生的 `.o` 头文件

**卸载**

源码包的卸载，只需要找到软件的安装位置，直接删除所在目录即可，不会遗留任何垃圾文件（删除前，记得把软件的服务停止）

安装时，遵守约定的规范，把软件安装到`/usr/src`或 `/usr/local/src`】,删除时就会比较好查找

```shell
rm -rf /usr/local/apache2/
```

### 二进制包

**包管理系统**

Linux下主要有两个比较流行的包管理系统

* RPM 包管理系统：主要应用在CentOS、 Fedora、SuSE 中

* DPKG 包管理系统：由 Debian Linux 所开发的包管理机制，主要应用在 Debian 和 Ubuntu 中

这两种，我个人用的很少，所以不做详细介绍了，[详细用法](http://c.biancheng.net/view/2872.html)

**yum软件包管理器**

这两种都需要手动解决包之间具有依赖性的问题，所以更多还是使用yum（Yellow dog Updater Modified）

* 修改yum源

  配置文件地址 `/etc/yum.repos.d/CentOS-Base.repo`

  ```
  baseurl字段默认是yum官方的源地址
  ```

  ![image-20220502000219122](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Linux/image-20220502000219122.png)

* 安装包

  ```shell
  yum install -y 包名
  ```

* 卸载包

  ```shell
  yum remove 包名
  ```

* 升级包

  ```shell
  yum -y update #升级全部包
  yum -y update 包名 #升级指定包
  ```

* 查找包

  ```
  yum search 关键字 
  ```

* list相关命令

  ```shell
  yum list all #列出所有可用和已安装的包
  
  yum list available #列出所有可安装的包
  
  yum list updates #列出所有可更新的包
  
  yum list installed #列出已安装的的包
  ```

## Linux系统文件系统

Linux系统中的一切皆文件，所有的配置，都是通过编辑配置文件来实现的

所以，将各种文件分门别类保存在对应的目录中，是个好习惯，便于自己和他人的查找

**目录结构**

这个目录我会随着自己的学习，慢慢补充

```text
home
usr  
	|-lib  
		 ｜- systemd 
		 				｜-system #systemd的系统脚本
		 				｜-user   #systemd的用户脚本
	|- src #软件源码包安装位置
	|- local
				|-src #软件源码包安装位置
	
etc  #各种软件的配置文件
	｜- sysconfig
					|-network-scripts
sys 
bin 
boot  
dev  
lib  
lib64  
media  
mnt  
opt  
proc  
root  
run  
sbin  
srv  
sys  
tmp  
var
```







