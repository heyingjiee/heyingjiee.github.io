# Vue3生态

## 思考

### 数据持久化

前端页面一直都存在：页面刷新数据丢失的问题

从两个角度分析，具体采用哪种方式要考虑场景：

* 利用 Storage 存储持久化

  参考 【pinia - 持久化】章节中利用 useVue 持久化数据的思路

  如果存储在 LocalStorage 数据会一直存在（除非清除数据），如果存储在 SessionStorage 数据刷新也会存在。分享出去两个都会丢失数据

* 利用 Url 存储页面数据

  参考 【Vue3 - Hook】章节中利用 useVue 持久化数据的思路

  数据刷新也会存在，其他用户打开分享出去的 URL，数据仍然存在。但是不能存储大量数据。例如 ：搜索页面的搜索关键词一般都是放在 URL 中的

## pinia

官方文档将选项式、组合式混合在一起，导致有些部分写的不是很清晰，这部分是对应官网文档的补充

注意：该文档仅针对于在 **Vue3.x**版本中使用 pinia 的**组合式语法**

### 安装与配置

```shell
pnpm install pinia
```

```js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const pinia = createPinia() // 创建 pinia 实例
const app = createApp(App)

app.use(pinia) // 注册插件
app.mount('#app')
```

### Store仓库

定义

```js
import { defineStore } from 'pinia'

// 命名习惯 useXXXStore
// 第一个参数是你的应用中 Store 的唯一 ID
export const useCounterStore = defineStore('counter', () => {
  
  // 1、state 
  const count = ref(0)
  
  // 2、getter
  const doubleCount = computed(() => count.value * 2)
  
  // 3、action
  function increment() {
    count.value++
  }

  // 4、导出  必须返回所有state，否则会影响 SSR 、开发工具和其他插件的正常运行。
  return { count, doubleCount, increment }
})

```

使用

* 在Vue文件中使用

  ```vue
  <script setup>
  import { useCounterStore } from '@/stores/counter'
    
  // 仓库仅在第一次调用时初始化，即使在其他 vue 文件中调用也是返回同一实例
  // store是 reactive 类型
  const counterStore = useCounterStore() 
  
  // 1、直接使用 state、getter、action 
  // counterStore.count 、counterStore.doubleCount、counterStore.increment 都可直接在模板中使用
  // 为啥 count 是 ref 都是没用 value？因为store可以自动解包内部的 Ref
  
  
  // 2、解构使用
  // 解构 state、getter 会导致变量失去响应式，可以用storeToRefs包裹
  const { name, doubleCount } = storeToRefs(counterStore)
  // 但是 action 可以直接解构使用
  const { increment } = counterStore
  
  
  // 3、Store实例的其他属性
  
  // Store的id
  counterStore.$id   
    
  // 修改 state 中变量count
  counterStore.$patch({count:20})   
  store.$patch(state => state.count = 20)
    
  // 直接访问 state 
  counterStore.$state.count  // $state指向底层的state对象
  counterStore.count // 也可以用点语法，直接访问state、getter、action。⚠️注意：之所以能直接通过 store访问 state 对象，只是因为state自动被挂载到 store 上了
    
  // 用于重置 state，在组合式语法中需要手动在 defineStore 时定义并 return 这个函数
  counterStore.$reset() 
    
  counterStore.$dispose()
    
  // 订阅 State 内数据的变化（详见 【State】章节）
  counterStore.$subscribe((mutation, state) => {})
    
  // 订阅 Action
  counterStore.$onAction()
    
  </script>
  ```
  
  
  
* 在 JS 文件中使用

  `useXXXStore()` 之前，必须保证存在 pinia 实例。在 Vue 启动时就在main.js 中在全局注入了 pinia实例

  ```js
  import { useUserStore } from '@/stores/user'
  import { createPinia } from 'pinia'
  import { createApp } from 'vue'
  import App from './App.vue'
  
  // ❌  失败，因为它是在创建 pinia 之前被调用的
  const userStore = useUserStore()
  
  const pinia = createPinia()
  const app = createApp(App)
  app.use(pinia)
  
  // ✅ 成功，因为 pinia 实例现在激活了
  const userStore = useUserStore()
  ```

  注意，如果确定没有 pinia 实例，可以手动传入

  ```js
  const pinia = createPinia()
  const xxxStore = useXXXStore(pinia)
  ```

  

更复杂的 Store：可以引入其他 Store、全局属性、其他 Vue 的组合函数，实现更复杂的功能

