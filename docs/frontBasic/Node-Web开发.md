---

title: Node.js学习笔记
date: 2020-2-8
tags: [Nodejs,Npm,部署与优化]
categories: 后端技术  
toc: true 
cover: https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Node相关/image-20210107225650687.png

---

# 服务端进阶之路，以后靠自己搭建前后端分离的系统了

# 1.Nodejs基础

## 1.1 node的资料

* 《node入门》 https://www.nodebeginner.org/index-zh-cn.html
*   node社区 https://cnodejs.org/getstart
* 《深入浅出理解Nodejs》

## 1.2 hello world

* 新建hello_worls.js

  ```
  var foo="bar"
  console.log(foo)
  ```

  

* 把cmd命令路径用cd移动到js文件所在的目录下

* 输入 ``node hello_world.js``

* 就可以运行一个js文件了

## 1.3 nodejs有文件操作能力

* nodejs是没有dom 和bom操作的，但是可以进行本地文件访问，//fs是 file-system 的简写，是文件系统的意思，在node中进行文件操作就必须要引入fs这个核心模块

* 读文件

  ```javascript
  //1.使用require加载fs核心模块
  var fs=require("fs")
  //2.读取文件 
  //第一个参数是文件路径，
  //第二个参数是回调函数，
  //  读取成功 data是数据，error是null
  //  读取失败 data是null，error是失败对象
  
  fs.readFile("./hello.txt",function(error,data){
  	//data是十六进制数据，用toString()
  	console.log(data.toString())
  })
  
  
  ```

* 写文件

  ```javascript
  //1.使用require加载fs核心模块
  var fs=require("fs")
  //2.写入文件 
  //第一个参数是文件路径
  //第二个参数是文件内容
  //第三个参数是回调函数
  //写入成功 erroe是null。写入失败 error是失败对象
  fs.writeFile("./你好.md","写入的内容",function(error){
    if(error){
    	console.log("文件写入失败")
    }else{
    	console.log("文件写入成功")
    }
  })
   
  ```

  

## 1.4Node的http服务

* ### 1.4.1简单的http及注意事项

  ```javascript
  //文件名hellow_wrold.js
  //使用node构建一个服务器
  //使用http模块
  //1.加载http模块
  
  var http=require("http")
  //2.创建一个web服务器
  var server=http.createServer()
  //3.服务器服务：
  //  发请求，接受请求，处理请求，返回响应
  //注册request请求事件
  //当客户端发请求过来，触发服务器的request事件，第二个参数执行回调函数
  server.on("request",function(){
  	console.log("收到客户端的请求了")
  })
  //4.绑定端口号，启动服务器，执行回调函数
  server.listen(3000,function(){
  	console.log("服务器启动成功，请访问http://127.0.0.1：3000/来访问")
  })
  ```

  ![image-20210107224613261](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Node相关/image-20210107224613261.png)

  **注意**：

  运行js后，不能关闭cmd窗口（一旦关闭，服务器就停了），打开浏览器访问 http://127.0.0.1:3000/，cmd窗口会打印”收到客户端请求“

  结束服务器：``ctrl+c`` 

* ### 1.4.2 http中的request对象和response对象

  ```javascript
  //使用node构建一个服务器
  //使用http模块
  //1.加载http模块
  
  var http=require("http")
  //2.创建一个web服务器
  var server=http.createServer()
  //3.服务器服务：
  //  发请求，接受请求，处理请求，返回响应
  //注册request请求事件
  //当客户端发请求过来，触发服务器的request事件，第二个参数回调函数执行
  //函数的参数是request,response对象，request对象带着客户端的请求信息，response对象可以用来给客户端回信息
  
  server.on("request",function(request,response){
  	//request的url方法,获取的是端口号的路径，比如127.0.0.1：3000后面的部分(都是/**)。直接访问127.0.0.1：3000，url的值是/
  	console.log("收到客户端的请求了,请求路径是："+request.url)
      //response 可以多次write，最后必须调用end结束
      response.write("hellow")
      response.write(" nodejs")
      response.end()
      //或者response.end("helloe nodejs")
   
  
  })
  //4.绑定端口号，启动服务器，执行回调函数
  server.listen(3000,function(){
  	console.log("服务器启动成功，请访问http://127.0.0.1：3000/来访问")
  })
  ```

  ![image-20210107224834517](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Node相关/image-20210107224834517.png)

  * 修改服务器代码需要``ctrl+c``结束服务器，在输入```node 文件名```重启服务器

  * 思考现在访问```http://127.0.0.1：3000/```下面的任何路径均(比如：```http://127.0.0.1：3000/ab```等)均显示```hellow nodejs```

  * response.end("中文") 客户端会显示乱码，服务端发送的编码是utf-8,但是浏览器不知道，浏览器会按照当前的操作系统的默认编码去解析（中文操作系统默认是gbk），解决方法就是告诉浏览器服务端发送的编码格式

    ```javascript
    //在server.on的function中加入代码
    //设置response的COntent-type参数
    //text/plain是普通文本   text/html是网页html  
    response.setHeader("Content-type","text/plain; charset=utf-8")
    ```

  * 承接上一个条目，```text/html```可以发送网页，但是直接用```response.end()```不好，因为你需要把整个发送的html页面都写入```response.end()```之中，太麻烦。所以采用读取一个html文件，再把文件转换成字符串，在进行发送(

    同理可以发送图片 ```response.setHeader("Content-type","image/图片的格式")```   )

    ```javascript
    var fs=require("fs") 
    //使用node构建一个服务器
    //使用http模块
    //1.加载http模块
    var http=require("http")
    //2.创建一个web服务器
    var server=http.createServer()
    //3.服务器服务：
    //  发请求，接受请求，处理请求，返回响应
    //注册request请求事件
    //当客户端发请求过来，触发服务器的request事件，第二个参数回调函数执行
    //函数的参数是request,response对象，request对象带着客户端的请求信息，response对象可以用来给客户端回信息
    
    server.on("request",function(request,response){
    	//request的url方法
    	var url=request.url
    	
    	if(url==="/"){
    		fs.readFile("../index.html",function(error,data){
    		    if(error){
    			    response.setHeader("Content-type","text/html; charset=utf-8")
    			    response.end("文件读取失败")
    		    }else{
    		        //data是二进制数据。toString()可以转成字符串
    		        //respose.end()参数可以是二进制，也可以是数据
    		        response.setHeader("Content-type","text/html; charset=utf-8")
    		        response.end(data)
    		    }
    	    })
    	}
    })
    //4.绑定端口号，启动服务器，执行回调函数
    server.listen(3000,function(){
    	console.log("服务器启动成功，请访问http://127.0.0.1：3000/来访问")
    })
    ```

    

* ### 1.4.3 访问不同路径，返回不同数据

  * 就是判断下请求路径request.url

    ```javascript
    //使用node构建一个服务器
    //使用http模块
    //1.加载http模块
    
    var http=require("http")
    //2.创建一个web服务器
    var server=http.createServer()
    //3.服务器服务：
    //  发请求，接受请求，处理请求，返回响应
    //注册request请求事件
    //当客户端发请求过来，触发服务器的request事件，第二个参数回调函数执行
    //函数的参数是request,response对象，request对象带着客户端的请求信息，response对象可以用来给客户端回信息
    
    server.on("request",function(request,response){
    	//request的url方法获取的是“127.0.0.1：3000/”后面的路径
    	var url=request.url
    	//===严格相等
    	if(url==="/"){
    		response.end("index page")
    	}else if(url==="/login"){
            response.end("login page")
    	}
    	//写个更复杂一点的响应，response只能返回客户端字符串，其他的 数字，对象，数组 必须要处理下
        //返回json数据
        //JSON.parse(str)返回数组对象
        //JSON.stringify(array)返回字符串
        if(url==="/products"){
    		var products=[
                { 
                    name:"苹果8",
                    price:5000
                },
                {
                    name:"苹果X",
                    price:8000
                }
            ]
            response.end(JSON.stringify(products))
        }
    
    })
    //4.绑定端口号，启动服务器，执行回调函数
    server.listen(3000,function(){
    	console.log("服务器启动成功，请访问http://127.0.0.1：3000/来访问")
    })
    ```

    ![image-20210107224925110](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Node相关/image-20210107224925110.png)

    ![image-20210107225035829](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Node相关/image-20210107225035829.png)

  * 以上写法有一个缺点，那就是必须得提前设定好所有的访问路径。

    这个写法可以让服务器根据客户端的访问地址，去查找资源

    ```javascript
    
    var fs=require("fs") 
    //使用node构建一个服务器
    //使用http模块
    //1.加载http模块
    var http=require("http")
    //2.创建一个web服务器
    var server=http.createServer()
    //3.服务器服务：
    //  发请求，接受请求，处理请求，返回响应
    //注册request请求事件
    //当客户端发请求过来，触发服务器的request事件，第二个参数回调函数执行
    //函数的参数是request,response对象，request对象带着客户端的请求信息，response对象可以用来给客户端回信息
    
    server.on("request",function(request,response){
    	//request的url方法
    	var url=request.url
    	//wwDir是存放网站资源的根目录
    	wwwDir="D:/markdown_note/nodejs"
    	//file_path是用户访问的对于根目录来说的的相对路径
    	var file_path
    	if(url!="/"){
    		file_path=url
    		fs.readFile(wwwDir+file_path,function(error,data){
    		    if(error){
    			    response.setHeader("Content-type","text/html; charset=utf-8")
    			    response.end("404 not found")
    		    }else{
    		        //data是二进制数据。toString()可以转成字符串
    		        //respose.end()参数可以是二进制，也可以是数据
    		        
    		        response.end(data)
    		    }
    	    })
    	}else{
    		fs.readFile(wwwDir+"/index.html",function(error,data){
    			response.setHeader("Content-type","text/html; charset=utf-8")
    		    response.end(data)
    		})
    	}
    })
    //4.绑定端口号，启动服务器，执行回调函数
    server.listen(3000,function(){
    	console.log("服务器启动成功，请访问http://127.0.0.1：3000/来访问")
    })
    ```

    

## 1.5 Node的模块系统

想要更深的了解请阅读<<深入浅出理解Node.js>>

### 1.5.1 在Node中写程序主要是在使用

* EcmaScript语言

  * 和浏览器端不一样，没有Bom和Dom操作

* 核心模块

  加载核心模块，直接写模块名

  ```javascript
  var a=require("模块名")
  ```

  * ```fs```文件操作
  * ```http```http服务
  * ```url```路径操作
  * ```path```处理路径
  * ```os```系统信息

* 第三方模块

  例如：art-template，Express

  必须通过npm下载使用第三方模块，下载的文件统一放在node_module文件夹中，加载时直接写模块名

  ```javascript
  var a=require("模块名")
  ```

* 自己写的模块

  加载时，必须指明文件所在路径，文件名后缀可以省略

  ```javascript
  var a=require("相对位置")
  ```

  

### 1.5.2 什么是模块化

* 文件作用域
* 通信规则
  * 加载模块
  * 导出模块

### 1.5.3 Nodejs中的commonJs规范

>  commonjs模块规范。node应用由模块组成，每一个文件就是一个模块，拥有自己独立的作用域，变量，以及方法等，对其他的模块都不可见。
>
> CommonJS规范规定，每个模块内部，module变量代表当前模块。这个变量是一个对象，它的exports属性（即module.exports）是对外的接口。加载某个模块，其实是加载该模块的module.exports属性。require方法用于加载模块。

在Node中：

* 文件作用域:所有代码都运行在模块作用域，不会污染全局作用域。
* 通信规则
  * 导出export
  * 加载require

### 1.5.4Node的模块化编程

Nodejs只能执行一个js文件，如何实现多文件执行呢？可以使用模块化编程，在一个文件中引入其他文件导出的exports成员，并执行

**export的功能：**

每个文件中都提供一个 exports对象
exports默认是一个空对象
我们要做的就是，把需要在外部访问的成员挂载到exports中

**require的两个功能: **

* 加载模块，把那个执行里面的代码

  ```javascript
  //a.js
  console.log("a 开始执行")
  require("./b.js")
  console.log("a 执行完毕")
  
  //b.js
  console.log("b.js执行")
  ```

  ![image-20210109152652462](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Node相关/image-20210109152652462.png)

* 拿到被加载的文件模块导出的接口对象exports，通过exports访问导出的成员

  * 仅仅向外暴露变量和函数时使用exports

    ```javascript
    //b.js 导出变量foo和函数add()
    var foo="bbb"
    //添加变量
    exports.foo="hello"
    //添加函数
    exports.add=function(x,y){
        return x+y
    }
    
    //a.js，requier引入模块，可省略后缀
    var bExports=require("./b")
    console.log(bExports.foo) //使用模块
    console.log(bExports.add(1,2))
    
    
    //运行a.js结果是：
    //hello
    //3
    
    ```

    注意：自己编写js模块，相对路径必须加```./```不能省略。可以省略名字中的`.js`Node中没有全局作用域，只有模块作用域a.js中定义的和b.js中不会冲突

  * 向外暴露对象（类似class，包含了很多属性和方法）

    ```javascript
    //hello.js 
    function Hello() { 
        var name; 
        this.setName = function(thyName) { 
            name = thyName; 
        }; 
        this.sayHello = function() { 
            console.log('Hello ' + name); 
        }; 
    }; 
    module.exports = Hello;
    
    //main.js 加载模块
    var Hello = require('./hello'); 
    
    hello = new Hello(); //使用对象
    hello.setName('hh'); 
    hello.sayHello();
    
    //输出Hello hh
    ```



### 1.5.5 require的加载方法

![nodejs-require](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Node相关/nodejs-require.jpg)

+ 优先从缓存加载【之前加载过，即使后来在文件的其他部分写了require("模块名")  仍然不会重新加载，会从缓存加载】

+ 核心模块的require参数

  * 是模块名

