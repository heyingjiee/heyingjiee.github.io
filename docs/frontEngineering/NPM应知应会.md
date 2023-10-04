# NPM

![image-20220621235625583](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/npm/20220621235625%20.png)

## 简介

npm的全称是Node Package Manager，是一个NodeJS包管理和分发工具

npm分为两个部分：

- npm的官方网站（https://www.npmjs.com/）

  ![image-20220621234539590](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/NPM20220920014054%20.png)

  

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

### npm源与nrm 

**方式一：修改默认源地址**

使用npm下载一些npm包时，由于一些原因，官方的默认软件源地址（https://registry.npmjs.org/）下载速度比较慢，甚至出现下载失败的情况

所以，我们可以写改官方的源地址为淘宝的镜像源地址（https://registry.npm.taobao.org/）

```shell
#全局修改源地址
npm config set registry https://registry.npm.taobao.org
#修改指定域地地址，从哪里拉取
npm config set @armor:registry http://npm.yiche.com/registry/

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

## package配置文件

### 字段含义

package.json中各个字段的含义（仅name和version是必须的）

[官方文档](https://docs.npmjs.com/cli/v8/configuring-npm/package-json)对各个字段的解释

中文版参考：[中高级前端必须掌握的package.json最新最全指南](https://juejin.cn/post/7240805459288522808#heading-59)

注意字段含义很大程度上读取该字段的程序，比如Node、Vue-cli，所以有很多非NPM官方的字段

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
   publishConfig:{
     	//发布到npm上后，发布的文件中package.json的main、typings字段下，会被替换为下面的字段
      "main": "dist/index.js", //发布后的包的入口文件（比如，项目打包后再dist文件夹，这里就设置dist文件夹下的入口）
      "typings": "lib/index.d.ts" //类型文件
   },
  
  //----自定义脚本相关----
  "scripts": {
    "xxx": "shell脚本"  //可在项目下通过npm run xxx，来执行shell脚本。多句脚本使用&&连接
  },
  
  //----开发依赖信息----
  "dependencies": {//打包到生产环境的依赖
    "axios": "^0.19.0" //例子
  },
  "devDependencies": {},//开发依赖
  "peerDependencies": {},//同级依赖。比如包A依赖于包B，可以在包A中设置包B为同级依赖，当用户下载包A，必须要单独下载包B才行
  
  //typescript 的声明文件(非 NodeJS 官方的字段)
  "typings": "./dist/index.d.ts", 
  
  //----入口文件----
  "main": "./dist/index.js", // 用于 CommonJS 规范的模块加载器。比如你用 require 导入时，默认情况下都是从这里进入的。
  
  "module": "./dist/esm/index.js", // 用于 ES Modules 规范的模块加载器。非 NodeJS 官方的字段，所以 NodeJS 并不识别该字段。它主要被各大打包工具（比如 Rollup、Webpack）识别并使用。并且不支持 .mjs 后缀的文件。相关文档：https://github.com/rollup/rollup/wiki/pkg.module
  
  "type": "module", //Node环境中支持该字。可选字段：module、commonjs 。描述该包的格式类型，决定是否将 .js 文件加载为 CJS 或 ESM 的格式
  
  "exports": { //Node环境中支持该字段。 条件导出。作用和 main/module 作用差不多，只不过支持条件导出优先级大于 main 等高级用法
    ".": {
      "require": "./dist/index.js", // 当使用 CJS 导入模块时，会从此入口查找。
      "import": "./dist/esm/index.js" // 当使用 ESM 导入模块时，会从此入口查找。
    }
  }
  
  //-----命令--------
  "bin":{//配置命令
    "my-script": "./my-script.js" //全局安装该包后，可以使用my-script。例如eslint包按照在全局后我们就可以使用eslint命令
  }, 
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

脚本文件需以`#!/usr/bin/env node`开头（#!/usr/bin/env node 到底是什么？https://juejin.cn/post/6844903826344902670）