```js
import { inject } from 'vue'
import { useRoute } from 'vue-router'
import { defineStore } from 'pinia'

export const useSearchFilters = defineStore('search-filters', () => {
  
  // 1、使用路由
  const route = useRoute()
  
  
  // 2、使用全局注入数据。 这里假定 `app.provide('name', 'hedaodao')` 已经调用过
  const name = inject('name')
  
  // 3、使用其他 Store ，注意useOtherStore不能使用useSearchFilters，否则会循环引用
  const otherStore = useOtherStore()
  

  // ...

  return {
    // ...
  }
})
```

### State

#### 读、写

```js
const counterStore = useCounterStore()

// 1、直接读、写 State。直接操作 State 也是响应式的
counterStore.count=20

// 2、通过$patch操作
counterStore.$patch({count:20})   
store.$patch(state => state.count = 20)

// 3、调用 action 操作 State
counterStore.increment()

```

#### 重置

```js
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)

  // 需要增加重置 State 的函数，一般命名为$reset
  function $reset() {
    count.value = 0
  }

  return { count, $reset }
})
```

#### 订阅 State 变更

State 变更后，页面上可以通过订阅在数据变更时增加逻辑

```js
// 订阅
counterStore.$subscribe((mutation, state) => {
  //  mutation 参数 => 
  //  mutation.storeId 仓库的id 
  //  mutation.type 造成 State 变更的方式
  //  1、 'direct' 直接修改【store.name = 'new name'、store.$state.name = 'new name‘】
  //  2、 'patch function' 函数【store.$patch(state => state.name = 'newName')】
  //  3、 'patch object' 对象【store.$patch({ name: 'newName' })】
  //  3-1 、只有patch object方式，才有mutation.payload 参数，表示入参对象

  
  // state 中任意值变化都会触发订阅。我们可以监听到数据变化
  localStorage.setItem('cart', JSON.stringify(state)) // 例如：数据变化就缓存

})


// 取消订阅
// 在 vue 文件中useXXXStore初始化Store，订阅会绑定到组件上，组件卸载时会自动取消订阅
someStore.$subscribe(callback, { detached: true }) // detached:ture设置为组件卸载不取消订阅
// 如果在 js 文件中订阅可以引入 onUnmount 卸载
```

也可以使用 wath监听

```js
watch(counterStore.$state,(state)=>{
  console.log(state.count)
},{
  deep:true
})
```

### Getter

相当于计算属性 computed

### Action

相当于方法 method

#### 订阅 Action

在运行 action 之前以及 action resolve/reject 之后打印日志记录

```js
const unsubscribe = someStore.$onAction(
  ({
    store, // store 实例，类似 `someStore`
    name, // action 名称
    args, // 传递给 action 的参数数组
    after, // 在 action 返回或解决后的钩子
    onError, // action 抛出或拒绝的钩子
  }) => {
    // --------- action 执行前 -----------
    const startTime = Date.now()
    console.log(`Start "${name}" with params [${args.join(', ')}].`)

    // --------- action 执行后 -----------
    // 它等待着任何返回的 promise
    after((result) => {
      console.log(
        `Finished "${name}" after ${
          Date.now() - startTime
        }ms.\nResult: ${result}.`
      )
    })

    // 如果 action 抛出或返回一个拒绝的 promise，这将触发
    onError((error) => {
      console.warn(
        `Failed "${name}" after ${Date.now() - startTime}ms.\nError: ${error}.`
      )
    })
  }
)

// 手动删除监听器
unsubscribe()
```



### 自定义插件

注意：插件是在创建 pinia 实例后就通过 use 挂载的，如果在插件的逻辑运行前操作Store，插件中是不会触发订阅的

