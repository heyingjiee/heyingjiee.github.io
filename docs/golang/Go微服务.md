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

  （原图未随仓库提供：`image-20230304170203933.png`）

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

RPC：远程进通信 —— 应用层协议（与http协议同层）。底层使用 TCP 实现。

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

option go_package = "./userService"; //'./proto;helloworld'=> 分号前面的表示编译生成文件放置的路径， 分号后面表示生成go文件的包名 。 一般将分号省略，'./userService'表示编译后的文件放在userService目录下，包名为userService

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

### proto文件的类型

**简单类型**

| proto类型                                          | Go类型         |                                                              |
| -------------------------------------------------- | -------------- | ------------------------------------------------------------ |
| double                                             | float64        |                                                              |
| float                                              | float 32       |                                                              |
| int32、int64\|sint32、sint64 \|sfixed32 、sfixed64 | int32、int64   | 如果字段可能有负值，使用sint32、sint64，效率更高<br />总是四字节用sfixed32、总是八字节用sfixed64，效率更高 |
| uint32、uint64\|fixed32 、fixed64                  | uint32、uint64 | 总是四字节用fixed32、总是八字节用fixed64，效率更高           |
| bool                                               | bool           |                                                              |
| string                                             | string         | 只能是UTF - 8编码或7位ASCII码                                |
| bytes                                              | []byte         |                                                              |

**复杂类型**

* 嵌套结构体

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
  
  编译成Go中的结构体（注意：message字段无论是否大小写，转化为结构体都会变成首字母大写）

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
  
  两种方式仅仅是子结构体类型的名字有所不同

  

* repeated

  对应Go中的切片类型

  ```go
  repeated string hobby = 3
  
  //对应Go中的 var hobby []string
  ```

* enum

  枚举类型

  ```go
  syntax = "proto3"; 
  option go_package = "./orderService";
  
  message Person{ 
    string name = 1; 
    int32 age = 2 ;
    //使用枚举类型
    PhoneType type = 2;
  }
  
  //enum为关键字，作用为定义一种枚举类型 
  enum PhoneType { 
    MOBILE = 0; //每个枚举必须包含一个映射到零的常量,作为默认是
    HOME = 1; 
    WORK = 2; 
  }
  ```

* 默认值

  如果编码的消息不包含值，则按照字段的类型使用不同的默认值，具体如下：

  ```
  对于字符串，默认值为空字符串。
  
  对于字节，默认值为空字节。
  
  对于bools，默认值为false。
  
  对于数字类型，默认值为零。
  
  对于枚举，默认值是第**一个定义的枚举值**，该值必须为0。 
  
  repeated字段默认值是空列表
  
  message字段的默认值为空对象
  ```



## GRPC