**workspace**

```json
"private":"true",

"workspaces": [
   "packages/*" 
]
```

创建子包 p1

```js
npm init -w packages/p1 -y
```

在node_modules/.package-lock.json中可以看到 "link": true 链接符号信息

新建packages/p1/index.js

```js
module.exports = "p1包";
```

创建子包p2

```js
npm init -w packages/p2 -y
```

将子包p1添加到p2中

```js
npm i p1 -w p2
```

安装，卸载等命令都是一样的，只是多了"--workspace="参数（简写-w），用来指定在哪个包中执行命令

子包p2使用p1

```js
const p1 = require("p1");

console.log("使用", p1);

module.exports = "p2包";
```

### 简单案例

```json
{
  "name": "tasks",
  "version": "1.0.0",
  "description": "自己的npm库",
  
  
  "main": "dist/legacy/index.js",
  "module": "dist/es/index.js",
  "types": "dist/types/src/index.d.ts",
  "type": "module",  //指定使用ESM。可以不设置main字段，main字段用来指定使用commandjs加载器进行加载的入口。设置了可以更好的提供commanjs的兼容性
  
  
  "author": "hedaodao",
  "license": "MIT",
  "files": [
    "dist"
  ],
  "keywords": [
    "h5",
    "my"
  ],
  "scripts": {
    "build": "xxx"
  },
  "devDependencies": {
    "typescript": "^5.1.3"
  },
  "repository": {
    "type": "git",
    "url": "git仓库地址"
  },
  "homepage": "github主页"
}
```



## 模块化规范

