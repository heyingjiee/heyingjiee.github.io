# TS学习笔记

## 学习资料

https://github.com/linbudu599/TypeScript-Tiny-Book

参考掘金小册子 《TypeScript类型体操通关秘籍》

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



## TS配置

**strictNullChecks**

默认为true，即开启空检查。类型明确的变量不可赋值为null

```ts
let a :string
a=null //Type 'null' is not assignable to type 'string'
```



**noImplicitAny**

默认true，即TS隐式自动推断类型为any

```ts
let a  //any
```

## 类型层级（待补充）

![image-20230416212437609](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/JS/20230416212438%20.png)

函数类型未在其中，待补充：https://juejin.cn/book/7086408430491172901/section/7086436622425653285?enter_from=course_center&utm_source=course_center

## 原始类型

```ts
const name: string = 'linbudu';
const age: number = 24;
const male: boolean = false;
const undef: undefined = undefined;
const nul: null = null;
const bigintVar1: bigint = 9007199254740991n;
const bigintVar2: bigint = BigInt(9007199254740991);
const symbolVar: symbol = Symbol('unique');
```

补充

**undefined、null**

undefined表示这里没有值；null表示这里有值，但是个空值

```ts
const tmp1: null = null;
const tmp2: undefined = undefined;
```

仅在关闭 strictNullChecks 配置时成立，undefined、null被视为其他类型的子类型

```ts
const tmp3: string = null; 
const tmp4: string = undefined;
```



**void**

只需记住以下场景即可

```ts
//返回值被推导为void
function func1() {}

//返回值被推导为void
function func2() {
  return;
}

//返回值类型为undefined
function func3() {
  return undefined;
}
```

## 复杂类型

### 字面量类型

在TS中值也是一种类型

```js
// type关键字用于定义类型
type Code = 1;

let x:Code=1 // x是Code类型，所以其值只能是1
```

字面量

```js
type Greet = `Hello ${string}`;  // 这里${}内需要是类型
let x:Greet='Hello jack' 


type Greet = `Hello ${number}`;  // 这里${}内需要是类型,这里必须是number类型
let x:Greet='Hello 11' 
```

注意:

```
// 空数组类型
[]

[1,2,3]

// 空对象类型
{}

{name:1,age:2}
```

### 数组与元组

**数组**

```ts
let arr:string[]
```

泛型数组

```ts
let arr:Array<string>
```

**元组**

元组是固定元素的数组，如下是有两个元素的元组（元素都是字符串类型）

```ts
let arr:[string,string]
```

**数组字面量**

```
[]
```



### 函数

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

**函数入参**

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

**函数签名**

前两种方式，本质都是声明了一个函数，必须实现函数体

而函数签名则不用实现函数体，相当于定义了一个函数模版（function关键字用来声明函数，必须实现函数体。所以签名没有使用function的形式）

```ts
//指定变量为函数签名类型（注意f1后是冒号，这里箭头后是类型）
let f1:(a:number,b:number)=>number
//对比记一下，f1后如果是等于号则是函数表达式，箭头后是函数体
let f1=(a:number,b:number):number=>{
    return a+b
}
```

在接口中使用函数签名用，可以用来实现面向接口编程，如何实现具体函数的方式参见【函数签名】章节

```ts
interface a{
  	f1:(a:number,b:number)=>number
  
  	f2(a:number,b:number):number
  
  	f3(): Promise<void> {}
}
```

**函数重载**

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


**注意**

对比记一下

```ts
// ----标记函数类型------
// 命名函数
function add(a:number,b:number):number{
  return a+b
}
// 匿名函数里的箭头函数
const add1=(a:number,b:number):number=>{
  return a+b
}
// 函数类型的变量
let add2:(a:number,b:number)=>number

// ----标记接口的函数签名------
interface test{
  // 命名函数签名
  add(a:number,b:number):number
  // 匿名函数签名
  (a:number,b:number):number
  
  // 函数类型的属性
  add2:(a:number,b:number)=>number
}
```

### 枚举

enum枚举类型，注意：每个枚举项用逗号分隔（不可省略）

默认枚举类型实际值从0开始

```ts
enum sex{
    man,  // 0
    woman // 1
}
```

