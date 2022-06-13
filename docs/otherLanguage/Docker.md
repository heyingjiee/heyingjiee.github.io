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

### 第三方中文文

[Docker简明教程——中文版](https://www.simapple.com/docker-tutorial)

[菜鸟教程](https://www.runoob.com/docker/docker-tutorial.html)

[菜鸟教程——Docker命令大全](https://www.runoob.com/docker/docker-command-manual.html)

## Docker简介

Docker 是一个应用打包、分发、部署的工具，也可以把它理解为一个轻量的虚拟机，它只虚拟你软件需要的运行环境，多余的一点都不要，而普通虚拟机则是一个完整而庞大的系统，包含各种不管你要不要的软件。

**打包**：就是把你软件运行所需的依赖、第三方库、软件打包到一起，变成一个安装包
**分发**：你可以把你打包好的“安装包”上传到一个镜像仓库，其他人可以非常方便的获取和安装
**部署**：拿着“安装包”就可以一个命令运行起来你的应用，自动模拟出一摸一样的运行环境，不管是在 Windows/Mac/Linux

![image-20220202133143406](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Docker/image-20220202133143406%20.png)

## 安装Docker

服务器版：https://docs.docker.com/engine/install/#server

桌面版：https://www.docker.com/products/docker-desktop

以安装Mac桌面版为例：

* 官网下载

* 安装到Mac

  ![image-20220130162454070](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Docker/image-20220130162454070%20.png)

  输入密码，接受协议

  ![image-20220131152745466](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Docker/image-20220131152745466%20.png)

  主界面

  ![image-20220130163730997](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Docker/image-20220130163730997%20.png)

## 配置镜像源

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

![image-20220130171834257](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Docker/image-20220130171834257%20.png)

![image-20220130173300966](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Docker/image-20220130173300966%20.png)

## 安装软件镜像

注意：

* 安装了镜像的不同容器之间相互隔离

* 安装过程中用到最多的命令是 

  ```shell
  # 项目目录下
  docker run [OPTIONS] IMAGE [COMMAND] [ARG...]
  ```
  
  [run 命令相关参数地址](https://docs.docker.com/engine/reference/commandline/run/)

安装：

docker hub是官方提供的镜像仓库，直接在[docker hub 官网](https://hub.docker.com/)搜索想要安装在docker中的软件，根据搜索结果的指示进行安装

![image-20220130173924166](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Docker/image-20220130173924166%20.png)

以安装redis为例子

![image-20220130175308904](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Docker/image-20220130175308904%20.png)

![image-20220130175448691](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Docker/image-20220130175448691%20.png)

打来电脑自带的终端，输入以下命令，回车

```shell
docker run --name some-redis -d redis
```

运行redis镜像

`--name` 指定容器的名字为 some-redis

`-d `在后台运行



安装完毕后，打开docker客户端，发现`Images`选项卡下可以看到安装的redis镜像

![image-20220130175831031](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Docker/image-20220130175831031%20.png)

`Container/Apps`选项卡下也能看到安装的容器 ，注意这里的`some-redis`就是安装命令中起的容器名

![image-20220130180014543](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Docker/image-20220130180014543%20.png)

## Dockerfile基础入门

Dockerfile定义了运行镜像所需的所有内容，包括操作系统和软件安装位置

制作自己的镜像前，需要先编写Dockerfile，当调用构建命令（docker build），Docker 引擎会逐一按顺序解析 Dockerfile 中的指令，并根据它们不同的含义执行不同的操作

补充下：

**上下文路径**

` .` 是上下文路径

指定运行build时所在的目录为上下文路径，`docker build` 命令会将该目录下的内容打包交给 Docker 引擎以帮助构建镜像。（build命令应该用在，要被构建为镜像的项目的根目录下使用）

```shell
docker build -t nginx:v3 . 
```

**注意**：上下文路径下不要放无用的文件，因为会一起打包发送给 docker 引擎，如果文件过多会造成过程缓慢。

如果确实上下文目录下有些文件，不需要打包给docker，可以在上下文目录下添加忽略文件`.dockerignore`



**Dockerfile文件字段**

Dockerfile文件文档 [Dockerfile reference](https://docs.docker.com/engine/reference/builder/#run)

* 拉取镜像

   一般情况下一个可用的 `Dockerfile`一定是 `FROM` 为第一个指令

  如果没有指定 `tag` ，`latest` 将会被指定为要使用的基础镜像版本。

  ```dockerfile
  FROM <image> 
  #或者 
  FROM <image>:<tag>
  ```

* 给镜像添加元数据

  ```dockerfile
  LABEL <key1>=<value1>[ <key2>=<value2>[ <key3>=<value3>]]
  ```

  可以以下命令查看

  ```shell
  docker image inspect --format='' <镜像名/id>
  ```

  父镜像的标签会被继承，但是如果有子镜像有相同的标签，会覆盖父镜像

  一个Dockerfile文件可以写多个`LABEL`，如果`LABEL`值中包含空格，需要替换为`\空格 `。如果指令没有写完想要换行写，加`\`即可

  ```dockerfile
  LABEL multi.label1="value1" multi.label2="value2-1\ value2-2" other="value3"
  LABEL multi.label1="value1" \
        multi.label2="value2" \
        other="value3"
  ```

* 创建环境变量，后续命令使用变量通过$key使用【如果value中需要有空格，需要使用` \空格`转译】

  ```dockerfile
  ENV <key1>=<value1> <key2>=<value2>
  #或者 
  ENV <key><value>  #单个键值对，可省略等于号
  ```

* 设置docker容器的工作路径，后续指令都会在该路径下执行。不设置，默认为容器的根目录

  ```dockerfile
  WORKDIR /path/to/workdir
  ```

  可以在其中使用ENV定义的变量

  ```dockerfile
  WORKDIR $path/a  #ENV path=/my ，最终就是/my/a
  ```

* 将宿主机的文件复制到容器中

  ```dockerfile
  COPY <src> <dest> #将本地src路径下的文件，复制到容器的dest路径下
  
  ADD <src> <dest> #和COPY功能类似，不过src可以是网络文件下载链接或者是压缩文件，ADD会去下载和解压相应文件，然后放到容器的dest路径下
  ```

  `<src>` ：

  必须是相对路径，相对于dockerfile目录的路径

  指定`<src>`地址时，如果使用通配符，遵循Go语言的 [filepath.Match](https://golang.org/pkg/path/filepath#Match) 规则

  如果`<src>`是目录，则复制目录下的全部内容，但是目录本身没有被复制，只是它里面的内容

  `<dest>`

  * 是相对路径

    相对于前面设置的WORKDIR，如果没有设置，默认为容器根目录

    ```dockerfile
    COPY test.txt relativeDir/   #将“test.txt”添加到<WORKDIR>/relativeDir/下
    ```

  * 是绝对路径

    ```
    COPY test.txt /absoluteDir/  #将“test.txt”添加到/absoluteDir/下
    ```

* 执行命令

  **RUN**

  shell格式：

  ```dockerfile
  RUN <命令行命令> # <命令行命令> 等同于，在终端操作的 shell 命令。
  ```

  exec 格式（双引号）：

  ```dockerfile
  RUN ["可执行文件", "参数1", "参数2"]
  # RUN ["./test.php", "dev", "offline"] 等价于 RUN ./test.php dev offline
  ```

  **注意**：RUN命令可以有多个，但是，指令每执行一次都会在 docker 上新建一层。所以过多无意义的层，会造成镜像膨胀过大。例如：

  ```dockerfile
  FROM centos
  RUN install
  RUN cd /app
  RUN mkdir logs
  ```

  以上执行会创建 3 层镜像。可简化为以下格式：

  ```dockerfile
  FROM centos
  RUN npm install && cd /app && mkdir logs
  ```

  如上，以 **&&** 符号连接命令，这样执行后，只会创建 1 层镜像

  **CMD**

  类似于 RUN 指令，用于运行程序，但二者运行的时间点不同:

  - CMD 在docker run 时运行（运行容器）
  - RUN 是在 docker build（构建镜像）

  CMD 指令是容器启动后执行的命令，一般用作程序的入口。CMD 指令指定的程序可被 docker run 命令行参数中指定要运行的程序所覆盖。

  **注意**：如果 Dockerfile 中如果存在多个 CMD 指令，仅最后一个生效

  格式：

  ```dockerfile
  CMD <shell 命令> 
  CMD ["<可执行文件或命令>","<param1>","<param2>",...] 
  CMD ["<param1>","<param2>",...]  # 该写法是为 ENTRYPOINT 指令指定的程序提供默认参数
  ```

  推荐使用第二种格式，执行过程比较明确。第一种格式实际上在运行的过程中也会自动转换成第二种格式运行，并且默认可执行文件是 `*.sh`文件

  **ENTRYPOINT**

  类似于 CMD 指令，但其不会被 **docker run** 的命令行参数指定的指令所覆盖，

  当 ENTRYPOINT 与 CMD 同时给出时，CMD 中的内容会作为 ENTRYPOINT 定义命令的参数，最终执行容器启动的只有 ENTRYPOINT 中给出的命令

  但是, 如果运行 docker run 时使用了 --entrypoint 选项，将覆盖 ENTRYPOINT 指令指定的程序。

  **优点**：在执行 docker run 的时候可以指定 ENTRYPOINT 运行所需的参数。

  **注意**：如果 Dockerfile 中如果存在多个 ENTRYPOINT 指令，仅最后一个生效。

  只有exec格式：

  ```dockerfile
  ENTRYPOINT ["<executeable>","<param1>","<param2>",...]
  ```

  示例：

  假设已通过 Dockerfile 构建了 nginx:test 镜像：

  ```dockerfile
  FROM nginx
  
  ENTRYPOINT ["nginx", "-c"] 
  CMD ["/etc/nginx/nginx.conf"] # 参数
  ```

  1、不传参运行

  ```shell
  docker run  nginx:test
  ```

  容器内会默认运行以下命令，启动主进程。

  ```shell
  nginx -c /etc/nginx/nginx.conf
  ```

  2、传参运行

  ```shell
  docker run  nginx:test -c /etc/nginx/new.conf
  ```

  容器内会默认运行以下命令，启动主进程(/etc/nginx/new.conf:假设容器内已有此文件)

  ```shell
  nginx -c /etc/nginx/new.conf
  ```

## 制作镜像

* 在项目根目录新建`Dockerfile`文件

  我直接新建了一个vue项目，在项目根目录新建`Dockerfile`文件（记得把node_module文件夹删除，否则构建镜像会非常慢）

  ```shell
  #把dockerfile放在dist目录下
  FROM nginx
  
  COPY . /usr/share/nginx/html/
  ```
  
* 将本地项目构建为docker镜像

  ```shell
   # 项目目录下
   docker build -t test:v1 .
   
   # 镜像名命名为test，镜像版本号为v1 
   # "."项目根目录，表示把宿主机项目目录全部构建镜像
  ```

   `-t` 设置tag为镜像的名字和版本号

  构建镜像成功后，在`Images`选项卡下可以看到刚才build的`test镜像`，版本是`v1`

  ![image-20220131162444354](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Docker/image-20220131162444354%20.png)

* 将镜像运行到容器中

  ```shell
  # 项目目录下
  docker run -p 8080:8080 --name test-hello -d test:v1
  
  # 冒号后的8080是容器端口，冒号前是本机端口，-p是将容器端口映射到本机端口
  # --name 将容器命名为test-hello 
  # test:v1是将镜像名test，版本为v1的镜像安装到容器
  ```
  
  `-p` 映射容器内端口到宿主机
  `--name` 容器名字
  `-d` 后台运行，如果不用`-d`，当关闭命令窗口，docker容器就会停止运行
  
  运行成功后，可以在`Containers/Apps`选项卡下看到名为`test-hello`的容器，运行在本机的8080端口
  
  ![image-20220131162728197](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Docker/image-20220131162728197%20.png)
  
* 浏览器打开 http://localhost:8083/ ，即可看到项目运行的效果

## 目录挂载

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



## 多容器通信

每个容器之间相互独立，但是往往一个项目不是独立运行，可能会依赖多个软件，比如：一个web项目需要mysql数据库、redis等，这就需要多容器之间相互通信。创建docker网络，将两个容器运行在同一个网络中

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

## Docker-Compose

一个项目可能会依赖更多的软件，如果我们一一去配置容器会比较复杂，所以，我们可以使用Docker-Compose一次性把一个项目的多个依赖软件配置好

docker compose文档 [docker compose](https://docs.docker.com/compose/)

**安装Docker-Compose**

* 桌面版Docker，自带Docker-Compose

* 服务端版，需要手动安装[文档](https://docs.docker.com/compose/install/#install-compose-on-linux-systems)

  输入`docker compose`，出现以下提示，证明安装成功

  ![image-20220201115026305](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Docker/image-20220201115026305%20.png)

**安装软件镜像集合**

一个容器内可安装多个镜像，每个镜像我们都称之为服务(services)

项目根目录下新建`docker-compose.yml`文件

```yaml
version: "3.7"

services:
  app:
    build: ./ # app这个项目在本地，所以用build在文件的根目录构建镜像
    ports:
      - 80:8080
    volumes:
      - ./:/app
    environment:
      - TZ=Asia/Shanghai
  redis:
    image: redis:5.0.13
    volumes:
      - redis:/data
    environment:
      - TZ=Asia/Shanghai

volumes:
  redis:
```

**注意**：容器默认时间不是北京时间，增加 TZ=Asia/Shanghai 可以改为北京时间

```shell
# 项目根目录下
docker-compose up -d # -d是后台运行的含义
```

## 发布和部署镜像

我们可以将自己的镜像发布到官方的`docker hub`镜像仓库或其他的镜像托管仓库，也可以搭建私有的镜像仓库

* 在docker的镜像仓库 [docker hub](https://hub.docker.com/) ，注册用户（注册时填写 用户名+邮箱+密码，国外的东东都喜欢在命令行中使用这个用户名作为用户标识，所以记住啊）

* 命令行登陆

  ```shell
  docker login -u username
  # 之后要求输入密码
  ```
  
* 新建远程镜像

  ```shell
  docker tag imagename:tag username/imagename:tag
  ```

  `username/imagename:tag`

  username是自己登录的用户的username，

  imagename:tag 是远程镜像名和版本号，如果远程没有就会自动创建这个

  我这里使用`docker tag test:v1 hyjhyj1098/test:v1`，可以看到`Images`选项卡下多了一个`hyjhyj1098/test`的镜像

  ![image-20220201184423220](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Docker/image-20220201184423220%20.png)

  

* 上传本地镜像到远程仓库
  
  ```shell
  docker push username/imagename:tag
  ```
  
  可以在网站看到上传的镜像
  
  ![image-20220201191854211](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Docker/image-20220201191854211%20.png)
  
* 使用远程镜像，如果创建容器的镜像是公开的远程镜像，可以直接使用`image`字段指定远程
  
  ```shell
  version: "3.7"
  
  services:
    app:
  #    build: ./ 不用在本地构建镜像了
      image: username/imagename:tag ######这里
      ports:
        - 80:8080
      volumes:
        - ./:/app
      environment:
        - TZ=Asia/Shanghai
    redis:
      image: redis:5.0.13
      volumes:
        - redis:/data
      environment:
        - TZ=Asia/Shanghai
  
  volumes:
    redis:
  ```
  
* 补充：之间在网站上创建镜像仓库
  
  ![image-20220201182741745](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Docker/image-20220201182741745%20.png)
  
  ![image-20220201182948588](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Docker/image-20220201182948588%20.png)

**阿里云容器镜像服务**

由于官方镜像在国内速度缓慢，所以也可以把镜像托管在阿里云，进去阿里云官网，搜索"容器镜像服务"，按照指示创建远程镜像

![image-20220201193140481](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Docker/image-20220201193140481%20.png)

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

## 云服务器使用Docker

[阿里云Docker环境的快速搭建教程](https://developer.aliyun.com/adc/scenario/9fd79b8711984e309f20d82bc65a26fa?spm=a2c6h.19776329.J_1495128370.10.658b3d80jQ9uN9)

本教程基于CentOS 7安装Docker CE

购买ECS服务器，登陆远程服务器，这些步骤就省略了

### 安装Docke

Docker有两个分支版本：Docker CE和Docker EE，即社区版和企业版。

* 执行如下命令，安装Docker的依赖库
  ```shell
  yum install -y yum-utils device-mapper-persistent-data lvm2
  ```

* 执行如下命令，添加Docker CE的软件源信息
  ```
  yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
  ```
* 执行如下命令，安装Docker CE。
  ```
  yum makecache fast
  yum -y install docker-ce
  ```

* 执行如下命令，启动Docker服务

  ```js
  systemctl start docker
  ```

### 配置阿里云镜像仓库（镜像加速）

Docker的默认官方远程仓库是hub.docker.com，由于网络原因，下载一个Docker官方镜像可能会需要很长的时间，替换为阿里云镜像仓库，从而加速官方镜像的下载

* 访问云容器镜像服务控制台，复制加速器地址

  ```text
  https://cr.console.aliyun.com/
  ```

  ![image-20220317141320392](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220317141320392%20.png)

* 切换至终端页面。执行如下命令配置Docker的自定义镜像仓库地址【请将下面命令中的镜像仓库地址 https://kqh8****.mirror.aliyuncs.com 替换为上一步阿里云为您提供的专属镜像加速地址】

  ```js
  tee /etc/docker/daemon.json <<-'EOF'
  {
    "registry-mirrors": ["https://kqh8****.mirror.aliyuncs.com"]
  }
  EOF
  ```

* 重新加载服务配置文件

  ```shell
  systemctl daemon-reload
  ```

* 重启Docker服务

  ```shell
  systemctl restart docker
  ```

### 安装Nginx镜像

* 查看Docker官方镜像仓库中Nginx的可用版本

  ```shell
  docker search nginx
  ```

  ![img](https://img.alicdn.com/tfs/TB1zTRaHRr0gK0jSZFnXXbRRXXa-1090-592.png)

* 拉取最新版的Nginx镜像

  ```shell
  docker pull nginx:latest
  ```

![img](https://img.alicdn.com/tfs/TB1zcA4HpP7gK0jSZFjXXc5aXXa-688-195.png)

* 查看本地镜像

  ```shell
  docker images
  ```

  ![img](https://img.alicdn.com/tfs/TB1igZ2HpY7gK0jSZKzXXaikpXa-731-88.png)

* 运行容器

  ```shell
  docker run --name nginx-test -p 8080:80 -d nginx
  ```

  ![img](https://img.alicdn.com/tfs/TB1CDRaHRr0gK0jSZFnXXbRRXXa-560-69.png)

* 在**本地浏览器**打开 `http://<ECS公网地址>:8080` 访问Nginx服务

![img](https://ucc.alicdn.com/pic/developer-ecology/8019013f0db24c889c0c37e3b7773b9a.png)



### docker远程访问

如何从本地连接上远程服务器中的docker呢？[docker远程访问](https://www.cnblogs.com/-wenli/p/13555833.html)

我们可以从本地上传自己的镜像到镜像仓库，然后再连接远程服务器的docker，在云服务器中把镜像pull下来，然后run



## 发布到私有镜像库

上面一直使用的镜像仓库都是官方的，实际上企业一般使用内部的私有镜像仓库，而不是官方的仓库（类似于企业一般使用gitlab搭建的内部仓库，而不是github）

一般部署项目的流程：

**本地开发代码** —> **编译代码** ——> **打包成镜像** ——>**上传私有镜像仓库** ——> **在服务器上拉取镜像** ——> **运行镜像**

为了提高效率，实际上这套流程还可以继续精简，以我所在的公司为例：

**本地开发代码** —> **push到公司内部的git仓库** ——> **在公司自研的部署平台上选择对应仓库和分支** ——>**自动打包git仓库中的对应代码，上传私有镜像仓库，在服务器上拉取镜像，运行镜像**



为了大致理解流程，这里以阿里云提供的免费的个人镜像仓库为例子，上传一个vue项目的代码

* 创建一个vue项目

  ```shell
   yarn global add @vue/cli #安装vue脚手架
   vue create hello-world # 创建一个vue项目，名字是hello-world
   #过程中要选择一个预设，选择 Default ([Vue 2] babel, eslint) 就好
  ```

* 编译vue项目

  ```shell
  yarn build
  ```

* 本地启动docker，项目根目录下编写Dockerfile，构建镜像【详见前面的`制作镜像`章节】

  ```dockerfile
  #把dockerfile放在dist目录下
  FROM nginx
  
  COPY . /usr/share/nginx/html/
  ```
  
  ```shell
  #在dist目录下运行
   docker build -t  hello-world:v1 .
  ```
  
* 创建阿里云镜像仓库（如果有条件可以搭建私有仓库）

  访问阿里云容器镜像服务，在实例列表里有两个选项，分别是个人实例和企业实例，目前个人实例免费，按照流程创建命名空间（一个命名空间下，可以放多个镜像仓库）即可

  ```text
  https://cr.console.aliyun.com/
  ```

  登陆创建的镜像仓库

  ![image-20220319205503019](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Linux/image-20220319205503019%20.png)

  ```shell
  docker login --username=<用户名> <仓库地址> 
  ```

  上传hello-world:v1这个镜像到阿里的镜像仓库（先打tag，推送的时候指定的是镜像的tag）

  ```shell
  docker tag hello-world:v1 [镜像仓库地址/][镜像仓库的命名空间/]hello-world:v4 #我这里起名字为hello-world:v4
  
  docker push <tag> #以下的tag表示的都是：[镜像仓库地址/][镜像仓库的命名空间/]hello-world:v4
  ```

  **注意**：

  * 镜像仓库地址，不要加http或https协议

  * 阿里云镜像仓库中，镜像名就是仓库名，每次推送推动不同版本，都会在这个仓库中记录

    ![image-20220319220741225](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Docker%E7%9B%B8%E5%85%B3/image-20220319220741225%20.png)

  * 如果push时提示请求被拒绝，重新登录即可

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







## 常用命令

**镜像(images)相关**

`docker build -t 镜像名:版本号 . ` 

* `-t`指定构建镜像的名字和版本号
* `.`指定当前目录为上下文目录，COPY和ADD都是以这个目录为基础；例如：`.work`，就是当前目录下的`.work`为上下文目录

`docker images` 查看镜像列表

**运行容器**

`docker run 镜像名:镜像版本号`  将镜像运行在容器中，如果本地没有该镜像，会自动从远程仓库下载镜像，然后运行到容器

* ` -p 8080:8080` 冒号后的8080是容器端口，冒号前是本机端口，-p是将容器端口映射到本机端口
* ` --name test-hello` 给容器命名为 test-hello，不指定就会随机生成一个名字
* ` -d` 在后台运行容器（管理命令行窗口，容器也会继续运行）
* `--network test` 容器使用名为test的网络
* `--network-alias test`给容器使用的网络设置别名test
* `-v  volumeName[localAddress]:dockerAddress` 这个命令是将本地目录挂载到容器内的目录（bind mount），或者创建名为volumeName的Volume，由容器管理该Volume
* `--volumes-from dockerName `创建容器时，把名为dockerName的容器的所有Volume挂载到新容器（同一个volume可挂载到多个不同容器）
* `--rm` 自动删除容器

**volume相关**

`docker volume ls` 查看 volume 列表

**网络相关**

`docker network ls` 查看网络列表

**docker-compose相关**

`docker-compose up -d`  运行`docker-compose.yml`文件
`docker-compose ps` 查看运行状态
`docker-compose stop` 停止运行
`docker-compose restart` 重启     、  `docker-compose restart service-name ` 重启单个服务
`docker-compose exec service-name sh` 进入容器指定服务的命令行
`docker-compose logs [service-name]` 查看容器运行log

**登陆镜像仓库**

```shell
docker login --username=<用户名> [镜像仓库地址] #镜像仓库地址不写，就默认登陆官方镜像仓库
```

**镜像打tag**

为什么要打tag?  类似于git仓库中的commit记录，给镜像打tag后，才能推送指定tag名的镜像到远程仓库

**镜像名2就是镜像仓库的名字**，上传不同的版本，都在这一个仓库中可以看到

```shell
docker tag 镜像名1[:版本号1] [镜像仓库地址/][镜像仓库的命名空间/]镜像名2[:版本号2]  #镜像仓库地址不写，就默认登陆官方镜像仓库
```

**推送镜像到镜像仓库**

```shell
docker push <tag> # tag也就是上面的[镜像仓库地址/][镜像仓库的命名空间/]镜像名2[:版本号2]
```

**拉取镜像**

```shell
docker pull <tag> # tag也就是上面的[镜像仓库地址/][镜像仓库的命名空间/]镜像名2[:版本号2]
# 如果直接写 镜像名 ，就是默认从官方仓库下载
```

**进入容器内部**

bash 、 bin/bash 、bin/sh 三种shell可选，关键是看容器内安装的系统支持哪个

```shell
docker exec -it 容器ID或名字 /bin/bash
```

退出容器内shell

```
exit
```

**查看容器日志**

用于排查错误

```shell
docker logs 容器ID/名 
```

遇到 `exec /app/houndd: exec format error`

考虑是不是使用的Shell不对

**将容器打包为新的镜像**

```shell
docker commit 容器ID/名 镜像名:版本号
```



**docker命令大全**

![dockerimg](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Docker%E7%9B%B8%E5%85%B3/dockerimg%20.jpeg)

图中还差 `docker commit [容器名/容器id][镜像名:版本号]`未提及，其核心功能就是把正在运行的容器，构建为一个新的镜像【注意：容器必须是运行状态】

同样是构建镜像[docker commit 和docker build的区别 ](https://blog.csdn.net/alwaysbefine/article/details/111375658)是什么？

* commit 是把 容器——>镜像
* build 是把 镜像/源码——>镜像

`docker info` 查询docker的信息，Registry字段为docker的镜像源

## 踩坑第一弹

Dockerfile中我们常用的基础镜像，一般就是alpine，这是一个精简版的Linux系统

> Alpine 的意思是“高山的”
>
> 特点：
>
> * 使用APK包管理工具
>
>   APK下载软件有时候会很慢，可以在dockerfile中指定国内的站点
>
>   ```
>   #更新Alpine的软件源为国内（清华大学）的站点，因为从默认官源拉取实在太慢了。。。
>   RUN echo "https://mirror.tuna.tsinghua.edu.cn/alpine/v3.4/main/" > /etc/apk/repositories
>   ```
>
> * 只支持bin/sh
>
>   在dockerfile中使用AKP下载
>
>   ```
>   RUN apk add bash
>   ```
>   
> * 轻量级，下图是各个Linxu镜像的大小
> 
>   ![image-20220517115557559](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Docker/image-20220517115557559.png)
> 
> 目前 Docker 官方已开始推荐使用 Alpine 替代之前的 Ubuntu 做为基础镜像环境

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



