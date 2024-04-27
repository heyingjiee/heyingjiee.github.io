# Vue3原理

## 运行时与编译时

* 运行时 runtime
* 编译时 compiler

### 运行时

简单来说，就是代码运行过程中执行的任务

例如：[Vue3](https://github.com/vuejs/core)项目的`packages/runtime-core`目录下存放的就是Vue3的运行时核心代码，其中暴露出来一个render函数，用于**编程式**的创建虚拟Dom树



1、如何在页面中渲染 `<div>hello world</div>` ？

* 使用Vue模版语法。声明式语法，仅声明我们要的结果，并不处理Dom细节

  ```vue
  <template>
  	<div>hello world</div>
  </template>
  ```

* 使用render。编程式语法，展示Dom操作细节

  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <title>Title</title>
      <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  </head>
  <body>
      <div id="app"></div>
  </body>
  
  <script>
      const {render,h}= Vue
      const vNode=h('div',{
          class:'test'
      },'hello world')
  
      const container=document.querySelector('#app')
      render(vNode,container)
  </script>
  
  </html>
  
  ```

  

2、实现简单的运行时render

项目在运行时执行render函数，动态把vNode对象转化为实际Dom代码

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <div id="app"></div>
</body>

<script>
    const vNode={
        type:'div',
        props:{
            class:'test'
        },
        children:'hello world'
    }

    function render(vNode){
        const ele =document.createElement(vNode.type)
        ele.className=vNode.props.class
        ele.innerHTML=vNode.children

        document.body.appendChild(ele)
    }

    render(vNode)
</script>

</html>

```



3、运行时通过render渲染页面的过程中，还可以对Dom操作进行一定的分析。例如，对Dom进行更新操作，可以在运行过程中对比更新前后的差异，计算出更优的更新Dom的策略



### 编译时

简单来说，就是代码运行之前处理的任务

Vue中可以通过compile提前将模版编译为render函数（build打包的过程中进行），在运行期间执行render函数

所以Vue是：编译时+运行时

Vue并没有在render中直接挂载到页面Dom上（上一节，运行时的例子），而是在编译时将模板处理为render函数，在运行时挂载到页面

其实，编译时除了将模板转换为JS对象外

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
</head>
<body>
    <div id="app"></div>
</body>

<script>

    const {compile,createApp}= Vue

    // 模版
    const html=`
        <div class="test">hello world</div>
    `
    // compile将模版编译为render函数
    const renderFunc= compile(html)
    // console.log('renderFunc',renderFunc)

    // 创建app实例，挂载到#app上
    const app=createApp({
        render:renderFunc
    })
    app.mount('#app')

</script>

</html>

```

### 对比

* 纯运行时：因为不存在编译器，所以我们需要提供复杂的对象来描述Dom或者代码运行时解析模版生成这个复杂的对象
* 纯编译时：项目运行中对Dom的操作是动态的，纯编译时无法再运行过程中动态分析最优的操作策略（svelte是一个纯编译时的框架）
* 运行时+编译时：Vue、React均是使用这种方案

## Vue项目结构

Vue的三大模块

* 运行时 runtime
* 编译器 compiler
* 响应性 reactivity



Vue代码目录（3.2.37版本）

![image-20240404191741963](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20240404191742fTxVIa.png)

![image-20240404191811598](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20240404191811B7nJEL.png)

## Vue项目调试

步骤

* 安装项目依赖，接着打包

  ```shell
  pnpm i
  
  pnpm run build # 执行打包后，会在 packages/vue 下多一个dist文件
  ```

  ![image-20240405002803879](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20240405002805kbjOAE.png)

* 在`packages/vue`下新建目录reactivity，在其中新建下面的reactive.html文件

  运行起来后，只能看到打包后的`vue.global.js`文件和html，所以我们需要开启项目的sourcemap功能，浏览器才能映射到源代码

  ![image-20240405003016765](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20240405003016z8kssI.png)

  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <title>Title</title>
  </head>
  <script src="../../dist/vue.global.js"></script>
  <body>
      <div id="app"></div>
  </body>
  <script>
      const {reactive,effect}=Vue
  
      const obj=reactive({
          name:'张三'
      })
  
      effect(()=>{
          document.querySelector('#app').innerHTML=obj.name
      })
  
      setTimeout(()=>{
          obj.name='李四'
      },1000)
  
  </script>
  </html>
  
  ```

* 开启sourcemap

  修改`package.json`的build脚本，增加-s选项

  ```shell
  "build": "node scripts/build.js -s",
  ```

  这个`build.js`是构建脚本，其中minimist这个包是读取参数的，从代码可以看出来如何开启sourcemap

  ![image-20240405003305895](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20240405003306kGfVcQ.png)

  开启后：我们就能看到packages下的源码了

  ![image-20240405003509584](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20240405003509B9j783.png)

## 搭建项目

```shell
# 初始化
pnpm init

# 新建 tsconfing.json 文件
{
  "include": [
    "packages/*/src" // ts类型检查目录的入口
  ],
  "compilerOptions": {
    "rootDir": ".", // 项目根目录
    "strict": true,
    "moduleResolution": "node", // 查找模块的方式
    "esModuleInterop": true, // cmj的导出会自动合并为esm默认导出
    "target": "ES5", // 编译目标js版本
    "module": "esnext", // 编译目标模块化方式
    "removeComments": false, // false为ts编译为js时保留注释
    "sourceMap": false, // 禁用sourcemap
    "lib": ["esnext", "dom"],
    //    "noImplicitAny": false
    "baseUrl": ".",
    "paths": {
      "@vue/*": [
        "packages/*/src"
      ]
    }
  }
}



# 配置eslint、prettier
##  安装下面依赖
"@typescript-eslint/eslint-plugin": "^6.4.0",
"@typescript-eslint/parser": "^6.0.0",
"eslint": "^8.57.0",

"eslint-config-prettier": "^9.1.0",
"eslint-plugin-prettier": "^5.1.3",
"prettier": "^3.2.5"
##  配置.eslintrc.cjs
module.exports= {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true,
    jest: true,
  },
  globals: {
    window: true,
  },

  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  plugins: ["@typescript-eslint"],

  parserOptions: {
    parser: "@typescript-eslint/parser", // 解析 .ts 文件
  },

  rules: {
    "prettier/prettier":"warn"
    // "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    // "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
  },
};



# 配置rollup（rollup使用tsc编译ts，这里使用@rollup/plugin-typescript插件）
## 安装插件
"rollup": "^4.14.0"
"@rollup/plugin-commonjs": "^25.0.7",
"@rollup/plugin-node-resolve": "^15.2.3",
"@rollup/plugin-typescript": "^11.1.6",
"typescript": "^5.4.4"，"tslib": "^2.6.2", #@rollup/plugin-typescript依赖typescript、tslib库 

## 新建rollup.config.js文件
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
export default [
  // 每个对象都是以input为入库的项目的打包配置
  {
    input: "packages/vue/src/index.ts",
    output: [
      {
        sourcemap: true,
        file: "./packages/vue/dist/vue.js",
        format: "iife",
        name: "Vue", // iife格式，配置name引入后，会挂载到window上直接使用。 const {xxx}=Vue
      },
    ],
    plugins: [
      typescript({ sourceMap: true }), // 编译ts时开启sourcemap
      // resolve、commonjs一般是组合使用的
      resolve(), // 使用node模式查找模块位置
      commonjs(), // 将项目中引入cmj模块转化为esm模块打包到最终产物（因为有很多第三方库仍然使用cmj）
    ],
  },
];


```

## 响应式

### reactive部分

#### defineProperty

vue2使用defineProperty实现其响应式核心。缺点：不能监测到数组、对象属性新增的变化

下面代码只要修改`product.count`，就会重现计算total

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Title</title>
</head>
<body>

</body>
<script>
  let count=2
  let product={
    price:10,
    count:count
  }

  let total=0

  let effect=()=>{
    total=product.price*product.count
    console.log('总价格',total)
  }

  effect()

  Object.defineProperty(product,'count',{
    set(newVal){
      count=newVal
      effect()
    },

    get(){
      return count
    }
  })


</script>
</html>

```

补充下：为啥不直接在product中定义count？这样的话，会导致无限循环

```js
let product = {
  price: 10,
  count: 2
};

let total = 0;

let effect = () => {
  total = product.price * product.count;
  console.log('总价格', total);
};

effect();

Object.defineProperty(product, 'count', {
  set(newVal) {
    product.count = newVal;
    effect();
    console.log('set');
  },
  get() {
    console.log('get');
    return product.count; // 这里读取count会触发getter，get方法内部再次读取count会触发getter，这会导致无限递归
  }
});

```

#### Proxy与Reflect

Vue3采用了[Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy)实现其响应式核心

注意：只有直接操作代理对象，才能被监听到。如果操作target则不能被监听到

```js
let product={
    price:10,
    count:2
  }

  let total=0

  let effect=()=>{
    total=proxyProduct.price*proxyProduct.count
    console.log('总价格',total)
  }

  effect()

  const proxyProduct=new Proxy(product,{
    set(target,key,newVal,receiver){ // receiver就是proxyProduct，是一个代理对象
      target[key]=newVal
      effect()
      return true
    },
    get(target, key, receiver) {
      return target[key]
    }
})
```

[Reflect](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect)提供了拦截JS操作的方法，常与Proxy一起使用

我们以Reflect的get方法为例子，通过receiver参数参数可以将对target的操作也拦截到代理对象上

```js
// 获取对象的value
Reflect.get(target, propertyKey[, receiver])

// 与 target.propertyKey功能一样，唯独一点特殊就是多了receiver对象
// 获取对象属性key的value时会触发getter方法，而 receiver 可以令getter方法中this的指向receiver
```

例子：下面获取total，实际上proxyProduct对象实际调用了3次getter，但是只打印出1次（只有从代理对象上读取属性值，才能触发代理对象的getter）

```js
let product={
  price:10,
  count:2,
  get total(){ // 增加了一个属性total，并实现了getter方法
    return this.price*this.count  // 获取price、count也是getter，但是没有被代理监听到。因为其不是直接操作的代理对象proxyProduct
  }

}

const proxyProduct=new Proxy(product,{
  get(target, key, receiver) {
    console.log('getter触发');
    return target[key]
  }
})

console.log(proxyProduct.total);  // 只打印1次`getter触发`
```

所以，需要使用Reflect。下面代码打印3次getter

```js
let product={
  price:10,
  count:2,
  get total(){
    return this.price*this.count // 这里的this指向了receiver，即代理对象proxyProduct
  }

}

const proxyProduct=new Proxy(product,{
  get(target, key, receiver) {
    console.log('getter触发');
    return Reflect.get(target, key,receiver)
  }
})

console.log(proxyProduct.total);
```

注意：

* Proxy第一个入参只能是对象，传入其他基础类型会报错

* 解构Proxy取出属性，直接操作该属性不会被getter、setter监听到

  ```js
  const person=Proxy({
  	name:'张三'
  })
  const {name} = person // 操作name不会被getter、setter监听到
  ```

  

#### WeakMap

```js
let obj={
  name:'张三'
}
const map=new Map()
map.set(obj,'value')

obj=null 
// obj不再持有堆中的对象数据，应该被垃圾回收，但是由于map阻止了垃圾回收，所以不能被回收

// 控制台运行代码后，输入map可查看结果
```

![image-20240407005243341](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20240407005245FoGQQx.png)

WeakMap与map有几点不同：

* WeakMap的key只能是对象

* WeakMap对value是弱引用，WeakMap的key被置为null后，WeakMap的value会被清理

  上面的例子换为WeakMap，则会被垃圾回收，WeakMap这个key-value就没了

有什么用？

```
// vue源码中proxyMap就是一个WeakMap，其缓存了对象target对应的代理对象。当target为null时，其代理对象也没有了意义，由于WeakMap特性，proxyMap就会清理这组key-value

 proxyMap.set(target, proxy); 
```

#### 实现

测试案例

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Title</title>
  <script src="../../dist/vue.js"></script>
</head>
<body>
  <div id="app"></div>
</body>
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
<script>
  const { reactive,effect } = Vue

  const obj=reactive({
    name:'张三'
  })

  effect(()=>{
    document.getElementById('#app').innerText=obj.name
  })
  
  setTimeout(()=>{
    obj.name='李四'
  },2000)
  
</script>
</html>

```

从代码角度，响应性实际上就是当obj的属性a改变，自动触发执行effect中逻辑

在Vue3中，响应性的实现流程

* 代理数据返回Proxy对象

* effect函数执行。创建一个ReactiveEffect对象，并存储在全局变量activeEffect中（多个effect函数，activeEffect只存储当前正在执行的那个），并执行ReactiveEffect.run方法

  ReactiveEffect的fn属性就是回调函数，run方法就是运行fn回调

  ```js
  effect(()=>{
      // xxxx
  })
  ```

* run方法执行就会触发get，我们在get中完成依赖收集（建立某个Proxy的某个属性与对应的回调函数的映射，【track函数】）

  ```js
  effect(()=>{
      document.getElementById('#app').innerText=obj.name // 这里触发get
  })
  ```

  映射的结构（【全局变量 targetMap】）

  ```js
  // Vue3中使用WeakMap存储
  WeakMap类型{
    key:代理对象
  	value:Map类型（
  		key:属性
  		value:Set类型  {ReactiveEffect实例(ReactiveEffect的fn属性中，存当前这个effect的回调)}
  	）
  }  
  
  对应Vue3的代码
  const targetMap={
    key:代理对象
    value:depsMap（
  	 key:属性
  	 value:dep{ReactiveEffect,ReactiveEffect,ReactiveEffect}
  ）
  }
  
  ```

  

* 当Proxy属性属性变化时，就会触发set，在set中根据依赖收集建立的映射，执行对应的effect回调，完成更新页面的操作（这就是响应式，【trigger函数】）

  ```js
  setTimeout(()=>{
      obj.name='李四'
  },2000)
  ```

  

### ref部分

reactive存在的个问题：无法实现基本类型变量的响应式更新

这是因为：reactive本质是创建了Proxy，Proxy第一个参数只能是对象，所以reactive参数也只能是对象，如果传入基本类型会报错

#### class的get、set

```js
class Person {
    #age = 0 // 设置私有属性存储值，避免被外部修改
    constructor(name, age) {
    
      this.#age = age
    }
    get age() { //age属性的getter
      return this.#age
    }
    set age(val) {//age属性的setter
      if (this.checkAge(val)) { // 设置前校验格式
        this.#age = val
      } else {
        console.warn('年龄不符合要求')
      }
    }
    checkAge(val) {
      return typeof val === 'number' && !(val < 0 || val > 150);
    }
}

const tom = new Person('tom', 12)
tom.age = 45
tom.age = 151 // 年龄不符合要求
console.log(tom.age) // 45
```

#### 实现

测试案例
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>ref测试实例</title>
  <script src="../../dist/vue.js"></script>
</head>
<body>
  <div id="app"></div>
</body>
<script>
  const {effect,ref} = Vue


  const obj=ref({
    name:'张三'
  })

  effect(()=>{
    document.querySelector('#app').innerText=obj.value.name //.value是getter、 .name是getter
  })

  setTimeout(()=>{
    obj.value.name='李四' //.value是getter、 .name是setter
  },2000)
</script>
</html>

```

ref的实现没有使用代理，而是直接利用率Class的set、get

ReactiveEffect实例（与reactive一样，fn属性存的是回调函数effect）存在类RefImpl的dep属性中

```js
class RefImpl<T> {
  public _value: T;
  // set集合存多个ReactiveEffect实例（effect回调函数）
  public dep?: Dep = undefined; 
  public readonly __v_isRef: boolean = true;
  constructor(
    value: T,
    public readonly __v__isShallow: boolean, // 是否为复杂类型
  ) {
    // 如果是复杂数据类型，则直接使用reactive函数返回一个代理对象，存在_value中
    // 如果是简单类型，则直接存在_value中
    this._value = __v__isShallow ? value : toReactive<T>(value);
  }

  get value() {
    //收集依赖
    trackRefValue(this);
    return this._value;
  }

  set value(value: T) {
    // 触发依赖
    this._value = value;
  }
}
```

### computed部分

测试案例

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<script src="../../dist/vue.global.js"></script>
<body>
<div id="app"></div>
</body>
<script>
    const {reactive,effect,computed}=Vue

    const obj=reactive({
        name:'张三',
    })
    const computedObj=computed(()=>{ // 返回值是一个Ref
        return '姓名:'+obj.name
    })

    effect(()=>{
        document.querySelector('#app').innerText=computedObj.value //Ref的getter
    })


    setTimeout(()=>{
        obj.name='李四' // reactive的setter
    },2000)
</script>
</html>

```







## 疑问点

1、Proxy只能代理对象的一层，对于深层对象Vue3时如何处理的

