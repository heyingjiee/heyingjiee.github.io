# TS学习笔记

## 学习资料

https://github.com/linbudu599/TypeScript-Tiny-Book

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

## 内置类型

TS相比与JS来说，最大的不同就是类型标注

可以提示开发者变量的类型



类型按照层级划分：

- 最顶级的类型，any 与 unknown
- 特殊的 Object ，它也包含了所有的类型，但和 Top Type 比还是差了一层
- String、Boolean、Number 这些装箱类型
- 原始类型与对象类型
- 字面量类型，即更精确的原始类型与对象类型嘛，需要注意的是 null 和 undefined 并不是字面量类型的子类型
- 最底层的 never

因为还有联合类型、交叉类型、函数类型的情况

### 基本类型



### 字面量类型



### undefined、null、void

### Top Type

Top Type表示在它们包含了所有可能的类型：

any、unknown

### Bottom Type

Bottom Type表示在它是一个虚无的、不存在的类型：

nerver

### enum

枚举类型

### interface

接口类型，描述对象和类（与Go中接口不同，Go中的接口类型类似于TS中的any类型）

```ts
interface AgeStruct {
  age: number;
}
```

### Class



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



**交叉类型**

全部符合才可以

```ts
// 接口的交叉
interface NameStruct {
  name: string;
}

interface AgeStruct {
  age: number;
}

type ProfileStruct = NameStruct & AgeStruct;

const profile: ProfileStruct = {
  name: "linbudu",
  age: 18
}

// 对象的交叉
type Struct1 = {
  primitiveProp: string;
  objectProp: {
    name: string;
  }
}

type Struct2 = {
  primitiveProp: number;
  objectProp: {
    age: number;
  }
}

type Composed = Struct1 & Struct2;

type PrimitivePropType = Composed['primitiveProp']; // never
type ObjectPropType = Composed['objectProp']; // { name: string; age: number; }


//其他例子
type UnionIntersection2 = (string | number | symbol) & string; // string
```



注意：两个互斥的类型的交叉会被推断为never，即不存在的类型（不可能有值即是字符串也是数字）

```ts
type a = string & number; //never
```

接口、对象中同层级且同名的字段，类型互斥，也会直接推断为never类型，例如上面例子的` Composed['primitiveProp']`



### 索引签名类型

**用于指定对象的内部结构**

TS除了前面提到的，可以明确指定对象字段的方式外

```ts
//接口形式
interface AllStringTypes1 {
  name: string;
  age?:number
}
let a:AllStringTypes1

//对象字面量形式
type AllStringTypes2={
   name:string,
   age?:number
}
let b:AllStringTypes2
```

还提供了另一种不明确的类型定义（纯属个人看法）:**索引类型**，即仅定义键值对类型，不限制对象字段

```ts
//接口形式
interface AllStringTypes {
  [key: string]: string;
}

//对象字面量形式
type AllStringTypes = {
  [key: string]: Any; //value可以是任何类型
}
```

两种方式还可以混合使用，但是注意：明确指定的键值类型，必须符合 `key、value的类型定义`

```ts
interface AllStringTypes {
  // 类型“number”的属性“propA”不能赋给“string”索引类型“boolean”。
  propA: number;
  [key: string]: boolean;
}
```

### 索引类型

**索引类型key转化为联合类型**

将复杂类型转化为联合类型。例子是把索引类型的key合并转化为联合类型

```ts
//接口形式,对象字面量形式省略
interface Foo {
   propA: number;
   propB: boolean;
   propC: string;
}
let b:keyof Foo //vscode显示keyof Foo，但实际上就是'propA'|'propB'|'propC'类型。注意：这里的'propA'、'propB'、'propC'是字符串字面量类型
```

interface和对象的key是string

keyof any是一个特殊用法，生成如下的联合类型

```ts
let a:keyof any //string | number | symbol
```



**索引类型通过key获取value**

注意，一定得是使用了类型签名的接口/对象字面量**类型**，返回值才是类型（并不是字符串）

```ts
//接口形式,对象字面量形式省略

//通过key类型访问value的类型
interface Foo {
    [key: string]: string;
}
let b:Foo[string] //string 


//通过key值访问value的类型。(注意：这里加引号是因为'propA'是字符串字面量)
interface Foo {
    propA: string;
}
let b:Foo['propA'] //string 
```

