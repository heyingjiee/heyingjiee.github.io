# Vue重刷笔记

这份文档主要针对的是Vue 2.0

这里仅仅是基于我自己的理解对于**Vue2.0**知识的整理，以及对官方文档未提及的内容进行补充

## 网站交互方式

### 单页应用SPA

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

### 单页应用SPA实现原理

前后端分离+前端路由

* 后端Nodejs，使用Express监视对应请求

  ```js
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
    <script  src="jquery位置"> </script>
    <!--页面-->
    <script is="tp1" type="text/template">
      	{{each student_front}}
      	<li> {{value.name}}</li>
      	{{/each}}
    </script>
    <!--请求数据，并渲染到页面-->
    <script>
     $.get("接口，如http://127.0.0.1:3000/student",function(data){
             template("tp1,{
                 student_front:data
              }")
     })
          <!-- $("#id名")可以获取dom元素-->
     </script>
    ```

  * 前端路由不同url装载不同页面

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

## Vue简介

Vue中最为核心的两个点，在这里做个概述

* 双向数据绑定

  支持v-model指令的组件，通过v-model绑定变量可以实现 ：

  页面组件数据改变，变量也会变化

  变量数据变换，页面组件也会跟着变化

  ![image-20220810192734006](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Vue/20220810192734%20.png)

  ```vue
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

* 响应式

  响应式就是变量发生变化，页面使用变量的地方也会同时发生变化

## Vue起步

如何使用Vue？

官网上的例子基本都是html页面，通过script标签引入Vue的方式来做项目的示例的。但是，实际上，我们一般使用Vue-cli（创建Vue项目的脚手架）创建一个支持Vue的项目，直接在项目中创建`*.vue`文件来进行开发，上线时，使用Vue-cli提供的功能编译成html和js文件，部署编译后的结果

**html页面引入**

在html页面，通过script方式引入的vue.js，通过new一个Vue对象来使用Vue提供的功能

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
        //el告诉vue管理模板的入口，div中的{{  }}的模板语法都会被渲染，el不能是body和html
        el: '#app',

        //绑定的成员数据，这种数据被称为响应式数据。(什么是响应式数据？数据驱动视图，当数据发生变化时，所有绑定该数据的DOM都会跟着改变)
        data: {
            msg: ''
        },
        //生命周期函数,后面会介绍。原本应该是对象的属性形式created:function(){}，但是一般简写成以下形式
        created() {

        },

        //vue实例中的方法全部写在里面，通过v-on将方法绑定在Dom元素上触发
        methods:{
        fun1()
        {
            //vue中可以通过this.msg获取data中变量的值
            //也可以通过this.fun2()访问到methods中的函数
        }
    }
    ,

    //计算属性,与绑定函数不同的是，计算属性优先从缓存加载。a是变量名，且不用再data中声明，直接用于 {{a}} 之中
    computed:{
        a() {
            //一定有return,return的值放到a中，通过{{ a }}使用
        }
    }
    ,
    //侦听属性，用来监听data中变量的变化
    watch:{
        msg(newMessage, oldMessage) {
            //默认参数是：改变前的值，改变后的值
        }
    }
    })
</script>

</body>
</html>
```

**使用vue文件**

使用<a href="#vue-cil工具">vue-cli工具</a>，构建更加复杂的Vue项目，可以在项目中使用`.vue`单文件进行vue代码的编写(在大型项目中使用这种方式)

```vue
<template>
  <div>

  </div>
</template>

<script>
import OtherComponent from '@/components/OtherComponent'

export default {
  name: '模板名,
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


<style lang="scss" scoped> 

</style>
```

**注意**

后面的所有例子，均使用`*.vue`文件的形式来实现

`*.vue`页面中的this是当前vue文件的实例，可以通过this获取页面中定义的变量和方法，后面的例子中会提到

## Vue选项

```vue
<script>
import OtherComponent from '@/components/OtherComponent'

export default {
  //页面名
  name: '页面名,
  
 	//引入的组件
  components: {
    OtherComponent
  },
  
  //自定义指令
  directives: {},
    
  //过滤器  
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
```

### data

data选项是一个函数（其他所有选项都是对象字面量），只有data中的变量才是响应式的

data中定义的变量，可以直接绑定到页面上（使用双花括号），也可以通过this访问到

```vue
<template>
	{{curTabIndex}} 
</template>
<script>
  export default {
    data(){
      return{
        curTabIndex:0
      }
    }
  }
</script>
```

使用 `Object.freeze()`，这会阻止修改data中的对象类型的变量，也意味着响应系统无法再追踪变化。

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



###  methods

**方法选项**

定义一个changeTabIndex方法，通过@click绑定到页面元素上，点击不同选项，触发方法修改curTabIndex变量的值

