# Docker

[docker 中文文档](http://www.dockerinfo.net/dockerfile%e4%bb%8b%e7%bb%8d)

docker的镜像仓库 [docker hub](https://hub.docker.com/) 

docker所有文档 [docker doc](https://docs.docker.com/)：

* docker 的命令行文档  [Command-line reference](https://docs.docker.com/engine/reference/run/)
* docker 的dockerfile文件文档 [Dockerfile reference](https://docs.docker.com/engine/reference/builder/#run)
* docker数据的管理文档 [docker storage](https://docs.docker.com/storage/)
* docker网络文档 [docker network](https://docs.docker.com/engine/reference/commandline/network/)
* docker compose文档 [docker compose](https://docs.docker.com/compose/)

[Docker简明教程——中文版](https://www.simapple.com/docker-tutorial)

## Docker简介

Docker 是一个应用打包、分发、部署的工具，也可以把它理解为一个轻量的虚拟机，它只虚拟你软件需要的运行环境，多余的一点都不要，而普通虚拟机则是一个完整而庞大的系统，包含各种不管你要不要的软件。

**打包**：就是把你软件运行所需的依赖、第三方库、软件打包到一起，变成一个安装包
**分发**：你可以把你打包好的“安装包”上传到一个镜像仓库，其他人可以非常方便的获取和安装
**部署**：拿着“安装包”就可以一个命令运行起来你的应用，自动模拟出一摸一样的运行环境，不管是在 Windows/Mac/Linux

![image-20220202133143406](https://gitee.com/hyj1270433876/blog-img/raw/master/Docker/image-20220202133143406%20.png)

## 安装Docker

服务器版：https://docs.docker.com/engine/install/#server

桌面版：https://www.docker.com/products/docker-desktop

以安装Mac桌面版为例：

* 官网下载

* 安装到Mac

  ![image-20220130162454070](https://gitee.com/hyj1270433876/blog-img/raw/master/Docker/image-20220130162454070%20.png)

  输入密码，接受协议

  ![image-20220131152745466](https://gitee.com/hyj1270433876/blog-img/raw/master/Docker/image-20220131152745466%20.png)

  主界面

  ![image-20220130163730997](https://gitee.com/hyj1270433876/blog-img/raw/master/Docker/image-20220130163730997%20.png)

## 配置镜像源

Docker的默认官方远程仓库是hub.docker.com，由于网络原因，下载一个Docker官方镜像可能会需要很长的时间，甚至下载失败，所以我们需要配置镜像源

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

![image-20220130171834257](https://gitee.com/hyj1270433876/blog-img/raw/master/Docker/image-20220130171834257%20.png)

![image-20220130173300966](https://gitee.com/hyj1270433876/blog-img/raw/master/Docker/image-20220130173300966%20.png)

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

![image-20220130173924166](https://gitee.com/hyj1270433876/blog-img/raw/master/Docker/image-20220130173924166%20.png)

以安装redis为例子

![image-20220130175308904](https://gitee.com/hyj1270433876/blog-img/raw/master/Docker/image-20220130175308904%20.png)

![image-20220130175448691](https://gitee.com/hyj1270433876/blog-img/raw/master/Docker/image-20220130175448691%20.png)

打来电脑自带的终端，输入以下命令，回车

```shell
docker run --name some-redis -d redis
```

运行redis镜像

`--name` 指定容器的名字为 some-redis

`-d `在后台运行



安装完毕后，打开docker客户端，发现`Images`选项卡下可以看到安装的redis镜像

![image-20220130175831031](https://gitee.com/hyj1270433876/blog-img/raw/master/Docker/image-20220130175831031%20.png)

`Container/Apps`选项卡下也能看到安装的容器 ，注意这里的`some-redis`就是安装命令中起的容器名

![image-20220130180014543](https://gitee.com/hyj1270433876/blog-img/raw/master/Docker/image-20220130180014543%20.png)

## Dockerfile基础入门

dockerfile定义了运行镜像所需的所有内容，包括操作系统和软件安装位置

所以，制作自己的镜像前，需要先编写dockerfile，构建镜像时，会读取项目根目录下的 dockerfile，根据其配置规则， 生成镜像

dockerfile文件文档 [Dockerfile reference](https://docs.docker.com/engine/reference/builder/#run)

* 拉取镜像

   一般情况下一个可用的 `Dockerfile`一定是 `FROM` 为第一个指令

  如果没有指定 `tag` ，`latest` 将会被指定为要使用的基础镜像版本。

  ```dockerfile
  FROM <image> 
  #或者 
  FROM <image>:<tag>
  ```

* 指定镜像的作者名（已废弃，建议使用LABEL）

  ```doc
  MAINTAINER <name>
  ```

* 给镜像添加元数据

  ```dockerfile
  LABEL <key1>=<value1>[ <key2>=<value2>[ <key3>=<value3>]]
  ```

  可以以下命令查看

  ```shell
  docker image inspect --format='' myimage
  ```

  镜像作者的信息也可以添加进去，所以`MAINTAINER`被废弃了

  父镜像的标签会被继承，但是如果有子镜像有相同的标签，会覆盖父镜像

* 创建环境变量，后续命令使用变量通过$key使用【如果value中需要有空格，需要使用` \空格`转译】

  ```dockerfile
  ENV <key>=<value>  #单个键值对，可省略等于号
  #或者 
  ENV <key1>=<value1> <key2>=<value2>
  ```

* 运行镜像时，将文件复制到容器中

  指定`<src>`地址时，如果使用通配符，遵循Go语言的 [filepath.Match](https://golang.org/pkg/path/filepath#Match) 规则

  指定`<dist>`时：

  * 如果`<src>`是 URL 并且`<dest>`不以斜杠结尾，则从 URL 下载文件并复制到`<dest>`。如果以斜杠结尾，则从 URL 推断文件名并将文件下载到 `<dest>/<filename>`

  * `<dist>`是相对路径

    ```shell
    COPY test.txt relativeDir/   #将“test.txt”添加到<WORKDIR>/relativeDir/下
    ```

    是绝对路径

    ```dockerfile
    COPY test.txt /absoluteDir/  #将“test.txt”添加到/absoluteDir/下
    ```

  * 如果`<src>`是目录，则复制目录的全部内容，包括文件系统元数据。目录本身没有被复制，只是它下面的内容

  ```dockerfile
  COPY <src> <dest> #将本地src路径下的文件，复制到容器的dest路径下
  
  ADD <src> <dest> #和COPY功能类似，不过src可以是网络文件下载链接或者是压缩文件，ADD会去下载和解压相应文件，然后放到容器的dest路径下
  ```

* 设置docker容器的工作路径，后续指令都会在该路径下执行。不设置，默认为`/`根目录

  ```dockerfile
  WORKDIR /path/to/workdir
  ```

  可以在其中使用ENV定义的变量

  ```dockerfile
  WORKDIR $path/a  #ENV path=/my ，最终就是/my/a
  ```

* 执行命令

  CMD 指令只能一个（dockerfile文件中如果有多个，只执行最后一个），是容器启动后执行的命令，一般用作程序的入口。如果还需要运行其他命令可以用 && 连接，也可以写成一个shell脚本去执行。例如` CMD cd /app && ./start.sh`

  ```dockerfile
  CMD ["executable","param1","param2"]
  ```

  RUN命令可以有多个，可以用 && 连接多个命令来减少层级。例如 `RUN npm install && cd /app && mkdir logs`

区别：

RUN 运行会在原镜像的基础上创建一个新的镜像

CMD和ENTRYPOINT定义的命令不管多少条，只会执行最后一条定义的命令

docker run命令会覆盖CMD命令，但是不会覆盖ENTRYPOINT命令

## 制作镜像

* 在项目根目录新建`dockerfile`文件

  我直接新建了一个vue项目，在项目根目录新建`dockerfile`文件（记得把node_module文件夹删除，否则构建镜像会非常慢）

  ```shell
  FROM node:14
  MAINTAINER heyingjie
  
  # 将根目录代码复制到容器的/app文件夹
  ADD . /app
  
  # 设置容器启动后的默认运行目录为/app
  WORKDIR /app
  
  # 运行命令，安装依赖
  RUN npm install
  
  #启动
  CMD npm run serve
  ```
  
* 将本地项目构建为docker镜像

  ```shell
   # 项目目录下
   docker build -t test:v1 .
   
   # 镜像名命名为test，镜像版本号为v1 
   # "."代表build代码的位置是当前目录
  ```

   `-t` 设置镜像的名字和版本号

  构建镜像成功后，在`Images`选项卡下可以看到刚才build的`test镜像`，版本是`v1`

  ![image-20220131162444354](https://gitee.com/hyj1270433876/blog-img/raw/master/Docker/image-20220131162444354%20.png)

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
  
  ![image-20220131162728197](https://gitee.com/hyj1270433876/blog-img/raw/master/Docker/image-20220131162728197%20.png)
  
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

  ![image-20220131174402473](https://gitee.com/hyj1270433876/blog-img/raw/master/Docker/image-20220131174402473%20.png)

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

![image-20220131175740173](https://gitee.com/hyj1270433876/blog-img/raw/master/Docker/image-20220131175740173%20.png)

Mounts左侧是容器内路径，右侧是该容器内路径对应的本地路径（两种方式挂载目录都是在这里查看）

![image-20220131175842309](https://gitee.com/hyj1270433876/blog-img/raw/master/Docker/image-20220131175842309%20.png)



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

  ![image-20220201115026305](https://gitee.com/hyj1270433876/blog-img/raw/master/Docker/image-20220201115026305%20.png)

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

  ![image-20220201184423220](https://gitee.com/hyj1270433876/blog-img/raw/master/Docker/image-20220201184423220%20.png)

  

* 上传本地镜像到远程仓库
  
  ```shell
  docker push username/imagename:tag
  ```
  
  可以在网站看到上传的镜像
  
  ![image-20220201191854211](https://gitee.com/hyj1270433876/blog-img/raw/master/Docker/image-20220201191854211%20.png)
  
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
  
  ![image-20220201182741745](https://gitee.com/hyj1270433876/blog-img/raw/master/Docker/image-20220201182741745%20.png)
  
  ![image-20220201182948588](https://gitee.com/hyj1270433876/blog-img/raw/master/Docker/image-20220201182948588%20.png)

**阿里云容器镜像服务**

由于官方镜像在国内速度缓慢，所以也可以把镜像托管在阿里云，进去阿里云官网，搜索"容器镜像服务"，按照指示创建远程镜像

![image-20220201193140481](https://gitee.com/hyj1270433876/blog-img/raw/master/Docker/image-20220201193140481%20.png)

## 备份和迁移数据

**区分目录挂载的方式**

* 如果使用`bind mount`直接把宿主机的目录挂进去容器，那迁移数据很方便，直接复制目录就好了
* 如果使用`volume`方式挂载的，由于数据是由容器创建和管理的，需要用特殊的方式把数据弄出来。

**备份和导入 Volume 的流程**

备份：

- 运行一个 ubuntu 的容器，挂载需要备份的 volume 到ubuntu容器，并且挂载宿主机目录到容器里的备份目录。

- 运行 tar 命令把容器中的/data/下的数据压缩为一个文件，压缩后的文件放在备份目录下

  ![image-20220202112934341](https://gitee.com/hyj1270433876/blog-img/raw/master/Docker/image-20220202112934341%20.png)

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

  ![image-20220201202158663](https://gitee.com/hyj1270433876/blog-img/raw/master/Docker/image-20220201202158663%20.png)

  然后，运行到容器

  ![image-20220201202309759](https://gitee.com/hyj1270433876/blog-img/raw/master/Docker/image-20220201202309759%20.png)

  同时能看到名为 mongo-data 的Volume

  ![image-20220201201908518](https://gitee.com/hyj1270433876/blog-img/raw/master/Docker/image-20220201201908518%20.png)

  这里可以看到mongo的volume数据都是放在容器的/data/目录下

  ![image-20220202113710096](https://gitee.com/hyj1270433876/blog-img/raw/master/Docker/image-20220202113710096%20.png)

* 使用以下命令

  ```shell
  docker run --rm --volumes-from mongo -v /Users/yc/Desktop/backup:/backup ubuntu tar cvf /backup/backup.tar /data/
  ```

  * `--volumes-from mongo`将mongo的所有Volume挂载到ubuntu容器，mongo中Volume数据在容器的/data/下，挂载到ubuntu下也是在/data/下

  * `-v /Users/yc/Desktop/backup:/backup` 使用bind mount，将本地目录`/Users/yc/Desktop/backup`挂载到ubuntu容器内的`/backup`目录

    ![image-20220202111635697](https://gitee.com/hyj1270433876/blog-img/raw/master/Docker/image-20220202111635697%20.png)

  * `tar cvf /backup/backup.tar /data/` 压缩/data/，将压缩包命名为backup.tar放在/backup/backup.tar下。这里可以看出来，在压缩命令中使用的容器内地址

  * `--rm`ubuntu容器运行完，直接删除容器

* mongo的Volume备份到了宿主机的`/Users/yc/Desktop/backup`目录下，可以看到多了一个`backup.tar`文件

  ![image-20220202104939629](https://gitee.com/hyj1270433876/blog-img/raw/master/Docker/image-20220202104939629%20.png)

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

## 常用命令

**镜像(images)相关**

`docker build -t 镜像名:镜像版本号 . ` 构建镜像

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

**容器相关**
`docker ps` 查看当前运行中的容器
`docker rm container-id` 删除指定 id 的容器
`docker stop/start container-id` 停止/启动指定 id 的容器
`docker rmi image-id` 删除指定 id 的镜像

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

**docker命令大全**

![dockerimg](https://gitee.com/hyj1270433876/blog-img/raw/master/Docker%E7%9B%B8%E5%85%B3/dockerimg%20.jpeg)

图中还差 `docker commit [容器名/容器id][镜像名:版本号]`未提及，其核心功能就是把正在运行的容器，构建为一个新的镜像【注意：容器必须是运行状态】

同样是构建镜像[docker commit 和docker build的区别 ](https://blog.csdn.net/alwaysbefine/article/details/111375658)是什么？

* commit 是把 容器——>镜像
* build 是把 镜像/源码——>镜像

`docker info` 查询docker的信息，Registry字段为docker的镜像源

## 云服务器使用Docker

[阿里云Docker环境的快速搭建](https://developer.aliyun.com/adc/scenario/9fd79b8711984e309f20d82bc65a26fa?spm=a2c6h.19776329.J_1495128370.10.658b3d80jQ9uN9)

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

Docker的默认官方远程仓库是hub.docker.com，由于网络原因，下载一个Docker官方镜像可能会需要很长的时间，甚至下载失败。为此，阿里云容器镜像服务ACR提供了官方的镜像站点，从而加速官方镜像的下载。下面介绍如何使用阿里云镜像仓库。

* 访问云容器镜像服务控制台，复制加速器地址

  ```text
  https://cr.console.aliyun.com/
  ```

  ![image-20220317141320392](https://gitee.com/hyj1270433876/blog-img/raw/master/Css%E7%9B%B8%E5%85%B3/image-20220317141320392%20.png)

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

### 使用Docker安装Nginx服务

* 查看Docker镜像仓库中Nginx的可用版本

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

我们可以在官方镜像仓库上传自己的镜像，然后再连接远程服务器的docker，将镜像pull下来，然后run







