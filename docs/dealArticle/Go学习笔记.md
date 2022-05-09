# Go学习笔记

## 配置环境

* 现在Go

  [官网下载](https://golang.google.cn/dl/) 我使用的是mac系统，安装器会将Go自动安装到 `/usr/local/go`文件夹

  ![Xnip2022-05-07_18-44-22](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Go/Xnip2022-05-07_18-44-22.jpg)

* 配置环境变量

  `GOROOT`、`GOPATH`、`GOPROXY`都是环境变量

  `GOROOT`：是我们安装go开发包的路径，

  `GOPATH`：

  * 在旧版本的Go中，我们每写一个项目都需要在GOPATH中配置下，多个项目之间使用`:`分开
  * 从Go 1.8版本开始，`GOPATH`默认在` ~/go `，并且在Go1.16及之后的版本中默认启用Go Module模式，不一定非要将代码写到GOPATH目录下，所以也就**不需要我们再自己配置GOPATH**了

  这里我们配置一个环境变量，mac直接在`~/.zshrc`文件中添加以下内容

  ```shell
  export GOROOT=/usr/local/go #Go默认的安装位置
  export GOPATH=$HOME/Documents/GOProject/GoLearn # 我们写go项目的文件夹地址（你要写的go项目在哪个路径这里就写哪个），这里可以配置多个用:分隔
  
  export GOBIN=$GOPATH/bin
  export PATH=$PATH:$GOBIN #mac系统下多个PATH环境，使用：分隔
  ```

  `GOPROXY`：默认GoPROXY配置是：`GOPROXY=https://proxy.golang.org,direct`，由于国内访问不到`https://proxy.golang.org`，所以我们需要换一个PROXY

  ```shell
  export GOPROXY=https://goproxy.cn,direct
  
  #或者
  #export GOPROXY=https://goproxy.cn,direct
  ```

* 查看配置是否生效

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

  ```shell
  go build //编译go文件为 可执行文件，文件名为目录名，即main
  ./main  //运行可执行文件
  ```

  ![image-20220509145153825](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Go/image-20220509145153825.png)

  ```shell
  go build -o hello //指定生产可执行文件名
  ```

  根据自己的平台，生成的文件类型也有所不不同：win下为`*.exe` ; mac/Linux下为`*.exec`

  如果不想产生编译后文件，可以使用：

  ```shell
  go run //不产生可执行文件，直接运行
  ```

  **注意**：

  这两个命令可以直接指定，编译、运行某个go文件

  ```
  go build xxx.go
  
  go run xxx.go
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

这里我只记录

**mac平台编译Linux平台可执行文件**：

```shell
CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build
```

**mac平台编译window平台可执行文件**：

```shell
CGO_ENABLED=0 GOOS=windows GOARCH=amd64 go build
```

* **CGO_ENABLED**  0为禁用CGO
* **GOOS**  目标平台
* **GOARCH ** 目标平台机器处理器架构

## GO module

* https://www.liwenzhou.com/posts/Go/import_local_package_in_go_module/

* https://www.liwenzhou.com/posts/Go/11-package/#autoid-1-1-5 

  https://www.bilibili.com/video/BV1bV41177KD/?spm_id_from=333.788

* https://www.liwenzhou.com/posts/Go/11-package/

`go module`是Go1.11版本之后官方推出的版本管理工具

## Go语言基本规则

Go文件基本规则

```go
package main   //包

import "fmt"   //引入的Go库
//引入多个库
//	import (
//		"fmt"
//		"flag"
//	)

//全局只能声明： "变量/常量/类型/函数" 

func main(){  // main函数，是程序执行的入口
	//函数内可以写
  //1.声明 "变量/常量/类型"；无法声明函数，但是可以声明匿名函数
  //2.语句
  //3.流程控制逻辑
  //4.调用全局函数
  
}
```

## 常用的Go的标准库

### builtin

这个库是默认引入的，不用手动引入

库中包括go语言中常用的**类型**和**方法**的声明

其他需要引入的库，都需要`库名.方法()`的形式调用，而builtin库，可直接调用方法

|    内置函数    |                             介绍                             |
| :------------: | :----------------------------------------------------------: |
|     close      |                     主要用来关闭channel                      |
|      len       |      用来求长度，比如string、array、slice、map、channel      |
|      new       | 用来分配内存，主要用来分配值类型，比如int、struct。返回的是指针 |
|      make      |   用来分配内存，主要用来分配引用类型，比如chan、map、slice   |
|     append     |                    用来追加元素到slice中                     |
| panic和recover |                        用来做错误处理                        |

### fmt

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
	
  //---------string--------
	str := "你好"
	fmt.Printf("%s", str) //你好  输出字符串

  //----------其他类型都可以输出-----------
	fmt.Printf("%T---%T\n", n1, str)   //int---string 输出变量类型
	fmt.Printf("%v---%v\n", n1, str)   //100---你好  原样输出变量
	fmt.Printf("%#v---%#v\n", n1, str) //100---"你好" 带格式输出，这里的字符串带上了双引号

}
```

### strings

string类型字符串的处理方法，详见【类型/字符串】章节

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
>  切片、函数、指针变量默认为nil

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

简短变量声明 （**只能在函数内使用**）

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

* 批量声明中不赋值，默认集成上一个值

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
  //iota在const中第一次出现的一行，初始化为0
  //随后的每行iota的值加1
  const (
  	n1 = 10   //10
  	n2 = iota //1
  	n3 = 20   //20
  	n4        //20
  	n5 = iota //默认为iota，4
  )
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

```
package main

import "fmt"

func main() {
	n1 := 12
	n2 := 077   //八进制，以0开头，后面的77是八进制数
	n3 := 0xfff //十六进制，以0x开头，后面的fff是十进制数

	fmt.Printf("%d--%d--%d\n", n1, n2, n3) //按照十进制输出 12--63--4095
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

```shell
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

string --> []rune 或者 []byte 
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

	if age := 18; age <= 18 {
		fmt.Println //青年
	} else if age < 60 {
		fmt.Println
	} else {
		fmt.Println("老年")
	}
  
  //age在外面访问不到
}
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

