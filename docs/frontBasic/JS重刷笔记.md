# javascript 学习笔记（重新整理版）

## 前言

是时候重新整理笔记了，从一无所知的萌新变成一个菜鸟，总归是有点进步了

## 严格模式

**严格模式的作用**

ES5 新增的严格模式是一种不同的 JavaScript 解析和执行模型，ES3 的一些不规范写法在这种模式下会被处理，对于不安全的活动将抛出错误。

**使用方式**

```javascript
"use strict";
```

语法虽然看起来像个没有赋值给任何变量的字符串，但它其实是一个预处理指令。任何支持的 JavaScript 引擎看到它都会切换到严格模式。

**严格模式的作用域**：全局作用域和函数作用域

- 当在`*.js`文件开头使用，整个脚本文件启用严格模式

- 在函数作用域中使用，仅在函数作用域内生效

  ```javascript
  function fun1() {
    "use strict";
    //函数体
  }
  ```

**严格模式的总结**

_关键字_：

- 严格模式定义变量必须使用关键字`var`，`let`，`const`，否则抛出 ReferenceError
- 不能使用`eval`和`arguments`作为变量名

---

**注意**：使用严格模式会影响 javascript 的执行效果，所以在下文中，除非特别声明，默认都是不使用严格模式

## 变量

### 标识符

**命名规则**

- 第一个字符必须是**字母**、**下划线（\_）**、**美元符号（$）**【记住标识符不能数字开头就行，命名一般是驼峰命名法，例如 `myHouse`】

- 剩下的其他字符可以是字母、下划线、美元符号或**数字**

- 关键字和保留字不能做标识符

  ```text
  //关键字
  break case catch class extends const continue debugger default delete
  
  do in typeof else export finally for function if import instanceof
  
  new return super switch this throw try var void while With yield
  ```

  ```text
  //为ES6保留的关键字（保留字）
  始终保留：￼enum￼
  严格模式下保留：implements   package      public￼     interface    protected    static￼  let           private￼
  模块代码中保留：await
  ```

### 变量声明

关键字并不决定变量的类型，仅仅是规定了变量的作用域和其它一些特性。

作用域：使用不同关键词定义的变量作用域不同，在使用变量时会在自己的作用域内查找，找不到才会向上一级作用域查找（使用 let 关键字，可能会出现暂时性锁区）

#### 无关键字

**声明赋值**

```
a;
```

**作用域**

无关键词定义的变量，只有全局作用域，所以`a`一定会被添加到`window`对象上。这里当`fun1`函数执行后，会在全局作用域下创建变量`a`

```java
function fun1(){
  a=2;
  console.log(a);
}
fun1();// 2
console.log(a)// 2
```

**严格模式**：严格模式下不允许使用这种方式，否则抛出 ReferenceError

#### var 关键字

**声明赋值**

```javascript
var a; //默认值为undefined

var b = 1; //声明和赋值

var c = 2,
  b,
  d = 2; //多变量同时声明赋值,c为2，b为undefined，d为2

var e = 1;
var e = 3; //同一个作用域var变量可重复声明，后面值的会覆盖前面的，详细参见`其它`
```

注意：`var`声明的变量`a`，如果不赋值默认为`undefined`

**作用域**

var 有全局作用域和函数作用（无块级作用域），如果定义在全局作用域上，`a`会被添加到`window`对象上

```javascript
//全局作用域
var a = 1;
console.log(a); // 1

//函数作用域
function fun1() {
  var b = 2;
  console.log(b);
}
fun1(); // 2
console.log(b); //报错
```

定义在函数作用域内的`b`，只在函数执行时存在，函数执行完毕，就会销毁变量，所以会报错

**声明提升**

仅将**变量声明**提升到变量所在作用域的第一行（**变量赋值**不会提升）

```javascript
function fun1() {
  console.log(b);
  var b = 2;
}
fun1(); //undefined
```

考虑变量提升，实际是

```javascript
function fun1() {
  var b; //仅声明提升到了作用域顶部，这时候b未赋值，默认为undefined
  console.log(b);
  b = 2; //赋值还是在原来的位置
}
fun1(); //undefined
```

**其他**

var 声明的变量在同一个作用域可重复声明，不会报错

```javascript
function fun1() {
  var b = 2;
  var b = 3;
  var b = 4;
  console.log(b);
}
fun1(); //4
```

考虑变量提升，实际是

```javascript
function fun1() {
  var b; //使用var关键字时，JS引擎会自动移除多余的声明，

  b = 2;
  b = 3;
  b = 4;
  console.log(b);
}
fun1(); //4
```

不同作用域可以定义重名变量，使用变量时，如果本级作用域能查找到该变量，就使用本级作用域，否则向外寻找该变量，直到找到为止，否则抛出错误`ReferenceError: xxx is not defined`

#### let 关键字

**声明赋值**

```javascript
let a; //默认值为undefined

let b = 1; //声明和赋值

let c = 2,
  b,
  d = 2; //多变量同时声明赋值
```

与 var 不同的地方: 同一作用域下，不可重复声明，否则抛出错误`SyntaxError: Identifier 'xxx' has already been declared`

```javascript
let e = 1;
let e = 3; //SyntaxError: Identifier 'e' has already been declared
```

下面的使用不同关键字的同名变量仍会报错。（只有多个 var 定义的同名变量才不会把报错）

```javascript
let e = 1;
var e = 3; //SyntaxError: Identifier 'e' has already been declared
```

**作用域**

let 有全局作用域、函数作用域、块级作用域

```javascript
//全局作用域
let b = 1;
console.log(b); // 1

//函数作用域
function fun1() {
  let b = 2;
  console.log(b);
}
fun1(); // 2

//块级作用域
if (true) {
  let b = 3;
  console.log(b); //3
}
```

**暂时性死区**

暂时性死区（temporal dead zone,TDZ）,这个名字很形象。

使用不同关键词定义的变量作用域不同，在使用变量时会在自己的作用域内查找，找不到才会向上一级作用域查找，但是如果出现下面的暂时性锁区，就会抛出错误`ReferenceError: Cannot access 'a' before initialization`

对于 let 出现暂时性锁区的发生有 3 个原因：

- 第一个，在块级作用域中，访问了在其后面声明的 let/const 变量（let，const 都没有声明提升）
- 第二个，也是最为重要的，js 引擎是能感知到块级作用域内有该变量的。所以 js 引擎会在该块级作用域的顶部（下面代码中的**A 区域**）——使用变量之前的范围查找变量，但是却找不到。但 js 引擎又能感知到块级作用域内有该变量，所以不会再上一级作用域去继续查找该变量。【这里就能明白，暂时性死区，就是指的查找变量的位置被锁死在了上面提到的范围里了】

```javascript
let a = 1;
function fun() {
  //-------------
  //  A区域
  //---------------
  console.log(a); //使用变量a，会在上面的区域查找变量a。但是却找不到，而js引擎又感知到块级作用域内有变量a，所以不会再向上一级查找变量a，所以被锁死在这个位置了
  let a = 2;
}
fun(); //ReferenceError: Cannot access 'a' before initialization
```

#### const 关键字

基本与 let 相同，唯一区别是 const 是常量，初始化时必须赋值，且不能修改。更严谨的说法是，const 类型的变量，初始化后的变量指向的内存地址不可以改变

- 声明 const 变量未赋值

  ```javascript
  const a; //SyntaxError: Missing initializer in const declaration
  ```

- 修改 const 变量初始值

  ```javascript
  const a = 10;
  a = 9; //报错赋值给常量，Uncaught TypeError: Assignment to constant variable.
  ```

但是！！！当 const 的是对象时，const 变量指向对象的内存地址，不可修改，但是对象的内容可以修改，因为对象的内容更改，不会引起内存位置变化

```javascript
const stu = {
  name: "张三",
  age: 18,
};
stu.age = 20;
console.log(stu); //输出{name: "张三", age: 20}
```

如何锁定 const 指向对象时，对象不许改变

```javascript
const stu = {
  name: "张三",
  age: 18,
};
Object.freeze(stu); //锁定对象
stu.age = 20;
console.log(stu); //不报错，但是修改失效，输出{name: "张三", age: 18}
```

### 变量类型

### 两种变量类型

