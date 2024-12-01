# TS学习笔记

## 学习资料

* 掘金小册子 《TypeScript 全面进阶指南》 、《TypeScript类型体操通关秘籍》
* 大佬的博客：https://front-end.toimc.com/notes-page/basic/ts/
* 自己的实践总结

## TS环境

### VSCode配置

* TypeScript Importer

  插件会收集项目内所有的类型定义，设置变量类型时进行提示，并自动引入

  ![img](https://raw.githubusercontent.com/pmneo/ts-importer/master/demo.gif)

* Move TS
  代码重构时，更改文件名和路径后，插件会自动调整引入模块的路径

  ![Move TS示例](https://github.com/stringham/move-ts/raw/master/images/usage.gif)

* Error Lens

  在行内显示代码错误提示

  ![image-20230323202418580](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/20230323202418%20.png)

* VSCode配置项

  开启提示，类似于WebStorm的效果

  ```
  command+shift+p 打开命令面板
  
  输入 Open Workspace Settings ，选择进入设置页面
  
  搜索 'typescript Inlay Hints'  都是提示相关的配置项
  
  勾选配置===>
  Function Like Return Types，显示推导得到的函数返回值类型；
  Parameter Names，显示函数入参的名称；
  Parameter Types，显示函数入参的类型；
  Variable Types，显示变量的类型。
  
  
  或者在settings配置文件中增加
  "typescript.inlayHints.functionLikeReturnTypes.enabled": true,
  "typescript.inlayHints.parameterNames.enabled": "all",
  "typescript.inlayHints.parameterTypes.enabled": true,
  "typescript.inlayHints.variableTypes.enabled": true,
  "editor.inlayHints.padding": true,
  "typescript.inlayHints.enumMemberValues.enabled": true,
  "typescript.inlayHints.propertyDeclarationTypes.enabled": true
  
  ```

  ![image-20230323202143999](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/20230323202144%20.png)

### Playground

[官网提供的Playground](https://www.typescriptlang.org/zh/play?#code/PTAEiJrQ5+MU3NAYlUAqBPADgUwMoGMBOBLFAF1EBR7QYb9AudUBh-gKBFEE34wejNAAOUCo5QTb9ADeUAXjQbPlAaP6BMxSqAwJUDVcoBiVQGbagAzlEqTLgLFAIW6BFf0CbXoCAGGnTCAKg0D3yoFO5E4CDNQNBygSDlAs56BO00Dw+oH95QBSugYO1AWP-79oUAFpQdkBYOUAseUAWD0B5dUBvuUBVeUAcOUB-SNU5BXRsfCJQVUAGdXtdegCgtkBleUAYrLSlTOJAW+jAVZtANz1AODlAaojALrkJXPzfIvZXQDi5QGlbQFXo4MAYFUqMlVABQEXowHxzQHylQF+A1UBMm0BG710aLAB7ADsAZ2IAQ32AUQAPE4BbFAAbNAA1E-wTgCNH0ABeUAAiAASaHu912oAA6rscPcACZ-HYHQ67R4AOlBAHMABRnK63B7PV54D6PACUenopkAnQ6Ab8VAFBy9lUoEAOASALk9ANHygFwCUCANCNmYAG00A36kcqgmQBhcoBjyMAL2aALE1AM6K-RqgAAo1SAQ-lAPYG2nh9G5gFAAwAESoATNIYgGy5QAXNoApxIagBQ5QAA+oBpzTcVEALqZscgUVSANDlADKugF+EwB6Ov0uLo-EA)

![image-20230323202626642](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/20230323202626%20.png)



### 本地环境

**ts-node、typescript**

类似于node环境，本地运行ts文件，需要安装 `ts-node`与`typescript`

通过Npm全局安装

```shell
npm i ts-node typescript -g
```

使用`typescript`初始化项目

```shell
tsc --init //创建tsconfig.json配置文件 (tsc 可以看做是 typescript compiler 的简写)
```

使用`ts-node`运行TS文件

```shell
ts-node xxx.ts

//ts-node的相关配置。可以在tsconfig.json中进行配置、在使用命令时通过参数指定

// -P,--project 指定ts配置文件位置，默认查找根目录下的tsconfig.json
// -T,--transpileOnly 禁用执行TS文件过程中的类型检查,提供了更快的编译速度
// --swc  在 transpileOnly 的基础上，还会使用 swc 来进行文件的编译，进一步提升执行速度
// --emit 执行TS的同时，将产物输出到 .ts-node 文件夹下（需要同时与 --compilerHost 选项一同使用）
```



**ts-node-dev**

基于【ts-node 与 node-dev】实现类似于nodemon库，可实现监听TS文件变动，保存后自动重新执行

全局安装

```shell
npm i ts-node-dev -g
```

运行TS文件

```shell 
ts-node-dev --respawn --transpile-only xxx.ts 
// ts-node-dev 在全局提供了 tsnd 这一简写
// --respawn 启用了监听重启的能力
// --transpileOnly 提供了更快的编译速度
```



## 前提

TSC 默认根据`tsconfig.json`读取配置，其中有两个语法相关的重要配置需要提前知晓

**strictNullChecks**

默认为true，即开启空检查。类型明确的变量不可赋值为null

```ts
let a :string
a=null //Type 'null' is not assignable to type 'string'
```

**noImplicitAny**

默认true，即TS隐式自动推断类型为any 。这个选项我们一般手动手动关闭比较好

```ts
let a  //any
```

## 类型层级

![image-20230416212437609](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/JS/20230416212438%20.png)

函数类型未在其中，待补充：https://juejin.cn/book/7086408430491172901/section/7086436622425653285?enter_from=course_center&utm_source=course_center

## 简单类型

TS 在原本 JS 类型的基础上做的扩充

*  number、boolean、string、object、bigint、symbol

  ```ts
  let age: number = 24;
  
  let male: boolean = false;
  
  let name: string = 'jack';
  
  const bigintVar1: bigint = 9007199254740991n;
  const bigintVar2: bigint = BigInt(9007199254740991);
  
  const symbolVar: symbol = Symbol('unique');
  ```

* undefined、null

  undefined表示这里没有值；null表示这里有值，但是个空值（默认 undefined、null 不是其他类型的子类型，但是可以 strictNullChecks:true 设置为子类型（非常不推荐））

  ```ts
  const tmp1: null = null;
  const tmp2: undefined = undefined;
  ```

* 包装类型

  Number、Boolean、String、Object、Symbol

* never、void、any、unknown

  ```ts
  // 1、never ：代表不携带任何类型信息，比如函数抛异常的时候，返回值就是 never
  let a: never;
  let b: number;
  a = b //  ❌ 报错
  b=a
  
  // 常用来作为抛出错误函数的类型
  function error(message:string):never{
  	throw Error(message)
  }
  function fail():never{
    return error("错误")
  }
  
  
  // 2、void： 代表空，可以接受 undefined 或 never 类型的值
  
  // 3、any： 被标记为 any 类型，就相当于关闭了类型检查。可以接受任何类型，也可以赋值给任何类型（除 never）
  let a:any = ''
  let b:number=1
  a=b
  b=a
  
  // 4、unknown： 是未知类型，任何类型都可以赋值给它，但是它不可以赋值给别的类型
  let a:unknown = ''
  let b:number=1
  a=b
  b=a // ❌ 报错。把一个未知的类型赋值给 number 肯定会报错啊
  ```

  void 一般仅用在标记没有返回值的函数

  ```js
  const tmp1: void = undefined;
  
  function func():void{
    return; // return undefined;
  }
  ```



## 字面量类型

这块很容易头晕，记住值可以作为类型

### 基础类型字面量

```
let a:1 = 1

let b:'temp'= 'temp'
```

给变量类型设置成固定的字符串，那变量就成了常量，所以一般也不这样写

下面常量会被自动推断为字面量类型

```
const a = 1
```

![image-20241201011852411](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20241201011852LBfheN.png)

### 对象字面量类型

```ts
// 情况 1： 对象字面量类型 value 是类型
let obj1: { a: number } = { a: 10 }; 

// 情况 2：对象字面量类型 value 是个值
let obj2: { a: 1 } = { a: 1 };  // obj2[a] 的值必须是 1
```

字面量可以描述一个对象，它与 interface 的区别？

```
1、定义方式：对象字面量类型直接在使用的地方定义，而接口需要通过 interface 关键字提前声明

2、扩展性：接口可以通过 extends 关键字进行扩展，创建新的接口，而对象字面量类型则不能直接扩展

3、可重载性：同名接口会合并，而对象字面量类型不可以

4、额外属性检查：当你用对象字面量直接赋值给一个变量时，TypeScript 会检查这个对象是否有多余的属性。如果你是通过接口或类型别名来定义的，那么即使对象有额外的属性，只要这些额外的属性不与现有属性冲突，TypeScript 也不会报错
```

### 数组字面量类型

与对象一致

```ts
let arr1: [string,number] = ['a',1]

let arr2: [1,2] = [1,2]
```

### 模版字符串类型

模板字符串可以作为类型

```js
// x 的类型是1，其值只能接受 1
let x:1
x=1

// 模板字符串类型
let x = `Hello ${string}`;  // 这里${}内需要是类型
x='Hello jack' 
```

## 数组与元组类型

**数组**

```ts
// 普通形式
let arr:string[]

// 泛型方式 （传入元素类型）
let arr:Array<string>
```

**元组**

元组是固定元素的数组，如下是有两个元素的元组（元素都是字符串类型）

```ts
let arr:[string,string]
```

## 枚举类型

enum枚举类型，注意：每个枚举项用逗号分隔（不可省略）

默认枚举项实际值从0开始

```ts
enum sex{
    man,  // 0
    woman // 1
}
```

手动指定枚举项的实际值

```ts
enum sex{
    man='男',
    woman='女'
}
```

仅不指定枚举项的实际值，默认从0开始指定部分枚举值为数字，如B字段是数字，则下面的字段可以不指定值，继续累加

```ts
enum Items {
  A, //0
  B=10, //10
  C, //11 ====>从上一个项+1
  D //12 
}
```

指定部分枚举值为非数字，其后的字段必须指定值

```ts
enum Items {
  A, //0
  B='test', //10
  C,  //报错！
}
```

![image-20230516181233506](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/JS/20230516181233%20.png)

## 函数类型

### 介绍

**函数声明**

入参列表标注类型，对于返参可以指定类型，不指定也会自动推断

```ts
function add(a:number,b:number):number{
    return a+b
}
```

**函数表达式**

入参列表标注类型，对于返参可以指定类型，不指定也会自动推断

```ts
let add=(a:number,b:number):number=>{
    return a+b
}
```

### 入参修饰符

* 可选参数`param ?`

  调用函数时的实参，按照形参顺序传入的，所以可选参数必须在最后

  ```ts
  function f1(name:string,age?:number){
      console.log(name,age);
      
  }
  f1('tom')//tom undefined
  ```

* 默认参数 

  默认参数位置没有要求，如果要使用默认值，需传入undefined

  ```ts
  function f1(name:string='tom',age?:number){
      console.log(name,age);
      
  }
  f1(undefined,20)//tom 20
  ```

### 函数重载

TypeScript 中的重载是伪重载，如下代码。前两个是函数签名，最后是函数实现，即虽然入参不同，但其实只有一种函数实现

其他语言中，可以对每一种入参，定义一种具体实现

```ts
//计算数组平均值
function getAverage(arr: number[]): number; // 函数签名1
function getAverage(arr: string[]): number; // 函数签名2
function getAverage(arr: any[]): number { // 函数实现
  let sum = 0;
  arr.forEach(num => {
    sum += Number(num);
  });
  return sum / arr.length;
}

const nums = [1, 2, 3, 4, 5];
const strs = ['1', '2', '3', '4', '5'];

const result1 = getAverage(nums);
console.log(result1); // Output: 3

const result2 = getAverage(strs);
console.log(result2); // Output: 3
```


TS中函数重载更多的作用还是用来处理一个函数，但是需要传入不同类型入参的情况

所以，我们其实可以使用泛型来约束入参

```ts
//约束泛型为字符串数组或数字数组
function getAverage<T extends Array<string> | Array<number>>(arr: T): number {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += Number(arr[i]);
    }
    return sum / arr.length;
}

const nums = [1, 2, 3, 4, 5];
const strs = ['1', '2', '3', '4', '5'];

const result1 = getAverage(nums);
console.log(result1); // Output: 3

const result2 = getAverage(strs);
console.log(result2); // Output: 3
```

## 接口类型

接口类型可以描述对象/类、函数、构造器

注意：接口字段一般用逗号分隔，也可以用分号、换行）不要和JS对象、枚举类型混淆

### 描述对象

```ts
interface IPerson {
  	// 普通属性
    name: string;
    // 函数签名 （下面提到了 3 种函数签名方式）
  	getName:()=>string
}

// ------ 无论是描述哪种，都需要实现类型的值 ------

// 描述对象类型
const obj: IPerson = {
    name: 'tom',
    getName(){
        return this.name
    }
}

console.log(obj.getName())

// 描述类
class Person implements IPerson {
    name: string;
    constructor(name:string){
        this.name=name
    }
    getName(){
        return this.name
    }
}
```

#### 函数签名

函数必须实现函数体，而函数签名则不用实现函数体，相当于定义了一个函数模版

在接口中使用函数签名用，可以用来实现面向接口编程，如何实现具体函数的方式参见【函数签名】章节

```ts
interface a{
		f1(a:number,b:number):number // 函数声明签名
  	(a:number,b:number):number // 匿名函数表达式签名
  	f2:(a:number,b:number)=>number // 函数表达式签名 ，注意这种方式在 => 后是类型 	
}
```

函数声明、匿名函数表达式（axios库就是这种实现）

```ts
// 实现Counter，需要其本身即可以当函数、还可以当对象调用reset方法
interface Counter{
  (start:number,increment:number):number
  reset():void
}

// 构造返回一个Counter
function getCounter():Counter{
  let counter=function (start:number,increment:number):number{
    return start+increment
  } as Counter 
  counter.reset=function(){

  }
  return  counter
}

// c是实现了Counter的实例，可以看到既是个函数，也是个对象
let c:Counter=getCounter()
c(1,10)
c.reset()
```

#### **类实现接口**

#### 索引签名

如果不清楚对象的 key 有哪些，可以使用索引类型描述对象

```ts
interface Stu{
  [key:string]:string // 注意： key 只能是 string 、 number 、 symbol 这三种
}

let s:Stu={
  name:'tom',
  other:'其他信息'
}
```

修饰key为只读类型

```ts
interface ReadonlyRecord{
  readonly [key: string]:string
}
```

#### 属性修饰符

```ts
interface Student {
  // 只读属性
  readonly name:string,
  // 可选属性
  age?: number, 
}
```



### 描述函数

匿名函数表达式签名，可以用来描述函数

```ts
interface SayHello {
  	
    (name: string): string;
}

const func: SayHello = (name: string) => {
    return 'hello,' + name
}
```

### 描述构造器

JS 中函数可以使用 new 创建对象，但是 TS 中明确区分开了

函数不可以用来构造对象

```ts
let Person:Function
const p=  new Person() // This expression is not constructable. Type 'Function' has no construct signatures
```

需要定义为构造器类型

```ts
// 定义 Person 接口
interface Person {
    name: string;
}

// 定义 PersonConstructor 构造器类型
interface PersonConstructor {
    new (name: string): Person;
}

const P: PersonConstructor = class CreatePerson {
    constructor(public name: string) {}
}

// 使用构造函数创建实例
const person = new P('Alice');
```

### 继承、实现

```ts
interface A {
 
}
interface B {
  
}
// ------------- 继承接口 -------------
class SomeData extends A {}
class SomeData extends A,B {} // 继承多个接口

// ------------- 实现接口 -------------
class SomeData implements A {}

// ------------- 实现+实现接口 -------------
class B extends A implements B{}
```

注意 :同名接口类型会被合并

````ts
interface A {
    name:string;
    age:number;
}
interface A{
    score:number;
}

//接口A是两个接口的合并
let b:A={
    name:'tom',
    age:20,
    score:100
}
````

**接口继承类**

例子<a href="#接口可以继承其他类">详见</a>

## 类 类型

JS中的面向对象机制并不健全，TS也完善了JS中关于面向对象的部分

从整体分析：

* 类的成员分为：静态成员static、普通成员（默认）

* 访问限定符：public（默认）/ private/ protected/readonly 《注意：无论是哪种成员都可以使用》

### 类的成员

静态方法中的this指向所有静态成员

普通方法中的this指向所有普通成员

```ts
class Animal {
  static animalName:string
  
  static setName(animalName:string){
    // 访问到静态变量
    this.animalName=animalName
  }
}

Animal.setName('1')
console.log(Animal.animalName) // 1
```

### 访问修饰符

包括：

- public：此类成员在**类、子类、类的实例**中都能被访问
- private：此类成员仅能在**类的内部**被访问
- protected：此类成员仅能在**类与子类的内部**被访问，你可以将类和类的实例当成两种概念，即一旦实例化完毕（出厂零件），那就和类（工厂）没关系了，即**不允许再访问受保护的成员**
- readonly：给**类的实例**设置只读属性

**public成员**

public为默认值，可省略

```ts
class Animal {
  name: string
  constructor(name:string){
    this.name=name
  }
  move(distance: number) {
    console.log(`${this.name} moved ${distance} meters.`);
  }
}

class Dog extends Animal {
  constructor(name: string) {
    super(name)
  }
  
  move(distance: number) {
    console.log('狗');
    super.move(distance)
  }

}

let dog = new Dog("Buddy");
dog.move(10); // 输出： 狗  "Buddy moved 10 meters."

```

**private**

```ts
class Animal {
  private name: string =''

  constructor(name:string) {
    // 只能在类内部访问
    this.name=name
  }
}

class Dog extends Animal {
  constructor(name: string) {
    super(name)
  }
}
```

**protected**

用它修饰构造函数，可以阻止函数被实例化。例如我们希望用户只能使用类的静态方法

```ts
class Animal {
  protected  name
  protected constructor(name:string) {
    this.name=name
  }
}

// 报错
new Animal()
```

**readonly**

只读修饰的属性指的是实例化后的对象无法修改

```ts
class Animal {
  readonly  name
   constructor(name:string) {
    this.name=name // 这里是可以修改的
  }
}

let animal=new Animal('1')

// 报错
animal.name=""
```

### 抽象类

与接口的区别：

* 接口定义了一组方法的签名（即方法的名称和参数列表），但不包含任何实现。抽象类可以定义抽象方法（未实现的方法）和抽象方法（已实现的方法），注意子类可以覆盖已实现的方法
* 接口可以被实现、被继承，且一个类只能实现多个接口、继承多个接口。抽象类只能被继承，且一个类只能继承一个抽象类



## 类型运算符

### 泛型

泛型就是类型编程中的入参

#### 泛型分类

泛型其实可以类比为函数的入参，只不过入参是类型，经过函数内部处理返回了一个新的类型

在使用包含泛型的类型时，会指定泛型具体为哪种类型

##### 泛型别名

type关键字命名新类型时，可以在类型名后的`<>`中，指定入参泛型；在`=`后进行处理，返回新类型

```ts
type Factory<T> = T;
var a:Factory<string> //声明变量a的类型时，必须指定传入得泛型。a是string类型
```

##### 泛型接口

定义接口时，可以在接口名后的`<>`中，指定入参泛型T

在接口体里消费泛型

例子：我们常用的接口返回值结构，可以参考下面：

```ts
//定义接口统一的返回值结构，其中data每个具体的接口不同。使用泛型传入
interface response<T=unknown> {
    code: number
    data: T
    msg: string
}

// 这里定义了data的结构
interface student {
   name:string
   age:number
}
  
// fetchUserProfile模拟了一个接口请求。返回了Promise，Promise是一个TS内置支持泛型的类型，传入的泛型即为resolve返回值的类型
async function fetchUserProfile(): Promise<response<student>> {
    return {
        code: 0,
        data: {
            name: 'tom',
            age: 20
        },
        msg: 'ok'
    }
}
```

##### 泛型函数

定义function函数时，可以在函数名后的`<>`中增加泛型T

在入参列表中、返参、函数体中可以消费这个泛型

例子：普通函数

```ts
function handle<T>(input: T): T {// 入参input必须是T类型，且函数返回值也是T类型
    return input
}

// 调用时传入泛型
handle<string>("tom") // 入参必须是string类型，且返回值被推导为string类型

handle("tom") //TS类型推导。 入参是string，所以泛型T就是string类型。所以就不用显式传入了
```

例子：箭头函数

```ts
const handle = <T>(input: T): T => {}
```

例子：函数类型的变量

```ts
add:<T>(input:T)=>T
```

函数体内部消费泛型的例子

```ts
function handle<T>(input: T): Promise<[T]> {
  	//函数体内部也可以使用泛型
    return new Promise<T>((resolve, rej) => {
        resolve(input);
    });
}
```

##### 泛型类

Class 中的泛型消费者是**普通成员**

```ts
class Queue<TElementType> {
    private _list: TElementType[]

    constructor(initial: TElementType[]) {
        this._list = initial;
    }

    // 入队一个队列泛型子类型的元素
    enqueue<TType extends TElementType>(ele: TType): TElementType[] {
        this._list.push(ele);
        return this._list;
    }

}

//创建类时指定泛型为string
let q= new Queue<string>([])
//enqueue方法也需要指定泛型，且泛型是string类型的子类型。这里指定了字面量类型”1“
q.enqueue<'1'>('1')
```

#### 泛型约束

泛型就像是入参，传入泛型就可以消费泛型

我们可以通过**泛型约束**，来限制传入的泛型是什么范围

1、**泛型默认值**

当不传入泛型时的默认值

```ts
type Factory<T = boolean> = T;
var a:Factory //a是boolean类型
```

2、**泛型限制类型范围**

类似于类继承的语法，`T extends B`表示泛型T必须属于B类型

使用基本类型：

```ts
// T只能是string类型
type Factory<T extends string> = T;
var a:Factory<"tom"> //类型为字面量 "tom"
```

使用接口

```ts
interface lengthWise{
  length:number
}

function getLength<T extends lengthWise>(arg:T){
  // 限制了传入的泛型必须拥有length属性，这时候arg才会提示length属性
  return arg.length
}
```

使用联合类型：B中的联合类型必须完全包含A

```ts
var a:1|2|3 extends 1?'Yes':'No' //No类型

var a:1|2|3 extends 1|2|3|4?'Yes':'No' //Yes类型
```

例外情况，联合类型作为泛型参数时

* entends比较时，完全裸露会比较特殊

  ```ts
  type Extract<T, U> = T extends U ? T : never;
  var a:Extract<1|2|3,1|2>  //a是数字字面量类型 1
  ```

  extends会将T中的联合类型拆开，分别判断。最后合并成新的新的联合类型，即`1|2`

  ```ts
  1 extends U ? 1 : never; //1
  2 extends U ? 2 : never; //2
  3 extends U ? 3 : never; //never
  ```

* 不裸露（用数组），则是正常表现

  ```ts
  type t<T>=[T] extends [1|2]?"Yes":"No"
  let a:t<1|2|3> //"No"类型
  ```

3、多个泛型，直接限制关系

```ts
function getValue<T,K extends keyof T>(obj:T,key:K):T[K] {
  return obj[key]
}


getValue({a:'1'},"a")
```

4、限制入参类T（工厂函数）

在TS中class即是类型，又是值可以调用静态成员

class不能描述构造函数

```ts
class Animal{
  constructor() {
  }
}
function create<T extends Animal>(c:T):T { 
  // 报错 c 是构造函数，不能用类描述
  return new c()
}
```

使用 `new()=>类` ，描述构造函数

````ts
function create<T>(c:new()=>T):T { // ts中new函数，表示类的构造函数
  return new c()
}
````



### 类型别名

给复杂的类型，定义一个别名

```ts
type A = string;

type B = 200 | 301 | 400 | 500 | 502; //联合类型
```

带泛型的类型别名(泛型章节详细讲述)

```ts
type MaybeNull<T> = T | null; //MaybeNull可能为指定的类型T，也可能为null

type MaybeArray<T> = T | T[];


//函数泛型
function ensureArray<T>(input: MaybeArray<T>): T[] {
  return Array.isArray(input) ? input : [input];
}
```

### 联合类型 | 、交叉类型 &

#### 联合类型

符合其一即可

```ts
let a: string|boolean|number //a可以是string或boolean或number
```

any类型

```text
any就是 string | number | symbol 组成的联合类型
```

注意：接口的联合，只能调用两者共同的方法、属性

```ts
interface Dog{
  name:string
  run():void
}
interface Cat{
  name:string
  eat():void
}
function getAnimal():Dog|Cat{
	//xxx
}

// 只有共同的属性
getAnimal.name

```

如何解决详见【类型保护】

#### 交叉类型

将多个类型合并为一个新的类型，新的类型包含全部成员的特征

对于对象字面量

```ts
type newType = {a: number } & {c: boolean};

// 必须包含a、c字段
let x:newType={
    a:1,
    c:true
}
```

对应基础类型，不可能存在兼容两种基础类型的值，所以其相当于never

```ts
type a = string & number; //never
```

```ts
type UnionIntersection2 = (string | number | symbol) & string; // string
```

接口、对象中同层级且同名的字段，类型互斥，也会直接推断为never类型

### 条件类型 T extends ?  M: N

相当于 if else 

```ts
type res = 1 extends 2 ? true : false; // 相当于 type res = false

// 上面是静态的没啥意义。一般都是对泛型进行运算，泛型相当于类型运算中的入参
type res<T> = T extends 2? true:false
let a:res<1> // false
let a:res<2> // true
```

### 提取类型 infer

一般分三步来做：

* 传入泛型时需要约束类型

* 分解泛型（根据泛型类型不同，分解方式也不一样），infer 提取分解后的某部分，不关心的部分用 any 类型忽略掉就行
* T extends xxx ?  提取成功返回的类型 ：never 

注意：infer xx 是**声明变量 xx**，并将类型提取到 xx 中

#### 提取数组类型

使用**解构**分解泛型，获取第一个、第二个元素（`any[]`等价于`Array<any>`）

```ts
// 第一个 extend 是约束T 为数组，后续分解 T 才能使用解构
type Swap<T extends any[]> = T extends [infer A, infer B] ? [B, A] : never;

type SwapResult1 = Swap<[1, 2]>; // 符合元组结构，首尾元素替换[2, 1]
type SwapResult2 = Swap<[1, 2, 3]>; // 不符合结构，never
```

更复杂的提取数组的例子

```ts
// 提取第一个 注意下：...any[] 这里的用法
type ExtractFirst<Tuple extends unknown[]> = Tuple extends [infer T,...any[]] ? T : never;

// 提取除第一个外剩余数组
type ExtractFirst<Tuple extends unknown[]> = Tuple extends [infer T,...infer R] ? R: never;

// 提取首尾两个
type ExtractStartAndEnd<T extends any[]> = T extends [
  infer Start,
  ...any[], 
  infer End
]
  ? [Start, End]
  : T;

// 调换开头两个
type SwapFirstTwo<T extends any[]> = T extends [
  infer Start1,
  infer Start2,
  ...infer Left
]
  ? [Start2, Start1, ...Left]
  : T;
```

#### 提取字符串类型

使用**模板字符串**分解泛型

```ts
type Replace<
  OriginStr extends string,
  From extends string,
  To extends string
> = OriginStr extends `${infer Prefix}${From}${infer Suffix}`? `${Prefix}${To}${Suffix}`:OriginStr 

type xxx = Replace<'abc','b','d'>
```

突然发现一个技巧：可以赋值给一个类型，编辑器会提示出推导的类型。这样就好像是在调用一个类型函数，返回值是类型

![image-20241123223940983](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20241123223941IsXeGh.png)



#### 提取函数类型

提取函数的 **参数**、**返回值**的类型

注意：函数的约束、构造器的提取方式

```ts
// 提取参数
type GetParameters<Func extends Function> = 
    Func extends (...args: infer Args) => unknown ? Args : never;

// 提取返回值类型
type GetReturnType<Func extends Function> = 
    Func extends (...args: any[]) => infer ReturnType 
        ? ReturnType : never;
```

#### 提取构造器类型

提取构造器的 **参数**、**返回值**的类型

提取构造器返回值类型

```ts
// 
type GetInstanceType<
    ConstructorType extends new (...args: any) => any
> = ConstructorType extends new (...args: any) => infer InstanceType 
        ? InstanceType 
        : any;


// 例子
interface Person {
    name: string;
}

interface PersonConstructor {
    new(name: string): Person;
}

type xx =GetInstanceType<PersonConstructor>
```

提取构造入参类型

```ts
type GetConstructorParameters<
    ConstructorType extends new (...args: any) => any
> = ConstructorType extends new (...args: infer ParametersType) => any
    ? ParametersType
    : never;
```

#### 提取对象字面量/接口类型

通过**解构**分解泛型

```ts
// 提取对象的属性类型
type PropType<T, K extends keyof T> = T extends { [Key in K]: infer R }
  ? R
  : never;

type PropTypeResult1 = PropType<{ name: string }, 'name'>; // string
type PropTypeResult2 = PropType<{ name: string; age: number }, 'name' | 'age'>; // string | number

```

提取对象类型某个 key 的 Value 。如下可提取 Vue 中 Ref 类型

```ts
type GetRefProps<Props> =  Props extends { ref?: infer Value | undefined } ? Value : never

// 传入对象字面量类型
type xx = GetRecordValueType<{
    ref:'tom'
}>


// 传入接口类型
interface Ref {
    ref:'tom'
}
type xx = GetRecordValueType<Ref>
```



#### 提取Promise

使用**`Promise<xx>`** 分解泛型

```ts
type p = Promise<string>;
type GetValueType<T> = T extends Promise<infer Value> ? Value : never;

type xxx = GetValueType<p>  //  string
```



### 映射类型

#### 遍历联合类型 in

**in**关键字，可以将联合类型遍历出来。相当于 for 循环

#### 索引查询 keyof T、索引访问 T[key]

将 数组类型、对象类型的索引展开为联合类型

**数组类型**

将数组类型转换为联合类型

```ts
type pickArr<T extends Array<string>> =  T[number]

let a:pickArr<['a','b']> // "a" | "b"
```

**对象类型**

* 将 Foo 的 Key 转化为联合类型

  ```ts
  interface Foo {
     propA: number;
     propB: boolean;
     propC: string;
  }
  
  let b: keyof T
  
  //'propA'|'propB'|'propC'类型。注意：这里的'propA'、'propB'、'propC'是字符串字面量类型
  ```

  keyof any是一个特殊用法，生成如下的联合类型

  ```ts
  let a:keyof any //string | number | symbol
  ```

* 通过key获取，其对应的类型

  ```ts
  //通过key类型访问key的类型
  interface Foo {
      name:string
  }
  type xxx = Foo['name'] // string
  
  type yyy = Foo['name'] // string
  ```

  如果 key 不存在返回类型 undefined

  ```ts
  type Foo<T extends Record<string,string>> = T['name'] // 这里必须得将类型放松到 Record
  
  type yyy2 = Foo<{age:'20'}>  // undefined
  ```

* 综合起来。⚠️：下面的运算返回的是 Value 的联合类型

  ```ts
  type Values<T> = T[keyof T];
  type xxx = Values<{
      name:'tom',
      age:12
  }>
  ```

  ![image-20241201235652713](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20241201235652TNqOZI.png)
  
  

#### 综上应用

上面的操作符，可以实现对签名类型的处理

```ts
// 将签名类型的每个 key 都变成可选的
type MapType<T> = {
  [Key in keyof T]?: T[Key] 
}

// name、age变成可选的属性
interface Person{
    name:string,
    age:number
}
let p:MapType<Person> ={
    name:'tom'
}
```

## 类型编程

### 模式匹配





## 内置类型工具

TS内置了一些泛型工具，类似于JS中的内置函数，这些泛型工具传入一个泛型，就会返回一种新的类型 

### 其他泛型工具

* Promise

  `Promise<T>`指定resolve参数的类型为T

  ```ts
  async function fetchUserProfile(): Promise<string> {
      return "tom"
  }
  ```

* 数组

  `Array<T>`指定数组中的元素类型为T
  
  ```ts
  const arr: Array<number> = [1, 2, 3];
  
  // 不用泛型，也能声明数组
  const arr:number[]=[1,2,3]
  ```
  
  `ReadonlyArray<T>`只读数组
  
  ```ts
  let a:ReadonlyArray<number>=[1]
  ```
  

###  创建对象结构的工具

* **`Record<T,K>`**

  生成一个接口，key为T类型，value为K类型

  ```ts
  var a:Record<string,string|number>={
      name:"tom", //key是字符串，值是字符串
      age:20//key是字符串，值是数字
  }
  ```

  可见，有时候我们使用泛型工具，可以快速生成我们想要的结构

  业务中常用的，一般就是把value指定为unknown或者any

  ```ts
  Record<string, unknown> 
  
  Record<string, any> 
  ```

  TS内部实现

  ```ts
  type Record<K extends keyof any, T> = {
      [P in K]: T;
  };
  ```

  

* **`Pick<T,K>`**

  T是接口，K是字面量类型（字面量类型组成的联合类型、交叉类型）

  在接口T中挑选key为K的属性（K必须是接口T的key之一），并返回新的类型

  ```ts
  interface student{
      name:string
      age:number
   		score:number
  }
  //挑选student中key是name、age的属性，返回新的类型
  var a:Pick<student,"name"|"age">={ 
    	name:'tom'
      age:18
  }
  ```

  TS内部实现

  ```ts
  type Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };
  ```

  

* **`Omit<T,K>`**

  T是接口，K是字面量类型（字面量类型组成的联合类型、交叉类型）

  在接口T中剔除key为K的属性，并返回新的类型

  TS内部实现

  ```ts
  type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
  //Exclude<T,K> 即在联合类型T的基础上剔除属性K，返回新的类型
  ```

  

### 修饰对象属性的工具

* **`Partical<T>`**

  T一般是接口类型，将T定义的对象字段全部变为可选字段

  ```ts
  interface student{
      name:string
      age:number
  }
  var a:Partial<student>={
      name:'tom', //name、age变为可选字段
  }
  ```

  TS内部实现

  ```ts
  type Partial<T> = {
      [P in keyof T]?: T[P];
  };
  
  ```

* **`Required<T>`**

  T一般是接口类型，将T定义的对象字段全部变为必选字段

  TS内部实现

  ```ts
  type Required<T> = {
      [P in keyof T]-?: T[P]; //-?表示删除可选
  }; 
  ```

* **`Readonly<T>`**

  T一般是接口类型，将T定义的对象字段全部变为只读字段

  TS内部实现

  ```ts
  type Readonly<T> = {
      readonly [P in keyof T]: T[P];
  };
  ```

* **补充：泛型编程**

  ```
  -? //表示去掉对象字段的可选标记
  -readonly //表示去掉对象字段的只读标记
  ```

  例如实现一个移除只读标记

  ```ts
  type removeReadOnly<T> = {
     -readonly [P in keyof T]: T[P];
  };
  ```

* **待补充**

  目前，提供的三个内置操作对象的类型，只能操作对象的第一层，如果是比较深的对象该如何处理？

### 集合工具

求交集、并集、差集、补集

* **`Extract<T,U>`**

  交集

  TS内部实现

  ```ts
  type Extract<T, U> = T extends U ? T : never;
  ```

* **`Exclude<T,U>`**

  T-U的差集 

  TS内部实现

  ```ts
  type Exclude<T, U> = T extends U ? never : T;
  ```

* **`NonNullable<T>`**

  剔除T中的null、undefined类型

  ```ts
  type falsy=""|0|false|null|undefined
  
  var a:NonNullable<falsy>=0 //a不能接受null|undefined类型的值
  ```

  TS内部实现

  ```ts
  type NonNullable<T> = T extends null | undefined ? never : T;
  ```

### 模版字符串工具

```ts
Greet<T extends string | number> = `Hello ${T}`;

//注意这里才是定义
type Greet1 = Greet<"tom">; // "Hello tom"
```



## TS类型推导

### 最佳通用类型

在没有明确指定类型的情况下，根据变量的初始值推断出的类型

推断的类型是精准的，如果不符合我们的要求，可以扩大类型的范围

```ts
//const关键字，初始化时会被推导为最为精确的字面量类型
const a=1 //数字字面量类型 1

//number类型
let a=1 
```

最佳通用类型推断，会尽量精确的推断类型

```ts
class Animal{
  constructor() {
  }
}

class Dog extends Animal{
  move():void{}
}

class  Cat extends Animal{
  run():void{}
}

let zoo=[new Dog(),new Cat()] //自动推断为联合类型 (Dog|Cat)[] 类型

// 我们可以手动标记 let zoo:Animal[] 扩大类型
```

根据函数返回的值进行推导

```ts
// 函数返回值会被推导为number类型
function f(){
    return 1
}

// 无return或只有一个return，返回值会被推导为void
function f(){
    return 
}
```

### 上下文类型

根据表达式的上下文（即表达式在何处被使用）推断出表达式的类型

```ts
// onmousedown是内置的函数，ts会将该函数的类型推导到我们函数上
window.onmousedown=function (e){
  
}
```

可以看到编辑器的类型提示

![image-20231224201835118](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20231224201835Pz3IK7.png)

如果上下文推断不符合要求，我们可以扩大类型的范围

```ts
window.onmousedown=function (e:any){
  
}
```



### 类型保护

对于联合类型的变量，只有在代码运行时才能确定具体的类型，所以 TS无法在确定其精准类型

可以通过代码的方式手动使得TS收窄类型

#### typeof

TS会根据流程控制逻辑尝试收窄类型（注意最后类型被判断为never类型）

```ts
function f1(input:string|number){
    if(typeof input==='string'){
        console.log('string类型',input)//推导为string类型
    }else if(typeof input==='number'){
        console.log('number类型',input)//推导为number类型
    }else{
        console.log('never类型',input) //流程正常是不会进入这里的，会被自动推导为never类型
    }
   
}
```

####  is（类型谓词）

**类型收窄失败**

如果if中使用的是另一个函数来判断类型的，就会造成失败（TS不能提取函数外的逻辑来分析类型）

这种函数被称为**类型守卫**

```ts
function isString(input:unknown){ //函数返回值，推导为boolean
    return typeof input ==='string'
}

function f1(input:string|number){
    if(isString(input)){
        console.log('string类型',input) //推导为string|number类型
    }
   
}
```

如何解决?

这种用来判断类型的函数，将返回值类型指定为**入参 is 预期类型x**，

当函数返回值为true时，TS会将入参类型收窄为**预期类型x**

注意：TS仍然不能提取函数外的逻辑来分析类型，这里是因为我们告诉了编译器预期的类型。即使我们预期的类型是错的，TS也会无条件相信我们

```ts
function isString(input:unknown):input is string{//函数返回值，指定为input is string
    return typeof input ==='string'
}

function f1(input:string|number){
    if(isString(input)){//这里调用函数，函数返回值为true，返回值类型是input is string。入参类型会被收窄为string
        console.log('string类型',input)
    }
}
```

#### in

in关键字判读对象中是否存在属性

但是in关键字，对于有同名属性的类型是无法区分开的，TS会推导变量为这些类型的联合类型

例如下面两个对象都有shared属性，用in判断后，入参被推导为A|B，导致变量无法使用onlyA、onlyB属性

```ts
interface A {
    onlyA:string //只有A有的属性
    shared:string //A、B共同属性
}

interface B {
    onlyB:string //只有A有的属性
    shared:string  //A、B共同属性
} 

function handle(input: A|B){
    if('onlyA' in input){
        console.log(input);// 推导为A类型
        return
    }

    console.log(input); // 这里就收窄为B类型
}


function handle2(input: A|B){
    if(!('onlyA' in input)){ // 还可以不包含
        console.log(input);// 推导为B类型
        return
    }

    console.log(input); // 这里就收窄为A类型
}
```



### 结构类型

TS使用的是结构类型来进行类型推断的

结构类型也称为**鸭子类型**，其核心理念是，**如果你看到一只鸟走起来像鸭子，游泳像鸭子，叫得也像鸭子，那么这只鸟就是鸭子**

例子：Dog包含的了Cat的全部属性，则被认为是兼容Cat类型的

```ts
class Cat {
  eat() { }
}

class Dog {
  eat() { }
  meow() { }
}

function feedCat(cat: Cat) { }

// 不会报错！
feedCat(new Dog())
```

## TS指令

通过TS指令可以指定在某一部分关闭TS类型检查

**单行指令**

作用范围仅仅是下一行

* **@ts-ignore**：忽略下一句中的类型检查错误

  ```ts
  //@ts-ignore
  var a:number="hello"
  ```

* **@ts-expect-error**：忽略下一句中的类型检查错误，前提是必须真的有错误时才能使用

  ```ts
  //@ts-expect-error
  var b:number='hello'
  ```

  否则提示未使用的指令

  ![image-20230425194936900](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/JS/20230425194937%20.png)



**文件指令**

作用范围是整个文件，其必须写在文件的最顶部

* **@ts-nocheck**：关闭整个文件的TS类型检查

  ```ts
  //@ts-nocheck
  var a:number='hello'
  
  var b:number='world'
  ```

* **@ts-check**：开启整个文件的TS类型检查

  TS文件默认开启检查。JS文件可以通过JSDoc来添加类型标注，通过这个指令可以开启JS文件的类型检查

  ![image-20230425200400518](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/JS/20230425200400%20.png)

## d.ts文件

之前这里的知识一直很混乱，是因为没有区分开JS项目、TS项目的场景。这里梳理下

### TS项目

* 自己编写的TS代码，其本身就带类型，所以能做类型检查，根本用不到d.ts文件

  但是，很多项目都需要编译为JS使用，例如npm包。TS编译后会生成 JS文件 + d.ts文件 

  * JS文件：保留了逻辑部分，但是TS代码中的类型被去掉了
  * d.ts文件：记录了 JS中变量、函数等声明 与 类型 之间的映射   

  如下d.ts文件

  ```ts
  //global.d.ts
  declare let name:string  // 变量name的类型  ---> string类型
  
  declare getNameById:(id:string)=>string // 函数getNameById  ---> 对应入参string、返参string
  
  // 补充： declare表示全局定义的类型 所有JS文件中的name都成了string类型
  ```

  这部分无需手写d.ts文件，是编译自动生成的

* 宿主环境提供的变量、对象等

  这种值也是没有类型的，使用时TS类型检查会报错。我们需要d.ts文件

  ```ts
  // global.ts
  declare const wx:Record<any, any>; // 小程序环境下提供的wx对象，我们就需要指定下类型
  
  // index.ts
  wx.showToast({
    title:'hello'
  })
  ```

  不过，对应微信小程序来说，选择官方的TS模版，会自动在项目里帮我们生成这些对象、函数对应的类型。

  ![image-20231028233944617](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/minprogram-template/20231028233944%20.png)

* 非TS模块

  项目中已经原本存在的类型，不满足我们的要求。我们需要手写d.ts文件

  详见**编写d.ts**章节
  
  
  
* 引入了第三方npm包：

  * TS编写的包，这种包编译为JS时，会带着d.ts文件来做类型提示（定义文件一般在入口文件所在目录下index.d.ts/global.d.ts或者package.json的typings字段也可以指定）

  * JS编写的包，这种包是没有类型提示的。但是我们有两种方案：

    * 如果存在 @types/xxx 的包，这是其他人为JS项目手写的d.ts文件

      下面是是 @types/node的包，其中包含着xxx包的d.ts定义文件

      ![image-20231028225555360](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/minprogram-template/20231028225555%20.png)

    * 如果没有这种包，则必须手写d.ts实现JS项目的类型支持





### JS项目

JS项目没有类型检查，无需d.ts包。即使下载的npm包不支持类型，也没有关系

但是，我发现一个很好玩的点： TS编译为JS+d.ts

如果，我们为JS项目编写d.ts文件会如何？

* 编辑器会有输入提示，记住d.ts是给编辑器看的
* 通过给JS文件增加 @ts-check ，来进行代码检查

公司JS项目，我推荐给一些公共的函数编写d.ts文件，编码时的提示会极大地提高效率



### d.ts的作用

总结下：

在TS项目中，用来补充没有类型覆盖的场景

在JS项目中，为JS代码提供编辑器提示（可以看这个文章里的示例：https://www.php.cn/faq/394698.html，其实就是编写JS中变量、函数、对象对应的d.ts文件）



### 编写d.ts

接下来，我们全面的讲解下

前提，请记住编写d.ts的核心是：声明全局变量+该变量的类型

定义d.ts文件(declare表示全局定义的类型)

基础语法：

```js
//global.d.ts

// 1、全局变量name的类型  ---> string类型
declare let name:string 

// 2、全局函数，这里可以看到使用的函数签名的方式标记类型。（?:表示参数可选）
declare const getNameById:(id:string,phone?:number)=>string 
declare function getNameById(id:string,phone?:number):string 

// 利用TS的重载机制。指定不同入参
declare const getNameById:(id:string)=>string 
declare const getNameById:(phone:number)=>string 


// 3、全局类
declare class Person{
  static name:string
  constructor(name:string) // 构造函数的声明，与普通函数不同，是没有返回值的
  static getName():string
  //static getName:()=>string // 错误写法
}

// 4、全局的对象（命名空间）。namespace 是 ts 早期时为了解决模块化而创造的关键字，随着ES6开始支持模块化其模块化的功能已逐渐淘汰。目前，常用来表示全局变量是一个对象，包含很多子属性。
// 比如，如果担心上面定义的全局变量的污染全局，就可以放入全局的命名空间中
// 比如全局的name声明，会导致所有JS文件中的name都成了string类型，我们可以把他放在namespace中
declare namespace Stu{
 	let name:string 
	getNameById:(id:string,phone?:number)=>string 
}
// JS代码中输入`Stu.`就会出现输入提示


// 5、interface。注意：接口不需要declare，就有全局作用域
interface request {
    method?: 'GET' | 'POST'
    data?: any;
}
// 由于



// 6、全局模块名（前面已经讲的很详细了）
// 语法 module <文件通配符|JS模块名>，用来声明模块的（TS、JS模块、非代码的）。

// 例子一：
// nprogress这个模块是用来在项目中显示进度条的模块，但是官方没有类型定义文件，如果在ts项目中import这个包，会提示找不到声明文件： Cannot find module or its corresponding type declarations.
// 由于我的项目只用到了start、done两个方法，所以导出了这两个类型定义，并不是这库只有这两个方法
// 在d.ts文件中加入下面的声明就不会提示没有类型文件的错误了，而且点击代码中nprogress的方法会跳转到我们定义的这个d.ts文件中
declare module 'nprogress' {
  const nprogress: {
    start: () => void
    done: () => void
  }
	// 官方文档的引入方式为： import nprogress from 'nprogress'。可知模块是默认导出。这里页默认导出类型
  export default nprogress
    
  // 如果是 import {start,done} from 'nprogress'，那就具名导出
  // declare module 'abc' {
  //	  export const start: () => void
  //   	export const done: () => void
	// }
    
  // 特别注意，下面的写法是错误的。切记，我们导出的是类型
  //export default {
  //   start: () => void
  //   done: () => void
  //}
}

// 例子二：非代码文件
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
 
// 7、扩展已存在的类型
  
// 7-1 扩展编辑器内置的类型（下面例子利用了同名的interface类型，会自动进行行合并的特点）
// 如下Window接口中，我们新增了userTracker属性。我们在使用该类型时就不会提示属性不存在了
interface Window {
  userTracker: (...args: any[]) => Promise<void>;
}
window.userTracker("click!")

// --- 扩展Date对象，其类型是Window ---
interface Date {
  format: (date:Date,formatStr:string) => Promise<void>;
}
Date().format(xxx,xxx)
  
// 7-2 扩展第三方模块的类型 注意：需要使用三斜线指令，引入对应包的类型，否则自己写的类型会覆盖包自带的类型

/// <reference types="vite/client" />
// import.meta.env.xxx 的类型提示
interface ImportMetaEnv {
  readonly VITE_BASE_URL: string //定义提示信息 数据是只读的无法被修改
}
  
```

导出语法：

```js
// 标准ESM导出
export xx  // TS中导入模块，import * as yy from '模块名' 、 import {xx} from '模块名'
export default xx // TS中导入模块，import xx from '模块名'


// 下面这种是特殊语法，cmj模块的默认导出语法
// 要么使用cjs导入，const xx =require('模块名')
// 如果使用esm导入，必须是 import * as xx from '模块名'
// 注意：ts配置esModuleInterop设置为true，ts会为我们最一层处理，可以直接导入 import xx from '模块名'
export = xx // TS中导入模块
```

注意：

* 上面这些类型声明中的变量作用范围是全局，在任何地方都可以直接使用这些变量

* d.ts文件只是告诉编辑器，存在这些全局变量以及他们的类型定义，但是不保证这些全局变量实际真实存在。以上面声明nprogress模块为例子，我们定义了模块存在start、done两个方法，但是实际模块是否存在start、done就是模块作者决定的了

注意：如果想要d.ts文件生效

在TS项目中，需要在tsconfig.josn中引入

```json
{
  "include": ["types/**/*"], //需要在这里引入
  "compilerOptions": {
    
  }
}
```

如果是JS项目，满足下面一条即可

```
1、给 package.json 中的 types 或 typings 字段指定一个d.ts文件地址

2、在项目根目录下，编写d.ts文件，且命名必须为 index.d.ts 

3、针对入口文件（package.json 中的 main 字段指定的入口文件），编写一个同名不同后缀的 .d.ts 文件
```



特殊的情况：

有些时候，我们只是想扩展第三方模块已存在的类型。如果，我们直接导出同名类型就会覆盖掉原本的类型定义

如下写法，会导致vue-router包内的所有方法引入都报错，点击跳转类型也会跳转到下面的这个d.ts文件，而不是官方的d.ts文件

```ts
// vue-router的自定义类型
declare module 'vue-router' {
  // 路由元信息
  interface RouteMeta {
    title?: string
    icon?: string
    hiddenMenuItem: boolean
  }
}
```

需要用下面的写法，才能扩展已有类型定义文件的包

```ts
// vue-router的自定义类型
declare module 'vue-router' {
  // 路由元信息
  interface RouteMeta {
    title?: string
    icon?: string
    hiddenMenuItem: boolean
  }
}
// d.ts文件结尾增加`export {};`，你告诉 TypeScript 将当前文件视为一个模块
export {}
```



**declare关键字**

通过declare声明的类型或者变量或者模块，在include包含的文件范围内，都可以直接引用而不用去import或者import type相应的变量或者类型。

### 例子

md5包的类型定义文件

```ts
/**
 * Calculate the MD5 hash of a message.
 *
 * @param message - Message to hash.
 * @param options - Input and output options.
 * @returns MD5 hash.
 */
declare function md5(message: string | number[] | Uint8Array, options: md5.Options & { asBytes: true }): number[];
declare function md5(
    message: string | number[] | Uint8Array,
    options?: Pick<md5.Options, "asString" | "encoding">,
): string;
declare function md5(message: string | number[] | Uint8Array, options?: md5.Options): string | number[];

declare namespace md5 {
    interface Options {
        asBytes?: boolean | undefined;
        asString?: boolean | undefined;
        encoding?: "binary" | string | undefined;
    }
}

export = md5;

```

### 补充关于类型的配置

**tsconfig.json文件的types**

默认情况下，TypeScript 会加载 `node_modules/@types/` 下的所有声明文件，包括嵌套的 `../../node_modules/@types` 路径

但如果只加载实际使用的类型定义包，就可以通过 types 配置。下面配置为只有 `@types/node`、 `@types/react` 会被加载。这时其他包定义的类型就不会再有类型提示了，所以一般别加这个

```json
{
  "compilerOptions": {
    "types": ["node","react"]
  }
}
```

还有一个typeRoots配置，用来指定加载类型的规则，默认为node_modules/@types（包括嵌套）下的所有文件

我们通常可以在这里加上./typings，在项目中把d.ts放在这个文件夹中，就能被自动加载了

```json
{
  "compilerOptions": {
    // 注意这里的./是相对于baseUrl配置的路径（baseUrl默认为tsconfig.json文件目录）
    "typeRoots": ["./node_modules/@types", "./node_modules/@team-types", "./typings"],
    "types": ["react"],
    "skipLibCheck": true
  }
}
```

**tsconfig.json文件的include**

include是用来指定ts检查范围的。

如果我们自定义的d.ts文件没有放在typeRoots指定的目录中，也可以通过include导入

```json
{
  "include": ["types-dts/**/*"], 
}
```



三斜线指令：目前发现可以在ts、d.ts引入，引入后相当于引入了对应的ts文件

```
/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_BASE_URL: string //定义提示信息 数据是只读的无法被修改
}
```



## TS配置

参考：https://www.51cto.com/article/694463.html

### 编译目标相关

使用tsc编译TS才会读取这些参数，而使用rollup、vite编译打包则不一定会读取这些配置

#### target

编译为JS的版本

```
"target": "es2016", // 一般配置为es2016
```

#### removeComments

编译为JS，是否移除注释

```
"removeComments": false, // false为ts编译为js时保留注释
```

#### sourceMap

```
是否生成sourceMap
```

### 模块化相关

TS有自己的一套模块化策略，默认在TS中可以直接使用import导入esm、cjs模块

例如：dayjs实际上支持ESM、CJS模块

在ESM环境中

```
import dayjs from 'dayjs'
```

在CJS环境中

（package.json配置为了 **module:commonjs** ），TS使用兼容性策略导入了dayjs的CJS模块

```ts
import * as dayjs from 'dayjs'  //CJS没有默认导出，所以才这样写

// tsconfig  esModuleInterop:true 可以给CJS模块模拟ESM默认导出。就可以像ESM一样书写了
import dayjs from 'dayjs' 
```



#### module

module并不是指定TS项目的模块化规范，而是指定TS编译为JS后，JS代码使用的模块化风格

常见值如下：

* **commonjs**
  * 编译后的JS使用CJS模块方案
  * moduleResolution默认为classic，注意不要使用这个默认值。推荐设置为nodenext，支持esm+cjs方式引入
  * esModuleInterop默认为false
  * allowSyntheticDefaultImports默认为false
* **es6/es2015**、**esnext**
  * 编译后的JS使用ESM模块方案
  * moduleResolution默认值为classic，注意不要使用这个默认值。推荐设置为nodenext，支持esm+cjs方式引入
  * esModuleInterop默认为false
  * allowSyntheticDefaultImports默认为false
* **nodenext**
  * 编译后的JS，同时使用CJS、ESM两种模块，原本TS使用CJS的编译后还是CJS，原来TS使用ESM的编译后还是CJS
  * moduleResolutionz只能为nodenext，TS项目同时支持ESM、CJM引入导出
  * esModuleInterop默认为false
  * allowSyntheticDefaultImports默认为false

#### moduleResolution

TS代码引入模块的方式（查找模块的规则）

```
// 就是node的查找规则
node // 只支持cjs模块
nodenext // 同时支持esm+cjs方式引入

// 不推荐使用，不支持 Node.js 风格的 node_modules 文件夹查找
classic 
```

#### esModuleInterop、allowSyntheticDefaultImports

这两个配置主要还是为了解决使用 ES Module 项目中引入 CommonJS 的问题

esModuleInterop默认为false

esModuleInterop设置为true、allowSyntheticDefaultImports默认被设置为true。我们可以用import导入CJS模块

```js
// cmj
module.exports=a
module.exports=b

// esm.js如何导入？
//--------未开启 （默认）
import * as utils from 'cmj'


//-------- 开启esModuleInterop:true ，相当于为cmj模拟一个module.default={a,b} 
import utils1 from 'cmj' //当然，如果cmj中原本就提前为了兼容做了 module.exports.default={a,b}，即使不开启esModuleInterop，也能直接使用这种导入

import * as utils2 from 'cmj' // 也还能使用这种方式，只不过多了一个default的用法
console.log(utils.a)
console.log(utils.default)
```

例子

```ts
import * as dayjs from 'dayjs';
dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss')


// esModuleInterop设置为true后，可以使用默认导出
import  dayjs from 'dayjs';
dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss')
```



#### resolveJsonModule

默认false，开启后才能在代码中引入json文件，并获得类型提示

```
import jsonFile from 'xx.json'
```

### tsconfig模板

```json
{
  "compilerOptions": {
    // 目标 、模块化
    "module": "ESNext", // 输出产物的模块化方式 ESM类 、 CommonJS。⚠️这里虽然是选择产物的模块化规范，但是会影响 TS 文件编写，例如选择了CommonJS，TS 文件中使用 import.meta.url 就会报错，因为CommonJS中没有这个 API
    "target": "ESNext", // 输出的产物的ESM规范版本，ES2015-ES2023、ESNext。实际产物的特性=target支持的-module不支持的 
    "moduleResolution": "Node",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop":true,
    // 输出
    "outDir": "./dist",
    "rootDir": "./src",
    // 声明文件
    "declaration": true,
    // 严格模式
    "strict": true,
    // sourcemap
    "sourceMap": true,
    
    
    // --- 酌情修改 ---
    
    // 保留注释
    "removeComments": false // 默认ture移除注释
    
    // 打开装饰器
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
  },
  "include": ["src/**/*"], // 默认包括全部文件
  "exclude":["dist","node_modules"]
}

```



## 实践

抽象类

 https://pan.baidu.com/pfile/video?path=%2F%E7%BC%96%E7%A8%8B%E8%B5%84%E6%BA%90%2F330%20%E4%B8%8B%E4%B8%80%E4%BB%A3%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91%E8%AF%AD%E8%A8%80%20TypeScript%E4%BB%8E%E9%9B%B6%E9%87%8D%E6%9E%84axios%2F03%20%E7%AC%AC3%E7%AB%A0%20Typescript%20%E7%B1%BB%E5%9E%8B%E7%B3%BB%E7%BB%9F%E3%80%90%E5%BF%85%E5%A4%87%E5%9F%BA%E7%A1%80%EF%BC%8C%E7%89%A2%E5%9B%BA%E6%8E%8C%E6%8F%A1%E3%80%91%2F16%203-16%20%E7%B1%BB%20-%20%E6%8A%BD%E8%B1%A1%E7%B1%BB%2B%20%E9%AB%98%E7%BA%A7%E6%8A%80%E5%B7%A7.mp4&theme=light&from=home

### this标记类型

函数中传入this标记

![image-20231224021419947](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20231224021420VQGGv8.png)



回调函数中的this，需要标记否则没有提示

![image-20231224022418754](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20231224022419nxuKDk.png)

### 类型不精准

例如，变量a定义为object类型

* 如果已明确其中存在字段name，如何使用？使用断言

  ```ts
  let a: object = { name: "Alice", age: 30 };
  
  // 使用尖括号语法进行类型断言
  let name = (<{ name: string }>a).name.length;
  
  // 使用as关键字进行类型断言
  let name2 = (a as { name: string }).name.length;
  ```

* 如果是否包含name不确定

  ```ts
  let a: object = { name: "Alice", age: 30 };
  
  if ('name' in a) {
        console.log(this.a.name);
  }
  ```

  TS中的if只能对已明确存在的类型进行收紧，并不能判断未标注的类型是否存在。下面的代码会提示name不存在

  ```ts
  let a: object = { name: "Alice", age: 30 };
  
  if (a.name) { // TS2339: Property name does not exist on type object
        console.log(this.a.name);
  }
  ```

  ```ts
  function f1(input:string|number){
      if(typeof input==='string'){
          console.log('string类型',input)//推导为string类型
      }
  }
  ```

### 类型信息扩充



