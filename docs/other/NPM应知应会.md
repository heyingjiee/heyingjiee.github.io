# NPM

![image-20220621235625583](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/npm/20220621235625%20.png)

## 简介

npm的全称是Node Package Manager，是一个NodeJS包管理和分发工具

npm分为两个部分：

- npm的官方网站（https://www.npmjs.com/）

  ![image-20220621234539590](/Users/yc/Library/Application Support/typora-user-images/image-20220621234539590.png)

  

- 命令行工具 (CLI)

  下载Node时，默认自带一个npm工具，用来做包管理。

  安装后，就可以在终端直接使用npm cli工具，通过命令来完成一些操作

  ![image-20220621234649923](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/npm/20220621234650%20.png)

npm工具的基本使用可以看下中文[npm 中文文档](https://www.npmjs.cn/)



## CLI基本命令

###  初始化npm包目录

在需要使用npm包的项目根目录下，使用

```
npm init 
```

回答几个问题后，生成一个package.json文件，这个文件用来定义项目需要的各种模块，以及项目配置信息；

也可以使用，自动填写默认的信息

```shell
npm init -y 
```



package.json中各个字段的含义（仅name和version是必须的）

[官方文档](https://docs.npmjs.com/cli/v8/configuring-npm/package-json)对各个字段的解释

```json
{
  //----基本信息----
  "name": "npmTest",  //包名
  "description": "",  //包的描述
  "version": "1.0.0", //包的版本
  "repository": { //指定代码存放位置，设置好后，项目推送到远程地址时可以只是用 npm publish
    "type": "git",
    "url": "https://github.com/monatheoctocat/my_package.git"
  },
  "keywords": [], //关键字，方便npm search查询；
  "author": "",  //包的作者信息，简单使用作者名或详细信息{ "name": "作者名", "email": "邮箱", "url":"个人网址" }
  "contributors":"", //包的贡献者信息，同上不过详细详细是数组[{},{}]
  "license": "ISC", //包所遵循的协议
  "bugs": {//方便用户提交项目问题的url 或邮件地址；
    "url": "xxxx",
    "email" : "xxxx"
  },
  "homepage": "xxxx", //项目官网url地址
  "engines":{//指定包支持的 node 或 yarn 的工作版本
  	"node": ">=13.14.0",
    "yarn": ">=1.22.0"
	 },
  //----发布npm包相关----
  "private":true, //设置true时，该npm包不会被发布
   publishConfig:{},
  
  //----自定义脚本相关----
  "scripts": {
    "xxx": "shell脚本"  //可在项目下通过npm run xxx，来执行shell脚本。多句脚本使用&&连接
  },
  
  //----开发依赖信息----
  "dependencies": {//打包到生产环境的依赖
    "axios": "^0.19.0" //例子
  },
  "devDependencies": {},//开发依赖
  "peerDependencies": {},//相对依赖
  
  //----入口文件----
  "main":"xx/xx/xx", //配置模块的入口文件，这应该是一个相对于根目录的文件路径，默认值是项目根目录下的index.js
  "module":"xx/xx/xx", //在es6环境下，入口文件
  "browser":"xx/xx/xx", //浏览器环境下，入口文件
  
  
  "bin":"", //配置一个或多个可执行的文件；
  "man":"", //指定一个单一的文件或者一个文件数组供man程序使用
  
  
}
```

**发布npm包相关**

发布到npm私服

```json
"private":true,
"publishConfig":{
  "tag":"1.0.0",
  "registry":"https://xxxx.xxx.com/",
  "access":"public"
}
```



**开发依赖信息中的依赖字段**

版本号格式：***大版本.次要版本.小版本***

* `~1.2.2`，表示安装1.2.x的最新版本（不低于1.2.2），但是不安装1.3.x

* `ˆ1.2.2`，表示安装1.x.x的最新版本（不低于1.2.2），但是不安装2.x.x

  需要注意的是，如果大版本号为0，则与波浪号相同，这是因为此时处于开发阶段，即使是次要版本号变动，也可能带来程序的不兼容。

* latest：安装最新版本。

**bin字段**

```json
"bin": { "hdd": "xxx/xxx.js" }
```

当本地安装含有这个package.json配置文件的npm包时，npm会在`./node_modules/.bin/`目录下建立符号链接(快捷方式)，即hdd

执行`npm run hdd`的时候，会自动将`./node_modules/.bin/`加入系统的PATH变量，直接通过命令来调用`xxx/xxx.js`这个脚本

脚本文件需以`#!/usr/bin/envnode`开头

**入口文件相关**

Webpack配置中的`mainFields`就是用来解析模块的，默认会按照顺序解析browser、module、main字段

### npm源与nrm 

**方式一：修改默认源地址**

使用npm下载一些npm包时，由于一些原因，官方的默认软件源地址（https://registry.npmjs.org/）下载速度比较慢，甚至出现下载失败的情况

所以，我们可以写改官方的源地址为淘宝的镜像源地址（https://registry.npm.taobao.org/）

```shell
#全局修改源地址
npm config set registry https://registry.npm.taobao.org

#临时修改
npm install @vue/cli --registry=https://registry.npm.taobao.org
```

查看当前npm CLI设置的源地址

```shell
npm config get registry
```

**方式二：nrm**

修改源地址后虽然下载速度变快了，但是我们就不能直接将自己的npm包发布到https://registry.npmjs.org/了

所以使用nrm工具，可以方便的切换不同源

```shell
# 安装全局 nrm 工具
npm install -g nrm
 
# 设置环境及其对应的源
# nrm add 环境名称 源地址
# 设置一个环境，来代表标准的 npm 源
nrm add npm https://registry.npmjs.org
# 设置一个环境，代表淘宝镜像源
nrm add taobao https://registry.npm.taobao.org
 
# 切换当前源环境
nrm use 环境名

# 查看当前配置的所有环境和源
nrm ls
```

### 本地npm包管理

**npm域级包**

npm以包名作为唯一标识，不能有重名包，这就导致了自己喜欢的名字，可能已经被占用了。

所以，在npm的包管理系统中，有一种scoped packages机制，用于将一些npm包以`@scope/package`的命名形式集中在一个命名空间下面，实现域级的包管理。比如我们用vue脚手架搭建的项目，里面就有`@vue/cli-plugin-babel`、`@vue/cli-plugin-eslint`等等都是在@vue下的域名包

初始化：

```js
npm init --scope=@xxx //和正常创建包一样，需要回答些问题。注意包名是：@xxx/yyy
```

安装：

```js
npm install @xxx/yyy
```

相同域级范围内的包会被安装在相同的文件路径下，比如：node_modules/@xxx下，截图是一个项目中在@vue域下的包

![image-20220704101829101](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/20220704101829%20.png)

代码中引用同域下其他包

```js
require("@xxx/zzz")
```

发布域级包：发布的包是域级包，默认为私有发布，可以指定公开发布

```
npm publish --access=public


//或者在package.json的publishConfig字段进行配置
```



**安装npm包**

```shell
npm install  <package>
```

这里的`<package>`，就是要下载的npm包名。只不过，它有以下几种形式 

```shell
npm install [<@scope>/]<name>  #包名，默认下载最新版本的包
npm install [<@scope>/]<name>@<tag>  #指定包的某个tag
npm install [<@scope>/]<name>@<version> #指定包的某个版本号
npm install [<@scope>/]<name>@<version range> #指定包的版本号范围
```

安装的npm包存放位置两种形式

* 全局安装

  安装到全局，并自动添加环境路径，可以直接在终端里使用下载的npm包的命令

  ```shell
  npm install -g xxx
  ```

  查看npm全局安装的位置

  ```shell
  npm root -g
  ```

* 当前目录安装（默认）

  安装的npm包又分为几种形式

  **安装生产依赖**（默认）

  ```
  npm install xxx 
  ```

  **安装开发依赖**

  ```shell
  npm install -d xxx 
  ```

  

  会在当前目录生成

  ```shell
  node_modules文件夹：存放下载的npm包
  
  package.lock文件 ：存储下载的包的地址信息
  ```

  注意：安装到本地的包，不会添加到环境变量中，想要使用只能通过`npm run xxx`来执行 `node_module/.bin`中生成的命令

  

**卸载npm包**

卸载项目中的npm包（项目目录下执行）

```shell
npm uninstall <package> 
```

卸载全局npm包

```shell
npm uninstall  -g <package> 
```

**更新npm包**

不加`-g`就是更新当前项目目录的npm

查看全局包是否过时

```shell
npm outdated -g --depth=0.
```

![image-20220622002118640](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/npm/20220622002118%20.png)

更新指定的全局安装的npm包

```shell
npm update -g <package> 
```

更新所有全局安装的npm包

```shell
npm update -g.
```

### 查找远程包信息

以glup包为例子

**查看glup包信息**

```
npm view glup
```

![image-20220622094256547](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/npm/20220622094257%20.png)

**查看glup包版本信息**

```shell
npm view glup versions #所有版本号

npm view glup version #最新版本号
```

### 登陆与发布

**登陆**

登陆时会提示登录的源地址，注意想要登陆官方的npm仓库，需要使用官方源

```js
npm login
```

![image-20220622122821691](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/npm/20220622122822%20.png)

**发布**

根据当前登陆的源地址，发布到对应npm服务器

```shell
npm publish
```

最后的一行为包名和版本，这个是根据package.json的name、version字段来定义的

![image-20220622133358266](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/npm/20220622133358%20.png)

## 小程序npm包

https://developers.weixin.qq.com/community/develop/article/doc/00064c9644c6201dccfade2db51813