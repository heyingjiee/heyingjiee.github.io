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

## Vue实例

通过`Vue.prototype`获取全局的Vue实例，在其上挂载全局变量、函数

role.js

```js
import Vue from 'vue';

//RoleScopeList是角色列表，如果当前用户在其中，返回true，否则false
Vue.prototype.$verifyRoleScope = function (RoleScopeList) {
  let curRole = localStorage.getItem('curRole');
  return RoleScopeList.indexOf(curRole) !== -1;
};
```

main.js

```js
import Vue from 'vue';
import App from './App.vue';
import router from './router';

//一定要在main.js中引用。Vue启动时，会先执行main.js
import './utils/role';


new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
```

在页面中使用

```vue
<template>
  <div class="container">
    <!------------可直接使用全局函数-------------->
    <div v-if="$verifyRoleScope(['OrdinaryMember', 'FirstLeader', 'SecondLeader'])">有权限</div>
  </div>
  </div>
</template>

<script>
export default {
  
  methods: {
    //-----------js中使用this.xxx()访问，无需import-----------
    getRole(){
      if(this.$verifyRoleScope(['OrdinaryMember', 'FirstLeader', 'SecondLeader'])){
       console.log(' 有权限')
      }
    }
    
  },
};
</script>
```

在其他js文件中使用

```
```



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

### name

页面名

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

