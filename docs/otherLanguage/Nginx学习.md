# Nginx学习

## 前提准备

### 虚拟机安装

注意：安装虚拟机是为了在本地虚拟化Linux环境，便于学习。对应了实际应用场景中，企业的云服务器

* 本地安装虚拟机Vmware、Virtualbox、Parallls

  我这里只找到了mac版本的[vmware-fusion](https://macwk.com/soft/vmware-fusion)，所以就使用这个版本了

* 系统CentOS 7.4

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

```shell
ip addr #查看网络
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

主机地址就是云服务器的公网地址，对应就是上面本地虚拟机ens33这个网卡的地址，与公网地址不同，这个地址是内网地址，每次重启都会动态分配，所以我们使用这个地址链接上

![image-20220501163422998](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Nginx/image-20220501163422998.png)

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

## Nginx介绍

* Nginx开源版 http://nginx.org/en/

  官方原始的Nginx版本

* Nginx plus商业版 

  开箱即用，集成了大量功能

* Open Resty https://openresty.org/cn/

  OpenResty是一个基于Nginx与 Lua 的高性能 Web 平台，其内部集成了大量精良的 Lua 库、第三方模块以及大多数的依赖项。**更适用于需要大量二次开发的场景，有极强的扩展性**

* Tengine https://tengine.taobao.org/

  由淘宝网发起的Web服务器项目。它在[Nginx](http://nginx.org/)的基础上，针对大访问量网站的需求，添加了很多高级功能和特性。Tengine的性能和稳定性已经在大型的网站如[淘宝网](http://www.taobao.com/)，[天猫商城](http://www.tmall.com/)等得到了很好的检验。相比于Open Resty，扩展性不够强，但是能够满足绝多数使用场景

## Nginx安装

* **下载Nginx包**

  [官网下载地址](http://nginx.org/en/download.html)

  ![image-20220501140833867](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Nginx/image-20220501140833867.png)

  使用FTP工具将文件上传到虚拟机中

  Termius也提供了FTP的功能，直接将下载的Nginx包拖拽到主机目录中，我这里是放到了root目录下

  ![image-20220501163732603](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Nginx/image-20220501163732603.png)

* 解压Nginx包，并安装

  ```shell
  tar -zxvf  nginx-1.21.6.tar.gz #解压到当前目录
  
  cd nginx-1.21.6 #进入解压后的文件夹
  ls #文件夹中的文件：auto     CHANGES.ru  configure  html     man     src CHANGES  conf        contrib    LICENSE  README
  ```

  安装依赖库

  ```shell
  #安装C编译器
  yum install -y gcc
  
  #安装pcre库
  yum install -y pcre pcre-devel
  
  #安装zlib
  yum install -y zlib zlib-devel
  ```

  安装

  ```shell
  ./configure --prefix=/usr/local/nginx #使用prefix选项指定安装的目录
  make
  make install
  ```

  启动

  ```shell
  cd /usr/local/nginx/sbin
  
  ls # 里面是一个nginx的可执行文件
  
  ./nginx # 启动这个可执行
  ```

  关闭防火墙

  ```shell
  systemctl stop firewalld
  ```

  **补充Nginx命令**

  ```shell
  ./nginx -s stop #快速停止
  ./nginx -s quit #完成已接受的请求后，停止
  ./nginx -s reload #重新加载配置
  ./nginx -t #检查nginx配置是否正确
  ```

  查看nginx状态

  ```
  ps -ef|grep nginx
  ```

  启动时：

  ![image-20220501205303265](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Nginx/image-20220501205303265.png)

  停止时：

  ![image-20220501205333304](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Nginx/image-20220501205333304.png)

* 注册系统服务

  通过系统服务的方式启动nginx

  ```
  vim usr/lib/systemd/system/nginx.service
  ```

  ```shell
  [Unit] 
  Description=nginx
  After=network.target remote-fs.target nss-lookup.target
  
  [Service]
  Type=forking
  PIDFile=/usr/local/nginx/logs/nginx.pid
  ExecStartPre=/usr/local/nginx/sbin/nginx -t -c /usr/local/nginx/conf/nginx.conf
  ExecStart=/usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf
  ExecReload=/usr/local/nginx/sbin/nginx -s reload
  ExecStop=/usr/local/nginx/sbin/nginx -s stop
  ExecQuit=/usr/local/nginx/sbin/nginx -s quit 
  PrivateTmp=true
     
  [Install]   
  WantedBy=multi-user.target  # 多用户
  ```

## Nginx代理

**正向代理**

正向代理可以理解为「客户端」的代理

![image-20220919121907145](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Nginx/20220919121907%20.png)

**反向代理**

反向代理可以理解为「服务器」的代理

![image-20220919122008649](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Nginx/20220919122008%20.png)

## Nginx 目录

Nginx一般安装在`/usr/local/nginx`目录下（安装时--prefix可指定安装目录）

![image-20220919122708336](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Nginx/20220919122708%20.png)

```text
conf #配置文件
	｜-nginx.conf # 主配置文件
	｜-其他配置文件 # 可通过那个include关键字，引入到了nginx.conf生效
	
html #静态页面

logs
	｜-access.log #访问日志(每次访问都会记录)
	｜-error.log #错误日志
	｜-nginx.pid #进程号
	
sbin
	｜-nginx #主进程文件
	
*_temp #运行时，生成临时文件
```

![image-20220502111337135](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Linux/image-20220502111337135.png)

## Nginx配置

后面学习Nginx配置，每次修改配置文件，一定要重载才能生效

```
systemctl reload nginx
```

### 简化版的nginx.conf

```shell
worker_processes  1; # 启动的worker进程数

events {
    worker_connections  1024; #每个worker进程的连接数
}


http {
    include       mime.types; #include是引入关键字，这里引入了mime.types这个配置文件（同在conf目录下，mime.types是用来定义，请求返回的content-type）
    default_type  application/octet-stream; #mime.types未定义的，使用默认格式application/octet-stream

    sendfile        on; #详情，见下文
    keepalive_timeout  65; #长链接超时时间
	
		#一个nginx可以启用多个server（虚拟服务器）
    server {
        listen       80;#监听端口80
        server_name  localhost;  #接收的域名

        location / { 
            root   html; #根目录指向html目录
            index  index.html index.htm; #域名/index 指向 index.html index.htm文件
        }

        error_page   500 502 503 504  /50x.html; # 服务器错误码为500 502 503 504，转到"域名/50x.html"
        location = /50x.html {# 指定到html文件夹下找/50x.htm
            root   html;
        }

    }
}
```

**sendfile**

打开sendfile，用户请求的数据不用再加载到nginx的内存中，而是直接发送

![image-20220502113913235](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Nginx/image-20220502113913235.png)

### Nginx配置使用场景

修改nginx配置文件后，记得重新加载nginx

```
systemctl reload nginx
```

**不同二级域名，映射到不同静态网页**

可以写多个server字段，从前向后匹配，先匹配到哪个就用哪个

用户访问`pro.hedaodao.ltd`，就会走到第一个server配置；`test.hedaodao.ltd`走到第二个配置

```shell
 http {
 		#....其他属性
 		server {
        listen       80;
        server_name  pro.hedaodao.ltd;

        location / { 
            root   html/pro; 
            index  index.html index.htm;
        }

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
		}

 		server {
        listen       80;
        server_name  test.hedaodao.ltd;

        location / { 
            root   html/test; 
            index  index.html index.htm;
        }

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
		}
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

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
		}
}
```

## 反向代理与负载均衡

**反向代理**：这种代理方式叫做，隧道代理。有性能瓶颈，因为所有的数据都经过Nginx，所以Nginx服务器的性能至关重要

![image-20220502173846436](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Nginx/image-20220502173846436.png)

**负载均衡**：把请求，按照一定算法规则，分配给多台业务服务器（即使其中一个坏了/维护升级，还有其他服务器可以继续提供服务）

![image-20220502174023144](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Nginx/image-20220502174023144.png)

### 反向代理+负载均衡

**nginx.conf配置文件**

启用proxy_pass，root和index字段就会失效

proxy_pass后的地址必须写完整 `http://xxx `，不支持https

