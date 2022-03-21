# Vue组件封装

## 新建vue项目

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
const install=function (){
    componentList.forEach(component=>{
        Vue.component(component.name,component)
    })

}
export default install //使用组件时，Vue.use(xxx) ,自动调用install方法，我们在这个方法中，使用Vue.component进行全局组册注册
```

## 构建

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



![image-20220320200541253](https://gitee.com/hyj1270433876/blog-img/raw/master/Vue%E7%9B%B8%E5%85%B3/image-20220320200541253%20.png)

## 上传npm官方仓库

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

npmg官网登陆自己的账户，就能看到这个包了

![image-20220320201043339](https://gitee.com/hyj1270433876/blog-img/raw/master/Vue%E7%9B%B8%E5%85%B3/image-20220320201043339%20.png)

## 在项目中使用

**安装npm包**

其实就是将我们上面构建的文件，下载到了项目的 `node_modules/包名` 目录下（就是这里的`node_modules/hdd-test1` ）

![image-20220320202137590](https://gitee.com/hyj1270433876/blog-img/raw/master/Vue%E7%9B%B8%E5%85%B3/image-20220320202137590%20.png)

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

![image-20220320202708410](https://gitee.com/hyj1270433876/blog-img/raw/master/Vue%E7%9B%B8%E5%85%B3/image-20220320202708410%20.png)