```vue
<template>
	<div>
      <div @click="changeTabIndex(0)">今日任务</div>
      <div @click="changeTabIndex(1)">已完成</div>
    </div>
</template>
<script>
  export default {
    data(){
      return{
        curTabIndex:0
      }
    },
    methods: {
    	changeTabIndex (index) { //参数值
      	this.curTabIndex = index //this获取data中的变量
    	}
  	}
  }
</script>
```

通过页面事件触发函数，如果需要传递参数，使用下面的形式

```vue
<template>
	<div @click="方法名(参数)">
    按钮
  </div>
</template>
```

通过生命周期函数触发函数，这里以created为例子（页面创建后触发的生命周期函数）

```vue
<script>
  export default {
    data(){
      return{
        curTabIndex:0
      }
    },
    created () {
			this.changeTabIndex()//通过this获取methods中的方法
  	},
    methods: {
    	changeTabIndex (index) {
      	this.curTabIndex = index 
    	}
  	}
  }
</script>
```



在methods中定义方法，通过页面调用方法/页面生命周期触发方法，改变变量值，变量值又可以直接反映到页面上。

这样就形成了完整的页面逻辑，但是很多场景下使用methods很麻烦，所以就出现了后面提到的computed、watch

### computed

计算属性，可以看成是声明了一个可以动态变化的data

* 声明为计算属性的变量，不用再在data中声明了。和data一样，可以直接绑定到页面上（使用双花括号），也可以通过this访问到

* 计算属性的函数内部使用的变量变化时，就会重新计算并return新值，计算属性变量就是这个新值

例子：

点击页面 "今日任务" 和 "已完成"，触发方法改变curTabIndex变量，同时计算属性变量curComponent也会自动触发，同步变化

```vue
<template>
	<div>
      <div @click="changeTabIndex(0)">今日任务</div>
      <div @click="changeTabIndex(1)">已完成</div>
    </div>
</template>
<script>
  export default {
    data(){
      return{
        curTabIndex:0
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

**使用场景**

当某个变量的值是复杂的计算的结果时，或者某个变量得值是依赖于某几个变量的，可以写在计算属性中。

**对于methods**

计算属性具有缓存，是基于响应式依赖进行缓存的，只在相关响应式依赖发生改变时它们才会重新求值。也就是，只要 `curTabIndex` 还没有发生改变，多次访问计算属性变量`curComponent`都会立即返回之前的计算结果，而不会再次执行函数

**计算属性深入**

计算属性是分为getter（获取计算属性变量的值）和setter（设置计算属性变量的值）的

计算属性默认只有 getter，不过在需要时你也可以提供一个 setter：

set有一个默认的参数，这个参数就是赋值给计算属性变量的值



```vue
<template>
	<div>
      <div @click="changeTabIndex(0)">今日任务</div>
      <div @click="changeTabIndex(1)">已完成</div>
    </div>