与computed不同，监听的的变量必须是在data中声明的变量或者组件定义的prop属性

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
    question(newValue, oldValue) {
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

**监听器触发时机**

页面：在data中定义的变量初始值，并不会触发watch，只有在变量被赋值为不同于初始值的值时，才会触发

组件：在组件的props中定义的属性，在父级传入初始值时不会触发watch，当传入的不同的数据后，才会触发

实际场景：

假如当前有一个组件用于将传入的时间戳，使用watch监听该属性并格式化为时分秒。每个1s就会传入新的时间戳。第一传入的是默认值，并不会触发watch，后面的才会触发

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

**局部定义过滤器**

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

**全局定义过滤器**

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

**多参数过滤器**

```vue
<template>
	<div>
		{{totalMoney|dealUndefValue('-')}} <!-- totalMoney是第一个参数，‘-’是第二个参数 -->
  </div>
</template>
<script>
	export default{
  	filters:{
      dealUndefValue(value, placeHolderValue) {
      if (value !== undefined && value !== null) {
        return value
      } else {
        return placeHolderValue
      }
		}    
	}
</script>

```

**过滤器与methods没有区别**

对于前面定义的过滤器hidePhone，我们也可以定义方法，直接在模版中使用

```vue
<template>
	<div>
    {{ hidePhone(mobile)}}
  </div>
</template>
```

两种方式是一样的

他们都支持响应式触发，mobile初始值是空字符串，异步从接口获取。过滤器和方法均会触发两次



### 其他选项

剩余的选项设计到 Vue组件、混入等等部分的内容，会在后面依次介绍

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

### 模板语法

**基本使用**

使用“Mustache”语法 (双花括号) ,会将双大括号中的值当作变量，把在data、props中的具体数据渲染出来

```vue
<span>{{ msg }}</span>
```

双花括号之间还可以做简单的js运算（复杂的运算，一般会放到computed中）

```vue
<span>{{ num++ }}</span>
<span>{{ arr.split('').reverse().join('') }}</span>
```

还可以使用methods选择中定义的方法

```vue
<template>
  <span>{{isDef(100)}}</span>
</template>

<script>

export default {
  methods: {
    isDef(value) {
      return value!==undefined&&value!==null

    }
  },
}
</script>


```

双花括号之间的内容会被自动转义

```vue
<template>
  <span>{{isDef(100)}}</span>
</template>

<script>

export default {
  data(){
    return{
      value:'<script>alert("hi")</script>'
    }
  }
}
</script>



```



**细节**

双花括号中出现null、undefined，在页面中dom仍然会被渲染，但是不会显示任何数据

```vue
<template>
  <span>{{null)}}</span>
	<span>{{undefined)}}</span>
</template>
```

由于vue是的响应式，模版中绑定的变量，会随着变量变化而从新渲染页面

```vue
<template>
  <span>{{name)}}</span>
</template>
```



常见场景：

```vue
<template>
  <span>{{stuInfo.score.math}}</span>
</template>

<script>

export default {
  data:{
    stuInfo:{}
  }
}
</script>
```

![image-20230302100214589](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Vue/20230302100215%20.png)

我们需要获取stuInfo对象中的某个字段，但是由于初始值是空对象，所以会报错。但是，这个数据是通过接口获取的，接口返回的数据就能正常获取这个值

**注意**：

* 如果由于初始值导致此类报错
  文件是页面，页面会直接空白

  文件是组件，只有在展示时显示空白，并不会导致整个页面空白和页面卡死，页面仍然可以正常操作

* 如果页面或组件已经正常加载，但是由于接口返回的值导致此类报错（例如，stuInfo返回了null）。
  文件是页面，页面会保持之前绑定的数据，直接卡死（绑定的方法不会触发了）

  文件是组件，会保持保持之前绑定的数据，但是组件使用正常

如何解决？

* 在data中指定初始值时，提前写好字段的结构

  ```vue
  <template>
    <span>{{stuInfo.score.math}}</span>
  </template>
  
  <script>
  
  export default {
    data:{
      stuInfo:{
        score:{
          math:0
        }
      }
    }
  }
  </script>
  ```

  这种方案在实际场景下治标不治本，因为接口返回的数据往往具有不确定性，例如返回的stuInfo的score直接变为了null，或者干脆没有返回score（就是undefined）。所以有了后面的方法

* 通过v-if，仅当数据存在时，才显示对应dom

  ```vue
  <template>
    <span  v-if="stuInfo?.score?.math">{{stuInfo.score.math}}</span>
  </template>
  ```
  
  注意:下面的代码if判断会报错，导致页面dom无法隐藏
  
  ```vue
  <template>
    <span  v-if="stuInfo.score.math">{{stuInfo.score.math}}</span>
  </template>
  ```
  
* 数据不存在也要显示dom。如下代码如果该字段不存在就会显示`-`

  ```vue
  <template>
    <span>{{stuInfo?.score?.math??'-'}}</span>
  </template>
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

1、绑定的一个对象。（注意：动态绑定的class会与写死的class合并，并不会覆盖其值）

```vue
<template>
	<!--key是class名，value是true代表添加该类-->
	<div class="static" :class="{ active: true,'text-danger': isHas  }"></div>
</template>

<script>
export default{
  data(){
    return {
      isHas:false //不添加css类:text-danger
    }
  }
}
</script>

<style>
  /* active类*/
  .active{
    color:red;
  }
</style>
```

上面class绑定的是一个对象，其中key是class名，value是该class是否生效。通过控制value的值，来控制class是否生效（ value的值为：[truthiness](https://developer.mozilla.org/zh-CN/docs/Glossary/Truthy) ）



2、和计算属性结合

我们也可以在这里绑定一个返回对象的**计算属性**。这是一个常用且强大的模式：

```vue
<div :class="classObject"></div>
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
  <div :class="['active', 'text-danger']"></div>
  ```

  渲染为：

  ```vue
  <div class="active text-danger"></div>
  ```

* 我们可以把一个数组元素替换为变量

  ```vue
  <div :class="[activeClass, errorClass]"></div>
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
  <div :class="[isActive ? activeClass : '', errorClass]"></div>
  ```

  这样写将始终添加 `errorClass`，但是只有在 `isActive` 是 truthy时才添加 `activeClass`。

* 三元表达式有些繁琐。所以在数组语法中也可以使用对象语法：

  ```vue
  <div :class="[{ active: isActive }, errorClass]"></div>
  ```

### 绑定style

通常建议绑定class来控制样式，而不是使用绑定style

**对象语法**

`v-bind:style` 的对象语法十分直观——看着非常像 CSS，但其实是一个 JavaScript 对象。CSS属性名可以用驼峰式 (camelCase) 或短横线分隔 (kebab-case，记得用引号括起来) 来命名：

```vue
<div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
data: {
  activeColor: 'red',
  fontSize: 30
}
```

直接绑定到一个样式对象通常更好，这会让模板更清晰：

```vue
<div :style="styleObject"></div>
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
<div :style="[baseStyles, overridingStyles]"></div>
```

**自动添加前缀**

当 `v-bind:style` 使用需要添加[浏览器引擎前缀](https://developer.mozilla.org/zh-CN/docs/Glossary/Vendor_Prefix)的 CSS property 时，如 `transform`，Vue.js 会自动侦测并添加相应的前缀。

## Vue指令

### 事件绑定

v-on:绑定处理事件=“处理函数”，`v-on:`简写`@`

* **绑定方法**

  将**事件**和**函数**绑定，如下，点击按钮触发click事件，执行addNum方法

  ```vue
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
    <button @click="add">点击了{{count}}次</button>
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

  有时候绑定的函数需要访问原始的 DOM 事件，可以用特殊变量 `$event` 把它作为参数传入方法（`$event`可以放在任意参数位置，方法接受参数时，按其所在位置接收该参数）

  ```vue
  <button v-on:click="warn('警告', $event)">点击</button>
  ```

  ```js
  // ...
  methods: {
    warn(message, event) {//第个参数接收到“警告”字符串，第二个参数是$event
      // 现在我们可以访问原生事件对象event
      if (event) {
        event.preventDefault()
      }
      alert(message)
    }
  }
  ```

  在事件处理程序中调用 `event.preventDefault()` 【阻止Dom元素默认行为】或 `event.stopPropagation()` 【阻止冒泡传递】是非常常见的需求

  

  尽管我们可以在方法中轻松实现这点，但更好的方式是：方法只有纯粹的数据逻辑，而不是去处理 DOM 事件细节

  

  为了解决这个问题，Vue.js 为 `@` 提供了**事件修饰符**和**按键修饰符**

  **事件修饰符**

  - `.stop `：阻止事件冒泡
  - `.prevent`：阻止默认行为
  - `.capture`
  - `.self`
  - `.once`（除了支持原生Dom事件外，还是支持Vue的自定义事件）
  - `.passive`

  ```vue
  <!-- 当前事件是从元素自身触发时，才执行处理函数，即事件不是从内部元素冒泡传递过来的 -->
  <div @click.self="doThat">...</div>
  
  <!-- 阻止事件冒泡 -->
  <a @click.stop="doThis"></a>
  
  <!-- 添加事件监听器时使用事件捕获模式
  		 即内部元素触发的事件先在此处理，然后才交由内部元素进行处理 
  -->
  <div @click.capture="doThis">...</div>
  
  <!-- 提交事件不再重载页面 -->
  <form @submit.prevent="onSubmit"></form><form @submit.prevent="onSubmit"></form>
  <!-- 可以防止遮罩层滚动击穿 -->
  <div @touchmove.prevent>遮罩层</div>
  
  
  <!-- 点击事件将只会触发一次 -->
  <a @click.once="doThis"></a>
  
  <!-- 
  		 passive即不阻止默认行文（与prevent相反，当prevent、passive同事出现，默认忽略prevent）
  		 滚动事件的默认行为 (即滚动行为) 将会立即触发
  -->
  <div @scroll.passive="onScroll">...</div>
  ```

  其他使用方式

  ```vue
  <!-- 修饰符可以串联 -->
  <a @click.stop.prevent="doThat"></a>
  
  
  <!-- 只有修饰符 -->
  <form @submit.prevent></form>
  
  <!-- 修饰符串联的顺序不同，效果也不同 -->
  <button @click.prevent.self></button> <!--会阻止所有的点击-->
  <button @click.self.prevent></button> <!--只会阻止对元素自身的点击-->
  ```

  

  **按键修饰符**

  ```vue
  <!-- 只有按下的键是 `Enter` ，释放按键时，执行函数 -->
  <input @keyup.enter="submit">
  
  <!-- 只有按下的键是 `PageDown` ，释放按键时，执行函数 -->
  <input @keyup.page-down="onPageDown">
  ```

  

  **鼠标按钮修饰符**

  ```vue
  .left  左键
  .right 右键
  .middle 中间滚轮
  ```

  使用prevent修饰符，可以阻止右键时弹出的菜单

  ```vue
  <template>
    <div style="border:1px solid red;width: 100px" @click.right.prevent="rightClick">确定</div>
  </template>
  
  <script>
  export default {
    name: 'HelloWorld',
    data(){
      return{
        test:"start"
      }
    },
    methods:{
      rightClick(){
        console.log('点击了右键')
      }
    },
  }
  </script>
  
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



这里绑定的事件都是Dom原生事件，还剩下比较特殊的**组件事件**，会在组件章节继续学习

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

  Vue 会尽可能高效地渲染元素，所以默认会**复用已有元素**而不是从头开始渲染Dom元素。这么做使 Vue 变得非常快

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

后面的例子，均会使用vue文件的形式作为例子

### 组件介绍

* 组件是一种特殊的Vue实例

* 组件可以复用，每用一次组件就会有一个新的实例被创建 ，实例间互不影响【原因：Vue的data选项是函数】

* 官方推荐的习惯

  子组件Vue文件名，推荐使用**PascalCase**，例如：`HelloWorld.vue`

  自定义属性推荐**camelCase**命名

  自定义事件推荐**kebab-case**命名

  ```vue
  <!--子级(定义组件)-->
  <template>
  	<div @click="tapMainTitle">
      {{mainTitle}}
    </div>
  </template>
  
  <script>
  export default {
    name: 'BlogPost',
    props: {
      mainTitle: {
        type: String,
        default: 'left',
      },
    },
    methods:{
  		tapMainTitle(){
        this.$emit('tap-main-title')
      }
    }
  }
  </script>	
  ```

  父组件Vue文件中引入，页面中子组件名、属性、事件均推荐**kebab-case**方式。

  ```vue
  <template>
  	<div>
    	<blog-post main-title="第一章"></blog-post> 
    </div>
  </template>
  
  <script>
  import BlogPost from '../BlogPost'  
  export default {
   	components:{
      BlogPost
    }
  }
  </script>
  
  ```

  注意，HTML 中的 attribute 名是大小写不敏感的，浏览器会把所有大写字符解释为小写字符。这意味着当你使用 DOM 中的模板时，子组件名、属性必须使用短横线方式

  

一个页面可以由多个组件组成，一个组件也可以由多个组件构成，呈现一种树状结构

![image-20230209151642217](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Vue/20230209151642%20.png)

### 定义和引入组件

> **注意**：
>
> 子组件Vue文件名，推荐使用首字母大写的方式，例如`HelloWorld.vue`
>
> 父级页面引入子组件时，在页面使用的子组件名，推荐使用' **kebab-case** '形式

通常，我们会将组件定义在一个单独的Vue文件中，并通过以下方式引入到当前页面的Vue文件中

并在，Vue实例的components字段引用

![20210509174212](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Vue%E7%9B%B8%E5%85%B3/20210509174212.png)



### 父向子组件通信（props）

**定义属性**

props选项，用于在组件上注册一些自定义属性。

使用自定义组件时，可以把值通过自定义的属性传递值到组件中

> 注意：在父级页面中的组件名，官方推荐使用短横线方式
>
> 子组件中定义属性mainTitle，父级页面使用main-title，两种写法不同，但是仍然可以正确传递数据

```vue
<!--子级(定义组件)-->
<script>
export default {
  name: 'BlogPost',
  props: ['mainTitle','subTitle']
}
</script>	
```

```html
<!--父级(使用组件)-->
<template>
	<div id="app">
		<blog-post main-title="第一章" sub-title="第一节"></blog-post> 
	</div>
</template>


<script>
import BlogPost from 'xxxx'  
export default {
 	components:{
    BlogPost
  }
  props: {
    title: {
      type: String,
      default: 'left',
    },
  },
}
</script>	
```

如果定义的属性是布尔值，例如存在一个属性`isShowSubTilte`，其仅接受布尔值，则可以简写

```vue
<blog-post :isShowSubTilte="true" ></blog-post> 

简写：
<blog-post isShowSubTilte ></blog-post> 
```

绑定整个对象，组件内部会根据定义的属性，在对象中查找。注意：这种方式不能使用`:`简写

```vue
<template>
  <div id="app">
    <blog-post v-bind="post"></blog-post>
  </div>
</template>

<script>
import BlogPost from './components/BlogPost.vue'

export default {
  name: 'App',
  components: {
    BlogPost
  },
  data() {
    return {
      post: {
        mainTitle: '第一章',
        subTitle: '第一节'
      }
    }
  },
}
</script>

```

```vue
<template>
  <div>
    {{ mainTitle }}-{{ subTitle }}
  </div>
</template>

<script>

export default {
  name: 'BlogPost',
  inheritAttrs: false,
  props: {
    mainTitle: {
      type: String,
      default: '第一章'
    },
    subTitle: {
      type: String,
      default: '第一节'
    }
  },
}
</script>
```



**属性校验**

props属性还可以指定为对象，并详细的指定属性的类型

指定类型时，类型名首字母大写

**(`null` 和 `undefined` 会通过任何类型验证)**

```js
props: {
		// 指定属性为number类型
    propA: Number,

    // 指定属性为多个类型，例如string或者number类型
    propB: [String, Number],
      
    // type指定类型，其可选值：String、Number、Boolean、Array、Object、Date、Function、Symbol
    // required表示必填类型
    propC: {
      type: String,
      required: true
    },
      
    // default指定属性默认值
    propD: {
      type: Number,
      default: 100
    },
      
    // 默认值为数组、对象。必须从一个工厂函数获取
    propE: {
      type: Object,
      default:  ()=> {
        return { message: 'hello' }
      }
    },
      
    // 自定义验证函数
    propF: {
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        return ['success', 'warning', 'danger'].includes(value)
      }
    }
}
```



对开始的例子，加入自定义属性校验

```vue
<!--子级(定义组件)-->
<script>
export default {
  name: 'BlogPost',
  props: {
    mainTitle: {
      type: String,
      default: '第一章',
    },
     subTitle: {
      type: String,
      default: '第一节',
    },
  },
}
</script>	
```



**关于子组件属性的几点注意**

* 单项数据流

  父级页面通过Prop像子组件注入数据，子组件不应该在组件逻辑中直接修改Prop属性，这样会导致影响父级页面（对于Prop是对象、数组这种引用类型，组件内部修改会直接导父级页面数据改变，这样会导致开发者难以找到是哪里导致了数据改变）

  下面给出了两种情景的应对方式：

  **Prop传递初始值**

  将初始值保存在组件data中，之后操作这个值即可

  ```vue
  props: ['initialCounter'],
  data: function () {
    return {
      counter: this.initialCounter
    }
  }
  ```

  **Prop是动态传入的，但是组件内需要动态处理后的值**

  使用compute动态计算后的值

  ```vue
  props: ['size'],
  computed: {
    normalizedSize: function () {
      return this.size.trim().toLowerCase()
    }
  }
  ```

  

  

* 初始化过早的问题

  通常，组件属性传入的数据是从接口获取的，接口返回需要一定的时间。

  所以，设置初始时候就要考虑到对象中的key，并为其设置初始值。否则就会出现错误提示

  ```vue
  <blog-post main-title="article.main.title"></blog-post> 
  
  data(){
   	return{
  		article:{
  			main:{
  				title:''
  			}
  		}
  	}
  }
  ```




**未定义属性**

Vue组件还支持，直接设置未被定义的属性。例如class属性

```vue
<blog-post class="blue" mainTitle="第一章" subTitle="第一节"></blog-post> 
```

该属性会被添加到组件的根元素上

注意style、class在这两个属性比较特殊，组件根元素会合并外部传入的style或class。而且其他属性都是外部传入覆盖组件根元素上同名属性

```vue
<template>
  <div class="bigSize">
    {{ mainTitle }}-{{ subTitle }}
  </div>
