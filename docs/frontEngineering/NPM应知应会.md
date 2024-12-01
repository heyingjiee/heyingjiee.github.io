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

很长一段时间我都被网上的信息误导了

* 错误的认为在 node 项目中应该使用 require ，在浏览器环境中应该使用 import

* 错误的认为在项目在前端运行读取 module 字段作为入口；项目在后端运行读取 main 字段作为入口。可是慢慢发现前端、后端项目的界限很模糊，例如 Vue 项目本质是个后端项目，其编译产物才是前端项目，这是使得我一直很混乱

### 浏览器与 Node

不同平台差异

* 浏览器有 fetch、ajax、dom 相关 API

  * 浏览器端无需配置默认支持 ESM（参考下面 Node --- ESM 的特点）

    ```html
    <!DOCTYPE html>
    <html lang="en">
    	<head>
        <meta charset="UTF-8">
        <title>Title</title>
    	</head>
    	
    	<!--html文件是入口，在其中会加载main.js-->
    	<script src="./main.js" type="module">
      	import xxx from 'xxx'
      </script>
    
    	<body></body>
    </html>
    ```

  * 挂载 window 上

    ```html
    <!DOCTYPE html>
    <html lang="en">
    	<head>
        <meta charset="UTF-8">
        <title>Title</title>
    	</head>
      <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    	
    	<script>
     	 const { createApp, ref } = Vue // 这里是引入 window.Vue
    
      	createApp({
        	setup() {
          	const message = ref('Hello vue!')
          	return {
          	  message
          	}
        	}
      	}).mount('#app')
    	</script>
    	<body>
      	<div id="app">{{ message }}</div>
      </body>
    </html>
    ```

    

* Node 有 events、fs等 API，且Node环境加载依赖的方式不同，参考下一节【Node 加载依赖】。除此之外 Node 还会根据 package.json 的 type 字段判断本模块使用哪种规范
  * ESM

    ```shell
    # 引入导出关键字
    import 、export 
    
    # ESM 模块引入必须加后缀，不可省略
    import('xx/xx.js')
    
    # ESM规范中特有的 API
    import.meta.url
    ```

  * CJS

    ```shell
    # 引入导出关键字
    require、module.exports
    
    # 可省略后缀
    import('xx/xx')
    ```

    

开发者控制代码运行在哪个平台，如果项目使用了平台没有 API、加载模块的方式 就会报错



### Node加载依赖

**模块化和启动项目的工具相关**

npm init 创建项目，在项目下新建 index.js ，并引入一个第三方的包

```
// package.json

{
	"type":"module"
	"scripts":{
		test:"node index.js"
	}
}
```

项目配置使用ESM引入，但是运行脚本 test 读取的仍然是 main 字段

这是因为项目是以 node 启动的，而 node 无论项目使用的模块化方式，都是默认读取 npm 包的 main 字段作为入口。如果存在 exports 字段优先级更高，而且可以明确配置使用不同引入方式的入口

```json
// 三方 npm 包
{
  "exports": {
    	".":{  
				"import": "./index-module.js",
   		 	"require": "./index-require.cjs"
      }
	}
},
```

假设项目配置 import、require 都指向一个 ESM 模块呢？其实使用模块化规范只能定义本模块的方式，引入的是哪种模块不一定，但是在 Node 项目中如果直接引入异构的模块肯定会报错



还有一个有意思的现象，有的 npm 包没有仅仅配置了 main 字段。但是可以用下面方式引入

```js
const PluginAES = require('@armor/plugin-aes').default
```

这个有可能是打包工具导致的，模块本身是ESM，同时生成了 CJS 模块，用exports.defalut=xxx 模拟 ESM 的默认导出

### 构建工具

原本模块化很简单，但随着构建工具的使用，逐渐开始变得复杂了

#### TSC

例如：TS项目编写 TS 文件，但是使用 TSC 编译为 JS 文件，最后使用Node 运行

**TS 视角**

* TS 使用 import、require 都可以（tsc 可以通过module 字段配置编译后的模块化方式，建议用 require，ESM 的使用也有限制， 后面会提到）