推荐文章[前端模块化详解(完整版)](https://segmentfault.com/a/1190000017466120)

JS 最初设计的目的，仅仅是为了完成一些简单的功能，但是随着前端工程化成为一种趋势，前端项目慢慢开始承载更多更复杂的功能，将单一 JS 文件划分模块的需求也愈发强烈

但是，由于ES6出现之前，JS一直没有统一的模块化规范，所以出现了很多非官方的模块化规范，例如：AMD规范、CMD规范 、CommonJS规范

也正是由于这个历史原因导致前端的模块化规则非常混乱：

* 模块化规范有： CommonJS规范、ESM规范（AMD规范、CMD规范这两种已经被淘汰这里不做考虑）

* 环境有：浏览器和Node两种环境。在两种环境中，【打包工具（Vue是webpack）、Node工具】通过读取package的配置字段，来进行区分项目的模块化规范，但是它们使用的package配置字段又是不同的非官方字段
* 即使你的项目确定只使用一种规范，项目中引入依赖包也可能使用的是其他规范

而我们发布/使用的npm包，可能支持一种或两种规范，一种或两种环境，这就产生了好几种组合，而且不同环境下package配置文件字段也不同，这就进一步加剧复杂度



### 浏览器环境

浏览器环境推荐使用ESM模块化。区分使用ESM、CJS主要是通过package.json字段

**支持ESM模块规范**

开发网页时，多使用各种打包工具，webpack等打包工具优先读取package.json中的module字段（优先级module字段>main字段，所以使用module字段）

```json
{
  "name": "包名称",
  "version": "1.0.0",
  "description": "描述信息",
  "module": "./dist/esm/index.js",
}
```

**支持CJS模块规范**

使用main字段

```json
{
  "name": "包名称",
  "version": "1.0.0",
  "description": "描述信息",
  "main": "./dist/index.js" // CJS 格式的导出
 }
```

### Node环境

启用支持ESM：在`package.json`中加个`"type": "module"` 字段。或者在main字段指定文件后缀命名为`.mjs` ，自动启动ESM

启用支持CJS：默认为CJS（即默认为`"type": "commonjs"` 字段），在`package.json`中设置**main字段**或**exports字段**指定模块入口



**使用ESM模块规范**

```json
{
  "name": "包名称",
  "version": "1.0.0",
  "description": "描述信息",
  "type": "module",
  "main": "./dist/index.js",
}
```

或

```json
{
  "name": "包名称",
  "version": "1.0.0",
  "description": "描述信息",
  "main": "./dist/index.mjs"
}
```

**使用CJS模块规范**

默认启用CJS

```js
{
  "name": "包名称",
  "version": "1.0.0",
  "description": "描述信息",
  "main": "./dist/index.js"
}
```

**使用ESM+CJS**

使用exports字段

```json
{
  "name": "包名称",
  "version": "1.0.0",
  "description": "描述信息",
  "exports": {
    "import": "./dist/esm/index.mjs",
    "require": "./dist/index.js"
  }
}
```



### 浏览器+Node环境

**使用ESM模块规范 **

```json
{
  "name": "包名称",
  "version": "1.0.0",
  "description": "描述信息",
  "main": "./dist/index.js",
  "module": "./dist/index.js", //浏览器环境，打包工具优先读取这个，知道入口文件
  "exports": {
    "import": "./dist/index.js"//Node端通过这个知道入口文件
  },
  "type": "module"//Node端通过这个知道启用ESM
}
```

**使用CJS模块规范**

Node端默认CJS，浏览器端通过main指定

```JS
{
  "name": "包名称",
  "version": "1.0.0",
  "description": "描述信息",
  "main": "./dist/index.js" 
}
```

## npm create xxx

我们常见的

```
npm create vite my-project-name
```

其中的`npm create`其实是`npm init`的别名

`npm init xxx` 是一种约定的命令格式，用于初始化特定类型的项目或生成项目模板，这里的 `xxx` 是指特定的脚手架或工具名称。

当运行 `npm init xxx` 命令时，它会查找名为 `create-xxx` 或 `generator-xxx` 的包，并执行其中的初始化脚本，从而生成项目文件结构、配置文件或其他相关内容。

初始化脚本指的是package.json中的bin字段指定的脚本，如果没有则会执行 `main` (commonjs)、`module`(ESM)字段指定的脚本

**例如**

```
npm create vite my-project-name
```

其实就是使用 `create-vite`工具，执行其入口脚本。`my-project-name`是脚本的参数，这部分就由你使用的工具来定义了



**注意**

create-xxx是包名部分

如果是创建域名包，即`@yyy/create-xxx`。

```shell
npm init #创建项目，指定项目名：@hedaodao/create-scaffold
```

使用该包初始化项目

```
npm create @hedaodao/scaffold xxx
```





## nvm

官方仓库https://github.com/nvm-sh/nvm

**1、删除全局node_modules文件夹**

```shell
sudo rm -rf /usr/local/{bin/{node,npm},lib/node_modules/npm,lib/node,share/man/*/node.*}
```

**2、安装nvm**

安装前确定先home下得有bash（`.bash_profile`）或者zsh（`.zshrc`）的配置文件，执行对应命令时才能自动添加到环境变量中

bash

```shell
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```

zsh

```shell
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | zsh
```

**3、常用命令**

```shell
nvm -v  #查看nvm版本

nvm list  #查看本地nvm下载的node的列表

nvm install xxx #下载指定版本的node(可以只指定大版本) ，例如 nvm install 12 就会下载node 12.x.x的某个版本

nvm use xxx #使用指定版本
```

**注意**

新款的m1芯片的macbook，只支持到node16.0.x版本以后，如果想要安装node16.0.x以前的node版本

请参照[官网](https://github.com/nvm-sh/nvm#problems)的**Macs with M1 chip**这部分内容，使用Rosetta 2进行转义

## pnpm

### 出现背景

npm、yarn等包管理工具存在一个问题，每个项目下的依赖都安装在项目下的node_modules中，这会出现一个问题：本地有100个项目，每个项目都依赖Vuex这个库，那就安装100份，极大的占用内存

pnpm最重要的是解决了这个问题

### 介绍

[pNpm中文网](https://pnpm.io/zh)

网站截图：图中总结了其4大优势

![image-20221030173143193](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20221030173143%20.png)

目前Vue已经使用开始pNpm了，越来越多公司也迁移到了pNpm

安装pNpm

```shell
npm install -g pnpm 
```

### 硬链接与软链接

**拷贝**

只能用于文件，不能用于目录

两个文件是独立的文件，修改其一，不会影响另一个

```shell
cp a.js a_copy.js #将a.js文件拷贝一份新的文件，并命名为a_copy.js
```

**硬链接**

只能用于文件，不能用于目录

两个文件指向同一块内存数据，修改其一，另一个也会变化。删除其一，另一个仍然可以找到文件

![image-20221030191054999](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20221030191055%20.png)

```shell
ln a.js a_hard.js #对a.js指向的数据，建立硬链接。这里注意下，两个硬链接是一样的没有任何区别的，都指向同一块数据
```

**软链接/符号链接**

文件、目录均可建立软链接。为目录建立软链接，其中的文件和原目录中的文件是同一个，删除其一，另一个也会删除

类似于快捷方式，软链接记录的是**文件的路径地址**

```shell
ln -s a.js a_soft.js
```

### node_modules非扁平结构

以安装的axios为例子

* npm、yarn

  ```shell
  npm install axios
  ```

  可以看到axios包自身依赖的其他包，被放到了axios的同级目录了。不设计成放到axios目录下，是为了避免某两个项目直接依赖的包，他们再同时依赖同一个包A，如果设计成层级结构，就会重复下载两次包A

  ![image-20221030202024878](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20221030202025%20.png)

* pnpm 

  ```shell
  pnpm add axios
  ```

  只有项目直接依赖的包才放在node_modules的第一层目录，且放置的仅是软链接，真实位置在`.pnpm`下

  在`.pnpm`文件下是扁平结构，但是其下的`axios@1.1.3`下仍然有node_modules文件夹，只不过其中的也是软链接，指向`.pnpm`的第一层目录

  ![image-20221030204832436](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20221030204832%20.png)

### 节省存储空间

pNpm对于同一依赖的相同版本仅存储一份。每个项目中使用的依赖最终都是硬链接

```
pnpm add axios
```

### 支持monorepo

[pnpm monorepo快速入门精简版，从开发到打包完整教学视频](https://www.bilibili.com/video/BV1R14y157Za/?spm_id_from=autoNext&vd_source=e46d9099be60057b5a16a45fac0d5248)

一个Git仓库，包含多个子项目，可以将公用的部分抽离出来

公用的部分可以像npm包一样，使用`pnpm add xxx`的方式，方便的安装到多个子项目中

公司内部的实践项目：开发插件系统，每个插件都是一个子项目，抽离到公共的目录中。示例项目中可以直接安装公共目录的插件做演示。也可以方便的将插件发布到npm上，其他业务线的项目可以通过npm下载安装使用统一的插件

**实践**

新建`pnpm-workspace.yaml`，用来配置工作区和包目录

```yaml
packages:
  # 项目工作区
  - 'packages/*'
  
  # 包目录（包目录中项目，会被自动链接到工作区，在工作区使用pnpm add xxx即可安装到工作区）
  - 'components/**'
  - 'api/**'
  
  # 使用！排除包目录中的文件夹
  - '!**/test/**'
```



```shell
# -f指定子包，在子包中安装依赖h-ui-plus-components。如果workspace有这个包直接安装本地包，没有去npm下载安装
pnpm add  h-ui-plus-components --filter h-ui-plus-docs (package的name字段)

#在path下执行命令，可以在不切换目录的情况下，执行子包的命令。commond是在script字段下定义的命令
pnpm -C <path> <command> 
pnpm --filter h-ui-plus-components <command> # 也可以直接用子包名
 
pnpm up #升级依赖
```



### pnpm常用命令

依赖安装相关

```shell
pnpm init
pnpm install
pnpm add <package>
pnpm remove <package>
pnpm <command>
```

查看包相关

```shell
# 展示包的详细信息
pnpm show <package>

# 展示包的所有版本
pnpm show <package> versions

# 展示哪些包依赖于<package-name>
pnpm why <package-name>
```

pnpm会把所有项目的依赖建立一份硬链接放到自己的目录下，查看存储目录

```shell
pnpm store path
```

如果某个依赖已经没有项目再用了，可以使用下面的命令，将其的硬链接从存储目录中删除

```shell
pnpm store prune
```

## 上传包到npm

查看源

```shell
npm config get registry
```

如果不是`https://registry.npmjs.org`或者没返回，就将npm的源改为官方源

```shell
npm config set registry=https://registry.npmjs.org
```

登陆官方仓库

```
npm adduser
#输入用户名和密码 
```

发布npm包（发布的是构建的目录，就是这里的dist文件夹下的内容）

```shell
npm publish  # 如果推不上去，一般是包的名字和npm仓库中其他包的名字重复了
```

npm官网登陆自己的账户，就能看到这个包了

![image-20220320201043339](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Vue%E7%9B%B8%E5%85%B3/image-20220320201043339%20.png)

## 简单组件库

**新建vue项目**

使用vue-cli脚手架，生成一个项目

```shell
vue create hello-world
```

在项目src目录下新建

```text
hello-world
		|-src
 			|--packages #组件目录
            |--hdd-button # hdd-button组件文件夹
                  |--index.vue
            |--index.js  # 入口文件
```

在index.vue中添加

```vue
<template>
  <div>
    <button class="hdd-btn">hdd按钮</button>
  </div>
</template>

<script>

export default {
  name: 'hdd-button',
  data() {
    return {}
  },

}
</script>

<style  scoped>
.hdd-btn{
  width: 100px;
  height: 50px;
  background: #eeeeee;
  border-radius: 5px;
  border: unset;
}

</style>
```

index.js

```js
import HddButton from "@/packages/hdd-button/index.vue";
const componentList=[HddButton]
const install=function (Vue, options){
    componentList.forEach(component=>{
        Vue.component(component.name,component)
    })

}
export default install //使用组件时，Vue.use(xxx) ,自动调用install方法，我们在这个方法中，使用Vue.component进行全局组册注册
```

**构建**

在项目根目录中的package.json中添加脚本，并运行 `npm run build:packages `

```json
"scripts": {
    "build:packages":"vue-cli-service build --target lib ./src/packages/index.js --dest ./src/packages/dist/ --name=hdd2"
}
```

```text
build   #构建
--target lib <src>   #构建<src>的文件为一个库
--dest <dest> #输出目录
--name #构建的文件名
```

在输入目录下，执行，新建一个package.json

```shell
npm init -y #生成package.json文件

#修改name字段，这个字段会成为上传后的包名。这里改为 "hdd-test1"
```



![image-20220320200541253](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Vue%E7%9B%B8%E5%85%B3/image-20220320200541253%20.png)

**上传npm包**

详情见上一章节

**安装npm包**

其实就是将我们上面构建的文件，下载到了项目的 `node_modules/包名` 目录下（就是这里的`node_modules/hdd-test1` ）

![image-20220320202137590](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Vue%E7%9B%B8%E5%85%B3/image-20220320202137590%20.png)

```shell
npm install hdd-test1  
```

**在main.js中添加**

```js
import hdd from 'hdd-test1' //这个名字是npm的包
import 'hdd-test1/hdd2.css' //css文件需要单独引入，这里的hdd2.css的名字是 构建时的--name的值
Vue.use(hdd)
```

**App.vue添加**

这里的组件的名字`<hdd-button>`是 index.js 中起的

```
import HddButton from "@/packages/hdd-button/index.vue";
```

```vue
<hdd-button></hdd-button>
```



