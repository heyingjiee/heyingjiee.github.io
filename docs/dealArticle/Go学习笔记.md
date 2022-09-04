# Go学习笔记

## 配置环境

### 下载

[官网下载](https://golang.google.cn/dl/) 我使用的是mac系统，安装器会将Go自动安装到 `/usr/local/go`文件夹

![Xnip2022-05-07_18-44-22](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Go/Xnip2022-05-07_18-44-22.jpg)

### 配置环境变量

> 如果你对本节中对于环境变量含义的解释不能理解，建议阅读到【Go Module】章节后，在回来重新阅读

**mac上配置环境变量直接在`~/.zshrc`文件中添加配置**



**`GOROOT`**：默认是我们安装Go开发包的路径，不需要配置（Mac/Linux默认安装到`usr/local/go`这个位置）

GOPATH有什么用？ 

src目录下就是Go语言的标准库，所以我们可以在自己的项目代码中，可以直接使用Go的标准库（Go的标准库就是一个module）

![image-20220511125257255](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Go/image-20220511125257255.png)

**`GOPATH`**：

从Go 1.8版本开始，`GOPATH`默认为` ~/go `，不需要配置

```shell
export GOROOT=/usr/local/go #Go默认的安装位置
```

GOPATH有什么用？ 

Go项目中的依赖（module）并不会安装在项目下，而是默认安装到GOPATH下的目录。所以我们可以在自己的项目代码中，可以直接使用GOPATH下的目录中的模块（module）



**`GOPROXY`**：

安装依赖的源地址，默认GOPROXY配置是：`GOPROXY=https://proxy.golang.org,direct`（国内无法访问）

* 可以设置多个代理地址，用英文逗号分隔

* 最后的 “direct” 是一个特殊指示符，用于指示 Go 回到源地址去抓取（比如 GitHub 等）。当配置有多个代理地址时，如果第一个代理地址返回 404 或 410 错误时，Go 会自动尝试下一个代理地址，当遇见 “direct” 时回到源地址去抓取

  ```shell
  export GOPROXY=https://goproxy.cn,direct
  
  #或者
  #export GOPROXY=https://goproxy.cn,direct
  ```



**`GOPRIVATE`**：

安装的依赖包地址只支持Github.com等等（【Go Module】章节会详细据介绍依赖的地址）

但是，如果项目中引入了非公开的依赖，比如公司内部git仓库，依赖地址以 `xxxx`开头的，如果不配置这个字段Go是不支持拉取的

```shell
export GOPRIVATE=xxxxx
```

### 查看配置是否生效

```shell
go env 
```

## 运行GO代码

推荐使用GoLand编辑器（破解方法，自行查找）

* 找个地方，建立Go项目目录，以后的代码都写在这个项目下

  ```text
  GoProject
  ```

* 项目根目录下，初始化go module

  ```shell
  go mod init 项目名  //我这里项目名是GoProject  会在根目录生成一个go.mod
  ```

  ![image-20220509144115487](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Go/image-20220509144115487.png)

* 新建main目录，main目录下新建一个`hello.go`

  在main目录下，可以新建多个任意名字的go文件，但是每个go文件第一行，都会默认生成 `package main `，用来表示这些文件都属于main包（包名也可以和文件夹名不同，但是我强烈不建议这么做）

  ```go
  package main  // 声明该文件属于 main 包
  ```

* 修改`hello.go`文件

  ```go
  package main  // 声明 main 包
  
  import "fmt"  // 导入Go内置 fmt 包
  
  func main(){  // main函数，是程序执行的入口
  	fmt.Println("Hello World!")  // 在终端打印 Hello World!
  }
  ```

* main目录下，运行代码

  go build 文件夹下的Go文件中必须属于main包，且有main函数入口

  ```shell
  go build  //将文件夹内的Go文件，编译为可执行文件（文件名为目录名，即main）
  
  ./main  //运行可执行文件
  ```

  ![image-20220509145153825](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Go/image-20220509145153825.png)

  ```shell
  go build -o hello //指定产生的可执行文件的文件名
  ```

  根据自己的平台，生成的文件类型也有所不不同：win下为`*.exe` ; mac/Linux下为`*.exec`

  如果不想产生编译后文件，可以使用：

  ```shell
  go run xxx.go//直接运行xxx.go,不产生可执行文件
  ```

  **注意**：

  build命令可以直接指定，编译、运行某个go文件

  ```
  go build xxx.go
  ```

* 其他命令

  ```shell
  go install //将编译后的代码放到GOPATH/bin目录 , 默认的GOPATH是~/go目录下的
  ```

  ![image-20220509145816127](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Go/image-20220509145816127.png)

  可执行文件main，被输出到bin下了。Go把GOPATH下的bin目录添加到了PATH环境变量中，所以当可执行文件被输入到了这里，就可以全局任何目录下，使用这个可执行文件

  ```
  main //输出 Hello World!
  ```

  

## 交叉编译

上面讲过`go build `只能编译生成本平台的可执行文件

交叉编译，就是产生其他平台的可执行文件 [详情请参考](https://www.liwenzhou.com/posts/Go/install_go_dev/)

**编译Linux平台可执行文件**：

```shell
CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build
```

**编译window平台可执行文件**：

```shell
CGO_ENABLED=0 GOOS=windows GOARCH=amd64 go build
```

**编译mac平台可执行文件**：

```shell
CGO_ENABLED=0 GOOS=darwin GOARCH=amd64 go build
```



* **CGO_ENABLED**  0为禁用CGO
* **GOOS**  目标平台
* **GOARCH ** 目标平台机器处理器架构

## Package

### 包（package）

***问题1***：同一个包（package）内有多个Go文件，两个文件怎么调用对方的函数或者变量

***问题2***：同一个项目（module）中，不同包之间的两个文件，怎么调用对方的函数或者变量

**前置规则**

* 包中Go文件中要导出的变量/函数，首字母必须大写。首字母小写的是包的内部数据

* 导出的变量/函数，上添加的固定格式的注释，可以被编辑器读取，作为提示。

  注释格式注意：名和解释之间是两个英文空格

  ```go
  //Myadd  两数相加
  func Myadd(a, b int) int {
  	return a + b
  }
  ```

  ![image-20220509184251912](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Go/image-20220509184251912.png)

  

**问题1**

在`GoProject`这个项目下，新建文件夹`calc`文件夹，新建`add.go`、`subtract.go`（默认这个文件夹下的所有go文件就是在calc包下的）

![image-20220509183657039](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Go/image-20220509183657039.png)

***add.go***

```go
package calc

//Myadd  两数相加
func Myadd(a, b int) int {
	return a + b
}
```

***subtract.go***

```go
package calc

import "fmt"

//Mysubtract  两数相减
func Mysubtract(a, b int) int {
	return a - b
}

func UseAdd(x, y int) {
	fmt.Println(Myadd(x, y))
}

```

***结论***：同包文件可以不用导出（首字母不需要大写）、导入，直接调用另一个文件的函数/变量，



**问题2**

在main包中的main函数中调用同一个项目下的cacl包中的函数

![image-20220509183657039](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Go/image-20220509183657039.png)

***subtract.go***

在main包中使用import导入项目下的cacl包，才能调用其中的方法

```go
package main // 声明 main 包

import (
	"GoProject/calc" //导入
	"fmt"
) 

func main() { // main函数，是程序执行的入口
  
	fmt.Println(calc.Myadd(1, 1)) //2
  
	fmt.Println(calc.Mysubtract(2, 1)) //1
	calc.UseAdd(1, 1) //2
}

```

在main中使用calc包中的函数Myadd，如果用变量作为参数传入，该变量大小写都可以

如果要传入结构体参数，结构体的字段必须大写，因为其他包内部需要处理结构体字段，必须大写才能访问到

```go
type user struct{
	Name string
  Age int
}
```

***结论***：不同包文件，一个包使用另一个包的函数/变量，需要导出（首字母大写）、导入包，才能调用



**补充下**：import导入语法

```go
//导入1个库
import "fmt"


//导入多个库,把flag起一个别名aa
import (
		"fmt"
		aa	"flag"
)

//导入库不使用，会报错。但是有些驱动库，导入后会执行库的init方法（后面会讲到），初始化，不必调用，所以我们可以起别名为"_"，就不会报错了
import (
	_ "xxxx"
)
```

### init函数

在每一个Go源文件中，都可以定义任意个如下格式的特殊函数：

```go
func init(){
  // ...
}
```

这种特殊的函数不接收任何参数也没有任何返回值，我们也不能在代码中主动调用它

* 包内部，init先执行，再执行其他代码

* 包之间，按照下图规则，以保证main函数执行时，所有init函数已经执行完毕

* Go语言不允许循环依赖，即 a依赖b，b依赖a的情况

  ![image-20220509190502195](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Go/image-20220509190502195.png)

## Go Module

> 很多教程中，将module和package都翻译成包，这会造成极大的混淆
>
> 这里，module指模块，package指包

`go module`是官方推出的版本管理工具，Go1.16版本以后已经成为默认开启的依赖管理工具

* 一个项目就是一个模块（module），根目录下要有一个`go.mod`
* 一个module下可以有多个包（package）
* Go标准库就是一个模块（module）
* 项目中的依赖是第三方模块（module）

所以，你应该反应过来，一个Go项目既可以单独的作为Go项目开发，也可以直接作为别人的Go项目中依赖

### 第三方模块（module）

第三方包，其实就是一个完整的Go项目，包的根目录也有一个go.mod文件

```go
import (
	"fmt"
	"liwenzhou.com/q1mi/p2"
)
func main() {
	p2.New()
	fmt.Println("main")
}
```

### 模块管理

**相关命令**

|        命令        |                             介绍                             |
| :----------------: | :----------------------------------------------------------: |
| go mod init 项目名 |                初始化项目依赖，生成go.mod文件                |
|       go get       |    拉取远程的第三方模块（模块会被下载到GOPATH下/mod目录）    |
|  go mod download   |                    根据go.mod文件下载依赖                    |
| go clean -modcache |                    清理GOPATH下的mod目录                     |
|    go mod tidy     | 新建go.mod文件后，可以用这个命令将项目中使用的第三方依赖，写到go.mod文件中 |
|    go mod graph    |                        输出依赖关系图                        |
|    go mod edit     |                        编辑go.mod文件                        |
|   go mod verify    |                  检验一个依赖包是否被篡改过                  |
|     go mod why     |                    解释为什么需要某个依赖                    |

**go mod init**

初始化项目为一个module，生成`go.mod`文件记录了整个项目的依赖关系

例如：

```
go mod init xxx
```

生成的`go.mod`的一般格式，注意：indirect表示项目中没有直接用到这个依赖包，即间接依赖

```go
//项目名
module xxx 


//项目使用go语言的版本
go 1.18  


//项目依赖的第三方模块
require github.com/q1mi/hello v0.1.1 // indirect
```

**go get**

这个命令主要用来拉取远程的第三方模块（module），第三方模块地址的格式如下：

![image-20220509223554243](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Go/image-20220509223554243.png)

```shell
# 默认拉取GitHub主分支最新的代码
go get -u github.com/q1mi/hello

# 拉去指定分支最新的代码
go get -u github.com/q1mi/hello@master

# 也可以指定版本,如果没有发布过版本，默认拉取最新代码
go get -u github.com/q1mi/hello@v0.1.0

# 也可以通过commit hash拉取
go get github.com/q1mi/hello@2ccfadd
```

`-u`参数，如果依赖发布了新的版本，就会强制本地更新依赖

其实get这个命令主要分成两部分执行：

* 下载模块源代码

  Go通过模块地址的域名能够判断，调用什么本地工具来进行下载，比如github的地址，Go会调用本地安装的Git来克隆源代码名，所以 go get 前，要确定是否安装了对应的工具，并把其配置到了环境变量。支持以下工具：

  ```text
  BitBucket (Mercurial Git)
  GitHub (Git)
  Google Code Project Hosting (Git, Mercurial, Subversion)
  Launchpad (Bazaar)
  ```

  下载的放置的位置是 GOPATH/mod/网站域名/（默认GOPATH是~/go）

  与其他语言不同，Go语言使用依赖并非是把依赖安装到自己的项目下，而是放到了GOPATH下

  ![image-20220724150247458](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Go/20220724150248%20.png)

* 编译源代码，并添加到环境变量中（与go install不同，go install会将编译的可执行文件保存在GOPATH/bin目录下）

* go.mod 文件

  记录项目模块名，使用的Go版本，依赖的module

  ```go
  module GoProject
  
  go 1.18
  
  require github.com/q1mi/hello v0.1.1 // indirect
  ```

  `indirect`表示该依赖包为间接依赖，说明在当前程序中的所有 import 语句中没有发现引入这个包

* go.sum文件

  文件会详细记录依赖的模块的详细信息

  ```shell
  <module> <version> <hash>
  ```

import引入第三方模块地址的地址，调用时使用地址中项目名的部分

```go
package main

import (
	"fmt"
	"github.com/q1mi/hello"
)
func main(){
  hello.SayHi() // 调用hello包的SayHi函数
}
```

**go install**

go install 编译源代码，并将生成的可执行文件放置到 GOPATH/bin下，以及添加到环境变量中

![image-20220724150351100](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Go/20220724150351%20.png)



### 发布模块

当我们想要在社区发布一个自己编写的代码包时，我们该怎么做呢？接下来，我们就一起编写一个代码包并将它发布到`github.com`仓库

* 新建GitHub仓库，克隆空仓库到本地

* 在根目录下，初始化项目，创建`go.mod`文件

  ```
  go mod init github.com/用户名/项目名
  ```

* 根目录下创建 `hello.go` 文件，添加下面的内容

  ```go
  package hello
  
  import "fmt"
  
  func SayHi() {
  	fmt.Println("你好")
  }
  ```

* 推送到GitHub仓库，这样就对外发布了一个Go包，其他人可以通过`github.com/用户名/项目名`这个引入路径下载并使用这个包了。发布版本号使用git tag为代码包打上标签即可，比如打上标签`v0.1.0`，就发布了一个版本号为`v0.1.0`的版本

  Go modules中建议使用语义化版本控制，其建议的版本号格式如下：

![语义化版本号示意图](https://www.liwenzhou.com/images/Go/package/version_number.png)



* 发布新的主版本

  新版本如果是与之前版本不兼容的更新（使用方式方式了变化，比如这里新的版本调用SayHi函数需要一个参数）

  ```go
  package hello
  
  import "fmt"
  
  // SayHi 向指定人打招呼的函数
  func SayHi(name string) {
  	fmt.Printf("你好%s\n", name)
  }
  ```

  因此我们需要发布一个主版本号递增的`v2`版本。在这种情况下，我们通常会修改当前`go.mod`包的引入路径，像下面的示例一样为引入路径添加版本后缀

  ```
  module github.com/用户名/项目名/v2
  
  go 1.16
  ```

  并将代码打好 tag 推送到GitHub仓库，这样就可以在不影响使用旧版本的用户的前提下，发布出去了新版本。想要使用`v2.0.0`版本的代码包的用户只需按修改后的引入路径下载即可

  注意：下载路径变化了，版本号也变化了

  ```shell
  go get github.com/用户名/项目名/v2@v2.0.0 
  ```

  在代码中使用的过程与之前类似，只是需要注意引入路径要添加 v2 版本后缀

  注意：虽让加了v2但是还是将包，以项目名使用

  ```go
  package main
  
  import (
  	"fmt"
  
  	"github.com//用户名/项目名/v2" // 引入v2版本
  )
  
  func main() {
  	项目名.SayHi("张三") // v2版本的SayHi函数需要传入字符串参数
  }
  ```

* 废弃已发布版本

  如果某个发布的版本存在致命缺陷不再想让用户使用时，我们可以使用`retract`声明废弃的版本。修改项目下的`go.mod`文件，并打包推送到GitHub仓库

  ```go
  module github.com/q1mi/hello
  
  go 1.16
  
  
  retract v0.1.2
  ```

  用户使用go get下载`v0.1.2`版本时就会收到提示，催促其升级到其他版本

### 模块的一些理解

最近在学习GitHub上的一个项目 https://github.com/hound-search/hound

我终于弄清楚了一些问题

* 如果你想改这个项目的Go源码，那就用git clone可以把项目克隆下来，进一步开发

  查看这个仓库的README，我发现这个仓库要去使用以下命令

  ```go
  go get github.com/hound-search/hound/cmds/...  //...是通配符，表示匹配所有文件或者子目录
  ```

  当时，我感觉很奇怪，我整个项目的Go都已经拉到了本地，为啥还当成依赖再装一次cmd目录？

  后来，我发现这个项目下的cmd目录就是项目的入口，使用go get主要是因为这个命令的第二步是go install，将目录中的两个main.go编译后，输出到GOPATH/bin目录，这样在全局就可以调用编译后的可执行文件了

  ![image-20220511163835676](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Go/image-20220511163835676.png)

* 如果你想把这个项目当成Go模块，集成到自己的Go项目中

  * 自己的项目得有go.mod文件（`go intit mod`）

  * go get下载这个包 （`go get github.com/hound-search/hound/cmds/...`）

  * 下载完成后，你就会发现一些变化

    **go.mod**增加了依赖，**go.sum**也增加了这些依赖的详细信息

    ```go
    require (
    	github.com/blang/semver v3.5.1+incompatible // indirect
    	github.com/hound-search/hound v0.4.0 // indirect
    )
    ```

    **GOPATH/mod/github.com**下多了**hound-search**这个模块

    ```
    经过对比，使用go get安装的和git clone克隆的项目，一模一样。
    ```

    所以，也验证了前面我提到了的

    > 一个Go项目既可以单独的作为Go项目开发，也可以直接作为别人的Go项目中依赖







## Go语言基本规则

Go文件基本规则

* 不能给其他库定义方法，只给自己定义的结构体，定义方法

* 其他

  ```go
  package main   //包
  
  import "fmt"   //引入的Go库
  
  
  //全局只能声明： "变量/常量/类型/函数" 
  
  func main(){  // main函数，是程序执行的入口
  	//函数内可以写
    //1.声明 "变量/常量/类型"；无法声明函数，但是可以声明匿名函数
    //2.语句
    //3.流程控制逻辑
    //4.调用全局函数
    
  }
  ```



Go项目基本规则

* 一个Go项目只能有一个main包，只有main包的一个Go文件可以有main函数，这个函数就是整个项目的入口

* 其他Go文件中的函数，必须在含有main函数的Go文件中使用，否则就无法执行

  

## 常用的Go的标准库

本章节下涉及的库，凡是没有提供具体使用例子的，均在后面的章节中有使用到

### Go标准库文档

[标准库文档](https://studygolang.com/pkgdoc)

### builtis

这个库是默认引入的，不用手动引入

库中包括go语言中常用的**类型**和**方法**的声明

其他需要引入的库，都需要`库名.方法()`的形式调用，而builtin库，可直接调用方法

|    内置函数    |                             介绍                             |
| :------------: | :----------------------------------------------------------: |
|     close      |                     主要用来关闭channel                      |
|      len       |      用来求长度，比如string、array、slice、map、channel      |
|      cap       |             用来求容量比如array、slice、channel              |
|      new       | 用来分配内存，主要用来分配值类型，比如int、struct。返回的是指针 |
|      make      |   用来分配内存，主要用来分配引用类型，比如chan、map、slice   |
|     append     |                    用来追加元素到slice中                     |
|      copy      |  复制slice（slice存储的是引用，必须使用copy才是真正的复制）  |
|     delete     |                        删除map键值对                         |
|     close      |                           关闭通道                           |
| panic和recover |                        用来做错误处理                        |

### fmt

> 输出

**fmt.Print**

直接打印

**fmt.Println**

可输出多个值，最后输出换行符

```go
str := "世界"
str2:="hello"
fmt.Println("你好", str, str2) 
```

打印后，换行

**fmt.Printf**

格式化输出，使用`%占位符`来控制输出格式，如果想要输出文本`%`需要使用`%%`

```go
package main

import "fmt"

func main() {

	//---------int-------
	n1 := 100
	fmt.Printf("%b\n", n1) //1100100  以二进制输出数字
	fmt.Printf("%d\n", n1) //100 以十进制输出数字
	fmt.Printf("%o\n", n1) //144  以八进制输出数字
	fmt.Printf("%x\n", n1) //64  以十六进制输出数字
	//---------浮点数-------
	n2 := 100.23
	fmt.Printf("%f\n", n2) //100.230000 已浮点数形式输出
	//---------string--------
	str := "你好"
	fmt.Printf("%s\n", str) //你好  输出字符串

	//---------bool--------
	b := true
	fmt.Printf("%t\n", b) //true  输出布尔值

	//----------所有类型都可以输出-----------
	type Stu struct {
		name  string
		age   int
		hobby []string
	}
	s := Stu{
		name:  "jack",
		age:   18,
		hobby: []string{"唱歌", "跳舞"},
	}
	fmt.Printf("%T\n", s)  //main.Stu  输出变量类型
	fmt.Printf("%v\n", s)  //{jack 18 [唱歌 跳舞]}  原样输出变量内容，注意结构体只会输出值，不含有字段名
	fmt.Printf("%+v\n", s) //{name:jack age:18 hobby:[唱歌 跳舞]} 一般只有结构体使用这个，会输出结构体的字段和值
	fmt.Printf("%#v\n", s) //main.Stu{name:"jack", age:18, hobby:[]string{"唱歌", "跳舞"}}  带格式输出，这里的字符串带上了双引号，结构体的类型也会打印
}
```

> 输入

空白符指：空格、回车(\r、\n )、制表符（\t） 【 在win中换行相当于输入了\r\n , 在mac中换行相当于输入了\r】

**fmt.scan**

输入值，如果有多个值，用空白符分隔开多个。当分隔开的值和参数变量个数一致时，回车才会结束输入

```go
var (
	name string
	age  int
)

fmt.Scan(&name, &age)
fmt.Println(name, age)
```

**fmt.scanln**

只要输入回车就会直接结束，如果输入的值个数和参数对应不上，就会报错

```go
var (
	name string
	age  int
)

fmt.Scanln(&name, &age)
fmt.Println(name, age)
```

**fmt.scanf**

按照指定格式输入

> 输出到文件

***Fprint***

系列函数会将内容输出到一个`io.Writer`接口类型的变量`w`中，我们通常用这个函数往文件中写入内容。

```go
func Fprint(w io.Writer, a ...interface{}) (n int, err error)
func Fprintf(w io.Writer, format string, a ...interface{}) (n int, err error)
func Fprintln(w io.Writer, a ...interface{}) (n int, err error)
```

举个例子：

**os.Stdout** 实现了io.Writer

```go
fmt.Fprintln(os.Stdout, "向标准输出写入内容")   //输出到终端了
```

**os.File**实现了io.Writer

```go
fileObj, err := os.OpenFile("./xx.txt", os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0644)
if err != nil {
	fmt.Println("打开文件出错，err:", err)
	return
}
name := "吴彦祖"

fmt.Fprintf(fileObj, "往文件中写如信息：%s", name) //写入到文件了
```

**http.ResponseWriter**实现了

```go
详见【网络编程】-【Http服务】章节
```

注意，只要满足`io.Writer`接口的类型都支持写入。

> 其他

**Sprint** 、**Sprintln**、**Sprintf**

这三个返回返回值是字符串，使用与print系列的一样

```go
res := fmt.Sprintf("name:%s", "张三")
fmt.Println(res) //name:张三
```

**Errorf**

输入错误字符串 ,详见【接口】-【错误接口】

```go
customError:=fmt.Errorf("查询数据库失败，err:%w", err) //返回值是个error对象
```

### strings

string类型字符串的处理方法，详见【类型/字符串】章节

### time

[详情查看](https://www.liwenzhou.com/posts/Go/go-time/)

**当前时间**

time包中的Now是构造函数，返回Time结构体。Year、Month...等是Time结构体的方法

注意Now返回的是你当前所在时区的时间

```go
now := time.Now()         //时间对象
fmt.Println(now)          //2022-05-12 00:17:11.940078 +0800 CST m=+0.000130398
fmt.Println(now.Year())   //2022
fmt.Println(now.Month())  //May
fmt.Println(now.Day())    //12
fmt.Println(now.Hour())   //
fmt.Println(now.Minute()) //17
fmt.Println(now.Second()) //10
```

**时间戳**

把时间实例，转化为时间戳字符串

```go
fmt.Println(now.Unix()) //当前时间结构体实例转化为时间戳（单位秒）
```

**时间格式化**

Go中用传递格式时，把时间实例转化为字符串，用以下表示对应含义的变量，其他均为字符串，显示到最终格式（记忆口诀为2006 1 2 3 4 5）

```text
2006 年
01  月
02 日
15 时   （如果希望格式化成12小时制，这里用03，结尾加AM/PM）
04 分
05 秒
```

```go
now := time.Now()           
//默认24小时制
fmt.Println(now.Format("2006-01-02 15:04:05")) //2022-05-12 00:34:43

// 12小时制：结尾加AM/PM，小时写03
fmt.Println(now.Format("2006-01-02 03:04:05.000 PM"))
```

**将字符串转化为时间结构体对象**

time.Parse(layout,str)  返回的时间对象是UTC时间，`2022-05-15 05:00:00 +0000 UTC`

需要使用ParseInLocation(layout,str,location)，转化为东八区时间`2022-05-15 05:00:00 +0800 CST`

```go
loc, err := time.LoadLocation("Asia/Shanghai")
if err != nil {
	fmt.Printf("获取时区失败%v\n", err)
}
time, err := time.ParseInLocation("2006-01-02 15:04:05", "2022-05-15 5:00:00", loc)//第一个参数格式化字符串，第二个是待转换的时间字符串。第三个参数是时区
if err != nil {
	fmt.Printf("时间转换失败%v\n", err)
}
fmt.Println(time) //2022-05-15 05:00:00 +0800 CST
```

**时间间隔**

`time.Duration`是time包定义的一个类型，表示时间的间隔，单位为纳秒。同时time包定义了以下时间间隔常量

```go
const (
    Nanosecond  Duration = 1
    Microsecond          = 1000 * Nanosecond
    Millisecond          = 1000 * Microsecond
    Second               = 1000 * Millisecond
    Minute               = 60 * Second
    Hour                 = 60 * Minute
)
```

比如：`时间间隔类型*time.Second`表示秒的时间间隔，`数字常量*time.Second`也可以，因为Go会自动把数字常量转化为time.Duration类型

**Add**

在某一时刻的基础上增加时间间隔

```go
now := time.Now()                                   

n := 10
now.Add(time.Duration(n) * time.Second) //当前时间加10秒的时间实例。now.Add(10* time.Second) 数字会被转化为time.Duration格式
```

**Sub**

求两个时刻之间的差值：

```go
func (t Time) Sub(u Time) Duration
```

返回一个时间段t-u。如果结果超出了Duration可以表示的最大值/最小值，将返回最大值/最小值

```go
start := time.Now()
time.Sleep(10 * time.Second)
fmt.Println(time.Now().Sub(start)) //10.001114829s
```

**Equal**

```go
func (t Time) Equal(u Time) bool
```

判断两个时间是否相同，会考虑时区的影响，因此不同时区标准的时间也可以正确比较。

**Before**

```go
func (t Time) Before(u Time) bool
```

如果t代表的时间点在u之前，返回真；否则返回假。

**After**

```go
func (t Time) After(u Time) bool
```

如果t代表的时间点在u之后，返回真；否则返回假。

**定时器**

time.Tick(时间间隔 d)，返回值是通道，每隔***时间间隔d***向通道放入一个当前的时间实例

```go
time.Tick(10 * time.Second)
```

每隔1秒打印当前时间

```go
for temp := range time.Tick(time.Second) {
	fmt.Println(temp)
}

//2022-05-12 00:54:56.79165 +0800 CST m=+23.001189704
//2022-05-12 00:54:57.790955 +0800 CST m=+24.000480296
//2022-05-12 00:54:58.791673 +0800 CST m=+25.001182955
//....
```

**休眠**

不建议使用，因为这个函数是真的使得goroutine停止运行等待

time.sleep(时间间隔)

### sync

详见【并发编程】章节

sync包提供了基本的同步基元，如互斥锁。除了Once和WaitGroup类型，大部分都是适用于低水平程序线程，高水平的同步使用channel通信更好一些

|    内置函数    |                            介绍                            |
| :------------: | :--------------------------------------------------------: |
| sync.WaitGroup | 常用于：控制线进程等待线程计数器为0才终止。Add、Done、Wait |
|   sync.Mutex   |         互斥锁，使用该结构体类型的Lock和ULock方法          |
|  sync.RWMutex  |             写锁Lock和ULock；读锁RLock和URLock             |
|   sync.Once    |                   涉及到只执行一次的操作                   |
|    sync.Map    |   Go中内置的Map类型并不是并发安全的，所以sync包提供了Map   |

### sync/atomic

类似于sync库中的Map，sync/atomic库中的（int32、uint32、int64、uint64）对于基础类型中（int32、uint32、int64、uint64）实现了并发安全的操作。并且提供了一系列函数对这些类型进行操作

当然，我们也可以不使用这些并发安全的类型，而是使用对变量加锁的方式处理

### os、bufio、io/ioutil读写文件

os包的接口规定为在所有操作系统中都是一致的，其中做常用的是读取文件的一些操作

```
https://www.liwenzhou.com/posts/Go/go_file/
```



**使用os.open返回的文件实例自带的Read方法读取**

```go
package main

import (
	"fmt"
	"io"
	"os"
)

func main() {
	file, err := os.Open("./test.txt")//执行代码文件同目录下的test.txt文件
	defer file.Close()
	if err != nil {
		fmt.Println("read from file failed...  ")
		return
	}
	//res := make([]byte, 1000)
	for {
		temp := make([]byte, 100)
		n, err := file.Read(temp) //将数据读入temp中,n是读取的字节数
		if err == io.EOF {
			//res = append(res, temp...)
			fmt.Printf("%s", string(temp[:n]))
			return
		}
		if err != nil {
			fmt.Println("read file failed...")
		}
		fmt.Printf("%s", string(temp))

	}

}
```

**使用os.openFile返回的文件实例自带的Write/WriteString方法写**

```
func OpenFile(name string, flag int, perm FileMode) (*File, error) {
	...
}
```

`name`：要打开的文件名 

 `flag`：打开文件的模式。 模式有以下几种：

|     模式      |   含义   |
| :-----------: | :------: |
| `os.O_WRONLY` |   只写   |
| `os.O_CREATE` | 创建文件 |
| `os.O_RDONLY` |   只读   |
|  `os.O_RDWR`  |   读写   |
| `os.O_TRUNC`  |   清空   |
| `os.O_APPEND` |   追加   |

`perm`：文件权限，一个八进制数，用四位，第一位是0表示是一个八进制数。r（读）4，w（写）2，x（执行）1

如果我们在代码中读取一个数字作为perm，比如输入777，其实这是十进制数字，如果传入这个值，权限就会有问题，所以我们可以将其当作是八进制数，然后使用strconv.ParseInt转化为十进制，然后把这个十进制数字当成perm参数传入

```go
package main

import (
	"fmt"
	"os"
)

func main() {
	file, err := os.OpenFile("test.txt", os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0666)
	if err != nil {
		fmt.Print("read from file failed... ")
    return
	}
	str := "你好\n"
	file.Write([]byte(str)) //参数是byte切片
	file.WriteString("大家好") //参数是字符串
}
```

****

**把文件用bufio的Reader封装起来，使用Reader的ReadString/Read读取**

```go
package main

import (
	"bufio"
	"fmt"
	"io"
	"os"
)

func main() {
	file, err := os.Open("./test.txt")
	defer file.Close()
	if err != nil {
		fmt.Println("read from file failed...")
    return
	}
	reader := bufio.NewReader(file)
	for {
    line, err := reader.ReadString('\n') //ReadString("\n"),是按照\n读取
		if err == io.EOF {
			fmt.Print(line)
			return
		}
		if err != nil {
			fmt.Printf("read from file failed: %v\n", err)
			return
		}
		fmt.Print(line)
	}

}

```

补充：也可以使用Reader的Read方法，和上面的file对象的Read方法一样

```go
var buf [1000]byte
Str := bufio.NewReader(file)
n, err := Str.Read(buf[:]) //数据读入了buf中，n是读取的字节数
	if err != nil {
		fmt.Printf("读取失败：%v", err)
}
```



**把文件用bufio的Writer封装起来，使用Writer的WriteString写入**

```go
func main() {
	file, err := os.OpenFile("xx.txt", os.O_CREATE|os.O_TRUNC|os.O_WRONLY, 0666)
	if err != nil {
		fmt.Println("open file failed, err:", err)
		return
	}
	defer file.Close()
	writer := bufio.NewWriter(file)
	for i := 0; i < 10; i++ {
		writer.WriteString("hello\n") //将数据先写入缓存
	}
	writer.Flush() //将缓存中的内容写入文件
}
```

****

**使用`io/ioutil`直接读取文件**

```go
package main

import (
	"fmt"
	"io/ioutil"
)

func main() {
	fileByte, err := ioutil.ReadFile("./test.txt")
	if err != nil {
		fmt.Printf("read file by ioutil,err:%v\n", err)
    return
	}
	fmt.Print(string(fileByte))
}
```

**使用`io/ioutil`直接写文件**

```js
package main

import (
	"fmt"
	"io/ioutil"
)

func main() {
	str := "\nioutil写入"
	err := ioutil.WriteFile("./test.txt", []byte(str), 0666)
	if err != nil {
		fmt.Println("read from file failed")
    return
	}
}
```

### os文件夹相关补充

**os.Mkdir**

os.Mkdir用于创建文件夹

第一个参数是文件夹名

* 默认在当前文件夹创建新的文件夹
* 也可以是文件夹路径，比如`name/jack`，注意路径name必须存在，才能在其下建立jack文件夹
* 如果文件夹已经存在，会返回fs.PathError类型的错误。可以使用**os.IsNotExist**参数为error类型，用来判断返回的错误是否是文件不存在；IsPermission用来判断是否是权限引起的错误

第二个参数是权限位，在前面【os、bufio、io/ioutil读写文件】介绍过

```go
err := os.Mkdir("name/f", 0777)
if err != nil {
		res := os.IsNotExist(err)
		fmt.Printf("文件不存在：%v", res)
}
```

**os.MkdirAll**

相对于Mkdir，有两点不同

* 如果name文件夹不存在，就会建立name文件夹后，在cd进去，建立ca文件夹。所以，权限为必须是7【对文件夹有x权限，才能进入文件夹。有w权限，能创建文件夹】
* 如果文件夹已经存在，不会返回err错误

```go
err := os.MkdirAll("./name/ca", 0777)
if err != nil {
	fmt.Printf("%v", err)
}
```

**例子**

判断文件夹是否存在，不存在则创建该文件夹（Stat也能判断文件是否存在，但是MkdirAll只能创建文件夹）

```go
if _, err := os.Stat("data/b"); err != nil {
	if err := os.MkdirAll("data/b", os.ModePerm); err != nil { //os.ModePerm就是0777
		fmt.Printf("创建文件夹出错%v\n", err)
	}
}
```

### os/exec

官方文档：https://studygolang.com/pkgdoc

exec包可以用来执行外部命令

下面这个例子是用来克隆Git仓库的（电脑上必须装好Git）

```go
func Clone(dir, url string) (string, error) {
 	//分隔传入的路径，filepath.Split将最后一级路径和前面的部分分开。
  //本例中，par=/Users/yc/Documents ; rep=goProjec
	par, rep := filepath.Split(dir)
  
  //Command中写入执行的命令。“git clone --depth 1 仓库地址 克隆下来的代码存放的文件夹名”
	cmd := exec.Command(
		"git",
		"clone",
		"--depth", "1",
		url,
		rep)
  
  //Dir指定命令的工作目录。如为空字符串，会在调用者的进程当前目录下执行
	cmd.Dir = par
  
  //执行命令并返回标准输出和错误输出合并的切片。out是执行命令返回的值，err是错误对象
	out, err := cmd.CombinedOutput()
	if err != nil {
		log.Printf("Failed to clone %s, see output below\n%sContinuing...", url, out)
		return "", err
	}
}

Clone("/Users/yc/Documents/goProject","git地址")
```

### os/filepath

官方文档：https://studygolang.com/pkgdoc

处理路径的包。众所周知，Win和Mac、Linux的路径格式不同，但是为了能代码能在不同平台通用，所以要使用filepath中的函数，其会自动根据平台系统处理路径

**IsAbs**

IsAbs判断是否是绝对路径，返回布尔值

```go
fmt.Printf("%v\n", filepath.IsAbs("a/b"))  //false

fmt.Printf("%v\n", filepath.IsAbs("/a/b")) //true
```

**Abs**

Abs将参数拼接为绝对路径

```go
str, err := filepath.Abs("a/b")
if err != nil {
	fmt.Printf("%v\n", err)
}
fmt.Printf("%v\n", str) //转化的绝对路径是：/Users/yc/Documents/GO/Gotest/a/b
```

如果原本就是绝对路径，就原样返回

**Dir**

去掉路径的最后一级和它前面的斜杠

```go
fmt.Println(filepath.Dir("/foo/bar/baz.js")) //路径：/foo/bar
fmt.Println(filepath.Dir("/foo/bar/baz")) //路径：foo/bar
```

特殊情况，最后一级没有目录或文件名

```go
fmt.Println(filepath.Dir("/foo/bar/baz/")) //路径：/foo/bar/baz
fmt.Println(filepath.Dir("/dirty//path///")) //路径：/dirty/path
```

特殊情况，相对路径

```go
fmt.Println(filepath.Dir("dev.txt")) //路径：.
fmt.Println(filepath.Dir("../todo.txt")) //路径：..
fmt.Println(filepath.Dir("..")) //路径：.
fmt.Println(filepath.Dir(".")) //路径：.
```

特殊情况，绝对路径

```go
fmt.Println(filepath.Dir("/")) //路径：/
```

特殊情况，空字符串

```go
fmt.Println(filepath.Dir("")) //路径：.
```

**Join**

拼接路径，返回的都是相对路径

* 出一个参数外，上下的参数 `b`、`/b`、`b/`、`/b/`是一样的，都是在原来路径的下一级

  ```go
  fmt.Println(filepath.Join( "a" , "b" , "c" ))  //输出： a/b/c
  
  fmt.Println(filepath.Join( "a" , "b" , "/c" ))  //输出： a/b/c
  
  fmt.Println(filepath.Join("a", "b", "c/")) //输出： a/b/c
  
  fmt.Println(filepath.Join("a", "b", "/c/")) //输出： a/b/c
  ```

  ```go
  fmt.Println(filepath.Join( "a" , "b/c" )) 	//输出： a/b/c
  fmt.Println(filepath.Join( "a" , "/b/c" )) 	//输出： a/b/c
  fmt.Println(filepath.Join( "a" , "b/c/" )) 	//输出： a/b/c
  fmt.Println(filepath.Join( "a" , "/b/c/" )) 	//输出： a/b/c
  ```

* 第一个参数，决定了 返回的是不是绝对路径

  ```go
  fmt.Println(filepath.Join( "a" , "b" , "c" ))  //输出： a/b/c
  
  fmt.Println(filepath.Join( "/a" , "b" , "c" ))  //输出： /a/b/c
  ```

* `../../b`，是在原来路径的上上级

  记住一个技巧，有几个点`..`就把前面的路径去掉几个

  ```go
  fmt.Println(filepath.Join( "a/b" , "../../../xyz" ))  //输出： ../xyz
  
  fmt.Println(filepath.Join("a/b", "../xyz")) //输出：a/xyz
  ```

**glob**

返回glob匹配的文件，类型是切片

![image-20220826000010724](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Go/20220826000037%20.png)

```go
strSlice, err := filepath.Glob("data/**/*.txt")
if err != nil {
	fmt.Printf("%v\n", err)
}
fmt.Printf("%v\n", strSlice) //[data/B/b.txt data/B/c.txt]
```



**Split**

```go
filepath.Split(dir)
```

**例子**

```go
import "path/filepath"

if !filepath.IsAbs(c.DbPath) {
		path, err := filepath.Abs(
			filepath.Join(filepath.Dir(filename), c.DbPath))
		if err != nil {
			return err
		}
		c.DbPath = path
}
```



### log

用于日志收集

### net、net/http

使用详见【网络编程】章节

### errors

详见【接口类型】下的【错误接口】章节

### reflect

详见【反射】章节

### crypto/md5

这个库用来进md5加密的

**加密一条数据**

```go
package main

import (
	"crypto/md5"
	"fmt"
)


func main() {
  data := []byte("go语言学习笔记")
	return fmt.Sprintf("%x", md5.Sum(data))
	fmt.Println(s) //08aae6d0d841eff8ba8772ddf8551157
}
```

**加密多条数据**

```go
package main

import (
	"crypto/md5"
	"fmt"
	"io"
)

func main() {
	h := md5.New()
	io.WriteString(h, "go语言学习笔记") //把第二个内容写入第一个Hash实例里
	s := fmt.Sprintf("%x", h.Sum(nil))
	fmt.Printf("%v\n", s) // //08aae6d0d841eff8ba8772ddf8551157
}
```





## 标识符

**GO语言变量编译规则**

* 函数内声明的变量必须使用，否则报错

  ![image-20220507215536943](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Go/image-20220507215536943.png)

* 全部声明的变量，可以不使用【因为可能这个文件可能作为包，其中的全局声明被其他文件使用】

  ![image-20220507215607060](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Go/image-20220507215607060.png)

### 变量

**声明变量**

> 注意：go变量在声明时，就初始化了默认值的零值
>
> 字符串默认为空字符串，
>
> 整型和浮点型数字默认 0
>
> 布尔值默认为false
>
>  指针、函数、接口、切片、映射、通道类型的零值默认为nil

一般变量声明

```go
var name string 
```

多个同类型变量一起声明

```go
var age, stuNum int //同时定义两个变量为int
```

批量声明

```go
var (
		name        string
		age, stuNum int
	)
```

**初始化**

一般形式（变量声明的3种方式，初始化我都写了一遍）

```go
var name string= "jack"

var age, stuNum int =18,1220 //分别赋值给了age=18，stuNum=1220

var (
	name        string="jack"
	age, stuNum int =10,1220
)
```

右值推导（变量声明的3种方式，都可以用）

```go
var name = "jack" //根据值推断name为string类型

var age, stuNum  =18,1220 

var (
	name ="jack"
	age, stuNum =10,1220
)
```

简短变量声明 

```
name := "jack"
```

**匿名变量 **

多用于接收，函数返回值中某个不想使用的值

```
var _ string = "jack"
```

### 常量

常量使用关键字`const`，基本与var一样 ，只有以下区别：

* 常量定义后不能修改
* 常量声明时，必须初始化
* 常量的批量声明
* 常量不能使用 简短变量声明 

**初始化**

一般形式

```go
const name string = "jack"

const age, stuNum int =18,1220 

const (
	name  string = "jack"
	age, stuNum int    = 18, 1220
)
```

右值推导

```go
就是上面的代码，省略类型
```

批量声明注意点：

* 批量声明中不赋值，默认继承上一个值

  ```go
  const (
  	n1 =100
  	n2
  	n3 //n2、n3默认为100
  	n4 =200
  	n5  //n5默认为200
  ) 
  ```

* iota常量 

  ```go
  //iota=在const中第一次出现的行数-1
  //随后的每行iota的值加1
  const (
  	n1 = 10   //10
  	n2 = iota //1
  	n3 = 20   //20
  	n4        //20
  	n5 = iota //默认为iota，4
  )
  ```
  
* 模拟枚举类型

  这种用法在time标准库用到了，定义了一些了time的常量，可以在作为参数传入time包中的函数
  
  ```go
  package Calc
  type Level uint8
  const (
  	INFO Level = iota  //0
  	WARNING //1
  	ERROR  //2
  )
  func xx(le Level){
    if le>WARNING{ //这里就变成了数字的比较
      //提示
    }
  }
  
  //使用
  import "Calc"
  Calc.xx(Calc.ERROR)
  ```

**匿名变量 **

多用于接收，函数返回值中某个不想使用的值

```
const _ string = "jack"
```

## 基本类型

### 整型

```
有符号 ：int8、int16、int32 、 int64 
无符号 ：uint8、uint16、uint32 、 uint64

特殊
 - int  #系统是32位就与int32一样,系统是64位就与int64一样 
 - unit  #同上
 - uintptr  # uintptr 类型只有在底层编程时才需要，特别是Go语言和C语言函数库或操作系统接口相交互的地方。
```

不同类型仅仅是占用bit大小不同，存储的数字上下限范围不同

我们通常使用int，其范围已经足够我们使用了，而且因为int变量占据的内存大小，会随着运行平台而变化。如果用了int64，运行在32位平台，那么存储的这个int64的变量在被读取时，只能读到存储的一半数据，导致与实际数值不同

类型推断默认将浮点型推断为int

```go
package main

import "fmt"

func main() {
	n1 := 10
	fmt.Printf("%T\n", n1) //int  补充%T可以看到变量类型
}
```

赋值不同进制的数字

```go
package main

import "fmt"

func main() {
	n1 := 12
	n2 := 077   //八进制，以0开头，后面的77是八进制数
	n3 := 0xfff //十六进制，以0x开头，后面的fff是十进制数

	fmt.Printf("%d--%d--%d\n", n1, n2, n3) //按照十进制输出 12--63--4095
  //%d是把数字按十进制输出
  //%b是把数字按二进制输出
  //%o是把数字按八进制输出
  //%x是把数字按十六进制输出
}

```

### 浮点型

```text
float32

float64
```

类型推断默认将浮点型推断为float64

```go
package main

import "fmt"

func main() {
	n1 := 10.1
	fmt.Printf("%T\n", n1) //float64  
}
```

### 布尔型

```
bool
```

只有`true`、`false`两个值

```go
package main

import "fmt"

func main() {
	n1 := false
}
```

### 字符串

**字符编码问题**

基础：GO使用的是Uncode编码集，按照UTF-8编码存储，UTF-8是可变长度的，1个UTF-8字符，占据1～4个字节（byte）

* 一个汉字是1个UTF-8字符，占据3个字节

* 一个英语字母/数字是1个UTF-8字符，占据1个字节（Unicode完全包含了ASCII码集，英语字母都在ASCII码集的范围内，存储ASCII码集只需要一个字节）



与其他语言类型基本相同，上面凡是涉及字符串长度和索引的方法，实际上都是按照字节（byte）计算的，所以字符串中出现汉字就会造成不准确的问题



引入概念：字符串中的每一个元素叫做“字符”，在遍历或者单个获取字符串元素时可以获得字符。字符串使用`""`，字符使用`''`

Go语言的字符有以下两种：

- 一种是 byte 类型（1字节，byte是uint8类型的别名）
- 另一种是 rune 类型（1～4字节，rune是 int32 类型的别名），代表一个 UTF-8 字符，当需要处理中文、日文或者其他复合字符时，则需要用到 rune 类型

日常我们处理的字符串往往是 **汉字和字母** 的，所以全部使用rune

```go
package main

import "fmt"

func main() {
	n1 := "hello"
  
  //原样输出
  n2:=`
  	hello
  	world
  `
}
```

反引号中不能放置变量，只能是常量。与JS中的模版字符不通，如果想要字符串中放置变量，必须使用Sprintf

**Sprintf**

返回格式化后的字符串

```go
name := "jack"
str := fmt.Sprintf("你好%v", name)
fmt.Println(str)
```

**字符串基本使用**

```go
package main

import (
	"fmt"
)

func main() {
	str := "你好"

	//长度
	fmt.Println(len(str)) //6

	
  //+拼接
  fmt.Println(str + "123") //你好123
  
  
  //修改，注意：Go中的字符串是不允许修改的，所以返回一个字符串转化的rune切片，对切片进行处理。（原字符串不变）
  runeArr := []rune(str) //类型(变量)这是强制转换的语法 
	runeArr[0] = '我'
	fmt.Println(string(runeArr)) //我好
  println(str) //你好
}

```

**字符串的相关方法**

```go
package main

import (
	"fmt"
	"strings"
)

func main() {
	str := "hello,world你好"
	fmt.Println(len(str)) //17
	//分割成切片
	arr := strings.Split(str, ",")
	fmt.Printf("%v\n", arr) //[hello world你好]

	//是否包含
	fmt.Println(strings.Contains(str, "h")) //true

	//是否是前缀
	fmt.Println(strings.HasPrefix(str, "he")) //true
	//是否是后缀
	fmt.Println(strings.HasSuffix(str, "ld")) //false

	//查找,返回索引
	fmt.Println(strings.Index(str, "ld"))    //9
	fmt.Println(strings.LastIndex(str, "好")) //14

	//把切片拼接成字符串
	fmt.Println(strings.Join(arr, "+")) //hello+world你好

	//去除空行
  fmt.Println(strings.TrimSpace("     aa  ")) //aa
}
```

### 类型转换

JS中令我最为头疼的就是它的类型转换，各种类型之间都可以随意转换（感觉很多转换完全没有实际意义），还存在各种隐形转换

Go语言中，必须显式的转换，而且某个类型只能转换到其他的几个特定类型

```
//数字型

int float 相关的类型可以互相转换，注意：可能会造成精度丢失
```

```
//字符串

string <--> []rune 或者 []byte 

//注意:字符串和数组不可以转换，但是，我们可以取整个数组为切片
string 和 [100]byte 
```

## 流程控制

### if

```go
package main

import "fmt"

func main() {
	age := 18
	if age <= 18 {
		fmt.Println("青年") //青年
	} else if age < 60 {
		fmt.Println("中年")
	} else {
		fmt.Println("老年")
	}
}

```

Go中还允许，在 if 表达式之前添加一个执行语句，再根据变量值进行判断

```go
package main

import "fmt"

func main() {

	if age := 18; age <= 18 { //注意这种写法，只有if内部能访问到该age变量
		fmt.Println //青年
	} else if age < 60 {
		fmt.Println
	} else {
		fmt.Println("老年")
	}
  
  //age在外面访问不到
}
```

死循环，会一直循环

```
for{}
```

### for

**一般形式**

```go
package main

import "fmt"

func main() {
	for i := 1; i < 10; i++ {
		fmt.Println(i)
	}
}
```

**for range**

Go语言中可以使用`for range`遍历数组、切片、字符串、map 、通道（channel）

* 数组、切片、字符串返回`索引`、`值`。
* map返回`键`、`值`。
* 通道只返回通道内的`值`

遍历字符串

```go
package main

import "fmt"

func main() {
	str := "a它e"
	for index, value := range str {
		fmt.Printf("%d-%c\n", index, value)
	}
	//0-a
	//1-它
	//4-e
}
```

遍历切片

```go
//两个变量接收
s := []int{5, 2, 3}
for index, value := range s {
	fmt.Printf("%v:%v\n", index, value)
}


//一个变量接收，就是索引
s := []int{5, 2, 3}
for k := range s {
	fmt.Printf("%v\n", k) //0 1 2
}
```

遍历map

```go
m := map[string]interface{}{
	"name": "tom",
	"age":  18,
}
for key, value := range m {
	fmt.Printf("%v:%v\n", key, value)
}
```



break、continue : 与其他语言相同，不再赘述

### switch

* 与if相同，switch也可以添加一个执行语句，再根据变量值进行判断
* case
  * 一个case可以有多个值，用逗号隔开（一般其他语言，case只能有一个值）
  * 如果某个case符合，就走到该case中，执行完毕，就结束(不用break关键字)
  * case执行体中只有一句`{}`可以省略
* 只能有一个default，当所有case都不符合，则走到default

```go
func testSwitch3() {
	switch n := 7; n {
	case 1, 3, 5, 7, 9:
		fmt.Println("奇数")
	case 2, 4, 6, 8:
		fmt.Println("偶数")
	default:
		fmt.Println(n)
	}
}
```

## 运算符

### 累加

在Go里面`i++`、`i--`是独立的语句，不再是运算符

所以，以下写法是错误的

```
i=i++
```

C语言中的`++i`、`--i`的用法，在Go中不存在

### 算数运算符

加、减、乘、除、取余

### 关系运算符

返回布尔值

```
==	
!=	
>
>=	
<	
<=
```

### 逻辑运算符

| 运算符 | 描述                                                         |
| ------ | ------------------------------------------------------------ |
| &&     | 逻辑 AND 运算符。 如果两边的操作数都是 True，则为 True，否则为 False。 |
| \|\|   | 逻辑 OR 运算符。 如果两边的操作数有一个 True，则为 True，否则为 False。 |
| !      | 逻辑 NOT 运算符。 如果条件为 True，则为 False，否则为 True。 |

### 位运算符

极少使用，不再赘述

## 数组类型

**数组声明**

` [数组长度] 元素类型`

```go
var arr [10]int //
fmt.Printf("%T\n", arr) //[10]int
```

Go语言与其他大多数语言一样，都是定长数组。这一点不如JS的可变长度数组使用的方便

**数组初始化**

不初始化，数组元素默认为零值

> 字符串默认为空字符串，
>
> 整型和浮点型数字默认 0
>
> 布尔值默认为false

初始化

```go
arr1 := [4]int{1, 2, 3, 4}
fmt.Println(arr1) //[1 2 3 4]

arr2 := [4]int{1, 2}
fmt.Println(arr2) //[1 2 0 0]

arr3 := [4]int{0: 1, 3: 2}
fmt.Println(arr3) //[1 0 0 2]

arr4 := [...]int{1, 2, 3, 4, 5, 6} 
fmt.Println(arr4) //[1 2 3 4 5 6]
```

**数组长度**

```
len()
```

**数组遍历**

```go
package main

import "fmt"

func main() {
	arr := [4]int{1, 2, 3, 4}
	for i := 0; i < len(arr); i++ {
		fmt.Println(arr[i])
	}
	//1
	//2
	//3
	//4

	for index, value := range arr {
		fmt.Printf("%d--%d\n", index, value)
	}
	//0--1
	//1--2
	//2--3
	//3--4
}
```

**数组是值类型**

与JS中不同，Go中的数组是值类型的

这也就意味着，赋值给其他变量，就是直接把数组复制了一份给其他变量

````go
package main

import "fmt"

func main() {
	arr1 := [4]int{1, 2, 3, 4}
	arr2 := arr1
	arr2[0] = 10
	//1
	//2
	//3
	//4

	for index, value := range arr1 {
		fmt.Printf("%d--%d\n", index, value)
	}
	//0--1
	//1--2
	//2--3
	//3--4
}
````

## 切片类型

切片（Slice）是基于数组类型做的一层封装，是一个拥有相同类型元素的可变长度的序列。它非常灵活，支持自动扩容。

切片是一个引用类型，它的内部结构包含`地址`、`长度`和`容量`。切片一般用于快速地操作一块数据集合

> 与JS中的数组基本相同，区别是只能存储相同类型的数组元素

**切片声明**

` [] 元素类型`

未初始化的切片，是没有内存空间的，默认为nil值

```go
var arr []int 
fmt.Printf("%T\n", arr) //[]int
fmt.Println(arr == nil) //true
```

Go语言与其他大多数语言一样，都是定长数组。这一点不如JS的可变长度数组使用的方便

**数组初始化**

* 初始化内存空间

  `make(切片类型,长度，容量)`，返回切片，make会默认把切片元素初始化为零值（下面例子是[]int，所以默认的零值是0）

  ```go
  slice1 := make([]int, 5, 10) 
  fmt.Println(slice1) //[0 0 0 0 0]
  
  slice1 := make([]int, 5)  //一个参数，就 默认长度和容量都为5
  fmt.Println(slice1) //[0 0 0 0 0]
  ```

* 初始化值（默认分配内存空间，创建了一个底层数组[4]int{1,2,3,4}）

  ```go
  arr1 := []int{1, 2, 3, 4}
  fmt.Println(arr1) //[1 2 3 4]
  ```

**从数组截取切片**

`数组[开始位置索引:结束位置索引的下一个]`，一个左闭右开的集合

```go
arr1 := [...]int{1, 2, 3, 4, 5} //数组

fmt.Println(arr1[1:3])          //[2 3]
fmt.Println(arr1[1:])           //[2 3 4 5]
fmt.Println(arr1[:])            //[1 2 3 4 5]
```

**从字符串截取切片**

```go
str := "123789"
fmt.Printf("%v", str[2:])//3789
```

**从切片截取切片**

注意：切片的切片，底层仍然是最初的数组，所以容量是4

```go
arr1 := [...]int{1, 2, 3, 4, 5} //数组
slice1 := arr1[1:3]
fmt.Println(slice1) //[2 3]

slice2 := slice1[0:1]
fmt.Println(slice2)      //res是[2]
fmt.Println(cap(slice2)) //4
```

**切片的长度和容量**

直接初始化的切片，底层数组就是初始的切片大小，所以容量和长度一样大

从数组截取的切片，底层数组的从截取开始位置到数组结束位置的大小为容量

*切片可以扩容的，所以容量是可以大于底层数组的限制的*

```
len() //切片的长度
cap() //容量 底层数组的从截取开始位置到数组结束位置的大小
```

举个例子，现在有一个数组`a := [8]int{0, 1, 2, 3, 4, 5, 6, 7}`，切片`s1 := a[:5]`，相应示意图如下。![slice_01](https://www.liwenzhou.com/images/Go/slice/slice_01.png)切片`s2 := a[3:6]`，相应示意图如下：![slice_02](https://www.liwenzhou.com/images/Go/slice/slice_02.png)

**切片是引用类型**

切片只是底层数组的引用，所以修改切片/底层数组，所以相关的值也会一起改变

```go
//例子展示的是两个使用同一底层数组的切片，修改其一，都会跟着变
slice1 := []int{1, 2, 3, 4}
slice2 := slice1
slice2[0] = 100
fmt.Println(slice1) //[100 2 3 4]
```

**切片注意点**

```
通过 len(切片)==0 来判断，是否切片为空

不能使用 切片==nil来判断
```

**切片的遍历**

依然是for和for range两种

**append：切片的追加**

下面的例子可以看出来，追加函数并不是改变原本的切片，而是函数返回了新的追加后的切片，这个新的切片的底层数组对应原来的底层数组，只不过进行了扩容

```go
slice1 := []int{1, 2, 3}
slice2 := append(slice1, 4, 5) //追加元素

fmt.Println(slice1) //[1 2 3]
fmt.Println(cap(slice1)) //3

fmt.Println(slice2) //[1 2 3 4 5]
fmt.Println(cap(slice2)) //6  //这里可以看出来，新的切片底层数组，把原来的底层数组扩容了
```

还可以将切片追加到另一个切片

```go
slice1 := []int{1, 2, 3}
slice2 := []int{4, 5, 6}

slice3 := append(slice1, slice2...) //...是展开语法

fmt.Println(slice3) //[1 2 3 4 5 6]
```

思考：切片不存储值，永远是底层数组存储值

```go
slice1 := []int{1, 2, 3, 4, 5}
slice2 := slice1
//更改slice2,删除2,实际上还是在底层数组[1 2 3 4 5]上操作
slice2 = append(slice2[0:1], slice2[2:]...)

fmt.Println(slice1) //[1 3 4 5 5]
```

**copy：切片复制**

直接赋值，只是把地址赋值过去了。copy(dest，src)，是将src复制值后，覆盖到dest中，返回值是覆盖的元素个数，dest切片发生改变

```go
slice1 := []int{1, 2, 3}
slice2 := []int{4, 5}
slice3 := []int{4, 5, 6, 7}
fmt.Println(copy(slice2, slice1)) //2
fmt.Println(slice2)               //[1 2]

fmt.Println(copy(slice3, slice1)) //3
fmt.Println(slice3)               //[1 2 3 7]
```

合并两个slice（这种用法非常常见）

```go
slice1 := []int{1, 2, 3}
slice2 := []int{4, 5, 6}
finalLen := len(slice1) + len(slice2)
finalSlice := make([]int, finalLen)
copy(finalSlice, slice1)
copy(finalSlice[len(slice1):], slice2)
fmt.Printf("%v\n", finalSlice)
```



**切片删除**

Go中没有提供切片和数组的删除，我们只能自己实现

思路就是： 数组——>切片——>截取需要保留的切片部分——>append拼接

## 指针类型

Go语言中指针没有指针的运算

```text
//1.返回类型是指针类型（指针存储了变量的地址）

&普通变量  //返回变量的地址，类型是指针

new(类型) //返回变量的地址，类型是指针

//2.指针类型的变量
*变量    //*变量=1中返回的地址


//3.声明指针时，不初始化，默认初始化为nil
var ptr *int
```

指针的类型

```
*存储的类型

//例如：
*int 
*string
```

**new和make的区别**

* new和make都是用来申请内存的，，make申请内存后返回
* new用来给基本数据类型和结构体（Struct）申请内存，例如：`string`、`int`。new申请内存后返回指针，例如：`*int`、`*string`
* make用来给`slice`、`map`、`channel`类型申请内存，make申请内存后，返回对应类型本身

## map类型

也叫映射，是无序的key-value的形式

是一种引用类型（和切片一样），需要初始化，才能使用

**声明map类型变量**

map初始化时，是nil

```go
var a map[string]int //key是string，value是int类型的map
fmt.Println(a == nil) //true
```

想要在map中保存数据，必须初始化

**初始化map类型变量**

初始化内存空间两种方式

指定容量

```go
m := make(map[string]int, 8) //容量是8个键值对，可以省略第二个参数
fmt.Println(m == nil) //false，开辟内存空间后就不再nil
```

不指定容量

```js
m := make(map[string]int)
fmt.Println(m == nil) //false，开辟内存空间后就不再nil
```

初始化值（默认就分配了内存空间）

```go
//初始化为空map
m := map[string]string{}
m["name"] = "jack"

//初始化的时候map中已经有了键值对
m2:= map[string]int{"姓名": 1,"年龄": 10}
```

**添加键值对**

初始化后，就可以向map中添加键值对了

* 必须初始化空间才能存储
* 空间不足，会自动扩容

```go
m["年龄"] = 12
```

自动扩容

```go
m := make(map[string]int, 1)
m["1"] = 1
m["2"] = 2
m["3"] = 3
fmt.Println(m) //map[1:1 2:2 3:3]
```

**删除键值对**

删除m中键值为"姓名"的键值对

```go
delete(m, "姓名")
```

**判断是否存在key**

```go
m := map[string]int{
	"姓名": 1,
	"年龄": 10,
}
value, ok := m["姓名"]
if ok {
	fmt.Printf("存在value:%v\n", value) //存在value:1
} else {
	fmt.Println("不存在")
}
```

**遍历**

只有`for range`遍历

```go
m := map[string]int{
	"姓名": 1,
	"年龄": 10,
}
for key, value := range m {
	fmt.Printf("%v:%v\n", key, value)
}
//姓名:1
//年龄:10
```

**嵌套**

map就像是JS中的对象，slice就像是JS中的数组，两者可以组合拼凑出各种形式来存储数据。但是远没有JS灵活

* 形式一 ：切片内部是多个map

  JS中如下的形式

  ```js
  arr=[{name:"tom",age:20},{name:"jack",age:19}]
  ```

  ```go
  []map[string]int  //这是一个切片类型，切片内元素的类型是map
  ```

  初始化一个这种类型的变量，可以分别使用make申请内存

  ```go
  slice := make([]map[string]int, 0, 8)
  slice[0] = make(map[string]int, 10) //元素是map，仍然需要再次申请内存
  slice[0]["年龄"] = 18
  ```

  也可以，以初始化值的方式申请map的内存

  ```go
  slice := make([]map[string]int, 0, 8)
  slice[0] = map[string]int{
  	"年龄": 18,
  }
  ```

  当然也可以，全部使用初始化值的方式（我更推荐这种）

  ```go
  slice := []map[string]int{
  	{"年龄": 18, "身高": 180},
  	{"年龄": 19, "身高": 185},
  }
  fmt.Println(slice) //[map[年龄:18 身高:180] map[年龄:19 身高:185]]
  ```

* 形式二：map内部的value部分是切片

  这里演示使用值初始化

  ```go
  m := map[string][]string{ //map的键是string，值是切片
  	"姓名": {"tom", "jack"},
  	"性别": {"男", "男"},
  }
  ```

技巧：记住Go中使用值初始化map和切片，都用的`{}`

```go
m := map[string][]string{ //第一层花括号是初始化map的，元素用逗号分隔
	"姓名": {"tom", "jack"},//这一层花括号是初始化切片的，元素用逗号分隔
	"性别": {"男", "男"},//这一层花括号是初始化切片的，元素用逗号分隔
}
```



## 函数类型

### 声明函数

* Go中函数没有默认参数，GO语言设计者认为，所有东西在Go中应该是明确的，包括参数

* Go语言的参数，是把实参的值拷贝到形参

* Go语言支持多返回值

* 函数定义的位置（回忆下），记住：函数体内部可以调用其他函数，但是不能在函数体内定义其他函数

  我们在main函数外定义函数，在main中调用

  ![image-20220508230029256](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Go/image-20220508230029256.png)

**函数声明**

```
func 函数名(形式参数列表)(返回值列表){
    函数体
}
```

匿名函数

```
func (形式参数列表)(返回值列表){
    函数体
}
```

**函数类型**

```go
var f func(int) int //定义变量f的类型是 入参、反参都是int的函数
f = func(i int) int {
	return i
}
```

**参数列表**

```go
func f1(x int, y int) int {
	return 1
}
```

简写：x、y是int，z是string

```go
func f1(x, y int, z string) int {
	return 1
}
```

展开语法：使用展开语法的函数必须放在最后

```go
package main

import "fmt"

func f1(x string, y ...int) { //y的类型是切片
	fmt.Println(x) 
	fmt.Println(y)
	return
}
func main() {
	f1("a", 1, 2, 3, 4)
	//a
	//[1 2 3 4]
}

```

**返回值列表**

当没有返回值时，返回值列表可以省略

类型返回值和明明返回值，不能混用

* **类型返回值**

  ```go
  func f1() int { //一个可以省略括号
  	return 1
  }
  
  func f1() (int, string) {
  	return 1, "a"
  }
  ```

* **命名返回值**

  相当于在返回值部分就已经声明了要返回的变量名

  最后写一个return即可，就会按照返回值列表顺序，返回所有的值

  ```go
  func f1() (x int) { //注意：括号不可省略
  	x = 2
  	return
  }
  
  //定义多个命名返回值，与参数一样，也支持简写
  func f1() (x, y int, z string) {
  	x = 2
  	y = 2
  	z = "a"
  	return
  } //返回 2，2，a
  ```

  遇到这种情况也要知道，用户可以在return时，手动设置返回的值

  ```go
  func f1() (x,y int) {
  	x = 1
    y = 2
    return 3,4 //将x赋值为3，y赋值为4
  }
  
  f1() //返回3,4
  ```
  
  如果手动设置，必须将所有返回值都设置了
  
  ```go
  //这种写法是错的
  func f1() (x,y int) {
  	x = 1
    y = 2
    return 3 
  }
  ```
  
  

### 立即执行函数

```go
func 函数名（参数列表）（反参列表）{
  
}(传入的参数列表)
```

例子

```go
func f(i int) {
	fmt.Printf("%d\n", i)
}(i)

f(1) //1
```

### defer

将语句延迟到return时执行（不写return，函数会有默认的return），多个defer语句，按照"后来先执行"的顺序执行

```go
package main

import "fmt"

func fun1() {
	fmt.Println("1")
	defer fmt.Println("2")
	fmt.Println("3")
	defer fmt.Println("4")
}
func main() {
	fun1()
	//1
	//3
	//4
	//2

}
```

应用场景：提前设置关闭

```text
func fun1() {
	链接数据库
	defer 关闭数据库链接
	
	数据库操作1
	数据库操作2
	return
}
```

![image-20220508233236211](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Go/image-20220508233236211.png)

### 函数类型

```text
var f1 func(x int) int //定义变量f1为函数类型，这个函数参数是int，返回值是int

var f2 func() //定义变量f2为函数类型，这个函数无参数，无返回值
```

### 函数参数和函数返回值

既然函数是一种变量类型，所以也可以作为其他函数的参数，也可以作为其他函数的返回值

* 作为参数：类似于JS中的回调函数，但是Go中没有JS的箭头函数这种简写方式

  ```go
  visit([]int{1, 2, 3, 4}, func(v int) {
         //xxxx
  })
  ```

* 作为返回值：类似JS中的闭包概念

## 自定义类型

自定义类型

```
type 自定义类型名 类型
```

定义类型别名

```go
type 别名 = 类型
```

## 结构体类型

与C语言的结构体一样，其实就是帮助我们构造一些复杂的类型

### 结构体

**结构体**

一般结构体与type一起使用，定义新类型

```go
package main

import "fmt"

type Stu struct {
	name  string
	age   int
	score []float64
}

func main() {
	//声明变量
	var s Stu

	//初始化,未初始化的值是默认零值
	s.name = "jack"
	s.age = 18

	//访问
	fmt.Printf("%v\n", s.name) //jack

	//
	fmt.Printf("%T --- %v\n", s, s) //main.Stu --- {jack 18 []}

}
```

**匿名结构体**

```go
var user struct{Name string; Age int}
```

**结构体匿名字段**

* 匿名字段，即不需要变量名，只需要定一个变量类型就可以。初始化时，只能按照定义的字段类型顺序赋值
* 匿名字段的类型只能出现一次，比如，不能出现两个int匿名字段
* 匿名字段可以和命名字段一起啊混合使用

```go
//声明
type Stu struct {
	int //匿名字段
	string //匿名字段
	name string //命名
}

//赋值1:用列表初始化 （后面会提到）
res := Stu{
		18,
		"男",
		"jack",
}

//赋值2:用键值对初始化（后面会提到）,匿名字段用类型当作key
res := Stu{
  int:18,
  string:"男",
  name:"jack",
}

```

注意

* struct也支持简写

  ```go
  type Stu struct {
  	name,age   int //name和age都为int类型
  	score []float64
  }
  ```

* **结构体嵌套**结构体内部字段的类型，不要想的太局限，这个类型除了基本类型，还可以是函数类型（后面讲到方法时，会提到这个情况）、结构体类型甚至结构体指针

  **结构体类型**

  ```go
  type Address struct {
  	country, city string
  }
  
  type Stu struct {
  	name string
  	age  int
  	Address //这里是混用匿名字段
  }
  
  //键值对赋值
  res := Stu{
    name:"jack",
    age:18,
    Address:Address{ //把类型名当做键名
  		"中国",
  		"北京",
  	,
  }
  //列表赋值
  res := Stu{
  		"jack",
  		18,
  		Address{ //这里是一个结构体实例
  			"中国",
  			"北京",
  		},
  }
  
  
  // 使用类型名Address作为字段名 ，访问子结构体内部的属性
  fmt.Println(res.Address.city) //北京
  // 直接访问子结构体内部的属性，当结构体中没有这个字段，就回去子结构体查找
  fmt.Println(res.city) //北京
  ```
  
  如果结构体属性和子结构体属性名重复了，怎么访问子结构体属性？
  
  ```go
  //必须使用类型名Address作为字段名 ，访问子结构体内部的属性
  fmt.Println(res.Address.city) //北京
  ```
  
  **结构体指针**
  
  访问字结构体的规则同上
  
  ```go
  type Address struct {
  	country, city string
  }
  
  type Stu struct {
  	name string
  	age  int
  	*Address //这里是混用匿名字段
  }
  
  //赋值
  res := Stu{
  		"jack",
  		18,
  		&Address{ //这里是一个结构体实例
  			"中国",
  			"北京",
  		},
  	}
  
  //访问嵌套在内部的结构体
  fmt.Println(res.Address.city) //北京
  ```

### 结构体实例

* 两种实例化方法，最后一个字段都必须加逗号
* 两种方式，不能混合使用

**使用键值对赋值**

```go
p := Stu{
		name: "jack",
		age:  14,
}
fmt.Printf("%v\n", p) //{jack 14}
```

**使用列表赋值**（值与声明结构体时的顺序需要对应）

```go
p := Stu{
	"jack",
	14,
}
fmt.Printf("%v\n", p) //{jack 14}
```

注意：

实例化时，没有给的值默认为字段类型的零值

```go
p := Stu{}
fmt.Printf("%+v\n", p) //{name: age:0}
```

**访问结构体实例**

```go
p := Stu{
		name: "jack",
		age:  14,
}
fmt.Printf("%v\n", p.name) //jack
```

**更改实例字段**

```js
p := Stu{
		name: "jack",
		age:  14,
}
p.name="tom"
fmt.Printf("%v\n", p.name) //tom
```

### 结构体指针

使用new关键字，为结构体开辟内存空间

按道理必须 (*p)才是变量值，才能使用`.`取成员，但是Go语言做了简化，允许直接使用指针使用`.`取成员

```go
package main

type Stu struct {
	name string
	age  int
}

func main() {
	p := new(Stu)
	//(*p).name="jack"
  p.name = "jack"
}
```

使用`&`返回指针

```go
p := &Stu{
		"jack",
		14,
	}
fmt.Printf("%T\n", p) //*main.Stu
```

### 构造函数

类似于JS中工厂函数，返回一个对象

函数返回值，一般是指针，而不是直接返回结构体

```go
package main

import "fmt"

type Stu struct {
	name string
	age  int
}

func newStu(name string, age int) *Stu {
	return &Stu{
		name, //这里是列表赋值
		age,
	}
}
func main() {
	res := newStu("jack", 12)
	fmt.Printf("%T\n", res) //*main.Stu
}
```

### 方法

接触过面向对象语言的人，都知道方法指的就是，实例的函数。但是，在Go无论结构体是否实例化，都可以调用其方法

Go中提供的方法，以一种新的形式为Struct注册函数，这种方式把Struct的定义和注册函数分开成了两部分，个人觉得不够直观。看下面的形式，就能看出来，通过给函数定义加了一个`(结构体类型首字母小写 结构体类型)`【称之为**接收者**】，来将其绑定到一个结构体上

注意：

* 接收者和参数一样都是值传递，所以指针接收者，可以修改结构体实例的值
* 结构体实例、结构体实例指针，均可以两种调用方法（接收者是结构体类型、结构体指针类型）

```go
func(结构体类型首字母小写 结构体类型)方法名（参数列表）（返回值列表）{
	
}
```

```go
package main

import "fmt"

type Stu struct {
	name string
	age  int
}

//Stu  结构体
func newStu(name string, age int) *Stu {
	return &Stu{
		name,
		age,
	}
}

//getAge  定义Stu结构体的方法，接收体是指针
func (s Stu) getAge() int {
	return s.age
}

//setAge  定义Stu结构体的方法,接收者是结构体指针,这样才能修改结构体的age字段
func (s *Stu) setAge(age int) {
	s.age = age
}

func main() {
  //结构体实例调用方法
	stu1 := Stu{
		name: "jack",
		age:  18,
	}
	stu1.setAge(20)
	fmt.Println(stu1.getAge()) //20

  //结构体实例指针调用方法
	stu2 := &Stu{
		name: "tom",
		age:  18,
	}
	stu2.setAge(30)
	fmt.Println(stu2.getAge()) //30

}

```

还需要，注意一点，未实例化的结构体，也可以调用其方法

```go
func (s *Stu) p() {
	fmt.Println("123")
}

func main() {
	var x Stu
	x.p() //123

}
```

**经过实验，我发现Go的Struct中的类型，也可以是函数类型**。

```js
package main

import "fmt"

type Stu struct {
	name   string
	age    int
	getAge func() int
	setAge func(age int)
}

func newStu(name string, age int) *Stu {
	return &Stu{
		name,
		age,
		func() int { return age },
		func(Myage int) { age = Myage },
	}
}
func main() {
	res := newStu("jack", 12)
	res.setAge(20)
	fmt.Printf("%v\n", res.getAge()) //20
}
```

**Go语言规则**：

不能给其他库定义方法，只给自己定义的结构体，定义方法

### 模拟继承

利用结构体的嵌套和方法，实现继承效果。结构体可直接调用 ，其内部的子结构体的属性和方法

**尤其注意，有时候，我们在看别人代码时会发现，某个结构体实例调用的方法，在代码中找不到这个结构体的方法的实现，这时候，考虑下这个方法是不是其中嵌套的某个结构体实现的方法**

```go
package main

import "fmt"

//父结构体 animal
type animal struct {
	catogory string
}

func (a animal) run() {
	fmt.Printf("父结构的方法：奔跑\n")
}

//子结构体 cat
type cat struct {
	feetNum int
	animal  //匿名字段
}

func (c cat) say() {
	fmt.Printf("子结构的方法：喵喵叫\n")
}
func main() {
	//实例化父结构体cat
	c := cat{
		feetNum: 4,
		animal: animal{
			catogory: "猫科",
		},
	}
	//1、父结构体,调用自己的属性
	fmt.Printf("%v\n", c.feetNum) //4
	//2、父结构体,调用自己的方法
	c.run() //父结构的方法：奔跑

	//3、父结构体,调用子结构体的属性（必须省略子结构体嵌入父结构体时，指定的key）
	c.say() //子结构的方法：喵喵叫
	//4、父结构体,调用子结构体的方法  （如果没有命名冲突可以省略key）
	fmt.Printf("%v\n", c.animal.catogory) //猫科
	fmt.Printf("%v\n", c.catogory)        //猫科

}

```

### 结构体的包导出

前面在【Go Module】章节，已经学过了声明标识符首字母大写，就可以被导出

这里强调下：

```go
package student
type Stu struct{
	Name string
	age int
}
```

这里强调下，Stu被导出，其中只有Name能访问

```
Student.Stu.Name
```

### JSON

JSON对于一个前端来说最熟悉不过了，JS中的对象字面量可以很轻易的转化为JSON字符串

> 一般，使用结构体定义数据格式，然后创造出符合结构体结构的数据，这个数据本身就具有和JSON一样的数据层次，所以才能转化

**注意**：这里有一个大坑，定义的结构体名和结构体字段，必须首字母大写，否则`encoding/json`库（序列化与反序列化的函数，都是用的这个库）中的方法不能接收到这个参数结构体

**序列化**

在Go我们需要使用一个标准库将Go中的数据转化为JSON格式的字符串，这个过程叫做序列化

```go
data, err := json.Marshal(转化的结构) //data是返回的byte[]格式的字符串
```

前面讲过的切片（slice）和映射（map），组合的数据就符合JSON的结果，能成功转化为JSON字符串

```go
m := map[string][]string{
	"姓名": {"tom", "jack"},
	"性别": {"男", "男"},
}
data, err := json.Marshal(m)
if err != nil {
	fmt.Println("err")
  return
}
fmt.Printf("%s", data) //{"姓名":["tom","jack"],"性别":["男","男"]}
```

切片（slice）和 结构体（struct）【实例化的结构体和map相似】也能达成这种效果

```go
package main

import (
	"encoding/json"
	"fmt"
)

//Student 学生
type Student struct {
	Name string
	Age  int
}

//Class 班级
type Class struct {
	Title    string
	Students []*Student
}

func main() {
	c := &Class{
		Title:    "101",
		Students: make([]*Student, 0, 200),
	}
	stu := &Student{
		Name: "jack",
		Age:  18,
	}
	c.Students = append(c.Students, stu)

	//JSON序列化：结构化数据-->JSON格式的字符串
	data, err := json.Marshal(c) //结构体一般使用地址，而不是值，以减少赋值带来的性能损失
	if err != nil { 
		fmt.Println("err")
		return
	}
	fmt.Printf("%s\n", data) //{"Title":"101","Students":[{"Name":"jack","Age":18}]}

}

```

**反序列化**

反JSON序列化：JSON格式的字符串->结构化数据

```go
err := json.Unmarshal(byte[]类型的json字符串, &tempClass) //tempClass接收转化后的结果
```

接收反序列化的变量也必须符合JSON的格式

```go
str := `{"Title":"101","Students":[{"Name":"jack","Age":18}]}`
var tempClass Class
err := json.Unmarshal([]byte(str), &tempClass) 
if err != nil {
	fmt.Println(err)
}
fmt.Printf("%#v\n", tempClass) //main.Class{Title:"101", Students:[]*main.Student{(*main.Student)(0xc00000c198)}}
```

### 结构体标签

因为调用要求结构体字段全部必须大写，这也就意味着转化为的JSON的字段名也是大写的

但是，很多时候我们需要返回的字段名是小写的，或者返回的字段名和结构体字段名不一样，就用到**结构体标签**（Tag）

Tag在结构体字段的后方定义，由一对**反引号**包裹起来，具体的格式如下：

```bash
`key1:"value1" key2:"value2"`
```

结构体tag由一个或多个键值对组成。键与值使用冒号分隔，值用双引号括起来。同一个结构体字段可以设置多个键值对tag，不同的键值对之间使用空格分隔。

```go
type Class struct {
	Title    string     `json:"title"`
	Students []*Student `json:"students_list"`
}

//{"title":"101","students_list":[{"Name":"jack"}]}
```

`json`表示当使用json库序列化时使用的替代字段名，还支持 `xml`、`yaml`等

```go
type Class struct {
	Title    string     `json:"title" xml:"xml_title"`
	Students []*Student `json:"students_list"`
}
```

一个特殊的例子

```go
type Class struct {
	ID    int     `json:"id,string"` //id是指在json中取id字段的值。string是指该字段还可以接收string类型
}
```

## 接口类型

### 接口的形式

接口名一般是`*er` ，其他语言中接口中还可以有变量，Go中只能是函数

* 接口实例内部的这种形式叫方法签名

  ```go
  type Runer interface{
  	函数名(参数列表)(反参列表) //函数类型
  	函数名(参数列表)(反参列表)
  }
  ```

* 接口实例内部可以是其他接口

  例子：

  ```go
  type Reader interface {
  	Read() ()
  }
  
  type Writer interface {
  	Write() ()
  }
  
  
  // ReadWriter 是组合Reader接口和Writer接口形成的新接口类型
  type ReadWriter interface {
  	Reader
  	Writer
  }
  ```

### 结构体实现接口

结构体的方法中有接口中定义的所有方法，就称为结构体实现了这个接口

**GoLand工具**

GoLand中这个标志代表，这个Engine结构体实现了一些接口

![image-20220619010629881](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Go/20220619010630%20.png)

点击图标，出现弹窗，可以看到Engine都实现了3个接口

![image-20220619010725041](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Go/20220619010725%20.png)

### 实现接口的用处

例如，这里的两个结构体都实现了***接口中全部函数类型***（这里只有一个run函数），所以两个结构体实例化都属于Runner类型

**多个结构体实现一个接口**

当对于同一个业务MakeRun时，只要定义其参数是接口Runner，就可以穿入两个不同类型的结构体实例，在MakeRun中调用run()方法，两个结构体就会按照自己的实现去做run

这非常有用处，比如，一个支付业务流程中的参数就可以是一个接口，然后支付宝、微信两个结构体可以实现一个支付方法。以后如果还需要接入其他支付方法，也不需要动症个支付业务流程，只需要新实现一个方法即可

```go
package main

import "fmt"

type Runer interface {
	run()
}

type Dog struct {
}

func (d Dog) run() {
	fmt.Println("狗跑")
}

type Cat struct {
}

func (c Cat) run() {
	fmt.Println("猫跑")
}

func MakeRun(r Runer) {
	r.run()
}
func main() {
  //Dog{}、Cat{}是实例化结构体，只不过没有属性，所以空的
  
	MakeRun(Dog{}) //狗跑 

	MakeRun(Cat{}) //猫跑
}

```

**一个结构体实例可以实现多个接口**

```go
type Runer interface {
	run()
}

type Sayer interface {
	say()
}

type Cat struct {
}

func (c *Cat) run() {
	fmt.Println("猫跑")
}
func (c *Cat) say() {
	fmt.Println("猫叫")
}
```

**补充**

如果Cat结构体没有实现了Runer接口，编辑器就会报错，无法编译

```
var _ Runer = &Cat{}
```

### 值接收者和指针接收者

当结构体实现接口的方法时，使用：

* 值接收者。实例化结构体实例，无论取值还是指针，都可以传入**以该接口为参数**的函数中
* 指针接收者。实例化结构体实例，只能是指针，才可以传入**以该接口为参数**的函数中

```go
package main

import "fmt"

type Runer interface {
	run()
}

type Dog struct {
}

func (d *Dog) run() {
	fmt.Println("狗跑")
}

type Cat struct {
}

func (c *Cat) run() {
	fmt.Println("猫跑")
}

func MakeRun(r Runer) {
	r.run()
}
func main() {
	MakeRun(&Dog{}) //狗跑

	MakeRun(&Cat{}) //猫跑
  
  MakeRun(Cat{}) //会报错
}
```

### 空接口

定义一个空接口类型（相当任何类型不用实现其方法签名，就能属于空接口类型），能存储任意类型的值

本质就是一个匿名接口，且其中没有任何函数签名

**两个重要应用**

* 当作参数

  `fmt.Println()`为什么能接收所有类型，并打印出来？就是因为其参数是空接口类型

  ```go
  func f(a ...interfer{}){
  	//a是切片
  }
  ```

* 当作map的value

  ```go
  m := make(map[string]interface{}, 10)
  m["姓名"] = "jack"
  m["年龄"] = 18
  m["爱好"] = []string{"唱歌", "跳舞"}
  ```

**接口的零值**

```go
type animal interface {
		run()
}
var a animal
fmt.Print(a == nil)//true
```

**空接口原理**

空接口的内部结构分为两个部分，当存入不同值时，type字段会记录存入值的类型，而value字段就是存入值

![image-20220511232331687](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Go/image-20220511232331687.png)

### 断言判断接口类型

```
value:ok=接口类型的变量.(类型)

//如果猜的类型和实际类型一样，ok为true，value为其值
 
//如果猜的类型和实际类型不一样，ok为false，value为空字符串
```

例子

```go
package main

import "fmt"

type Runer interface {
	run()
}

type Dog struct {
}

func (d Dog) run() {
	fmt.Println("狗跑")
}

func MakeRun(r Runer) {
	value, ok := r.(Runer)
	if ok {
		fmt.Printf("是runner接口类型：%v", value)
		r.run()
	}

}
func main() {
	MakeRun(Dog{}) //是runner接口类型：{}狗跑
}
```

**必须搭配switch的用法**

```go
类型=接口类型的变量.(type)
```

 例子

```go
package main

import "fmt"

func getInterfaceType(n interface{}) {

	switch n.(type) {
	case int:
		fmt.Println("int")
	case string:
		fmt.Println("string")
	default:
		fmt.Println(n)
	}
}
func main() {
	getInterfaceType(1)//int
}
```

### 错误接口

**error的本质**

Go 语言中使用一个名为 `error` 接口来表示错误类型。这个接口只包含一个方法——`Error`，这个函数需要返回一个描述错误信息的字符串

```go
type error interface {
    Error() string
}
```

当一个函数或方法需要返回错误时，我们通常是把错误作为最后一个返回值。例如下面标准库 os 中打开文件的函数。

```go
func Open(name string) (*File, error) {
	return OpenFile(name, O_RDONLY, 0)
}
```

由于 error 是一个接口类型，默认零值为`nil`。所以我们通常将调用函数返回的错误与`nil`进行比较，以此来判断函数是否返回错误。例如你会经常看到类似下面的错误判断代码。

```go
file, err := os.Open("./xx.go")
if err != nil {
	fmt.Println("打开文件失败,err:", err)
	return
}
```

注意：使用`fmt`包打印错误时会自动调用 error 类型的 Error 方法，也就是会打印出错误的描述信息

**自定义error**

* 使用标准库`errors`，自定义错误对象中包含的文本

  ```go
  package main
  
  import (
  	"errors"
  	"fmt"
  )
  
  func option() error {
  	return errors.New("这是一个错误")
  }
  func main() {
  	err := option()
  	fmt.Printf("%v\n", err) //这是一个错误
  }
  ```

* 二次封装错误对象

* 向上面一样使用`fmt.Printf`可以 直接获取错误对象中的文本，但是丢失了错误对象的结构。如果想对一些Go标准库函数返回的错误对象再次包装，成为新的错误对象，应该使用下面的函数

  ```go
  fmt.Errorf("查询数据库失败，err:%w", err) //%w是err对象的位置，返回一个新的错误
  ```

  在option函数返回的error的基础上

  ```go
  err := option()
  newErr := fmt.Errorf("这是再次封装的错误【%w】", err)
  fmt.Printf("%v\n", newErr) //这是再次封装的错误【这是一个错误】
  ```

**错误的判断**

1、使用断言

我们已经知道了错误其实就是一个接口

所以，在程序中出现错误，我们也可以通过断言来判断是否是某种错误，然后做出处理

例子是Viper库中定义的一个错误

```go
if _, ok := err.(viper.ConfigFileNotFoundError); ok {
		//fmt.Printf("找不到配置文件，err:%v\n", err.Error())
		return
} 
```

2、Is方法

判断err是否是target类型的错误

```go
func Is(err, target error) bool
```

```go
if ok:=errors.Is(err,targetError);ok{
   //处理该错误
}
```

注意：err属于ErrorUser的子集，Is也会返回true

```go
var (
	ErrorUser       = errors.New("用户错误")
	ErrorUserUnAuth = fmt.Errorf("%w：用户权限错误", ErrorUser)
)

err := ErrorUserUnAuth
fmt.Printf("%v\n", errors.Is(err, ErrorUser))
fmt.Printf("%v\n", errors.Is(err, ErrorUserUnAuth))
```



## 类型声明总结

主要记忆下：

* 切片、map类型的变量是nil，需要在使用时，通过make创建
* struct类型的变量就是一个空结构体实例

```go
package main

import "fmt"

type Stu struct {
	name string
	age  int
}

func main() {
	//结构体实例、空结构体实例、结构体类型的变量(空结构体实例)、new创建指针变量（相当于空结构体实例的指针）
	p1 := Stu{
		name: "jack",
		age:  14,
	}
	p2 := Stu{}
	var p3 Stu
	p4 := new(Stu)
	fmt.Printf("p1是%#v\n", p1) //p1是main.Stu{name:"jack", age:14}
	fmt.Printf("p2是%#v\n", p2) //p2是main.Stu{name:"", age:0}
	fmt.Printf("p3是%#v\n", p3) //p3是main.Stu{name:"", age:0}
	fmt.Printf("p4是%#v\n", p4) //p4是&main.Stu{name:"", age:0}

	//切片实例、空切片实例、切片类型的变量（等于nil）、new创建指针变量（空切片实例的指针）
	s1 := []int{1, 2, 3}
	s2 := []int{}
	var s3 []int
	s4 := make([]int, 5, 10)
	s5 := new([]int)
	fmt.Printf("s1是%v\n", s1)               //s1是[1 2 3]
	fmt.Printf("s2是%v\n", s2)               //s2是[]
	fmt.Printf("s3是%v，%v\n", s3, s3 == nil) //s3是[]，true
	fmt.Printf("s4是%v\n", s4)               //s4是[0 0 0 0 0]
	fmt.Printf("s5是%v\n", s5)               //s5是&[]

	//map实例、map实例、map类型的变量（等于nil）、new创建指针变量（空map实例指针）
	m1 := map[string]string{
		"name": "tom",
	}
	m2 := map[string]string{}
	var m3 map[string]string
	m4 := make([]int, 5)
	m5 := new(map[string]string)
	fmt.Printf("m1是%v\n", m1)               //m1是map[name:tom]
	fmt.Printf("m2是%v\n", m2)               //m2是map[]
	fmt.Printf("m3是%v，%v\n", m3, m3 == nil) //m3是map[]，true
	fmt.Printf("m4是%v\n", m4)               //m4是[0 0 0 0 0]
	fmt.Printf("m5是%v\n", m5)               //m5是&map[]

}
```

另外，函数的入参、反参中的指针类型变量是nil，必须通过上面的方式之一指定

```go
package main

import "fmt"

type User struct {
	Name string
	Age  int
}

func getRes2() (u *User) {
	//u = new(User) //需要初始化才能有User的结构
	getRes1(u)
	return
}
func getRes1(u *User) {
	fmt.Printf("%#v\n", u)
}


func main() {
	getRes2() //(*main.User)(nil)

}
```



## 反射

需要使用reflect标准库

### 基本使用

**获取任意值的类型对象（reflect.Type）**

reflect.Type类型的Name和Kind方法

```go
func(i any) Name()string  //返回类型名

func(i any) Kind() Kind   //返回类型的Kind （一般使用Kind）
```

Go中定义的Kind类型的常量

```go
type Kind uint
const (
    Invalid Kind = iota  // 非法类型
    Bool                 // 布尔型
    Int                  // 有符号整型
    Int8                 // 有符号8位整型
    Int16                // 有符号16位整型
    Int32                // 有符号32位整型
    Int64                // 有符号64位整型
    Uint                 // 无符号整型
    Uint8                // 无符号8位整型
    Uint16               // 无符号16位整型
    Uint32               // 无符号32位整型
    Uint64               // 无符号64位整型
    Uintptr              // 指针
    Float32              // 单精度浮点数
    Float64              // 双精度浮点数
    Complex64            // 64位复数类型
    Complex128           // 128位复数类型
    Array                // 数组
    Chan                 // 通道
    Func                 // 函数
    Interface            // 接口
    Map                  // 映射
    Ptr                  // 指针
    Slice                // 切片
    String               // 字符串
    Struct               // 结构体
    UnsafePointer        // 底层指针
)
```

【注意】Go语言的反射中像数组、切片、Map、指针等类型的变量的Name()都是返回空

例子

```go
package main

import (
	"fmt"
	"reflect"
)

type Stu struct {
	name       string
	age, score int
	hobby      []string
}

func (s *Stu) run() {
	fmt.Println("学生跑步")
}
func main() {
	s := Stu{
		name:  "jack",
		age:   18,
		score: 100,
		hobby: []string{"唱歌", "学习"},
	}
	//任意值的类型对象（reflect.Type）
	t := reflect.TypeOf(s)
	fmt.Printf("%v\n", t) //main.Stu
	//方法Name返回名字，方法Kind返回类型
	fmt.Printf("%v-----%v\n", t.Name(), t.Kind()) //Stu-----struct

}
```



**获取任意值的值对象（reflect.Value）**

方法

* reflect.Value类型可与原始值之间可以互相转换，通过方法Int()、Float()等

  | 方法                     | 描述                                                         |
  | ------------------------ | ------------------------------------------------------------ |
  | interface() interface {} | 将值以 interface{} 类型返回，可以通过类型断言转换为指定类型  |
  | Int() int64              | 将值以 int 类型返回，所有有符号整型均可以此方式返回          |
  | Uint() uint64            | 将值以 uint 类型返回，所有无符号整型均可以此方式返回         |
  | Float() float64          | 将值以双精度（float64）类型返回，所有浮点数（float32、float64）均可以此方式返回 |
  | Bool() bool              | 将值以 bool 类型返回                                         |
  | Bytes() []bytes          | 将值以字节数组 []bytes 类型返回                              |
  | String() string          | 将值以字符串类型返回                                         |

* 方法Elem，用于获取 `reflext.Ptr`类型（通过指针类型）对应的值

  v持有的值必须是指针，否则调用会导致panic

  一般写成一个参数是空接口的函数，可以接收任何值

  ```go
  //获取到reflect.Value类型的v后
  package main
  
  import (
  	"fmt"
  	"reflect"
  )
  
  type Stu struct {
  	name  string  
  	age   int      
  	score int      
  	hobby []string 
  }
  
  func reflectSetValue(x interface{}) {
  	v := reflect.ValueOf(x)
  	// 反射中使用 Elem()方法获取指针对应的值
  	if v.Elem().Kind() == reflect.Int64 {
  		v.Elem().SetInt(200) //指针才能设置传入变量的值
  	}
  }
  func main() {
  	var a int64 = 100
  	reflectSetValue(&a) //传入的也是指针
  	fmt.Printf("%v\n", a)
  }
  ```

  如果想要调用`Set*`来转换值，必须得提前知道类型，才能使用对应的方法转换

  | 方法                | 描述                                                         |
  | ------------------- | ------------------------------------------------------------ |
  | Set(x Value)        | 将值设置为传入的反射值对象的值                               |
  | Setlnt(x int64)     | 使用 int64 设置值。当值的类型不是 int、int8、int16、 int32、int64 时会发生宕机 |
  | SetUint(x uint64)   | 使用 uint64 设置值。当值的类型不是 uint、uint8、uint16、uint32、uint64 时会发生宕机 |
  | SetFloat(x float64) | 使用 float64 设置值。当值的类型不是 float32、float64 时会发生宕机 |
  | SetBool(x bool)     | 使用 bool 设置值。当值的类型不是 bod 时会发生宕机            |
  | SetBytes(x []byte)  | 设置字节数组 []bytes值。当值的类型不是 []byte 时会发生宕机   |
  | SetString(x string) | 设置字符串值。当值的类型不是 string 时会发生宕机             |

* 方法Kind，与reflect.Type的Kind相同。(注意：reflect.Value没Name方法)

* 方法IsNil常被用于判断指针是否为空，返回布尔值

  v持有的值的分类必须是通道、函数、接口、映射、指针、切片之一,否则会导致panic【这几种类型的零值是nil】

* IsValid常被用于判定返回值是否有效，返回布尔值

  如果v是Value的零值会返回假，这时候只有IsValid、String、Kind的方法能调用，其他方法都会导致panic【可类比JS中的null对象，如果调用方法就会报错】

  ```go
  //方法会在后面提到
  reflect.ValueOf(b).FieldByName("abc").IsValid()
  reflect.ValueOf(b).MethodByName("abc").IsValid()
  reflect.ValueOf(c).MapIndex(reflect.ValueOf("娜扎")).IsValid()
  ```

例子

```go
package main

import (
	"fmt"
	"reflect"
)

type Stu struct {
	name       string
	age, score int
	hobby      []string
}

func (s *Stu) run() {
	fmt.Println("学生跑步")
}
func main() {
	s := Stu{
		name:  "jack",
		age:   18,
		score: 100,
		hobby: []string{"唱歌", "学习"},
	}

	v := reflect.ValueOf(s)
	fmt.Printf("%+v\n", v) //{name:jack age:18 score:100 hobby:[唱歌 学习]}
	
	//方法Kind返回类型
	fmt.Printf("%v\n", v.Kind()) //struct
}
```

### 结构体补充

**reflect.Value**还有一些方法，能够帮助我们读取结构体信息

|                            方法                             |                             说明                             |
| :---------------------------------------------------------: | :----------------------------------------------------------: |
|                        **通用字段**                         |                                                              |
|                       NumField() int                        |          返回结构体成员字段数量【可以使用for遍历】           |
|                  Field(i int) StructField                   |           根据索引，返回索引对应的结构体字段的信息           |
|        FieldByName(name string) (StructField, bool)         |       根据给定字符串返回字符串对应的结构体字段的信息。       |
|            FieldByIndex(index []int) StructField            | 多层成员访问时，根据 []int 提供的每个结构体的字段索引，返回字段的信息 |
|                          **函数**                           |                                                              |
|                       NumMethod() int                       |                返回该类型的方法集中方法的数目                |
|                     Method(int) Method                      |                返回该类型方法集中的第i个方法                 |
| FieldByNameFunc(match func(string) bool) (StructField,bool) |               根据传入的匹配函数匹配需要的字段               |
|             MethodByName(string)(Method, bool)              |              根据方法名返回该类型方法集中的方法              |

返回的StructField类型的组成：

```go
type StructField struct {
    Name    string //Name是字段的名字
    PkgPath string //PkgPath是非导出字段的包路径，对导出字段该字段为""
    Type      Type      // 字段的类型
    Tag       StructTag // 字段的标签
    Offset    uintptr   // 字段在结构体中的字节偏移量
    Index     []int     // 用于Type.FieldByIndex时的索引切片
    Anonymous bool      // 是否匿名字段
}
```

返回的Method类型的组成

```go
type Method struct {
    Name    string
    PkgPath string
    Type    Type
    Func    Value
    Index   int
}
```



读取结构体最常用的思路就是获取字段/方法个数，然后遍历，把索引传给Field、Method，获取对应值和方法

**通用字段**

补充下：下面t.Field(i)的tag属性，返回的是该字段的所有的tag，`field.Tag.Get(json)`只返回json后的字段

```go
package main

import (
	"fmt"
	"reflect"
)

type Stu struct {
	name  string   `json:"stuName"`
	age   int      `json:"stuAge"`
	score int      `json:"stuScore"`
	hobby []string `json:"stuHobby"`
}

func (s *Stu) run() {
	fmt.Println("学生跑步")
}
func main() {
	s := Stu{
		name:  "jack",
		age:   18,
		score: 100,
		hobby: []string{"唱歌", "学习"},
	}
	t := reflect.TypeOf(s)
	for i := 0; i < t.NumField(); i++ {
		field := t.Field(i) //field是 StructField 类型
		fmt.Printf("name:%v ,type:%v -- tag: %v -- PkgPath:%v -- Offset:%v -- Anonymous:%v\n", field.Name, field.Type, field.Tag, field.PkgPath, field.Offset, field.Anonymous)
	}
	//name:name ,type:string -- tag: json:"stuName" -- PkgPath:main -- Offset:0 -- Anonymous:false
	//name:age ,type:int -- tag: json:"stuAge" -- PkgPath:main -- Offset:16 -- Anonymous:false
	//name:score ,type:int -- tag: json:"stuScore" -- PkgPath:main -- Offset:24 -- Anonymous:false
	//name:hobby ,type:[]string -- tag: json:"stuHobby" -- PkgPath:main -- Offset:32 -- Anonymous:false

}
```

**方法**

注意想要调用Method，需要使用的是reflect.Value的Call方法

方法首字母必须大写，否则NumMethod获取不到这个方法

```go
package main

import (
	"fmt"
	"reflect"
)

type Stu struct {
	name  string   `json:"stuName"`
	age   int      `json:"stuAge"`
	score int      `json:"stuScore"`
	hobby []string `json:"stuHobby"`
}

func (s Stu) Run() {
	fmt.Println("学生跑步")
}

func (s Stu) Study() {
	fmt.Println("学生学习")
}
func main() {
	s := Stu{
		name:  "jack",
		age:   18,
		score: 100,
		hobby: []string{"唱歌", "学习"},
	}

	t := reflect.TypeOf(s)
	fmt.Printf("%v\n", t.NumMethod()) //2
	for i := 0; i < t.NumMethod(); i++ {
		typeField := t.Method(i) //field是 StructField 类
		fmt.Printf("name:%v -- type:%v -- PkgPath:%v -- Index:%v -- Func:%v\n", typeField.Name, typeField.Type, typeField.PkgPath, typeField.Index, typeField.Func)
	}
	//name:Run -- type:func(main.Stu) -- PkgPath: -- Index:0 -- Func:0x10bb500
	//name:Study -- type:func(main.Stu) -- PkgPath: -- Index:1 -- Func:0x10bb5e0

	v := reflect.ValueOf(s)
	fmt.Printf("%v\n", v.NumMethod()) //2
	for i := 0; i < v.NumMethod(); i++ {
		valueField := v.Method(i)
		var args []reflect.Value //Call的参数必须是reflect.Value的切片，这里不用参数所以传个空的
		valueField.Call(args)     //Call必须要传入，如果没有参数，出入空的切片
	}
	//学生跑步
	//学生学习
}

```

### 反射的缺点

1. 基于反射的代码是极其脆弱的，反射中的类型错误在运行前不会被检查，在真正运行的时候可能引发panic
2. 大量使用反射的代码通常难以理解
3. 反射的性能低下，基于反射实现的代码通常比正常代码运行速度慢一到两个数量级

## 并发编程

### 并发基础

这里的很多内容，其实都是《计算机操作系统》这门课程中的内容

**并发概念**

进程（process）：操作系统进行资源分配和调度的一个独立单位

线程（thread）：操作系统基于进程开启的轻量级进程，一个进程里至少有一个线程，线程是操作系统调度执行的最小单位

协程（coroutine）：非操作系统提供而是由用户自行创建和控制的用户态‘线程’，比线程更轻量级

**系统进程通讯**

![image-20220512232008079](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Go/image-20220512232008079.png)



### Go中的线程

即goroutine，是语言级别实现的用户级别线程，开发者操作Go语言中的线程，Go语言底层再去调用系统的线程库，实现多线程。所以，Go线程的切换不需要系统内核调度，而是由Go运行时（runtime）负责调度

Go语言中的并发程序主要是通过基于CSP（communicating sequential processes，一种线程模型），也就是**管道通讯**的方式，使用Go语言中的goroutine和channel来实现，当然也支持使用传统的多线程共享内存的并发方式

### goroutine

一个goroutine一般只需要2KB大小，所以，在Go程序中同时创建成百上千个goroutine是非常普遍的

调度goroutine的Go语言运行时，会智能地将 m个goroutine 合理地分配给n个操作系统线程

goroutine 是 Go 程序中最基本的并发执行单元。每一个 Go 程序都至少包含一个 goroutine，即main goroutine（用来执行主函数main），当 Go 程序启动时它会自动创建

在Go语言编程中，你不需要去自己写进程、线程、协程，你只需要创建一个goroutine。比如，当你需要让某个任务并发执行的时候，你只需要把这个任务包装成一个函数，开启一个 goroutine 去执行这个函数就可以了，就是这么简单粗暴，至于如何调度由Go runtime负责

**线程和goroutine**

操作系统线程与goroutine是多对多的关系

* 一个操作系统线程对应多个goroutine
* 多个goroutine可能被Go runtime分配到多个操作系统线程运行

**开启goroutine**

* 使用go关键字，去执行函数，就会创建一个goroutine（由Go runtime调度何时启动）

* main运行后，会开启一个mian-goroutine。使用go关键创建的sayHello进程是子goroutine。如果main-goroutine结束，子goroutine直接被销毁。为了保证子进程结束后，主进程才能结束，就需要使用sync.WaitGroup这个类型

* 同时存在多个goroutine，如果`GOMAXPROCS=1`（设置只用一个系统线程，运行多个goroutine），则能看到一个goroutine执行完后，另一个goroutine才会执行。但是，Go默认使用CPU核数作为GOMAXPROCS的值，所以，实际上可以最多GOMAXPROCS个goroutine同时执行
* 同时存在多个goroutine，goroutine执行顺序不是创建顺序

进程执行了，就会执行完，再切换另一个进程

```go
package main

import (
	"fmt"
	"sync"
)

var wg sync.WaitGroup

func sayHello(i int) {
	fmt.Printf("sayHello执行%d\n", i)
	wg.Done() //消耗一个进程
}
func main() {
	fmt.Println("你好")

	for i := 0; i < 10; i++ {
		wg.Add(1) //进程数加1，需要在go启动进程前
		go sayHello(i)
	}
	wg.Wait() //主进程被阻塞，需要等待进程全部消耗完，主进程才能结束
}

//你好
//sayHello执行0
//sayHello执行6
//sayHello执行5
//sayHello执行9
//sayHello执行3
//sayHello执行1
//sayHello执行2
//sayHello执行7
//sayHello执行8
//sayHello执行4
```

**注意这种情况**

前面是将i（0到9）传入函数

这里是运行起来线程后，再向上级作用域找i，这时候i不一定是几了

```go
package main

import (
	"fmt"
	"sync"
)

var wg sync.WaitGroup

func main() {
	fmt.Println("你好")

	for i := 0; i < 10; i++ {
		wg.Add(1)
		go func() {
			fmt.Printf("sayHello执行%d\n", i)
			wg.Done()
		}()
	}
	wg.Wait()
}

//你好
//sayHello执行8
//sayHello执行10
//sayHello执行10
//sayHello执行10
//sayHello执行10
//sayHello执行10
//sayHello执行10
//sayHello执行10
//sayHello执行10
//sayHello执行10

```

可以将i（0到9）共10值传进去

```go
package main

import (
	"fmt"
	"sync"
)

var wg sync.WaitGroup

func main() {
	fmt.Println("你好")

	for i := 0; i < 10; i++ {
		wg.Add(1)
		go func(i int) {
			fmt.Printf("sayHello执行%d\n", i)
			wg.Done()
		}(i)
	}
	wg.Wait()
}
```

**操作系统线程数**

Go运行时的调度器使用`GOMAXPROCS`参数来确定需要使用多少个系统线程来同时执行 Go 代码

默认值是机器上的 CPU 核心数。例如在一个 8 核心的机器上，GOMAXPROCS 默认为 8。Go语言中可以通过`runtime.GOMAXPROCS`函数设置当前程序并发时占用的 CPU逻辑核心数。（Go1.5版本之前，默认使用的是单核心执行。Go1.5 版本之后，默认使用全部的CPU 逻辑核心数。）



```go
package main

import (
	"fmt"
	"sync"
)

var wg sync.WaitGroup

func a() {
	for i := 0; i < 100; i++ {
		fmt.Printf("a:%d   ", i)
	}
	fmt.Println()
	wg.Done()
}
func b() {
	for i := 0; i < 100; i++ {
		fmt.Printf("b:%d   ", i)
	}
	fmt.Println()
	wg.Done()
}
func main() {
	wg.Add(2)
	go a()
	go b()
	wg.Wait()
}
```

以上代码中，a和b的打印交替出现

在main函数第一行加上

```
runtime.GOMAXPROCS(1)
```

则，会发现打印结果是 ***a打印完了再打印b*** 或者 ***b打印完了再打印a***，因为只有一个操作系统线程，goroutine只能执行完一个，在执行下一个

### channel类型

**为什么需要通讯**

实际业务中我们往往是使用多个goroutine合作去完成一个任务，这就需要goroutine之间进行通讯

* **共享内存**这种通讯方式，由于多个的 goroutine 会同时争抢同一空间，为了保证数据交换的正确性，很多并发模型中必须使用互斥量对内存进行加锁，这种做法势必造成性能问题
* Go语言采用的并发模型是`CSP（Communicating Sequential Processes）`，提倡**通过通信共享内存**，每次对channel的操作都是原子操作



**使用channel实现通讯**

channel是可以让一个 goroutine 发送特定值到另一个 goroutine ，从而使得两个独立的goroutine可以通信

Go 语言中的通道（channel）是一种**引用**类型。通道像一个传送带或者队列，总是遵循先入先出的规则，保证收发数据的顺序。每一个通道内部元素必须制定具体类型，也就是声明channel的时候需要为其指定元素类型



**声明channel类型**

channel是引用类型，默认零值为nil，需要使用make初始化空间，才能使用

```
var ch chan int //定义channel变量，channel内部元素为int
```

**初始化空间**

channel容量确定后不可更改

```go
ch:=make(chan int，10) //第二个参数是通道容量
```

**造成死锁**

* 当一个goroutine给一个通道发送数据时，如果通道满了，就会发生阻塞，等待通道有空位
* 当一个goroutine等着从一个信道接受数据时，如果通道为空，就会发生阻塞，等待通道有数据



所以一个典型的错误就是，初始化通道时，未指定容量。同时有一个goroutine想要读取和一个goroutine想要写入，两个goroutine都会被阻塞，所以会触发死锁



所以，channel能够限制两个goroutine执行的顺序

![image-20220513222034807](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Go/image-20220513222034807.png)

**写**

将数据写入管道

```go
ch<-10  //将10发送到通道
```

**读**

将数据从通道读出来，一旦读出该数据，数据就被移出管道了

```go
<-ch  //发送出去，但是不接收

x:<-ch //接收数据

```

**关闭通道**

通道值是可以被垃圾回收掉的。通道通常由发送方执行关闭操作，并且只有在接收方明确等待通道关闭的信号时才需要执行关闭操作。它和关闭文件不一样，通常在结束操作之后关闭文件是必须要做的，但关闭通道不是必须的

```go
close(ch)
```

关闭后的通道有以下特点：

1. 对一个关闭的通道再发送值就会导致 panic。
2. 对一个关闭的通道进行接收会一直获取值直到通道为空。
3. 对一个关闭的并且没有值的通道执行接收操作会得到对应类型的零值。
4. 关闭一个已经关闭的通道会导致 panic。【注意：目前Go语言中并没有提供一个不对通道进行读取操作就能判断通道是否被关闭的方法】

**遍历通道**

两种方式，都需要在通道已经关闭的情况下，遍历管道内容。否则，遍历时将所有元素取出后，仍然会阻塞等待其他goroutione写入数据，可是这时候已经没有其他goroutione写入了，所以就会提示出现死锁

如果写入完关闭管道，这两种方式都能检测到关闭的通道

方式一：读取到管道为空时，ok变会为false，x为元素类型对应的零值

```go
for {
	x, ok := <-ch1
	if !ok {
		fmt.Println("channel读取完毕") 
		break
	}
	ch2 <- x * 2
}
```

方式二：读取到管道为空时，自动停止

```go
for item := range ch2 {
	fmt.Println(item)
}
```



例子

下面这个例子，实际上会被分配给多个操作系统线程（GOMAXPROCS肯定不为1，毕竟很少见到1核的CPU了），两个进程同时对ch1进行读写，但是不要担心，***如果ch1空了，读goroutine就会阻塞等待；如果ch1满了，写goroutine就会阻塞等待；***

注意：这里为什么不再使用sync.WaitGroup来阻塞main goroutine退出？因为main函数中有读通道的操作，所以产生了阻塞，for range只有读到管道关闭，才会结束

```go
package main

import (
	"fmt"
)

//向管道内存数据
func f1(ch chan int) {
	for i := 0; i < 10; i++ {
		ch <- i
	}
	close(ch)
}

//从管道读数据，把数据*2后放入另一个管道
func f2(ch1 chan int, ch2 chan int) {
	//取出channel中的值
	for {
		x, ok := <-ch1  //方式1
		if !ok {
			fmt.Println("channel读取完毕")
			break
		}
		ch2 <- x*2
	}
	close(ch2)
}

func main() {
	ch1 := make(chan int, 100)
	ch2 := make(chan int, 100)

	go f1(ch1)
	go f2(ch1, ch2)

	for item := range ch2 { //方式2
		fmt.Println(item)
	}

}
```

**管道类型作为参数**

限制传入的通道，只能写

```go
func f1(ch1 chan<- int, ch2 chan int){
  
}
```

限制传入的通道，只能读

```go
func f2(ch1 <-chan int, ch2 chan int){

}
```

**并非n个任务就要启动n个goroutine**

```text
1个通道中有10个任务（ch1）

现在有3个goroutine处理任务，在每个任务里循环的去读ch1处理(for range在发现管道了没有数据了，就停了。实际上ch1没有了)
```

```go
package main

import (
	"fmt"
	"sync"
)

func f1(i int, taskList <-chan int) {
	for task := range taskList {
		fmt.Printf("第%d个线程，完成任务%d\n", i, task)
	}
	wg.Done()

}

var wg sync.WaitGroup

func main() {

	taskList := make(chan int, 10)
	//写入10个任务,并关闭通道
	for i := 0; i < 10; i++ {
		taskList <- i
	}
	close(taskList)

	//创建3个人来处理任务
	for j := 0; j < 3; j++ {
		wg.Add(1)
		go f1(j, taskList)
	}
	wg.Wait()
}
```



**多路复用**

如果多个 case 同时满足，select 会**随机**选择一个执行。全不满足，则走默认

```go
select {
  case data:=<-ch1: //ch1	可读取
	//操作
	case data := <-ch2: //ch2	可读取
	//操作
  case data:=ch3 <- 10: //ch3	可读取
	//操作
	default:
	//默认操作
}
```

假设场景：

可处理多个 channel 的读操作

```text
我们向3个通道中写数据(ch1、ch2、ch3)

现在有1个进程读数据并处理

我们就需要使用select来控制，3个通道哪个有数据就读哪个，如果3个通道中都有数据，就随机选择一个读取数据
```

```go
select {
  case data:=<-ch1: //ch1	可读取
	//操作
	case data := <-ch2: //ch2	可读取
	//操作
  case data:=<-ch3: //ch3	可读取
	//操作
	default:
	//默认操作
}
```



### 同步加锁

多个goroutine对同一个数据进行操作，例如下面例子中的`x=x+1`，首先需要明确一个概念，这个赋值语句并不是原子操作

可能存在这样一种情况：一个goroutine读取x为1，执行加1结果是2，同时刻另一个goroutine（在另一个系统线程上运行），也读取了x为1，执行加1结果是2。这时候两个goroutine先后将2赋值给x，所以最后的结果是2。这已经出现明显的错误了，应该是3

所以，我们需要进行加锁操作

**互斥锁**

某个goroutine一旦对资源加了互斥锁，其他goroutine都不能对资源进行读和写

```go
package main

import (
	"fmt"
	"sync"
	"time"
)

var (
	x    int
	Lock sync.Mutex
	wg   sync.WaitGroup
)

func read() {
	Lock.Lock()
	time.Sleep(1 * time.Second)
	Lock.Unlock()
	wg.Done()
}
func write() {
	Lock.Lock()
	x = x + 1
	Lock.Unlock()
	wg.Done()
}

func main() {
	start := time.Now()

	for i := 0; i < 10; i++ {//十个进程读
		wg.Add(1)
		go read()
	}
	wg.Add(1)
	go write() //一个进程写
	wg.Wait()
	fmt.Println(time.Now().Sub(start)) //10.007944749s

}
```

**读/写锁**

某个goroutine对资源加读锁，该goroutine只能读资源，不能写资源，其他goroutine也只能读

某个goroutine对资源加写锁，该goroutine对资源可读可写，其他goroutine不能读不能写

如果使用场景中，读的次数比较多，那推荐使用读写锁。如果读写次数相差不多，那就使用互斥锁

可以看到使用读写锁，时间只用了2s多

```go
package main

import (
	"fmt"
	"sync"
	"time"
)

var (
	x      int
	RWLock sync.RWMutex
	wg     sync.WaitGroup
)

func read() {
	RWLock.RLock()
	time.Sleep(1 * time.Second)
	RWLock.RUnlock()
	wg.Done()
}
func write() {
	RWLock.Lock()
	x = x + 1
	RWLock.Unlock()
	wg.Done()
}

func main() {
	start := time.Now()

	for i := 0; i < 10; i++ {
		wg.Add(1)
		go read()
	}
	wg.Add(1)
	go write()
	wg.Wait()
	fmt.Println(time.Now().Sub(start)) //2.002323119s
}
```

### 并发安全

**sync.Once**

在某些场景下我们需要确保某些操作即使在高并发的场景下也只会被执行一次，例如只加载一次配置文件等。第一次Do中的函数f会执行，第二次就不会执行了

```go
func (o *Once) Do(f func()) //提醒下，sync.xxx都是结构体类型，Do是sync.Once的方法
```

延迟一个开销很大的初始化操作到真正用到它的时候再执行，是一个很好的实践。因为预先初始化一个变量会增加程序的启动耗时，而且还有可能实际执行过程中这个变量没有用上

例子

```go
var icons map[string]image.Image

var loadIconsOnce sync.Once

func loadIcons() {
	icons = map[string]image.Image{
		"left":  loadIcon("left.png"),
		"up":    loadIcon("up.png"),
		"right": loadIcon("right.png"),
		"down":  loadIcon("down.png"),
	}
}

// Icon 是并发安全的
func Icon(name string) image.Image {
	loadIconsOnce.Do(loadIcons)//创建的多个goroutine，只有一个会完成初始化的操作
	return icons[name]
}
```

**sync.Map**

Go 语言中内置的 map 不是并发安全的，如果在多个goroutine中读写map类型的变量，会报错

```text
fatal error: concurrent map writes
```

所以在启用多个goroutine的函数中应该使用sync.Map类型

该类型提供了一下方法

|                            方法名                            |                       功能                       |
| :----------------------------------------------------------: | :----------------------------------------------: |
|          Store(key  interface{}, value interface{})          |                存储key-value数据                 |
|      Load(key interface{}) (value interface{}, ok bool)      |                查询key对应的value                |
|                   Delete(key interface{})                    |                     删除key                      |
|                                                              |                                                  |
| LoadOrStore(key, value interface{}) (actual interface{}, loaded bool) |   查询key对应的value，如果没有则存储key-value    |
| LoadAndDelete(key interface{}) (value interface{}, loaded bool) |                  查询并删除key                   |
|          Range(f func(key, value interface{}) bool)          | 对map中的每个key-value依次调用f（看成是遍历Map） |

```go
package main

import (
	"fmt"
	"sync"
)

var wg sync.WaitGroup

func main() {
	var syncMap = sync.Map{}

	for i := 0; i < 10; i++ {
		wg.Add(1)
		go func(key, value int) {
			syncMap.Store(key, value)
			wg.Done()
		}(i, i)
	}
	wg.Wait()
	syncMap.Range(func(key, value interface{}) bool {
		fmt.Printf("%d:%d\n", key, value)
		return true
	})
	//0:0
	//1:1
	//2:2
	//3:3
	//4:4
	//5:5
	//7:7
	//9:9
	//6:6
	//8:
}
```

**sync/atomic库**

类似于sync库中的Map，sync/atomic库中的（int32、uint32、int64、uint64）对于基础类型中（int32、uint32、int64、uint64）实现了并发安全的操作。并且提供了一系列函数对这些类型进行操作

当然，我们也可以不使用这些并发安全的类型，而是使用前面的加锁的方式处理

## 测试（待学习）

测试中涉及一些，我并不了解的知识，所以放在最后学习

[单元测试从零到溜系列——第0篇：单元测试基础](https://www.liwenzhou.com/posts/Go/golang-unit-test-0/)

[单元测试从零到溜系列——第1篇：网络测试](https://www.liwenzhou.com/posts/Go/golang-unit-test-1/)

[单元测试从零到溜系列——第2篇：MySQL和Redis测试](https://www.liwenzhou.com/posts/Go/golang-unit-test-2/)

[单元测试从零到溜系列——第3篇：mock接口测试](https://www.liwenzhou.com/posts/Go/golang-unit-test-3/)

[单元测试从零到溜系列——第4篇：monkey打桩测试](https://www.liwenzhou.com/posts/Go/golang-unit-test-4/)

[单元测试从零到溜系列——第5篇：goconvey的使用](https://www.liwenzhou.com/posts/Go/golang-unit-test-5/)

[单元测试从零到溜系列——第6篇：编写可测试的代码](https://www.liwenzhou.com/posts/Go/golang-unit-test-6/)

## 网络编程

这里的很多内容，其实都是《计算机网络》这门课程中的内容

这篇[文章](https://www.liwenzhou.com/posts/Go/15_socket/)的开篇部分，对计算机网络基础做了概述

[代码仓库地址](https://gitee.com/hyj1270433876/GoProjectByHDD/tree/master/TCP)

### TCP

服务端

```go
//server.go
package main

import (
	"bufio"
	"fmt"
	"net"
	"sync"
)

func process(conn net.Conn) {
	defer conn.Close()
	for {
    reader := bufio.NewReader(conn) //接收连接的内容，也可以不用bufio，而是直接使用conn.Read([]byte)
		var buf [1000]byte

		n, err := reader.Read(buf[:])
		if err != nil {
			fmt.Printf("读取失败%v\n", err)
			continue
		}
		fmt.Printf("接收到：%s\n", string(buf[:n]))
		conn.Write([]byte("服务端已收到")) //写入连接内容
	}

	wg.Done()
}

var wg sync.WaitGroup

func main() {
	// 1. 监听端口
	listener, err := net.Listen("tcp", "127.0.0.1:9090")
	if err != nil {
		fmt.Printf("监听失败,%v\n", err)
		return
	}
  defer listener.Close()
	// 2. 循环监听建立的连接
	for {
		conn, err := listener.Accept()
		if err != nil {
			fmt.Printf("监听连接失败%v\n", err)
			continue
		}
		// 3. 处理连接
		wg.Add(1)
		go process(conn)
	}
	wg.Wait()
}

```

客户端

```go
//client
package main

import (
	"bufio"
	"fmt"
	"net"
	"os"
	"strings"
)

func main() {
	conn, err := net.Dial("tcp", "127.0.0.1:9090")
	defer conn.Close()
	if err != nil {
		fmt.Printf("连接服务器失败%v\n", err)
		return
	}
	input := bufio.NewReader(os.Stdin)
	for {

		str, err := input.ReadString('\n')
		if err != nil {
			fmt.Println("读取输入有误")
			return
		}
		dealStr := strings.Trim(str, "\r\n") //去除输入中的\r\n
		if strings.ToLower(dealStr) == "q" { //是q，则退出
			return
		}
		//发送数据
		n, err := conn.Write([]byte(dealStr))
		if err != nil {
			fmt.Printf("发送失败:%v\n", err)
			return
		}

		//接收数据
		buf := [1000]byte{}
		n, err = conn.Read(buf[:])
		if err != nil {
			fmt.Printf("接收失败%v\n", err)
			return
		}
		fmt.Println(string(buf[:n]))
	}

}
```

### UDP

与TCP不同，UDP不必使用Accept接收到TCP连接，UDP可以直接从Listener读取信息

服务端

```go
package main

import (
	"fmt"
	"net"
)

func main() {
	// 1. 监听端口
	udpConn, err := net.ListenUDP("udp", &net.UDPAddr{ //server端监听端口信息
		IP:   net.IPv4(127, 0, 0, 1),
		Port: 9090,
	})
	if err != nil {
		fmt.Printf("监听失败,%v\n", err)
		return
	}
	for {
		var data [1024]byte                          //数组
		n, addr, err := udpConn.ReadFromUDP(data[:]) //参数是slice，addr是client端地址
		if err != nil {
			fmt.Printf("读取失败:%v\n", err)
			continue
		}
		fmt.Printf("接收到：%v---%v\n", string(data[:n]), addr)

		_, err = udpConn.WriteToUDP([]byte("服务端收到"), addr)
		if err != nil {
			fmt.Printf("发送失败:%v\n", err)
			continue
		}

	}

}
```

客户端

```go
package main

import (
	"bufio"
	"fmt"
	"net"
	"os"
)

func main() {
	remoteAddr := net.UDPAddr{
		IP:   net.IPv4(127, 0, 0, 1),
		Port: 9090,
	}
	udpConn, err := net.DialUDP("udp", nil, &remoteAddr) //第二个参数是本地地址（如果传入nil就默认本机地址），第三个参数是远程地址
	defer udpConn.Close()
	if err != nil {
		fmt.Println("连接服务端失败，err:", err)
		return
	}
	for {
		inputStr := bufio.NewReader(os.Stdin)
		var buf [1000]byte
		n, err := inputStr.Read(buf[:])
		if err != nil {
			fmt.Printf("读取失败：%v", err)
			continue
		}
		_, err = udpConn.Write(buf[:n]) //发送数据 ,这里不能使用WriteToUDP
		if err != nil {
			fmt.Printf("发送失败：%v", err)
			continue
		}

		n, _, err = udpConn.ReadFromUDP(buf[:]) //读数据
		if err != nil {
			fmt.Printf("接收数据失败：%v", err)
			continue
		}
		fmt.Printf("接收到：%v\n", string(buf[:n]))
	}

}
```

### Http服务

默认的Http服务，访问`http://localhost:8000/hi`会看到文字**"你好"**

```go
package main

import (
	"fmt"
	"net/http"
)

func main() {
  //向默认的DefaultServeMux处理器中，添加路由处理 
	http.HandleFunc("/hi", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "<h1>你好</h1>") //向response中写入，文本
	})
  
  //启动默认服务：监听8000端口，DefaultServeMux作为处理器
	err := http.ListenAndServe(":8000", nil) //第二个参数为nil，表示采用包变量DefaultServeMux作为处理器
	if err != nil {
		fmt.Printf("监听出错:%v", err)
	}
}

```

自定义Http服务

其实默认Http服务中的`http.ListenAndServe(":8000", nil)`等价于

```go
customServe := &http.Server{
		Addr:           ":8000",
		Handler:        nil,
}
```

```go
package main

import (
	"fmt"
	"net/http"
	"time"
)

type httpServer struct {
}

func (server httpServer) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	fmt.Println("服务器启动")
}
func main() {
	//向默认的DefaultServeMux处理器中，添加路由处理
	http.HandleFunc("/hi", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "<h1>你好</h1>") //向response中写入，文本
	})

  //启动默认服务：配置信息就是下面http.Serve实例
	customServe := &http.Server{
		Addr:           ":8000",
		Handler:        nil,//参数为nil，表示采用包变量DefaultServeMux作为处理器
		ReadTimeout:    10 * time.Second,
		WriteTimeout:   10 * time.Second,
		MaxHeaderBytes: 1 << 20,
	}
	err := customServe.ListenAndServe() //第二个参数为nil，表示采用包变量DefaultServeMux作为处理器
	if err != nil {
		fmt.Printf("监听出错:%v", err)
	}
}
```

**核心理解**

在 http 包中

所有的 HTTP 请求都需要经过HandleFunc处理，第二个参数是自定义的handler处理对应的url。其源码显示，实际调用的是DefaultServeMux（默认处理器）的HandleFunc处理

```go
func HandleFunc(pattern string, handler func(ResponseWriter, *Request)) {
	DefaultServeMux.HandleFunc(pattern, handler)
}
```

```go
func (mux *ServeMux) HandleFunc(pattern string, handler func(ResponseWriter, *Request)) {
	if handler == nil {
		panic("http: nil handler")
	}
	mux.Handle(pattern, HandlerFunc(handler))
}
```

ServeMux 实现了 Handler 接口，DefaultServeMux是默认的ServeMux实例

```go
type Handler interface {
    ServeHTTP(ResponseWriter, *Request)
}
```



**Get请求**

客户端使用Go发起Get请求

```go
package myGet

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"net/url"
)

func SendGetRequest(path string, m map[string]string) {
	//添加参数
	var data = url.Values{}
	for key, value := range m {
		data.Set(key, value)
	}

	//将字符串解析成url对象 ,例如http://127.0.0.1:8000/hi
	u, err := url.ParseRequestURI(path)
	if err != nil {
		fmt.Printf("解析失败, err:%v\n", err)
	}
	//对参数进行url编码后,放入url对象的RawQuery中,结果例如：http://127.0.0.1:8000/hi?age=18&name=jack
	u.RawQuery = data.Encode()
	fmt.Printf("编码后 :%v\n", u.String())

	//发起Get请求,参数是url字符串
	resp, err := http.Get(u.String())
	if err != nil {
		fmt.Printf("请求失败, err:%v\n", err)
		return
	}
	//关闭response.Body响应
	defer resp.Body.Close()

	//读取响应体，可以使用多种方式读取，这里使用的是ioutil方式，b是返回的内容
	b, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		fmt.Printf("get resp failed, err:%v\n", err)
		return
	}
	fmt.Println(string(b))
}
```

main函数中调用

```go
//发起get请求
param := map[string]string{"name": "jack", "age": "18"}
myGet.SendGetRequest("http://127.0.0.1:8000/getExample", param)
```

服务端接收Get请求

```go
http.HandleFunc("/getExample", func(w http.ResponseWriter, r *http.Request) {
		//关闭请求
		defer r.Body.Close()
		
		//获取url参数
		data := r.URL.Query()
		fmt.Println(data.Get("name"))
		fmt.Println(data.Get("age"))

		//写入response值
		answer := `{"status": "ok"}`
		w.Write([]byte(answer))
})
```

**Post请求**

客户端使用Go发起Post请求

```go
package myPost

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"strings"
)

func SendPostRequest(path string, contentType string, data string) {

	//发送Post请求
	resp, err := http.Post(path, contentType, strings.NewReader(data))
	if err != nil {
		fmt.Printf("post failed, err:%v\n", err)
		return
	}
	//关闭响应
	defer resp.Body.Close()

	//读取响应体
	b, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		fmt.Printf("get resp failed, err:%v\n", err)
		return
	}
	fmt.Println(string(b))
}
```

main函数中调用

```go
//发起post请求
//如果是表单数据  contentType := "application/x-www-form-urlencoded" ; data := "name=jack子&age=18"
myPost.SendPostRequest("http://127.0.0.1:8000/postExample", "application/json", `{"name":"jack","age":18}`)
```

服务端接收Post请求

```go
http.HandleFunc("/postExample", func(w http.ResponseWriter, r *http.Request) {
		//1. 关闭请求
		defer r.Body.Close()

		//2.1 请求类型是application/x-www-form-urlencoded时解析form数据
		r.ParseForm()
		fmt.Println(r.PostForm) // 打印form数据
		fmt.Printf("方式1：name:%v----age:%v\n", r.PostForm.Get("name"), r.PostForm.Get("age"))
		//2.2 请求类型是application/json时从r.Body读取数据
		b, err := ioutil.ReadAll(r.Body)
		if err != nil {
			fmt.Printf("read request.Body failed, err:%v\n", err)
			return
		}
		fmt.Printf("方式2：%v\n", string(b))
		answer := `{"status": "ok"}`
		w.Write([]byte(answer))
})
```





## 日志库作业

实现代码，[仓库地址](https://gitee.com/hyj1270433876/GoProjectByHDD/tree/master/Logger)

通过这个项目学习到几点简单的经验，在这里做一个简单的记录

![image-20220602234740750](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/JS/2022060300:38:55%20.png)

**文件的结构**

```
myLoger文件下的文件，都属于myLoger包
		myLoger.go 日志包的主要核心代码
		logerConsole.go 日志输出到控制台
		logerFile.go    日志输出到文件

main.go 使用myLoger库中的功能
```

**结构体的设计**

在`myLoger.go`文件中，设计了Logger结构体。设计结构体核心是把公用的属性写入结构体，每一个结构体的方法都能方便的使用

```go
// Logger  日志类型
type Logger struct {
	curLogLevel   LogLevel   //错误等级
	logStartLevel LogLevel   //设置监控等级，大于这个等级的日志才会输出
	curOutputMode outputMode //输出的方式（输出到文件、输出到控制台）
}
```

**常量（枚举）**

上面结构体中常量LogLevel类型是一个常量类型，对于一些常量定义成一个新的类型，是一种常见的手段，比如：time包中的duration

```go
const (
	Info LogLevel = iota //数字越大越严重
	Warning
	Error
)
```

**接口的使用**

上面结构体中常量outputMode类型是一个接口类型，这个接口有一个output方法，用于输出日志。

`logerConsole.go `、`logerFile.go `   就是定义两个结构体类型，同时都实现了output方法

在`myLoger.go`中的构造方法把outputMode接口最为参数，那么就可以同时传入两种结构体，在`myLoger.go`只需要调用，参数的output方法就能实现对应的输出方式了

```go
//构造函数
func NewLoger(logStartLevel LogLevel, outputMode outputMode) *Logger {
	return &Logger{
		logStartLevel: logStartLevel,
		curOutputMode: outputMode,
	}
}
```



## 积累

这部分主要记录下，平时看到的一些库或者文章里代码，学习下使用Go语言的经验

### 公共前缀

```go
package main

import "fmt"


func min(a, b int) int {
	if a <= b {
		return a
	}
	return b
}

func longestCommonPrefix(a, b string) int {
  //这里其实就是个for循环
	i := 0
	max := min(len(a), len(b))
	for i < max && a[i] == b[i] {
		i++
	}
	return i
}
func main() {
	i := longestCommonPrefix("123789", "12456")
	fmt.Printf("%v\n", i) //2
  fmt.Printf("%v", str1[:i]) //12

}

```

### 切片的方法

不仅仅只有struct有方法

很多库都有对于切片的get方法

```go
type elementList []string

func (elist elementList) Get(findElement string) (result string, err error) {
	for _, element := range elist {
		if element == findElement {
			return
		}
	}
	return "", nil
}
```

自己写一个更复杂一点的例子

```go
package main

import (
	"errors"
	"fmt"
)

type userInfo map[string]interface{}

type userCollect []userInfo

func (u userCollect) Get(key string) (findUserInfo userInfo, err error) {
	for _, value := range u {
		if value["name"] == key {
			return value, nil
		}
	}
	return nil, errors.New("获取出错")
}

func main() {
	users := userCollect{
		{"name": "tom", "age": 18},
		{"name": "jack", "age": 22},
	}
	value, err := users.Get("jack")
	if err != nil {
		fmt.Printf("err:%v\n", err)
		return
	}
	fmt.Printf("value:%v\n", value)//fmt.Printf("err:%v",err)
}

```