当访问localhost时（Nginx服务器），网页打开的是`http://xxx`（应用服务器），网页地址栏写的还是localhost

```shell
http{ 		
 		server {
        listen       80;
        server_name  localhost;

        location / { 
        		proxy_pass http://xxx;
            #root   html/test; 
            #index  index.html index.htm;
        }

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
		}
}
```

**定义地址别名 **

使用upstream定义一组地址【在server字段下】

访问localhost，访问都会代理到`192.168.174.133:80`和`192.168.174.134:80`这两个地址之一，每次访问这两个地址轮着切换（后面讲到，因为默认权重相等）

```shell
http{
	upstream httpds{
		server 192.168.174.133:80; #如果是80端口，可以省略不写
		server 192.168.174.134:80;
	}
	server {
        listen       80;
        server_name  localhost;

        location / { 
        		proxy_pass http://httpds;
        }

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
		}
}
```

**设置权重**

访问使用哪个地址的权重

```
upstream httpds{
		server 192.168.174.133:80 weight=10;
		server 192.168.174.134:80 weight=80;
}
```

**关闭**

```
upstream httpds{
		server 192.168.174.133:80 weight=10 down;
		server 192.168.174.134:80 weight=80;
}
```

**备用机**

如果`192.168.174.133:80`出现故障，无法提供服务，就用使用backup的这个机器

```
upstream httpds{
		server 192.168.174.133:80 weight=10;
		server 192.168.174.134:80 weight=80 backup;
}
```

### 动静分离

当用户请求时，动态请求分配到Tomcat业务服务器，静态资源请求放在Nginx服务器中

例子：

* 如果请求的资源地址是`location/`，`/`的优先级比较低，如果下面的location没匹配到，就会走http://xxx这个地址的机器

* 如果请求的资源地址是`location/css/*`，就会被匹配到nginx的html目录下的css文件夹中（我们把css静态资源放在这个位置）