</template>

<script>

export default {
  name: 'BlogPost',
  props: {
    mainTitle: {
      type: String,
      default: '第一章'
    },
    subTitle: {
      type: String,
      default: '第一节'
    }
  },
  mounted() {
    console.log('$attrs', this.$attrs)
  }
}
</script>

<style scoped>
.bigSize {
  font-size: 50px;
}

.blue {
  color: blue;
}
</style>

```

![image-20230227150504630](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Go/20230227150505%20.png)



如果不希望组件根元素继承外部传入的未定义属性？

指定`inheritAttrs: false`。注意：该选项不能阻止class、style的继承



如果希望外部传入的未定义属性，不被根元素继承，而是被组件内部的某个元素继承？

```vue
<blog-post customData="随意起的属性名customData"></blog-post> 
```

组件中通过`$attrs`，可以得到传入的未定义属性及其值。可以直接使用它，将未定义属性绑定到任意组件内元素（前提是要指定`inheritAttrs: false`）

```vue
<template>
  <div>
    {{ mainTitle }}-{{ subTitle }}
    <div v-bind="$attrs">非根元素</div>
  </div>
</template>

<script>

export default {
  name: 'BlogPost',
  inheritAttrs: false,
  mounted() {
    console.log(this.$attrs) //{customData: '随意起的属性名customData'}
  }
}
</script>

