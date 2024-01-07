# Go实践项目

## 实践：日志库

[Gitee仓库地址](https://gitee.com/hyj1270433876/GoProjectByHDD/tree/master/Logger)

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

```go
// outputMode 定义一个输出接口，输出到文件和输出到控制台两个结构体都会实现这个接口的output方法
type outputMode interface {
	output(logger *Logger, curTime string, file string, line int)
}
```

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

## 实践：JWT库

JWT官网：https://jwt.io/

### JWT基础

JWT（JSON Web Tokens），其形式

```
xxxxx.yyyyy.zzzzz
```

以点分隔为3部分结构，分别为：

- alg指定签名时使用的哈希算法，typ指定令牌的类型。这部分base64编码为第一部分

  ```
  {
    "alg": "HS256",
    "typ": "JWT"
  }
  ```

- Payload

  载荷，放置数据。这部分base64编码为第二部分

  ```
  //例如：
  {
    "sub": "1234567890",
    "name": "John Doe",
    "admin": true
  }
  ```

- Signature

  签名，对编码后的Header、Payload计算签名

### 实现

[Gitee仓库地址](https://gitee.com/hyj1270433876/GoProjectByHDD/tree/master/jwt-hs256)

```go
//jwt.go
package jwt_hs256

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/base64"
	"encoding/json"
	"errors"
	"fmt"
	"strings"
)

type header struct {
	Alg string `json:"alg"`
	Typ string `json:"typ"`
}

var Secret string

// hmacSHA256 签名使用的 sha256 作为散列函数的hmac算法
func hmacSHA256(secret, message string) string {
	hasher := hmac.New(sha256.New, []byte(secret))
	hasher.Write([]byte(message))
	return base64.RawURLEncoding.EncodeToString(hasher.Sum(nil))
}

// GeneratorJWT 生成JWT
func GeneratorJWT(payload interface{}) (JWTStr string, err error) {
	//头base64Url编码
	header := header{
		Alg: "HS256",
		Typ: "JWT",
	}
	strHeader, err := json.Marshal(header)
	if err != nil {
		return
	}
	encodeHeader := base64.RawURLEncoding.EncodeToString(strHeader)

	//载荷base64Url编码
	strPayload, err := json.Marshal(payload)
	if err != nil {
		return
	}
	encodePayload := base64.RawURLEncoding.EncodeToString(strPayload)

	signStr := hmacSHA256(Secret, fmt.Sprintf("%s.%s", encodeHeader, encodePayload))
	JWTStr = fmt.Sprintf("%s.%s.%s", encodeHeader, encodePayload, signStr)
	return

}

// VerifyJWT 验证JWT是否被篡改
func VerifyJWT(JWTstr string) (isVerifyPassed bool, err error) {
	JWTSlice := strings.Split(JWTstr, ".")
	if len(JWTSlice) != 3 {
		return false, errors.New("JWT格式不正确")
	}

	res := hmacSHA256(Secret, fmt.Sprintf("%s.%s", JWTSlice[0], JWTSlice[1]))
	if hmac.Equal([]byte(res), []byte(JWTSlice[2])) {
		return true, nil
	} else {
		return false, nil
	}
}

```

## 实践：协程池

这块是并发编程相关知识的实践

[Gitee仓库地址](https://gitee.com/hyj1270433876/GoProjectByHDD/tree/master/routinePool)

```go
package main

import (
	"fmt"
)

//--------Task相关--------

// Task 任务类型，其中f字段存任务的函数
type Task struct {
	f func() error
}

// NewTask 创建Task实例
func NewTask(argFunc func() error) *Task {
	return &Task{
		f: argFunc,
	}
}

// Execute 调用Task实例中的任务函数
func (t *Task) Execute() {
	t.f()
}

//--------Pool协程池--------

// Pool 协程池类型
type Pool struct {
	EntryChannel chan *Task //暴露出来的外部队列
	JobChannel   chan *Task //内部任务队列
	MaxWorkNum   int        //最大worker数
}

// NewPool 实例化Pool
func NewPool(MaxWorkNum int) *Pool {
	return &Pool{
		EntryChannel: make(chan *Task),
		JobChannel:   make(chan *Task),
		MaxWorkNum:   MaxWorkNum,
	}
}

// worker 相当于创建一个消者
func (p *Pool) worker(ID int) {
	for task := range p.JobChannel {
		task.Execute() //
		fmt.Printf("worker ID:%v\n", ID)
	}
}

// run 启动协程池
func (p *Pool) run() {
	//1、运行maxWorkNum个的worker(消费者)
	for i := 0; i < p.MaxWorkNum; i++ {
		go p.worker(i)
	}
	//2、从入口EntryChannel取出任务，放入内部的JobChannel
	//（这部分可以实现更加复杂的逻辑，例如按照某种权重或规则取出任务，再放入JobChannel）
	for task := range p.EntryChannel {
		p.JobChannel <- task
	}
}

func main() {
	//创建任务
	t := NewTask(func() error {
		fmt.Println("运行任务")
		return nil
	})

	//创建协程池
	p := NewPool(4)

	//向协程池写入30个任务
	go func() {
		for i := 0; i < 30; i++ {
			p.EntryChannel <- t
		}
		defer close(p.JobChannel)
		defer close(p.EntryChannel)

	}()

	//运行协程池的任务
	p.run()

}

```

## 实践：ORM工具（待补充）

[好文](https://www.toutiao.com/article/7202803761163584056/?app=news_article&timestamp=1679489696&use_new_style=1&req_id=20230322205456D023EF99A27FDA2FA047&group_id=7202803761163584056&share_token=239F5B4A-3989-4055-B495-273EE8AC4185&tt_from=weixin&utm_source=weixin&utm_medium=toutiao_ios&utm_campaign=client_share&wxshare_count=1&source=m_redirect)



## 实践：BT下载器（待补充）

B站的[Go手写BT下载器](https://www.bilibili.com/video/BV13P4y1378F/?spm_id_from=333.999.0.0&vd_source=e46d9099be60057b5a16a45fac0d5248)

### BT下载原理概述



![image-20221121235542516](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20221121235542%20.png)



![image-20221121235610001](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20221121235610%20.png)

**问题1**

tracker(一个中心化的站点)，存储着某个资源的peer（每个下载过资源的用户信息）的列表

早期的BT网站站点，就是tracker，其中存储着众多的peer的列表

**问题2**

把一个资源分成若干个piece，每个peer下载不同的piece，最后组装成一个完整的资源，还要提供一个完整性校验的功能

### Torrent File格式

Torrent File（种子文件）的格式：

![image-20221122000436548](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20221122000436%20.png)

Bencode协议，其规定了4中类型。Torrent File字段中的值都是这4种类型之一

* string类型

  ```
  格式：len:xxxx
  
  例如：10:helloworld
  ```

* int类型

  ```
  格式：ixxxe
  
  例如：i789e
  ```

* list类型

  想象成切片

  ```
  格式：
  l 
  	xxx 
  e
  
  例如：
  l
  	i123e 
  	i456e 
  e
  ```

* dict类型

  想象成map类型，值为多个key和value

  ```
  格式：
  d
   xxx xxx
  e
  
  例如：
  d
   4:name 
   	3:Tom
   6:length 
   	i789e
  e
  
  上面例子可以看成
  {
  	name:Tom,
  	length:789
  }
  ```

  下面是一个Torrent File的例子：

  ![image-20221122002350870](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20221122002351%20.png)

### 实现思路

![image-20221122000934600](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20221122000934%20.png)

1. 实现一个Bencode库，实现一个序列化（将Torrent File中的内容序列化为Go语言的结构）与反序列化（将Go语言的结构生成一个Torrent File）
2. 实现一个torrent的解析库，用于解析经过Bencode库序列化后的Torrent File数据，比如：获取tracker和info字段
3. 实现tracker模块，用来获取peer信息列表
4. downloadd模块，用来下载每一个piece和校验每一个piece
5. assembler模块，组装所有piece成完整的文件



## 实践：工业级搜索引擎

### 生成倒排索引

转换效果：

```text
{1, "算法工程师", "腾讯"},
{2, "算法工程师", "阿里"},
{3, "后端工程师", "腾讯"},

 ===>
 
算法-->[1 2]
工程师-->[1 2 3]
腾讯-->[1 3]
阿里-->[2]
后端-->[3]
```

代码：

```go
package main

import (
	"fmt"
	jieba "github.com/yanyiwu/gojieba"
	"sync"
)

// Resume 简历结构体类型
type Resume struct {
	UserID            int    //简历ID
	Position, Company string //职位、公司
}

// resumeCollection 所有简历
var resumeCollection = []Resume{
	{1, "算法工程师", "腾讯"},
	{2, "算法工程师", "阿里"},
	{3, "后端工程师", "腾讯"},
}

// InvertedIndex 存储倒排索引
var InvertedIndex sync.Map

// generatorInvertedIndex 用于生成的倒排索引
// {1, "算法工程师", "腾讯"},
// {2, "算法工程师", "阿里"},
// {3, "后端工程师", "腾讯"},
// ===>
//算法-->[1 2]
//工程师-->[1 2 3]
//腾讯-->[1 3]
//阿里-->[2]
//后端-->[3]

func generatorInvertedIndex() {
	segger := jieba.NewJieba() //分词器
	defer segger.Free()

	for _, resume := range resumeCollection {
		positionSlice := segger.Cut(resume.Position, true)
		words := append(positionSlice, resume.Company)

		for _, word := range words {
			if value, ok := InvertedIndex.Load(word); !ok {
				InvertedIndex.Store(word, []int{resume.UserID})

			} else {
				InvertedIndex.Store(word, append(value.([]int), resume.UserID)) //value是any类型，这里需要断言为[]int,才能使用append函数
			}
		}

	}

}

func main() {
	generatorInvertedIndex()
	InvertedIndex.Range(func(key, value any) bool {
		fmt.Printf("%v-->%v\n", key, value)
		return true
	})
}
```

### 二进制知识补充

**进制**

常用的就是二进制、十进制、十六进制

十进制：我们日常生活中采用的

```text
每一位由0-9表示，满10进一位

在代码中，数字默认为十进制，
例如：100
```

二进制：

```text
每一位仅有0、1两种表示，满2进一位

在代码中，不使用二进制位，比如表示十进制数字1024，需要写10000000000，这会很长，所以我们通常用十六进制表示二进制（后面讲到）

在计算机底层是使用二进制的
```

十六进制：

```text
每一位仅有0-9、A（10）、B（11）、C（12）、D（13）、E（14）、F（15）表示，满16进一位

在代码中，0x开头代表是十六进制数字，
例如：0x1B

使用十六进制表示二进制会十分简洁，二进制、十六进制如何转换？

二进制数 1111 ，对应十进制数8 4 2 1，刚好加起来是15。十六进制的一位的范围是0-15的，刚好是4个二进制位表示的范围。所以：
二进制11111000 => 0xF8 (高四位都是1，对应15（即F）；低四位对应8)
十六进制0x7F => 01111111（高四位0111，即4+2+1=7；低四位1111，即8+4+2+1=15即F）
```



**位运算**

数字260、-260的二级制表示：

![image-20230218155336327](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Go/20230218155336%20.png)

Go语言中的位运算总结：

![image-20230218155419810](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Go/20230218155420%20.png)

`负数`：将正数的二进制每一位取反，然后在最后一位+1。也等价为，正数最后一个1及其往后的部分不变，往前的部分取反

`&`（与）：对应位都为1，结果为1。否则为0

`|`（或)：对应位只要一个为1，结果为1。否则为0

`^`（异或）：位于两数之间，对应位不相同，结果为1.否则为0； 位于一个数之前，则按位取反

`>>` (右移)：x>>y，表示x的二进制位右移y位，正数高位补0，负数高位补1。结果正数仍然为正数，负数仍然为负数

`<<` (左移)：x<<y，表示x的二进制位右移y位,低位补0。



位运算技巧：

0x7F是十六进制数7F，转化为二进制是`01111111`（7个1）

```
&
1、用于判断是否存在1
将n&(二进制位全是1的数字),如果不等于0，即n的对应二进制位中存在1
例子：n&0x7F!=0，代表数字n的低7位，存在1

2、整理数字
n&1结果保留n的对应位，n&0结果变为0
例子：假设n是int64类型，即64位二进制位，则n&(111)的结果是，保留n的低3位，将n的高61位全部变为0
```

```
|
1、整理数字
n|1结果变为1，n|0结果变保留n的对应位
例子：假设n是int64类型，即64位二进制位，则n|(111)的结果是，保留n的高61位，将n的低3位全部变为1
```



### 更新索引

倒排索引的key是文本，value是一个切片，切片的子元素是数字（int64）

int64用8个字节表示一个数字，对于绝大多数索引来说浪费空间，可以通过位运算来压缩空间



**变长int**

通过位运算压缩int64，可极大的节省空间

规则如下图展示的，260这个数字仅用2个字节就可以存储

![image-20230218155918293](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Go/20230218155918%20.png)

```go
package main

import (
	"bytes"
	"math"
	"strings"
)

// binaryFormat 将十进制数字（int64）转换为对应的64位二进制形式
func binaryFormat(n int64) string {
	c := int64(math.Pow(2, 31))
	var res strings.Builder
	for i := 0; i < 32; i++ {
		if n&c != 0 {
			res.WriteString("1")
		} else {
			res.WriteString("0")
		}
		c >>= 1
	}
	return res.String()
}

// encodeVint 将int64类型的数字，按照如下规则编码，输出编码后的数字（64位的int64将做多编码为8个uint8数字,byte是uint8的别名）
// 规则：依次取出低7位，如果剩余高位上还有1，则把第8位置为1；否则 第8位置为0，退出循环
func encodeVint(n int64) []byte {
	buffer := bytes.Buffer{}
	for n&^0x7F != 0 { //高位存在1
		buffer.WriteByte(byte((uint(n) & 0x7F) | 0x80))
		n >>= 7
	}

	buffer.WriteByte(byte(n)) //高位不存在1的，这里需要写入下
	return buffer.Bytes()
}

func decodeVint(bs []byte) int {
	var n int = 0
	shift := 0
	i := 0
	for ; (bs[i]&0x80) != 0 && i < 8; i++ {
		n |= int(bs[i]) & 0x7F << shift
		shift += 7
	}
	//第8位是0的，在这里写入
	n |= int(bs[i]) & 0x7F << shift
	return n
}

```



**集合求交**



跳表

![image-20230226011617060](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Go/20230226011617%20.png)

```go

```