```js
import { createPinia } from 'pinia'

// 插件是一个函数
function SecretPiniaPlugin(context) {
  // context 包含属性 app、 pinia、store、options
  // 注意：store.$id 可以通过 id 区分不同的 store，编写特定逻辑
  // 注意：options是 action ➕ defineStore 的第三个对象参数的属性展开
  
  
  // 1、处理 State（每个创建的 store 都添加了State）
  // 需要确定两种方式：store.hasError 和 store.$state.hasError 都可以访问
  if (!store.$state.hasOwnProperty('hasError')) { // 不要重写任何一个现有的值
    const hasError = ref(false)
    
    store.$state.hasError = hasError // 在 `$state` 上设置变量，允许它在 SSR 期间被序列化。
  }
  
  store.hasError = toRef(store.$state, 'hasError') 
  
  
  // 2、options 处理(官网的案例)
  // defineStore可以添加第 3 个参数，类型是对象，用于插件读取
  //defineStore('search', ()=>{
  //  searchFunc() {},
  //  return searchFunc
  //},{
  // 	debounce: {
  //   	searchFunc: 300,
  //	}
  //})
  
	// options的值是 {actions:{searchFunc:f},debounce:300}
  if (options.debounce) { 
    // 我们正在用新的 action 来覆盖这些 action
    return Object.keys(options.debounce).reduce((debouncedActions, action) => {
      // debounce是 loadsh 的防抖函数
      debouncedActions[action] = debounce(
        store[action], // 防抖函数
        options.debounce[action] // 防抖时间 300
      )
      return debouncedActions
    }, {})
  }
  
  
  // 3、
  store.$subscribe((mutation, state)=>{
       
  })
  
  // 4、
  store.$onAction(()=>{
       
  })

  
  // 5、扩展Store属性（每个创建的 store 都添加了hello属性。注意：hello不是state，通过store.$state.hello访问不到）
  // 返回对象
  return { hello: 'xxx' } 
  
  // 如果仅在开发环境用，可以直接添加到_customProperties下，与上面返回属性效果一致
  if (process.env.NODE_ENV === 'development') {
    store._customProperties.add('hello')
  }
  
}
```

使用插件

```js
const pinia = createPinia()
// 通过 use 使用插件，插件是一个函数
pinia.use(SecretPiniaPlugin)


// 定义 userCounterStore （略）

// 使用 userCounterStore
const counterStore = userCounterStore()
counterStore.hello // 'xxx'
```

可以看到 hello 属性不是 state

（原图未随仓库提供：`image-20240930130215436.png`）

### 持久化

页面刷新所有的数据都会丢失，推荐结合 VueUse 使用

```js
//  npm i @vueuse/core 安装 VueUse
import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

defineStore('store', () => {
  const count = useStorage('stored-count', 0,sessionStorage) //0 是默认值
  return { someState }
})

// 1、someState是ref，默认存在 localStorage。可以指定第 3 个参数sessionStorage
// 			localStorage持久化：页面刷新、关闭后再打开数据都不会丢失
//			sessionStorage持久化：页面刷新数据保持，页面关闭打开数据清空。这种方式最长用

// 2、初始内存没有数据，返回默认值

// 3、修改count，内存会同步修改
```

还有一些更复杂的情况参考：https://vueuse.org/core/useStorage/



## vue-router 4.x



## Vue3

### Hook

Vue文档：https://cn.vuejs.org/guide/reusability/composables.html

VueUse 文档：https://vueuse.org/

#### 分析 Hook

分析一些案例，初步梳理下 Hook 的应用设计逻辑

* Hook 中暴露出来操作函数，用于操作 Hook 内部逻辑。同时暴露出来数据，用于页面渲染
* Hook 入参，用于传入初始参数、如果需要操作页面上的Dom 就传入 Dom
* Hook内部可读取 router、页面生命周期等数据

**分页 Hook**

```js
const { previousPage, nextPage, curPage } = usePagination({ ref: dom });

// 点击下一张
nextPage();
// 点击上一张
previousPage()

// curPage 当前页面数据
```



#### URL持久化 Hook

