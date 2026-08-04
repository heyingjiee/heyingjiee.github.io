# Nginx学习

## 前提准备

### 虚拟机安装

注意：安装虚拟机是为了在本地虚拟化Linux环境，便于学习。对应了实际应用场景中，企业的云服务器

* 本地安装虚拟机Vmware、Virtualbox、Parallls

  我这里只找到了mac版本的[vmware-fusion](https://macwk.com/soft/vmware-fusion)，所以就使用这个版本了

* 系统CentOS 7.4

  M2芯片电脑可以参照这个文档：https://blog.csdn.net/qq_43030127/article/details/130889628

  [官网](https://www.centos.org/download/)下载适合自己的版本

  ![image-20220430161537719](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Nginx/image-20220430161537719.png)

  ![image-20220430161625233](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Nginx/image-20220430161625233.png)

  ![image-20220430161855527](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Nginx/image-20220430161855527.png)

  | 版本           | 说明                                                         |
  | -------------- | ------------------------------------------------------------ |
  | DVD ISO        | 标准安装版                                                   |
  | Everything ISO | 对完整版安装盘的软件进行补充，集成所有软件。(包含[centos7](https://so.csdn.net/so/search?q=centos7&spm=1001.2101.3001.7020)的一套完整的软件包，可以用来安装系统或者填充本地镜像) |
  | Minimal ISO    | 精简版，自带的软件最少                                       |
  | NetInstall ISO | 网络安装镜像(从网络安装或者救援系统)                         |

* 使用虚拟机，安装CentOS镜像

  第一步、把镜像安装到Vmware，把下载的镜像拖到Vmware中

  ![image-20220430162755616](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Nginx/image-20220430162755616.png)

  ![image-20220430163645214](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Nginx/image-20220430163645214.png)

  ![image-20220430163827694](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Nginx/image-20220430163827694.png)

  ![image-20220430163914307](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Nginx/image-20220430163914307.png)

  ![image-20220430163951532](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Nginx/image-20220430163951532.png)

  第二步、Vmware安装好镜像，进入CentOS系统配置

  * 选择语言

    ![image-20220430164248258](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Nginx/image-20220430164248258.png)

  * 确认系统安装位置

    ![image-20220430164412467](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Nginx/image-20220430164412467.png)

    ![image-20220430164443903](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Nginx/image-20220430164443903.png)

  * 开始安装，安装过程中设置root密码，安装完成后重启

      ![image-20220430164506588](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Nginx/image-20220430164506588.png)

      ![image-20220430164600537](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Nginx/image-20220430164600537.png)

      ![image-20220430165140257](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Nginx/image-20220430165140257.png)

  * 账号root，密码就是上一步设置的密码

      ![image-20220430165302826](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Nginx/image-20220430165302826.png)

      登陆后

      ![image-20220430165355053](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Nginx/image-20220430165355053.png)

### 配置虚拟机网络

CentOS上有NetworkManager、Network两个网络管理软件。如果设置设置静态IP可能会导致冲突，一般关闭NetworkManager即可

```shell
systemctl stop NetworkManager # 关闭
systemctl disable NetworkManager # 关闭自启动
```

查看网络

```shell
ip addr 
```

可以看到两个网卡 `lo`和`ens33`（lo是本地网卡）

![image-20220430165742369](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Nginx/image-20220430165742369.png)

使用vi编辑器打开`ens33`网络的配置文件，修改启动配置（如何使用vi编辑器：`i`修模式改数据，`esc`退出，`:wq`保存退出vi编辑器）

```text
vi /etc/sysconfig/network-scripts/ifcfg-ebs33
```

![image-20220430170248402](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Nginx/image-20220430170248402.png)

重启网络

```text
systemctl restart network
```

就能看到ens33被分配在了网络IP（192.168.174.128），但是这个网路是动态分配的内网地址，重启后会一直变化。

![image-20220430172307651](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Nginx/image-20220430180620463.png)

**修改固定IP**

这一步仅仅是因为，ens33这个网卡的地址，每次重启都会动态分配，所以我们使用这个地址每次都需要修改SSH工具的“主机名”，所以，我们改成固定的。（如果你使用的是云服务器，使用公网IP连接，这个公网IP是不会变化的，就不用这一步）

还是进入ens33网卡的配置文件

```shell
vi /etc/sysconfig/network-scripts/ifcfg-ens33
```

增加一下配置（如果想要理解这些是啥，需要自行了解下计算机网络的基本知识）

```shell
IPADDR=192.168.174.120 # 设置IP
NETMASK=225.225.225.0 #子网掩码
GATEWAY=192.168.174.1 #网关
DNS1=8.8.8.8 # DNS服务器地址
```

修改文件中BOOTPROTO字段为static后，后IP就固定为了IPADDR的值

```shell
BOOTPROTO=static #原来值是dhcp，就是动态获取ip的一个协议
```

### 克隆虚拟机

打开虚拟机资源库

![image-20220430194449067](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Nginx/image-20220430194449067.png)

两种克隆方式，选择哪种都可以将前面配置的虚拟机克隆出来新的

![image-20220430194645169](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Nginx/image-20220430194645169.png)

### 使用SSH连接虚拟机

使用SSH可以方便的在本地连接远程云服务器（对应的就是我们这里装在本地的虚拟机），对其进行

SSH软件很多，比如Xshell，他们的使用都大同小异，我这里使用的是Mac上的Termius，

**新建连接**

![image-20220501163148066](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Nginx/image-20220501163148066.png)

主机地址就是云服务器的公网地址，对应就是上面本地虚拟机ens33这个网卡的地址，与公网地址不同，这个地址是内网地址，每次重启都会动态分配（设置为固定IP就不会变了）

![image-20220501163422998](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Nginx/image-20220501163422998.png)

## Nginx介绍

Nginx是一个高性能的HTTP、反向代理服务器

主要功能：

* 反向代理
* 实现集群和负载均衡
* 静态资源虚拟化

Nginx的版本：

* Nginx开源版 http://nginx.org/en/

  官方原始的Nginx版本

* Nginx plus商业版 

  开箱即用，集成了大量功能

* Open Resty https://openresty.org/cn/

  OpenResty是一个基于Nginx与 Lua 的高性能 Web 平台，其内部集成了大量精良的 Lua 库、第三方模块以及大多数的依赖项。**更适用于需要大量二次开发的场景，有极强的扩展性**

* Tengine https://tengine.taobao.org/

  由淘宝网发起的Web服务器项目。它在[Nginx](http://nginx.org/)的基础上，针对大访问量网站的需求，添加了很多高级功能和特性。Tengine的性能和稳定性已经在大型的网站如[淘宝网](http://www.taobao.com/)，[天猫商城](http://www.tmall.com/)等得到了很好的检验。相比于Open Resty，扩展性不够强，但是能够满足绝多数使用场景

## 什么是代理

**正向代理**

正向代理可以理解为「客户端」的代理

![image-20220919121907145](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Nginx/20220919121907%20.png)

**反向代理**

反向代理可以理解为「服务器」的代理

![image-20220919122008649](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Nginx/20220919122008%20.png)

## Nginx安装相关

### 下载与安装

下载源代码手动编译安装(推荐)，下载Nginx包：[官网下载地址](http://nginx.org/en/download.html)

![image-20220501140833867](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Nginx/image-20220501140833867.png)

使用FTP工具将文件上传到虚拟机中

Termius也提供了FTP的功能，直接将下载的Nginx包拖拽到主机目录中，我这里是放到了root目录下

![image-20220501163732603](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Nginx/image-20220501163732603.png)

* 解压Nginx包，并安装

  ```shell
  tar -zxvf  nginx-1.21.6.tar.gz #解压到当前目录
  
  cd nginx-1.21.6 #进入解压后的文件夹
  ls 
  #文件夹中的文件：auto     CHANGES.ru  configure  html     man     src CHANGES  conf        contrib    LICENSE  README
  ```

  安装依赖库

  ```shell
  #安装C编译器
  yum install -y gcc
  
  #安装pcre库PVEL
  yum install -y pcre pcre-devel
  
  #安装zlib
  yum install -y zlib zlib-devel
  ```

  编译安装

  ```shell
  ./configure --prefix=/usr/local/nginx # 指定编译选项，--prefix选项指定安装的目录
  make # 编译
  make install # 安装编译结果
  ```

  启动

  ```shell
  cd /usr/local/nginx/sbin
  
  ls # 里面是一个nginx的可执行文件
  
  ./nginx # 这个就是nginx的可执行文件
  ```

### 重点：关闭防火墙

```shell
# 查看防火墙状态
systemctl status firewalld
```

![image-20240212184250473](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20240212184251zVhJbP.png)

  ```shell
  # 关闭防火墙（一般不关闭，而是开放需要的端口）
  # systemctl stop firewalld
  
  # 开放端口，例子：firewall-cmd --zone=public --add-port=80/tcp --permanent
  firewall-cmd --zone=public --add-port=端口号/协议 --permanent
  
  # 修改后，重启防火墙才会生效
  firewall-cmd --reload
  ```

补充：--zone参数为防火墙规则应用的区域

```
区域包括：
	public：用于公共网络，例如 Internet。
	internal：用于内部网络，例如公司内部网络。
	external：用于外部网络，例如连接到互联网的网络。
	work：用于工作场所网络。
	home：用于家庭网络。
```

获取当其系统的区域

```shell
firewall-cmd --get-default-zone
```

### 注册为系统服务

注册为系统服务后，可以以系统服务的方式启动nginx

新增系统服务配置文件：

  ```
  vim usr/lib/systemd/system/nginx.service
  ```

  ```shell
  [Unit] 
  Description=nginx # 服务描述
  After=network.target remote-fs.target nss-lookup.target 
  #指定你的服务应该在哪些系统目标（target）之后启动
  # network.target：网络服务的就绪状态
  # remote-fs.target ：远程文件系统的就绪状态（等待远程文件系统挂载完成）
  # nss-lookup.target ： Name Service Switch (NSS) 查询的就绪状态（等待 DNS 解析和其他命名服务的就绪状态，如果服务需要进行名称解析需要设置这个）
  
  [Service]
  Type=forking # Nginx是一个master进程，fork出多个worker进程，所以类型是forking
  # simple（服务在启动后会立即进入运行状态，而且不会在后台分叉（fork）出其他子进程。当服务的主进程退出时，系统认为服务已经停止）
  # forking（适用于那些启动后立即生成子进程并退出主进程的服务）
  # oneshot 适用于只需在启动时执行一次操作的服，服务在启动时执行完成后就停止。这种类型的服务通常用于执行某种初始化任务或者数据加载
  # notify 适用于通过向 systemd 发送通知来指示服务已经启动完毕的服务
  # dbus 在服务启动完成后，它需要发送一个特定的通知给 systemd，以告知服务已经准备就绪
  
  PIDFile=/usr/local/nginx/logs/nginx.pid
  ExecStartPre=/usr/local/nginx/sbin/nginx -t -c /usr/local/nginx/conf/nginx.conf
  ExecStart=/usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf # 服务启动时要执行的命令或脚本
  ExecReload=/usr/local/nginx/sbin/nginx -s reload # 重新加载
  ExecStop=/usr/local/nginx/sbin/nginx -s stop # 停止
  ExecQuit=/usr/local/nginx/sbin/nginx -s quit  # 退出
  PrivateTmp=true 
     
  [Install]   
  WantedBy=multi-user.target  # 多用户
  ```

系统服务如何使用？

```shell
systemctl enable xxx服务名 # 自启动服务
systemctl status xxx服务名 # 服务运行状态

systemctl start xxx服务名
systemctl reload xxx服务名
```

### Nginx常用命令

  ```shell
./nginx -s stop # 快速停止（正在进行的请求会直接被中断，很少使用）
./nginx -s quit # 处理完已接受的请求后，才会停止（优雅关机）
./nginx -s reload # 重新加载配置

./nginx -c xxx.conf # 配置nginx使用的配置文件地址（默认为conf/nginx.conf ）

./nginx -t # 检查nginx配置是否正确
./nginx -v # nginx版本号
  ```

```shell
./nginx -V # nginx详细信息，nginx版本号+编译使用的gcc版本号+编译配置
# 这里可以看到默认的 

# pid文件地址: --pid-path=/var/run/nginx/nginx.pid
# 错误日志地址：--eror-log-path=/var/log/nginx/error.log
# 请求日志地址：--http-log-path=/var/log/nginx/access.log（每一个请求就记录一个日志）
```

![image-20240212012322939](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20240212012323BHhL0x.png)

 查看nginx状态

  ```
ps -ef|grep nginx
  ```

  启动时：  ![image-20220501205303265](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Nginx/image-20220501205303265.png)

  停止时：

  ![image-20220501205333304](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Nginx/image-20220501205333304.png)

  

### Nginx目录

Nginx一般安装在`/usr/local/nginx`目录下（安装时--prefix可指定安装目录）

![image-20220919122708336](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Nginx/20220919122708%20.png)

```text
conf #配置文件
	｜-nginx.conf # 主配置文件
	｜-其他配置文件 # 可通过那个include关键字，引入到了nginx.conf生效
	
html #静态页面

logs（默认不是放在这里，可以在配置文件中修改为这里）
	｜-access.log #访问日志(每次访问都会记录)
	｜-error.log #错误日志
	｜-nginx.pid #进程号
	
sbin
	｜-nginx #主进程文件
	
*_temp #运行时，生成临时文件
```

## Nginx进程模型

一个Master：监听请求，并分配worker进程处理

默认一个worker进程（可以在配置文件中修改worker数量）：处理客户端请求

![image-20220502111337135](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Linux/image-20220502111337135.png)

每个worker之间彼此独立，每一个worker处理多个请求

![image-20240212001002289](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20240212001003rFs1iE.png)

### worker的抢占机制

多个worker进程争抢一个锁，获取锁的进程进行响应

![image-20240212001442729](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20240212001442wzLPCa.png)

### Worker事件处理机制

传统HTTP服务器是同步处理，当多个客户端请求时，如果Client1的请求被阻塞，Master会fork新的worker进程处理

但是Nginx采用的是异步非阻塞方式，如果Client1的请求被阻塞，worker会取处理下一个请求，不会阻塞当前worker进程。所以Nginx的一个worker进程可以并发处理大量请求

![image-20240212001752869](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20240212001753xbh9rx.png)

## Nginx配置

[Nginx配置文章](https://www.toutiao.com/article/7325692601267978789/?app=news_article&timestamp=1707783232&use_new_style=1&req_id=202402130813514EACD35B30C764DC86C1&group_id=7325692601267978789&share_token=3DDBA935-E652-4FCF-9792-E4FED2D9C0CA&tt_from=weixin&utm_source=weixin&utm_medium=toutiao_ios&utm_campaign=client_share&wxshare_count=1&source=m_redirect)

[Nginx配置生成工具](https://www.digitalocean.com/community/tools/nginx?global.app.lang=zhCN)

后面学习Nginx配置，每次修改配置文件，一定要重载才能生效

```shell
systemctl reload nginx # 以系统服务的方式启动nginx
```

### nginx.conf配置文件

```shell
# master进程会启动worker进程，该选项设置在系统中显示启动该进程的用户名（一般不改动，默认nobody）
# user nobody


# 启动的worker进程数
worker_processes  1; 



# 错误日志放置的路径 notice、info是错误日志的级别，比如：info就是日志级别大于info才生成日志
# 默认地址为/var/log/nginx/error.log ，可通过nginx -V返回的--eror-log-path字段获取实际值
#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;


# pid文件存放路径,默认：/var/run/nginx/nginx.pid，可通过nginx -V返回的--pid-path字段获取实际值
#pid        logs/nginx.pid;



# 配置事件处理方式、worker最大连接数
events {
		use epoll; # 使用epoll事件处理机制（默认值）
    worker_connections  1024; # 每个worker进程处理的最大连接数
}


# 处理请求的配置（最重要）
http {
		
		# 引入，这里表示引入mime.types配置文件（同在conf目录下，mime.types是用来定义，请求返回的content-type）
    include       mime.types; 
    
    # mime.types未定义的，使用默认格式application/octet-stream
    default_type  application/octet-stream; 
    
    # 访问日志格式
    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

		# 访问日志地址，默认：/var/log/nginx/access.log，可通过nginx -V返回的--http-log-path字段获取实际值
    #access_log  logs/access.log  main;

		# 详见下文
    sendfile        on; 
    #tcp_nopush     on;
    
    keepalive_timeout  65; # TCP链接超时时间,单位秒
	
		# 开启压缩，压缩后发送给客户端
		gzip on; 
		
		# 详见下文 
    server {
        //xxx
    }
}
```

### sendfile配置

打开sendfile，用户请求的数据不用再加载到nginx的内存中，而是直接发送

高负载的场景下，使用 sendfile 功能可以降低 CPU 和内存的占用，提升服务器性能

```shell
http{
	sendfile:on # off
}

# 或者指定某个server开启
server {
    location / {
        sendfile off;
        ...
    }
}
```



![image-20220502113913235](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Nginx/image-20220502113913235.png)

### gzip配置

```shell
http{
	  gzip on; # 开启压缩，压缩后发送给客户端
		gzip_min_length 1;# 设置最小压缩下限。1就是小于1字节的文件不压缩
		gzip_comp_level 3 # 压缩级别0-9，值越大文件就压缩的越小，相应的会损耗更多性能
		gzip_type text/plain application/javascript image/* # 指定哪些 MIME 类型，开启压缩（不写默认全部），可以使用通配符 image/* 就是所有图片。具体哪些类型可以看conf/mime.types文件
}
```



nginx 中的 gzip 压缩分为动态压缩、静态压缩

* 动态压缩：服务器给客户端返回响应时，消耗自身的资源进行实时压缩，保证客户端拿到 gzip 格式的文件

  gzip on开启的就是动态压缩，gzip_comp_level设置的级别高，可能会造成CPU占用过高（文章：[简单一招竟把nginx服务器性能提升50倍](https://www.toutiao.com/article/7329343713828897280/?app=news_article&timestamp=1707783801&use_new_style=1&req_id=202402130823202F9A6100389685E57A11&group_id=7329343713828897280&share_token=F2E89DA7-CC1F-4AAC-9BCC-A82B8020A9D6&tt_from=weixin&utm_source=weixin&utm_medium=toutiao_ios&utm_campaign=client_share&wxshare_count=1&source=m_redirect)）

* 静态压缩：直接将预先压缩过的 .gz 文件返回给客户端，不再实时压缩文件，如果找不到 .gz 文件，会使用对应的原始文件

  该功能需要模块： `ngx_http_gzip_static_module`（默认不会被构建）

  我们可以通过下面命令查看，当前安装的是否包含该模块

  ```shell
  ./nginx -V
  ```

  ![image-20240214140934611](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20240214140934jo2cnZ.png)

  如果不包含，需要重新编译Nginx

  ```shell
  ./configure --with-http_gzip_static_module # 指定编译配置，这个参数安装模块`ngx_http_gzip_static_module`
  make # 编译
  make install # 安装
  ```

  包含该模块，则可以启用下面配置

  ```shell
  http{
  	gzip_static  on;
  	gzip_proxied expired no-cache no-store private auth;
  }
  ```

  

### server配置

虚拟主机配置（可以启用多个），多个server字段，会根据请求的域名+端口从前向后匹配

一定记住：需要把域名解析到当前部署Nginx的这台机器，这样请求才会打到机器上，nginx才能转发

本地模拟：

* 我们本地测试时可以直接修改host，建立域名与Nginx所在机器IP的映射

* server_name设置为localhost，即表示匹配任何打到这台机器的请求

下面配置：

* 请求进来后，先根据 `server_name:listen` 匹配到进入哪个 server配置
* 根据 `location` 匹配路径，走具体的转发逻辑

```shell
 http {
 		#....其他属性
 		
		# 支持多个server
 		server {
 				# 访问日志字段也可以设置在Server中，命中该Server的请求日志都在这里
 		    access_log logs/pro.hedaodao.ltd-access.log 
 		    
 		    
 		    # ---------------------------------- 匹配 server_name + listen
 		    # 端口
        listen 80; 
        
  
        # 注意：hedaodao.com 域名需要先解析到机器上，server_name 用来配置不同的子域名转发规则
        # 1、支持多个域名（空格分隔）
        # server_name  test1.hedaodao.com test2.hedaodao.com;
        # 2、支持通配符，例如：*.example.org 。
        server_name  test.hedaodao.com; 
        
 				# ---------------------------------- 匹配路径
 				
 				# 规则：
 				# 1、按照从上到下的顺序，命中第一个被匹配到的。省略了匹配到路径后内部的配置
 				# 2、访问 URI 带尾斜杠被认为是访问目录，例如： test.hedaodao.com:80/a/ 
 				# 3、访问 URI 不带尾斜杠，例如： test.hedaodao.com:80/a 会先检查是否存在a文件，没有就认为是目录，301 重定向为test.hedaodao.com:80/a/
 				
 				# 【类型1】精确匹配
        #  只有访问 test.hedaodao.com:80/50x.html才能命中这条规则
        location = /50x.html {
            root   html;
        }
				
				# 【类型2 不推荐】/ 即任何路径都会命中
        location / {  }
        
        # 【类型3】
        # /abc 命中 /abc、/abc/、/abc/ef、`/abc123` （注意，可能命中意外的路径/abcxxxxx，不推荐）
        location /abc {  } 
        
        # /abc/ 命中 /abc/、/abc/ef 
        location /abc/ {  } 
        
        # 【类型4】正则
        #  '~',例子：location ~ ，表示匹配所有路径
        #  '~（空格）正则' ，例子：~ \.(png|gif) 匹配png、gif的路径
        #  '~*（空格）正则'，不区分大小写，例子：~ *\.(png|gif) 匹配png、PNG、gif、GIF等路径
        #  '^~（空格）字符串' ，表示匹配以字符串开头的请求，例子：^~ /test，即 test.hedaodao.com:80/test/xxx可以命中
        location ~*\.(png|gif) { }
        
       # ---------------------------------- 匹配路径后，里面具体的配置
       # 【情景1】
       location / {  
        		# 根路径，test.hedaodao.com:80/xxx 实际上访问 /var/www/html/xxx 文件
            root /var/www/html;  
            
            # 兜底
            # 请求 /xxx/ 带尾斜杠是访问目录，直接返回兜底文件 /var/www/html/xxx/index.html、 /var/www/html/xxx/index.htm
            # 请求 /xxx 是访问文件，有就返回，没有Nginx默认返回301让浏览器重定向/xxx/，访问目录就是上面的逻辑了
            index  index.html index.htm; 
            
    				# 注意 Vue History 模式需要配置这个
    				# 上一个选项index，提到如果找不到文件就会301重定向，try_files 修改了默认的查找规则
    				# $uri是文件，找不到文件，就当目录找，然后兜底 /var/www/html/index.html
    				# $uri是目录，$uri/还是当目录（nginx把两个斜杠为一个），然后兜底
    				try_files $uri $uri/ /index.html;
        }
        
        # 【情景2】
        #  一般静态文件会用alias
        #  test.hedaodao.com:80/images/xx 会命中这里，实际请求路径为：/var/www/images/xxx。
        #  对比root字段，如果下面的alias替换为root字段，则实际请求路径为/var/www/images/images/xxx，这显然是错误的
        location /images/ {
        	# alias设置请求的别名，用于替换文件系统路径。
        	alias /var/www/images/;
    		}

 				# 【情景3】
				# 反向代理，proxy_pass将请求转发到后端服务器
				# location是固定路径
    		location /admin/api/ {
    			# 不带尾斜杠，保留location
    			# 请求 test.hedaodao.com/admin/api/users -> http://backend_server/admin/api/users
        	proxy_pass http://backend_server;
        	
        	# 带尾斜杠，不保留location
        	# 请求 test.hedaodao.com/admin/api/users -> http://backend_server/users
        	proxy_pass http://backend_server/;
    		}
    		
    		# location是正则路径，proxy_pass不能带尾斜杠
    		location ~ ^/admin/api/ {
    			proxy_pass http://backend_server;
    		}

				# 服务器错误码为500 502 503 504，转到"域名/50x.html"
        error_page 500 502 503 504  /50x.html;
        
		}

 		server {
        # xxxx
		}
}
```

**server配置在单独文件维护**

新建配置文件`hedaodao.conf`，在server配置放在一个独立文件维护

```shell
server {
   # xxxx
}

server {
   # xxxx
}
```

在http中引入server配置

```shell
http{
	include hedaodao.conf
}
```

**不同域名，映射到同一静态页面**

server_name

* 可以写多个，用空格分开
* 使用通配符（*）
* 使用正则表达式（https://blog.csdn.net/yangyelin/article/details/112976539）

```shell
http{ 		
 		server {
        listen       80;
        server_name  *.hedaodao.ltd  ~^[0-9]+\.hedaodao\.ltd$; # "\."是转译"."

        location / { 
            root   html/test; 
            index  index.html index.htm;
        } 
		}
}
```

### Nginx内置变量

https://cloud.tencent.com/developer/article/1955568?areaSource=102001.13&traceId=9kl0z2u4sa7AShSUHYJi4



## 日志切割

Nginx长期运行会产生大量日志，如果不开启日志切割，出现问题很难通过日志排查

```shell
默认的日志路径
# 错误日志地址：--eror-log-path=/var/log/nginx/error.log
# 请求日志地址：--http-log-path=/var/log/nginx/access.log（每一个请求就记录一个日志）
```

需要借助crontabs设置定时任务

安装

```shell
yum install crontabs
```

设置定时任务

```shell
crontabs -l # 查看全部定时任务

crontabs -e # 添加定时任务（打开一个文件）
```

添加任务

```
* */1 * * * *  /usr/local/nginx/sbin/cut_log.sh # 每隔1分钟执行一次
```

其中，`cut_log.sh`自己写的切割脚本

![image-20240225115801943](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20240225115802gxc2kC.png)

重启crontabs配置才会生效

```
service cornd restart
```



## Nginx网关服务器

![image-20220503121135171](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Nginx/image-20220503121135171.png)

企业中，无论是前端页面、静态资源、接口，都是通过Nginx进行访问（使用proxy_pass），这时候这台Nginx服务器就成为了网关服务器（承担入口的功能）

### 应用服务器设置

所以，我们启动应用服务器的防火墙，设置其只能接受这台Nginx服务器的请求

**添加rich规则**

```shell
firewall-cmd --permanent --add-rich-rule="rule family="ipv4" source address="192.168.174.135" port protocol="tcp" port="8080" accept" #这里的192.168.174.135是网关 服务器地址
```

**移除rich规则**

```shell
firewall-cmd --permanent --remove-rich-rule="rule family="ipv4" source address="192.168.174.135" port port="8080" protocol="tcp" accept"
```

**重启**

移除和添加规则都要重启才能生效

```shell
firewall-cmd --reload
```

**查看所有规则**

```shell
firewall-cmd --list-all #所有开启的规则
```

### 浏览器跨域

浏览器中网页地址与请求地址不同域，会出现跨域问题

Nginx作为网关，外部所有请求都通过Nginx服务器转发到内部

通常后端接口，可以在响应头中增加 `Access-Control-Allow-Origin`字段，并将值设置为前端域名，解决跨域问题。但是静态资源出现跨域就必须在Nginx中配置了

```shell
server {
        listen       80;
        server_name  localhost;
				
				# 为当前的server配置跨域配置
				
				# 允许跨域的请求，*表示所有
        add_header 'Access-Control-Allow-Origin' *;
        
        # 允许携带cookie请求
        add_header 'Access-Control-Allow-Credentials' 'true';
        
        # 允许跨域请求的方法：GET,POST,OPTIONS,PUT
        add_header 'Access-Control-Allow-Methods' 'GET,POST,OPTIONS,PUT';
        
        # 允许请求时携带的头部信息，*表示所有
        add_header 'Access-Control-Allow-Headers' *;
        
        # 允许发送按段获取资源的请求
        add_header 'Access-Control-Expose-Headers' 'Content-Length,Content-Range';
        
        
        location /fpath {
            root   /home;
            index  index.html;
            # post请求如果出现跨域，必须放在这具体请求的路径里面才行
            # 在发送Post跨域请求前，会以Options方式发送预检请求，服务器接受时才会正式请求
           if ($request_method = 'OPTIONS') { # nginx配置中=表示比较，不是赋值
             add_header 'Access-Control-Max-Age' 1728000;
             add_header 'Content-Type' 'text/plain; charset=utf-8';
             add_header 'Content-Length' 0;
             # 对于Options方式的请求返回204，表示接受跨域请求
             return 204;
          }
        }

}
```



## 反向代理与负载均衡

**反向代理**：这种代理方式叫做，隧道代理。有性能瓶颈，因为所有的数据都经过Nginx，所以Nginx服务器的性能至关重要

![image-20220502173846436](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Nginx/image-20220502173846436.png)

**负载均衡**：把请求，按照一定算法规则，分配给多台业务服务器（即使其中一个坏了/维护升级，还有其他服务器可以继续提供服务）

![image-20220502174023144](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Nginx/image-20220502174023144.png)

### L4、L7负载均衡

**L4负载均衡**

在传输层（第四层）上工作的。它基于 IP 地址和端口号来进行负载均衡，不考虑传输的具体内容，仅通过查看传入数据包的目标 IP 地址和端口号，并根据预定义的规则将其转发到后端服务器上。

四层负载均衡器的主要优点是性能高，因为它只关注传输层的信息，不需要解析应用层协议的数据。常见的四层负载均衡器：

* F5硬负载均衡（硬件，价格昂贵）
* LVS四层负载均衡
* Haproxy四层负载均衡
* Nginx四层负载均衡（Nginx 1.9版本后才支持，用得少Nginx一般用做七层负载均衡）

**L7负载均衡**

在应用层（第七层）上工作的。它不仅考虑了传输层的信息（如 IP 地址和端口号），还分析了传输的应用层数据，例如 HTTP 请求的 URL、Cookie、报头等信息。基于这些信息，七层负载均衡器可以做出更精细的决策，并根据具体的应用需求将流量分发到不同的后端服务器上。

七层负载均衡器在传输层和应用层之间工作，因此它比四层负载均衡器更智能，可以实现更复杂的负载均衡策略。常见的七层负载均衡器：

* Nginx七层负载均衡

* Haproxy七层负载均衡
* apache七层负载均衡（并发到达百万级别，性能会大幅下降）

### DNS地域负载均衡

用户请求`www.imooc.com`，DNS根据用户地域返回不同机房的IP地址

![image-20240214134149333](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20240214134149FQwf5z.png)

### Nginx负载均衡

#### 负载均衡配置

**反向代理单个服务器**

启用proxy_pass，root和index字段就会失效

proxy_pass后的地址必须写完整 `http://xxx `、`https://xxx`

**注意：目标服务器如果是https的，需要特殊配置**

当请求命中了这条规则，会被转发到目标服务器地址

```shell
http{ 		
 		server {
        listen       80;
        server_name  localhost;

        location / { 
        		proxy_pass http://xxx; # 参数是 http://server_name
        }
		}
}
```

路径 + 参数会被一起转发

```
假设Nginx机器的地址为：http://www.xxx.com


请求 http://www.xxx.com/test?a=1
会被 proxy_pass地址/test?a=1
```

重写需求： 例如只有api前缀的才转发到后台服务器，但是接口并不包含api路径

```
location / { 
	 rewrite ^/api/(.*)  $1 
   proxy_pass http://xxx; # 参数是 http://server_name
}
```

```
请求 http://www.xxx.com/api/test?a=1
会被 proxy_pass地址/test?a=1
```



**反向代理集群**

上面Nginx接到请求后，会转发到一个目标地址。可以设置多个，实现负载集群

请求会代理到`192.168.174.133:80`和`192.168.174.134:80`这两个服务

每次访问随机分配到两个地址（后面讲到，因为默认权重相等）

```shell
http{
	upstream test_server{ # 参数是server_name
		server 192.168.174.133:80; #如果是80端口，可以省略不写
		server 192.168.174.134:80;
	}
	server {
        listen       80;
        server_name  localhost;

        location / { 
        		proxy_pass http://test_server;
        }
		}
}
```

**设置权重**

多个请求，Nginx会根据权重分配

```shell
upstream test_server{
		server 192.168.174.133:80 weight=10;
		server 192.168.174.134:80 weight=80;
}
```

**关闭**

为什么使用down关闭，而不是直接删除？请看ip_hash部分

```shell
upstream test_server{
		server 192.168.174.133:80 down;
		server 192.168.174.134:80;
}
```

**慢启动**

注意：商业版才有这个配置

```shell
upstream test_server{
		server 192.168.174.133:80 slow_start=60s; # Nginx会在60的时间内，慢慢分配流量从0到正常值
		server 192.168.174.134:80;
}
```

**备用机**

backup的这个机器正常是不会被访问到，如果`192.168.174.133:80`出现故障，无法提供服务，才会自动启用

```shell
upstream test_server{
		server 192.168.174.133:80 ;
		server 192.168.174.134:80 backup;
}
```

**失败重试**

```shell
upstream test_server{
    # 失败次数超过max_fail后，Nginx在fail_timeout时间内将不会转发任何请求给这个服务，超过fail_timeout后会在尝试一次。成功则恢复转发，否则仍然fail_timeout时间，再次尝试
		server 192.168.174.133:80 max_fail=2 fail_timeout=10s;
		server 192.168.174.134:80 ;
}
```

#### 负载均衡算法

**ip_hash**

对用户的ip进行计算：`Hash(IP)%upstream_node_count`，返回要使用机器的索引

每一个用户会固定分配到一台机器，防止在A机器上创建Session的用户，后续被分配到其他机器，导致Session失效

开启ip_hash后，如果想要移除一台server，必须使用down配置。如果直接删除，会导致upstream_node_count变化，使得所有用户访问的访问的机器发生变化

缺点：

* 增加服务节点会导致upstream_node_count变化，进而导致所有用户访问的机器变化

* 某个用户短时间发起大量请求，会打到一台固定的机器，导致这台机器性能大幅下降，而其他机器可能还是空闲

````shell
upstream test_server{
    # 开启ip_hash，
    ip_hash;
    
		server 192.168.174.133:80;
		server 192.168.174.134:80;
}
````

**一致性哈希算法（Consistent Hashing）**

一致性哈希算法解决了使用ip_hash，在新增、删除服务节点时，所有用户访问节点发生变化的问题

hash函数返回值的范围是[0,2^32-1]

节点IP计算哈希，用户IP计算哈希，用户分配的节点是其右侧的第一个节点

增加、减少服务节点，只会影响一小部分用户，而不是全部

![image-20240214195506727](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20240214195506HSI4Yx.png)

```shell
# consistent不加使用的就是普通hash算法
upstream test_server{
    hash $request_uri consistent; # 基于请求的uri做一致性哈希
    hash $remote_addr consistent; # 基于请求的全部32为IPv4地址做一致性哈希（ip_hash只对IPv4的前24位做哈希）
    hash $cookie_xxx consistent; # 基于请求cookie中的xxx字段做一致性哈希
    
		server 192.168.174.133:80;
		server 192.168.174.134:80;
}
```

**least_conn**

尽可能将请求转发到当前连接数最少的后端服务器

```shell
upstream test_server{
    least_conn;
    
		server 192.168.174.133:80;
		server 192.168.174.134:80;
}
```

下面例子，开启least_conn，Nginx会优先转发到Tomcat3

![image-20240214201248332](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20240214201248Mekybz.png)

#### Nginx负载高可用方案

##### 背景

如下图，如果只有一个Nginx作为网关，一旦出现故障会导致全部服务不可用

![image-20240215121007981](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20240215121008CdUK2x.png)

高可用方案：

![image-20220503174125433](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Nginx/image-20220503174125433.png)

注意：Nginx主备机器配置要基本一致，如果配置相差较大，在切换时大量流量进入备用机，容易造成宕机

**VRRP协议**

keepalived是基于VRRP（Virtual Router Redundancy Protocol）协议的

VRRP可以将多个Nginx网关机器分为 master、backup两种类型，并生成一个VIP（虚拟IP）

每台机器上的keepalived会相互通信，根据其他机器上的keepalived进程是否存在，判断服务器状态，如果默认的Master停止了，就会在剩下的Backup机器中，竞选出一台Nginx服务器作为Master

由Master服务器使用这个VIP，用户访问时，访问的是VIP

##### keepalived下载安装

源码安装

[官网下载地址](https://www.keepalived.org/download.html)

```shell
# 解压到当前目录
tar -zxvf  xxx 

# 安装编译环境
yum install -y gcc openssl-devel libnl3 libnl3-devel

# 指定编译配置
./configure --prefix=/usr/local/keepalived --sysconf=/etc #--prefix指定安装路径，--sysconf指定keepalived配置文件位置（必须指定为/etc目录，否则报错）

# 编译
make 

# 安装
make install

# 配置文件在目录/etc/keepalived，新建或者把keepalived.conf.sample改成keepalived.conf文件
cd /etc/keepalived
mv keepalived.conf.sample keepalived.conf
```

**注册为系统服务**

```shell
# 从安装目录找到两个 keepalived 文件，移到etc下对应目录
cp /keepalived-2.2.8/keepalived/etc/init.d/keepalived /etc/init.d

cp /keepalived-2.2.8/keepalived/etc/sysconfig/keepalived  /etc/sysconfig/


systemctl daemon-reload

systemctl start keepalived.service
```

如果提示报这个错，一般就是etc/keepalived目录下没有配置文件keepalived.conf

![image-20240218190011663](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20240218190012AndI7U.png)

##### keepalived配置项

**修改keepalived配置**

* 配置文件在`/etc/keepalived/keepalived.conf`

  默认配置文件：

  ```shell
  ! Configuration File for keepalived
  
  global_defs {
  	 # keepalived邮件通知（可配置多个）
     notification_email {
       acassen@firewall.loc
       failover@firewall.loc
       sysadmin@firewall.loc
     }
     # 邮件发件人地址
     notification_email_from Alexandre.Cassen@firewall.loc
     # 邮件服务器（SMTP）地址
     smtp_server 192.168.200.1
     # 连接SMTP服务器的超时时间
     smtp_connect_timeout 30
     # 后面会提到
     router_id LVS_DEVEL
     # vrrp相关配置，用的比较少
     vrrp_skip_check_adv_addr
     vrrp_strict
     vrrp_garp_interval 0
     vrrp_gna_interval 0
  }
  
  vrrp_instance VI_1 {
      state MASTER
      interface eth0
      virtual_router_id 51
      priority 100
      advert_int 1
      authentication {
          auth_type PASS
          auth_pass 1111
      }
      virtual_ipaddress {
          192.168.200.16
          192.168.200.17
          192.168.200.18
      }
  }
  
  virtual_server 192.168.200.100 443 {
      delay_loop 6
      lb_algo rr
      lb_kind NAT
      persistence_timeout 50
      protocol TCP
  
      real_server 192.168.201.100 443 {
          weight 1
          SSL_GET {
              url {
                path /
                digest ff20ad2481f97b1754ef3e12ecd3a9cc
              }
              url {
                path /mrtg/
                digest 9b3a0c85a887a256d6939da88aabd8cd
              }
              connect_timeout 3
              retry 3
              delay_before_retry 3
          }
      }
  }
  
  virtual_server 10.10.10.2 1358 {
      delay_loop 6
      lb_algo rr
      lb_kind NAT
      persistence_timeout 50
      protocol TCP
  
      sorry_server 192.168.200.200 1358
  
      real_server 192.168.200.2 1358 {
          weight 1
          HTTP_GET {
              url {
                path /testurl/test.jsp
                digest 640205b7b0fc66c1ea91c463fac6334d
              }
              url {
                path /testurl2/test.jsp
                digest 640205b7b0fc66c1ea91c463fac6334d
              }
              url {
                path /testurl3/test.jsp
                digest 640205b7b0fc66c1ea91c463fac6334d
              }
              connect_timeout 3
              retry 3
              delay_before_retry 3
          }
      }
  
      real_server 192.168.200.3 1358 {
          weight 1
          HTTP_GET {
              url {
                path /testurl/test.jsp
                digest 640205b7b0fc66c1ea91c463fac6334c
              }
              url {
                path /testurl2/test.jsp
                digest 640205b7b0fc66c1ea91c463fac6334c
              }
              connect_timeout 3
              retry 3
              delay_before_retry 3
          }
      }
  }
  
  virtual_server 10.10.10.3 1358 {
      delay_loop 3
      lb_algo rr
      lb_kind NAT
      persistence_timeout 50
      protocol TCP
  
      real_server 192.168.200.4 1358 {
          weight 1
          HTTP_GET {
              url {
                path /testurl/test.jsp
                digest 640205b7b0fc66c1ea91c463fac6334d
              }
              url {
                path /testurl2/test.jsp
                digest 640205b7b0fc66c1ea91c463fac6334d
              }
              url {
                path /testurl3/test.jsp
                digest 640205b7b0fc66c1ea91c463fac6334d
              }
              connect_timeout 3
              retry 3
              delay_before_retry 3
          }
      }
  
      real_server 192.168.200.5 1358 {
          weight 1
          HTTP_GET {
              url {
                path /testurl/test.jsp
                digest 640205b7b0fc66c1ea91c463fac6334d
              }
              url {
                path /testurl2/test.jsp
                digest 640205b7b0fc66c1ea91c463fac6334d
              }
              url {
                path /testurl3/test.jsp
                digest 640205b7b0fc66c1ea91c463fac6334d
              }
              connect_timeout 3
              retry 3
              delay_before_retry 3
          }
      }
  }
  
  ```

* `authentication`、`virtual_router_id`、`virtual_ipaddress`这几个一样的机器，才算是同一个组里。这个组才会选出一个作为Master机器

##### 双机主备方案

这里我们设置两台机器，分别下载好keepalived，然后进行配置

机器一：

```shell
! Configuration File for keepalived

global_defs {
   router_id lb1 # 路由id，可以随意取，但是要保证每个配置了keepalive的机器不重复就行
}

# 节点名可以随意取，但要保证主、备节点之间保持一致即可
vrrp_instance hedaodao {
		# 当前节点为Master，一个集群只能有一个Master，其他写BACKUP
    state MASTER 
    # ip addr查看下网卡名，替换ens33
    interface ens33 
    # 保证主、备节点之间保持一致即可
    virtual_router_id 51
    # 当前节点竞争成为Master的优先级
    priority 100 
    # 主、备节点之间同步检查的时间间隔（单位秒）
    advert_int 1 
    # 认证授权的密码，主、备节点之间秘密保持一致才能一起工作
    authentication {
        auth_type PASS # 指定了认证类型为密码（PASS）
        auth_pass 1111 # 设置了认证密码，这里设置的密码是"1111"
    }
    # 虚拟IP（VIP）
    virtual_ipaddress {
        192.168.200.16
    }
}
```

机器二：

```shell
! Configuration File for keepalived

global_defs {
   router_id lb2 
}

vrrp_instance hedaodao {
    state BACKUP 
    interface ens33 
    virtual_router_id 51
    priority 50
    advert_int 1 
    authentication {
        auth_type PASS
        auth_pass 1111
    }
    virtual_ipaddress {
        192.168.200.16 #虚拟IP
    }
}
```

启动keepalived

```shell
# 启动
keepalived

# 判断是否成功启动
ps aux | grep keepalived 
```

机器一：对比启动前、启动后，发现ens160网卡，多了一个ip地址，这个就是VIP （ip addr命令）

![image-20240218141544435](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/202402181415446d9wut.png)

![image-20240218141722616](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/202402181417228vD1CP.png)

关闭机器一的keepalived，就会发现VIP切换到机器二了

```shell
kill -9 进程号 # ps aux|grep keepalived 即可获取进程号

# 如果注册为系统服务了
systemctl stop keepalived.service
```

##### 双主热备方案

上面的配置，如果不出现故障的情况下，一直是机器一在工作，机器二白白浪费了

可以使用**双主热备**方案：

![image-20240224222229833](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20240224222230yxTalI.png)

**DNS负载**

在腾讯云购买域名后，可以在**记录管理**中配置该域名解析到多个IP。这里需要解析到两个虚拟IP(需要是公网IP)

![image-20240224223051243](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/202402242230518zQeIn.png)

补充：

* 表格字段含义

  ```
  主机记录（Host Record）： 主机记录是指要解析的域名的一部分，通常是域名的前缀部分，例如www、mail等
  
  记录类型（Record Type）： 记录类型指定了DNS记录的类型，用于指定DNS记录的用途和含义。常见的DNS记录类型包括：	
  	A记录：将域名解析为IPv4地址
  	AAAA记录：将域名解析为IPv6地址
  	CNAME记录：将域名指向另一个域名（别名记录）
  	MX记录：指定邮件交换服务器的地址
  	TXT记录：存储文本信息等
  	
  记录值（Record Value）： 记录值是与主机记录关联的数据，具体取决于记录类型。例如，如果是A记录，则记录值是一个IPv4地址；如果是CNAME记录，则记录值是另一个域名
  ```

* 例子

  虽然主机记录可以自定义，但是一般情况下，还是网址用www、邮箱用mail

  ```
  主机记录：www
  记录类型：A
  记录值：192.0.2.1
  
  用户访问www.example.com时，DNS服务器将返回IPv4地址192.0.2.1给用户
  
  
  主机记录：site
  记录类型：A
  记录值：192.0.2.1
  
  用户访问site.example.com时，DNS服务器将返回IPv4地址192.0.2.1给用户
  ```

  

在**负载均衡**中可以设置请求该域名后，按什么比例分配请求。下图中是**均等负载**，可以在**修改**中调整

![image-20240224222625793](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20240224222625bpzqQX.png)

**Nginx配置**

其实就是机器一有两个配置，机器二有两个配置，互相组成两个VIP

机器一：

```shell
! Configuration File for keepalived

global_defs {
   router_id lb2 
}

# 虚拟IP：192.168.200.161
vrrp_instance hedaodao-1 {
    state MASTER 
    interface ens33 
    virtual_router_id 51
    priority 50
    advert_int 1 
    authentication {
        auth_type PASS
        auth_pass 1111
    }
    virtual_ipaddress {
        192.168.200.161 #虚拟IP
    }
}


# 虚拟IP：192.168.200.162
vrrp_instance hedaodao-2 {
    state BACKUP 
    interface ens33 
    virtual_router_id 52
    priority 50
    advert_int 1 
    authentication {
        auth_type PASS
        auth_pass 1111
    }
    virtual_ipaddress {
        192.168.200.162 #虚拟IP
    }
}
```

机器二：

```
hedaodao-1 这个配置
state:BACKUP
virtual_router_id:51

hedaodao-2 这个配置
state:MASTER
virtual_router_id:52
```



### LVS负载均衡

#### 介绍

LVS的设置相对复杂，本章节仅仅是对其原理的了解

[官网](http://www.linuxvirtualserver.org/index.html)

LVS（Linux Virtual Server），目前已被集成到Linux内核的IPVS模块中，该模块会虚拟出一个VIP（虚拟IP）

LVS属于四层负载均衡

如果LVS的分配的每个Server功能都是一致的，这些Server就是一个集群

![image-20240218224231326](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20240218224231Ru1Xgj.png)

与Nginx的区别

* LVS是属于四层负载均衡，只基于IP+端口做负载均衡。而Nginx还要做应用层的解析，相比之下LVS的并发性能更高（Nginx属于七层负载均衡）

* 流量非常大的时候，单台Nginx可能会承受不了压力。可以使用性能更高的LVS分配请求到Nginx集群

* Nginx接收请求来回，LVS可以只接收不响应，性能更高。如下图

  ![image-20240218225018030](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20240218225018YXeQEa.png)

* LVS会生成一个VIP，用户请求这个VIP，LVS会分配给集群中的机器处理

#### 三种模式

**NAT模式（网络地址转换）**

并发性能比后两种差

![image-20240218230320439](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20240218230320ZJxZM4.png)

**TUN模式（隧道模式）**

每个Server必须有网卡，可以直接将请求结果，直接返回给用户

缺点是Server会暴露在公网中，DR模式解决了这个问题

![image-20240218225918879](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20240218225919PLMZRf.png)

**DR模式**（最佳模式）

Router持有一个VIP，分发响应内容

![image-20240218230141389](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20240218230141FPCt7x.png)



```shell
systemctl stop NetworkManager
systemctl disable NetworkManager

# LVS配置
cd /etc/sysconfig/network-scripts/
cp ifcfg-ens33 ifcfg-ens33:1
vim ifcfg-ens33:1 
# 修改为静态IP
# DEVICE=ens33:1 //配置文件名保持一致
# IPADDR
# NETMASK
# NETWORK
service network restart 
yum install ipvsadm
ipvsadm -Ln

# Nginx 171 （手动增加VIP）
cd /etc/sysconfig/network-scripts/
cp ifcfg-lo ifcfg-lo:1
vim ifcfg-lo:1 
# DEVICE=lo:1  # 配置文件名保持一致
# IPADDR=192.168.1.150 # VIP
# NETMASK=255.255.255.255
# NETWORK=127.0.0.0
service network restart # ip addr，lo下面会多一个 inet 192.168.1.150
yum install ipvsadm
ipvsadm -Ln

# Nginx 172 （手动增加VIP） 
# 与 171 流程一致
```

#### LVS高可用方案

在DR模式的基础上实现高可用，与Nginx一样也是采用keepalived实现

![image-20240225002754751](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20240225002754p7aCYx.png)

### Keepalived+LVS+Nginx

![image-20240225004546741](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20240225004547NXBRPM.png)

## Nginx缓存

![image-20240214202651085](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20240214202651lkKRhi.png)

### Nginx指定浏览器缓存（强缓存）

```shell
http{
	server{
	 	 listen       80;
     server_name  localhost;
		 location /img{
           alias /home/images/;
          
           # 单位s m h d
           expires off; # 默认值，关闭缓存，即Nginx不返回Cache-Control。浏览器会使用协商缓存机制（其他expires的值都会让响应头返回Cache-Control字段，属于强缓存通知浏览器缓存方式）
           
           expires 20s;  # 失效时间，这里是前端缓存20s后失效 。浏览器截图如下
           
           expires @22h30m # 指定时间失效，这里是22点30分失效
           
           
           expires epoch; # 将响应的过期时间设置为 UNIX 时间戳的起始时间，这个配置通常用于确保浏览器不缓存特定的资源，以便及时获取更新的内容
           
           expires max; # 返回的max-age字段，设置为一个极大的值
     }
	}
}
```

![image-20240214211425750](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20240214211425rAkUdE.png)

关于强缓存的问题：强缓存只根据有效时间来判断是否重新请求数据，可能会导致客户端数据更新不及时（静态资源在有效期内被更新，前端不会重新请求）

打包工具每次buid都会给css、js文件名加一个哈希值，如果文件内容变化了，强缓存就会失效

但是对于html文件，文件名一直为index.html

解决方案：[前端静态资源更新不及时的解决方案](https://zhuanlan.zhihu.com/p/372497796?utm_id=0)

```shell
location ~ \.(html)$ {  
    add_header Cache-Control no-cache;  # 协商缓存 no-cache  |   不缓存 no-store
}
```



### 上游服务缓存到Nginx（协商缓存）

Nginx作为中间人，浏览器通过Nginx与业务服务器协商，Nginx会缓存协商结果

```shell
http{
	# 设置缓存目录
	# keys_zone `内存`区域名称、大小，用于存储缓存键值对的元数据信息（名mycache，大小5m）
	# max_size  `磁盘`存储空间，如果超过，Nginx会按照LRU（最近最少使用）策略淘汰一些旧的缓存数据
	# inactive   超过inactive指定时间内，资源没有被访问，则自动清理缓存
	# use_temp_path off关闭临时目录
	proxy_cache_path /usr/local/nginx/upstream_cache keys_zone=mycache:5m max_size=1g inactive=30s use_temp_path=off;
	
	server{
		# 在server中指定使用缓存名
		proxy_cache mycache
		# 上游服务器，返回状态码200、304（协商缓存），8小时内如果有相同的请求，Nginx就直接返回缓存的响应内容，而不会向后端服务器发起请求
		proxy_cache_valid 200 304 8h
	}
}
```



### 补充

强缓存是服务端通过设置失效时间，强行控制浏览器缓存。一旦资源变化，不能即使更新

协商缓存是客户端发起资源请求，服务端对比上次资源的Etag、Last-modified，如果发生改变就返回最新的资源；如果未改变返回304，浏览器会直接采用本地缓存

## JMeter性能测试

### 下载启动

* 下载地址：https://jmeter.apache.org/download_jmeter.cgi

  ![image-20240214134703225](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20240214134703BbN6CV.png)

* 解压后，点击运行bin/jemeter可执行文件

  ![image-20240214135022678](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20240214135022rkWCfV.png)

* 语言修改为中文

  ![image-20240214140052062](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20240214140052EvfrDr.png)

### 测试计划

  修改测试计划名，command+s保存

![image-20240214135308688](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20240214135308GWTVau.png)

  新建线程组，并设置50个线程，每个线程循环100次任务

![image-20240214140207799](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20240214140207pzlU9v.png)

![image-20240214142529854](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/202402141425300KSPK3.png)

给线程组添加HTTP请求的任务

![image-20240214142446282](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20240214142446sy91s3.png)![image-20240214142921384](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20240214142921WGRaW9.png)

给测试计划增加监听

![image-20240214143229268](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20240214143229DpRy7g.png)

## 动静分离

* 静 ：前端项目（静态资源）
* 动：接口服务

例子：

域名A.com访问到A项目、B.com访问到B项目

Api.com访问接口服务

将3个域名都解析到Nginx所在机器

```shell
# 前端
server {
        listen       80;
        server_name  A.com;
        
        location ~ {  
        		root /websit/xxx; # A项目目录
            index  index.html index.htm;
        }

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
}
server {
        listen       80;
        server_name  B.com;
        
        location ~ {  
        		root /websit/xxx; # B项目目录
            index  index.html index.htm;
        }

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
}

# 接口
server {
        listen       80;
        server_name  Api.com;
				
				# 接口
				location  {
        		proxy_pass http://接口机器的IP:端口;
        }

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
}
```

使用正则

```
location ~*/(js|css|img){
	root html;
  index  index.html index.htm;
}
```

## URL重写

rewrite需要写正则比较复杂，所以目前使用return的比较多

### return

把Http重定向为Https

```shell
server {
        listen       80;
        server_name  www.hedaodao.com;
				
				location / { 
						return 302 https://www.hedaodao.com$request_uri 
						# 302是状态码
						# $request_uri是路径和参数 ，例如：/xxx/xx?xx=xx
        }
}
```

### rewrite

```shell
rewrite是URL重写的关键指令，根据regex（正则表达式）部分内容，重定向到replacement，结尼是flag标记。

rewrite    <regex>   <replacement>  [flag];
关键字				正则				替代内容     flagt标记

正则：per1森容正则表达式语句进行规则匹配
替代内容：将正则匹配的内容替换成replacement

flag标记说明：
last  #本条规则匹配完成后，继续向下匹配新的1ocation URI规则
break #本条规则匹配完成即终止，不再匹配后面的任何规则

redirect #返回302临重定向，游览器地址会显示跳转后的URL地址
permanent #返回301永久重定向，测览器地址栏会显示跳转后的URL地址
```

把Http重定向为Https

```shell
server {
        listen       80;
        server_name  www.hedaodao.com;
				
				location / { 
						rewrite ^/(.*) https://www.hedaodao.com/$1 redirect;
						# 匹配到uri的/后的内容，并放到$1中，执行重定向
        		proxy_pass http://xxx;
        }
}
```

## 防盗链

当我们请求到一个页面后，这个页面一般会再去请求其中的静态资源，这时候请求头中，会有一个refer字段，表示当前这个请求的来源，我们可以限制指定来源的请求才返回，否则就不返回，这样可以节省资源

![image-20220503162830153](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Nginx/image-20220503162830153.png)

```shell
valid_referers none|server_name
```

设置有效的refer值

* none：不校验refer
* server_name：校验refer地址是否为server_name（server_name可以使用通配符）

注意：` if ($invalid_referer)`中if后有个空格，不写就会报错

```shell
nginx: [emerg] unknown directive "if($invalid_referer)" in /usr/local/nginx/conf/nginx.conf:27
```

例子：这里设置nginx服务器中的img目录下的图片必须refer为http:192.168.174/133才能访问

```shell
server {
        listen       80;
        server_name  localhost;
			
      
				location /img{
                valid_referers *.xxx.com;
                if ($invalid_referer){#无效的
                        return 403;#返回状态码403
                }
                root html;
                index  index.html index.htm;
        }

}
```

如果引用这张图片的页面且refer并没有被设置，图片无法加载出来

如果直接访问图片地址，因为没有refer字段指向来源，会直接显示Nginx的页面

![image-20220503153401325](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Nginx/image-20220503153401325.png)

**设置盗链图片**

将提示图片放在html/img/x.png，访问设置防盗链图片时，就返回这x.png张图

```
location /img{
                valid_referers http:192.168.174/133;
                if ($invalid_referer){#无效的
                     rewrite ^/  /img/x.png break;
                }
                root html;
                index  index.html index.htm;
}
```

## 目录浏览

类似https://mirrors.aliyun.com/centos/?spm=a2c6h.13651104.d-2001.7.168c320cQeQxjL的功能

![image-20240225021014783](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20240225021014lVmOIX.png)

```shell
http{ 		
 		server {
        listen       80;
        server_name  www.hedaodao.com
        
        
        # ！！！注意：root目录下不能有index.html文件，否则不生效
        autoindex on # 开启模块浏览(只能在root目录下浏览)
        autoindex_exact_size off # 显示文件大小时，是否带单位（默认并不带，off带单位）

        location / { 
            root /web
        } 
		}
}
```



## HTTP认证

在线工具：https://tools.wujingquan.com/htpasswd/

![image-20240225013947308](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20240225013947khBlX6.png)

通过在线工具生成一个字符串

新建文件htpasswd，内容为这个字符串

```shell
http{ 		
 		server {
        listen       80;
        server_name  www.hedaodao.com

        location / { 
            root   html/test; 
            index  index.html index.htm;
            # 浏览器Http认证弹窗，提示的内容（很多浏览器都不再显示这个字段了）
            auth_basic "xxxx"
            # 开启Http认证（路径为新建的那个文件）
            auth_basic_user_file /etc/nginx/htpasswd
        } 
		}
}
```

![image-20240225014143919](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20240225014144KX8uzg.png)

## 配置Https证书

### 前提

Nginx作为网关服务器，作为所有服务的入口

为Nginx配置证书，所以服务就可以都可以使用Https访问了

内部业务服务之间可以使用http即可

### 流程

购买服务器——>购买域名，并解析到这个主机——>购买证书，绑定到域名上，并且把证书文件安装到服务器，并在Nginx上配置好

这时候，这个域名就可以使用https进行访问里（`https://xxxx`），浏览器上会有一个小锁

![image-20220503191754606](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Nginx/image-20220503191754606.png)

上面的流程我比较熟悉了，就直接跳过了，这里直接写申请到证书后的Nginx配置部分

**下载证书文件**

![image-20220503192840029](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Nginx/image-20220503192840029.png)

![image-20220503192957256](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Nginx/image-20220503192957256.png)

下载后，解压压缩包，可以看到两个文件，一个是 `xxx.key`（私钥）和`xxx.pem`（证书）

**ssl模块**

ssl配置依赖于[ngx_http_ssl_module](https://nginx.org/en/docs/http/ngx_http_ssl_module.html)模块

```
# 查看是否有 --with-http_ssl_module 表示
./nginx -V
```

没有需要重新编译安装

```shell
./configure --prefix=/usr/local/nginx --with-http_ssl_module # 指定编译选项
make # 编译
make install # 安装编译结果--with-http_ssl_module
```

**配置**

将两个文件上传到Nginx目录中，记得放置的位置。

我这里直接放在nginx.conf配置文件所在的目录（`/user/local/nginx/conf`），所以写的都是相对路径

注意：ssl配置可以放在http模块（所有server都开启ssl）、server模块（当前server开启）

```shell
http{
	server {
		listen 443 ssl;
		server_name www.hedaodao.com;
	
	  # 这里是证书路径
		ss1_certificate  xxx.pem; 
		# 这里是私钥路径
		ss1_certificate_key  xxx.key  
		
		location / {
		   # xxx
		}
	}
	
	# 如果通过http访问，重定向到https
	server {
		listen 80;
		server_name localhost;
		
		location / {
		   return https://www.hedaodao.com$request_uri #$request_uri是路径+参数，例如：/xxx/xx?xx=xx
		}
	}
}
```

## 疑问

* 如何启动https，强制https

  ```
  location /	{
  	proxy_pass http://xxx
  	proxy_set_header host $http_host
  	if($scheme=http){
  		rewrite ^/(.*) http://$server_name/$1 redirect;
  	}
  }
  ```

  

* 启动http2、http3

* 支持ipv4、ipv6

* 重定向，假设公司域名`www.example.com`，子域名`*.example.com`都重定向到主域名

  ```
  # HTTP redirect
  server {
      listen      80;
      listen      [::]:80;
      server_name .example.com;
      include     nginxconfig.io/letsencrypt.conf;
  
      location / {
          return 301 https://example.com$request_uri;
      }
  }
  ```

* 设置CDN 子域名

* 要配置 Nginx 代理到 HTTPS 的目标服务，需要确保目标服务的 SSL 配置正确

* x

  ```shell
  # Settings for a TLS enabled server.
  #
  #    server {
  #        listen       443 ssl http2;
  #        listen       [::]:443 ssl http2;
  #        server_name  _;
  #        root         /usr/share/nginx/html;
  #
  #        ssl_certificate "/etc/pki/nginx/server.crt";
  #        ssl_certificate_key "/etc/pki/nginx/private/server.key";
  #        ssl_session_cache shared:SSL:1m;
  #        ssl_session_timeout  10m;
  #        ssl_ciphers PROFILE=SYSTEM;
  #        ssl_prefer_server_ciphers on;
  #
  #        # Load configuration files for the default server block.
  #        include /etc/nginx/default.d/*.conf;
  #
  #        error_page 404 /404.html;
  #        location = /404.html {
  #        }
  #
  #        error_page 500 502 503 504 /50x.html;
  #        location = /50x.html {
  #        }
  #    }
  
  }
  ```

  
