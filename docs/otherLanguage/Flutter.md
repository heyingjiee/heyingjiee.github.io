# Flutter

[Flutter中文网](https://flutterchina.club/get-started/install/)

[Flutter 实战](https://book.flutterchina.club/chapter1/mobile_development_intro.html#_1-1-1-%E5%8E%9F%E7%94%9F%E5%BC%80%E5%8F%91%E4%B8%8E%E8%B7%A8%E5%B9%B3%E5%8F%B0%E6%8A%80%E6%9C%AF)

[Dart语法](https://dart.cn/guides/language/language-tour)

## Flutter简介

## Flutter起步

> **Dart SDK 文档** ：https://dart.cn/get-dart

> **特别注意从 Flutter 1.21 版本开始，[Flutter SDK](https://flutter.dev/docs/get-started/install) 会同时包含完整的 Dart SDK** 因此如果你已经安装了 Flutter，可能就无需再特别下载 Dart SDK 了



**[开发环境搭建](https://book.flutterchina.club/chapter1/install_flutter.html)** 基本分为以下几个核心步骤：

* 下载Flutter SDK （其中以包含Dart SDK），配置环境变量
* 在自己VSCode或者Android Studio上安装`Flutter`和`Dart`插件
* 运行 `flutter doctor`，查看需要flutter需要的依赖是否安装好。（需要Android Studio和Xcode）



官方推荐使用VSCode或者Android Studio（是基于IntelliJ IDEA开发的，所以也可以使用IntelliJ IDEA）进行开发，开发时需要安装的两个插件的主要作用:

- `Flutter`插件： 支持Flutter开发工作流 (运行、调试、热重载等)。
- `Dart`插件： 提供Dart代码分析 (输入代码时进行验证、代码补全等)。





## Dart语法

> [Flutter 为什么选择 Dart 语言？](https://book.flutterchina.club/chapter1/flutter_intro.html#_1-2-1-flutter-%E7%AE%80%E4%BB%8B)
>
> - **开发效率高**。
>
>   Dart 运行时和编译器支持 Flutter 的两个关键特性的组合：
>
>   - **基于 JIT 的快速开发周期**：Flutter 在开发阶段采用，采用 JIT 模式，这样就避免了每次改动都要进行编译，极大的节省了开发时间；
>   - **基于 AOT 的发布包**: Flutter 在发布时可以通过 AOT 生成高效的机器码以保证应用性能。而 JavaScript 则不具有这个能力。
>
> - **高性能**。
>
>   Flutter 旨在提供流畅、高保真的的 UI 体验。为了实现这一点，Flutter 中需要能够在每个动画帧中运行大量的代码。这意味着需要一种既能提供高性能的语言，而不会出现会丢帧的周期性暂停，而 Dart 支持 AOT，在这一点上可以做的比 JavaScript 更好。
>
> - **快速内存分配**。
>
>   Flutter 框架使用函数式流，这使得它在很大程度上依赖于底层的内存分配器。因此，拥有一个能够有效地处理琐碎任务的内存分配器将显得十分重要，在缺乏此功能的语言中，Flutter 将无法有效地工作。当然 Chrome V8 的 JavaScript 引擎在内存分配上也已经做的很好，事实上 Dart 开发团队的很多成员都是来自Chrome 团队的，所以在内存分配上 Dart 并不能作为超越 JavaScript 的优势，而对于Flutter来说，它需要这样的特性，而 Dart 也正好满足而已。
>
> - **类型安全和空安全**。
>
>   由于 Dart 是类型安全的语言，且 2.12 版本后也支持了空安全特性，所以 Dart 支持静态类型检测，可以在编译前发现一些类型的错误，并排除潜在问题，这一点对于前端开发者来说可能会更具有吸引力。与之不同的，JavaScript 是一个弱类型语言，也因此前端社区出现了很多给 JavaScript 代码添加静态类型检测的扩展语言和工具，如：微软的 TypeScript 以及Facebook 的 Flow。相比之下，Dart 本身就支持静态类型，这是它的一个重要优势。
>
> - **Dart 团队就在你身边**。
>
>   看似不起眼，实则举足轻重。由于有 Dart 团队的积极投入，Flutter 团队可以获得更多、更方便的支持，正如Flutter 官网所述“我们正与 Dart 社区进行密切合作，以改进 Dart 在 Flutter 中的使用。例如，当我们最初采用 Dart 时，该语言并没有提供生成原生二进制文件的工具链（这对于实现可预测的高性能具有很大的帮助），但是现在它实现了，因为 Dart 团队专门为 Flutter 构建了它。同样，Dart VM 之前已经针对吞吐量进行了优化，但团队现在正在优化 VM 的延迟时间，这对于 Flutter 的工作负载更为重要。



在Dart 2.12及以上版本，Dart已支持空安全，以下所有内容均是启用空安全的语法

VSCode中安装`Code Runner`插件，这个插件可以直接运行，单独的 `*.dart`文件（需要提前安装好 Flutter SDK，并配置好环境变量）

### 变量基础

Dart中

- 所有变量的值都是 **对象**，每个对象都是一个 **类** 的实例

  例如：数字、函数以及 `null` 都是对象。注意：除去 `null` 以外, 所有的类都继承于 `Object`类

- 空安全：Null类型的变量其值才能为null，其他类型的值默认不能null（如果确定某个变量为null需要使用`类型?`开启，后面例子中会见到）

- 未初始化以及可空类型的变量拥有一个默认的初始值 `null`（由于空安全的限制，使用**类型声明**变量时，需要使用`?`关闭空安全，变量的默认值才能为`null`，否则就会报错）

- 判断变量类型

  ```dart
  String getType(dynamic obj) => obj.runtimeType.toString(); //该函数用于判断变量类型
  ```

  

### 变量关键字

**类型声明**

dart风格指南不推荐这种写法

```dart
//初始化，即声明立即赋值
String str1 = 'jack';
print(str1) //jack

//声明后，赋值
String str2;
str2 = 'tom';
print(str2); //tom
  
//声明后，不赋值就默认为null，类型就必须是String?才行
String? str3;
print(str3); //null
```

如果变量的值不只一个类型，可以将其指定为 `Object`（或 `dynamic`）类型

Object类型：不能为Null类型

```dart
Object a = "aaaa";
a = 12;
print(a); //12

a=null //报错 ，详见【变量基础】提到的，除null外 ，其他的所有类型都继承自Object
```

dynamic类型：可以是任何类型

```dart
dynamic a = "aaaa";
a = 12;
print(a); //12

a = null;
print(a); //null
```



**var声明**

声明变量，不能指定类型，当一次赋值时推断类型（var可以自动类型推断）

注意：

* var声明的变量，不赋值时会被自动推断为Null类型，该类型的变量值为null
* var声明的变量，如果赋值后，变量会被推断为赋值的类型。如果这个变量类型不是Null，该变量就不能赋值为null
* 这里有一个非常有意思的细节，比如变量值为`hello`，该变量会被推断为`String`类型，而不是`String?`类型，所以使用var声明的变量默认就不能为null（出了上一条，未赋值推断为Null类型的情况）

```dart
//初始化，即声明立即赋值
var str1 = 'jack';
print(str1); //jack

//声明后，赋值
var str2;
str2 = 'tom';
print(str2); //tom

//-------与类型声明不同----------
//声明后，不赋值。变量被推断为dynamic类型，就可以接收null值了
var str3;
print(str3); //null
```

由于dart支持类型推断，所以不需要手动指定，在第一次赋值时就会推断变量的类型

下面的写法是错误的，使用var就表示开启自动推断，不能再设置类型了

```dart
var String name
```

**const声明**

***编译时常量***

声明变量时必须赋值，且一旦赋值不可修改

```dart
const String str = 'jack';
print(str); //jack
```

注意const也有类型推断，即使不写变量类型也会推断。所以const更多的写法是不写类型，如下：

```dart
const str = 'jack';
print(str); //jack
```

与JS不同，JS中的const变量只能存储引用类型的地址，所以const类型是可以修改的。Dart解决了这个问题，const变量即使是引用类型也不可以修改

```dart
const arr = [];
arr.add(1);
print(arr);
```

**final声明**

final最重要的是具有***运行时常量***的特性，其不要求在编译时赋值，而是要求运行时赋值，且一旦赋值不可修改。所以某个方法的返回值赋值给变量使用final关键字（因为方法是运行时，才能返回值）

```dart
final DateTime a = new DateTime.now();
print(a);
```

使用const会报错，因为函数返回的时间是变化的

```dart
//报错
const DateTime a = new DateTime.now();
print(a);
```

注意final也有类型推断，即使不写变量类型也会推断。所以final更多的写法是不写类型，如下：

```dart
final a = new DateTime.now();
print(a);
```

**late声明**

延迟初始化

下面的类中，由于空安全的限制，name不能为空，我们应该一开始给name默认值，但这不符合道理，创建一个代表人的类，没必要设置一个默认名字。这时候，我们通常使用late表示变量在**运行时**进行初始化。与final不同，final也是运行时初始化，但是初始化后不可改变

```dart
class Preson {
  late String _name;

  //默认构造函数
  Preson(this._name) {
    print("默认构造函数,实例化时触发");
  }
}
```

### 内置基本类型

* 数值：int 、 double
* 字符串：String
* 布尔值：bool
* 数组：List
* 映射：Map
* Set
* Runes
* Symbols：Symbol
* Null：null

List、Map、Set属于collection类

内置类型与其他类的区别就是，可以使用字面量直接创建类型的实例，其他类只能使用构造函数创建实例

#### int和double

int型数字可以赋值给int型变量和double型变量，只不过赋值给double型时，会变成`xxx.0`

```dart
main() {
  int a = 123;
  double b = 123; //123被转换为123.0
}
```

double型变量只能接受**double型数字**，接受**int型数字**会报错

**String转化为Number**

使用`int.parse()`、`double.parse()`进行转换，在dart中只有纯数字型的字符串，才能转化为数字，参数传入其他类型的字符串会抛出FormatException异常（相比于js中的`parseInt（）`，dart没有类似的缺陷）

```dart
main() {
  String price = "123";
  print(int.parse(price)); //123
  print(double.parse(price)); //123.0
  
  String price2 = "123.1";
  print(int.parse(price)); //报FormatException异常
  print(double.parse(price)); //123.0
}
```

尽量使用`double.parse()`进行转化，因为参数无论是整型字符串还是浮点型字符串，都可以正常转换

#### String

单引号，双引号无差别

dart中类似js模版字符串用法，使用`$`

```dart
main() {
  String name = "jack";
  String str = "你好,$name";
  print(str); //你好,jack
}
```

也可以使用`${}`，在花括号中可以写运算逻辑

```dart
String str = "你好,${name}";
```

使用`+`拼接字符串

```dart
main() {
  String name = "jack";
  String age = "12岁";
  String all = name + ',' + age;
  print(all); //jack,12岁
}
```

3个单引号或双引号创建多行字符串(空格和换行都会保留)

```dart
String s1 = '''
第一行
第二行
''';

String s2 = """第一行
第二行""";
```

字符串前加上`r`，字符串中的字符不进行转译，直接原模原样显示

```dart
main() {
  String s1 = r'第一行\n还是第一行';
  print(s1); //第一行\n还是第一行
}
```

#### Bool

`true`和`false`

dart中无隐式转换，所以也没有JS中由于隐式类型带来的问题

```dart
if(这里必须是布尔值){
  
}else{
  
}
```

#### List

数组 (**Array**) 是几乎所有编程语言中最常见的集合类型，在 Dart 中数组由 [`List`](https://api.dart.cn/stable/dart-core/List-class.html) 对象表示

**创建List对象**

在dart2.12版本之后，支持空安全后，以下写法已经废弃，List()构造函数不可用。不推荐使用

```dart
List list=new List(); //弃用写法
```

**字面量方式赋值**

使用变量关键字声明数组

如果第一次赋值的List中元素都是同一类型，比如都是int型，Dart就会 推断出 `list` 的类型为 `List<int>`，如果往该数组中添加一个非 int 类型的对象则会报错

```dart
//报错
var list=[1,2,3]
list.add("name"); 
```

以下是可以正常运行的，因为无法进行类型推断

```dart
var list = [1, 2, true, "hello"];
list.add("name");
```

也可以**泛型**（后面"Dart中的类"章节会讲到）指定元素类型

```dart
List<int> list2=[1,2]
list.add("name") //报错
```

使用内置类型声明数组

不会自动推断

```dart
List list=[1,2,3]; // List	 list=<int>[1,2,3];
list.add("name");
```

**赋值固定长度数组**

```dart
var list=List.filled(3, ""); //参数1:数组长度 ； 参数2:填充数组的内容

var list2=List<int>.filled(3,"")
```

**数组常用属性**

* length  数组长度
* reversed 数组反转后的结果，类型是`Iterable`，需要使用`toList()`转换为数组
* isEmpty 数组为空，为`true`，否则为回`false`
* isNotEmpty  数组为空，为`false`，否则为回`true`

```dart
var list = <int>[1, 2, 3, 4, 5];
print(list.length); //5
print(list.reversed); //(5, 4, 3, 2, 1)
print(list.reversed.toList()); //[5, 4, 3, 2, 1]
print(list.isEmpty); //false
print(list.isNotEmpty); //true
```

**数组常用方法**

* `add(value)` 在尾部增加一个元素

  * 参数 ：元素
  * 返回值 ： void

* `addAll(iterable)`在数组尾部拼接一个数组

  * 参数 ：元素
  * 返回值 ： void

* `indexOf(value)`  按值查找 

  * 参数 ：查找的值
  * 返回值 ： 查到返回索引；找不到返回-1

* `remove(value)` 按值删除 

  * 参数 ：删除的值
  * 返回值 ： 数组中存在该值，则删除，返回true；否则，返回false

* `removeAt(index)`按索引删除

  * 参数 ：index（索引必须在数组的范围内，否则会报错）
  * 返回值 ： 删除索引位置对应的值

* `fillRange(start,end,value)` 将start到end-1的元素替换为value

  * 参数：start开始索引；end结束索引；value替换值

  * 返回值 ：void

    注意：start和end都是索引值，不会出现类似js中的-1，代表倒数第一个元素索引的情况

* `insert(index,value)` 指定位置插入一个值

  * 参数 ：index（索引必须在数组的范围内，否则会报错）
  * 返回值 ： void

* `insertAll(index,iterable) `指定位置插多个入List，原来index位置及其后面的元素，全部后移

  * 参数 ：index（索引必须在数组的范围内，否则会报错）
  * 返回值 ： void

* `iterable.toList()` 其他可迭代类型转化为List 【未修改原始数据】

  * 返回值 ：转换后的List

  ```dart
  //Set类型转化为List
  Set s = new Set();
  s.add('a');
  s.add('b');
  print(s); //{a, b}
  print(s.toList()); //[a, b]
  ```

  参见`List.reversed`属性

  参见`Map.keys`、`Map.values`

* `join(List) ` 将List转化为字符串

  * 参数： 链接符号

  * 返回值 ：连接后的字符串（原数组不变）

    ```dart
    print([1,2,3].join(",")); // 1,2,3
    ```

* `split(String) `将字符串转化List

  * 参数： 分割符号

  * 返回值 ：分割后的数组（原字符串不变）

    ```dart
    print("1,2,3".split(',')); //[1, 2, 3]
    ```

```dart
List list = [1, 2, 3, 4, 5];

//add
list.add(6); //list为 [1, 2, 3, 4, 5, 6]

//addAll
list.addAll([7, 8, 9]); //list为 [1, 2, 3, 4, 5, 6, 7, 8, 9]

//indexOf
print(list.indexOf(3)); //2
print(list.indexOf(10)); //-1

//remove
print(list.remove(9)); //true  //删除成功，list为 [1, 2, 3, 4, 5, 6, 7, 8]
print(list.remove(10)); //false  //删除失败

//removeAt
print(list.removeAt(1)); //2   //list为 [2, 3, 4, 5, 6, 7, 8]

//fillRange,替换start到end-1为第三个参数
list.fillRange(0, 2, -1); //list为[-1, -1, 4, 5, 6, 7, 8]

//insert
list.insert(0, 100); //list为 [100, -1, -1, 4, 5, 6, 7, 8]

//insertAll
list.insertAll(3, [11, 12]); //list为 [100, -1, -1, 11, 12, 4, 5, 6, 7, 8]

//join
print(list.join(",")); // 100,-1,-1,11,12,4,5,6,7,8

//split
print("1,2,3".split(',')); //[1, 2, 3]
```

#### Map

**声明赋值**

字面量方式

注意这里与JS不同，JS中字面量声明对象时，key默认是字符串，dart中需要将key值加上引号，变量需要用`obj[变量]=值`的方式添加

dart中需要把key加上引号

```dart
var m = {"name": 'jack', "age": 12};
var str = "grade";
m[str] = 90;
m["sex"] = "男";
print(m);
```

创建Map对象的方式，初始化Map中为空的

```dart
var m = new Map();
var str = "grade";
m[str] = 90;
m["sex"] = "男";
print(m); //{grade: 90, sex: 男}
```

**常用属性**

* keys  所有键，类型是`Iterable`
* values 所有值，类型是`Iterable`
* isEmpty 
* isNotEmpty

```dart
var m = {"name": 'jack', "age": 12};

print(m.keys); //(name, age)
print(m.keys.toList()); //[name, age]

print(m.values); //(jack, 12)
print(m.values.toList()); //[jack, 12]

print(m.isEmpty); //false
print(m.isNotEmpty) //true
```

**常用方法**

* addAll(Map) 增加map

  * 参数 ：Map

  * 返回值 ： void

    ```dart
    Map m = new Map();
    m.addAll({
      "name": "jack",
      "age": 12,
    });
    print(m); //{name: jack, age: 12}
    ```

* remove(key) 移除指定键值对

  * 参数 ：String，要删除的键值对的key值

  * 返回值 ： 参数key对应的value值

    ```dart
    Map m = new Map();
    m.addAll({
      "name": "jack",
      "age": 12,
    });
    print(m.remove("name")); //jack
    print(m); //{name: jack, age: 12}
    ```

* containsKey(key) ｜containsValue(value) 判断是否包含某值key｜value

  * 参数 ：key｜value

  * 返回值 ： 布尔值

    ```dart
    Map m = new Map();
    m.addAll({
      "name": "jack",
      "age": 12,
    });
    print(m.containsKey("name")); //true
    print(m.containsValue(
    ```

#### Set

没有重复元素的集合，所以有自动去重的功能

不支持字面量赋值，只能通过，显式的创建Set对象赋值给变量，然后使用`add(value)`和`addAll(iterable)`来添加值

```dart
Set s = new Set();
s.add('a');
s.add('b');
print(s); //{a, b}


Set s2 = new Set();
s2.addAll(["a", "b"]);
print(s2); //{a, b}
```

数组去重

```dart
List list = [2, 2, 1, 1, 3, 4, 4, 4];
Set s = new Set();
s.addAll(list);
print(s.toList()); /[2, 1, 3, 4]
```

#### collection类型

List、Map、Set属于collection类

**遍历collection类**

详见，"流程控制语句"章节的`for`循环部分

**collection的方法**

map只有`forEach`和`map`方法

* forEach

  * 参数：dynamic类型
  * 返回值：void

  ```dart
  //List
  List list = ["q", "w", "e"];
  list.forEach((element) {
    print(element);
  });
  //q
  //w
  //e
  
  Set s = new Set();
  s.addAll(["a", "b", "c"]);
  s.forEach((element) {
    print(element);
  });
  //a
  //b
  //c
  
  //map
  Map m = {"name": "jack", "age": 18};
  m.forEach((key, value) {
  	print("$key-$value");
  });
  //name-jack
  // age-18
  ```

* map

  * 参数：dynamic类型
  * 返回值：`Iterable<dynamic>`类型，返回匿名函数体内，return值，组成的可迭代集合

  ```dart
  //List
  List list = ["q", "w", "e"];
  var afterList = list.map((e) => e + "-after");
  print(list); //[q, w, e]
  print(afterList); //(q-after, w-after, e-after)
  
  //Set
  Set s = new Set();
  s.addAll(["a", "b", "c"]);
  var afterSet = s.map((e) => e + "-after");
  print(s); //{a, b, c}
  print(afterSet); // (a-after, b-after, c-after)
  ```

* where 筛选符合条件的元素

  * 参数：dynamic类型
  * 返回值：`Iterable<dynamic>`类型，  返回匿名函数体内，return为true时的元素，组成的可迭代集合

  ```dart
  //List
  List list = ["q", "w", "e"];
  var afterList = list.where((element) => element == "q");
  print(list); //[q, w, e]
  print(afterList); //(q)
  
  //Set
  Set s = new Set();
  s.addAll(["a", "b", "c"]);
  var afterSet = s.where((element) => element == "a");
  print(s); //{a, b, c}
  print(afterSet); //(a)
  ```

* any 集合中有一个满足条件就返回true

  * 参数：dynamic类型
  * 返回值：布尔值， 匿名函数体内，只要有一次return了true，就直接返回true

  ```dart
  //List
  List list = [1, 2, 3, 4, 5];
  var afterList = list.any((element) => element > 4);
  print(list); //[[1, 2, 3, 4, 5]
  print(afterList); //true
  
  //Set
  Set s = new Set();
  s.addAll(["a", "b", "c"]);
  var afterSet = s.any((element) => element == "a");
  print(s); //{a, b, c}
  print(afterSet); //true
  ```

* every 集合中所有元素都满足条件才返回

  * 参数：dynamic类型
  * 返回值：布尔值， 匿名函数体内，每一次都return了true，就才返回true

  ```dart
  //List
  List list = [1, 2, 3, 4, 5];
  var afterList = list.every((element) => element > 0);
  print(list); //[[1, 2, 3, 4, 5]
  print(afterList); //true
  
  //Set
  Set s = new Set();
  s.addAll(["a", "b", "c"]);
  var afterSet = s.any((element) => element is String);
  print(s); //{a, b, c}
  print(afterSet); //true
  ```

#### 类型转换

**其类型转化为String**

`Object.toString()`返回值就是转换后的String类型

### 特别注意

前面讲了

4个变量关键字：`var`、`late`、`const`、`final`

7个内置基本类型：`int`、`double`、`bool`、`String`、`List`、`Map`、`Set`

声明变量时，该如何声明呢？

**使用变量关键字**

均会有以下情况，确认默认变量类型

* var不可与基本类型组合，变量默认为dynamic类型

  ```dart
  var a; //默认dynamic类型
  ```

* late运行时始化，必须指定变量类型

  ```dart
  late String a;
  ```

* const声明变量时必须初始化，类型加不加均可，可一开始就通过初始化数据推断变量类型

  ```dart
  const a=1;
  const int a=1;
  ```

* final 运行时初始化，初始化后不可改变，类型加不加均可

  ```dart
  final a; //默认dynamic类型
  final int a; //默认int类型
  ```

**如果不使用变量关键字**

只使用类型声明变量，要注意，默认值为null，由于空安全限制，必须赋值非空值，或者使用`?`

```dart
int? a;
```



### 运算符

**Dart中无隐式转换的规则**

算术运算符的操作除`+`可以将两个String类型变量拼接

```dart
main() {
  String a = "a";
  String b = "b";
  print(a + b); //ab
}
```

所有算数运算符操作的变量都是`int`类型，否则报错

**因为没有隐式转换的原因**

Dart中只有`==`就可以比较两个变量是否相等，两个类型不同的变量肯定不会相等，如下：

```dart
main() {
  int a = 123;
  String b = "123";
  print(a == b); //false
}
```

**因为没有隐式转换的原因**

`if(表达式)`，表达式的返回值必须是布尔值

```
在js中会将 0 、NaN 、""、null、undefined、false 转化为false，而在dart中不会隐式转换，需要显式的判断
```

不存在使用`||`进行赋值的情况

```dart
//报错
main(){
  var b=null; //或等于0 、NaN 、""、null、undefined、false 
	int a=b||3;
}
```

应该使用`??`，来规避把变量赋值为null

```dart
 main() {
  const a = null ?? 2;
  print(a); //2
}
```

**算术运算符**

Dart中无隐式转换的规则，所以算术运算符的操作除`+`可以将两个String类型变量拼接以外，

```dart
main() {
  String a = "a";
  String b = "b";
  print(a + b); //ab
}
```

所有算数运算符操作的变量都是`int`类型，否则报错

| 运算符      | 描述                                       |
| ----------- | ------------------------------------------ |
| `+`         | 加                                         |
| `–`         | 减                                         |
| `-*表达式*` | 一元负, 也可以作为反转（反转表达式的符号） |
| `*`         | 乘                                         |
| `/`         | 除                                         |
| `~/`        | 除并取整                                   |
| `%`         | 取模                                       |
| ++          | 累加                                       |
| --          | 累减                                       |

**关系运算符**

关系运算符返回的值是布尔值

```dart
main() {
  print(1 == 1); //true
}
```

| 运算符 | 描述     |
| ------ | -------- |
| `==`   | 相等     |
| `!=`   | 不等     |
| `>`    | 大于     |
| `<`    | 小于     |
| `>=`   | 大于等于 |
| `<=`   | 小于等于 |

**类型判断运算符**

| 运算符 | 描述                                                         |
| ------ | ------------------------------------------------------------ |
| `as`   | 类型转换（也用作指定 [类前缀](https://dart.cn/guides/language/language-tour#specifying-a-library-prefix))） |
| `is`   | 如果对象是指定类型则返回 true                                |
| `is!`  | 如果对象是指定类型则返回 false                               |

当且仅当 `obj` 是 `T` 的子类，`obj is T` 才是 true。

例如： `obj is Object` 总为 true，因为所有类都是 Object 的子类。

仅当你确定这个对象是该类型的时候，你才可以使用 `as` 操作符可以把对象转换为特定的类型。例如：

```dart
(employee as Person).firstName = 'Bob';
```

如果你不确定这个对象类型是不是 `T`，请在转型前使用 `is T` 检查类型。

```dart
if (employee is Person) {
  // Type check
  employee.firstName = 'Bob';
}
```

可以用来检查变量类型，但是除`null`以外的所有变量，本质都是`Object`

```dart
var str = "hello";
print(str is String); //true
print(str is Object); //true

var a=null;
print(a is Null); //true
```

:::tip

上述两种方式是有区别的：如果 `employee` 为 null 或者不为 `Person` 类型，则第一种方式将会抛出异常，而第二种不会。

:::

**赋值运算符**

大部分与其他语言相同

| `=`  | `*=`  | `%=`  | `>>>=` | `^=` |
| ---- | ----- | ----- | ------ | ---- |
| `+=` | `/=`  | `<<=` | `&=`   | `|=` |
| `-=` | `~/=` | `>>=` |        |      |

多了一个 `??=`：如果变量是`null`，才会赋值，否则不改变变量的值

```dart
//这里会报一个警告：Warning: Operand of null-aware operation '??=' has type 'int' which excludes null.
//含义是：编译器已经确定，这里的int型变量不可能是null
main() {
  int a = 4;
  a ??= 2;
  print(a); // 4
}
```

**逻辑运算符**

逻辑运算符返回布尔值

| 运算符    | 描述                                                      |
| --------- | --------------------------------------------------------- |
| `!表达式` | 对表达式结果取反（即将 true 变为 false，false 变为 true） |
| `||`      | 逻辑或                                                    |
| `&&`      | 逻辑与                                                    |

注意：因为dart没有js的隐式转换的原则，所以，以下的写法是不对的

```dart
//报错
main() {
  const a = null || 2;
}
```

dart提供了一种新的写法

```dart
 main() {
  const a = null ?? 2;
  print(a); //2
}
```

**条件表达式**

Dart 有两个特殊的运算符可以用来替代 `if-else`语句：

```text
条件 ? 表达式1 : 表达式 2
```

如果条件为 true，执行表达式 1并返回执行结果，否则执行表达式 2 并返回执行结果

```text
表达式1 ?? 表达式2
```

如果表达式1为非 null 则返回其值，如果表达式1为null，则执行表达式 2 并返回其值

**级联运算符**

`..`和`?..`

原本的写法

```dart
var paint = Paint();
paint.color = Colors.black;
paint.strokeCap = StrokeCap.round;
paint.strokeWidth = 5.0;
```

使用`..`，可以一步完成对对象成员的操作

```dart
var paint = Paint()
paint..color = Colors.black
  	 ..strokeCap = StrokeCap.round
     ..strokeWidth = 5.0;
```

**其他运算符**

| 运算符 | 名字          | 描述                                                         |
| ------ | ------------- | ------------------------------------------------------------ |
| `()`   | 使用方法      | 代表调用一个方法                                             |
| `[]`   | 访问 List     | 访问 List /Map中特定位置的元素，不存在直接报错               |
| `?[]`  | 判空访问 List | 左侧调用者不为null时，访问 List 中特定位置的元素；如果为null，返回null |
| `.`    | 访问成员      | 成员访问符，不存在直接报错                                   |
| `?.`   | 条件访问成员  | 左侧的操作对象不为null，可正常访问成员。如果为 null 则返回 null |

如果不能确定数组是否为空，就使用`?[]`

如果不能确定Map的某个key是否存在，就使用`?[]`

```dart
List? list;
print(list?[10]); //null

Map? m;
print(m?["age"]); //null
```

使用`?.`访问String类的成员length

```dart
String? str = "s11";
str = null;
print(str?.length); //null
```

**注意**

如果不使用`?[]`和`?.`，访问到null，就会抛出错误（异常是可以try catch捕获的，错误会直接暂停程序）

**断言运算符**

如果将断言运算符（`!`）加到任意表达式后，如果表达式返回值是null，则抛出异常，如果不为空，就正常返回

```dart
List? list;

try {
  //已经抛出了异常
  print(list![10]);
} catch (err) {
  print(err); //Null check operator used on a null value
}
```

```dart
String? str = "s11";

try {
  str = null;
  //已经抛出了异常
  print(str!.length);
} catch (err) {
  print(err); //Null check operator used on a null value
}
```

### 流程控制语句

你可以使用下面的语句来控制 Dart 代码的执行流程：

- `if` 和 `else`

  ```dart
  if(表达式){
  
  } else if(表达式){
    
  } else{
    
  }
  ```

  不同于js，dart的if表达式必须是布尔值，不存在其他类型隐式转化为布尔值

- `for` 循环

  在js中以下代码会输出3个3，不同于js中`var`的缺陷，dart中没有这个问题

  ```dart
  main() {
    for (var i = 0; i < 3; i++) {
      print(i);
    }
  }
  //0 
  //1 
  //2
  ```

  如果想遍历可迭代对象（List和Set）中的元素，可以使用` for-in` :

  ```dart
  main() {
    List arr = [3, 5, 7];
    for (var item in arr) {//不清楚元素类型，这应该用var
      print(item);
    }
  }
  //3
  //5
  //7
  ```

  可迭代对象同时可以使用 `forEach()`方法作为另一种选择：

  ```dart
  main() {
    List arr = [3, 5, 7];
    arr.forEach((item) {
      print(item);
    });
  }
  ```

- `while` 和 `do`-`while` 循环

- `break` 和 `continue`

- `switch` 和 `case`

  ```dart
  main() {
    String sex = "男";
    switch (sex) {
      case "男":
        print("男");
        break;
      case "女":
        print("女");
        break;
    }
  }
  //男
  ```

- `assert`

  `assert(条件, 可选信息)`; 当条件为false时，抛出一个 `AssertionError `异常，打断代码的执行

  ```
  assert(text != null);
  ```

  注意：

  `assert` 是否生效依赖开发工具和使用的框架：

  - Flutter 在[调试模式](https://flutter.cn/docs/testing/debugging#debug-mode-assertions)时生效。
  - 一些开发工具比如 [dartdevc](https://dart.cn/tools/dartdevc) 通常情况下是默认生效的。
  - 其他一些工具，比如 [`dart run`](https://dart.cn/tools/dart-run)以及 [`dart2js`](https://dart.cn/tools/dart2js) 通过在运行 Dart 程序时添加命令行参数 `--enable-asserts` 使 assert 生效。

  在生产环境代码中，断言会被忽略，与此同时传入 `assert` 的参数不被判断

* 使用 `try-catch` 和 `throw` 也能影响控制流

### 函数

#### 函数类型

在dart中，函数分为命名函数和匿名函数，函数属于`Function`类。与JS不同，dart中无需function关键字

* 函数声明

  一般形式

  ```dart
  void main() {
    void a() {
      print("1");
    }
    a(); //1
  }
  ```

  箭头形式

  ```dart
  //---命名箭头---
  void main() {
    void a() => print("1");
    a(); //1
  }
  
  
  //---匿名箭头---（省略函数名、返回值类型）
  void main() {
    () => print(1);
  }
  ```

* 函数表达式

  用变量存储匿名函数

  匿名函数的一般形式
  
  ```dart
  void main() {
    var a = () {
      print('Hello');
    };
    a();
  }
  ```
  
  匿名函数的箭头形式
  
  ```text
  void main() {
    var a = () => print('Hello');
    a();
  }
  ```
  
  匿名参数的存在是有其必要性的，尤其是我们在后面讲到的**参数为函数**和**自执行方法**中

#### 函数调用

dart函数，有几点需要注意：

* 函数必须先声明再使用
* 函数有作用域，调用函数时，只会在当前作用域和上级作用域去查找
* 函数可以不设置返回类型和参数类型，但是不推荐这么做。即使函数没返回值，也应该使用`void`关键字
* 除非使用***可选参数***（详见，函数参数）外，调用时，定义的形参必须传入

```dart
int sum(int a, int b) { //参数a,b必须传入
  return a + b;
}

var res = sum(1, 2);
print(res);
```

函数调用的几种形式

* 类的静态方法

  ```text
  类名.方法名();
  ```

* 实例的方法

  ```dart
  var 实例名 = new 类名();
  实例名.方法名();
  ```

* 当前作用域和父级作用域的方法

  ```dart
  方法名();
  ```

  我们引入的dart库中的函数能直接使用也是因为这个原因，比如print函数，dart默认自动引入`dart:core`

  ```dart
  main() {
    print("1"); //1
  }
  ```

#### 函数参数

**必传参数**

不使用`[]`和`{}`，的参数就是必传参数，必传参数必须指定名字

```dart
int add(int a,int b){
  return a+b;
}
```

**可选参数**

分为两种：未命名参数和命名参数

未命名参数放入`[]`中，调用参数需要按形参的顺序传入参数；命名参数放入`{}`中，调用参数需要指定参数传给哪个形参

既然叫可选参数，那两种参数都是可以不传递的，默认值为`null`，但由于空安全的限制，参数必须使用`?`声明变量可为空（不推荐使用，因为往往我们传入的变量不希望它默认值为null）

```dart
//未命名参数
String userInfo(String name, [int? age, String? sex]) {
  return "$name - $age -$sex";
}

print(userInfo("张三")); //张三 - null -null
print(userInfo("李四", null, "男")); //李四 - null -男  //需要按照形参顺序传参数
```

```dart
//命名参数
String userInfo(String name, {int? age, String? sex}) {
  return "$name - $age -$sex";
}

print(userInfo("张三")); //张三 - null -null
print(userInfo("李四", sex: "男", age: 18));//李四 - 18 -男   //不需要按照形参顺序传参数
```

也可以设置为非`null`的默认值，就需要使用`?`声明了

```dart
//未命名参数
String userInfo(String name, [int age = 10, String sex = "男"]) {
  return "$name - $age -$sex";
}

print(userInfo("张三")); //张三 - 10 -男
```

```dart
//命名参数
String userInfo(String name, {int age = 10, String sex = "男"}) {
    return "$name - $age -$sex";
}

print(userInfo("张三")); //张三 - 10 -男
```

使用`required`关键字，只能用于可选的命名参数，将它变成必传的命名参数

```dart
 //命名参数
String userInfo(String name, {required int age, required String sex}) {
  return "$name - $age -$sex";
}

print(userInfo("张三", age: 18, sex: "男")); //张三 - null -null
```

有一点补充：

在类的章节中我们会介绍构造函数，构造函数有以下简写方法，注意这里面的命名可选参数

```dart
class Preson{
  String? name;
  int? age;
  int? grade;
	Preson(this.name,{this.age,this.grade}){
    
  }
}

//使用
Preson p1=new Preson("jack",age:14,grade:100)
```

**参数为函数**

```dart
void life(Function createFun) {
  createFun("你好");
}

//这里必须使用匿名参数
life((param) {
  print(param);
}); //你好

//匿名函数的简写
life((param) => {print(param)}); //你好
```

**自执行方法**

```dart
((int n) => {print(n))(10); 
//10
```

### Dart注解

在Dart中，@注解用于为类、方法、变量等添加元数据信息，以便于在运行时进行解析

以下是一些常见的@注解：

```text
@override：用于重写父类的方法或属性。
  
@deprecated：用于标记已经过时或不推荐使用的方法或属性。
  
@immutable：用于标记一个类是不可变的，即所有属性都必须是final类型。
  
@required：用于标记一个参数是必须的，如果不传递该参数则会抛出异常。
  
@factory：用于标记一个类的工厂构造函数。
  
@literal：用于标记一个类可以被直接使用字面量方式创建。
  
@nullable：用于标记一个参数可以为null。
  
@optionalTypeArgs：用于标记一个类的泛型参数可以省略。

@protected：用于标记一个方法或属性只能在当前类或子类中访问。

@visibleForTesting：用于标记一个方法或属性是为了方便测试而暴露出来的。
```



### Dart中的类

Dart 是支持基于 mixin 继承机制的面向对象语言，所有对象都是一个类的实例，而除了 `Null` 以外的所有的类都继承自 `Object` 类。

面向对象编程(OOP)的三个基本特征是：继承，多态，封装

* 继承：继承父类的方法属性
* 多态：子类可以实现父类的接口，每个子类实现不同，就会有不同的执行效果
* 封装：把实体封装成类，每个类有自己的属性和方法 

Dart是**基于 mixin 的继承** 意味着尽管每个类（[top class](https://dart.cn/null-safety/understanding-null-safety#top-and-bottom) `Object?` 除外）都只有一个超类，一个类的代码可以在其它多个类继承中重复使用。不支持多继承（一个子类可以继承多个父类）

**以下代码中出现的Point类，需要引入dart:math库，参照"类的成员"中的方式引入**

#### 类的成员

如果对象是`null`，通过`.`访问成员，会抛出错误。可以使用`?.`来访问，如果对象是`null`，返回值也是`null`

因为dart中的空安全，如果不特意声明变量为空，变量是补了一位

```dart
import 'dart:math';

main() {
  var p = Point(2, 3);
  print(p.x); //2
  print(p.y); //3
  print(p?.x); //2   //但是报警告，因为编译器以确定了p不能是空，没必要使用?.

  var a = null;
  print(a?.b); //null
}
```

#### 定义类

```dart
import 'dart:mirrors';

class Preson {
  //属性
  String? name;
  int? age;
  String level = "初一";

  //默认构造函数(必须与类名相同)
  Preson(String name, int age) {
    this.name = name;
    this.age = age;
    print("默认构造函数,实例化时触发");
  }
  //命名构造函数
  Preson.now(String name, int age, String level) {
    this.name = name;
    this.age = age;
    this.level = level;
    print("命名构造函数");
  }

  //方法
  void getInfo() {
    print("${this.name} -- ${this.age} -- ${this.level}");
  }

  //getter
  get getName {
    return this.name;
  }

  // setter
  set setAge(value) {
    this.age = value;
  }
}

main() {
  //实例化，创建对象p
  Preson p = new Preson("张三", 12); //默认构造函数,实例化时触发
  p.getInfo(); //张三 -- 12 -- 初一

  //实例化，使用命名构造函数，创建对象p
  Preson p2 = new Preson.now("李四", 18, "高三"); //命名构造函数
  p2.getInfo(); //李四 -- 18 -- 高三
  print(p2.getName); //李四
  p2.setAge = 100;
  p2.getInfo(); //李四 -- 100 -- 高三
}

```

几点注意：

* 定义类需要写在方法外面

* 访问类的属性/方法可以使用this（静态属性和静态方法是类的，不用this就可以直接访问），this指代类实例化的那个对象

* 函数传入参，赋值给属性

  ```dart
  Preson(String name, int age) {
  	this.name = name;
    this.age = age;
    print("默认构造函数,实例化时触发");
  }
  ```

  可简写

  ```dart
  Preson(this.name, this.age) {
  	print("默认构造函数,实例化时触发");
  }
  ```

#### 构造函数

构造函数的参数是必传参数

**默认构造函数**

与类名相同，只能有一个，实例化时触发执行

```dart
Preson(String name, int age) {
  this.name = name;
  this.age = age;
  print("默认构造函数,实例化时触发");
}
```

简写，不用再声明参数类型了，参数类型默认为对应属性的类型

```dart
Preson(this.name, this.age) {
	print("默认构造函数,实例化时触发");
}
```

**命名构造函数**

可以有多个，以下是简写形式

```dart
Preson.now(this.name, this.age, this.level) {
 	print("命名构造函数");
}
```

**补充**：

设置构造函数初的执行前的初始化，`:`后面的内容，是在这个构造函数执行之前，执行的。即将`level`初始化为`"初二"`

后面在类的部分，`:super`就是这个用法

```dart
Preson(this.name, this.age) : level = "初二" {
    this.name = name;
    this.age = age;
    print("默认构造函数,实例化时触发");
}
```

**Dart中的DateTime类**

具有两种构造函数

```dart
//构造函数
var a = new DateTime(2022); 
//命名构造函数
var b = new DateTime.now(); 
print(a);//2022-01-01 00:00:00.000
print(b);//2022-02-12 11:11:55.251864
```

#### 实例化

创建类的实例

```dart
var p1 = new Point(2, 2);
var p2 = new Point.fromJson({'x': 1, 'y': 2});
```

也可以省略`new`关键字

```dart
var p1 = Point(2, 2);
var p2 = Point.fromJson({'x': 1, 'y': 2});
```

使用构造函数创建常量（类创建的每一个实例，其实都是同一个实例的引用），在构造函数名之前加 `const` 关键字，来创建编译时常量

```dart
var p = const ImmutablePoint(2, 2);
```

可以判断出常量构造函数，创建的实例是同一个

```dart
var a = const ImmutablePoint(1, 1);
var b = const ImmutablePoint(1, 1);

assert(identical(a, b)); // They are the same instance!
```

**模块化**

新建一个`Preson1.dart`文件，将`Person`类写入文件中

在需要使用该类的页面，使用`import`引入，路径默认是该文件同级

```dart
import 'Preson1.dart';

main() {
  //实例化，使用默认构造函数，创建对象p
  Preson p = new Preson("张三", 12); //默认构造函数,实例化时触发
  p.getInfo(); //张三 -- 12 -- 初一

  //实例化，使用命名构造函数，创建对象p
  Preson p2 = new Preson.now("李四", 18, "高三"); //命名构造函数
  p2.getInfo(); //李四 -- 18 -- 高三
}

```

#### 私有属性和方法

变量名和方法名以`_`开头，且必须单独写在文件`*.dart`文件内才生效

私有属性和方法仅仅是无法通过实例访问，内部还是可以访问的

```dart
class Preson {
  //私有属性
  String? _name;

  //默认构造函数
  Preson(this._name) {
    print("默认构造函数,实例化时触发");
  }

  //方法，内部可以访问私有方法
  void getInfo() {
    return this._name;
  }
}
```

#### getter和setter

getter从对象中获取值，setter设置对象中的值

```dart
//Preson中添加

// getter
get getName {
  return this.name;
}

// setter
set setAge(value) {
  this.age = value;
}
```

以属性的形式使用

```dart
Preson p = new Preson.now("李四", 18, "高三"); 
print(p.getName); //李四
p.setAge = 100;
```

#### 静态属性和静态方法

* 静态属性和静态方法在类上，可直接通过类名调用
* 静态方法只能访问静态成员【普通方法可以访问所有类的成员】，无论是哪种方法访问静态变量时，都不能使用`this`关键字（`this`指代的只是实例化的对象）

```dart
class Preson {
  //静态属性
  static String name = "jack";
  //普通属性
  int age = 18;
  //静态方法
  static void printInfoStatic() {
    print(name);
    // print(this.age); //会报错，无法访问非静态成员
  }

  //普通方法
  void printInfo() {
    print(name);
    print(this.age);
  }
}

main() {
  //静态方法在类上
  Preson.printInfoStatic(); //jack
  print(Preson.name); //jack

  //普通方法在实例化的对象上
}

```

#### 继承

在dart中有几点注意：

* 子类使用`extends`关键字来继承父类
* `super`指代父类，下面代码中`super()`指代的是父类的构造函数，也可以用 `super.xxx()`指代父类中的命名构造函数
* 子类继承父类的方法和属性，不会继承构造函数。所必须要使用`:super()`，在子类构造函数执行之前，调用父类的构造函数，来让子类继承父类的能力
* 子类能拓展自己的成员，也可以重写父类的方法 `getter`和` setter`。
* 子类能调用，自己的成员，以可以调用父类的成员。如果某个方法被子类重写了，调用该函数，则执行子类重写之后的函数

```dart
class Preson {
  String name = "jack";
  int age = 18;

  Preson(this.name, this.age) {
    print("Preson的构造函数被执行");
  }
  Preson.called() {
    print("Preson的命名构造函数被执行");
  }

  void printInfo() {
    print("${this.name}----${this.age}");
  }

  void worker() {
    print("父类的方法");
  }
}

class Teacher extends Preson {
  int? teacherNum;

  //构造函数 ，冒号后也可以，使用super.call()，按照父级的命名构造函数call，来构造父类
  Teacher(String name, int age, int teacherNum) : super(name, age) {
    print("teacher子类的构造函数被执行");
    this.teacherNum = teacherNum;
  }

  //重写父类方法
  @override
  void worker() {
    print("子类重写的方法");

    super.worker(); //使用super能调用父类的方法
  }
}

main() {
  var teacher1 = new Teacher("张三", 18, 001);
  //Preson的构造函数被执行
  //teacher子类的构造函数被执行

  teacher1.printInfo(); //张三----18

  teacher1.worker();
  //子类重写的方法
  //父类的方法
}

```

#### 抽象类

Dart中抽象类：主要用于定义标准

* 抽象类通过abstract 关键字来定义
* 声明Dart中的抽象方法，只需`函数名()`
* 抽象类不能被实例化，只有继承/实现它的子类可以
* 如果把抽象类当做接口实现的话，子类必须得实现抽象类里面定义的所有属性和方法

extends(继承) 和implements(实现)的区别：

* 抽象类和普通类均可以继承，但是只有抽象类中有未实现的方法，可以用来实现
* 如果要复用抽象类里面的方法，并且要用抽象方法约束自类的话我们就用extends继承抽象类
* 如果只是把抽象类当做标准的话我们就用implements实现抽象类

案例：定义一个Animal 类要求它的子类必须包含eat方法

**一个类无法多继承**，但是可以**一个类实现多个接口**

C实现了A和B的接口

```dart
abstract class A {
  String? name;
  printA();
}

abstract class B {
  String? name;
  printB();
}

class C implements A, B {
  @override
  String? name;

  @override
  printA() {
    //implement printA
    print("A");
  }

  @override
  printB() {
    // implement printB
    print(B);
  }
}

main() {
  C c = new C();
  c.printA(); //A
  c.printB(); //B
}

```

#### mixins（混入）

mixins不是继承，也不是接口，而是一种全新的特性。一个类可以mixins多个类，实现类似多继承的效果（dart本身不支持多继承，但是可以实现多个抽象类）

为了方便，统一下说法，下面代码中 B和C是被混入类，A是混入类

* 被混入的类（`A类`和`B类`）
  * 必须是继承自`Object`（直接使用class声明的类都默认继承`Object`），意味着被混入类不能`extends`其他类得来的
  * 不能有构造函数

* 混入类（`C`类）
  * 可以混合多个普通class类，或者多个混入类

```dart
class A {
  String? aStr = "A字符串";
  printA() {
    print("A");
  }
}

class B {
  printB() {
    print("B");
  }
}

class C with A, B {}

main() {
  C c = new C();
  c.printA(); //A
  c.printB(); //B
  print(c.aStr); //A字符串
}

```

如果现在多了一个Preson类

```dart
class Preson {
  String? name;
  int? age;
  Preson(this.name, this.age) {}
  void printInfo() {
    print("${this.name}----${this.age}");
  }
}
```

怎么让C类具有Preson、A、B的特性（注意：Preson是可以有构造函数的，A，B不能有构造函数）

```dart
class C extends Preson with A, B {
  C(String? name, int? age) : super(name, age);
}
```

如果 Preson、A、B中有同名的方法，按照顺序，后者覆盖前者

使用`is `操作符来判断C类

```dart
class Preson {
  String? name;
  int? age;
  Preson(this.name, this.age) {}
  void printInfo() {
    print("${this.name}----${this.age}");
  }
}

class A {
  String? aStr = "A字符串";
  printA() {
    print("A");
  }
}

class B {
  printB() {
    print("B");
  }
}

class C extends Preson with A, B {
  C(String? name, int? age) : super(name, age);
}

main() {
  C c = new C("张三", 12);

  c.printA(); //A
  print(c.aStr); //A字符串

  c.printB(); //B

  c.printInfo(); //张三----12

  print(c is A); //true
  print(c is B); //true
  print(c is Preson); //true
}

```

#### 泛型

泛型是为了解决类、接口 方法的复用性，以及对于不特定数据类型的支持（类型校验）

举个例子啊，现在要求写一个函数，函数参数可以为String和int型，传入的实参是什么类型，返回值就是什么类型，这个我们以前只能通过不指定参数和返回值类型来实现

```dart
getData(a) {
  return a;
}

print(getData("ww"));
```

但是，这样就不能实现类型的校验，参数`a`不仅仅能传入String和int型，其他类型也可以传入

这里就可以用泛型解决这个问题，可以把`<T>`看成是传入的**可选参数**，只不过这个参数是类型而已

**泛型函数**

```dart
T getData<T>(T a) {
  return a;
}

print(getData<String>("he")); //指定String类型
print(getData(1));  //也可以不指定，传入任何类型
```

**泛型类**

```dart
class MyList<T> {
  List list = <T>[];
  void add(T element) {
    this.list.add(element);
  }
}

main(){
  MyList l2 = new MyList<String>();
  l2.add("hi");
}
```

**泛型接口**

实现泛型接口时，实现类需要使用`<T>`

```dart
//缓存类接口
abstract class Cache<T> {
  setKey(key, T value);
}

//实现的文件缓存
class FileCache<T> implements Cache<T> {
  @override
  setKey(key, T value) {
    print("文件缓存---${value}");
  }
}

//实现的内存缓存
class MemoryCache<T> implements Cache<T> {
  @override
  setKey(key, T value) {
    print("内存缓存---${value}");
  }
}

main() {
  FileCache fileCache = new FileCache<Map>();
  fileCache.setKey(1, {"name": "jack"}); //文件缓存---{name: jack}
}
```

**使用泛型类**

* 使用字面量创建对象

  ```dart
  //（习惯写法）声明变量类型时指定泛型，创建的List会自动指定泛型
  List<int> list = [];
  
  //如果不觉得麻烦的话,这样写也行。
  List<int> list = <int>[];
  
  
  //这种在语法检查时会被认为是 List<dynamic>类型
  List list = <int>[];
  ```

* 使用构造函数创建的对象

  ```dart
  //（习惯写法）在构造函数后加泛型, 这种在语法检查时会被认为是 List<dynamic>类型
  MyList l2 = new MyList<String>();
  ```

  总结下：支持泛型的类，声明变量时不指定泛型，那么就会默认为`dynamic`，遇到下面问题一定要分析清楚，为啥编译器提示报错

  ```dart
  //当你写下面这两个函数时，会报错，因为list是List<dynamic>类型，和声明的返回值不一样
  List<int> getData(){
    //默认List<dynamic>
    List list=<int>[]
  	return list;
  }
  
  Map<int, int> getData2() {
    	//默认Map<dynamic,dynamic>
      Map m = new Map(); 
      return m;
    }
  ```

  

### 异常和错误

Dart 提供了 [`Exception`](https://api.dart.cn/stable/dart-core/Exception-class.html) 和 [`Error`](https://api.dart.cn/stable/dart-core/Error-class.html) 以及它们一系列的子类，你也可以定义自己的异常类型。但是在 Dart 中可以将任何非 null 对象作为异常抛出而不局限于 Exception 或 Error 类型。

**Error（错误）**

在程序失败的情况下抛出的错误对象。`Error`对象代表程序员应该避免的程序故障。如果它们发生，则程序是错误的，**终止程序才是最安全的响应**。

错误无法使用try....catch捕获

比如，使用无效参数调用函数，甚至使用错误数量的参数，或者在不允许的时候调用它。错误对象也用于系统范围的故障，如堆栈溢出或内存不足的情况。

扩展对象`Error`：第一次被抛出时，抛出点的堆栈跟踪被记录并存储在错误对象中。可以使用[stackTrace](https://api.dart.cn/stable/2.16.0/dart-core/Error/stackTrace.html) getter 检索它。由于错误不是为了被捕获而创建的，因此不需要子类来区分错误，故`Error`仅实现而不扩展它的错误对象。

| Error子类                                                    | 描述 |
| ------------------------------------------------------------ | ---- |
| [AbstractClassInstantiationError](https://api.dart.cn/stable/2.16.0/dart-core/AbstractClassInstantiationError-class.html) |      |
| [ArgumentError](https://api.dart.cn/stable/2.16.0/dart-core/ArgumentError-class.html) |      |
| [AssertionError](https://api.dart.cn/stable/2.16.0/dart-core/AssertionError-class.html) |      |
| [AsyncError](https://api.dart.cn/stable/2.16.0/dart-async/AsyncError-class.html) |      |
| [CastError](https://api.dart.cn/stable/2.16.0/dart-core/CastError-class.html) |      |
| [ConcurrentModificationError](https://api.dart.cn/stable/2.16.0/dart-core/ConcurrentModificationError-class.html) |      |
| [CyclicInitializationError](https://api.dart.cn/stable/2.16.0/dart-core/CyclicInitializationError-class.html) |      |
| [FallThroughError](https://api.dart.cn/stable/2.16.0/dart-core/FallThroughError-class.html) |      |
| [JsonUnsupportedObjectError](https://api.dart.cn/stable/2.16.0/dart-convert/JsonUnsupportedObjectError-class.html) |      |
| [NoSuchMethodError](https://api.dart.cn/stable/2.16.0/dart-core/NoSuchMethodError-class.html) |      |
| [NullThrownError](https://api.dart.cn/stable/2.16.0/dart-core/NullThrownError-class.html) |      |
| [OutOfMemoryError](https://api.dart.cn/stable/2.16.0/dart-core/OutOfMemoryError-class.html) |      |
| [RemoteError](https://api.dart.cn/stable/2.16.0/dart-isolate/RemoteError-class.html) |      |
| [StackOverflowError](https://api.dart.cn/stable/2.16.0/dart-core/StackOverflowError-class.html) |      |
| [StateError](https://api.dart.cn/stable/2.16.0/dart-core/StateError-class.html) |      |
| [TypeError](https://api.dart.cn/stable/2.16.0/dart-core/TypeError-class.html) |      |
| [UnimplementedError](https://api.dart.cn/stable/2.16.0/dart-core/UnimplementedError-class.html) |      |
| [UnsupportedError](https://api.dart.cn/stable/2.16.0/dart-core/UnsupportedError-class.html) |      |

**Exception（异常）**

`Exception`的目的向用户传达有关失败的信息，以便可以通过编程方式解决错误。它旨在被捕获，并且应该包含有用的提示字段。所以可以使用

```dart
try{
  //代码
}catch(err){
  //处理
}
```

来处理。

不鼓励直接使用创建`Exception("message")`实例， 因为不能告知程序员具体发生了那类异常。应该根据可能发生的异常抛出特定的`Exception`子类。

如果在**调用函数之前无法检测到条件**，但函数执行过程中，可能会出现问题，调用者必须捕获抛出的`Exception`值，从而有效地处理`Exception`

| Exception子类                                                | 描述 |
| ------------------------------------------------------------ | ---- |
| [DeferredLoadException](https://api.dart.cn/stable/2.16.0/dart-async/DeferredLoadException-class.html) |      |
| [FormatException](https://api.dart.cn/stable/2.16.0/dart-core/FormatException-class.html) |      |
| [IntegerDivisionByZeroException](https://api.dart.cn/stable/2.16.0/dart-core/IntegerDivisionByZeroException-class.html) |      |
| [IOException](https://api.dart.cn/stable/2.16.0/dart-io/IOException-class.html) |      |
| [IsolateSpawnException](https://api.dart.cn/stable/2.16.0/dart-isolate/IsolateSpawnException-class.html) |      |
| [NullRejectionException](https://api.dart.cn/stable/2.16.0/dart-js_util/NullRejectionException-class.html) |      |
| [OSError](https://api.dart.cn/stable/2.16.0/dart-io/OSError-class.html) |      |
| [TimeoutException](https://api.dart.cn/stable/2.16.0/dart-async/TimeoutException-class.html) |      |

抛出异常的示例：

```dart
throw FormatException('Expected at least 1 section');
```

你也可以抛出任意的对象：

```dart
throw 'Out of llamas!';
```

捕获异常：

捕获异常可以避免异常继续传递，同时可以给你处理它的机会

可以指定多个 catch 语句，每个语句分别对应一个异常类型，如果 catch 语句没有指定异常类型则表示可以捕获任意异常类型

```dart
try{

} on FormatException catch(e，s){
	//捕获指定的异常
} on FormatException catch(e，s){
	//捕获指定的异常
}catch(e){
	//捕获所有类型
}
```

`catch` 方法有两个参数，第一个参数为抛出的异常对象，第二个参数为栈信息 [`StackTrace`](https://api.dart.cn/stable/dart-core/StackTrace-class.html) 对象

关键字 `rethrow` 可以将捕获的异常再次抛出

```dart
try{

} on FormatException catch(e，s){
	//捕获指定的异常
} on FormatException catch(e，s){
	//捕获指定的异常
}catch(e){
	//捕获所有类型
  rethrow;//将异常抛出
}
```

**Finally**

无论是否抛出异常，`finally` 语句始终执行

* 如果没有指定 `catch` 语句来捕获异常，则 `finally` 执行完后，抛出异常
* 如果指定了`catch`语句来捕获异常，则会在异常处理后执行`finally`

:::tip

优秀的代码通常会抛出 [`Error`](https://api.dart.cn/stable/dart-core/Error-class.html) 或 [`Exception`](https://api.dart.cn/stable/dart-core/Exception-class.html) 类型的异常。

:::

### Dart库

#### 引入

在Dart中可以通过import关键字引入库

在Dart中每个`*.dart`文件都是一个库，可以引入其他文件，也可以被其他文件引入。作为库的dart文件中可以写类，方法。当被引入后，相当于把这些内容一起添加到目标文件中

**Dart中的库**主要分为三类：

* 自定义的库

  将自己项目中公用的功能抽离出来，放到`xxx.dart`文件中。在其他文件中引入就可以直接使用了

  默认将文件中全部内容导入

  ```dart
  //   路径'lib/xxx.dart'  默认为./lib/xxx.dart，即与引入文件同级目录
  import 'lib/xxx.dart'; 
  ```

* Dart内置库

  dart的内置库通过定义一系列类来实现了Dart语言的所有内置功能。每个库包含的类和功能，详情查阅[dart SDK中包含的所有库 ](https://api.dart.cn/stable/2.16.0/dart-core/dart-core-library.html)，在文章的**Dart SDK**这部分中也有讲解
  
  ```dart
  import 'dart:库名';
  ```

* Pub管理工具

  [官方的包管理仓库](https://pub.flutter-io.cn/)

  [package使用参考](https://dart.cn/guides/packages)

  ```dart
  import 'package:库名'
  ```

**引入方式**

默认全部引入，也可以部分导入

```dart
import 'package:lib.dart' show 需要导入的类名或方法名;
  
import 'package:lib.dart' hide 需要隐藏的类名或方法名，剩下的全部导入;
```

延时加载库

```dart
//延迟加载库xxx
import 'package:xxx.dart' deferred as xxx;


//使用
greet() async{
  //加载库
  await xxx.loadLibrary();
  //使用库
  var a =new xxx();
}
```

#### 使用

引入库后，可直接在文件中使用库中的函数和类。延时加载库的库需要使用`loadLibrary()`

**引入的自定义的两个库中出现同名类**

以下代码中引入的两个库，均有Preson类

使用`as`关键字，就相当于给库指定一个新名字，使用时需要`新名字.类名`

正常引入的库，直接使用其中的类就行

```dart
import 'Preson1.dart';
import 'Preson2.dart' as lib2;

main(){
  var p1=new Preson();
  var p2=new lib2.Preson()
}
```

**使用Dart的内置库，访问网络**

```dart
import 'dart:io'; //http相关的在这个库
import 'dart:convert'; // utf8在这个库

//知乎接口：http://news-at.zhihu.com/api/3/stories/latest
getDataFromZhiHuAPI() async {
  //1.创建一个HttpClient对象
  var httpClient = new HttpClient();
  //2.创建一个Uri对象
  var uri = new Uri.http('news-at.zhihu.com', '/api/3/stories/latest');
  //3、发起请求，等待请求
  var request = await httpClient.getUrl(uri);
  //4、关闭请求，等待响应
  var response = await request.close();
  //5、解码响应的内容
  return await response.transform(utf8.decoder).join();
}

main() async {
  var res = await getDataFromZhiHuAPI();
  print(res);
}
```

**使用官方包仓库中的包（库）**

项目根目录下创建 `pubspec.yaml` 的文件。最简单的 pubspec 只需要列出包名和项目使用的Dart sdk的版本所在范围：

```yaml
name: my_app

environment:
  sdk: '>=2.10.0 <3.0.0'
```

假设我们要在项目中使用[官方的包管理仓库](https://pub.flutter-io.cn/)里的`http`这个包,

![image-20220219132416514](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220219132416514%20.png)

![image-20220219132749295](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220219132749295%20.png)



一般我们可以直接使用命令安装http包

```shell
dart pub add http
```

`pubspec.yaml`中`dependencies`字段上会自动添加安装的包

```yaml
dependencies: 
  http: ^0.13.4
```

[dart pub 工具命令](https://dart.cn/tools/pub/cmd)

这里再补充一个命令，当在项目下有了`pubspec.yaml`后就可以使用以下命令安装全部依赖

```shell
dart pub get
```

这个命令会自动根据`pubspec.yaml`文件的`dependencies`字段中的包，把包下载到本地

当 pub 获取远程包时，它会将包下载到由 pub 维护的系统缓存目录中。在 Mac 和 Linux 上，此目录默认为`~/.pub-cache`，在 Windows 上，该目录默认为`%LOCALAPPDATA%\Pub\Cache`。但其确切位置可能因 Windows 版本而异。

一旦包在系统缓存中，pub 会在项目根目录下创建`.dart_tool`文件夹，在这个文件夹下创建`package_config.json`文件，用来将项目使用的每个包映射到系统缓存中的相应包。

只需下载给定版本的包一次，然后可以在任意数量的项目中重复使用它。

还会创建一个`pubspec.lock`，用来存储每个包的下载地址。

[您可以使用PUB_CACHE](https://dart.cn/tools/pub/environment-variables)环境变量指定不同的位置

### Dart SDK

dart的库通过定义一系列类来实现了Dart语言的所有内置功能

每个库包含的类和功能，详情查阅[dart SDK中包含的所有库 ](https://api.dart.cn/stable/2.16.0/dart-core/dart-core-library.html)

****

其中分为3大类：

* Core库

  * [dart:async](https://dart.cn/guides/libraries/library-tour#dartasync---asynchronous-programming)  

    ```dart
    import 'dart:async';
    ```

    支持异步编程，包括Future和Stream等类

  * [dart:collection](https://api.dart.cn/stable/2.16.0/dart-collection/dart-collection-library.html) 

    ````dart
    import 'dart:collection';
    ````
    补充 dart:core 中的集合支持的类

  * [dart:convert](https://dart.cn/guides/libraries/library-tour#dartconvert---decoding-and-encoding-json-utf-8-and-more)  

    用于在不同数据表示之间进行转换的编码器和解码器，包括 JSON 和 UTF-8

    ```dart
    import 'dart:convert';
    ```

  * [dart:core](https://dart.cn/guides/libraries/library-tour#dartcore---numbers-collections-strings-and-more)  

    内置类型，集合和其他核心功能。**该库会被自动导入到所有的 Dart 程序**

  * [dart:developer](https://api.dart.cn/stable/2.16.0/dart-developer/dart-developer-library.html)

    与调试器和检查器等开发人员工具交互。这个库依赖于平台，并且对 web 和 Dart VM 都有单独的实现，特定平台可能不支持所有操作。

    ```dart
    import 'dart:developer';
    ```

  * [dart:math](https://dart.cn/guides/libraries/library-tour#dartmath---math-and-random)  

    数学常数和函数，以及随机数生成器

    ```dart
    import 'dart:math';
    ```

  * [dart:typed_data](https://api.dart.cn/stable/2.16.0/dart-typed_data/dart-typed_data-library.html)

    ```dart
    import 'dart:typed_data';
    ```

* VM库

* Web库

****

其中 `dart:core`库实现了我们日常用到的绝大部份功能，注意 [二级目录](https://api.dart.cn/stable/2.9.3/dart-core/dart-core-library.html)

分为了 `classes`、`constants`、 `functions`、 `typedefs` 、`exception`、 `error`

![image-20220210141624978](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Flutter/image-20220210141624978%20.png)

## Flutter项目

以下内容全部使用VSCode进行flutter开发，运行在苹果模拟器上

在flutter上安装`flutter`和`dart`插件后，我们很多操作可以直接使用插件实现，不必再使用flutter的命令

### 创建+运行

**检查flutter环境安装是否正确**

* 命令方式：

  ```dart
  flutter doctor -v
  ```

* 插件方式

  `shift`+`command`+`p`，打开命令面板，输入`flutter`后，出现所有flutter插件提供的命令,选择图里的命令，运行环境检测

  ![image-20220219213716222](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220219213716222%20.png)

**新建项目**

项目名，命名格式一般为：`xxx_yyy_zzz`（短横线相连，每部分小写）

* 命令方式：

  ```dart
  flutter create my_first_flutter_project //项目名
  ```

* 插件方式：

  `shift`+`command`+`p`，打开命令面板，选择图里的命令，创建项目，输入项目名

  ![image-20220219213305318](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220219213305318%20.png)

**查看当前已连接的设备**

* 命令方式：

  ```dart
  flutter devices
  ```

* 插件方式：

  ![image-20230602231928868](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/JS/20230602231929%20.png)

  

**运行项目**

* 命令方式：

  ```dart
  flutter run --d 设备名  
    
  //--release 发布版
  //--debugger 调试版 ，默认值
  ```

  debugger模式启动后，终端中会显示一些常用命令

  ![image-20220219223129817](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220219223129817%20.png)

  ```
  重点记住：r是热加载，写完代码热加载后，页面才会刷新
  ```

  

* 插件方式：

  找到项目下的lib/main.dart文件，在main函数上有三种启动方式

  Run、Debug，两者区别在于Debug模式支持一个热加载功能

  Profile是打开性能相关工具

  ![image-20230602232244074](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/JS/20230602232244%20.png)

  一般开发，使用Debug模式，点击后会提示选择运行的设备

  ![image-20230602235013889](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/JS/20230602235014%20.png)

  选择设备后，项目会被启动，同时页面出现一个快捷操作区域

  ![image-20230602232948060](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/JS/20230602232948%20.png)

  其中，**布局分析工具**，会在后面讲Flutter的布局逻辑时用到

### 项目结构

![image-20220219223840661](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220219223840661%20.png)

`main.dart`文件是项目的入口文件

```dart
void main() {
  runApp();//入口函数
}
```

### 代码块插件

帮助快速生成代码块

![image-20230531222906057](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/JS/20230531222906%20.png)

**例如**

输入`fstful`，生成有状态的组件模版

```dart
// custom_dialo.dart
import 'package:flutter/material.dart';

class CustomDialog extends StatefulWidget {
  const CustomDialog({ Key? key }) : super(key: key);

  @override
  _CustomDialogState createState() => _CustomDialogState();
}

class _CustomDialogState extends State<CustomDialog> {
  @override
  Widget build(BuildContext context) {
    return Container();
     //return这里随意替换为一个组件，例如
    //return const Text('测试');
  }
}
```

输入`fstless`，生成无状态的组件模版

```dart
import 'package:flutter/material.dart';

class Aa extends StatelessWidget {
const Aa({ Key? key }) : super(key: key);

  @override
  Widget build(BuildContext context){
    return Container();
    //return这里随意替换为一个组件，例如
    //return const Text('测试');
  }
}
```



## Flutter的布局逻辑

### 布局约束

![image-20230603001148734](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/JS/20230603001148%20.png)

* 组件A生成什么样的新约束信息？

  每个组件都不相同，后面会介绍常用组件生成约束信息的一些规则

* 组件A的尺寸由谁决定？

  首先明确，组件A受到的约束优先级>组件A本身属性

  假如，A受到的约束（w=300，h=900），则组件A的宽=300，高=900；

  假如，A受到的约束（0<=w<=300，0<=h<=900）,则组件A的实际宽高就由组件本身属性决定了

  后面会介绍常用组件涉及宽高相关的属性

### 约束的类型

假设某组件A

* 向子组件施加约束（w=300，h=900）,我们称这种约束为**紧约束**
* 向子组件施加约束（0<=w<=300，0<=h<=900）,我们称这种约束为**宽松约束**（宽松约束就是一个范围）
* 向子组件施加约束（0<=w<=infinity，0<=h<=infinity），我们称这种约束为**无约束**

### 布局分析工具

**例子**

```dart
//main.dart
void main() {
  runApp(
    const SizedBox(
      width: 100,
      height: 100,
      child: ColoredBox(color: Colors.blue),
    ),
  );
}
```

**页面**

![image-20230602235657140](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/JS/20230602235657%20.png)

**布局分析工具**

![image-20230603000113831](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/JS/20230603000114%20.png)

![image-20230603003124748](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/JS/20230603003125%20.png)

手机屏幕尺寸(w=430,h=932)

第二张图中，可以看到SizedBox受到约束为(w=430,h=932)，约束的优先级最高，所以，SizedBox属性(w=100,h=100)失效。组件SizedBox将自身受到的约束原样向下传递



### 获取约束信息

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(
     MaterialApp(
      home: LayoutBuilder(
        builder: (context,constraints){
          //获取ColoredBox受到的约束，就用LayoutBuilder把他包裹起来
          print(constraints)
          return const ColoredBox(color: Colors.blue);
        }
      )
    ),
  );
}

---->[打印日志]----
//BoxConstraints(w=360.0, h=800.0)
```



## 组件尺寸特性、约束特性

**组件尺寸特性**：

组件受到约束后，如何确定自己的显示尺寸大小（明确下，组件受到紧约束，组件的宽高为紧约束大小。后面讲的都是受到宽松约束，子组件的尺寸如何确定）



**组件约束特性**：

组件按照什么规则，生成向子组件传递的约束信息



### MaterialApp、Scaffold

待补充

### UnconstrainedBox

* 组件尺寸特性

  受到紧约束，组件的宽高为紧约束大小

  受到宽松约束，取受到约束的最小值

* 组件约束特性

  向组件传递无约束信息(0<=w<=Infinity,0<=h<=Infinity)

### BoxConstraints、SizedBox

BoxConstraints可通过属性设置宽、高范围

```dart
//BoxConstraints构造函数
const BoxConstraints({
    this.minWidth = 0.0,
    this.maxWidth = double.infinity,
    this.minHeight = 0.0,
    this.maxHeight = double.infinity,
});
```

* 组件约束特性

  受到紧约束时，原样传递给子组件

  受到宽松约束时，会取**受到的宽松约束**与**属性定义的宽高范围**的交集

  

SizedBox等价于BoxConstraints.tightFor构造函数，传入属性width令最小、最大宽度相等，传入属性height令最小、最大高度相等

```dart
const BoxConstraints.tightFor({
  double? width,
  double? height,
}) : minWidth = width ?? 0.0,
     maxWidth = width ?? double.infinity,
     minHeight = height ?? 0.0,
     maxHeight = height ?? double.infinity;

```

* 组件尺寸特性

  受到紧约束，组件的宽高为紧约束大小

  受到宽松约束，例子如下

  ```
  受到的约束为(0<=w<=100,0<=h<=100)
  
  如果，width=50,height=50，在约束范围内，则尺寸为自身设置尺寸，即(w=50,h=50)
  如果，width=200,height=200，在约束范围外，则尺寸为约束最大值，即(w=100,1=200)
  ```

* 组件约束特性

  与BoxConstraints一样，只不过SizedBox的宽高是一个确定值（不是范围），所以交集一定是紧约束

  ```dart
  //假设，受到的约束(0<=w<=300,0<=h<=300)
  //width、height在范围内，向下施加紧约束(w=100,h=100)
  SizedBox(
    width:100,
    height:100,
    child: ColoredBox(color: Colors.red)
  )
  ```

  技巧：width、height可以设置为double.infinity（无限），就一定不在父级施加约束的范围，即SizedBox会取受到约束的最大值生成一个紧约束，向下传递

  

### ColoredBox

* 组件尺寸特性

  受到紧约束，组件的宽高为紧约束大小

  受到宽松约束，取受到约束的最小值

* 组件约束特性

  将受到约束，原样传递给子组件

  

### LimitedBox

```dart
//构造函数
const LimitedBox LimitedBox({
  Key? key,
  double maxWidth = double.infinity,
  double maxHeight = double.infinity,
  Widget? child,
})
```

* 组件约束特性

  仅在受到的约束最大宽/高 为[无限时], 传递给子组件的最大宽/高会取 LimitedBox 中限制的宽高

  其他情况下，均不改变约束，直接传递受到的约束给子组件

  **实践**

  ```
  后面会提到Row组件，向下施加（0<=w<=infinity,0<=h<=受到的高约束）
  
  这会导致Row的子组件宽度可能会溢出屏幕，可将LimitedBox作Row的子组件，这样LimitedBox的maxWidth、maxHeight将作为新的约束传递给子组件
  ```

  



### Flex、Column、Row

Flex组件有一个direction属性，用来指定主轴方向

```dart
MaterialApp(//紧约束
  home: Flex(
    direction: Axis.horizontal, 
    children: [
      Container(
        color: Colors.blue,
        width: 100,
        height: 100,
      ),
    ],
  ),
)
```

Column组件就本质就是属性设置为`direction: vertical`d的Flex组件

Row组件就本质就是属性设置为`direction: horizontal`的Flex组件



* 组件尺寸特性

  受到紧约束，组件的宽高为紧约束大小

  受到宽松约束时，会尽量取最大尺寸

  

* 组件约束特性

  ```text
  [1]: 默认情况下:crossAxisAlignment为CrossAxisAlignment.center
  在 [主轴] 方向上 [无限约束，即>=0，<=infinity]；在 [交叉轴] 方向上 [放松约束，>=0,<=所受约束最大值]。
    
  [2]: crossAxisAlignment 为 CrossAxisAlignment.stretch 时: 
  在 [主轴] 方向上 [无限约束]；在 [交叉轴] 方向上为 [紧约束]，其值为交叉轴方向上约束大小的 [最大值]。
  
  
  [3]: Flex 的 children 列表中的组件，所受到的约束都是一致的。
  ```

  默认情况例子：

  ```dart
  MaterialApp(
    home: Flex(
      direction: Axis.horizontal,//水平方向为主轴
      children: [
        Container(
          color: Colors.blue,
          width: 100,
          height: 100,
        ),
      ],
    ),
  )
  
  ```

  屏幕w=300，h=800。由图可知，约束为 (0<=w<=infinity,0<=h<=800)，Container与SizedBox约束特性相同。width=10000也在约束范围，但是会超出屏幕，出行溢出错误。

  **如何解决？请看下一个组件Wrap**

  ![image-20230603222920063](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/JS/20230603222920%20.png)

### Wrap

Flex设置水平主轴，子组件受到的约束范围是0<=w<=infinity，所以子组件宽度可能会超出屏幕

Wrap会自己拐弯，排不下会自动换行，同时Wrap组件也有一个direction属性，用来指定主轴方向

![image-20230603224006229](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/JS/20230603224006%20.png)



* 组件尺寸特性

  同Flex组件

* 组件约束特性

  ```text
  [1]: 默认情况下， 在 [主轴] 方向上 [放松约束,>=0,<=所受约束的最大值]，在 [交叉轴] 方向上 [无限约束]。
  
  [2]: Wrap 的 children 列表中的组件，所受到的约束都是一致的。
  ```

  

### Stack 

 组件可以用于将多个组件进行叠放

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(
    const MaterialApp(
      home: Stack(//组件特性，无约束时，取自身width、height属性，传递给子级组件
       children: [
        SizedBox(width:300, height:300,child: ColoredBox(color:Colors.blue)),
        SizedBox(width:200, height:200,child: ColoredBox(color:Colors.red))
         //月靠后，层级越高

       ],
      ),
    )
   
  );
}
```

![image-20230603235005304](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/JS/20230603235005%20.png)

Stack组件的fit属性，可以影响其向子组件施加的约束

* 组件尺寸特性

  同Flex组件

* 组件约束特性

  ```text
  [1]: 默认情况下, 宽高尽可能 [放松约束]。
  	  默认值为StackFit.loose 下,  宽高尽可能 [放松约束,>=0,<=所受约束的最大值]。
  	  fit:StackFit.expand 下,  施加 [紧约束]，约束尺寸为自身受到约束的 [最大尺寸]。
  		fit:StackFit.passthrough 下,  仅 [传递约束]，把自身受到的约束原封不动的施加给子级。
  
  [2]: Stack 的 children 列表中的组件，所受到的约束都是一致的。
  ```

  

### Flexible、Expanded、Spacer

Flexible会占据剩余空间，其fit属性会影响向子组件施加的约束

Expanded等价于Flexible的fit属性设置为FlexFit.tight，即向子组件施加自紧约束

![image-20230604000806930](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/JS/20230604000807%20.png)

Spacer等价于Expanded，即占据剩余空间，但是该组件没有child属性，不能在其内部放置在其他组件，所以仅仅用来占据空位



* 组件尺寸特性

  占据宽、高剩余空间

* 组件约束特性

  ```text
  [1]: 默认情况下,在主轴方向上施加 [松约束]
  	  默认值为fit:FlexFit.loose 下,  向子组件施加宽、高 [松约束，>=0,<=占据的剩余空间]
  	  fit:FlexFit.tight 下,  向子组件施加宽、高  [紧约束，=占据的剩余空间]
  
  [2]: Stack 的 children 列表中的组件，所受到的约束都是一致的。
  ```

### Align

构造函数如下：

```dart
const Align({
    super.key,
    this.alignment = Alignment.center,
    this.widthFactor,
    this.heightFactor,
    super.child,
})
```

alignment属性，用于定位子组件所在的位置（蓝块是子组件）

![image-20230604182850337](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/JS/20230604182850%20.png)

widthFactor、heightFactor会影响组件尺寸特性

* 组件尺寸特性

  受到紧约束，组件的宽高为紧约束大小

  受到宽松约束

  ```text
  组件宽=子组件宽*widthFactor
  
  组件高=子组件高*heightFactor
  ```

  结果如果超过了组件所受的宽松约束的范围，则取宽松约束的最大值，作为组件尺寸

* 组件约束特性

  为子组件提供宽松约束

### Container

非常特殊，其他所有组件均是根据自己受到的约束和自身属性，生成新的约束，并传递给子组件

唯有Container组件是根据子元素的需求，生成约束

* 组件尺寸特性

  受到紧约束，组件的宽高为紧约束大小

  受到宽松约束，取决于子组件大小

* 组件约束特性

  在布局时，向Container添加子元素后，Container会根据子元素的要求，自动为子元素分配空间并传递给子组件所需的约束条件

  ```dart
  import 'package:flutter/material.dart';
  
  void main() {
    runApp(
      MaterialApp(
        home: Scaffold(//紧约束
          body: Container(//mainAxisSize设置为主轴最小。所以Container根据子组件的需求生成约束
            child:const Flex(
              direction: Axis.horizontal,
              mainAxisSize: MainAxisSize.min, // 将 mainAxisSize 设置为 MainAxisSize.min
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
               SizedBox(width:100,height:100,child: ColoredBox(color: Colors.red)),
               SizedBox(width:100,height:100,child: ColoredBox(color: Colors.blue))
              ]
            ),
          ),
        ),
      ),
    );
  }
  ```

  

  ![image-20230604012259445](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/JS/20230604012259%20.png)



## 特定布局

### 打破紧约束

```dart
//main.dart
void main() {
  runApp(
    const SizedBox(
      width: 100,
      height: 100,
      child: ColoredBox(color: Colors.blue),
    ),
  );
}
```

这是上一节的例子，手机屏幕尺寸(w=430,h=932)，root根组件向SizeBox施加了约束(w=430,h=932)

我们管这种宽高等于固定值的约束，称为紧约束

SizeBox尺寸也被固定在(w=430,h=932)，同时SizeBox组件会继续把自己受到的约束，原样传递下去（不传递其width、height属性）

ColoredBox受到的约束也是(w=430,h=932)，所以，会出现全屏都是蓝色的现象



SizeBox会原样将受到的紧约束传递下去，这样所有子组件都是全屏大小了

所以，可以使用Flutter中的一些特定组件，这些组件受到紧约束后，传递给子组件的是放宽松的约束



**解除紧约束：UnconstrainedBox**

```dart
void main() {
  //屏幕尺寸：(w=430,h=932)
  runApp(
    //受到的约束：(w=430,h=932)。尺寸：(w=430,h=932)
    const UnconstrainedBox( 
      //受到的约束：(UnconstrainedBox)，即宽高不限。尺寸：(w=0,h=0)。ColoredBox尺寸规则：取约束的最小值
      child: ColoredBox(color: Colors.blue),
    ),
  );
}
```

![image-20230603005107276](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/JS/20230603005107%20.png)

布局分析工具中，多了一个

![image-20230603004157861](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/JS/20230603004158%20.png)

如何显示ColoredBox？使用SizeBox可以根据width、height属性生成新的约束

```dart
void main() {
  runApp(
    const UnconstrainedBox(
      child: SizedBox(//组件特性，无约束时，取自身width、height属性，生成紧约束，传递给子级组件
        width: 100,
        height: 100,
        child: ColoredBox(color: Colors.blue),
      ),
    ),
  );
}
```

![image-20230603010112737](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/JS/20230603010113%20.png)





### 三列布局，中间列自适应

Expand

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const MaterialApp(
    home: Row(
      //组件特性，无约束时，取自身width、height属性，传递给子级组件
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        SizedBox(
            width: 100, height: 100, child: ColoredBox(color: Colors.blue)),
        //占据剩余空间，并向下施加[约束]
        Expanded( child: ColoredBox(color: Colors.red)),
        SizedBox(
            width: 100, height: 100, child: ColoredBox(color: Colors.green))
      ],
    ),
  ));
}
```

![image-20230603235745857](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/JS/20230603235746%20.png)

![image-20230604000025696](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/JS/20230604000026%20.png)

两个SizedBox宽为100，Expanded占据了剩余空间，取剩余空间的最大值生成紧约束



### 多列按比例布局

Expanded组件默认flex属性为1。三列flex属性都是1，所以在主轴等比例分配

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const MaterialApp(
    home: Row(
      //组件特性，无约束时，取自身width、height属性，传递给子级组件
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Expanded(child: ColoredBox(color: Colors.blue)),
        Expanded( child: ColoredBox(color: Colors.red)),
        Expanded(child: ColoredBox(color: Colors.green))
      ],
    ),
  ));
}
```

![image-20230604002611679](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/JS/20230604002612%20.png)

主轴按照1:2:2的宽度分配

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const MaterialApp(
    home: Row(
      //组件特性，无约束时，取自身width、height属性，传递给子级组件
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Expanded(flex:1,child: ColoredBox(color: Colors.blue)),
        Expanded(flex:2, child: ColoredBox(color: Colors.red)),
        Expanded(flex:2,child: ColoredBox(color: Colors.green))
      ],
    ),
  ));
}
```

![image-20230604002547739](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/JS/20230604002548%20.png)



### 在自适应容器中使用Flex布局

前面提到过，Flex布局的尺寸特性，必须受到紧约束，否则就会出现Size丢失的警告

我们可以利用Expanded自适应占据剩余空间，又因为Expanded可以向下施加紧约束，就可以使用Flex布局了

这样两者结合在一起，就相当于Flex布局的宽、高可以自适应



### 布局实战



## Flutter组件

Flutter组件学习思路：

* Flutter组件的宽高

  组件的约束优先级高，比如：

  组件约束宽=100，子组件的宽会被拉到100；

  组件约束宽<=100，子组件的宽会由自己控制不得超过100；

  组件约束宽无限，子组件的宽会完全由自己控制

  

  **如何设置组件对子组件的约束**：

  ```text
  ConstrainedBox组件：使用ConstrainedBox组件可以非常方便地设置组件的最大/最小宽度和高度。它接受一个BoxConstraints对象作为参数，在这个对象中可以设置最大最小宽度和高度等各种约束条件。
  ```

  ```text
  SizedBox组件：使用SizedBox组件可以指定组件的精确宽度和高度。它的构造函数接受一个尺寸参数，用于指定组件的宽度和高度。
  ```

  ```
  AspectRatio组件：使用AspectRatio组件可以指定组件的长宽比。如果要设置一个组件的宽度是高度的2倍，可以使用AspectRatio组件来实现，其中AspectRatio组件的构造函数接受一个宽高比参数。
  ```

  ```text
  FractionallySizedBox组件：使用FractionallySizedBox组件可以根据父组件的大小来指定子组件的大小。例如，如果想让一个组件的宽度是父组件宽度的一半，可以使用FractionallySizedBox的widthFactor属性设置为0.5
  ```

  **指定容器对自己的约束条件**：

  ```text
  Container组件的width和height属性可以指定其精确宽度和高度，constraints属性可以用来设置多个约束条件，如最大宽度、最小宽度、最大高度、最小高度等。
  ```

  

* 我更喜欢由内容撑起盒子宽高的思路。

  Flutter组件有的是尽可能占据父级的宽高（如果父元素没有宽高，则撑起父元素尽可能占据祖先元素），有的是由内部撑起

  ```dart
  //内部文字撑开
  Text('Text组件')
  
  
  //Column、Row组件，默认在主轴的方向占据父组件的剩余空间，纵轴由内部撑开
  //设置主轴尽可能小，mainAxisSize: MainAxisSize.min，则在主轴方向由内部撑开
  Column(
      mainAxisSize: MainAxisSize.min,//垂直方向由内部撑起
      children: [
        //水平方向由Text组件撑起
        Text('子组件'),
        Text('子组件')
      ]
  )  
  ```

* 与Web不同，Flutter并不是所有组件都有事件（比如，点击事件）

  ```dart
  ```

* 层级定位

  Stack组件，其子组件按照书写的顺序从上到下，在屏幕上从低到高堆叠

  ```dart
  Stack(
  	children: [
    	//居中显示文字
    	const Align(
      	alignment: Alignment.center,
      	child: Text('提示1'),
    	),
    	//居右显示文字（层级高于前面的组件）
    	Align(
      	alignment: Alignment.centerRight,
      	child: Text('提示2'),
    )
  ],
  ),
  ```

  

#### 布局组件

##### 列表组件

分为3种

* 垂直列表
* 水平列表
* 动态渲染列表

**基本模版**去掉HomeContent中return 的 Center 组件，换为return 下面代码中的组件

`ListView`组件

* scrollDirection字段，控制列表方向，默认垂直方向滚动（ Axis.vertical），水平滚动为Axis.horizontal
* ListView组件会自适应父组件的宽高，设置垂直滚动时，ListView的宽度为父组件宽度，且不可修改。水平滚动时ListView的高度为父组件高度，且不可修改。【所以，我们可以将ListView放入一个设置了宽高的Container，来约束大小】

* children字段放的是Widget数组，可以放任意类型组件。

`ListTile`是列表项组件，只能用于垂直滚动列表

**垂直列表**

![image-20220220200931640](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Flutter/image-20220220200931640%20.png)

```dart
ListView(
      padding:  EdgeInsets.all(10),
      children:  <Widget>[
        ListTile(
          //列表项前图标
          leading: Icon(
            Icons.settings,
            size: 40,
            color: Colors.red,
          ),
          //主文本
          title: Text(
            "中国队位列奖牌榜第三位 巴赫再次接受总台独家专访",
            style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
          ),
          //次级文本
          subtitle:
              Text("北京冬奥会闭幕之际，今天中午，国际奥委会主席巴赫在中央广播电视总台鸟巢演播室再次接受了总台记者的独家专访。"),
        ),
        ListTile(
          //尾图标
          trailing: Icon(Icons.access_alarms),
          title: Text(
            "中国队位列奖牌榜第三位 巴赫再次接受总台独家专访",
            style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
          ),
          subtitle:
              Text("北京冬奥会闭幕之际，今天中午，国际奥委会主席巴赫在中央广播电视总台鸟巢演播室再次接受了总台记者的独家专访。"),
        ),
      ],
);
```

**水平列表**

这里将ListView组件放在了Container组件中了，Container组件限制了高度为300，ListView的高度也为300，其中的子元素的高度跟随ListView的高度

![image-20220220205852916](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Flutter/image-20220220205852916%20.png)

```dart
Container(
      height: 300,
      child: ListView(
        padding: EdgeInsets.all(10),
        scrollDirection: Axis.horizontal,
        children: <Widget>[
          Container(
            width: 200,
            color: Colors.yellow,
          ),
          Container(
            width: 200,
            color: Colors.orange,
          ),
          Container(
            width: 200,
            color: Colors.blue,
          )
        ],
      ),
);
```

**动态渲染列表**

这里的代码，替换**基本模版**中的HomeContent类

ListView.builder()这个构造函数，itemBuilder会多次调用，我们写的_getListData方法中只需要return一个ListTile组件即可

![image-20220220222206854](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Flutter/image-20220220222206854%20.png)

```dart
class HomeContent extends StatelessWidget {
  //私有方法
  Widget _getListData(content, index) {//itemBuilder有这两个参数
    return ListTile(
      title: Text("第$index个列表项---标题"),
      subtitle: Text("第$index个列表项--次级标题"),
    );
  }

  @override
  Widget build(BuildContext context) {
    return ListView.builder( 
      itemCount: 10, //itemBuilder调用的次数
      itemBuilder: this._getListData);//这是是把方法赋值给itemBuilder,并不是调用方法，所以不要写成 this._getListData()。
  }
}
```

##### 垂直布局

列布局于列表布局组件(垂直滚动)的区别是什么？

列表布局组件(垂直滚动)会强制子元素的宽度为自己的宽度 ，且超出屏幕会滚动

![image-20220221003844225](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Flutter/image-20220221003844225%20.png)

替换**基本模版**中build函数的return部分

![image-20220224235116169](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Flutter/image-20220224235116169%20.png)

```dart
return Column(
      children: [
        Image.network(
            "https://files.flutter-io.cn/cms/static/3461c6a5b33c339001c5.jpg"),
        Text("文字"),
        Icon(Icons.music_note)
      ],
);
```

##### 水平布局

替换**基本模版**中build函数的return部分

![image-20220228233404199](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Flutter/image-20220228233404199%20.png)

```dart
Container(
        width: 200,
        height: 200,
        color: Colors.red,
        child: Row(
          	//-----类似于css中flex的justify-content属性		
          	
          	//主轴：水平方向 (可选值：start,end,spaceBetween,spaceAround,spaceEvenly )
            mainAxisAlignment:MainAxisAlignment.spaceEvenly, 
          	//纵轴：垂直方向(start,end,center,stretch)
            crossAxisAlignment: CrossAxisAlignment.center,
            children: const [
              Icon(Icons.face),
              Icon(Icons.settings),
              Icon(Icons.search)
            ]
        )
);
```

##### 网格布局组件

使用网格布局有一个问题，子元素设置宽高失效，只能使用`childAspectRatio`属性设置子元素宽高比

**基本模版**中的HomeContent替换为以下内容

**GridView.count**

![image-20220221002503096](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Flutter/image-20220221002503096%20.png)

```dart
class HomeContent extends StatelessWidget {
  List<Widget> _getData() {
    List<Widget> list = [];
    for (var i = 0; i < 10; i++) {
      list.add(Container(
        //width和height均失效，需要使用网格布局的childAspectRatio属性
        alignment: Alignment.center,
        color: Colors.blue,
        child: Text("第$i个元素"),
      ));
    }
    return list;
  }

  @override
  Widget build(BuildContext context) {
    return GridView.count(
      crossAxisCount: 2, //水平放置，每行放置的子元素个数
      children: this._getData(), //通过函数，获取子组件，类型是List<Widget>

      crossAxisSpacing: 10, //子元素水平间距
      mainAxisSpacing: 20, //子元素垂直间距

      padding: EdgeInsets.all(10),

      childAspectRatio: 0.7, //子元素宽高比 
    );
  }
}

```

**GridView.builder**

动态渲染网格布局，与前面动态列表相似

替换**基本模版**中的HomeContent类

![image-20220225001802572](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Flutter/image-20220225001802572%20.png)

```dart
class HomeContent extends StatelessWidget {
  Widget _getData(context, index) {
    return Column(
      children: [
        Image.network(
            "https://files.flutter-io.cn/cms/static/3461c6a5b33c339001c5.jpg"),
        // Container(
        //   padding: EdgeInsets.all(10),
        // ),
        SizedBox(
          height: 10,
        ),
        Text("标题$index")
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    return Container(
        padding: EdgeInsets.all(10),
        child: GridView.builder(
            gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 2, mainAxisSpacing: 80, crossAxisSpacing: 20),
            itemCount: 10, //itemBuilder调用的次数
            itemBuilder: this._getData));
  }
}
```





#### 容器组件

##### Container 容器

类似于HTML中的`div`，

* 这个Container类似于怪异盒子模型，padding的增加，只会向内挤占位置
* 背景色是内容区域+padding

![image-20220220142335214](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Flutter/image-20220220142335214%20.png)

```dart
Container(
      width: 300.0, //宽
      height: 300.0, //高
			color: Colors.red, //背景色  注意：decoration也可以设置背景色，两个不能同时设置，否则报错
      decoration: BoxDecoration(
          //装饰
          //color: Colors.red, //背景色
          border: Border.all(width: 1.0, color: Colors.black), //边框
          borderRadius: BorderRadius.all(Radius.circular(20)), //圆角
          image: DecorationImage(
              //背景图
              image: NetworkImage(//如果使用本地图,AssetImage构造函数
                  "https://files.flutter-io.cn/cms/static/3461c6a5b33c339001c5.jpg"))),

      //设置内外边距时，也可以单独指定距离：EdgeInsets.fromLTRB(left, top, right, bottom)
      padding: EdgeInsets.all(10.0), //内边距
      margin: EdgeInsets.all(10.0), //外边距

      //子元素布局位置
      alignment: Alignment.bottomLeft,

      //child表示内部子元素，这里放了一个Text组件，用来显示文字
      child: Text("你好123",
          textDirection: TextDirection.rtl,
          textAlign: TextAlign.end,
          style: TextStyle(
            fontSize: 40,
            color: Colors.blue,
          )),
)
```

##### Padding组件

在flutter中很多组件没有padding属性，所以有了这个组件

**举例**：网格布局的两个子元素挨着，我们想要通过padding的方式将两个子元素内的图片向内挤

![image-20220225003436137](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Flutter/image-20220225003436137%20.png)

```dart
class HomeContent extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return GridView.count(
      crossAxisCount: 2, //水平放置，每行放置的子元素个数
      children: [
        Image.network(
          "https://files.flutter-io.cn/cms/static/3461c6a5b33c339001c5.jpg",
          fit: BoxFit.cover,
        ),
        Image.network(
          "https://files.flutter-io.cn/cms/static/3461c6a5b33c339001c5.jpg",
          fit: BoxFit.cover,
        ),
      ],
      padding: EdgeInsets.all(10),
      // crossAxisSpacing: 10, //水平间距
      // mainAxisSpacing: 20, //垂直间距

      childAspectRatio: 0.7, //子元素宽高比
    );
  }
}
```

所以，使用Padding组件

![image-20220225003910675](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Flutter/image-20220225003910675%20.png)

```dart
class HomeContent extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return GridView.count(
      crossAxisCount: 2, //水平放置，每行放置的子元素个数
      children: [
        Padding(
            padding: EdgeInsets.all(10),
            child: Image.network(
              "https://files.flutter-io.cn/cms/static/3461c6a5b33c339001c5.jpg",
              fit: BoxFit.cover,
            )),
        Padding(
            padding: EdgeInsets.all(10),
            child: Image.network(
              "https://files.flutter-io.cn/cms/static/3461c6a5b33c339001c5.jpg",
              fit: BoxFit.cover,
            )),
      ],
      padding: EdgeInsets.all(10),
      // crossAxisSpacing: 10, //水平间距
      // mainAxisSpacing: 20, //垂直间距

      childAspectRatio: 0.7, //子元素宽高比
    );
  }
}
```



#### 基础组件 

##### 文本组件

[Text文本组件](https://book.flutterchina.club/chapter3/text.html#_3-1-%E6%96%87%E6%9C%AC%E5%8F%8A%E6%A0%B7%E5%BC%8F)

```dart
Text("你好123",
  textDirection: TextDirection.rtl, //水平
  textAlign: TextAlign.end, //right是文字组件整体位于容器,end是文字在text组件中右对齐
  style: TextStyle(
     fontSize: 40,
     color: Colors.blue,
  )
)
```

##### 图片组件

一般将Image组件放在Container容器中，Image组件默认宽度占据整个Container容器，其中的图片默认contain的填充方式

`Image.network` 第一个参数，传入的事网络图片地址

`Image.asset`：是传入本地地址

![image-20220220140306550](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Flutter/image-20220220140306550%20.png)

**使用网络图片**

```dart
Center(
   child: Container(
      width: 300.0, //宽
      height: 300.0, //高
      decoration: BoxDecoration(
        //装饰
        color: Colors.red, //背景
        border: Border.all(width: 1.0, color: Colors.black), //边框
        borderRadius: BorderRadius.all(Radius.circular(20)), //圆角
      ),

      child: Image.network(
        "https://files.flutter-io.cn/cms/static/3461c6a5b33c339001c5.jpg",
        //width: 图片组件宽
        //height:  图片组件高
        fit: BoxFit.contain, //图片填充容Image组件的方式
        // repeat: ImageRepeat.repeatX, //图片重复
        alignment: Alignment.center, //图片位于在Image组件的位置
      ),
));
```

实现一个圆形图片，如图效果：

![image-20220220142554853](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Flutter/image-20220220142554853%20.png)

方法一：给Container容器设置为圆形，然后再设置背景图片

```dart
Container(
      width: 300.0, //宽
      height: 300.0, //高

      decoration: BoxDecoration(
          //装饰
          color: Colors.red, //背景色
          border: Border.all(width: 1.0, color: Colors.black), //边框
          borderRadius: BorderRadius.all(Radius.circular(150)), //圆角
          image: DecorationImage(
              //背景图
              image: NetworkImage(//如果使用本地图,AssetImage构造函数
                  "https://files.flutter-io.cn/cms/static/3461c6a5b33c339001c5.jpg"))),
)
```

方法二：使用clipOval类，将图片组件放在里面就会按照图片组件的宽高，被裁切成椭圆形。【图片是正方形，就是是圆形】

```dart
 Container(
      width: 300.0, //宽
      height: 300.0, //高

      decoration: BoxDecoration(
        //装饰
        color: Colors.red, //背景色
        border: Border.all(width: 1.0, color: Colors.black), //边框
        borderRadius: BorderRadius.all(Radius.circular(20)), //圆角
      ),
      child: ClipOval(
        child: Image.network(
            "https://files.flutter-io.cn/cms/static/3461c6a5b33c339001c5.jpg"),
      ),
)
```

**使用本地图片**

仅仅是构造函数变为`Image.asset`，其他传入的命名参数不变

第一步：

* 根目录下新建以下目录，将对应分辨率的图片放入对应文件夹，在image根目录也要放一张，三张图片同名

  ```text
  -images
  	|-2.0x
  	|-3.0x
  ```

* 在`pubspec.yaml`文件中配置引入的图片，assets字段在flutter配置项下

  ```yaml
  flutter:
    assets:
    		- images/icon.png
        - images/2.0x/icon.png
        - images/3.0x/icon.png
  ```

* 页面中引用图片（地址只填写根目录下的图片）

  ```dart
  Image.asset("images/icon.png")
  ```

##### 图标组件

替换**基本模版**中build函数的return部分

![image-20220224234747147](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Flutter/image-20220224234747147%20.png)

```dart
Icon(
    Icons.favorite,
    size: 30,
    color: Colors.red,
);
```















