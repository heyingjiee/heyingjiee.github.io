# Go Web学习

大体分为两个部分

* Go标准库实现Web开发
* Gin框架实现Web开发

有一点需要注意，Gin、GORM实际上有很多地方就是用的Go的标准库

## Go标准库之html/template

> 只对一些常用的用法进行学习记录，更多用法请查看下面这篇文章
>
> [李文周的博客——学习Go语言标准库之http/template](https://www.liwenzhou.com/posts/Go/go_template/)

html/template这个库简单来说就是实现了一个模板引擎

Go语言内置了文本模板引擎`text/template`和用于HTML文档的``。它们的作用机制可以简单归纳如下：

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



## Go标准库之database/sql

database/sql这个库简单来说就是实现了SQL或类SQL数据库的泛用接口，并不提供具体的数据库驱动。使用`database/sql`包时必须注入（至少）一个数据库驱动。

我们常用的数据库基本上都有完整的第三方实现好的驱动。例如：[MySQL驱动](https://github.com/go-sql-driver/mysql)

后面的例子都是使用Mysql数据库

```go
package main

import (
	"database/sql"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
)

var db *sql.DB

func initDB() (err error) {
  dsn := "root:xxxx@tcp(127.0.0.1:13306)/db1" //账号:密码@协议(地址:端口)/数据库名 
	db, err = sql.Open("mysql", dsn)
	if err != nil {
		panic(err)
	}
	err = db.Ping() //连接数据库失败返回err，成功返回nil
	if err != nil {
		fmt.Printf("连接失败")
		return
	}
	db.SetMaxOpenConns(500) //连接池中与数据库建立连接的最大数目，默认为0（无限制）
	db.SetMaxIdleConns(10)  //连接池中的最大闲置连接数，最大不能超过"最大连接数"，超过就最大闲置连接为"最大连接数"
	db.SetConnMaxLifetime(time.Second*10) //正在使用的连接的存活时间
	//db.SetConnMaxIdleTime() //空闲链接的存活时间
	return
}

func main() {
	if err := initDB(); err != nil {
		fmt.Printf("err:%v", err)
    return
	}

	defer db.Close() //必须确保db不为nil，才能调用Close
}

```

这篇文章介绍一些关于SetMaxOpenConns、SetMaxIdleConns、SetConnMaxLifetime的信息（https://learnku.com/go/t/49809）

### 新建数据库表

```shell
create table users_info
(
    id   int auto_increment,
    name varchar(50) null,
    age  int         null,
    constraint users_info_pk
        primary key (id)
);
```

建议使用GoLand的数据库插件，可视化建表

![image-20220625185710011](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Go/20220625185710%20.png)

### SQL语句中的占位符

我们后面见到的增删改查中，SQL语句中的`?` 是查询占位符，它可以防止SQL注入攻击。



`database/sql`不对占位符处的文本进行任何验证；只是将**带占位符的SQL语句**和**编码后的参数**一起按原样发送到服务器，查询是在数据库服务器上进行的，所以不同的数据库使用的占位符也不同:

- MySQL中使用`?`
- PostgreSQL使用枚举的`$1`、`$2`等bindvar语法
- SQLite中`?`和`$1`的语法都支持
- Oracle中使用`:name`的语法



对占位符一个常见误解就是将它们看成是SQL语句的拼接，其实并不是

SQL语句的拼接不能防范SQL注入，而使用占位符的方式可以防范SQL注入

```go
sqlStr := "select id,name,age from users_info where id=?"
row := db.QueryRow(sqlStr, 2)
```

同时，占位符所在的位置不能更改SQL语句的结构，例如：

```go
// ？不能用来插入表名
db.Query("SELECT * FROM ?", "mytable")
 
// ？也不能用来插入列名
db.Query("SELECT ?, ? FROM people", "name", "location")
```

### 查询

先在建好的表中插入几条数据，在查询

**查询单条数据**

db.QueryRow()返回的row对象，如果不执行Scan就会一直占用数据库连接，这时，如果设置最大连接数是1，同时发起两次查询，就会阻塞代码。只有执行Scan连接才会断开

```go
//定义一个结构，将查出的数据保存在这个结构里
type user struct {
	id   int
	age  int
	name string
}

func queryRow() {
	var u user
	sqlStr := "select id,name,age from users_info where id=?"
	row := db.QueryRow(sqlStr, 2)
  err:=row.Scan(&u.id, &u.name, &u.age)
  if err != nil {
		fmt.Printf("读取失败：%v", err)
    return
	}
	fmt.Printf("查询结果：%#v\n ", u)
}
```

在main函数中调用

```go
func main() {
	if err := initDB(); err != nil {
		fmt.Printf("err:%v", err)
    return
	}

	defer db.Close() //必须确保db不为nil，才能调用Close
  
  queryRow() //查询结果：main.user{id:1, age:200, name:"h3"}
}
```

为了避免忘记Scan释放连接，一般连写

```go
err := db.QueryRow(sqlStr, 2).Scan(&u.id, &u.name, &u.age)
if err != nil {
	fmt.Printf("读取失败：%v", err)
}
```

**查询多行数据**

为了避免循环rows数据时出现panic导致程序中断了，但是数据库连接没有被释放，所以一定要加上defer rows.Close()

```go
func queryRows() {
	sqlStr := "select id,name,age from users_info where id in (?,?)"
	rows, err := db.Query(sqlStr, 1, 2)
	if err != nil {
		fmt.Printf("查询失败：%v", err)
		return
	}
	defer rows.Close() //这里很重要，有可能某行时就会触发panic

	for rows.Next() { //循环读取查询结果
		var u user
		err := rows.Scan(&u.id, &u.name, &u.age)
		if err != nil {
			fmt.Printf("读取失败：%v", err)
			continue
		}
		fmt.Printf("查询结果：%#v\n ", u)
	}
}
```

调用

```go
func main() {
	if err := initDB(); err != nil {
		fmt.Printf("err:%v", err)
    return
	}

	defer db.Close() //必须确保db不为nil，才能调用Close
  
  queryRows() 
  //查询结果：main.user{id:1, age:200, name:"h3"}
  //查询结果：main.user{id:2, age:18, name:"y"}
}
```

补充：为什么user结构体名和其中的字段可以小写，其他的一些数据库相关的第三方Go库必须大写

因为Scan函数仅仅是做一个赋值操作

其他的一些库，可能是将变量传入函数，在函数中操作结构体，比如通过反射进行一些处理后赋值（回忆下，使用其他包中的变量或函数时，这个变量或函数必须首字母大写）

### 插入

接下来的，插入、更新、删除，都需要使用Exec执行，Exec执行完后，会自动断开连接

```go
// 插入数据
func insertRow() {
	sqlStr := "insert into users_info(name, age) values (?,?)"
	ret, err := db.Exec(sqlStr, "jack", 20)
	if err != nil {
		fmt.Printf("插入失败:%v\n", err)
		return
	}

	theID, err := ret.LastInsertId()   // 新插入数据的id
  if err != nil {
		fmt.Printf("插入失败:%v\n", err)
		return
	}
	lineNum, err := ret.RowsAffected() //新插入数据影响的行数
	if err != nil {
		fmt.Printf("插入失败:%v\n", err)
		return
	}
	fmt.Printf("插入成功, id是 %d ；受影响的行数是:%v\n", theID, lineNum)
}
```

### 更新

```go
func updateRow() {
	sqlStr := "update users_info set age=? where name=?"
	ret, err := db.Exec(sqlStr, 22, "tom")
	if err != nil {
		fmt.Printf("更新失败:%v\n", err)
		return
	}

	lineNum, err := ret.RowsAffected() //更新数据影响的行数
	if err != nil {
		fmt.Printf("更新失败:%v\n", err)
		return
	}
	fmt.Printf("更新成功, 受影响的行数是:%v\n", lineNum) //更新成功, 受影响的行数是:0

}
```

### 删除

```go
func deleteRow() {
	sqlStr := "delete from  users_info where id=?"
	ret, err := db.Exec(sqlStr, 1)
	if err != nil {
		fmt.Printf("删除失败:%v\n", err)
		return
	}

	lineNum, err := ret.RowsAffected() //删除数据影响的行数
	if err != nil {
		fmt.Printf("删除失败:%v\n", err)
		return
	}
	fmt.Printf("删除失败, 受影响的行数是:%v\n", lineNum) //删除失败, 受影响的行数是:1

}
```

### 预处理

把SQL语句分成两部分，命令部分与数据部分。先把命令部分发送给MySQL服务端，MySQL服务端进行SQL预处理，然后把数据部分发送给MySQL服务端，MySQL服务端对SQL语句进行占位符替换后，再去查询

**拼接查询字符串**

用拼接后的查询字符串，去数据库执行,这种十分容易出现SQL注入的问题

```go
sqlStr := fmt.Sprintf("select id,name,age from users_info where id='%s'", "3' or 1=1#")
rows, err := db.Query(sqlStr) //执行：select id,name,age from users_info where id='3' or 1=1#'       

// #在Sql语句中时注释的含义。这句Sql语句原本是根据id查询数据，因为插入"3' or 1=1#" ，就变成了搜索整个表
```

**前面的增删改查**

不会出现SQL注入的后果（以多行查询为例子）

```go
sqlStr := "select id,name,age from users_info where id=?"
rows, err := db.Query(sqlStr, "2' or 1=1#") //执行：select id,name,age from users_info where id='3'     
```

**预处理**

不会出现SQL注入的后果

```go
sqlStr := "select id,name,age from users_info where id=?"
stmt, err := db.Prepare(sqlStr)
if err != nil {
	fmt.Printf("prepare failed, err:%v\n", err)
	return
}
defer stmt.Close()
//增、删、改、查都是用预处理的stmt，参数就是字符串中的参数
rows, err := stmt.Query(1)

err := stmt.QueryRow(1).Scan(&u.id, &u.name, &u.age)

ret, err:=stmt.Exec(1)
```

### 事务

通常事务必须满足4个条件（ACID）：原子性（Atomicity，或称不可分割性）、一致性（Consistency）、隔离性（Isolation，又称独立性）、持久性（Durability）。

|  条件  |                             解释                             |
| :----: | :----------------------------------------------------------: |
| 原子性 | 一个事务（transaction）中的所有操作，要么全部完成，要么全部不完成，不会结束在中间某个环节。事务在执行过程中发生错误，会被回滚（Rollback）到事务开始前的状态，就像这个事务从来没有执行过一样。 |
| 一致性 | 在事务开始之前和事务结束以后，数据库的完整性没有被破坏。这表示写入的资料必须完全符合所有的预设规则，这包含资料的精确度、串联性以及后续数据库可以自发性地完成预定的工作。 |
| 隔离性 | 数据库允许多个并发事务同时对其数据进行读写和修改的能力，隔离性可以防止多个事务并发执行时由于交叉执行而导致数据的不一致。事务隔离分为不同级别，包括读未提交（Read uncommitted）、读提交（read committed）、可重复读（repeatable read）和串行化（Serializable）。 |
| 持久性 | 事务处理结束后，对数据的修改就是永久的，即便系统故障也不会丢失。 |

事务相关的方法

```go
Begin() 

Rollback()

Commit() 
```

例子

```go
func transaction() {
	tx, err := db.Begin()
	if err != nil {
		fmt.Printf("创建事务错误，%v\n", err)
		return
	}
	//第一条SQL语句
	res, err := tx.Exec("insert into users_info(name,age) values (?,?)", "hhh", 20)
	if err != nil {
		fmt.Printf("回滚事务，第一条SQL语句错误，%v\n", err)
		tx.Rollback()
		return
	}
	if firstRowNum, err := res.RowsAffected(); err != nil || firstRowNum != 1 {
		fmt.Printf("回滚事务，第一条SQL语句错误，%v\n", err)
		tx.Rollback()
		return
	}

	//第二条SQL语句
	res, err = tx.Exec("select * from users_info where id=?", 22)
	if err != nil {
		fmt.Printf("回滚事务，第二条SQL语句错误，%v\n", err)
		tx.Rollback()
		return
	}
	if secondRowNum, err := res.RowsAffected(); err != nil || secondRowNum != 1 {
		fmt.Printf("回滚事务,第二条SQL语句错误，%v\n", err)
		tx.Rollback()
		return
	}

	//
	fmt.Printf("提交事务")
	tx.Commit() // 提交事务

}
```

## 第三方库sqlx

对database/sql是一个对数据库进行操作的第三方库

### 增删改查

* 查找使用Get和Select方法
* 新增、删除、修改都是使用Exec，与原生一样
* 如果结构体字段名和数据库表字段名不一样，要使用`db:"xxxx"`来对应表字段xxxx
* Get、Select查询结果，需要存入的结构体实例。这个结构体的字段名首字母必须大写（结构体名其实可以不用大写，因为使用的时候是在当前包中传入 `var u User`）

```go
package main

import (
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
)

var db *sqlx.DB

func initDB() (err error) {
	dsn := "root:HYJ=wvs1996@tcp(127.0.0.1:3306)/db1?charset=utf8mb4&parseTime=True" //parseTime=True讲go中的time对象转化为数据库的时间对象
	db, err = sqlx.Connect("mysql", dsn)                                             //MustConnect()如果出现错误，自动panic，而Connect需要自己处理err
	if err != nil {
		fmt.Printf("连接出错，%v\n", err)
		panic(err)
	}
	db.SetMaxOpenConns(50)
	db.SetConnMaxIdleTime(10)
	return
}

type User struct {
	Id   int    `db:"id"`
	Name string `db:"name"`
	Age  int    `db:"age"`
}

//1、查询
func query(param interface{}) {
	var u User
	sqlStr := "select * from users_info where id=?"
	if err := db.Get(&u, sqlStr, param); err != nil {
		fmt.Printf("查询出错，%v\n", err)
		return
	}
	fmt.Printf("查询结果：%#v", u)

}

//1、多条数据查询(传入的是slice，返回的也是slice)
func queryRows(param1, param2 interface{}) {
	var u []User
	sqlStr := "select * from users_info where id in (?,?)"
	if err := db.Select(&u, sqlStr, param1, param2); err != nil {
		fmt.Printf("查询出错，%v\n", err)
		return
	}
	fmt.Printf("查询结果：%#v", u) //[]main.User{main.User{Id:2, Name:"jack", Age:20}, main.User{Id:3, Name:"tom", Age:22}}

}

//2、sqlx中的删、改、查，还是使用exec方法与原生sql中的Exec使用一样

func main() {
	initDB()
  query(2)
	queryRows(2, 3)

}
```

### 事务

使用Beginx、Rollback、Commit

```go
func transactionDemo2()(err error) {
	tx, err := db.Beginx() // 开启事务
	if err != nil {
		fmt.Printf("事务创建失败，%v\n", err)
		return err
	}
  
  //延迟处理panic
	defer func() {
		if p := recover(); p != nil {
			tx.Rollback()
			panic(p) // 重新抛出panic
		} else if err != nil {
			fmt.Println("rollback")
			tx.Rollback() //回滚事务
		} else {
			err = tx.Commit() //提交事务
			fmt.Println("commit")
		}
	}()
  
  //第一个SQL语句
	sqlStr1 := "Update user set age=20 where id=?"

	rs, err := tx.Exec(sqlStr1, 1)
	if err!= nil{
		return err
	}
	n, err := rs.RowsAffected()
	if err != nil {
		return err
	}
	if n != 1 {
		return errors.New("第一个SQL语句执行失败")
	}
  
  //第二个SQL语句
	sqlStr2 := "Update user set age=50 where i=?"
	rs, err = tx.Exec(sqlStr2, 5)
	if err!=nil{
		return err
	}
	n, err = rs.RowsAffected()
	if err != nil {
		return err
	}
	if n != 1 {
		return errors.New("exec sqlStr1 failed")
	}
	return err
  
  
}
```

## Redis(暂时略)

这部分介绍go-redis这个第三方库

[文档地址](https://pkg.go.dev/github.com/go-redis/redis)

因为我电脑里没有安装redis

```shell
# 使用redis 5.0.7 版本的镜像，启动一个名为 redis507 的 容器，运行一个redis server
docker run --name redis507 -p 6379:6379 -d redis:5.0.7

# 启动一个 redis-cli 连接上面的 redis server
docker run -it --network host --rm redis:5.0.7 redis-cli
```

例子

```go
package main

import (
	"fmt"
	"github.com/go-redis/redis"
)

var rdb *redis.Client

func initClient() (err error) {
	rdb = redis.NewClient(&redis.Options{
		Addr:     "localhost:6379", //地址
		Password: "",               // 无密码，就设置为空字符串
		DB:       0,                // 数据库
		PoolSize: 20,               // 连接池大小
	})
	_, err = rdb.Ping().Result()
	if err != nil {
		return
	}
	return
}

func getValue() {
	str, err := rdb.Get("name").Result()
	if err == redis.Nil {
		fmt.Printf("不存在该键值对")
		return
	} else if err != nil {
		fmt.Printf("获取值错误，%v\n", err)
		return
	}

	fmt.Printf("获取的值:%v\n", str)
}
func main() {
	err := initClient()
	if err != nil {
		fmt.Printf("连接redis失败，%v\n", err) //err是redis:nil
		panic(err)
	}
	defer rdb.Close()

	getValue()
}

```



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



## 待办事项案例

**项目结构划分**

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

**代码**

[代办事项例子](https://gitee.com/hyj1270433876/GoProjectByHDD/tree/master/TodoProject)

有一点需要注意：结构体的Status字段，是布尔类型，但是存储时，会存储为0或1

![image-20220618184742990](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Go/20220618184743%20.png)

## 日志库（zap）

Go标准库log提供的能力非常有限，所以这里主要介绍的是Zap日志库

### 安装

```go
go get -u go.uber.org/zap
```

### 简单例子

* Zap提供了两种类型的日志记录器—`Sugared Logger`和`Logger`（对性能要求高就是用Logger，但它只支持强类型的结构化日志记录，一般用于生产）

* 日志记录器的默认配置有三种方式，它们之间唯一的区别在于它将记录的信息不同

  * NewProduction()  生产环境默认配置值
  * NewDevelopment()  开发环境默认配置值
  * New() 自定义配置

* 默认情况下日志都会打印到console

* 记录日志函数

  这里分别写了Logger和SugaredLogger两种日志记录器

  XXX表示Debug、Info、Warn、Error、Panic等方法，记录不同等级的日志

  ```go
  func (log *Logger) XXX(msg string, fields ...Field) 
  
  func (s *SugaredLogger) XXX(msg string, fields ...Field) 
  ```

  返回fields类型的函数，名字值得是val的类型

  ```go
  //val是string类型
  func String(key string, val string) Field 
  
  //val是Int32指针
  func Int32p(key string, val *int32) Field
  
  //不确定val类型,用Any(key,val)
  
  //val是错误对象，可以不指定key ，用Error(错误实例)
  ```
  
  

**Logger**

```go
package main

import (
	"go.uber.org/zap"
	"net/http"
)

var logger *zap.Logger //日志记录器Logger、SugaredLogger，对性能要求高就是用Logger

func initLogger() (err error) {
	//zap.NewProduction() // 生产环境默认配置值
	//zap.NewDevelopment() // 开发环境默认配置值
	//zap.New() //自定义配置

	logger, err = zap.NewProduction()
	return
}
func main() {
	initLogger()
	defer logger.Sync() //写入磁盘

	resp, err := http.Get("http://www.baidu.com")
	if err != nil {
		logger.Error(
			"访问错误",
			zap.String("url", "www.baidu.com"),
			zap.Error(err))
	} else {
		logger.Info("访问成功",
			zap.String("statusCode", resp.Status),
			zap.String("url", "www.baidu.com"))
		resp.Body.Close()
	}
	
}

```

打印结果

```go
{"level":"info","ts":1657118439.748776,"caller":"zaplog/index.go:29","msg":"访问成功","statusCode":"200 OK","url":"www.baidu.com"}

//level:是日志级别
//ts:时间戳
//caller:调用栈
//caller:log日志方法的第一个参数
//后面的statusCode、url的键值对是log日志方法的额外参数
```

**sugaredLogger**

Logger调用Sugar方法，返回的就是sugaredLogger

```go
package main

import (
	"go.uber.org/zap"
	"net/http"
)

var sugaredLogger *zap.SugaredLogger //日志记录器Logger、SugaredLogger，对性能要求高就是用Logger

func initLogger() (err error) {
	//zap.NewProduction() // 生产环境默认配置值
	//zap.NewDevelopment() // 开发环境默认配置值
	//zap.New() //自定义配置

	logger, _ := zap.NewProduction()
	sugaredLogger = logger.Sugar()
	return
}
func main() {
	initLogger()
	defer sugaredLogger.Sync() //写入磁盘

	resp, err := http.Get("http://www.baidu.com")
	if err != nil {
		sugaredLogger.Error(
			"访问错误",
			zap.String("url", "www.baidu.com"),
			zap.Error(err))
	} else {
		sugaredLogger.Info("访问成功",
			zap.String("statusCode", resp.Status),
			zap.String("url", "www.baidu.com"))
		resp.Body.Close()
	}

}
```

打印结果

```go
{"level":"info","ts":1657121340.018529,"caller":"zaplog/index.go:30","msg":"访问成功{statusCode 15 0 200 OK <nil>} {ur 0 www.baidu.com <nil>}"}
```



**补充**

上面两个例子均使用NewProduction这个配置

Logger换成NewDevelopment这个配置

```json
2022-07-07T01:10:24.785+0800    INFO    zaplog/index.go:29      访问成功        {"statusCode": "200 OK", "url": "www.baidu.com"}
```

Logger换成NewDevelopment这个配置

```
2022-07-07T01:13:22.526+0800    INFO    zaplog/index.go:30      访问成功{statusCode 15 0 200 OK <nil>} {url 15 0 www.b.com <nil>}
```



### 自定义Logger

```go
func New(core zapcore.Core, options ...Option) *Logger
```

其中的参数zapcore.Core，需要三个配置项——`Encoder`，`WriteSyncer`，`LogLevel`

1、**Encoder**：日志的格式

字段配置：使用预先设置的`NewProductionEncoderConfig()`、`NewDevelopmentEncoderConfig()`

日志格式

* JSON：`NewJSONEncoder()`

  ```
  zapcore.NewJSONEncoder(zap.NewProductionEncoderConfig())
  
  //输出格式样例
  //{"level":"info","ts":1657126830.894248,"msg":"访问成功{statusCode 15 0 200 OK <nil>} {url 15 0 www.baidu.com <nil>}"}
  ```

* Console输出格式（字段间空格分隔）：

  ```go
  zapcore.NewConsoleEncoder(zap.NewProductionEncoderConfig())
  
  //输出格式样例
  //1.6571270591036348e+09	info	访问成功{statusCode 15 0 200 OK <nil>} {url 15 0 www.baidu.com <nil>}
  ```

  

2、**WriterSyncer** ：指定日志将写到哪里去

使用`zapcore.AddSync()`函数并且将打开的文件句柄传进去

创建新文件

```go
file, _ := os.Create("./test.log")
writeSyncer := zapcore.AddSync(file)
```

没文件新建，有文件就追加

```go
func getLogWriter() zapcore.WriteSyncer {
	file, err := os.OpenFile("./test.log", os.O_CREATE|os.O_APPEND|os.O_WRONLY, 0644)
	if err != nil {
		fmt.Printf("%v\n", err)
	}
	return zapcore.AddSync(file)
}
```

3、**Log Level**：哪种级别的日志将被写入

```go
DebugLevel 

InfoLevel

WarnLevel

ErrorLevel
	
DPanicLevel
	
PanicLevel

FatalLevel

_minLevel 
	
_maxLevel 
```

**例子**

以日志记录器Logger为例子，使用自定义日志记录器配置，重写initLogger函数

```go
func initLogger() {
  //1、Encoder
  encoder := getEncoder()
  
  //2、WriterSyncer
	writeSyncer := getLogWriter()
	
  //3、创建zapcore.Core
	core := zapcore.NewCore(encoder, writeSyncer, zapcore.DebugLevel)

  //4、New方法自定义
	logger := zap.New(core)
}

func getEncoder() zapcore.Encoder {
	return zapcore.NewJSONEncoder(zap.NewProductionEncoderConfig())
}

func getLogWriter() zapcore.WriteSyncer {
	file, _ := os.Create("./test.log")
	return zapcore.AddSync(file)
}
```

运行结果：将日志输出到文件中

```log
{"level":"info","ts":1657128015.7524219,"msg":"访问成功","statusCode":"200 OK","url":"www.baidu.com"}
```

**进一步自定义Encoder的字段**

不使用`NewProductionEncoderConfig()`、`NewDevelopmentEncoderConfig()`这两种预定义的输出的格式

以NewProductionEncoderConfig为例子，如果想要精细的更改字段，就需要看下的源码

其只是返回了一个结构体，其实我们不使用NewProductionEncoderConfig，自己写这个结构体作为参数即可

```go
func NewProductionEncoderConfig() zapcore.EncoderConfig {
	return zapcore.EncoderConfig{
		TimeKey:        "ts",
		LevelKey:       "level",
		NameKey:        "logger",
		CallerKey:      "caller",
		FunctionKey:    zapcore.OmitKey,
		MessageKey:     "msg",
		StacktraceKey:  "stacktrace",
		LineEnding:     zapcore.DefaultLineEnding,
		EncodeLevel:    zapcore.LowercaseLevelEncoder,
		EncodeTime:     zapcore.EpochTimeEncoder,//这个属性是时间戳
		EncodeDuration: zapcore.SecondsDurationEncoder,
		EncodeCaller:   zapcore.ShortCallerEncoder,
	}
}
```

修改getEncoder方法

```go
func getEncoder() zapcore.Encoder {
	encoderConfig := zapcore.EncoderConfig{
    //定义日志的key和value
    LevelKey:       "等级",
    EncodeLevel:    zapcore.LowercaseLevelEncoder,//日志等级小写，如果希望大写请使用：zapcore.CapitalLevelEncoder,
    
    //定义表示日志时间的key和value
		TimeKey:        "时间",
    EncodeTime:     zapcore.ISO8601TimeEncoder,
    
    //定义message的key和value，value是logger.Error等记录日志函数的第一个参数
    MessageKey:     "提示信息",
    
    //定义当前生成这条日志的调用位置的key和value，只有在zap.New(core, zap.AddCaller())中添加第二个参数，才会输出这个字段
    CallerKey:      "调用位置",
    EncodeCaller:   zapcore.ShortCallerEncoder,//调用位置从项目根目录开始，如果希望是系统绝对路径请使用：FullCallerEncoder
    
		NameKey:        "logger",
		
		FunctionKey:    zapcore.OmitKey,
		StacktraceKey:  "stacktrace",
    
    //每行以\n结尾
		LineEnding:     zapcore.DefaultLineEnding,
	
		EncodeDuration: zapcore.SecondsDurationEncoder,
		
	}
	return zapcore.NewJSONEncoder(encoderConfig)
}
```

运行结果：将日志输出到文件中

```json
{"等级":"info","时间":"2022-07-07T01:24:45.491+0800","提示信息":"访问成功","statusCode":"200 OK","url":"www.baidu.com"}
```

结构体的EncodeTime字段的值

```go
EncodeTime:zapcore.EpochTimeEncoder //时间戳
EncodeTime:zapcore.ISO8601TimeEncoder //"2022-07-07T01:24:45.491+0800"
EncodeTime:zapcore.TimeEncoderOfLayout("2006-01-02"), //按照指定格式格式化时间,例如："2022-07-07"
```

**zap.New(core, zap.AddCaller())**

增加调用字段（每条日志记录的代码位置）

```go
package main

import (
	"fmt"
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
	"net/http"
	"os"
)

var logger *zap.Logger //日志记录器Logger、SugaredLogger，对性能要求高就是用Logger

func initLogger() {
	//1、Encoder
	encoder := getEncoder()

	//2、WriterSyncer
	writeSyncer := getLogWriter()

	//3、创建zapcore.Core
	core := zapcore.NewCore(encoder, writeSyncer, zapcore.DebugLevel)

	//4、New方法自定义
	logger = zap.New(core, zap.AddCaller())
}

func getEncoder() zapcore.Encoder {
	encoderConfig := zapcore.EncoderConfig{
		//定义日志的key和value
		LevelKey:    "等级",
		EncodeLevel: zapcore.LowercaseLevelEncoder, //日志等级小写，如果希望大写请使用：zapcore.CapitalLevelEncoder,

		//定义表示日志时间的key和value
		TimeKey:    "时间",
		EncodeTime: zapcore.ISO8601TimeEncoder,

		//定义message的key和value，value是logger.Error等记录日志函数的第一个参数
		MessageKey: "提示信息",

		//定义当前生成这条日志的调用位置的key和value，只有在zap.New(core, zap.AddCaller())中添加第二个参数，才会输出这个字段
		CallerKey:    "调用位置",
		EncodeCaller: zapcore.ShortCallerEncoder,

		NameKey: "logger",
		FunctionKey:   zapcore.OmitKey,
		StacktraceKey: "stacktrace",
		LineEnding:    zapcore.DefaultLineEnding,

		EncodeDuration: zapcore.SecondsDurationEncoder,
	}
	return zapcore.NewJSONEncoder(encoderConfig)
}

func getLogWriter() zapcore.WriteSyncer {
	//file, _ := os.Create("./test.log")
	//return zapcore.AddSync(file)
	file, err := os.OpenFile("./test.log", os.O_CREATE|os.O_APPEND|os.O_WRONLY, 0644)
	if err != nil {
		fmt.Printf("%v\n", err)
	}
	return zapcore.AddSync(file)
}
func main() {
	initLogger()
	defer logger.Sync() //写入磁盘

	resp, err := http.Get("http://www.baidu.com")
	if err != nil {
		logger.Error(
			"访问错误",
			zap.String("url", "www.baidu.com"),
			zap.Error(err))
	} else {
		logger.Info("访问成功",
			zap.String("statusCode", resp.Status),
			zap.String("url", "www.baidu.com"))
		resp.Body.Close()
	}

}
```

结果：多了一个调用位置

```json
{"等级":"info","时间":"2022-07-08T00:16:56.543+0800","调用位置":"zaplog/index.go:74","提示信息":"访问成功","statusCode":"200 OK","url":"www.baidu.com"}
```

**注意**

一般生成JSON格式的日志，使用filebeat来进行日志分析

### 日志切割

zap不支持日志切割，所以一般使用Lumberjack

https://www.liwenzhou.com/posts/Go/zap/#autoid-1-3-4

**安装**

```go
go get github.com/natefinch/lumberjack
```

**使用**

只需要修改`WriteSyncer`部分的代码，就能在zap中加入Lumberjack支持

```go
func getLogWriter() zapcore.WriteSyncer {
	lumberJackLogger := lumberjack.Logger{
		Filename:   "./test.log", //日志文件的位置
		MaxSize:    1,            //日志文件的最大大小（以MB为单位）
		MaxBackups: 5,            //保留旧文件的最大个数
		MaxAge:     1,            //保留旧文件的最大天数
		Compress:   false,        //是否压缩/归档旧文件
	}
	return zapcore.AddSync(&lumberJackLogger)
}
```



### 在Gin中集成zap

学习Gin时候提到过

```go
gin.Default()
```

其原理就是，添加了Logger和Recovery两个中间件

```go
func Default() *Engine {
	debugPrintWARNINGDefault()
	engine := New()
	engine.Use(Logger(), Recovery())
	return engine
}
```

如果想要集成zap日志，就要使用自己的中间件

自己实现，请参考这篇博客：https://www.liwenzhou.com/posts/Go/use_zap_in_gin/

使用第三方库实现的请参考：https://github.com/gin-contrib/zap

## 处理配置文件（viper）

### 介绍

https://www.liwenzhou.com/posts/Go/viper_tutorial/

项目的官方github地址（https://github.com/spf13/viper）

**viper简单来说就是一个用来读取自己项目中的配置的库**

* 支持显式的设置参数值，设置参数默认值

* 支持读取`JSON`、`TOML`、`YAML`、`HCL`、`envfile`和`Java properties`格式的配置文件，同时支持热加载（可以监听配置文件变化）
* 从环境变量中读取配置
* 支持从命令行参数读取配置
* 支持从buffer读取配置

**Viper会按照下面的优先级读取（从高到低）**

- 显式的设置值
- 命令行参数
- 环境变量
- 配置文件（`JSON`、`TOML`、`YAML`、`HCL`、`envfile`和`Java properties`）
- key/value存储（注意：目前Viper配置的键（Key）是大小写不敏感的）
- 默认值

### 安装

```
go get github.com/spf13/viper
```

### 设置Viper

```go
package main

import (
	"fmt"
	"github.com/spf13/viper"
)


func main() {

	//1、读取配置文件
	viper.SetConfigName("config") //配置文件名（不带后缀的名字）这是因为有些文件本就是不带后缀的，比如.zshrc
	
  //当从远程获取配置文件信息时，才会生效
  //viper.SetConfigType("yaml")   //配置文件的后缀名
	
  //如果项目下，有两个多个名为config的文件，可以使用SetConfigFile同时指定带后缀的文件名
	//viper.SetConfigFile("config.yaml")

	//2、配置去哪个路径下，找配置文件（可以添加多个）
	viper.AddConfigPath(".")        //当前项目路径
	viper.AddConfigPath("./config") //当前项目路径的config文件夹下
	viper.AddConfigPath("$HOME")    //参数中可包含环境变量

}

```

### 监听配置变化

```go
viper.WatchConfig()
viper.OnConfigChange(func(e fsnotify.Event) {
  // 配置文件发生变更之后会调用的回调函数
	fmt.Println("配置文件变化了:", e.Name)
})
```

例子

```go
package main

import (
	"fmt"
	"github.com/fsnotify/fsnotify"
	"github.com/gin-gonic/gin"
	"github.com/spf13/viper"
	"net/http"
)


func main() {
	viper.SetConfigName("config") 
	viper.SetConfigType("yaml")  
	
	viper.AddConfigPath(".")      
	
	if err := viper.ReadInConfig(); err != nil {
		if _, ok := err.(viper.ConfigFileNotFoundError); ok {
			fmt.Printf("配置文件不存在")
			return
		} else {
			fmt.Printf("配置文件存在,但是存在其他错误：%v\n", err)
			return
		}
	}

	viper.WatchConfig()
	viper.OnConfigChange(func(e fsnotify.Event) {
		// 配置文件发生变更之后会调用的回调函数
		fmt.Println("配置文件变化了:", e.Name)
	})

	r := gin.Default()
	r.GET("/config", func(context *gin.Context) {
		value := viper.Get("userName")
		context.String(http.StatusOK, "%v\n", value)
	})
	r.Run(":9000")
}

```

![image-20220709175915771](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Go/20220709175916%20.png)

更改配置文件，控制台就会打印

```text
配置文件变化了 /Users/yc/Documents/GO/GoProject/Gogin/goViper/config.yaml
```

### 写入配置文件

**配置的默认值**

```go
viper.SetDefault("file", "123")
```

**覆盖配置的值**

```go
viper.Set("file2", "1234")
```

**别名**

为配置项的key名建立映射

```go
viper.RegisterAlias("name", "UserNmae")  

//下面两个覆盖效果是一样的
viper.Set("name", "tom") 
viper.Set("UserNmae", "tom")
```



**注意**

后面的写入配置文件，还是拷贝配置文件，他们的前提都是要指明配置文件的位置，就是【设置Viper】章节提到的SetConfigName、AddConfigPath中指定配置文件的名字和路径，否则就会报错



**写入配置文件**

前面的配置默认值、覆盖配置都需要调用这里的方法，才能写入配置文件

* WriteConfig ：如果写入的键在配置文件中存在，SetDefault不会覆盖，Set会覆盖
* SafeWriteConfig：如果写入的键在配置文件中存在， 不会覆盖，会报错

```go
err := viper.WriteConfig()
//err := viper.SafeWriteConfig()
if err != nil {
	fmt.Printf("写入配置文件失败，err：%v\n", err)
}
```

**拷贝配置文件**

参数是拷贝配置文件到目标路径

* viper.WriteConfigAs 如果目标路径存在该配置文件，就会覆盖
* SafeWriteConfigAs 如果目标路径存在该配置文件，就会覆盖，而且报错

```go
err:=viper.WriteConfigAs("./Myconfig.yaml") 
//err:=viper.SafeWriteConfigAs("./Myconfig.yaml")
if err != nil {
		fmt.Printf("拷贝配置文件失败，err：%v\n", err)
	}
```

### 读取不同源数据到Viper实例

**从io.Read读取**

```go
viper.SetConfigType("yaml") 

var yamlExample = []byte(`
name: "tom"
age: 19
host: 
- address: "127.0.0.1"
- port: 9000
`)

viper.ReadConfig(bytes.NewBuffer(yamlExample))

viper.Get("name") // tom
```



**从环境变量读取**

`BindEnv`使用一个或两个参数

* 第一个参数是键名称，第二个是环境变量的名称
* 环境变量的名称区分大小写。
* 没有第二个参数（没有提供ENV变量名）那么Viper将自动假设ENV变量与以下格式匹配：`前缀大写+ "_" +键名全部大写`。例如，如果只有一个参数是“home”，Viper将查找环境变量"AVA_HOME"
* 有第二个参数时， **不会** 自动添加前缀。例如，如果第二个参数是"home"，Viper将查找环境变量"HOME"

```go
viper.SetEnvPrefix("java") //设置前缀，参数全部转换为大写

viper.BindEnv("home") //参数全部转换为大写字母，如果有设置前缀，绑定为JAVA_HOME；如果

//读取值
value := viper.Get("home")
fmt.Printf("值是：%v", value)
```



**从命令行参数读取**

Viper支持[Cobra](https://github.com/spf13/cobra)库中使用的`Pflag`

```go
//设置命令行参数 flagname 
pflag.Int("flagname", 1234, "help message for flagname")
//读取参数
pflag.Parse()
//绑定参数，默认绑定命令函数参数
viper.BindPFlags(pflag.CommandLine)

//读取值
i := viper.GetInt("flagname") // 从viper而不是从pflag检索值
```

如果想要绑定Go标准库中提供的flag库

原理：通过调用pflag包提供的函数`AddGoFlagSet()`来包装flag库

```go
package main

import (
	"flag"
	"github.com/spf13/pflag"
)

func main() {

	// 使用标准库 "flag" 包
	flag.Int("flagname", 1234, "help message for flagname")

	pflag.CommandLine.AddGoFlagSet(flag.CommandLine)
  
	pflag.Parse()
	viper.BindPFlags(pflag.CommandLine)

	i := viper.GetInt("flagname") // 从 viper 检索值

}
```



**从配置文件读取**

```go
if err := viper.ReadInConfig(); err != nil {
	if _, ok := err.(viper.ConfigFileNotFoundError); ok {//使用断言判断是否是配置文件不存在的错误
		fmt.Printf("配置文件不存在")
		return
	} else {
		fmt.Printf("配置文件存在,但是存在其他错误：%v\n", err)
		return
	}
}
fmt.Printf("读取成功\n")
```



### 从Viper实例获取值

**例子**

例如，现在有一个配置文件`config.yaml`

```yaml
userName: "hdd"
age: 22

host:
  address: "127.0.0.1"
  port: 9000

gitConfig:
  repoName: "Git仓库名"
  repoUrl: "github.com/xxx/xxxx"
  pollTime: 3600
```

main.go

```go
package main

import (
	"fmt"
	"github.com/spf13/viper"
)

func main() {
	//读取配置文件
	viper.SetConfigName("config")
	viper.SetConfigType("yaml")


	//当前项目路径下找配置文件
	viper.AddConfigPath(".")  

	//使用断言判断是否是配置文件不存在的错误
	if err := viper.ReadInConfig(); err != nil {
		if _, ok := err.(viper.ConfigFileNotFoundError); ok {
			fmt.Printf("配置文件不存在")
			return
		} else {
			fmt.Printf("配置文件存在,但是存在其他错误：%v\n", err)
			return
		}
	}
	
  //这里来进行读取配置（*）
}

```

下面读取值的代码都是在（*）这一行下面写的

**根据配置项value的类型**

- `GetBool(key string) : bool`
- `GetFloat64(key string) : float64`
- `GetInt(key string) : int`
- `GetIntSlice(key string) : []int`
- `GetString(key string) : string`
- `GetStringMap(key string) : map[string]interface{}`
- `GetStringMapString(key string) : map[string]string`
- `GetStringSlice(key string) : []string`
- `GetTime(key string) : time.Time`
- `GetDuration(key string) : time.Duration`

例子：

```go
value := viper.GetInt("age")
```

注意：

* GetInt函数要求value是Int类型，如果age字段的值是字符串，就会返回Int类型的零值

* 如果配置文件中不存在age字段，也会返回Int类型的零值

* 如何判断是使用的函数不对，还是配置项的value真的是零值

  `IsSet(key string) : bool`

  



**不区分配置项value的类型**

* `Get(key string) : interface{}`

注意：

如果，配置文件中不存在，下面的port字段，会返回nil

```go
value := viper.Get("age")
```



**读取嵌套结构中的某个key**

比如，访问配置文件中的post字段下的port

```go
value := viper.Get("host.port")
```



**读取子树**

Sub函数返回值是一个Viper指针

```go
value := viper.Sub("host").Get("port")
```



**反序列化**

将Viper实例中的值，转化为Go语言中的结构体（需要提前定义好结构体的结构）

```go
type config struct {
	UserName string
	Age      int
}

var c config
if err := viper.Unmarshal(&c); err != nil {
	fmt.Printf("序列化失败，err：%v\n", err)
}
fmt.Printf("%#v\n", c)
```

无论是哪种格式的配置文件（我们的例子里是yaml格式），tag都是`mapstructure`

如果仅仅是结构体字段首字母大写，配置文件首字母小写的差异，不用添加tag，Viper也能正常读入

```go
type config struct {
	Name string `mapstructure:"userName"`
	Age  int
}
```



反序列化为嵌入结构体

这种是实际项目中用的最多的，一般会把配置文件读入到嵌入结构体中，然后再全局使用

```go
type config struct {
	userName string 
	Age  int
	host configHost //这里嵌入了另一个结构体
}
type configHost struct {
	address string
	port    int
}

var c config
if err := viper.Unmarshal(&c); err != nil {
	fmt.Printf("序列化失败，err：%v\n", err)
}

var h configHost
if err := viper.Unmarshal(&h); err != nil {
	fmt.Printf("序列化失败，err：%v\n", err)
}

fmt.Printf("%#v\n", c) //main.config{Name:"hdd", Age:22, host:main.configHost{address:"", port:0}}
```

嵌入结构体的指针用法

```go
type config struct {
	UserName    string
	Age         int
	*ConfigHost `mapstructure:"host"` //切入部分用指针
}
type ConfigHost struct {
	Address string
	Port    int
}

var C = new(config)//直接定义一个全局指针

if err := viper.Unmarshal(C); err != nil {
	fmt.Printf("序列化失败，err：%v\n", err)
}
```





**序列化为字符串**

将Viper实例中的值，并转成字符串（反序列化是转成结构体）

需要安装

```go
go get "gopkg.in/yaml.v2"
```

例子

```go
import (
	yaml "gopkg.in/yaml.v2"
)
c := viper.AllSettings()
bs, err := yaml.Marshal(c)
if err != nil {
  fmt.Printf("转化为YAML失败，err:%v\n", err)
}
fmt.Printf("%#v\n", string(bs))
```



### 注意

全局就一个Viper实例时，在其他包下直接引入，就可以获取Viper实例

```go
import "github.com/spf13/viper"

func GetData(){
  viper.Get(key)
}
```

## 优雅关机和重启

https://www.liwenzhou.com/posts/Go/graceful_shutdown/

## 企业级脚手架

将 日志（zap）、配置文件（viper）、GORM 集成到Gin框架中

[项目地址](https://gitee.com/hyj1270433876/GoProjectByHDD/tree/master/Gogin/goScaffold)



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

  





