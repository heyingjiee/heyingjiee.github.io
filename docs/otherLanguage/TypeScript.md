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
    
        
    
    ​      
    
    ​      
    

**安装 ts-node**

TS自带的tsc命令并不能直接运行TS代码。 ts-node 封装了 typescript 的编译过程，提供直接运行TS代码的能力

```shell
npm i -g ts-node
```

运行ts文件

```shell
ts-node xxx.ts
```

## 基本类型(首字母小写)

### any

对变量关闭TS检测（不建议使用）。可以存任何类型的值，any类型的变量也可以赋值给其他类型的变量

```ts
let a:any

//不指定，默认为any
let b
```

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

### number

```ts
let a:number
```

### string

```ts
let a:string
```

### boolean

```ts
let a:boolean
```

### tuple

元组，即固定长度的数组

```ts
let h:[string,string]
h=["a","b"]
```

### enum

枚举

```ts
enum Gender{
	man,
  woman
}

let stu={
	name:"jack",
  gender:Gender.man
}
console.log(stu.gender===Gender.man)
```

enum类型默认，第一个值是0，第二个值是1，依次类推。也可以手动指定（不推荐）

```ts
enum Gender{
	man=1,
  woma=0
}
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





