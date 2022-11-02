# pnpm

## 出现背景

npm、yarn等包管理工具存在一个问题，每个项目下的依赖都安装在项目下的node_modules中，这会出现一个问题：本地有100个项目，每个项目都依赖Vuex这个库，那就安装100份，极大的占用内存

pnpm最重要的是解决了这个问题

## 介绍

[pNpm中文网](https://pnpm.io/zh)

网站截图：图中总结了其4大优势

![image-20221030173143193](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20221030173143%20.png)

目前Vue已经使用开始pNpm了，越来越多公司也迁移到了pNpm

安装pNpm

```shell
npm install -g pnpm 
```

## 硬链接与软链接

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

## node_modules非扁平结构

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

## 节省存储空间

pNpm对于同一依赖的相同版本仅存储一份。每个项目中使用的依赖最终都是硬链接

```
pnpm add axios
```

## 支持monorepo

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



## 常用命令

常用命令基本与yarn相同

```shell
pnpm init
pnpm install
pnpm add <package>
pnpm remove <package>
pnpm <command>
```

pnpm会把所有项目的依赖建立一份硬链接放到自己的目录下，查看存储目录

```shell
pnpm store path
```

如果某个依赖已经没有项目再用了，可以使用下面的命令，将其的硬链接从存储目录中删除

```shell
pnpm store prune
```

