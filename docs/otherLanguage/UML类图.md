# UML类图

UML，全称为Unified Model Language，即统一建模语言，是由一整套图表组成的，为面向对象系统的产品进行说明、可视化和编制文档的一种标准语言

UML具有许多不同类型的图表，包括：

- 静态图：用例图、类图、包图
- 动态图：活动图、状态图、时序图、协作图

这些不同的图，可以提供从不同的角度来描述整个系统

这篇文章只针对**类图**（其用来描述整个系统的结构），

学习目标：希望能通过设计类图，进行整个系统的架构



UML类图整体分为两大部分：

1、**实体**：类 、接口

2、**关系**：继承（也叫泛化）、实现、组合（合成）、聚合、依赖、关联



## 类与接口

### 类

注意：UML图中不涉及构造函数

代码：

```ts
class Employee {
  	Name:string;
  	Address:string;
    Age:int;
  
    Work() {
        console.log(`Hello World`);
    }
}
```

图表示：

![image-20231108115940501](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/minprogram-template/20231108115940.png)

```text
整体由三格构成：
	类名
	属性  （格式：可见性 名称 ：类型 [ = 缺省值]）
	方法  （格式：可见性 名称(参数列表) [ ： 返回类型]）
	
成员修饰符：
	+：表示public 
	-：表示private 
	#：表示protected 
```



### 接口

这里因为抽象类与接口功能上基本一样，都是需要实现的，所以写在一起

接口代码：

```ts
interface IBehavior{
    name:string;
    Eat:()=>string;
}
```

图表示：

![image-20231108134820973](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/minprogram-template/20231108134821.png)



抽象类代码：

```ts
abstract class IBehavior {
    // 抽象属性,子类必须实现
    abstract name: string;
  
    // 抽象方法，子类必须实现
    abstract Eat(): void;

    // 普通方法（子类无需实现）
    displayInfo() {
        console.log(`Name: ${this.name}`);
    }
}
```

图表示：抽象类的图示仅仅是类名、方法名使用斜体，其他与普通类一样

![image-20231108120538758](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/minprogram-template/20231108120539.png)



## 关系

### 继承

在代码中通常体现为A类派生自B类，子类B继承了父类的属性和方法，从而可以重用父类的代码，并在其基础上添加或修改功能

```ts
class ParentClass {
  	name:string;
    constructor(name: string) {
      this.name=name
    }

    sayHello() {
        console.log(`Hello, ${this.name} from ParentClass`);
    }
}

class ChildClass extends ParentClass {
    constructor(name: string) {
        super(name); // 调用父类构造函数
    }

    // 子类可以继承父类的方法，也可以添加自己的方法
    sayHelloFromChild() {
        console.log(`Hello, ${this.name} from ChildClass`);
    }
}

// 创建子类的实例
const childInstance = new ChildClass("Alice");

// 可以访问从父类继承的方法
childInstance.sayHello(); // 输出：Hello, Alice from ParentClass

// 也可以访问子类自己的方法
childInstance.sayHelloFromChild(); // 输出：Hello, Alice from ChildClass

```

图示：子类指向父类

![image-20231108135538729](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/minprogram-template/20231108135538.png)

### 实现

表示一个类实现了一个接口或抽象类的约定，该类必须提供接口中定义的方法

实现接口：

```ts
interface Person{
    name:string;
    sayHello:()=>string;
}

class Tom implements Person{
    name:string;
    constructor(name:string){
        this.name=name
    }
    sayHello(){
        console.log('Tom')
        return 'Tom'
    }
}
```

实现抽象类：

```ts
abstract class AbstractClass {
    // 抽象属性,子类必须实现
    abstract abstractProperty: string;

    constructor(public name: string) {
        this.name = name;
    }

    // 抽象方法，子类必须实现
    abstract abstractMethod(): void;

    // 普通方法
    displayInfo() {
        console.log(`Name: ${this.name}`);
    }
}

class ConcreteClass extends AbstractClass {
    // 必须实现抽象属性和抽象方法
    abstractProperty: string = "This is a concrete property";

    abstractMethod() {
        console.log(`Abstract method implementation in ConcreteClass`);
    }
}

const obj = new ConcreteClass(); 
obj.displayInfo(); // 访问父级的方法
obj.abstractMethod(); 
```

图示：子类指向接口

![image-20231108135646324](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/minprogram-template/20231108135646.png)

### 组合

表示对象A包含对象B，但对象B不能独立存在。如果外部对象A被销毁，内部对象B也将被销毁

在代码中是通过类的构造函数，在类的构造函数中创建另一个类的对象

下面代码，Car对象销毁了，其内部的Engine对象也会销毁

```ts
class Engine {
    start(): void {
        console.log('Engine started.');
    }
}

class Car {
    private engine: Engine;

    constructor() {
        this.engine = new Engine();
    }

    startCar(): void {
        this.engine.start();
        console.log('Car started.');
    }
}

const myCar = new Car();
myCar.startCar();
```

图示：实心菱形在**整体一方**，箭头指向**部分一方**。

