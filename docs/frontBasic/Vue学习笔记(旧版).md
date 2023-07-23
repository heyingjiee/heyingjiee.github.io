---
title: Vue学习笔记
date: 2020-7-1
tags: [vue2.0]
categories: 前端技术  
toc: true 
cover: https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Vue%E7%9B%B8%E5%85%B3/20210509213814.jpg
---
# Vue 2.0前言

Vue的官方文档可能是我见过的最好的开发文档了，所以如果是学习Vue建议还是阅读官方文档吧。在这里仅仅是基于我自己的理解对于**Vue2.0**知识的整理，便于梳理知识结构

# 1. 网站交互方式

## 1.1 单页应用SPA

* **多页面**
  
  * 点击跳转刷新，用户体验不好
  * 有利于SEO搜索引擎搜索
* **单页面应用(Single Page Application，简称SPA)**
  
  * 开发方式好，前后端分离，开发效率高，可维护性好
    * 服务端不关心页面，只关心数据处理
    * 客户端不关心数据库操作，只通过接口和服务器交互数据
  * 用户体验好，就像原生客户端软件一样使用
  * 只需要加载渲染局部视图即可，不需要整页刷新
  * 单页应用开发技术复杂，所以诞生了一堆开发框架
    * AngularJS
      * google开发
      * 为前端带来了MVVM开发模式
      * MVVM（**Model-View-ViewModel**）：数据驱动视图
      
      ![JS5wGt.png](https://s1.ax1x.com/2020/04/14/JS5wGt.png)
    * ReactJS
      * facebook
      * 提出组件化
    * VueJS
      
      * Vue借鉴了前两种，取长补短
  * 单页面技术已经很成熟，但是大部分不兼容低版本游览器
  * 单页应用由于数据都是异步加载过来的，不利于SEO(  现在有基于Vue的服务端渲染框架nuxt  ）

## 1.2 单页应用SPA实现原理

前后端分离+前端路由

* 后端Nodejs，使用Express监视对应请求

  ```
  app=express()
  app.get("/",function(request,response){
      //处理
      //然后把结果添加到response中
      response.json()
  })
  ```

* 前端工作（**以下例子使用原生 js 实现，但是在Vue框架中用<a href="#vue-router">vue-router</a>插件更加简单**)

  * 前台请求数据，并渲染页面

    ```html
  <!--引入资源-->
    <script  src="模板引擎位置"> </script>
    <script  src="jquer位置"> </script>
    <!--页面-->
    <script is="tp1" type="text/template">
      	{{each student_front}}
      	<li> {{value.name}}</li>
      	{{/each}}
    </script>
    <!--请求数据，并渲染到页面-->
    <script>
      // 	$.get("接口，如http://127.0.0.1:3000/student",function(data){
      //         template("tp1,{
      //                  student_front:data
      //                  }")
      // })
          <!-- $("#id名")可以获取dom元素-->
      </script>
    ```
  
  *  前端路由不同url装载不同页面
  
      find-music,my-music,friend多个页面,在其页面向服务端取数据进行渲染，然后放入index的容器<div id="container">中显示
  
      注意：下载jquery；sublime安装sublimeServer实现启动本地服务器（不安装就是直接打开本地文件，不支持跨域找下载的jquery.js文件）
  
    ```html
    <!--index.html-->
    <!DOCTYPE html>
    <html>
    <head>
    	<title>音乐</title>
    	<mata charset="utf-8">
    </head>
    <body>
    	<div class="top">头部</div>
    	<div class="aside">
    		<ul>
    			<!--a标签会跳转刷新，用锚点不会刷新,点击朋友，url改变浏览器显示："网址#/friend"。用window.onhashchange，同一个a标签点击多次，只有第一次触发-->
    			<!--通过 #/friend 变化，渲染-->
    			
    			<li><a href="#/">发现音乐</a></li>
    			<li><a href="#/my-music">我的音乐</a></li>
    			<li><a href="#/friend">朋友</a></li>
    		</ul>
    		<div id="container">
    			<!--把 其他页面 渲染进来-->
    		</div>
    		<script>
    			window.onhashchange=function(){
    				//location中的hash字段包含 锚点标识#/friend
    				//substr(1)标识从string的1位置向后截取 
    				var hash=window.location.hash.substr(1)
    			
    				
    				if(hash==="/"){
    					$.get("./find-music.html",function(data){
    						$("#container").html(data)
    					})
    
    				}else if(hash==="/my-music"){
    
    					$.get("./my-music.html",function(data){
    						console.log(data)
    						$("#container").html(data)
    					})
    
    				}else if(hash==="/friend"){
    					$.get("./friend.html",function(data){
    						$("#container").html(data)
    					})
    				}
    			}
    		</script>
    	</div>
        <!--安装jquery 命令 npm install jquery-->
    	<script src="node_modules/jquery/dist/jquery.js"></script>
    </body>
  </html>
    ```
  
    ```html
    <!--find-music.html-->
    <div>查找音乐</div>
    
    <!--my-music-->
    <div>我的音乐</div>
    
    <!--friend-->
    <div>朋友</div>
    
    ```
  
  * 以上的方式构建单页面应用太复杂，所以出现了Vue等框架

# 2.初识Vue

官网：https://cn.vuejs.org/

安装：``npm install vue``

Vue是什么？

* 优秀的前端js开发框架
* 可以轻松构建**SPA单页面应用**
* 通过**指令**扩展了HTML，通过**表达式**绑定数据到HTML
* 极大程度解放**DOM操作**

## 2.1 Vue的特点

Vue是为了克服 HTML 在构建应用上的不足而设计的。其核心特点：

* MVVM
* 双向数据绑定
* 组件化
* 渐进式

## 2.2 HelloWorld
```vue
类似于模板引擎,有`{{  变量名  }}`语法
不同于模板引擎的是 可以通过 ``app1``这个变量直接操作DOM元素，不必再``$(#id名)``来获取DOM元素了
```
![image-20211025172532677](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Vue%E7%9B%B8%E5%85%B3/image-20211025172532677%20.png)

```html
<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<body>
	<div id="app">
		<h1>{{1+1}}</h1>
		<h1>{{"hello"+"world"}}</h1>
		<h1>{{message}}</h1>
	</div>

	<script src="node_modules/vue/dist/vue.js"></script>
	<script>
		const app1=new Vue({
			el:"#app",//el告诉vue管理模板的入口，div中的{{  }}的模板语法都会被渲染，el不能是body和html
			data:{//绑定的成员数据，这种数据被称为响应式数据。
                //什么是响应式数据？数据驱动视图，当数据发生变化时，所有绑定该数据的DOM都会跟着改变
				message:"Hello vue.js"
			}
		})
	</script>
</body>
</html>


<!--结果：
2
helloworld
Hello vue.js
-->
```

## 2.3 双向数据绑定

什么是双向数据绑定？

当数据发生变化时，DOM元素会自动更新数据

当表单发生变化时，数据也会自动更新

###  v-model指令

![image-20200322204542350](https://s1.ax1x.com/2020/03/25/8vVQ8s.png)

```html
<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<body>
	<div id="app">
		<h1>{{message}}</h1>
		<input type="text" v-model="message">
		<!--v-model 是Vue提供的一个特殊属性，在Vue中称为指令
			它的作用是：双向绑定表单控件
		-->
	</div>

	<script src="node_modules/vue/dist/vue.js"></script>
	<script>
		const app1=new Vue({
			el:"#app",
			data:{
				message:"Hello vue.js"
			}
		})
	</script>
</body>
</html>

```

# 3.Vue的基本知识

* 在html页面，通过script方式引入的vue.js

  ```html
  <!DOCTYPE html>
  <html>
  <head>
  	<title></title>
  </head>
  
  
  <body>
      <!--Vue控制的div--> 
  	<div id="app"></div>
      
      <!--通过CDN引入vue.js-->
  	<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
      <!--通过npm下载vue.js到本地，根据vue.js所在目录引入-->
  	<script src="node_modules/vue/dist/vue.js"></script>
  	<script>
  		new Vue({
  		  el: '#app',
  		  data: {
  		    selected: ''
  		  }
  		})		
  	</script>
  
  </body>
  </html>
  ```

* 使用<a href="#vue-cil工具">vue-cli工具</a>，构建更加复杂的Vue项目，可以在项目中使用`.vue`单文件进行vue代码的编写(在大型项目中使用这种方式)

  ```vue
  <template>
  	<!--注意template标签下，只能有一个根标签-->
    	<div id="app">
          <span>1</span>
          <span>2</span>
      </div>
  </template>
  
  <script>
      //在当前vue页面，引入其他js包或者其他vue页面自定义的组件
      import XX from "XXX.js"
      import YY from "YY.vue"
      
      
      //
      export default {
          //绑定的数据
  		data(){
              return{
                  msg1:"xx",
                  msg2:"yy"
              }
          },
          //在这路引入YYY.vue组件
          componemts:{
              YY
          }
          //生命周期函数
          created(){
              
          },
          methods:{
              fun1(){},
              fun2(){}
          }
          //watch,computed等
      }
  </script>
  
  <!--lang指定预编译语言，scoped指定style中的样式只能在当前.vue文件中起作用-->
  <style lang="less" scoped>
  </style>
  
  ```

## 3.1 Vue实例

把Vue实例，看成一个函数`Vue()`，这个函数的参数是一个对象`Vue({})`，而`el`,`data`,`created`,`methods`,`computed`,`watch`看成是对象的属性

```js
new Vue({
    //el告诉vue管理模板的入口，div中的{{  }}的模板语法都会被渲染，el不能是body和html
	el: '#app',
    
    //绑定的成员数据，这种数据被称为响应式数据。(什么是响应式数据？数据驱动视图，当数据发生变化时，所有绑定该数据的DOM都会跟着改变)
	data: {
		msg: ''
	},
   //生命周期函数,后面会介绍。原本应该是对象的属性形式created:function(){}，但是一般简写成以下形式
   created(){
    
	},
    
   //vue实例中的方法全部写在里面，通过v-on将方法绑定在Dom元素上触发
   methods：{
   	fun1(){
    		//vue中可以通过this.msg获取data中变量的值
  			//也可以通过this.fun2()访问到methods中的函数
		}
	},
    
    //计算属性,与绑定函数不同的是，计算属性优先从缓存加载。a是变量名，且不用再data中声明，直接用于 {{a}} 之中
    computed：{
       a:function(){
           //一定有return,return的值放到a中，通过{{ a }}使用
       }
    },
    //侦听属性，用来监听data中变量的变化
    watch:{
        msg:function(newMessage,oldMessage){
            //默认参数是：改变前的值，改变后的值
        }         
    }
})		
```

### 属性data

data的值是一个对象，对象中的变量只要发生变化，则视图就会马上相应，视图中的数据就会变成新的值。

**注意：**

* 只有data中的变量才是响应式的

* 使用 `Object.freeze()`，这会阻止修改data中的对象类型的变量，也意味着响应系统无法再追踪变化。

  ```js
  var obj = {
    name:"张三",
    age:18
  }
  
  Object.freeze(obj)
  
  new Vue({
    el: '#app',
    data:{
    	stu:obj
    }
  })
  ```

### 生命周期函数(待深入分析)

```vue
<template>
  <div>

  </div>
</template>

<script>
import OtherComponent from '@/components/OtherComponent'

export default {
  name: 'MyName',
  components: {
    OtherComponent
  },
  directives: {},
  filters: {},
  extends: {},
  mixins: {},
  props: {},
  data () {
    return {

    }
  },
  computed: {},
  watch: {},
  beforeCreate () {
    // 生命周期钩子：组件实例刚被创建，组件属性计算之前，如 data 属性等
  },
  created () {
    // 生命周期钩子：组件实例创建完成，属性已绑定，但 DOM 还未生成，el 属性还不存在
    // 初始化渲染页面
  },
  beforeMount () {
    // 生命周期钩子：模板编译/挂载之前
  },
  mounted () {
    // 生命周期钩子：模板编译、挂载之后（此时不保证已在 document 中）
  },
  beforeUpdate () {
    // 生命周期钩子：组件更新之前
  },
  updated () {
    // 生命周期钩子：组件更新之后
  },
  activated () {
    // 生命周期钩子：keep-alive 组件激活时调用
  },
  deactivated () {
    // 生命周期钩子：keep-alive 组件停用时调用
  },
  beforeDestroy () {
    // 生命周期钩子：实例销毁前调用
  },
  destroyed () {
    // 生命周期钩子：实例销毁后调用
  },
  errorCaptured (err, vm, info) {
    // 生命周期钩子：当捕获一个来自子孙组件的错误时被调用。此钩子会收到三个参数：错误对象、发生错误的组件实例以及一个包含错误来源信息的字符串。
    console.log(err, vm, info)
  },
  methods: {}
}
</script>

<style lang="scss" scoped></style>

```



```js
var vm=new Vue({
  data: {
    a: 1
  },
    
  ////生命周期函数
    
  //属性写法
  created: function () {
    // this 指向 vm 实例
    console.log('a is: ' + this.a)
  },
    
  //简写形式
  mounted(){
    
  },

})

```

**注意：**不要再Vue实例的属性上使用箭头函数，否则会报错。因为箭头函数中this的指向和上下文有关，并不一定会指向Vue的实例化后的对象

```js
//都会报错
created: () => console.log(this.a),
vm.$watch('a', (oldValue,newValue) =>{ })
```

[Vue生命周期详解](https://blog.csdn.net/weixin_42653522/article/details/106341147)

![13119812-5890a846b6efa045](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/%E9%9D%A2%E8%AF%95%E7%9B%B8%E5%85%B3/20210511001215.jpg)

```text
beforeCreate=>创建当前页面vue实例
|
=>
|
created=>data,method,watch,computed可用
|
=>调用render函数，生成虚拟Dom
|
beforeMount=>虚拟Dom创建完成
|
=>调用patch函数，创建真实Dom
|
mounted =>真实Dom创建完成，并渲染到页面
```

如果数据变化，不一定会触发beforeUpdate，updated函数，**只有绑定在视图上的数据变化才会触发**

```text
=>绑定视图的数据发生变动，根据真实的Dom，生成一个虚拟Dom，将虚拟Dom上对应节点的数据进行同样变动
|
beforeUpdate
|
=>调用patch函数（使用diff算法），将虚拟Dom的改动更新到真实Dom上
|
updated
```

**响应式原理**（数据变动如何触发视图更新）

**diff算法**

###  计算属性 computed

`{{ }}`或者是v-bind绑定的数据，中有复杂的计算时，可以写在计算属性中。

我们需要数据B，但是数据B依赖了数据A,一旦数据A发生变化,B也会发生变化----->数据B改成计算属性

计算属性感知的是函数体内部data数据的变化

计算属性，与绑定函数不同的是，计算属性优先从缓存加，当数据A未发生变化时,访问计算属性B会立即返回之前的计算结果，而不必再次执行函数。只有依赖的数据A发生改变时,它才会重新求值。

B是变量名，且不用再data中声明，可直接用于 {{ }} 之中



计算属性B的 getter:

```js
computed: {
      B: function () {
  		//函数体，一定有return,return的值放到B中，通过{{ B }}使用
        return '改变后'+this.A
          
     //简写
      B(){
          //函数体一定有return,return的值放到B中，通过{{ B }}使用
         return '改变后'+this.A
      }
}
```

计算属性默认只有 getter，不过在需要时你也可以提供一个 setter：

```vue
<template>
	<t-input v-model="includePath" clearable />
</template>
<script>
export default{
  computed: {
    includePath: {
      get() {
        return this.$store.state.siderFilter.includePath;
      },
      set(v) {
        this.$store.commit("addIncluedPath", v);
      },
    }
}
</script>
```

助记: getter是函数内部变量变化触发,fullName得到return的值.setter是fullName变化触发,内部执行操作

### 侦听器  watch

当需要在数据变化时执行异步或开销较大的操作时,通常使用watch

监听的数据是data中的值

watch监听变量对应的函数，**不能使用箭头函数**

```vue
<template>
  <div>

  </div>
</template>

<script>
export default {
  data () {
    return {
			question:null
    }
  },
  watch: {
    question: function (newValue, oldValue) {//不能使用箭头函数
      //监测到question变化了，进行的操作  
    }
  }
}
</script>

<style lang="scss" scoped></style>
```

注意:

如果监听的是一个对象

```vue
student: {
  name: "",
  score: {
    math: 32,
    english: 80,
  },
  selectedCourse: ["操作系统", "数据结构"],
}
```

需要采用下面的方法，只要student里面的任何内容变化，就会触发

```vue
watch: {
     student: {
         handler: function() {
            //监测到question变化了，进行的操作  
         },
         deep: true
     }
}
```

如果只是监听对象的某个键,上面的方法太浪费性能了

```
watch: {
  "student.name": {
    handler:function () {
      console.log("触发执行");
    }
  }
},
```

或者

```vue
watch: {
  "student.name":function () {
      console.log("触发执行");
  }
},
```

### 计算属性和监听器

注意：

watch是监听data中的数据，数据变化，触发function中

compute是function内部数据变化，返回给外面的值（默认的getter，也可以设置setter）

## 3.2 Vue指令

### 1.html中绑定data数据

**使用{{ }}**

* 文本 

  使用“Mustache”语法 (双大括号) ,会将双大括号中的值当作变量，把在data中的具体数据渲染出来

  ```vue
  <span>{{ msg }}</span>
  ```

  双大括号之间还可以做简单的js运算（复杂的运算，一般会放到computed中）

  ```vue
  <span>{{ num++ }}</span>
  <span>{{ arr.split('').reverse().join('') }}</span>
  ```

  通过使用 `v-once `指令，你也能执行一次性地插值，当数据改变时，插值处的内容不会更新

  ```vue
  <span v-once> {{ msg }}</span>
  ```

* `v-text`

  ```html
  <span v-text="msg"></span>
  
  <!-- 和下面的一样 -->
  <span>{{msg}}</span>
  ```
  
* ``v-html``  若message是html代码，不用这个属性只会直接把html代码当成字符串显示
* `v-pre`  跳过这个元素和它的子元素的编译过程。直接显示 message 

### 2.标签属性绑定data数据

**不使用{{  }},直接写变量名即可**

有一些指定绑定时需要参数，放在指令名称之后的冒号后面

url是data中的变量 

```vue
<a v-bind:href="url">...</a>
//简写
<a :href="url">...</a>
```

### 3.属性绑定v-bind

#### 基本用法

**绑定属性**

`v-bind:`控制html标签的属性值，将**属性**和**变量**绑定。

```vue
//绑定属性disabled
<button v-bind:disabled="isButtonDisabled">Button</button>
//简写 
<button :disabled="isButtonDisabled">Button</button>
```

```vue
//绑定属性href
<a v-bind:href="url">...</a>
//简写
<a :href="url">...</a>
```

**动态参数**

[ ]中是变量attributeName，可以动态的指定绑定的属性是什么,比如:href

```vue
<a :[attributeName]="url"> ... </a>
```

**注意：**

* 当某个属性值是布尔值时，直接disable="true"相当于，把一个字符串赋值给属性。用绑定赋值，会把字符串ture转变为布尔值

  ```vue
  <button :disable="true"></button>//true是不可点击
  ```

* 绑定的属性的值是对象

  对象的属性值是true，则保留该属性；属性值是flase，则去除该属性；

  ```vue
  <div :class="obj"></div>
  ```

  ```js
  data: {
      obj:{
          active: true, 
          text-danger: false
   	}
  }
  ```

  对应的实际的效果是

  ```html
  <div  class="active"></div>
  ```

* 绑定的属性的值是数组

  ```vue
  <div :class="arr"></div>
  ```

  ```js
  data: {
      arr:['active','text-danger']
  }
  ```

  对应的实际的效果是

  ```html
  <div class="active text-danger"></div>
  ```

#### 用于绑定class

**对象语法**：动态切换class,只能切换该属性是否存在，对象属性值为真，则该属性存在，都则不存在

* 对象中传入一个字段(定义的class名，要用引号引起来)

  ```vue
  <div :class="{ 'active': true }"></div>
  ```

  ```css
  .active{
  	color:red
  }
  ```

  上面class绑定的是一个对象，其中`{key:value}`，key是css类名，value的真假决定了class是否生效。 value的值可以为：[truthiness](https://developer.mozilla.org/zh-CN/docs/Glossary/Truthy)

* 对象中传入更多字段来动态切换多个 class。此外，`v-bind:class` 指令也可以与普通的 class 属性共存

  ```vue
  <div
    class="static"
    :class="{ 'active': isActive, 'text-danger': hasError }"
  ></div>
  ```

  ```css
  .active{
  	color:red;
  }
  .text-danger{
  	font-size:20px;
  }
  ```

  和如下 data：

  ```vue
  data: {
    isActive: true,
    hasError: false
  }
  ```

  结果渲染为：

  ```vue
  <div class="static active"></div>
  ```

* 绑定的数据对象不必内联定义在模板里：

  ```vue
  <div class="static" v-bind:class="classObject"></div>
  ```

  ```vue
  data: {
    classObject: {
      active: true,
      'text-danger': false
    }
  }
  ```

  渲染的结果和上面一样。

* 我们也可以在这里绑定一个返回对象的**计算属性**。这是一个常用且强大的模式：

  ```vue
  <div v-bind:class="classObject"></div>
  ```

  ```vue
  data: {
    isActive: true,
    error: null
  },
  computed: {
    classObject() {
      return {
        active: this.isActive && !this.error,
        'text-danger': this.error && this.error.type === 'fatal'
      }
    }
  }
  ```

**数组语法**:切换class属性，可以放置三元表达式，切换两个不同属性，而对象是切换class某个属性是否存在

* 基础用法

  ```vue
  <div v-bind:class="['active', 'text-danger']"></div>
  ```
  
  渲染为：
  
  ```vue
  <div class="active text-danger"></div>
* 我们可以把一个数组元素替换为变量

  ```vue
  <div v-bind:class="[activeClass, errorClass]"></div>
  data:{
    activeClass: 'active',
    errorClass: 'text-danger'
  }
  ```
  
  渲染为：
  
  ```vue
  <div class="active text-danger"></div>
  ```

* 如果你也想根据条件切换列表中的 class，可以用三元表达式：

  ```vue
  <div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>
  ```

  这样写将始终添加 `errorClass`，但是只有在 `isActive` 是 truthy时才添加 `activeClass`。

* 三元表达式有些繁琐。所以在数组语法中也可以使用对象语法：

  ```vue
  <div v-bind:class="[{ active: isActive }, errorClass]"></div>
  ```

#### 用于绑定style

**对象语法**

`v-bind:style` 的对象语法十分直观——看着非常像 CSS，但其实是一个 JavaScript 对象。CSS属性名可以用驼峰式 (camelCase) 或短横线分隔 (kebab-case，记得用引号括起来) 来命名：

```vue
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
data: {
  activeColor: 'red',
  fontSize: 30
}
```

直接绑定到一个样式对象通常更好，这会让模板更清晰：

```vue
<div v-bind:style="styleObject"></div>
data: {
  styleObject: {
    color: 'red',
    fontSize: '13px'
  }
}
```

同样的，对象语法常常结合返回对象的计算属性使用。

**数组语法**

`v-bind:style` 的数组语法可以将多个样式对象应用到同一个元素上：

```
<div v-bind:style="[baseStyles, overridingStyles]"></div>
```

**自动添加前缀**

当 `v-bind:style` 使用需要添加[浏览器引擎前缀](https://developer.mozilla.org/zh-CN/docs/Glossary/Vendor_Prefix)的 CSS property 时，如 `transform`，Vue.js 会自动侦测并添加相应的前缀。

### 4.事件绑定v-on

v-on:绑定处理事件=“处理函数”，`v-on:`简写`@`

* **绑定方法**

  `v-on:`控制html标签的方法，将**方法**和**函数**绑定。

  ```vue
  <button v-on:click="addNum"></button> //addNum是methods中定义的方法
  
  <!--简写-->
  <button @click="addNum"></button>
  ```

* **动态参数**

  [ ]中是变量attributeName，可以动态的指定绑定的方法,比如:click

  ```vue
  <button @[attributeName]="url"> ... </buttom>
  ```

* 绑定的方法可以传递参数

  ```vue
  <!--绑定click方法，触发add()函数,add()不需要传入参数时可以省略括号-->
  <div id="example">
    <button v-on:click="add">点击了{{count}}次</button>
  </div>
  ```

  ```vue
  <script>
      var example = new Vue({
        el: '#example',
        data: {
          count: 0
        },
        methods: {
          add: function () {
            // `this` 在方法里指向当前 Vue 实例
            this.count++;
          }
        }
      })
  </script>
  ```
  
  也可以用 JavaScript 直接调用方法 example.add() 
  
  有时候绑定的函数需要访问原始的 DOM 事件，可以用特殊变量 `$event` 把它作为参数传入方法
  
  ```vue
  <button v-on:click="warn('警告', $event)">点击</button>
  ```
  
  ```js
  // ...
  methods: {
    warn: function (message, event) {//第个参数接收到“警告”字符串，第二个参数是$event
      // 现在我们可以访问原生事件对象
      if (event) {
        event.preventDefault()
      }
      alert(message)
    }
  }
  ```
  
  在事件处理程序中调用 `event.preventDefault()` 【阻止Dom元素默认行为】或 `event.stopPropagation()` 【阻止冒泡传递】是非常常见的需求。尽管我们可以在方法中轻松实现这点，但更好的方式是：方法只有纯粹的数据逻辑，而不是去处理 DOM 事件细节。为了解决这个问题，Vue.js 为 `v-on` 提供了**事件修饰符**和**按键修饰符**
  
  **事件修饰符**
  
  - `.stop`
  - `.prevent`
  - `.capture`
  - `.self`
  - `.once`
  - `.passive`
  
  ```vue
  <!-- 阻止单击事件继续传播 -->
  <a v-on:click.stop="doThis"></a>
  
  <!-- 提交事件不再重载页面 -->
  <form v-on:submit.prevent="onSubmit"></form>
  
  <!-- 修饰符可以串联 -->
  <a v-on:click.stop.prevent="doThat"></a>
  
  <!-- 只有修饰符 -->
  <form v-on:submit.prevent></form>
  
  <!-- 添加事件监听器时使用事件捕获模式 -->
  <!-- 即内部元素触发的事件先在此处理，然后才交由内部元素进行处理 -->
  <div v-on:click.capture="doThis">...</div>
  
  <!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
  <!-- 即事件不是从内部元素触发的 -->
  <div v-on:click.self="doThat">...</div>
  
  <!-- 点击事件将只会触发一次 -->
  <a v-on:click.once="doThis"></a>
  
  <!-- 滚动事件的默认行为 (即滚动行为) 将会立即触发 -->
  <!-- 而不会等待 `onScroll` 完成  -->
  <div v-on:scroll.passive="onScroll">...</div>
  ```
  
  **注意：**
  
  * 修饰符可以串联，但是使用修饰符时，顺序很重要；相应的代码会以同样的顺序产生。因此，用 `v-on:click.prevent.self` 会阻止**所有的点击**，而 `v-on:click.self.prevent` 只会阻止对元素自身的点击。
  * 不要把 `.passive` 和 `.prevent` 一起使用，因为 `.prevent` 将会被忽略，同时浏览器可能会向你展示一个警告。请记住，`.passive` 会告诉浏览器你**不想阻止事件的默认行为**。
  
  **按键修饰符**
  
  ```vue
  <!-- 只有按下的键是 `Enter` ，释放按键时，调用 `submit()`函数 -->
  <input v-on:keyup.enter="submit">
  
  <!-- 只有按下的键是 `PageDown` ，释放按键时，调用 `onPageDown()`函数 -->
  <input v-on:keyup.page-down="onPageDown">
  
  
  
* 内联处理

  ```vue
  <div id="example">
    <button v-on:click="count++">点击了{{count}}次</button>
  </div>
  ```

  ```vue
  <script>
      var example= new Vue({
        el: '#example',
        data: {
          count: 0
        }
      })
  </script>
  
  ```

### 5.表单绑定v-model

`v-model` 指令在表单`<input>`、`<textarea>` 及 `<select> `元素上创建双向数据绑定。

`v-model`本质上是`v-bind`绑定元素属性和`v-on`绑定元素事件的组合

- text 和 textarea 元素使用 `value` 属性 和 `input` 事件；
- checkbox 和 radio 使用 `checked` 属性 和 `change` 事件；
- select 字段将 `value` 作为 prop 并将 `change` 作为事件。

**举例：**

* 文本框

  输入框显示的是message绑定的值

  ```html
  <input v-model="message" placeholder="edit me">
  ```

* 多行文本

  ```html
  <textarea v-model="message" placeholder="add multiple lines"></textarea>
  ```
  ```text
   注意：在文本区域插值 (`<textarea>{{text}}</textarea>`) 并不会生效
  ```


* 复选框

  * 单个复选框。这里面的v-modle是布尔值，复选框选中时checked变量是true，反之是flase

    ```html
    <input type="checkbox" id="checkbox" v-model="checked">
    ```

  * 多个复选框。这里面的v-modle值是空数组，复选框选中时，会把对应的value值按选中的顺序push到空数组中；取消选中，会直接把数组中对应的value值删除

    ```html
    <div id='example'>
        
      <input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
      <label for="jack">Jack</label>
        
      <input type="checkbox" id="john" value="John" v-model="checkedNames">
      <label for="john">John</label>
      
      <br>
      <span>Checked names: {{ checkedNames }}</span>
    </div>
    ```

    ```js
    new Vue({
      el: '#example',
      data: {
        checkedNames: [] //因为是多选，所以是数组
      }
    })
    ```

  * 单选按钮。这里面的v-modle值，选中时是对应的value值

    ```html
    <div id="example">
        
      <input type="radio" id="one" value="One" v-model="picked">
      <label for="one">One</label>
      <br>
      <input type="radio" id="two" value="Two" v-model="picked">
      <label for="two">Two</label>
      <br>
      <span>Picked: {{ picked }}</span>
    </div>
    ```

    ```js
    new Vue({
      el: '#example',
      data: {
        picked: ''
      }
    })
    ```

* 下拉选择框。选中时v-model值是对应`<option>`中的值，添加value属性，则是对用option中value的值

    ```html
    <div id="example">
      <select v-model="selected">
          //第一个是默认选项，要设置成disable
        <option disabled value="">请选择</option>
        <option>A</option>
        <option>B</option>
        <option>C</option>
      </select>
      <span>Selected: {{ selected }}</span>
    </div>
    ```

    ```js
    new Vue({
      el: '#example',
      data: {
        selected: ''
      }
    })
    ```

    用 `v-for` 渲染 下拉选择框。v-model的值是选中option的value值

    ```html
    <select v-model="selected">
      <option v-for="option in options" v-bind:value="option.value">
        {{ option.text }}
      </option>
    </select>
    <span>Selected: {{ selected }}</span>
    ```

    ```js
    new Vue({
      el: '...',
      data: {
        selected: 'A',
        options: [
          { text: 'One', value: 'A' },
          { text: 'Two', value: 'B' },
          { text: 'Three', value: 'C' }
        ]
      }
    })
    ```

* 修饰符： `.lazy`  `.number`  `.trim` 

  ```html
  //输入完成后失去焦点后，才渲染数据，不是只要输入变化，就一直从新渲染
  <input v-model.lazy="msg" >
  //转成数字
  <input v-model.number="age" type="number">
  //去掉空白字符
  <input v-model.trim="msg">
  ```

### 6.条件渲染v-if

* ``v-if`` 和``v-else``

  ```html
  //可以控制 html元素和 <template>
  //变量只能是布尔值,可以控制元素是否可见
  <h1 v-if="awesome">Vue is awesome!</h1>
  <h1 v-else-if>1</h1>
  <h1 v-else>2</h1>
  ```

* ``v-show``   与``v-if``不同的是，html会被保留，只是隐藏了。

  ```html
  <h1 v-show="ok">Hello!</h1>
  ```
  
* 用 key管理可复用的元素

  Vue 会尽可能高效地渲染元素，通常会**复用已有元素**而不是从头开始渲染Dom元素。这么做使 Vue 变得非常快

  ```vue
  <template v-if="loginType">
    <label>用户名</label>
    <input placeholder="请输入用户名">
  </template>
  
  <template v-else>
    <label>邮箱</label>
    <input placeholder="请输入邮箱">
  </template>
  ```

  **注意：**通过控制loginType的真假，来控制显示哪部分。Vue只是替换label和input的内容，并不会重新渲染Dom元素，所以一旦在输入框中输入数据，即使切换loginType的值，数据也不会被清除，仍然会被显示在输入框.  比如 loginType为真时，输入用户名A，loginType为假时，输入用户名B,互相切换 loginType的值,input输入框会保留对应的数据

  **强制更新组件的办法**(还可以通过改变key值,可一让同一个组件每次key变化就会重新渲染Dom元素):通过给元素添加唯一的key，该元素就会被重新渲染。以下代码，label未使用唯一的key，所以仍然不会被重新渲染Dom,仅仅是替换内容

  ```vue
  <template v-if="loginType">
    <label>用户名</label>
    <input placeholder="请输入用户名" key="username">
  </template>
  
  <template v-else>
    <label>邮箱</label>
    <input placeholder="请输入邮箱" key="email">
  </template>
  ```
  
  新旧 children 中的节点只有顺序是不同的时候，最佳的操作应该是通过移动元素的位置来达到更新的目的。
  
  需要在新旧 children 的节点中保存映射关系，以便能够在旧 children 的节点中找到可复用的节点。key 也就是 children 中节点的唯一标识。
  
  **注意：**key要是字符串或者数值类型

### 7.列表渲染`v-for`

* 遍历数组``v-for="item in items"``

  ```html
  <!--还有第二个参数，即索引item，v-for="(item, index) in items"-->
  <ul id="example-1">
    <li v-for="item in items">
      {{ item.message }}
    </li>
  </ul>
  ```

  ```js
  var example1 = new Vue({
    el: '#example-1',
    data: {
      items: [
        { message: 'Foo' },
        { message: 'Bar' }
      ]
    }
  })
  ```

  你也可以用 `of` 替代 `in` 作为分隔符，因为它更接近 JavaScript 迭代器的语法：

  ```vue
  <div v-for="item of items"></div>
  ```

* 遍历对象

  ```html
  <!--还有第二个参数，即对象中的key值，v-for="(value, key) in object-->
  <!--还有第三个参数，即索引index，v-for="(value, key, index) in object"-->
  <ul id="example2" class="demo">
    <li v-for="value in object">
      {{ value }}<!--是对象的值-->
    </li>
  </ul>
  ```

  ```js
  new Vue({
    el: '#v-for-object',
    data: {
      object: {
        title: 'How to do lists in Vue',
        author: 'Jane Doe',
        publishedAt: '2016-04-10'
      }
    }
  })
  ```

* 当 Vue 正在更新使用 `v-for` 渲染的元素列表时，它默认使用“就地更新”的策略,即渲染元素变化 ,对应位置的Dom直接更新。所以，如果数据项的顺序被改变，Vue **不会移动 DOM 元素**的顺序来匹配数据项的顺序的改变，而是就地更新每个元素，并且确保它们在每个索引位置正确渲染。

  这个默认的模式是高效的，但是**只适用于不依赖子组件状态或临时 DOM 状态 (例如：表单输入值) 的列表渲染输出**。

  为了给 Vue 一个提示，以便它能跟踪每个节点的身份，**从而复用和重新排序现有元素**，你需要为每项提供一个唯一 `key`：

  ```vue
  <div v-for="item in items" v-bind:key="item.id">
    <!-- 内容 -->
  </div>
  ```

  **注意：**key要是字符串或者数值类型

### 6.自定义指令

#### 定义自定义指令

* 全局

  ```js
  // 注册一个全局自定义指令 `v-focus`
  Vue.directive('focus', {//定义的指令名，不要加v-
    // 当被绑定的元素插入到 DOM 中时……
    inserted: function (el) {//el指的是该自定义指令的调用者，即添加该指令的dom元素（有点像函数中的形参）
      //写具体功能： 对聚焦元素
      el.focus()
    }
  })
  
  new Vue()
  ```

* 局部定义

  效果:页面一载入,input就会自动获得焦点(默认需要自己点击input获取焦点)
  
  ```vue
  <template>
    <div id="app">
      <input v-focus>
    </div>
  </template>
  
  <script>
  
  export default {
    name: 'App',
    data() {
      return {};
    },
    directives: {
      focus: {
        inserted(el) {//el是添加指令的元素 
          el.focus(); //focus是dom的方法 
        },
      },
    },
  };
  </script>
  ```

#### 使用自定义指令

```html
<input type="text" v-focus>
```

## 3.3 过滤器

Vue2.x版本没有内置过滤器

用于对文本格式化处理

过滤器可以用在两个地方：**双花括号插值和 `v-bind` 表达式** (后者从 2.1.0+ 开始支持)。过滤器应该被添加在 JavaScript 表达式的尾部，由“管道”符号“|”指示：

### 定义过滤器

* 在Vue**选项**中定义局部过滤器

  ```js
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
  ```

* 全局过滤器(在new Vue之前)

  ```js
  Vue.filter('capitalize', function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  })
  
  new Vue({
    // ...
  })
  ```

### 过滤器的使用

```html
<！——"|"前是变量名，"|"后是过滤器名。
     变量绑定的值作为过滤器的第一个参数
     ——>
<!-- 在双花括号中 -->
{{ message | capitalize }}
{{ message | filterA | filterB }}<!--filterA的return作为filterB的一个参数-->
{{ message | filterA('arg1', arg2) }}<!--filter的参数是message 和自己传的参数arg1 arg2-->   
    
    
<!-- 在 `v-bind` 中 -->
<div v-bind:id="rawId | formatId"></div>
```

* 结果:把输入值的第一个字符大写

  ![](https://s1.ax1x.com/2020/03/26/8z9ZsU.png)



## 3.4 Vue组件

### 组件特点

* 组件是一种封装
* 是一种特殊的Vue实例
* 组件可以复用，每用一次组件就会有一个新的实例被创建 ，实例间互不影响

> 实际开发中，使用第三方组件

### 定义及使用组件

> **注意**：命名组件名建议使用' abc-xyz '形式（小写字母用 - 连接）

* 注册全局组件（ 写在new Vue({  })   之前 ）

  ```html
  <!DOCTYPE html>
  <html>
  	<head>
  		<title></title>
  		<!--通过CDN引入vue.js-->
  		<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  	</head>
  
  
  	<body>
  		<div id="app">
  			<!--使用自定义的组件-->
  			<button-counter></button-counter>
  		</div>
  		<script>
  			// 定义一个名为 button-counter 的新组件
  			Vue.component('button-counter', {
  				data() { //data必须是函数
  					return {
  						count: 0
  					}
  				},
  				template: '<button v-on:click="changeCount">You clicked me {{ count }} times.</button>',
  				methods: {
  					changeCount() {
  						this.count++;
  					}
  
  				}
  			})
  			new Vue({
  				el: "#app",
  				data: {
  
  				}
  			})
  		</script>
  
  	</body>
  </html>
  
  ```

* 注册局部组件(写在Vue选项中)

  ```vue
  <!DOCTYPE html>
  <html>
  	<head>
  		<title></title>
  		<!--通过CDN引入vue.js-->
  		<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  	</head>
  
  
  	<body>
  		<div id="app">
  			<!--使用自定义的组件-->
  			<button-counter></button-counter>
  		</div>
  		<script>
  			new Vue({
  				el: '#app',
  				data: {
  
  				},
  				//局部组件
  				components: {
  					"button-counter": { //组件名
  						data() { //data必须是函数
  							return {
  								count: 0
  							}
  						},
  						template: '<button v-on:click="changeCount">You clicked me {{ count }} times.</button>',
  						methods: {
  							changeCount() {
  								this.count++;
  							}
  
  						}
  					}
  				}
  			})
  		</script>
  
  	</body>
  </html>
  ```
  
* 模块化系统中的局部注册 

  有些时候，我们将封装的一个通用组件放在一个单独的`.vue`文件中，可以通过以下方式引入到当前`.vue`文件中，在vue实例的components字段引用

  ![20210509174212](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Vue%E7%9B%B8%E5%85%B3/20210509174212.png)

### 组件模板的定义

[好文](https://zhuanlan.zhihu.com/p/28073723)

即template字段内定义的组件模板

* 在`html`文件里，在组件内选择 `template` 字段选项,直接在字段后面写

* X-Template 

  在`html`文件里，这种方式是在一个 `<script>` 元素中，并为其带上 `text/x-template` 的类型，然后通过一个 id 将模板引用过去。
  
  ```html
    <!DOCTYPE html>
    <html>
    	<head>
    		<title></title>
    		<!--通过CDN引入vue.js-->
    		<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    	</head>
    
    
    	<body>
    		<div id="app">
    			<!--使用自定义的组件-->
    			<button-counter></button-counter>
    		</div>
            <script type="text/x-template" id="hello-world-template">
      			<p>Hello hello hello</p>
    		</script>
    		<script>
    			new Vue({
    				el: '#app',
    				data: {
    
    				},
    				//局部组件
    				components: {
    					"button-counter": { //组件名
    						data() { //data必须是函数
    							return {
    								count: 0
    							}
    						},
    						template: '#hello-world-template',
    						methods: {
    							changeCount() {
    								this.count++;
    							}
    
    						}
    					}
    				}
    			})
    		</script>
    
    	</body>
    </html>                                  
  ```
  
  



* 在 `.vue` 文件里的一个 `<template>` 元素来定义模板。



### 每个组件实例互不影响

[![Ge0eld.png](https://s1.ax1x.com/2020/03/30/Ge0eld.png)](https://imgchr.com/i/Ge0eld)

### 组件嵌套

无论是全局还是局部组件，都可以直接嵌套，即在定义时，template字段中可以写别的组件

### 组件通讯

[官方文档—访问元素&组件](https://cn.vuejs.org/v2/guide/components-edge-cases.html#%E8%AE%BF%E9%97%AE%E5%85%83%E7%B4%A0-amp-%E7%BB%84%E4%BB%B6)

[组件通信总结+原理分析](https://blog.csdn.net/u013205165/article/details/110952379)

**父组件向子组件传递数据**

props是自定义组件时的一个**字段**，参数是一个数组，每个数组元素都是一个组件的属性，通过props你可以在自定义的组件上注册一些自定义属性。使用自定义组件时，可以把值通过自定义的属性，传递给template中的子组件。**注意：**每个实例化的组件，传递参数互不影响

```html
<!--把参数通过title属性，传递到组件中的template中的{{title}}-->
<div id="app">
	<blog-post title="第一章"></blog-post>
    <blog-post title="第二章"></blog-post>
</div>
```

```html
<script>
        Vue.component('blog-post', {
            props: ['title'],
            template: '<h3>{{ title }}</h3>'
        })
		new Vue({
			  el: '#app',
			  data: {
			    message:200
			  }		 
		})		
</script>	
```

循环渲染自定义组件，并把值通过自定义属性`title`，传递到template中

```vue
<blog-post
  v-for="post in posts"
  v-bind:key="post.id"
  v-bind:title="post.title"
></blog-post>
```

```vue
<script>
    Vue.component('blog-post', {
                props: ['title'],
                template: '<h3>{{ title }}</h3>'
    })
    
    new Vue({
      el: '#app',
      data: {
        posts: [
          { id: 1, title: '第一章' },
          { id: 2, title: '第二章' },
          { id: 3, title: '第三章' }
        ]
      }
    })
</script>
```

**注意：**HTML 中的 attribute 名是大小写不敏感的，所以浏览器会把所有大写字符解释为小写字符。这意味着当你使用 DOM 中的模板时，使用驼峰命名法的 prop 名，在使用该属性时，需要用等价的 kebab-case (短横线分隔命名)。【如果你使用字符串模板，那么这个限制就不存在了。即单vue页面，html代码写在`<template>`标签中】

```html
<blog-post post-title="hello!"></blog-post>
<!--`props`如果不能使用`<router-link>`进行路由中的属性如果使用驼峰命名，使用时改成kebab-case形式-->
```

```vue
<script>
    Vue.component('blog-post', {
      props: ['postTitle'],//这里使用的驼峰命名法
      template: '<h3>{{ postTitle }}</h3>'
    })
</script>
```

**子组件向父组件传递数据**<span id="子组件向父组件传递数据"></span>

```vue
<div id="app">
    <!--两个子组件的count值也是独立的，不会互相影响的-->
    <button-counter @clicknow="clicknow"></button-counter>
    <button-counter @clicknow="clicknow"></button-counter>
</div>
```

```vue
<script>
 	//第一子组件
    Vue.component('button-counter', {
      data(){
        return {
          count: 0
        }
      },
      template: '<button v-on:click="add">点击了 {{ count }} 次</button>',
      methods:{
            add(){
               this.count++; 
               //子组件触发的add方法，通过this.$emit，把count的值放入clicknow函数之中，并在父组件调用，就会把子组件的数据传输到父级组件
               this.$emit('clicknow',this.count);
            }

      }
    })
    
    //实例化Vue对象
    new Vue({
        el:"#app",
        data:{},
        methods:{
            clicknow(e){
                //这里的e就是子组件的count
                console.log(e);
            }
        }
        
    })
</script>
```

**兄弟组件通信**

Event Bus 实现跨组件通信 Vue.prototype.$bus = new Vue

Vuex

**跨级组件通信**

Vuex

$attrs、$listeners

Provide、inject

### 插槽

在自定义组件的template字段中，添加<slot></slot>，那么使用子组件时就会将子组件开闭标签间的内容填充到template中<slot></slot>所在的位置

```html
<!DOCTYPE html>
<html>
	<head>
		<title></title>
		<!--通过CDN引入vue.js-->
		<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
	</head>


	<body>
		<div id="app">
			<button-counter @clicknow="clicknow">这里是插槽</button-counter>
			<button-counter @clicknow="clicknow"></button-counter>
		</div>
		<script>
			//第一子组件
			Vue.component('button-counter', {
				data() {
					return {
						count: 0
					}
				},
				template: '<div style="border: solid red 1px; margin-bottom: 10px;"> <slot></slot> <button v-on:click="add">点击了 {{ count }} 次</button></div>',
				methods: {
					add() {
						this.count++;
						//子组件触发的add方法，通过this.$emit，把count的值放入clicknow函数之中，并在父组件调用，就会把子组件的数据传输到父级组件
						this.$emit('clicknow', this.count);
					}

				}
			})

			//实例化Vue对象
			new Vue({
				el: "#app",
				data: {},
				methods: {
					clicknow(e) {
						//这里的e就是子组件的count
						console.log(e);
					}
				}

			})
		</script>

	</body>
</html>

```

![image-20210509162334456](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Vue%E7%9B%B8%E5%85%B3/20210509162353.png)

### 组件上支持v-model

这样处理自定义组件，就可以支持v-model了

```js
<script>
    Vue.component('custom-input', {
      props: ['value'],
      template: `
        <input
          v-bind:value="value"
          v-on:input="$emit('input', $event.target.value)"
        >
      `
    })
</script>
```

```vue
<custom-input v-model="searchText"></custom-input>
```

### 动态组件 

点击不同的按钮，下面对应就会显示不同的组件

![image-20210509233050176](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Vue%E7%9B%B8%E5%85%B3/20210509233050.png)

上述内容可以通过 Vue 的 `<component>` 元素加一个特殊的 `is` 属性来实现：

即，点击不同按钮时，更改`currentTabComponent`的值为对应组件名，就可以把component标签变成对应的自定义标签

```vue
<component v-bind:is="currentTabComponent"></component>
```

官网给出的[示例代码](https://codesandbox.io/s/github/vuejs/vuejs.org/tree/master/src/v2/examples/vue-20-dynamic-components?file=/index.html:0-1639)

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Dynamic Components Example</title>
    <script src="https://unpkg.com/vue"></script>
    <style>
      .tab-button {
        padding: 6px 10px;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
        border: 1px solid #ccc;
        cursor: pointer;
        background: #f0f0f0;
        margin-bottom: -1px;
        margin-right: -1px;
      }
      .tab-button:hover {
        background: #e0e0e0;
      }
      .tab-button.active {
        background: #e0e0e0;
      }
      .tab {
        border: 1px solid #ccc;
        padding: 10px;
      }
    </style>
  </head>
  <body>
    <div id="dynamic-component-demo" class="demo">
      <button
        v-for="tab in tabs"
        v-bind:key="tab"
        v-bind:class="['tab-button', { active: currentTab === tab }]"
        v-on:click="currentTab = tab"
      >
        {{ tab }}
      </button>

      <component v-bind:is="currentTabComponent" class="tab"></component>
    </div>

    <script>
      Vue.component("tab-home", {
        template: "<div>Home component</div>"
      });
      Vue.component("tab-posts", {
        template: "<div>Posts component</div>"
      });
      Vue.component("tab-archive", {
        template: "<div>Archive component</div>"
      });

      new Vue({
        el: "#dynamic-component-demo",
        data: {
          currentTab: "Home",
          tabs: ["Home", "Posts", "Archive"]
        },
        //currentTab变化触发，返回给component元素的is属性，渲染出对应的组件标签  
        computed: {
          currentTabComponent: function() {
            return "tab-" + this.currentTab.toLowerCase();
          }
        }
      });
    </script>
  </body>
</html>
```

**在动态组件上使用keep-alive**

在上面例子中，但在这些组件之间切换的时候，你有时会想保持这些组件的状态，以避免反复重渲染导致的性能问题。(比如，在一个组件中选中某个checkbox，但是切换到另一个组件，再切换回来，选中状态就会消失，keep-alive可以保持状态)

![不使用keep-alive的动态组件](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Vue%E7%9B%B8%E5%85%B3/20210509234558.png)

```vue
<!-- 失活的组件将会被缓存！-->
<keep-alive>
  <component v-bind:is="currentTabComponent"></component>
</keep-alive>
```

### 异步组件（待补充）

[文档-异步组件](https://cn.vuejs.org/v2/guide/components-dynamic-async.html#%E5%BC%82%E6%AD%A5%E7%BB%84%E4%BB%B6)

在大型应用中，我们可能需要将应用分割成小一些的代码块，并且只在需要的时候才从服务器加载一个模块。为了简化，Vue 允许你以一个工厂函数的方式定义你的组件，这个工厂函数会异步解析你的组件定义。Vue 只有在这个组件需要被渲染的时候才会触发该工厂函数，且会把结果缓存起来供未来重渲染。

## 3.5 特殊特性

Vue 实例暴露了一些有用的实例属性和方法。它们都有前缀 `$`，以便与用户定义的属性区分开来。

```js
var data = { a: 1 }
var vm = new Vue({
  el: '#example',
  data: data
})

vm.$data === data // => true
vm.$el === document.getElementById('example') // => true

// $watch 是一个实例方法
vm.$watch('a', function (newValue, oldValue) {
  // 这个回调将在 `vm.a` 改变后调用
})

```

还有`$refs`和`$emit()`

### 1. ref操作dom元素

```php+HTML
<div id="app">
		<input ref="a1"  v-model="message">
	  	<p ref="a2">我们</p>
</div>
```

```js
new Vue({
		  el: '#app',
		  data: {
		    message:''
		  },
		  mounted(){
              //生命周期函数，加载完毕
		  	console.log(this.$refs)//可以根据ref值来获取对用的dom元素
              this.$refs.a1.focus()//让ref=a1的input获取焦点
		  }
		})		
```

![](https://s1.ax1x.com/2020/03/26/8zBePS.png)

### 2.emit定义事件

[程序化的事件侦听器](https://cn.vuejs.org/v2/guide/components-edge-cases.html#%E7%A8%8B%E5%BA%8F%E5%8C%96%E7%9A%84%E4%BA%8B%E4%BB%B6%E4%BE%A6%E5%90%AC%E5%99%A8)

emit用法查看[这里](#子组件向父组件传递数据)

`$emit` 的定义一个事件，通过事件还可以传递参数，它可以被 `v-on` 侦听，但是 Vue 实例同时在其事件接口中提供了其它的方法。我们可以（eventHandler是侦听到事件后，的处理函数）：

- 通过 `$on(eventName, eventHandler)` 侦听一个事件
- 通过 `$once(eventName, eventHandler)` 一次性侦听一个事件
- 通过 `$off(eventName, eventHandler)` 停止侦听一个事件

你通常不会用到这些，但是当你需要在一个组件实例上手动侦听事件时，它们是派得上用场的。

## 3.6 组件

Vue组件的生命周期挺有意思

一般情况下在一个页面中使用组件，页面的加载完毕后，组建的created生命周期也会被执行

### 动态组件

![image-20220810141811735](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Vue/20220810141812%20.png)

页面中使用

```vue
<component :is="curComponent"></component>
```

变量curComponent是组件名（组件的name字段）

我们只需在在页面中控制curComponent的值，就可以切换多个组件。

有一点文档中未提及，就是页面虽然只是使用了组件名，但是仍然需要引入对应组件，并在components字段中引用

只有切换到对应的组件其created才会执行

```vue
<script>
import TodayTaskList from '@/components/TodayTaskList'
import CompletedTaskList from '@/components/CompletedTaskList'
export default {
  name: 'Task',
  components: {
    TodayTaskList, CompletedTaskList
  },
  data () {
    return {
      curTabIndex: 0
    }
  },
  computed: {
    curComponent () {
      if (this.curTabIndex === 0) {
        return 'TodayTaskList'
      } else if (this.curTabIndex === 1) {
        return 'CompletedTaskList'
      } else {
        return 'TodayTaskList'
      }
    }
  },
  methods: {
    changeTabIndex (index) {
      this.curTabIndex = index
    }
  }

}
</script>
```







# 4.过渡和动画(待补充)

## 列表过渡

## 动画过渡

![11](https://cn.vuejs.org/images/transition.png)

点击按钮后，文字缓缓淡出淡入

```html
<div id="demo">
  <button v-on:click="show = !show">
    Toggle
  </button>
  <transition name="fade">
    <p v-if="show">hello</p>
  </transition>
</div>
```

```js
new Vue({
  el: '#demo',
  data: {
    show: true
  }
})
```

```css
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
```

# 5.Vue发送网络请求

## 接口服务器

> 这里我们不搭建服务端，而是使用json-server，这个工具可以把json文件托管成一个WEB服务器。特点：基于Express，支持GET，POST，PUT，DELETE方法，支持跨域

* 官网：https://www.npmjs.com/package/json-server
* 安装：`npm install -g json-server`(全局安装，cmd处于任意目录下就可以)
* 创建`db.json`文件

```json
{
  "posts": [
    { "id": 1, "title": "json-server", "author": "typicode" },
    { "id": 2, "title": "json-server2", "author": "typicode2" }
    { "id": 3, "title": "json-server3", "author": "typicode3" }

  ],
  "comments": [
    { "id": 1, "body": "some comment", "postId": 1 }
  ],
  "profile": { "name": "typicode" }
}
```



* 启动Json服务:`json-server --watch db.json`（时cmd在db.json所在的目录下输入，`json-server --watch --port 3000 json-server`更改端口）
* 访问`http://localhost:3000/posts/1`,会返回`{ "id": 1, "title": "json-server", "author": "typicode" }`

## 明确接口规则是什么

> RESTful接口规则规范，参见这篇文章http://www.ruanyifeng.com/blog/2014/05/restful_api.html
>
> 特点：只需要关心请求方式，不用必关心 增删改查时使用不同的url

json-server工具应用RESTful接口规则 ：（以下是json-server运行后的接口，已经实现了可以直接用）

* routers（路由）

```
GET请求页面      
POST添加数据（上传数据），数据在请求头中
PUT修改数据，数据在请求体中
DELETE删除数据 
```

```
GET    /posts     查询所有数据
GET    /posts/1   查询id为1的数据
POST   /posts
PUT    /posts/1   修改id为1的数据

DELETE /posts/1  删除id为1的数据
```

* 分页查询

```
//10 items are returned by default
GET /posts?_page=7
//一页返回20条数据
GET /posts?_page=7&_limit=20
```

* 模糊查询

```
//title是字段，查询title中和server相似的记录
GET /posts?title_like=server
```

* [其他更多规范](https://www.npmjs.com/package/json-server)

## postman测试接口

> postman是一款接口测试工具

* 官网：[下载](https://www.postman.com/ )
* 界面

[![GEiDAA.png](https://s1.ax1x.com/2020/03/28/GEiDAA.png)](https://imgchr.com/i/GEiDAA)

* 使用

POST 状态码201，其余都是200

## 发送请求

使用Ajax还是axios发送网络请求的本质都是XMLHttpRequest，我们可以使用插件方便操作

**axios**:可以在任何地方用于发送请求，**推荐使用**

[中文文档](https://www.kancloud.cn/yunye/axios/234845)

[github官网](https://github.com/axios/axios)

`npm install axios`安装到对应目录

**基本使用规则**

````html
<script src="axios.js的位置"></script>
<script>
    //GET
	axios
        .get（url）//  /posts查所有，/posts/id查指定id
        .then((res)=>{
       		 res.data//获取的数据
    	})
        .catch((error)=>{
        	//出错后的处理
    	})
    
    
    
    //POST
    axios
        .post（url,{提交的数据}）//  /posts
        .then((res)=>{
        	res.data//获取的数据
   		 })
         .catch((error)=>{
       		 //出错后的处理
         })
    	
    
    
     //PUT
    axios
        .put（url,{提交的数据}） //  /put/id修改指定id的数据
        .then((res)=>{
        	res.data//获取的数据
   		 })
         .catch((error)=>{
       		 //出错后的处理
         })
    
    
    //DELETE
    axios
        .delete（url） //  /delete/id删除指定id的数据
        .then((res)=>{
        	res.data//获取的数据
   		 })
         .catch((error)=>{
       		 //出错后的处理
         })
    
</script>
````

**在网页中使用**

```html
<script src="node_modules/axios/dist/axios.js"></script>
	<script>
		axios
			.get("http://localhost:3000/posts")
			.then((res)=>{
				const {status,data}=res
				if(status==200){
					console.log(data)
				}
			})
			.catch((err)=>{

			})
			
		axios
			.post("http://localhost:3000/posts",{
				titlt:"hh",
				author:"hh"
			})
			.then((res)=>{
				const {status,data}=res
				if(status==201){
					console.log(data)
				}
			})
			.catch((err)=>{

			})

		axios
			.put("http://localhost:3000/posts/5",{
				titlt:"hh2",
				author:"hh2"
			})
			.then((res)=>{
				const {status,data}=res
				if(status==200){
					console.log(data)
				}
			})
			.catch((err)=>{

			})
			
		axios
			.delete("http://localhost:3000/posts/5")
			.then((res)=>{
				const {status,data}=res
				if(status==200){
					console.log(data)
				}
			})
			.catch((err)=>{

			})
	</script>
```

**在Vue项目中使用**

```js
new Vue({
	el: '#app',
	data: {
		lists: [],
	},
	mounted() {
		this.getAll() //查询所有数据在网页加载后调用，用生命周期
	},
	methods: {
		//把增删改查函数写在methods中
		//网页加载后调用，放到mounted中
		//通过触发时间调用的,给对应的html元素添加 v-on: 指令
		getAll() {
			axios
				.get("http://localhost:3000/posts")
				.then((res) => {
					const {
						status,
						data
					} = res
					if (status == 200) {
						this.lists = data
					}
				})
				.catch((err) => {

				})
		}
	}
})
```

**其他**

```js
import axios from 'axios'
//给axios访问的API前面添加固定前缀
axios.defaults.baseURL="http://8.131.105.244:3000"

//通过axios拦截器添加token验证
axios.interceptors.request.use(config=>{
	//给config的headers增加新的字段Authorization，把token添加进去
	config.headers.Authorization=window.sessionStorage.getItem('token')
	return config
})
```

# <a name="vue-cil工具">6.vue-cil工具</a>

> vue-cli:生成一套标准的vue项目目录
>
> vue-cil称为脚手架
>
> vue-cli是全局命令行工具
>
> vue-cli支持热更新，删除代码，自动更新启动服务器；如果修改项目配置文件，需要重新`npm run dev`
>
> 启动UI界面：vue ui
>
> 官网：https://cli.vuejs.org/zh/

## 使用步骤

* 安装：前提是要求已经安装nodejs

```shell
//安装vue-cli3
npm install -g @vue/cli
//使得vue-cli3可以使用vue-cli2的 vue-init 指令
npm install -g @vue/cli-init
```

* 创建项目步骤

> 在需要的文件夹下,执行以下指令。起名用英文名，不能有vue  webpack等关键字

```shell
//vue init 项目模板 项目名
vue init webpack-simple heroes
```

根据需要选择，选择默认就直接回车

![GQaY7R.png](https://s1.ax1x.com/2020/03/31/GQaY7R.png)



```
//进入项目目录
//安装创建项目的依赖包，自动找到package.json文件中的记录进行安装
npm install
//运行自带的服务器，弹出网页
npm run dev
```

![GQdOZd.png](https://s1.ax1x.com/2020/03/31/GQdOZd.png)

## 目录结构分析

[![GQweJ0.png](https://s1.ax1x.com/2020/03/31/GQweJ0.png)](https://imgchr.com/i/GQweJ0)

* src下

  * assets ：放置css，字体，图标等静态资源
  * App.vue ： `.vue`是组件文件，组成：tempalte script style 。 App.vue相当于整个项目的根组件，所有其他组件都要放到App.vue中，并导出，在main.js导入
  * main.js  : 程序的入口文件，导入各种包（App.vue组件，路由router.js）

  ```ES6js
  //ES6关于模块的使用
  //导出
  export default{}
  //导入,自己写的导入写地址,别的直接写包名
  import App from './App.vue'
  //Nodejs中
  module.exports
  require()
  ```

  ```js
  //默认main.js
  import App from './App.vue'
  
  new Vue({
    el: '#app',
    render: h => h(App)
  })
  ```


![Gt2UKO.png](https://s1.ax1x.com/2020/04/03/Gt2UKO.png)

* .babelrc :因为有的浏览器不支持ES6，使用babel进行转换，这个文件是bable的配置文件
* .editorconfig编辑器的配置文件
* .gitignore:记录的git的排除忽略文件
* index.html的代码中引入了build.js，vue-cli中使用了webpack，webpack把资源处理放在在build.js中
* package.json记录项目依赖的包和其他项目信息

```json
//package.json中有一个scripts的字段，key是value命令的简写，cmd调用时写 "npm run 简写"
"scripts": {
    "dev": "cross-env NODE_ENV=development webpack-dev-server --open --hot",
    "build": "cross-env NODE_ENV=production webpack --progress --hide-modules"
  }
```

* package-lock.json 记录项目依赖的包所使用的版本和下载地址
* webpack.config.js：webpack的配置文件，vue-cli中使用了webpack

## .vue文件结构

```vue
<template>
	 <div>
         //页面模板
    </div>
</template>

<script>
    //引入页面所有的包
	import echarts from "echarts"
    //
    export default{
        //生命周期函数
        created(){},
        mounted(){//这时候页面的dom元素已经渲染完毕了},
        //数据
        data(){
            return{
                a:"xx"
            }
        },
        //方法
        methods:{
            
        }
    }
</script>

<style lang="less" scoped>
    //lang="less"支持less语法
    //scoped表示style样式只在组件内起作用
    //样式
</style>

```





# 8.Vuex

[Vuex官方文档](https://vuex.vuejs.org/zh/)

Vuex 是一个专为 Vue.js 应用程序开发的**状态管理模式**。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

**看以下例子**

![image-20210511180455117](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/%E9%9D%A2%E8%AF%95%E7%9B%B8%E5%85%B3/20210511180455.png)



**state和getters的用法**

![image-20210511181525182](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/%E9%9D%A2%E8%AF%95%E7%9B%B8%E5%85%B3/20210511181525.png)

**mutations的用法:**

更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。且不能是异步方法

![image-20210511183022492](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/%E9%9D%A2%E8%AF%95%E7%9B%B8%E5%85%B3/20210511183022.png)

**action的用法:**

Action 是用来处理异步操作的,提交的是 mutation，而不是直接变更状态

```js
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
    incrementASync (context) {
      context.commit('increment')
    }
  }
})
```

```js
this.$store.dispatch('incrementASync')
```




# 9. 案例

 ## 项目起步

使用vue-cli新建项目

## 组件化

1. 在boostrap官网找到bootstrap3的后台模板（https://v3.bootcss.com/examples/dashboard/），右键“检查网页源代码”，复制body中的html代码，粘贴到App.vew文件的template下

2. 在main.js中引入样式文件

```js
npm install bootstrap@3//下载bootstrp
//style.css请到网页源码中找出引入样式的链接，进入，复制源码，新建文件style.css放在assets目录下

//导入样式文件
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import "./assets/style.css"
```

报错，有不能识别的文件，需要需改webpack.config.js

[![G8qcm6.png](https://s1.ax1x.com/2020/04/02/G8qcm6.png)](https://imgchr.com/i/G8qcm6)

添加以下文件（观察文档结构，就知道加在哪里了）

```js
{
	test:/\.(ttf|woff2|woff|eot)$/,
		loader:'file-loader',
			options:{
				name:'[name].[ext]?[hash]'
			}
}

```

3. npm run dev

![G8Laut.png](https://s1.ax1x.com/2020/04/02/G8Laut.png)

4. 在原来的基础上新建

![G8ONiF.png](https://s1.ax1x.com/2020/04/02/G8ONiF.png)

5. 把之前粘贴的到App.vue的template中的html，划分成一个一个组件，分别放在`.vue`文件中的template中

6. 【5】的具体步骤，在App.vue文件中template提取nav头部，放到appNav.vue的template中（特别注意一点：template中内容必须在同一个根div下)，script中增加export default{ }进行导出。接下来在App.vue中操作，如下：

```vue
<!--App.vue文件-->

<template>
  <div id="app">
    <!--顶部栏-->
    <!-- 3.通过组件名，使用组件，命名是驼峰标识appNav ,可以使用app-nav，不是的话，直接写-->
    <app-nav></app-nav>
    //其余部分不变
<template>
    
<script>
  	//在App.vue中使用appnav.vue组件
  	//1.引入组件
  	import appNav from './components/common/appnav.vue'
  	
    export default {
    name: 'app',
    //2.通过选项注册组件
    components:{
      //appNav:appNav简写成appNav
      appNav
    },
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>

<style>
 //不变
</style>

```

## 提取路由模块

src下新建router文件，在其下建router.js

```js
//router.js

//模块：路由,官方文档中给出的使用方式
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
//导入要渲染的组件
import List from "../components/list/list.vue"
import Bar from "../components/bar/bar.vue"
import Foo from "../components/foo/foo.vue"

var routes=[
  {name:"heroes",path:"/heroes",component:List},
  {name:"bar",path:"/bar",component:Bar},
  {name:"foo",path:"/foo",component:Foo}
]

var router=new VueRouter({
  //全局设置激活router-link后，给对应router-link的class属性增加的值.点击后增加active选中效果
  linkExactActiveClass:'active',
  routes
})

//导出router在main.js中使用
export default router

```

```js
//main.js中增加

//1.导入路由
import router from "./router/router.js"

new Vue({
  el: '#app',
  render: h => h(App),
  //2.挂载导入的对象
  router
})

```

appslider.vue 侧边栏组件

```vue
<template>
  <ul class="nav nav-sidebar">
      <!--tag="li"是让router-link在渲染html页面是时渲染成<li>-->
    <router-link to="/heroes" tag="li"><a>英雄列表</a></router-link>
    <router-link to="/bar" tag="li"><a>武器列表</a></router-link>
    <router-link to="/foo" tag="li"><a>装备</a></router-link>

  </ul>
</template>

<script>
  export default{

  }
</script>

<style>
</style>
```

## 使用接口服务器server-json

在heroes项目外建立server文件夹，新建db.json

```json
{
	"heroes":[
		{"id":1,"name":"张1","gender":"男"},
		{"id":2,"name":"张2","gender":"男"},
		{"id":3,"name":"张3","gender":"女"},
		{"id":4,"name":"张4","gender":"男"},
		{"id":5,"name":"张5","gender":"男"},
		{"id":6,"name":"张6","gender":"女"},
		{"id":7,"name":"王1","gender":"男"},
		{"id":8,"name":"王2","gender":"女"}
	]
}
```

启动json-server(安装啥的看之前的【4】)

```shell
json-server --watch db.json
```

## list.vue显示取出数据,删除数据

在项目中安装axio，用于发送请求

```shell
npm install axios
```

在list.vue中

```vue
<template>
   <div>
     <h2 class="sub-header">Section title</h2>
     <a class="btn btn-success">增加</a>
     <div class="table-responsive">

         <thead>
           <tr>
             <th>ID</th>
             <th>姓名</th>
             <th>性别</th>
             <th>操作</th>
           </tr>
         </thead>
         <tbody>
           <tr v-for="list in lists" v-bind:key="list.id">
             <td>{{list.id}}</td>
             <td>{{list.name}}</td>
             <td>{{list.gender}}</td>
             <td>
                <a v-on:click="deleteById(list.id)">删除</a>
             </td>
           </tr>
         </tbody>
       </table>
     </div>
   </div>
</template>

<script>
  //from后直接写包名
  import axios from 'axios'

  export default{
    data(){
      return{
        lists:[]
      }
    },
    mounted(){
      this.getData()
    },
    methods:{
      //查询所有
      getData(){
        axios
              .get("http://localhost:3000/heroes")
              .then(res=>{
                const {status,data}=res

                if(status==200){
                  this.lists=data
                }

              })
      },

      deleteById(id){
        axios
              .delete("http://localhost:3000/heroes/"+id)
              .then((res)=>{
                const {status,data}=res
                if(status==200){
                  console.log("删除成功")
                  this.getData()
                }
              })

      }

    }
  }
</script>

<style>
</style>

```

## 优化

```js
//1.不用在每个需要网络请求的vue组件中引入axios
//2.增删改查，同一个api，只不过请求方式不同和加不加id值，把基础url提取出来，放到全局

//以下代码均写在main.js中
import axios from 'axios'
//解决问题1，把axios进行全局配置，在任意一个vue组件中可以直接使用，不用import
Vue.prototype.axios=axios
//各个组件文件中，不必引入axios,用axios的地方换成this.axios.get/post/put/delete即可

//解决问题2
axios.defaults.baseURL="api中基础url，比如：http://localhost:3000/"
//this.axios.get("要拼接的内容") 函数会自动把baseURL拼接上


```

# 10.综合案例

## 前端初始化

前提安装好vue-cli

```
//方式一：命令启动（要建项目的目录下）

vue init webpack 项目名
//出现的让选的内容,只写了重点的选啥

//选 runtime+compiler
vue build 

//检查代码规范，不规范报错。不启用
use ESlint to lint you code? n

//开启单元测试
set up unit tests? n
//开启端对端的测试
setup e2e tests with Nigtwatch? n

//启动项目
npm run dev

/////////////////////////////////////////////////

//方式二：界面启动（要建项目的目录下）
vue ui

初始化git仓库建议  init project

选手动

安装 Babel,Router,使用配置文件

预设保不保存均可 

创建项目后，进入项目仪表盘，找到插件，安装vue-cli-plugin-element。导入方式选择按需导入

安装依赖,axios （安装到运行依赖） 

启动项目 任务-》server-》运行
```

## 项目托管

### 添加公钥

登录码云 www.gitee.com

```
//本地任意目录cmd输入后，连按3次回车
ssh-keygen -t rsa -C "xxxxx@xxxxx.com"

//例如，我的输入
ssh-keygen -t rsa -C "1270433876@qq.com" 

//在本地找到【 用户/电脑名/.ssh 文件夹 】，打开其中的id_ras.pub,复制内容粘贴到 码云-》设置-》ssh公钥-》添加公钥中，添加公钥
//本地任意目录cmd
ssh -T git@gitee.com 
选择yes，添加当前主机到可信任列表
```

### 托管本项目

登录码云-》新建仓库

在项目目录打开cmd，

```shell
//在任意位置下，做全局配置
git config --global user.name "用户名"
git config --global user.email "邮箱"

//在项目目录下
git status
git add .
git commit -m"第一次提交"

//在项目目录下，把本地新建的vue项目上传到码云
git remote add origin https://gitee.com/hyj1270433876/test.git 
git push -u origin master

//弹出窗口，输入码云的邮箱，密码，确定就上传成功了

```

```
////本地提交到指定远程分支上

//如果本地当前所在分支与远程分支同名
git push 远程仓库名 远程分支名

//不同名需要建立本地分支与远程分支之间的映射
git push 远程仓库名 本地分支名:远程分支名
```



## 登陆组件

### token维持登录状态原理

> http是无状态的
>
> * 通过cookie 在客户端记录登录状态
> * 通过session 在服务端登录记录状态
> * 通过token方式维持登录状态（存在跨域问题时使用）

由于浏览器前后台之间存在跨域问题，所以使用token

用户点击登录验证密码，服务端返回token，客户端接收到保存在sessionStorage（会话存在期间存在，结束销毁）中

**以下是token原理图**：

![image-20200403224323747](C:\Users\12704\AppData\Roaming\Typora\typora-user-images\image-20200403224323747.png)





### 开发登录功能

* `git status`查看是否有未提交的内容，有的话`git add`和`git commit -m "提交标注"`
* 创建新分支` git checkout -b 分支名`,并切换到该分支，`git branch`查看所有分支，加*的是当前分支
* 输入`vue ui`进入vue面板，任务-》server-》运行，待编译完成后，vue项目就能跑起来了，点击“启动app”
* 整理目录把原本默认的项目目录清理下
* 在components中新建组件`login.vue`。
* 使用支持less语言，在vue-cli面板中，依赖-》添加依赖-》搜索less-loader ,选择"开发依赖"-》安装，在搜索less安装到“开发依赖”。  在 任务-》server-》点击停止后，再启动

```vue
<!--login.vue-->
<template>
	<div>登陆组件</div>
</template>

<script>
	export default{}
</script>

<style lang="less" scoped>
    /*
    lang="less"是使style支持less语言
    scoped是样式尽在组件内生效
    */
	
</style>

```

* 在router.js中注册login.vue组件。import和添加routes

```js
import VueRouter from 'vue-router'

import Login from './components/login.vue'


Vue.use(VueRouter)

const routes = [
	{path: '/',redirect:'/login'},
	{path: '/login',name: 'login',component: Login}
	
 
]

const router = new VueRouter({
  routes
})

export default router
```



* 由于使用element-ui时，使用的按需导入，所以在plugins/element.js进行导入，注册

```js
import Vue from 'vue'

//由于使用element-ui时，使用的按需导入，所以使用什么组件都要导入
import { Button } from 'element-ui'
import { Form,FormItem } from 'element-ui'
import { Input } from 'element-ui'

//注册成全局可用的标签
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)


```

* 进一步完善 `login.vue`, element文档中给出了from组件的方法，如何使用？

```vue
//给按钮绑定 v-on="d()" 给表单组件绑定 ref="a" 

<script>
    //可以有生命周期函数
    
	data(){//必须有return的函数
        return{  
            
        }
    },
      methods:{//对象
          d(){
              //this是当前的vue对象
			this.$refs.a.文档中给出的方法	
          }
      }
</script>
```



![GdOmLD.png](https://s1.ax1x.com/2020/04/04/GdOmLD.png)

* 最终 login.vue

```vue
<template>
	<div class="login_container">
		<div class="login_box">
			<!--头像-->
			<div class="avatar">
				<img src="../assets/logo.png"/>
			</div>
			<!--表单区-->
			<el-form ref="form"  :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form" >
			  <!-- 账号 -->
			  <el-form-item prop="manager_email" >
			    <el-input v-model="loginForm.manager_email"  prefix-icon="czs-user"></el-input>
			  </el-form-item>
			  <!-- 密码 -->
			  <el-form-item  prop="manager_password">
			    <el-input v-model="loginForm.manager_password"  prefix-icon="czs-lock" show-password></el-input>
			  </el-form-item>
			  <!-- 按钮 -->
			  <el-form-item  class="btns">
			     <el-button type="primary" @click="login()">登录</el-button>
				 <el-button type="info" disabled>重置</el-button>
			  </el-form-item>
			</el-form>
		</div>
		
	</div>
</template>

<script>
	export default{		
		data(){
			return{
				//登录表单的数据绑定对象
				loginForm:{
					manager_email:'',
					manager_password:''
				},
				//表单验证规则
				loginFormRules:{
					//email
					manager_email:[//trigger:blur失去焦点时触发
						{ required: true, message: '请输入登陆邮箱', trigger: 'blur' }
					],
					manager_password:[
						{ required: true, message: '请输入密码', trigger: 'blur' }
					]
					
				}
			} 
		},
		methods:{
			login(){		
				this.$refs.form.validate(valid=>{
					if(!valid){//格式验证不对，res为flase
						return
					}
					console.log("表单验证成功")
					var res= this.$axios
										.post('/login',this.loginForm)		
										.then((res)=>{	
											//特别注意，后台api接口返回的内容放在了res.data字段了，res.date.date才有manager_id,token等字段
											// console.log(res.data.err_code)
											// console.log(res.data.message)
											// console.log(res.data.data.token)
						
											if(res.data.err_code==1){
												//登陆失败
												this.$message.error(res.data.message)
											}else{
												//登陆成功
												this.$message.success(res.data.message)
												//把token保存到本地
												window.sessionStorage.setItem("token",res.data.data.token)
												//编程式导航
												this.$router.push("/home")
											}
												
											
										})
								
				})
			}
		}
		
	}
</script>

<style lang="less" scoped>
.login_container{
	background-color:#274a6c;
	height: 100%;
}
.login_box{
	width: 450px;
	height: 300px;
	background-color: white;
	border-radius: 3px;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%,-50%);
}
.avatar{
	height: 130px;
	width: 130px;
	border: 1px  solid #eee;
	border-radius: 50%;
	padding: 10px;
	box-shadow:  0 0 10px #ddd;
	position: absolute;
	left:50%;//绝对定位，该元素的左边缘移动到父元素的50%的
	transform: translate(-50%,-50%);//横向，纵向 移动本元素宽，高的50%
	background-color: white;
	img{
		width: 100%;
		height: 100%;
		border-radius: 50%;
		background-color: #eee;
	}
	
}
	
.btns{
	display: flex;
	justify-content: flex-end;
}
.login_form{
	position: absolute;
	bottom: 0;
	width: 100%;
	padding: 0 30px;
	box-sizing: border-box;
}
	
</style>

```

* 路由导航守卫

```js
//挂载路由导航守卫
router.beforeEach((to,from,next)=>{
	//to 表示要访问的路径
	//from 表示从哪个路径跳转而来
	//next 是一个函数，表示放行
	
	//如果访问登录页，直接放行
	if(to.path=="/login") return next()
	//访问的不是登录页，查看是否有token,没有返回登录页
	const tokenStr=window.sessionStorage.getItem("token")		
	if(!tokenStr){
		console.log("尚未登陆，自动跳转回首页")
		return next('/login')
	}
	next()
})
```

* 实现退出登录，实际上就是清空本地存储的token

  在home.vue组件中

```vue
<template>
	<el-button type="info" @click="logout">退出</el-button>
</template>

<script>
		
	export default{
		methods:{
				
			logout(){
				window.sessionStorage.clear()
				this.$router.push("/login")
			}
		}
	}
</script>

<style lang="less" scoped>
</style>

```

### git提交到远程仓库

```shell
git status //查看本地分支
git add .  //显示有文件，就用这个提交到暂存区
git commit -m"完成登录模块" //提交到本地仓库

git branch  //查看当前分支，因为之前写项目时，进入的login分支，所以会显示login前有个*号



/////////////////////////////////////////
//1.切换到主分支master,再从主分支合并login分支
git checkout master //切换到主分支
git branch //查看当前分支是否为master
git merge login //在master上执行，合并login分支
git push //提交到远程仓库
/////////////////////////////////////////
//2.处在login分支。 由于login分支是第一次提交所以用以下命令
git push -u origin login//网站上就可以看到login分支了，之后提交直接git push就好

//如果是克隆指定分支 git clone -b 远程分支名称 代码仓库地址 
//如果项目文件夹不是从远程分支上拉下来的，自己在本地写的，先初试化成git目录， git init ，就会生成.git文件夹，可以自动记录变化了。
```

补充个小插曲,我在使用git时出现了错误，所有文件都回滚了

```
git log //查commit提交本地仓库的记录，我找到了对应记录的commit后的一串码即sha码，使用如下命令恢复
git reset --hard sha码//执行后本地文件恢复
```

## 后台主页组件

### 通过axios拦截器添加token验证

```js
//在main.js中添加，在import axios from 'axios'之后

//每次axios请求时，header会带着token传到服务端，服务端可以通过对token的判断确定用户身份

axios.interceptors.request.use(config=>{
	//给config的headers增加新的字段Authorization，把token添加进去
	config.headers.Authorization=window.sessionStorage.getItem('token')
	return config
})
```

### home开发

注意下，vue中有些标签属性的值为布尔型或是数字，但是属性值只能是string。比如：unique-opened的属性值是布尔值，一种：直接写unique-opened;另一种：v-bind:unique-opened="true",Vue会把字符串true转成布尔值。对于数值，只有一种方式： v-bind:XXXX="20",Vue会把字符串20转成数字

```vue
<el-menu background-color="#333744"  text-color="#fff" active-text-color="#4787d5" v-bind:default-active="active" unique-opened>
    
```

home.vue.

```vue
<template>
	<el-container>
		<!-- 头部区 -->
		<el-header>
			<div>
				<span>电商后台管理系统</span>
			</div>
			<el-button type="info" @click="logout">退出</el-button>
		</el-header>
		<!-- 主体区 -->
		<el-container>
			<!-- 侧边栏 -->
			<el-aside width="200px">
				<el-menu background-color="#333744"  text-color="#fff" active-text-color="#4787d5" v-bind:default-active="active" unique-opened router>
					<!-- 一级菜单  index接收的是字符串，所以用 数字+''-->
					<el-submenu v-bind:index="menulist.id+''" v-for="menulist in menulists" v-bind:key="menulist.id">
						<!-- 一级菜单模板区 -->
						<template slot="title">
							<!-- 图标 -->
							<i v-bind:class="menulist.icon"></i>
							<!--文本-->
							<span style="margin-left: 10px;">{{menulist.menuName}}</span>
						</template>				
						<!-- 二级菜单 -->
						<el-menu-item v-on:click="saveActive(second_item.path)" v-bind:index="second_item.path+''" v-for="second_item in menulist.children" v-bind:key="second_item.id">
							<template slot="title">
								<!-- 图标 -->
								<i class="el-icon-menu"></i>
								<!--文本-->
								<span>{{second_item.secondMenuName}}</span>
							</template>	
						
						</el-menu-item>

					</el-submenu>
					
					
				</el-menu>
			</el-aside>

			<!-- 右侧内容 -->
			<el-main>
				<router-view></router-view>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
	export default {
			
		created(){
			this.getMenuList()
			this.active=window.sessionStorage.getItem("active")
		},
		
		data(){
			return{
				//左侧菜单数据
				menulists:[],
				active:''
			}
		},
		methods: {

			logout() {
				window.sessionStorage.clear()
				this.$router.push("/login")
			},
			getMenuList(){
				this.$axios
							.get("/menus")
							.then(backinfo=>{
								//要用的数据在backinfo.data中,把这个值给res。该写法是ES6解构对象。
								const {data:res}=backinfo								
								if(res.err_code==0){
									console.log(res)
									this.menulists=res.data
									//return this.$message.success(res.message)
								}
							})
				
			},
				
			saveActive(active){
				//因为一刷新，选中项就会不高亮，所以存下来，每次created执行，再从sessionStorage中取
				window.sessionStorage.setItem("active",active)
				this.active=window.sessionStorage.getItem("active")
			}
		}
	}
</script>

<style lang="less" scoped>
	/*el组件名，可以直接当类名用*/
	.el-container {
		height: 100%;
	}

	.el-header {
		background-color: #373c41;
		display: flex;
		justify-content: space-between;
		align-items: center;
		/*内部文本*/
		color: white;
		font: 20px;

		>div {
			display: flex;
			align-items: center;

			span {
				margin-left: 15px;
			}
		}
	}

	.el-aside {
		background-color: #323744;
		.el-menu{
			border-right: none;
		}
	}
		

	.el-main {
		background-color: #f6f8fa;
	}
</style>

```

新建一个customer.vue。给router.js的routes中配置路由,home中有一个router-viwe,给其配置子路由

```
//访问后台时，自动加载上“用户子组件”
	{path: '/home',name: 'home',component: Home, redirect:"/customer" ,children:[
		{path: '/customer',name: 'customer',component: Customer}
	]}
```

这里的customer.vue已经写了部分内容，我们在后面会详细写出

![GsFGqg.png](https://s1.ax1x.com/2020/04/06/GsFGqg.png)

## 即时消息通知



## 树形结构的生成

以下功能

![J8RfxA.png](https://s1.ax1x.com/2020/04/21/J8RfxA.png)

有时候我们要做一个树形结构，但是往往树的层数是不定的，如何在一个表中存下来呢?使用如下的表结构，parent_id就是父层级的order_type_id，is_endnode如果是1则为最终结点

![J82DAS.png](https://s1.ax1x.com/2020/04/21/J82DAS.png)

如何把把表格读出来后变成树形的结构呢

```js
exports.getAllOrderType=function(callback){
	function treeData(source){
	      let cloneData = JSON.parse(JSON.stringify(source))    // 对源数据深度克隆
		  return cloneData.filter(father=>{               
			let branchArr = cloneData.filter(child=>father.order_type_id == child.parent_id)    //返回每一项的子级数组
			branchArr.length>0 ? father.children = branchArr : ''   //如果存在子级，则给父级添加一个children属性，并赋值
			return father.parent_id==0;      //返回第一层
		  })
	}
	queryStr="select * from  order_type"
	sql.query(connectionString, queryStr, (err, rows) => {
		if(err){
			
		}else{
			var a=treeData(rows)
			callback({err_code:0,message:'获取订单类型成功',data:a,affectedRows:0})
		}
	})
}
```

以下例子是把树形数据，扁平化的方案

```js
let res = []        // 用于存储递归结果（扁平数据）
// 递归函数
const fn = (source)=>{
    source.forEach(el=>{
        res.push(el)
        el.children && el.children.length>0 ? fn(el.children) : ""        // 子级递归
    })
}
 
// 树形数据
const arr = [
    { id: "1", rank: 1 },
    { id: "2", rank: 1,
        children:[ 
            { id: "2.1", rank: 2 },
            { id: "2.2", rank: 2 } 
        ] 
    },
    { id: "3", rank:1,
        children:[ 
            { id: "3.1", rank:2, 
                children: [ 
                    { id:'3.1.1', rank:3,
                        children:[ 
                            { id: "3.1.1.1", rank: 4, 
                                children:[
                                    { id: "3.1.1.1.1", rank: 5 }
                                ] 
                            } 
                        ] 
                    } 
                ] 
            } 
        ] 
    }
]
 
fn(arr)             // 执行递归函数
console.log(res)    // 查看结果
```



## 文件的上传与下载

**Vue+element+Nodejs**

## pdf文件的在线预览和打印

直接点击存储在服务器的文件的直链，如果是pdf。chrome会直接打开pdf，如果是doc会直接进入下载页面

## 统计图表组件

打开vue的图形化面板【vue ui 命令进入】=>依赖=>添加依赖=>运行依赖=>搜索echart=>安装

Echart的官网：[https://echarts.apache.org/zh/tutorial.html#5%20%E5%88%86%E9%92%9F%E4%B8%8A%E6%89%8B%20ECharts](https://echarts.apache.org/zh/tutorial.html#5 分钟上手 ECharts)

```
//在.vue文件中 不能使用<script src="xx"></script>的方式引入  要在 .vue 文件的<script>标签中加入import xxx from "xxx"【写在export default】
```

myChart.setOption(result);中result是配置和数据，在这里我们把配置写在data()中,数据是发起网络请求返回的，使用Lodash.js来进行深拷贝，合并在一起并赋值给result。

Lodash.js的官网：https://www.lodashjs.com/

```vue
<template>
	<!-- 2.为ECharts准备一个具备大小（宽高）的Dom -->
	<div id="main" style="width: 600px;height:400px;"></div>
</template>

<script>
	//1.导入echarts
	import echarts from "echarts"
	//深拷贝,创建一个新对象,把两个对象合并成一个放进去
	//lodash提供了一个merge(对象1,对象2)函数,返回一个新对象
	import _ from "lodash"
	export default {
		mounted() { //dom元素已经渲染完毕
			// 3.基于准备好的dom，初始化echarts实例
			var myChart = echarts.init(document.getElementById('main'));
			// 4.指定图表的【配置项】和【数据】
			const result = _.merge(this.option, res.data)
			// 5.使用刚指定的【配置项】和【数据】显示图表。
			myChart.setOption(result);

		},
		data() {
			return {
				//图的配置项
			    option : {
					title: {
						text: 'ECharts 入门示例'
					},
					tooltip: {},
					legend: {
						data: ['销量']
					},
					xAxis: {
						data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
					},
					yAxis: {},
					series: [{
						name: '销量',
						type: 'bar',
						data: [5, 20, 36, 10, 10, 20]
					}]
				}

			}
		},
		method:{
			//取回图的数据
		}
	}
</script>

<style>
</style>

```

## vue结构设计

https://www.processon.com/mindmap/6172336c07912943ddf2dcab













































