```



### 子向父组件通信（$emit）

>注意：在父级页面中的事件名，官方推荐使用短横线方式
>

子组件通过$emit抛出事件，再父组件中可以给这个事件绑定方法，从而接收到其中的变量

```vue
<template>
  <div @click="add">
    {{count}}
  </div>
</template>


<script>
export default{
  name:'child',
  data(){
    return {
      count: 0
    }
  },
  methods:{
    add(){
      this.count++;
      //子组件触发的add方法，通过this.$emit，把count的值放入clicknow函数之中，并在父组件调用，就会把子组件的数据传输到父级组件
      this.$emit('click-now',this.count);
    }
  }
}
</script>


```

```vue
<template>
	<div>
    <child @click-now="clicknow"></child>
  </div>
</template>


<script>
	export default{
 	name:'father'
 
   methods:{
     clicknow(e){
       console.log('子组件抛出的事件')
       console.log('参数e',e)
     }
	}
}
</script>
```



### 跨组件通信（Vuex）

详见Vuex

### 其他通信方式

ref操作dom元素

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

### 组件插槽

插槽**不是**响应性的。如果你需要一个组件可以在被传入的数据发生变化时重渲染，建议使用 `props` 或 `data` 等响应性实例选项

**插槽使用**

`子组件child.vue`

```vue
<button>
  <slot>后备内容</slot>
