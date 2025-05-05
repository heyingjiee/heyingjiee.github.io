# Rust

## 参考

* 陈天 - Rust 编程第一课  （参考：https://github.com/tyr-rust-bootcamp）

* 唐刚 - Rust 语言从入门到实践

* Rust 官方资源

  * [官网](https://www.rust-lang.org/zh-CN/)
  * [《通过例子学 Rust》](https://doc.rust-lang.org/rust-by-example/zh/index.html)

* 翻译资源

  ![image-20250208235523394](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20250208235523piGt7Z.png)

  * [Rust 圣经中文版](https://kaisery.github.io/trpl-zh-cn/)
  * [Rust 每个版本重大语法变动](https://rustwiki.org/zh-CN/edition-guide/)
  * [Rust 标准库中文版](https://rustwiki.org/zh-CN/std/)

* Github 上的 《rust 语言圣经》（和官网的不一样，明显这个版本要好很多）：https://course.rs/basic/intro.html

* Rusty Book（收集大量的 rust 包、代码片段、明星项目）：https://rusty.course.rs/ 

 ## 前置

### 安装

* rustup 是 rust 工具链管理器，其中包含 rustc （rust 编译器）
* cargo 是 rust 包管理工具

安装时会自动安装两个工具

```shell
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | zsh 
```

安装输出的内容很详细，可以仔细看下

![image-20250104204950855](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20250104204950pEr5kf.png)

### 工程化

陈天的[Rust模板](https://github.com/tyr-rust-bootcamp/template/tree/master) ，其中配置了一系列的工具，以及使用Github Action来定义提交代码的流程

### print!打印

`println!`是换行打印

#### 基础用法

```rust
// 【占位符输出】
let name = "tom";
// ⚠️ {} 是占位符
print!("Name: {}", name); // Name: tom
println!("{name} "); // tom

---------------------------------------------

// 【根据变量位置输出】
println!("{1} 、 {0}", "Alice", "Bob"); // Bob 、 Alice
```

#### 其他占位符

下面直接常用的占位符，更多请参考：https://rustwiki.org/zh-CN/std/fmt/index.html

##### 基本占位符

`{}` 默认格式化输出，适用于实现了 `Display` trait 的类型

##### 调试输出

`{:?}` 用于调试输出，适用于实现了 `Debug` trait 的类型。这对于查看复杂类型（如结构体、枚举等）的内容非常有用

```rust
#[derive(Debug)] // 特殊的宏，所以后面{:?}才能输出结构体内部数据
struct User {
  username:String,
  active: bool
}
let mut user = User{ 
    username:String::from("jack"), 
 		active:true
};
print!("{:?}",user) // User { username: "jack", active: true }
```

##### 数字输出

- `{:b}`：二进制格式

- `{:o}`：八进制格式

- `{:x}`、`{:X}`：十六进制格式（小写或大写）

  ```rust
  let num = 15u32;
  println!("{:x?} ", num); // f
  println!("{:X?} ", num); // F
  ```

- `{:e}`、`{:E}`：科学计数法表示（小写或大写）

##### 指针输出

`{:p}`：指针地址的格式化输出

## 模块化

标准的Rust项目，根目录下有1个Cargo.toml 文件，这个项目就是1个**package**

1个package中包含多个Crate

### Crate

#### Crate类型

Rust 中 Crate 可分为2种

* 库（--lib） ：编译为 `.rlib` 静态库，一般提供一些函数工具，可供其他rust项目引入
* 二进制（--bin）：编译为可执行文件。起必须包括 main 函数作为入口

一个 rust 项目

* 最少要包含1 个Crate （库、二进制 Crate 都行）
* 最多可包含 1 个库Crate + 多个二进制Crate，可通过 Cargo.toml 配置

#### Crate作用域

Crate 根文件所在的目录就是这个Crate 的作用域

##### 配置 Crate

Cargo.toml 是 Rust 项目的配置文件，可以配置项目中的 Crate 信息：

* name 是 Crate 名
* path 是 Crate 的根

```toml
[package]
name = "my_project"
version = "0.1.0"

# 1个库 crate
[[lib]]
name = "my_lib"
path = "src/lib.rs"

# 多个二进制 Crate
[[bin]]
name = "main_program"
path = "src/bin/main.rs"

[[bin]]
name = "cli_tool"
path = "src/bin/cli.rs"
```

##### 默认约定

如果 Cargo.toml 中没有配置，则遵循 Cargo 的默认约定：

* 如果包目录中包含 *src/main.rs* ，则它是 二进制 crate 的根
* 如果包目录中包含 *src/lib.rs*，则它是库 crate 的根。包名为项目name字段（下面的例子就是 `rust_example`）

例如：`cargo new xxx ` (默认省略了 --bin 参数，是创建的二进制Crate) 创建的默认项目

```rust
// 目录结构
├── Cargo.toml
└── src
    └── main.rs    // 二进制 Crate 的根 
		└── lib.rs    // 库 Crate 的根 


// Cargo.toml
[package]
name = "rust_example"
version = "0.1.0"
edition = "2021"

[dependencies]
```

##### 注意

Crate 根所在的目录就是这个Crate 的作用域。以默认约定为例子，你会发现 lib.rs、main.rs 这两个 crate 的作用域有重合

【后面会提到】

#### Crate内成员可见性

模块（mod）、函数、结构体（结构体字段、方法、关联方法）、枚举等默认私有，不可跨模块访问。通过 pub 可指定公开

注意：枚举设置为 pub，其变体都为 pub

```rust
pub enum Appetizer {
    Soup,
    Salad,
}
```

#### Crate 作用域内的模块

Rust 声明模块一般有下面两种形式：

##### 内联模块声明

内联模块是在当前文件内的，所以 mod 默认是公开的，mod 内部成员必须要 pub 修饰才是公开的

```rust
// 【 src/main.rs 】

// 内联模块定义
mod math {
  	
  	// 函数 add ，后面会讲到函数
    pub fn add(a:i32,b:i32) -> i32{
        a+b
    }
}

fn main() {
    let res = math::add(1, 2);  
    println!("{}",res) // 3 
}
```

##### 外部模块声明

如果 math 不是内联模块，编译器会尝试查找**同级目录**下的**math.rs** 或**math/ mod.rs** 

即 `src/math.rs` 或`src/math.mod.rs`

```rust
// 【 src/main.rs 】
mod math;

fn main() {
    let res = math::add(1, 2);
    println!("{}",res) // 3 
}
```

* 单文件模块

  ```rust
  src/
  ├── main.rs
  ├── math.rs
  ```

  ```rust
  // 【 src/math.rs 】
  pub fn add(a:i32,b:i32) -> i32{
      a+b
  }
  ```

* 目录模块

  ```rust
  src/
  ├── main.rs
  ├── math/
  │   ├── mod.rs       // 模块入口 ，其中引入子模块
  │   ├── arithmetic.rs // 子模块
  │   └── geometry.rs   // 子模块
  ```

  ```rust
  // math/mod.rs
  
  // 1、模块内公开的成员
  pub fn add(a:i32,b:i32) -> i32{
      a+b
  }
  
  // 2、pub 公开mod。注意：只公开了引入的子模块内的pub成员
  pub mod arithmetic; 
  pub mod geometry;   
  ```

  上面是直接使用 mod.rs 的函数 add，如果使用子模块中的函数 xxx 呢？
  ```rust
  mod math;
  fn main() {
      let res = math::arithmetic::xxx(1,2); // 需要写出来子模块路径
  }
  ```

##### 使用模块

以内联模块为例子

```rust
// 【 src/main.rs 】


pub fn add1(a:i32,b:i32) -> i32{
    a+b
}
   
// 内联模块定义
mod math {
  	
    pub fn add(a:i32,b:i32) -> i32{
      	// 3、相对引入， super 是当前模块的父级模块
        super::add1(a,b) 
    }
}

fn main() {
  	// 1、相对引入
    let res = math::add(1, 2); 
  	// 2、绝对引入，crate 关键字表示当前 crate 根
  	let res =crate::math::add(1, 2);
  
}
```



### 跨 Crate 引用

多 Crate 的结构，即  1 个库Crate + 多个二进制Crate

二进制 Crate 引用库 Crate 的能力

注意：  库 Crate 是不能引入二进制 Crate ，如果真的需要，必须要将这个能力抽离到库 Crate 后，再由二进制 Crate 引入

#### 库 Crate 暴露成员 

库 Crate 的根文件中，被 pub 修饰的成员会被暴露出来，可以被跨 Crate 引用

```rust
// 注意啊， 这个 add 不是 mod。仍然可以被暴露出来
pub fn add(a:i32,b:i32) -> i32{
    a+b
}


pub mod lib{
  
  	pub fn add1(a:i32,b:i32) -> i32{
    	a+b
		}
  
    pub fn add2(a:i32,b:i32) -> i32{
        a+b
    }
  
  	pub mod xxx;   // 开放子模块

}
```

#### 二进制 Crate 引入

use 用来引入库Crate 中暴露的成员

Rust 会现在 Cargo.toml 中查找是否为安装的三方依赖

```toml
[dependencies]
xxx = "1.0"            # 使用 xxx crate，版本为 1.0
```

如果不是，则在本地查找

```rust
// 引入
use crate名::lib::add1; 
fn main() {
    add1(1, 2);
}

// 引入起别名
use crate名::lib::add1 as xxx;
fn main() {
    xxx(1, 2);
}

// 在 {} 按需引入
use crate名::lib::{add1,add2};
fn main() {
    add1(1, 2);
  	add2(1, 2);
}

// 在 {} 按需引入 , self 引入lib
use crate名::lib::{self,add1};
fn main() {
    add1(1, 2);
  	lib.add1(1, 2);
}


```

### 特殊的跨Crate 引用

前面提到一种特殊情况，两个 Crate 的作用域相同。我们以 Rust 的默认约定为例子

```rust
// 目录结构
├── Cargo.toml
└── src
    └── main.rs    // 二进制 Crate 的根 
		└── lib.rs    // 库 Crate 的根 
		└── util.rs   
```

util同时属于两个 Crate 

方案 1：直接引入二进制 Crate

```rust
// main.rs 
mod util;
```

方案 2：先引入库 Crate，然后在引入二进制 Crate

```rust
// lib.rs 
pub mod util;

// main.rs 
mod util;
```

圣经中提到的最佳实践：将核心功能都放在库 Crate 中，在二进制 Crate 中仅执行。这样发布库Crate 后，其他用户可以集成核心功能



## 依赖管理

```shell
cargo --list # 查看所有命令
```

![image-20250104210858909](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20250104210859cIXFXT.png)

初始化项目 

```shell
cargo new 项目名  #  默认创建二进制项目（即选项 --bin），选项--lib 是创建一个库项目

# 目录
├── Cargo.lock # 锁文件
├── Cargo.toml # 依赖记录文件
└── src
    └── main.rs # 入口
 
```

依赖管理

```shell
# 安装cargo-generate包（用来生成项目模板的工具，使用 github repo 生成项目）
# cargo 会自动下载源码编译为二进制文件到 ~/.cargo/bin 目录下
cargo install cargo-generate

# 调用了上一步骤下载的 cargo-generate 
cargo generate tyr-rust-bootcamp/template #  以 https://github.com/tyr-rust-bootcamp/template 这个项目作为目模板

# 安装Cargo.toml记录的全部依赖
cargo fetch

# 更新依赖项到最新的兼容版本
cargo update
```

构建二进制文件

```shell
cargo build # 根目录/debug下。这种编译方式的产物中包含debug相关的标准库，所以体积比较大 

cargo build --release # 根目录/release下
```

运行

```shell
cargo run 
```



## 变量与所有权

注意：

* Rust圣经将下面的语法称为：**变量绑定** ，即将内存中的对象绑定到变量x上

  ```rust
  let x =10;
  ```

* 声明作用域

  ```rust
  const MAX_NUM:u32=10; // const 用来声明常量，可以定义在任何作用域
  fn main() {
      let x =10;  // let 不能在全局作用域
    	
      {
          let x = x * 2;
          println!("{}",x); //20
      }
      // 出了作用域，x=20的变量失效了。
      println!("{}",x); //10
      
  }
  ```

### 变量声明与绑定

使用 let 定义变量，变量默认不可变

```rust
fn main(){
  // 指定类型
  let x:u32=10;
  let y=10u32;

  // 自动推导类型
  let z=10;
}
```

```rust		
fn main(){
  // ❌ 编译失败，变量默认不可变
  let z=10;
  z=20;

  // ✅ 默认变量不可变，但是可以覆盖 。 覆盖本质上是重新创建了同名变量
  let w=10;
  let w= ""; // 变量是全新的，甚至类型都变了
}
```

使用 let mut 定义可变变量

```rust
fn main(){
  let mut y=10;
}
```

Rust中未使用变量，在编译时会报警告。可以使用  `_`  前缀

```rust
fn main(){
  let _x =10;
}
```

### 常量

常量：

* 不可变，可以写在任何作用域

* 只有下面一种声明方式，不支持自动推断类型

  ```rust
  const MAX_NUM: u32 = 100000;
  ```

与**不可变变量**最重要的区别：变量不能放在全局作用域，在作用域外会失效，而常量声明在全局作用域就会一直有效

### 将值解构到变量

解构元组，除了元组外还有更复杂的用法。参考后面的【解构】章节

```rust
fn main() {
    let (a, mut b): (bool,bool) = (true, false);
    // a = true,不可变; b = false，可变
    println!("a = {:?}, b = {:?}", a, b);
}
```

### 所有权

变量持有值的所有权，遵循的规则：

1. Rust 中，每一个值都有一个所有者
2. 任何一个时刻，一个值只有一个所有者
3. 当所有者所在作用域（scope）结束的时候，其管理的值会被一起释放掉

值是Rust管理的，我们的变量只是持有这些值。当作用域结束后，Rust自动释放

**值复制（copy）**

固定类型存储在栈上，赋值操作都是对值进行复制。变量各自持有一个值，与其他语言一致

* 所有的整数类型，比如 u32

* 布尔类型 bool

* 浮点数类型，比如 f32、f6

* 字符类型 char

* 由以上类型组成的元组类型 tuple，如（i32, i32, char）

* 由以上类型组成的数组类型 array，如 [9; 100]

* 不可变引用类型 &

```rust
fn main() {
  let a = 10u32;
  let b = a;
  println!("{a}");
}
// 函数执行完毕后，值就被回收了
```

本质原因是上述类型都实现了 Copy trait 

**所有权转移 （move） **

除去值复制的情况以外，都会发生所有权转移

```rust
fn main(){
  // 可变类型存储在堆上，其赋值给 s2 后s1就失效 ，s1 处于无效状态
  let s1=String::from("xxx");
  let s2=s1;
  print!("{s2}");
}
// 函数执行完毕后，值就被回收了
```

作用域：

* 函数调用传参（实参 -> 形参）

  ```rust
  fn foo(s:String){
    print!("{s}");
  }
  
  fn main(){
    let s1=String::from("xxx");
    foo(s1); // 这里相当于 函数实参赋值给形参，也发生了所有权的转移 。 函数结束后值被销毁了
    print!("{s}"); // ❌ 这里就会报错，s1的值被转移了，处于无效状态
  }
  // 函数执行完毕后，值就被回收了
  ```

  如何解决？采用下面方案或**借用**

* 变量接收函数返回值 

  ```rust
  // 正确写法
  fn foo(s:String) -> String{
    print!("{s}");
    s
  }
  
  fn main(){
    let s1=String::from("xxx");
    let s1=foo(s1); // ✅ 函数将返回值转移回 s1
    print!("{s}");
  }
  ```
  
* for 循环中，每一次循环是独立的，变量转移到第 1次循环中了 

  ```rust
  fn main() {
    let s = "I am a superman.".to_string();
  
    for _ in 1..10 {
      let tmp_s = s;  ❌ 
      println!("s is {}", tmp_s);
    }
  }
  
  // 正确写法
  let tmp_s = &s; // ✅ 仅仅发生复制 
  ```
  
* 数组、元组子元素

  ```rust
  fn main() {
    let arr = ["hello world".to_string(), "hello world".to_string()];
    let s = arr[0]; // ❌ 为了保证数组可用，rust 中数组元素复制 。但是 String 没有实现 Copy trait，才报错
  }
  ```

  ```rust
  fn main() {
    let arr = ("hello world".to_string(), "hello world".to_string()); // 元组
    let s = arr.0; // 转移
    println!("{}", arr.0); 
    // arr.1 可以正常打印，但打印 arr.0 和打印 arr 则报错，提示发生了移动
  }
  ```

  

### 引用与借用

**1、引用、借用的概念**

`&s1` 表示对变量`s1`的**引用**，使用`&s1`的行为叫做**借用**变量`s1`的所有权

**2、引用的作用域**

引用的作用域从声明的地方开始一直持续到最后一次使用为止

**3、引用没有所有权**（以**只读引用**的代码为例子，注意两种引用均遵循该原则）

* 函数入参是引用，不会发生所有权转移

  `&s1`是对 `s1`的引用，引用没有所有权，所以也不存在所有权转移。s1一直拥有所有权

  ```rust
  fn foo(s:&String){
    println!("{s}"); // ✅ 正常输出了 xxx . ⚠️ 这里是 s 最后一次使用，即作用域结束的位置 ； 实际上，s是地址，println自动解引用获取了值
  }
  
  fn main(){
    let s1=String::from("xxx");
    foo(&s1);  // ⚠️ 多了 "&" 
    println!("{}",s1); // ✅ 正常输出了 xxx
  }
  ```

* 函数返参数是引用，不会发生所有权转移。但是函数结束值被销毁，所有这种写法有语法错误（与**生命周期**的概念相关）

  ```rust
  fn foo() -> &String {
    let s = String::from("hello"); // s 是一个新字符串
    &s 
  } // 这里 s 离开作用域并被丢弃。其内存被释放。
  
  // 编译报错 ❌
  ```

  ```rust
  fn foo() -> String {
    let s = String::from("hello");
    s
  }
  
  fn main(){ 
      let res= foo();
      print!("{}",res); // ✅ 正常输出了 hello
  }
  ```

  上面的例子保证了，引用只在作用域内有效，无法突破作用域的范围被开发者错误的使用

  在具有指针的语言中，很容易出现：释放内存资源后，还有其他指针指向这个内存资源，出现**悬垂指针**（*dangling pointer*）。在 Rust 中编译器确保引用一定有效，不会变成悬垂状态

#### 只读/不可变引用

同上面代码

```rust
fn foo(s:&String){
  println!("{s}"); // 输出 xxx
}

fn main(){
  let s1=String::from("xxx");
  foo(&s1);  // ⚠️ 多了 "&" 
  println!("{}",s1); // ✅ 正常输出了 xxx
}
```

##### 规则

* 同一变量的可读引用 r 的作用域内可以存在其他可读引用 r1、r2...

* 同一变量的可读引用 r 的作用域内，不能有对该变量的**写操作** 或 其他可写引用

  ```rust
  fn main() {
      let mut s = String::from("hello");
      let r = &s;
      s.push_str(", world");  // ❌ 编译错误。 可读引用 r 的作用域内，出现了对原变量的写操作
      print!("{}",r);
  }
  
  
  fn main() {
      let mut s = String::from("hello");
    	{
        let r = &s;
    	}
      s.push_str(", world");  // ❌ 编译错误。 可读引用 r 的作用域内，出现了对原变量的写操作
      print!("{}",r);
  }
  ```

  ```rust
  fn main() {
      let mut s = String::from("hello");
      let r = &s;
      let r2 = &mut s;;  // ❌ 编译错误。 可读引用 r 的作用域内，出现了其他可写引用
      print!("{}",r);
  }
  ```

#### 可写引用

`&mut s` 表示这个引用是可写的

```rust
fn foo(s:&mut String){
  // ⚠️ push_str是 结构体 String 的方法，（语法：引用调用方法会自动解引用后再调用方法）
  s.push_str(", world"); // 输出 xxx, world
}

fn main(){
  let mut s1=String::from("xxx");
  foo(&mut s1); 
  println!("{}",s1); 
}
```

##### 规则

同一变量的某个**可写引用 r** ，在其作用域内不能有其他 **可读、可写引用**

错误用法：

* 同一变量的不同可写引用作用域冲突

  ```rust
  fn main(){
    let mut s1=String::from("xxx");
    let r1=&mut s1;
    let r2=&mut s1;
  
    println!("{}", r1); // ❌ 编译错误。可写引用 r1 作用域内有其他可写引用 r2 
  }
  ```

  ```rust
  fn main(){
    let mut s1=String::from("xxx");
    let r1=&mut s1;
    let r2=&mut s1;
  
    println!("{}", r2); // ✅ 编译通过。输出 xxx
  }
  ```

* 同一变量的可读引用作用域、可写引用作用域冲突

  * 可读作用作用域之间不能出现可写引用

    ```rust
    fn main() {
        let mut s = String::from("hello");
    
        let r1 = &s;
        let r2 = &mut s; // 可读作用域之间，出现了可写引用 r2
        println!("{}", r1); // ❌ 编译报错
    }
    ```

  * 可读作用作用域之间不能出现可写引用

    ```rust
    fn main() {
        let mut s = String::from("hello");
    
        let r2 = &mut s;
        let r1 = &s; // 可写作用域之间，出现了可读引用 r1 
        println!("{}", r2); // ❌ 编译报错 
    }
    ```

##### 写

解引用后才能读取值，才能重写值

```rust
fn main() {
  
  	// ⚠️  必须保证多级引用都是可变引用，最后解出来才能重写值
    let mut a="a".to_string();
    let mut b =&mut a; // 变量a声明为mut ，取引用也要 &mut 
    let c =&mut b;  // ⚠️ c 存的是可变引用 b，如果c 不再取 &c，c 的 mut 修饰符加不加都行
  
    // 引用只是内存地址，*可解引用获取值，注意对应层数
    println!("{}",**c); // 输出 a
    
    **c="c".to_string(); // 修改
    println!("{}",**c); // 输出 c
}
```

自定解引用



这些限制的好处是 Rust 可以在编译时就避免数据竞争，同一作用域只能有 1 个可读引用可以修改值

#### 推荐

通过括号创造作用域，如果仅仅通过引用出现的最后一行作为其作用域结尾，当逻辑很复杂时根本看不出来每个引用的作用域。可以使用括号明确的划分作用域

```rust
fn main() {
    let mut s = String::from("hello");
		{
      let r2 = &mut s;
    	println!("{}", r2); 
  	}
    let r1 = &s; // 可写作用域之间，出现了可读引用 r1 
}
```



## 类型系统

### 数值类型

#### 整数类型

- 有符号整数：`i8`, `i16`, `i32`, `i64`, `i128`, `isize`
- 无符号整数：`u8`, `u16`, `u32`, `u64`, `u128`, `usize`

其中，`isize` 和 `usize` 的大小取决于运行程序的计算机架构（32位或64位）。

```rust
// ** 整数字面量，默认会被推导为 i32 类型 **

// ** 下面是十进制数字 17，对应的其他进制的字面量 **
fn main() {
    // 二进制
    let a= 0b10001;
    
    // 八进制
    let b=0o21;
    
    // 十进制
    let c =17;
    
    // 十六进制
    let d=0x11;
    
    // 字节
    let e = b'a'; //  ASCII值 17对应的是个控制字符，打不出来。这里用个 a 字母，其实际是数字 97
    
    println!("a = {}, b = {}, c = {}, d = {} , e={}", a, b, c,d,e); // 默认输出十进制值
    // a = 17, b = 17, c = 17, d = 17 , e=97
    
}

```

十进制转其他进制的短除法：

![image-20250427004604990](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20250427004605P1iRSY.png)

#### 浮点数类型

- `f32`: 32位单精度浮点数
- `f64`: 64位双精度浮点数，默认使用这个类型（在现代的 CPU 中它的速度与 `f32` 几乎相同，但精度更高）

#### 布尔类型

`bool`: 只能取值为 `true` 或 `false`

#### 字符类型

`char`: 表示一个Unicode标量值，是四个字节长度的字符

```rust
fn main(){
 let c:char='你';
}
```

### 复合类型（Compound Types）

#### 元组

固定长度，元素可以是不同类型

```rust
let x=(1,1,1) // 自定推导类型

let x:(u32,u32,u32)=(1,1,1) // 带类型声明
```

#### 数组、切片、向量

数组：固定长度，元素只能是一种类型（与 Go 一致）

```rust
let arr = [1, 2, 3, 4, 5];   // 自定推导类型

let arr:[i32;5] = [1, 2, 3, 4, 5];  // 带类型声明
```

切片：对数组、字符串的一部分引用（范围是左闭右开）。⚠️ 与 Go 中切片不同，Rust 中切片只能是数组的局部视图，不能超过数组范围，Go 中的切片支持自动扩容

```rust
// 从数组生成切片
let arr = [1, 2, 3, 4, 5]; 
let slice = &arr[1..3]; 
let slice:&[i32] = &arr[1..3]; // 带类型声明


// 从字符串生成切片
let s = "abcdef"; 
let s1 = &s[1..3]; 
let slice:&str = &s[1..3];  // 带类型声明


// 从切片生成切片
let slice1 = &slice[1..3];
```

向量：也叫动态数组

```rust
Vec<User>
```



#### 字符串

⚠️ Rust 中字符串无法通过角标索引

Rust把字符串在各种场景下的使用给模型化、抽象化成下面几种类型

```rust
&'static str, String, &String, str, &str, 

[u8], &[u8], &[u8; N], Vec<u8>


OsStr, OsString
Path, PathBuf
CStr, CString
```

##### 字符串

```rust
fn main(){
  
  // 字符串字面量存储在静态数据区，类型是 &'static str 
  // ⚠️ &'static str 是&str的一种，所以&'static str标记为 &str 也没问题，反之不可以
  let s1: &'static str = "I am a superman."; 
  
  // String与字面量的区别是 String 拥有所有权、容量可增长、分配在堆上的特征
  // xxx.to_string()、String::from(xxx) 两种方式将 字面量、&String、&str(切片引用)转为 String，这个过程会将字面量拷贝到堆上
  let s2: String = s1.to_string(); 
  
  
  // String 的引用类型
  let s3: &String = &s2; 
  
  
  // &str 切片类型引用，也等价于s2.as_str()
  // &'static str、String、&String 、&Str 都支持取切片
  let s4: &str = &s2[..]; // 字符串的切片引用类型
  let s5: &str = &s2[..6];// 字符串的切片引用类型，范围 [0,6)
  
}
```

![image-20250205002100014](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20250205002100UC3BsH.png)





##### 字节串

```rust
[u8]  // 是字节串切片，大小是可以动态变化的
&[u8] // 是对字节串切片的引用，即切片引用，与 &str 是类似的

[u8; N] // 字节数组

// 获取字节数组引用=> 
// 方式 1：let arr: [u8; 3] = [0, 1, 2,]; let slice: &[u8] = &arr[1..2];
// 方式 2：let arr: [u8; 3] = [0, 1, 2,]; let slice: &[u8] = arr.as_bytes();
&[u8; N]  // 字节数组（N是字节数组的长度）的引用

Vec<u8>  // 是 u8 类型的动态数组。与 String 类似，这是一种具有所有权的类型
```

![image-20250205005815010](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20250205005815f3olMD.png)

##### 引用 --> 引用切片

这个转换是**隐式转换**

字符串

```rust
fn main(){
  let s="xxx".to_string();  // s应该是 String 类型

  let s1 = &s;
  let s2:&str=&s;  // 如果 s2 是、指定切片引用类型，Rust 会发生隐式转换

  // 使用 &str 就能让函数接收 &String、&str 两种类型
  fn receive(s:&str){
    // 逻辑
    println!("{}", s);
  }

  receive(&s1);
  receive(s2);

  // ⚠️ 这意味着在 Rust 中 &String、&str 是可以混用的

}
```

向量与向量切片

```rust
// 参数接收 &Vec<T>向量、&[T]向量切片 
fn receive(s:&[T]){
  
}

// 参数接收 &Vec<u8>、&[u8]向量切片 （T 是 u8时，就是字节串）
fn receive(s:&[u8]){
  
}
```

##### 字节串 --> 字符串



##### 字符串 --> 字符串数组

```rust
fn main(){
  let s1="你好".to_string();

  let char_vec: Vec<char>=s1.chars().collect(); // chars() 可以用来把字符串转换为一个迭代器,collect() 将迭代器所有元素收集到 Vec 中 

  println!("{:?}",char_vec); // ['你', '好']
  
  
  // for 循环迭代器
  for ch in s.chars() {
		 println!("{:?}", ch);
	}
}
```



#### 结构体

##### 结构体

```rust
// 【声明】
//  ⚠️ Go 是 type User struct{}
struct User {
  username:String,
  active: bool
}  // ⚠️ 无需分号

---------------------------------------------

// 【实例化】
let username = String::from("tom");
let active = true;
struct User {
  username:String,
  active: bool
}
// 字面量实例化、支持简写方式，这些类似 JS 
let user1 = User{ 
  username, // 简写
 	active // 简写
};

// 也支持展开实例字段，类似 JS
let user2 = User{ 
  username:String::from("jack"), 
 	..user1 // ⚠️ 展开结构体实例被称为 base struct , 必须在最后，这与 JS 不同
};

---------------------------------------------

// 【修改实例】注意声明为 mut
let username = String::from("tom");
let active = true;
#[derive(Debug)] // 特殊的宏，所以后面{:?}才能输出结构体内部数据
struct User {
  username:String,
  active: bool
}
let mut user = User{ 
    username, 
 		active 
};
// ⚠️ 修改实例，变量前需加 mut
user.username=String::from("jack");
print!("{:?}",user) // User { username: "jack", active: true }
```

##### 元组结构体

元组结构体更加紧凑

```rust
// 普通结构体
struct Point{
  x:u32,
  y:u32,
  z:u32
}

// ---------------------------------
// 可以看下元组结构体，确实更加紧凑

// 【声明】
struct Point(u32, u32, u32); 

// 【实例化】
let origin = Point(0, 0, 0);
```

##### 单元结构体

没有任何字段的结构体

```rust
struct ArticleModule; // ⚠️ 没有字段可省略 {} 
let module = ArticleModule; // 【实例化】 没有字段，可以省略{}
```

这个语法有歧义，很容易让人疑惑：类型为什么能直接赋给一个变量？

实际上是单元结构体省略了

##### 方法、关联方法

在 Rust 中 Struct 实例可以调用方法、关联方法，⚠️ 实例引用调用时会自动解引用，所以也可调用

```
user.get_name()
&user.get_name() // ✅ &user会解引用，所以也可调用get_name
```

###### 方法

相当类的实例方法，通过`.`调用

```rust
// 声明结构体
#[derive(Debug)]
struct User{
    name:String,
    age:u8,
}

// 实例方法
impl User {
  	// 1、命名推荐下划线
  	// 2、函数最后一句表达式，作为返回值。⚠️ 不加分号，加了分号就是"语句"
  	// 3、参数类型 Self ，表示自身实例
  
  	// 🚩 方式 1
    fn get_name(self) -> String { // 参数是 self:Self 的简写。会发生所有权转移
        self.name 
    }
  	// 🚩 方式 2
  	fn get_name(&self) -> String {// 参数是 self:&Self 的简写。可读引用，只能克隆值作为返回值
        self.name.clone() 
    }
  	// 🚩 方式 3
  	fn get_name(&mut self) -> String {// 参数是 self:&mut Self 的简写。通过可写引用，可操作实例
      self.name=""  
      self.name.clone() 
    }
}
```

 🚩 方式 1 案例

```rust
// 声明结构体
#[derive(Debug)]
struct User{
    name:String,
    age:u8,
}

// 实例方法
impl User {
    fn get_name(self) -> String {// 所有权转
        self.name
    }
}
fn main(){
  let user= User{
    name:String::from("tom"),
    age:20
	};
  let name = user.get_name(); // User实例的所有权会转移到形参，实例不可再用
  print!("{:?}",user); // ❌ 编译不通过 user 所有权已被转移
  
}
```

 🚩 方式 3 案例

```rust
// 声明结构体
#[derive(Debug)]
struct User{
    name:String,
    age:u8,
}

// 实例方法
impl User {
    
    fn get_name(&mut self) -> String {// 参数是 self:&mut Self 的简写
        self.name="变更".to_string();
        self.name.clone()
    }
    
}


fn main() {
  	// user 也要标记为 mut
    let mut user= User{
        name:String::from("tom"),
        age:20
    };
    
    print!("{}",user.get_name()); // 变更
    print!("{:?}",user); // User { name: "变更", age: 20 }
}
```





###### 关联方法

相当类的静态方法，通过`::`调用

```rust
// 声明结构体
struct User{
  name:String,
  age:u8,
}

// 关联方法
impl User {
  // 1、Rust 中认为参数不含有self ，就是关联方法
  // 2、习惯上，结构体都会定义 new 方法，用来实例化

  fn new(name:String,age:u8) -> User { // 参数是 self:Self 的简写，所有权会转移到形参
    User {name,age}  // ⚠️ 隐式返回，最后一行是表达式（不要加分号），其值最为返回值
  }

}


fn main() {
  // 调用使用::
  let  user = User::new(String::from("Alice"), 30);

}
```

###### pub修饰符

在 Rust 中，`struct` 的方法、关联方法都可以使用 `pub` 关键字来标记为公共的，这些函数可以从定义它们的**模块**外部访问



##### 所有权

###### 转移

```rust
let user1 = User{ 
  username:String::from("tom"),
 	active:true 
};
let user2=user1 // 所有权发生转移

---------------------------------------------

#[derive(Debug)]
struct User{
    name:String,
    age:u8,
}


impl User {
    fn get_name(self) -> String {
        self.name
    }
}

let user= User{
    name:String::from("tom"),
    age:20
};
let x=user.get_name(); // 所有权转移
print!("{:?}",user); // ❌ 编译报错
```

###### 部分（Partial Move）

结构体是多字段组成的类型，可以发生某字段的转移

```rust
let user1 = User{ 
  username:String::from("tom"),
 	active:true 
};
let name = user1.username // String是所有权类型，会发生所有权发生转移
print!("{:?}",user) // ❌ 编译报错
```

#### 枚举

##### 变体

Rust中的变体指的是枚举项

```rust
enum Color{
	Red,
	Green,
	Blue
}

// 使用枚举的一个变体
// Color 是类型
// Color::Red 是值
let my_color:Color = Color::Red; 
```

变体可以指定实际数据

* 与其他语言不同，Rust中数据类型只能是 isize 类型
* 不指定时，默认 Red 为 0，后续从 0 开始。如果中间某项指定数值 X，则后续从X 开始

```rust
enum Color{
    Red, // 0
    Blue,  // 1
    Black=10,
    Yellow // 11
}
fn main() {
    
    println!("{}",Color::Blue as isize);
    println!("{}",Color::Yellow as isize);
 
}
```

##### 带负载的变体

当指定为某一个变体时，如果该变体带负载（类型信息），需要实例化该变体

```rust
enum Shape {
  
    Rectangle { width:u32,height:u32 }, // 矩形， 负载是结构体 ,使用{ }
  
    Triangle ((u32,u32),(u32,u32),(u32,u32)),// 三角形， 负载是元组 ,使用()
  
    Circle { origin:(u32,u32), radius:u32 }, // 圆形，负载是 结构体 
}

// 带负载的枚举，需要实例化数据
fn main(){
  let shape = Shape::Rectangle {width:10,height:20};
}
```

##### 比较

在 TS 中，类似对象、数组等复杂的类型不能直接用 `==` 判断是否相等的。枚举作为一个值是可以比较的

但是在 Rust 中枚举是可以携带复杂数据的，所以一定切记枚举不能直接 `==` 比较

可以使用后面提到 `match 变量{}`/`匹配模式`、`if let 枚举=变体变量`、`while let 枚举变体=值变量` 等方式比较

##### 自动引入变体

函数签名中使用枚举，函数作用域内自动引入

```rust
use crate::Gender::{Man, Woman};

#[derive(Debug)]
enum Gender{
    Man,
    Woman
}
fn main() {
   
    fn deal(value:u8) ->Gender  {
        if value==0{
            return Man; // ⚠️ 作用域内，可直接使用变体
        }
        return Woman; // ⚠️ 作用域内，可直接使用变体
    }
    
    println!("{:?}",deal(0)) // 加上#[derive(Debug)]，这里输出的就是变体名，即 Man
  
  
  	// 入参是枚举 
  	fn deal2(value:Gender) ->i8  {
        if let Man=value{
            return 0; // ⚠️ 作用域内，可直接使用变体
        }
        return 1; // ⚠️ 作用域内，可直接使用变体
    }
}
```

模式匹配作用域中也会自动引入（后面会讲到）

```rust
let res: Result<i32, &str> = Ok(42);

// 模式匹配 
match res {
    Ok(value) => println!("Success: {}", value), // 直接使用 Ok
    Err(e) => println!("Error: {}", e), // 直接使用 Err
}
```

解构带负载的枚举

```rust
let res: Result<i32, &str> = Ok(100);

// 使用解构的方式
if let Ok(value) = res {
    println!("Got a value: {}", value);
} else {
    println!("Error");
}

// --------------------------------
enum Gender{
    Man,
    Woman
}

let user = Gender::Man; 
if let Man=user{  // ❌ 不带负载的不行，这种一般认为是判断是否相等，而不是解构
    println!("男")
}else{
    print!("女");
}
```



##### 枚举的方法

当变量赋值为某一变体后，该变量可调用枚举的方法

```rust
enum MyEnum {
    Add,
    Subtract,
}

impl MyEnum {
    fn run(&self, x: i32, y: i32) -> i32 { // &self 是 self：&Self 的简写
        
       // match 语句
      	match self {                 
            Self::Add => x + y,
            Self::Subtract => x - y,
        }
    }
}

fn main() {
    // 实例化枚举
    let add = MyEnum::Add;
    // 实例化后执行枚举的方法
    add.run(100, 200);
}

```

##### Option枚举

Option 是内置的枚举，表示区分变量的零值、正常值

补充：

* 在 JS 中，以 null、undefined 作为空的概念。但是这样极容易出现空指针异常
* 后来出现了类似 Go的方式，每个类型都有默认零值表示空的概念，如果一个数字类型的值是 0，你根本无法区分是默认值还是实际值

* Rust 采用的方式： 1、所有的变量定义后使用前都必须初始化； 2、把每个类型的零值单独提出来用枚举值`Option<T>::None`表示

```rust
// 源码
enum Option<T> {
    Some(T), // 负载是元组
    None, 
}

// 空字符是 GO 中的零值，但是在 Rust 中是可以区分开的
let value0 = Option::Some(""); // 根据值隐式推断
let value1: Option<String> = Option::Some("");  // 显式声明类型
let value2 = Option::<String>::Some("");  // turbofish 语法

// Rust 中指定字符串零值
// 注意 None 无法隐式推断必须用下面两种方式声明
let value3:Option<String> = Option::None  // 显式声明类型
let value4 =Option::<String>None  // turbofish 语法
```

##### Result枚举

Result 也是内置的枚举，用于函数返回值类型，包含函数成功、出错两种状态，它包含`Ok`或`Err`两个变体

```rust
// 源码
enum Result<T,E>{
  Ok(T), // 负载是元组
  Err(E) // 负载是元组
}

// 应用
let res:Result<i32, &'static str>=Ok(100);

fn divide(a: i32, b: i32) -> Result<i32, &'static str> {
  if b == 0 {
    Err("Division by zero!")  // 自动引入枚举变体，所以可以直接使用 Err 、Ok
  } else {
    Ok(a / b)
  }
}
```

##### 解包枚举值

```rust
Option::<i32>::Some(100) 与 100 显然类型不一致，但是实际第一个只是100 包了个枚举
```

这就需要引入解包枚举值获取原始值的概念了

###### unwrap

```rust
// ✅ 运行成功，无输出
fn main() {
    let x=Option::<String>::Some(String::from("xxx"));
    assert_eq!(x.expect("提示 message"), String::from("xxx"))
}


// ❌ 编译是可以通过的，但是运行时触发 panic ，输出 "提示 message"
fn main() {
    let x=Option::<String>::None;
    assert_eq!(x.expect("提示 message"), "xxx")
}
```

![image-20250226005242707](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20250226005242zrX9SA.png)

#### 函数

##### 函数

```rust
// 入参、返参
fn add(x:i32,y:i32)->i32{
    x+y // 最后一个表达式最为返回值（注意没有分号，带分号就是语句了），也支持 return 返回
}

fn main() {
  	// 调用
    let x=add(1,2);
    println!("{}",x); //3
}
```

##### 匿名函数

待补充...

### 别名

#### type

type 可以给类型起别名

```rust
type xx = Vec<String>; // ⚠️ 这是个语句，加分号
```

#### Newtype模式

通过只有一个元素的元组结构体，对基础类型进行封装

**例如：用户 ID 和订单 ID，其数据类型都是 u64 **

```rust
// 别名：
type UserId = u64;
type OrderId = u64;

// Newtype ：
struct UserId(u64);
struct OrderId(u64);


// 在使用时，UserId、OrderId 比 u64 更具有语义化
fn process_user(user_id: UserId) {
    
}


//  🚩 ------------------------
//  Newtype相比别名，其会屏蔽内部类型的方法、属性；同时，我们可以为 Newtype 类型实现新的方法
```



### 泛型

Rust 不支持设置泛型默认值，必须显示的赋值

#### 结构体泛型

turbofish 语法传入泛型

结构体泛型

```rust
struct Point<T>{
  x:T,
  y:T
}
fn main() {
  // 显式指定泛型 （⚠️ 与其他语言不同，显示指定泛型需要直接标记到 变量上）
  let p1:Point<f32> = Point{x:1.0,y:2.0};
  
  // 结构体名::<T>、函数名::<T> ，这种显示指定泛型的语法，称为 turbofish 语法  
  let p2 = Point::<i32>{x:1,y:2};
  
  // 通过第一个类型为 T 的变量，推断出 T 的值
  let p3 = Point{x:1,y:2}; // 推断为 i32
  let p4 = Point{x:1.0,y:2.0}; // 推断为 f64
  
}


// ---------------------------------------------
// 元组结构体 
struct Point<T>(T,T)

```

结构体方法、关联方法使用泛型

```rust
struct Wrapper<T> {
    item: T,
}

// impl<T> 这个 T 在 impl block 域中定义了泛型T ，后面是用的 T 都是这里定义的
impl<T> Wrapper<T> {
    fn new(item: T) -> Self {
        Wrapper { item }
    }

    fn get_item(&self) -> &T {
        &self.item
    }
}


fn main() {
    // 默认根据 item 值推导出 T 为 &str 类型
    let w = Wrapper::new("Hello, world!");
  
  	// turbofish 语法，通过 Wrapper::<&str> 指定泛型 T 是&str
  	let w = Wrapper::<&str>::new("Hello, world!");
  
  
    println!("{}", w.get_item());
}
```

#### 函数泛型

turbofish 语法传入泛型

```rust
fn print_type<T>(item: T) {
    println!("{:?}", item);
}

fn main() {
    print_type::<i32>(42);
}
```

#### 枚举泛型

前面提到过的 Result，直接将泛型传递给变体

```rust
enum Result<T,E>{
  Ok(T), // 返回成功的类型 T
  Err(E) // 返回失败的类型 E
}


type xxx = Result<i32, &'static str>
```

枚举的 turbofish 语法

```rust
let value=Option::<String>::None;
```

#### 别名泛型

```rust
type<T> = Vec<T>
```

### 类型转换

#### as 语法

##### 数值类型之间

类型不同无法运算 , 可使用 as 做类型强制转换

```rust
fn main(){
    let a = 5u32;
    let b = 10u8;
    
    let c =a+b as u32;
    println!("{}",c);  // 15
    
    let d =a as u8+b;
    println!("{}",d); // 15
}
```

从高精度类型 ---> 低精度类型，会造成数据精度丢失

```rust
fn main(){
    let a = 5.78f32;
    println!("{}",a as i32);  // 5 ⚠️ 精度丢失了
}
```

##### 枚举类型 --> 整数

```rust
enum Status {
    Active = 1,
    Inactive = 2,
}

fn main() {
    let status = Status::Active;
    let num = status as i32; // 结果是 1
}
```

#### 字符串 <--> 数值类型

字符串  --> 数值类型

```rust
fn main() {
    let str_num = "123";
    
    match str_num.parse::<i8>() { // ::<i8> 是 turbofish 指定函数传入的泛型 , 用于指定 num 的类型
        Ok(num) => println!("转换成功: {}", num),
        Err(e) => println!("转换失败: {}", e),
    }
}

// str_num = "111aa"  这种会转换失败
// str_num = "111.11" 这种由于指定的泛型是 i8，所以也会失败
```

⚠️ 这是 Rust 中很常用的形式，函数返回 Result 枚举，直接将其放到 match 中处理成功、失败两种可能

## 标准库中的集合

```rust
Vec<T>

HashMap<K, V>
```

## 控制流

### 条件

```rust
fn main() {
    let number = 3;

    if number < 5 {
        
    } else if(number>=5 && number<10){
        
    } else {
     
  	}
}
```

### 循环

支持 break、continue

#### loop

一直循环

```rust
fn main() {
    loop {
        println!("again!");
    }
}
```

```rust
fn main() {
    let mut counter = 0;

    let result = loop {
        counter += 1;

        if counter == 10 {
            break counter * 2;  // break xxx 支持作为 loop 的返回值
        }
    };

    println!("The result is {result}");
}
```

####  while



#### for

for 循环 Range

```rust
for i in 0..5{
  println!("{}", i); // 从 0 到 4
}

for i in 0..=5{
  println!("{}", i); // 从 0 到 5
}
```

还可以用来是遍历迭代器

```
```



### 模式匹配

#### match

```rust
enum Color{
    Blue,
    Yellow,
    Red,
    Green,
    Black
}
fn main() {
    let my_color = Color::Red;
    
    // match 有返回值
    let ret=match my_color{
        // 1、 多个条件用 ｜ 拼接
        Color::Blue|Color::Yellow => "blue或yellow",
        
        // 2、 处理语句多行时，需要放在{}作用域内
        Color::Red => "green",  // 这可千万别当场 JS 的监听函数返回值。而是函数的最后一个表达式就是返回值
        Color::Green => {
            "red"
        },
        
        
        // 3、Rust 强制必须把枚举的所有分支都写出来，如何需要省略就用 _
        _ => {
            "未知"
        }
    }; // 一旦赋值就是语句了，加分号
    
    println!("{}",ret);
}

```

match 带变体的枚举

```rust
enum Shape {
    
    Rectangle { width:u32,height:u32 }, // 矩形， 负载是结构体 ,使用{ }
    
    Triangle ((u32,u32),(u32,u32),(u32,u32)),// 三角形， 负载是元组 ,使用()
    
    Circle { origin:(u32,u32), radius:u32 }, // 圆形，负载是 结构体
}

fn main(){
    // let shape = Shape::Rectangle {width:10,height:20};
    let shape = Shape::Circle {origin:(0,0),radius:20};
    
    match shape{
        Shape::Rectangle {width:120,height:20} =>{ // 必须与实例化数据一致才能匹配上
            println!("命中")
        }
        Shape::Circle {origin,radius} =>{ // 解构构（类似 JS 中的解构）
            println!("命中 origin:{:?} radius:{}",origin,radius) // 输出 命中 origin:(0, 0) radius:20
        }
      
      	// 还可以将更深层的内容解开
      	//Shape::Circle {origin:(x,y),radius} =>{ //
        //    println!("命中 origin:({},{}) radius:{}",x,y,radius) // 输出 命中 origin:(0, 0) radius:20
        //}
      
        _=>{
            println!("未命中")  // 输出 未命中
        }
    }
}

```

match 还支持数字类型

```rust
fn main() {
    let number = 13;
    // 你可以试着修改上面的数字值，看看下面走哪个分支

    println!("Tell me about {}", number);
    match number {
        // 匹配单个数字
        1 => println!("One!"),
        // 匹配几个数字
        2 | 3 | 5 | 7 | 11 => println!("This is a prime"),
        // 匹配一个范围，左闭右闭区间
        13..=19 => println!("A teen"),
        // 处理剩下的情况
        _ => println!("Ain't special"),
    }
}

```

#### if let、while let

 `if let` 是 `match` 的一个语法糖，相当于只有一个条件的 match

```rust
enum Color{
    Blue,
    Yellow,
    Red,
    Green,
}
fn main() {
    let my_color = Color::Red;
   
    //⚠️ if 、while 语法中 不能直接通过 == 判断分支，必须 let 枚举变体 = 变量 
    if let Color::Red = my_color{ // 等号右边是值
        println!("{}",my_color as isize);
    };
}
```

即使变体携带复杂数据，仍然可以对比成功

```rust
use crate::Gender::{Man, Woman};

#[derive(Debug)]
enum Gender{
    Man(i32,i32),
    Woman
}
fn main() {
    
    fn deal(value:Gender) ->i32  {
        if let Man(1,1) = value{
            return 1; // ⚠️ 作用域内，可直接使用变体
        }
        return 0; // ⚠️ 作用域内，可直接使用变体
    }
    
    
    println!("{:?}",deal(Gender::Man(1,1))) // 1
}
```



## 解构

### 解构带负载的枚举

如果是有负载的变体，let 能匹配出来负载值。JS 中这种语法叫解构赋值

⚠️ 与上面提到的 if let、if while 也可以理解成解构，不带负载时就是对比是否相等

```rust
enum Shape {
    Rectangle { width:u32,height:u32 }, 
    Triangle ((u32,u32),(u32,u32),(u32,u32)),
    Circle { origin:(u32,u32), radius:u32 }, 
}
fn main() {
    
    let shape_a = Shape::Rectangle {width: 10, height: 20};
    let shape_b = Shape::Circle {origin: (0,0), radius: 20};
    
 		// 方式 1
    if let Shape::Rectangle {width, height} = shape_a {
        println!("{}, {}", width, height); // 10 20
    }else{ // 解构失败
        panic!("Can't extract rectangle.");
    }
  
	  	
  	// 方式 2
  	let Shape::Rectangle {width, height} = shape_a else{
        panic!("Can't extract rectangle.");
    };
}

```

### 解构元组/数组

```rust
fn main() {
    let point=(0,0,0);
    let (x,y,z)=point;
    println!("{},{},{}",x,y,z);
}
```

```rust
fn main() {
    // _ 代表匹配一个值
    let [a, .., b, _] = [1, 2, 3, 4, 5];
    println!("a:{} ; b:{}",a,b) // a:1 ; b:4
}
```

### 解构结构体

⚠️ 可能会导致，部分字段所有权转移

```rust
struct User{
    name:String,
    age:u8,
}
fn main() {
    let user=User{
        name:"jack".to_string(),
        age:20
    };
    
    let User{name,age} = user;
    println!("{}、{}",name,age); // jack 、 20
    
    println!("{}",user.age); //  20
    
    println!("{}",user.name); //  ❌ 编译失败。 name 是 String 会发生 所有权部分移动（partially moved），所以 user 中的 name 不再可用
}
```

ref

```rust
struct User{
    name:String,
    age:u8,
}
fn main() {
    let user=User{
        name:"jack".to_string(),
        age:20
    };
    
    // ref 告诉编译器不需要所有权转移， 自动获取的是借用，所以 name 实际类型是 &String
    let User{ ref name, age} = user;
  	// let User{ ref mut name, age} = user;  mut name花
  
    println!("{}、{}",name,age); // jack 、 20
    
    println!("{}",user.age); //  20
    
    println!("{}",user.name); //  jack
}
```

 ref mut 通过引用修改

```rust
struct User{
    name:String,
    age:u8,
}
fn main() {
    let mut user=User{
        name:"jack".to_string(),
        age:20
    };
    
    // ref 告诉编译器不需要所有权转移， 自动获取的是借用，所以 name 实际类型是 &String
    let User{ ref mut name,age} = user;
    
    let mut new_name="tom".to_string();
    *name="tom".to_string();
    
    println!("{}",user.age); //  20
    
    println!("{}",user.name); //  tom
}
```

### 解构函数参数

解构元组参数

```rust
fn deal((x,y,z):(u32,u32,u32)){
    println!("{},{},{}",x,y,z); // jack,20
}
fn main() {
    deal((1,2,3)) // 1,2,3
}
```

析构结构体参数

```rust
struct User{
    name:String,
    age:u8,
}

fn deal(User{ name,age }:&User){
    println!("{},{}",name,age); // jack,20
}
fn main() {
    let user=User{
        name:"jack".to_string(),
        age:20
    };
    deal(&user)
    
}
```

## 解引用

签名遇到的时候已经提过了，这里总结下

### 自动解引用

#### 函数参数传递
若类型  U  实现了  Deref<Target=T> ，则  &U  可以自动转换为  &T 

Rust中实现了 Deref Trait 的类型：

*  `&String  →  &str `
*  `&Vec<T>  →  &[T]`
* `&Box<T>  →  &T`



```rust
use std::ops::Deref;

struct MyBox<T>(T);
impl<T> Deref for MyBox<T> {
    type Target = T;
    fn deref(&self) -> &Self::Target { &self.0 }
}

fn main() {
    let my_box = MyBox(String::from("Rust"));
    let s: &str = &my_box; // 自动解引用：MyBox<String> → &String → &str
    println!("{}", s);
}
```

#### 方法调用
当调用一个方法时，编译器会尝试对接收者进行多层解引用，直到找到匹配的方法实现

```rust
struct MyStruct;
impl MyStruct {
    fn method(&self) { println!("MyStruct method"); }
}

let s = MyStruct;
let ref_s = &s;
let ref_ref_s = &&s;

ref_s.method();     // 自动解引用：&MyStruct → MyStruct
ref_ref_s.method(); // 自动解引用：&&MyStruct → &MyStruct → MyStruct
```

#### 操作符重载

如  `+`、`*`   ，编译器会自动解引用操作数，以匹配操作符的实现。

```rust
let a = 5;
let b = &a;
let c = &&a;

assert_eq!(a + *b, 10);   // 显式解引用
assert_eq!(a + b, 10);     // 自动解引用：&i32 → i32
assert_eq!(a + c, 10);     // 自动解引用：&&i32 → &i32 → i32
```

### 自动解引用的优先级规则

编译器按以下顺序尝试解引用，直到找到匹配的方法或类型：
直接匹配：类型完全一致。

* 解引用一次： &T  →  T 
* 解引用多层： &&T  →  &T  →  T 
* 解引用 + 强转（Coercion） ：例如  &String  →  &str （通过  Deref ）
* 优先使用  &mut T  而非  T 
  如果同时存在不可变和可变引用，优先选择更少层数的解引用：

```rust
struct Data;
impl Data {
    fn method(&self) {}
    fn method_mut(&mut self) {}
}

let mut data = Data;
let mut_ref = &mut data;
mut_ref.method(); // 自动选择 &mut Data → &Data → 调用 method()
```



### 手动解引用

直接访问内部数据：

```rust
let boxed = Box::new(42);
let value = *boxed; // 必须显式解引用
```

#### 修改可变引用指向的值

```rust
let mut x = 5;
let y = &mut x;
*y += 1; // 必须显式解引用
```

#### 模式匹配（match）

```rust
let option = Some(42);
if let Some(value) = &option {
    println!("{}", value); // 自动解引用：&Option<i32> → Option<&i32>
}
```



## trait