![image-20231108140423078](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/minprogram-template/20231108140423.png)

### 聚合

表示对象A包含对象B，但对象B可以独立存在。如果外部对象A被销毁，内部对象B仍然可以存在（与合成的差异点

在代码中通常是：在类中通过入参数传入另一个类的对象，所以这些对象之间具有更宽松的关联

  ```ts
  class Student {
      name: string;
  
      constructor(name: string) {
          this.name = name;
      }
  }
  
  class Classroom {
      students: Student[] = [];
  
      addStudent(student: Student): void {
          this.students.push(student);
      }
  }
  
  const student1 = new Student('Alice');
  const student2 = new Student('Bob');
  
  const classroom = new Classroom();
  classroom.addStudent(student1);
  classroom.addStudent(student2);
  
  console.log(classroom.students.map(student => student.name));
  
  ```

图示：与组合一致，即空心菱形在**整体一方**，箭头指向**部分一方**

![image-20231108140629930](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/minprogram-template/20231108140630.png)

### 关联

表示类与对象之间之间的引用

```ts
class Person {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    greet(otherPerson: Person): void {
        console.log(`Hello, ${otherPerson.name}!`);
    }
}

const person1 = new Person('Alice');
const person2 = new Person('Bob');

person1.greet(person2);

```

图示：表示这种关联关系的 数量对应关系

```text
数字：精确的数量
*或者0..*：表示0到多个
0..1：表示0或者1个
1..*：表示1到多个
```

**单向关联**

单向箭头，箭头指向被关联的对象

![image-20231108141848563](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/minprogram-template/20231108141848.png)

**双向关联**

双箭头/直线

![image-20231108142136645](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/minprogram-template/20231108142136.png)

### 依赖

**依赖是一种弱化的关联关系**

在代码中通常体现为A类或模块引用B类或模块的接口、方法、属性，即A类依赖于B类，但是不具有强制的拥有关系

例子：A类引用B类的方法、属性

  ```ts
  class ClassB {
      doSomething(): void {
          console.log('ClassB');
      }
  }
  
  class ClassA {
      doSomethingWithA(objB: ClassB): void { //入参是另一个类，就可调用另一个类了
          objB.doSomething();
      }
  }
  
  const objA = new ClassA();
  const objB = new ClassB();
  
  objB.doSomethingWithA(objA);
  ```

例子：A类引用B类的接口

面向接口编程，A类调用的是接口的方法，而接口可以任意定义

Go语言中的标准库sql是典型范例，其实现了大量数据库操作相关的接口。开发者根据其使用的数据库种类，实现接口的具体逻辑，从而实现了sql标准库可以操作多种类型的数据库效果

  ```ts
  import fs from 'fs';
  import path from 'path'
  // 定义一个接口
  interface Logger {
      log(message: string): void;
  }
  
  // 实现日志记录的类（输出到控制台）
  class ConsoleLogger implements Logger {
      log(message: string): void {
          console.log(`Log: ${message}`);
      }
  }
  // 实现日志记录的类
  class FileLogger implements Logger {
      log(message: string): void {
          fs.writeFileSync(path.resolve(__dirname, './data.txt'), message) 
      }
  }
  
  
  
  // 依赖关系：一个类依赖于另一个类的接口
  class UserManager {
      private logger: Logger;
  
      constructor(logger: Logger) {
          this.logger = logger;
      }
  
      addUser(username: string): void {
          // 执行一些操作
          this.logger.log(`User '${username}' added.`);
      }
  }
  
  // 输出到控制台
  const consoleLogger = new ConsoleLogger();
  const userManager = new UserManager(consoleLogger);
  userManager.addUser('Alice');
  
  // 输出到文件
  const fileLogger = new FileLogger();
  const userManagerV2 = new UserManager(fileLogger);
  userManagerV2.addUser('Alice');
  
  ```

图示：

![image-20231108142426667](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/minprogram-template/20231108142426.png)

## 绘图角度

下面是从网上搜到的一个案例，接下来我们依次讲解，如何用图来表示UML的**图和关系**

![v2-0a0cd0791c5512a07d5be8913222721b_720w](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/minprogram-template/20231103192312.webp)



### 类与接口

**类**

共有三格，每格的含义以标在图中了。对于属性和方法前面的符号

- +号：共有类型，public（此成员在**类、类的实例、子类、子类的实例**中都能被访问）
- -号：私有类型，private（此成员仅能在**类的内部**被访问）
- \#号：保护类型，protect（此类成员仅能在**类与子类中**被访问）

![image-20231106094358097](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/minprogram-template/20231106094358.png)

接口：

接口有两中表示方法

![image-20231106094536896](/Users/yc/Library/Application Support/typora-user-images/image-20231106094536896.png)

### 关系

![image-20231106141302221](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/minprogram-template/20231106141302.png)





## 参考

https://zhuanlan.zhihu.com/p/626801628

https://blog.csdn.net/thl789/article/details/108959644

https://blog.csdn.net/qq_34202873/article/details/127590016