</button>
```

`父级页面parent.vue`

```vue
<child>传入插槽的内容</child>
```

说明：组件之间的内容会在`slot`标签之间渲染，如果没有指定，则会显示后备内容（没有后备内容就是空）



**具名插槽**

组件中可以使用多个插槽，如何区分?



`子组件child.vue`

通过slot元素的name属性，给每个插槽起名字

```vue
<div class="container">
  <header>
    <!--插槽名为header-->
    <slot name="header"></slot>
  </header>
  <main>
    <!--不指定，插槽名为default-->
    <slot></slot>
  </main>
  <footer>
    <!--插槽名为footer-->
    <slot name="footer"></slot>
  </footer>
</div>
```

`父级页面parent.vue`

通过在template标签加v-slot：插槽名字，指定其中的元素是渲染在哪个插槽位置（v-slot只能添加在 template上）

未指定的直接渲染在默认插槽，即default的位置

```vue
<child>
  <!--v-slot可简写为#header-->
	<template v-slot:header>
    <h1>这里是header</h1>
  </template>
  
  <div>第一段</div>
  <div>第二段</div>
  <div>第三段</div>
  
  
</child>
```



**作用域插槽**

普通插槽只是把数据从父级传递到子级组件

如果想要使用子级组件作用域内的数据，就要使用作用域插槽。在插槽位置绑定子组件内部数据，在使用组件时就能直接拿到绑定的数据

`子组件child.vue`

```vue
<button>
  <slot :user="user"  name='btn-content'></slot>
</button>

<script>
  export default{
    date(){
      return{
        user:{
          name:'jack'
          age:18
				}
      }
    }
  }
</script>
```

`父级页面parent.vue`

可以在父级使用子组件内的数据

```vue
<child>
  <template  #btn-content="slotProps">
  	{{slotProps.user.age}}
  </template>
</child>
```

Vue支持解构插槽数据

```
<child v-slot:btn-content="{user:{age}}">
  {{age}}
</child>
```



**默认插槽的简写**

```vue
<child>
  <template  #default="slotProps">
  	{{slotProps.user.age}}
  </template>
</child>
```

如果是只有一个默认插槽，即default。可以直接写在组件上（不必写在template上）

```vue
<child #default="slotProps">
  	{{slotProps.user.age}}
</child>
```









### 组件实现v-model

自定义组件上的 `v-model` 默认会利用名为 `value` 的属性和名为 `input` 的事件

也支持在选项中指定

```vue
<script>
export default {
  name: 'child',
  data() {
    return {}
  },

  model: {
    prop: 'isChecked', //使用名为isChecked的属性
    event: 'change' //使用名为change的事件
  },
  props: {
    isChecked: {//记得要定义属性isChecked，才能设置在model选项中
      type: Boolean,
      default: false
    }
  }
}
</script>


```

使用

```vue
<child v-model="check"></child>
```

`v-model`会将变量`check`的值传入自定义组件的属性`isChecked`中，当组件触发一个 `change` 事件，并附带一个新的值的时候，会更新变量`check`

### .sync修饰符

在有些情况下，我们可能需要对一个 prop 进行“双向绑定”

但是，真正的双向绑定会带来维护上的问题，因为子组件可以变更父组件，且在父组件和子组件两侧都没有明显的变更来源

常见的一种场景就是：

自定义的弹窗组件，存在visible属性来控制弹窗是否显示。这个变量有可能在外部控制关闭，也有可能在内部的某些逻辑中控制关闭（按照单向数据流的思想，应该内部抛出事件，由外部关闭弹窗。但是，实际场景下如果将事件全部外抛，就会导致每个复用该组件的地方，都会重复处理弹窗关闭的逻辑，造成代码冗余）

如何处理？

组件内部抛出`update:属性名`的事件

```vus
this.$emit('update:title', "新标题")
```

组件外部，绑定这个事件

```vue
<text-document
  :title="title"
  @:update:title="title = $event"
></text-document>
```

使用`.sync`缩写，就可以省略掉外部绑定事件和相应的赋值

```vue
<text-document
  :title,sync="title"
