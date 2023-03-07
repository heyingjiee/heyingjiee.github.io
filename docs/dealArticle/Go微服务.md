# Go微服务

微服务是微服务架构具体的实现方案，是通过微服务架构设计方法拆分出来的一个独立的组件化的小应用。

## 常用架构

### 单体架构

* 程序部署在一台服务器

  这种架构是目前中小企业用的最多的架构。其中web服务（nginx）、网站程序、静态资源（图片）、数据库(Mysql、Redis)都在一台服务器上面。如果每天网站的访问IP在5万以下这种架构完全可以应付（服务器配置也有关系）

  ![image-20230304165308504](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Go/20230304165348%20.png)

* 程序部署在多台服务器（负载均衡）

  通过nginx配置负载均衡，当客户访问我们的项目的时候随机的分配给不同的服务器处理响应，这样可以防止宕机，提升系统运行稳定性。

  ![image-20230304165750739](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Go/20230304165750%20.png)

* 程序部署在多台服务器（负载均衡+主从数据库）

  这种架构能轻松的应对每天几百万、上千万的访问量

  ![image-20230304170203933](/Users/yc/Library/Application Support/typora-user-images/image-20230304170203933.png)

### 微服务架构

就是把单体架构项目抽离成多个项目（服务），部署到多台服务器

数据中台通过HTTP或RPC方式调用多个服务，封装新的接口来实现业务逻辑

![image-20230304173602635](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Go/20230304173633%20.png)

**微服务的优点：**

* 易于开发和维护

  一个服务只关注一个特定的业务功能，所以它业务清晰，代码量少。开发和维护单个微服务相当简单。而整个应用是若干个微服务构建而成的，所以整个应用在被维持在一个可控的状态

* 单个服务启动快，单个服务代码量少，所以启动快；

* 局部修改易部署

  单个应用只要有修改，就得重新部署整个应用，微服务解决了这个问题。一般来说，对某个微服务进行修改，只需要重新部署这个服务即可

* 技术栈不受限

  在微服务架构中可以有些服务使用关系型数据库Mysql，有些服务使用非关系型数据库redis。甚至可根据需求，部分服务使用JAVA开发，部分微服务使用Node.js开发

* 按需收缩

  可根据需求，实现细粒度的扩展。例如，系统中的某个微服务遇到了瓶颈，可以结合微服务的特点，增加内存，升级CPU或增加节点

**微服务的缺点：**

* 运维成本高

*  分部式复杂度高

* 接口成本高

## RPC

