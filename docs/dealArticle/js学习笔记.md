---

title: JS系统学习笔记
date: 2020-6-8
tags: [js]
categories: 前端技术  
toc: true 
cover: https://gitee.com/hyj1270433876/blog-img/raw/master/Js相关/e4dde71190ef76c6ac26b6319516fdfaaf516737.jpg
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

# 变量

## 变量类型

**值类型(也称，基本类型):**数值（number），字符串（string），布尔值（boolean）、undefined、null （这5种基本数据类型是按值访问的，因为可以操作保存在变量中的实际的值），ES6新增了一种基本数据类型：symbol

**引用类型:**、数组（Array）、对象（Object）、函数（Function）

**两者的区别:**

1. 值类型：

   (1) 占用空间固定，保存在**栈中**（当一个方法执行时，每个方法都会建立自己的内存栈，在这个方法内定义的变量将会逐个放入这块栈内存里，随着方法的执行结束，这个方法的内存栈也将自然销毁了。因此，所有在方法中定义的变量都是放在栈内存中的；栈中存储的是基础变量以及一些对象的引用变量，`基础变量的值是存储在栈中`，而引用变量存储在栈中的是`指向堆中的数组或者对象的地址`，这就是为何修改引用类型总会影响到其他指向这个地址的引用变量。）

   (2)保存与复制的是值本身

   (3)使用typeof检测数据的类型

2. 引用类型：

   (1) 占用空间不固定，保存在**堆中**（当我们在程序中创建一个对象时，这个对象将被保存到运行时数据区中，以便反复利用（因为对象的创建成本通常较大），这个运行时数据区就是堆内存。堆内存中的对象不会随方法的结束而销毁，即使方法结束后，这个对象还可能被另一个引用变量所引用（方法的参数传递时很常见），则这个对象`依然不会被销毁`，只有当一个对象没有任何引用变量引用它时，系统的**垃圾回收机制**才会在核实的时候回收它。）

​              2、保存与复制的是指向对象的一个指针

​              3、使用instanceof检测数据类型

​              4、使用new()方法构造出的对象是引用型

## 数据类型的判断

值类型的判断

```js
////值类型
var num = 7 // 数值
console.log(typeof num) //number

var str = "hehehe" // 字符串 
console.log(typeof str) //string

var a=true //布尔值
console.log(typeof a)//boolean
```

undefind判断

```js
var a=undefined
console.log(typeof a) //输出 undefined
console.log(a===undefined)
```

null的判断

```js
var b=null
console.log(typeof b)//输出 object ,所以使用typeof是判断不出出来null的
```

```js
var c = null; 
if (!c && typeof(c)!="undefined" && c!=0) { //当c是undefind，0，null时，!c均是真
  console.log("c是null")
}　
```

引用类型的判断

```js
var arr = ["nihao", "wohao", "dajiahao"] // 数组
console.log(typeof arr) //输出 object

var stu = {name:"张三", age:15}  // 对象 
console.log(typeof stu) //输出 object

var func=function(){//函数
    console.log("A")
} 
console.log(typeof func)//输出 function


//可以看出来typeof无法区分数组和对象
var arr=["nihao", "wohao", "dajiahao"]
console.log(arr instanceof Array)//true

var stu = {name:"张三", age:15}  // 对象 
console.log(stu instanceof Array) //false
console.log(stu instanceof Object) //true
```

## undefined

undefined的**不是报错**，但是也要处理。

比如： 提交一个表单时，mobile和userName字段都是选填字段，没填写时，就会是undefined状态，我们要每天写的字段变成null

```js
export function addUser(formObj={}) {//注意，这里要设置默认值，且为对象。假如不设置，如果函数调用没传递formObj，那formObj就是null，null是没有.方法的，这会报错
  return getDataFun({
    url: "xxxxx",
    data: {
      userName:formObj.userName||null
      mobile:formObj.mobile||null
    }
  })
}
```

1. 访问对象中不存在的键
2. 访问数组中不存在的索引

```js
console.log(a) //会报错，不是undefined
```



## 传值与传址

```js
//对于数值，字符串这种值类型来说，a，b虽然一样,但却是分别存储在两个不同内存位置的
let a=1
let b=a
b=2
console.log(a)//输出 1
console.log(b)//输出 2

//
str="abcd"
str2=str
str2="efg"
console.log(str)//输出abcd
console.log(str2)//输出efg 

//对于数组，对象这种引用类型来说，a,b两变量都指向了同一内存地址
let arr=[1,2,3]
let new_arr=arr
new_arr[0]="hi"
console.log(arr)//输出 ["hi", 2, 3]

let a={"name":"张三",age:20}
let b=a
b.name="李四"
console.log(a)//输出 {name: "李四", age: 20}
```

## null与undefined以及NaN

**null**

null用于定义一个空对象,即变量等于null时，就变成了对象，只不过是空的

```js
let stu=null
console.log(stu)  //输出null
console.log(typeof stu) //输出object
```

**undefined和XXX is not defined**

* 对声明但未赋值的变量，变量值和变量类型都是undefined

  ```javascript
  let a
  console.log(a)//输出undefined
  console.log(typeof a) //输出undefined
  ```

* 对未声明的变量，变量值是XXX is not defined，类型都为 undefined

  ```javascript
  console.log(a)//报错a未声明，Uncaught ReferenceError: a is not defined
  console.log(typeof a)//输出undefined
  ```

* 函数参数或无返回值是为undefined

  ```javascript
  function fun(a) {
    console.log(a); 
    return a;
  }
  console.log(fun()); //输出 undefined undefined
  ```

**NaN**

* 出现NaN的情况

  ```javascript
  //把不是数字型的字符串，转化为数字
  console.log(Number("abcd"))//输出NaN
  
  //把不是数字型的字符串与数字运算
  console.log("abcdef"/2)//输出NaN
  
  //数组转化数字为NaN的情形，2种
  let arr=["h"]
  console.log(Number(arr))//输出NaN，"h"不可以转化为数字
  let arr2=[1,2,3]
  console.log(Number(arr2))//输出NaN
  
  //object转化为数字为NaN的情况
  let obj={}
  console.log(Number(obj))//输出NaN 
  ```

* NaN不等于本身

  ```javascript
  console.log(NaN==NaN) //false
  ```

* 如何判断NaN 

  ```javascript
  console.log(Number.isNaN("abcdef"/2)) //true
  console.log(Object.is("abcdef"/2,NaN)) //true
  ```

  



## 类型转换

