# Go Web学习

大体分为两个部分

* Go标准库实现Web开发
* Gin框架实现Web开发

# Go标准库



## Go标准库模版渲染

> 只对一些常用的用法进行学习记录，更多用法请查看下面这篇文章
>
> [李文周的博客——学习Go语言标准库之http/template](https://www.liwenzhou.com/posts/Go/go_template/)



Go语言内置了文本模板引擎`text/template`和用于HTML文档的`html/template`。它们的作用机制可以简单归纳如下：

```text
1 、模板文件通常定义为 .tmpl 和 .tpl 为后缀（也可以使用其他的后缀），必须使用 UTF8编码（Go语言使用UTF-8编码）

2 、模板文件中使用{{和}}包裹和标识需要传入的数据，其他内容均不做修改原样输出。

3 、传给模板这样的数据就可以通过点号（.）来访问，如果数据是复杂类型的数据，可以通过{{ .字段名 }}来访问它的字段
```



**解析为模版对象**

下面的方法可以去解析模板文件，得到模板对象：

```go
func (t *Template) Parse(src string) (*Template, error) //解析字符串，返回模版对象
func ParseFiles(filenames ...string) (*Template, error) //解析文件，参数是文件地址（可以是多个），返回模版对象
func ParseGlob(pattern string) (*Template, error)       //解析Glob匹配到的所有文件，返回模版对象
```

注意：

也可以使用`func New(name string) *Template`函数创建一个名为`name`的模板，我们可以在这个模版上定义一些**自定义方法**、**修改默认标识符**等自定义行为，然后再对其调用上面的方法去解析模板字符串或模板文件。

（在【模版函数】、【自定义操作符】章节中会用到，【补充踩坑】章节也解释了默认情况下，模版名文件名，就是name）

**模版渲染**

解析一个文件，不用指定名字

```go
func (t *Template) Execute(wr io.Writer, data any) error {
		//....
}
```

解析多个文件，返回多个模版对象，必须指定模版文件名来确定返回哪个模版对象

```go
func (t *Template) ExecuteTemplate(wr io.Writer, name string, data any) error {
		//....
}
```



### 简单例子

使用Go语言的标准库 `"html/template"`

main.go

```go
package main

import (
	"fmt"
	"html/template"
	"net/http"
)

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
    
    //1.解析模版文件（读取模版文件）
		tpl, err := template.ParseFiles("./index.tpl")
		if err != nil {
			fmt.Printf("解析出错,err:%v", err)
      return
		}
    
    //2.模版渲染（把第二个参数填写到模版文件中,模版中的点就是传入的数据）
		err = tpl.Execute(w, "jack")
		if err != nil {
			fmt.Printf("渲染模版出错,err:%v", err)
      return
		}
	})

	http.ListenAndServe(":9090", nil)
}

```

index.tpl

```html
<!DOCTYPE html>
<html>
    <head></head>
    <body>
        你好，{{.}}
    </body>
</html>
```

### 模版基础

模版注释【左（右）花括号与左（右）注释之间不能有空格】

```html
{{/* a comment */}}
```

模版内变量

```html
//定义变量a
{{$a}}

//变量初始化
{{$a:=1000}}
```

去除空格【左（右）花括号与左（右）横杠之间不能有空格】

```
{{- .Name -}} 
```

管道符【|前面的命令会将运算结果(或返回值)传递给后一个命令的最后一个位置】

```
//将$a的值传递给method作为参数

{{$a|method}} 
```



### 模版参数

参数为结构体【注意：字段必须首字母大写，模版才能访问到】

```go
type Stu struct {
	Name string
	Age  int
}

tpl.Execute(w, Stu{Name: "jack", Age: 18})


//模版中
{{.Name}} 、{{.Age}}
```

参数为map

```go
//main.go
tpl.Execute(w, map[string]string{
   "name": "jack",
   "age":  "18",
})

//模版中,可直接根据key取出value
{{.name}} 、{{.age}}
```

参数是复杂数据时，可以让map的value是空接口类型

```go
tpl.Execute(w, map[string]interface{}{
			"studentInfo": map[string]string{
				"name": "jack",
				"age":  "18",
			},
			"hobby": []string{
				"唱歌",
				"跳舞",
			},
})
```



### 条件渲染

判断.studentInfo.age是否大于10

```go
{{if gt .studentInfo.age 10}}
年龄大于10岁
{{else eq .studentInfo.age 10}}
年龄等于10岁
{{else}}
年龄小于10岁
{{end}}
```

比较函数

```text
eq      如果arg1 == arg2则返回真
ne      如果arg1 != arg2则返回真
lt      如果arg1 < arg2则返回真
le      如果arg1 <= arg2则返回真
gt      如果arg1 > arg2则返回真
ge      如果arg1 >= arg2则返回真
```

除eq外，其他函数只有两个参数。eq可以有多个参数，只有第一个参数和后面的所有数都相等，才返回true

```
eq a b c d
```



### 循环渲染

循环的数据类型必须是数组、切片、字典或者通道

切片、数组

```html
{{range $index,$value :=.hobby}}
    {{$index}}---{{$value}}
{{end}}
```

字典

```
{{range $index,$value :=.stuInfo}}
    {{$index}}---{{$value}}
{{end}}
```



### 模版函数

Go模版中提供了一些预定义函数

```text
and
    函数返回它的第一个empty参数或者最后一个参数；
    就是说"and x y"等价于"if x then y else x"；所有参数都会执行；
or
    返回第一个非empty参数或者最后一个参数；
    亦即"or x y"等价于"if x then x else y"；所有参数都会执行；
not
    返回它的单个参数的布尔值的否定（布尔函数会将任何类型的零值视为假，其余视为真）
len
    返回它的参数的整数类型长度
index
    执行结果为第一个参数以剩下的参数为索引/键指向的值；
    如"index x 1 2 3"返回x[1][2][3]的值；每个被索引的主体必须是数组、切片或者字典。
print
    即fmt.Sprint
printf
    即fmt.Sprintf
println
    即fmt.Sprintln
html
    返回与其参数的文本表示形式等效的转义HTML。
    这个函数在html/template中不可用。
urlquery
    以适合嵌入到网址查询中的形式返回其参数的文本表示的转义值。
    这个函数在html/template中不可用。
js
    返回与其参数的文本表示形式等效的转义JavaScript。
call
    执行结果是调用第一个参数的返回值，该参数必须是函数类型，其余参数作为调用该函数的参数；
    如"call .X.Y 1 2"等价于go语言里的dot.X.Y(1, 2)；
    其中Y是函数类型的字段或者字典的值，或者其他类似情况；
    call的第一个参数的执行结果必须是函数类型的值（和预定义函数如print明显不同）；
    该函数类型值必须有1到2个返回值，如果有2个则后一个必须是error接口类型；
    如果有2个返回值的方法返回的error非nil，模板执行会中断并返回给调用模板执行者该错误；
```

自定义函数

```go
package main

import (
	"fmt"
	"html/template"
	"net/http"
)

type Stu struct {
	Name string
	Age  int
}

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
    
    //---------自定的函数------------
    //如果有两个返回值，第二个必须是error对象
		myGetStuAge := func(name string) string {
			return "你好," + name
		}
    
    //1.创建模版对象
		t := template.New("index.tpl")
    //2.在模版对象上注册自定义函数
		t.Funcs(template.FuncMap{
			"getStuAge": myGetStuAge,  //属性是模版中的使用的函数名，值是go代码中定义的函数名
		})
    
    //3.将模版对象和解析文件得到的模版对象绑定
		tpl, err := t.ParseFiles("./index.tpl")
		if err != nil {
			fmt.Printf("解析出错,err:%v", err)
      return
		}
    
    //4.渲染模版
		err = tpl.Execute(w, map[string]interface{}{
			"studentInfo": map[string]interface{}{
				"name": "jack",
				"age":  18,
			},
			"hobby": []string{
				"唱歌",
				"跳舞",
			},
		})
		if err != nil {
			fmt.Printf("渲染模版出错,err:%v", err)
      return
		}
	})

	http.ListenAndServe(":9090", nil)
}

```

模版中使用自定义函数

```html
{{getStuAge .studentInfo.name}}
```

### 嵌套模版(template)

即，模版页面中，直接引入其他模版页面

* 这个template可以是单独的模版文件
* 也可以是通过`define`定义的区域

例子中，ul.tmpl是单独的文件，ol.tmpl是通过`define`定义的template

**t.tpl**

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
</head>
<body>
    
    <h1>测试嵌套template语法</h1>
    <hr>
    {{template "ul.tmpl"}}
    <hr>
    {{template "ol.tmpl"}}
</body>
</html>


{{ define "ol.tmpl"}}
	<ol>
    你好，这里是ol.tpl文件
	</ol>
{{end}}
```

**ul.tpl**

```html
<ul>
    你好，这里是 ul.tpl 文件
</ul>
```

**main.go**

```go
func tmplDemo(w http.ResponseWriter, r *http.Request) {
	tmpl, err := template.ParseFiles("./t.tpl", "./ul.tpl") //注意这里有先后顺序限制。ul包含在t之中，所以t在前面
	if err != nil { 
		fmt.Println("create template failed, err:", err)
		return
	}
	
	tmpl.Execute(w, nil) //不传递数据
}
```

### 模版继承(block)

定义块

```html
{{block "名字" .}}{{end}}  //点的含义是，将所在模版的数据，传入block中
```

创造一个区域，上一节，使用define定义了一个模版

```html
{{define "名字"}}
    块中的内容{{.}}
{{end}}
```

**案例**

[代码仓库地址](https://gitee.com/hyj1270433876/GoProjectByHDD/tree/master/goGin)

common.tpl是基本模版，subA.tpl和subB.tpl只是修改了其中block区域的内容

subA.tpl

```html
{{/*继承根模版*/}}
{{template "common.tpl" .}}


{{/*重新定义根模版中的块模版*/}}
{{define "content"}}
 	这里是{{.}}
{{end}}
```

subB.tpl

```html
{{/*继承根模版*/}}
{{template "common.tpl" .}}
{{/*重新定义块模版*/}}
{{define "content"}}
    这里是{{.}}
{{end}}
```

common.tpl

```html
<!DOCTYPE html>
<html>
    <head>
        <style>
            *{
                margin: 0;
                padding: 0;
            }
            .nav{
                width: 100vw;
                height: 100px;
                background: red;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .main{
                width: 100vw;
                height: 100vh;
                display: flex;
                justify-content: space-between;
            }
            .sider{
                width: 200px;
                height: 100%;
                background: greenyellow;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .content{
                flex-grow: 1;
            }
        </style>
    </head>
    <body>
        <div>
            <div class="nav">顶部导航栏</div>
            <div class="main">
                <div class="sider">侧边栏</div>
                <div class="content">
                    {{block "content" .}}{{end}}
                </div>
            </div>
        </div>
    </body>
</html>
```

main.go

```go
package main

import (
	"fmt"
	"html/template"
	"net/http"
)

type Stu struct {
	Name string
	Age  int
}

func main() {
	http.HandleFunc("/subA", func(w http.ResponseWriter, r *http.Request) {

		tpl, err := template.ParseFiles("./template/common.tpl", "./template/subA.tpl") //注意顺序
		
    if err != nil {
			fmt.Printf("解析出错,err:%v", err)
      return
		}
		err = tpl.Execute(w, "subA")
		if err != nil {
			fmt.Printf("渲染模版出错,err:%v", err)
      return
		}
	})
	http.HandleFunc("/subB", func(w http.ResponseWriter, r *http.Request) {

		tpl, err := template.ParseFiles("./template/common.tpl", "./template/subA.tpl") //注意顺序
		if err != nil {
			fmt.Printf("解析出错,err:%v", err)
      return
		}
		err = tpl.Execute(w, "subB")
		if err != nil {
			fmt.Printf("渲染模版出错,err:%v", err)
      return
		}
	})

	http.ListenAndServe(":9090", nil)
}

```

### 补充踩坑

在Go代码中解析模版文件时，需要明确文件所在路径

```
tmpl, err := template.ParseFiles("./a.tpl", "./b.tpl") 
```

所以，在模版文件，才可以直接使用，而不用考虑路径

```
{{template "a"}}

{{template "b"}}
```

如果没有解析对应文件，在模版中就找不到对应的template

还有一点就是

xxx.tpl解析时，默认为一个名为xxx的模块，所以前面【嵌套模版（template）】的例子中，能直接通过

```
{{template "ul.tmpl"}}
```

就把ul.tmp插入了其他模版中



如果，不希望模版名（name）为文件名，可以再模版首尾增加

```
{{define "新名字"}}
		原本内容
{{end}}
```



### 自定义操作符

模版中的默认操作符是双花括号，Vue中也是，所以可能会有些场景下，发生冲突

在解析文件前，使用Delims函数自定义操作符

```go
http.HandleFunc("/subA", func(w http.ResponseWriter, r *http.Request) {
	tpl,err:=template.New("index.tpl").Delims("{[","]}").ParseFiles("./index.tpl")
	if err != nil {
		fmt.Printf("解析出错,err:%v", err)
    return
	}
	err = tpl.Execute(w, "subA")
	if err != nil {
		fmt.Printf("渲染模版出错,err:%v", err)
    return
	}
})
```

### html/template与text/template的区别

```text
html/template 会把 {{.}} 中的html、js、css代码做转译，转化为文字，避免xss攻击
```

如果不想要自动转译，希望能正常执行，可以自定义一个函数，即使用template.HTML方法

```go
http.HandleFunc("/subA", func(w http.ResponseWriter, r *http.Request){
	tmpl,err := template.New("index.tmpl").Funcs(template.FuncMap{
		"safe": func(s string)template.HTML {
			return template.HTML(s)
		},
	}).ParseFiles("./index.tmpl")
	if err != nil {
		fmt.Println("解析模版失败, err:", err)
		return
	}
	Str := `<script>alert('123')</script>`
	err = tmpl.Execute(w, Str)
	if err != nil {
		fmt.Println("渲染模版失败, err:", err)
		return
	}
})
```

使用

```html
{{.|safe}}
```

Gin框架是一个使用Go语言开发的高性能Web框架



# Gin框架开始



## Gin的简单例子

新建文件夹goGin

```shell
go mod init goGin 

go get -u github.com/gin-gonic/gin
```

新建main.go 文件

```go
package main

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func main() {
	//1. 创建一个默认的路由引擎
	r := gin.Default()

	//2. Get请求
	r.GET("/hi", func(context *gin.Context) {
		//http.StatusOK是一个状态码常量，就是200
		context.JSON(http.StatusOK, gin.H{
			"message": "你好",
		})
	})

	//3. 启动，默认在8080端口启动服务
	r.Run()
}

```

访问`http://127.0.0.1:8080/hi`，看到返回的结果



## 返回响应数据

### Gin返回HTML

也就是使用Gin做模版渲染

* 加载模版文件 （等同于Go标准库中的ParseFiles、ParseGlob）

  ```go
  r.LoadHTMLGlob("glob字符串")
  
  r.LoadHTMLFiles("模版文件路径","模版文件路径")
  ```

* HTML方法

  ```go
  func main() {
  	r := gin.Default()
  	r.LoadHTMLGlob("templates/**/*")
  	//r.LoadHTMLFiles("templates/posts/index.html", "templates/users/index.html")
  	r.GET("/posts/index", func(c *gin.Context) {
  		c.HTML(http.StatusOK, "posts/index.html", gin.H{
  			"title": "posts/index",
  		})
  	})
  
  	r.GET("users/index", func(c *gin.Context) {
  		c.HTML(http.StatusOK, "users/index.html", gin.H{
  			"title": "users/index",
  		})
  	})
  
  	r.Run(":8080")
  }
  ```

* 静态文件

  html中引用的静态资源，比如：css、js、image

  ```go
  r := gin.Default()
  r.Static("html中静态文件地址", "文件的实际位置")
  ```

  比如：打开玩网页，可以在控制台看到，访问了/static/*等一系列静态资源。这些资源我们放在项目根目录下的static目录
  
  ![image-20220612164251706](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Go/20220612164252%20.png)
  
  ```go
  r.Static("/static", "./static")
  ```
  
  

### Gin返回JSON

map

gin.H

结构体

```go
package main

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func main() {
	r := gin.Default()
	r.GET("/hi", func(context *gin.Context) {
		//1.map作为参数
		//data := map[string]string{
		//	"name": "jack",
		//	"age":  "18",
		//}

		//2. 使用gin.H ,其实就是map[string]interface{}类型
		//data := gin.H{
		//	"name": "jack",
		//	"age":  18,
		//}

		//3.结构体
		type JSONData struct {
			name string
			age  int
		}
		data := JSONData{
			Name: "jack",
			Age:  18,
		}
		context.JSON(http.StatusOK, data) //JSON方法做了一个JSON序列化的操作
	})
	r.Run(":9080")
}

```

注意：

* 如果使用结构体，必须首字母大写，才能正常返回字段
* 如果想要返回小写首字母的字段，或者想要返回重命名的字段，可以使用tag

```go
type JSONData struct {
	Name string `json:"name"`
	Age  int    `json:"age"`
}
```

### 响应参数规范

一般应该遵循统一的返回规范

```text
{
	"code": 0,
	"msg": "这里是错误原因说明",
	"data": {} // 业务数据
}
```

**code**

业务状态码，用来表示业务请求是否成功

```text
0     //代表成功

小于0 //代表发生错误

大于0 //代表成功，但是有额外步骤
```

举例子，不同code的含义，注意具体原因还是应该通过msg返回

```
1 注册成功，但是需要完善个人资料
0 成功
-1 参数不全
```

**msg**

当code小于0时，msg字段为错误原因

code大于等于0，msg字段为`ok`

**data**

业务数据

请求返回的结果放在这里面



## 获取请求数据

### 请求基础

**Get请求**

通过URL传递数据 

```url
xxx.com?name=jack&age=18
```

**Post请求**

Post请求将传递的数据放在请求体中

分为：

* form-data

  可以从Postman工具的Body字段得知，form-data可以传递多条键值对数据，数据值可以是字符串/文件

  form-data是可以上传多个文件的，这是与binary最大的不同

  ![image-20220605181331396](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Go/20220605181331%20.png)

  同时，在Content-Type字段指定了数据类型、在boundary 字段中指明了分割每条数据的字符串

  ![image-20220612165822500](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Go/20220612165822%20.png)

* x-www-from-urlencoded

  可以传递多条键值对数据，数据值只能是字符串。所以，不能上传文件

  ![image-20220605181537038](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Go/20220605181537%20.png)

  Content-Type指明类型，其数据是以键值对的形式进行URL编码后存在请求体中发送的

  ![image-20220612170037469](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Go/20220612170037%20.png)

* raw

  传递文本数据

  可以上传任意格式的文本，对应不同的Content-Type值

  * `text ` content-type=text/plain
  * `js` application/javascript
  * `css` text/css
  * `json` application/json
  * `html`  text/html
  * `xml` text/xml

  ![image-20220605181653494](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Go/20220605181653%20.png)

* binary

  只可以上传二进制数据，通常用来上传文件，由于没有键值，所以，一次只能上传一个文件

  Content-Type:application/octet-stream

**html的表单**

表单是最常见的 POST 提交数据的方式了。浏览器的原生 `<form> `表单，如果不设置 enctype 属性，那么最终就会以 application/x-www-form-urlencoded 方式提交数据。如果想使用表单 **上传文件** 时，必须让`<form>`表单的enctype属性值为 multipart/form-data

```html
<form action="/login" method="post">
    First name: <input type="text" name="username"><br>
    Last name: <input type="text" name="password"><br>
    <input type="submit" value="提交">
</form>
```



### Get请求获取URL参数（queryString）

前面的例子都是使用的Get请求

这里补充下，获取Get请求的参数的方法

Query、DefaultQuery、GetQuery

```go
package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
)

func main() {
	r := gin.Default()

	r.GET("/hi", func(context *gin.Context) {
		//获取指定key，key不存在，返回空字符串
		str1 := context.Query("name")
		fmt.Printf("Query:%v\n", str1)

		//获取指定key，key不存在，返回默认值
		str2 := context.DefaultQuery("name", "默认值")
		fmt.Printf("DefaultQuery:%v\n", str2)

		//获取指定key，key不存在，返回空字符串
		str3, ok := context.GetQuery("name")
		if !ok {
			fmt.Println("GetQuery:不存在此key值")
		}
		fmt.Printf("DefaultQuery:%v", str3)

		context.JSON(http.StatusOK, str1)
	})
	r.Run(":9080")
}
```

### Post请求获取表单数据（x-www-from-urlencoded）

Go语言命名中常常出现的Form相关的变量、方法都是用来处理x-www-from-urlencoded的

PostForm、DefaultPostForm、GetPostForm，与Get请求中取参数的函数相同

例子

 ![2022-06-05 12.21.25](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/JS/20220605122216%20.gif)

**main.go**

```go
package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
)

func main() {
	r := gin.Default()
  //加载模版文件，模版名默认为文件名。下面返回登陆页面时，通过指定名字返回对应的页面
	r.LoadHTMLFiles("./login.html", "./loginSuccess.html")
	//返回登陆页面
	r.GET("/login", func(context *gin.Context) {
		context.HTML(http.StatusOK, "login.html", nil) 
	})
  
	//登陆页面form标签发起post请求
	r.POST("/login", func(context *gin.Context) {
		username := context.PostForm("username")
		password := context.PostForm("password")
		fmt.Printf("用户名：%v 密码：%v\n", username, password)
    //返回登陆成功页面
		context.HTML(http.StatusOK, "loginSuccess.html", gin.H{
			"username": username,
			"password": password,
		})
	})
	r.Run(":9080")
}

```

**login.html**

登陆页面，使用form表单，【请求基础】中提到过form表单默认的enctype是x-www-from-urlencoded，即以键值对的形式传递数据。`input`标签的type是类型，name就是上传的键值对的的key

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>登陆</title>
</head>
<body>
    <div>
        <form action="/login" method="post">
            First name: <input type="text" name="username"><br>
            Last name: <input type="text" name="password"><br>
            <input type="submit" value="提交">
        </form>
    </div>
</body>
</html>
```

loginSuccess.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>登陆成功</title>
</head>
<body>
    你好，{{.username}}
    密码是：{{.password}}
</body>
</html>
```

### Post请求获取上传文件（form-data）

Go语言命名中常常出现的MultipartForm相关的变量、方法都是用来处理form-data的

**上传单个文件**

main.go

```go
package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"path"
)

func main() {
	r := gin.Default()
	r.LoadHTMLFiles("./upload.html")
	//上传页面
	r.GET("/uploadFile", func(context *gin.Context) {
		context.HTML(http.StatusOK, "upload.html", nil)
	})
	//处理上传请求
	r.POST("./upload", func(context *gin.Context) {
		file, err := context.FormFile("file1") //value值是文件，参数是文件对应的key，也就是input标签的name值
		if err != nil {
			context.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(), //错误接口中的Error方法返回字符串
			})
		} else {
			//拼接文件路径，为当前路径
			dst := path.Join("./", file.Filename)
			//保存文件到指定路径
			err := context.SaveUploadedFile(file, dst)
			if err != nil {
				fmt.Printf("保存文件失败，err:%v", err)
			}
			context.JSON(http.StatusOK, gin.H{
				"status": "ok",
			})
		}
	})
	r.Run(":9000")
}

```

upload.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>上传</title>
</head>
<body>
  <form action="./upload" method="post" enctype="multipart/form-data">
      <input type="file" name="file1">
      <input type="submit" value="提交">
  </form>
</body>
</html>
```

**修改文件大小限制**

 处理multipart forms提交文件时默认的内存限制是32 MiB ,可以通过下面的方式修改

```go
router.MaxMultipartMemory = 8 << 20  // 8 MiB
```

**上传多个文件**

使用MultipartForm接收

```go
func main() {
	router := gin.Default()
	// 处理multipart forms提交文件时默认的内存限制是32 MiB
	// 可以通过下面的方式修改
	// router.MaxMultipartMemory = 8 << 20  // 8 MiB
	router.POST("/upload", func(c *gin.Context) {
		// Multipart form
		form, _ := c.MultipartForm()
		files := form.File["file"]

		for index, file := range files {
			log.Println(file.Filename)
			dst := fmt.Sprintf("C:/tmp/%s_%d", file.Filename, index)
			// 上传文件到指定的目录
			c.SaveUploadedFile(file, dst)
		}
		c.JSON(http.StatusOK, gin.H{
			"message": fmt.Sprintf("%d files uploaded!", len(files)),
		})
	})
	router.Run()
}
```

html中就是多个上传的input即可

```html
<form action="./upload" method="post" enctype="multipart/form-data">
      <input type="file" name="file1">
  		<input type="file" name="file2">
      <input type="submit" value="提交">
  </form>
```



### Post请求获取JSON数据（raw）

raw类型虽然可以传输很多格式的数据，但实际上一般都是传递JSON格式

```go
r.POST("/json", func(c *gin.Context) {
	b, _ := c.GetRawData()  // 从c.Request.Body读取请求数据
	// 定义map或结构体
	var m map[string]interface{}
	// 反序列化
	_ = json.Unmarshal(b, &m)

	c.JSON(http.StatusOK, m)
})
```

### 获取请求路径中的参数

访问`http://127.0.0.1:9080/login/123` ,123就会被接收到

````go
r.GET("/login/:username", func(context *gin.Context) {
		fmt.Println(context.Param("username"))
  	//或者通过Params属性
    //string,ok:=context.Params.Get("id")
})
````

### 接口设计规范

基本结构

```go
/{系统类型或者api}/{版本号}/{功能模块}/{具体操作}
```

例如

```
App登录：/app/v1/user/login
微信程序登陆：/wechat/app/v1/user/login
管理后台登录：/admin/v1/user/login


创建群：/app/v1/group/create
群列表：/app/v1/group/list
```



## 自动绑定数据

上一章节，获取数据后，需要手动的存储到变量中

这章学习自动将接收到的参数，绑定到变量上

### 总述

Context的绑定相关的方法非常多，到底是用哪一个呢？

主要取决于

* 是否需要指定Binding
* 是否需要自动写入400状态码。Context的MustBindWith方法比ShouldBindWith多了一步处理返回体状态码的操作

![image-20220614142107096](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Go/20220614142107%20.png)

### Context.Bind的调用流程

以Context.Bind为例子，介绍下流程

**Context.Bind**

```go
Context.Bind(用于存储数据的结构体obj)  

1、binding.Default(c.Request.Method, c.ContentType())   //根据请求方法和Content-Type创建不同的Binding对象对象

2、return c.MustBindWith(obj, b) //返回context调用
```

不同的binding对象

```go
var (
	JSON          = jsonBinding{}
	XML           = xmlBinding{}
	Form          = formBinding{}
	Query         = queryBinding{}
	FormPost      = formPostBinding{}
	FormMultipart = formMultipartBinding{}
	ProtoBuf      = protobufBinding{}
	MsgPack       = msgpackBinding{}
	YAML          = yamlBinding{}
	Uri           = uriBinding{}
	Header        = headerBinding{}
	TOML          = tomlBinding{}
)
```

**Context.MustBindWith**

```go
.MustBindWith(用于存储数据的结构体obj, 根据上一步根据请求方法和Content-调用Binding对象)

1、c.ShouldBindWith(obj, b); //调用ShouldBindWith

2、c.AbortWithError(http.StatusBadRequest, err).SetType(ErrorTypeBind) //向响应体的状态码中写入400，设置错误类型
```



**Context.ShouldBindWith**

```
Context.ShouldBindWith(用于存储数据的结构体obj, 根据上一步根据请求方法和Content-Typ返回的调用Binding对象)

1、b.Bind(c.Request, obj) //调用Binding对象（提醒下，这个前面请求方法和Content-Typ决定的）的Bind方法
```



**binding.Bind**

这一步才到真正绑定数据到变量

```
binding.Bind(Content中的请求体, 用于存储数据的结构体obj)

这个方法只能绑定 queryString、raw中是JSON数据、 x-www-from-urlencode
```



### ShouldBind/Bind

使用ShouldBind/Bind可以自动提取`queryString`、`x-www-from-urlencoded`、`form-data`、`raw中的JSON数据`的数据，并把值绑定到指定的结构体对象

原理：基于请求的`Content-Type`识别请求数据类型并利用反射机制自动提取请求数据到结构体中

有两点注意：

* ShouldBind/Bind参数是存放数据的结构体，因为要操作结构体，所以必须是指针类型

* 结构体名、结构体字段首字母大写

* 如果想将接收到的参数a存储到Name字段，参数 b存储到Age字段。那么就需要使用tag

  ```go
  type User struct {
    Name string `form:a`
  	Age  string `form:b`
  }
  ```

* 存储数据的结构体变量，如果某个字段接收不到值，该字段默认为零值

**ShouldBind例子**

GET请求发送queryString

```go
package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
)

type Stu struct {
	Name string `form:"name"`
	Age  int    `form:"age"`
}

func main() {
	r := gin.Default()
	r.GET("/index", func(context *gin.Context) {
		var s Stu
		if err := context.ShouldBind(&s); err != nil {
			fmt.Printf("err: %v", err)
      context.JSON(http.StatusOK, gin.H{
				"msg": err,
			})
			return
		}
		context.JSON(http.StatusOK, gin.H{
			"msg": s,
		})

	})
	r.Run(":9090")
}

```

![image-20220614143910400](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Go/20220614143910%20.png)

POST请求发送x-www-urlencoded、form-data、raw中的JSON数据

```go
//只需要将方法改成POST即可
r.POST("/index", func(context *gin.Context){
		//xxxx
})
```

**Bind例子**

用法与ShouldBind一模一样，唯一的区别就是返回的状态码



以POST请求发送`raw类型的JSON数据`为例子，如果前端发送以下数据，name被接收到，但是绑定到Stu类型的结构体的Name字段时，由于Name是string类型，所以一定会绑定出错

```go
{
    "name":{
        "abc":122
    }
    
}
```



Bind会在返回体中设置状态码为400

![image-20220614104247216](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Go/20220614104247%20.png)

ShouldBind

![image-20220614104337103](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Go/20220614104337%20.png)



### ShouldBindUri/BindUri

用于绑定**请求路径中的参数**

BindUri比ShouldBindUri多一个绑定出错时，有400状态码返回

```go
package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
)

type Stu struct {
	Name string `uri:"name"`
	Age  int    `uri:"age"`
}

func main() {
	r := gin.Default()
	r.GET("/index/:name/:age", func(context *gin.Context) {
		var s Stu
		if err := context.BindUri(&s); err != nil {
			fmt.Printf("err: %v", err)
			context.JSON(http.StatusOK, gin.H{
				"msg": err,
			})
			return
		}
		context.JSON(http.StatusOK, gin.H{
			"msg": s,
		})

	})
	r.Run(":9090")
}
```

![image-20220614143806725](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Go/20220614143806%20.png)

注意这里使用uri字段作为tag

```go
type Stu struct {
	Name string `uri:"name"`
	Age  int    `uri:"age"`
}
```

其tag和路径中的名字对应上

```go
r.GET("/index/:name/:age", func(context *gin.Context) {
  //xxxxx
})
```



## 重定向

### HTTP重定向

访问`http://127.0.0.1:9000/index`，浏览器地址栏直接重定向到百度首页

```go
r.GET("./index", func(context *gin.Context) {
		context.Redirect(http.StatusMovedPermanently, "http://www.baidu.com")
})
```

### 路由重定向

访问`http://127.0.0.1:9000/a`，浏览器地址没有变化，返回`{"message": "处理/b的函数中",}`

```go
r.GET("./a", func(context *gin.Context) {
  //1.修改路由地址为/b
	context.Request.URL.Path = "/b"
  //2.继续处理这个路由请求
	r.HandleContext(context)
})

r.GET("./b", func(context *gin.Context) {
	context.JSON(http.StatusOK, gin.H{
		"message": "处理/b的函数中",
	})
})
```

## Gin路由

复习下

**常用的四种路由方式**

```go
package main

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func main() {
	r := gin.Default()
	r.GET("/user", func(context *gin.Context) {
		context.JSON(http.StatusOK, gin.H{
			"msg": "Get",
		})
	})
	r.POST("/user", func(context *gin.Context) {
		context.JSON(http.StatusOK, gin.H{
			"msg": "Post",
		})
	})
	r.PUT("/user", func(context *gin.Context) {
		context.JSON(http.StatusOK, gin.H{
			"msg": "Put",
		})
	})
	r.DELETE("/user", func(context *gin.Context) {
		context.JSON(http.StatusOK, gin.H{
			"msg": "Delete",
		})
	})
	r.Run(":9000")
}
```

简写

```go
r.Any("/book", func(context *gin.Context) {
	switch context.Request.Method {
	case http.MethodGet:
		{
			context.JSON(http.StatusOK, gin.H{
				"msg": "Get",
			})
		}
	case http.MethodPost:
		{
			context.JSON(http.StatusOK, gin.H{
				"msg": "Post",
			})
		}
	case http.MethodPut:
		{
			context.JSON(http.StatusOK, gin.H{
				"msg": "Put",
			})
		}
	case http.MethodDelete:
		{
			context.JSON(http.StatusOK, gin.H{
				"msg": "Delete",
			})
		}

	}
})
```

**未匹配路由**

```go
r.NoRoute(func(context *gin.Context) {
	context.JSON(http.StatusNotFound, gin.H{
		"msg": "找不到页面",
	})
})
```

**路由组**

常用在： 

* 一个业务线的Api写在一个组里
* 不同版本的Api写在不同组里。比如：对Api进行升级就可以这样 `r.Group("/music/v2")`，然后再组里写升级后的Api

```go
musicGroup := r.Group("/music")
{
	musicGroup.GET("/index", func(context *gin.Context) {
		context.JSON(http.StatusOK, gin.H{
			"msg": "music下的index",
		})
	})
	musicGroup.GET("/my", func(context *gin.Context) {
		context.JSON(http.StatusOK, gin.H{
			"msg": "music下的my",
		})
	})
}
```

路由组可以嵌套

```go
musicGroup := r.Group("/music")
{
	musicGroup.GET("/index", func(context *gin.Context) {
		context.JSON(http.StatusOK, gin.H{
			"msg": "music下的index",
		})
	})
  
  //嵌套路由组
	newMusicGroup := r.Group("v2")
	{
    //注意：地址是 /v2/index ，不是 /music/v2/index
		newMusicGroup.GET("/index", func(context *gin.Context) {
			context.JSON(http.StatusOK, gin.H{
				"msg": "music组中的/v2/index",
			})
		})
	}

}
```



## 中间件

> Gin框架允许开发者在处理请求的过程中，加入用户自己的钩子（Hook）函数。这个钩子函数就叫中间件，中间件适合处理一些公共的业务逻辑，比如登录认证、权限校验、数据分页、记录日志、耗时统计等

### 中间件

Gin中的中间件必须是一个`HandlerFunc`类型，其实就是一个参数为Context的函数

```go
type HandlerFunc func(*Context)
```

### 路由函数

以GET为例子，可以看到其第二个参数可以是多个HandlerFunc类型的值。前面我们只写一个处理函数

```go
func (group *RouterGroup) GET(relativePath string, handlers ...HandlerFunc) IRoutes {
	return xxxxx //省略
}
```

多个处理函数，会按顺序执行【注意：相当于在每一个处理函数末尾加一个Next方法，后面会提到】

```go
package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
)

func Processor1(context *gin.Context) {
	fmt.Println("Processor1")
}
func Processor2(context *gin.Context) {
	fmt.Println("Processor2")
}
func main() {
	r := gin.Default()
	r.GET("/user", Processor1, Processor2)

	r.Run(":9000")
}

//Processor1
//Processor2
```

**Next**

处理下一个HandlerFunc，处理完再回到当前的HandlerFunc

```go
func Processor1(context *gin.Context) {
	fmt.Println("进入 Processor1")
	context.Next()
	fmt.Println("退出 Processor1")
}
func Processor2(context *gin.Context) {
	fmt.Println("进入 Processor2")
	fmt.Println("退出 Processor2")
}
```

输出

```text
进入 Processor1
进入 Processor2
退出 Processor2
退出 Processor1
```

**Abort**

不去处理下一个HandlerFunc，继续执行当前HandlerFunc

```go
func Processor1(context *gin.Context) {
	fmt.Println("进入 Processor1")
	context.Next()
	fmt.Println("退出 Processor1")
}
func Processor2(context *gin.Context) {
	fmt.Println("进入 Processor2")
	context.Abort()
	fmt.Println("退出 Processor2")
}
func Processor3(context *gin.Context) {
	fmt.Println("进入 Processor3")
	fmt.Println("退出 Processor3")
}
```

输出

```text
进入 Processor1
进入 Processor2
退出 Processor2
退出 Processor1
```

**return**

直接结束当前的HandlerFunc，返回上一个HandlerFunc的Next位置

```go
func Processor1(context *gin.Context) {
	fmt.Println("进入 Processor1")
	context.Next()
	fmt.Println("退出 Processor1")
}
func Processor2(context *gin.Context) {
	fmt.Println("进入 Processor2")
	return
	fmt.Println("退出 Processor2")
}
```

输出

```text
进入 Processor1
进入 Processor2
退出 Processor1
```

### 所有路由统一处理

一个个的给每个路由添加处理函数，太过于繁琐

```go
func (engine *Engine) Use(middleware ...HandlerFunc) IRoutes {
	xxxx
}
```

例子

```go
package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
)

func Processor1(context *gin.Context) {
	fmt.Println("进入 Processor1")
	context.Next()
	fmt.Println("退出 Processor1")
}
func Processor2(context *gin.Context) {
	fmt.Println("进入 Processor2")
	context.Abort()
	fmt.Println("退出 Processor2")
}

func main() {
	r := gin.Default()
	r.Use(Processor1, Processor2)//统一添加到路由中，每个路由都会使用到
	r.GET("/user")
	r.GET("/book")
	r.GET("/music")

	r.Run(":9000")
}
```

### 路由组添加处理器

不一定是所有路由请求，都经过处理函数，我们可以把一些路由请求编组，统一添加

```go
r := gin.Default()
bookGroup := r.Group("/book", Processor1, Processor2)
{
	bookGroup.GET("/index")
	bookGroup.GET("/my")
}
```

或者

```go
bookGroup := r.Group("/book", Processor1, Processor2)
bookGroup.Use(Processor1,Processor2)
```

### 多处理器传值

通过在Context上存储键值对，来达到传值的目的

```go
func Processor1(context *gin.Context) {
	fmt.Println("Processor1")
	context.Set("name", "tom")
}
func Processor2(context *gin.Context) {
	fmt.Println("Processor2")
	value, ok := context.Get("name")
	if !ok {
		fmt.Println("没有name字段")
		return
	}
	fmt.Println(value)
}
```

输出

```text
Processor1
Processor2
tom
```





### 默认中间件

前面，一直使用的

```
r := gin.Default()
```

其实就是，默认使用了`Logger`和`Recovery`中间件，其中：

- `Logger`中间件将日志写入`gin.DefaultWriter`，即使配置了`GIN_MODE=release`。
- `Recovery`中间件会recover任何`panic`。如果有panic的话，会写入500响应码。

如果不想使用上面两个默认的中间件

```go
r:=gin.New() //新建一个没有任何默认中间件的路由。
```

### 注意

如果要在中间件中使用goroutine

当在中间件（HandlerFunc）中启动新的`goroutine`时，**不能使用**原始的上下文（c *gin.Context）作为goroutine函数的参数，必须使用其只读副本`c.Copy()`



## GORM

简单来说就是Go语言的一个工具，直接使用工具提供的函数，来完成SQL操作（不用使用SQL语句）

![image-20220611120618366](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Go/20220611120618%20.png)

[GORM 2.0 中文官网](https://gorm.io/zh_CN/docs/v2_release_note.html)



### 增删改查简单例子

以Mysql为例子，自行安装MySql

如果使用mysql命令提示找不到，记得配置环境变量

```shell
# 1.一般默认安装在 /usr/local/mysql/bin 这个路径下，找一下确定有bin目录

# 2.在.zshrc文件中添加环境变量
export PATH=$PATH:/usr/local/mysql/bin

# 3.重启文件生效
source .zshrc
```

终端登陆mysql

```shell
mysql -uroot -p  #-u后是用户名 ，-p是密码。执行后，会要求输入密码
```

创建一个新的数据库

```
mysql create database 数据库名
```

连接数据库，增删改查

* 结构体名、字段名需要首字母大写
* 转换后的 数据库 **表名**、**字段名**按照默认约定，详见【GORM的默认约定】

```go
package main

import (
	"fmt"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type StuInfo struct {
	Name  string
	Age   int
	Hobby string
}

func main() {
	//格式 username:password@protocol(address)/dbname?param=value
	dsn := "root:xxxx@tcp(127.0.0.1:3306)/db1?charset=utf8mb4&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		panic(err)
	}

	//创建表，将结构体类型与数据库的表建立映射（结构体名为StuInfo，默认表名为stu_infos）
	err = db.AutoMigrate(&StuInfo{})
	 if err != nil {
		fmt.Printf("创建失败,err:%v", err)
   }

	//---插入数据，数据库的字段小写name、age、hobby
	student := &StuInfo{
		Name:  "jack",
		Age:   18,
		Hobby: "唱歌",
	}
	db.Create(&student)

	//---查看第一条记录,将数据放入s中，参数必须是指针
	var s StuInfo
	db.First(&s)
	fmt.Printf("查询首行，data：%#v", s) //查询首行，data：main.StuInfo{Name:"jack", Age:18, Hobby:"唱歌"}

	//---更新
	db.Model(&StuInfo{}).Where("name", "jack").Update("hobby", "跳舞")

  //---删除
	db.Where("name", "jack").Delete(&s)
}

```

最后注意下述关系：

```text
结构体  ---->  表

结构体实例 ----> 一行记录

结构体字段 ----> 列名
```

### sql.DB对象 

是Go标准库中的sql包提供的sql对象，用于直接操作数据库

```go
dsn := "root:HYJ=wvs1996@tcp(127.0.0.1:3306)/ToDo?charset=utf8mb4&parseTime=true&loc=Local"

DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		return
	}

//获取获取通用数据库对象 *sql.DB
sqlDB, err = DB.DB()
	if err != nil {
		return
}

//验证数据库是否建立连接,出问题返回error对象，没出问题返回nil
sqlDB.Ping()

//关闭数据库
sqlDB.Close()
```



### GORM Model

查看下`gorm.Model`类型

```go
type Model struct {
	ID        uint `gorm:"primarykey"`  //字段名是ID，默认做为主键，且自增
	CreatedAt time.Time   //创建时间
	UpdatedAt time.Time   //更新时间
	DeletedAt DeletedAt `gorm:"index"` //删除时间,类型是一个
}
```

我们可以将`gorm.Model`嵌入到自己的结构体里

```go
type StuInfo struct {
	gorm.Model
	Name  string `gorm:"column:my_name"`
	Age   int
	Hobby string
}
```

补充下

DeletedAt字段是一个DeletedAt类型，也就是sql.NullTime类型

```go
type DeletedAt sql.NullTime
```

也就是下面这个结构体

```go
type NullTime struct {
	Time  time.Time
	Valid bool // Valid is true if Time is not NULL
}
```



### tag

**表字段属性相关tag**

通过给结构体添加gorm的tag，来指定数据库字段的属性

| 结构体标记（Tag） |                           描述                           |
| :---------------: | :------------------------------------------------------: |
|      Column       |                         指定列名                         |
|       Type        |                      指定列数据类型                      |
|       Size        |                  指定列大小, 默认值255                   |
|    PRIMARY_KEY    |                      将列指定为主键                      |
|      UNIQUE       |                      将列指定为唯一                      |
|      DEFAULT      |                       指定列默认值                       |
|     PRECISION     |                        指定列精度                        |
|     NOT NULL      |                    将列指定为非 NULL                     |
|  AUTO_INCREMENT   |                   指定列是否为自增类型                   |
|       INDEX       | 创建具有或不带名称的索引, 如果多个索引同名则创建复合索引 |
|   UNIQUE_INDEX    |         和 `INDEX` 类似，只不过创建的是唯一索引          |
|     EMBEDDED      |                     将结构设置为嵌入                     |
|  EMBEDDED_PREFIX  |                    设置嵌入结构的前缀                    |
|         -         |                        忽略此字段                        |

综上，我们可以将gorm.Model嵌入自己的结构体中，同时指定一些tag

```go
type User struct {
  gorm.Model
  Name         string
  Age          sql.NullInt64 //空值
  Birthday     *time.Time //时间类型
  Email        string  `gorm:"type:varchar(100);unique_index"`
  Role         string  `gorm:"size:255"` // 设置字段大小为255
  MemberNumber *string `gorm:"unique;not null"` // 设置会员号（member number）唯一并且不为空
  Num          int     `gorm:"AUTO_INCREMENT"` // 设置 num 为自增类型
  Address      string  `gorm:"index:addr"` // 给address字段创建名为addr的索引
  IgnoreMe     int     `gorm:"-"` // 忽略本字段
}
```

**表关联tag**

|        结构体标记（Tag）         |                描述                |
| :------------------------------: | :--------------------------------: |
|            MANY2MANY             |             指定连接表             |
|            FOREIGNKEY            |              设置外键              |
|      ASSOCIATION_FOREIGNKEY      |            设置关联外键            |
|           POLYMORPHIC            |            指定多态类型            |
|        POLYMORPHIC_VALUE         |             指定多态值             |
|       JOINTABLE_FOREIGNKEY       |          指定连接表的外键          |
| ASSOCIATION_JOINTABLE_FOREIGNKEY |        指定连接表的关联外键        |
|        SAVE_ASSOCIATIONS         |    是否自动完成 save 的相关操作    |
|      ASSOCIATION_AUTOUPDATE      |   是否自动完成 update 的相关操作   |
|      ASSOCIATION_AUTOCREATE      |   是否自动完成 create 的相关操作   |
|    ASSOCIATION_SAVE_REFERENCE    | 是否自动完成引用的 save 的相关操作 |
|             PRELOAD              |    是否自动完成预加载的相关操作    |

**零值的问题**

GORM会忽略零值

***1.插入时***

不插入Name字段数据，就走默认值

```go
type StuInfo struct {
	Name string `gorm:"default:未知"`
	Age  int
}

//---插入数据
student := &StuInfo{
		Age:  18,
}
db.Create(&student)
```

如果插入零值（即，空字符串），默认零值会被忽略。所以，也会走默认值

这个情况就比较不合理，因为有些时候我们需要插入的是零值，所以需要特殊处理下

```go
//---插入数据
student := &StuInfo{
		Name:""
		Age:  18,
}
db.Create(&student)
```

* 方式一：

  使用指针，将Name定义为`*string`类型

  ```go
  type StuInfo struct {
  	Name *string `gorm:"default:未知"`
  	Age  int
  }
  
  student := &StuInfo{
  	Name: new(string),
  	Age:  18,
  }
  db.Create(&student)
  ```

* 方式二（**常用**）：

  使用Scanner/Valuer，将Name定义为`sql.NullString`类型

  ```go
  type StuInfo struct {
  	Name sql.NullString `gorm:"default:未知"`
  	Age  int
  }
  student := &StuInfo{
  		Name: sql.NullString{String: "", Valid: true},//Valid为true，则代表String字段的值不是Null，插入String字段的值。如果是false，则插入Null
  		Age:  18,
  }
  ```

***2.查询、更新、删除***

同样的，查询、更新、删除都会忽略零值的字段

比如查询年龄为0的记录时，GORM会忽略这个查询条件

***3.总结***

所以，比较推荐将数据定义为 `sql.Nullxxxx`

```go
type StuInfo struct {
	Name sql.NullString `gorm:"default:未知"`
	Age  sql.NullInt64
}
```



### GORM的默认约定

[文档地址](https://gorm.io/zh_CN/docs/conventions.html)

* 默认使用 `ID` 作为主键

  **默认**：GORM 会默认将结构体中名为 `ID`的字段， 设置为表的主键，且自增

  ```go
  type User struct {
    ID   string // 默认情况下，名为 `ID` 的字段会作为表的主键
    Name string
  }
  ```

  **自定义**：也可以通过 `gorm:"primaryKey"` 将其它字段设为主键

  ```go
  // 将 `UUID` 设为主键
  type Animal struct {
    ID     int64
    UUID   string `gorm:"primaryKey"`
    Name   string
    Age    int64
  }
  ```

* 默认情况下，整型 `PrioritizedPrimaryField` 启用了 `AutoIncrement`，要禁用它，您需要为整型字段关闭 `autoIncrement`：

  ```go
  type Product struct {
    CategoryID uint64 `gorm:"primaryKey;autoIncrement:false"`
    TypeID     uint64 `gorm:"primaryKey;autoIncrement:false"`
  }
  ```

* 默认数据库表名

  **默认**：将结构体名字，转化为小写+短下划线拼接+最后以s结尾

  例如：StuInfo默认对应的表名为stu_infos ， User默认对应的表名为users

  **自定义**：

  ```go
  db.Table("abc").AutoMigrate(&StuInfo{})
  ```

* 默认数据库字段名

  **默认**：将结构体字段名字，转化为小写+短下划线拼接

  例如：字段createDate，默认对应表字段名为create_date

  例外：如果字段名为ID，则默认对应表字段名为id

  **自定义**：

  通过给结构体添加tag来指定名字

  ```go
  type StuInfo struct {
  	gorm.Model
  	Name  string `gorm:"column:my_name"`
  	Age   int
  	Hobby string
  }
  ```

* 时间戳追踪

  如果定义的结构体中也出现了`CreatedAt `、`UpdatedAt`字段

  **默认**：GORM会自动更新每一条记录的创建时间、更新时间

  **自定义**：通过tag指定字段关闭更新

  ```go
  type User struct {
    CreatedAt time.Time `gorm:"autoCreateTime:false"`
  
    UpdatedAt time.Time `gorm:"autoUpdateTime:false"`
  }
  ```

### Debug

执行增删改查前，加入Debug方法，可以将执行的SQL语句打印在控制台

```go
db.Debug().First(&s)  //
```

### Where

where是用来在增删改查中添加条件的

* 字符串条件

  第一个参数中的问号就是占位符，后面的参数就是占位符的值（类似于printf的用法）

  ```go
  //等于
  Where("name = ?", "h1")
  
  //不等于
  Where("name <> ?", "h1")
  
  //大于
  Where("updated_at > ?", lastWeek)
  
  //范围name=h1或name=h2
  Where("name IN ?", []string{"h1", "h2"})
  
  //模糊匹配 %代表零个或多个
  Where("name LIKE ?", "%jin%")
  
  //且
  Where("name = ? AND age >= ?", "h1", "22")
  
  //between and
  Where("created_at BETWEEN ? AND ?", lastWeek, today)
  ```

* Struct 条件

  ```go
  db.Where(&StuInfo{
  		Name: sql.NullString{String: "y", Valid: true},
  	}).Find(&stu)
  ```

* Map条件

  map的key是数据库字段名，所以是小写的name

  ```go
  db.Where(map[string]interface{}{
  		"name": "y",
  	}).Find(&stu)
  ```

* slice条件
  默认就是用来限制**主键**的范围

  ```go
  db.Where([]int64{20, 21, 22}).Find(&stu)
  
  //等价于
  Where("主键名 IN ?", []int64{20, 21, 22})
  ```

### Not

与where一样，支持4种类型的条件

```go
db.Not("name = ?", "jinzhu").First(&user)
```

### Or

只支持前3种条件，不支持slice



### 插入

```go
//单条数据
var user := StuInfo{Name: "Jinzhu", Age: 18, Birthday: time.Now()}


//多条数据
var users = []StuInfo{{Name: "jinzhu1"}, {Name: "jinzhu2"}, {Name: "jinzhu3"}}


//插入（通过数据的指针来创建）
result := db.Create(&user) 
```

### 查询

**查找函数的参数**

如果是一个结构体指针类型，可直接存储一条查询结果数据

```go
var stu StuInfo
db.First(&stu)
```

如果查询结果是多条记录，使用slice存储

```go
var stuList []StuInfo
db.Find(&stuList)  //所有数据
```

如果是map结构存储查询结果数据，必须指定Model

```go
result := map[string]interface{}{}
db.Model(&StuInfo{}).First(&result)
```



**单条记录**

 `First`（让主键升序排列，选择符合条件的第一个）、`Last`（让主键升序排列，选符合条件的最后一个），如果表没有指定主键，默认以表中第一个字段，进行排序

`Take`是取表中第一条记录

`Find`(选择所有符合条件的纪录)

将查到的数据放入s中，参数必须是指针

```go
var stu StuInfo
db.First(&stu)
fmt.Printf("%#v\n", stu) 
//main.StuInfo{Name:"jack", Age:18, Hobby:"唱歌"}
```

注意：当没有指定查询条件时，`Find`返回所有数据；`First`让主键升序排列，选择第一个；`Last`让主键升序排列，选择最后一个；

**查询条件的内联写法**

如果主键是数字类型，可以使用内联写法。第二个参数就是主键的值

```go
db.First(&user, 10)

db.First(&user, "10")

db.Find(&users, []int{1,2,3}) //主键是1、2、3的
```

主键是字符串，或者非主键字段，需要指定键和值

```go
db.First(&user, "id = ?", "aaabbb")
// SELECT * FROM user_infos WHERE 主键名 = "aaabbb";
```

结构体

```go
db.Find(&users, StuInfo{Age: 20}) 
```

Map

```go
db.Find(&users, map[string]interface{}{"age": 20})
```

也可以在存储查询结果的结构体中指定

```go
var user = User{ID: 10}
db.First(&user)
// SELECT * FROM users WHERE id = 10;

var result User
db.Model(User{ID: 10}).First(&result)
// SELECT * FROM users WHERE id = 10;
```



**Select**

选择查询结果的特定字段

```go
db.Select("name", "age").Find(&stu) //只返回记录的name、age字段

db.Select([]string{"name", "age"}).Find(&stu) 
```

select支持聚集函数和别名

```go
db.Select("date(created_at) as date, sum(amount) as total")
```



**Order**

asc 按升序排列 ，默认是asc

desc 按降序排列

```go
db.Order("age desc, name").Find(&stu) //一次定义多个

db.Order("age desc").Order("name").Find(&stu) //多次排序 
```



**Limit与Offset**

Limit限制查询数据返回最大记录条数

Offset指定查询的全部结果中，间隔几个取一条，直到达到Limit限制的个数

```go
db.Limit(3).Offset(2).Find(&stu) 
```



**查找错误处理**

result是查找函数的返回值

```go
result.RowsAffected // 返回找到的记录数
result.Error        // 没找到返回 gorm.ErrRecordNotFound 

// 检查 ErrRecordNotFound 错误
errors.Is(result.Error, gorm.ErrRecordNotFound)
```





### 更新

* **Save** ：将查询出来的数据更改，在保存到数据库

  ```go
  s.Name = sql.NullString{String: "h1", Valid: true} //Name字段是sql.NullString类型的
  db.Debug().Save(&s)
  ```

* **Model**

  StuInfo是一个空结构体实例的指针，代表整个users表。做的更新是全局更新，必须指定where

  ```go
  db.Model(&StuInfo{})
  ```

  stu 一般是查询操作，查出来的结构体实例，代表数据库中的这一行记录

  ```go
  db.Model(&stu)
  ```

* **Update **

  用于更新单个字段，第一个参数指定数据库字段名，第二个参数指定修改的值

  对整个表做全局更新操作，必须通过where指定需要修改的记录符合的条件，否则不会执行，且返回值的Error属性不为nil

  ```go
  db.Model(&StuInfo{}).Where("name", "h2").Update("name", "h3")
  ```

  对指定的记录更新就没必要加where了

  ```go
  db.Model(&stu).Update("name", "h4")
  ```

  如果确定想更新整个表，两种方法

  ```go
  //直接执行sql语句
  db.Exec("UPDATE stu_infos SET name = ?", "h1")
  
  
  //启用 AllowGlobalUpdate 模式
  db.Session(&gorm.Session{AllowGlobalUpdate: true}).Model(&UseInfo{}).Update("name", "h1")
  ```

  

* **Updates**

  用于更新多个字段，参数是：

  ***结构体***

  ```go
  db.Model(&stu).Updates(&StuInfo{
  		Name: sql.NullString{String: "h5", Valid: true},
  		Age:  sql.NullInt64{Int64: 20, Valid: true},
  })
  ```

  ***map[string]interface{}***

  map的key是数据库字段，所以是小写的name、age

  ```go
  db.Model(&stu).Updates(map[string]interface{}{
  		"name": sql.NullString{String: "h6", Valid: true},
  		"age":  sql.NullInt64{Int64: 30, Valid: true},
  })
  ```

  可能传入的多个字段中，我们只需要一部分字段更新：

  ***Select***

  Updates参数是map，所以Select参数是数据库字段名，即小写的age

  如果Updates参数是结构体，Select参数是结构体字段名，即Age

  ```go
  db.Model(&stu).Select("age").Updates(map[string]interface{}{
  		"name": sql.NullString{String: "h7", Valid: true},
  		"age":  sql.NullInt64{Int64: 50, Valid: true},
  })
  //只有age字段更新了
  ```

  

  ***Omit***

  与Select同理，只不过是指定忽略更新的字段

* **UpdateColumn**与**UpdateColumns**

  Updates、Updates除了会更新指定的数据库字段，如果结构体有UpdatedAt字段（gorm.model中的字段）还会自动更新该字段UpdateColumn与UpdateColumns只更新指定字段

* **返回值**

  Updates、Update的返回值，中有以下字段

  ```go
  RowsAffected // 更新的记录数
  Error        // 更新的错误
  ```

* **sql表达式**

  更新字段的值不一定是常数，可以是表达式`gorm.Expr`

  将原本的年龄乘2加100

  ```go
  db.Model(&stu).Update("age", gorm.Expr("age * ? + ?", 2, 100))
  ```

* 子查询

  更新字段的值也可以是查询的结果

  ```go
  db.Model(&stu).Update("name", db.Model(&Other{}).Select("name").Where("name =jack"))
  ```

  

### 删除

* 删除按照给定的主键的值，在数据库中删除一条记录

  与更新相同

  ```go
  //全局删除，必须指定where，设置删除条件，否则不会删除
  db.Delete(&StuInfo{})
  
  //&stu是一个实例，代表某一行数据。但是这个数据中必须指定主键，才能删除对应的记录
  db.Delete(&stu)
  ```

  内联写法，不需要知道主键名，只需要指定主键值即可删除

  ```go
  db.Delete(&StuInfo{}, 10)
  // DELETE FROM stu_infos WHERE 主键 = 10;
  
  db.Delete(&StuInfo{}, "10")
  // DELETE FROM stu_infos WHERE 主键 = 10;
  
  db.Delete(&stu, []int{1,2,3})
  // DELETE FROM stu_infos WHERE 主键 IN (1,2,3);
  ```

  

* GORM中的删除，如果结构体有`gorm.deletedat` 类型的字段（gorm.model中有）就是软删除，并不是真正的将数据删除

  被删除的记录delete_at字段会记录时间，未被删除的是null

  ![image-20220612141807161](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Go/20220612141807%20.png)

  删除后的记录正常是不会再被查询到的，如果想要查到需要使用**Unscoped**

  ```go
  db.Unscoped().Where("name=?", "h3").Find(&stu)
  ```

  物理删除

  ```go
  db.Unscoped().Delete(&stu)
  ```

* 自定义一个删除时会使用软删除的字段

  使用 `1` / `0` 作为 delete flag

  ```go
  import "gorm.io/plugin/soft_delete"
  
  type User struct {
    ID    uint
    Name  string
    IsDel soft_delete.DeletedAt `gorm:"softDelete:flag"`
  }
  
  // 查询
  SELECT * FROM users WHERE is_del = 0;
  
  // 删除
  UPDATE users SET is_del = 1 WHERE ID = 1;
  ```


### 链式调用

GORM的函数在执行数据库操作之前，可以一直加条件，形成链式调用

一般错误处理，都是以下这种形式。执行结果的返回值有一个Error属性，是error类型。有错误，返回这个error对象，否则返回nil

```go
//删除指定id的数据
func DeleteTodoItemById(id int) (err error) { //注意：返回参数列表，后面直接写return就行
	var todo ToDo
	if err := dao.DB.Delete(&todo, id).Error; err != nil {
		return
	}
	return
}
```



### Scope

将常用的操作封装成函数，可以方便的调用

官网的例子

```go
func AmountGreaterThan1000(db *gorm.DB) *gorm.DB {
  return db.Where("amount > ?", 1000)
}
 
func PaidWithCreditCard(db *gorm.DB) *gorm.DB {
  return db.Where("pay_mode_sign = ?", "C")
}
 
func PaidWithCod(db *gorm.DB) *gorm.DB {
  return db.Where("pay_mode_sign = ?", "C")
}
 
func OrderStatus(status []string) func (db *gorm.DB) *gorm.DB {
  return func (db *gorm.DB) *gorm.DB {
    return db.Where("status IN (?)", status)
  }
}
 
db.Scopes(AmountGreaterThan1000, PaidWithCreditCard).Find(&orders)
// 查找所有金额大于 1000 的信用卡订单
 
db.Scopes(AmountGreaterThan1000, PaidWithCod).Find(&orders)
// 查找所有金额大于 1000 的 COD 订单
 
db.Scopes(AmountGreaterThan1000, OrderStatus([]string{"paid", "shipped"})).Find(&orders)
// 查找所有金额大于1000 的已付款或已发货订单
```



### Hooks

更新、删除等操作触发前会触发的钩子函数

场景：

用户插入密码、修改密码时，需要触发钩子函数来进行加密存储



## 企业级项目结构划分

一般结构

```go
项目根目录
|- router //路由
|- controller //控制器，最终返回JSON/HTNML的位置
|- logic //处理业务逻辑
|- models //处理数据库增删改查相关
|- dao  //（database access object） 数据库链接配置
```

一般流程

```
请求 ——>router路由 ——> controller(控制器) ——> logic（逻辑层） ——> models（模型层增删改查）
```



## 待办事项例子

[代办事项例子](https://gitee.com/hyj1270433876/GoProjectByHDD/tree/master/TodoProject)

有一点需要注意：结构体的Status字段，是布尔类型，但是存储时，会存储为0或1

![image-20220618184742990](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Go/20220618184743%20.png)

## 后端安全

### 接口安全

可能面临的攻击手段

* 中间人攻击

* 请求篡改
* 重放攻击

防御手段

* 使用HTTPS协议，由于加密的原因，可以防止抓包。但是如果信任了第三方攻击者的证书，仍然会被截获

  Charles这种抓包工具其实就是中间人攻击的手段

* 接口验证签名

  1、所有前端发送字段按照字典升序排列，把参数按照 key1=value1&key2=value2… 的格式拼接起来【前端如果发送的是GET请求，会将参数放到URL后面，这些value必须使用URL编码，才能保证正确发送。前端发送的POST请求中，x-www-from-urlencoded，也是使用URL编码了value，所以对应的这里计算签名也必须将value编码，才能使得前后端计算的签名一致】

  2、再拼接一个秘钥 key=xxx

  3、再拼接一个时间戳 timestamp=xxx

  4、把拼接好的字符串进行 MD5 签名，然后转为大写得到最后的签名字符串

  5、在发送的数据中添加一个x-sign字段，用来发送签名

  例如，前端发送的数据是

  ```
  {
  	"userName": hhh,
  	"userAge": 18
  }
  ```

  密钥是ABCDEF，时间戳是1655026676291

  首先 ，拼接好字符串

  ```text
  userAge=18&userName=hhh&key=ABCDEF&timestamp=1655026676291
  ```

  经过MD5计算的签名是（[MD5在线转换](https://tools.fun/md5.html))

  ```text
  59279C2928F081859B9295083DE974B2
  ```

  最终前端发送的数据仍然是

  ```
  {
  	"userName": hhh,
  	"userAge": 18,
  }
  ```

  但是，要在请求头中加入

  ```
  x-sign:"59279C2928F081859B9295083DE974B2"
  x-timestamp:1655026676291
  ```

  **后端**

  接收到参数后，使用一样的密钥（只有前后端知道）和请求头中的时间戳，算出一个签名

  

  如果算出的签名和x-sign一样，则代表数据未被篡改，可防止请求篡改攻击

  

  同时x-timestamp也是可信的，和当前时间对比，相差不多，就证明不是重放攻击

### 密码存储安全

为了安全，后端数据库中不能存储明文密码

一般有两种方式

* MD5/SHA256 进行哈希

  可以将前端传递的密码通过MD5计算签名，与数据库中存储的签名进行对比，如果一样，就代码密码正确

  缺点：由于一些在线工具存储了大量的计算好的哈希值，而且还有**彩虹表**破解法，这两种方式都有一定几率破解密码，所以不够安全

  

* MD5/SHA256 + 盐：
  为了防止反向字典查询破解和彩虹表破解，就衍生出了加盐的做法，也就是在原有字符串后面增加一些其他的字符，使得哈希值跟原始的不一样，主要加的盐没有泄漏，就不能得知原始密码是多少

  缺点：为了安全每个密码都是用随机的盐值，但是，这样就需要单独存储每一个密码的盐值

* Bcrypt 加密存储

  Bcrypt 就是一个非常方便的工具，它可以为你生成随机的盐，结合你的密码进行一大串非常复杂的计算，最后生成一个字符串，只需要保存这一个字符串，不需要单独另外存储一个salt字段

  [Bcrypt库](https://pkg.go.dev/golang.org/x/crypto/bcrypt)

  

## Gin源码分析