也可以键与值用等于号分隔，手动指定枚举项的实际值

```ts
enum sex{
    man=0,
    woman=1
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

### 接口

接口类型可以描述对象，类也可以继承接口（与Go中接口不同，Go中的接口类型类似于TS中的any类型）

（注意：接口字段一般用逗号分隔，也可以用分号、换行）不要和JS对象混淆

#### **索引签名**

使用索引签名，可以描述key、value的类型

索引签名中key的类型只能是 string 、 number 、 symbol

```ts
interface 接口名{
	[yyy:key的类型]:value的类型 //yyy 可以是任何名字,习惯写为index
}
```

对象可以包含多个只要符合类型的键值对

```js
interface Stu{
  [key:string]:string
}

// s包含多个键值对，也就是索引签名只限制key、value类型，键值对数量没有限制
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

let o:ReadonlyRecord={
  name:'tom'
}
o.name='jack' // 报错
```



#### 属性声明

明确描述属性key、value的类型

```
interface xxx{
	key的类型:value的类型
}
```

例子

```ts
interface Student {
  readonly name:string,//只读属性
  age?: number, //可选属性
  score:number
}
```

Student类型的**key的类型**分别是 字符串name、字符串age、字符串score

千万不要错误的认为key是 字符串name、字符串age、字符串score

混用：属性声明必须是索引签名的子类型

```ts
interface Stu{
  score:number, // 报错，value是number，不符合索引签名指定的value为string
  [key:string]:string
}

let s:Stu={
  name:'tom',
  other:'其他信息'
}
```



#### **函数签名**

前两种方式，本质都是声明了一个函数，必须实现函数体

而，函数签名相当于定义了一个函数模版，具体实现

```ts
interface A{
    name(a:number,b:number):number
  	// 这种方式等价于上面的
  	name:(a: number, b: number)=> number;
}
```

**匿名函数签名**

匿名函数签名很少见，这种接口用来描述函数（不能描述对象了）

```ts
interface A {
  	// 匿名签名
    (a: number, b: number): number;
}

let myFunction: A 

// 匿名函数签名，入参名不必一致（签名 a、b，实际值param1、 param2），只要类型对得上就行
myFunction = (param1, param2) => {
    return param1 + param2;
};
```

匿名函数签名、命名函数签名混合（axios库就是这种实现）

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

**implements**

类实现的接口时，只能实现接口中公开的成员

```ts
interface yyy{
  // 这里定义的属性和方法，都是公开的（public）
  run():void
}
class xxx implements yyy {
  // 实现接口，也只能实现公开的属性、方法
  run(){
    console.log('1')
  }
}
```

例子

```ts
interface Animal {
  // 属性
  name: string;
  // 方法
  move(distance: number): void
}

// implements实现，需实现Animal的属性、方法
class Dog implements Animal {
  name: string
  constructor(name: string) {
    this.name = name;
  }
  move(distance: number) {
    console.log(`${this.name} moved ${distance} meters.`);
  }
}

let dog = new Dog("Buddy");
dog.move(10); // Output: "Buddy moved 10 meters."
```

但是，<span id="接口可以继承其他类">接口可以继承其他类</span>中的私有成员，使得接口中包含私有成员

但是这种接口无法被直接实现

```ts
class A{
  private name:string|undefined
  private setName(name:string):void{
    this.name=name
  }
}

// 继承了Parent类中的私有成员
interface Iselect extends A{
  select():void
}

// 报错 Iselect中包含private成员，但是implement中只能实现共有成员
class B implements Iselect{
  select() {
    console.log(1)
  }
}

// 解决方案：先继承A获取私有成员，在继承实现公开成员
class B extends A implements Iselect{
  select() {
    console.log(1)
  }
}

```



#### **继承**

**接口继承接口**

extends关键字继承其他接口，相当于可以扩展接口

```ts
interface A {
 
}
interface B {
  
}