</template>
<script>
  export default {
    data(){
      return{
        curTabIndex:0
      }
    },
    computed: {
    	curComponent {
      	//getter
      	get(){
    			if (this.curTabIndex === 0) {
        		return 'TodayTaskList'
      		} else if (this.curTabIndex === 1) {
       	 		return 'CompletedTaskList'
      		} else {
        		return 'TodayTaskList'
      		}
  			}
      	//setter
        set(value){
          if(value==='TodayTaskList'){
            this.curTabIndex=0
          }
          if(value==='CompletedTaskList'){
            this.curTabIndex=1
          }
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

如果计算属性变量绑定到v-model上，就必须实现getter和setter

```vue
<template>
	<input v-model="includePath" clearable />
</template>
<script>
export default{
  computed: {
    includePath: {
      //getter
      get() {
        return 'includePath的值'
      },
      //setter
      set(value) {
        //input输入框输入时触发
      },
    }
}
</script>
```

### watch

监听器

与computed不同，监听的的变量必须是在data中声明的变量

函数的第一个参数是变量的新值，第二个参数是旧值

```vue
<template>
	<input v-model="includePath" clearable />
</template>
<script>
export default{
  data(){
    return {
      question:''
    }
  },
  watch: {
    //变量question发生改变，这个函数就会运行
    question: function (newValue, oldValue) {
      //函数体
    }
  },
}
</script>
```

**监听器深入**

如果监听的是一个对象

```js
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
            //监测到student变化了，进行的操作  
         },
         deep: true
     }
}
```

如果只是监听对象的某个键，上面的方法太浪费性能了

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

### 生命周期函数

**页面生命周期**

```vue
<template>
  <div id="app"></div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      test:"start"
    }
  },
  //组件实例刚被创建，data属性还不存在
  beforeCreate () {
    console.log('beforeCreate --> ',this.test)
  },
  //组件实例创建完成，属性已绑定,但 DOM 还未生成，el 属性还不存在
  created () {
    console.log('created --> ',this.test)
  },
  //模板编译/挂载之前
  beforeMount () {
    console.log('beforeMount --> ',this.test)
  },
  //模板编译、挂载之后（此时不保证已在 document 中）
  mounted () {
    console.log('mounted --> ',this.test)
  },
  //组件更新之前
  beforeUpdate () {
    console.log('beforeUpdate --> ',this.test)
  },
  //组件更新之后
  updated () {
    console.log('updated --> ',this.test)
  },
  //keep-alive 组件激活时调用
  activated () {
    console.log('activated --> ',this.test)
  },
  //keep-alive 组件停用时调用
  deactivated () {
    console.log('deactivated --> ',this.test)
  },
  //实例销毁前调用
  beforeDestroy () {
    console.log('beforeDestroy --> ')
  },
  //实例销毁后调用
  destroyed () {
    console.log('destroyed --> ')
  },
  //当捕获一个来自子孙组件的错误时被调用
  errorCaptured (err, vm, info) {//三个参数：错误对象、发生错误的组件实例以及一个包含错误来源信息的字符串。
    console.log('errorCaptured --> ',err, vm, info)
  },
}
</script>
```

打印结构：beforeCreate时无法访问data数据

```
beforeCreate -->  undefined
created -->  start
beforeMount -->  start
mounted -->  start
```

**带子组件的页面的生命周期**

父组件加载时，就开始执行子组件的生命周期了

```vue
<template>
	<div>
    <这里是子组件/>
  </div>
</template>
```

父子组件在beforeCreate时，均无法访问自身的data数据

```
父组件：beforeCreate -->  undefined
父组件：created -->  start
父组件：beforeMount -->  start
子组件：beforeCreate -->  undefined
子组件：created -->  start
子组件：beforeMount -->  start
子组件：mounted -->  start
父组件：mounted -->  start
```

**带动态组件的页面的生命周期**

```vue
<template>
	<div>
    <component :is="curComponentName"></component>
  </div>
</template>
```

只有在指定组件名时（is属性），才会创建、加载组件，即执行其完整的生命周期

每次切换不同的组件，之前的组件就会被销毁。例如"今日任务"、"已完成"两个页签切换时，curComponentName变量分别为两个组件的名字。一个组件选择后下拉框后，切换另一个组件，再切换回来时，下拉框的选中丢失

![image-20220815182419660](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Vue/20220815182420%20.png)

keep-alive组件可以影响该规则，使得组件切换时，不创建、销毁上一个组件。所以切换时，能保存组件的状态，且不会触发生命周期

```vue
<template>
	<div>
    <keep-alive>
      <component :is="curComponent"></component>
    </keep-alive>
  </div>
</template>
```

keep-alive包裹的组件，会有下面的生命周期函数被触发

```vue
//keep-alive 组件激活时调用
activated () {
  console.log('activated --> ',this.test)
},
//keep-alive 组件停用时调用
deactivated () {
   console.log('deactivated --> ',this.test)
},
```



### directives

自定义指令（后面会讲到Vue指令）

除了核心功能默认内置的指令 (`v-model` 和 `v-show`)，Vue 也允许注册自定义指令

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
  </script
  ```

```html
<input type="text" v-focus>
```

### filters

过滤器，过滤器通常用于处理页面上的数据（其实使用计算属性也可以，与计算属性不同，可以使用多个过滤器按顺序来处理数据）

* 双花括号中的数据
* 绑定到属性上的数据

过滤器分为局部和全局过滤器

* 局部，仅仅定义在vue文件的filters字段中，仅当前文件可以使用
* 全局，所有vue都可以使用

使用场景，例如：

* 将完整的手机号，过滤为` 180****3246`的格式

* 将发帖时间，过滤为 `刚刚`、`2分钟前`等的形式

**局部**

```vue
<script>
	export default{
  	filters:{
      //过滤器名字
      hidePhone(value){//过滤器接受的参数
        let reg = /^(\d{3})\d{4}(\d{4})$/i
        //return的结果是过滤后的结果
  			return value.toString().replace(reg, '$1****$2')
      }
    }
	}
</script>
```

**全局**

指定过滤器名为hidePhone，（过滤器作用是：隐藏手机号中间4位）

```js
import Vue from 'vue'

//参数1：过滤器名字
//参数2：过滤器接受的参数
Vue.filter('hidePhone', function (value) {
  let reg = /^(\d{3})\d{4}(\d{4})$/i
  return value.toString().replace(reg, '$1****$2')
})
```

**使用过滤器**

过滤器必须在最后，接收前面的数据作为参数

```vue
<template>
	<div>
    {{ mobile | hidePhone }}
  </div>
</template>
```

## Vue模板

template标签中必须有只有一个根元素

```vue
<template>
  <div>
    <!--页面html写在这里-->
  </div>
</template>
```

script标签中的变量控制页面上的元素

### 显示变量

**基本使用**

使用“Mustache”语法 (双大括号) ,会将双大括号中的值当作变量，把在data中的具体数据渲染出来

```vue
<span>{{ msg }}</span>
```

双大括号之间还可以做简单的js运算（复杂的运算，一般会放到computed中）

```vue
<span>{{ num++ }}</span>
<span>{{ arr.split('').reverse().join('') }}</span>
```

**与页面显示相关的Vue指令**

* `v-text`

  ```html
  <span v-text="msg"></span>
  
  <!-- 和下面的一样 -->
  <span>{{msg}}</span>
  ```

*  `v-once `

  你也能执行一次性地插值，当数据改变时，插值处的内容不会更新

  ```vue
  <span v-once> {{ msg }}</span>
  ```

* ``v-html``  若message是html代码，不用这个属性只会直接把html代码当成字符串显示

* `v-pre`  跳过这个元素和它的子元素的编译过程。直接显示 message 

### 绑定属性

**绑定属性**

`v-bind:`控制html标签的属性值，将**属性**和**变量**绑定。

```vue
//绑定属性disabled
<button v-bind:disabled="isButtonDisabled">Button</button>
//简写 
<button :disabled="isButtonDisabled">Button</button>
```

**动态参数**

[ ]中是变量名，可以动态的指定绑定的属性是什么,比如:href

```vue
<a :[attributeName]="url"> ... </a>
```

**注意**

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

其中，绑定class和style属性可以直接影响页面样式，单独拿出来讲解

### 绑定class

**对象语法**

控制class是否生效

1、内联写法

```vue
<div :class="{active: true}"></div>
```

```css
.active{
	color:red
}
```

上面class绑定的是一个对象，其中`{key:value}`，key是class名，值是该class是否生效。通过控制value的值，来控制class是否生效（ value的值可以为：[truthiness](https://developer.mozilla.org/zh-CN/docs/Glossary/Truthy) ）

2、绑定的数据对象不在内联定义在模板里

```vue
<div class="static" v-bind:class="classObject"></div>
```

```vue
data: {
  classObject: {
    active: true
  }
}
```

3、和计算属性结合

我们也可以在这里绑定一个返回对象的**计算属性**。这是一个常用且强大的模式：

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

**数组语法**

切换class属性，可以放置三元表达式，切换两个不同属性，而对象是切换class某个属性是否存在

* 基础用法

  ```vue
  <div v-bind:class="['active', 'text-danger']"></div>
  ```

  渲染为：

  ```vue
  <div class="active text-danger"></div>
  ```

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

### 绑定style

通常建议绑定class来控制样式，而不是使用绑定style

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

## Vue指令

### 事件绑定

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
          add() {
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
    warn(message, event) {//第个参数接收到“警告”字符串，第二个参数是$event
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
  ```

* 内联处理

  比如关闭弹窗经常使用这种方式将控制弹窗是否显示的变量直接置为false，简化代码

  ```vue
  <div id="example">
    <button v-on:click="count++">点击了{{count}}次</button>
  </div>
  ```

  ```vue
  <script>
  	export default{
      data() {
        return{
          count: 0
        }
      }
    }
  </script>
  ```

### 双向数据绑定

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

### 条件渲染

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

### 列表渲染

* 遍历数组

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
  <!--还有第二个参数，即对象中的key值，v-for="(value, name) in object-->
  <!--还有第三个参数，即索引index，v-for="(value, name, index) in object"-->
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

* 给每个列表项指定key

  Vue 会尽可能高效地渲染元素，通常会**复用已有元素**，这么做使 Vue 变得非常快

  当 Vue 正在更新使用 `v-for` 渲染的元素列表时，它默认使用“就地更新”的策略,即渲染元素变化 ,对应位置的Dom直接更新。所以，如果数据项的顺序被改变，Vue **不会移动 DOM 元素**的顺序来匹配数据项的顺序的改变，而是就地更新每个元素，并且确保它们在每个索引位置正确渲染。

  这个默认的模式是高效的，但是**只适用于不依赖子组件状态或临时 DOM 状态 (例如：表单输入值) 的列表渲染输出**。

  为了给 Vue 一个提示，以便它能跟踪每个节点的身份，**从而复用和重新排序现有元素**，你需要为每项提供一个唯一 `key`：

  ```vue
  <div v-for="item in items" v-bind:key="item.id">
    <!-- 内容 -->
  </div>
  ```

  **注意：**key要是字符串或者数值类型



## Vue组件

## Vue动画

## Vuex

## Vue-Router

## Vue-cli