* TS 使用import或require引入模块是 ESM、CJS 均可（moduleResolution 一般都设置为 Node）

  **参考上一节 Node 环境 的引入方式**，TS 项目引入三方包，会读取包的 package.json

  如果 TS 文件使用 import 就读取 exports.import ，如果不存在就读取 main 作为入口。一般 main 都是 CJS 模块的入口，启动下面选项 TSC 会做模块兼容处理

  ```json
  {
  	"esModuleInterop":true,
  	"allowSyntheticDefaultImports": true,
  }
  ```

  不推荐 TS 文件使用 require，因为一旦出现了 require 到 ESM 模块， tsc 无法提供兼容处理，最后编译到 JS 文件后，Node 运行也可能会报错

* TS是不关心项目在哪个平台的，只需要开发者提供平台API 的类型信息，就能在TS 文件中使用。例如：项目在 Node 平台运行就需要安装`@types/node`。

**Node 视角**

* TS 编译后的代码使用 Node 运行，应注意 package.json 的 type 是否与 tsc 编译后的模块化方式一致



这挺有意思的一点是：

如果我们在项目安装 Node 类型声明，在 TS文件中使用 `__filename`，产物输出为 esnext ，package.json 配置为 ESM 模块。TS 编写不会提示出错，但是运行提示ESM 规范中不存在`__filename`报错。这都是因为前端工具工具的引入，开发者书写的代码和最终运行的构建产物这两者并不完全一致导致的

tsconfig 模板 ( 一般项目结构 根目录/src 下方式源码，根目录放配置文件)

```json
{
  "compilerOptions": {
    // 目标 、模块化
    "module": "CommonJS",
    "target": "ESNext", 
    "moduleResolution": "Node",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop":true,
    // 支持引入JSON 模块
    "resolveJsonModule": true,
    // 输出
    "outDir": "./dist",
    "rootDir": "./src", // 一般吧源码放在 src 下，配置后rootDir目录下的源码结构就会对应到outDir下
    // 声明文件
    "declaration": true,
    // 严格模式
    "strict": true,
    // sourcemap
    "sourceMap": true,
    
    
    // --- 酌情添加 ---
    // 路径别名
    "paths": {
      "@/*":["./src/*"]
    }
    // 保留注释
    "removeComments": false, // 默认ture移除注释
    
    // 打开装饰器
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
  },
  "include": ["src/**/*"], // 默认包括全部文件
  "exclude":["dist","node_modules"]
}

```

⚠️注意：TSC 打包存在几点问题：

* 运行在浏览器环境（不适宜）

  TSC 打包的 JS 文件无法做到 tree shrink，包体积比较大，不适合用在浏览器端。

  TSC 不支持语法降级（Babel 可以做语法降级）

  而且，TSC 不支持打包为 iife 模块（可执行函数）、打包的 ESM 模块也存在问题，即 ts 配置如果 module 是 ESM 相关的，编译后的 JS 产物会出现无法运行，原因如下

  ```js
  import('xx/xx') // 浏览器、Node 环境 引入 ESM 必须带后缀
  ```

* 运行在 Node 环境（有条件限制）

  Node环境不必在乎包体积的问题，但是 Node 环境的 ESM 模块也是要求引入包路径带后缀，所以一般 TSC 编译为 CJS 模块（nest 项目就是）

  ```json
  {
    "compilerOptions": {
      // 目标 、模块化
      "module": "CommonJS",
      "target": "ESNext",
    },
  }
  
  ```

  ⚠️ 有种特殊情况，如果 TS 设置module 为 CJS  ，如果项目引入了 ESM 模块就会报错

  ```js
  require('xxx') // node 中 require 只能导入 cjs 模块
  ```

  所以，使用 tsc 打包 CJS 是可行的，但是有限制，即不能使用导入三方ESM 模块。所以很受限制

* TSC 打包三方包

  例如，TS项目中安装了 axios ，但是构建产物是不包含 axios 的，这需要注意。不过通过 npm 安装包会自动为我们处理好依赖关系

* Path 别名配置、resolveJsonModule 支持引入 JSON

  TSC 打包为 JS时，不会替我们将别名转换回真正的路径。resolveJsonModule 同样的只能在 TS 中引入 JSON，实际编译为 JS 没有做任何特别处理，而 Node 环境使用 ESM 导入是不支持引入 JSON 的（require 支持导入 JSON）

综上：TSC 存在各种问题，使用场景非常受限制，建议集成 rollup，通过 rollup 插件来替我们处理这些

#### Rollup

官网：https://cn.rollupjs.org/

TS 文件经过 Rollup 处理打包为 JS 文件

相比于 TSC，Rollup 本身支持将 **JS** 打包为各种模块 + 树摇优化 + ESM 规范 + 打包引入的三方依赖