// 多继承
interface SomeData extends A,B {
 
}
```

同名接口类型会被合并

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



### 类

JS中的面向对象机制并不健全，TS也完善了JS中关于面向对象的部分

从整体分析：

* 类的成员分为：静态成员static、普通成员（默认）

* 访问限定符：public（默认）/ private/ protected/readonly 《注意：无论是哪种成员都可以使用》



#### **类的成员**

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

#### **访问修饰符**

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



### 顶部、底部类型

Top Type表示在它们包含了所有可能的类型：

* **any**

  无拘无束的“任意类型”，它能接受所有类型，也能够被所有类型兼容

  ```ts
  //它能接受所有类型
  let a:any='jack';
  
  //也能够被所有类型兼容
  let b:number=a;
  ```

* **unknown**

  它能接受所有类型，但是只能被unknown类型接收

  ```ts
  //它能接受所有类型
  let a:unknown='jack';
  
  //报错，只能被unknown类型接受
  let b:number=a;
  ```

Bottom Type表示在它是一个虚无的、不存在的类型：

* **never**

  表示没有类型，即**不携带任何的类型信息**

  它只能接受never类型，但能够被所有类型接收

  ```ts
  declare let v1: never;
  declare let v2: number;
  
  v1 = v2; //报错，类型 void 不能赋值给类型 never
  
  v2 = v1;
  ```

  常见用法：函数没返回值
  
  专门用来抛出错误
  
  ```ts
  function error(message:string):never{
  	throw Error(message)
  }
  
  function fail():never{
    return error("错误")
  }
  ```
  
  循环
  
  ```ts
  function Loop(){
  	while(true){
  		//xxx
  	}
  }
  ```
  
  

**类型断言**

上面三个类型都没有具体的字段类型定义。如果我们定义一个变量是上面的类型，当访问它的某个属性或方法，TS就会报错提示没有该属性或方法。这里我们可以使用断言处理，强制告诉编译器该变量的详情

```ts
interface user{
    name:string;
}
let stu:any

//as语法
console.log((stu as user).name)
```

非空类型断言

```ts
stu1!.info.score
```



## 创建类型

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

### 联合类型、交叉类型

**联合类型**

符合其一即可

```ts
let a: string|boolean|number //a可以是string或boolean或number
```

any类型

```text
any就是 string | number | symbol 组成的联合类型
```

接口的联合

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

**交叉类型**

将多个类型合并为一个新的类型，新的类型包含全部成员的特征

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

### 索引类型 keyof

**数组类型**

将数组类型转换为联合类型

```ts
type pickArr<T extends Array<string>> =  T[number]

let a:pickArr<['a','b']> // "a" | "b"
```



**对象类型**

* key转化为联合类型。例子是把索引类型的key合并转化为联合类型

  ```ts
  interface Foo {
     propA: number;
     propB: boolean;
     propC: string;
  }
  
  let b:keyof Foo 
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
      [key: string]: number;
  }
  let b:Foo[string] //number 
  
  
  //通过key值访问value的类型。(注意：这里加引号是因为'propA'是字符串字面量)
  interface Foo {
      propA: string;
  }
  let b:Foo['propA'] //string 
  ```

  更复杂的

  ```ts
  interface Foo {
     propA: number;
     propB: boolean;
     propC: string;
  }
  
  //联合类型也可以，即将联合类型每个分支对应的类型进行访问后的结果，重新组装成联合类型
  type PropTypeUnion = Foo['propA'|'propB'|'propC']; // string | number | boolean
  type PropTypeUnion = Foo[keyof Foo]; // string | number | boolean
  ```

### 映射类型 in

**in**关键字，可以将联合类型遍历出来

```ts
type Stringify<T> = {
  //'propA'|'propB'   是字符串字面量的联合类型
  // K in xxxx        是in操作符，遍历联合类型
 	// [xxxx]:string    是索引签名类型
   [K in 'propA'|'propB']: string; 
};
```

更综合的例子：变成可选类型

```ts
type Stringify<T> = {
  [K in keyof T]?: T[K];
};

interface Stu{
  name:string
  age:number
}

let student:Stringify<Stu>={
       name:'tom',
       age:20
}
```

### 值的类型

typeof在JS中用于获取值的类型，返回值是一个字符串（注意返回的是值，不是类型）

TS中，typeof继承了这个功能

```ts
function printValue(value: number | string) {
    if (typeof value === 'number') {
        console.log('It is a number:', value.toFixed(2));
    } else {
        console.log('It is a string:', value.toUpperCase());
    }
}