![image-20210412121122798](https://gitee.com/hyj1270433876/blog-img/raw/master/%E9%9D%A2%E8%AF%95%E7%9B%B8%E5%85%B3/image-20210412121122798.png)

### 变量类型显式转换

* **number,array-->string **

```js
//number-->string
let a=1
console.log(typeof (a+"")) // 输出string
console.log(typeof String(a))// 输出string
cosole.log.(typeod a.toString()) //输出string

//array-->string
let arr=["a", "b", "c", "d", "e", "f"]
console.log(arr.join("")) //abcdef
console.log(arr.join("-")) //a-b-c-d-e-
console.log(arr.toString())//a,b,c,d,e,f
console.log(String(arr)) //a,b,c,d,e,f
```

* **string -->array(数组)**

```js
let str="abcdef"

console.log(str.split(""))//输出["a", "b", "c", "d", "e", "f"]
//
console.log(Array.from(str))//输出["a", "b", "c", "d", "e", "f"]
//
console.log(...str)//输出["a", "b", "c", "d", "e", "f"]
```

* **string,array,object-->number**

```js
let str="99"//若字符串不是数字型，以下两种方式结果是NaN
//方式一：
console.log(str*1+1) //输出100
//方式二：
console.log(Number(str)+1) //输出100
 
let str="99.321ac33"//若字符串开头的一部分是数字型
//方式一：取出整数部分
console.log(parseInt(str)) //输出99
//方式二：取出浮点数部分
console.log(parseFloat(str)) //输出9.321


//注意：不是数字型字符串的转换会报错
let str2="sacsa9"
//方式一：
console.log(str2*1+1) //输出NaN
//方式二：
console.log(Number(str2)+1) //输出NaN


//array，if(arr==true)的结果和arr的值有关系
let arr=[]
console.log(Number(arr))//输出0
let arr2=[2]
console.log(Number(arr2))//输出2，一个元素时，如果该元素可以转化为数字时，就直接转化，否则NaN。比如,console.log(Number(["h"]))结果是NaN
let arr3=[1,2,3]
console.log(Number(arr3))//输出NaN


//object
let obj={}
console.log(Number(obj))//输出NaN 
```

* **number,string,array,object --> 布尔类型**(显式)

```js
//number型

let num=88

//方式一：!8就是把数字变成了布尔值flase
console.log(!!num) //输出true
//方式二
console.log(Boolean(num)) //输出true
```

```js
//string型

let str="abcdefg"

//方式一：
console.log(!!str) //输出true
//方式二
console.log(Boolean(str)) //输出true
```

```js
//array型

let arr=[]

//方式一：
console.log(!!arr) //输出true
//方式二
console.log(Boolean(arr)) //输出true
```

```js
//object型

let obj={}

//方式一：
console.log(!!obj) //输出true
//方式二
console.log(Boolean(obj)) //输出true
```

## 变量提升与TDZ

**1.不加类型**

`var a=1`在全局作用域和块级作用域下，会成为window的一个属性。在函数作用域下，不会成为window的属性（函数执行完，就会销毁变量）

![image-20210412111917502](https://gitee.com/hyj1270433876/blog-img/raw/master/%E9%9D%A2%E8%AF%95%E7%9B%B8%E5%85%B3/image-20210412111917502.png)

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

  ![image-20210412112440566](https://gitee.com/hyj1270433876/blog-img/raw/master/%E9%9D%A2%E8%AF%95%E7%9B%B8%E5%85%B3/image-20210412112440566.png)

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

  ![image-20210412162442406](https://gitee.com/hyj1270433876/blog-img/raw/master/%E9%9D%A2%E8%AF%95%E7%9B%B8%E5%85%B3/image-20210412162442406.png)

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

# 函数

## 函数的声明

* 使用标准函数声明来定义函数

  ```javascript
  function func2(title){
      console.log(title)
  } 
  func2("你好")//输出 你好
  ```

* 声明匿名函数

  ```javascript
  let a=function(title){
      console.log(title)
  } 
  a("你好")//输出 你好
  ```

* 使用默认的构造函数的方式声明,函数是一种特殊的对象

  ```javascript
  let func=new Function("title","console.log(title)")
  func("你好")//输出 你好
  ```

* 把函数当成构造函数

  ```javascript
  function stu(name,age){
  	this.name=name//这里的this指向的是stu对象，不是window对象
      this.age=age
      this.show=function(){
          //函数体
      }   
      //构造函数的返回值是对象，默认有以下这句，this表示user对象
      //return this
  }
  let res=new stu()
  ```

* 对象字面量属性函数

  ```javascript
  let user={
      setUsername:function(name){
          this.name=name
      },
      getUsername:function(){
          return this.name
      }
      //简写：
      //setUsername(name){
      //    this.name=name
      //},
      //getUsername(){
      //    return this.name
      //}
  }
  user.setUsername("张三")
  console.log(user.getUsername())//输出 张三
  ```

## 函数声明存在的问题

因为有这样的问题，所以推荐使用模块化，即将函数写在类中（后面会提到）

* 覆盖window对象中的属性

  * 这种方式定义函数，函数会压入到window对象中，一旦window对象中有同名属性，会把window对象的该属性覆盖掉

    ```javascript
    function func(title){
        console.log(title)
    } 
    func("你好")//输出 你好
    window.func("你好")//输出 你好
    ```

  * 全局作用域下使用var定义的变量，接收的匿名函数会压入window中，而let不会

    ```javascript
    var write1=function(title){
        console.log(title)
    } 
    
    let write2=function(title){
        console.log(title)
    } 
    window.write1("你好")//输出 你好
    window.write2("你好")//报错
    ```

    


## 函数提升

* 使用标准函数声明,会有函数提升现象

  ```javascript
  show()//输出 hi
  
  function show(){
      console.log("hi")
  } 
  ```

* 通过变量引用匿名函数，没有函数提升(与赋值变量是var或let没关系)

  ```javascript
  func()//报错，Uncaught TypeError: func is not a function
  
  var func=function(){
      console.log("hi")
  } 
  ```

* 重点理解

  第一个函数函数提升到最前面，在console.log之前

  ```javascript
  console.log(hd(3)); //4
  
  function hd(num) {
    return ++num;
  }
  
  var hd = function() {
    return "hd";
  };
  ```

  第一个函数函数提升到最前面，console.log之前被第二个函数覆盖了

  ```javascript
  function hd(num) {
    return ++num;
  }
  
  var hd = function() {
    return "hd";
  };
  
  console.log(hd(3)); //hd
  ```
  
  函数提升和变量提升，当函数和变量同名
  
  ```js
  console.log(foo); 
  var foo = 1  //变量提升
  console.log(foo)
  foo()
  function foo(){ //函数提升
     console.log('函数')
  }
  
  
  //等价于
  function foo(){ //提到顶端
     console.log('函数')
  }
  var foo  
  console.log(foo) //输出foo这个函数，因为上面foo没有被赋值，foo还是原来的值 
  foo = 1;  //赋值不会提升,赋值后 foo就不再是函数类型了，而是number类型
  console.log(foo) //输出1
  foo() //这里会报错，因为foo不是函数了
  ```
  
  简略的说
  
  ```js
  //函数提升优先级高，但是var a没有赋值，所以不会覆盖函数
  var a
  function a(){
  
  }
  console.log(a)// 函数a
  
  
  //函数提升优先级高，但是var a赋值为1，所以会覆盖函数
  var a=1
  function a(){
  
  }
  console.log(a)// 1 
  ```
  
  

## 立即执行函数

立即执行函数，(这里放函数)()，其中的函数会立即执行,第二个括号里的如果有参数，会传递到第一个括号里的函数的参数中。

```javascript
(function () {
    var web = 'houdunren';
})();

console.log(web); //web is not defined
```

**立即执行函数与作用域的冲突**

```js
//1.js
function show(){
    console.log("执行1.js中的show函数")
}
function ab(){
    console.log("执行1.js中的ab函数")
}

//2.js
function show(){
    console.log("执行2.js中的show函数")
}
function ab(){
    console.log("执行2.js中的ab函数")
}
```

在html中引用两个外部js文件

```html
<!--两个js文件中都有show()函数-->
<script src="1.js"></script>
<script src="2.js"></script>
<script>
    show()//输出 执行2.js中的show函数
</script>
<!--这里调用只能调用到2.js中的show()函数-->
```

解决方案一:使用模块化，ES6以后有了类的概念，提供了新的解决办法，后面会讲到

解决方案二：这是一种老的解决方案，使用立即执行函数

```js
(function(){
    console.log("执行了")
})()//输出 执行了


//如何调用内部的函数看下面
//将1.js和2.js改造成这样
(function(window){
    function show(){
   		console.log("执行1.js中的show函数")
	}
	function ab(){
    	console.log("执行1.js中的ab函数")
	}
    window.js1={show,ab}
})(window)//这里带参数把，window传递到函数中

//html页面引入外部js后，调用函数
    js1.show()//输出 执行1.js中的show函数	
	js1.ab()//输出 执行1.js中的ab函数

```

方案三：这是一种老的解决方案，使用let作用域

```js
//前面提到的"函数存在的问题----覆盖window对象中的属性"中，写过全局作用域中的var变量会压入window对象中，let不会

//如何调用内部的函数看下面
//将1.js和2.js改造成这样
{
    let show=function(){
        console.log("执行1.js中的show函数")
    }
    let ab=function(){
        console.log("执行1.js中的ab函数")
    }
    window.js1={show,ab}
}

//html页面引入外部js后，调用函数
   js1.show()//输出 执行1.js中的show函数	
   js1.ab()//输出 执行1.js中的ab函数
```



## 函数是引用类型

```js
var show=function(){
    console.log("A")
}
let b=show
b()//输出 A
```

## 函数的参数

### 形参与实参

```js
function mySum(a,b){
 return a+b
}

//当实参个数>形参个数，多余的实参会被略去
console.log(mySum(1,2,3)) //输出 3

//----分隔线----
//值类型，形参改变，实参不变
let a=1
function show(a){
	a=a+100
    console.log(a)
}
show(a)//输出 101
console.log(a)//输出 1

//引用类型，形参改变，实参也改变
let user={name:"张三"}
function show(a){
    a.age=20
    console.log(a)
}
show(user)//输出 {name: "张三", age: 20}
console.log(user)//输出 {name: "张三", age: 20}



```

### 定义默认参数

```js
//定义函数带有默认参数，传入就按传入的值，不传就按默认
function show(a,b=5,c=7){
	console.log(a,b,c)
}

//
show(1)// 输出1,5,7
show(1,2,3)// 输出1,2,3
```

### 不指定形参数个数

* arguments

  ```javascript
  function func(){
      console.log(typeof arguments)//arguments对象。里面包含着传进来的参数
       for(let i=0;i<arguments.length;i++){//arguments对象可以使用下标取值
          console.log(arguments[i])
      }
  }
  func(1,2,3)// 输 1 2 3
  ```

* 展开语法

  ```javascript
  function func2(...args){
      console.log([...args])
  }
  func2()//输出[1,2,3]
  ```

## 展开语法

* 收集不定个数的参数，放入数组中

```js
function show(a,b,...args){//...args只能放在最后，接收剩余变量
	console.log(a,b,...args)//输出 1 2 3 4 5 6
    console.log(args)//输出 [3, 4, 5, 6]，注意这里是把接受的参数放入数组中
}
//相当于
show(1,2,3,4,5,6)// 1给a,2给b，剩余的3，4，5，6被放到...args中 ,args是[3,4,5,6]


```

* 把外层不管是**[]**、**{}**，**“ ”**全部脱掉脱掉！

```js
function show(a,b,...args){
	console.log(a,b,...args)
}

//脱掉[]
let arr=[1,2,3,4]
show(...arr)//展开数组，相当于show(1,2,3,4)

//脱掉[]，合并
let arr1=[1,2]
let arr2=[3,4]
show(..arr1,..arr2)// 展开数组，相当于show(1,2,3,4)

//脱掉[].用于合并成数组
arr=["h","e","r"]
arr2=["q","w","e"]
arr3=[...arr,...arr2]
console.log(arr3)//输出 ["h", "e", "r", "q", "w", "e"]

//脱掉{}.用于合并成对象
var obj1 = {name:'hehe'}
var obj2 = {age:20}
var mergeObj = {...obj1,...obj2}
console.log(mergeObj)//输出{name: "hehe", age: 20}

//脱掉引号
var str="abcd"
console.log(...str) //输出a b c d
```



## 箭头函数

常规写法

```javascript
function 函数名(){
    
}
function(){
    //这是匿名函数
}
```

箭头函数写法

* 如果只有一个参数或者没有，()可以省

* 如果只有一个return时，return和{}可以省

```javascript
(x,y)=>{
    //参数x,y
}
()=>{
    //没有参数
}
x=>{
    //参数x，一个参数，省略括号
}

(x,y)=>x+y  //当返回是一个return时，可以省略，函数体就是x+y

var f=v=>v  //变量名=参数=>返回值（函数体），返回值简单直接写，否则写在{}内
```

## this

**this的指向**

* 全局情况下，this指向window对象

  ```javascript
  console.log(this)//输出 window对象
  
  console.log(window)//输出 window对象
  ```

* 对象中的this

  * 函数是对象的属性值，则this指向类本身
  * 如果只是普通的函数（比如例子中的func和f2函数），this一般指向window

  ```javascript
  let stu={
      stunum:120,
      show:function(){   
          console.log(this.stunum)
          //this指向类stu，this.stunum的值是120，this.show的值是整个show函数。函数是类的属性，this指向类本身
          function func(){
              console.log(this)
              //this指向window对象
          }
          func()
      }
  } 
  stu.show()
  //输出 120   window对象
  ```

  ```javascript
  function f2(){
      console.log(this)
  }
  f2()//输出 window对象
  ```

* 函数对象的构造函数中的this

  * 当作构造函数时，this指向该函数对象
  * 如果只是普通的函数（比如例子中的func函数），this一般指向window

  ```javascript
  function stu(stunum){
      this.stunum=stunum//注意下：这里的this是指向stu对象
      this.show=function(){
          console.log(this.stunum)
          function func(){//这里的this是指向window对象
              console.log(this)
          }
          func()
      }
  }
  let student=new stu("张三")
  student.show()
  //输出 张三 window对象
  ```

* 箭头函数

  箭头函数中的this对象，指向的父级作用域的this的指向

  ```javascript
  let lesson={
      site:"hedaodao",
      lists:["html","css","js"],
      show:function(){      
          return ()=>{
              return this.site
          }
          //箭头函数找那个this，是父作用域中的this指向，即lesson对象
          
      }
  }
  console.log(lesson.show()()) 
  //输出 hedaodao
  ```

注意

```javascript
function User(name){
    console.log(this)
}

User()//输出window对象。全局作用域下的函数中的this

new User()//输出 User {}。把User当作构造函数，构造函数中的this指向User
```

**属性值的函数，该函数的子函数中出现this会指向window对象，而不是对象本身。以下是解决方案**

* 方法一

  ```javascript
  let lesson={
      site:"hedaodao",
      lists:["html","css","js"],
      show:function(){
          var self=this//这里的this是指向lesson对象的，赋值给self，后面子函数里，用self
          return function(){
              return self.site
          }
      }
  }
  console.log(lesson.show()()) //输出 hedaodao
  ```

* 方法二:使用箭头函数

  ```javascript
  let lesson={
      site:"hedaodao",
      lists:["html","css","js"],
      show:function(){      
          return ()=>{
              return this.site
          }
          //箭头函数找那个this，是父作用域中的this指向，即lesson对象
          
      }
  }
  console.log(lesson.show()()) //输出 hedaodao
  ```

## call apply bind替换this

作用：把函数中的this替换成想要传递的内容

构造函数中this，this指向的是本身,是空白的。new新的对象后，传入参数那么，对象内部才有的`name: "张三"`

```javascript
function User(name) {
    this.name=name
}
let res=new User("张三")
console.log(res) //输出 User {name: "张三"}
```

**call**

call的第一个参数：初始User对象，放入到第一个参数对象之中；

call中剩下的参数给了User对象中的参数赋值。

注意：这里this已经指向obj，name的赋值操作,其实把”张三“，放到了obj之中，最后改变了obj的值

```javascript
function User(name){
   this.name=name
}
let obj={age:20}

User.call(obj,"张三")//call和apply都是立即执行User函数，这时候this指向obj

console.log(obj)//输出 {age: 20, name: "张三"}
```

**call与apply区别**

相同点：两个都是立即执行

不同点：传递函数参数时，apply需要把所有的参数放到数组中

```js
let lisi={
    name:"李四"
}

function User(age,score){
    console.log(this.name,age,score)
}
//注意看这里，call和apply立即执行，其中的this已经指向了lishi这个对象
User.call(lisi,18,100) //李四 18 100
User.apply(lisi,[18,100]) //李四 18 100
```

**bind**

bind与call，apply的不同是，bind不能立即执行

```js
function show(age,score){
    console.log(this.name,age,score)
}
//使用call
show.call({name:"张三"},20,99)//输出 张三 20 99
//使用apply
show.apply({name:"张三"},[21,80])//输出 张三 21 80

//----重点开始----

//使用bind，返回值是show函数，所以在后面加()才能组成立即执行函数
console.log(show.bind({name:"张三"},19))
//输出
//ƒ show(age,score){
//    console.log(this.name,age,score)
//}

////可以直接传参数
let res=show.bind({name:"张三"},19,95)
res()//输出 张三 19 95

////可以调用时传参数
let res=show.bind({name:"张三"})
res(19,95)//输出 张三 19 95gh

////假如同时传参，以使用bind是传的参数优先
let res=show.bind({name:"张三"},19,95)
res(20,100)//输出 张三 19 95
let res=show.bind({name:"张三"},19)
res(20,100)//输出 张三 19 20，res调用时的20，自动略去了
```

**应用**

点击按钮时，弹出包含按钮文字的提示框

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>

<button>H</button>
<button>D</button>
    <script>
function show(){ 
    alert(this.innerHTML)
}
let buttons=document.querySelectorAll("button")
for(let i=0;i<buttons.length;i++){
    buttons[i].addEventListener("click",event=>{
        show.call(event.target)//当鼠标点击按钮时，返回event对象，包含这鼠标点击的相关信息，其中event.target就是button的dom对象。点击按钮时，触发show.call,并把其总的this替换为button对象j(否则this就是window对象)，call会立即执行show方法，
    })
}

    </script>
</body>
</html>
```

求数组中的最大值

```js
//js数组中未提供求最大值的方法，我们借用Math.max，参数是一串数字，不能是数组

//方法一
let arr=[1,2,3,4,5,6]
console.log(Math.max(...arr))//输出6

//方法二
console.log(Math.max.apply(Math,arr))//输出6

```



用在不需要立即执行的函数中，把函数中的this替换成传递的内容

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <button>详细信息</button>
    <script>

document.querySelector("button").addEventListener(
    "click",
    function(age,score){
        console.log(this.name,age,score)
    }.call({name:"张三"},20,90)
)
    </script> 
</body>
</html>

//点击按钮，控制台输出 张三 20 90 <button>详细信息</button>

//这里如果用call和apply，不用点击按钮就会触发函数
```

每间隔1秒，网页背景变换颜色

```js
function Color(elem){
    this.elem=elem
    this.colors=["#33FF66","#FF9966","#00CCFF","#FFCC66"]
    this.run=function(){
        setInterval(function(){
            let i=Math.floor(Math.random()*this.colors.length)
            this.elem.style.backgroundColor=this.colors[i]
        }.bind(this),1000)//重点在这里，this.color中的this原本应该是window对象，但是这里通过bind将Color对象传递进去。这里应该看清楚，setInterval中的this指向的是Color对象，setInterval中的function出现原本应该是window对象，这里用bind传递了下，才变成了也是Color对对象
    }
}
let obj=new Color(document.body)
obj.run()
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

# Number类型

## 创建数值

```js
//对象的形式创建
let a=new Number(1)
console.log(a)//输出 object
console.log(typeof a.valueOf())//输出 number

//直接创建
let a=1
console.log(typeof a) //输出 number
```

## NaN

NaN表示无效的数值

```javascript
//非数值类型转换为NaN
let str="abc"
console.log(Number(str))//输出 NaN
console.log(Number.parseInt(str))//输出 NaN
console.log(Number.parseFloat(str))//输出 NaN
```

NaN不能使用 `==` 比较，`if(NaN==NaN)`返回值是false，使用以下代码来判断结果是否正确

```javascript
var res = 2 / 'houdunren';
if (Number.isNaN(res)) {
	console.log('Error');
}
```

## 转换为数值类型

```javascript
console.log(Number('houdunren')); //NaN
console.log(Number(true));	//1
console.log(Number(false));	//0
console.log(Number('9'));	//9
console.log(Number([]));	//0
console.log(Number([5]));	//5
console.log(Number([5, 2]));	//NaN
console.log(Number({}));	//NaN
```

字符串转化为数字的其他函数

**注意：**parseInt和parseFloat，两个函数都是从左到右，忽略掉空格后，遇到数字后，截取数字部分，忽略其后的字母。如果str="ab123"这种使用两个函数就是NaN

```js
let str="12.5"
console.log(Number(str))//输出 12.5
console.log(Number.parseInt(str))//输出 12
console.log(Number.parseFloat(str))//输出 12.5
```

## Number对象的所有属性和方法

| 属性                     | 描述                                                  |
| :----------------------- | :---------------------------------------------------- |
| Number.MAX_VALUE         | 最大值                                                |
| Number.MIN_VALUE         | 最小值                                                |
| Number.NaN               | 非数字                                                |
| Number.NEGATIVE_INFINITY | 负无穷，在溢出时返回                                  |
| Number.POSITIVE_INFINITY | 正无穷，在溢出时返回                                  |
| Number.EPSILON           | 表示 1 和比最接近 1 且大于 1 的最小 Number 之间的差别 |
| Number.MIN_SAFE_INTEGER  | 最小安全整数。                                        |
| Number.MAX_SAFE_INTEGER  | 最大安全整数。                                        |

| 方法                   | 描述                                                         |
| :--------------------- | :----------------------------------------------------------- |
| Number.parseFloat()    | 将字符串转换成浮点数，和全局方法 [parseFloat()](https://www.runoob.com/jsref/jsref-parsefloat.html) 作用一致。 |
| Number.parseInt()      | 将字符串转换成整型数字，和全局方法 [parseInt()](https://www.runoob.com/jsref/jsref-parseint.html) 作用一致。 |
| Number.isFinite()      | 判断传递的参数是否为有限数字。                               |
| Number.isInteger()     | 判断传递的参数是否为整数。                                   |
| Number.isNaN()         | 判断传递的参数是否为 isNaN()。                               |
| Number.isSafeInteger() | 判断传递的参数是否为安全整数。                               |

# String类型

## 创建字符串

```js
//使用对象的方式
let str=new String("abc")

//直接创建
let str="abc"
```

## 运算符：加号可以拼接字符串

```js
var str="hello"
var str2="world"
console.log(str+str2)//helloworld
```

## 字符串的基本函数

* **startsWith** : 以什么开头，返回布尔值

* **endsWith **：以什么结尾，返回布尔值

```js
let str="ascsc"
let result=str.startsWith('a')
let result2=str.endsWith('c')
console.log(result)
console.log(result2)

//输出
//true
//true
```

* **length属性**
* **toUpperCase()**
* **toLowerCase()**

```javascript
let str="AbcDE"
console.log(str.length)//5
console.log(str.toUpperCase())//ABCDE
console.log(str.toLowerCase())//abcde
console.log(str.charAt(0))//输出A
```

* **charAt()**：根据角标获取对应位置的字符

  也可以当成数组取对应角标的值

  注意：不能当成数组对对应位置赋值

```
console.log("hello".charAt(0)) //输出 h

console.log("hello"[0]) //输出 h
```

* **trim()**：删除字符串左右的空白字符

  使用`trimLeft`删除左边空白，使用`trimRight`删除右边空白

```js
let str2="   ab "
console.log(str2.length) //6,注意：空格也算长度
console.log(str2.trim().length) //2
```

* **repeat()**

```js
console.log("*".repeat(4))
//输出 ****
```

## 字符串的截取

不改变原本字符串,返回值是截取后的结果

* **slice( 角标1，角标2)**：返回从角标1到角标2的前一个位置截取的字符
* **substr(角标，截取字符的个数 )**
* **substring( 角标1，角标2)**：2个参数与第一个一样，但是参数不能出现负值

```javascript
let str="abcdef"
console.log(str.slice(1))//输出 bcdef，从角标为1的位置向后截取
console.log(str.slice(-3))//输出def，从倒数第三个位置截取到最后
console.log(str.slice(1,3))//输出bc，从角标1的位置截取到角标3的前一个位置
console.log(str.slice(1,-3))//输出bc，从标号1的位置截取到倒数第3的前一个位置（不是角标3，而是第3个位置）

```

```javascript
let str="abcdef"
console.log(str.substr(1))//输出 bcdef
console.log(str.substr(-3))//输出def，从倒数第三个位置截取到最后
console.log(str.substr(1,3))//输出bcd,从角标为1的位置，向后截取3个
console.log(str.substr(1,-3))//无输出,从标号1的位置，向后截取-3个，这里截取个数不能为负，所以是向后截取0个
```

```js
let str="abcdef"
console.log(str.substring(1)) //输出 bcdef
console.log(str.substring(-3))//输出abcdef，substring不支持负数参数，复数直接当0处理
console.log(str.substring(1,3))//输出bc，从标号1的位置截取到标号3的前一个位置
console.log(str.substring(-3,-1))//无输出，substring填负数没有意义，相当于0
```

## 字符串的检索

* **indexOf** : 从左向右查找 ， 找得到返回下标 ， 找不到返回 -1
* **lastIndexOf** : 从右向左查找 ， 找得到返回下标 ， 找不到返回 -1

```js
let str="abacdef"
//indexOf
console.log(str.indexOf("a"))//输出0，从左第一个字符，向右查找到第一个a的标号
console.log(str.indexOf("a",1))//输2，从标号为1的位置，向右查找到第一个a的标号
console.log(str.indexOf("#"))//输出-1，表示查找不到

//lastIndexOf
console.log(str.lastIndexOf("a"))//输出2，从右边第一个字符，向左查找到第一个a的标号
console.log(str.lastIndexOf("a",1))//输0，从标号为1的位置，向左查找到第一个a的标号
console.log(str.lastIndexOf("#"))//输出-1，表示查找不到
```

* **includes** : 找到返回true ,找不到返回false

```js
let str="abacdef"

console.log(str.includes("a")) //输出true
console.log(str.includes("a",3)) //输出false,表示从标号3的位置向后查找
console.log(str.includes("#"))//输出false,找不到#返回false
```

## 字符串的替换

不改变原字符串，返回值是改变后的字符串

* replace：替换,在字符串中把 子串替换成 其他子串

```js
let  str="我喜欢js和css"
console.log(str.replace("js","哈哈"))//输出： 我喜欢哈哈和css

console.log(str)//输出 我喜欢js和css 
```

* 替换后的内容，可以通过函数生成

```js
let res="abcds".replace("abc",item=>{
    return "###"
})
console.log(res) //输出 ###ds
```

* 替换指定关键字（**reduce**的例子）

```js
//把str含有wordList中字符串的内容，替换成的带超链接的形式
let wordlist=["js","css"]
let str="我喜欢js和css"

let str2=wordlist.reduce((backvalue,word)=>{
    return backvalue.replace(word,`<a href="#">${word}</a>`)
},str)
console.log(str2)
//输出：我喜欢<a href="#">js</a>和<a href="#">css</a>
```



## 字符串模板（用`反引号引起来）

* 可以直接把**变量**或**表达式**放入`${ }`中，不必拼接字符串

* 可以折行，不必写在一行上，但是字符串显示也相应换行

  ```js
  let title="标题"
  let content="内容"
  
  //过去的写法，拼接字符串，麻烦，而且不能折行写
  let str="这里是"+title+",那里是"+content
  //字符串模板
  let str2=`这里是${title},那里
  是${content}`
  
  console.log(str)
  console.log(str2)
  
  //输出
  //这里是标题,那里是内容
  //这里是标题,那里
  //是内容
  document.write(str2)//网页上输出：这里是标题,那里 是内容 
  //字符串即使有多个连续的空格，在网页中也只是有1个空格,网页想要有多个空格用多个&nbsp;
  ```

* `${}`甚至可以放函数

```js
//${}中可以放表达式
var a=`www.${3+1}`
console.log(a)//www.4
```

## 标签模板

```js
var  name="hedaodao"
var age=20
tag`你好我是${name},年龄${age}。`//字符串前，加一个标记，可以是tag也可以是其他什么名字
function tag(string,name,age){//函数名是标记名，第一个参数string，接收除变量的部分
    console.log(string)
    console.log(name,age)
    

}
//输出
//["你好我是", ",年龄", "。", raw: Array(3)]
//hedaodao 20

//注意:函数的第一个参数string，接收除变量的部分，如果字符串是 tag`${name}` ,返回的是["",""],即使变量前后没有字也会返回
```

## String对象的所有属性和方法

| 属性                                                         | 描述                       |
| :----------------------------------------------------------- | :------------------------- |
| [constructor](https://www.runoob.com/jsref/jsref-constructor-string.html) | 对创建该对象的函数的引用   |
| [length](https://www.runoob.com/jsref/jsref-length-string.html) | 字符串的长度               |
| [prototype](https://www.runoob.com/jsref/jsref-prototype-string.html) | 允许您向对象添加属性和方法 |

| 方法                                                         | 描述                                                         |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| [charAt()](https://www.runoob.com/jsref/jsref-charat.html)   | 返回在指定位置的字符。                                       |
| [charCodeAt()](https://www.runoob.com/jsref/jsref-charcodeat.html) | 返回在指定的位置的字符的 Unicode 编码。                      |
| [concat()](https://www.runoob.com/jsref/jsref-concat-string.html) | 连接两个或更多字符串，并返回新的字符串。                     |
| [fromCharCode()](https://www.runoob.com/jsref/jsref-fromcharcode.html) | 将 Unicode 编码转为字符。                                    |
| [indexOf()](https://www.runoob.com/jsref/jsref-indexof.html) | 返回某个指定的字符串值在字符串中首次出现的位置。             |
| [includes()](https://www.runoob.com/jsref/jsref-string-includes.html) | 查找字符串中是否包含指定的子字符串。                         |
| [lastIndexOf()](https://www.runoob.com/jsref/jsref-lastindexof.html) | 从后向前搜索字符串，并从起始位置（0）开始计算返回字符串最后出现的位置。 |
| [match()](https://www.runoob.com/jsref/jsref-match.html)     | 查找找到一个或多个正则表达式的匹配。                         |
| [repeat()](https://www.runoob.com/jsref/jsref-repeat.html)   | 复制字符串指定次数，并将它们连接在一起返回。                 |
| [replace()](https://www.runoob.com/jsref/jsref-replace.html) | 在字符串中查找匹配的子串， 并替换与正则表达式匹配的子串。    |
| [search()](https://www.runoob.com/jsref/jsref-search.html)   | 查找与正则表达式相匹配的值。                                 |
| [slice()](https://www.runoob.com/jsref/jsref-slice-string.html) | 提取字符串的片断，并在新的字符串中返回被提取的部分。         |
| [split()](https://www.runoob.com/jsref/jsref-split.html)     | 把字符串分割为字符串数组。                                   |
| [startsWith()](https://www.runoob.com/jsref/jsref-startswith.html) | 查看字符串是否以指定的子字符串开头。                         |
| [substr()](https://www.runoob.com/jsref/jsref-substr.html)   | 从起始索引号提取字符串中指定数目的字符。                     |
| [substring()](https://www.runoob.com/jsref/jsref-substring.html) | 提取字符串中两个指定的索引号之间的字符。                     |
| [toLowerCase()](https://www.runoob.com/jsref/jsref-tolowercase.html) | 把字符串转换为小写。                                         |
| [toUpperCase()](https://www.runoob.com/jsref/jsref-touppercase.html) | 把字符串转换为大写。                                         |
| [trim()](https://www.runoob.com/jsref/jsref-trim.html)       | 去除字符串两边的空白                                         |
| [toLocaleLowerCase()](https://www.runoob.com/jsref/jsref-tolocalelowercase.html) | 根据本地主机的语言环境把字符串转换为小写。                   |
| [toLocaleUpperCase()](https://www.runoob.com/jsref/jsref-tolocaleuppercase.html) | 根据本地主机的语言环境把字符串转换为大写。                   |
| [valueOf()](https://www.runoob.com/jsref/jsref-valueof-string.html) | 返回某个字符串对象的原始值。                                 |
| [toString()](https://www.runoob.com/jsref/jsref-tostring.html) | 返回一个字符串。                                             |

# Boolean类型

## 声明定义

使用对象形式创建

```javascript
console.log(new Boolean(true)); //true
console.log(new Boolean(false)); //false
```

只用字面量创建

```javascript
let hd =true;
```

## 隐式转换

* 基本上所有类型都可以隐式转换为 Boolean类型。【可以使用Boolean(类型)强制转换】

  **比如**：

  1. if( 其他类型)，就会把其他类型转换为布尔值。
  2. 三元表达式`a?'真':'假'`，a也会隐式转化为布尔值
  3. 使用||和&&时，`var a=c||b`(c为真则a=c，c为假则a=b)和`var a=c&&b`（c为真则a=b，c为假则a=c）
  4. `!a`是将变量a转化为相反的布尔值，`!!a`则是将a转化为布尔值

  **其他类型转化为布尔值的转换规则**:

  | 数据类型  | true                       | false        |
  | --------- | -------------------------- | ------------ |
  | String    | 非空字符串                 | ""(空字符串) |
  | Number    | 非0的数值                  | 0 、NaN      |
  | Array     | 所有数组（空数组要是true） |              |
  | Object    | 所有对象                   |              |
  | undefined | 无                         | undefined    |
  | null      | 无                         | null         |
  | NaN       | 无                         | NaN          |

  **总结**：0，NaN，""，null，undefined，false（6个）均是false。其他均是true，尤其注意[]和{}都是true

  ```javascript
  if([]) console.log("true")
  else console.log("false")
  //输出 ture
  
  if({}) console.log("true")
  else console.log("false")
  //输出 ture
  ```

* 当其他类型与boolean类型比较时，会将两边类型统一为数字0或1。【可以使用Number(类型)强制转换】

  **比如：**

  1. if( a==false)，a会隐式转化为数字1,false会转化为0
  2. 三元表达式`a==true?'真':'假'`，a会隐式转化为数字，true会转化为1
  
  
  
  如果使用Boolean与数值比较时，会进行隐式类型转换 true转为1，false 转为0。
  
  **其他类型转化为数字的转换规则**:
  
  | 类型    | 0              | 1    | 其他数字                              | NaN                    |
  | ------- | -------------- | ---- | ------------------------------------- | ---------------------- |
  | String  | ""（空字符串） | "1"  | "2","4"等纯数字字符串                 | 其他混合着字母的字符串 |
  | boolean | false          | true |                                       |                        |
  | Array   | [ ]（空数组）  | [1]  | [3]等只有一个元素，且元素为数字的数组 | [1，2，3]              |
  | Object  |                |      |                                       | 所有对象，包括{}       |
  
  

  **布尔值转化为数字**
  
  ```javascript
  //注意：这是和布尔值的比较，需要两边都转化为数字
  console.log(3 == true); //false
  console.log(0 == false); //true
  ```

  **String转化为数字**
  
  ```javascript
  console.log(Number("")) // 0
  console.log(Number("hello")); //NaN
  ```
  
  ```javascript
  //"hello"转化为NaN，true转化为1，所以比较是错的
  console.log("hello" == true); //false
  console.log("1" == true); //true
  ```
  
  **数组类型转化为数字**
  
  ```javascript
  console.log(Number([])); //0
  console.log(Number([3])); //3
  console.log(Number([1, 2, 3])); //NaN
  ```
  
  ```javascript
  console.log([] == false); //true
  console.log([1] == true); //true
  console.log([1, 2, 3] == true); //false
  ```
  
  **对象类型转化为数字**
  
  ```javascript
  console.log(Number({})) //NaN
  console.log(Number({name:"张三"}))  //NaN
  ```

## 显示转换

使用 `!!` 转换布尔类型，注意: 0 ，NaN，' '，null，undefined，false（6个）均是false

```javascript
let hd = '';
console.log(!!hd); //false
hd = 0;
console.log(!!hd); //false
hd = null;
console.log(!!hd); //false
hd = new Date("2020-2-22 10:33");
console.log(!!hd); //true
```

使用 `Boolean` 函数可以显式转换为布尔类型

```javascript
let hd = '';
console.log(Boolean(hd)); //false
hd = 0;
console.log(Boolean(hd)); //false
hd = null;
console.log(Boolean(hd)); //false
hd = new Date("2020-2-22 10:33");
console.log(Boolean(hd)); //true
```

# 数组类型

## 声明数组

```js
//方式一：对象的方式
const arr=new Array("A","B","C")
console.log(arr)//输出 ["A", "B", "C"]

//方式二：(常用)
let arr=["A","B","C"]
console.log(arr)//输出 ["A", "B", "C"]
```

多维数组(不常用)

```js
let arr=["A",["B1","B2"],"C"]
console.log(arr[1][0]) //输出 B1
```

**注意：**

```js
let arr=["a"]
arr[3]="b"
console.log(arr)//输出 ["a", empty × 2, "b"]
//所以为了防止出现undefined，我们通常使用push,直接添加到队尾
//注意：empty的位置是个占位符，是包含在长度length之内的，但是for in循环时，是无法遍历的（直接跳过去）。for of和for(let i=0;i<arr.length;i++){ console.log(arr[i])}时可以遍历到，是undefined
delete arr[1]//输出 [ empty × 3, "b"],delete删除可以出现empty

//----分隔线----
let arr=new Array(6)
let arr2=Array.of(6)
console.log(arr)//创建一个长度为6的空数组
console.log(arr2)//输出 [6]，即一个长度为一的数组，数组内容为6
```

## 判断数组类型

```js
console.log(Array.isArray([]))//输出true

console.log([] instanceof Array)//输出true
```

## 解构赋值

解构是一种更简洁的赋值特性，可以理解为分解一个数据的结构

- 建设使用 `var/let/const` 声明

### 基本使用

下面是基本使用语法

```text
//数组使用
let [name, url] = ['后盾人', 'houdunren.com'];
console.log(name);
```

解构赋值数组

```text
function hd() {
	return ['houdunren', 'hdcms'];
}
let [a, b] = hd();
console.log(a); //houdunren
```

剩余解构指用一个变量来接收剩余参数

```text
let [a, ...b] = ['后盾人', 'houdunren', 'hdcms'];
console.log(b);
```

如果变量已经初始化过，就要使用`()` 定义赋值表达式，严格模式会报错所以不建议使用。

```text
let web = "后盾人";
[web, url] = ["hdcms.com", "houdunren.com"];
console.log(web);
```

字符串解构

```text
"use strict";
const [...a] = "houdunren.com";
console.log(a); //Array(13)
```

### 严格模式

非严格模式可以不使用声明指令，严格模式下必须使用声明。所以建议使用 let 等声明。

```text
"use strict";

[web, url] = ["hdcms.com", "houdunren.com"];
console.log(web);
```

### 简洁定义

只赋值部分变量

```text
let [,url]=['后盾人','houdunren.com'];
console.log(url);//houdunren.com
```

使用展开语法获取多个值

```text
let [name, ...arr] = ['后盾人', 'hdcms', 'houdunren.com'];
console.log(name, arr); //后盾人 (2) ["hdcms", "houdunren.com"]
```

### 默认值

为变量设置默认值

```text
let [name, site = 'hdcms'] = ['后盾人'];
console.log(site); //hdcms
```

### 函数参数

数组参数的使用

```text
function hd([a, b]) {
	console.log(a, b);
}
hd(['后盾人', 'hdcms']);
```

## 数组的拆分与合并

**均未改变数组或字符串**

```js
//拆分
let str="abcdef"
//方法一，原字符串未改变
console.log(Array.from(str))//输出["a", "b", "c", "d", "e", "f"]
//方法二，原字符串未改变
console.log([...str])//输出["a", "b", "c", "d", "e", "f"]
//方法三，原字符串未改变
console.log(str.split(""))//输出["a", "b", "c", "d", "e", "f"]


//合并
let arr=["a","b","c"]
//方法一，原数组未改变
console.log(arr.join("-"))  //输出a-b-c

let arr2=["e","f","g"]
//方法二，原数组未改变
console.log(arr.concat(arr2))
//方法三，原数组未改变
console.log([..arr,...arr2])
```

## 数组入队出队

**显然均改变原数组**

* push
* pop
* unshift
* shift

```js
let arr=["A","B","C"]

////队尾操作
console.log(arr.push("L"))//输出 4，队尾入队，push后的返回值是追加后的长度。
console.log(arr)//输出 ["A", "B", "C", "L"]

console.log(arr.pop())//输出L ,队尾出队，返回值是出队元素
console.log(arr)//输出["A", "B", "C"]

////队头操作
console.log(arr.unshift("X")) //输出4，队头入队，返回值是unshift后的长度
console.log(arr) //输出["X", "A", "B", "C"]

console.log(arr.shift())//输出X,队首出队，返回值是出队元素
console.log(arr)//输出["A", "B", "C"]
```

## 数组截取，替换

* **slice**截取，不改变原数组
* **splice（索引，个数）**删除后替换，改变数组
* **copyWithin**

slice，字符串的slice方法类似，**不改变原数组**，返回值是截取的部分

```js
//仅截取
let arr=["A","B","C","D"]
console.log(arr.slice())//输出["A", "B", "C", "D"]，无参数截取所有
console.log(arr.slice(1))//输出["B", "C", "D"]，截取标号1到最后
console.log(arr.slice(1,3))//输出["B", "C"]，截取角标1到角标3的前一个位置
```

splice，**改变原数组**，返回值是截取的部分，数组被改变，是截取后剩下的部分

```js
let arr=["A","B","C","D"]
//截取
console.log(arr.splice(0,2))//输出["A", "B"]，从标号0，向后截取2个。返回值是截掉的部分，是数组类型
console.log(arr)//输出["C", "D"] ，arr是截取完后剩余的

//替换
console.log(arr.splice(0,2,"张三","李四"))//输出["A", "B"]，返回截取的部分，是数组类型
console.log(arr)//输出 ["张三", "李四", "C", "D"],把截取的分会替换成剩下的参数

//删除
let arr2=["A","B","C","D"]
arr2.splice(1,1)//从标号为1的位置，截取1个元素
console.log(arr2)//输出 ["A", "C", "D"]

//增加
let arr3=["A","B","C","D"]
arr3.splice(1,0,"张三")//从标号为1的位置，截取0个元素，即不截取,在标号为1的位置添加张三
console.log(arr3)//输出 ["A", "张三", "B", "C", "D"]
```

copyWithin,**改变原数组** ，函数返回值也是修改后的数组

```js
let arr=["a","b","c","d","e"]
console.log(arr.copyWithin(2,1,3))//输出["a", "b", "b", "c", "e"]
console.log(arr)//输出["a", "b", "b", "c", "e"]
//第一个参数是放置复制的字符串的位置的标号是2
//第二，三参数是 从标号1到标号3之前的位置，复制下来
```

## 数组查找

**与字符串的方法相同**

* indexOf()
* lastIndexOf()
* includes()

```js
let arr=["a","d","a","d"]
console.log(arr.indexOf("a")) //输出0，从左->右查找，找到第一次出现位置的标号，找不到返回-1
console.log(arr.indexOf("a",2)) //第二个参数从角标为2的位置，向右查找

console.log(arr.lastIndexOf("a"))//输出2，从右->左查找，找到第一次出现位置的标号，找不到返回-1
console.log(arr.lastIndexOf("a",-2))//输出2，从倒数第2个数向左查找
console.log(arr.lastIndexOf("a",-3))//输出0，从倒数第3个数向左查找

//includes("a")是找数组中是否有某个数组元素是a,而不是找是否某个数组元素包含a
console.log(arr.includes("a"))//输出true
console.log(arr.includes("a",3))//输出false，从标号为3的位置向右查找
```

* find()  返回查找值所在的item，找不到返回undefined
* findIndex()  返回查找到值的索引标号，找不到返回-1

```js
//自定义查找，会循环把数组中的值放到item中，一旦return为true时，就结束循环，返回查找到的值
let arr=["a","d","a","d"]
let res=arr.find((item)=>{
    return item=="d"
})
console.log(res)
//输出 d


////自定义查找，会循环把数组中的值放到item中，一旦return为true时，就结束循环，返回查找到的值的索引标号
let arr=["a","d","a","d"]
let res2=arr.findIndex((item)=>{
    return item=="d"
})
console.log(res2)
//输出1
```

自己实现类似find的查找函数

```js
function findValue(array,callback){
    for(const value of array){
        if(callback(value)) return value
    }
    return undefined
}
let arr=["a","d","a","d"]
let res=findValue(arr,(item)=>{
    return item=="d"
})

console.log(res) //输出d
```

## 清空数组

```js
let arr=["A","B","C"]

////
arr=[]
//清空原理，在内存中开辟一个新的空间，放一个空数组，把arr指向它。原来的数组并未清空

let new=arr
arr=[]
console,log(new)// ["A", "B", "C"]

////
arr.length=0
////
arr.splice(0,arr.length)
////
while(arr.pop())
```

## 数组排序

sort会改变原素组

```
let arr=[1,2,3,4]
arr.sort(function(a,b){
	//a-b 从小到大 ； b-a 从大到小
	return b-a
})
console.log(arr) //输出[4,3, 2, 1]
```

**例子:**商品价格排序

```js
let cart=[
	{name:"ipad",price:5000},
	{name:"imac",price:20000},
	{name:"iphone",price:8000},
	{name:"makbook",price:10000},
]
cart.sort(function(a,b){
	return a.price-b.price
})
console.log(cart) //输出对象按从小到大排列
```

**sort原理**

```js
//sort是冒泡排序

function Mysort(array,callback){
    for(const n in array){
        for(const m in array){
            if(callback(array[n],array[m])<0){//callback的返回值是小于0时，交换位置
                const temp=array[n]
                array[n]=array[m]
                array[m]=temp
            }
        }
    }
}
let arr=[1,2,3,4]
Mysort(arr,function(a,b){
    return a-b
})
console.log(arr)// 输出[1, 2, 3, 4]
```

## 数组遍历

### for

```js
let arr=["a","b","c"]
for(let i=0;i<arr.length;i++){
	console,log(arr[i])
}
//输出 a b c
```

### for key in

遍历key

```js
arr=["n","m","d"]
for(key in arr){//i是key
	console.log(key)
}
//输出0 1 2 
```

### for value of

遍历value

不同类型的变量有区别。

**原理：**arr中每一项会依次赋值给value，程序仅改变value。当arr元素为值类型value改变，arr元素不变。当arr元素是引用类型时，value和arr元素指向的是相同的内存地址

```js
//值类型不可改变
let arr=[1,2,3,4,5]
for(let value of arr){
	value=value+10
}
console.log(arr) //输出 1 2 3 4 5

//
let arr=["a","b","c"]
for(let value of arr){
    value=value+"k"
}
console.log(arr) //输出 ["a", "b", "c"]

//引用类型会改变
let arr=[{name:"张三",age:20},{name:"李四",age:21}]
for(let value of arr){
	value.age=value.age+10
}
console.log(arr) 
//输出 [{name: "张三", age: 30},{name: "李四", age: 31}]

```

### forEach(function)

```js
let arr=["a","b","c","d"]
arr.forEach(function(item,index,arr){
    //第一个参数：每一项数组元素
    //第二个参数：索引
    //arr数组
    console.log(item,index)
 //输出
 //a 0
 //b 1
 //c 2
 //d 3
})
```

### 迭代器Iterator

* values( ) 
* keys( )
* entries( )

```js
let arr=["a","b","c"]

//values方法，当next没有值了，done才变成true
let values=arr.values()
console.log(values.next())//输出{value: "a", done: false}
console.log(values.next())//输出{value: "b", done: false}
console.log(values.next())//输出{value: "c", done: false}
console.log(values.next())//输出{value: undefined, done: true}


//keys方法，当next没有值了，done才变成true
let keys=arr.keys()
console.log(keys.next())//输出{value: 0, done: false}
console.log(keys.next())//输出{value: 1, done: false}
console.log(keys.next())//输出{value: 2, done: false}
console.log(keys.next())//输出{value: undefined, done: true}

//entries方法
let valueAndKey=arr.entries()
console.log(valueAndKey.next())//输出{value: Array(2), done: false}，Array(2)中包含value:[0, "a"]和__proto__: Object，其中value是值和索引
```

使用迭**for  of**遍历

```js
//使用values()循环，{value,done}=values.next()是解构赋值
let arr2=["a","b","c"]
let values=arr2.values()
while(({value,done}=values.next())&&done===false){
 console.log(value)
}
//输出a b c

////遍历keys()
for(const value of arr2.values()){
    console.log(value)
}//输出 a b c

////遍历values()
for(const key of arr2.keys()){
    console.log(key)
}//输出 0 1 2

////遍历entries()
for(const [key,value] of arr2.entries()){
    //解构赋值
    console.log(key,value)
}//输出 
//0 "a"   
//1 "b"    
//2 "c
```

## 遇到的小问题

```js
//错误的方法
var arr = [];
var obj = {};
for (var i = 0; i < 10; i++) {
    obj.id = i;
    arr.push(obj);
}
console.log(arr); // arr[{id:9},{id:9}...{id:9}]
////原因：obj是引用类型，arr中存的是obj的地址，当最后一次循环完时。obj是了{id:9}。arr中存的都是相同的地址所以就都是{id:9}


//正确的方法
var arr = [];
for (var i = 0; i < 10; i++) {
    let obj = {};//每次创建一个新的对象
    obj.id = i;
    arr.push(obj);
}
console.log(arr); // // arr[{id:0},{id:1}...{id:9}]
```



##  补充

**注意：参数都是函数，均不改变原数组**

### every

检测数值元素的每个元素是否都符合条件。全部都符合返回true，有一个不符合条件就返回false,结束函数

```js
let arr=["a","b","c"]
arr.every(function(value,index,arr){
	//value是数组元素
    //index是索引
    //arr是原数组
    //函数必须返回布尔值，true，才能继续，否则停止
    console.log(value)
    return true
})
//输出a b c
```

**应用***

```js
//判断是否有人未及格
let arr=[
    {name:"张三",score:80},
    {name:"李四",score:50},
    {name:"王五",score:70},
    {name:"赵六",score:90},
]
let  res=arr.every(function(item){
	return item.score>=60
})
console.log(res?"全部及格":"有人未及格")
//输出 有人未及格
```

### some

检测数组元素中是否有元素符合指定条件。如果return true，结束函数，整体返回true；如果整个数组遍历完都没有return true，整体返回false

```js
let arr=["a","b","c"]
let res=arr.some(function(value,index,arr){
	//value是数组元素
    //index是索引
    //arr是原数组
    //函数必须返回布尔值，true就结束
    if(value==="a"){
      return true
		}
})
console.log(res) //true
```

应用例子

```js

let wordlist=["html","js","css"]
let  str="我喜欢jsa和cssa"
wordlist.some(word=>{//word是数组中的每一项，只有return为true时，这里的代码才会执行
    console.log(word)
	return str.includes(word)
})

//输出html js, 解释下："html"不在str中，some返回false，所以继续执行下去，"js"在str中,返回true，函数结束
```

### filter

检测数值元素，函数返回，内部返回为true的所有元素组成的数组。

```js
let arr=["a","b","c"]
arr.filter(function(value,index,arr){
	//value是数组元素
    //index是索引
    //arr是原数组
    //把所有元素都遍历一遍，函数返回所有return为true的数组元素
     if(value=="b") return true
})
console.log(res)//输出["b"]
```

应用例子

```js
//能被3整除的
let arr=[12,5,6,3,9,7]
let result=arr.filter(item=>{
	if(item%3==0)
		return true//是true则返回
	else
		return false//false则不返回
})
console.log(result)

//输出
[12, 6, 3, 9]
```

简化写法

```js
//简单写法,
let arr=[12,5,6,3,9,7]
let result=arr.filter(item=>{
	return item%3==0//这个表达式本来就是布尔值，可以直接return	
})
console.log(result)
```

又一个例子

```js
//
let arr=[
    {name:"帽子",price:50},
    {name:"外套",price:150},
    {name:"鞋子",price:500},
    {name:"袜子",price:2},
    
]
let result=arr.filter(item=>{
    return item.price>100
})
console.log(result)

//输出
[{name: "外套", price: 150},
 {name: "鞋子", price: 500}]
```

filter实现原理

```js
function Myfilter(array,callback){
    let newArray=[]
    for(const value of array){
        if(callback(value)===true){
            newArray.push(value)
        }
    }
    return newArray

}

let arr=[60,50,70,80,100]
let res=Myfilter(arr,function(item){
    return item>=60
})
console.log(res) //输出[60, 70, 80, 100]
```

### map

通过指定函数处理数组的每个元素，并返回处理后的数组。

```js
//成绩：[45,57,70,20]
//映射成：['不及格'，'不及格'，'及格'，'不及格']

let arr=[45,57,70,20]
let result=arr.map(function(item){//item代表数组中的每个值
	if(item>=60)
		return "及格"
	else
		return "不及格"
})
//arr本身未改变，result还是改变后的数组

console.log(result)//["不及格", "不及格", "及格", "不及格"]
console.log(arr)//[45, 57, 70, 20]
```

简化

```js
//使用箭头函数
let result=arr.map(item=>item>=60?"及格":"不及格")
```

### reduce

将数组元素计算为一个值（从左到右）。**注意：**reduce的返回值是最终的pre的值

* reduce只有第一个参数（第一个参数是函数）时，第一轮循环pre为数组第一个元素，value为第二个元素 

  ```javascript
  let arr=[1,2,3,4]
  arr.reduce(function(pre,value,index,array){
      //pre是上一次循环return的值
      //value本轮循环的数组的元素
      //index本轮循环数组元素的索引
      //array调用方法的原数组
     console.log(pre,value)
  })
  //输出
  //1 2
  //undefined 3
  //undefined 4
  
  let arr=[1,2,3,4]
  arr.reduce(function(pre,value,index,array){
     console.log(pre,value)
     return 99
  },0)//reduce的第二个参数，是给第一给参数中的pre赋值
  //输出
  //0 1
  //99 2
  //99 3
  //99 4
  ```

* reduce有第2个参数时，第二个参数是指定pre的初始值，cur从数组的第一个元素开始

  ```javascript
  //统计item在array数组中出现了几次
  function arrayCount(array,item){
      return array.reduce(function(pre,cur){
          if(cur==item)
              pre=pre+1
          return pre
      },0)
  }
  let arr=[1,2,1,3,4,1]
  console.log(arrayCount(arr,1))//输出3，返回了pre最终的值
  ```

应用例子

```js
//找最大值
let arr=[6,2,9,4]
let res=arr.reduce(function(pre,cur){
   return cur>pre?cur:pre
})
console.log(res)
```

```js
//求总和
let arr=[1,5,3,8,6]
let res=arr.reduce(function(pre,cur){
	return pre= pre+cur  
})
console.log(res)
//输出23
```

```js
//去重,封装函数
function MyFilterRepeat(array){
    let newArray=[]
    array.reduce(function(pre,cur){
        if(newArray.includes(cur)==false){
            newArray.push(cur)
        }
    },[])//这里注意，当有第二个参数时，cur从数组第一个元素开始。我们这里随意写了一个[],函数中不会用到这个值
    return newArray
}
let arr=[1,5,3,1,8,6,3,5]
console.log(MyFilterRepeat(arr))
```

## Array对象的所有方法

内容来自菜鸟教程

| 属性                                                         | 描述                             |
| :----------------------------------------------------------- | :------------------------------- |
| [constructor](https://www.runoob.com/jsref/jsref-constructor-array.html) | 返回创建数组对象的原型函数。     |
| [length](https://www.runoob.com/jsref/jsref-length-array.html) | 设置或返回数组元素的个数。       |
| [prototype](https://www.runoob.com/jsref/jsref-prototype-array.html) | 允许你向数组对象添加属性或方法。 |

| 方法                                                         | 描述                                                 |
| :----------------------------------------------------------- | :--------------------------------------------------- |
| [concat()](https://www.runoob.com/jsref/jsref-concat-array.html) | 连接两个或更多的数组，并返回结果。                   |
| [copyWithin()](https://www.runoob.com/jsref/jsref-copywithin.html) | 从数组的指定位置拷贝元素到数组的另一个指定位置中。   |
| [entries()](https://www.runoob.com/jsref/jsref-entries.html) | 返回数组的可迭代对象。                               |
| [every()](https://www.runoob.com/jsref/jsref-every.html)     | 检测数值元素的每个元素是否都符合条件。               |
| [fill()](https://www.runoob.com/jsref/jsref-fill.html)       | 使用一个固定值来填充数组。                           |
| [filter()](https://www.runoob.com/jsref/jsref-filter.html)   | 检测数值元素，并返回符合条件所有元素的数组。         |
| [find()](https://www.runoob.com/jsref/jsref-find.html)       | 返回符合传入测试（函数）条件的数组元素。             |
| [findIndex()](https://www.runoob.com/jsref/jsref-findindex.html) | 返回符合传入测试（函数）条件的数组元素索引。         |
| [forEach()](https://www.runoob.com/jsref/jsref-foreach.html) | 数组每个元素都执行一次回调函数。                     |
| [from()](https://www.runoob.com/jsref/jsref-from.html)       | 通过给定的对象中创建一个数组。                       |
| [includes()](https://www.runoob.com/jsref/jsref-includes.html) | 判断一个数组是否包含一个指定的值。                   |
| [indexOf()](https://www.runoob.com/jsref/jsref-indexof-array.html) | 搜索数组中的元素，并返回它所在的位置。               |
| [isArray()](https://www.runoob.com/jsref/jsref-isarray.html) | 判断对象是否为数组。                                 |
| [join()](https://www.runoob.com/jsref/jsref-join.html)       | 把数组的所有元素放入一个字符串。                     |
| [keys()](https://www.runoob.com/jsref/jsref-keys.html)       | 返回数组的可迭代对象，包含原始数组的键(key)。        |
| [lastIndexOf()](https://www.runoob.com/jsref/jsref-lastindexof-array.html) | 搜索数组中的元素，并返回它最后出现的位置。           |
| [map()](https://www.runoob.com/jsref/jsref-map.html)         | 通过指定函数处理数组的每个元素，并返回处理后的数组。 |
| [pop()](https://www.runoob.com/jsref/jsref-pop.html)         | 删除数组的最后一个元素并返回删除的元素。             |
| [push()](https://www.runoob.com/jsref/jsref-push.html)       | 向数组的末尾添加一个或更多元素，并返回新的长度。     |
| [reduce()](https://www.runoob.com/jsref/jsref-reduce.html)   | 将数组元素计算为一个值（从左到右）。                 |
| [reduceRight()](https://www.runoob.com/jsref/jsref-reduceright.html) | 将数组元素计算为一个值（从右到左）。                 |
| [reverse()](https://www.runoob.com/jsref/jsref-reverse.html) | 反转数组的元素顺序。                                 |
| [shift()](https://www.runoob.com/jsref/jsref-shift.html)     | 删除并返回数组的第一个元素。                         |
| [slice()](https://www.runoob.com/jsref/jsref-slice-array.html) | 选取数组的的一部分，并返回一个新数组。               |
| [some()](https://www.runoob.com/jsref/jsref-some.html)       | 检测数组元素中是否有元素符合指定条件。               |
| [sort()](https://www.runoob.com/jsref/jsref-sort.html)       | 对数组的元素进行排序。                               |
| [splice()](https://www.runoob.com/jsref/jsref-splice.html)   | 从数组中添加或删除元素。                             |
| [toString()](https://www.runoob.com/jsref/jsref-tostring-array.html) | 把数组转换为字符串，并返回结果。                     |
| [unshift()](https://www.runoob.com/jsref/jsref-unshift.html) | 向数组的开头添加一个或更多元素，并返回新的长度。     |
| [valueOf()](https://www.runoob.com/jsref/jsref-valueof-array.html) | 返回数组对象的原始值。                               |

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

## 





# 其他对象

## Math对象

### Math.ceil() 和 Math.floor()

向上取整和向下取整

```js
console.log(Math.ceil(2.1)) //输出3
console.log(Math.floor(2.1)) //输出2
```

### toFixed()

保留小数位数，参数是保留到几位

```js
console.log((3.5678).toFixed(2))  //输出3.57
```

### Math.random

大于等于0，小于1，的随机数

```js
console.log(Math.random())

//想取0-5之间的随机数,Math.random*5是肯定不够的，5这个值是永远取不到的
console.log(Math.floor(Math.random()*(5+1)))

//从2-5的随机数
//console.log(min+Math.floor(Math.random()*(max-min+1)))
console.log(2+Math.floor(Math.random()*(5-2+1)))


//随机点名例子
//随机取数组中的元素
let arr=["张三","李四","王五","赵六"]
let index=Math.floor(Math.random()*arr.length)
console.log(arr[index])
```

### Math 对象属性

内容来自菜鸟教程

| 属性                                                       | 描述                                                    |
| :--------------------------------------------------------- | :------------------------------------------------------ |
| [E](https://www.runoob.com/jsref/jsref-e.html)             | 返回算术常量 e，即自然对数的底数（约等于2.718）。       |
| [LN2](https://www.runoob.com/jsref/jsref-ln2.html)         | 返回 2 的自然对数（约等于0.693）。                      |
| [LN10](https://www.runoob.com/jsref/jsref-ln10.html)       | 返回 10 的自然对数（约等于2.302）。                     |
| [LOG2E](https://www.runoob.com/jsref/jsref-log2e.html)     | 返回以 2 为底的 e 的对数（约等于 1.4426950408889634）。 |
| [LOG10E](https://www.runoob.com/jsref/jsref-log10e.html)   | 返回以 10 为底的 e 的对数（约等于0.434）。              |
| [PI](https://www.runoob.com/jsref/jsref-pi.html)           | 返回圆周率（约等于3.14159）。                           |
| [SQRT1_2](https://www.runoob.com/jsref/jsref-sqrt1-2.html) | 返回 2 的平方根的倒数（约等于 0.707）。                 |
| [SQRT2](https://www.runoob.com/jsref/jsref-sqrt2.html)     | 返回 2 的平方根（约等于 1.414）。                       |

### Math 对象所有属性与方法

内容来自菜鸟教程

| 方法                                                         | 描述                                                         |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| [abs(x)](https://www.runoob.com/jsref/jsref-abs.html)        | 返回 x 的绝对值。                                            |
| [acos(x)](https://www.runoob.com/jsref/jsref-acos.html)      | 返回 x 的反余弦值。                                          |
| [asin(x)](https://www.runoob.com/jsref/jsref-asin.html)      | 返回 x 的反正弦值。                                          |
| [atan(x)](https://www.runoob.com/jsref/jsref-atan.html)      | 以介于 -PI/2 与 PI/2 弧度之间的数值来返回 x 的反正切值。     |
| [atan2(y,x)](https://www.runoob.com/jsref/jsref-atan2.html)  | 返回从 x 轴到点 (x,y) 的角度（介于 -PI/2 与 PI/2 弧度之间）。 |
| [ceil(x)](https://www.runoob.com/jsref/jsref-ceil.html)      | 对数进行上舍入。                                             |
| [cos(x)](https://www.runoob.com/jsref/jsref-cos.html)        | 返回数的余弦。                                               |
| [exp(x)](https://www.runoob.com/jsref/jsref-exp.html)        | 返回 Ex 的指数。                                             |
| [floor(x)](https://www.runoob.com/jsref/jsref-floor.html)    | 对 x 进行下舍入。                                            |
| [log(x)](https://www.runoob.com/jsref/jsref-log.html)        | 返回数的自然对数（底为e）。                                  |
| [max(x,y,z,...,n)](https://www.runoob.com/jsref/jsref-max.html) | 返回 x,y,z,...,n 中的最高值。                                |
| [min(x,y,z,...,n)](https://www.runoob.com/jsref/jsref-min.html) | 返回 x,y,z,...,n中的最低值。                                 |
| [pow(x,y)](https://www.runoob.com/jsref/jsref-pow.html)      | 返回 x 的 y 次幂。                                           |
| [random()](https://www.runoob.com/jsref/jsref-random.html)   | 返回 0 ~ 1 之间的随机数。                                    |
| [round(x)](https://www.runoob.com/jsref/jsref-round.html)    | 四舍五入。                                                   |
| [sin(x)](https://www.runoob.com/jsref/jsref-sin.html)        | 返回数的正弦。                                               |
| [sqrt(x)](https://www.runoob.com/jsref/jsref-sqrt.html)      | 返回数的平方根。                                             |
| [tan(x)](https://www.runoob.com/jsref/jsref-tan.html)        | 返回角的正切。                                               |

## Date对象

### 时间与时间戳

```js
//这里的data类型是对象

const date=new Date()
console.log(typeof date) //object

console.log(date) //返回当前时间，Thu Apr 30 2020 21:30:07 GMT+0800 (中国标准时间)
//指定时间
const date2=new Date("1999-11-3 13:0:3")//返回，Wed Nov 03 1999 13:00:03 GMT+0800 (中国标准时间)


//获取时间戳，即从1970年到现在经过的毫秒数
console.log(date*1)
console.log(Number(date))
console.log(date.valueOf())
console.log(date.getTime())

console.log(Date.now())//直接用Date对象，返回时间戳

//把时间戳 转换为 时间
const timestamp=date*1
console.log(new Date(timestamp))
```

```js
//这里的data是字符串类型

let data= Date()
console.log(typeof data) //string

console.log(data)  //Thu Apr 30 2020 21:30:07 GMT+0800 (中国标准时间)
```

应用

* setFullYear(年,月-1,日)
* setMonth(月-1，[日])
* setDay(日)
* Date对象做加减乘除就会变成时间戳

```js
//计算两个日期相差的天数
let now=new Date()
let end=new Date().setFullYear(2020,11,22)//月份是从0开始的，这里是12月22日。这里end是时间戳

let res=(end-now)/ (1*24*60*60*1000)
 console.log("距离时间",res)//打印当前时间到2020-11-22的天数
```



### 日月年

```js
const date2=new Date("1999-11-3 13:0:3")


console.log(date2)//返回，Wed Nov 03 1999 13:00:03 GMT+0800 (中国标准时间)
//年
console.log(date2.getFullYear())
//月,注意getMonth()是从0开始的，所以月份需要+1
console.log(date2.getMonth()+1)
//日
console.log(date2.getDate())
//小时
console.log(date2.getHours())
//分钟
console.log(date2.getMinutes())
//秒数
console.log(date2.getSeconds())

```

### 格式化时间

```js
const format=`${date2.getFullYear()}年${date2.getMonth()}月`
```

```js
//格式化时间的函数
let date=new Date()
function dateFormat(date,format='YYYY-MM-DD HH:mm:SS'){
    const config={
        YYYY:date.getFullYear(),
        MM:date.getMonth()+1,
        DD:date.getDate(),
        HH:date.getHours(),
        mm:date.getMinutes(),
        SS:date.getSeconds()
    };
    for(const key in config){
        format=format.replace(key,config[key])
    }
    return format
}
console.log(dateFormat(date,"YYYY年-MM月-DD日"))//输出 2020年-5月-11日
```

使用moment.js格式化时间

```
//看最后的"优秀的JS库"部分
```

# Set 

set会自动去重

## Set的声明

```js
//
let set=new Set()
set.add(1)
set.add(2)
set.add(1)
console.log(set)//输出 Set(2) {1, 2}

//
let set2=new Set([1,2,1])
console.log(set2)

//
let set3=new Set("abcd")
console.log(set3)//输出 Set(4) {"a", "b", "c", "d"}
```

## Set的常用函数

* add()

* size
* has()
* delete()
* clear()

```js
let set=new Set([1,2,1,3])
console.log(set.size) //输出2
console.log(set.has(2)) //输出true,判断元素是否存在

console.log(set.delete(1))//输出true,删除指定元素，删除成功返回true，若不存在，返回false

console.log(set.clear()) //输出undefined,清空数组，没返回值


```

## 类型转换 Set<-->Array

```js
// Set-->Array
let set=new Set(["a","b","c"])
console.log(Array.from(set))
console.log([...set])

// Set<--Array
arr=[1,2,3]
let set=new Set(arr)
consle.log(set) //输出 Set(3) {1, 2, 3}

//应用,取出set中小于3的，把set转为array，处理完，转会set类型
let set =new Set("123456")
let set2=new Set([...set].filter(item=>{
    return item<=3
}))
console.log(set2)//输出 Set(3) {"1", "2", "3"}

//应用，数组去重
let arr=[1,2,3,4,1,4]
let arr2=[...new Set(arr)]
console.log(arr2) //输出 [1, 2, 3, 4]
```

## Set的遍历

* for value of 和 forEach。无for key in

```js
let set=new Set(["a","b","c"])

//for of
for(const value of set){
    console.log(value)
}

//forEach
set.forEach(function(value,key,set){
    //key和value一样，都是set内元素，set是调用forEach的
    console.log(value,key)
})


//注意： for(const key in set)不能遍历
```

* 迭代器

```js
//set没有键，但是为了使迭代器对所有类型统一，所以让set的键和值一样，都是set内的元素
let set=new Set(["a","b","c"])
//所有键
console.log(set.keys())//输出 SetIterator {"a", "b", "c"}
//所有值
console.log(set.values())//输出 SetIterator {"a", "b", "c"}
//所有键和值
console.log(set.entries())//输出 SetIterator {"a" => "a", "b" => "b", "c" => "c"}


//遍历所有键
for(const value of set.keys()){
    console.log(value)
}//输出a b c

//遍历所有值
for(const value of set.values()){
    console.log(value)
}//输出a b c

//遍历所有键和值，[value,key]是解构
for(const [value,key] of set.entries()){
    console.log(value)
    console.log(key)
}
```

## 并集 交集 差集的实现

```js
let a=new Set(["a","b","c"])
let b=new Set(["b","c","d"])
//并集
console.log(new Set([...a,...b]))//输出 Set(4) {"a", "b", "c", "d"}
//a-b差集
let res=new Set([...a].filter(item=>![...b].includes(item)))
console.log(res)//输出Set(1) {"a"}
//交集
let res2=new Set([...a].filter(item=>[...b].includes(item)))
console.log(res2)//输出 Set(2) {"b", "c"}
```

## WeakSet

WeakSet和Set不会存储重复的值，不同的是，它的成员**必须是引用类型**。

* add()

```js
let set=new Set(["a","b"])
set.add(["c","d"])
console.log(set) //{"a", "b", Array(2)}
```

weakSet的弱引用特性

```js
let a={name:"张三"}
let b=a //在这里b和a指向的是同一块内存地址。这个对象有一个引用计数器，现在值为2

let c=new weakSet()
c.add(a)//并不会让引用计数器加1，这就是弱引用

a=null
b=null//当两个变量都不引用了，对象的引用计数器为0，会被垃圾回收期回收。
//注意：这时候WeakSet还在引用这个对象，只不过现在对象为null,WeakSet有可能因为别的操作变成null，因此WeakSet没有size，遍历等方法，以防止出错
```

# Map

## Map的声明

键名可以是字符串，函数，对象，数值

```js
let map=new Map()
map.set("name","张三")
map.set(function(){},"李四")
map.set({},"王五")
map.set(1,"赵六")
console.log(map) 
//输出 Map(4) {"name" => "张三", ƒ => "李四", {…} => "王五", 1 => "赵六"}

//或是
let map=new Map([["a",1],["b",2],["c",3]])
console.log(map)
//输出 Map(3) {"a" => 1, "b" => 2, "c" => 3}
```

## Map常用函数

* set()
* get()
* delete()
* has()
* clear()

```js
let map=new Map()
map.set("a",1)
map.set("b",2)
console.log(map.get("b"))//输出2

console.log(map.delete("b"))//输出true，删除成功返回true，若map中没有要删除的键名，则返回false
console.log(map)//输出 Map(1) {"a" => 1}

console.log(map.has("a"))//输出true，若键名为a的存在，返回true，否则返回false

console.log(map.clear())//输出undefined，清空map，没有返回值
console.log(map)//Map(0) {}
```

## 类型转换Map<-->Array

```js
//Map-->Array
let map=new Map([["张三",60],["李四",70],["王五",30]])
console.log([...map])
//输出 [["张三", 60],["李四", 70],["王五", 30]]，注意：这个输出的是一个数组，数组元素也是数组

console.log([...map.entries()])//输出[["张三", 60],["李四", 70],["王五", 30]]

//所有键转化为数组
console.log([...map.keys()])//输出 ["张三", "李四", "王五"]
//所有值转化为数组
console.log([...map.values()])//输出 [60, 70, 30]


//Array-->Map
//这种声明方式就是用Array转化为Map
let map=new Map([["张三",60],["李四",70],["王五",30]]) 
console.log(map)
//输出 Map(3) {"张三" => 60, "李四" => 70, "王五" => 30}
////注意：Array必须符合Map的格式才能转换为Map
new Map([["张三",60]]) //符合
new Map(["张三",60]) //不符合，报错
let arr=[["张三",60,"男"],["李四",60,"女"]]
console.log(new Map(arr))//不符合，但是可以用 输出 Map(2) {"张三" => 60, "李四" => 60} //张三作为key，60作为值，剩下的"男"被略掉了
```

应用，map转化为array，完成指定功能后，转换回map

```js
//map中筛选出来成绩大于等于60
let map=new Map([["张三",60,],["李四",30],["王五",80]])
let newArray=[]
for(const value of [...map]){
    //console.log(value)
    if(value[1]>=60)
        newArray.push(value)
}
console.log(newArray)//输出 ["张三", 60] ["王五", 80]
```

## Map的遍历

* forEach。无for key in 和 for value of

```js
let map=new Map()
map.set("a",1)
map.set("b",2)

map.forEach(function(value,key,map){
   console.log(value,key) 
});
//输出
//1 "a"
//2 "b"
```

* 迭代器

```js
let map=new Map()
map.set("a",1)
map.set("b",2)

//所有值
console.log(map.values())//输出 MapIterator {1, 2}
//所有键
console.log(map.keys())//输出 MapIterator {"a", "b"}
//所有键和值
console.log(map.entries())//输出 MapIterator {"a" => 1, "b" => 2}


//遍历值
for(const value of map.values()){
    console.log(value)
}//输出1 2

//遍历key
for(const key of map.keys()){
    console.log(key)
}//输出a b

//遍历值和键，[key,value]用了解构
for(const [key,value] of map.entries()){
    console.log(key)
    console.log(value)
}//输出 a 1 b 2
```

## WeakMap

WeakMap的成员必须是**引用类型**，与WeakSet相同都是弱引用类型

```js
 let map=new WeakMap()
 map.set(["a","b","c"],["d","e"])
 console.log(map)//输出 WeakMap {Array(3) => Array(2)}

//与WeakSet相似，仍然没有遍历等方法
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

![image-20210414211637552](https://gitee.com/hyj1270433876/blog-img/raw/master/%E9%9D%A2%E8%AF%95%E7%9B%B8%E5%85%B3/image-20210414211637552.png)

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

![image-20210414211637552](https://gitee.com/hyj1270433876/blog-img/raw/master/%E9%9D%A2%E8%AF%95%E7%9B%B8%E5%85%B3/image-20210414211637552.png)



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

![image-20210419125616198](https://gitee.com/hyj1270433876/blog-img/raw/master/%E9%9D%A2%E8%AF%95%E7%9B%B8%E5%85%B3/image-20210419125616198.png)

## 自定义对象的原型链

* 指定child对象的父亲

  ```javascript
  let parent={name:"父亲"}
  let child={name:"孩子"}
  
  Object.setPrototypeOf(child,parent)
  console.log(child)
  ```

  

![image-20210413212244932](https://gitee.com/hyj1270433876/blog-img/raw/master/%E9%9D%A2%E8%AF%95%E7%9B%B8%E5%85%B3/image-20210413212244932.png)

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
  
  ![image-20210413214912655](https://gitee.com/hyj1270433876/blog-img/raw/master/%E9%9D%A2%E8%AF%95%E7%9B%B8%E5%85%B3/image-20210413214912655.png)
  
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

![111](https://gitee.com/hyj1270433876/blog-img/raw/master/%E9%9D%A2%E8%AF%95%E7%9B%B8%E5%85%B3/image-20210418163841016.png)

普通函数

```javascript
function Hd(name) {
  this.name = name;
}
console.dir(Hd);
console.log(Hd == Hd.prototype.constructor); //true
```

![image-20210418163725541](https://gitee.com/hyj1270433876/blog-img/raw/master/%E9%9D%A2%E8%AF%95%E7%9B%B8%E5%85%B3/image-20210418163725541.png)



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

# Promise

Promise包含`pending`、`fulfilled`、`rejected`三种状态

- `pending` 指初始等待状态，初始化 `promise` 时的状态
- `resolve` 指已经解决，将 `promise` 状态设置为`fulfilled`
- `reject` 指拒绝处理，将 `promise` 状态设置为`rejected`

## 基本使用

**传递参数**

```javascript
let p1=new Promise((resolve,reject)=>{
    resolve("传递给then的值")//执行成功，传递参数
}).then(
    value=>{//执行成功，会把值传递给第一个参数value
        console.log(value)
    },reason=>{////执行失败，会把值传递给第二个参数reason
        console.log(reason)
    }
)

//输出 传递给then的值
```

注意：

Promise内部函数，只写一个参数时，默认是resolve

then中只写一个函数，默认是执行成功的那个函数

```javascript
let p1=new Promise((resolve)=>{
    resolve("传递给then的值")//执行成功，传递参数
}).then(
    value=>{//执行成功，会把值传递给参数value
        console.log(value)
)
```

如果then中只写执行失败的函数

```javascript
let p1=new Promise((resolve，reject)=>{
    reject("传递给then的值")//执行成功，传递参数
}).then(
	null,////执行成功的函数不写，也得放个null占位置
    reason=>{////执行失败，会把值传递给第二个参数reason
        console.log(reason)
    }
)
```

**连续传递**

默认传递的是成功。then函数执行的结果仍然是promise对象，所有仍然可以继续调用then方法

```javascript
let p1=new Promise((resolve,reject)=>{
    resolve("传递给then的值")
}).then(
    value=>{
        return value//使用return，把参数传递给下一个then，默认是resolve
    },reason=>{
        console.log(reason)
    }
).then(
    value=>{//成功传递过来的
        console.log(value)
    }
)
```

传递promise对象: 无论是resolve(p2)还是reject(p2),还是return p2，最终下一个then中处理的函数，由p2是resolve还是reject

```javascript
let p2=new Promise((resolve,reject)=>{
    reject("传递的参数")
})

let p1=new Promise((resolve,reject)=>{
    resolve(p2)//参数是一个promise对象
}).then(//传递到哪个函数取决于P2是resolve还是reject
    value=>{//传递到执行成功里面来的
        console.log(value) //输出 传递的参数
    },reason=>{
        console.log(reason)
    }
)
```

**注意细节：**

then的返回值是resolve状态的promise，如果没有return值，则不带参数

```js
let p1=new Promise((resolve,reject)=>{
		    resolve("传递给then的值")
		}).then(
		    value=>{
		        console.log(value)//这里打印，但是没写return value，但是这个then的返回值任然是resolve状态的promise，只不过没参数
		    },reason=>{
		        console.log(reason)
		    }
		).then(
		    value=>{//
		        console.log("看这里："+value)
				
				
		    }
		)

//输出    传递给then的值     看这里：undefined
```

## then

then除了上面提到的用法外，还有一个用方法

```javascript
let p1=new Promise((resolve,reject)=>{
    resolve("传递给第一个then的值")
}).then(
    value=>{
        return {
            //这里return一个then函数
            then(resolve,reject){
                resolve("传递给下一个then的值")
            }
        } 
    },reason=>{
        console.log(reason)
    }
).then(
    value=>{//成功传递过来的
        console.log(value)
    }
)

//输出 传递给下一个then的值
```

## catch

`then(null,reject){}`以捕获到reject传递过来的的参数，也可以捕获到Promise执行过程中抛出的错误。

catch可以捕获到reject传递过来的的参数,也可以捕获到Promise执行过程中抛出的错误。

因此建议前面所有then处理，不要写失败处理函数，将catch写在最后，前面发生的失败参数和错误会跳过所有的then，直接被传递到catch中处理

```javascript
const promise = new Promise((resolve, reject) => {
  reject("你好");
})
.then((value)=>{
    
})
.catch(msg => {
  console.log("这里是catch捕获的参数："+msg);
});

//输出 这里是catch捕获的参数：你好
```

**注意点：**

catch的返回值也是resolve状态的promise，而且之前的then即使有rejected的处理函数，仍然会被忽略，直接被catch捕获

```js
let p1 = new Promise((resolve, reject) => {
					reject("参数")
				}).then(
					value => {
						console.log("第一个then中处理resolve:" + value) //这里打印，但是没写return value，但是这个then的返回值任然是resolve状态的promise，只不过没参数
					}, reason => {
						console.log("第一个then中处理reject:"+value)
					}
				).then(
					value => { //
						console.log("第二个then中处理resolve:" + value)
					},reason=>{
						console.log("第二个then中处理reject:"+value)
					}
				).catch(msg => {
					console.log("这里是catch捕获的参数:" + msg);
				}).then(
					value => { //
						console.log("第三个then中处理resolve:" + value)
					},reason=>{
						console.log("第三个then中处理reject:"+value)
					}
				)

//这里是catch捕获的参数:ReferenceError: value is not defined
//第三个then中处理resolve:undefined
```

then返回的resolve状态的promise，跳过了catch，把参数传递给了下一个then

```js
let p1 = new Promise((resolve, reject) => {
					resolve("参数")
				}).then(
					value => {
						console.log("第一个then中处理resolve:" + value) //这里打印，但是没写return value，但是这个then的返回值任然是resolve状态的promise，只不过没参数
					}, reason => {
						console.log("第一个then中处理reject:"+value)
					}
				).then(
					value => { //
						console.log("第二个then中处理resolve:" + value)
						return "参数2"
					},reason=>{
						console.log("第二个then中处理reject:"+value)
					}
				).catch(msg => {
					console.log("这里是catch捕获的参数:" + msg);
				}).then(
					value => { //
						console.log("第三个then中处理resolve:" + value)
					},reason=>{
						console.log("第三个then中处理reject:"+value)
					}
				)

//第一个then中处理resolve:参数
//第二个then中处理resolve:undefined
//第三个then中处理resolve:参数2
```



## finally

无论状态是`resolve` 或 `reject` 都会执行此动作，`finally` 与状态无关。

```javascript
const promise = new Promise((resolve, reject) => {
  reject("hdcms");
})
.then(msg => {
  console.log("resolve");
})
.catch(msg => {
  console.log("reject");
})
.finally(() => {
  console.log("resolve/reject状态都会执行");
});
```

## 宏任务与微任务  

js是单线程，程序从上到下执行

* 执行到异步函数（比如：setTimeout），添加到宏任务队列中
* 执行到resove或者reject时才会把（new Promise中的函数是同步函数，在主线程中执行），其promise后的所有then中的函数操作，按顺序添加到微任务队列中

添加到宏任务/微任务队列后，程序继续向下执行。当所有程序执行完了，先执行微任务队列，然后执行宏任务队列（注意执行的优先级）

**分析以下情况**

程序由上到下运行

* 创建p1

* 打印”你好“
* 执行到resolve后，把then中的函数加入到微任务队列。并把then返回的promise对象赋值给p2
* 打印p1对象，因为已经resolve，所以状态是fulfilled
* 打印p2对象，但是p2未执行
* 主线任务结束后，开始执行微任务队列，value函数执行，打印"succeed"

```javascript
let p1=new Promise((resolve,reject)=>{
    console.log("你好")
    resolve("succeed")
})
let p2=p1.then(
    value=>console.log(value),
    reason=>console.log(reason)
)
console.log(p1)
console.log(p2)
```

![image-20210415000628923](https://gitee.com/hyj1270433876/blog-img/raw/master/%E9%9D%A2%E8%AF%95%E7%9B%B8%E5%85%B3/image-20210415000628923.png)

**分析以下情况**

程序由上到下运行

* 创建p1

* 打印”你好“
* 执行到resolve后，把then中的函数加入到微任务队列。并把then返回的promise对象赋值给p2
* setTimeout是异步函数，会被加入到宏任务队列
* 主线任务结束，开始执行微任务队列，value函数执行，打印"succeed"
* 执行宏任务队列，打印p1和p2,这时候两个都是fulfilled状态

```javascript
let p1=new Promise((resolve,reject)=>{
    console.log("你好")
    resolve("succeed")
})
let p2=p1.then(
    value=>console.log(value),
    reason=>console.log(reason)
)
setTimeout(()=>{
    console.log(p1)
    console.log(p2)
})
```

![image-20210415001615623](https://gitee.com/hyj1270433876/blog-img/raw/master/%E9%9D%A2%E8%AF%95%E7%9B%B8%E5%85%B3/image-20210415001615623.png)

## 扩展接口

**Promise.resolve**

使用 `promise.resolve` 方法可以快速的返回一个成功的promise对象

```javascript
Promise.resolve("后盾人").then(value => {
  console.log(value); //后盾人
});
```

**Promise.reject**

和 `Promise.resolve` 类似，`reject` 生成一个失败的promise对象

```javascript
new Promise(resolve => {
  resolve("后盾人");
})
.then(v => {
  if (v != "houdunren.com") return Promise.reject(new Error("fail"));
})
.catch(error => {
  console.log(error);
});
```

**Promise.all**

使用`Promise.all` 方法可以同时执行多个并行异步操作

* 所有Promise 状态都为`fulfilled`时,`Promise.all`的结果才是`fulfilled`,then按照all参数的顺序，接收所有`fulfilled`状态的Promise传递过来的参数

  ```javascript
  let p1 = new Promise((resolve, reject) => {
    resolve("参数1");
  });
  let p2 = new Promise((resolve, reject) => {
    resolve("参数2");
  });
  Promise.all([p2, p1]).then(
      value=>{
          console.log("fulfilled状态:",value)
      },reason=>{
          console.log("rejected状态:",reason)
      }
  );
  
  //输出 fulfilled状态:["参数2", "参数1"]
  ```

* 其中一个 Promise 状态都为`rejected`时,`Promise.all`的结果就是`rejected`，then的结果是按照all参数顺序中，接收第一个状态是`rejected`的Promise传递过来的值

  ```javascript
  let p1 = new Promise((resolve, reject) => {
    resolve("参数1");
  });
  let p2 = new Promise((resolve, reject) => {
    reject("参数2");
  });
  let p3 = new Promise((resolve, reject) => {
    reject("参数3");
  });
  Promise.all([p1, p3,p2]).then(
      value=>{
          console.log(value)
      },reason=>{
          console.log(reason)
      }
  );
  
  //输出 参数3
  ```

**Promise.allSettled**

`allSettled` 用于处理多个`promise` ，无论promise是fulfiled还是rejected，`allSettled`都是按照参数的顺序，按照`fulfilled`状态接收所有Promise传递过来的参数

```javascript
const p1 = new Promise((resolve, reject) => {
  resolve("参数1");
});
const p2 = new Promise((resolve, reject) => {
  reject("参数2");
});
Promise.allSettled([p1, p2])
.then(msg => {
  console.log(msg);
})


//输出  [ {status: "fulfilled", value: "参数1"}，{status: "rejected", reason: "参数2"} ]
 

```

**Promise.race**

使用`Promise.race()` ，Promise无论是resolve还是reject，哪个快用哪个，按状态返回到对应的处理函数

```javascript
const hdcms = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("第一个Promise");
  }, 2000);
});
const houdunren = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("第二个异步");
  }, 1000);
});
Promise.race([hdcms, houdunren])
.then(results => {
  console.log("fulfilled状态："+results);
})
.catch(msg => {
  console.log("rejected状态："+msg);
});
```

## 任务队列

https://houdunren.gitee.io/note/js/15%20Promise.html#%E4%BB%BB%E5%8A%A1%E9%98%9F%E5%88%97

## async/await

使用 `async/await` 是promise 的语法糖，可以让编写 promise 更清晰易懂，也是推荐编写promise 的方式。

* async用在函数前，把return的值，放到Promise对象中，然后返回这个Promise对象。所以想要去处理Promise中的对象，需要继续用then函数

  ```javascript
  async function a() {
    return "ni"
  }
  console.log(a())
  //输出 Promise {<fulfilled>: "ni"}
  ```

* await只能出现在async函数中，await后面接Promise对象或其他异步函数

  * await +Promise :等待Promise对象中resolve或者reject参数后，返回参数
  * await +异步函数：等待异步函数结束，返回函数中return的值

![image-20210418105050836](https://gitee.com/hyj1270433876/blog-img/raw/master/%E9%9D%A2%E8%AF%95%E7%9B%B8%E5%85%B3/image-20210418105050836.png)

## Promise分装AJAX异步请求

原版的AJAX异步请求

```javascript
function ajax(url,callback) {
    let xhr=new XMLHttpRequest()
    xhr.open("GET",url)
    xhr.send()
    xhr.onload=function(){
        if(this.status==200){
           callback(JSON.parse(this.response)) 
        }else{
            throw new Error("加载失败")
        }
    }
    
}
```

使用Promise封装

```javascript
function ajax(url) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest()
        xhr.open("GET", url)
        xhr.send()
        xhr.onload = function () {
            if (this.status == 200) {
                resolve(JSON.parse(this.response))
            } else {
                reject("加载失败")
            }
        }

    })

}

//	使用时,返回的peomise由then处理
		ajax("网址").then(
            value=>console.log(value),
            reason=>console.log(reason)
                       )
```

# 实现Promise

## 实现Promise

**初步实现resolve和reject方法**

```javascript
class HD {
  static PENDING = "pending";
  static FULFILLED = "fulfilled";
  static REJECTED = "rejected";
  constructor(executor) {
    this.status = HD.PENDING;
    this.value = null;
    try {
        //executor中的参数中this还是指向HD对象的
        //但是执行到resolve和reject函数内部时，使用this，this会指向undefined(class中默认严格模式)
        //所以使用bind，将resolve和reject函数中的this指向HD对象
      executor(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      this.reject(error);
    }
  }
  resolve(value) {
    //promise的状态只能是从pending转换过去
    if (this.status == HD.PENDING) {
      this.status = HD.FULFILLED;
      this.value = value;
    }
  }
  reject(value) {
    //promise的状态只能是从pending转换过去
    if (this.status == HD.PENDING) {
      this.status = HD.REJECTED;
      this.value = value;
    }
  }
	
}
```

测试

```javascript
let a=new HD((resolve,reject)=>{
	resolve("参数")
})
console.log(a) //输出  HD {status: "fulfilled", value: "你好"}
```

**添加then方法**

```javascript
then(onFulfilled, onRejected) {
  //前两个if的作用：then的函数参数都不是必须的，所以需要设置默认值为函数，用于处理当没有传递时情况
  //比如then(null,reject=>{ })，这种如果没有之前的两个if判断就会报错
  if (typeof onFulfilled != "function") {
    //将class HD中保存的传递的参数value的值，塞到onFulifilled和onRejected这两个函数中
    onFulfilled = () => this.value;
  }
  if (typeof onRejected != "function") {
    onRejected = () => this.value;
  }
    
    
  //只有promise状态改变了，才会执行then中的内容
  if (this.status == HD.FULFILLED) {
    try {
      onFulfilled(this.value);
    } catch (error) {
      onRejected(error);
    }
  }
  if (this.status == HD.REJECTED) {
    try {
      onRejected(this.value);
    } catch (error) {
      onRejected(error);
    }
  }
}
```

存在的问题：HD没有异步的效果

```javascript
let a = new HD((resolve, reject) => {
  resolve("你好")
}).then(
  value=>console.log("fulfilled状态:"+value),
  reason=>console.log("rejected状态:"+reason)
)
console.log("他好")

//输出   fulfilled状态:你好    他好
//then先于主线任务被执行，这样是不对的
```

修改then，给then添加异步

```java
then(onFulfilled, onRejected) {
  if (typeof onFulfilled != "function") {
    onFulfilled = value => value;
  }
  if (typeof onRejected != "function") {
    onRejected = value => value;
  }
  if (this.status == HD.FULFILLED) {
      //其实就是添加了setTimeout函数之中，then中函数不会立即执行
    setTimeout(() => {
      try {
        onFulfilled(this.value);
      } catch (error) {
        onRejected(error);
      }
    });
  }
  if (this.status == HD.REJECTED) {
    setTimeout(() => {
      try {
        onRejected(this.value);
      } catch (error) {
        onRejected(error);
      }
    });
  }
}
```

存在的问题：resolve/reject放在定时器中，当它还未被执行时，就执行了then方法。then方法缺少对于pending状态的处理。

```javascript
let a = new HD((resolve, reject) => {
  setTimeout(()=>{
      resolve("你好")
  },1000)
}).then(
  value=>console.log("fulfilled状态:"+value),
  reason=>console.log("rejected状态:"+reason)
)
console.log("他好")

//输出 他好
//因为resolve/reject放在定时器中，当它还未被执行时，就执行了then方法。then方法缺少对于pending状态的处理。
```

修改方法

```javascript
//在HD构造函数中添加
constructor(executor) {
	...
  this.callbacks = []
  ...
}    
  
//在then函数中添加pending状态，如果Promise没有被resolve或者reject（计时器计时1s之后执行），就进入then方法，会把两个函数push进HD对象中，当计时器到了时间，执行到resolve或者reject时，会在then中push进去的方法中，执行对应的方法
then(onFulfilled, onRejected) {
  ...
  if (this.status == HD.PENDING) {
    this.callbacks.push({
      onFulfilled: value => {
        try {
          onFulfilled(value);
        } catch (error) {
          onRejected(error);
        }
      },
      onRejected: value => {
        try {
          onRejected(value);
        } catch (error) {
          onRejected(error);
        }
      }
    });
  }
  ...
}
  
//修改resolve和reject函数
resolve(value) {
  if (this.status == HD.PENDING) {
    this.status = HD.FULFILLED;
    this.value = value;
    this.callbacks.map(callback => {
      callback.onFulfilled(value);
    });
  }
}
reject(value) {
  if (this.status == HD.PENDING) {
    this.status = HD.REJECTED;
    this.value = value;
    this.callbacks.map(callback => {
      callback.onRejected(value);
    });
  }
}
```

存在问题: 这里pending状态下是同步的，应该是先执行到`reslove(“你好”)`，将then添加到微任务，然后打印“哈哈”，然后再执行微任务，打印"你好"

```javascript
let p = new HD((resolve, reject) => {
  setTimeout(() => {
    resolve("你好");
    console.log("哈哈");
  });
}).then(
  value => {
    console.log(value);
  },
  reason => {
    console.log(reason);
  }
);
//输出 你好 哈哈
```

修改resolve和reject函数

```javascript
resolve(value) {
  if (this.status == HD.PENDING) {
   	this.status = HD.FULFILLED;
	this.value = value;
    setTimeout(() => {
      this.callbacks.map(callback => {
        callback.onFulfilled(value);
      });
    });
  }
}
reject(value) {
  if (this.status == HD.PENDING) {
  	this.status = HD.REJECTED;
    this.value = value;
    setTimeout(() => {
      this.callbacks.map(callback => {
        callback.onRejected(value);
      });
    });
  }
}
```

存在的问题：未实现then的链式调用

* then的返回值是新的Promise
* then中通过`return 参数`，将参数传递给下一个then，且状态是fulfilled状态

继续修改：

```javascript
then(onFulfilled, onRejected) {
  if (typeof onFulfilled != "function") {
    onFulfilled = value => value;
  }
  if (typeof onRejected != "function") {
    onRejected = value => value;
  }
  //返回新的Promise，这里的参数是新Promise的resolve和rejec两个函数。
  return new HD((resolve, reject) => {
    if (this.status == HD.PENDING) {
      this.callbacks.push({
        onFulfilled: value => {
          try {
            let result = onFulfilled(value);
            //then中的"return 参数",返回的新Promise默认是fulfilled状态
            resolve(result);
          } catch (error) {
            reject(error);
          }
        },
        onRejected: value => {
          try {
            let result = onRejected(value);
            //then中的"return 参数",返回的新Promise默认是fulfilled状态
            resolve(result);
          } catch (error) {
            reject(error);
          }
        }
      });
    }
    if (this.status == HD.FULFILLED) {
      setTimeout(() => {
        try {
          let result = onFulfilled(this.value);
          //then中的"return 参数",返回的新Promise默认是fulfilled状态
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    }
    if (this.status == HD.REJECTED) {
      setTimeout(() => {
        try {
          let result = onRejected(this.value);
          //then中的"return 参数",返回的新Promise默认是fulfilled状态
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    }
  });
}
```

继续修改：实现then中可以return 一个Promise

```javascript
then(onFulfilled, onRejected) {
  if (typeof onFulfilled != "function") {
    onFulfilled = value => value;
  }
  if (typeof onRejected != "function") {
    onRejected = value => value;
  }
  return new HD((resolve, reject) => {
    if (this.status == HD.PENDING) {
      this.callbacks.push({
        onFulfilled: value => {
          try {
            let result = onFulfilled(value);
            //判断下，return的是Promise对象，则用then函数执行其中的resolve或者reject函数
            if (result instanceof HD) {
              result.then(resolve, reject);
            } else {//如果return的是一个参数，默认新的Promise是fulfilled状态，resolve参数即可
              resolve(result);
            }
          } catch (error) {
            reject(error);
          }
        },
        onRejected: value => {
          try {
            let result = onRejected(value);
            if (result instanceof HD) {
              result.then(resolve, reject);
            } else {
              resolve(result);
            }
          } catch (error) {
            reject(error);
          }
        }
      });
    }
    if (this.status == HD.FULFILLED) {
      setTimeout(() => {
        try {
          let result = onFulfilled(this.value);
          if (result instanceof HD) {
            result.then(resolve, reject);
          } else {
            resolve(result);
          }
        } catch (error) {
          reject(error);
        }
      });
    }
    if (this.status == HD.REJECTED) {
      setTimeout(() => {
        try {
          let result = onRejected(this.value);
          if (result instanceof HD) {
            result.then(resolve, reject);
          } else {
            resolve(result);
          }
        } catch (error) {
          reject(error);
        }
      });
    }
  });
}
```

优化then函数

```javascript
then(onFulfilled, onRejected) {
  if (typeof onFulfilled != "function") {
    onFulfilled = value => value;
  }
  if (typeof onRejected != "function") {
    onRejected = value => value;
  }
  return new HD((resolve, reject) => {
    if (this.status == HD.PENDING) {
      this.callbacks.push({
        onFulfilled: value => {
          this.parse(onFulfilled(this.value), resolve, reject);
        },
        onRejected: value => {
          this.parse(onRejected(this.value), resolve, reject);
        }
      });
    }
    if (this.status == HD.FULFILLED) {
      setTimeout(() => {
        this.parse(onFulfilled(this.value), resolve, reject);
      });
    }
    if (this.status == HD.REJECTED) {
      setTimeout(() => {
        this.parse(onRejected(this.value), resolve, reject);
      });
    }
  });
}

//把重复的操作封装
parse(result, resolve, reject) {
  try {
    if (result instanceof HD) {
      result.then(resolve, reject);
    } else {
      resolve(result);
    }
  } catch (error) {
    reject(error);
  }
}
```

最后一个问题：Promise的then函数中，return可以是参数，可以是新的Promise，但是不允许是自己，会报错。而HD则不会报错

```javascript
let a=new Promise((resolve,reject)=>{
	resolve("参数")
})

p.then(value=>{
	return p //会报错
})
```

修改then函数和parse函数

```javascript
then(onFulfilled, onRejected) {
  if (typeof onFulfilled != "function") {
    onFulfilled = value => value;
  }
  if (typeof onRejected != "function") {
    onRejected = value => value;
  }
  let promise = new HD((resolve, reject) => {
    if (this.status == HD.PENDING) {
      this.callbacks.push({
        onFulfilled: value => {
          this.parse(promise, onFulfilled(this.value), resolve, reject);
        },
        onRejected: value => {
          this.parse(promise, onRejected(this.value), resolve, reject);
        }
      });
    }
    if (this.status == HD.FULFILLED) {
      setTimeout(() => {
        this.parse(promise, onFulfilled(this.value), resolve, reject);
      });
    }
    if (this.status == HD.REJECTED) {
      setTimeout(() => {
        this.parse(promise, onRejected(this.value), resolve, reject);
      });
    }
  });
  return promise;
}

//多了一个传递的参数promise，第一个参数：如果then中return的是promise对象，则是该Promise对象
parse(promise, result, resolve, reject) {
  //return的promise和上一个promise传递过来的参数，是否相等
  if (promise == result) {
    throw new TypeError("Chaining cycle detected for promise");
  }
  try {
    if (result instanceof HD) {
      result.then(resolve, reject);
    } else {
      resolve(result);
    }
  } catch (error) {
    reject(error);
  }
}
```

综上最终实现的Promise对象

```javascript
class HD {
  static PENDING = "pending";
  static FULFILLED = "fulfilled";
  static REJECTED = "rejected";

  constructor(executor) {
    this.callbacks = [];
    this.status = HD.PENDING;
    this.value = null;
    try {
      //executor中的参数中this还是指向HD对象的
      //但是执行到resolve和reject函数内部时，使用this，this会指向undefined(class中默认严格模式)
      //所以使用bind，将resolve和reject函数中的this指向HD对象
      executor(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      this.reject(error);
    }
  }

  //resolve函数
  resolve(value) {
    if (this.status == HD.PENDING) {
      this.status = HD.FULFILLED;
      this.value = value;
      setTimeout(() => {
        this.callbacks.map(callback => {
          callback.onFulfilled(value);
        });
      });
    }
  }

  //reject函数
  reject(value) {
    if (this.status == HD.PENDING) {
      this.status = HD.REJECTED;
      this.value = value;
      setTimeout(() => {
        this.callbacks.map(callback => {
          callback.onRejected(value);
        });
      });
    }
  }

  //then函数
  then(onFulfilled, onRejected) {
    if (typeof onFulfilled != "function") {
      onFulfilled = value => value;
    }
    if (typeof onRejected != "function") {
      onRejected = value => value;
    }
    let promise = new HD((resolve, reject) => {
      if (this.status == HD.PENDING) {
        this.callbacks.push({
          onFulfilled: value => {
            this.parse(promise, onFulfilled(this.value), resolve, reject);
          },
          onRejected: value => {
            this.parse(promise, onRejected(this.value), resolve, reject);
          }
        });
      }
      if (this.status == HD.FULFILLED) {
        setTimeout(() => {
          this.parse(promise, onFulfilled(this.value), resolve, reject);
        });
      }
      if (this.status == HD.REJECTED) {
        setTimeout(() => {
          this.parse(promise, onRejected(this.value), resolve, reject);
        });
      }
    });
    return promise;
  }

  //then函数中，重复的部分单独封装出的函数parse
  parse(promise, result, resolve, reject) {
    if (promise == result) {
      throw new TypeError("Chaining cycle detected for promise");
    }
    try {
      if (result instanceof HD) {
        result.then(resolve, reject);
      } else {
        resolve(result);
      }
    } catch (error) {
      reject(error);
    }
  }

}
```

## 实现 Promise.resolve

添加静态方法到HD类中

```javascript
static resolve(value) {
  return new HD((resolve, reject) => {
    if (value instanceof HD) {
      value.then(resolve, reject);
    } else {
      resolve(value);
    }
  });
}
```

## 实现 Promise.reject

添加静态方法到HD类中

```javascript
static reject(reason) {
  return new HD((_, reject) => {
    reject(reason);
  });
}
```

## 实现 Promise.all

添加静态方法到HD类中

```javascript
Promise.all=function(promises){
    resolves=[]
    return new Promise((resolve,reject)=>{
        promises.forEach(promise => {
            promise.then(
                value=>{
                    resolves.push(value)
                    if(resolves.length==promises.length){
                        resolve(resolves)
                    }
                },reason={
                    reject(reason)
                }
            )
            
        });
    })
}
```

## 实现 Promise.race

添加静态方法到HD类中

```javascript
static race(promises) {
  return new HD((resolve, reject) => {
    promises.map(promise => {
      promise.then(value => {
        resolve(value);
      });
    });
  });
}
```

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