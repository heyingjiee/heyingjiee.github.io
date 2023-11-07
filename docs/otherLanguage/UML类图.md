# UML类图

UML，全称为Unified Model Language，即统一建模语言，是由一整套图表组成的，为面向对象系统的产品进行说明、可视化和编制文档的一种标准语言

UML具有许多不同类型的图表，包括：

- 静态图：用例图、类图、包图
- 动态图：活动图、状态图、时序图、协作图

这些不同的图，可以提供从不同的角度来描述整个系统

这篇文章只针对**类图**（其用来描述整个系统的结构），

学习目标：希望能通过设计类图，进行整个系统的架构



UML类图整体分为两大部分：

1、**图**：类 、接口

2、**关系**：继承（也叫泛化）、实现、依赖、合成（组合）、聚合、关联



下面从 代码、绘图两个的角度来学习

## 代码角度

图与关系对应编程语言的结构：类、接口不必说，很多语言中的保留关键字。重点强调继承、实现、依赖、合成、聚合、关联这几种关系

* 继承

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

* 实现

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

* 合成

  表示对象A包含对象B，但对象B不能独立存在。如果外部对象A被销毁，内部对象B也将被销毁

  在代码中，通常是通过类的构造函数，在类的构造函数中创建另一个类的对象

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

* 聚合

  表示对象A包含对象B，但对象B可以独立存在。如果外部对象A被销毁，内部对象B仍然可以存在（与合成的差异点

  在代码中，通常是在类中创建另一个类的对象，但这些对象之间具有更宽松的关联，可以分别存在

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

* 依赖

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



* 关联

  表示不同类之间可以互相引用，但它们之间没有强制的包含或继承关系

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

  

## 绘图角度

下面是从网上搜到的一个案例，接下来我们依次讲解，如何用图来表示UML的**图和关系**

![v2-0a0cd0791c5512a07d5be8913222721b_720w](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/minprogram-template/20231103192312.webp)



### 类与接口

类：

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