></text-document>
```





### 动态组件 

Vue 的 `<component>` 元素有一个特殊的属性 `is` ，通过改变其绑定值就可以把component标签变成对应的自定义组件

```vue
<component :is="currentTabComponent"></component>
```

例子：点击按钮，切换两个组件

![image-20220810141811735](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Vue/20220810141812%20.png)

页面中使用

```vue
<template>
  <div class="task-container">
    <!--切换按钮-->
    <div style="display:flex">
      <div style="background: red;" @click="changeTabIndex('TodayTask')">今日任务</div>
      <div style="background: blue;" @click="changeTabIndex('CompletedTask')">已完成</div>
    </div>
    <!--组件显示位置-->
    <component :is="currentTabComponent"></component>
  </div>
</template>

<script>
import TodayTask from '@/components/TodayTask'
import CompletedTask from '@/components/CompletedTask'

export default {
  name: 'Task',
  components: {
    TodayTask, CompletedTask,
  },
  data() {
    return {
      currentTabComponent: 'TodayTask',
    }
  },

  methods: {
    //切换组件
    changeTabIndex(componentName) {
      this.currentTabComponent = componentName
    }
  }
}
</script>


```



**在动态组件上使用keep-alive**

使用is切换组件时，组件会被销毁重建，所以在组件中的状态会丢失。(例如，在组件A中选中某个checkbox，但是切换到组件B后再切换回组件A，组件A原来的选中状态就会丢失）

上面的例子：

![image-20230301180144794](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Vue/20230301180145%20.png)

可以使用keep-alive保存组件的状态（不仅仅能使用在动态组件上，只要被keep-alive包裹就会保存组件状态，例如使用v-if控制显示不同的组件，仍然会被保存状态）

```vue
<!-- 失活的组件将会被缓存！-->
<keep-alive>
  <component :is="currentTabComponent"></component>
</keep-alive>
```

子组件生命周期增加两个。子组件展示时触发其activated，子组件被切换走触发其deactivated

```vue
activated() {
    // 生命周期钩子：keep-alive 组件激活时调用
    console.log('已完成组件 -->activated')
},
deactivated() {
    // 生命周期钩子：keep-alive 组件停用时调用
    console.log('已完成组件 -->deactivated')
},
```

整体的生命周期执行顺序

```
父级beforeCreate -->父级created -->父级beforeMount

-->子组件1:beforeCreate-->子组件1:created-->子组件1:beforeMount-->子组件1:mounted-->子组件1:activated

-->父级mounted
```

切换另一个动态组件

```
父级beforeUpdate

-->子组件1:deactivated

-->父级updated
```



**动态组件与v-if的区别**

一种常见的场景，通过接口返回的某个字段显示对应的组件

v-if在页面中进行判断，显示对应的组件

动态组件在js中进行判断，然后设置对应的组件名。进一步与页面解耦



### 异步组件（待补充）



### 覆盖子组件样式

在父级组件中，使用深度选择器覆盖子组件样式

```vue
<template>
	<div>
    <!--子组件 -->
		<child class='child'></child>
	</div>
</template>

<style scoped>

/* 通过 /deep/ 开头的深度作用选择器来达成穿透 */
.child /deep/ .child {
  color: red;
}


/* 通过 >>> 选择器来达成穿透 */
.child >>> .child {
  color: red;
}


/* 通过 ::v-deep 选择器来达成穿透 */
.child ::v-deep .child {
  color: red;
}
</style>
```





## Vue响应式原理

官方文档：https://v2.cn.vuejs.org/v2/guide/reactivity.html



## Vue动画(待补充)



## Vuex

```js
{
    path: '/user/:id',
    component: User,
    children:[
      // 请注意，只有子路由具有name
    	{ path: '', name: 'user', component: UserHome }
    ]
}    
```



## Vue-Router

Vue-Router的官网地址：https://router.vuejs.org/zh/

目前最新的版本为4.x

通过 Vue.js，我们已经用组件组成了我们的应用，而 Vue Router 需要做的就是将**组件**与**路由**建立映射

那么。访问路由地址，页面就会渲染对应的组件



### 安装

在Vue项目中，通过yarn进行安装

```shell
yarn add vue-router@4
```

### 配置映射

在浏览器输入URL，会在页面中加载对应的组件

**例子**

下面的例子访问

```
localhost/  显示Home组件 

localhost/about  显示About组件
```

router.js 创建路由实例

```js
// 1. 引入两个组件
const Home = { template: '<div>Home</div>' }
const About = { template: '<div>About</div>' }

// 2. 定义路由映射（每个路由都需要映射到一个组件）
const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
]

// 3. 创建router实例
const router = VueRouter.createRouter({
  routes, // routes配置（还有其他配置，后面会提到）
})

// 4. 导出router实例
export default router
```

main.js

在把路由实例挂载在路由上，然后把dom（id是app）挂载在Vue实例上

```js
import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

new Vue({
  router
  render: h => h(App)
}).$mount('#app')
```

App.vue

routes数组的第一层映射关系，组件会被放置到顶层的`router-view`区域显示

```vue
<template>
  <div id="app">
    <router-view/>
  </div>
</template>
```



**URL匹配**

前面配置的路由都是完全匹配，例如URL中的`/about`路径，会匹配到routers中的 `/about`，之后加载对应的组件

```js
const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
]
```

动态参数匹配路由（URL路径）

```js
const routes = [
  { path: '/userCenter/:userName', component: About },
]