[中文GRPC官网](http://doc.oschina.net/grpc?t=60133)

[GitHub官网提供的示例](https://github.com/grpc/grpc-go/tree/master/examples/helloworld)

### 在proto文件中注册RPC服务

```protobuf
syntax = "proto3";
option go_package= './hello';


service Hello {
	//服务暴露出SayHello方法，入参HelloReq，返参HelloRes 
  rpc SayHello(HelloReq) returns (HelloRes);
}

//---------服务端：注册一个Rpc服务---------
// 1、【编译后生成方法RegisterHelloServer，用于服务端注册RPC服务（格式：RegisterXXXServer）】
// 2、【生成HelloServer接口，里面有GetGood函数签名（格式：XXXServer接口）
//   		type HelloServer interface {
//				SayHello(context.Context, *HelloReq) (*HelloRes, error)
//	 		}
//   		用法：我们要在服务端建一个结构体，并实现GoodServer接口，将这个结构体绑定在RPC服务上。客户端才可以访问到这个方法
//		】

//---------客户端：调用一个Rpc服务---------
// 1、编译后生成方法NewHelloClient（格式：NewXXXClient），在客户端调用返回client对象
// 2、client.SayHello(xxx),clinet对象可以直接调用远程方法


//--------proto文件正客户端、服务端都需要存在，并编译生成Go文件的原因---------
//Go文件中包含一些方法，还有RPC方法的入参、返参的struct类型，这些在服务端、客户端都要用到
//1、服务端RPC方法的入参、返参类型
//2、客户端实例化入参、接收返参时需要用到

message HelloReq{
  string name =1;
}

message HelloRes{
  string message =1;
}
```

编译生成Go文件

```shell
protoc --go_out=plugins=grpc:. *.proto 
//需指定使用在protoc-gen-go中集成的grpc插件，生成Go文件
```

Go文件中引入了大量的包，需要安装下

```
go mod tidy
```

### 服务端

服务端新建proto目录，放入proto文件，并编译生成Go文件

![image-20230325233020484](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Go/20230325233020%20.png)

```go
package main

import (
	"context"
	"fmt"
	"google.golang.org/grpc"
	"net"
	"server/proto/hello"
)

//实现proto文件中定义的RPC接口：HelloServer。
type Hello struct {
}

func (h Hello) SayHello(ctx context.Context, req *hello.HelloReq) (res *hello.HelloRes, err error) {
	return &hello.HelloRes{
		Message: "你好" + req.GetName(),
	}, nil
}

func main() {
	//1、创建grpc服务对象
	grpcServer := grpc.NewServer()
	//2、注册服务
	//把实现了接口的结构体和grpc服务对象绑定在一起(使用proto文件编译生成的Go文件中的 RegisterXXXServer 函数 )
	hello.RegisterHelloServer(grpcServer, &Hello{})
	//3、监听
	listener, err := net.Listen("tcp", "127.0.0.1:8900")
	if err != nil {
		fmt.Printf("err-->%v", err)
		return
	}
  //4、关闭监听
  defer listener.Close()
	//5、启动grpc服务对象，并传入监听对象
	grpcServer.Serve(listener)

}

```

### 客户端

与服务端相同，新建proto目录，放入proto文件，并编译生成Go文件

```go
package main

import (
	"client/proto/hello"
	"context"
	"fmt"
	"google.golang.org/grpc"
  "google.golang.org/grpc/credentials/insecure"
)


func main() {
  //1、-------创建RPC客户端实例-------
	//grpc.WithTransportCredentials ：配置连接级别的安全凭证（例如，TLS/SSL），返回一个 DialOption，用于连接服务器
	//credentials.NewClientTLSFromFile ：使用输入的证书文件作为客户端构造TLS凭证
	//insecure.NewCredentials：返回禁用传输安全性的TLS凭证
	grpcClient, err := grpc.Dial("127.0.0.1:8900", 				grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		fmt.Printf("err-->%v", err)
		return
	}
  
 
  //2、使用proto文件编译生成的Go文件中的 NewXXXClient 函数 ，注册客户端实例
	client := hello.NewHelloClient(grpcClient)
  
  //3、使用客户端实例，调用远程函数（函数的入参、返参结构体类型，已经在proto生成的GO文件中定义好了）
	res, err := client.SayHello(context.Background(), &hello.HelloReq{
		Name: "hedaodao",
	})
	if err != nil {
		fmt.Printf("err-->%v", err)
		return
	}
	fmt.Printf("%#v\n", res)
}

```



## 微服务发现consul

通常业务中，一个项目中往往使用多个服务端提供的RPC服务。上面客户端的代码中

```go
grpcClient, err := grpc.Dial("127.0.0.1:8900", xxxx)
```

可以发现每链接一个微服务都需要指定IP和端口。

* 如果PRC服务更换地址
* 如果同一个RPC服务负载在多个服务器上

将IP和端口写在项目中，往往不太灵活

**服务发现**：

项目与服务发现服务器连接，获取当前所需RPC服务的地址。

* 这样即使RPC服务更换地址，项目也无需修改代码，即可获知最新的RPC服务地址
* 同一个服务，可以注册多个RPC服务地址，负载在多个服务器

![image-20230326002217354](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Go/20230326002217%20.png)

**常见的服务发现框架**:

* **consul**： Go语言编写，常应用于grpc 、 go-micro 中

* **mdns**：过去go-micro中默认自带的服务发现是mdns，现在是consul

* **etcd**：k8s 内嵌的服务发现

* **zookeeper**：java中较常用



### consul详细介绍

Consul是Go语言写的开源的服务器发现软件，用于实现分布式系统的服务发现与配置。包含多个组件,

但是作为一个整体,为你的基础设施提供服务发现和服务配置的工具.他提供以下关键特性:

**服务发现**：consul通过DNS或者HTTP接口使服务注册和服务发现变的很容易，一些外部服务，例如

saas提供的也可以一样注册。

**健康检查**：健康检测使consul可以快速的告警在集群中的操作。和服务发现的集成，可以防止服务转发

到故障的服务上面。(心跳机制) 

**键/值存储**：一个用来存储动态配置的系统。提供简单的HTTP接口，可以在任何地方操作。

**多数据中心**：无需复杂的配置，即可支持任意数量的区域。

官方建议：最好是三台或者三台以上的consul在运行，同名服务最好是三台或三台以上，默认可

以搭建集群

**Web管理界面**：官方提供web管理界面

官网：https://www.consul.io/

Git地址：https://github.com/hashicorp/consul



### 安装

[官网安装介绍](https://developer.hashicorp.com/consul/downloads)

![image-20230326003251308](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Go/20230326003251%20.png)

查看安装版本

```shell
consul --version
```

在本地启动consul服务

```shell
consul agent -dev
```

查看WEB管理界面

```text
 http://localhost:8500
```

其中的consul服务是默认的实例

![image-20230402011020682](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Go/20230402011021%20.png)

### 使用

本地启动consul的WEB服务，默认地址为127.0.0.1:8500

```
consul agent -dev
```

服务端和客户端均需要使用consul库

```shell
go get -u -v github.com/hashicorp/consul
```

**服务端**

```go
package main

import (
	"context"
	"fmt"
	"github.com/hashicorp/consul/api"
	"google.golang.org/grpc"
	"net"
	"server/proto/hello"
)

type Hello struct {
}

func (h Hello) SayHello(ctx context.Context, req *hello.HelloReq) (res *hello.HelloRes, err error) {
	return &hello.HelloRes{
		Message: "你好" + req.GetName(),
	}, nil
}

func main() {
	//------服务端在consul中注册一个服务-------
	// 1、consul的web页面配置
	consulWebConfig := api.DefaultConfig()
	//consulConfig.Address = "127.0.0.1:8500" //指定使用哪个consul web服务。默认为127.0.0.1:8500

	// 2、创建consul的web服务对象实例
	consulWebClient, _ := api.NewClient(consulWebConfig)

	// 3、创建 微服务的配置
	serviceConfig := api.AgentServiceRegistration{
		ID:      "1",
		Tags:    []string{"test"},//tag字段（见下图），比如HelloService，我们启用了一个测试服务，就可以将tag指定为test。正式服务指定为pord。在`客户端`的例子中，可以看到查找服务时，需要指定服务名还有tag，才会返回其对应的IP和端口
		Name:    "HelloService",//服务名（见下图）
		Address: "127.0.0.1", //微服务的地址、端口
		Port:    8900,
		Check: &api.AgentServiceCheck{ //健康检查
			TCP:      "127.0.0.1:8900", //这里写微服务的运行地址
			Timeout:  "5s",
			Interval: "30s",
		},
	}

	//4、在consul的web服务客户端上，注册第三方的微服务
	consulWebClient.Agent().ServiceRegister(&serviceConfig)

	//------服务端注册rpc服务，和原来一样-------
	//1、创建grpc服务对象
	grpcServer := grpc.NewServer()
	//2、注册服务
	//把实现了接口的结构体和grpc服务对象绑定在一起(使用proto文件编译生成的Go文件中的 RegisterXXXServer 函数 )
	hello.RegisterHelloServer(grpcServer, &Hello{})
	//3、监听
	listener, err := net.Listen("tcp", "127.0.0.1:8900")
	if err != nil {
		fmt.Printf("err-->%v", err)
		return
	}
	//4、启动grpc服务对象，并传入监听对象
	grpcServer.Serve(listener)

}
```

![image-20230402021533182](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Go/20230402021533%20.png)

**客户端**

```go
package main

import (
	"client/proto/hello"
	"context"
	"fmt"
	"github.com/hashicorp/consul/api"
	"google.golang.org/grpc"
  "google.golang.org/grpc/credentials/insecure"
	"strconv"
)

func main() {
	// ----发现服务----
	// 1、consul的web页面配置
	consulWebConfig := api.DefaultConfig()
	//consulConfig.Address = "127.0.0.1:8500" //指定使用哪个consul web服务。默认为127.0.0.1:8500

	// 2、创建consul的web服务对象实例
	consulWebClient, _ := api.NewClient(consulWebConfig)

	// 3、传入参数，服务名：HelloService、tag：test。获取对应服务的IP和端口
	serviceEntry, _, _ := consulWebClient.Health().Service("HelloService", "test", false, nil)
	fmt.Printf("地址：%v\n", serviceEntry[0].Service.Address)
	fmt.Printf("端口：%v\n", serviceEntry[0].Service.Port)

	// 4、拼接IP和端口

	//------客户端调用远程rpc服务，基本原来一样（仅仅将grpc.Dial第一参数替换为，consul返回的服务真实地址）-------
	rpcAddress := serviceEntry[0].Service.Address + ":" + strconv.Itoa(serviceEntry[0].Service.Port)
	//grpc.WithTransportCredentials ：配置连接级别的安全凭证（例如，TLS/SSL），返回一个 DialOption，用于连接服务器
	//credentials.NewClientTLSFromFile ：使用输入的证书文件作为客户端构造TLS凭证
	//insecure.NewCredentials：返回禁用传输安全性的TLS凭证
	grpcClient, err := grpc.Dial(rpcAddress, grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		fmt.Printf("err-->%v", err)
		return
	}
	client := hello.NewHelloClient(grpcClient)
	res, err := client.SayHello(context.Background(), &hello.HelloReq{
		Name: "hedaodao",
	})
	if err != nil {
		fmt.Printf("err-->%v", err)
		return
	}
	fmt.Printf("%#v\n", res)
}
```

**注销服务**

服务端可以注册一个服务

```go
consulWebClient.Agent().ServiceRegister(&serviceConfig)
```

也可以注销一个服务

```
registerClient.Agent().ServiceDeregister("1")
```



### GRPC微服务集群

即同一个服务，在多台机器部署。consul会自动分配到哪个机器上

**服务端改造**

下面是前面服务端在consul中注册HelloService服务的代码

现在需要将多个服务端程序部署在多个机器上，每台机器仅需要保持Name字段都是HelloService，ID字段不同即可（注意：Address、Port、Check字段中的配置，要改为每个服务运行的本机地址）

![image-20230403002710360](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Go/20230403002710%20.png)

在consul的WEB端查看，HelloService有多少台机器

![image-20230403002836744](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Go/20230403002836%20.png)

![image-20230403003052963](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Go/20230403003053%20.png)

**客户端改造方案1**

当一个服务下有多个机器时，serviceEntry字段返回的就是所有机器的地址，这时候就不能仅仅用第一个元素的IP和端口了。需要做自己实现一个方法来随机轮询serviceEntry切片，并拼接IP和端口

`grpc.Dail`方法使用随机地址，就可以实现负载均衡，每次请求都会使用随机机器上的HelloService服务了

![image-20230403003947947](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Go/20230403003948%20.png)

**客户端改造方案2**

使用第三方库简化方案1的过程

[grpc-consul-resolver GitHub地址](https://github.com/mbobakov/grpc-consul-resolver)

```
import _ "github.com/mbobakov/grpc-consul-resolver" // 非常重要
```

图中绿框中获取consul微服务地址的代码可全部省略

（原图未随仓库提供：`image-20230403005036943.png`）

仅需将下一步替换为如下代码

```go
conn, err := grpc.Dial(
  			//consul:consul服务的IP和端口/consul上注册的服务名
        "consul://192.168.234.132:8500/HelloService"",
        grpc.WithInsecure(),
        grpc.WithDefaultServiceConfig(`{"loadBalancingPolicy": "round_robin"}`),
)
```



### consul集群（略）

角色：

**client客户端**: 将 HTTP 和 DNS 接口请求转发给局域网内的Server服务端集群

**server服务端** :保存配置信息、实现高可用集群、在局域网内与本地客户端通讯、通过广域网与其他数

据中心通讯等。 每个数据中心的 server 数量推荐为 3 个或是 5 个

**开发模式：**主要用于开发阶段（dev模式属于server模式）

## Go-Micro

Go-Micro是一个简化的微服务生态系统，提供管理微服务环境的工具和功能，默认实现了consul作为服务发现（过去曾使用mdns），通过http进行通信，通过protobuf和json进行编解码

[GitHub地址](https://github.com/go-micro/go-micro)

### Go Micro CLI

[GitHub地址](https://github.com/go-micro/cli)

下载CLI工具

```shell
go install github.com/go-micro/cli/cmd/go-micro@latest
```

### 服务端

**流程**

创建服务端Hello服务

```shell
go-micro new service Hello
```

生成项目

（原图未随仓库提供：`image-20230406235613270.png`）

删除`go.mod`、`go.sum`文件，初始化项目并安装依赖

```shell
go mod init xxx
go mod tidy
```

执行makefile文件中工作完成初始化

```shell
make proto update tidy
```

![image-20230415131403386](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/JS/20230415131452%20.png)

注意：（go mod tidy）自动安装依赖时，会有一个依赖安装失败，请手动安装

```shell
go get "go-micro.dev/v4"
```



**CLI生成的项目结构**

proto目录下的proto文件中注册了一个Hello服务，其中有一个Call方法

`Hello.pb.go`是proto文件编译生成的

![image-20230415130026079](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/JS/20230415130026%20.png)

handler目录中的`Hello.go`定义好了结构体，并实现了Call方法

![image-20230415130243400](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/JS/20230415130243%20.png)

在main中将该结构体注册为微服务

![image-20230415130756447](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/JS/20230415130756%20.png)



**服务端接入Consul**

启动本地开发环境的consul（亦可以使用consul集群），打开http://localhost:8500

```
consul agent -dev
```

GO-Micro生成的项目默认是没有使用服务发现的

但是可以使用下面的插件快速接入

```shell
go get "github.com/go-micro/plugins/v4/registry/consul"
```

main文件中，仅需修改两处即可

```go
package main

import (
	"Hello/handler"
	pb "Hello/proto"

	"github.com/go-micro/plugins/v4/registry/consul"
	"go-micro.dev/v4"
	"go-micro.dev/v4/logger"
)

var (
	service = "hello"
	version = "latest"
)

func main() {
  //--------------- 1、创建consule实例 ---------------
	consulReg := consul.NewRegistry()
  
	// Create service
	srv := micro.NewService()
	srv.Init(
		micro.Name(service),
		micro.Version(version),
    --------------- //2、在micro中使用 ---------------
		micro.Registry(consulReg),
	)

	// Register handler
	if err := pb.RegisterHelloHandler(srv.Server(), new(handler.Hello)); err != nil {
		logger.Fatal(err)
	}
	// Run service
	if err := srv.Run(); err != nil {
		logger.Fatal(err)
	}
}

```

补充

```shell
srv.Init(
		//也可以在micro中配置微服务的IP和端口。不配置则默认本机IP地址，随机指定端口
		micro.Address("127.0.0.1:8080"),
)
```

### 客户端

创建客户端项目，生成Hello-client目录

```
go-micro new client Hello 
```

![image-20230417232259639](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/JS/20230417232300%20.png)

将服务端的proto目录拷贝到项目下

![image-20230417232400951](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/JS/20230417232401%20.png)

安装项目依赖

```shell
go mod tidy
```

注意：（go mod tidy）自动安装依赖时，会有一个依赖安装失败，请手动安装

```shell
go get "go-micro.dev/v4"
```

修改main文件

```text
找到引入名为 pb 的依赖。这个依赖应该指向我们拷贝进来的proto文件，注意下依赖路径是否正确
```

![image-20230417232738075](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/JS/20230417232738%20.png)

![image-20230417233932511](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/JS/20230417233932%20.png)



客户端引入consul：在main文件中

```
go get "github.com/go-micro/plugins/v4/registry/consul"
```

```go
package main

import (
	"context"
	"time"

	pb "Hello-client/proto"

	"go-micro.dev/v4"
	"go-micro.dev/v4/logger"
)

var (
	service = "hello"
	version = "latest"
)

func main() {
  //-------------1、创建consul注册实例-------------
  consulReg:=consul.NewRegistry()
	// Create service
  //-------------2、在微服务实例中添加consul实例------------
	srv := micro.NewService(micro.Registry(consulReg))

	srv.Init()

	// Create client
	c := pb.NewHelloService(service, srv.Client())

	for {
		// Call service
		rsp, err := c.Call(context.Background(), &pb.CallRequest{Name: "John"})
		if err != nil {
			logger.Fatal(err)
		}

		logger.Info(rsp)

		time.Sleep(1 * time.Second)
	}
}

```

### 使用

本地启动consul的WEB服务，默认地址为127.0.0.1:8500。也可以使用搭建的集群

```
consul agent -dev
```

启动**服务端**，启动**客户端**



实战场景下，我们可以通过修改proto目录下的proto文件，来定义微服务，以及增加自己需要的远程调用的函数

然后在makefile文件，运行编译proto文件的命令

![image-20230418000108096](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/JS/20230418000108%20.png)

就会生成相应的Go的结构

例如：服务端增加新的微服务远程方法GetGoodInfo

```protobuf
syntax = "proto3";

package Hello;

option go_package = "./proto;Hello";

service Hello {
	rpc Call(CallRequest) returns (CallResponse) {}
	//-----------1、新增一个GetGoodInfo方法-----------
	rpc GetGoodInfo(goodRequest) returns (goodResponse){}
}

message CallRequest {
	string name = 1;
}

message CallResponse {
	string msg = 1;
}

//-----------2、定义GetGoodInfo方法入参结构-----------
message goodRequest{
	string name =1;
}

//-----------3、定义GetGoodInfo方法返参结构-----------
message goodResponse{
	string name=1;
	double price=2;
	string Msg=3;

```

然后在makefile文件，运行编译proto文件的命令。

在handler目录下，编写新的函数

```go
package handler

import (
	"context"
	"go-micro.dev/v4/logger"

	pb "Hello/proto"
)

type Hello struct{}

func (e *Hello) Call(ctx context.Context, req *pb.CallRequest, rsp *pb.CallResponse) error {
	logger.Infof("Received Hello.Call request: %v", req)
	rsp.Msg = "Hello " + req.Name
	return nil
}

//------------这里写 GetGoodInfo 方法。------------
//入参*pb.GoodRequest，返参*pb.GoodResponse。是编译proto生成的Go数据结构
func (e *Hello) GetGoodInfo(ctx context.Context, req *pb.GoodRequest, rsp *pb.GoodResponse) error {
	//函数体
	rsp.Msg = "Hello " + req.Name
	return nil
}

```



## 客户端使用Gin

在Gin中如何调用Go-Micro微服务

就是在接口触发的函数中，创建Consul实例，把Consul注册到Micro实例中，通过Micro实例调用远程的方法



