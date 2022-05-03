# TypeScript

## 介绍

**安装TS**

```shell
npm i -g typescript
```

**转换为JS**

```shell
tsc xxx.ts
```

注意：

* TS是JS的超集，JS的语法在TS中均被保留。默认情况下，如果代码语法，符合JS但是不符合TS，使用以上命令仍然可以被转化为JS

* 可以指定转化的JS的版本

  以下代码在TS中是错误的，但是任然可以被转换为JS

  ```ts
  let a:number;
  a="hi";
  ```

* 监视模式，TS文件只要发生变动，就会自动编译为JS

  ```ts
  tsc xxx.ts -w
  ```

**TS配置文件**

在项目根目录下，添加TS的配置文件`tsconfig.json`[配置文件文档](https://www.tslang.cn/docs/handbook/tsconfig-json.html)

  ```json
  {}
  ```

  就可以使下面的命令(不用再指定具体文件，会根据tsconfig.json，去执行操作)

  ```ts
  tsc  //编译项目下的所有文件
  tsc -w  //监视项目下的所有文件
  ```

  配置选项：

  * **files**、**include**、**exclude**

    配置编译哪些文件

    ```ts
    {
        "compilerOptions": {
            "module": "commonjs",
            "target": "es2020",
            "jsx": "preserve",
            "strictFunctionTypes": true,
            "sourceMap": true
        },
         
        "files": [
            "a.ts",
            "b.ts",
            "c.ts",
        ]
        "include": [
            "src/**/*"
        ],
        "exclude": [
            "node_modules",
            "**/node_modules/*"
        ]
    }
    ```

    如果`"files"`和`"include"`都没有被指定，编译器默认编译包含当前目录和子目录下所有的TypeScript文件（`.ts`, `.d.ts` 和 `.tsx`），但是要排除在`"exclude"`里指定的文件
    
  * **compilerOptions**

    * **target**  指定编译的JS版本（默认转换为ES3）

        ```json
        {
           "compilerOptions": {
               "target" :"es6"
           }
        }
        ```
    
        Argument for '--target' option must be: 'es3', 'es5', 'es6', 'es2015', 'es2016', 'es2017', 'es2018', 'es2019', 'es2020', 'es2021', 'es2022', 'esnext'
    
    * **module** 指定模块化规范
    
        ```json
        {
           "compilerOptions": {
               "module" :"es6"
           }
        }
        ```
    
        Argument for '--module' option must be: 'none', 'commonjs', 'amd', 'system', 'umd', 'es6', 'es2015', 'es2020', 'es2022', 'esnext', 'node12', 'nodenext'
    
    * **lib** 代码中用到的库(一般不需要设置，不写这个字段默认为浏览器环境下使用的库)
    
        使用场景：如果我们的代码是在node端使用的，node环境下没有dom相关的api
    
        ```json
        {
           "compilerOptions": {
               "lib" :[]
           }
        }
        ```
    
    * **outDir** 指定编译成的JS文件输出目录（默认TS文件同级别目录下）
    
        ```json
        {
          "compilerOptions": {
           	"outDir": "./dist" //输出到项目根目录下的dist目录
        	}
        }
        ```
    
    * **outFile** 将全局作用域的代码合并为一个文件
    
        ```ts
        {
          "compilerOptions": {
           	"outFile": "./dist/app.js" //将全局作用域的代码合并为一个文件输出到dist下的app.js中
        	}
        }
        ```
    
    * **allowJs**和**checkJs**
    
        ```ts
        {
          "compilerOptions": {
           "allowJs": true,
           "checkJs": true
        	}
        }
        ```
    

**安装 ts-node**

TS自带的tsc命令并不能直接运行TS代码。 ts-node 封装了 typescript 的编译过程，提供直接运行TS代码的能力

```shell
npm i -g ts-node
```

运行ts文件

```shell
ts-node xxx.ts
```

或者使用

```shell
npx ts-node tsTest.ts
```

## 确定类型

**定义后，不指定变量类型**

* 初始化

  ```tsx
  let a=1; //自动推断a为number类型
  ```

* 未初始化

  ```ts
  let a; //a的类型为any ，变量不再受ts的类型检查的约束 ，所以即使后面再赋值都不会推断类型了
  ```

定义后，直接置指定变量类型

```tsx
let a:number;
```

## 基本类型

布尔值、数值、字符串

```tsx
let a:boolean
let createdByNewBoolean: Boolean = new Boolean(1); //使用构造函数 Boolean 创造的对象不是布尔值,是一个布尔对象

let b:number

let c:string
```

`undefined` 和 `null` 是所有类型的子类型（ `undefined` 类型的变量，可以赋值给其他类型的变量）

```ts
// 这样不会报错
let num: number = undefined
// 这样也不会报错
let u: undefined
let num: number = u
```

## TS特有的类型

### tuple

元组，即固定长度的数组，可以指定每个元素的类型

注意：进行初始化或者赋值的时候，需要提供所有元组类型中指定的项

```ts
let h:[string,string,number]
h=["a","b",1]
```

**访问**

与数组一样，通过索引

```ts
console.log(h[0]); //a
```

**数据操作**

push：

使用push推入元素，元素类型是定义的所有元素的联合类型（这里是string|number）就不会报错，但是越界元素是无法通过索引访问到的，所以不建议使用（实际上是推入元组）

```ts
h.push("c")
h[3] //报错
```

pop：

pop推出了上一步push进去的元素

```tsx
console.log(a.pop()) //c
```

### enum

**枚举**

```ts
enum Gender{
	man,
  woman
}

let stu={
	name:"jack",
  gender:0
}
console.log(stu.gender===Gender.man) //true
```

enum类型默认，第一项的值是0，第二项的值是1，依次类推。也可以手动指定（不推荐，手动指定的[规则](http://ts.xcatliu.com/advanced/enum.html)）

```ts
enum Gender{
	man=1,
  woma=0
}
```

访问：类似于对象，可以通过项访问值，也可以通过值访问项

```
console.log(Gender["man"]) //0
console.log(Gender.man) //0

console.log(Gender[0]) //man
```

转化为JS

```ts
var Gender;
(function (Gender) {
    Gender[Gender["man"] = 0] = "man";
    Gender[Gender["woman"] = 1] = "woman";
})(Gender || (Gender = {}));
var stu = {
    name: "jack",
    gender: 0
};
console.log(stu.gender === Gender.man);
```

**常数枚举**

就是多加一个const

```ts
const enum Gender{
	man,
  woman
}
```

转换为JS，可以看出枚举被彻底去掉了，代码中使用枚举的地方直接替换为枚举项对应的值

```ts
var stu = {
    name: "jack",
    gender: 0
};
console.log(stu.gender === 0 /* man */);
```

访问：无法通过值访问枚举项

```
console.log(Gender[0]) // A const enum member can only be accessed using a string literal.
```

### void

常用于声明函数的返回值：

* 无返回值
* 返回undefined
* 返回null

```ts
function fun ():void{
  
}
```

### never

常用于声明永远都是无返回值的函数

```ts
function fun():never{
	throw new Error('报错了')
}
```

### any

对变量关闭TS检测（不建议使用）。可以存任何类型的值，any类型的变量也可以赋值给其他类型的变量

```ts
let a:any

//不指定，默认为any
let b

//任何类型的变量，都能接受any类型的变量
let c:number=a
```

## 对象

使用接口定义对象的格式

```ts
interface Stu {
    name: string; //确定属性
    age?: number; //可选属性
    [propName: string]: string|number; //任意属性（key名任意的属性，也是可有可无的）
}
let jack:Stu

jack={
    name:'jack',
    age:18,
    score:100, //这里是任意属性
    class:221 //这里是任意属性
}
```

注意：

* 不使用任意属性，则变量赋值中的key只能是【确定属性】或【确定属性+可选属性】，不能添加其他属性
* 一旦使用任意属性，确定属性、可选属性的类型，必须是任意属性的子类型
* 使用任意属性，在赋值的数据中，可以有多个自定义key

## 数组

常规方式

```ts
let stuList:number[]
```

泛型

```ts
let stuList:Array<number>
```

## 函数

定义变量接受函数的类型

```ts
/*f是变量名*/
let f:(a:number,b:number)=>number 
```

定义函数

```ts
function func (a:number,b:number):number{
    return a+b
}
let f=func //这里是类型推断，推断f的类型
```

## 类





## 基本类型(首字母小写)

### unknown

可以存任何类型的值，但是只能赋值给**unknown**类型的值。如果想赋值给其他变量，需要使用下面的办法，（所以，unknown可以看作是类型安全的any）

```ts
let a:unknown
let b:string
a="hi"

b=a//报错
```

所以应该这样用

```ts
let a:unknown
let b:string
a="hi"

//注意这里
if(typeof a==='string'){
    b=a
}
```

也可以使用断言

```ts
let a:unknown
let b:string
a="hi"

//用法一：
b=a as string

//用法二：
b=<string>a
```

### object

```ts
let a:object
a={}
a=new Function()
a=[]
```

**对象结构类型声明**

通常我们会这样使用

```ts
//这种会强制要求变量有两个属性，一个是name，一个是age，缺一不可
let stu:{name:string,age:number}
stu={name:"jack",age:18}
```

如果我们的对象中，还可能出现其他其的键值对

```ts
//[propName:string]表示key的类型是字符串（JS/TS中，字面量对象的key默认就是字符串），propName这里可以用任何名字
//any表示value的类型是any
let stu:{name:string,age:number,[propName:string]:any}
stu={name:"jack",age:18,grade:100}
```

**函数结构类型声明**

```ts
let a:(a:number,b:number)=>number
a=function(n1,n2){
    return n1+n2
}
```

**数组结构类型声明**

```ts
//方式一
let arr:number[];
//方式二
let arr2:Array<number
```

## 变量

### 声明变量

#### 指定变量类型

```ts
let a:number;
```

变量可以声明多个类型(联合类型)

* 或

  ```ts
  let a:number|String
  ```

* 且

  ```ts
  //一个变量不可能既是数字也是字符串，这样写是错的
  let a:number&String
  ```

  一般该这么用

  ```ts
  let a:{name:string}&{age:number}
  a={
    name:"jack",
    age:18
  }
  ```

声明时初始化，可以简写

```ts
let a:number=1

//或者可以省略，ts会自动推断变量类型
let a=1
```

限制函数参数和返回值类型，不声明函数返回值，默认为void

```ts
function sum (a:number,b:number):number{
    return a+b
}

function sum (a:number,b:number):number|boolean{
    return a+b
}
```

#### 指定变量值

```tsx
//指定a的值只能为字符串man
let a:"man"
a="man"

//指定a的值只能为字符串man或woman
let b:"man"|"woman"
b="woman"
```

#### 指定别名

可以给变量类型或变量值起别名

```ts
type myType =1|2|3|4
let a:myType
a=2
```



##  学习点

### 对象类型

```ts
let obj:{
    name:string,
    age?:number,
    score?:number
}
```

和用接口一样

```ts
let obj:stu
interface stu{
    name:string,
    age?:number,
    score?:number
}
```

### 断言

**断言的写法as**

函数内断言，将参数断言为Fish，并不影响调用函数时传入的参数。如果传入Cat，调用swim是undefined

```ts
interface Cat {
    name: string;
    run(): void;
}
interface Fish {
    name: string;
    swim(): void;
}

function isFish(animal: Cat | Fish) {
    if (typeof (animal as Fish).swim === 'function') {
        return true;
    }
    return false;
}
```

函数参数是类时，定义型参是父类

```tsx
class ApiError extends Error {
    code: number = 0;
}
class HttpError extends Error {
    statusCode: number = 200;
}

function isApiError(error: Error) {
    if (typeof (error as ApiError).code === 'number') {
        return true;
    }
    return false;
}
```

子类的实例可以复制给父类的对象（面向对象中的规则），但是这里因为TypeScript 是结构类型系统，类型之间的对比只会比较它们最终的结构，而会忽略它们定义时的关系。`Cat` 包含了 `Animal` 中的所有属性，除此之外，它还有一个额外的方法 `run`。TypeScript 并不关心 `Cat` 和 `Animal` 之间定义时是什么关系，而只会看它们最终的结构有什么关系——所以认为它与 `Cat extends Animal` 是等价的：

```tsx
interface Animal {
    name: string;
}
interface Cat {
    name: string;
    run(): void;
}

let tom: Cat = {
    name: 'Tom',
    run: () => { console.log('run') }
};
let animal: Animal = tom;
```

断言的限制（要使得 `A` 能够被断言为 `B`，只需要 `A` 兼容 `B` 或 `B` 兼容 `A` 即可使用断言）

- 联合类型可以被断言为其中一个类型
- 父类可以被断言为子类，子类可以被断言为父类
- 任何类型都可以被断言为 any，any 可以被断言为任何类型

举个错误使用断言的例子

```tsx
interface Cat {
    run(): void;
}
interface Fish {
    swim(): void;
}

function testCat(cat: Cat) {
    return (cat as Fish); //报错
}
```

**通过变量声明来使用断言**

这种情况，相当于使用类型推断，推断tom为Cat类型

```tsx
function getCacheData(key: string): any {
    return (window as any).cache[key];
}

interface Cat {
    name: string;
    run(): void;
}

const tom = getCacheData('tom') as Cat;
tom.run();
```

以可以使用类型声明的方式

```tsx
const tom:cat = getCacheData('tom');
```

但这种方式有个注意的点（Animal是Cat的父类）：

```tsx
let tom = animal as Cat; 
```

使用类型声明的方式，就会报错（不能将父类的实例赋值给类型为子类的变量，面向对象的规则）

```tsx
let tom: Cat = animal;
```

**断言的另一种写法**

这种写法，一般出现在使用泛型时

```tsx
<T>source //是将source断言为类型T （T是泛型）
```

### 泛型

####  泛型的使用

泛型参数，不指定`<T>`可以根据实参自己推断，也可以指定默认值

```tsx
function func1<T>(a:T,b:T):Array<T>{  // function func1<T = string>(a:T,b:T):Array<T>
    let temp:Array<T>
    temp.push(a);
    temp.push(b)
    return temp
}
func1<number>(1,2) //
```

但是，使用泛型接口/泛型类，必须指定`<T>`，不能推断

```tsx
interface CreateArrayFunc<T> {
    (length: number, value: T): Array<T>;
}

let createArray: CreateArrayFunc<any>;
```

```tsx
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };
```

#### 泛型约束

限制传入的类型T，必须有length属性（这里面调用函数时，就是用了默认推断）

```tsx
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
}
loggingIdentity([1,2]); //打印 2
```



