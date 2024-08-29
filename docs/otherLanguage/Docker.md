# Docker

## 学习资源

### 官方文档

[docker 中文文档](http://www.dockerinfo.net/dockerfile%e4%bb%8b%e7%bb%8d)

docker的镜像仓库 [docker hub](https://hub.docker.com/) 

docker所有文档 [docker doc](https://docs.docker.com/)：

* docker 的命令行文档  [Command-line reference](https://docs.docker.com/engine/reference/run/)
* docker 的dockerfile文件文档 [Dockerfile reference](https://docs.docker.com/engine/reference/builder/#run)
* docker数据的管理文档 [docker storage](https://docs.docker.com/storage/)
* docker网络文档 [docker network](https://docs.docker.com/engine/reference/commandline/network/)
* docker compose文档 [docker compose](https://docs.docker.com/compose/)

### 第三方中文文档

[Docker简明教程——中文版](https://www.simapple.com/docker-tutorial)

[菜鸟教程](https://www.runoob.com/docker/docker-tutorial.html)

[菜鸟教程——Docker命令大全](https://www.runoob.com/docker/docker-command-manual.html)

### 在线平台

[play-with-docker](https://labs.play-with-docker.com/)：是由Docker公司赞助，免费提供在线的Docker操作平台，非常适合新手学习Docker使用

## Docker简介

![image-20220202133143406](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Docker/image-20220202133143406%20.png)

Docker 是一个应用打包、分发、部署的工具，也可以把它理解为一个轻量的虚拟机，它只虚拟你软件需要的运行环境，多余的一点都不要，而普通虚拟机则是一个完整而庞大的系统，包含各种可能并不需要的软件

* **打包**：就是把你软件运行所需的依赖、第三方库、软件打包到一起，变成一个安装包
* **分发**：你可以把你打包好的“安装包”上传到一个镜像仓库，其他人可以非常方便的获取和安装
* **部署**：拿着“安装包”就可以一个命令运行起来你的应用，自动模拟出一摸一样的运行环境，不管是在 Windows/Mac/Linux

Docker版本：

* 社区版 docker-ce

  由社区维护和提供技术支持，为免费版本，适合个人开发人员和小团队使用。**本文章以下内容使用的社区版本**

* 企业版 docker-EE 

  收费版本，由售后团队和技术团队提供技术支持，专为企业开发和 IT 团队而设计，相比 Docker-CE，增加一些额外功能，更重要的是提供了更安全的保障

  

## 安装配置Docker

步骤分为两个部分

* 安装到机器

* 配置镜像源

  Docker的默认官方远程仓库是hub.docker.com，由于网络原因，下载一个Docker官方镜像可能会需要很长的时间，甚至下载失败，所以我们需要配置镜像源。配置镜像源后，下载官方仓库（hub.docker.com）里的镜像时，才能更快的下载

  | 镜像加速器          | 镜像加速器地址                                               |
  | ------------------- | ------------------------------------------------------------ |
  | Docker 中国官方镜像 | https://registry.docker-cn.com                               |
  | DaoCloud 镜像站     | http://f1361db2.m.daocloud.io                                |
  | Azure 中国镜像      | https://dockerhub.azk8s.cn                                   |
  | 科大镜像站          | https://docker.mirrors.ustc.edu.cn                           |
  | 阿里云              | https://<your_code>.mirror.aliyuncs.com  【具体参见 `云服务器使用Docker`部分】 |
  | 七牛云              | https://reg-mirror.qiniu.com                                 |
  | 网易云              | https://hub-mirror.c.163.com                                 |
  | 腾讯云              | https://mirror.ccs.tencentyun.com                            |

  

**注意**：

在Win/Mac上可以安装桌面版Docker，提供可视化界面，操作更为简单

在Linux系统上安装则需要使用命令



### Mac

**安装**

* 官网下载 https://www.docker.com/products/docker-desktop

* 安装到Mac

  ![image-20220130162454070](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Docker/image-20220130162454070%20.png)

  

  输入密码，接受协议

  ![image-20220131152745466](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Docker/image-20220131152745466%20.png)

  

  安装成功，Docker桌面版主界面

  ![image-20220130163730997](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Docker/image-20220130163730997%20.png)

**配置镜像源**

![image-20220130171834257](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Docker/image-20220130171834257%20.png)

![image-20220130173300966](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Docker/image-20220130173300966%20.png)

### Linux

推荐一种方式

**方式一**

下载脚本，自动安装Docker

```shell
curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun
```



**方式二**

使用yum下载

```shell
yum install docker-ce docker-ce-cli containerd.io
```

* **docker-ce**：Docker守护进程，负责所有的容器管理工作，在 Linux 上依赖另外两个完成工作

* **docker-ce-cli** ：用于控制Docker守护进程的 CLI 工具（可以通过CLI工具控制远程 Docker 守护进程）

* **containerd.io** ： 守护进程与操作系统之间的接口层，本质上将Docker与操作系统分离

  > containerd 可用作 Linux 和 Windows 的守护程序。 它管理其主机系统的完整容器生命周期，从图像传输和存储到容器执行和监督，再到低级存储到网络附件等等

启动docker守护进程

```shell
systemctl start docker
```

查看docker进程状态

```shell
systemctl start docker
```

卸载docker

```shell
yum remove docker-ce #卸载

rm -rf /var/lib/docker #删除镜像、容器、配置文件等内容
```



## Docker镜像

* 镜像类似于软件的安装包

* 容器中运行着某一个镜像，容器之间彼此独立互不影响

  ```shell
  # 新建容器，其中运行指定镜像
  docker run [OPTIONS] IMAGE [COMMAND] [ARG...]
  ```

### 官方镜像仓库

docker hub是官方提供的镜像仓库，直接在[docker hub 官网](https://hub.docker.com/)搜索想要安装在docker中的软件，根据搜索结果的指示进行安装

![image-20220130173924166](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Docker/image-20220130173924166%20.png)

以安装redis为例子，进入该镜像的描述页，有详细的使用方法

![image-20220130175308904](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Docker/image-20220130175308904%20.png)



**查找镜像**

在Docker hub中查找

```shell
docker search redis

# 字段含义
# NAME: 镜像仓库源的名称
# DESCRIPTION: 镜像的描述
# stars: 点赞数
# OFFICIAL: 是否 docker 官方发布
# AUTOMATED: 自动构建
```

![image-20220917205844794](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Docker/20220917205845%20.png)

**下载镜像**

```shell
docker pull redis 

# 不指定镜像的版本号，默认下载latest，即最新版本
```

![image-20220917210349448](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Docker/20220917210349%20.png)

**查看本地已下载镜像列表**

```shell
docker images
```

![image-20220917210539975](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Docker/20220917210540%20.png)

**删除本地镜像**

```shell
docker rmi redis
```

### 构建镜像

当 docker 镜像仓库中下载的镜像不能满足需求时，可以通过以下两种方式构建自己的镜像

* 使用 Dockerfile 指令来创建一个新的镜像（docker build 是把 镜像/源码——>镜像）

- 把容器打包为镜像（docker commit 是把 容器——>镜像）

**Dockerfile构建镜像**

这里使用一个简单地Gin框架项目，来构建镜像

初始化项目

```shell
go mod init DockerBuild
```

新建文件main.go

```go
package main

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func main() {
	r := gin.Default()
	r.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"msg": "ok",
		})
	})
	r.Run(":8888")

}
```

dockerfile

```dockerfile
FROM golang

# 为镜像设置必要的环境变量(Go编译时需要)
ENV CGO_ENABLED=0 \
    GOOS=linux \
    GOARCH=amd64

# 容器内，移动到`/build`内
WORKDIR /build

# 将本地文件 复制 到容器内（第一个点是执行docker build命令所在的目录，第二个点是容器内的路径，即在/build目录下）
COPY . .

# 将代码编译成二进制可执行文件（文件名为app），这个点是容器内的/build目录下
RUN go build -o app .

# 声明服务端口
EXPOSE 8888


# 启动容器时运行的命令（点是容器内路径/build目录，即运行/build/app文件）
CMD ["./app"]
```

在项目目录下执行构建镜像命令

```
docker build -t higo:v1 .
```

**注意**：` .` 是指上下文路径，指定当前目录为上下文路径，`docker build` 命令会将该目录下的全部内容交给 Docker 引擎来构建镜像

所以，上下文路径下不要放无用的文件，因为会一起打包发送给 docker 引擎，如果文件过多会造成过程缓慢。

如果确实上下文目录下有些文件，不需要打包给docker，可以在上下文目录下添加忽略文件`.dockerignore`



**从容器中构建镜像**

把一个正在运行的容器，构建为一个新的镜像【注意：容器必须是运行状态】

```shell
docker commit [容器名/容器id][新的镜像名:版本号]
```



### 发布到官方镜像仓库

* 在docker的镜像仓库 [docker hub](https://hub.docker.com/) ，注册用户（注册时填写 用户名+邮箱+密码，国外的东东都喜欢在命令行中使用这个用户名作为用户标识，所以记住啊）

* 创建一个镜像仓库

  官方仓库远程镜像仓库的地址：用户名/镜像仓库名

  ![image-20220201182741745](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Docker/image-20220201182741745%20.png)

  ![image-20220918022640359](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Docker/20220918022640%20.png)

* 本地登录到官方仓库

  ```shell
  docker login -u 用户名 # 之后要求输入密码
  ```

* 给待发布的镜像打标记（给镜像起个新名字+版本号，打标记会在本地重新生成以tag命名的新镜像）

  ```shell
  docker tag local-image:tag remote-repo:tag
  
  # username是用户名
  # local-image:tag  是本地待发布的镜像的名字和版本号
  # remote-repo:tag  是发布到远程后的名字和版本号 
  
  ```

  **注意**：远程镜像仓库的地址，官方远程仓库地址一般为：用户名/镜像仓库名

  例如，我的远程仓库地址：hyjhyj1098/test，其中hyjhyj1098是用户名，test是仓库名，所以我的标记为

  ```shell
  docker tag test:v1 hyjhyj1098/test:v1
  ```

  可以看到`Images`选项卡下多了一个`hyjhyj1098/test`的镜像

  ![image-20220201184423220](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Docker/image-20220201184423220%20.png)

  

* 推送到远程仓库

  ```shell
  docker push remote-repo:tag 
  ```

  可以在网站看到上传的镜像

  ![image-20220201191854211](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Docker/image-20220201191854211%20.png)

  

### 发布/拉取私有镜像仓库

上面一直使用的镜像仓库都是官方的，实际上企业一般使用内部的私有镜像仓库（类似于企业一般使用gitlab搭建的内部仓库，而不是github）

两者的基本流程是一样的

* 创建阿里云镜像仓库（如果有条件可以搭建私有仓库）

  访问阿里云容器镜像服务(https://cr.console.aliyun.com/)，在实例列表里有两个选项，分别是个人实例和企业实例，目前个人实例免费，按照流程创建命名空间（一个命名空间下，可以放多个镜像仓库）即可

  ![image-20220201193140481](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Docker/image-20220201193140481%20.png)

  

* 本地登录到阿里私有镜像仓库 

  ```shell
  docker login <镜像服务地址>
  
  #我这里的<镜像服务地址>是：registry.cn-hangzhou.aliyuncs.com
  #然后按照提示，输入用户名和密码
  ```

  ![image-20220319205503019](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Linux/image-20220319205503019%20.png)

  

* 给待发布的镜像打标记

  ```shell
  docker tag  local-image:tag  new-repo:tag
  
  # local-image:tag  是本地待发布的镜像的名字和版本号
  # new-repo:tag  是发布到远程后的名字和版本号 ，这里是：registry.cn-hangzhou.aliyuncs.com/hyj_aliyun/test1:[镜像版本号]
  ```

* 推送到阿里私有镜像仓

  ```shell
  docker push tag #上一步打的tag是：registry.cn-hangzhou.aliyuncs.com/hyj_aliyun/test1:[镜像版本号]
  ```

* 拉取私有镜像

  ```shell
  docker pull registry.cn-hangzhou.aliyuncs.com/hyj_aliyun/test1:[镜像版本号]
  ```

* 将私有镜像库的内容部署到云服务器中

  安装Docker等操作，详见上一章`云服务器使用Docker`

  ```shell
  sudo su - #切换为root用户
  
  systemctl status docker #通过systemctl命令查看docker是否在运行，看看到返回结果中有没有running，有就是在运行
  
  docker pull <tag> #下载镜像
  
  docker images # 查看下载的镜像，查看是否下载成功
  
  docker run -d --name hello-world-container -p 8080:80 <镜像名:版本号> #运行下载的镜像
  ```

* 访问

  ```text
   <云服务器公网IP>:8080 
  ```

  ![image-20220320003545182](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Docker%E7%9B%B8%E5%85%B3/image-20220320003545182%20.png)

  注意：如果访问不到，检查下，是否开启防火墙对应端口，是否云服务器安全策略组的入站安全规则是否添加了端口



## Dockerfile详解

Dockerfile文件类似于说明书，定义了构建目标镜像所需的每一个步骤。编写好Dockerfile后，调用构建镜像的命令（docker build）

```shell
docker build -t 镜像名:版本号  
```

Docker 引擎会逐一按顺序解析 Dockerfile 中的指令，并根据它们的含义执行对应的操作

### Dockerfile指令

* **FROM**

   `Dockerfile`的第一个指令一定是 `FROM` ，该指令指定基础镜像。之后的所有操作都是在该镜像运行的运行的容器中进

  ```dockerfile
  FROM <image>[:tag] #如果没有指定tag(镜像的版本号) ，默认使用最高版本
  ```

* **Label**

  给镜像添加键值对数据

  ```dockerfile
  LABEL <key1>=<value1>[ <key2>=<value2>[ <key3>=<value3>]]
  ```

  也可以写多个`LABEL`

  ```dockerfile
  # 如果`value`值中包含空格，需要替换为`\空格 `。如果指令没有写完想要换行写，加`\`即可
  LABEL multi.label1="value1" multi.label2="value2-1\ value2-2" other="value3"
  LABEL multi.label1="value1" \
        multi.label2="value2" \
        other="value3"
  ```

  以下命令查看

  ```shell
  docker image inspect --format='' <镜像名/id>
  ```

  注意：父镜像的标签会被继承，但是如果有子镜像有相同的标签，会覆盖父镜像

* **ENV**

  创建环境变量，后续的Dockerfile指令可以通过$key使用前面设置的环境变量【如果value中需要有空格，需要使用` \空格`转译】

  ```shell
  ENV <key1>=<value1> <key2>=<value2>
  #或者 
  ENV <key><value>  #单个键值对，可省略等于号
  ```

* **WORKDIR**

  设置docker容器内部的工作路径（可以理解成，容器内通过cd命令移动到了该路径）。不设置，默认为容器的根目录

  ```dockerfile
  WORKDIR /app/data #容器内当前路径是/app/data
  ```

  可以在其中使用ENV定义的变量

  ```dockerfile
  WORKDIR $path/data  #ENV path=/my ，最终就是/my/data
  ```

* **COPY与ADD**

  将宿主机的文件复制到容器

  只有COPY和ADD两个指令的参数路径包含宿主机路径（第一个参数），其他所有指令只能操作容器内部，例如`WORKDIR`只能设置容器内部的路径，`RUN`执行shell命令也只是在容器内部执行该命令

  ```dockerfile
  COPY <src> <dest> #将本地src路径下的文件，复制到容器的dest路径下
  
  ADD <src> <dest> #和COPY功能类似，不过src可以是网络文件下载链接或者是压缩文件，ADD会去下载和解压相应文件，然后放到容器的dest路径下
  ```

  注意

  * 第一个参数`<src>`是：宿主机路径

    `<src>`必须是相对路径，是相对于`Dockerfile`文件所在的路径（不是执行`docker build`的路径），所以`.`表示宿主机的`Dockerfile`文件所在的目录

    指定`<src>`地址时，如果使用通配符，遵循Go语言的 [filepath.Match](https://golang.org/pkg/path/filepath#Match) 规则

    如果`<src>`是目录，则复制目录下的全部内容，但是目录本身没有被复制，只是它里面的内容

  * 第二个参数`<dest>`是：容器内路径

    如果使用相对路径，就是以WORKDIR为当前目录（未指定WORKDIR，则默认为容器根目录），所以`.`代表的是WORKDIR设置的路径。也可以是容器内的绝对路径

    例如：是相对路径

    ```shell
    COPY test.txt ./data   #将“test.txt”添加到<WORKDIR>/data/下
    ```

    是绝对路径

    ```shell
    COPY test.txt /app/data/  #将“test.txt”复制到容器的/app/data/下
    ```

    

* **RUN**

  在**Docker容器内**执行的命令。注意不是在宿主机执行，常用来在COPY将代码源文件从宿主机复制到Docker容器后，使用RUN安装依赖、编译源码

  有两种书写形式：

  ```dockerfile
  # shell格式
  RUN <命令行命令> 
  
  # exec 格式（双引号）
  RUN ["可执行文件", "参数1", "参数2"] 
  
  # 例如：RUN ./test.php dev offline 等价于 RUN ["./test.php", "dev", "offline"] 
  ```

  **注意**：RUN命令可以有多个，但是，指令每执行一次都会在 docker 上新建一层（Layer）。所以过多无意义的层，会造成镜像膨胀过大。例如：

  ```dockerfile
  FROM centos
  RUN install
  RUN cd /app
  RUN mkdir logs
  ```

  以上执行会创建 3 层镜像。但是，以 **&&** 符号连接命令，只会创建 1 层镜像，即以下格式：

  ```dockerfile
  FROM centos
  RUN npm install && cd /app && mkdir logs
  ```

  **注意**：`\`表示连接下一行的内容，有些时候将多个命令连接起来会是的RUN指令很长，为了有更好的可读性，一般会分为多行，用`\`分隔表示下一行与本行是同一行

  ```shell
  FROM centos
  RUN npm install \
  		&& cd /app \
  		&& mkdir logs
  ```

  

* **CMD**

  CMD 指令是容器启动后执行的shell命令，一般用作程序的入口。CMD 指令指定的程序可被 docker run 命令行参数中指定要运行的程序所覆盖

  虽然 RUN 指令也可以执行shell命令，但是CMD指令是容器启动后才执行

  两种格式：

  ```dockerfile
  CMD ["<可执行文件或命令>","<param1>","<param2>",...] 
  CMD ["<param1>","<param2>",...]  # 该写法是为 ENTRYPOINT 指令指定的程序提供默认参数
  ```
  
  推荐使用第二种格式，执行过程比较明确。第一种格式实际上在运行的过程中也会自动转换成第二种格式运行，并且默认可执行文件是 `*.sh`文件
  
  **注意**：如果 Dockerfile 中如果存在多个 CMD 指令，仅最后⌘ 指令生效。所以如果存在多条指令可以将命令写入shell脚本，使用CMD执行脚本
  
  docker run如何覆盖CMD指令?
  
  只需要在run命令后，加上其他命令，下面的例子是加了`echo 1`，这样Dockerfile中指定的CMD就不会执行，而是执行`echo 11`
  
  ```shell
  docker run --name 容器名  镜像名:版本 echo "11"
  ```
  
  
  
* **ENTRYPOINT**

  ENTRYPOINT 指令是容器启动后执行的shell命令，一般用作程序的入口

  只有exec格式：

  ```dockerfile
  ENTRYPOINT ["<executeable>","<param1>","<param2>",...]
  
  # 注意：支持多条命令 ， 例如： 两条命令用 "--" 分割。tini和houndd -conf .
  ENTRYPOINT ["tini","--","houndd","-conf","."]
  ```

  可以通过`docker run`追加参数，所以很适合启动时，可以动态传递参数的程序

  例子：

  ```dockerfile
  FROM centos
  ENTRYPOINT ["/bin/echo","this is test entrypoint"]
  ```

  运行 docker run 时，在docker run最后加参数，会被追加到 ENTRYPOINT 命令后

  ```shell
  docker run 镜像名:版本号 123 
  # 输出 this is test entrypoint 123
  ```

  与CMD结合(当 ENTRYPOINT 与 CMD  同时存在时，CMD 中的内容会作为 ENTRYPOINT 定义命令的参数，最终执行容器启动的只有 ENTRYPOINT 中给出的命令)。也可以参考下面**最佳实践**的例子

  ```dockerfile
  # dockerfile
  FROM centos
  
  CMD ["默认值"]
  ENTRYPOINT ["/bin/echo"]
  
  # docker run 镜像名:版本号 传入值
  
  # 当docker run不传入参数时，默认使用CMD作为参数
  ```

  运行 docker run 时，使用了 --entrypoint 选项，将覆盖 ENTRYPOINT 指令指定的命令

  ```shell
  docker run --entrypoint=bin/echo 镜像名:版本号 
  
  ## 输出 空行
  ```

  **最佳实践**：

  * 规则一：当 ENTRYPOINT 与 CMD 同时给出时，CMD 中的内容会作为 ENTRYPOINT 定义命令的参数，最终执行容器启动的只有 ENTRYPOINT 中给出的命令
  * 规则一：CMD会被覆盖，可以通过覆盖CMD值来实现自定参数

  示例：

  假设已通过 Dockerfile 构建了 nginx:test 镜像：

  ```dockerfile
  FROM nginx
  
  ENTRYPOINT ["nginx", "-c"] 
  CMD ["/etc/nginx/nginx.conf"] # CMD作为默认的参数
  ```

  不传参运行，使用CMD作为默认参数

  ```shell
  docker run  nginx:test
  
  # 容器内会默认运行以下命令 ：nginx -c /etc/nginx/nginx.conf
  ```

  传参运行，使用传递的参数（不使用⌘ 作为参数）

  ```shell
  docker run  nginx:test  /etc/nginx/new.conf
  
  # 容器内会默认运行以下命令 ：nginx -c /etc/nginx/new.conf
  ```

  

* **EXPOSE**

  格式

  ```dockerfile
  EXPOSE <端口1> [<端口2>...]
  ```

  EXPOSE 命令只是声明了容器应该打开的端口并没有实际上将它打开，其作用仅仅是可以让运维人员知道应该开启容器的哪些端口

  `docker run`可覆盖，`-p`选项才真正的将容器端口和宿主机端口建立映射

  ```shell
  docker run -d --name 容器名 -p 宿主机端口:容器暴露的端口号 <镜像名:版本号>
  
  # `:容器暴露的端口号` 可不写，默认为Dockerfile的EXPOSE字段。写了其他值，容器就会真正开启这个端口
  ```

  

* **VOLUME**

  格式

  ```dockerfile
  VOLUME <路径>
  
  # 或
  VOLUME ["<路径1>", "<路径2>"...]
  ```

  `docker run`可覆盖，将宿主机的目录 /data 映射到容器的 /data2

  ```
  docker run  -v /data:/data2  nginx:latest
  ```


### 优化技巧

#### 多阶段构建

使⽤多阶段构建，可以在⼀个 Dockerfile 中使⽤多个 FROM 语句。每个 FROM 指令都可以使⽤不同的基础镜像，并表示开始⼀个新的构建阶段。同时可以将⼀个阶段的⽂件复制到另外⼀个阶段，在最终的镜像中保留下需要的内容即可

* `FROM xxx AS yyy` 指定该阶段的名字为yyy
* `--from=yyy` 指定引用yyy阶段

对阶段构建的用途：

例如，Go源代码需要使用Go环境编译，但是编译后的可执行文件是可以直接运行的，不依赖Go环境。

如果不使用多阶段构建，只能通过FROM指定一个包含Go环境的镜像，而我们运行可执行文件并不需要该镜像

```dockerfile
FROM golang As go-builder

# 为我们的镜像设置必要的环境变量
ENV  CGO_ENABLED=0 \
    GOOS=linux \
    GOARCH=amd64

# 移动到工作目录：/build
WORKDIR /build

# 将代码复制到容器中
COPY . .

# 将我们的代码编译成二进制可执行文件app
RUN go mod tidy && go build -o app .

FROM alpine
COPY --from=go-builder /build .
# 声明服务端口
EXPOSE 8888

# 启动容器时运行的命令
CMD ["./app"]
```

#### 利用缓存

以一个nest服务为例子

```dockerfile
FROM node:18

WORKDIR /app

COPY package.json .

COPY *.lock .

RUN npm config set registry https://registry.npmmirror.com/

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "node", "./dist/main.js" ]
```

先复制`package.json`，安装完依赖后再复制其他文件。为什么不直接复制全部文件？如下：

```dockerfile
FROM node:18

WORKDIR /app

COPY . .

RUN npm config set registry https://registry.npmmirror.com/

RUN npm install

RUN npm run build

EXPOSE 3000

CMD [ "node", "./dist/main.js" ]
```

docker 是分层存储的，dockerfile 里的每一行指令是一层，docker引擎会做缓存。每次 docker build 的时候，只会从变化的层开始重新构建，没变的层会直接复用。

如果 package.json 没变，那么就不会执行 npm install，直接复用之前的，可以大幅节省安装依赖的时间。如果一开始就把所有文件复制进去，不管 package.json 变没变，只要任何一个文件变了，都会重新 npm install，这样没法充分利用缓存，性能不好

与**多阶段构建**结合

```dockerfile
# 构建阶段
FROM node:18 as build-stage

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

# production stage
FROM node:18 as production-stage

COPY --from=build-stage /app/dist /app
COPY --from=build-stage /app/package.json /app/package.json

WORKDIR /app

RUN npm install --production # 只安装生产依赖

EXPOSE 3000

CMD ["node", "/app/main.js"]
```



### 忽略文件

build命令用于根据dockerfile指定的任务构建镜像

```
docker build -t 镜像名:版本号 .
```

其中的参数`.`，是指该命令执行的上下文路径，整个路径下的文件都会被发送给docker引擎用于构建镜像，如果其中有大量无用内容就使得镜像构建的速度很慢



实际例子：

下面是个前端Node项目的dockerfile（放置在项目根目录下），其中先使用COPY复制整个项目，然后在docker容器内部还会再安装依赖。我们必须在复制时就排除掉node_modules

```dockerfile
FROM node:16
RUN mkdir /app
WORKDIR /app
COPY . /app 
RUN  npm install -g cnpm --registry=https://registry.npm.taobao.org&&cnpm install&&cnpm install -g nodemon  #nodemon是用来启动node项目的
EXPOSE 9091
CMD ["nodemon","app.js"] 
```

方案：在项目下新建`.dockerignore`，写入下面内容就会忽略node_modules目录，COPY指令的执行速度会大大加快

```
node_modules
```

### 其他技巧

写 Dockerfile 时经常遇到一些运行错误，依赖错误等问题，我们可以运行基础依赖，然后进入容器命令行执行构建步骤。成功后，在做过的步骤写入Dockerfile即可

例如：

```shell
docker pull node:16
docker run -it -d node:16 bash # 跑起来后进入容器终端配置依赖的软件，然后尝试跑起来自己的软件，最后把所有做过的步骤写入到 Dockerfile 就好了
```



## Docker容器

容器中运行着指定的镜像，容器之间彼此相互隔离，容器与宿主机也相互隔离

### 容器基础

**创建容器，运行镜像**

注意：docker run运行的镜如果在本地不存在，则会自动从官方镜像仓库下载

docker run作为docker的核心命令涉及到众多的选项，这里仅仅是介绍基础的选项含义，后面的【多容器通信】、【容器挂载目录】还会介绍更多选项

```shell
docker run -d --name 容器名 -p 8080:80 <镜像名:版本号>

# -p 将容器端口映射到本机端口，冒号前是本机端口，冒号后是容器端口
# --name 给容器命名，不指定就会随机生成一个名字
# -d 在后台运行容器（关闭运行该命令的shell窗口，容器也会继续运行）


# --network test 容器使用名为test的网络
# --network-alias test 给容器使用的网络设置别名test
# -v  volumeName[localAddress]:dockerAddress  这个命令是将本地目录挂载到容器内的目录（bind mount），或者创建名为volumeName的Volume，由容器管理该Volume
# --volumes-from dockerName 创建容器时，把名为dockerName的容器的所有Volume挂载到新容器（同一个volume可挂载到多个不同容器）
# --rm：容器退出时自动清理容器内部的文件系统。
```

**查看本地容器列表**

```shell
# 全部容器
docker ps

# 正在运行状态中的容器
docker ps -a
```

**更改容器状态**

```shell
# 停止容器
docker stop [容器名/容器id]
# 启动容器
docker start [容器名/容器id]


# 重启容器
docker restart [容器名/容器id]


# 暂停容器
docker pause [容器名/容器id]
# 恢复运行容器
docker unpause [容器名/容器id]
```

**容器内部操作**

```shell
# 登录容器内部
docker exec -it 容器ID或名字 /bin/bash  # 第二参数指定使用的shell（bash 、bin/bash、sh 三种shell可选，关键是看容器内安装的系统支持哪个） 登录后，执行echo $SHELL，输出当前shell名


exit # 退出容器内shell

docker logs 容器ID/名  # 查看容器内终端输出
```

遇到 `exec xxx: exec format error` ，考虑容器内的镜像是否不支持指定的shell

### 容器网络

参考：https://blog.51cto.com/u_16213614/7554657



### 多容器通信

参考：https://docker.easydoc.net/doc/81170005/cCewZWoN/U7u8rjzF

一个项目不是独立运行，可能会依赖多个软件，比如：一个web项目需要mysql数据库、redis等，这就需要多容器之间相互通信

容器之间独立，但是每个容器都可以直接访问其他容器的IP。原理如图：

![image-20220927150314301](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Docker/20220927150314%20.png)

图中的三个容器可以相互ping通是因为有Docker0存在（Docker0相当于一个路由器或者网关），三个容器是以Docker0为中介。每新建一个容器就会出现一个成对存在的网卡，新建容器如果没有指定网络那么默认会在docker0下

> Veth：可以简单理解成虚拟网卡，新容器后其总是成对出现，一端发送数据，另一端就能接收

案例：

```shell
# redis容器
docker run -d --name redis-container -p 6379:6379 -v /redisData:/data redis:latest

# mysql容器
docker run -d --name mysql-container -p 3306:3306 -v /mysqlData:/var/lib/mysql  -e MYSQL_ROOT_PASSWORD=hedaodao mysql:latest

# docker运行后端服务项目会发现 mysql、redis如果配置 host:127.0.0.1 会报错
# 这是因为 127.0.0.1 被认为是容器内的地址，肯定找不到mysql、redis
# ip addr 查看下机器IP，将服务地址换为机器IP才行
```

![image-20240714133710996](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20240714133712JolYJD.png)



**link方式**

```shell
# nginx容器
docker run -d  -p 80:80 --name my-nginx-1 nginx

# alpine容器，通过--link链接前面的nginx容器。--link的参数为 链接的容器：容器别名
docker run -d -it --name my-alpine --link my-nginx-1:other alpine

# 登录alpine容器，安装curl工具，使用curl工具访问nginx容器
docker exec -it my-alpine sh 
apk add curl
curl my-nginx-1 # 用别名也是可以的curl other
```

访问到nginx容器

![image-20220918135331837](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Docker/20220918135332%20.png)

link原理：就是在容器的host中为nginx容器的域名指定别名。所以`curl 172.17.0.2`也是可以访问到nginx容器的

```shell
# 在alpine容器中查看hosts文件
cat /etc/hosts

#172.17.0.2	other 58d78fa4462e my-nginx-1
```

**Docker-compose**

如果很多容器之间需要进行通讯，使用link的方式会很繁琐。可以使用Docker-compose

详细内容参见下一章【Docker-Compose】



**创建网络**

每个容器之间相互独立，但是往往一个项目不是独立运行，可能会依赖多个软件，比如：一个web项目需要mysql数据库、redis等，这就需要多容器之间相互通信。创建docker网络，将两个容器运行在同一个网络中(不指定网络，就默认在Docker0下)

docker容器网络文档： [docker network](https://docs.docker.com/engine/reference/commandline/network/)

* 创建网络

  ```shell
  docker network create test-net # 创建名为test-net的网络
  docker network list # 查询网络列表 ，确定是否成功创建test-net网路
  ```

* 运行redis容器，接入网`test-net`，并给网络起别名`redis`

  ```shell
  docker run -d --name redis -p 6379:6379 --network test-net --network-alias redisnet redis:latest
  ```

* 运行另一个容器，使用`--network-net`指令，接入同一个网络，如果想要访问redis，redis地址 `redisnet:6379`

  ```shell
  docker run -d --name xxx --network test-net  xxx:xxx
  ```

### 容器挂载目录

**现存问题** ：

- 使用 Docker 运行后，我们改了项目代码不会立刻生效，需要重新`build`和`run`，很是麻烦。
- 容器里面产生的数据，例如 log 文件，数据库备份文件，容器删除后就丢失了。

**解决方法**：

[文档：docker 存储](https://docs.docker.com/storage/)

* `bind mount`：将项目的实际目录挂载到容器中，当项目代码发生变动，容器内的项目也会发生同样变动。适合于本地开发项目，代码更改后，容器内也会跟随变动

* `volume`（官方推荐）：容器在宿主文件系统中创建一块区域，将数据写入该区域，并由容器管理该区域数据。删除容器，数据不会丢失，且数据可挂载到多个容器中。适合于第三方成熟镜像，安装到容器中，容器自行管理数据

* `tmpfs mount`：将数据存储在内存中

  ![image-20220131174402473](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Docker/image-20220131174402473%20.png)

**bind mount**

使用选项`-v localAddress:/app `第一个参数是项目本地根目录，第二个参数是容器根目录`/app`

```shell
# 项目目录下
docker run -p 8080:8080 --name test-hello -d  -v localAddress:/app test:v1 # localAddress替换为项目本地根目录
```

**volume**

使用选项`-v volumeName:/app `第一个参数是volume名字，第二个参数是容器根目录`/app`

**注意**

`bind mount` 和`Volume`的选项都是-v，但是第一个参数不同

**查看bind mount和volume**

![image-20220131175740173](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Docker/image-20220131175740173%20.png)

Mounts左侧是容器内路径，右侧是该容器内路径对应的本地路径（两种方式挂载目录都是在这里查看）

![image-20220131175842309](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Docker/image-20220131175842309%20.png)



## Docker-Compose

一个项目可能会依赖更多的软件，例如：一个后端服务项目，其依赖mysql、redis等容器

如果一一去配置多个容器会比较复杂，所以，我们可以使用Docker-Compose一次性把一个项目的多个依赖软件配置好

Docker-Compose[中文文档](https://www.runoob.com/docker/docker-compose.html)

### 安装

* 桌面版Docker，自带Docker-Compose

* 服务端版，需要手动安装[文档](https://docs.docker.com/compose/install/#install-compose-on-linux-systems)

  输入`docker compose`，出现以下提示，证明安装成功

  ![image-20220201115026305](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Docker/image-20220201115026305%20.png)

### 配置文件

Docker-Compose读取配置文件`docker-compose.yml`或`docker-compose.yaml`，来组织起多个容器。

[Docker-Compose指令](https://www.runoob.com/docker/docker-compose.html)

项目根目录下新建`docker-compose.yml`文件，这里对部分指令含义进行介绍

```yaml
# 一、docker-compose版本号
version: "3.7"

# 二、服务配置(每个服务都是一个容器)
services:
	#第一个服务
  myapp: # 服务名
  	container_name: app-server #容器名
  	restart: always #always：服务挂了自动重启；unless-stopped：服务挂了不重启
  	networks:  #指定网络，这里两个服务指定的网络一样，表示在一个网络下
  		- postnet
    build: . # build指定Dockerfil文件所在的目录，`.`代表Dockerfile文件在当前目录
    depends_on: myredis # 依赖，用来指定顺序，本服务依赖于myredis启动，myredis启动后myapp才启动（这里注意有一个大坑，myredi服务启动后，myapp就启动了，这时候redis可能还未就绪）
    # 依赖可以指定多个，用数组形式
    # -myredis1
    # - myredi2
    ports:   # 指定映射端口
      - 80:8080
    volumes: # 挂载数据卷，将容器内./data挂载到宿主机/app目录下
      - ./data:/app
    environment: # 容器内的环境变量
      - TZ=Asia/Shanghai
      
  #地第二个服务    
  myredis:
    image: redis:latest #image字段指镜像，这里没有使用dockerfile
    networks: 
  		- postnet
    volumes:
      - redis:/data
    environment:
      - TZ=Asia/Shanghai

# 三、其他配置、网络、全局规则
volumes:
  redis:
```

**注意**：容器默认时间不是北京时间，增加 TZ=Asia/Shanghai 可以改为北京时间



**Docker-compose相关命令**

```shell
# 项目根目录下
docker-compose up -d # 执行docker-compose配置，-d是后台运行的含义

docker-compose ps # 查看运行状态

docker-compose stop # 停止运行

docker-compose restart # 重启     
docker-compose restart service-name # 重启单个服务

docker-compose exec service-name sh # 进入容器指定服务的命令行
docker-compose logs [service-name] # 查看容器运行log
```



## 备份和迁移数据

**区分目录挂载的方式**

* 如果使用`bind mount`直接把宿主机的目录挂进去容器，那迁移数据很方便，直接复制目录就好了
* 如果使用`volume`方式挂载的，由于数据是由容器创建和管理的，需要用特殊的方式把数据弄出来。

**备份和导入 Volume 的流程**

备份：

- 运行一个 ubuntu 的容器，挂载需要备份的 volume 到ubuntu容器，并且挂载宿主机目录到容器里的备份目录。

- 运行 tar 命令把容器中的/data/下的数据压缩为一个文件，压缩后的文件放在备份目录下

  ![image-20220202112934341](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Docker/image-20220202112934341%20.png)

导入：

- 运行 ubuntu 容器，挂载目标容器的 volume，并且挂载宿主机备份文件所在目录到ubuntu容器里
- 运行 tar 命令解压备份文件到volume所在的文件夹

**以mongodb为例**

备份：

* 运行mongodb容器，将容器的/data目录，存储到名为 mongo-data 的Volume中

  ```shell
  docker run -p 27018:27017 --name mongo -v mongo-data:/data -d mongo:4.4
  ```

  本地没有mongo这个镜像，会从远程镜像仓库下载

  ![image-20220201202158663](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Docker/image-20220201202158663%20.png)

  然后，运行到容器

  ![image-20220201202309759](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Docker/image-20220201202309759%20.png)

  同时能看到名为 mongo-data 的Volume

  ![image-20220201201908518](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Docker/image-20220201201908518%20.png)

  这里可以看到mongo的volume数据都是放在容器的/data/目录下

  ![image-20220202113710096](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Docker/image-20220202113710096%20.png)

* 使用以下命令

  ```shell
  docker run --rm --volumes-from mongo -v /Users/yc/Desktop/backup:/backup ubuntu tar cvf /backup/backup.tar /data/
  ```

  * `--volumes-from mongo`将mongo的所有Volume挂载到ubuntu容器，mongo中Volume数据在容器的/data/下，挂载到ubuntu下也是在/data/下

  * `-v /Users/yc/Desktop/backup:/backup` 使用bind mount，将本地目录`/Users/yc/Desktop/backup`挂载到ubuntu容器内的`/backup`目录

    ![image-20220202111635697](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Docker/image-20220202111635697%20.png)

  * `tar cvf /backup/backup.tar /data/` 压缩/data/，将压缩包命名为backup.tar放在/backup/backup.tar下。这里可以看出来，在压缩命令中使用的容器内地址

  * `--rm`ubuntu容器运行完，直接删除容器

* mongo的Volume备份到了宿主机的`/Users/yc/Desktop/backup`目录下，可以看到多了一个`backup.tar`文件

  ![image-20220202104939629](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Docker/image-20220202104939629%20.png)

迁移

* 删除之前的mongo容器，新建一个新的mongo容器。这个容器没数据

  ```shell
  docker run -p 27018:27017 --name mongo -v mongo-data:/data -d mongo:4.4
  ```

* 新mongo容器的Volume挂载到ubuntu容器中，然后解压文件把数据放进Volume中，运行完毕后，删除ubuntu容器

  ```shell
  docker run --rm --volumes-from mongo -v d:/backup:/backup ubuntu bash -c "cd /data/ && tar xvf /backup/backup.tar --strip 1"
  ```

  **注意**：strip 1 表示解压时去掉前面1层目录，因为压缩时包含了绝对路径

## 自动化流程

一般部署项目的流程：

**本地开发代码** —> **编译代码** ——> **打包成镜像** ——>**上传私有镜像仓库** ——> **在服务器上拉取镜像** ——> **运行镜像**

为了提高效率，实际上这套流程还可以继续精简，以我所在的公司为例：

**本地开发代码** —> **push到公司内部的git仓库** ——> **在公司自研的部署平台上选择对应仓库和分支** ——>**自动打包git仓库中的对应代码，上传私有镜像仓库，在服务器上拉取镜像，运行镜像**



## 常用命令

**构建镜像(images)**

```shell
docker build -t 镜像名:版本号  -f Dockerfile的路径 发送给Docker引擎的目录

# -t指定构建镜像的名字和版本号
# 如果执行该命令的目录，就是Dockerfile所在的目录，路径一般写`.`，代表当前路径，即把当前路径发送给Docker引擎
# -f Dockerfile的路径。项目中为了区分生产测试环境的Dockerfile,一般会命名为Dockerfile.prod、Dockerfile.dev等，这时候就需要使用-f指定路径

docker build  -t 镜像名:版本号  -f ./Dockerfile.prod Dockerfile的路径
# -f 有时候项目下的构建镜像的文件可能不叫dockerfile，可以用-f指定构建文件所在的位置
# 一般的命名风格 Dockerfile.qa 、 Dockerfile.dev
```

**创建容器，运行指定镜像**

如果本地没有该镜像，会自动从远程仓库下载镜像，然后运行到容器

```shell
docker run -d --name 容器名 -p 8080:80 <镜像名:版本号>

# -p 将容器端口映射到本机端口，冒号前是本机端口，冒号后是容器端口
# --name 给容器命名，不指定就会随机生成一个名字
# -d 在后台运行容器（关闭运行该命令的shell窗口，容器也会继续运行
```

**volume相关**

```shell
docker volume ls # 查看volume列表
```

**网络相关**

```shell
docker network ls # 查看网络列表
```

**容器日志**

```shell
docker logs 容器id/容器名
```

**docker命令大全**

![dockerimg](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Docker%E7%9B%B8%E5%85%B3/dockerimg%20.jpeg)

`docker info` 查询docker的信息，Registry字段为docker的镜像源

## 常用的基础镜像

### Alpine

精简版的Linux系统

特点：

* 使用APK包管理工具

  APK下载软件有时候会很慢，可以在dockerfile中指定国内的站点

  ```shell
  #更新Alpine的软件源为国内（清华大学）的站点，因为从默认官源拉取实在太慢了。。。
  RUN echo "https://mirror.tuna.tsinghua.edu.cn/alpine/v3.4/main/" > /etc/apk/repositories
  ```

* 只支持bin/sh

  如果需要支持bash，可以在dockerfile中使用AKP下载

  ```
  RUN apk add bash
  ```

* 轻量级，下图是各个Linxu镜像的大小

  ![image-20220517115557559](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Docker/image-20220517115557559.png)

目前 Docker 官方已开始推荐使用 Alpine 替代之前的 Ubuntu 做为基础镜像环境

### Node

安装了node环境的Linux系统，但是不同镜像基于的系统不同

```text
node:<version>

基于Debian,官方默认镜像。当你不确定你需要什么的时候选择这个就对了。这个被设计成可以丢弃的镜像，也就是可以用作构建源码使用（分阶段构建），体积挺大。


node:<version>-slim
基于Debian， 删除了很多默认公共的软件包，只有node运行的最小环境。除非你有空间限制，否则推荐使用默认镜像。

node:<version>-alpine
基于alpine, 比Debian小的多。如果想要最小的镜像，可以选择这个做为base。需要注意的是，alpine使用musl代替glibc。一些c环境的软件可能不兼容。但大部分没问题。
```

例子

```dockerfile
FROM node:18-alpine3.19

# 修改时区
ENV TZ=Asia/Shanghai
RUN echo "${TZ}" > /etc/timezone \
    && ln -sf /usr/share/zoneinfo/${TZ} /etc/localtime \
    && apt update \
    && apt install -y tzdata \
    && rm -rf /var/lib/apt/lists/*


RUN mkdir app
WORKDIR /app
COPY . .

RUN npm config set registry http://registry.npmmirror.com && npm install
```

### Go

golang镜像比较大，一般作为分阶段构建的第一步用来编译Go源码。编译后结果直接使用alpine镜像运行即可



### Mysql

拉取最新的Mysql镜像运行，将Redis的数据挂载到mysqldata

必须指定环境MYSQL_ROOT_PASSWORD作为密码

```shell
docker run -d --name mysql-container -p 3306:3306 -v /mysqlData:/var/lib/mysql  -e MYSQL_ROOT_PASSWORD=hedaodao mysql:latest
```

### Redis

拉取最新的Redis镜像运行，将Redis的数据挂载到mysqldata

```shell
docker run -d --name redis-container -p 6379:6379 -v /redisData:/data redis:latest

 # 登陆到容器中 
 docker exec -it 容器id bash 
 >redis-cli # 就可以执行命令了 ， 输入exit回车就退出了
```

## 踩坑第一弹

Dockerfile中我们常用的基础镜像，一般就是alpine，这是一个精简版的Linux系统

Dockerfile的第一句拉取基础镜像，一般都是一个Linux系统，比如

```dockerfile
FROM golang:1.17.1-alpine  #包含golang环境的Linux
FROM nginx:1.17.1-alpine   #包含nginx的Linux
```

然后，我们在这个系统的基础上进行一些添加操作



我在实践中踩的第一个大坑就在这里，公司的部署系统远程连接Docker容器（就是使用docker exec）默认使用的是bash，但是由于alpine不支持bash，只支持bin/sh所以导致一直无法连接。

解决方法有两个，其核心就是在镜像中添加bash：

* 构建自己的基础镜像，这个基础镜像中就添加好bash

  这个就用到【常用命令】里补充的commit命令了

  ```shell
  docker pull bash #下载bash镜像，这里面有一个
  
  docker images # 查看所有镜像，判断是否下载好了bash
  
  docker run -itd bash
  
  docker ps -a #找到运行起来bash镜像的容器的ID
   
  docker exec -it 容器ID  bash  #通过ID进入bash交互模式
  
  apk add xxx #安装xxx软件
  
  
  docker commit 容器ID 镜像名:版本号 #把容器打包成镜像，指定镜像名和版本号
  
  docker images #就能找到刚刚打包的镜像了
  ```

  上传镜像到镜像仓库，参考【发布到私有镜像】章节

  ```
  给镜像打tag
  
  push到仓库
  ```

  

  在dockerfile使用我们打包的基础镜像

  ```dockerfile
  FROM 仓库地址/命名空间/镜像名:版本号
  ```

* 在需要部署的项目根文件夹下的Dockerfile中下载bash，然后使用`docker build`基于Dockerfile文件构建镜像。我这里以一个alpine为基础镜像

  ```dockerfile
  FROM golang:1.17.1-alpine  #包含golang环境的Linux
  RUN apk add --no-cache --upgrade bash #安装一个bash
  ```



还有一点要特别注意：

我们这里是安装bash，两种方案速度相差不到，如果是安装一个特别大的软件，还是建议使用第一种方法，因为第二种方法就是容器自动去网络上下载，这样比较慢，而第一种方法，是把软件已经添加到镜像里了，我们可以把这个镜像上传到公司的镜像仓库，当dockerfile执行`FROM`时，直接在内网拉取这个镜像，这样速度就比较快了



## 踩坑第二弹

部署一个Go项目，这个项目会自动拉取Gitlab上的项目

直接执行`git clone`会要求输入密码，这个操作无法再Dockerfile中指定

所以，这里我自己构建了一个镜像

```shell
docker pull alpine #拉取一个alpine作为基础镜像

docker run -d -p 80:80 --name xxxx-container  alpine #启动alpine

apk add git  #下载git

git config --global credential.helper store #输入一次密码就保存下来，下次不会再要求输入密码
 
git clone xxxx  #克隆一个公司的项目，过程中，要求输入账号密码
```

接下来，将容器打包成镜像

```
docker commit <容器ID> 镜像名:版本
```

将镜像打tag，推送到镜像仓库

在Dockerfile的第一行From指定拉取这个镜像即可

## 踩坑第三弹：容器时间

容器默认时间不是北京时间

本地开发使用的北京时间（东八区时间），但是容器内使用的是UTC时间。导致容器的设置的定时任务无法按时执行

定时任务使用的是`node-schedule`这个库

```js
const schedule = require("node-schedule");
schedule.scheduleJob('0 0 8 * * *', ()=>{
     console.log("北京时间8点执行")
});
```

我希望定时脚本能在北京时间8点执行，但是实际上会在北京时间16点执行。

因为node-schedule设置的时间，是按照当前时区设置的，而容器内是UTC时间

**解决方案**：

登录容器内部系统，输入`apt`、`apk`，能正常输出相关命令，就能判断系统使用了哪个包管理器

```
docker exec -it 容器id
```

dockerfile增加

```dockerfile
#环境变量先设置
ENV TZ=Asia/Shanghai

#使用apk的用下面的（基于Alpine镜像的都自带apk)
RUN apk update \
    && apk add tzdata \
    && echo "${TZ}" > /etc/timezone \
    && ln -sf /usr/share/zoneinfo/${TZ} /etc/localtime \
    && rm /var/cache/apk/*

#使用apt的用下面的
RUN echo "${TZ}" > /etc/timezone \
    && ln -sf /usr/share/zoneinfo/${TZ} /etc/localtime \
    && apt update \
    && apt install -y tzdata \
    && rm -rf /var/lib/apt/lists/*
```

参考：https://juejin.cn/post/7082670118257295391

## 踩坑第四弹：环境变量

背景：

做音视频开发，需要按照ffmpeg。但是ffmpeg按照比较耗时，就决定自制一个镜像，里面提前下载好ffmpeg

因为还需要node环境，直接使用了node镜像

```shell
FROM node:18
```

使用上面的Dockerfile构建镜像，运行到容器，进入终端

我用的idea作为开发工具，打开Dockerfile直接点击运行的监听就会直接运行起来容器

![image-20240529155402098](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20240529155402eRyH6E.png)

进入容器终端

![image-20240529155534075](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20240529155534m7bM2n.png)

执行安装ffmpeg的命令

```shell
# 下载
wget https://johnvansickle.com/ffmpeg/releases/ffmpeg-release-amd64-static.tar.xz

# 解压到 /usr/local/ffmpeg 目录下 。注意：需先创建好/usr/local/ffmpeg目录
tar -xvf ffmpeg-release-amd64-static.tar.xz  --strip-components 1 -C /usr/local/ffmpeg

# 进入解压后的目录
cd /usr/local/ffmpeg 

# profile文件中加入环境变量，无论使用什么shell都可以访问到
vim /etc/profile  加入 export PATH="$PATH:/usr/local/ffmpeg"

source /etc/profile
```

当时试了下输入`ffmpeg -version`可以正常使用了

打包为镜像

```
docker commit 容器名 镜像名:版本号
```

问题：

部署后容器内无法问到ffmpeg命令

```
原因：

/etc/profile等shell的配置文件，都是在登录shell启动时才会被读取

Docker容器默认不会启动登录shell，所以profile中的环境变量不会立即生效
```

解决：

在Dockerfile中直接写环境变量配置

```shell
ENV PATH="$PATH:/usr/local/ffmpeg"
```





## 随手记





可以下载，但是是版本 3 

```
是的，你可以使用RPM（Red Hat Package Manager）来安装FFmpeg，但通常情况下，直接使用默认的RPM源可能找不到FFmpeg，因为不是所有的Linux发行版官方仓库都包含FFmpeg，尤其是考虑到版权和许可证问题。为了在基于RPM的系统（如CentOS、RHEL或Fedora）上安装FFmpeg，你可以采取以下步骤：

使用额外的软件仓库
启用EPEL（Extra Packages for Enterprise Linux）: EPEL是一个由Fedora团队维护的附加软件包集合，它为RHEL和兼容系统（包括CentOS）提供了许多常用的软件包。首先，你需要启用EPEL仓库。

Shell
sudo yum install -y epel-release
启用RPM Fusion: 对于FFmpeg这类多媒体软件，RPM Fusion是一个非常好的额外软件源，它提供了许多因许可证限制而不在标准仓库中的包。

对于Fedora:

Shell
sudo dnf install https://download1.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm
对于CentOS/RHEL 8及更高版本:

Shell
sudo dnf install https://download1.rpmfusion.org/free/el/rpmfusion-free-release-8.noarch.rpm
对于CentOS/RHEL 7:

Shell
sudo yum install https://download1.rpmfusion.org/free/el/rpmfusion-free-release-7.noarch.rpm
安装FFmpeg: 一旦你启用了相应的仓库，就可以直接使用yum或dnf(在Fedora和较新版本的CentOS/RHEL中)来安装FFmpeg了。

Shell
sudo yum install ffmpeg
或对于使用dnf的系统：

Shell
sudo dnf install ffmpeg
使用预编译的RPM包
另外，如果你找到了直接提供FFmpeg的RPM包（例如，从FFmpeg官方网站或第三方源），你也可以直接使用rpm命令安装这些包，但需要注意依赖关系的解决。

总结
通过上述方法，你可以顺利地在基于RPM的Linux发行版上安装FFmpeg。选择哪种方法取决于你的具体需求和所使用的Linux发行版。
```