**RPC(Remote Procedure Call Protocol，远程过程调用协议）**可以让我们实现不同语言的直接相互调用。在互联网时代，RPC已经和IPC(进程间通信)一样成为一个不可或缺的基础构件

IPC： 进程间通信

RPC：远程进通信 —— 应用层协议（http协议同层）。底层使用 TCP 实现。

Go官方的`net/rpc`库使用`encoding/gob`进行编解码，支持TCP、HTTP数据传输方式，但是由于其他语言不支持gob编解码方式，所以无法法进行跨语言调用

所以，官方还提供了`net/rpc/jsonrpc`库实现RPC方法，采用JSON进行数据编解码，因而支持跨语言调用。但是，目前`jsonrpc`库是基于TCP协议实现的，暂时不支持使用HTTP进行数据传输

### net/rpc库

**TCP通讯**

RPC服务端

```go
package main

import (
	"fmt"
	"net"
	"net/rpc"
)

type Hello struct {
}

// SayHello 定义一个方法
/*
	1、方法必须是公开的（首字母大写）
	2、方法只能有两个可序列化的参数，其中第二个参数必须是指针类型，这样才能修改真正的修改入参变量。一般实际场景下，会使用struct类型，传递更多数据（channel（通道）、complex（复数类型）、func（函数）均不能进行 序列化）
	3、方法要返回一个error类型
*/
func (Hello) SayHello(request string, response *string) error {
	*response = "rpc中方法调用成功，接收参数：" + request
	return nil
}

func main() {
	//一、把Hello方法在rpc上注册,服务名为hello。可以将多个结构体注册为名为hello的服务，客户端调用时，使用（服务名.函数名）的形式调用
	err := rpc.RegisterName("hello", new(Hello))
	if err != nil {
		fmt.Printf("注册服务失败，err-->%v", err)
		return
	}
	//二、监听端口
	listener, err := net.Listen("tcp", "127.0.0.1:9900")
	if err != nil {
		fmt.Printf("端口被占用，err-->%v", err)
		return
	}
	//三、退出时关闭监听
	defer listener.Close()

	for {
		//四、监听端口建立的连接。（只有在监听到连接后，代码才会向下运行，否则一直卡在这里）
		fmt.Println("开始监听连接")
		conn, err := listener.Accept()
		if err != nil {
			fmt.Printf("监听连接失败，err-->%v", err)
			return
		}

		//五、把建立的连接绑定到rpc服务
		rpc.ServeConn(conn)
	}

}

```

客户端，可通过http调用服务端的方法SayHello

```go
package main

import (
	"fmt"
	"net/rpc"
)

func main() {
	//一、发起建立连接
	conn, err := rpc.Dial("tcp", "127.0.0.1:9900")
	if err != nil {
		fmt.Printf("建立连接失败，err-->%v", err)
		return
	}
	//二、退出时，关闭连接
	defer conn.Close()

	var reply string
	//三、调用rpc服务端注册的方法
	//参数1：（rpc.RegisterName注册的服务名）.方法名
	//参数2：方法的第一个入参
	//参数1：方法的第二个入参（必须是指针那个）
	err = conn.Call("hello.SayHello", "我是客户端", &reply)
	if err != nil {
		fmt.Printf("调用rpc方法错误，err-->%v", err)
		return
	}
	fmt.Println(reply)
}

```

**HTTP通讯**

服务端

```go
//1、注册RPC服务 （TCP通讯使用的是rpc.RegisterName函数）
rpc.Register(new(World)) 

//2、采用http协议作为rpc载体 (不设置模人为TCP)
rpc.HandleHTTP() 

//3、设置监听 (与TCP通讯相同)
conn, err := net.Listen("tcp", "127.0.0.1:8800") 
if err != nil { 
  fmt.Println(err) 
  return
}
// 3. 建立链接 （不必再接收到的连接绑定在rpc上，而是直接使用http.Serve）
http.Serve(conn, nil)
```

服务端

```go
// 1、发起建立连接（TCP通讯使用的是rpc.Dial函数）
conn, err := rpc.DialHTTP("tcp", "127.0.0.1:8800") 
if err != nil { 
  fmt.Println("Dial err:", err)
  return 
}

//2、关闭连接(与TCP通讯相同)
defer conn.Close() 

// 2. 调用远程函数 (与TCP通讯相同)
var reply string
err1 := conn.Call("World.HelloWorld", "张三", &reply) 
if err != nil { 
  fmt.Println("Call:", err) 
  return 
}

fmt.Println(reply)
```



### net/rpc/jsonrpc库

仅支持TCP通讯

**服务端**

仅需将使用net/rpc库进行TCP通讯的服务端，最后一步的

```go
//把建立的连接绑定到rpc服务
rpc.ServeConn(conn)
```

替换为

```go
//为当前连接提供针对json格式的rpc服务 
go rpc.ServeCodec(jsonrpc.NewServerCodec(conn))
```

**客户端**

使用net/rpc库进行TCP通讯的服务端中

```
使用rpc.Dial返回的链接conn，conn.Call调用远程方法
```

这里替换为

```go
//使用net.Dial
conn, err := net.Dial("tcp", "127.0.0.1:9900")
	
//将连接conn，包装为基于json编解码器的rpc服务 
client := rpc.NewClientWithCodec(jsonrpc.NewClientCodec(conn))

//使用client调用远程方法
client.Call
```



## ProtoBuf

前面提到：net/rpc库使用gob通讯，net/rpc/jsonrpc使用json通讯



Protobuf是Protocol Buffffers的简称，它是Google公司开发的一种数据描述语言，是一种轻便高效的结构化数据存储格式，可以用于结构化数据，其很适合做**数据存储**或 **RPC数据交换格式**

**优势：**

* 序列化后体积相比JSON和XML很小，适合网络传输
* 序列化、反序列化速度很快

* 语言无关、平台无关、可扩展的序列化结构数据格式

**劣势：**

* 序列化后的二进制格式导致可读性差



### 安装

**下载安装**

* 安装protobuf

  github下载：https://github.com/protocolbuffers/protobuf/releases

  如果电脑中有homebrew，则可以使用以下命令安装

  ```shell
  brew install protobuf
  ```

  查看安装版本

  ```shell
  protoc --version
  ```

  

* 安装Go的插件protoc-gen-go

  ```go
  go install github.com/golang/protobuf/protoc-gen-go@latest
  ```



**配置环境变量**

下载安装后，找不到对应命令，就需要配置下环境变量

```
1、找到自己使用的终端，对应的配置文件
~/.bash_profile（bash的）
~/.zshrc（zsh的）
 
2、在对应的配置文件中配置命令工具地址（在$path变量后继续追加，使用冒号分割。xxx是用户名）

2-1、protobuf的环境变量配置
export PROTOBUF=/Users/xxx/Library/protobuf 
export PATH=$PATH:$PROTOBUF/bin

2-2、protoc-gen-go的环境变量配置。下载地址在GOPATH下的bin目录
export PATH=/Users/xxx/go/bin:$PATH
 
3、更新配置文件
source ~/.bash_profile
source .zshrc
```



### 简单使用

`userInfo.proto`

```protobuf
syntax = "proto3"; //指定版本信息，不指定会报错，默认是proto2 

option go_package = "./userService"; //'./proto;helloworld'=> 分号前面的表示编译生成文件放置的路径， 分号后面表示生成go文件的包名 。 分号也可以省略，'./userService'表示编译后的文件放在userService目录下，包名为userService

//message定义一种消息类型，关键字message定义结构,并且结构中可以嵌套定义结构,message定义的内容可以生成一个结构体 UserInfo，字段首字母自动大写
message UserInfo{ 
	// （字段修饰符）数据类型 字段名称 = 唯一的编号标签值;
	// 名字 
	string name = 1; //编号，同一个message中的编号不可重复
	// 年龄 
	int32 age = 2 ; 
	//爱好 
	repeated string hobby = 3; //  repeated string可以生成golang中的[]string
}
```

编译成对应语言的文件（这里我们会生成Go文件，将`userInfo.proto`文件转化为文件 `userInfo.pd.go`）
```shell
protoc --proto_path=输入文件目录 --go_out=输出目录 proto文件名

// --proto_path 默认为当前路径
// --go_out=./，实际proto文件的输出路径 = ./+ (proto文件中，option go_package字段指定的输出路径)
```

```shell
//一般进入proto文件的目录，使用：
protoc --go_out=./ *.proto 

//*.proto 编译输入目录中所有的proto文件
```

序列化与反序列化（编译生成的Go文件中有根据message转化的结构体以及getXXX字段的方法）

```go
package main

import (
	"fmt"
	"github.com/golang/protobuf/proto"
	"protobuf/userService"
)

func main() {
	//创建一个Go的数据结构（该类型，在proto文件编译后的Go文件中定义了。所以需要引入包）
	u := &userService.UserInfo{
		Name:  "tom",
		Age:   20,
		Hobby: []string{"唱歌", "跳舞"},
	}
	fmt.Printf("%#v\n", u)
  //结构体上的getXXX方法
  fmt.Println(u.GetName())

	//序列化（结构体 --> 为protobuf格式）
	data, err := proto.Marshal(u)
	if err != nil {
		fmt.Printf("序列化失败，err-->%v", err)
		return
	}
	fmt.Println(data) //[10 3 116 111 109 16 20 26 6 229 148 177 230 173 140 26 6 232 183 179 232 136 158]

	//反序列化（protobuf格式 --> 结构体）
	var user userService.UserInfo
	proto.Unmarshal(data, &user)
	fmt.Printf("%#v\n", user)

	//u和user都是在这个值
	//userService.UserInfo{state:impl.MessageState{NoUnkeyedLiterals:pragma.NoUnkeyedLiterals{}, DoNotCompare:pragma.DoNotCompare{}, DoNotCopy:pragma.DoNotCopy{}, atomicMessageInfo:(*impl.MessageInfo)(0xc00010c2c0)}, sizeCache:0, unknownFields:[]uint8(nil), Name:"tom", Age:20, Hobby:[]string{"唱歌", "跳舞"}}

}
```

### 高级

**简单类型**

| proto类型 | Go类型 |
| --------- | ------ |
|           |        |



double 64位浮点数

flfloat flfloat32 32位浮点数

int32 int32

使用可变长度编码。编码负数效率低下——如果你的字段可能有负值，

请改用sint32。

int64 int64

使用可变长度编码。编码负数效率低下——如果你的字段可能有负值，

请改用sint64。

uint32 uint32 使用可变长度编码。

uint64 uint64 使用可变长度编码。

sint32 int32 使用可变长度编码。符号整型值。这些比常规int32s编码负数更有效。

sint64 int64 使用可变长度编码。符号整型值。这些比常规int64s编码负数更有效。

fifixed32 uint32 总是四字节。如果值通常大于228，则比uint 32更有效

fifixed64 uint64 总是八字节。如果值通常大于256，则比uint64更有效

sfifixed32 int32 总是四字节。

sfifixed64 int64 总是八字节。

bool bool 布尔类型

string string 字符串必须始终包含UTF - 8编码或7位ASCII文本

bytes []byte 可以包含任意字节序列

**复杂类型**



**写法一**

```protobuf
syntax = "proto3";
option go_package = "./orderService";

message Order{
  int64 id =1;
  double price=2;
  string name=3;
  string tel=4;
  string addTime=5;
  message OrderItem{
    int64 id=1;
    string title =2;
    double price=3;
    int32 num=4;
  }
  OrderItem orderItem=6;
}

```

编译成Go中的结构体

```go
type Order struct {
	Id        int64      
	Price     float64   
	Name      string    
	Tel       string    
	AddTime   string     
	OrderItem  *Order_OrderItem
}

type Order_OrderItem struct { //子结构体，会拼上父结构体名字
	Id    int64   
	Title string  
	Price float64
	Num   int32   
}
```

**写法二**

```protobuf
syntax = "proto3";
option go_package = "./orderService";

message Order{
  int64 id =1;
  double price=2;
  string name=3;
  string tel=4;
  string addTime=5;
  OrderItem orderItem=6;
}
message OrderItem{
  int64 id=1;
  string title =2;
  double price=3;
  int32 num=4;
}
```

```go
type Order struct {
	Id        int64      
	Price     float64   
	Name      string    
	Tel       string    
	AddTime   string     
	OrderItem *OrderItem 
}

type OrderItem struct {
	Id    int64   
	Title string  
	Price float64
	Num   int32   
}
```

两种方式仅仅是子结构体的名字有所不同
