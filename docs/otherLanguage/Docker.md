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

| 镜像加速器          | 镜像加速器地址                          |
| ------------------- | --------------------------------------- |
| Docker 中国官方镜像 | https://registry.docker-cn.com          |
| DaoCloud 镜像站     | http://f1361db2.m.daocloud.io           |
| Azure 中国镜像      | https://dockerhub.azk8s.cn              |
| 科大镜像站          | https://docker.mirrors.ustc.edu.cn      |
| 阿里云              | https://<your_code>.mirror.aliyuncs.com |
| 七牛云              | https://reg-mirror.qiniu.com            |
| 网易云              | https://hub-mirror.c.163.com            |
| 腾讯云              | https://mirror.ccs.tencentyun.com       |

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

`--name` 指定容器的名字为 some-redis

`-d `在后台运行



安装完毕后，打开docker客户端，发现`Images`选项卡下可以看到安装的redis镜像

![image-20220130175831031](https://gitee.com/hyj1270433876/blog-img/raw/master/Docker/image-20220130175831031%20.png)

`Container/Apps`选项卡下也能看到安装的容器 ，注意这里的`some-redis`就是安装命令中起的容器名

![image-20220130180014543](https://gitee.com/hyj1270433876/blog-img/raw/master/Docker/image-20220130180014543%20.png)

## 制作自己的镜像

* 在项目根目录新建`dockerfile`文件

  我直接新建了一个vue项目，在项目根目录新建`dockerfile`文件（记得把node_module文件夹删除，否则构建镜像会非常慢）

  dockerfile文件文档 [Dockerfile reference](https://docs.docker.com/engine/reference/builder/#run)
  
  ```shell
  FROM node:14
  MAINTAINER heyingjie
  
  # 将根目录代码复制到容器的/app文件夹
  ADD . /app
  
  # 设置容器启动后的默认运行目录为/app
  WORKDIR /app
  
  # 运行命令，安装依赖
  # RUN 命令可以有多个，但是可以用 && 连接多个命令来减少层级。
  # 例如 RUN npm install && cd /app && mkdir logs
  RUN npm install
  
  # CMD 指令只能一个，是容器启动后执行的命令，算是程序的入口。
  # 如果还需要运行其他命令可以用 && 连接，也可以写成一个shell脚本去执行。
  # 例如 CMD cd /app && ./start.sh
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