[useUrlSearchParams](https://vueuse.org/core/useUrlSearchParams/#useurlsearchparams) 参数持久化到 URL 中

实现参考：https://juejin.cn/post/7353271369540501544#heading-2



### JS调用组件

```js
export function mountComponent(Component, prop = {}) {
  	// Component是组件，prop 是组件的属性
    const instance = createApp(Component, prop);
  	
  	// 创建一个元素 appendChild 到 body 中
    const compRootEle = document.createElement('div');
    document.body.appendChild(compRootEle);
  
  	// 挂载
  	instance.mount(compRootEle),
      
      
    // 页面卸载移除  
    onUnmounted(()=>{
      instance.unmount();
      document.body.removeChild(root);
		}) 
};
```

### 动画

#### 触发动画的时机

* v-if、v-show切换

  一般是消失、出现状态切换。如果是下面这种例子，类似于**`<component>` 切换组件**属于元素之间的切换

  ```vue
  <Transition name="fade" mode="out-in"> 
    <div v-if="xx"></div>
    <div v-else-if="xx"></div>
    <div v-else></div>
  </Transition>
  ```

* `<component>` 切换组件

  多元素之间过渡，默认上一个元素开始执行消失动画，下一个元素同时执行出现动画。  通过`mode="out-in"`可以实现上一个消失动画执行完毕后，下一个元素才执行出现动画

  ```vue
  <Transition name="fade" mode="out-in"> 
    <component :is="activeComponent"></component>
  </Transition>
  ```

* key 属性改变

  key 属性变化相当于 Dom 被销毁重建，故可触发动画

  ```vue
  <script setup>
  import { ref } from 'vue';
  const count = ref(0);
  
  setInterval(() => count.value++, 1000);
  </script>
  
  <template>
    <Transition>
      <span :key="count">{{ count }}</span>
    </Transition>
  </template>
  ```

#### 动画实现

实例模板，下面两种方式均只是改动样式

```vue
<script setup>
import { ref } from 'vue'
const show = ref(true)
</script>

<template>
	<button @click="show = !show">Toggle Slide + Fade</button>
  <Transition name="slide-fade" class="static-show">
    <p v-if="show">hello</p>
  </Transition>
</template>

```

* animation 动画

  仅定义过渡中 animation

  ```vue
  <style>
  .slide-enter-active {
    animation: bounce-in 0.5s;
  }
  .slide-leave-active {
    animation: bounce-in 0.5s reverse; /* ⚠️ reverse 可以倒置动画 */
  }
    
  /* 展示样式就是 元素本身的 CSS */
  .static-show{
      
  }  
    
  @keyframes bounce-in {
    /* 0% 展示前*/
    0% { 
      transform: scale(0); 
    }
    
     /* 过渡样式 */
    50% {
      transform: scale(1.25);
    }
    
    /* 100% 展示样式 或 消失样式 */
    100% {
      transform: scale(1);
    }
  }
  </style>
  ```

* transition 动画

  [参考 Playground](https://play.vuejs.org/#eNqFUk1v2zAM/SucLm2xOEnXDSgyt9gHOmA7bMOaww66OAqdqJUlQaLTdEH++0g7SHII2ostPT4+PorcqM8xDlctqokqs0k2EmSkNt5qb5sYEsEGEtawhTqFBs6Yeqa99ib4zNRleIIbIZxTavFC+3LUq3A+Xwib6CpCuVE5a4mCh0/GWfN4o9Uu+438tbqdhsXCIdw7O0d4C9+qOZajPofzAcppqny2ZFnDVw2KgnCLmpmcLxxmRVgVtt7JM7xE50I5ko44OjqIMFCOjh36MtOzk+PwIFygJ0xFZciuEDYiQnuJCVTOwXh4lQGrjEVo6aP2W9E6lnBYrfAViesMpp1ZU8zwn8V0fjlg8IN8rgdweXFKtncmcxmcqkfhqFYdUjPpj9Lu3/N347gWVYAQK2PpeQLjvgiPsHsGNVCUec61XQwfcvC8Ip2eViY00TpMv6J0kLWa9JUkxt2Epx8dJivBznrcLNE8nsAf8lowrX4nzJhWPMl9jKq0QOrDd/c/cc3nfbAJ89Yx+4XgH8zBteKxp31p/ZxtH/E6t9+7Rbd+Mc13a0IezK4pMSrMbcfXipf/6wutH+xeDd93efyeavsfbv0lXA==)

  ```vue
  <style>
    
  /* 展示前*/
  .slide-fade-enter-active {
    transition: all 0.3s ease-out;
  }
  
  /* 消失后 */
  .slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
  }
  
  /* 展示样式就是 元素本身的 CSS */
  .static-show{
      
  }  
    
  /* 过渡 */
  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
  }
  </style>
  ```

* 同时使用

  需要显式声明使用的动画方式，Vue 需要根据 type 值决定使用 transitionend` 或 `animationend 监听动画结束

  ```vue
  <Transition type="animation">...</Transition>
  ```

* 首次动画 

  只有首次加载才触发

  ```vue
  <Transition appear> ...</Transition>
  ```

* JS 钩子

  通过 JS 的方式方便与其他动画库集成

  ```vue
  <template>
  <!-- :css="false" 可以跳过对 CSS 过渡的自动探测。一方面提升性能，另一方面防止 CSS 规则意外地干扰过渡效果：  -->
  	<Transition
    	:css="false"
    	@before-enter="onBeforeEnter"
    	@enter="onEnter"
    	@after-enter="onAfterEnter"
    	@enter-cancelled="onEnterCancelled"
    	@before-leave="onBeforeLeave"
    	@leave="onLeave"
    	@after-leave="onAfterLeave"
    	@leave-cancelled="onLeaveCancelled"
  	>
    <!-- ... -->
  	</Transition>
  </template>
  
  <script>
  // 在元素被插入到 DOM 之前被调用
  // 用这个来设置元素的 "enter-from" 状态
  function onBeforeEnter(el) {}
  
  // 在元素被插入到 DOM 之后的下一帧被调用
  // 用这个来开始进入动画
  function onEnter(el, done) {
    // 调用回调函数 done 表示过渡结束
    // 如果与 CSS 结合使用，则这个回调是可选参数
    done()
  }
  
  // 当进入过渡完成时调用。
  function onAfterEnter(el) {}
  
  // 当进入过渡在完成之前被取消时调用
  function onEnterCancelled(el) {}
  
  // 在 leave 钩子之前调用
  // 大多数时候，你应该只会用到 leave 钩子
  function onBeforeLeave(el) {}
  
  // 在离开过渡开始时调用
  // 用这个来开始离开动画
  function onLeave(el, done) {
    // 调用回调函数 done 表示过渡结束
    // 如果与 CSS 结合使用，则这个回调是可选参数
    done()
  }
  
  // 在离开过渡完成、
  // 且元素已从 DOM 中移除时调用
  function onAfterLeave(el) {}
  
  // 仅在 v-show 过渡中可用
  function onLeaveCancelled(el) {}
  
  </script>
  ```

  

#### 动画复用

使用插槽传入到Transition 内部

```vue
<!-- MyTransition.vue -->
<script>
// JavaScript 钩子逻辑...
</script>

<template>
  <!-- 包装内置的 Transition 组件 -->
  <Transition
    name="my-transition"
    @enter="onEnter"
    @leave="onLeave">
    <slot></slot> <!-- 向内传递插槽内容 -->
  </Transition>
</template>

<style>
/*
  必要的 CSS...
  注意：避免在这里使用 <style scoped>
  因为那不会应用到插槽内容上
*/
</style>
```



## SSR

### Vue+Pinia

pinia.state.value 是所有Store实例的State值

```js
{
	<storeid>:{
		count:0
	}
}
```

#### Store实例

```js
import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', {
  state: () => ({
    count: 0,
  }),
  getters: {
    doubleCount(state) {
      return state.count * 2;
    },
  },
  actions: {
    increment() {
      this.count++;
    },
  },
});
```

#### 服务端

返回的html中需要包含：

* State 其实不是在服务端上执行的。这里是指取了 State  的初始数据并以字符串的形式挂载到window上
* 引入的 script 是 `client.js`（这样浏览器接到 Html 后，会执行客户端逻辑）

```js
// server.js
import { createApp, createSSRApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

const pinia = createPinia();
const app = createSSRApp(App);

app.use(pinia);

// 拿到 store 的初始值
const initialState = JSON.stringify(pinia.state.value);

// 生成的 HTML
const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>My App</title>
  </head>
  <body>
    <div id="app">${renderToString(app)}</div>
    <script>
      window.__INITIAL_STATE__ = ${initialState};
    </script>
    <script src="/dist/bundle.js"></script>
  </body>
  </html>
`;

res.send(html);
```

#### 客户端

**初始化 Store 数据**

客户端接收到 Html 后，执行其中的 script 脚本（ 其实就是打包后的 client.js  ）

⚠️：client 使用的 createApp 初始化，这里就和 Vue SPA 项目是一样的了。核心逻辑就是把数据反序列化给 Store 实例这样就能在客户端上运行了

```js
// client.js
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

const isClient = typeof window !== 'undefined';

const pinia = createPinia();
const app = createApp(App);

// 如果是在客户端环境，恢复状态（可根据是否有 window 对象判断）
if (isClient) {
  pinia.state.value = JSON.parse(window.__INITIAL_STATE__);
}

app.use(pinia);
app.mount('#app');
```

**使用 Store**

* 在 `setup` 函数、`getter` 和 `action` 的顶部调用 `useXXXStore()` 函数

  setup函数是在服务端触发的，但是Pinia会自动处理，所以开发者无需考虑初始化时机问题

* 在其他地方使用`useXXXStore()` 函数，必须传入 pinia 实例

  ```js
  const pinia = createPinia()
  const app = createApp(App)
  
  app.use(router)
  app.use(pinia)
  
  router.beforeEach((to) => {
    // ✅这会正常工作，因为它确保了正确的 store 被用于当前正在运行的应用
    const main = useXXXStore(pinia)
  
    if (to.meta.requiresAuth && !main.isLoggedIn) return '/login'
  })
  ```

  