```

还扩展了新的功能，`typeof 值`还可以作为类型

```ts
let x = 10;
let y: typeof x; // 类型查询，y 的类型为 number
```

### 类的实例

InstanceType是TS内置的工具函数，常常与typeof结合为实例标记类型

```ts
class MyClass {
    constructor(public value: number) {}
}

// 使用 InstanceType 获取 MyClass 的实例类型
type MyInstance = InstanceType<typeof MyClass>;

// 创建一个 MyInstance 类型的实例
const myInstance: MyInstance = new MyClass(42);

console.log(myInstance.value); // 输出: 42

```

## 泛型

### 泛型分类

泛型其实可以类比为函数的入参，只不过入参是类型，经过函数内部处理返回了一个新的类型

在使用包含泛型的类型时，会指定泛型具体为哪种类型

#### **别名泛型**

type关键字命名新类型时，可以在类型名后的`<>`中，指定入参泛型；在`=`后进行处理，返回新类型

```ts
type Factory<T> = T;
var a:Factory<string> //声明变量a的类型时，必须指定传入得泛型。a是string类型
```

#### **泛型接口**

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



#### **泛型函数**

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



#### **泛型类**

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



### 泛型约束

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

使用数组

```ts
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





### 泛型编程

传入泛型T，我们可以对T进行处理，消费处理后的类型

* **三元表达式**

  等于号后就类似于函数体，其返回一个类型

  ```ts
  type Factory<T> = T extends string?'1':'2';
  var a:Factory<"tom"> //类型为字面量 "1"
  ```

* **索引类型和映射类型**

  `keyof`、`in`关键字

  ```ts
  type Stringify<T> = {
      [K in keyof T]: string;
  };
  interface student{
      name:string
      age:number
  }
  
  //student类型被变更为name和age都是string的对象
  var a:Stringify<student>={
      name:'tom',
      age:'10'
  }
  ```

* **泛型提取**

  例子中A、B想当于把泛型T分解开来，获取第一个、第二个元素（`any[]`等价于`Array<any>`）

  ```ts
  type Swap<T extends any[]> = T extends [infer A, infer B] ? [B, A] : T;
  
  type SwapResult1 = Swap<[1, 2]>; // 符合元组结构，首尾元素替换[2, 1]
  type SwapResult2 = Swap<[1, 2, 3]>; // 不符合结构，没有发生替换，仍是 [1, 2, 3]
  ```
  
  更复杂的提取数组的例子
  
  ```ts
  // 提取首尾两个
  type ExtractStartAndEnd<T extends any[]> = T extends [
    infer Start,
    ...any[], //注意下：这里可以这样使用
    infer End
  ]
    ? [Start, End]
    : T;
  
  // 调换首尾两个
  type SwapStartAndEnd<T extends any[]> = T extends [
    infer Start,
    ...infer Left,
    infer End
  ]
    ? [End, ...Left, Start]
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
  
  提取接口
  
  ```ts
  // 提取对象的属性类型
  type PropType<T, K extends keyof T> = T extends { [Key in K]: infer R }
    ? R
    : never;
  
  type PropTypeResult1 = PropType<{ name: string }, 'name'>; // string
  type PropTypeResult2 = PropType<{ name: string; age: number }, 'name' | 'age'>; // string | number
  
  ```
  
  

### 内置的泛型工具

TS内置了一些泛型工具，类似于JS中的内置函数，这些泛型工具传入一个泛型，就会返回一种新的类型 

#### 其他泛型工具

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
  



#### **创建对象结构的工具**

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

  



#### **修饰对象属性的工具**

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

#### **集合工具**

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




#### 模版字符串工具

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

####  **is（类型谓词）**

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
    if('shared' in input){
        console.log(input);// 推导为A|B类型
        //input.onlyA  ===>会报错提示A|B、B类型上都没有onlyA属性
      	//input.shared ===>这个属性A和B都有，可以正常使用
    }

    if('onlyA' in input){
        console.log(input); // A类型
        
    }
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

esModuleInterop设置为true、allowSyntheticDefaultImports默认被设置为true

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