// 会匹配到URL中是 userCenter/xxx 的  
// URL中的动态参数userName可以通过 this.$route.params.userName 获取
```

注意：

* 生命周期不触发（采用监听路由变化，改变页面）

  ```js
  //URL从`userCenter/jack`跳转到`userCenter/tom`，相同的组件实例将被重复使用，生命周期钩子不会被触发。
  //解决方案：可以通过watch监听路由对象或者路由守卫，来知道URL发生了变化，来触发查询用户（jack、tom）的信息
  
  export default{
  	watch: {
      //这里的$route就是我们用的this.$route。newValue就是最新的路由对象
      $route(newValue) {
        if (newValue.path === '/index') {
          this.active = 0;
        } else if (newValue.path === '/my') {
          this.active = 1;
        }
      },
    },
  }
  ```
  
  实际工作中遇到的一个问题：点击"我的"后，进入新页面，再按浏览器返回键返回"地推"页。tab高亮不会仍然是"我的"
  
  解决：可以监听页面route对象
  
  ![image-20230424191313110](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/JS/20230424191313%20.png)
  
* 同名动态参数

  无论是哪个

  ```
  /x
  /y
  /z
  ```

  都会按顺序匹配到第一个组件A

  ```js
  const routes = [
    { path: '/:a', component: A},
    { path: '/:b', component: B},
  ]
  ```

  

动态参数个数

```js
const routes = [
  { path: '/:orderId*' },
]

// * 0到多个
// ? 0或1个
// + 大于等于1个
```

动态参数格式（使用正则匹配，放在其后的括号中）

```js
const routes = [
  // :orderId -> 仅匹配数字 
  { path: '/:orderId(\\d+)' }, //确保使用转义反斜杠( \ )
]
```





### 复杂映射

**一、嵌套路由**

路由可以嵌套，将映射的组件嵌套起来

如下图，URL里的`johnny`对应User组件，`profile`、`posts`对应不同的组件

```vue
/user/johnny/profile                     /user/johnny/posts
+------------------+                  +-----------------+
| User             |                  | User            |
| +--------------+ |                  | +-------------+ |
| | Profile      | |  +------------>  | | Posts       | |
| |              | |                  | |             | |
| +--------------+ |                  | +-------------+ |
+------------------+                  +-----------------+

```

`/user/:userName`渲染组件User，其children字段中的路由映射，渲染在User组件中的`router-view`标签中

```js
const routes = [{ 
   path: '/user/:userName', 
   component: User,
   children: [
      {
        // 当 /user/:userName/profile 匹配成功
        // UserProfile 将被渲染到 User 的 <router-view> 内部
        path: 'profile',
        component: UserProfile,
      },
      {
        // 当 /user/:userName/posts 匹配成功
        // UserPosts 将被渲染到 User 的 <router-view> 内部
        path: 'posts',
        component: UserPosts,
      },
    ],
  }
]
```

如果希望访问`/user/:userName`时，有个默认的子组件放置在User的`router-view`之中，可以指定子路由的path为空

```js
const routes = [{ 
   path: '/user/:userName', 
   component: User,
   children: [
      {
        path: '',
        component: UserProfile,
      },
    ],
  }
]
```



**二、命名视图**

可以指定router-view的name属性，默认为default

```vue
<router-view class="view left-sidebar" name="LeftSidebar"></router-view>
<router-view class="view main-content"></router-view>
<router-view class="view right-sidebar" name="RightSidebar"></router-view>
```

匹配路由时，可以使用compents（加s）字段，指定多个组件

```js
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      components: {
        // 指定组件分别放置到哪个 `<router-view>` 上，（根据 `name` 属性匹配）
        default: A,
        LeftSidebar:B
        RightSidebar:C
      },
    },
  ],
})

```



### 路由配置

```js
const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
]

// 3. 创建router实例
const router = VueRouter.createRouter({
  routes, // 路由映射
  history:createWebHashHistory()//路由模式：1、createWebHashHistory() 2、 createWebHistory()
  strict:true //匹配带有或不带有尾部斜线的路由（默认为true）
  sensitive: true //不区分路由大小写（默认为true）
})
```





### 路由访问

**访问指定路由**

* 在浏览器地址栏输入URL地址

  会根据配置的路由映射加载组件

* js调用跳转

  所有其他导航方法都会返回一个 *Promise*

  * push 跳转页面

    ```vue
    <template>
    	<div id="app" >
    		 <button @click="urlchange">点击跳转</button>
    	</div>
    </template>
    
    <script>
      export default{
        methods:{
      		urlchange(){
        		// 字符串路径
    				router.push('/users/tom')
    
    				// 带有路径的对象
    				router.push({ path: '/users/tom' })
    
    				// 带有路径的对象，query指定参数，结果是 /register?plan=private
    				router.push({ path: '/register', query: { plan: 'private' } })
        
        		// 带 hash，结果是 /about#team
    				router.push({ path: '/about', hash: '#team' })
        
        		// 命名路由，结果是/user/tom。只有命名路由才会采用param参数（后面会单独讲到）
    				router.push({ name: 'user', params: { username: 'tom' } })
      }
    }
      }
    </script>
    ```

  * replace 重定向页面

    ```js
    与push参数一样
    ```

  * go 前进后退页面

    ```js
    // 向前移动一条记录，与 router.forward() 相同
    router.go(1)
    
    // 返回一条记录，与 router.back() 相同
    router.go(-1)
    
    // 前进 3 条记录
    router.go(3)
    
    // 如果没有那么多记录，静默失败
    router.go(-100)
    router.go(100)
    ```

* 使用`router-link`标签

  类似于a标签，使用to属性指定跳转的链接（与push函数，参数相同）。点击Dom元素实现跳转

  ```vue
  <template>
    <div id="app">
      <div id="nav">
        <!--想当于push-->
        <router-link to="/">Home</router-link> |
        
        <!--想当于replace-->
        <router-link to="/about" replace>About</router-link>
      </div>
      <router-view/>
    </div>
  </template>
  ```



### 命名路由

push的参数中，只有命名路由才能使用params属性。params属性用于指定URL中的动态参数

```js
const routes = [
  {
    path: '/user/:username',
    name: 'user',
    component: User,
  },
]