如果变量的话，返回对应的value值

```ts
let stu={
	name:'tom'
}

console.log(stu['name']) //tom
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

### 映射类型

**in**关键字，可以将联合类型遍历出来

```ts
type Stringify<T> = {
  //'propA'|'propB'   是字符串字面量的联合类型
  // K in xxxx        是in操作符，遍历联合类型
 	// [xxxx]:string    是索引签名类型
   [K in 'propA'|'propB']: string; 
};
```

更综合的例子：keyof将变量的key转换为联合类型

```ts
type Stringify<T> = {
  [K in keyof T]: string;
};

let student:{
 	name:string,
  age:number
}
```

### 泛型

泛型其实可以类比为函数的入参，只不过入参是类型，经过函数内部处理返回了一个新的类型

在使用包含泛型的类型时，会指定泛型具体为哪种类型

**别名泛型**

type关键字命名新类型时，可以在类型名后的`<>`中，指定入参泛型；在`=`后进行处理，返回新类型

```ts
type Factory<T> = T;
var a:Factory<string> //声明变量a的类型时，必须指定传入得泛型。a是string类型
```



**对象泛型**

interface关键字命名新类型时，可以在接口名后的`<>`中，指定入参泛型；在后面的大括号中进行处理，返回新类型

例子：

我们常用的接口返回值结构，可以参考下面：

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



**函数泛型**

function关键字创建函数时，

可以在函数名后的`<>`中，指定泛型

在入参列表中，指定哪个函数入参为泛型

在`:`后，即返参列表中进行泛型处理，返回新类型，作为函数返回值的类型



例子：普通函数

```ts
function handle<T>(input: T): T {// 入参input必须是T类型，且函数返回值也是T类型
    return input
}

handle<string>("tom") //入参必须是string类型，且返回值被推导为string类型
```

例子：箭头函数

```ts
const handle = <T>(input: T): T => {}
```



一点注意:前面的例子都是在返回值中使用传入的泛型构造新的类型，其实函数体内部也可以消费泛型
```ts
function handle<T>(input: T): Promise<[T]> {
  	//函数体内部也可以使用泛型
    return new Promise<T>((resolve, rej) => {
        resolve(input);
    });
}
```



**Class泛型**

Class 中的泛型消费者是属性、方法等

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



### 泛型编程

这里以**别名泛型**为例子，展示泛型如何编程返回新类型（**对象泛型**、**函数泛型**都是一样的道理）



1、对泛型的约束（类比入参）

* **泛型默认值**

  与函数参数默认值语法相同

  ```ts
  type Factory<T = boolean> = T;
  var a:Factory //a是boolean类型
  ```

  

* **泛型约束**

  类似于类继承的语法，`A extends B`表示A的类型比B更精细

  如下，将入参T限制在了string类型内

  ```ts
  type Factory<T extends string> = T;
  var a:Factory<"tom"> //类型为字面量 "tom"
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
  
  
  

2、对泛型处理（类比函数体）

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

#### 其他

* `Promise<T>`指定resolve参数的类型为T

  ```ts
  async function fetchUserProfile(): Promise<string> {
      return "tom"
  }
  ```

* `Array<T>`指定数组中的元素类型为T

  ```ts
  const arr: Array<number> = [1, 2, 3];
  ```
  
  另一种写法
  
  ```ts
  const arr:number[]=[1,2,3]
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

#### **集合**

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

  





## TS类型推导

### 根据值推导

初始化时，确定变量类型

```ts
let a=1 //number类型
```

初始化时不指定类型，会被确定为any类型

```ts
let a //any类型
a=1 
```

const关键字，初始化时会被推导为最为精确的字面量类型

```ts
const a=1 //数字字面量类型 1
```

**函数**

根据函数返回的值进行推导

```ts
//函数返回值会被推导为number类型
function f(){
    return 1
}
```

无return或只有一个return，返回值会被推导为void

```ts
function f(){
    return 
}
```



### 流程控制推导

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

#### is关键字

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

#### in关键字

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

















