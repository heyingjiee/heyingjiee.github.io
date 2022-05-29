---

title: JS系统学习笔记
date: 2020-6-8
tags: [js]
categories: 前端技术  
toc: true 
cover: https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Js相关/e4dde71190ef76c6ac26b6319516fdfaaf516737.jpg
---
# 写在前面的话





# ES6

ES6 ,即ECMAscript是一种规范 ，js只是代码实现

#  Babel

babel是一个js的编译器，因为有部分浏览器不支持ES6，可以用babel对ES6转成ES5，让更多的浏览器支持

[Babel入门教程 ----阮一峰的网络日志](http://www.ruanyifeng.com/blog/2016/01/babel.html)

# 严格模式“use strict”

* 严格模式use strict 的位置

  ```
  //写在全局的第一行，则整段代码在严格模式下运行
  
  //写在函数定义的第一行，调用函数时，该函数以严格模式运行
  
  //注意：严格地说，只要前面不是产生实际运行结果的语句，"use strict"可以不在第一行，比如直接跟在一个空的分号后面。
  ```

  因为第一种调用方法不利于文件合并（有些文件是整个在严格模式下运行，有的不是，合并时，原本不在严格模式下运行的文件可能会因为违反严格模式而报错），所以更好的做法是，借用第二种方法，将整个脚本文件放在一个立即执行的匿名函数之中。

  ```javascript
  //要求函数是严格模式，文件代码写在其中，那么合并时，不会因为自己用了严格模式，而影响到其他文件
  (function (){
  
  　　　　"use strict";
  
  　　　　// some code here
  
  })();
  ```

* 使用严格模式，必须要声明

  ```javascript
  //不使用严格模式，可以不声明变量，直接用，但是容易污染全局变量
  a=1
  function fun(){
      a=2
  }
  fun()
  console.log(a)//输出2
  
  //使用严格模式,报错a未声明（未定义），Uncaught ReferenceError: a is not defined
  
  "use strict"
  a=1
  function fun(){
      a=2
  }
  fun()
  console.log(a)
  
  //修改后
  "use strict"
  var a=1
  function fun(){
      var a=2
  }
  fun()
  console.log(a)//输出1
  ```

* 严格模式，关键词不允许做变量使用

  ```javascript
  "use strict";
  var public = 'houdunren.com';//public是js关键字
  //报错，Uncaught SyntaxError: Unexpected strict mode reserved word
  ```

* 严格模式,定义函数形参不能重名

  ```javascript
  "use strict";
  //不允许参数重名,报错，Uncaught SyntaxError: Duplicate parameter name not allowed in this context
  function hd(name, name) {} 
  ```

* 严格模式有**函数作用域**和**全局作用域**

  ```javascript
  //严格模式有全局作用域,放在所有js代码的第一行
  
  //严格模式有函数作用域,放在函数内第一行，仅仅该函式在严格模式下运行
  function fun1(){ 
      a=2
      console.log(a)
  }
  function fun2(){
      "use strict"
      b=2
      console.log(b)
  }
  fun1()//输出2
  fun2()//报错a未定义，Uncaught ReferenceError: a is not defined。user strict只对该函数作用域有效
  
  
  //将来Javascript的版本会引入严格模式的"块级作用域"。为了与新版本接轨，严格模式只允许在全局作用域或函数作用域的顶层声明函数。也就是说，不要求在非函数的代码块内必须声明函数
  //所以不会报错，会正常执行，输出4个2
  for(let i=0;i<2;i++){
      "use strict";
      a=2
      console.log(a)
  }
  for(let i=0;i<2;i++){
      b=2
      console.log(b)
  }
  
  ```

* 严格模式下的**解构赋值**（后面会讲到）

  ```javascript
  "use strict";
  ({name,url} = {name:'后盾人',url:'houdunren.com'});
  console.log(name, url);// 报错，Uncaught ReferenceError: url is not defined
  
  //修改后
  "use strict";
  var {name,url} = {name:'后盾人',url:'houdunren.com'};
  console.log(name, url);//输出 后盾人 houdunren.com
  ```

  更多内容参见：[Javascript 严格模式详解----阮一峰的网络日志](http://www.ruanyifeng.com/blog/2013/01/javascript_strict_mode.html?utm_source=tuicool&utm_medium=referral)





## 类型转换

![image-20210412121122798](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/%E9%9D%A2%E8%AF%95%E7%9B%B8%E5%85%B3/image-20210412121122798.png)

## 变量提升与TDZ

**1.不加类型**

`var a=1`在全局作用域和块级作用域下，会成为window的一个属性。在函数作用域下，不会成为window的属性（函数执行完，就会销毁变量）

![image-20210412111917502](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/%E9%9D%A2%E8%AF%95%E7%9B%B8%E5%85%B3/image-20210412111917502.png)

`a=1`无论是在全局还是块作用域中，都会成为window的一个属性

例题

```
  var a,b;
 
    (function(){
 
        alert(a);   //这是第一个输出的,先在局部没找到a变量，然后去全局找，找到了但没定义，输出undefined
 
        alert(b);    //这是第二个输出的，其他同上
 
        var a=b=3;    //定义一个局部变量a=3,然后给全局变量b赋值 b=3;
 
        alert(a);     //这是第三个输出，局部变量a=3
 
        alert(b);     //这是第四个输出，全局变量b=3
 
    })();            //这个函数体已经执行完毕，里面的内存已经被垃圾回收器回收，局部变量a销毁
 
    alert(a);        //这是第五个输出，全局变量a=undefined
 
    alert(b);        //这是第六个输出，全局变量b=3
 
     
 
    故正确答案是undefined,undefined,3,3,undefined,3;选A
```



**2. var**

* 可以重复声明

  ```javascript
  var a=10
  console.log(a)
  var a=5
  console.log(a)
  //输出 10 5
  //最后a=5,但是一个a重复声明了两次
  ```

* 无法限制修改，var变量可以任意修改

* 没有**块级作用域**，var,let,const都有**函数作用域**（例子在后面的**污染全局**中）

  ```javascript
  {
  	//块级作用域
  	//var 没有块级作用域，写在块内，也会污染全局
  	//let，const写在块内，不会污染全局
  }
  
  function fun(){
  	//函数作用域，var，let ，const均有，不会污染全局
  }
  ```

* 变量提升

  变量提升即将**变量声明**（赋值并不会提升）提升到它所在作用域的最开始的部分。变量提升在全局提升到最前边，如果是在函数作用域中，仅提升到函数作用域的最前边

  ```javascript
  console.log(a)
  var a=1 //输出undefined
  
  
  function hd(){
  	if(false){//这句不会执行,但是仍然进行变量提升
  		var a=1
  	}
  	console.log(a)
  }
  hd()//输出undefined
  ```

* 污染全局（函数作用域中的var不会污染全局，块级中的var会污染全局）

  ```javascript
  var a=1
  function fun(){
  	var a=2//函数运行完销毁，不会污染全局
  	console.log(a)//有先访问块级作用域中的定义
  }
  fun()//输出2
  console.log(a)
  //输出1
  
  
  
  var a=1
  function fun(){
      a=2 //如果不加var，则改变全局，即使函数销毁，仍然会污染全局变量
  	console.log(a)//有先访问块级作用域中的定义
  }
  fun()
  console.log(a)
  //输出2，2
  ```

**3.let,const**

* 同一个作用域下不能重复声明，重复声明，会报错。避免像var一样，之后写的变量覆盖了之前的同名变量，还不报错提示

  ![image-20210412112440566](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/%E9%9D%A2%E8%AF%95%E7%9B%B8%E5%85%B3/image-20210412112440566.png)

  ```javascript
  //报错，Identifier 'a' has already been declared
  let a=1
  let a=2
  
  //也会报错，Identifier 'a' has already been declared
  let a=1
  var a=1
  ```

* let可以修改，const是常量，初始化时必须赋值，且不能修改。更严谨的说法是，const类型的变量，初始化后的变量指向的内存地址不可以改变

  ```javascript
  const a=10
  a=9//报错赋值给常量，Uncaught TypeError: Assignment to constant variable.
  ```

  但是！！！const的是对象时，stu固定指向对象的内存地址，不可修改，但是对象的内容可以修改，因为stu指向的内存地址未改变

  ```javascript
  const stu={
      name:"张三",
      age:18
  }
  stu.age=20
  console.log(stu) //输出{name: "张三", age: 20}
  ```

  如何锁定const指向对象时，对象不许改变

  ```javascript
  const stu={
      name:"张三",
      age:18
  }
  Object.freeze(stu)//锁定对象
  stu.age=20
  console.log(stu)////不报错，但是修改失效，输出{name: "张三", age: 18}
  ```

* let和const都拥有了**块级作用域**

  ```javascript
  //let有块级作用域，可以避免污染全局
  var a=1
  for(let i=0;i<3;i++){
      let a=2
  }
  console.log(a) //输出1,未污染全局变量
  console.log(i) //报错，Uncaught ReferenceError: i is not definedconst 
  
  //const有块级作用域，可以避免污染全局
  const a=1
  for(let i=0;i<2;i++){
      const a=2//const
      console.log(a)  //输出两次2
  }
  console.log(a)//输出1，全局变量未被污染
  ```

* let和const的**暂时性死区**(TDZ ，以下仅以let做讲解)

  ```javascript
  //报错，let和const不存在变量提升
  console.log(a)
  let a=1
  
  //不会报错，输出1,函数中出现a，如果函数内没有a，则会向上寻找
  let a=1
  function fun(){
  	console.log(a)
  }
  fun()
  
  //报错未初始化前不能访问，Uncaught ReferenceError: Cannot access 'a' before initialization
  //这里就产生临时性锁区，当处在块级作用域（即{}之间）中时，如果已经有了let a=2,那么就不会在块级作用域外寻找变量a，又因为let不存在变量提升，所以报错
  let a=1
  function fun(){
  	console.log(a)
  	let a=2
  }
  fun()
  
  
  //对比下var
  //块级作用域中的使用变量a，若块级作用域中有该变量a，那么就不会在块级作用域外寻找变量a，但是a写在console.log后，仅仅是输出undefined，并不报错，因为块级作用域的var a提身到，块级作用域中靠前的位置
  var a=1
  function fun(){	
      console.log(a)
      var a=2
  }
  fun()//undefined,2
  console.log(a)//undefined
  ```

  来看一个复杂点的例子，理解临时性锁区

  ```javascript
  let a=1
  let b=3
  function fun(){
      console.log(b)
      console.log(a)
  	let a=2
  }
  fun()
  
  //输出3 和  Uncaught ReferenceError: Cannot access 'a' before initialization
  
  //中有a出现了暂时性锁区，b没有
  ```

# 作用域

* 全局变量

  * 不会被回收

  * 在函数作用域也可以访问到

    ```javascript
    let a="hello"
    function func(){
    	console.log(a) //输出 hello
    }
    func()
    ```

* 函数作用域中的变量

  * 函数执行完毕就会销毁。两次调用add()函数，是单独创建两个不同的栈。而且输出n都是2，并不是2和3，函数执行完毕后，n无定义

    ```javascript
    function add(){
      let n=1
        n++
        console.log(n)
    }
    
    add()//输出2
    add()//输出2
    
    console.log(n)//Uncaught ReferenceError: n is not defined
    ```
    
  * 但是当变量被引用时，不会被回收，一旦不再被引用，就会被回收。以下代码引用了子函数，父级环境得以保留的方式

    ```javascript
    function f(){
       let n=1;
       return function(){
            n++;
            console.log(n)
        }
    }
    
    let res=f()//引用返回的函数
    res()//输出2
    res()//输出3
    ```

    每次把for循环创建一个块级作用域，把函数压入数组，相当于引用了子函数，使得整个3个块级作用域被保留

    ```javascript
    let arr=[]
    for(let i=1;i<=3;i++){
       arr.push(
        	function(){
        		return i
        	}
       )
    }
    console.log(arr)//输出 (3) [ƒ, ƒ, ƒ]
    ```

    **构造函数中如何使用该特性**

    ```javascript
    function f(){
       let n=1;
       this.add= function(){
            n++;
            console.log(n)
        }
    }
    
    let res=new f()//生成一个对象，对象中引用了子函数add()
    res.add()//输出2
    res.add()//输出3
    ```
    
  * 子作用域可以访问父作用域的变量

    ```javascript
    function func(){
        let a="hello"//函数作用域，可以向子级传递
      function show(){
            let b="hi"
            console.log(a)//输出 hello
        }
        show()
    }
    func()//输出hello
    ```
  
* 块级作用域

  ```javascript
  {
      var a=1//var没有块级作用域,所以是处于全局作用于下
  }
  
  {
      let a=2
      console.log(a)//输出 2，let有块级作用域的概念
  }
  
  {
      const a=3
      console.log(a)//输出 3，const有块级作用域的概念
  }
  console.log(a)//输出 1
  ```

  **常见的例子**（for循环创建的是块级作用域）

  i是全局变量，for循环3次，执行3遍setTimeout函数，但是要等1秒才console.log(i)时，会向父级作用域查找，找到全局中的i，全局i=4

  ```javascript
  for(var i=1;i<=3;i++){
      setTimeout(function(){
          console.log(i)
      },1000)
  }//输出 4 4 4
  ```

  每次for循环let都会创建一个块作用域，循环3次，执行3遍setTimeout函数，但是要等1秒才console.log(i)时，，let有块级作用域，所以在块级作用域找对应的i值

  ```javascript
  for(let i=1;i<=3;i++){
      setTimeout(function(){
          console.log(i)
      },1000)
  }//输出 1 2 3
  ```

  ![image-20210412162442406](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/%E9%9D%A2%E8%AF%95%E7%9B%B8%E5%85%B3/image-20210412162442406.png)

过去的var没有块级作用域，要想实现块级作用于的效果，是如何解决的？

​	**var虽然没有块级作用域，但是有函数作用域**

```javascript
//.for循环了3次，创建了3个立即执行函数，i通过立即执行函数传递进去
for(var i=1;i<=3;i++){
    (function(a){
        setTimeout(function(){
            console.log(a)
        },1000)
    })(i)
    
}//输出 1 2 3
```



# 闭包

闭包：函数可以访问到父级作用域中的数据

简单的例子，计数器

```js
//计数器

//----分隔线----

///1.不用闭包
function add(){
    var count = 0
    count++
    console.log(count)
}
//每次调用add函数时，都会在不同的count上加1　　　　　
add()//输出 1
add()//输出 1
add()//输出 1

//----分隔线----

////2.不用闭包，实现计数器。这种方式会污染全局变量(闭包作用)
var count = 0;
function add(){
    count++;
    console.log(count);
}
//每次调用add函数时，都会在同一个count上累加
add()//输出 1
add()//输出 2
add()//输出 3

//----分隔线----

////3.使用闭包，实现计数器
function add(){
        var count = 0;
        return function inner(){
            count++;
            console.log(count);
        }
        return inner;
　　　　　　　//将内部函数作为返回值返回
}
var outer = add();//定义一个变量接收add函数的返回值。注意：add函数return的是inner函数，函数被引用，那就会在内存中保留下来（count也是被保留下来），不会被销毁，所以可以实现count的累加
outer();//outer本身就是返回的函数inner，这里的()相当于一个立即执行函数
outer();
outer();
//在函数外add函数外直接访问count变量是不可能的,但是通过闭包就可以实现(闭包作用)

////对比看下，如果不用return会怎样
function add(){
        var count = 0;
        function inner(){
            count++;
            console.log(count);
        }
       inner()
　　　　　　　//不return上面的inner函数了，而是当调用add时，执行函数inner。我们可以看到结果，count的值一直都是1，因为inner函数未被引用，并不会保留在内存中，每个count都是不同的
}
add()//输出 1
add()//输出 1
add()//输出 1

//----分隔线----

////4.使用闭包，实现计数器，这里的函数是构造函数
function func(){
    let count=1
    this.add= function(){//注意：构造函数中，add函数相当于是return add，即当new func()时，函数add已经被返回给变量引用，引用计数器加1。引用计数器不为0，函数就不会从内存中删除,count就会能够实现累加
        count++
        console.log(count)
    }
}
////实例化的不同对象，处在不同内存空间，彼此独立
let a=new func()
console.log(a)//输出 func {add: ƒ}，从这里可以看出来，add函数被a引用
a.add()//输出 2
a.add()//输出 3

let b=new func()
b.add()//输出 2
b.add()//输出 3
```

另一个例子，指定数组范围过滤

```js
let arr=[6,8,3,33,54,67,42,14,28]
function between(a,b){
    return function(item){
        return item>=a&&item<=b//闭包，可以访问父级作用域的a,b
    }
}

console.log(arr.filter(between(20,60)))//输出  [33, 54, 42, 28]
```

还有一个例子。商品按需排序

```js
var product=[
    {name:"iphone",price:5000,clickNum:200},
    {name:"ipad",price:3000,clickNum:150},
    {name:"iwatch",price:3500,clickNum:120},
    {name:"ipod",price:1000,clickNum:400},
] 
function orderBy(field){
    return function(a,b){
        return a[field]-b[field]
    }
}
//按点击数排序
product.sort(orderBy("clickNum"))
console.log(product)

//按价格排序
product.sort(orderBy("price"))
console.log(product)

//注意product是引用类型,如果两个排序一起写，后一个排序会覆盖前一个
```

**闭包的作用**

1.可以防止全局的命名空间被污染

　　如果要写一个累加器,不使用闭包的话,就必须定义一个全局的变量来接收

2.便于模块化开发

​		使用闭包开发的项目各个功能都被封装到了各自的函数中,之间互不影响

3.安全性

​		将变量都变为私有的,只有通过内部函数才能访问函数的变量,能够提高成程序的安全性

**闭包造成的内存泄漏**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div desc="这里是vue的属性desc">vue</div>
    <div desc="这里是nodejs的属性desc">nodejs</div>

    <script>
        var divs=document.querySelectorAll("div")
        divs.forEach(function(item){
            let desc=item.getAttribute("desc")
            //这里是闭包。当dom元素很多时，每一个循环都会创建一个函数环境，会占用大量内存资源
            item.addEventListener("click",function(){
                console.log(desc)
     
            })
            //解决方案：获取完item的desc属性后，会把item置空
            item=null
           
        })
    </script> 
</body>
</html>
```



# Symbol

Symbol的参数称为描述

```js
//创建两个Symbol，不相等
let a=Symbol()
let b=Symbol()
console.log(a==b)//输出false

//带描述的Symbol
let a=Symbol("张三")
let b=Symbol("张三")
console.log(a==b)//输出false

//使用for创建的Symbol描述相同会相等。原理，使用for系统会在内存中记录有了这样一个Symbol(张三)，再次创建Symbol(张三)时，系统会在内存中查找是否存在，存在直接赋值给b
let a=Symbol.for()
let b=Symbol.for()
console.log(a==b)//输出true
let c=Symbol.for("张三")
let d=Symbol.for("张三")
console.log(c==d)//输出true
//for创建的Symbol可以用keyFor方法
console.log(Symbol.keyFor(c))//输出张三

//
let a=Symbol("张三")
//toString
console.log(a.toString())//输出 Symbol(张三)
//description，获取Symbol的描述
console.log(a.description)//输出 张三
```

班级统计成绩时，重名很常见，如果重名的话，对象中重名的key会被覆盖

```js
let user1="张三"
let user2="张三"
let grade={
    //对象中使用变量，需要用中括号括起来，key就成了"张三"和"李四"，否则key为user1和user2
    [user1]:{"math":80,"english":60},
    [user2]:{"math":60,"english":70}
}
console.log(grade)//输出张三: {math: 60, english: 70}

//解决
let user1={
    key:Symbol(),
    name:"张三"
}
let user2={
    key:Symbol(),
    name:"张三"
}
let grade={
    [user1.key]:{"math":80,"english":60},
    [user2.key]:{"math":60,"english":70}
}
console.log(grade)
//输出
//Symbol(): {math: 80, english: 60}
//Symbol(): {math: 60, english: 70}
```

取出Symbol类型的key

```js
let symbol=Symbol("这是一个字符串")
let obj={
    name:"张三",
    age:20,
    [symbol]:"abcde"
}
for(let key in obj){
    console.log(key)
} //输出name age .不会输出[symbol]

//使用Reflect.ownKeys(obj)解决
for(let key of Reflect.ownKeys(obj)){
    console.log(key)
} //输出 name age Symbol(这是一个字符串)


////这样可以保护内部私有属性
let school=Symbol("这是一个Symbol")
class Student{
    constructor(name,age){
        this.name=name
        this.age=age
        this[school]="实验小学"
    }
    getName(){
        return `${this[site]} ${this.name}}`
    }
}
let stu=new Student("李四",20)
for(const key in stu){
    console.log(key)
}//输出 name age ,可以看出来即使遍历对象的key，symbol类型的school不会显示出来
```



# 对象

## 对象的简写

* 当key和value值一样时，可以简写
* 函数简写

```js
let a=5
let b=7
let obj={a:a,b:b,c:12}
//或者简写
let obj={a,b,c:12}
```

```js
let obj={
	a:12,
	show:function(){
		console.log(this.a)
	}
}

//或者简写
let json={
	a:12,
	show(){
		console.log(this.a)
	}
}

```

## 创建对象

直接创建对象

```js
let user={
    name:"张三",
    grade:[
        {cname:"js",score:60},
        {cname:"html",score:60},
        {cname:"vue",score:90},
      
    ],
    //可简写average(){ //函数内容}
    average:function(){
        //注意这里reduce的用法，cur是对象{canme,score}，但是pre是分数综合，没有score属性
        let total=this.grade.reduce((pre,cur)=>{
            return pre+cur.score
        },0)
        return total/this.grade.length
    }
}
console.log(user.average())//输出 70
```

使用**工厂函数**创建对象，工厂函数的返回值是对象，所以直接调用函数即可创建对象

```js
function user(name){
    return{
        name,//这里是对象的简写，name:name
        show:function(){
            console.log(this.name)
        }
    }
}
//注意：这个函数的返回值是对象。我们可以用工厂函数，生成我们需要的对象（有些对象只有些许不同，其余大部分函数内容都相同，共产函数能简单的创建对象）

let obj=user("张三")
console.log(obj)

let obj2=user("李四")
console.log(obj2)
```

使用**构造函数**创建对象。需要 new 才能创建 对象

```js
function user(name){
    this.name=name
    this.show=function(){
        console.log(this.name)
    }
    //注意构造函数，默认有下面这句，this代表user对象
    //return this
}
let res=new user("张三")
console.log(res)//输出 user {name: "张三", show: ƒ}
```

## 使用构造函数方式创建其他类型

js中所有的类型都可以用构造函数创建

```js
////对象
let obj=new Object()//上个代码块中的构造函数是自己写的user，这里的Object是系统的
console.log(obj)//输出 {}

////数组
let arr=new Array(1,2,3)
console.log(arr)

////数字
let n=new Number(1)
console.log(n.valueOf())//输出 1
//平时使用 let n=1 ,就可以创建Number类型的变量

////字符串
let str=new String("hi")
console.log(str.valueOf())//输出 hi
//平时使用 let str="hi" ,就可以创建String类型的变量

////布尔值
let b=new Boolean(true)
console.log(b.valueOf())//输出 true

////函数
let func=new Function("title","console.log(title)")
func("你好")//输出 你好
```

## 对象属性的操作

* delete
* Object.assign( ) 

```js
let user={
    name:"张三",
    score:90,
    age:20
}
////访问已存在的属性
console.log(user.name)//输出 张三

////删除属性
delete user.name
console.log(user.name)//输出 undefined

////添加原本不存在的属性
user.sex="男"
console.log(user.sex)//输出 男
//或者 user["sex"]="男"，注意这里属性加引号
//一个小应用，按自己的需求生成对象的键值
let id=1
let obj={}
obj[`id-${id++}`]="这是值"
obj[`id-${id++}`]="这是值"
obj[`id-${id++}`]="这是值"
console.log(obj)//输出 {id-1: "这是值", id-2: "这是值", id-3: "这是值"}

////添加的属性，可变
obj={name:"张三"}
newKey="sex"
obj[newKey]="男"  //注意：这里newKey是变量，不要用3
console.log(obj)//输出 {name: "张三", sex: "男"}


////覆盖属性
//方式一：使用展开语法
//参数传了就按照参数，不传就用默认的
function upload(params){
    let config={
        type:"gif",
        size:1000
    }
    config={...config,...params}//parms中重名的属性会覆盖掉config中的
    console.log(config)
   
}
upload({size:99})//输出 {type: "gif", size: 99}

//方式二：使用assign
function upload(params){
    let config={
        type:"gif",
        size:1000
    }
    config=Object.assign(config,params)//parms中属性与config中重名的属性，会用params的值覆盖掉config中的值
    console.log(config)
   
}
upload({size:99})//输出 {type: "gif", size: 99}
```

## 遍历对象

* for key in 

* for iterator of //user不能直接for of遍历，但是keys()，values()，entries()的返回值均是数组，可以遍历他们

* Object.keys( ) 
* Object.values( )
* Object.entries( )

```js
let user={
    name:"张三",
    score:90,
    age:20
}

////for key in
for(const key in user){
    console.log(key,user[key])
}//输出
//name 张三
//score 90
//age 20

////使用keys.values,entries方法
console.log(Object.keys(user))//输出 ["name", "score", "age"]
console.log(Object.values(user))//输出 ["张三", 90, 20]
console.log(Object.values(user))//输出 [ ["name", "张三"],["score", 90],["age", 20] ]

////for of的使用。 注意 for(let value in user)不行，会报错
for(let iterator of Object.keys(user)){
    console.log(iterator)
}//输出 name score age

for(let iterator of Object.values(user)){
    console.log(iterator)
}//输出 张三 90 20

for(let iterator of Object.entries(user)){
    console.log(iterator)
}//输出  ["name", "张三"] ["score", 90] ["age", 20]
```

## 属性检测（数组+对象）

* 数组

```js
arr=["a","b","c"]
//仅检测arr自身的属性是否存在
console.log(arr.hasOwnProperty("length"))//输出 true

//检测arr自己和父亲的属性中是否存在
console.log("concat" in arr)//输出 true
```

* 对象

```js
a={
    name:"张三"
}

b={
    school:"希望小学"   
}
Object.setPrototypeOf(a,b)//把b作为a的父亲
console.log(a)
//输出
//{name: "张三"}
//name: "张三"
//__proto__:
//school: "希望小学"
//__proto__: Object
console.log(a.hasOwnProperty("school")) //输出 false，仅检测自身的属性是否存在
console.log("school" in a)//输出 true


//应用,检测对象参数其否有某些属性
function up(options){
    if(!options.hasOwnProperty("age")){
        throw new Error("必须设置年龄")
    }   
}
up({name:"张三"})
//报错 Uncaught Error: 必须设置年龄
    
```

## 属性的特征

* Object.getOwnPropertyDescriptor( ) 获取对象某一个属性的特征
* Object.defineProperty 设置单个属性的特征。若属性存在则是修改，不存在则创建
  *  writable:false,//对象值不可修改
  *  enumerable:false//对象不可遍历
  *  configurable:false//对象属性不可删除，对象的configurable，enumerable特征不可修改。对于对象的值value是否可以修改，则取决于writable是否为true

```js
let user={
    name:"张三",
    age:20
}
//获取user的属性name的特征
console.log(Object.getOwnPropertyDescriptor(user,"name"))

Object.defineProperty(user,"age",{
    value:20,
    writable:false,//是否修改
    enumerable:false,//是否可遍历到
    configurable:false//是可以删除
})
```

* Object.getOwnPropertyDescriptors( ) 获取整个对象的特征
* Object.defineProperties 批量设置属性的特征。若属性存在则是修改，不存在则创建（以下对象特征，同上）
  * writable
  *  enumerable
  *  configurable

```js
let user={
    name:"张三",
    age:20
}
console.log(Object.getOwnPropertyDescriptors(user))
//age: {value: 20, writable: true, enumerable: true, configurable: true}
//name: {value: "张三", writable: true, enumerable: true, configurable: true}

Object.defineProperties(user,{
	name:{ value:"张三" ,writable:true },
    age:{ value:20 ,writable:true }

})
```

例子

```js
let user={
    name:"张三"
}
//获取属性name的特征
console.log(Object.getOwnPropertyDescriptor(user,"name"))//输出 {value: "张三", writable: true, enumerable: true, configurable: true}

//若属性存在修改，不存在创建
Object.defineProperty(user,"name",{
    value:"李四"
})
console.log(user)//输出 {name: "李四", score: 90, age: 20}

Object.defineProperty(user,"age",{
    value:20,
    writable:false,//是否修改
    enumerable:false//是否可遍历到
    configurable:false//是可以删除
})
console.log(user)//输出 {name: "李四", age: 20}
user.age=15//修改无效
console.log(user)//输出 {name: "李四", age: 20}

console.log(Object.keys(user))//输出 ["name"]，age属性遍历不到

delete user.age//删除无效
```

禁止对象添加属性

* Object.preventExtensions( )

```js
let user={
    name:"张三",
    age:20
}
//禁止增加属性
Object.preventExtensions(user)
console.log(Object.isExtensible(user))//输出 false
user.score=90//不能成功添加属性
```

封闭对象

* Object.seal( )

给对象添加封闭状态，即不能添加，不能删除属性，不能设置对象特征。可以遍历。是否可以修改存在的属性，取决于writeable是否为true

```js
let user={
    name:"张三",
    age:20
}
Object.seal(user)
console.log(Object.isSealed(user))//输出 true ，判断是否是封闭状态
console.log(Object.getOwnPropertyDescriptors(user))
//age: {value: 20, writable: true, enumerable: true, configurable: false}
//name: {value: "张三", writable: true, enumerable: true, configurable: false}


```

冻结对象

* Object.freeze( )

给对象添加冰冻状态，即不能添加，不能修改，不能删除属性，不能设置对象特征。可以遍历

```js
let user={
    name:"张三",
    age:20
}
Object.freeze(user)//给对象添加封闭状态，即不能添加，删除属性，不允许遍历，不能设置对象特征
console.log(Object.isFrozen(user))//输出 true ，判断是否是封闭状态

console.log(Object.getOwnPropertyDescriptors(user))
//age: {value: 20, writable: false, enumerable: true, configurable: false}
//name: {value: "张三", writable: false, enumerable: true, configurable: false}
```

## 对象的访问器

定义访问器后，给属性赋值和取值都是经过访问器处理后的，而不是像普通对象直接赋值或者取值

```js
let user={
    //这种方式可以使得user内部的name，age不能直接使用user.name这样的方式读写，只能通过访问器读写
    data:{name:"张三",age:20},
    //定义set访问器
    set age(value){//value就是设置的值，这个例子里就是3
        if(typeof value!="number"){
            throw new Error("年龄不是数字")
        }else{//this指代当前的对象user
            this.data.age=value
        }
    },
    //定义get访问器
    get age(){
        return this.data.age+"岁"
    }
}
//定义访问器后，设置age属性值时，可以进行处理，把处理后的结果赋值age。而不是直接给age赋值
user.age=3 
//定义访问器，取值时
console.log(user.age) 

//如果只有set访问器，则user.age只可以赋值
//如果只有get访问器，则user.age只可以取值
```

访问器优先级高于属性

```js
let user={
    name:"张三",
    age:20,
    set age(value){
        console.log("访问器执行，"+value+"岁")
    }
}
user.age=30 //输出 访问器执行，30岁。执行set访问器
console.log(user.age)//输出 undefined。因为存在set访问器，访问器优先级高，回去找set age访问器，不会找内部的age属性
```

访问器的应用：token的处理

```js
let Request={
    set token(value){
        localStorage.setItem("token",value)
    },
    get token(){
        let token=localStorage.getItem("token")
        console.log(token)
        if(!token){
            alert("请登录")
        }
        return token
    }
  
}

Request.token="dsfdasdv"
console.log(Request.token)//输出 dsfdasdv
```

## （p186,187没听懂）Proxy代理

代理与访问器不同，代理是通过Proxy对象，去处理另一个对象、函数、数组

```js
const proxiedObject = new Proxy(initialObj, handler);
```

调用Proxy构造函数，`new Proxy()`将返回一个对象，`initialObj`表示要操作的对象、函数、数组，`handler`表示处理的方法。

### 代理控制对象

```js
"use strict"//注意：使用严格模式，get有return，set也得加上return，否则报错/不加严格模式，即使set没有return，也不会报错，且正常运行
const stu={
    name:"张三",
    age:20
}
//代理
const proxy=new Proxy(stu,{
    get(obj,property){
        //obj代表代理器控制的对象，property表示对象的属性
        //使用代理时，由proxy.name传入
        return obj[property]
    },
    set(obj,property,value){//value是使用代理时proxy.name="李四"中的“李四”
        obj[property]=value
        return true
    }
})

//使用代理
console.log(proxy.name)//输出 张三
proxy.name="李四"
console.log(proxy.name)//输出 李四
console.log(proxy.age)// 输出 20
```

### 代理控制函数 

```js
"use strict"
function show(value){
    console.log("参数"+value+"函数执行")
}
//代理
const proxy=new Proxy(show,{
    apply(fun,obj,args){
        //fun代表函数
        //上下文对象
        //参数数组
        console.log(fun)
        console.log(obj)
        console.log(args)
    }
}) 

//使用代理
proxy.apply(this,[1])//输出 show函数 window对象 [1] .this传入的是window对象
```

### 代理控制数组

```js
"use strict"
let arr=[
    {name:"张三",age:20},
    {name:"李四",age:18}
]
//代理
const proxy=new Proxy(arr,{
    get(array,key){//array是整个数组，key是 调用proxy[key]传进来的值
        console.log(array[key])
    }
}) 

//使用代理
proxy[1]//输出 {name:"李四",age:18}
```

### Vuejs中的双向数据绑定

两个输入框，绑定一个变量，一个改变，另一个也变化

```js
//实现数据双向绑定

function View(){//使用构造函数
    //创建一个代理控制空对象，在get，set方法中不操作空对象，而是操作dom对象
    let proxy=new Proxy({},{
        get(obj,property){

        },
        set(obj,property,value){
            document
                .querySelectorAll(`[v-model="${property}"]`)
                .forEach(item=>{
                //item是输入框，value是输入框的属性，即输入框中的文字
                    item.value=value
                })

        }
    })
   
    this.init=function(){
        //querySelectorAll的参数是css选择器，比如 ".exp"代表class=exp的dom元素。"[v-mode]"表示，属性是v-mode的dom元素
        const els=document.querySelectorAll("[v-model]")
        els.forEach(item=>{
            item.addEventListener("keyup",function(){//按键松开触发
                //this 指代的是当前的这个item，即输入框
                //proxy是对象，这里是对象的属性是变量是用obj[属性变量]
                proxy[this.getAttribute("v-model")]=this.value
            })
        })

    }
}
//调用构造函数
new View().init()
```



## 解构赋值（数组+对象）

**解构赋值规则**：

1. 左右两边结构必须一样
2. 右边必须是个合法的东西，比如对象，数组

```js
let {a,b}={1,2} //报错，右面不合法，没法解构
```

3. 声明和赋值不能分开（必须在一句话里）

**举例**：

* 对象解构赋值

注意对象通过属性名解构，所以解构时，属性名的顺序不影响解构

let {name,age}={name:"张三",age:20}和

let {age，name}={name:"张三",age:20}一样

```js
//左侧第一个name是要取出的右侧对象的key，左侧第二个name是指把取出来后的值，赋值给name，可以简写成以下
//let {name:name,age:age}={name:"张三",age:20}
let {name,age}={name:"张三",age:20}
console.log(name,age)//输出 张三 20

//部分解构
let {name}={name:"张三",age:20}
console.log(name)//输出 张三 
//设置默认解构出来的值。有该值则显示，没有就显示默认值
let {name,age,score="90"}={name:"张三",age:20}
console.log(name,age,score)//输出 张三 20 90 

let {name,age,score="90"}={name:"张三",age:20,score:50}
console.log(name,age,score)//输出 张三 20 50 
//多层对象解构
let node = {
    type: "Identifier",
    name: "foo",
    loc: {
        start: {
            line: 1,
            column: 2
        },
        end: {
            line: 1,
            column: 4
        }
	}
};

//解构部分内容，和前面一样的方式解构
let { loc: { start }} = node;
console.log(start.line); // 1
console.log(start.column); // 2

//对比下，不加{}，就是把loc的内容取出来，然后赋值给res
let {loc:res}=node
console.log(res.start.line)//1



//----分隔线----
//利用解构赋值拼成对象
let name="张三",age=18
// let obj={name:name,age:age}
//简写
let obj={name,age}
console.log(obj)
```

* 数组解构赋值

```js
//解构数组
let arr=["hello","hi","good"]
let [a,b,c]=arr
console.log(a,b,c)//输出 hello hi good

//部分解构，数组没有对象的key，所以部分解构只能这样
let [,,c]=arr
console.log(c)//输出 good

//设置默认解构出来的值。有该值则显示，没有就显示默认值
let arr=["hello","hi","good"]
let [a,b,c,d="你好"]=arr
console.log(a,b,c,d)//输出 hello hi good 你好

let arr=["hello","hi","good","你不好"]
let [a,b,c,d="你好"]=arr
console.log(a,b,c,d)//输出 hello hi good 你不好
```

**应用**

前端开发时，可以用来解析后端传来的json对象

```js
//backinfo是json对象
//backinfo中的data数据中的
const{data:res}=backinfo
```

解构函数的对象参数，例子设置DOM元素默认值

```js
function createDom(options){
    let {width=200,height=200,backgroundColor="red"}=options
    const div=document.createElement("div")
    div.style.width=width+"px"
    div.style.height=height+"px"
    div.style.backgroundColor=backgroundColor
    document.body.appendChild(div)
}
createDom({width:60,height:300})//没输入背景色，默认红色
```

在形参处，解构函数的对象参数

```js
function show(name,{sex,score}){//name是普通参数，第二个参数是对象参数
    console.log(name,sex,score) 
}
show("张三",{sex:"男",score:20})//输出 张三 男 20
```



**严格模式**

```js
//不使用严格模式
({name,age}={name:"张三",age:20})//得加括号，否则不是严格模式也会报错
console.log(name,age)

//严格模式，必须声明
"use strict"
let {name,age}={name:"张三",age:20}
console.log(name,age)
```

## 对象的浅拷贝与深拷贝

**浅拷贝**

当我们复制的**引用类型**（数组，对象），其中的某一属性值还是**引用类型**（数组，对象）的时候，以下方式就不能把这个属性复制出来一个新的，而是和复制之前共用同一块内存空间。这时候就需要深拷贝了

*  for key in
* Object.assign
* 展开语法

```js
let user={
    name:"张三",
    score:90,
    age:20
}

////复制新的对象

//方式一：这种方式
let obj={}
for(let key in user){
    obj[key]=user[key]
}
console.log(obj)//输出 {name: "张三", score: 90, age: 20}
obj.name="李四"//修改obj,而user未改变，证明obj和user是两个不同的存储位置
console.log(obj)//输出 {name: "李四", score: 90, age: 20}
console.log(user)//输出 {name: "张三", score: 90, age: 20}


//方式二：Object.assign
let obj2=Object.assign({},user)//把user和空对象合并，返回一个新对象
console.log(obj2)//输出 {name: "张三", score: 90, age: 20}
obj2.name="王五"//修改obj2,而user未改变，证明obj2和user是两个不同的存储位置
console.log(obj2)//输出 {name: "王五", score: 90, age: 20}
console.log(user)//输出 {name: "张三", score: 90, age: 20}


//方式三:展开语法
let obj3={...user}
console.log(obj3)//输出 {name: "张三", score: 90, age: 20}
obj3.name="李六"//修改obj3,而user未改变，证明obj3和user是两个不同的存储位置
console.log(obj3)//输出 {name: "李六", score: 90, age: 20}
console.log(user)//输出 {name: "张三", score: 90, age: 20}
```

**深拷贝**

```js
let teacher={
    name:"张三",
    stu:{//对象
        name:"李四"
    },
    arr:[]//数组
}
//递归的方式，对某些属性值是对象的，对该对象再次进行浅拷贝
function copy(param){
    let res=param instanceof Array?[]:{}
    for(const [key,value] of Object.entries(param)){

        res[key]=typeof value=="object"?copy(value):value
    }
    return res
}
let new_obj= copy(teacher)
console.log(new_obj)//和teacher一样
//对拷贝的new_obj进行修改
new_obj.stu.name="王五"
new_obj.arr.push("数组")
//测试，new_obj改变，teacher未改变
console.log(teacher)
console.log(new_obj)

```

## 对象的封装与抽象

```js
function user(name){
    this.name=name
    this.show=function(){
        console.log(this.name)
    }
    //注意构造函数，默认有下面这句，this代表user对象
    //return this
}
let res=new user("张三")
//注意：可以在外部修改，不安全
res.name="李四"
console.log(res)//输出 user {name: "李四", age: 18, show: ƒ}
```

解决方案：

因为构造函数中的**this.变量**可以在外部被访问到，可以修改，所以不安全。这里把参数接收到一个内部的对象中，不是构造函数的属性，所以不能访问或是修改，安全

```js
function user(name,age){
    //let data={name:name,age:age} 下一步是对象的简写
    let data={name,age}
    //闭包特性，内部函数可以访问父级做用户变量
    this.show=function(){
        console.log(data.name)
    }
}
let res=new user("张三",18)

//可以外部修改无用
res.name="李四"
res.show()
```



# JSON

注意：分清楚**json字符串**和**json对象**。json字符串用引号引起来的json形式的字符串，json对象就是js中json这种形式的对象

**json形式的标准写法：**

* 只能用双引号
* 所有的key需要用双引号引起来 

**json举例：**

* 单条json数据   {  “key1”:value1 , “key2”:value2}

  或者复杂的形式{  “key1” : value1 ，"key2":{  “key3” : value3 ，“key4” : alue4   }     }

* 多条json数据   [{},{},{},{}]

js对象，数组和json基本一样，只不过js对象，数组的key不带“ ”

**JSON.stringify**  把json对象变成json字符串

```js
let obj={a:12,b:6}
let str=JSON.stringify(obj)
console.log(str)

//输出，对象转成的json字符串（key带引号）
//{"a":12,"b":6}

//----分隔线----

let stu={
    name:"张三",
    age:20,
    teacher:{
        name:"教师1",
        tnum:1522
    }
}

//stringify的第二个参数：选取json对象的键(只能选择第一层级的键，比如第二层级的name,tnum都找不到)，将其转换为json字符串
//第三个参数：制表符的长度是几个空格
console.log(JSON.stringify(stu,["name","age"],2))
//输出
//{
//  "name": "张三",
//  "age": 20
//}

//第二个参数为null时，是选择整个对象转换为字符串
console.log(JSON.stringify(stu,null,2))
//输出
//{
//  "name": "张三",
//  "age": 20,
//  "teacher": {
//    "name": "教师1",
//    "tnum": 1522
//   }
//}
```

**toJSON**

```js
let stu={
    name:"张三",
    age:20,
    teacher:{
        name:"教师1",
        tnum:1522
    },
    toJSON:function(){//这里设置stringify的转换结果
        return{
            age:this.age+"岁"
        }
    }
}

console.log(JSON.stringify(stu)) //输出 {"age":"20岁"}
```

**JSON.parse** 把json字符串变成json对象

```js
let str='{"a":12,"b":6}'//这里注意下，由于key用了双引号，所以str字符串要用单引号
let json=JSON.parse(str)
console.log(json)

//输出，json字符串装成的对象（key不带引号）
//{a:12,b:6}
```

特殊技巧的应用: 给{}对象更改key名

```js
var aaa=[
    {name:"张"，age:15},
    {name:"李"，age:18,children:[
    	{name:"李2",age:10}
    ]}
]

//把上面的key改成自己需要的，有name换成new
var bbb= JSON.parse(JSON.stringify(aaa).replace(/name/g,"new"));

console.log(bbb)
```

# 原型与继承（待补充）

[好文](https://blog.csdn.net/cc18868876837/article/details/81211729)

![image-20210414211637552](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/%E9%9D%A2%E8%AF%95%E7%9B%B8%E5%85%B3/image-20210414211637552.png)

总结：

①__proto__和constructor属性是对象所独有的；

② prototype属性是函数所独有的，因为函数也是一种对象，所以函数也拥有__proto__和constructor属性。

③__proto__属性的作用就是当访问一个对象的属性时，如果该对象内部不存在这个属性，那么就会去它的__proto__属性所指向的那个对象（父对象）里找，一直找，直到__proto__属性的终点null，再往上找就相当于在null上取值，会报错。通过__proto__属性将对象连接起来的这条链路即我们所谓的**原型链**。
④**prototype**属性的作用就是让该函数所实例化的对象们都可以找到公用的属性和方法。

**注意：**f1.__proto__ === Foo.prototype。Foo.prototype是包含Foo()【是构造函数】和Object.prototype中的函数的【是__proto__原型】
⑤**constructor**属性的含义就是指向该对象的构造函数，所有函数（此时看成对象了）最终的构造函数都指向Function。

```javascript
let a={}
console.log(a.__proto__)//输出a的父亲属性，注意是"两个横线proto两个横线"
```

## 系统构造函数的原型链 

```javascript
let obj={}//相当于new Object

let arr=[]//相当于new Array

let func=function(title){
	console.log(title)
} //相当于 new Function("title","console.log(title)")

let num=1 //相当于new Number

let str=""//相当与new String

let bool=true //相当于new Boolean

let reg=/a/i //相当于 new RegExp
```

**举例子：用系统的构造函数 ，创建函数对象**

````javascript
function Foo(name,price){
	this.name=name
	this.price=price
}

//使用构造函数，实例化对象
let f1=new Foo("宫保鸡丁",20)

console.log(f1.__proto__==Foo.prototype)//输出 true
console.log(Foo.prototype.__proto__==Object.prototype)//输出 true
````

![image-20210414211637552](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/%E9%9D%A2%E8%AF%95%E7%9B%B8%E5%85%B3/image-20210414211637552.png)



## 自定义的构造函数的原型链

zs的`__proto__`指向了【构造函数`User()`和`__proto__`】,这个`__proto__`指向Object对象，其中有Oejcet的构造函数和其他Obeject的自带函数

```javascript
//自定义对象的构造函数
function User(name,age){
	this.name=name
	this.age=age
}

//使用构造函数，实例化对象
let zs=new User("张三",20)
console.log(zs)//输出见下图
```

![image-20210419125616198](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/%E9%9D%A2%E8%AF%95%E7%9B%B8%E5%85%B3/image-20210419125616198.png)

## 自定义对象的原型链

* 指定child对象的父亲

  ```javascript
  let parent={name:"父亲"}
  let child={name:"孩子"}
  
  Object.setPrototypeOf(child,parent)
  console.log(child)
  ```

  

![image-20210413212244932](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/%E9%9D%A2%E8%AF%95%E7%9B%B8%E5%85%B3/image-20210413212244932.png)

* 在原型链中增加公共属性和函数

  在object的共有属性和方法都放在prototype中，在其中添加函数。具体执行时，本对象User无show()方法，会顺着原型链，向上在每个上级的prototype中查找show()函数
  
  ```javascript
  Object.prototype.show=function(){
      console.log("这是添加在object构造函数中的方法show()")
  }
  
  let User={}
  
  User.show() //输出  这是添加在object构造函数中的方法show()
  
  console.log(User) //输出见下图
  ```
  
  ![image-20210413214912655](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/%E9%9D%A2%E8%AF%95%E7%9B%B8%E5%85%B3/image-20210413214912655.png)
  
* 获取对象的原型链

  ```javascript
  let parent={
      name:"父亲",
      show(){
          console.log(this.name)
      }
  
  }
  let child={name:"孩子"}
  
  Object.setPrototypeOf(child,parent)
  
  console.log(Object.getPrototypeOf(child))// 输出 {name: "父亲", show: ƒ}
  ```

## 原型链中的this指向

会指向调用函数本身，即使child的show函数是继承的parent，但是this仍指向child

```javascript
let parent={
    name:"父亲",
    show(){
        console.log(this.name)
    }

}
let child={name:"孩子"}

Object.setPrototypeOf(child,parent)

child.show() //孩子
parent.show() //父亲
```

## 通过原型链找到构造函数



# 类

JS提供了`class` 关键词用于模拟其它语言中的`class` ，但底层实现机制依然是**原型继承**。

`class` 只是语法糖为了让类的声明与继承更加简洁清晰。

## 声明定义

**定义方式一：**类的方式

```javascript
//定义类User
class User{
    //定义内部参数
    constructor(name){
		this.name=name
    }    
    //定义内部方法
    show(){ 
        //函数内容
    }
    get(){
		//函数内容
    }
}

//实例化
let li=new User("张三")

//调用User类中的方法
li.show()
```

**注意：**

①构造函数用于传递对象的初始参数，但不是必须定义的，如果不设置系统会设置如下类型

- 子构造器中调用完`super` 后才可以使用 `this`
- 至于 `super` 的概念会在后面讲到

```javascript
constructor(...args) {
  super(...args);
}
```

②细节：

* class中的函数（所有函数，包括constructor）,实例化成多个对象，每个对象共用同一个函数【原理是function定义类，在prototype上添加函数】
* 这些函数作为属性函数，每实例化一个对象，该对象中的this指向自己。由此可见，constructor中`this.name=name`每个对象，都是自己的，修改不会对其他对象造成影响【原理是原型链中this的指向】

* 没有定义在构造函数中的参数，实例化成多个对象时，每个对象都会携带一个参数，修改其中一个对象的`site`参数，不会对其他对象造成影响

```javascript
class User {
  //没有定义在构造函数中的参数，会被所有实例化的对象共有
  site = "姓名";
  constructor(name) {
    this.name = name;
  }
  show() {
    console.log(this.site + ":" + this.name);
  }
}
let a = new User("王五");
a.show();//输出 姓名:王五
let b=new User("张三")
b.show()//输出 姓名:张三
```

**定义方式二：**

```javascript
let User=class{
    
}
```

**定义方式三：**ES5中没有类的概念，它的写法（构造函数的方式）：

```javascript
//定义内部参数
function User(name,age){
    this.name=name
    this.age=age
}
//通过原型链，定义内部方法
User.prototype.showName=function(){
    console.log(this.name)
}
User.prototype.showAge=function(){
    console.log(this.age)
}

//实例化对象
var u1=new User('He','123')

//调用方法
u1.showName()
u1.showAge()
```

**注意：**

函数User中的`this.name`和`this.age`，每实例化一个对象，就会创建这2个变量，一个实例化的对象修改，不影响其他实例化的对象。所以，我们不把方法直接定义在函数内部，因为创建多个实例时，同一个方法会创建多次，浪费资源。将函数放到原型链上，创建实例后，需要执行该方法，会自动沿着原型链寻找

## 原理

类的本质是函数。下面用类和函数方式，生声明类

```javascript
class User {
  constructor(name) {
    this.name = name;
  }
  show() {}
}
console.dir(User);
console.log(User == User.prototype.constructor); //true
```

![111](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/%E9%9D%A2%E8%AF%95%E7%9B%B8%E5%85%B3/image-20210418163841016.png)

普通函数

```javascript
function Hd(name) {
  this.name = name;
}
console.dir(Hd);
console.log(Hd == Hd.prototype.constructor); //true
```

![image-20210418163725541](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/%E9%9D%A2%E8%AF%95%E7%9B%B8%E5%85%B3/image-20210418163725541.png)



## 用class和函数定义类的区别

* 用class定义类，只能遍历到定义的参数，方法无法遍历到 

  ```javascript
  class User {
    site="你好"
    constructor(name,age) {
      this.name = name;
      this.age=age
    }
    showName() {
      console.log(this.name);
    }
    showAge() {
      console.log(this.age);
    }
  }
  let xj = new User("张三",18);
  //不会枚举出show属性
  for (const key in xj) {
    console.log(key);
  }//输出 site name age
  ```

* 用函数定义,可以遍历到所有定义的参数和方法

  ```javascript
  function Hd(name,age) {
    this.name = name
    this.age=age
  }
  Hd.prototype.show = function() {
    console.log(this.name)
  };
  let obj = new Hd("张三",18)
  for (const key in obj) {
    console.log(key)
  }//输出 name age show
  ```


## 严格模式

`class` 默认使用`strict` 严格模式执行

* 用class定义类

  作为属性的函数中this指向本对象，**由于class默认严格模式，普通函数指向undefind**

  ```javascript
  class User {
    constructor(name) {
      this.name = name;
    }
    show() {
      console.log(this)//输出 User {name: "张三"}
      function test() {
        console.log(this);//由于默认严格模式，故输出 undefined
      }
      test();
    }
  }
  let a = new User("张三");
  a.show();
  ```

* 用函数定义类

  作为属性的函数中this指向本对象，普通函数指向window

  ```javascript
  function Hd(name) {
    this.name = name;
  }
  Hd.prototype.show = function() {
    function test() {
    	//非严格模式输出 Window
      console.log(this);
    }
    test();
  };
  let obj = new Hd("张三");
  obj.show();
  ```

## 静态属性

静态属性即为**类设置属性**，而**不是为实例化的对象设置属性**。只能通过类找到，比如：`User.site`

注意：即使有多个实例化的对象，静态变量也只有一份，使用`user.site="a"`后，静态变量就会被修改

```javascript
class User {
  static site = "姓名";
  constructor(name) {
    this.name = name;
  }
  showSite() { console.log(User.site) }//注意这里使用User.site找到site的值，使用this.site不行
}
let a = new User("王五");
console.log(a.site) //输出 undefind

console.log(User.site) //输出 姓名

a.showSite()// 输出 姓名
```

不使用static定义的属性，即为**每一个实例化的对象设置属性**，而**不是为类**。通过实例化的对象a使用`a.site`访问，在对象内部使用`this.site`访问

```javascript
class User {
  site = "姓名";
  constructor(name) {
    this.name = name;
  }
  showSite() { console.log(this.site) }
}
let a = new User("王五");

console.log(a.site) //输出 姓名
console.log(User.site) //输出 undefined

a.showSite()// 输出 姓名
```

**实现原理**

```javascript
function User() {}
User.site = "姓名";//静态属性
console.dir(User);

const a = new User();
console.log(a.site); //输出 undefiend
console.log(User.site); //输出 姓名
```

## 静态方法

指只能通过类访问，不能使用实例化的对象访问的方法，比如系统的`Math.round()`就是静态方法（Math是一个类，并没有实例化，就可以调用方法，是静态方法）

**注意：**一般来讲方法不需要对象属性参与计算就可以定义为静态方法（换一句换说，就是静态方法内部不能访问到类里面的变量）

```javascript
class User {
  site="你好"
  constructor(name) {
    this.name = name;
  }
  //方法前加上static
  static create(name) {
    return new User(name);
  }
}
const a = User.create("张三");
console.log(a);
```

**实现原理**

```javascript
function User() {
  this.show = function() {
    return "this is a object function";
  };
}

//实现静态方法
User.show = function() {
  return "welcome to houdunren";
};

const xj = new User();
console.dir(xj.show()); //this is a object function
console.dir(User.show()); //welcome to houdunren
```

## 访问器(在对象那一部分补充)

```javascript
class User {
  constructor(name) {
    this.name = name;
  }
  
}
const a = User.create("张三");
console.log(a);
```

## 访问控制

**public 未保护**

```javascript
class User {
  site="姓名"
  constructor(name) {
    this.name = name;
  }
}
const a = new User("张三");
console.log(a);//输出 User {name: "张三"}

//直接定义的属性和构造函数中的属性，都可以在外部修改，不安全
a.name="修改1"
a.site="修改2"
```

**protected**

**private**

`private` 指私有属性，只在当前类可以访问到，并且不允许继承使用

- 为属性或方法名前加 `#` 为声明为私有属性
- 私有属性只能在声明的类中使用



# 继承（6种）

想要继承，就必须要提供个父类（继承谁，提供继承的属性）
　　![img](https://img2018.cnblogs.com/blog/940884/201907/940884-20190717162054267-1200211276.png)　　
　　一、原型链继承
　　　　 ![img](https://img2018.cnblogs.com/blog/940884/201907/940884-20190717162110117-1744170661.png)
　　　　重点：让新实例的原型等于父类的实例。
　　　　特点：1、实例可继承的属性有：实例的构造函数的属性，父类构造函数属性，父类原型的属性。（新实例不会继承父类实例的属性！）
　　　　缺点：1、新实例无法向父类构造函数传参。
　　　　　　　2、继承单一。
　　　　　　　3、所有新实例都会共享父类实例的属性。（原型上的属性是共享的，一个实例修改了原型属性，另一个实例的原型属性也会被修改！）
　　
　　二、借用构造函数继承
　　　　 ![img](https://img2018.cnblogs.com/blog/940884/201907/940884-20190717162125772-1830945749.png)
　　　　重点：用.call()和.apply()将父类构造函数引入子类函数（在子类函数中做了父类函数的自执行（复制））
　　　　特点：1、只继承了父类构造函数的属性，没有继承父类原型的属性。
　　　　　　　2、解决了原型链继承缺点1、2、3。
　　　　　　　3、可以继承多个构造函数属性（call多个）。
　　　　　　　4、在子实例中可向父实例传参。
　　　　缺点：1、只能继承父类构造函数的属性。
　　　　　　　2、无法实现构造函数的复用。（每次用每次都要重新调用）
　　　　　　　3、每个新实例都有父类构造函数的副本，臃肿。

　　三、组合继承（组合原型链继承和借用构造函数继承）（常用）
　　　　 ![img](https://img2018.cnblogs.com/blog/940884/201907/940884-20190717162137084-1234623120.png)
　　　　重点：结合了两种模式的优点，传参和复用
　　　　特点：1、可以继承父类原型上的属性，可以传参，可复用。
　　　　　　　2、每个新实例引入的构造函数属性是私有的。
　　　　缺点：调用了两次父类构造函数（耗内存），子类的构造函数会代替原型上的那个父类构造函数。

　　四、原型式继承
　　　　 ![img](https://img2018.cnblogs.com/blog/940884/201907/940884-20190717162147596-1363486586.png)
　　　　重点：用一个函数包装一个对象，然后返回这个函数的调用，这个函数就变成了个可以随意增添属性的实例或对象。object.create()就是这个原理。
　　　　特点：类似于复制一个对象，用函数来包装。
　　　　缺点：1、所有实例都会继承原型上的属性。
　　　　　　　2、无法实现复用。（新实例属性都是后面添加的）
　　
　　五、寄生式继承
　　　　 ![img](https://img2018.cnblogs.com/blog/940884/201907/940884-20190717162158915-1866300593.png)
　　　　重点：就是给原型式继承外面套了个壳子。
　　　　优点：没有创建自定义类型，因为只是套了个壳子返回对象（这个），这个函数顺理成章就成了创建的新对象。
　　　　缺点：没用到原型，无法复用。
　　　　
　　六、寄生组合式继承（常用）
　　　　寄生：在函数内返回对象然后调用
　　　　组合：1、函数的原型等于另一个实例。2、在函数中用apply或者call引入另一个构造函数，可传参　
　　　　 ![img](https://img2018.cnblogs.com/blog/940884/201907/940884-20190717162220285-1478888936.png)
　　　　重点：修复了组合继承的问题

　　　　继承这些知识点与其说是对象的继承，更像是函数的功能用法，如何用函数做到复用，组合，这些和使用继承的思考是一样的。上述几个继承的方法都可以手动修复他们的缺点，但就是多了这个手动修复就变成了另一种继承模式。
　　　　这些继承模式的学习重点是学它们的思想，不然你会在coding书本上的例子的时候，会觉得明明可以直接继承为什么还要搞这么麻烦。就像原型式继承它用函数复制了内部对象的一个副本，这样不仅可以继承内部对象的属性，还能把函数（对象，来源内部对象的返回）随意调用，给它们添加属性，改个参数就可以改变原型对象，而这些新增的属性也不会相互影响。



# 正则表达式

正则表达式，可以更灵活的处理字符串

## 创建正则表达式

使用字面量的方式创建正则表达式

+ test( ) 是正则表达式的方法，只要匹配到符合条件的，就返回真,否则返回false
+ match( ) 是字符串的方法，返回匹配的值,匹配不到返回null
+ eval( )

```js
let str="abcda"

//使用test
console.log(/a/.test(str))//输出 true。检测str中是否存在a

let sd="a"
console.log(eval(`/${sd}/`).test(str))//输出true。eval是把字符串变为js表达式

//使用match
let reg=new RegExp("a","g")//第一个参数是匹配的字符，第二个参数g全局匹配，即把所有符合条件的找出来
console.log(str.match(reg))//输出 ["a", "a"]
```

使用**RegExp**对象的方式创建正则表达式

```js
let str="abcda"

//使用test
let reg=new RegExp("a","g")//第一个参数是匹配的字符，第二个参数g代表全局匹配
console.log(reg.test(str))//输出 true

let sd="a"
let reg2=new RegExp(sd,"g")//第一个参数是匹配的字符,可以为变量
console.log(reg2.test(str))//输出 true

//使用match
let reg=new RegExp("a","g")//第一个参数是匹配的字符，第二个参数是全局匹配
console.log(str.match(reg))//输出 ["a", "a"]
```

应用

弹出框，输入内容abc，和str匹配上了，网页上abc成为红色

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div>abcdefgh</div>
    <script>


let con=prompt("请输入检测的内容")
let reg=new RegExp(con,"g")
let div=document.querySelector("div")
div.innerHTML=div.innerHTML.replace(reg,search=>{
    return `<span style="color:red">${search}</span>`
}) 

    </script> 
</body>
</html>
```

选择符的使用： “ | ”

```js
let str="010-12345678"
console.log(/010|abc/.test(str))//输出 true。电话号码010或者abc
```

原子表和原子组

```js
let str="123456"

let regStr=/[1213]/ //原子表中每个值都是或的关系
//regStr是正则字符串，不是正则对象
//match只匹配一个
console.log(str.match(regStr))//输出 ["1", index: 0, input: "123456", groups: undefined]
  

let regStr2=/(56|9)/ //原子组中需要有或符号
//match只匹配一个
console.log(str.match(regStr2))//输出 ["56", "56", index: 4, input: "123456", groups: undefined]
```

转义

```js
let price="23.4"
//    \d代表0-9的数值  .代表除换行符以外的任何字符   \.代表普通的.
console.log(/\d+\.+\d/.test(price))//输出 true

//注意这里。正则对象的第一个参数是字符串，所以用两次转义符，
let reg=new RegExp("\\d+\\.+\\d","g")
console.log(reg.test(price))//输出 true
```

字面量的形式创建正则表达式

**/pattern/modifiers** 

```
pattern:
  * 标识0个或多个
  + 代表1个或多个
  ? 代表0个或1个
  
  ^ 开始
  $ 结束
  
  [] 原子表，匹一个字符
  [a-z] 代表a-z的1个小写字母
  [A-Z] 代表A-Z的1个小写字母
  [a-z]{3,6} 代表3-6位的小写字母
  [a-z,\d] 代表a-z的小写字母或者数字。注意原子表有多个匹配项的时候，只要有一个可以匹配上，就可以匹配到值
  [^a-z] 代表 非小写字母
  
  \d代表1个0-9的数值  
  \D代表除了数字以外的1个字符
  
  . 代表除换行符以外的任何1个字符   
  \.代表普通的.
  
  \s 代表1个空白符，即空格，换行
  \S 除了空白符以外的1个字符
  
  \w 代表1个字母或数字或下划线
  \W 除了字母，数字，下划线以外的1个字符
 
modifiers:
  i 表示不区分大小写
  g 表示全局匹配，匹配全部符合要求的部分
  ig 模式符可以任意结合，标识不区分大小写，全局匹配
```

多行匹配

# Dom操作（待补充）

DOM 即Document Object Model 文档对象模型

## 基础知识

### 操作Dom元素的时机

一般将<script>标签，写在整个网页最后，因为整个页面渲染完毕后，js才能正确的操作Dom元素

* 不过我们可以将脚本通过事件放在页面渲染完执行

  ```html
  <script>
    window.onload = function () {
      let hd = document.getElementById('hd')
    }
  </script>
  <div id="hd">hd1</div>
  ```

* 或使用定时器将脚本设置为异步执行(Dom元素渲染是主线进程，执行完，才会执行宏任务中的异步操作)

  ```html
  <script>
    setTimeout(() => {
      const node = document.getElementById('hdcms')
      console.log(node)
    })
  </script>
  <h1 id="hdcms">hd1</h1>
  ```

* 或将脚本设置在外部文件并使用defer属性加载，defer即会等到DOM解析后迟延执行

  ```html
  <script defer="defer" src="1.js"></script>
  <div id="hd"></div>
  ```

### Dom节点对象

JS中的内容称为DOM节点对象（node)，即然是对象就包括操作NODE的属性和方法

- 包括12种类型的节点对象
- 常用的节点为document、标签元素节点、文本节点、注释节点
- 节点均继承自Node类型，所以拥有相同的属性或方法
- document是DOM操作的起始节点



# 其他补充

![img](https://uploadfiles.nowcoder.com/images/20170713/7852649_1499938839314_ED9CA7D967A21103F57659E48CE27B40)

^ 异或运算，不一样才是1，一样都是0

# [前端模块化详解(完整版)](https://segmentfault.com/a/1190000017466120)

https://segmentfault.com/a/1190000017466120

# 优秀的JS库

## moment.js 

时间处理类库，格式化时间

* 官网：http://momentjs.cn/ 
* 使用moment()是当前时间

```js
var moment=require("moment")
//更多用法看官网
moment().format('MMMM Do YYYY, h:mm:ss a'); // 四月 7日 2020, 5:34:36 下午
moment().format('dddd');                    // 星期二
moment().format("MMM Do YY");               // 4月 7日 20
moment().format('YYYY [escaped] YYYY');     // 2020 escaped 2020
moment().format();  
```

官网上没有的用法，对指定的时间格式化

```js
 //时间切换到当前月份1号
 moment().startOf('month').format("YYYY-MM-DD"); 
 //时间切换一天/星期/月/年之前
 moment().subtract(1, "days").format('YYYY-MM-DD')
 moment().subtract(1, "weeks").format('YYYY-MM-DD')
 moment().subtract(1, "months").format('YYYY-MM-DD')
 moment().subtract(1, "years").format('YYYY-MM-DD')
```

## video.js

Video.js是一款web视频播放器，支持html5和flash两种播放方式。更有自定义皮肤，插件，组件，语言还有丰富的选项配置。

[官网](https://docs.videojs.com/index.html)

[中文文章](https://blog.csdn.net/a0405221/article/details/80923090)

><source src="视频地址" type="视频类型">
>
>src是mp4资源，type="video/mp4"
>
>src是m3u8资源，type="application/x-mpegURL"

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>videojs视频播放DEMO</title>
</head>
<link href="https://cdnjs.cloudflare.com/ajax/libs/video.js/7.3.0/video-js.min.css" rel="stylesheet">
<script src="https://cdnjs.cloudflare.com/ajax/libs/video.js/7.3.0/video.min.js"></script>
<body>
  <h3>视频播放</h3>
  <video id="example_video_1" class="video-js vjs-default-skin" controls preload="none" poster="http://vjs.zencdn.net/v/oceans.png">
    <source src="http://vjs.zencdn.net/v/oceans.mp4" type="video/mp4">
    <--<source src="https://youku.cdn4-okzy.com/20210221/14123_1a9144f8/1000k/hls/index.m3u8" type="application/x-mpegURL">-->  
  </video>
</body>
</html>
<script>
  var player = videojs('example_video_1', {
    muted: true,
    controls: true,
    height: 300,
    width: 400,
    loop: true,
    // 更多配置.....
  });
</script>
```



## mux.js

用于检查和操作视频容器格式的轻量级工具

[github仓库地址](https://github.com/videojs/mux.js/)

### 播放ts文件

[中文文章](http://cache.baiducontent.com/c?m=lnVYBxWz830fAJsAAEYY3BvfZHE_KYUdz9gPOKf0cHQ6nftFMc4OQzMTdKrUYu4a5uTntAMODcQsNGDPAgy0BfYz99lnW-v1qWa7Pyploc98gwiKk4oM1y5wL5WSJc_-1RubK1N9P2URlQEt5Ha_b8FS50iAYK82IUI01S0Pzypq5uWlLRSC0jEuHOR91klZSs6ue3zSgpw02cYDTcKVDK&p=c067d4039d904ead06bd9b7b0855&newp=c636c91e99904ead08e2917b554892695d0fc20e3ad0d701298ffe0cc4241a1a1a3aecbf2c231504d1c27a6505aa4b56e8f232783d0034f1f689df08d2ecce7e&s=cfcd208495d565ef&user=baidu&fm=sc&query=mux%2Ejs%D4%F5%C3%B4%D3%C3&qid=b869cab90012ee0d&p1=1)

[中文文章](https://www.jianshu.com/p/4d90f81b01bc)

自己在访问视频网站时，打开chrome的调试工具，发现有些视频网站在播放视频时，会返回ts后缀的视频文件。

比如[这个视频](http://www.diezhan.me/dalu/nihaoanyi/play-0-9.html)

> 新建html页面，粘贴以下代码
>
> 在该目录下，使用npm install mux.js  下载mux.js
>
> 在任意目录下，使用 npm install http-server -g ，全局安装http-server。 然后在html页面所在目录下，输入命令 http-server。
>
> 就会出现一个本地网址，访问这个网址

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>videojs视频播放DEMO</title>
</head>
<link href="https://cdnjs.cloudflare.com/ajax/libs/video.js/7.3.0/video-js.min.css" rel="stylesheet">
<script src="https://cdnjs.cloudflare.com/ajax/libs/video.js/7.3.0/video.min.js"></script>
<script src="https://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js"></script>
<script type="module" src="./node_modules/mux.js/dist/mux.js"></script>
<body>
  <h3>视频播放</h3>
  <div id="video-wrapper"></div>
</body>
</html>
<script>
  var $ = document.querySelector.bind(document);
    var vjsParsed,
        video, 
        mediaSource;
    // 定义通用的事件回调处理函数，只做打印事件类型
    function logevent (event) {
      console.log(event);
    }
    
    // ajax
    let xhr = new XMLHttpRequest();
    //使用ajax,访问下面这个ts后缀文件
    xhr.open('GET', "https://youku.cdn4-okzy.com/20210220/14060_f897c8db/1000k/hls/c41810b4ada000035.ts");
    // 接收的是 video/mp2t 二进制数据，并且arraybuffer类型方便后续直接处理 
    xhr.responseType = "arraybuffer";
    xhr.send();
    xhr.onreadystatechange = function () {
      if (xhr.readyState ==4) {
        if (xhr.status == 200) {
          transferFormat(xhr.response);
        } else {
          console.log('error');
        }
      }
    }
    
    function transferFormat (data) {
      // 将源数据从ArrayBuffer格式保存为可操作的Uint8Array格式
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer
      var segment = new Uint8Array(data); 
      var combined = false;
      // 接收无音频ts文件，OutputType设置为'video'，带音频ts设置为'combined'
      var outputType = 'video';
      var remuxedSegments = [];
      var remuxedBytesLength = 0;
      var remuxedInitSegment = null;

      // remux选项默认为true，将源数据的音频视频混合为mp4，设为false则不混合
      var transmuxer = new muxjs.mp4.Transmuxer({remux: false});
      
      // 监听data事件，开始转换流
      transmuxer.on('data', function(event) {
        console.log(event);
        if (event.type === outputType) {
          remuxedSegments.push(event);
          remuxedBytesLength += event.data.byteLength;
          remuxedInitSegment = event.initSegment;
        }
      });
      // 监听转换完成事件，拼接最后结果并传入MediaSource
      transmuxer.on('done', function () {
        var offset = 0;
        var bytes = new Uint8Array(remuxedInitSegment.byteLength + remuxedBytesLength)
        bytes.set(remuxedInitSegment, offset);
        offset += remuxedInitSegment.byteLength;

        for (var j = 0, i = offset; j < remuxedSegments.length; j++) {
          bytes.set(remuxedSegments[j].data, i);
          i += remuxedSegments[j].byteLength;
        }
        remuxedSegments = [];
        remuxedBytesLength = 0;
        // 解析出转换后的mp4相关信息，与最终转换结果无关
        vjsParsed = muxjs.mp4.tools.inspect(bytes);
        console.log('transmuxed', vjsParsed);

        prepareSourceBuffer(combined, outputType, bytes);
      });
      // push方法可能会触发'data'事件，因此要在事件注册完成后调用
      transmuxer.push(segment); // 传入源二进制数据，分割为m2ts包，依次调用上图中的流程
      // flush的调用会直接触发'done'事件，因此要事件注册完成后调用
      transmuxer.flush(); // 将所有数据从缓存区清出来
    }

    function prepareSourceBuffer (combined, outputType, bytes) {
      var buffer;
      video = document.createElement('video');
      video.controls = true;
      // MediaSource Web API: https://developer.mozilla.org/zh-CN/docs/Web/API/MediaSource
      mediaSource = new MediaSource(); 
      video.src = URL.createObjectURL(mediaSource);
    
      $('#video-wrapper').appendChild(video); // 将H5 video元素添加到对应DOM节点下
    
      // 转换后mp4的音频格式 视频格式
      var codecsArray = ["avc1.64001f", "mp4a.40.5"];
    
      mediaSource.addEventListener('sourceopen', function () {
        // MediaSource 实例默认的duration属性为NaN
        mediaSource.duration = 0;
        // 转换为带音频、视频的mp4
        if (combined) {
          buffer = mediaSource.addSourceBuffer('video/mp4;codecs="' + 'avc1.64001f,mp4a.40.5' + '"');
        } else if (outputType === 'video') {
          // 转换为只含视频的mp4
          buffer = mediaSource.addSourceBuffer('video/mp4;codecs="' + codecsArray[0] + '"');
        } else if (outputType === 'audio') {
          // 转换为只含音频的mp4
          buffer = mediaSource.addSourceBuffer('audio/mp4;codecs="' + (codecsArray[1] ||codecsArray[0]) + '"');
        }
    
        buffer.addEventListener('updatestart', logevent);
        buffer.addEventListener('updateend', logevent);
        buffer.addEventListener('error', logevent);
        video.addEventListener('error', logevent);
        // mp4 buffer 准备完毕，传入转换后的数据
        // 将 bytes 放入 MediaSource 创建的sourceBuffer中
        // https://developer.mozilla.org/en-US/docs/Web/API/SourceBuffer/appendBuffer
        buffer.appendBuffer(bytes);
        // 自动播放
        video.play();
      });
    };

</script>
```