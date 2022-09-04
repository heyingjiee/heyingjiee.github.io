# Gulp自动化神器

Gulp可以实现本地文件自动化操作，通过编写gulpfile.js文件，编写自动化任务，通过命令行主动运行编写的任务，或可以监听文件变动，自动化触发编写好的任务

目前，Gulp大版本已升级到4.x.x版本，与3.x.x用法出现较大变化

[Gulp npm主页](https://www.npmjs.com/package/gulp)

[Gulp中文官网](https://www.gulpjs.com.cn/)

## 简单使用

```js
const gulp=require("gulp")

//---------任务流程----------
//-src指定源路径,返回一个流。参数：字符串或者字符串数组（指定多个源路径）,支持glob语法（参见：https://www.gulpjs.com.cn/docs/getting-started/explaining-globs/）
//-pipe中可以传递src返回的流,处理文件一般都是在pipe中
//-dest指定输出目录。参数:输出目录没有就会创建
//-除了使用gulp提供的Api，还可以编写Node代码来完全自定义自动化流程


//---------创建任务：复制html----------
//终端:gulp copyHtml 执行任务
//-task创建任务
//  --将函数导出就可以使用命令 <gulp 名字>来执行任务
//  --将函数以default为名字导出，可以使用命令 <gulp>来执行任务(一般把多个任务的组合，用default导出)
//  --未导出的任务不能直接用glup命令运行
//作为任务的函数有一些要求：https://www.gulpjs.com.cn/docs/getting-started/async-completion/
function copyHtml (){
    return gulp.src("*.html")
        .pipe(gulp.dest("dist/"))
}
exports.copyHtml=copyHtml

function copyData (){
    return gulp.src(["*.json","src/*.json","!src/data2.json"])//这是使用glob指定了多个路径，感叹号跟随的路径表示对上一个配置路径排除
        .pipe(gulp.dest("dist/"))
}
exports.copyData=copyData

//---------创建任务组合----------
//-parallel同步执行多个任务
//-series按顺序执行多个任务
//parallel和series可互相嵌套

function build(){
    return gulp.parallel(copyData,copyHtml)
}
exports.build=build

//---------监听文件变动，触发执行指定任务----------
//-相当于创建一个任务，在其中使用watch函数，还是使用<gulp 名字>来执行任务
//-watch与src函数的路径一样，第一个参数是字符串或字符串数组，同样支持glob
//-调用 watch() 之后，关联的任务是不会被立即执行的，而是要等到第一次文件修之后才执行。
function watch(){
    gulp.watch(["index.html","index2.html"],copyHtml)
    gulp.watch("src/*json",copyData)
}
exports.watch=watch
```

## 使用Gulp插件

前面只是介绍了在gulp的src设置文件输入源路径、dest设置后输出的路径

Gulp的主要工作工作都是在这两者之间，做自动化操作

这部分主要介绍，在src、dest使用常用的插件做一些自动化操作

### 常用Gulp插件

[Gulp插件搜索](https://gulpjs.com/plugins/)

* [gulp-sass](https://www.npmjs.com/package/gulp-sass)：将sass转换为css。目前最新的版本是5.x.x
* [gulp-rename](https://www.npmjs.com/package/gulp-rename):重命名插件

### 样式处理

我们常常会在项目中使用sass、less等预编译样式。可以使用Gulp进行自动转化为css

安装依赖：新版5.x.x中需要手动安装下sass

```shell
npm install -D sass gulp-sass
```

gulpfile.js

```js
const gulp=require("gulp")
const sass= require('gulp-sass')(require('sass'));

function transferSass(){
    return gulp.src("style/*.scss")
        .pipe(sass({outputStyle: 'compressed'}))//{outputStyle: 'compressed'}表示对转换后的css进行压缩
        .pipe(gulp.dest("dist/style/"))
}
exports.transferSass=transferSass
```

运行

```shell
gulp transferSass
```



### JS处理