```shell
server {
        listen       80;
        server_name  localhost;
				
				location / { # /的优先级比较低，如果下面的location没匹配到，就会走http://xxx这个地址的机器
        		proxy_pass http://xxx;
        }
        
        location /css {  # root指的是html，location/css指的是root下的css，所以地址就是html/css
        		root html;
            index  index.html index.htm;
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

### URL重写

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

浏览器地址栏访问 `xxx/123.html`实际上是访问`xxx/index.jsp?pageNum=123`

```shell
server {
        listen       80;
        server_name  localhost;
				
				location / { 
						rewrite ^/([0-9]+).html$ /index.jsp?pageNum=$1  break;
        		proxy_pass http://xxx;
        }
      

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
}
```

### 网关服务器

![image-20220503121135171](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Nginx/image-20220503121135171.png)

上图中，应用服务器，不能直接被外网访问到，只能通过Nginx服务器进行访问（使用proxy_pass），这时候这台Nginx服务器就成为了网关服务器（承担入口的功能）



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

## 防盗链

当我们请求到一个页面后，这个页面一般会再去请求其中的静态资源，这时候请求头中，会有一个refer字段，表示当前这个请求的来源，我们可以限制指定来源的请求才返回，否则就不返回，这样可以节省资源

![image-20220503162830153](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Nginx/image-20220503162830153.png)

```shell
valid_referers none|server_name
```

设置有效的refer值

* none：检测地址没有refer，则有效
* server_name：检测主机地址，refer显示是从这个地址来的，则有效（server_name必须是完整的`http://xxxx`）

注意：` if ($invalid_referer)`中if后有个空格，不写就会报错

```shell
nginx: [emerg] unknown directive "if($invalid_referer)" in /usr/local/nginx/conf/nginx.conf:27
```

例子：这里设置nginx服务器中的img目录下的图片必须refer为http:192.168.174/133才能访问

```shell
server {
        listen       80;
        server_name  localhost;
				
				location / { 
        		proxy_pass http://xxx;
        }
      
				location /img{
                valid_referers http:192.168.174/133;
                if ($invalid_referer){#无效的
                        return 403;#返回状态码403
                }
                root html;
                index  index.html index.htm;
        }
        
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
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

## 高可用场景

![image-20220503174125433](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Nginx/image-20220503174125433.png)

用户访问时，访问的是一个虚拟IP，keepalived会选定一个主服务器使用这个虚拟IP

每台机器上的keepalived会相互通信，根据其他机器上的keepalived进程是否存在，判断服务器状态，如果默认的Master停止了，就会在剩下的Backup机器中，竞选出一台Nginx服务器作为Master

**安装keepalived**

```
yum install -y keepalived
```

**修改keepalived配置**

* 配置文件在/etc/keepalived/keepalived.conf
* `vrrp_instance`、`authentication`、`virtual_router_id`、`virtual_ipaddress`这几个一样的机器，才算是同一个组里。这个组才会选出一个作为Master机器

这里我们设置两台机器，分别下载好keepalived，然后进行配置

机器一：

```shell
! Configuration File for keepalived

global_defs {
   router_id lb1 # 名字与其他配置了keepalive的机器不重复就行
}

vrrp_instance heyingjie {#vrrp实例名可以随意取
    state MASTER #只能有一个默认的Master，其他写BACKUP
    interface ens33 # ip addr查看下网卡名，默认时ens33
    virtual_router_id 51
    priority 100 # 多台安装了keepalived的机器竞争成为Master的优先级
    advert_int 1 #通信时间
    authentication {
        auth_type PASS
        auth_pass 1111
    }
    virtual_ipaddress {
        192.168.200.16 #虚拟IP
    }
}
```

机器二：

```shell
! Configuration File for keepalived

global_defs {
   router_id lb2 
}

vrrp_instance heyingjie {
    state BACKUP #只能有一个默认的Master，其他写BACKUP
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

通过命令`ip addr`查看机器一的ip信息，可以看到虚拟IP

![image-20220503175414858](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Nginx/image-20220503175414858.png)

## 配置证书

购买服务器——>购买域名，并解析到这个主机——>购买证书，绑定到域名上，并且把证书文件安装到服务器，并在Nginx上配置好

这时候，这个域名就可以使用https进行访问里（`https://xxxx`），浏览器上会有一个小锁

![image-20220503191754606](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Nginx/image-20220503191754606.png)

上面的流程我比较熟悉了，就直接跳过了，这里直接写申请到证书后的Nginx配置部分

**下载证书文件**

![image-20220503192840029](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Nginx/image-20220503192840029.png)

![image-20220503192957256](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Nginx/image-20220503192957256.png)

下载后，解压压缩包，可以看到两个文件，一个是 `xxx.key`（私钥）和`xxx.pem`（证书）

**配置**

将两个文件上传到Nginx目录中，记得放置的位置。我这里直接放在nginx.conf配置文件所在的目录（`/user/local/nginx/conf`），所以写的都是相对路径

```shell
server {
	listen 443 ss1;
	
	ss1 certificate  xxx.pem; #这里是证书路径
	ss1_ certificate_key  xxx.key  #这里是私钥路径
}
```