+ 第三方模块的require参数

  * 第三方模块的标识就是第三方模块的名称（不可能有第三方模块和核心模块的名字一致）
  * 使用方式：`var 名字 = require('npm install 的那个包名')`
  * 文件访问路径【举例子：require(“express”）】
  * node_modules
  * node_modules/express
  * node_modules/express/package.json
  * node_modules/express/package.json main
  * 如果 package.json 或者 package.json main 不成立，则查找备选项：index.js
  * 如果以上条件都不成立，则继续进入上一级目录中的 node_modules 按照上面的规则继续查找
  * 如果直到当前文件模块所属磁盘根目录都找不到，最后报错：`can not find module xxx`

+ 自己定义的模块的require参数

  ```
  //是当前文件相对与模块文件的相对路径
  
  //自己写的模块a.js
  require("./a.js") 
  require("./a")//可省略后缀
  
  ```


## 1.6模板引擎 art_template

### 1.6.1这里引入两个概念  ``客户端渲染``，``服务端渲染``，

* 客户端渲染是通过Ajax，异步的请求数据。html先发送到客户端，Ajax请求数据，填充到html中

* 服务端渲染，就是上个条目中的案例。服务端通过render把html处理好，直接把带数据的html通过resonse.end()发送到客户端网页

  【注意：客户端渲染是不能被爬虫爬取的，百度等搜索引擎，就不能获取数据。比如京东的商品页面，用服务端渲染。评论采用客户端渲染，用Ajax异步刷新】

### 1.6.2

* 官网：http://aui.github.io/art-template/

* 安装 ：在cmd窗口中，用```cd```移动到要下载的目录下 ,输入```npm install art-template --save```进行安装

* {{ 变量名}}是art-template模板语法

  ```html
  //循环art-template语法
  //value是数组中的值，这里的例子是数组，有三个属性name,message,dateTime
  {{each 数组名}}
        {{ $value.name }}{{ $value.message }} {{$value.dateTime }}
  {{/each}}
  ```


* Html加入模板引擎

  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
  	<meta charset="UTF-8">
  	<title>使用模板引擎</title>
  </head>
  <body>
  	<!--在浏览器中引用lib/template-web.js-->
  	<!--模板引擎不关心字符串内容，只关心模板标记语法  例如{{ }} 语法称之为mustache语法 -->
  	<script src="D:/markdown_note/nodejs/node_modules/art-template/lib/template-web.js"></script>	
  	<script type="text/template" id="tp1">
  		大家好，我叫 {{name}}
  		我今年{{age}}岁了
  		我喜欢{{each hobbies}} {{$value}} {{/each}}
  	</script>
  	
  
  	<script>
  		var ret=template("tp1",{
  			name:"jake",
  			age:48,
  			hobbies:[
  			"唱",
  			"跳",
  			"rap",
  			"篮球"]
  		})
  		console.log(ret)
  	</script>
  </body>
  </html>
  
  <!--
  浏览器控制台打印：
  
  		大家好，我叫 jake
  		我今年48岁了
  		我喜欢 唱  跳  rap  篮球 
  	
  
  -->
  ```

* 在Nodejs中引用模板引擎

  ```javascript
  //1.安装
  //2.require方法加载art-template
  //3.查文档，使用模板引擎API
  ```

  ```html
  <!--art_template.html-->
  
  <!DOCTYPE html>
  <html lang="en">
  <head>
  	<meta charset="UTF-8">
  	<title>使用模板引擎</title>
  </head>
  <body>
  	
  	大家好，我叫 {{name}}
  	我今年{{age}}岁了
  	我喜欢{{each hobbies}} {{$value}} {{/each}}
  </body>
  </html>
  ```

  ```javascript
  //模板引擎.js
  //代码思路，读取art_template.html，然后用render替换{{}}中的内容
  var template=require("art-template")
  var http=require("http")
  var fs=require("fs")
  var server=http.createServer()
  server.on("request",function(request,response){
  	fs.readFile("./art_template.html",function(error,data){
  		if(error){
  			console.log("读取文件失败")
  		}else{
  			//date是二进制，render参数是str
  			//render是替换的意思，把art_template.html中{{}}都替换成文字，返回给客户端网页
  			var ret=template.render(data.toString(),{
  				name:"jake",
  				age:48,
  				hobbies:[
  				"唱",
  				"跳",
  				"rap",
  				"篮球"]
  			})
  			response.end(ret)
  		}
  	})
  })
  
  server.listen(3000,function(){
  	console.log("服务器启动成功，请访问http://127.0.0.1：3000/来访问")
  
  	
  })
  
  
  ```

  运行 模板引擎.js ,网页访问127.0.0.1：3000/ 。

  ![“运行成功”](https://github.com/heyingjiee/markdown_image/blob/master/Nodejs_note_image/response_art_template.png?raw=true)


##  1.7 留言板小案例

### 1.7.1项目的一些规范

* 为了目录结构清晰一致，我们约定把所有html文件，放入```views```文件夹下

* 为了统一处理静态资源，我们约定把所有静态资源（图片，css，js等）文件，放入```public```文件夹，在网页中可用html标签的href或src属性直接请求资源,目录结构一般为```public/img```,```public/js```,```public/css```,```public/lib```（第三方包,比如Jquary，Bootstrap）

* ![留言板文件目录结构](https://github.com/heyingjiee/markdown_image/blob/master/Nodejs_note_image/path.png?raw=true)

  目录结构中的node_modules是之前安装的art-template模板引擎

* 使用``npm init -yes``生成``package.json``文件

* 关于url的几点注意：

  * html中的请求静态资源的标签的href，src属性，form标签的action属性中填写的都是相对于网址的相对路径，比如：```href="/public/img.png"```这个资源请求时，会在前面拼接上当前网页的路径，即：```127.0.0.1:3000/public/img.png```。但是当跳转或者打开新页面的链接一般为了美化url（网址栏显示的网页网址不带.html后缀），比如：可以在服务端 request.url 判断是否index,如果是就执行readFile(./views/index.html)，并通过response.end()返回
  * 服务端Nodejs代码中，读取服务器的html文件时，使用readFile的第一个参数是路径，这个路径是相对于当前js代码的相对路径，比如```./views/index.html```

### 1.7.2留言板案例代码

* 如1.7.1中的目录结构。代码需要引入bootstrap和art-template

```html
<!--index.html-->
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>留言本</title>
  <!-- 
    浏览器收到 HTML 响应内容之后，就要开始从上到下依次解析，
    当在解析的过程中，如果发现：
      link
      script
      img
      iframe
      video
      audio
    等带有 src 或者 href（link） 属性标签（具有外链的资源）的时候，浏览器会自动对这些资源发起新的请求。
   -->
   <!-- 
      注意：在服务端中，文件中的路径就不要去写相对路径了。
      因为这个时候所有的资源都是通过 url 标识来获取的
      我的服务器开放了 /public/ 目录
      所以这里的请求路径都写成：/public/xxx
      / 在这里就是 url 根路径的意思。
      浏览器在真正发请求的时候会最终把 http://127.0.0.1:3000 拼上

      不要再想文件路径了，把所有的路径都想象成 url 地址
    -->
  <link rel="stylesheet" href="/public/lib/bootstrap/css/bootstrap.css">
</head>

<body>
  <div class="header container">
    <div class="page-header">
      <h1>Example page header <small>Subtext for header</small></h1>
      <a class="btn btn-success" href="/post">发表留言</a>
    </div>
  </div>
  <div class="comments container">
    <ul class="list-group">
      {{each comments_front}}
      <li class="list-group-item">{{ $value.name }}说：{{ $value.message }} <span class="pull-right">{{ $value.dateTime }}</span></li>
      {{/each}}
    </ul>
  </div>
</body>

</html>

```



```html
<!--post.html-->
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <link rel="stylesheet" href="/public/lib/bootstrap/css/bootstrap.css">
</head>

<body>
  <div class="header container">
    <div class="page-header">
      <h1><a href="/">首页</a> <small>发表评论</small></h1>
    </div>
  </div>
  <div class="comments container">
    <!-- 
      以前表单是如何提交的？
      表单中需要提交的表单控件元素必须具有 name 属性
      表单提交分为：
        1. 默认的提交行为
        2. 表单异步提交

        action 就是表单提交的地址，说白了就是请求的 url 地址
        method 请求方法
            get
            post
     -->
    <form action="/pinglun" method="get">
      <div class="form-group">
        <label for="input_name">你的大名</label>
        <input type="text" class="form-control" required minlength="2" maxlength="10" id="input_name" name="name" placeholder="请写入你的姓名">
      </div>
      <div class="form-group">
        <label for="textarea_message">留言内容</label>
        <textarea class="form-control" name="message" id="textarea_message" cols="30" rows="10" required minlength="5" maxlength="20"></textarea>
      </div>
      <button type="submit" class="btn btn-default">发表</button>
    </form>
  </div>
</body>

</html>

```



```html
<!--404.html-->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
</head>
<body>
  <h1>抱歉!  您访问的页面失联啦...</h1>
</body>
</html>

```



```javascript
//app.js

var http = require('http')
var fs = require('fs')
var url = require('url')
var template = require('art-template')

var comments = [
  {
    name: '张三',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三2',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三3',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三4',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三5',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  }
]

// /pinglun?name=的撒的撒&message=的撒的撒的撒
// 对于这种表单提交的请求路径，由于其中具有用户动态填写的内容
// 所以你不可能通过去判断完整的 url 路径来处理这个请求
// 
// 结论：对于我们来讲，其实只需要判定，如果你的请求路径是 /pinglun 的时候，那我就认为你提交表单的请求过来了

http
  .createServer(function (req, res) { // 简写方式，该函数会直接被注册为 server 的 request 请求事件处理函数
    // 使用 url.parse 方法将路径解析为一个方便操作的对象，第二个参数为 true 表示直接将查询字符串转为一个对象（通过 query 属性来访问）
    var parseObj = url.parse(req.url, true)

    // // 单独获取不包含查询字符串的路径部分（该路径不包含 ? 之后的内容）
    var pathname = parseObj.pathname
    if (pathname === '/') {
      fs.readFile('./views/index.html', function (err, data) {
        if (err) {
          res.end('404 Not Found.')
        }else{
         var ret= template.render(data.toString(),{
          //第一个comments是views/index.html Html中的{{comments}}
          //第二个是本js中的comments数组
           comments_front:comments
          })
          res.end(ret)
       }
      })
 
    } else if (pathname === '/post') {
      //这里写成/post,index.htm页面中点击”发表留言“<a>标签中的href="/post"
      //而不是/post.html,美化url
      // 其它的都处理成 404 找不到
      fs.readFile('./views/post.html', function (err, data) {
        if (err) {
          res.end('404 Not Found.')
        }else{
           res.end(data)
        }
       
      })
    } else if(url.indexOf('/public/') === 0) {
      // indexOf('/public/')是匹配url是不是以public开头
      // /public/css/main.css
      // /public/js/main.js
      // /public/lib/jquery.js
      // 统一处理：
      //    如果请求路径是以 /public/ 开头的，则我认为你要获取 public 中的某个资源
      //    所以我们就直接可以把请求路径当作文件路径来直接进行读取
      fs.readFile('.' + pathname, function (err, data) {
        if (err) {
          return res.end('404 Not Found.')
        }
        res.end(data)
      })
     }
     else if (pathname === '/pinglun') {
       // 注意：这个时候无论 /pinglun?xxx 之后是什么，我都不用担心了，因为我的 pathname 是不包含 ? 之后的那个路径
      // 一次请求对应一次响应，响应结束这次请求也就结束了
       // res.end(JSON.stringify(parseObj.query))

       // 我们已经使用 url 模块的 parse 方法把请求路径中的查询字符串给解析成一个对象了
       // 所以接下来要做的就是：
       //    1. 获取表单提交的数据 parseObj.query
       //    2. 将当前时间日期添加到数据对象中，然后存储到数组中
       //    3. 让用户重定向跳转到首页 /
       //       当用户重新请求 / 的时候，我数组中的数据已经发生变化了，所以用户看到的页面也就变了
       var comment = parseObj.query
       //给对象增加一个dateTime属性
       comment.dateTime = '2017-11-2 17:11:22'
         //commments是数组，unshift是在数组开头插入数据
       comments.unshift(comment)
    //   // 服务端这个时候已经把数据存储好了，接下来就是让用户重新请求 / 首页，就可以看到最新的留言内容了

    //   // 如何通过服务器让客户端重定向？
    //   //    1. 状态码设置为 302 临时重定向
    //   //        statusCode
    //   //    2. 在响应头中通过 Location 告诉客户端往哪儿重定向
    //   //        setHeader
    //   // 如果客户端发现收到服务器的响应的状态码是 302 就会自动去响应头中找 Location ，然后对该地址发起新的请求
    //   // 所以你就能看到客户端自动跳转了
       res.statusCode = 302
       res.setHeader('Location', '/')
       res.end()
     } 
    else {
      // 其它的都处理成 404 找不到
      fs.readFile('./views/404.html', function (err, data) {
        if (err) {
          //即使404.html找不到，也要打印文字
          //由于网页的<mata>中写了charset=”utf-8“，所以不需要加之前的response.setHeader("Content-type","text/plain; charset=utf-8")来防止乱码了
          return res.end('404 Not Found.')
        }else{
          res.end(data)
        }
        
      })
    }
  })
  .listen(3000, function () {
    console.log('running...')
  })


```

* 以上案例中出现重定向的用法，通过get传参数，后台获取，并取出参数的用法

```javascript
//如何通过服务器让客户端重定向？
      //    1. 状态码设置为 302 临时重定向，301是永久重定向【】
      //        statusCode
      //    2. 在响应头中通过 Location 告诉客户端往哪儿重定向
      //        setHeader
      // 如果客户端发现收到服务器的响应的状态码是 302 就会自动去响应头中找 Location ，然后对该地址发起新的请求
      // 所以你就能看到客户端自动跳转了
 response.statusCode = 302
      response.setHeader('Location', '/') //  /是网页根目录的意思，即127.0.0.1：3000
      respose.end(JSON.stringify(parseObj.query))s
```

```javascript
 //把request.url中的参数和相对路径取出来
var url=require("url")
  //使用 url.parse 方法将get提交的路径中的参数解析为一个方便操作的对象，第二个参数为 true 表示直接将url的参数部分转为一个对象（通过 query 属性来访问）   
 var parseObj = url.parse(req.url, true)
    //parseObj的query,取出参数部分，是对象
    // parseObj的字段：pathname。单独获取不包含查询字符串的路径部分（该路径不包含 ? 之后的内容）
    //例如当使用url发起get请求时，“127.0.0.1：3000/index.html?user=1&&msg=2”
    //request.url是获取到“/index.html?user=1&&msg=2”
    //parseObj.pathname获取"/index.html"
    var pathname = parseObj.pathname
```

## 1.8 Node中的Console

打开cmd，在任意目录下,输入``node``回车，进入node的控制台

而且不用require，可以直接使用核心模块

# 2.NPM

## 2.1 基础

* npm全称： node package manager，

* 中文文档：https://www.npmjs.cn/

* npm是一个包管理器，可以用来下带第三方包（模块），在cmd中，用```cd```命令移动到想要下载的目录下，使用```npm install 模块名```命令安装

* 下载：直接下在nodejs,安装时会让选择下载npm

* npm的常用命令

  ```
  --save 添加到package.json
  --global 安装到全局，在任意目录下安装都可以
  ```

  ```shell
  //查出npm版本
  nmp --version
  
  //升级npm本身
  npm install --global npm
  ```

  ```shell
  //找出package.json中的dependencies中的内容下载项目的依赖包
  npm install
  
  //仅下载包，不添加package.json的dependencies中
  npm install 包名
  //仅卸载包，删除package.json的dependencies中的包名
  npm uninstall 包名
  
  
  //把下载的包名和版本号，添加到package.json的dependencies中
  npm install 包名 --save
  //卸载，删除package.json的dependencies中的包名
  npm uninstall 包名 --save
  
  
  //下载指定版本的包
  npm install XXX@版本号
  ```

  ```shell
  //显示所有npm命令
  npm -help
  ```

* 解决npm被墙问题

  由于npm的服务器在国外，访问很慢。

  使用淘宝的镜像

  * 使用``cnpm``

    ```
    //安装淘宝的cnpm，在任意目录下执行就好，cnpm是安装到全局
    npm install --global cnpm
    
    //使用的所有npm命令，可把npm替换成cnpm，就是走的淘宝的镜像
    ```

  * 不想使用```cnpm```,但又想使用淘宝的镜像

    ```
    npm config set registry https://registry.npm.taobao.org
    
    //如何查看是否配置成功
    npm config list
    //查看registry的内容
    ```

    

## 2.2 package.json

* 建议每个项目根目录下都生成一个``package.json``

* 使用 ```npm init```会询问一些问题，输入要填的内容，如果跳过不填，直接打回车。最后会生成一个``package.json``文件

  也可以直接使用```npm init -y```不询问直接生成``package.json``,之后再到文件中修改

```bash
D:\markdown_note>npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help json` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (markdown_note)
version: (1.0.0)
description:
entry point: (index.js)
test command:
git repository:
keywords:
author:
license: (ISC)
About to write to D:\markdown_note\package.json:

{
  "name": "markdown_note",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}


Is this OK? (yes)

D:\markdown_note>
```

* 使用```npm install XXX ```会产生一个```node_modules```和一个```package-lock.json```。我建议使用```npm install XXX  --save```这样会在```npm init```中生成的package.json中添加(新版本的npm，不用加--save就可以直接添加到package.json中了)

  ```
  "dependencies": {
      "XXX": "XXX的版本号"
    }
  ```

  可方便的看出项目依赖的包，当项目依赖的包（即node_modules文件夹）缺失时，只要有``package.json``文件,在当前目录下执行``npm install``就可以恢复项目依赖的包

## 2.3 package-lock.json

npm 5以前是没有的，npm 5以后才加入

通过``npm install XXX``安装包时，会自动生成``package-lock.json``文件

* 其中存储，所有``module``文件夹下所有模块的下载地址，版本等信息，``npm install``时``package.json``中的``dependencies``字段中记录了项目的依赖包，``package-lock.json``中记录了依赖包的下载地址和版本信息（只会下载这个版本，不会升级）
* 锁定版本，原本项目依赖XX包的``1.1.1``版本，但是后来出了新版本，以前的npm不能生成``package-lock.json``,``npm install``重新安装项目包时，会自动安装最新的版本，可能会带来些问题

## 2.4 常用的命令

安装/卸载当前目录下的包

```shell
npm install 包名
npm uninstall 包名
```

全局

```shell
npm install -g 包名
npm uninstall -g 包名
```

查看当前目录下的包列表,加-g是查看全局列表

```shell
npm list --depth=0
```





# 3. Express

### 3.1.1 什么是Express

* 第三方Web开发框架

* 高度封装了http模块，原生http在某些方面不足以满足我们的需求，所以使用框架来提高效率

* 更加专注与业务，而非底层细节


### 3.1.2 Express的安装

* 官网：https://www.expressjs.com.cn/

* 按照标准流程来：

  * ```shell
    //生成package.json
    npm init -y
    ```

  * ```shell
    //下载express
    npm install express --save
    ```

* 基本路由

  ```javascript
  //get
  app.get("/",function(request,response){
  	response.send("hello express!")
  })
  //post
  app.post("/",function(request,response){
  	response.send("hello express!")
  })
  
  //如果访问没有的目录会在浏览器显示Cannot GET /xxx
  //express的优点，不用再用if对路径进行判断，不用setHeader设置Content-type,以防止中文乱码
  ```

* 静态服务

  ```javascript
  //公开指定目录
  //第一个参数是127.0.0.1：3000后面的部分，第二个参数是相对于当前js文件的相对路径
  //公开访问/public/下的所有静态资源文件，上面的get都是访问指定文件，不能公开整个文件夹
  app.use("/public/",express.static("./public/"))
  ```
  
  

* express的使用

  ```javascript
  //1.引入模块
  var express=require("express")
  //2.创建服务器，相当于之前的http.createServer
  var app=express()
  //3.当服务器收到get请求
  app.get("/",function(request,response){
  	response.send("hello express!")
  })
  
  app.get("/about",function(request,response){
  	response.send("about 页面")
  })
  
  app.use("/public/",express.static("./public/"))
  
  //4.监听接口，相当于server.listen
  app.listen(3000,function(){
  	console.log("app is running at port 3000")
  })
  
  ```

### 3.2 在Express中配置模板引擎art-template

* 文档：https://aui.github.io/art-template/zh-cn/docs/

* ```shell
  npm install --save art-template
  npm install --save express-art-template
  ```

* 用法示例

  ```javascript
  //1.引入Express
  var express=require("express")
  //2.创建服务器，相当于之前的http.createServer
  var app=express()
  //3.当服务器响应请求
  
  //在express中引用模板引擎art-template
  app.engine('html', require('express-art-template'));
  
  app.get("/",function(request,response){
    //发送数据到前台页面
    //response.send("index page")
    //引用模板引擎后，response有了render(网页相对路径，模板数据)方法
    //Express中有一个约定，rendre函数在views目录下去找网页，所以第一个参数是views文件夹下的的路径
    response.render("index.html")
  })
  
  app.get("/post",function(request,response){
    response.render("post.html")
  })
  //公开指定目录,第一个是127.0.0.1：3000后面的部分，第二个参数是相对于当前js文件的相对路径
  //公开访问/public/下的所有静态资源文件，上面的get都是指定访问文件，不能公开整个文件夹
  app.use("/public/",express.static("./public/"))
  
  
  
  
  
  //4.监听接口，相当于server.listen
  app.listen(3000,function(){
    console.log("app is running at port 3000")
  })
  ```

### 3.3 Express的中间件

#### 官方文档

https://www.expressjs.com.cn/resources/middleware.html

#### 分为几类（next参数是可选的）：

* 不关心请求路径和请求方法的中间件

```js
var app=express()
//请求任何路径都会进入，当请求进来，会从第一个中间件开始
app.use(function(request,response,next){
	console.log(1)
	next()//调用下一个满足要求的中间件
})
app.use(function(request,response,next){
	console.log(2)
	next()//下一个要求是/a开头，不匹配，就不会进入
})
app.use("/a",function(request,response){
	console.log(3)
})
//结果：
//1
//2
```

* 关心路径，以/XX开头的

```js
//以/a开头的路径，例如：/a/b
app.use("/a",function(request,response,next){

})
```

* 关心路径，严格要求等于/XX的

```js
//路径是/a
app.get("/a",function(request,response,next){

})
```

### 3.4 用Express写重写留言板案例（用模板引擎,读数组数据）

```html
<!--html文件不变-->
<!--index.html文件不变-->
<!-- post.html文件不变-->
<!-- 404.html文件不变-->
```

```javascript
//app.js

//1.引入Express
var express=require("express")
//2.创建服务器，相当于之前的http.createServer
var app=express()
//3.当服务器响应请求

//在express中引用模板引擎art-template
app.engine('html', require('express-art-template'));

var comments = [
  {
    name: '张三',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三2',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三3',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三4',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三5',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  }
]

app.get("/",function(request,response){
  //发送数据到前台页面
  //response.send("index page")
  //引用模板引擎后，response有了render(网页相对路径，模板数据)方法
  //Express中有一个约定，rendre函数在views目录下去找网页，所以第一个参数是views文件夹下的的路径
  response.render("index.html",{
    comments_front:comments
  })
})

app.get("/post",function(request,response){
  response.render("post.html")
})

app.get("/pinglun",function(request,response){
  //Express的response的query可直接获得get通过url传过来的参数
  //之前需要用url模块的parse把url解析成对象来操作
  var comment = request.query
  comment.dateTime = '2017-11-2 17:11:22'
  //commments是数组，unshift是在数组开头插入数据
  comments.unshift(comment)
  //重定向express封装了一个重定向函数
  response.redirect("/")
})

//公开指定目录,第一个是127.0.0.1：3000后面的部分，第二个参数是相对于当前js文件的相对路径
//公开访问/public/下的所有静态资源文件，上面的get都是指定访问文件，不能公开整个文件夹
app.use("/public/",express.static("./public/"))
//
app.use(function(request,response){
    //所有未用app.get/app.post处理的路径都会执行到这里。用来返回404页面
})

//4.监听接口，相当于server.listen
app.listen(3000,function(){
  console.log("app is running at port 3000")
})
```

以上代码在post.html页面使用``get``方式提交，需要``app.get("/pinglun")``实际上是发起了一个request请求。下面讲解怎么响应``post``请求

#### 在Express中如何获取get请求的数据

```
request.query  
```

#### 在Express中如何获取post请求的数据

在Express中没有内置获取表单``post``请求的API，这里我们需要一个第三方包``body-parser``

* Express官网，Express middleware（中间件）下载：https://www.expressjs.com.cn/resources/middleware.html

* 安装

  ```shell
  //save添加到package.json的依赖项
  npm install body-parser --save
  ```

* 配置

  ```javascript
  //在留言板案例app.js加入
  var express = require('express')
  //要引入body=parser
  var bodyParser = require('body-parser')
  
  var app = express()
  // 配置body-parse后，request就会多一个body属性来获取post请求数据了
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  
  ```

* ```javascript
  //把留言板的app.js中的app.get("pinglun").....换成以下代码
  
  app.post("/post",function(request,response){
    //1.先获取表单post的请求体数据
    var comment = request.body
     //2.处理
    comment.dateTime = '2017-11-2 17:11:22'
    //commments是数组，unshift是在数组开头插入数据
    comments.unshift(comment)
    //重定向express封装了一个重定向函数
    response.redirect("/")
   
   
  })
  ```

* ```html
  <!--post.html-->
  <!--把form标签的提交方式换成post-->
  <form action="/post" method="post">	
  ```


### 3.5 修改完代码自动重启

之前每次修改完代码，都需要使用``ctrl+c``来结束服务器，并重新启动。

我们这里使用第三方工具工具：```nodemon```来解决修改代码后必须手动重启的问题。``nodemon``是居于Nodejs开发的第三方命令行工具，我们需要独立安装

```
//global是全局命令,在任意位置安装 
npm install --global nodemon
```

安装完之后，使用：

```
//不使用 node 文件名 来启动了
//使用
nodemon 文件名
```

### 3.6 异步编程

#### 回调函数

异步函数，函数执行不会等一个执行完了才下一句，为了让函数直接返回结果，必须使用回调函数

```javascript
//readFile是异步函数，这两句执行的先后顺序不一定
fs.readFile("./A.txt",function(error,data){
	console.log(data.toString())
})
fs.readFile("./B.txt",function(error,data){
	console.log(data.toString())
})
fs.readFile("./C.txt",function(error,data){
	console.log(data.toString())
})
```

#### 回调地狱

为了让他异步函数的顺序确定，使用嵌套，这种方式称为"回调地狱嵌套"（代码很混乱，不利于维护）

```javascript
fs.readFile("./A.txt",function(error,data){
	if(error){
		console.log("读取失败")
	}else{
		fs.readFile("./B.txt",function(error,data){
			if(error){
				console.log("读取失败")
			}else{
                fs.readFile("./C.txt",function(error,data){
                    if(error){
						console.log("读取失败")
					}else{
                        console.log("读取成功")
                    }
                }
            }
})
	}
})


```

#### Promise

![Promise](https://github.com/heyingjiee/markdown_image/blob/master/Nodejs_note_image/Promise.png?raw=true)

pending -进行状态

resolve  -成功状态

reject  -失败状态

在ES6中新增了一个API Promise

```javascript
var fs=require("fs")

//promise是一个构造函数,本身不是异步
//创建一个Promise容器，里面放异步操作，容器状态是pending
var p1=new Promise(function(resolve,reject){
	//readFile返回的是十六进制数据，加上utf-8参数，就会转成字符串
	fs.readFile("./a.txt","utf-8",function(error,data){
		if(error){
			//把容器的pending状态转为rejected
			reject(error)
		}else{
			//把容器的pending状态转为resolve
			resolve(data)
		}
	}) 
})

//p1就是那个Promise,当P1成功了，然后（then）指定操作
//then接收的:第一个function就是容器中的resolve函数中的内容;第二个是reject中的内容
p1.then(function(data){
	console.log(data)
},function(error){
	console.log(error)
})
```

Promise解决异步函数的的“回调地狱嵌套”的问题，成了链式调用

```js
var fs=require("fs")
//promise是一个构造函数,本身不是异步
//创建一个Promise容器，里面放异步操作，容器状态是pending
var p1=new Promise(function(resolve,reject){
	//
	fs.readFile("./a.txt","utf-8",function(error,data){
		if(error){
			//把容器的pending状态转为rejected
			reject(error)
		}else{
			//把容器的pending状态转为resolve
			resolve(data)
		}
	}) 
})


var p2=new Promise(function(resolve,reject){
	//
	fs.readFile("./b.txt","utf-8",function(error,data){
		if(error){
			//把容器的pending状态转为rejected
			reject(error)
		}else{
			//把容器的pending状态转为resolve
			resolve(data)
		}
	}) 
})

//p1就是那个Promise,当P1成功了，然后（then）指定操作
//then方法接收的:第一个function可以return其他Promise  p2，下一个then就相当于p2.then()
p1
	.then(function(data){
		console.log(data)
		return p2
	},function(error){
		console.log(error)
	})
	.then(function(data){
		console.log(data)
	},function(error){
		console.log(error)
	})
```

但是仍然readFile重复，对Promise封装

```javascript
var fs=require("fs")
//return一个Promise
function pReadFile(filePath){
	return new Promise(function(resolve,reject){
		fs.readFile(filePath,"utf-8",function(error,data){
			if(error){
				reject(error)
			}else{
				resolve(data)
			}
		})
	})
}
pReadFile("./a.txt") 
	.then(function(data){
		console.log(data)
		return pReadFile("./b.txt")
})
.then(function(data){
	console.log(data)
})


```

### 3.7 综合案例:学生管理系统(使用模板引擎，对json文件进行增删改查)

按照标准流程

* 建立项目目录

  ![目录结构](https://github.com/heyingjiee/markdown_image/blob/master/Nodejs_note_image/crud_struct.png?raw=true)

  

* 安装需要的模块

  ```shell
  //在crud目录下
  
  //生成package.json
  npm init
  
  //安装Express
  npm install express --save
  
  //安装Express中的模板引擎art-template
  npm install --save art-template
  npm install --save express-art-template
  
  
  //完毕后
  //目录增加以下文件出现：
  //node_moudules文件夹和package-lock.json
  //package.json
  
  ```

* 使用bootstrap的模板

  ![1，2步](https://github.com/heyingjiee/markdown_image/blob/master/Nodejs_note_image/download_UI.png?raw=true)

  ![3步](https://github.com/heyingjiee/markdown_image/blob/master/Nodejs_note_image/admin_UI.png?raw=true)

  右键，“查看网页源代码”。复制代码，在``views``文件夹下，建立``index.html``把代码粘贴进去

  下载bootstrap

  ```
  npm install bootstrap --save
  ```

  修改``index.html``把``<head>``标签中的引用资源地址改到``node_modules/bootstrap``,如果有的文件``node_modules/bootstrap``下没有，则在“查看网页源代码”页面点击对应文件，把源码保存到本地

  ``views``文件夹下放置：index.html   new.html    edit.html

  ```html
  <!--index.html-->
  <!DOCTYPE html>
  <html lang="zh-CN">
    <head>
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <!-- 上述3个meta标签*必须*放在最前面，任何其他内容都*必须*跟随其后！ -->
      <meta name="description" content="">
      <meta name="author" content="">
      <link rel="icon" href="../../favicon.ico">
  
      <title>Dashboard Template for Bootstrap</title>
  
      <!-- Bootstrap core CSS -->
      <link href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
  
      <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
      <link href="../../assets/css/ie10-viewport-bug-workaround.css" rel="stylesheet">
  
      <!-- Custom styles for this template -->
      <link href="/public/css/style.css" rel="stylesheet">
  
      <!-- Just for debugging purposes. Don't actually copy these 2 lines! -->
      <!--[if lt IE 9]><script src="../../assets/js/ie8-responsive-file-warning.js"></script><![endif]-->
      <script src="../../assets/js/ie-emulation-modes-warning.js"></script>
  
      <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
      <!--[if lt IE 9]>
        <script src="https://cdn.bootcss.com/html5shiv/3.7.3/html5shiv.min.js"></script>
        <script src="https://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
      <![endif]-->
    </head>
  
    <body>
  
      <nav class="navbar navbar-inverse navbar-fixed-top">
        <div class="container-fluid">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">Project name</a>
          </div>
          <div id="navbar" class="navbar-collapse collapse">
            <ul class="nav navbar-nav navbar-right">
              <li><a href="#">Dashboard</a></li>
              <li><a href="#">Settings</a></li>
              <li><a href="#">Profile</a></li>
              <li><a href="#">Help</a></li>
            </ul>
            <form class="navbar-form navbar-right">
              <input type="text" class="form-control" placeholder="Search...">
            </form>
          </div>
        </div>
      </nav>
  
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-3 col-md-2 sidebar">
            <ul class="nav nav-sidebar">
              <li class="active"><a href="#">Overview <span class="sr-only">(current)</span></a></li>
              <li><a href="#">Reports</a></li>
              <li><a href="#">Analytics</a></li>
              <li><a href="#">Export</a></li>
            </ul>
            <ul class="nav nav-sidebar">
              <li><a href="">Nav item</a></li>
              <li><a href="">Nav item again</a></li>
              <li><a href="">One more nav</a></li>
              <li><a href="">Another nav item</a></li>
              <li><a href="">More navigation</a></li>
            </ul>
            <ul class="nav nav-sidebar">
              <li><a href="">Nav item again</a></li>
              <li><a href="">One more nav</a></li>
              <li><a href="">Another nav item</a></li>
            </ul>
          </div>
          <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
            <h1 class="page-header">学生管理</h1>
            <a class="btn btn-success" href="students/new">添加学生</a>
            
            <div class="table-responsive">
  
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>姓名</th>
                    <th>性别</th>
                    <th>年龄</th>
                    <th>爱好</th>
                  </tr>
                </thead>
                <tbody>
                  {{ each students_front }}
                   <tr>
                      <td>{{ $value.id }}</td>
                      <td>{{ $value.name }}</td>
                      <td>{{ $value.gender }}</td>
                      <td>{{ $value.age }}</td>
                      <td>{{ $value.hobbies }}</td>
                      <td>
                        <a href ="students/edit?id={{$value.id}}">修改学生</a>
                        <a href ="students/delete?id={{$value.id}}">删除学生</a>
                   </tr>
                  {{ /each }}
                 
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Bootstrap core JavaScript
      ================================================== -->
      <!-- Placed at the end of the document so the pages load faster -->
      <script src="https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"></script>
      <script>window.jQuery || document.write('<script src="../../assets/js/vendor/jquery.min.js"><\/script>')</script>
      <script src="https://cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
      <!-- Just to make our placeholder images work. Don't actually copy the next line! -->
      <script src="../../assets/js/vendor/holder.min.js"></script>
      <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
      <script src="../../assets/js/ie10-viewport-bug-workaround.js"></script>
    </body>
  </html>
  
  ```

  ```html
  <!--new.html-->
  <!DOCTYPE html>
  <html lang="zh-CN">
    <head>
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <!-- 上述3个meta标签*必须*放在最前面，任何其他内容都*必须*跟随其后！ -->
      <meta name="description" content="">
      <meta name="author" content="">
      <link rel="icon" href="../../favicon.ico">
  
      <title>Dashboard Template for Bootstrap</title>
  
      <!-- Bootstrap core CSS -->
      <link href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
  
      <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
      <link href="../../assets/css/ie10-viewport-bug-workaround.css" rel="stylesheet">
  
      <!-- Custom styles for this template -->
      <link href="/public/css/style.css" rel="stylesheet">
  
      <!-- Just for debugging purposes. Don't actually copy these 2 lines! -->
      <!--[if lt IE 9]><script src="../../assets/js/ie8-responsive-file-warning.js"></script><![endif]-->
      <script src="../../assets/js/ie-emulation-modes-warning.js"></script>
  
      <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
      <!--[if lt IE 9]>
        <script src="https://cdn.bootcss.com/html5shiv/3.7.3/html5shiv.min.js"></script>
        <script src="https://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
      <![endif]-->
    </head>
  
    <body>
  
      <nav class="navbar navbar-inverse navbar-fixed-top">
        <div class="container-fluid">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">Project name</a>
          </div>
          <div id="navbar" class="navbar-collapse collapse">
            <ul class="nav navbar-nav navbar-right">
              <li><a href="#">Dashboard</a></li>
              <li><a href="#">Settings</a></li>
              <li><a href="#">Profile</a></li>
              <li><a href="#">Help</a></li>
            </ul>
            <form class="navbar-form navbar-right">
              <input type="text" class="form-control" placeholder="Search...">
            </form>
          </div>
        </div>
      </nav>
  
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-3 col-md-2 sidebar">
            <ul class="nav nav-sidebar">
              <li class="active"><a href="#">Overview <span class="sr-only">(current)</span></a></li>
              <li><a href="#">Reports</a></li>
              <li><a href="#">Analytics</a></li>
              <li><a href="#">Export</a></li>
            </ul>
            <ul class="nav nav-sidebar">
              <li><a href="">Nav item</a></li>
              <li><a href="">Nav item again</a></li>
              <li><a href="">One more nav</a></li>
              <li><a href="">Another nav item</a></li>
              <li><a href="">More navigation</a></li>
            </ul>
            <ul class="nav nav-sidebar">
              <li><a href="">Nav item again</a></li>
              <li><a href="">One more nav</a></li>
              <li><a href="">Another nav item</a></li>
            </ul>
          </div>
          <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
            <h1 class="page-header" >新增学生</h1>
            <!--name属性是返回后台的key，input标签的输入就是value，而radio的value是它的属性value的值-->
            <form action="/students/new" method="post">
              <div class="form-group">
                <label for="">姓名</label>
                <input type="text" id="" name="name">
              </div>
              <div class="form-group">
                <label for="">性别</label>
                <label class="radio-inline">
                  <input type="radio" name="gender" id="inlineRadio1" value="1"> 男
                </label>
                <label class="radio-inline">
                  <input type="radio" name="gender" id="inlineRadio2" value="0"> 女
                </label>
                         
              </div>
              <div class="form-group">
                <label for="">年龄</label>
                <input type="number" id="" name="age">
              </div>
              <div class="form-group">
                <label for="">爱好</label>
                <input type="text" id="" name="hobbies">
              </div>
          
              <button type="submit" class="btn btn-default">提交</button>
            </form>
          </div>
        </div>
      </div>
  
      <!-- Bootstrap core JavaScript
      ================================================== -->
      <!-- Placed at the end of the document so the pages load faster -->
      <script src="https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"></script>
      <script>window.jQuery || document.write('<script src="../../assets/js/vendor/jquery.min.js"><\/script>')</script>
      <script src="https://cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
      <!-- Just to make our placeholder images work. Don't actually copy the next line! -->
      <script src="../../assets/js/vendor/holder.min.js"></script>
      <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
      <script src="../../assets/js/ie10-viewport-bug-workaround.js"></script>
    </body>
  </html>
  
  ```

  

  ```html
  <!--edit.html-->
  <!DOCTYPE html>
  <html lang="zh-CN">
    <head>
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <!-- 上述3个meta标签*必须*放在最前面，任何其他内容都*必须*跟随其后！ -->
      <meta name="description" content="">
      <meta name="author" content="">
      <link rel="icon" href="../../favicon.ico">
  
      <title>Dashboard Template for Bootstrap</title>
  
      <!-- Bootstrap core CSS -->
      <link href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
  
      <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
      <link href="../../assets/css/ie10-viewport-bug-workaround.css" rel="stylesheet">
  
      <!-- Custom styles for this template -->
      <link href="/public/css/style.css" rel="stylesheet">
  
      <!-- Just for debugging purposes. Don't actually copy these 2 lines! -->
      <!--[if lt IE 9]><script src="../../assets/js/ie8-responsive-file-warning.js"></script><![endif]-->
      <script src="../../assets/js/ie-emulation-modes-warning.js"></script>
  
      <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
      <!--[if lt IE 9]>
        <script src="https://cdn.bootcss.com/html5shiv/3.7.3/html5shiv.min.js"></script>
        <script src="https://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
      <![endif]-->
    </head>
  
    <body>
  
      <nav class="navbar navbar-inverse navbar-fixed-top">
        <div class="container-fluid">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">Project name</a>
          </div>
          <div id="navbar" class="navbar-collapse collapse">
            <ul class="nav navbar-nav navbar-right">
              <li><a href="#">Dashboard</a></li>
              <li><a href="#">Settings</a></li>
              <li><a href="#">Profile</a></li>
              <li><a href="#">Help</a></li>
            </ul>
            <form class="navbar-form navbar-right">
              <input type="text" class="form-control" placeholder="Search...">
            </form>
          </div>
        </div>
      </nav>
  
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-3 col-md-2 sidebar">
            <ul class="nav nav-sidebar">
              <li class="active"><a href="#">Overview <span class="sr-only">(current)</span></a></li>
              <li><a href="#">Reports</a></li>
              <li><a href="#">Analytics</a></li>
              <li><a href="#">Export</a></li>
            </ul>
            <ul class="nav nav-sidebar">
              <li><a href="">Nav item</a></li>
              <li><a href="">Nav item again</a></li>
              <li><a href="">One more nav</a></li>
              <li><a href="">Another nav item</a></li>
              <li><a href="">More navigation</a></li>
            </ul>
            <ul class="nav nav-sidebar">
              <li><a href="">Nav item again</a></li>
              <li><a href="">One more nav</a></li>
              <li><a href="">Another nav item</a></li>
            </ul>
          </div>
          <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
            <h1 class="page-header" >修改学生</h1>
            <!--name属性是返回后台的key，input标签的输入就是value，而radio的value是它的属性value的值-->
            <form action="edit" method="post">
              <label name="id"  >学生ID：{{ id }}</label> 
              <input type="hidden" name="id" value="{{id}}">
              <div class="form-group">
                <label for="">姓名</label>
                <input type="text" id="" name="name">
              </div>
              <div class="form-group">
                <label for="">性别</label>
                <label class="radio-inline">
                  <input type="radio" name="gender" id="inlineRadio1" value="1"> 男
                </label>
                <label class="radio-inline">
                  <input type="radio" name="gender" id="inlineRadio2" value="0"> 女
                </label>
                         
              </div>
              <div class="form-group">
                <label for="">年龄</label>
                <input type="number" id="" name="age">
              </div>
              <div class="form-group">
                <label for="">爱好</label>
                <input type="text" id="" name="hobbies">
              </div>
          
              <button type="submit" class="btn btn-default">提交</button>
            </form>
          </div>
        </div>
      </div>
  
      <!-- Bootstrap core JavaScript
      ================================================== -->
      <!-- Placed at the end of the document so the pages load faster -->
      <script src="https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"></script>
      <script>window.jQuery || document.write('<script src="../../assets/js/vendor/jquery.min.js"><\/script>')</script>
      <script src="https://cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
      <!-- Just to make our placeholder images work. Don't actually copy the next line! -->
      <script src="../../assets/js/vendor/holder.min.js"></script>
      <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
      <script src="../../assets/js/ie10-viewport-bug-workaround.js"></script>
    </body>
  </html>
  
  ```

  建立``app.js``文件

  ```javascript
  //app.js 入口模块
  //	职责：
  //		启动服务器
  //		做一些相关配置
  //		body-parser解析表单post请求体
  //		提供静态资源服务
  //		挂在路由
  //		监听接口
  
  var express=require("express")
  var bodyParser = require('body-parser')
  //导入自己写的router.js
  var router=require("./router")
  
  var app=express()
  //配置模板引擎art-template
  app.engine('html', require('express-art-template'));
  
  // 配置body-parse后，request就会多一个body属性来获取post请求数据了
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  
  //公开目录,使得css，js,img,lib下的静态资源可以被访问到
  app.use("/public/",express.static("./public/"))
  app.use("/node_module/",express.static("./node_module/"))
  
  //把路由容器挂载到app服务上来
  //注意：配置模板引擎和用body-parser中间件，要在挂载路由之前
  app.use(router)
  
  app.listen("3000",function(){
  	console.log("running...")
  })
  ```

  建立``router.js``负责路由

  路由设计：

  | 请求方法 | 请求路径         | get参数 | post参数                | 备注             |
  | -------- | ---------------- | ------- | ----------------------- | ---------------- |
  | GET      | /students        |         |                         | 渲染首页         |
  | GET      | /students/new    |         |                         | 渲染添加学生页面 |
  | POST     | /students/new    |         | name,age,gender,hobbies | 处理添加请求     |
  | GET      | /students/edit   | id      |                         | 渲染编辑页面     |
  | POST     | /students/edit   |         | name,age,gender,hobbies | 处理编辑请求     |
  | GET      | /students/delete | id      |                         | 处理删除请求     |

  ```javascript
  //student是自己写的封装好的读写函数
  var Student=require("./student")
  //Express中提供专门的方式来包装路由
  var express=require("express")
  
  
  //1.创建一个路由容器
  var router=express.Router()
  
  
  //2.把路由都挂载到router容器中
  router.get("/students",function(request,response){
  	Student.find(function(error,students){//把readFile的结果塞进两个形参里	
  		if(error){
  			console.log(error)
  			return response.status(500).send("Server error")	
  		}else{
  			response.render("index.html",{
  				students_front:students				
  			})
  		}
  	}) 
  	
  })
  
  
  router.get("/students/new",function(request,response){
  	response.render("new.html")
  })
  router.post("/students/new",function(request,response){
  	//1.获取post表单,request.body
  	
  	//2.处理数据
  	//把db.json文件读出来（字符串），转化为对象，添加表单数据，再写回文件
  
  	//3.发回响应
  	//所有步骤封装在student.js的函数里
  	Student.save(request.body,function(error){
  		if(error){
  			return response.status(500).send("Server error")
  		}else{
  			response.redirect("/students")
  		}
  		
  	})
  
  })
  
  
  
  router.get("/students/edit",function(request,response){
  	response.render("edit.html",{
  		id:request.query.id
  
  	})
  })
  router.post("/students/edit",function(request,response){
  	Student.updateById(request.body,function(error){
  		if(error){
  			return response.status(500).send("Server error")
  		}else{
  			response.redirect("/students")
  		}
  		
  	})
  })
  
  
  router.get("/students/delete",function(request,response){
  	Student.deleteById(request.query,function(error){
  		if(error){
  			return response.status(500).send("Server error")
  		}else{
  			response.redirect("/students")
  		}
  		
  	})
  })
  
  
  
  //3.把router导出,在app.js中引入
  module.exports=router
  
  ```

  建立``student.js``负责读写

  设计API：

  ```javascript
  // student.js
  // 数据操作文件模块
  var fs=require("fs")
  // 职责：操作文件中的数据，只处理数据，不关心业务
  
  //获取所有学生的列表
  
  //异步函数，函数执行不会等一个执行完了才下一句，为了让函数直接返回结果，必须使用回调函数
  
  //以下是封装异步API,因为readFile,writeFile等是异步函数，我们需要获取异步函数的操作结果，就要使用回调函数，把函数中的数据塞进callback形参中，实际写function(XX,XX),把数据带到实参function的参数中，就可以直接在使用了
  
  exports.find=function(callback){//callback是参数名，这里让它是函数
  	fs.readFile("./db.json",function(error,data){
  		if(error){
  			//把readfile的error信息塞进函数里
  			 callback(error)
  		}else{
  			//把null塞进第一个参数，把数据塞进第二个参数中
  	 		callback(null,JSON.parse(data).students)
  		}		
  	})
  }
  //添加保存学生
  exports.save=function(student,callback){//callback是参数名，这里让它是函数
  	//先读出来
  	fs.readFile("./db.json",function(error,data){
  		if(error){
  			//把readfile的error信息塞进函数里
  			 callback(error)
  		}else{
  			//读成功了，接下来要把students中的数据写进文件
  	 		//把readFile读出的字符串转成数组对象，取出students字段
  	 		var students=JSON.parse(data).students
  			//给student增加id项,最后一个数据的id值加1
  			student.id=students[students.length-1].id+1
  			//把age从字符串转成数字
  			student.age=parseInt(student.age)
  			//把参数student追加到students数组中
  			students.push(student)
  			//把数组转换回字符串，写回文件
  			//json的格式是 "students":[{},{},{}]
  			var fileData=JSON.stringify({students:students})
  			fs.writeFile("./db.json",fileData,function(error){
  				if(error){
  					//把writeFile的error塞进callback中
  					callback(error)
  				}else{
  					//没出错
  					callback(null)
  				}
  			})
  
  
  		}		
  	})
  }
  
  
  //修改学生。需要student对象，一个回调函数
  exports.updateById=function(student,callback){
  	fs.readFile("./db.json",function(error,data){
  		if(error){
  			//把readfile的error信息塞进函数里
  			 callback(error)
  		}else{
  			//转成字符串
  	 		var students=JSON.parse(data).students
  	 		//把id，age属性变回数字
  	 		student.id=parseInt(student.id)
  	 		student.age=parseInt(student.age)
  	 		//find
  	 		var stu=students.find(function(item){
  	 			return item.id===student.id
  	 		})
  
  	 		//把student的内容覆盖
  	 		
  	 		for(var key in student){
  	 			stu[key]=student[key]
  	 		}
  	 		//写入
  	 		var fileData=JSON.stringify({students:students})
  			fs.writeFile("./db.json",fileData,function(error){
  				if(error){
  					//把writeFile的error塞进callback中
  					callback(error)
  				}else{
  					//没出错
  					callback(null)
  				}
  			})
  
  		}		
  	})
  
  
  }
  // //删除学生
  exports.deleteById=function(id,callback){
  	fs.readFile("./db.json",function(error,data){
  		if(error){
  			//把readfile的error信息塞进函数里
  			 callback(error)
  		}else{
  			//把null塞进第一个参数，把数据塞进第二个参数中
  	 		var students=JSON.parse(data).students
  	 		//findIndex 是用来根据条件检索下标的
  	 		var deleteId=students.findIndex(function(item){
  	 			return item.id===parseInt(id)
  	 		})
  	 		//splices删除数据中的元素，参数是，开始删除的下标，从开始下标向后删除的个数
  	 		students.splice(deleteId,1)
  	 		
  	 		
  	 		//写入
  	 		var fileData=JSON.stringify({students:students})
  			fs.writeFile("./db.json",fileData,function(error){
  				if(error){
  					//把writeFile的error塞进callback中
  					callback(error)
  				}else{
  					//没出错
  					callback(null)
  				}
  			})
  		}		
  	})
  
  
  }
  ```

# 4.在Nodejs中使用MongoDB数据库

> MongoDB 是一个基于分布式文件存储的数据库。由 C++ 语言编写。旨在为 WEB 应用提供可扩展的高性能数据存储解决方案。

> MongoDB 是一个介于关系数据库和非关系数据库之间的产品，是非关系数据库当中功能最丰富，最像关系数据库的。

更多知识参考[菜鸟教程](https://www.runoob.com/mongodb/mongodb-tutorial.html)

## 4.1 MongoDB的基本概念

* 数据库
* 集合（相当于表）
* 文档（相当于记录）

```
//MOngoDB的存储结构
{
	//qq，taobao，baidu数据库
	//user,products是集合
	//集合里的是文档对象
	qq:{
		user:[
			{"name":"张三","age":20},
			{"name":"李四","age":20},
			{"name":"王五","age":20},
		],
		products:[
			{},
			{}
		]
	},
	taobao:{},
	baidu:{}
}
```



**关系型数据库**：

* 都可以通过``SQL``语句来操作
* 需要设计表结构
* 数据表支持约束
  * 唯一的 uniquek
  * 主键 primary key
  * 默认值
  * 非空 not null

非关系型数据库：

* 非常灵活

* 有的非关系型数据库就是 key-value 的键值对

  但是MongoDB是长得最像关系型数据据库的非关系型数据库

  * 数据库
  * 数据表
  * 表记录

* MongoDB不需要设计表结构

  

## 4.2 安装

* MongoDB的[下载地址](https://www.mongodb.com/download-center/community)，然后一路next

* 安装完成后访问：http://127.0.0.1:27017/  ，出现``It looks like you are trying to access MongoDB over HTTP on the native driver port.``  则证明安装成功


## 4.3 常用命令

使用``cd``命令进入 ``C:\Program Files\MongoDB\Server\4.2\bin``(找到mongo.exe所在的目录)输入``mongo``就可以输入MongoDB的常用命令了

```
//查看所有数据库
show dbs

//查看当前操作的数据库名
db

//切换到指定数据库（没有则创建数据库）
//成功则输出：switched to db student
use 数据库名
```

```
//显示当前数据库表名
show collections


//当前数据库插入数据
db.表名.insertOne({"key":value})

//查看当前数据库的表的数据
db.表名.find()
//输出，自动生成的id
{ "_id" : ObjectId("xxxxx"), "xxx" : xxx }

```

## 4.4 在Nodejs中使用MongoDB

### 4.4.1 官方提供的js包操作

* https://www.npmjs.com/package/mongodb

### 4.4.2 使用第三方包mongoose

* 官网：https://mongoosejs.com/

* 安装

  ```
  npm install mongoose --save
  ```

* 官网的例子

  ```javascript
  //引入模块
  const mongoose = require('mongoose');
  //链接数据库，存入test数据库
  mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});
  
  //创建一个模型
  //创建cats表，属性name，string类型
  const Cat = mongoose.model('Cat', { name: String });
  
  //实例化
  const kitty = new Cat({ name: 'Zildjian' });
  
  //持久化,不指定数据库
  //保存成功后打印meow
  kitty.save().then(() => console.log('meow'));
  ```

* 得到模型model,有了 模型构造函数 ，就可以进行增删改查

  ```javascript
  //1.引入模块
  var mongoose = require('mongoose');
  
  //2.连接数据库
  ////数据库不存在时，自动创建数据库，这个是连接test数据库
  mongoose.connect('mongodb://localhost:27017/test');
  
  //3.数据库模式
  var Schema=mongoose.Schema
  
  //4.设计集合（就是表的结构）
  var userSchema = new Schema({
     // //类型可以是字符串
     //  body: String,
     //  //类型可以是数组[],数组的每个对象{}需要包含的内容
     //  comments: [{ body: String, date: Date }],
     //  //类型可以是对象，第一个type后是类型，剩下的是约束
     //  date: { type: Date, 
     //  		default: Date.now //默认值当前时间
     //  },
     //  username:{
     //  	type:String,
     //  	required:true//表示username字段必须有
     //  }	 
     //  //布尔类型
     //  hidden: Boolean,
     //  meta: {
     //    votes: Number,
     //    favs:  Number
     //  }
     username:{
      	type:String,
      	required:true//表示username字段必须有 
      },
      password:{
      	type:String,
      	required:true
      },
      email:{
      	type:String   	
      }
      
  });
  
  //5.将文档结构发布为模型
  //第一个参数：首字母大写，单数，momgoose会自动生成小写复数的集合名(这个集合是在2步骤中连接的数据库)
  //第二个参数：模式schame
  //返回 模型构造函数
  //注意：当连接的数据库没有users的集合（表），则创建集合users，如果有就直接把该表返回，可以进行增删改查
  var User=mongoose.model("User",userSchema)
  
  ```

* 增加数据

  ```javascript
  
  var admin=new User({
  	username:"admin",
  	password:"123456",
  	email:"1270433876@qq.com"
  })
  
  admin.save(function(error,result){//result是插入的数据
  	if(error){
  		console.log("保存失败")
  	}else{
  		console.log("保存成功")
  		console.log(result)
  	}
  })
  ```

* 查询数据

  ```javascript
  //查询所有数据
  User.find(function(error,result){
  	if(error){
  		console.log("查找失败")
  	}else{
          console.log("查找成功")
  		console.log(result)
  	}
  }) 
  
  //按条件查找
  User.find({
  	username:"admin"//把所有匹配的找出来
  },function(error,result){
  	if(error){
  		console.log("查找失败")
  	}else{
          console.log("查找成功")
  		console.log(result)
  	}
  }) 
  
  
  //只匹配第一次出现的数据
  User.findOne({
  	username:"admin"//把匹配第一次出现的
  },function(error,result){
  	if(error){
  		console.log("查找失败")
  	}else{
          console.log("查找成功")
  		console.log(result)
  	}
  }) 
  
  //还有一个User.findById(id,function(error,result){
  //	XXXXXX
  //})
  ```

* 删除数据

  ```javascript
  User.remove({
  	username:"admin"
  },function(error,result){
  	if(error){
  		console.log("删除失败")
  	}else{
  		console.log("删除成功")
  		console.log(result)
  	}
  })
  ```

  ```javascript
  Model.findOneAndRemove(conditions,[option],[callback])
  Model.findByIdAndRemove(id,[option],[callback])
  ```

* 更改数据

  ```javascript
  //第一个参数是数据的ID（这个ID是插入数据时自动生成的）
  //第二个参数是修改后的值
  User.findByIdAndUpdate("5e71ec7646bb760c9c93c70e",{
  	password:"1111"
  },function(error,result){
  	if(error){
  		console.log("更新失败")
  	}else{
  		console.log("更新成功")
  		console.log(result)
  	}
  })
  ```

  ```javascript
  Model.update(conditions,doc,[options],[callback])
  Model.findOneAndUpdate([conditions],[update],[options],[callback])
  ```

  

## 4.5 使用MongoDB来重写学生管理系统(使用模板引擎，对数据库增删改查)

### ``views``文件夹下

#### index.html

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- 上述3个meta标签*必须*放在最前面，任何其他内容都*必须*跟随其后！ -->
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="../../favicon.ico">

    <title>Dashboard Template for Bootstrap</title>

    <!-- Bootstrap core CSS -->
    <link href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">

    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
    <link href="../../assets/css/ie10-viewport-bug-workaround.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="/public/css/style.css" rel="stylesheet">

    <!-- Just for debugging purposes. Don't actually copy these 2 lines! -->
    <!--[if lt IE 9]><script src="../../assets/js/ie8-responsive-file-warning.js"></script><![endif]-->
    <script src="../../assets/js/ie-emulation-modes-warning.js"></script>

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://cdn.bootcss.com/html5shiv/3.7.3/html5shiv.min.js"></script>
      <script src="https://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>

  <body>

    <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">Project name</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
          <ul class="nav navbar-nav navbar-right">
            <li><a href="#">Dashboard</a></li>
            <li><a href="#">Settings</a></li>
            <li><a href="#">Profile</a></li>
            <li><a href="#">Help</a></li>
          </ul>
          <form class="navbar-form navbar-right">
            <input type="text" class="form-control" placeholder="Search...">
          </form>
        </div>
      </div>
    </nav>

    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-3 col-md-2 sidebar">
          <ul class="nav nav-sidebar">
            <li class="active"><a href="#">Overview <span class="sr-only">(current)</span></a></li>
            <li><a href="#">Reports</a></li>
            <li><a href="#">Analytics</a></li>
            <li><a href="#">Export</a></li>
          </ul>
          <ul class="nav nav-sidebar">
            <li><a href="">Nav item</a></li>
            <li><a href="">Nav item again</a></li>
            <li><a href="">One more nav</a></li>
            <li><a href="">Another nav item</a></li>
            <li><a href="">More navigation</a></li>
          </ul>
          <ul class="nav nav-sidebar">
            <li><a href="">Nav item again</a></li>
            <li><a href="">One more nav</a></li>
            <li><a href="">Another nav item</a></li>
          </ul>
        </div>
        <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
          <h1 class="page-header">学生管理</h1>
          <a class="btn btn-success" href="students/new">添加学生</a>
          
          <div class="table-responsive">

            <table class="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>姓名</th>
                  <th>性别</th>
                  <th>年龄</th>
                  <th>爱好</th>
                </tr>
              </thead>
              <tbody>
                {{ each students_front }}
                 <tr>
                    <td>{{ $value.id }}</td>
                    <td>{{ $value.name }}</td>
                    <td>{{ $value.gender }}</td>
                    <td>{{ $value.age }}</td>
                    <td>{{ $value.hobbies }}</td>
                    <td>
                      <a href ="students/edit?id={{$value._id}}">修改</a>
                      <a href ="students/delete?id={{$value._id}}">删除</a>
                 </tr>
                {{ /each }}
               
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"></script>
    <script>window.jQuery || document.write('<script src="../../assets/js/vendor/jquery.min.js"><\/script>')</script>
    <script src="https://cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <!-- Just to make our placeholder images work. Don't actually copy the next line! -->
    <script src="../../assets/js/vendor/holder.min.js"></script>
    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
    <script src="../../assets/js/ie10-viewport-bug-workaround.js"></script>
  </body>
</html>

```

#### new.html

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- 上述3个meta标签*必须*放在最前面，任何其他内容都*必须*跟随其后！ -->
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="../../favicon.ico">

    <title>Dashboard Template for Bootstrap</title>

    <!-- Bootstrap core CSS -->
    <link href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">

    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
    <link href="../../assets/css/ie10-viewport-bug-workaround.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="/public/css/style.css" rel="stylesheet">

    <!-- Just for debugging purposes. Don't actually copy these 2 lines! -->
    <!--[if lt IE 9]><script src="../../assets/js/ie8-responsive-file-warning.js"></script><![endif]-->
    <script src="../../assets/js/ie-emulation-modes-warning.js"></script>

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://cdn.bootcss.com/html5shiv/3.7.3/html5shiv.min.js"></script>
      <script src="https://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>

  <body>

    <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">Project name</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
          <ul class="nav navbar-nav navbar-right">
            <li><a href="#">Dashboard</a></li>
            <li><a href="#">Settings</a></li>
            <li><a href="#">Profile</a></li>
            <li><a href="#">Help</a></li>
          </ul>
          <form class="navbar-form navbar-right">
            <input type="text" class="form-control" placeholder="Search...">
          </form>
        </div>
      </div>
    </nav>

    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-3 col-md-2 sidebar">
          <ul class="nav nav-sidebar">
            <li class="active"><a href="#">Overview <span class="sr-only">(current)</span></a></li>
            <li><a href="#">Reports</a></li>
            <li><a href="#">Analytics</a></li>
            <li><a href="#">Export</a></li>
          </ul>
          <ul class="nav nav-sidebar">
            <li><a href="">Nav item</a></li>
            <li><a href="">Nav item again</a></li>
            <li><a href="">One more nav</a></li>
            <li><a href="">Another nav item</a></li>
            <li><a href="">More navigation</a></li>
          </ul>
          <ul class="nav nav-sidebar">
            <li><a href="">Nav item again</a></li>
            <li><a href="">One more nav</a></li>
            <li><a href="">Another nav item</a></li>
          </ul>
        </div>
        <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
          <h1 class="page-header" >新增学生</h1>
          <!--name属性是返回后台的key，input标签的输入就是value，而radio的value是它的属性value的值-->
          <form action="/students/new" method="post">
            <div class="form-group">
              <label for="">姓名</label>
              <input type="text" id="" name="name">
            </div>
            <div class="form-group">
              <label for="">性别</label>
              <label class="radio-inline">
                <input type="radio" name="gender" id="inlineRadio1" value="1"> 男
              </label>
              <label class="radio-inline">
                <input type="radio" name="gender" id="inlineRadio2" value="0"> 女
              </label>
                       
            </div>
            <div class="form-group">
              <label for="">年龄</label>
              <input type="number" id="" name="age">
            </div>
            <div class="form-group">
              <label for="">爱好</label>
              <input type="text" id="" name="hobbies">
            </div>
        
            <button type="submit" class="btn btn-default">提交</button>
          </form>
        </div>
      </div>
    </div>

    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"></script>
    <script>window.jQuery || document.write('<script src="../../assets/js/vendor/jquery.min.js"><\/script>')</script>
    <script src="https://cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <!-- Just to make our placeholder images work. Don't actually copy the next line! -->
    <script src="../../assets/js/vendor/holder.min.js"></script>
    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
    <script src="../../assets/js/ie10-viewport-bug-workaround.js"></script>
  </body>
</html>

```

#### edit.html

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- 上述3个meta标签*必须*放在最前面，任何其他内容都*必须*跟随其后！ -->
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="../../favicon.ico">

    <title>Dashboard Template for Bootstrap</title>

    <!-- Bootstrap core CSS -->
    <link href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">

    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
    <link href="../../assets/css/ie10-viewport-bug-workaround.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="/public/css/style.css" rel="stylesheet">

    <!-- Just for debugging purposes. Don't actually copy these 2 lines! -->
    <!--[if lt IE 9]><script src="../../assets/js/ie8-responsive-file-warning.js"></script><![endif]-->
    <script src="../../assets/js/ie-emulation-modes-warning.js"></script>

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://cdn.bootcss.com/html5shiv/3.7.3/html5shiv.min.js"></script>
      <script src="https://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>

  <body>

    <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">Project name</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
          <ul class="nav navbar-nav navbar-right">
            <li><a href="#">Dashboard</a></li>
            <li><a href="#">Settings</a></li>
            <li><a href="#">Profile</a></li>
            <li><a href="#">Help</a></li>
          </ul>
          <form class="navbar-form navbar-right">
            <input type="text" class="form-control" placeholder="Search...">
          </form>
        </div>
      </div>
    </nav>

    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-3 col-md-2 sidebar">
          <ul class="nav nav-sidebar">
            <li class="active"><a href="#">Overview <span class="sr-only">(current)</span></a></li>
            <li><a href="#">Reports</a></li>
            <li><a href="#">Analytics</a></li>
            <li><a href="#">Export</a></li>
          </ul>
          <ul class="nav nav-sidebar">
            <li><a href="">Nav item</a></li>
            <li><a href="">Nav item again</a></li>
            <li><a href="">One more nav</a></li>
            <li><a href="">Another nav item</a></li>
            <li><a href="">More navigation</a></li>
          </ul>
          <ul class="nav nav-sidebar">
            <li><a href="">Nav item again</a></li>
            <li><a href="">One more nav</a></li>
            <li><a href="">Another nav item</a></li>
          </ul>
        </div>
        <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
          <h1 class="page-header" >修改学生</h1>
          <!--name属性是返回后台的key，input标签的输入就是value，而radio的value是它的属性value的值-->
          <form action="edit" method="post">
            <label name="id"  >学生ID：{{ id }}</label> 
            <input type="hidden" name="id" value="{{id}}">
            <div class="form-group">
              <label for="">姓名</label>
              <input type="text" id="" name="name" value="{{student_front.name}}">
            </div>
            <div class="form-group">
              <label for="">性别</label>
              <label class="radio-inline">
                <input type="radio" name="gender" id="inlineRadio1" value="1"> 男
              </label>
              <label class="radio-inline">
                <input type="radio" name="gender" id="inlineRadio2" value="0"> 女
              </label>
                       
            </div>
            <div class="form-group">
              <label for="">年龄</label>
              <input type="number" id="" name="age" value="{{student_front.age}}">
            </div>
            <div class="form-group">
              <label for="">爱好</label>
              <input type="text" id="" name="hobbies" value="{{student_front.hobbies}}">
            </div>
        
            <button type="submit" class="btn btn-default">提交</button>
          </form>
        </div>
      </div>
    </div>

    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"></script>
    <script>window.jQuery || document.write('<script src="../../assets/js/vendor/jquery.min.js"><\/script>')</script>
    <script src="https://cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <!-- Just to make our placeholder images work. Don't actually copy the next line! -->
    <script src="../../assets/js/vendor/holder.min.js"></script>
    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
    <script src="../../assets/js/ie10-viewport-bug-workaround.js"></script>
  </body>
</html>
```

### 重点是重写了 student.js 和router.js ， app.js不变

#### app.js

```javascript
//app.js 入口模块
//	职责：
//		启动服务器
//		做一些相关配置
//		body-parser解析表单post请求体
//		提供静态资源服务
//		挂在路由
//		监听接口

var express=require("express")
var bodyParser = require('body-parser')
//导入自己写的router.js
var router=require("./router")

var app=express()
//配置模板引擎art-template
app.engine('html', require('express-art-template'));

// 配置body-parse后，request就会多一个body属性来获取post请求数据了
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//公开目录,使得css，js,img,lib下的静态资源可以被访问到
app.use("/public/",express.static("./public/"))
app.use("/node_module/",express.static("./node_module/"))

//把路由容器挂载到app服务上来
//注意：配置模板引擎和用body-parser中间件，要在挂载路由之前
app.use(router)

app.listen("3000",function(){
	console.log("running...")
})
```



#### student.js（从读写文件，变成生成数据库模型Model）

```javascript
// 引入mongoose模块
var mongoose=require("mongoose")
//连接本地数据库test
mongoose.connect("mongodb://localhost/test")

var Schame=mongoose.Schema
 
var studentSchame=new Schame({
	name:{
		type:String,
		required:true
	},
	gender:{
		type:Number,
		enum:[0,1],
		default:0
	},
	age:{
		type:Number
	},
	hobbies:{
		type:String,

	}
})
//在router.js中引用  var Student=require("./student")
//Student就是数据库模型，可以增删改查
module.exports= mongoose.model("Student",studentSchame)
```

#### router.js

```javascript
//student是自己写的封装好的读写函数
var Student=require("./student")
//Express中提供专门的方式来包装路由
var express=require("express")


//1.创建一个路由容器
var router=express.Router()


//2.把路由都挂载到router容器中

//首页查询所有
router.get("/students",function(request,response){
	Student.find(function(error,students){//把readFile的结果塞进两个形参里	
		if(error){
			console.log(error)
			return response.status(500).send("Server error")	
		}else{
			console.log(students)
			response.render("index.html",{
				students_front:students				
			})
		}
	}) 
	
})

//插入数据
router.get("/students/new",function(request,response){
	response.render("new.html")
})
router.post("/students/new",function(request,response){
	var student=new Student(request.body)
	student.save(function(error,result){
		if(error){
			return response.status(500).send("Server error")
		}else{
			response.redirect("/students")
		}
	})


})


//编辑数据
router.get("/students/edit",function(request,response){
	Student.findById(request.query.id,function(error,result){
		if(error){			
			return response.status(500).send("Server error")
		}else{
				console.log(request.query)
				console.log(result)
				response.render("edit.html",{
				student_front:result})
		}
	})
	
})
router.post("/students/edit",function(request,response){
	Student.findByIdAndUpdate(request.body,request.body,function(error,result){
		if(error){
			return response.status(500).send("Server error")
		}else{
			response.redirect("/students")
		}
	})

})

//删除
router.get("/students/delete",function(request,response){
	Student.findByIdAndRemove(request.query.id,function(error){
		if(error){
			return response.status(500).send("Server error")
		}else{
			response.redirect("/students")
		}
		
	})
})



//3.把router导出
module.exports=router

```

### 补一种路由接收参数的方法：冒号发

```js
//之前的是, api: student?id=1
app.get("student"function(req,res){
    //req.query.id获取id值
})


//这种api： student/1
app.get("/student/:id", function (req, res) {
    var id = req.params["id"];
    //正则匹配规则
    var resg = /^[\d]{6}$/;
    if(resg.test(id)){
        res.send(id);
    } else {
        res.send("请检测格式");
    }
});

```



# 5.在Nodejs中使用 SQL Server

Sqlserver数据库设置相关内容

* 使用"Windows身份登录"，就是使用计算机名作为登录用户名，不使用密码（并不是密码为空）

* 若想使用“远程连接”或者“不使用Microsoft SQL Server Management Studio连接数据库”时，先打开"Microsoft SQL Server Management Studio"使用"Windows身份登录"登录

* 然后按图操作，即可设置"SQL SERVER身份登录"![](https://github.com/heyingjiee/markdown_image/blob/master/Nodejs_note_image/set_sql_server.png?raw=true)

* Sql server名

  ![image-20200319231728700](https://github.com/heyingjiee/markdown_image/blob/master/Nodejs_note_image/server_name.png?raw=true)

* 获取数据库端口号

  ```sql
  --查询端口号
  exec sys.sp_readerrorlog 0, 1, 'listening'
  ```

  ![image-20200319231207901](https://github.com/heyingjiee/markdown_image/blob/master/Nodejs_note_image/image-20200319231207901.png?raw=true)

  连接数据库

  ```shell
  //安装npm包
  npm install msnodesqlv8
  ```

  ```js
  const sql = require("msnodesqlv8");
  const connectionString = "server=.;Database=vuedb;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
  queryStr="select * from manager
  sql.query(connectionString, queryStr, (err, rows) => {
      //rows中就是数据是一个数组，数据是里面的对象
      
  }
            
  ///////////////////////////////////////////////////////////////////////////////// //"select * from manager"  多条数据时，数组中每个对象是一条，rows=[{},{}]
  //"select count(*) from manager"  返回[ { Column0: 1 } ]  ,获取rows[0].Column0
  //"delete from manager where manager_id=2" ;
  //"insert into manager values('127@qq.com','he','heheh')"//id列是设成自增，直接不用写插入值
  //"update manager set manager_name='jj' where manager_id=2"
          
            
  ```

# 6.在Nodejs中使用MySql数据库 

## 6.1 安装

* 下载npm包：mysql

  ```
  npm install mysql
  ```

* mysql包的文档 ：https://www.npmjs.com/package/mysql

## 3.2 使用

增删改查都是connection.query，只改变第一个参数SQL语句即可

```javascript
//引入包
var mysql      = require('mysql');

//配置数据库信息
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'me',
  password : 'secret',
  database : 'my_db'
});
 
//创建连接
connection.connect();

//执行sql。第一个参数：查询字符串；第二个参数：回调函数处理结果
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});
 
connection.end();
```



# 7.Node常见技术实现

## 7.1 token生成和登录接口实现

**以下是token原理图**：

![image-20200403224323747](C:\Users\12704\AppData\Roaming\Typora\typora-user-images\image-20200403224323747.png)

服务端Nodejs实现

参考文章：https://cnodejs.org/topic/53c652bfc9507b404446ee40

```
npm install jwt-simple
```

把查询用户信息的数据库操作单独封装在login.js

```js
// login.js
const sql = require("msnodesqlv8");
const connectionString = "server=.;Database=vuedb;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
	
exports.verify=function(manager,callback){	
	query="select * from manager where manager_email='"+manager.manager_email+"'and manager_password='"+manager.manager_password+"'"
	//console.log(query)
	sql.query(connectionString, query, (err, rows) => {
		if(err)  
			callback({err_code:1,message:'获取数据失败',affectedRows:0})
		else{
			if(rows.length==0){
				callback({err_code:1,message:"用户不存在",affectedRows:0})
			}else{				
				callback({err_code:0,message:"登录成功",data:rows[0],affectedRows:0})
				
			}
		}
	  
	});
}

```

在路由文件router.js中，增加以下代码，负责生成token,响应前端向/login接口发起的post请求

```js
//router.js
var Login=require("./db_model/login.js")

var jwt = require('jwt-simple');//引入jwt模块
var moment = require('moment');//引入moment格式化时间模块
var expires = moment().add(7,'days').valueOf();//

//登录验证
router.post("/login",function(request,response){
	Login.verify(request.body,function(res){
        //生成token
		var token = jwt.encode({
		  iss: res.data.manager_id,
		  exp: expires
		}, "hahaha");//第二个参数是自己写的字符串作为密钥
		//把本页面生成的token添加到返回的json中
		res.data.token=token
		response.json(res)//接收数组或对象，转成json
	})
	
})
```

前端Vue项目接收到，接口返回的数据，前端用js代码保存下token下来，放到sessionStorage中，并把{Authorization，“token”}加到请求头，每次axios请求都会携带该字段

```js
//客户端登陆页面，把token存下来
window.sessionStorage.setItem("token",返回的token数据)

//客户端main.js入口文件，全局设置，把token放到请求头，每次请求都会一起发送
axios.interceptors.request.use(config=>{
	//给config的headers增加新的字段Authorization，把token添加进去
	config.headers.Authorization=window.sessionStorage.getItem('token')
	return config
})
```

服务端验证token。自己写一个token.js **中间件**。并在router.js页面引入

```js
//token.js
var jwt = require('jwt-simple');
const sql = require("msnodesqlv8");
const connectionString = "server=.;Database=vuedb;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";

module.exports = function(req, res, next) {
	
	var token=req.get("Authorization")
	if (token) {
		try {
			var decoded = jwt.decode(token, "hahaha");
			//验证登录是否过期
			if (decoded.exp <= Date.now()) {
				res.json({err_code:2,message:"用户登录过期"});
			}
			//验证用户是否存在
			query="select * from manager where manager_id='"+decoded.iss+"'"
			sql.query(connectionString, query, (err, rows) => {
				if(rows.length==0){
					res.json({err_code:2,message:"非法用户尝试访问"});
				}
			})	
			//验证完成,这里用一个global全局变量存登陆的用户的iss，这里我们的iss放的是用户id。其他模块可以通过 global.now_customer_id取得id，就知道当前的用户是谁了
            global.now_customer_id=decoded.iss
			return next()
				
		} catch (err) {
			return res.json({err_code:2,message:error});
		}
	} else {
		//在前台vue导航卫士，如果发现没有token自己前台就会重定向，不用后台管
		return res.end();
	}
};
```

```js
//router.js新增以下代码
//添加路由中间件自己写的token.js  ,use()会使得以下所有请求都会先进来这个函数,在获取以下请求前验证token是否合法
var token=require("./token")
router.use(token)
```

使用Postman测试接口,结果如下

```json
{
    "err_code": 0,
    "message": "登录成功",
    "data": {
        "manager_id": 1,
        "manager_email": "admin@qq.com",
        "manager_name": "he",
        "manager_password": "123456",
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOjEsImV4cCI6MTU4NjYwMjQwMjE1MH0.3C_jq7o98gykWl8MUyDFOeuu9WAYgUqK3qvQbsHpVwI"
    },
    "affectedRows": 0
}
```

## 7.2 解决跨域访问

在app.js中添加。因为在服务端设置，对每一个请求均有效果

```js
//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
	//指定服务器允许发起访问的域，比如127.0.0.1:8080
    res.header('Access-Control-Allow-Origin', '*');
    //该字段是一个逗号分隔的字符串，指定服务器允许浏览器CORS请求会额外发送的头信息字段 
    res.header('Access-Control-Allow-Headers', '*');
   	//服务器接收的请求类型，比如post,delete,put等等方式
    res.header('Access-Control-Allow-Methods', '*');
    //服务器返回的内容类型
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();

})
```

### 跨域资源共享（CORS）

【整理自http://www.ruanyifeng.com/blog/2016/04/cors.html】

> CORS是一个W3C标准，全称是"跨域资源共享"（Cross-origin resource sharing）。它允许浏览器向跨源服务器，发出[`XMLHttpRequest`](http://www.ruanyifeng.com/blog/2012/09/xmlhttprequest_level_2.html)请求，从而克服了AJAX只能[同源](http://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html)使用的限制
>
> CORS需要浏览器和服务器同时支持。目前，所有浏览器都支持该功能,且整个CORS通信过程，都是浏览器自动完成，浏览器一旦发现AJAX请求跨源，就会自动添加一些附加的头信息，有时还会多出一次附加的请求【下面讲的复杂请求】，但用户不会有感觉。因此，实现CORS通信的关键是服务器。只要服务器实现了CORS接口，就可以跨源通信。

浏览器将CORS请求分成两类：**简单请求**和**非简单请求**

请求的具体发送可以使用Ajax,Axios等等，具体怎么设置请求头，得看使用哪个，看它的具体的文档

### 简单请求（simple request）:

（1) 请求方法是以下三种方法之一：

- HEAD
- GET
- POST

（2）HTTP的头信息不超出以下几种字段：

- Accept
- Accept-Language
- Content-Language
- Last-Event-ID
- Content-Type：只限于三个值`application/x-www-form-urlencoded`、`multipart/form-data`、`text/plain`

### 非简单请求 （not-so-simple request）

凡是不同时满足上面两个条件，就属于非简单请求。

### 简单请求的流程

对于简单请求，浏览器直接发出CORS请求。具体来说，就是在**请求头**信息之中，增加一个`Origin`字段。

```
//比如：
GET /cors HTTP/1.1
Origin: http://api.bob.com
Host: api.alice.com
Accept-Language: en-US
Connection: keep-alive
User-Agent: Mozilla/5.0..
```

如果`Origin`指定的源，不在服务器设置的许可范围内，服务器会返回一个正常的HTTP回应。浏览器发现，这个回应的头信息没有包含`Access-Control-Allow-Origin`字段（详见下文），就知道出错了，从而抛出一个错误，被`XMLHttpRequest`的`onerror`回调函数捕获。

`Access-Control-Allow-Origin:http://172.20.0.206`指定允许其他域名访问,一般用法有三种（\*，指定域，动态设置），但是*不允许携带认证头和cookies

* 设置`*`是最简单粗暴的，但是服务器出于安全考虑，肯定不会这么干，而且，如果是*的话，游览器将不会发送`cookies`，即使你发送请求时的`XHR`设置了`withCredentials`

* 指定域，如以上例子中的`http://172.20.0.206`，一般的系统中间都有一个`nginx`，所以推荐这种。。当然，如果服务器不通过，根本没有这个域，接着触发`XHR`的`onerror`

* 动态设置为请求域，多人协作时，多个前端对接一个后台，这样很方便

`Access-Control-Allow-Credentials:true`是否允许后续请求携带认证信息（cookies）。为true时，且`Access-Control-Allow-Origin`的值不是*时，服务器支持后续请求携带cookies。浏览器发送请求时需要设置withCredentials=true,具体怎么设置，就要看浏览器用啥发送的请求，比如**Ajax**,**Axios**

### 非简单请求的流程

非简单请求是那种对服务器有特殊要求的请求，比如请求方法是`PUT`或`DELETE`，或者`Content-Type`字段的类型是`application/json`。

#### 预检请求

非简单请求的CORS请求，会在正式通信之前，增加一次HTTP查询请求，称为"预检"请求。

发送请求时，浏览器发现，这是一个非简单请求，**浏览器会先询问服务器**，当前网页所在的**域名是否在服务器的许可名单之中**，以及可以使用**哪些HTTP动词和头信息字段**。只有得到肯定答复，浏览器才会发出正式的`XMLHttpRequest`请求，否则就报错。

**预检请求**用的请求方法是`OPTIONS`，表示这个请求是用来询问的。头信息里面，关键字段是`Origin`，表示请求来自哪个源。

除了`Origin`字段，"预检"请求的头信息包括两个特殊字段。**Access-Control-Request-Method**

该字段是必须的，用来列出浏览器的CORS请求会用到哪些HTTP方法，上例是`PUT`。

**Access-Control-Request-Headers**

该字段是一个逗号分隔的字符串，指定浏览器CORS请求会额外发送的头信息字段（可以用于发送自定义的信息字段）

**Access-Control-Max-Age**

该字段可选，用来指定本次预检请求的有效期，单位为秒。上面结果中，有效期是20天（1728000秒），即允许缓存该条回应1728000秒（即20天），在此期间，不用发出另一条预检请求。

#### 预检回应

**服务器**收到"预检"请求以后，检查了`Origin`、`Access-Control-Request-Method`和`Access-Control-Request-Headers`字段以后，如果这几个字段内容满足服务端的设置，以及确认允许跨源请求（即满足服务端Access-Control-Allow-Origin的设置），就可以做出回应。

## 7.3 文件上传（待补充）

### 图片上传

1. 安装multer模块

```javascript
npm install multer
```

2. 引用模块
   它是依赖于express的一个模块

```javascript
//引用express并配置
var express = require("express");
var app = express();
app.listen(3000);
```

```javascript
var multer = require('multer');
/*var upload = multer({
	//如果用这种方法上传，要手动添加文明名后缀
        //如果用下面配置的代码，则可以省略这一句
	dest: 'uploads/'
})*/
```

3. 配置
   设置保存文件的地方，并根据上传的文件名对应文件添加后缀
   可以通过`filename`属性定制文件保存的格式

| 属性值        | 用途                                                         |
| ------------- | ------------------------------------------------------------ |
| `destination` | 设置资源的保存路径。注意，如果没有这个配置项，默认会保存在`/tmp/uploads`下。此外，路径需要自己创建 |
| `filename`    | 设置资源保存在本地的文件名                                   |

```javascript
var storage = multer.diskStorage({
	//设置上传后文件路径，uploads文件夹会自动创建。
	destination: function(req, file, cb) {
		cb(null, './uploads')
	},
	//给上传文件重命名，获取添加后缀名
	filename: function(req, file, cb) {
		var fileFormat = (file.originalname).split(".");
		//给图片加上时间戳格式防止重名名
		//比如把 abc.jpg图片切割为数组[abc,jpg],然后用数组长度-1来获取后缀名
		cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
	}
});
var upload = multer({
	storage: storage
});
```

4. 接受文件
   `upload.single('xxx')`，xxx与表单中的name属性的值对应
   这里虽然用到post请求，但实际上不需要`bodyParser`模块处理

```javascript
app.post('/upload-single', upload.single('logo'), function(req, res, next) {
	console.log(req.file)
	console.log('文件类型：%s', req.file.mimetype);
	console.log('原始文件名：%s', req.file.originalname);
	console.log((req.file.originalname).split("."))
	console.log('文件大小：%s', req.file.size);
	console.log('文件保存路径：%s', req.file.path);
	res.send({
		ret_code: '0'
	});
});
```

5. 多图上传
   多图上传只要更改一下地方，前端往file输入框加多一个`multiple="multiple"`属性值，此时就可以在选图的时候多选了，当然也可以并列多个file输入框(不推荐多个上传图片输入框)，这样体验会不好

```html
<input type="file" name="logo" multiple="multiple" />
```

后端也需要相应的改变

```javascript
app.post('/upload-single', upload.single('logo'), function(req, res, next) {
//upload.single('logo')变为upload.array('logo', 2)，数字代表可以接受多少张图片
app.post('/upload-single', upload.array('logo', 2), function(req, res, next) {
```

如果不想有图片数量上传限制，我们可以用`upload.any()`方法

```javascript
app.post('/upload-single', upload.any(), function(req, res, next) {	
	res.append("Access-Control-Allow-Origin","*");
	res.send({
		wscats_code: '0'
	});
});
```

6. 前端部分

- formData表单提交

```html
<form action="http://localhost:3000/upload-single" method="post" enctype="multipart/form-data">
	<h2>单图上传</h2>
	<input type="file" name="logo">
	<input type="submit" value="提交">
</form>
```

- formData表单+ajax提交

```javascript
<form id="uploadForm">
	<p>指定文件名： <input type="text" name="filename" value="" /></p>
	<p>上传文件： <input type="file" name="logo" /></ p>
	<input type="button" value="上传" onclick="doUpload()" />
</form>
```

`FormData`对象，是可以使用一系列的键值对来模拟一个完整的表单，然后使用`XMLHttpRequest`发送这个"表单"

**注意点**

- processData设置为false。因为data值是FormData对象，不需要对数据做处理。
- `<form>`标签添加`enctype="multipart/form-data"`属性。
- cache设置为false，上传文件不需要缓存。
- contentType设置为false。因为是由`<form>`表单构造的FormData对象，且已经声明了属性`enctype="multipart/form-data"`，所以这里设置为false

上传后，服务器端代码需要使用从查询参数名为logo获取文件输入流对象，因为`<input>`中声明的是`name="logo"`

```javascript
function doUpload() {
	$.ajax({
		url: 'http://localhost:3000/upload-single',
		type: 'POST',
		cache: false, //不必须
		data: new FormData($('#uploadForm')[0]),
		processData: false,//必须
		contentType: false,//必须
		success: function(data) {
			console.log(data)
		}
	})
}
```



## 7.4 cookie（待补充）

# 8.部署vue+nodejs

## 8.1 开始准备

* 通过node创建服务器

  * 使用Express创建服务端，将Vue项目build生成的dist文件夹，托管为Express的静态资源

    ```javascript
    //在app.js文件中，开放静态资源
    //这个不写第一个参数了，访问127.0.0.1：3000时，直接访问public下的部署的网页
    app.use(express.static("./public/dist/"))
    
    //app.use("/public/",express.static("./public/dist/"))
    //这样写访问不到
    ```

  * 注意：在将Vue项目打包前，要确定将Vue中axios配置的baseURL改成云服务器网址，我的项目中云服务器公网地址：8.131.105.244 ，nodejs监听的是3000端口，所以写成了http://8.131.105.244:3000

    ```javascript
    //main.js文件
    import Vue from 'vue'
    import App from './App.vue'
    import router from './router'
    import './plugins/element.js'
    
    
    //引入全局样式
    import './assets/css/global.css'
    
    //引入自己下载的图标库
    import './assets/lib/style.css'
    
    //导入axios，并进行全局配置，使得每个组件可以用到
    import axios from 'axios'
    
    axios.defaults.baseURL="http://8.131.105.244:3000"
    //通过axios拦截器添加token验证
    axios.interceptors.request.use(config=>{
    	//给config的headers增加新的字段Authorization，把token添加进去
    	config.headers.Authorization=window.sessionStorage.getItem('token')
    	return config
    })
    Vue.prototype.$axios=axios
    
    Vue.config.productionTip = false
    
    new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
    
    ```

* 开启gzip配置

  * 给Express服务器开启，gzip压缩。当访问网页时，服务端传输的网页更小，打开网页速度更快

  * 安装中间件compression

    ```
    //在根目录下安装npm包
    npm install compression -p
    ```

    ```js
    //在app.js页面 ，引用中间件
    
    const compression=require('compression');
    app.use(compression);//注意：这句必须写在，开启静态资源目录之前
    
    ```

* 配置https服务

  * 传统的http协议都是明文传输，不安全。https是加密传输，更加安全

  * 申请SSL证书，【https://freessl.cn/这个网站可以申请免费的证书】，验证相关信息后，下载两个文件，即【full_chain.pem 公钥；private.key私钥】

  * 配置https服务

    ```js
    //在app.js中
    const https=require('https');
    const fs=require('fs');
    
    const options={
    	cert:fs.readFileSync('./full_chain.pem'),
        key:fs.readFileSync('./private.key')
    }
    //注释掉，express的服务器监听
    //app.listen("3000",function(){
    //	console.log("Server is running...")
    //})
    
    //把express实例化的对象——app，当成参数传入
    https.createServer(options,app).listen(443)//http协议在80端口。http在443端口
    ```

* 使用PM2管理工具

  * PM2管理器用于保持nodejs在服务端一直运行

  * 在云服务器中安装pm2

    ```javascript
    //安装pm2
    npm install pm2 -g
    
    //启动项目
    pm2 start 启动入口文件 --name 自定义名字
    pm2 start app.js --name Vue_Manager
    
    //查看运行项目
    pm2 ls
    
    //重启项目
    pm2 restart 自定义名字
    
    //停止项目
    pm2 stop 自定义名字
    
    //删除项目
    pm2 delete 自定义名字
    ```


## 8.2 购买云服务器

直接到阿里云官网购买 购买`阿里云ECS服务器`,选择centos系统

等待系统创建实例【一个实例就是一台云服务器】

![Jw5Gef.png](https://s1.ax1x.com/2020/04/23/Jw5Gef.png)

注意几个功能：

* 安全组。用于开放接口，必须开放端口才能通过`网址/IP：端口号`被外部访问到。

  ```
  常用接口
  HTTP 80
  HTTPS 443
  FTP 20/21
  
  宝塔面板 8888
  phpMyAdmin 888
  
  MySql  3306 
  SQL Server 1433
  Redis 6379
  ```

* 远程连接

## 8.3 安装宝塔面板

为了简化操作，我没有使用服务器命令，而是选用了可以可视化操作的宝塔面板













# 9. 相关技术概念补充

* **XHR**（XMLHttpRequest）=>是一个浏览器接口，使得Javascript可以进行http/https通信,[详细介绍](http://www.ruanyifeng.com/blog/2012/09/xmlhttprequest_level_2.html)

* **Ajax**是指异步加载网页技术，即无须刷新页面即可从服务器取得数据（局部刷新）。XHR是ajax的基础。完整的Ajax请求过程：
  
  * 创建**XHR**实例 ( XMLHttpRequest  )
  * 发出HTTP请求（send()、open()）
  * 接收服务器传回的数据
  * 更新网页数据
  
* **Axios** 是一个基于Promise 用于浏览器和 nodejs 的 HTTP 客户端，本质上也是对**原生XHR**的封装，只不过它是Promise的实现版本，符合最新的ES规范，它本身具有以下特征：
   1.从浏览器中创建 **XMLHttpRequest**
   2.支持 Promise API
   3.客户端支持防止**CSRF**
   4.提供了一些并发请求的接口（重要，方便了很多的操作）
   5.从 node.js 创建 http 请求
   6.拦截请求和响应
   7.转换请求和响应数据
   8.取消请求
   9.自动转换JSON数据
   
* **XSS**：https://www.jianshu.com/p/4fcb4b411a66

* **CSRF**:CSRF跨站点请求伪造(Cross—Site Request Forgery)， **CSRF攻击攻击原理及过程如下：**

         1.  用户C打开浏览器，访问受信任网站A，输入用户名和密码请求登录网站A；
         2.  在用户信息通过验证后，网站A产生Cookie信息并返回给浏览器，此时用户登录网站A成功，可以正常发送请求到网站A；

  3. 用户未退出网站A之前，在同一浏览器中，打开一个TAB页访问网站B；
  4. 网站B接收到用户请求后，返回一些攻击性代码，并发出一个请求要求访问第三方站点A

  ​    一篇文章https://blog.csdn.net/xiaoxinshuaiga/article/details/80766369

* **content-type**

常见的媒体格式类型如下：

    text/html ： HTML格式
    text/plain ：纯文本格式     
    text/xml ：  XML格式
    image/gif ：gif图片格式   
    image/jpeg ：jpg图片格式
    image/png：png图片格式
常见的以application开头的媒体格式类型：

```
 application/xhtml+xml ：XHTML格式
 application/xml     ： XML数据格式
 application/atom+xml  ：Atom XML聚合格式   
 application/json    ： JSON数据格式
 application/pdf       ：pdf格式 
 application/msword  ： Word文档格式
 application/octet-stream ： 二进制流数据 。使用了这个头信息的话，那就意味着你不想直接显示内容，而是弹出一个"文件下载"的对话框
 application/x-www-form-urlencoded ： <form encType="">中默认的encType，form表单数据被编码为key/value格式发送到服务器（表单默认的提交数据的格式）

```

服务器设置 Content-disposition: inline; filename=foobar.pdf 表示浏览器**内嵌显示一个文件** 。Content-disposition: attachment; filename=foobar.pdf表示会下载文件。要想内嵌显示，前提是浏览器支持该文件类型内嵌显示才能显示，否则只能弹出下载框，同时type-content不能是application/octet-stream

另外一种常见的媒体格式是**表单中上传文件**之时使用的：

    multipart/form-data ： 需要在表单中进行文件上传时，就需要使用该格式 ,添加<form enctype="multipart/form-data" >

* **所有的http的请求方式**

![GzdcjK.png](https://s1.ax1x.com/2020/04/14/GzdcjK.png)

* **http进化史**

**1. HTTP/0.9时代：短连接**
每个HTTP请求都要经历一次DNS解析、三次握手、传输和四次挥手。反复创建和断开TCP连接的开销巨大，在现在看来，这种传输方式简直是糟糕透顶。

**2. HTTP/1.0时代：持久连接概念提出**
人们认识到短连接的弊端，提出了持久连接的概念，HTTP/1.0中得到了初步的支持。
持久连接，即**一个TCP连接服务**多次请求，客户端在请求header中携带Connection:Keep-Alive，即是在向服务端请求持久连接。如果服务端接受持久连接，则会在响应header中同样携带Connection: Keep-Alive，这样客户端便会继续使用同一个TCP连接发送接下来的若干请求。（Keep-Alive的默认参数是[timout=5, max=100]，即一个TCP连接可以服务至多5秒内的100次请求）

当服务端主动切断一个持久连接时（或服务端不支持持久连接），则会在header中携带Connection: Close，要求客户端停止使用这一连接。

![](https://pic3.zhimg.com/80/v2-755722cfb502cebbe639bc311270eb47_720w.jpg)



* **Nginx**的[反向代理与负载均衡](https://baijiahao.baidu.com/s?id=1652608869911988442&wfr=spider&for=pc)

# 10 . 自动生成API文档

相关文章

https://www.jianshu.com/p/7e1b057b047c/

# 11.Node脚手架

参考：

[如何实现一个简单的Node.js脚手架](https://segmentfault.com/a/1190000012262311))[https://segmentfault.com/a/1190000012262311]