官方还提供了可视化页面展示代码打包的结果：[这里](https://cn.rollupjs.org/repl/?version=4.24.0&shareable=JTdCJTIyZXhhbXBsZSUyMiUzQSUyMjAwJTIyJTJDJTIybW9kdWxlcyUyMiUzQSU1QiU3QiUyMmNvZGUlMjIlM0ElMjIlMkYlMkYlMjAlRTUlODUlQjclRTUlOTAlOEQlRTUlQUYlQkMlRTUlODclQkElNUNuJTJGJTJGJTIwJUU2JTlDJTg5JUU1JUJFJTg4JUU1JUE0JTlBJUU3JUE3JThEJUU2JTk2JUI5JUU2JUIzJTk1JUU1JThGJUFGJUU0JUJCJUE1JUU0JUJCJThFJTIwRVMyMDE1JTIwJUU2JUE4JUExJUU1JTlEJTk3JUU0JUI4JUFEJTVDbiUyRiUyRiUyMCVFNSVBRiVCQyVFNSU4NyVCQSVFNyVCQiU5MSVFNSVBRSU5QSU1Q25leHBvcnQlMjB2YXIlMjBmb28lMjAlM0QlMjAxJTNCJTVDbiU1Q25leHBvcnQlMjBmdW5jdGlvbiUyMGJhcigpJTIwJTdCJTVDbiU1Q3QlMkYlMkYlMjAlRTUlOUMlQTglRTclOTQlOUYlRTYlODglOTAlMjBDb21tb25KUyUyMCVFNiU5NyVCNiU1Q24lNUN0JTJGJTJGJTIwJUU1JUIwJTlEJUU4JUFGJTk1JUU1JUIwJTg2JUU2JUFEJUE0JUU2JTlCJUI0JUU2JTk0JUI5JUU0JUI4JUJBJTIwJTYwZm9vJTJCJTJCJTYwJTVDbiU1Q3RyZXR1cm4lMjBmb28lM0IlNUNuJTdEJTVDbiU1Q25mdW5jdGlvbiUyMGJheigpJTIwJTdCJTVDbiU1Q3RyZXR1cm4lMjBiYXIoKSUzQiU1Q24lN0QlNUNuJTVDbmV4cG9ydCUyMColMjBmcm9tJTIwJy4lMkZxdXgnJTNCJTVDbmV4cG9ydCUyMCU3QiUyMGJheiUyMCU3RCUzQiUyMiUyQyUyMmlzRW50cnklMjIlM0F0cnVlJTJDJTIybmFtZSUyMiUzQSUyMm1haW4uanMlMjIlN0QlMkMlN0IlMjJjb2RlJTIyJTNBJTIyZXhwb3J0JTIwY29uc3QlMjBxdXglMjAlM0QlMjAnUVVYJyUzQiUyMiUyQyUyMmlzRW50cnklMjIlM0FmYWxzZSUyQyUyMm5hbWUlMjIlM0ElMjJxdXguanMlMjIlN0QlNUQlMkMlMjJvcHRpb25zJTIyJTNBJTdCJTdEJTdE)

rollup插件的形式：支持 TS 类型检验和语法解析、Babel 语法降级，如果项目使用 ESM 规范，还支持将 引入的CJS 模块转化为 ESM 等等能力

```shell
# ts语法支持，依赖 typescript
rollup-plugin-typescript2

# 模块化处理
@rollup/plugin-node-resolve # 用于解析 Node.js 模块，支持从node_modules找三方包
@rollup/plugin-commonjs # 插件将引入的 CJS 转化为 ESM 模块

# Node 环境 ESM 不支持引入 JSON 模块。TSC 可以配置resolveJsonModule支持引入JSON
@rollup/plugin-json # 支持导入json，没有 json 插件的支持我们在导入 json 文件时会报错

@rollup/plugin-babel # 构建在浏览器运行的包，如果考虑兼容性做语法降级

@rollup/plugin-terser # 压缩JS
```

使用rollup.config.js配置rollup

```json
"scripts": {
    "dev": "rollup -c --watch", // 注意 -c 表示使用配配置文件
    "build": "rollup -c"
},
```

rollup.config.js 基础模板（未配置 babel，可参考：https://cn.rollupjs.org/tools/#babel）

```js
import typescript from "rollup-plugin-typescript2";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import resolve from '@rollup/plugin-node-resolve';
import alias from "@rollup/plugin-alias";
import terser from '@rollup/plugin-terser';

export default {
    input: './src/index.ts',
    output: [
        { 
          file: 'dist/index.esm.js', 
          format: 'es' ,
          plugins: [terser()]
        },
    ],
    plugins: [
        typescript(), 
        json(), 
        resolve(),
        commonjs(),
        alias()
    ]
}

```

⚠️注意：Rollup打包存在几点问题：

* 仅支持 rollup.config.js，如果 package 设置 type:module，还必须改后缀为`.mjs`

* Rollup 通过`@rollup/plugin-commonjs`兼容 CJS，但是如果出现动态模块会报错

  ```js
  module.exports=(xxx)=>{
    
  }
  ```

* 将所有内容打包成一个 JS 文件，使用`@rollup/plugin-node-resolve` 插件可以让 rollup 引入三方包，但是默认会把三方依赖也打包进来，尽管可以通过external 排除三方包，但是每个都配置很麻烦

综上：Rollup 还是建议用在打包 浏览器 ESM 模块，目前对于 CJS 兼容性还有一定限制

#### Tsup



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

`.npmrc`

```shell
# pnpm 9.x 之后，下面属性默认 false，表示所有包从 npm 源下载。如果需要安装本地依赖应该设为 true
# 或者安装依赖本地时 增加 --workspace 选项
link-workspace-packages = true  
```

其他命令

```shell
# 公共选项

# -w (注意-w 是 --workspace-root 的简写) 表示在工作区执行 ，即pnpm-lock.yaml 所在的目录，不指定执行范围的默认值
# --filter <package-name> 表示选中包下执行 ； 
# -r 所有子包。例如 ： pnpm run script命令 -r  #所有子包执行该命令


# 安装依赖
pnpm add axios --filter <package-name> # 给指定子包安装依赖。或者进入子包目录就可以不用 filter 命令了
pnpm add axios --workspace # 进入子包目录。--workspace表示不从 npm 下载，而是从工作区查找依赖。安装本地的版本，使用的是特殊的标记 "xxx": "workspace:1.0.0"


# 删除依赖
pnpm remove @hdd-cli-template/utils # 进入core子包目录
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

## 发布包

### 包内容

npm上传完整项目还是打包后的结果？

* 上传整个项目（包括源码、打包后dist目录）

  * 不上传node_modules。当其他开发者安装该npm包时，npm会自动下载依赖

  * package.json需配置包入口
  * 打包项目开启sourcemap，当使用者查找npm函数定义时，编辑器会跳转npm源码，（不是打包后代码）
  * 项目A使用改npm，项目A打包时只会将npm的构建产物打包进去

* 打包后产物

  * 使用 `.npmignore` 忽略其他文件，保留dist目录、package.json文件（package.json需配置包入口）

package.json如何配置npm包入口？

下面是package.json的配置文件相关字段的含义

```json
{
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
}
```

实际场景中我们要考虑使用者的环境以及模块化方式：

* Node、浏览器两种环境
* CJS、ESM两种模块

他们之间两两组合共四种情况：

* Node环境使用CJS
* Node环境使用ESM
* 浏览器环境使用CJS
* 浏览器环境使用ESM

注意：例如在Vue项目中，我们引入的包实际上是在Node环境中，但是打包工具会替我们做处理，使其在浏览器环境中使用。



前端的依赖管理太混乱了，我非常喜欢rollup文档里的一段话，希望依赖管理黑暗的日子早日结束

![image-20240509105514147](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20240509105514UUMypJ.png)



### 发布

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

发布npm包

```shell
npm publish  # 如果推不上去，一般是包的名字和npm仓库中其他包的名字重复了
```

npm官网登陆自己的账户，就能看到这个包了

![image-20220320201043339](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Vue%E7%9B%B8%E5%85%B3/image-20220320201043339%20.png)

## 编辑器

### 查看包函数定义

在vscode、webstream工具中都可以通过command+点击函数的形式跳转npm目录

但是有的时候会跳转 xxx.d.ts 定义文件，有的时候则会跳转到 TS源码

* TS项目编译为 JS

  * 配置 package.json 的 `files:[“dist”]` 字段，则只会发布dist编译后目录，这种则只会跳转类型定义文件

    ![image-20241021000654905](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20241021000654ee8AOX.png)

  * 如果发布完整项目，无论tsconfig是否开启 sourcemap ，都可以跳转 TS 源码

* JS项目

  * 点击跳转JS源码
  * 通过@types/xxx的形式安装定义文件，这种会跳转类型定义文件
