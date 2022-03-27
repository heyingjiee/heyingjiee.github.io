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

### 标识符（变量名）

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

ECMAScript 有两类数据类型

- 基本类型（也称为原始类型）: `undefined`、`null`、`boolean`、`number`、`string`和`symbol`

- 引用类型：`object`、`array`、`function`【`object`是所有引用类型的基类】等比较常见

  * 包装类型：Boolean、Number、String 。这几种包装类型我们一般不是使用，而是使用字面量创建值，当对应的基本类型的字面量，使用`.`方法调用相关属性和方法时，就在背后自动创建

    ```js
    console.log("hello".length); //5 
    //默认使用了包装类String("hello")，创建了string对象
    ```

    

#### 变量类型的确定

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

#### undefined

`undefined`类型只有一个值，就是`undefined`。强调下，`undefined`是一个值，而不是报错，报错是`Error`对象

**赋值**

字面量赋值

```js
let a = undefined;
```

无构造函数创建的方式

 因为 undefined 类型不是对象

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

#### null

`null`类型只有一个值，就是`null`。

null 可以理解为一个空值，其他文章中常常将 null 理解为空对象，这是错误的，`typeof null` 的返回值是`object`，这是一个历史悠久的 bug，在 js 的最初版本中使用的是 32 位系统，为了性能考虑使用低位存储变量的类型信息，000 开头代表是对象，然而 null 表示为全零，所以将它错误的判断为 object。虽然现在的[内部类](https://so.csdn.net/so/search?q=内部类&spm=1001.2101.3001.7020)型判断代码已经改变了，但是对于这个 Bug 却是一直流传下来。

我们在声明一个对象时，一般将该对象使用初始化为`null`

**赋值**

字面量赋值

```js
let a = null;
```

无构造函数创建的方式

 因为 null 类型不是对象

**其他**

由于`undefined`值是由`null`值派生而来的，因此 ECMA-262 将它们定义为表面上相等:

```javascript
console.log(null == undefined); //true

console.log(null === undefined); //false
```

￼ 所以，推荐一定要使用`===`和`!==`，因为`==`和`!=`会将等号两边做一个隐式转换，全部转换为数字，再进行比较

#### boolean

`boolean`类型包含两个值：true，false

**赋值**

字面量赋值(常使用)

```js
let a = true;

let b = false;
```

构造函数创建（构造函数创建的是类的实例，是一个对象，所以 typeof 才是 object ，我们通常不使用这种方式，所以前面讲的 typeof 判断类型的方式还是成立的）

```js
let a = new Boolean(true);
console.log(typeof a); //object
```

**类型包含的值**

`boolean`类型包含两个值：true，false，可以直接判断

```javascript
let a = true;
if (a === true) {
  //执行
} else {
}

let b = false;
if (b === false) {
  //执行
} else {
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

#### number

`number`类型包含`NaN`、0 和其他数字

**赋值**

字面量赋值(常使用)

```js
let a = 1;
```

构造函数创建

```js
let a = new Number(1);
console.log(typeof a); //object
```

**数字**

由于存储浮点数需要占用较大的空间，所以 js 尽可能将浮点数存储为整数

```javascript
let num1 = 1; // 当成1处理
let num2 = 10.0; // 当成10处理
```

当数字很大或很小时，会转化为科学记数法存储

当数字超过浏览器限制的最大/最小值后，数字就会变成 `Infinity`￼/`-Infinity￼`

比如：除数和被除数都是 0

```javascript
console.log(5 / 0); // Infinity￼
console.log(-5 / 0); // -Infinity￼
```

无穷是可以继续运算的

```javascript
console.log((-5 / 0) * -2); // Infinity￼
```

且转化为布尔值是真

```javascript
if (Infinity) {
  console.log("1"); //执行
} else {
  console.log("2");
}
if (-Infinity) {
  console.log("1"); //执行
} else {
  console.log("2");
}
```

可通过`Number.MAX_VALUE`和`Number.MIN_VALUE`获取浏览器的数字的最大和最小值

```javascript
console.log(Number.MAX_VALUE);
console.log(Number.MIN_VALUE);
```

通过`isFinite`判断运算的结果是否超过最大和最小值，返回值为布尔值，正常范围的数字返回`true`

```javascript
console.log(isFinite(2.31)); //true

console.log(isFinite(Infinity)); //false
console.log(isFinite(-Infinity)); //false
console.log(isFinite(NaN)); //false
```

---

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
if (NaN === NaN) {
  console.log(true);
} else {
  console.log(false); //执行
}

if (NaN == NaN) {
  console.log(true);
} else {
  console.log(false); //执行
}
```

**函数`isNaN()`**

这个函数会**先尝试将参数转化为数值**（就是使用了`Number()`，转化规则参考`变量转化为数字`表），不能转化为数字的变量都会返回`true`

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

**Number**

转化结果参照`变量转化为数字`表

`Number`的缺陷是，`Number`会将各种的变量类型转化为数字，十分可能造成运算结果的错误。比如，将`true`转化为 1，将`""`转化为 0 等

**parseInt**

基本与`Number`相同，只有两点与`Number`不同的地方是：

1. 当参数是数字是，`parseInt`只能转化为整数，比如 `parseInt(1.5)`结果是`1`

2. 当参数是字符串时，`parseInt`是按照从左到右的顺序一位一位的转换
   - 如果遇到空格或 0，直接忽略
   - 直到遇到负号或第一非 0 数字，才开始转化
   - 直到遇到非数字的字符或到了字符串结尾，才停止转化，然后返回转化结果

以下两种情况的例子

```javascript
//情况一：从左到右遇到非数字结束
console.log(parseInt("11a")); //11
console.log(parseInt("12.3")); //12

//情况二：Number('')返回0
console.log(parseInt("")); //NaN
```

`parseInt`的缺陷大部分与`Number`相同，会将各种的变量类型转化为数字，造成计算的错误。
再加一点是会错误的把例如`11a`这种字符串转化为数字`11`，如果运算中出现了`11a`，js 仍然不会报错，而是当成`11`继续去计算，而`Number`不会有这种问题

**parseFloat**

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

#### string

`String`类型包含`""`、其他字符串

**赋值**

字面量赋值(常使用) :ES 标准中对于字符串使用不同引号是没有区别的

```js
let str1 = "hello";
let str2 = "hello";
let str3 = `hello`;
```

构造函数创建

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

#### object(部分未完成)

**赋值**

字面量赋值(常使用)

```js
let a={};

let a={
  name:'jack'
  getDate(){
    //函数体
  }
};
```

构造函数创建

```js
let a = new Object({ name: "jack" });
console.log(a.name); //jack
```

**其他**

`object`类是其他对象的基类，所以所有对象都是由`object`派生而来，自然也就自带`object`的方法

- `constructor`：用于创建当前对象的构造函数

- `hasOwnProperty(propertyName)`：用于判断当前对象实例（不是原型）上是否存在某属性(不仅一般属性可以，Symbol 属性也能判断)

  ```js
  let obj = {
    a: "he", //key是Symbel
    name: "jack", //key是字符串
    1: "she", //key是数字
  };

  console.log(obj.hasOwnProperty("a")); //true
  console.log(obj.hasOwnProperty("name")); //true
  console.log(obj.hasOwnProperty(1)); //true
  ```

- `isPrototypeOf(object)`：用于判断当前对象是否为另一个对象的原型。（第 8 章将详细介绍原型。）

- ` propertyIsEnumerable(propertyName)`：用于判断给定的属性是否可以使用 for-in 语句枚举。与 hasOwnProperty()一样，属性名必须是字符串。

- `toLocaleString()`：返回对象的字符串表示，该字符串反映对象所在的本地化执行环境。

- `toString()`：返回对象的字符串表示。

- `valueOf()`：返回对象对应的字符串、数值或布尔值表示。通常与 toString()的返回值相同。

#### 注意

以上的 7 种类型中，只有`symbol`是使用`symbol()`创建的，其他均是使用字面量创建的。

但是，`Boolean`、`Number`、`String`、`Object`可以使用构造函数来创建，只不过创建的类型变成了`Object`类型

```js
let a1 = true;
console.log(typeof a1, a1); //boolean true
let a2 = new Boolean(true);
console.log(typeof a2, a2); //object [Boolean: true]

let b1 = 23;
console.log(typeof b1, b1); //number 23
let b2 = new Number(23);
console.log(typeof b2, b2); //object [Number: 23]

let c1 = "hi";
console.log(typeof c1, c1); //string hi
let c2 = new String("hi");
console.log(typeof c2, c2); //object [String: 'hi']

let d1 = { name: "hi" };
console.log(typeof d1, d1); ///object { name: 'hi' }
let d2 = new Object({ name: "hi" });
console.log(typeof d2, d2); //object { name: 'hi' }
```

区别体现在以下

#### 变量类型隐式转换

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

### 操作符

#### 一元操作符

`++`和`--`

这两个操作符除了可以作用于数字外，还可以作用于其他类型的变量

```js
//Null转化为0
let a = null;
console.log(++a); //0

//Undefined
let a = undefined;
console.log(++a); //NaN

//Boolean,true转化为1，false转化为0
let a = true;
console.log(++a);

//String，对字符串应用toString方法
```

## 函数（待补充）

## 基本引用类型（待补充）

## 集合引用类型（待补充）

## 错误

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



## 模块化规范

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

- **关于基本类型，为什么基本类型使用字面量，会有`.`操作符**

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

以下内容均来自不同项目中的 JS 用法

```js
/**
 * @Description:JSBridge
 */

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

## 参考

- 红宝书
- 阮一峰的《ECMAScript 6 入门》：https://es6.ruanyifeng.com/
- http://jsrun.net/t/cZKKp
- ES6 视频教程：http://t.kuick.cn/RaR3