> 每种对象的详细信息可查询[菜鸟教程 - JS对象参考手册](https://www.runoob.com/jsref/obj-storage.html)

**ECMAScript 有两大数据类型**

- 基本类型（也称为原始类型）: `undefined`、`null`、`boolean`、`number`、`string`和`symbol`

- 引用类型：

  - `Object`、`Array`、`Function`、`Set`、`Map`【`object`是所有引用类型的基类】

  - 包装类型
  
    Boolean、Number、String 。这几种包装类型我们一般不是使用，而是使用字面量创建值，当对应的基本类型的字面量，使用`.`方法调用相关属性和方法时，就在背后自动创建
  
    ```js
    console.log("hello".length); //5 
    //本质：包装类String("hello")，创建了string对象
    ```
  
  - 内置的工具类型
  
    Data（时间相关）、Math（数学计算相关）、RegExp（正则相关）
  
  - Bom对象（浏览器）
  
    Window 对象、Navigator 对象、Screen 对象、History 对象、Location 对象、存储对象【由sessionStorage对象 和 localStorage对象组成】
  
   - Dom对象（网页文档）
  
   - Html对象
  

**两大数据类型的区别:**

* 基本类型

  * 占用空间固定，保存在**栈中**（当一个方法执行时，这个方法就会建立自己的内存栈，在这个方法内定义的变量将会逐个放入这块栈内存里，随着方法的执行结束，这个方法的内存栈也将会销毁）

    

  * 变量保存的是值本身

* 引用类型：

  * 占用空间不固定，保存在**堆中**（因为对象的创建成本通常较大，所以当程序中创建的对象将被保存到堆内存，以便反复利用。堆内存中的对象不会随方法的结束而销毁，即使方法结束后，这个对象还可能被另一个引用变量所引用，只有当一个对象没有任何引用变量引用它时，系统的**垃圾回收机制**才会在核实的时候回收它。）

    

  * 变量保存的是指向对象的一个指针

1、基本类型的属性和方法

### 变量类型的确定

因为 JS 中没有类型检查，所以经常接收到某个变量时，需要判断变量类型时，如果变量是预期的类型才进行操作，常用 if 来进行流程控制

```js
if (typeof a === "number") {
  //a如果是数字，才执行操作（逻辑一般写在这里）
} else {
  //不是数字，就另一种处理方式
}
```



**基本类型**

基本类型中，只有 null 类型检测不出来，无法区分`null`和`object`

```js
var b = null;
console.log(typeof b); //object ,所以使用typeof是判断不出来null的
```

但是，null 类型，只有一个值 null，我们可以直接使用 `===`来判断

```js
let a = null;
console.log(a === null); //true

//undefined同理（推荐使用===,而不是typeof）
let a = undefined;
console.log(a === undefined);
```

其他基本类型都可以用`typeof`

```js
var a = undefined; //undefined
console.log(typeof a === "undefined"); //true

var c = true; //布尔值
console.log(typeof c === "boolean"); //true

var d = 9; // 数值
console.log(typeof d === "number"); //true
//--------NaN属于number类型---------
var e = NaN; // 数值
console.log(typeof e === "number"); //true
//-----------------------------

var str = "hehehe"; // 字符串
console.log(typeof str === "string"); //true

var f = Symbol();
console.log(typeof f === "symbol"); //true
```

**引用类型**

引用类型本质都是 object 类，其中只有 function 能用`typeof`检测出来

```js
var h = function () {};
console.log(typeof h === "function"); //true
```

数组使用`instanceof`

```javascript
console.log(typeof []); //object

console.log([] instanceof Array); //true
```

如何判断除去数组和函数的其他对象呢？

```text
因为null、array的typeof返回值都是object,所以没法用typeof的值是否为"object"区分
```

```js
console.log(typeof a === "object" && a !== null && a instanceof Array);
```

令人迷惑的一点是，`typeof`用未声明变量，不仅不会报错，还能返回 undefined。

```javascript
console.log(j); //ReferenceError: a is not defined
console.log(typeof j); //undefined
```

### 基本变量类型

#### undefined类型

`undefined`类型只有一个值，就是`undefined`。强调下，`undefined`是一个值，而不是报错，报错是`Error`对象

**字面量赋值**

```js
let a = undefined;
```

**其他情况下产生的 undefined**

- 声明但未赋值的变量的默认值为`undefined`, 注意区分下，打印声明但未赋值的变量值为`undefined`，打印未定义变量则会报错

  ```javascript
  let a;
  console.log(a); //undefined

  console.log(b); //ReferenceError: b is not defined
  ```

- 数组。令人迷惑的是，在其他语言中访问不存在的数组索引，必然报数组越界的错误，而 js 不会报错，而是返回值`undefined`

  ```javascript
  let a = [];
  console.log(a[0]); //undefined
  ```

- 对象，这个也十分令人迷惑

  ```javascript
  let stu = {};
  console.log(stu.name); //undefined
  
  console.log(stu.name.firstName); //TypeError: Cannot read properties of undefined (reading 'firstName')
  ```

#### null类型

`null`类型只有一个值，就是`null`。

**补充**：

null 可以理解为一个空值，其他文章中常常将 null 理解为空对象，这是错误的

是使用typeof判断其类型，返回值是`object`，是一个历史悠久的 bug，在 js 的最初版本中使用的是 32 位系统，为了性能考虑使用低位存储变量的类型信息，000 开头代表是对象，然而 null 表示为全零，所以将它错误的判断为 object。虽然现在的[内部类](https://so.csdn.net/so/search?q=内部类&spm=1001.2101.3001.7020)型判断代码已经改变了，但这个 Bug 却是一直流传下来。

我们在声明一个对象时，一般将该对象使用初始化为`null`

**字面量赋值**

```js
let a = null;
```

**其他**

由于`undefined`值是由`null`值派生而来的，因此 ECMA-262 将它们定义为表面上相等:

```javascript
console.log(null == undefined); //true

console.log(null === undefined); //false
```

￼ 所以，推荐一定要使用`===`和`!==`，因为`==`和`!=`会将等号两边做一个隐式转换，全部转换为数字，再进行比较

#### boolean类型

`boolean`类型包含两个值：true，false

**字面量赋值**

```js
let a = true;

let b = false;
```

**构造函数创建**

使用Boolean包装类创建的是一个对象，所以 typeof 是 object ，我们通常不使用这种方式

```js
let a = new Boolean(true);
console.log(typeof a); //object
```

**类型包含的值**

`boolean`类型包含两个值：true，false，可以直接判断

```javascript
let a = true;
if (a === true) {
  
}else{
  
}
```

不能用以下的方式，因为对变量判断真假时，会将变量隐式转换为对应的布尔值。非布尔值，也会被判断为真或者假

```javascript
let a = true;
if (a) {
  
} else {
  
}
```

这份表格是不同类型变量转化为布尔值的对应关系

![image-20220123003108421](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/%E8%B8%A9%E5%9D%91/image-20220123003108421%20.png)

总结下：以下 6 个值转化为布尔值，均是 false。其他均是 true，尤其注意[]和{}都是 true

- `Number`类型中的`0`，`NaN`
- `String`类型中的`""`
- `Null`类型中的`null`，
- `undefined`类型中的 undefined，
- `Boolean`类型中的 false

#### number类型

`number`类型包含`NaN`、0 和其他数字

**字面量赋值**

```js
let a = 1;
```

Number包装类创建

```js
let a = new Number(1);
console.log(typeof a); //object
```

**存储**

由于存储浮点数需要占用较大的空间，所以 js 尽可能将浮点数存储为整数

当数字很大或很小时，会转化为科学记数法存储

```javascript
let num1 = 1; // 当成1处理
let num2 = 10.0; // 当成10处理
```



**Infinity/-Infinity**

当数字超过浏览器限制的最大/最小值后，数字就会变成 `Infinity`￼/`-Infinity￼`

比如：除数和被除数都是 0

```javascript
console.log(5 / 0); // Infinity￼
console.log(-5 / 0); // -Infinity￼
```

无穷是数字，所以是可以继续运算的，只不过结果也一定是无穷

```javascript
console.log((-5 / 0) * -2); // Infinity￼
```

可通过`Number.MAX_VALUE`和`Number.MIN_VALUE`获取浏览器的数字的最大和最小值

```javascript
console.log(Number.MAX_VALUE);
console.log(Number.MIN_VALUE);
```

通过`isFinite()`判断运算的结果是否超过最大和最小值，返回值为布尔值，正常范围的数字返回`true`

```javascript
console.log(isFinite(2.31)); //true

console.log(isFinite(Infinity)); //false
console.log(isFinite(-Infinity)); //false
console.log(isFinite(NaN)); //false
```



**NaN**

`NaN`表示返回数字的操作失败了（一般语言会报错，而 js 不会报错）

哪些操作会导致产生`NaN`呢？

- 除数和被除数都是 0

  ```javascript
  console.log(0 / 0); // NaN￼
  ```

- 数字计算式中，某一步出现了`NaN`，所有的运算的结果都是`NaN`

  ```javascript
  console.log(3 + NaN); //NaN
  ```

- 内置函数返回

  ```javascript
  console.log(parseInt("a2")); //NaN
  ```

`NaN`不等于包括 NaN 在内的任何值，无论是使用`==`还是`===`

```javascript
console.log(NaN === NaN) //false
```

***isNaN()***

判断变量是否是NaN

这个函数会使用`Number()`把参数转变为数值，其中转化为NaN的返回true

因为`Number()`的缺陷，所以可以参照表格中第二列，查看哪些类型的参数会被错误的认定为数字(即，返回 false)

```javascript
console.log(isNaN(null));
console.log(isNaN(""));
console.log(isNaN(true), isNaN(false));
console.log(
  isNaN([]),
  isNaN([undefined]),
  isNaN([null]),
  isNaN([3]),
  isNaN(["3"])
);
```

***Number()***

转化结果参照`变量转化为数字`表

`Number`的缺陷是，`Number`会将各种的变量类型转化为数字，十分可能造成运算结果的错误。比如，将`true`转化为 1，将`""`转化为 0 等

***parseInt()***

参数不是字符串时，使用`Number()`转化为数字后，再取整数部分。

当参数是字符串时，不是`Number()`转化的，而是直接按照从左到右的顺序一位一位的转换为数字
- 如果遇到空格或 0，直接忽略
- 直到遇到负号或第一非 0 数字，才开始转化
- 直到遇到非数字的字符或到了字符串结尾，才停止转化，然后返回转化结果

```javascript
//情况一：从左到右遇到非数字结束
console.log(parseInt("11a")); //11
console.log(parseInt("12.3")); //12
```

注意：以下两种情况的例子

当参数是空字符串时

```javascript
Number('') //返回0
console.log(parseInt("")); //NaN
```

当参数是空数组

```javascript
Number([]) //0
console.log(parseInt([])); //NaN
```



`parseInt`的缺陷大部分与`Number`相同，会将各种的变量类型转化为数字，造成计算的错误。
再加一点是会错误的把例如`11a`这种字符串转化为数字`11`，如果运算中出现了`11a`，js 仍然不会报错，而是当成`11`继续去计算，而`Number`不会有这种问题

***parseFloat()***

基本与`parseInt`相同，只是从左到右转化字符串时，遇到第一个`.`不会结束，还会继续向右转化数字

```javascript
//情况一：从左到右遇到非数字结束
console.log(parseFloat("11a")); //11
console.log(parseFloat("12.3")); //12.3
console.log(parseFloat("12.3.4")); //12.3

//情况二：Number('')返回0
console.log(parseInt("")); //NaN
```

**总结**

最佳实践：有时候使用后端返回的字段进行计算数据时，万一出现了非数字部分，很容易出现错误。

这里使用`Number`转化，因为`parseInt('123a')`的结果是`123`，这回使的计算式按照错误的值去计算；但是`Number("")`会转化为`0`,这是错误的，需要排除 `""`

```javascript
let str=""//通过外部传入，可能是各种类型

if(typof str===string && str!=="" && !isNaN(Number(str)*2)){
  //如果运算的结果是正常的数字，就会执行到这里
}else{

}

//使用这个更好，甚至数字超出最大值/最小值都能规避掉
if(typof str===string && str!=="" && isFinite(Number(str)*2)){

}else{

}
```

**toFixed**

将数字转换为字符串，并保留指定位数的小数位

toFixed的保留方式不是四舍五入，而是**银行家舍入规则**

* 四舍
* 六入
* 五考虑 :
  * 五后非零就进一
  * 五后为零看奇偶，五前为偶应舍去，五前为奇要进一

```js
5.426.toFixed(2) //'5.43'
```

**如何实现四舍五入**

Math的round是遵循四舍五入的，但是这能保留整数，所以需要做处理

```js
function myRound(num,n){ //将num保留n位
  let multiple=Math.pow(10,n)
  Math.round(num*multiple)/multiple
}
```



#### string类型

`String`类型包含`""`、其他字符串

**字面量赋值**

ES 标准中对于字符串使用不同引号是没有区别的

```js
let str1 = "hello";
let str2 = "hello";
let str3 = `hello`;
```

使用`String()`包装类型

```js
let str = new String(1);
console.log(typeof str); //object
```

ES 标准中的字符串是不可变的，一旦创建，它们的值就不能变了。要修改某个变量的字符串值，必须先销毁原始的字符串，然后将包含新值的另一个字符串保存到该变量

```js
let str = "hello";
str = str + " world"; //原来的hello会被销毁，从新分配内存空间给 hello world
```

**str.length**

字符串字节个数，一个汉字/字母/数字/空格算一个字符

```js
console.log("hello world".length); //11
```

**str.toString()**

将变量`str`转化为 ￼ 字符串，除了`undefined`和`null`以外，将其他类型原模原样的转过去

```js
let a = true;
console.log(a.toString()); //true

let b = 2;
console.log(b.toString()); //2

let c = "hello";
console.log(c.toString()); //hello

let d = [1, 2, 3];
console.log(a.toString()); //1,2,3   就是直接数组元素组成的字符串

let e = {};
console.log(e.toString()); //[object Object]
```

这个方法有缺陷，当变量是`undefined`和`null`没有`toString()`方法，会抛出错误，所以如果不确定变量的值，更推荐使用`String()`

```js
console.log(null.toString()); //TypeError: Cannot read properties of null (reading 'toString')

console.log(undefined.toString()); //TypeError: Cannot read properties of undefined (reading 'toString')
```

**String()**

解决`toString()`的缺陷，除了这两个以外，其他的类型都有`toString()`方法，所以其他的类型会调用`toString()`

```js
console.log(String(undefined)); //undefined
console.log(String(null)); //null
```

**模版字面量**

- 可以直接把**变量**或**表达式**放入${ }中，不必拼接字符串
- 可以折行，不必写在一行上，但是字符串显示也相应换行

```js
let title = "标题";
let content = "内容";

//过去的写法，拼接字符串，麻烦，而且不能折行写
let str = "这里是" + title + ",那里是" + content;
//字符串模板
let str2 = `这里是${title},那里
是${content}`;

console.log(str);
console.log(str2);

//输出
//这里是标题,那里是内容
//这里是标题,那里
//是内容
document.write(str2); //网页上输出：这里是标题,那里 是内容
//字符串即使有多个连续的空格，在网页中也只是有1个空格,网页想要有多个空格用多个&nbsp;
```

`${}`甚至可以放函数

```js
//${}中可以放表达式
var a = `www.${3 + 1}`;
console.log(a); //www.4
```

注意：`${a}`显示变量 a，相当于`String(a)`函数

```js
console.log(`${undefined}`); //undefined
console.log(`${null}`); //null
```

**标签函数**

```js
var name = "hedaodao";
var age = 20;
tag`你好我是${name},年龄${age}。`; //字符串前，加一个标记，可以是tag也可以是其他什么名字
function tag(string, name, age) {
  //函数名是标记名，第一个参数string，接收除变量的部分
  console.log(string);
  console.log(name, age);
}
//输出
//["你好我是", ",年龄", "。", raw: Array(3)]
//hedaodao 20

//注意:函数的第一个参数string，接收除变量的部分，如果字符串是 tag`${name}` ,返回的是["",""],即使变量前后没有字也会返回
```

#### symbol(内容太晦涩，暂时整理部分)

Symbol（符号）是 ES 6 新增的数据类型。符号是原始值，且符号实例是唯一、不可变的。符号的用途是确保对象属性使用唯一标识符，不会发生属性冲突的危险。

`Symbol`没有字面量语法，必须使用`Symbol()`来创建，且不能使用`new`关键字来创建`symbol`对象，创建方式：

一、普通符号

即使描述相同也不相等

```js
//创建两个Symbol
let a = Symbol();
let b = Symbol();
console.log(a === b); //false

//创建带描述的Symbol
let c = Symbol("张三");
let d = Symbol("张三");
console.log(c === d); //false
```

二、全局符号

描述相同的符号相等，原因看下面的原理

**Symbol.for（String）**

参数会使用使用 `String()` 转化为字符串【前面讲过这个方法没缺陷，可以转`null`和`undefined`为字符串`"null"`和`"undefined"`】

原理：`Symbol.for`会对每个字符串键都执行以下操作。在全局运行时注册表中查找参数字符串对应的`Symbol`，找不到就会生成一个新`Symbol`实例并添加到全局注册表中。找的到，就会返回该`Symbol`实例。

```js
let c = Symbol("张三");
let d = Symbol.for("张三");
let e = Symbol.for("张三");
console.log(c === d); //false  普通和全局即使描述相同，相等
console.log(d === e); //true   全局只有一个"张三"实例，所以相等
```

**Symbol.keyFor（Symbol）**

查找全局注册表中，是否存在传入的`Symbol`参数，如果找到了，返回该`Symbol`的描述；没找到，返回`undefined`【参数为`Symbol`，返回值是`Symbol`的描述（输入其他类型参数，会抛出异常`TypeError: xxx is not a symbol`）】

```js
let a = Symbol("123");
let b = Symbol.for("456");

console.log(Symbol.keyFor(a)); // undefined
console.log(Symbol.keyFor(b)); // 456
```

**实践**

班级统计成绩时，重名很常见，如果重名的话，对象中重名的 key 会被覆盖

```js
let user1 = "张三";
let user2 = "张三";
let grade = {
  //对象中使用变量，需要用中括号括起来，key就成了"张三"和"李四"，否则key为user1和user2
  [user1]: { math: 80, english: 60 },
  [user2]: { math: 60, english: 70 },
};
console.log(grade); //输出张三: {math: 60, english: 70}

//解决
let user1 = {
  key: Symbol(),
  name: "张三",
};
let user2 = {
  key: Symbol(),
  name: "张三",
};
let grade = {
  [user1.key]: { math: 80, english: 60 },
  [user2.key]: { math: 60, english: 70 },
};
console.log(grade);
//输出
//Symbol(): {math: 80, english: 60}
//Symbol(): {math: 60, english: 70}
```

取出 Symbol 类型的 key

```js
let symbol = Symbol("这是一个字符串");
let obj = {
  name: "张三",
  age: 20,
  [symbol]: "abcde",
};
for (let key in obj) {
  console.log(key);
} //输出name age .不会输出[symbol]

//使用Reflect.ownKeys(obj)解决
for (let key of Reflect.ownKeys(obj)) {
  console.log(key);
} //输出 name age Symbol(这是一个字符串)

////这样可以保护内部私有属性
let school = Symbol("这是一个Symbol");
class Student {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    this[school] = "实验小学";
  }
  getName() {
    return `${this[site]} ${this.name}}`;
  }
}
let stu = new Student("李四", 20);
for (const key in stu) {
  console.log(key);
} //输出 name age ,可以看出来即使遍历对象的key，symbol类型的school不会显示出来
```

## 变量类型隐式转换

发生隐式转换的场景

```text
情况一： 使用if判断变量时
if(a)  //将变量转化为布尔值

情况二：进行比较时
a===b //将左右变量都转化为布尔值

情况三：使用&&和||运算符时，会将运算值转化为布尔值


情况四：三元表达式  a?b:c  中，a的值会转化为布尔值
```



- 变量转化为布尔值

  ![image-20220123003108421](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/%E8%B8%A9%E5%9D%91/image-20220123003108421%20.png)

- 变量转化为数字

  与`Number()`的效果相同

  | 类型      | 数字                                                                                                                                                          | NaN                                                                                                                              |
  | :-------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
  | Undefined |                                                                                                                                                               | undefined 转化为 NaN                                                                                                             |
  | Null      | null 转化为 0                                                                                                                                                 |                                                                                                                                  |
  | String    | "2"，"4"，"1.2"，"-3.5"等纯整数/浮点数/正负数的字符串转化为对应数字，转化时会忽略最前面的 0 和空格，比如：" 00012"，转化为 12<br />""会转化为 0               | 其他情况都是 NaN，比如混合着字母的字符串"123a","a123"                                                                            |
  | boolean   | true 转化为 1；false 转化为 0                                                                                                                                 |                                                                                                                                  |
  | Number    | 所有具体数字转化为自身；（包括：Infinity、-Infinity 分别转化为 Infinity、-Infinity）                                                                          | NaN                                                                                                                              |
  | Array     | []转化为 0<br />[null]转化为 0<br />[undefined]转化为 0<br />["3"]等只含有一个数字的数组会转化为对应数字<br />[3]等只含有一个数字字符串的数组会转化为对应数字 | 其他情况都是 NaN<br />所有其他情况：元素是布尔值[true]/[false] <br />数组中有多个元素的，无论是什么元素，均为 NaN，比如[1，2，3] |
  | Object    |                                                                                                                                                               | 所有对象，包括{}                                                                                                                 |

  这里注意下，`parseInt('123a')`的结果是`123`，当你不确定数据的具体形式时，这会带来很大的潜在问题。所以转换数字使用`Number()`，`Number('123a')`会直接返回`NaN`

## 函数

### 函数的声明

函数也是一种类型，它使用function关键字声明

* 使用标准函数声明来定义函数（命名函数，函数名是func1）

  ```javascript
  function func1(){
      //函数体
  } 
  func1()
  ```

* 声明匿名函数

  ```javascript
  let a=function(){
  	//函数体
  } 
  a()
  ```

  箭头函数：一种匿名函数的简写

  ```javascript
  function(参数){函数体} 
  
  //对应
  
  (参数)=>{函数体}
  ```

  注意：

  * 如果只有一个参数，()可以省

    ```javascript
    param=>{//只有一个参数param}
    ```

  * 如果只有一行，return和{}可以省

    ```js
    (x,y)=>x+y  //当返回是一个return时，可以省略，函数体就是x+y
    
    //对应
    
    function(x,y){
    	return x+y
    }
    ```

* 把函数当成构造函数 **详见【new关键字】章节**

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

**函数声明存在的问题**

覆盖window对象中的属性

这种方式定义函数，函数会压入到window对象中，一旦window对象中有同名属性，会把window对象的该属性覆盖掉

```javascript
function func(title){
    console.log(title)
} 
func("你好")//输出 你好
window.func("你好")//输出 你好
```

### 函数参数

**形参与实参**

JS中函数是把实参赋值给形参

注意：

* 如果实参是基本类型，改变形参，肯定不会影响实参

  ```js
  let a=1
  function show(a){
    a=a+100
  	return a
  }
  show(a)//输出 101
  console.log(a)//输出 1
  ```

* 如果实参是引用类型，形参接收到的是实参的存储地址，所以操作形参的属性，肯定会影响实参

  ```js
  function show(a){
      a.age=20
  }
  let user={name:"张三"}
  show(user)
  console.log(user)//输出 {name: "张三", age: 20}
  ```

* 当实参个数>形参个数，多余的实参会被略去

  ```js
  function mySum(a,b){
   return a+b
  }
  console.log(mySum(1,2,3)) //输出 3
  ```

**定义默认参数**

```js
//定义函数带有默认参数，传入就按传入的值，不传就按默认
function show(a,b=5,c=7){
	console.log(a,b,c)
}

show(1)// 输出1,5,7
show(1,2,3)// 输出1,2,3
```

**接收多个形参**

* arguments对象（不建议使用）

  ```javascript
  function func(){
      console.log(typeof arguments)//arguments对象。里面包含着传进来的参数
       for(let i=0;i<arguments.length;i++){//arguments对象可以使用下标取值
          console.log(arguments[i])
      }
  }
  func(1,2,3)// 输 1 2 3
  ```

* 解构赋值（详见，后面**【解构赋值】章节**）

  ```javascript
  function func2(...args){ //args就是个数组
      console.log(args)
  }
  func2()//输出[1,2,3]
  ```

### 函数提升

* 使用标准函数声明，会有函数提升现象

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


### new关键字

用new关键字调用函数会返回一个对象，如果一个函数使用new调用，我们称为构造函数

注意：

* 以下涉及的this指向问题，会在**【this的指向】章节**详细介绍

* 以下涉及的原型链问题，会在**【原型链】章节**详细介绍

例如

```js
function fun() {  
    this.a = 3;
    this.b = 5;
}
var obj = new fun();
console.log(obj); //
```

原理过程是：

```javascript
function fun() {  
	//1 .在函数体开头，自动创建了一个空白对象{}
	//2 .this指向这个空白对象
  //3 .执行函数体中的语句
    this.a = 3;
    this.b = 5;
  //4 .
  // 情况一：函数没有return，或者"return;"、"retrun 基本类型;"，则直接忽略原本的return。返回自动创建的那个对象
  // 情况二：如果 return 返回的是一个对象，则返回这个对象。忽略自动创建的这个对象
  
}
var obj = new fun();
console.log(obj); //{a: 3, b: 5}
```

实际使用：

* 通过传入参数，返回不同对象
* 约定函数名首字母大写

```js
function Student(name,age){
    this.name = name;
    this.age = age;
}
console.log(new Student('jack',18)) // { name: 'jack', age: 18 }

console.log(new Student('tom',19)) //{ name: 'tom', age: 19 }
```

为对象添加函数

* 在构造函数内添加一个函数作为对象的属性
* 通过**原型链**（prototype）添加函数/属性

```js
function Student(name,age){
    this.name = name;
    this.age = age;
    this.getName = ()=>{
        return this.name
    }
}
Student.prototype.getAge =function (){ //一定要注意，这里不能用箭头函数，否则其中的this指向了全局的window
    return this.age
}


let stu1=new Student('jack',18) 
console.log('stu1 --> ',stu1.getName(),stu1.getAge()) //stu1 -->  jack 18
```



### 立即执行函数

立即执行函数`(这里放函数声明)()`

立即执行函数，执行完毕后立即销毁，所以即使，使用了var关键字，仍然不会污染全局window变量

```javascript
(function (str) {
    console.log(str);
    var web = 'houdunren';
})("hello"); //这里把hello传给内部的str参数

console.log(web); 
//hello
//web is not defined

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

## 对象(待完成)

**赋值**

字面量赋值(常使用)

```js
let b='爱好'
let a={
  name:'jack' 
  'l-name':'tom'  //注意key为短横线的值时，必须用引号印起来
  [b]:'唱歌'       //变量用中括号，括起来
  getDate(){
    //函数体
  }
};
```

存取

* 点方法

  点后跟着的是key值，不是变量

  ```js
  let obj={name:'jacck'}
  obj.name=1
  ```

* 中括号

  ```js
  let obj={}
  
  //指定key为a
  obj["a"]=1
  
  //指定key为变量
  let b="name"
  obj[b]
  ```

删除

```js
let obj={name:'jacck' ,age:19}
delete obj.name
console.log(obj) //{ age: 19 }
```

### 对象的方法

静态方法

| 方法           | 描述                                                         |
| -------------- | ------------------------------------------------------------ |
| keys()         | 返回所有key组成的数组                                        |
| values()       | 返回所有value组成的数组                                      |
| entries()      | 返回所有[key,value]组成的数组                                |
| assign         | 合并对象，返回合并后新的对象                                 |
| hasOwnProperty | 判断是否存在某属性，返回布尔值                               |
| freeze         | **冻结**一个对象。该对象不能被修改，即不能添加新的属性，不能删除已有属性，不能修改属性的值。此外，冻结一个对象后该对象的原型也不能被修改 |

```js
let obj={name:'jack',age:12}
Object.keys(obj) //['name', 'age']
Object.values(obj) //['jack', 12]
Object.entries(obj) //[['name':'jack'], ['age',12]]
```

assign

```js
let res=Object.assign({},{name:"jack"},{age:18}) 
console.log(res)//{name: 'jack', age: 18}
```

hasOwnProperty 

```js
let obj={
    name:'jack',
    age:19
}
console.log(obj.hasOwnProperty('name')) //true    //注意参数带引号
```

freeze

```js
const obj = {name:'jack'};

Object.freeze(obj);

obj.name = 33; // TypeError:Cannot assign to read only property 'name' of object
```



## 数组对象

### 声明数组

```js
//方式一：对象的方式
const arr=new Array("A","B","C")
console.log(arr)//输出 ["A", "B", "C"]

//方式二：字面量方式(常用)
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

### 数组对象的属性和方法

数组属性

| 属性                                                         | 描述                             |
| :----------------------------------------------------------- | :------------------------------- |
| [constructor](https://www.runoob.com/jsref/jsref-constructor-array.html) | 返回创建数组对象的原型函数。     |
| [length](https://www.runoob.com/jsref/jsref-length-array.html) | 设置或返回数组元素的个数。       |
| [prototype](https://www.runoob.com/jsref/jsref-prototype-array.html) | 允许你向数组对象添加属性或方法。 |

Array 对象方法

| 方法                                                         | 描述                                                 |
| ------------------------------------------------------------ | ---------------------------------------------------- |
| **静态方法**                                                 |                                                      |
| [isArray()](https://www.runoob.com/jsref/jsref-isarray.html) | 判断对象是否为数组                                   |
| [from()](https://www.runoob.com/jsref/jsref-from.html)       | 通过给定的对象中创建一个数组                         |
| **操作数组元素——>增删**                                      |                                                      |
| [pop()](https://www.runoob.com/jsref/jsref-pop.html)         | 删除数组的最后一个元素，返回删除的元素               |
| [push()](https://www.runoob.com/jsref/jsref-push.html)       | 向数组的末尾添加一个或更多元素，返回新的长度         |
| [shift()](https://www.runoob.com/jsref/jsref-shift.html)     | 删除，返回数组的第一个元素                           |
| [unshift()](https://www.runoob.com/jsref/jsref-unshift.html) | 向数组的开头添加一个或更多元素，返回新的长度         |
| [splice()](https://www.runoob.com/jsref/jsref-splice.html)   | 从数组中添加或删除元素，返回被删除的元素的组成的数组 |
| [copyWithin()](https://www.runoob.com/jsref/jsref-copywithin.html) | 从数组的指定位置拷贝元素到数组的另一个指定位置中     |
| **操作数组元素——>顺序**                                      |                                                      |
| [reverse()](https://www.runoob.com/jsref/jsref-reverse.html) | 反转数组的元素顺序，返回值也是反转后的数组           |
| [sort()](https://www.runoob.com/jsref/jsref-sort.html)       | 对数组的元素进行排序                                 |
| **不操作数组元素——>返回查找**                                |                                                      |
| [includes()](https://www.runoob.com/jsref/jsref-includes.html) | 判断一个数组是否包含一个指定的值。                   |
| [indexOf()](https://www.runoob.com/jsref/jsref-indexof-array.html) | 从前到后查找数组中的元素，返回它第一次出现位置的索引 |
| [lastIndexOf()](https://www.runoob.com/jsref/jsref-lastindexof-array.html) | 从后到前查找数组中的元素，返回它第一次出现位置的索引 |
| [findIndex()](https://www.runoob.com/jsref/jsref-findindex.html) | 返回符合传入函数条件的数组元素的索引                 |
| [find()](https://www.runoob.com/jsref/jsref-find.html)       | 返回符合传入函数条件的数组元素                       |
| **不操作数组元素——>返回截取部分**                            |                                                      |
| [slice()](https://www.runoob.com/jsref/jsref-slice-array.html) | 选取数组的一部分，并返回一个新数组                   |
| **不操作数组元素——>返回拼接**                                |                                                      |
| [join()](https://www.runoob.com/jsref/jsref-join.html)       | 把数组的所有元素放入一个字符串                       |
| [concat()](https://www.runoob.com/jsref/jsref-concat-array.html) | 连接两个或更多的数组，并返回结果                     |
| **不操作数组元素——>遍历处理结果**                            |                                                      |
| [filter()](https://www.runoob.com/jsref/jsref-filter.html)   | 检测数值元素，并返回符合条件所有元素的数组           |
| [map()](https://www.runoob.com/jsref/jsref-map.html)         | 通过指定函数处理数组的每个元素，并返回处理后的数组   |
| [some()](https://www.runoob.com/jsref/jsref-some.html)       | 检测数组元素中是否有元素符合指定条件                 |
| [every()](https://www.runoob.com/jsref/jsref-every.html)     | 检测数值元素的每个元素是否都符合条件                 |
| [reduce()](https://www.runoob.com/jsref/jsref-reduce.html)   | 将数组元素计算为一个值（从左到右）                   |
| [reduceRight()](https://www.runoob.com/jsref/jsref-reduceright.html) | 将数组元素计算为一个值（从右到左）                   |
| **其他**                                                     |                                                      |
| [fill()](https://www.runoob.com/jsref/jsref-fill.html)       | 使用一个固定值来填充数组                             |

注意：js中数组的方法最为丰富，所以几乎所有类型都可以转化为数组进行处理，处理结束后再转化回去

### 补充下

数组方法中出现的index参数都是可正可负，为负数时，例如：-1代表倒数第一个元素，即索引为（ length-1）

### 清空数组

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

### isArray  

```js
console.log(Array.isArray([]))//输出true

console.log([] instanceof Array)//输出true
```

### from

Array.from用来将可迭代对象转化为数组

内置的字符串、数组、对象都是可迭代对象，可以使用通用的方法遍历其内部。详见【可迭代对象】章节

如果观察过一些框架的内置对象的话，你会发现他们很少使用数组，而是使用一种**类数组的对象**

**类数组的对象**如下，这种对象key是索引，而且有一个length属性表示长度

```js
let obj={
    1:'jake',
    0:'tom',
    length:2
}
```

我们可以把**类数组的对象**当成对象来处理，而需要使用数组方法时，又可以通过`Array.from`转化为数组

转化的数组长度就是length的数值，按照key的值作为索引放置

```js
console.log(Array.from(obj)) // [ 'tom', 'jake' ]
```



### 操作数组元素——>增删

pop、push、shift、unshift（略）

**splice（index[,howmany][,item1,item2,...itemX）**

替换指定位置的元素

* 参数：
  * index 开始索引
  * howmany 替换的元素个数，不传递默认为从index到数组最后一位
  * item1....itemX 最后替换为这些值 （howmany给值，这些参数才能传递）

* 返回值：选取元素组成的数组（数组发生变化，是替换后的新数组）

```js
let arr=["A","B","C","D"]
//删除
console.log(arr.splice(0,2))//["A", "B"]
console.log(arr)//["C", "D"]

//替换
console.log(arr.splice(0,2,"张三","李四"))//["A", "B"]
console.log(arr)//["张三", "李四", "C", "D"]

//增加
let arr3=["A","B","C","D"]
console.log(arr3.splice(1,0,"张三"))//[]
console.log(arr3)//["A", "张三", "B", "C", "D"]
```

**copyWithin（target[, start, end]）**

将指定范围的元素复制后，***覆盖***到数组的其他位置（注意：复制的元素如果超出了数组长度，则只覆盖处在数组长度范围内的元素）

* 参数
  * target 目标位置索引
  * start 复制的开始位置索引
  * end 复制的结束位置的下一位索引
* 返回值：覆盖后的结果（原数组发生变化和返回值相同）

```js
//复制了b、c、d，到e的位置，b覆盖了e，剩下的c、d超出了数组范围
let arr=["a","b","c","d","e"]
console.log(arr.copyWithin(4,1,3))//[ 'a', 'b', 'c', 'd', 'b' ]
console.log(arr)//[ 'a', 'b', 'c', 'd', 'b' ]
```

### 操作数组元素——>顺序

**reverse()**

数组元素反转，返回值也是反转的数组

* 参数：无

* 返回值：前后反转的数组（原数组发生变化和返回值相同）

**sort([function(preValue,nextValue)])**

排序函数，数组元素排序，返回值也是排序后的数组

* 参数：排序规则函数

* 返回值：排序后的数组（原数组发生变化和返回值相同）

```js
let arr=[1,8,3,4]
arr.sort((a,b)=>{ //第一轮，a=8，b=1
    if(a>b){
        return -1 //小于等于0，换
    }else{
        return 1 //大于0，不换
    }
})
//arr是 [ 8, 4, 3, 1 ]
```

简写

```ts
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

### 不操作数组元素——>返回查找

**includes(item[,index])**

从index开始，从前到后，查找数组中是否有item这个元素

* 参数：
  * item 目标查找元素
  * index 查找开始位置索引
* 返回值：布尔值

```js
console.log(arr.includes("a"))//输出true
console.log(arr.includes("a",3))//输出false，从标号为3的位置向右查找
```

**indexOf(item[,index])**

在数组中查找item，首次出现位置的索引

* 参数：

  * item要查找的元素
  * index：从index位置开始查找

* 返回值:

  找到返回元素所在索引，找不到返回-1

```js
let arr=["a","d","a","d"]
console.log(arr.indexOf("a")) //输出0，从左->右查找，找到第一次出现位置的标号，找不到返回-1
console.log(arr.indexOf("a",2)) //第二个参数从角标为2的位置，向右查找
```

**lastIndexOf(item[,index])**

从index位置（默认是数组最后一位），从后向前在数组中查找item，首次出现位置的索引（与indexOf类似）

index的取值范围可正可负

**find(function(currentValue[, index,arr])[,thisValue])**

* 参数

  * function(currentValue[, index,arr])  
  * thisValue

* 返回值

  function一旦返回true，就返回数组中对应的元素，不再查找了；如果结束都没有返回true，则返回undefined

```js
let arr=[{name:'a',age:18},{name:'b',age:19}]
let res=arr.find((item)=>{
    return item.name==='a'
})
console.log(res) //{ name: 'a', age: 18 }
```

**findIndex(function(currentValue[, index,arr]),[thisValue]) **

返回查找到值的索引，找不到返回-1（与find类似）

**试一试**

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

### 不操作数组元素——>返回截取部分

**slice([start,end])**

* 参数：

  * start，开始截取的索引 ，范围可正可负

  * end，结束截取元素的下一个索引，范围可正可负

* 返回值：

  返回被截取元素组成的数组

```js
let arr=["A","B","C","D"]
console.log(arr.slice())//输出["A", "B", "C", "D"]，无参数截取所有
console.log(arr.slice(1))//输出["B", "C", "D"]，截取标号1到最后
console.log(arr.slice(1,3))//输出["B", "C"]，截取：索引1——索引2
```

### 不操作数组元素——>返回拼接

**join**

```js
let arr=["a","b","c"]
console.log(arr.join("-"))  //输出a-b-c
```

补充：字符串拆分成数组

```js
let str="abcdef"
console.log(Array.split())//输出["a", "b", "c", "d", "e", "f"]
```

**concat**

```js
array1.concat(array2,array3,...,arrayX)
let arr2=["e","f","g"]
//方法二，原数组未改变
console.log(arr.concat(arr2))
//方法三，原数组未改变
console.log([..arr,...arr2]
```

### 不操作数组元素——>遍历处理结果

**filter**

检测数值元素，函数返回一个数组。是：当内部函数返回为true时的元素组成的数组。

```js
let arr=["a","b","c"]
let res=arr.filter(function(value,index,arr){
	//value是数组元素
    //index是索引
    //arr是原数组
    //把所有元素都遍历一遍，函数返回所有return为true的数组元素
     if(value=="b") return true
})
console.log(res)//输出["b"]
```

例子

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

**map**

映射。内部函数返回的值组成的数组

```js
let arr=[1,8,3,4]
let res=arr.map((item)=>{
    return {id:item}
})
console.log('res --> ',res) //res -->  [ { id: 1 }, { id: 8 }, { id: 3 }, { id: 4 } ]
```

**every**

检测数值元素的每个元素是否都符合条件。内部函数所有元素都返回true，最后才返回true。如果有一个返回了false，就不会继续向后遍历了，直接返回false

```js
let arr=["a","b","c"]
arr.every((value,index,arr)=>{
	//value是数组元素
    //index是索引
    //arr是原数组
    //函数必须返回布尔值，true，才能继续，否则停止
    console.log(value)
    return true
})
//输出a b c
```

应用

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

**some**

检测数组元素中是否有元素符合指定条件。如果return true，结束函数，整体返回true；如果整个数组遍历完都没有return true，整体返回false

```js
let arr=["a","b","c"]
let res=arr.some((value,index,arr)=>{
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

**reduce(function(preValue, currentValue[, currentIndex, arr]), [initialValue])**

数组中的每个值（从左到右）开始遍历，最终计算为一个值

* 参数：
  * preValue 是上一次循环return的值
  * currentValue 本轮循环的数组的元素
  * currentIndex 本轮循环数组元素的索引
  * arr调用reduce方法的数组

* 返回值：最后一轮return的值

reduce只有第一个参数（函数）时，第一轮循环preValue为数组第一个元素，currentValue为第二个元素

```js
let arr=[1,2,3,4]
let res=arr.reduce(function(pre,value,index,array){
   console.log(pre,value)
   return 99
})
//输出
//1 2
//99 3
//99 4

console.log(res) //99
```

reduce有第2个参数时，第二个参数是指定第一轮preValue的初始值，currentValue从数组的第一个元素开始

```js
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

console.log(res) //99
```

应用场景1

```js
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

应用场景2

```js
//找最大值
let arr=[6,2,9,4]
let res=arr.reduce(function(pre,cur){
   return cur>pre?cur:pre
})
console.log(res)
```

应用场景3

```js
//求总和
let arr=[1,5,3,8,6]
let res=arr.reduce(function(pre,cur){
	return pre= pre+cur  
})
console.log(res)
//输出23
```

**reduceRight**

与reduce一样，只不过方向是从右向左

## 字符串对象

### 数组对象的属性和方法

属性

| 属性                                                         | 描述                       |
| :----------------------------------------------------------- | :------------------------- |
| [constructor](https://www.runoob.com/jsref/jsref-constructor-string.html) | 对创建该对象的函数的引用   |
| [length](https://www.runoob.com/jsref/jsref-length-string.html) | 字符串的长度               |
| [prototype](https://www.runoob.com/jsref/jsref-prototype-string.html) | 允许您向对象添加属性和方法 |

静态方法

| 方法                                                         | 描述                    |
| ------------------------------------------------------------ | ----------------------- |
| [fromCharCode()](https://www.runoob.com/jsref/jsref-fromcharcode.html) | 将 Unicode 编码转为字符 |

方法

| 方法                                                         | 描述                                                         |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| **不操作字符串**                                             |                                                              |
| [toLowerCase()](https://www.runoob.com/jsref/jsref-tolowercase.html) | 把字符串转换为小写                                           |
| [toUpperCase()](https://www.runoob.com/jsref/jsref-touppercase.html) | 把字符串转换为大写                                           |
| [trim()](https://www.runoob.com/jsref/jsref-trim.html)       | 去除字符串两边的空白                                         |
| **不操作字符串——>判断字符串是否符合**                        |                                                              |
| [charAt()](https://www.runoob.com/jsref/jsref-charat.html)   | 返回在指定位置的字符。                                       |
| [charCodeAt()](https://www.runoob.com/jsref/jsref-charcodeat.html) | 返回在指定的位置的字符的 Unicode 编码。                      |
| [startsWith()](https://www.runoob.com/jsref/jsref-startswith.html) | 查看字符串是否以指定的子字符串开头。                         |
| [endsWith()](https://www.runoob.com/jsref/jsref-endswith.html) | 判断当前字符串是否是以指定的子字符串结尾的（区分大小写）。   |
| **不操作字符串——>返回查找**                                  |                                                              |
| [includes()](https://www.runoob.com/jsref/jsref-string-includes.html) | 查找字符串中是否包含指定的子字符串。                         |
| [indexOf()](https://www.runoob.com/jsref/jsref-indexof.html) | 返回某个指定的字符串值在字符串中首次出现的位置。             |
| [lastIndexOf()](https://www.runoob.com/jsref/jsref-lastindexof.html) | 从后向前搜索字符串，并从起始位置（0）开始计算返回字符串最后出现的位置。 |
| **不操作字符串——>返回截取部分**                              |                                                              |
| [slice()](https://www.runoob.com/jsref/jsref-slice-string.html) | 提取字符串的片断，并在新的字符串中返回被提取的部分。         |
| [substring()](https://www.runoob.com/jsref/jsref-substring.html) | 提取字符串中两个指定的索引号之间的字符。                     |
| **不操作字符串——>返回截拼接/分割**                           |                                                              |
| [concat()](https://www.runoob.com/jsref/jsref-concat-string.html) | 连接两个或更多字符串，并返回新的字符串。                     |
| [repeat()](https://www.runoob.com/jsref/jsref-repeat.html)   | 复制字符串指定次数，并将它们连接在一起返回。                 |
| [split()](https://www.runoob.com/jsref/jsref-split.html)     | 把字符串分割为字符串数组。                                   |
| **正则匹配**                                                 |                                                              |
| [match()](https://www.runoob.com/jsref/jsref-match.html)     | 查找找到一个或多个正则表达式的匹配。                         |
| [replace()](https://www.runoob.com/jsref/jsref-replace.html) | 在字符串中查找匹配的子串，并替换与正则表达式匹配的子串。     |
| [replaceAll()](https://www.runoob.com/jsref/jsref-replaceall.html) | 在字符串中查找匹配的子串，并替换与正则表达式匹配的所有子串。 |
| [search()](https://www.runoob.com/jsref/jsref-search.html)   | 查找与正则表达式相匹配的值。                                 |

**长度属性**

JS使用的是UTF-16编码方式

```
str.length //显示的是码元的个数 ，
"😊".length //2 ,因为这个表情是一个码点，但是包含两个码元
```

解决：数组对象的 from 方法，将字符串转化为数组（按照码点）

```javascript
Array.from("😊").length //1
```

## 数组与字符串对比

数组和字符串有很多方法十分相似，这里整理下

| 相同的方法    | 描述                                                        |
| ------------- | ----------------------------------------------------------- |
| includes()    | 判断一个数组/字符串是否包含一个指定的值                     |
| indexOf()     | 从前到后查找数组/字符串中的元素，返回它第一次出现位置的索引 |
| lastIndexOf() | 从后到前查找数组/字符串中的元素，返回它第一次出现位置的索引 |
| slice()       | 截取数组/字符串                                             |
| concat()      | 拼接数组/字符串                                             |

## Set

集合类型，Set的特点是无序、自动去重

### Set声明

创建空集合

```js
let set=new Set()
```

接收可迭代对象，转化为集合

```js
let set1=new Set([1,2,1,3])

let set2=new Set("abcd")
```

### Set 操作

* add  
* delete  删除指定元素，删除成功返回true，若不存在，返回false
* size 返回元素个数
* has 判读是否存在指定元素，存在返回true，否则返回false
* clear() 清空数组，无返回值

```js
let s1=new Set([1,2,1,3])

s1.add(4)
console.log(s1.size) //4
console.log(s1.has(2)) //true

console.log(s1.delete(1))//true

s1.clear()
```

### 类型转换 Set<-->Array

```js
// Set-->Array
let set=new Set(["a","b","c"])
console.log(Array.from(set))
console.log([...set])

// Set<--Array
arr=[1,2,3]
let set=new Set(arr)
consle.log(set) //输出 Set(3) {1, 2, 3}


```

### 应用

取出set中小于3的，把set转为array，处理完，转会set类型

```js
let set =new Set("123456")
let set2=new Set([...set].filter(item=>{
    return item<=3
}))
console.log(set2)//输出 Set(3) {"1", "2", "3"}
```

数组去重

```js
let arr=[1,2,3,4,1,4]
let arr2=[...new Set(arr)]
console.log(arr2) //输出 [1, 2, 3, 4]
```

并集 交集 差集的实现

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

### WeakSet

WeakSet和Set不同的是，WeakSet的键必须是**引用类型**。

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

## Map

### Map的声明

键名可以是字符串，函数，对象，数值

```js
let map=new Map()

let map=new Map([["a",1],["b",2],["c",3]])
console.log(map)
//输出 Map(3) {"a" => 1, "b" => 2, "c" => 3}
```

### Map操作

* set()
* get()  通过key查找value，不存在的key返回undefined
* delete()  删除成功返回true，若map中没有要删除的键名，则返回false
* has()  若键名存在，返回true，否则返回false
* clear() 清空map，没有返回值

```js
let map=new Map()
map.set("a",1)
map.set("b",2)
console.log(map.get("b"))//输出2

console.log(map.delete("b"))//输出true
console.log(map)//输出 Map(1) {"a" => 1}

console.log(map.has("a"))//输出true

map.clear()
console.log(map)//Map(0) {}
```

### 类型转换Map<-->Array

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

### 展开语法

收集不定个数的参数，放入数组中

* 应用在函数参数中

  ```js
  function show(a,b,...args){//...args只能放在最后，接收剩余变量
  	console.log(a,b,...args)//输出 1 2 3 4 5 6
      console.log(args)//输出 [3, 4, 5, 6]，注意这里是把接受的参数放入数组中
  }
  //相当于
  show(1,2,3,4,5,6)// 1给a,2给b，剩余的3，4，5，6被放到...args中 ,args是[3,4,5,6]
  ```

* 应用在结构赋值中 **【结构赋值】中会讲到**

  ```js
  let [first,...second] = ['a','b','c']; //first是a,second是['b','c']
  ```

  

展开语法，可以将任何**可迭代对象**展开（把外层不管是**[]**、**{}**，**“ ”**，**Set**，**Map**全部脱掉脱掉！）

例子：展开数组

```js
//1. 展开数组,用数组接收
let arr=[1,2,3,4]
[...arr]//

//2. 展开多个数组,用数组接收（合并效果）
arr=["h","e","r"]
arr2=["q","w","e"]
arr3=[...arr,...arr2]
console.log(arr3)//输出 ["h", "e", "r", "q", "w", "e"]
```

例子展开对象

```js
// 展开多个对象,用对象接收（合并效果）
var obj1 = {name:'hehe'}
var obj2 = {age:20}
var mergeObj = {...obj1,...obj2}
console.log(mergeObj)//输出{name: "hehe", age: 20}
```



## 解构赋值

结构赋值：等号后侧可以是任何**可迭代对象**解构，赋值给新的变量 

解构数组

```js
//1. 只赋值部分变量:逗号分隔，留下空白，可以跳过不想接收的数据
let [first,,third] = ['a','b','c']; //first是a，second是b

//2. 只赋值部分变量:后续不用接收，可以不写
let [first] = ['a','b','c']; //first是a

//3. 使用展开语法获取多个值
let [first,...second] = ['a','b','c']; //first是a,second是['b','c']
```

解构字符串

```js
let [a, b, c] = "abc"; // ["a", "b", "c"]
```

解构Set

```js
let [one, two, three] = new Set([1, 2, 3]);
```

解构Map

```js
let [one, two, three] = new Map([1, 2, 3]);
```



### 默认值

为变量设置默认值

```js
let [first, second = '默认值'] = ['a'];
console.log(site); //默认值
```

### 函数中的解构

可以实现命名参数的效果

```js
function func({name="jack",age=18,habit,score,classNum}){
	
}

func({name:"tom",score:100})
```



## 遍历

### forEach遍历

数组、Set、Map支持使用forEach遍历

**forEach(function(item[,index,arr]))**

* 参数
  * item 每一项数组元素
  * index 索引
  * 调用forEach方法的类型
* 返回值

```js
let arr=["a","b","c","d"]
arr.forEach(function(item,index,arr){
    console.log(item,index)
})
//输出
 //a 0
 //b 1
 //c 2
 //d 3

let set=new Set(["a","b","c"])

set.forEach(function(value,key,set){
    //key和value一样，都是set内元素，set是调用forEach的
    console.log(value,key)
})




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

### for key in遍历

遍历数组的key，key就是索引

```js
let arr=["n","m","d"]
for(key in arr){
	console.log(key)
}
//输出0 1 2 
```

遍历对象的key

```js
let stu={
    name:"jack",
    age:18,
    score:20
}
for(let key in stu){
    console.log(key)
}
// name
// age
// score
```

### 遍历可迭代对象

**可迭代对象的遍历**

数组、字符串、内置的对象、Set、Map都是**可迭代对象（Iterable）**，可迭代对象均可以使用**for value of**遍历

**注意**：我们自己创建的对象不是可迭代对象，需要自己实现**Symbol.iterator**属性（后面会有详细介绍实现过程），但是内置的对象，都默认实现了，所以可以迭代

例如：遍历数组的value

```js
//值类型不可改变
let arr=[1,2,3,4,5]
for(let value of arr){
	value=value+10
}
console.log(arr) //输出 1 2 3 4 5
```



**什么是可迭代对象的**

通过自己实现一个可迭代对象来学习，我们给对象添加`for value of`（对象不是可迭代对象）

* 当 `for..of` 循环时，会调用Symbol.iterator方法（如果没找到，就会报错）。这个方法返回一个 **迭代器对象（iterator）** 
* 迭代器对象中，必须有一个`next()` 方法，其返回的结果的格式必须是 `{done: Boolean, value: any}`
  * 当 `done=true` 时，表示循环结束
  * 当 `done=false` 时，表示还有下一个元素，会再次返回下一个迭代器对象，`value`就是这次的数据

* `for..of` 循环会自动判断done的值，遍历整个可迭代对象

```js
let stu={
    name:"jack",
    age:18,
    score:20
}

stu[Symbol.iterator]= function (){
    return{
        entriesList:Object.entries(this), //this指向stu对象
        curIndex:0,
        next(){
            if(this.curIndex+1<=this.entriesList.length){
                let res={done:false,value:this.entriesList[this.curIndex][1]}//this指向当前这个对象中
                this.curIndex++
                return res
            }else{
                return {done:true,value:null}
            }

        }
    }
}


for(let value of stu){
    console.log(value)
}

//jack
//18
//20
```

**获取可迭代对象**

我们也可以获取迭代器对象后，手动调用next方法

```js
let str = "Hello";

let iterator = str[Symbol.iterator](); //获取带了可迭代对象

while (true) {
  let result = iterator.next(); //其中的next方法
  if (result.done) break;
  console.log(result.value); // 一个接一个地输出字符
}
```

### 获取迭代器

数组、Set、Map都有这三个方法，通过这三种方式获取可迭代对象

**keys( )**

* 参数：无

* 返回值：可迭代对象



**values( ) **

* 参数：无

* 返回值：可迭代对象



**entries( )**

* 参数：无

* 返回值：可迭代对象



**数组**

```js
let arr=["a","b","c"]

//所有键
console.log(arr.keys())//输出 Object [Array Iterator] {}
//所有值
console.log(arr.values())//输出 Object [Array Iterator] {}
//所有键和值
console.log(arr.entries())//输出 Object [Array Iterator] {}

//遍历所有键
for(const value of arr.keys()){
    console.log(value)
}//输出0 1 2

//遍历所有值
for(const value of arr.values()){
    console.log(value)
}//输出a b c

//遍历所有键和值，[value,key]是解构
for(const [value,key] of arr.entries()){
    console.log(value,key)
}
// 0 a
// 1 b
// 2 c

```

**Set**

set没有键，但是为了使迭代器对所有类型统一，所以让set的键和值一样，都是set内的元素

```js
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

**Map**

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

## this的指向

JS中this的指向是十分让人头秃的一个知识点，因为this的指向并不固定，不同的调用方式同一个this是不同的

简单一句话概括就是：

**this指向其调用者所在的上下文**

| 规则编号 | 规则                    | 上下文（this指向）           |
| -------- | ----------------------- | ---------------------------- |
| 规则1    | 函数（）                | window                       |
| 规则2    | new 函数（）            | 秘密创建出的那个对象         |
| 规则3    | 对象.函数（）           | 该对象                       |
| 规则4    | 数组[索引]（）          | 该数组                       |
| 规则5    | 定时器                  | window                       |
| 规则6    | Dom事件处理函数         | window                       |
| 规则7    | IIFE                    | window                       |
| 规则8    | call、apply、bind       | 可指定this指向               |
| 规则9    | 箭头函数，即 ()=>{this} | this指向箭头函数所在的上下文 |

注意：除去**规则9**以外，前面提到的函数都不是箭头函数

### 例子

* 全局中的this指向window对象

  ```js
  console.log(this)//输出 window对象
  ```

* 直接调用函数，函数中的this指向window 

  ```js
  function func(){
    console.log(this)//【规则1】
  }
  func()
  ```

  new关键调用函数（这个函数就称为构造函数，前面【函数】章节介绍了new关键字）

  ```js
  function stu(stunum){
      this.stunum=stunum//这里的this是指向的是创建的new关键字创建的空对象 【规则2】
      this.show=function(){//【规则2】
          console.log(this.stunum) //【规则3】
          function func(){
              console.log(this)//这里的this是指向window对象【规则1】
          }
          func()
      }
  }
  let student=new stu("张三")
  student.show()
  //输出 张三 window对象
  ```

* 对象中的this

  ```javascript
  let stu={
      stunum:120,
      show:function(){   
          console.log(this.stunum) //【规则3】
    
          function func(){
              console.log(this)//指向window对象【规则1】
          }
          func()
      }
  } 
  stu.show()
  //输出 120   window对象
  ```
  
* 箭头函数

  箭头函数中的this对象，指向的父级作用域的this的指向

  ```javascript
  let lesson={
      site:"hedaodao",
      show:function(){      
          return ()=>{
              return this.site //【规则9】，其所在的上下文属于【规则3】，指向lesson对象
          }
      }
  }
  console.log(lesson.show()()) 
  //输出 hedaodao
  ```
  
* call apply bind

  会在后面详细介绍

### 箭头函数的由来

属性值的函数，该函数的子函数中出现this会指向window对象，而不是对象本身。以下是解决方案

* 新方法：ES6出现了箭头函数，可以很好的解决这个问题

  ```javascript
  let lesson={
      site:"hedaodao",
      show:function(){      
          return ()=>{
              return this.site
          }
      }
  }
  console.log(lesson.show()()) //输出 hedaodao
  ```

* 老方法：没有箭头函数之前，通常的做法是使用一个变量self保存下，指向对象的this

  ```javascript
  let lesson={
      site:"hedaodao",
      show:function(){
          var self=this//这里的this是指向lesson对象的，赋值给self，后面子函数里，用self
          return function(){
              return self.site
          }
      }
  }
  console.log(lesson.show()()) //输出 hedaodao
  ```
  

### call apply bind

用于设置函数中的this的指向

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

## Math对象

只介绍下，Math常用的（静态）方法

| 函数             | 描述                        |
| ---------------- | --------------------------- |
| abs(x)           | 返回 x 的绝对值             |
| ceil(x)          | 向上取整                    |
| floor(x)         | 向下取整                    |
| max(x,y,z,...,n) | 返回 x,y,z,...,n 中的最高值 |
| min(x,y,z,...,n) | 返回 x,y,z,...,n中的最低值  |
| random()         | 返回 0 ~ 1 之间的随机数     |
| round(x)         | 四舍五入，保留整数          |
| sqrt(x)          | 返回数的平方根              |
| pow(x,y)         | 返回 x 的 y 次幂            |

传入的参数会通过Number转化为数字后在运算，如果参数中有被转化为NaN的，则返回NaN

## Data对象

### Data对象

创建Data对象，返回的都是当地时区的时间对象

* 无参数

  ```js
  var today = new Date() //获取设备当前的时间
  ```

* 参数是数字

  ```js
  new Date(year, monthIndex [, day [, hours [, minutes [, seconds [, milliseconds]]]]]);
  
  //注意：
  //1. year, monthInde两个参数是比传的，否则返回的Data对象是错误的
  //2. 其中monthIndex=0，表示的是1月,11为12月。不传递的参数，默认为0
  ```

  ```js
  new Date(2022,0) //Sat Jan 01 2022 00:00:00 GMT+0800 (中国标准时间)
  ```

* 参数是字符串

  ```js
  new Date(dateString);
  
  //'yyyy-mm-dd HH:MM:SS'
  //'yyyy/mm/dd HH:MM:SS'
  //注意:
  //1. 当你使用字符串这个形式的时候, 1 表示 1 月, 12 表示 12 月
  //2. 年月日和时分秒中间有一个空格
  ```

  ```js
  new Date("2022-01-20 14:30:00") //Thu Jan 20 2022 14:30:00 GMT+0800 (中国标准时间)
  
  new Date("2022/01/20 14:30:00") //Thu Jan 20 2022 14:30:00 GMT+0800 (中国标准时间)
  ```

  

### Data对象的方法

| Data对象的方法    | 描述                                              |
| ----------------- | ------------------------------------------------- |
| getDay()          | 返回Date对象的是星期几（0～6，0是星期日）         |
| getFullYear()     | 返回Date对象的年份（四位数，例如2022）            |
| getMonth()        | 返回Date对象的月份 (0 ~ 11，0指的是1月，之后类推) |
| getDate()         | 返回Date对象的日                                  |
| getHours()        | 返回Date对象的小时 (0 ~ 23)                       |
| getMinutes()      | 返回 Date 对象的分钟 (0 ~ 59)                     |
| getSeconds()      | 返回 Date 对象的秒数 (0 ~ 59)                     |
| getMilliseconds() | 返回 Date 对象的毫秒(0 ~ 999)                     |
| **时间戳**        |                                                   |
| getTime()         | 返回 1970 年 1 月 1 日至今的毫秒数（时间戳）      |

### 时间戳 

一共有3种方式

```
new Date().getTime()
new Date()*1
```

```js
Date.now()//直接用Date对象，返回当前时间的时间戳
```

### 实践

两个时间对象比较，一般都是使用时间戳

例子：计算两个日期相差的天数

```js
let now=new Date()
let end=new Date().setFullYear(2050,11,22)//月份是从0开始的，这里是12月22日。这里end是时间戳

let res=(end-now)/ (1*24*60*60*1000)
console.log("距离时间",res)//打印当前时间到2020-11-22的天数
```

格式化时间 ：由于JS中没有提供相关的功能，所以需要自己实现

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

## 错误对象

### 错误类型

ECMA-262定义了8中错误类型

* **Error**

  Error是错误的基类型，其他错误类型继承自该类型 。一般是开发者抛出

* **InternalError**

  JS引擎发生异常时，例如栈溢出

* **EvalError**

  eval函数的错误使用触发的异常

  ```js
  new eval()  //抛出EvalError
  ```

* **RangeError**

  使用Array构造数组时,传入负数或者Number.MAX_VALUE

  ```js
  let a=new Array(-120) //RangeError: Invalid array length
  
  let a=new Array(Number.MAX_VALUE) //RangeError: Invalid array length
  ```

* **ReferenceError**

  使用了未声明的变量

  ```js
  console.log(a) //ReferenceError: a is not defined
  ```

* **SyntaxError**

  语法错误，这个错误触发的情况挺多不具体列举了

* **TypeError**

  JS的某些函数的参数是有类型限制的，如果传入了错误的类型会抛出错误

  还有就是更为常见的，使用了`.`方法，试图访问null或者undefined的属性

  ```js
  console.log(null.a)//TypeError: Cannot read property 'a' of null
  
  console.log(undefined.a)//TypeError: Cannot read property 'a' of null
  ```

* **URIError**

  只出现在encodeURI()和decodeURI()，传入错误参数，这两个函数非常健壮，极特殊情况下的参数才会报错

  ```js
  console.log(encodeURI('\uD800')) //URIError: URI malformed
  ```

  

  

### 错误处理

```js
try{
  //可能会出错的代码
}catch(err){
  //即使不使用错误对象也必须定义名称 
  //错误对象的值，不同环境存在差异，但是基本上都会有err.message属性
}finall{
  //最终一定会执行
}
```

catch和finally，这两者必须至少存在一个。并且，finally存在时，try和catch中的return都会被忽略

```js
function testFinally(){
	try {
		return 1;
	} catch(err){
		return 2;
	}finally{
		return 3;
	}
}
	
console.log(testFinally())  //3
```

## Promise

Promise包含`pending`、`fulfilled`、`rejected`三种状态

- `pending` 指初始等待状态，初始化 `promise` 时的状态
- `resolve` 指已经解决，将 `promise` 状态设置为`fulfilled`
- `reject` 指拒绝处理，将 `promise` 状态设置为`rejected`

### 基本使用

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

### then

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

###  catch

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

### finally

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

### 宏任务与微任务  

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

![image-20210415000628923](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/%E9%9D%A2%E8%AF%95%E7%9B%B8%E5%85%B3/image-20210415000628923.png)

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

![image-20210415001615623](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/%E9%9D%A2%E8%AF%95%E7%9B%B8%E5%85%B3/image-20210415001615623.png)

### 扩展接口

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

### 任务队列

https://houdunren.gitee.io/note/js/15%20Promise.html#%E4%BB%BB%E5%8A%A1%E9%98%9F%E5%88%97

### async/await

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

![image-20210418105050836](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/%E9%9D%A2%E8%AF%95%E7%9B%B8%E5%85%B3/image-20210418105050836.png)

### Promise分装AJAX异步请求

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

## 实现Promise

### 实现Promise

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

###实现 Promise.resolve

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

### 实现 Promise.reject

添加静态方法到HD类中

```javascript
static reject(reason) {
  return new HD((_, reject) => {
    reject(reason);
  });
}
```

### 实现 Promise.all

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

### 实现 Promise.race

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



## 模块化规范

推荐文章[前端模块化详解(完整版)](https://segmentfault.com/a/1190000017466120)

JS 最初设计的目的，仅仅是为了完成一些简单的功能，但是随着前端工程化成为一种趋势，前端项目慢慢开始承载更多更复杂的功能，将单一 JS 文件划分模块的需求也愈发强烈。我们下面梳理下：

### 模块化的最佳实现

- 在 Node.js 环境中采用 CommonJS 的规范（Node 项目，微信小程序）
- 在浏览器环境采用 ES Modules 规范（Vue 项目）

### 传统 HTML

HTML 网页中，浏览器通过`<script>`标签加载 JS 脚本。

**同步加载**

默认情况下，浏览器是**同步加载**JS 脚本【渲染引擎遇到`<script>`标签就会停下来，等到执行完脚本，再继续向下渲染。如果是外部脚本，还必须加入脚本下载的时间】

如果脚本体积很大，下载和执行的时间就会很长，因此造成浏览器堵塞，用户会感觉到浏览器“卡死”了，没有任何响应。

```html
<!-- 页面内嵌的脚本 -->
<script type="application/javascript">
  //脚本代码
</script>
```

```html
<!-- 外部脚本 -->
<script type="application/javascript" src="脚本地址"></script>
```

**异步加载 **

`<script>`标签默认为同步加载，只要打开 defer 或 async 属性，脚本就会异步加载【渲染引擎遇到这一行命令，就会开始下载外部脚本，但不会等它下载和执行，而是直接执行后面的命令】

```html
<script src="path/to/myModule.js" defer></script>
<script src="path/to/myModule.js" async></script>
```

defer：要等到整个页面在内存中正常渲染结束（DOM 结构完全生成），才会执行

async：一旦下载完，渲染引擎就会中断渲染，执行这个脚本以后，再继续渲染

注意：如果有多个 defer 脚本，会按照它们在页面出现的顺序，执行脚本；而多个 async 脚本是不能保证按照在页面出现的顺序执行脚本。

### CommonJS（CJS）

#### 介绍

[CommonJS 规范](http://javascript.ruanyifeng.com/nodejs/module.html#toc0)

- 一个 JS 文件就是一个模块，每个模块都有单独的作用域，即在一个文件里面定义的变量、函数、类，都是私有的，对其他文件不可见。必须导出，并在别的文件引入，才能在别的文件中访问到

- 模块内的代码不会污染全局作用域

- 模块加载的顺序，按照其在代码中出现的顺序

- 以同步模式加载模块【也就是说，只有加载完成，才能执行后面的操作，由于 Node.js 主要用于服务器编程，模块文件一般都已经存在于本地硬盘，所以加载起来比较快，不用考虑非同步加载的方式，所以 CommonJS 规范一般用于服务端】

- 模块被引入就会执行

  ```js
  //a.js
  console.log("a文件")
  module.exports = {
      count:1
    	func(){}
  }

  //b.js
  const {count} =require('./a.js')  //a文件
  ```

- 导出：

  - `module`变量代表当前模块

    ```js
    console.log(module.path); //放在js文件中，找到这个js文件的查找路径
    ```

  - `module.exports`属性表示当前模块对外输出的接口，其他文件加载该模块，实际上就是读取`module.exports`变量

  - node 提供一个`exports`变量，指向 module.exports。这等同在每个模块头部，有一行这样的命令

    ```js
    var exports = module.exports;
    ```

- 引入：

  - 通过`require`函数载入模块，`require`命令的基本功能是，读入并执行一个 JS 文件，然后返回该模块的 module.exports 对象。如果没有发现指定模块，会报错

  - require 参数

    ```js
    //内置模块
    var foo1 = require("http");

    //文件模块【可以是自己的写的js文件，也可以下载的第三方npm包】（写法有：绝对路径、相对路径，下面以绝对路径为例）
    var foo2 = require("/a.js"); //看后面的 路径分析——>文件定位
    var foo2 = require("/a"); // 看后面的 路径分析——>文件定位
    ```

  - 从 Node 中引入模块，主要经历了四个过程：**缓存加载**、**路径分析**、**文件定位**、**编译执行**

  - **缓存加载**

    > node 为了提高性能，优先从缓存中加载，如果缓存中没有，才会从**路径分析**、**文件定位**、**编译执行**，最后放入缓存中

    文件模块：在第一次加载模块后，会把模块编译执行并放在缓存中。从而以后再次加载模块的时候，会直接去缓存中找相应的模块。

    内置模块：它在 Node 源代码编译过程中直接编译成了二进制可执行文件，在启动 Node 进程的同时就从内存中加载了核心模块，并缓存起来。所以内置模块的加载跳过了文件定位和编译执行的步骤，并且优先于文件模块加载

  - **路径分析**

    > 路径分析主要是对模块标识符分析，根据不同类型的模块标识符使用不同规则分析路径

    ```js
    require("模块标识符");
    ```

    （1）如果模块标识符为路径（绝对路径、相对路径），比如： `require(./a.js)`或者`require(./a)`，会从指定路径寻找

    （2）如果模块标识符不为路径，比如`require('a.js')`、`require('a')`，就会按照以下的顺序去寻找

    - 查询当前文件目录下的`node_modules`路径
    - 查询父级目录下的`node_modules`路径
    - 查询父级的父级目录下的`node_modules`路径
    - 一直递归，直到查询到根目录下的`node_modules`路径

  - **文件定位**

    > 由于模块标识符的文件后缀可以省略，node 需要知道要查找的模块，到底是一个文件还是一个文件夹（包）

    主要分为两个步骤：`文件拓展名分析`和`目录（包）分析`

    - 文件拓展名分析

      我们使用 require 引入模块的时候，可以不加文件的后缀名。比如：

      ```js
      var foo = require("foo");
      ```

      这个时候 Node 就会进行文件拓展名分析，会依次分析下面三个拓展名：`.js`、`.node`、`.json`
      在分析的过程中，Node 会同步阻塞式调用 fs 模块来判断文件是否存在

      如果查找不到这个文件，那么就会进行**目录（包）分析**

    - 找到 foo 这个目录（或者叫包）【如何找到？请看上面的**路径分析**】

      - 如果有 package.json 文件，使用 JSON.parse 解析 JSON 对象，找到 name 属性值，如果和**模块标识符**一样，那就找到 main 字段，这个字段指定了包的入口文件
      - 如果没有 package.json 文件，就会在当前目录下依次寻找`index.js`、`index.node`、`index.json`，如果都不符合条件就抛出异常

  - **编译执行**

    文件定位无论是`文件拓展名分析`还是`目录（包）分析`，只要成功，最后都会找到一个文件

    node 根据文件后缀，处理最终定位的文件

    - `.js`：通过 fs 模块同步载入后编译执行
    - `.node`：这是 c/c++编写的拓展文件，需要调用 dlopen()方法来编译
    - `.json`：通过 fs 模块同步载入后使用 JSON.parse 解析结果
    - 其余拓展名都被当做 js 文件来处理

#### 导出和引入的模版

以下的内容，都可以在这个模版中，看效果。

新建两个文件`a.js`、`b.js`，文件 a 作为导出模块，文件 b 引入 a 模块

```js
//a.js
export let count = 1;
export function countplus() {
  count++;
  console.log(count);
}
```

```js
//b.js
import { count, countplus } from "./a.js";
console.log(count); //1
countplus(); //2
```

运行 b.js 查看效果

```js
node b.js
```

#### 导出和引入

**使用`module.exports`导出/引入**

module.exports 是 node 提供的一个导出**对象**

多次导出

```js
//a.js
var a = 1;
var aPlus = function () {
  return a++;
};
module.exports.a = a;
module.exports.aPlus = aPlus;
```

批量导出

```js
//a.js
module.exports = {
  //对象
  fun1() {},
  fun2() {},
  count: 1,
};
```

引入（多次导出还是批量导出，导出的都是对象，引入的也是整个对象）

```js
//b.js
const obj = require('./a.js');//导入整个对象
console.log(obj.count) //1

const {fun1,fun2，count} = require('./a.js');//解构赋值
```

**使用`exports`导出/引入**

在每个 node 模块中，node 提供一个 exports 变量，指向 module.exports。这等同在每个模块头部，有一句代码

```js
var exports = module.exports;
```

使用 exports 时，只能给 exports 添加属性

```js
//a.js
exports.area = 10;

//b.js  引入与前面一样
```

不能直接给 exports 赋值，这种用法是错误的

```js
let count = 1;
exports = count;
```

因为，相当于下面代码。node 实际导出的是 module.exports，exports 存的 count 根本没有导出

```js
var exports = module.exports;
let count = 1;
exports = count;
```

这种形式的 exports 和 module.exports 混用，也是错误的

```js
exports.hello = function () {
  return "hello";
};

module.exports = "Hello world";
```

因为等价于下面的代码。

```js
var exports = module.exports;

//
module.exports.hello = function () {
  return "hello";
};

//module.exports原本是一个有hello属性的对象，现在变成了字符串
module.exports = "Hello world";
```

**注意**

为避免导出时出现问题，尽量只使用`module.exxports`

### ES Modules（ESM）

#### 介绍

- 每个模块都是单独的私有作用域，模块内部，自动采用严格模式(“use strict”)

- ESM 导出的是值的地址，且默认为 const，是不可以修改的，修改操作只在模块内部进行（由于 const 的问题，实际上引用类型，是可以更改的）

  ```js
  //a.js
  export let count = 1;
  export function countPlus() {
    count++;
  }

  export let stu = {
    name: "jack",
    age: 18,
  };
  ```

  ```js
  //b.js
  import { count, stu, countPlus } from "./a.js";

  //--可以直接修改引用类型的值--
  stu.age++;
  console.log(stu); //{ name: 'jack', age: 19 }

  //--模块内部的函数是可以修改，其内部值的--
  countPlus();
  console.log(count); //2

  //--直接修改内部count值报错--
  count++; //TypeError: Assignment to constant variable.
  ```

- 引入 ESM 模块，模块内的代码就会被被执行

  ```js
  //a.js
  console.log("a.js文件中的打印");
  ```

  ```js
  //b.js
  import {} from "./a.js"; //a.js文件中的打印
  ```

#### 导出和引入的模版

以下的内容，都可以在这个模版中，看效果。

新建两个文件`a.js`、`b.js`，文件 a 作为导出模块，文件 b 引入 a 模块

```js
//a.js
export let count = 1;
export function countplus() {
  count++;
  console.log(count);
}
```

```js
//b.js
import { count, countplus } from "./a.js";
console.log(count); //1
countplus(); //2
```

运行 b.js 查看效果

```js
node b.js
```

会出现提示，按照提示来 就可以了

```text
 Warning: To load an ES module, set "type": "module" in the package.json or use the .mjs extension.
```

使用`npm init -y`生成一个`package.json`文件，在里面添加

```text
"type": "module"
```

输入 `node b.js`，重新运行，输出结果

#### 导出和引入

**使用`export`导出/引入**

一个文件可多次导出

```js
export const name = "导出变量name";

export function hi() {
  console.log("导出一个函数 hi");
}

export class Person {} // 导出一个类
```

按名字引入，自己需要的模块

```js
import { name, hi, Perdon } from "xxx.js";
```

**使用`export{}`批量导出/引入**

如果文件中，导出的内容很多，写多个`export`关键字太繁琐，可以采用下面的等价方式，批量导出

```js
const name = "导出变量name";

function hi() {
  console.log("导出一个函数 hi");
}
class Person {} // 导出一个类

//方式一：
export { name, hi, Person };

//方式二：as关键词可以重命名
export { name as myName, hi as hello, Person as People };
```

按名字引入，自己需要的模块

```js
import { xxx1, xxx2 } from "xxx.js"; //并不是解构赋值
```

**使用`export default`(默认导出)/引入**

```js
export default name // 默认导出变量name

export default {  //默认导出一个对象
	xx:"xxx"
}
```

默认导入模块内所有成员，导入名字可以任意起

```js
import xx from "xxx.js";
```

**注意**

以下用法是导出/引入的固定用法

```js
export { name, age }; //并不是导出对象的简写
import { name, age } from "./xxx.js"; //并不是解构赋值
```

如果想要到导出对象

```js
export let obj{

}

//或者
let obj={}
export {
	obj
}

//或者
export default {//默认导出一个对象

}
```

**特殊情况**

这种情况用的比较少，通常引入模块成员，不处理 ，直接再导出，一般会这么写

```js
import { name } from "./module.js"
import { age } from "./module2.js"

export { name age }
```

但实际上可以通过简写的方式直接导入再导出成员

```js
export { name } from "./module.js";
export { age } from "./module2.js";
```

#### 引入的注意事项

- 导入模块成员时，from 后面跟的字符串路径必须要使用完整的文件名称

  ```js
  import { name } from "./module"; // 会报错
  import { name } from "./module.js"; // 正确
  ```

- index 的文件也必须填写不能省略(项目中通常引入一个文件夹实际上引的是文件夹内的 index)

  ```js
  import { name } from "./utils"; // 会报错
  import { name } from "./utils/index.js"; // 正确
  ```

  注意：有时不遵守前两点要求，也是可以正常引入的，这是因为打包工具（webpack）在打包模块时进行的一些操作为我们节省的

- 引入路径

  ```js
  import { name } from "module.js"; // 会认为引入第三方模块
  import { name } from "./module.js"; // 相对路径
  import { name } from "/src/module.js"; // 绝对路径 从项目根目录下开始
  ```

- 执行某个模块，但是不需要提取他内部成员

  ```js
  import {} from "./module.js"
  import "./module.js
  ```

- 导入模块内所有的成员关键字\*

  ```js
  import * as obj from "./module.js";
  // 模块module.js内部导出的所有成员将在obj对象内引用
  ```

- import 关键字不能直接在作用域种使用

  ```js
  if (true) {
    import { name } from "./module.js"; // 这么写会报错的
  }
  // 动态导入模块就可以解决上面的问题
  import("./module.js").then(function (module) {
    console.log(module);
  });
  ```

#### ESM 在 Node 环境中的注意事项

- EMS 中可以导入 CommonJS 模块【module.exports 的模块能 import/require】

- CommonJS 中不能导入 ESM 模块【export/export default 的模块，不能 require】
- CommonJS 始终只会导出一个默认成员
- ESM 中没有 CommonJS 中那些模块全局成员

### ESM 与 CJS 模块的差异

- 区别一

  CommonJS 模块输出的是一个值的拷贝，countPlus 将模块内的 count 变成 2，但是拷贝出来的 count 值还是 1【注意 node 环境下 module 指向模块，而不是 this】

  ```js
  //a.js
  module.exports = {
    count: 1,
    countPlus() {
      module.exports.count++;
      console.log("count的值", module.exports.count);
    },
  };

  //b.js
  const { count, countPlus } = require("./a.js");
  console.log(count); //1
  countPlus(); //count的值 2
  console.log(count); //1
  ```

  ESM 模块输出的是值的引用

  ```js
  //a.js
  export let count = 1;
  export function countplus() {
    count++;
    console.log(count);
  }

  //b.js
  import { count, countplus } from "./a.js";
  console.log(count); //1
  countplus(); //2
  ```

- 区别二

  - **CommonJS** 加载的是一个对象（即`module.exports`属性），该对象只有在**脚本运行完**才会生成（运行时导出）
  - **ES6 模块**不是对象，它的对外接口只是一种静态定义，在**代码静态解析阶段**就会生成（编译时导出）

- CommonJS 模块的 require()是同步加载模块，只有加载完成，才能执行后面的操作

  ES6 模块的 import 命令是异步加载，有一个独立的模块依赖的解析阶段

- 语法上面，CommonJS 模块使用 require()和 module.exports，ES6 模块使用 import 和 export

### 参考

[Module 的加载实现](https://blog.csdn.net/weixin_46151381/article/details/122195535)

[CommonJS 规范](http://javascript.ruanyifeng.com/nodejs/module.html)

[学习 UMD](https://www.cnblogs.com/wenbinjiang/p/11429368.html)

## 网络请求

## 

## 疑惑

Array 怎么不在 js 类型中

---

能判断 7 种类型了

- 当变量是数组，怎么区分空数组与有值数组
- 当变量是对象，怎么区分 null，空对象与有值对象
- 当变量是数字，怎么区分 NaN、0、其他数字

---

对象中取某个键，有几种可能

- 不存在该键，undefined
- 存在该键
  - null
  - 其他的类型
- 如果 obj.name.firstName ,如果 name 不存在，undefined.firstname 就会报错

---

null 与 undefined：

这两个作为 js 中十分特殊的类型，他们有很多不能用的方法：

- \*.toString()

---

new Object()的过程？

---

奇怪：

false 和 null 均有这个问题

```js
let b=false
console.log(++b) //1

//直接使用字面量语法报错
console.log(++false)
//SyntaxError: Invalid left-hand side expression in prefix operation
```

目前的推测：字面量类似于 new 创建实例的一种简写，变量存储的是

```js
let a = "hi"; //

console.log("hi".length); //2
```

---

---

parseInt('2a')结果是 2，非常大的安全隐患

## 解惑

### 1、基本类型的属性和方法

**为什么基本类型，会有`.`操作符**

我们常听说的两句话：1.JS 中全都是对象呢 ；2.JS 中对于基本类型，变量只存储值 ；对于引用类型，变量存储地址，实际其存储在堆中。

看完这两句，会不会有些疑惑，

如果 1 成立，那基本类型的变量也应该是对象，变量应该也是存储堆的地址，为什么说只存储其值

如果 2 成立，基本类型的变量，只存储一个值，为什么有对象中才有的属性

看下面代码，变量 a 为 int 型，是基本类型，有属性 length，有方法 toUpperCase()

```javascript
let str = "hello";
console.log(str.length); //5
console.log(str.toUpperCase()); //HELLO
```

**答**：

JS 中的数据类型分两大类，基本类型（或者说是原始类型）和引用类型。基本类型的值是保存在栈内存中的简单数据段，共有五种，按值访问，分别是**undefined**、 **null**、 **boolean**、 **number**、 **string**；而引用类型的值则是保存在堆内存中的对象，按引用访问，有 **Object** 、**Array** 、**Function**以及其他内置的类型，比如**RegExp**、**Date**、**Math**等，

其实 JS 中，还有三种特殊的引用类型 **Boolean**、、**Number** 、**String** ，方便我们操作与其对应的基本类型，而它们就是**基本包装类型**。当在尝试调用类的方法或属性之前，一直使用原始数据类型。如果调用类的方法或属性，JS 会在幕后为字面量值创建一个包装器对象，以便将该值视为一个对象。调用完成后，JS 即抛弃包装器对象

变量 str 作为一个基本类型变量是没有 length 属性的，但是它的基本包装类型 String 有啊，当调用对象的 length 属性时，会使用`new String("hello")`自动创建一个对象，然后再调用 length 属性，返回值后，销毁这个对象。调用 toUpperCase()方法同理

```js
let str = "hello";
console.log(str.length); //5

//等价于
var str = "string";
var _str = new String(str);
var len = _str.length;
_str = null;
console.log(len); //5
```

活学活用：

```js
var str = "string";
//给包装类创建的对象添加属性pro，然后销毁
str.pro = "hello";
//再次创建新的类，已经没有pro属性了
console.log(str.pro + "world"); //undefinedworld
```



[解答来自此链接](https://zhidao.baidu.com/question/1242686664534046939.html)

## JS 最佳实践总结

最佳实践的核心目标：

* 代码简洁优雅
* 足够健壮，对于异常/错误输入有一定的承受能力

### schme实现方案（需要与原生协商一致）

关注点放在实现思路上

```js
const callbackMap = {};

// 全局唯一方法，提供给APP调用
window.invokeJsMethod = (module, method, params) => {
  console.log("invokeJsMethod参数：", module, method, params);
  if (callbackMap[method] && typeof callbackMap[method].fn === "function") {
    callbackMap[method].fn(params);

    // 删除已执行过的方法，并且只需要执行一次的。防止多次页面返回的时候再次调用
    if (callbackMap[method].callOnce) {
      delete callbackMap[method];
    }
  }
};

const JSBridge = {
  /**
   * 注册回调函数
   * @param mapKey    {string}    注册的回调名称，将在callbackMap中注册此名称的key，该key指向一个对象，包含fn和callOnce属性
   * @param fn        {function}  你的回调，当APP方法执行完后，将执行此函数，接收APP回传的参数
   * @param callOnce  {boolean}   该回调是否仅允许执行一次，true是，false否
   */
  registCallback(mapKey, callback, callOnce = false) {
    if (!mapKey || !callback || typeof callback !== "function") {
      return;
    }
    callbackMap[mapKey] = { fn: callback, callOnce };
  },
  /**
   * 注销回调函数
   * @param mapKey  {string}    已注册的回调名称
   */
  unRegistCallback(mapKey) {
    if (callbackMap[mapKey] && typeof callbackMap[mapKey].fn === "function") {
      delete callbackMap[mapKey];
    }
  },

  //写法一：callback
  isApp(callback) {
    const mapKey = "onGetInstalledApp";
    this.registCallback(mapKey, callback());
    window.location.href = `fusion://invokeNative?module=LocModule&method=getInstalledApp&arguments=null&callback=${mapKey}`;
  },

  //写法二：promise
  onGetPfrom() {
    const mapKey = "onGetPfrom";
    return new Promise((resolve, reject) => {
      this.registCallback(mapKey, resolve);
      window.location.href = `fusion://invokeNative?module=LocModule&method=getPfrom&arguments=null&callback=${mapKey}`;
    });
  }
export default JSBridge;

```

### 解构赋值

接到参数返回的数据res后，一般用解构的方式取出值，想比与通过`res.*`的方式，解构的方式有几个明显的好处

* 代码更加简洁

* 可以设置默认值。如果使用`res.data.author`，当后台返回的data是null或者不存在(undefined)，再去取author时，就会报错 。而我们这里将userInfo的默认值设置为`{}`,所以不会报错

  ```js
  let res={
      code:0,
      message:'',
      data:{
          userInfo:{
              // name:'jack',
              age:18
          },
          author:'HDD'
      },
  
  }
  //注意：
  //1. userInfo:{name}这部分已经解构到了userInfo对象内部了，所以并不能获取userInfo，只能获取其中的name,如果希望获取整个userInfo对象，不要再写:{name,name}就可以了
  //2. =是为了设置默认值，当字段不存在时，会返回默认值
  const {
      code,
      data:{
          author='默认作者',
          userInfo:{
              name='默认名字',
              age
          }={}
      }={}
  } = res={}
  
  console.log('code --> ',code) //code -->  0
  console.log('author --> ',author) //author -->  HDD
  console.log('name --> ',name) //name -->  默认名字
  console.log('age --> ',age)  //age -->  18
  ```

  

* 解构不存在的参数，未设置默认值时，参数值为undefind

  ```js
  let obj={
      name:"jack"
  }
  const {name,age}=obj
  console.log(name,age)//jack undefined
  ```

  

### 函数可选参数

其实就是结构赋值的灵活运用

```js
function getUserInfo(params){
    const {name,age=100}=params //如果不传递age，给定默认值
    console.log(`名字是${name},年龄是${age}`)
}
getUserInfo({name:"jack",age:19})//名字是jack,年龄是19

getUserInfo({name:"tom"})//名字是tom,年龄是100
```

比如，我将常遇到常见，随意找到一个微信小程序开发者文档的api，以[wx.showToast(Object object)](https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.showToast.html)为例

可以看到函数showToast的参数是一个对象，这些对象的key：

* 有些是必填，有些是可选 
* 不写对应的key，还会有默认值
* key还可以是回调函数

![image-20220623123656556](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/JS/20220623123656%20.png)

![image-20220623123715755](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/JS/20220623123715%20.png)

参数 icon的可选值

![image-20220623123944270](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/JS/20220623123944%20.png)

简单模拟下这个函数

```js
class WX {
    navigateTo(params){
        //1、解构参数
        const{title,icon="success",success,fail,complete}=params
        //2、判断必填值
        if(title===undefined){
            throw new Error("title为必填字段")
        }

        //3、判断下icon字段是否在可选范围
        let iconList=["success","error","loading","none"]
        if(iconList.indexOf(icon)===-1){
            throw new Error("icon字段填写有误")
        }

        //4、api内部逻辑忽略（微信应该的api可以看作是一个大的JSBridge，来调用原生能力）
        if(1){//默认成功
            this.callBackFunction(success,{msg:"成功了",data:{title,icon}})
        }else{
            this.callBackFunction(fail,{msg:"失败了"})
        }
        this.callBackFunction(fail,{msg:"最后执行的"})


    }
    callBackFunction(callback,params){ //判断下是不是函数，然后执行
        if(callback!==undefined&&typeof callback==="function"){
            callback(params)
        }
    }
}

const wx =new WX()
wx.navigateTo({
    title:"你好",
    success(res){
        console.log("成功的回调函数",res) //成功的回调函数 { msg: '成功了', data: { title: '你好', icon: 'success' } }
    }
})
```



### 且/或

**&&** 和 **||**

* 且/或组成的是表达式

* 与其他语言不同，js中的且/或表达式，是可以作为语句的执行的

  ```js
  let a=true
  
  function func1(){
      console.log("函数执行")
      return false
  }
  let res=a&&func1() //函数执行
  ```

  

* &&从左向右将找到的值，转化为布尔值，如果为假，则返回其原值，不再继续执行了。找不到为假的，则返回最后一个值

  ```js
  1&&2&&''&&3  //''
  
  1&&2&&3 //3
  ```

* ||从左向右将找到的值，转化为布尔值，如果为真，则返回其原值。找不到为真的，则返回最后一个值



**空值合并运算符  ?? **

上面的运算有一个潜在的问题，就是以下6个值，都会被认为是假的

```
0 、NaN 、 "" 、false  、null 、undefined
```

`??`是`||`的升级版，`??`只认为null和undefined为假

```js
找到第一个不为null和undefined的值，返回。找不到，返回最后一个值
```

例子：如果对象result中有groupName属性，就直接恢复其为空字符串

* 使用`||`，如果result["groupName"]是0，仍然会初始化

  ```js
  let result={}
  for(value of list){
  	result["groupName"] || (result["groupName"] ="");
  }
  ```

* 使用`??`，只有result["groupName"]是null或者undefined，才会初始化

  ```js
  let result={}
  for(value of list){
  	result["groupName"] ?? (result["groupName"] ="");
  }
  ```

### 函数的回调与Promise风格

我们有时候再查看一些文档时，时常发现文档中的某些函数往往标注着，是否支持Promise风格

其实，这些函数都是异步函数，通常面对异步函数，一般就两种风格，一种是**回调函数**，一种就是**promise**

如何让改造一个回调函数风格的函数，使其支持Promise呢？

```js
function getCity(cb){
	//获取城市数据逻辑 ,cityName,cityId
  cb(cityName,cityId)
}
```

回调函数风格

```js
//假设函数原本的使用方式
getCity((cityName,cityId)=>{
  //处理
})
```

将原函数改造为Promise风格

```js
function getCity(){
    //获取城市数据逻辑 ,cityName,cityId
    let cityName='北京',cityId=201
    return new Promise((resolve,reject)=>{
        if(cityName&&cityId){
            resolve({cityName,cityId})
        }else{
            reject(new Error('"获取失败"'))
        }

    })
}

//----链式调用----
getCity().then(res1=>{
    console.log('res1-->',res1)
}).catch(err1=>{
    console.log('err1-->',err1)
})//res1--> { cityName: '北京', cityId: 201 }


//----await调用----
try {
    let res2=await getCity()
    console.log('res2-->',res2)//res2--> { cityName: '北京', cityId: 201 }
}catch (err2){
    console.log('err2-->',err2)
}
```

兼容性改造【将原函数改造为同时支持回调和Promise风格】

```js
function getCity(cb){
    //获取城市数据逻辑 ,cityName,cityId
    let cityName='北京',cityId=201
    return new Promise((resolve,reject)=>{
        if(cityName&&cityId){
            cb&&cb(cityName,cityId)
            resolve({cityName,cityId})
        }else{
            cb&&cb(null,null)
            reject(new Error('"获取失败"'))
        }

    })
}

getCity((cityName,cityId)=>{
    console.log(' 回调方式结果--> ',cityName,cityId)
})

//----链式调用----
getCity().then(res1=>{
    console.log('res1-->',res1)
}).catch(err1=>{
    console.log('err1-->',err1)
})//res1--> { cityName: '北京', cityId: 201 }


//----await调用----
try {
    let res2=await getCity()
    console.log('res2-->',res2)//res2--> { cityName: '北京', cityId: 201 }
}catch (err2){
    console.log('err2-->',err2)
}
```



很多时候，我们并不能直接对支持回调的异步函数进行修改。尤其是，修改别人的代码时，很有可能会改出新的bug，所以 ，我们可以把原本的回调函数继续封装一层

```
```



### async与await的一些细节

```js
function f1(params){
    return new Promise((resolve,reject)=>{
        if(params){
            resolve({name:"f1",age:2})
        }else {
            reject({name:"f1",age:4})
        }
    })
}
function f2(params){
    return new Promise((resolve,reject)=>{
        if(params){
            resolve({name:"f2",age:2})
        }else {
            reject({name:"f2",age:4})
        }
    })
}
function f3(params){
    return new Promise((resolve,reject)=>{
        if(params){
            resolve({name:"f3",age:2})
        }else {
            reject({name:"f3",age:4})
        }
    })
}

// async function def(){
//     const res=await f1(false).catch(err=>{
//         console.log('err --> ',err)
//         return
//     })
//     const res2=await f1(false).catch(err=>{
//         console.log('err2 --> ',err)
//         return
//     })
//
// }

//方式一： 捕获async/await的err
async function hij(){
    // return f1(true).then(async res=> {
    //     //内层使用then方式，外层catch抓不到
    //     // f2(false).then( res2=>{
    //     //     console.log('f2 --> ',res2)
    //     // })
    //
    //     //内层使用async/await方式，外层catch可以抓到错误
    //     const res2 = await f2(false)
    // }).catch(err=>{
    //     console.log('err -->',err)
    // })
}
// hij()


//方式二： 捕获async/await的err，try、catch捕获到第一个err就停止了,不会再继续执行了。如果await自行catch处理，外层就抓不到了,只能抓到剩下的错误
// async function lmn(){
//     // try{
//     //     const res1 = await f1(false)
//     //     const res2 = await f2(false)
//     // }catch (err){
//     //     console.log("err --> ",err)
//     // }
//     const res1 = await f1(false)
//     const res2 = await f2(false)
// }
// lmn()

//方式三
async function lmn(){
    try{
        const res1 = await f1(false).catch(err=>{
                console.log("3")
        })
        const res2 = await f2(false)
    }catch (err){
        console.log("err --> ",err)
    }
}
lmn()

```



### 链式调用

```js
// find 传入参数为原始数据（数组格式，每个元素都是对象）
// 通过进行链式调用对数据执行操作，支持的方法有
// where(predicate): 根据属性进行匹配筛选
// orderBy(key, desc): 根据 key 的值进行排列，默认升序排列，当第二个参数为 true 时降序排列
// groupBy(key): 根据 key 的值对数据元素进行分组，合并为二维数组
// execute(): 执行所有处理并返回最终结果

Array.prototype.find=function(array){
    return this
}
Array.prototype.where=function(predicate){
    let res=[]
    for(let item of this){
        if(item[predicate]!==undefined){
            res.push(item)
        }
    }
    return res
}
Array.prototype.orderBy=function(key,desc){
    return this.sort((second,first)=>{
        if(desc===true){ //降序：从大到小
            if(first[key]>second[key])
                return 1
            else
                return -1
        }else{
            if(first[key]<second[key])
                return 1
            else
                return -1
        }

    })
}
Array.prototype.groupBy=function(key){
    let calcArray=[]//用索引记位置
    return this.reduce((preValue,curValue)=>{
        let curValueGroupByKey=curValue[key]
        let index= calcArray.indexOf(curValueGroupByKey)

        if(index===-1){ //不存在这个key的值
            calcArray.push(curValueGroupByKey)
            preValue.push([curValue])
        }else {//存在
            preValue[index].push(curValue)
        }
        return preValue
    },[])
}
console.log([{name:"jack",age:19},{name:"tom"},{name:"jack",age:30},{name:"tom",age:10}].find().where("age").groupBy("name"))


```



## 参考

- 红宝书
- 阮一峰的《ECMAScript 6 入门》：https://es6.ruanyifeng.com/
- http://jsrun.net/t/cZKKp
- ES6 视频教程：http://t.kuick.cn/RaR3