**数组声明**

` [] 元素类型`

```go
var arr []int //
fmt.Printf("%T\n", arr) //[]int
```

Go语言与其他大多数语言一样，都是定长数组。这一点不如JS的可变长度数组使用的方便

**数组初始化**

不初始化，整个切片默认为零值

```go
var arr []int           
fmt.Println(arr == nil) //true
```

初始化 

```go
//其实就是创建了一个底层数组[4]int{1,2,3,4}
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

**make**

`make(切片类型,长度，容量)`

返回一个切片，make会默认把切片元素初始化为零值（下面例子是[]int，所以默认的零值是0）

```go
slice1 := make([]int, 5, 10) 
fmt.Println(slice1) //[0 0 0 0 0]

slice1 := make([]int, 5)  //一个参数，就 默认长度和容量都为5
fmt.Println(slice1) //[0 0 0 0 0]
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

**切片的追加**

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

```
slice1 := []int{1, 2, 3, 4, 5}
slice2 := slice1
//更改slice2,删除2,实际上还是在底层数组[1 2 3 4 5]上操作
slice2 = append(slice2[0:1], slice2[2:]...)

fmt.Println(slice1) //[1 3 4 5 5]
```

**切片复制**

直接赋值，只是把地址赋值过去了。copy(dest，src)，返回值是覆盖的元素个数，dest切片发生改变

```go
slice1 := []int{1, 2, 3}
slice2 := []int{4, 5}
slice3 := []int{4, 5, 6, 7}
fmt.Println(copy(slice2, slice1)) //2
fmt.Println(slice2)               //[1 2]

fmt.Println(copy(slice3, slice1)) //3
fmt.Println(slice3)               //[1 2 3 7]
```

**切片删除**

Go中没有提供切片和数组的删除，我们只能自己实现

思路就是： 数组——>切片——>截取需要保留的切片部分——>append拼接

## 指针类型

Go语言中指针没有指针的运算

```text
//1.返回类型是指针类型（指针存储了变量的地址）

&普通变量  //返回指向这个变量的指针

new(类型) //返回指定类型的指针

//2.取指针指向位置的值
*指针    


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
* new用来给基本数据类型申请内存，例如：`string`、`int`。new申请内存后返回指针，例如：`*int`、`*string`
* make用来给`slice`、`map`、`channel`类型申请内存，make申请内存后，返回对应类型本身

## map类型

[参考文章](https://www.liwenzhou.com/posts/Go/08_map/)

## 函数类型

### 声明函数

* Go中函数没有默认参数，GO语言设计者认为，所有东西在Go中应该是明确的，包括参数

* Go语言的参数，是把实参的值拷贝到形参

* Go语言支持多返回值

* 函数定义的位置（回忆下），记住：函数体内部可以调用其他函数，但是不能在函数体内定义其他函数

  我们在main函数外定义函数，在main中调用

  ![image-20220508230029256](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Go/image-20220508230029256.png)

**基本形式**

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

  相当于在返回值部分就已经声明了变量，初始化的值就是实参

  最后写一个return即可，就会按照返回值类表顺序，返回所有的值

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
  }
  ```

  遇到这种情况也要知道

  ```go
  func f1() (x int) {
  	x = 1
  	return 5  //含义是 1.设置返回值为x； 2.将x赋值为5
  }
  
  f1() //5
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

## 结构体

与C语言的结构体一样，其实就是帮助我们构造一些复杂的类型

### 结构体

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

### 结构体指针