router.push({ name: 'user', params: { username: 'tom' } })
```



### 重定向

```js
//4.配置路由（设置路由匹配规则）
		var routes = [
       //方式一：指定path
			// {path:"/",redirect:{
			// 	path:"/home"}
			// },
            //方式二：只当name
			{path:"/",redirect:{
				name:"aa"}
				
			},
			{ path: '/home',name:"aa", component: Ball },
			//写在最后，如果访问的地址不是上面的，就重定向
			{ path: '*',name:"aa", redirect:{
				path:"/home"} 
			}
		  
		]
```

### 编程式导航

如果不能使用`<router-link>`进行路由，可以用v-bind绑定方法，在方法里，获取路由对象`$router.push( {path:' 路径'} )`进行路由，参数{“路径”} {path:"路径"}  {name:"routes中的name"} 

```html

```

```html
<script src="node_modules/vue/dist/vue.js"></script>
	<script src="node_modules/vue-router/dist/vue-router.js"></script>
	<script>
		//3.设置渲染页面
		var Ball= { template: '<div>球组件</div>' }
	
		//4.配置路由（设置路由匹配规则）
		var routes = [
			{ path: '/home',name:"aa", component: Ball },
		
		]
		//5.实例化路由
		const router = new VueRouter({
		  routes // (缩写) 相当于 routes: routes
		})



		new Vue({
			  el: '#app',
			  data:{
				  user:"home"
			  },
			  //6.挂载路由
			  router:router,
            //跳转方法
			  methods:{					 
				  urlchange(){
					  this.$router.push({path:'/home'})
				  }
			  }
							  
							  
		})		
	</script>	
```

### 嵌套路由

![GKUpGD.png](https://s1.ax1x.com/2020/03/31/GKUpGD.png)

```html
<div id="app" >
		<!--1.设置跳转-->
		<router-link to="/a">音乐</router-link>
		<!--2.容器-->
		<router-view></router-view>
</div>
```

```html
<script src="node_modules/vue/dist/vue.js"></script>
	<script src="node_modules/vue-router/dist/vue-router.js"></script>
	<script>
		//3.设置渲染页面
		var music= { template: `<div>
			<router-link to="/music/rock">摇滚</router-link>
			<router-link to="/music/pop">流行</router-link>
			<router-view></router-view>
		</div>`
		}
			//二级渲染页面			
		var musicSub={template:`<div>
			我是music音乐组件
		</div>`
		}
		//4.配置路由（设置路由匹配规则）
		var routes = [
			{ path: '/a',
			  component:music,
			  //二级路由,children和routes的用法一样
			  children:[{
				  path:"/music/:id",
				  component:musicSub
			  }] 
			},
			
		]

		//5.实例化路由
		const router = new VueRouter({
		  routes // (缩写) 相当于 routes: routes
		})



		new Vue({
			  el: '#app',
			  data:{
				  user:"home"
			  },
			  //6.挂载路由
			  router // (缩写) 相当于 router: router													  
		})		
	</script>	
```

### 路由守卫

在路由跳转之前 我们主要是利用vue-router提供的钩子函数beforeEach()对路由进行判断。

```jsx
// 路由守卫
router.beforeEach((to,from,next)=>{
        if(to.matched.some(res=>res.meta.isLogin)){//判断是否需要登录
            if (sessionStorage['username']) {
                next();
            }else{
                next({
                    path:"/login",
                    query:{
                        redirect:to.fullPath
                    }
                });
            }

        }else{
            next()
        }
    });

export default router;
```

to 表示将要跳转到的组件 (目标组件)
 console.log(from); //(源组件)
 next();
 next 是一个函数
 next() 进入下一个组件的钩子函数
 next(false)  阻止跳转 中断导航
 next("/login") 进入指定的组件的钩子函数

### 补充

```js
let routeData = this.$router.resolve({path:'exteriorColourPicList',query:{albumId:albumId}});
window.open(routeData.href);
```



## Vue-cli

## 其他

[Vue Playground](https://sfc.vuejs.org/#eNo9j71uwzAMhF+F5eIWqCV0NZQA3foGXbikjpw40B9EOR0EvXspp8imu9N9OFb8TEndN4sTGp7zmgqwLVs6Ulh9irlAhWwXaLDk6GGQrwMFCnMMXMDzBQ49fx2+rHMRvmN255fhjYLRD5yARBTrkzsVKwrAXD+Ote7l1owWtbtrSFuB++jj2boDoeSEEhn9bOM7PlaN/pTUjWOQ3bW36T9gwgl2p3uytmvCaymJJ615mfu1N1YxX7S8VN5CWb1Vlv34k+Mv2yxgwo5oFBq2P3/sZE8=)

Vue的细粒度权限控制方案：https://www.laike.net/article-28-291574-0.html

