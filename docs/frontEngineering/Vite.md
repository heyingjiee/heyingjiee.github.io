# Vite

[Vite官方文档](https://vitejs.cn/)

推荐课程:[b站上的课程](https://www.bilibili.com/video/BV1GN4y1M7P5?p=2&vd_source=e46d9099be60057b5a16a45fac0d5248)，课程[笔记](https://github.com/passerecho/vite-)

## 什么是构建工具

> 浏览器他只认识html, css, js

**企业级项目里都可能会具备哪些功能**

1. typescript: 如果遇到ts文件我们需要使用tsc将typescript代码转换为js代码
2. React/Vue: 安装react-compiler / vue-complier, 将我们写的jsx文件或者.vue文件转换为render函数
3. less/sass/postcss/component-style: 我们又需要安装less-loader, sass-loader等一系列编译工具
4. 语法降级: babel ---> 将es的新语法转换旧版浏览器可以接受的语法
5. 体积优化: uglifyjs ---> 将我们的代码进行压缩变成体积更小性能更高的文件
6. 等等

我们需要将这些文件，打包成浏览器认识的`JS`、`CSS`、`Html`

这些操作异常繁琐，所以就有了**构建工具**，用来自动化处理这些操作。除了自动化集成其他工具外，承担了哪些其他工作？



**构建工具需要承担了哪些工作**

* 模块化开发支持

  例如，`Html`文件中，使用type指定引入ES Module模块

  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <title>Title</title>
  </head>
  <script type="module">
      import xxx from 'xxx'
  </script>
  <body>
      
  </body>
  </html>
  ```

  from后只支持指定模块的路径，才能在这个路径下找到

  如果，直接使用yarn安装模块

  ```shell
  yarn init -y
  
  yarn add xxx
  ```

  浏览器不知道要去node_modules下寻找该模块，而构建工具，可提供模块化支持（想想Vue-cli创建的项目中，依赖都安装在node_modules下，但是依然可以编译后，在浏览器运行，就是这个道理）

  **补充问题**：为什么浏览器中的ESM不能像commonjs（服务端使用）那样，支持自动去node_modules下寻找安装的依赖？

  ```js
  因为浏览器与服务端不同，html、css、js、安装的依赖+依赖的依赖都会被浏览器通过网络下载
  依赖关系往往是十分复杂的，一个依赖包可能依赖了几百个其他的依赖，这会严重降低前端的性能
  ```

  打包工具如何解决?

  详见[【依赖与构建阶段】](#依赖预构建)

  

* 自动化集成其他工具（不是构建工具做的, 构建工具将这些语法对应的处理工具集成进来自动化处理）
  * 处理代码兼容类的工具： 比如babel语法降级，less、sass、ts 语法转换
  * 提高项目性能类的工具：压缩文件, ***代码分割***

- 优化开发体验

  - 开发服务器（dev-server）

    比如，vue-cli 解决跨域的问题。实际上，编写的`*.vue`、`ts`、`less`等文件不能直接运行，构建工具自动化处理这些文件后，启动了一个本地服务器，返回的处理后的内容，就可以成功在浏览器上运行了

  - 构建工具会自动监听文件的变化, 当文件变化以后自动调用对应的集成工具进行重新打包, 然后再浏览器重新运行（热更新）

构建工具让我们不用每次都关心我们的代码在浏览器如何运行，只需要给构建工具提供一个配置文件(没有配置文件，也会有默认的规则)，在启动项目时执行下构建工具，然后就可以专注于开发，而其他工作自动完成



**主流的构建工具有哪些**

- webpack
- vite
- parcel
- esbuild
- rollup
- grunt
- gulp

## webpack与vite的区别

webpack需要最依赖分析，将ESM和CommonJS做统一的转换后，在启动服务器，开发者才能看到页面，速度要慢很多

![image-20220920013216918](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Engineering20220920013754%20.png)

Vite：

* 利用了目前浏览器广泛支持ESM的特点，不再做统一转换，而是直接将ESM模块提供给浏览器处理
* 采用了基于路由拆分的代码模块，不再需要加载模块
* 虽然依赖也通常会存在多种模块化格式（例如 ESM 或者 CommonJS），但是Vite使用更快的esbuild（基于Go多线程开发的打包器，比用JavaScript 编写的打包器 预构建依赖快 10-100 倍。）

![image-20220920013237978](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Engineering20220920013923%20.png)



侧重点：

* webpack倾向于关注兼容性
* vite是基于ESM的，更关注浏览器端的开发

## vite的简单例子

vite库是一个构建工具库

```shell
yarn add vite -D # 开发依赖
```

vite脚手架，用来创建一个完整的项目（其中包含vite依赖库）

```shell
yarn create vite
```

**简单的小例子**

解决前面不使用构建工具，浏览器找不会自动到node_modules下找依赖的问题

* 初始化项目

  ```shell
  yarn init -y
  ```

* 安装依赖（以loadsh为例子）

  ```shell
  yarn add loadsh -D
  ```

* 示例文件

  方式一：注意，直接在`script`标签内使用node_modules中的包不行

  ```html
  <!--index.html-->
  
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <title>Title</title>
  </head>
  <script type="module">
      import _ from 'loadsh'
      console.log('loadsh',_)
  </script>
  <body>
  ```

  方式二：使用路径引入的文件中，如果使用了node_modules中的包也不行

  ```html
  <!--index.html-->
  
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <title>Title</title>
  </head>
  <script src="./count.js" type="module">
  </script>
  <body>
  
  </body>
  </html>
  ```

  ```js
  //count.js
  
  import _ from 'loadsh'
  console.log('loadsh',_)
  ```

  两种方式都会报错，提示使用路径引入

  ![image-20220925014604987](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Engineering/20220925014605%20.png)

  本例中，使用第二种方式

* 安装vite构建工具

  ```shell
  yarn add vite -D
  ```

* 启动 

  这里一点知识，使用包管理器安装的依赖，都会在`node_modules/.bin`创建快捷方式，想调用必须使用下面的方式

  ```shell
  yarn vite
  ```

  一般情况下，会在package.json中加脚本，使用yarn dev即可运行
  ```json
  "scripts": {
      "dev": "vite"
  }
  ```
  
  
  
  运行后，会运行dev-server。终端出现提示，运行的地址
  
  ![image-20220925015232019](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Engineering/20220925015232%20.png)
  
  打开就不会有报错了
  
  ![image-20220925015157680](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Engineering/20220925015157%20.png)



## 依赖预构建<span id='依赖预构建'>

> 预构建：
>
> * vite启动时，发现import from不是路径，则会找到node_modules下的这个包
> * 如果这个包是不是ESM，则会使用esbuild将该包转化为ESM
> * 这个包本身可能依赖很多其他的模块（浏览器下载大量的依赖，会消耗很多时间）。vite将依赖集成为一个js文件

接着上一章节的例子讲解。项目成功启动并打印成功，说明vite解决了找不到loadsh包的问题。下面两个图解释了，vite预构建做了啥？

**浏览器加载的`count.js`文件**

会发现引入的loadsh库，实际加载的是`/node_modules/.vite/deps/loadsh.js`

![image-20220925023932049](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Engineering/20220925023932%20.png)

**项目下的node_modules目录**

![image-20220925024534225](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Engineering/20220925024534%20.png)



## vite配置文件

### 基础格式

vite是开箱即用的，即有一套默认的配置规则

如果，我们需要自定义配置，需要在项目下使用配置文件`vite.config.js`

配置文件内容写成下面的形式，在webstorm中是有配置项提示的，但是在vscode中没有提示

```js
export default {
  //vite的配置项
}
```

需要编译器提示，就要使用下面的写法

* 方式一：(**推荐的方式**)

  ```js
  import {defineConfig} from 'vite'
  export default defineConfig({
    //vite的配置项
  })
  ```

* 方式二：

  ```js
  /**@type import('vite').UserConfig*/
  const viteConfig={
    //vite的配置项
  }
  export default  viteConfig
  ```

### 生产测试环境

主配置文件（vite.config.js），在此文件引入不同环境下的配置文件

通过启动vite的开发服务器使用不同的启动命令，command参数也会不同

```js
defineConfig(({command})=>{
    console.log('defineConfig --> ',command)
})
```

* `yarn vite dev` 

  command参数值为serve

* `yarn vite build`

  command参数值为build

添加到package.json中，使用yarn xxx即可运行

```json
"scripts": {
    "dev": "vite dev",
    "build": "vite build"
},
```

**vite.base.config**

生产、测试共同的vite配置

```js
import {defineConfig} from 'vite'
export default defineConfig({
    //vite的配置项
})
```

**vite.prod.config**

生产环境的配置

```js
import {defineConfig} from 'vite'
export default defineConfig({
    //vite的配置项
})
```

**vite.dev.config**

测试环境的配置

```js
import {defineConfig} from 'vite'
export default defineConfig({
    //vite的配置项
})
```

**vite.config.js**

主配置文件，最终导出vite配置的文件

代码运行时会首先执行主配置文件，所有导出的defineConfig函数中的打印会输出到终端后，项目启动

```js
import {defineConfig} from 'vite'
import viteBaseConfig from "./vite.base.config";
import viteProdConfig from "./vite.prod.config";
import viteDevConfig from "./vite.dev.config";

//策略模式
const envResolver={
    'build':()=>{
        console.log('生产环境') 
        return {...viteBaseConfig,...viteProdConfig}
    },
    'serve':()=>{
        console.log('测试环境')
        return {...viteBaseConfig,...viteDevConfig}
    }

}

//最终的vite配置
export default defineConfig(({command})=>{
    console.log('defineConfig --> ',command) //启动vite时，会输出到终端
    return envResolver[command]()
})

```



**补充问题**

启动vite的环境是Node环境，为啥其读取的配置文件`vite.config.js`中使用的是ESM规范的引入方式？

这是因为vite在读取这配置文件时，会先解析文件语法，如果发现ESM规范会直接替换变成Commonjs规范

### 环境变量

vite启动的环境是Node环境，Node的环境变量是存储在`process.env`这个对象下

vite内置了dotenv这个第三方库

**默认情况**下，dotenv会自动读取项目下的.env文件, 并解析这个文件中的对应环境变量，并将其注入到process对象中

**但是**，如果直接注入，会与某些vite配置（例如，envDir用来配置当前环境变量文件的地址）产生冲突问题， 所以，vite需要手动配置读取哪个文件注入到process对象

```js
```



但是，考虑到**默认情况**下的处理方式，会与某

```
```



* `yarn vite dev` 

  mode参数，默认

  ```shell
  yarn vite dev --mode development
  ```

  

* `yarn vite build`

  ```shell
  yarn vite build --mode production
  ```

  

```js
import {defineConfig} from 'vite'
import viteBaseConfig from "./vite.base.config";
import viteProdConfig from "./vite.prod.config";
import viteDevConfig from "./vite.dev.config";

//策略模式
const envResolver={
    'build':()=>{
        console.log('生产环境')
        return {...viteBaseConfig,...viteProdConfig}
    },
    'serve':()=>{
        console.log('测试环境')
        return {...viteBaseConfig,...viteDevConfig}
    }

}

export default defineConfig(({command,mode})=>{
    console.log('command --> ',command)
    console.log('mode --> ',mode)
    return envResolver[command]()
})

```



例子：区分生产、测试环境的baseUrl

```text
//.env.dev
BASE_URL=http://127.0.0.1:8000


//.env.prod
BASE_URL=http://127.0.0.1:9000
```









