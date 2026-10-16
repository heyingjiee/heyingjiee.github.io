# Swift6

## Swift6语法极速入门

* 中文文档：https://doc.swiftgg.team/documentation/the-swift-programming-language
* Array、Dictionary 类型的方法：https://developer.apple.com/documentation/swift/array

### 类型

值类型赋值会发生拷贝、引用类型共享引用

值类型 ：

* `struct`（结构体）

* `enum`（枚举）

* `tuple`（元组）

* 基本数据类型 `Int`、 `Float` 、 `Double` 、 `Bool` 、`String` 、 `Character`（单字符），底层都是使用struct实现的

* 集合类型 ，底层使用class实现，在赋值时共享节省性能，如果修改就会**写时复制**

  ```swift
  var array: [Int] = [1, 2, 3]           // 数组，有序
  var set: Set<Int> = [1, 2, 3]          // 集合，无序不重复
  var dict: [String: Int] = ["age": 30]  // 字典，键值对
  ```

引用类型：

- `class`（类）
- `actor`（并发安全的引用类型）
- 闭包（捕获上下文时）

### 函数

签名

```swift
// _: 、traits: 、body: 分别是3个参数，Swift文档习惯上连在一起写
init(_:traits:body:)
```

使用

```swift
// person是外部标签，name是内部名
func greet(person name: String) -> String {
    return "Hello, \(name)"  // 内部用 name
}
greet(person: "Tim")  // 调用时用外部标签

// 只写一个就是外部标签/内部名一致
func add(a: Int, b: Int) -> Int {
  return a + b
}
add(a: 1, b: 2) // 调用时用外部标签

// 省略外部标签
func add(_ a: Int, _ b: Int) -> Int {
    return a + b
}
add(1, 2) // 调用时用外部标签，没有，就省略

// 默认值参数
func greet(name: String = "World") -> String {
    return "\(name)"
}

// 可变参数
func sum(_ numbers: Int...) -> Int {
    return numbers.reduce(0, +)
}

// 函数参数
func calculate(_ a: Int, _ b: Int, operation: (Int, Int) -> Int) -> Int {
    return operation(a, b)
}
// 传入方式1：传入时函数体放在花括号中，$0是operation的第一个参数，其他类推
calculate(3, 4, operation: { a, b in // in是分割 形参、函数体的
    return a + b
})  
calculate(3, 4, operation: { $0+$1 }) 
// 传入方式2：尾随闭包，当参数在最后可以把函数体拿到括号外面
calculate(3, 4) { a, b in 
    return a + b
}
// 尾随闭包有很多简写，以filter为例子
nums.filter(){ (num: Int) -> Bool in
    return num % 2 == 0
}
// 没有其他参数了括号可以省略
nums.filter { (num: Int) -> Bool in
    return num % 2 == 0
}
// 省略入参, $0表示第1个入参，$1是第2个入参
nums.filter { 
    return $0 % 2 == 0
}
// 只有一行可省略 return , 现在就是最简形式
nums.filter { $0 % 2 == 0 }
```

### 逻辑处理

条件

```swift
// if else
let score = 85
if score >= 90 {
    print("优秀")
} else if score >= 60 {
    print("及格")
} else {
    print("不及格")
}

// switch
// 1、分支不用加break； 2、支持匹配范围
let status = 2

switch status {
case 1:
    print("待处理")
case 2..<5:
    print("进行中")
case 5:
    print("已完成")
default:
    print("未知状态")
}


// 三元运算符
let result = age >= 18 ? "成年" : "未成年"

// if let 解包
let name: String? = "Tom"
if let name = name {  // 左边是解包后的新变量name，右边是外部的name
    print("名字是：\(name)")
} else {
    print("名字为空")
}


// guard let 提前退出
func greet(name: String?) {
    guard let name = name else {
        print("没有名字")
        return
    }
    print("你好，\(name)")
}
```

循环

```swift
let fruits = ["苹果", "香蕉", "橙子"]

// for in
for fruit in fruits {
    print(fruit)
}

// 带索引
for (index, fruit) in fruits.enumerated() {
    print("第 \(index + 1) 个：\(fruit)")
}

// 循环支持数组外，还支持range、字典、步进循环
for num in 1...3 {
    print(num) // 1、2、3
}

let scores = ["语文": 90, "数学": 95, "英语": 88]
for (subject, score) in scores { // 字典用for取出来的是元组，这里用的是结构
    print(subject, score) 
}

for i in stride(from: 0, to: 10, by: 2) {
    print(i)     // 输出 0, 2, 4, 6, 8
}
```

还支持while、break、continue，这里就不展开了

### 数组方法

```swift
let nums = [1, 2, 3, 4, 5]

// ----------- 修改原数组
// 增
nums.append(6) // 追加元素
nums.insert(0, at: -1) // 在0的位置插入-1
nums += [1, 2] // 拼接数组

// 删
nums.remove(at: 1) // 删除索引为1的元素

// 改
nums[0] = 99


// ----------- 不修改原数组，返回结果
// 常用操作
arr.count                  // 5，元素个数
arr.isEmpty                // false，是否为空
arr.first                  // Optional(3)，第一个元素
arr.last                   // Optional(5)，最后一个元素
arr.min()                  // Optional(1)，最小值
arr.max()                  // Optional(5)，最大值
arr.contains(4)            // true，是否包含某元素
arr.firstIndex(of: 4)      // Optional(2)，第一个匹配的索引

// 过滤
let evens = nums.filter { $0 % 2 == 0 }

// 映射
let squared = numbers.map { $0 * $0 }

// 聚合为单值
let sum = numbers.reduce(0, +)

// 排序
let sorted = [3, 1, 4, 2].sorted() // 递增
let descending = [3, 1, 4, 2].sorted(by: >) // 递减

// 切片
arr[1..<3] // [2, 3]，范围切片
```



### 错误处理

定义

```swift
// 抛出错误的函数必须标记 throws
func handleXX() throws -> Bool {
  // ...
  throw VendingMachineError.invalidSelection // 抛出错误
}

// 自定义错误，实现 Error 协议即可
enum VendingMachineError: Error {
    case invalidSelection                       // 不可选择
    case insufficientFunds(coinsNeeded: Int)    // 金额不足
    case outOfStock                             // 缺货
}
```

调用

```swift
// 调用时必须用 try 、try? 、try! 关键字

// 方式 1：最常用
func handleYY() throws { // 内部可能抛出错误，必须 throws
   try handleXXX()  
}

func handleYY() { // 错误被 catch 处理，没有继续 throw，handleYY 不会抛出错误
  do {
    let res = try handleXXX()  // 抛出错误则被 catch 捕获，否则 res 接收返回值
  } catch {
    print("错误 \(error)") 
  }
}

// 方式 2：希望错误传递下去
// 抛出错误 res = nil（其实就是 Optional.none），否则 Optional.some(结果)
// 因为不会抛出错误，所以 do...catch 没用
func handleYY() -> Bool? { // Bool? 等价于 Optional<Bool> ，以Optional的形式在函数调用中传递，在需要的地方解包使用
  let res = try? handleXXX() 
  return res
}

// 方式 3：当百分百确信不会错误才用
// 断言不会报错，如果抛出错误会直接崩溃 do...catch 都无法捕获
func handleYY() {
  let res =try! handleXXX()
}
```

try? 会产生 Optional，常用 guard 解包

```swift
guard let res = try? handleXX() else {
    // handleXX() 抛出错误 (res 是 nil)，这里只能知道抛出错误，拿不到 error，适用于不关心具体错误的情况
    print("调用失败或出错")
}

// 后续逻辑是没有抛出错误，res是解包后的值
```

### 异步

* await 异步函数 A ，阻塞线程后，线程让出控制权
* 当异步函数 A 完成后，会继续执行剩余代码

```swift
// handleXX 是个 async 异步函数
func handleYY() async -> {
  await handleXX()
}

// handleXX 是个 async 异步函数，还会抛出错误
func handleYY() async throw -> {
  try await handleXX()
}
```

补充：

```swift
func listPhotos(inGallery name: String) async throws -> [String] {
  	// 相当于JS 中， new Promsie 封装 setTimeout， Task.sleep 可以阻塞异步任务
  	// ⚠️ sleep 是 asyn、throws 的
    try await Task.sleep(for: .seconds(2))  
    return ["IMG001", "IMG99", "IMG0404"]
}
```

异步与并发深入：

* JS中异步函数最终来源于系统提供的 API，例如 fetch、readFile 等（开发者封装这些 API 的函数才是async 的），主线程调用异步函数后继续执行其他代码，异步函数完成后主线程继续执行后续代码

* Swift中异步函数最终来源于 Task、TaskGroup、Actor（称为可挂起点），主线程调用异步函数，这些异步函数都是在后台线程中运行。Swift 可以在其他线程创建复杂任务，在主线程异步调用结果，充分发挥多线程优势，而 JS 无法自定义

  注意：调用外部模块的异步函数 （例如 AlarmKit 的 await AlarmManager.shared.schedule()，其内部仍然来源于Task、TaskGroup、Actor创建的后台线程 。这个例子，异步schedule函数没在 Actor 中，Swift 认为这种异步函数属于 @concurrent ，即通用并发作用域，可以被多线程同时更改，会提示不安全 ）

### 并发

引入Task/ TaskGroup 的概念，Task比线程更轻量级，由执行器调度任务在 **全局并发执行器池** 中执行 

#### 创建任务

**方式 1：独立任务**

特点：当前作用域结束结束了，独立任务不会被终止（比较危险，内存泄露）

适用于：启动独立后台任务（如日志上传、预加载）

```swift
func startBackgroundWork() {
  	// ⚠️ 有个语法点需要记住：
  	// Task 的参数是个闭包，其类型是 () async -> Success ，所以传入一个 try await 函数是对的，不要写成 Task async throws {}
    let task = Task {
        try await Task.sleep(for: .seconds(5))
      	return "Done!"
    }
  
   	let result = try? await task.value  // .value 拿到结果
}
```

**方式 2：任务组**

在 Swift 中称为结构化并发，因为任务组中可以包含子任务，呈现结构关系

特点：

* body 结束，所有子任务都会结束（比独立任务安全）
* 所有子任务并发执行
* for await 可以从组中按完成顺序取出数据

**withTaskGroup**

子任务报错，不支持 throw 抛出

```swift
let photos = await withTaskGroup(of: Data.self) { group in
    // 拿到图片地址                                       
    let photoNames = await listPhotos(inGallery: "Summer Vacation")
        
    // 每一个图片创建一个下载任务                                             
    for name in photoNames {
      	// group 是一个任务组，把操作作为任务添加进去，并启动
        group.addTask {
            return await downloadPhoto(named: name) // 任务返回值
        }
    }
                           
    var results: [Data] = []
                
    // for await 语法
    // 这里阻塞线程，遍历任务组收集任务结果（这里是按照任务完成的顺序遍历的）
    for await photo in group {
        results.append(photo)
    }

    return results // 任务返回结果，即图片数据
}



```

**withThrowingTaskGroup**

使用 try ，如果任意子任务抛出错误，整个 group 会**取消其他任务**（协作式取消），并把错误抛给调用者

```swift
let photos = try await withThrowingTaskGroup(of: Data.self) { group in
                      
    let photoNames = await listPhotos(inGallery: "Summer Vacation")
                               
    for name in photoNames {
        group.addTask {
          	// 任务错误会被 runtime 捕获并暂存
            return try await downloadPhoto(named: name) 
        }
    }
                           
    var results: [Data] = []
                                                     
    // for try await 语法，遍历任务组时会把第一个发生的错误重新抛出
    for try await photo in group {
        results.append(photo)
    }

    return results 
}
```

#### 取消任务

Swift中取消是**协作式**的，即调用 `.cancel()` 不会强制终止任务，而是设置一个取消标志，任务内部必须主动检查并退出

**独立任务**

```swift
let task = Task {
    print("任务开始")
    do {  
      try await doWork() // 子任务
    } catch catch is CancellationError{
      print("任务被取消（抛出）")
    }
}

// 2 秒后取消
Task {
    try await Task.sleep(for: .seconds(2))
    task.cancel()  // ← 请求取消
}

// 子任务必须使用 Task.isCancelled ，才是可取消的
func doWork() async throw{
  for i in 1...10 {
        // 🔑 关键：主动检查是否被取消
        if Task.isCancelled {
            print("任务在第 \(i) 步被取消")
            return  // 或 throw CancellationError()
        }
        
        try await Task.sleep(for: .seconds(1))
        print("步骤 \(i) 完成")
    }
    
    print("任务正常完成")
}
```

**任务组**

任务组不能直接被取消，必须套一个独立任务，取消独立任务

```swift
let task = Task {
    await withTaskGroup(of: Void.self) { group in
        if group.addTaskUnlessCancelled { // 只能添加未取消的任务 
            // 任务中需要用 Task.isCancelled 来判断，终止执行
        }
    }
}

// 2 秒后取消
Task {
    try await Task.sleep(for: .seconds(2))
    task.cancel()  // ← 请求取消
}
```

#### Actor

使用 Actor 模型，通过 actor 关键字声明，是引用类型

```swift
actor TemperatureLogger {
    let label: String
    var measurements: [Int]
    private(set) var max: Int


    init(label: String, measurement: Int) {
        self.label = label
        self.measurements = [measurement]
        self.max = measurement
    }
  
  	// 追加温度，设置最高温迪
  	func update(with measurement: Int) {
        measurements.append(measurement)
        if measurement > max {
            max = measurement
        }
    }
}

// 实例化
let logger = TemperatureLogger(label: "Outdoors", measurement: 25)
```

外部访问：需要使用 await 关键字访问，同时只能有一个进程访问 actor 实例 ，如果没有拿到访问权 await 会挂起进程

```swift
await logger.max

await logger.update(with: 30)
```

内部修改：

* update 必须保证更新过程中，不能被外部反问。Actor 天生有这种能力，只要是同步代码就行是原子操作执行完后，外部才能获取访问权

* 如果是异步函数？

  ```swift
  func convertFahrenheitToCelsius() async {
    		let x = await getData()
    		// 只要保证更新数据时，是同步操作即可
        for i in measurements.indices {
            measurements[i] =  measurements[i] + x
        }
    }
  ```

#### Sendable

跨**并发域**的变量，其类型必须实现 Sendable 协议。Sendable 无需实现任何代码，只是标记告诉编译器该类型支持跨并发域，不会发生数据竞争

默认实现了 Sendable 的类型肯定不会发生数据竞争，默认的Sendable 类型都是值类型，跨并发域实际上是拷贝，2 个线程持有各自的数据

而像 Class 这种引用类型如果跨并发域，后台线程删除了数据，主线程操作数据就会报错。所以如果标记了 Class 为 Sendable 则需要开发者自己保证数据安全，比如：后台线程操作结束后，主线程再继续操作

##### 并发域

* **Task 、TaskGroup 子任务边界**

  ```swift
  Task {
      // ✅ data 必须实现 Sendable，否则不能安全传入 Task
      await someActor.process(data)
  }
  
  await withTaskGroup(of: Void.self) { group in
      group.addTask {
          //✅ 直接接收实现 Sendable 的局部变量
      }
  }
  ```

* **Actor 边界**

  ```swift
  actor MyActor {
      // ✅ 入参必须是 Sendable
      func process(data: MyData) { }  // ← 如果 MyData 不是 Sendable，编译错误！
  
      // ✅ 返参必须是 Sendable
      func getData() -> MyData { ... }
  }
  ```

* **@Sendable 闭包**

  ```swift
  let closure: @Sendable () -> Void = {
      print(sharedData) // sharedData 必须是 Sendable
  }
  ```

* **@concurrent 的异步函数**

  表示这个异步函数可以被多个线程并发调用，但是由于不在 Actor 中，多个线程可以并发的修改数据，Swift 默认认为不安全
  
  ```swift
  // @concurrent 修饰的异步函数（脱离 MainActor）
  @concurrent
  async func xx() {}
  
  // 不在 Actor 中的异步函数默认是 @concurrent 的
  // 对于很多三方库都是这种形式的，暴露出来一些异步函数供项目调用
  ```

##### MainActor

MainActor是个特殊的 Actor，与主线程绑定

Swift 编译器自动为项目内部模块中的所有代码都加上了 @MainActor 修饰符，这些数据、方法只能被主线程使用，所以不存在并发问题（ isolated MainActor ）

我们的主要代码都是隔离在 MainActor 中的，只有在我们手动引入并发（Task、TaskGroup、Actore、@concurrent）时才会出现跨并发域的情况

```swift
@Observable
class Counter {
    var value = 0
}

struct ContentView: View {
    let counter = Counter()

    var body: some View {
        Button("Increment") {
            Task {
                // ❌ 编译错误！不能在 Task 中直接改 MainActor 的变量
                counter.value += 1
            }
          
            Task {
              // ✅ 显式切回 MainActor 更新 UI 状态
              await MainActor.run {
                  counter.value += 1
              }

              // ✅ 因为 counter 是 @Observable，默认 MainActor，
              // 也可以直接 await 赋值（编译器会插入隐式切换）
              counter.value = counter.value + 1
            }
        }
    }
}
```

##### 自动实现了 Sendable

| 类型                       | 是否自动 Sendable | 条件                                                         |
| :------------------------- | ----------------- | ------------------------------------------------------------ |
| **值类型（struct, enum）** | ✅ 是              | 所有存储属性都是 `Sendable`                                  |
| **元组（tuple）**          | ✅ 是              | 所有元素都是 `Sendable`                                      |
| **基本类型**               | ✅ 是              | `Int`, `String`, `Bool`, `Double` 等                         |
| **Array, Dictionary, Set** | ✅ 是              | 元素/键值都是 `Sendable`                                     |
| **Actor**                  | ✅ 是              | 无                                                           |
| **类（class）**            | ❌ 否              | **除非显式声明为 `final` 且所有属性 `Sendable`，并手动 conform** |
| **闭包**                   | ❌ 否              | 除非标记为 `@Sendable`                                       |



##### 实践遇到的问题

实践中遇到一种情况，使用 AlarmKit 中的

```swift
@observable 
final class xx {
  typealias AlarmConfiguration = AlarmManager.AlarmConfiguration<ConfigType>
  
  func setAlarmSchedule(id: Alarm.ID, configuration: AlarmConfiguration) async throws  {
     let alarm = try await AlarmManager.shared.schedule(
        id: id,
        configuration: configuration
    )
    // 报错： Sending main actor-isolated 'configuration' to @concurrent instance method 'schedule(id:configuration:)' risks causing data races between @concurrent and main actor-isolated uses
    // 翻译：参数configuration从 MainActor 发送到了 @concurrent （并发执行域）
    // 在 Swift6 中，没有在 Actor 中的 async 异步方法，例如这里的schedule，都视为 @concurrent 即并发执行域。因为没有在 Actor 中，所以多个线程可以同时读写，数据不安全
  }
}
```

官方 Demo 的方案：

```swift
// 套了一个 Task 任务，编译器对捕获值采取宽松检查
Task {
    do {
        let alarm = try await AlarmManager.shared.schedule(
            id: id,
            configuration: configuration
        )
    } catch {

    }
}
```



## Swift UI 

### View

视图

```swift
// 组件需实现 View 协议
struct ContentView: View {
   	
  	// UI 在 body 中写，是计算属性，返回类型View
  	// Swift语法函数/计算属性只能返回一个值，但是@ViewBuilder修饰的会把结果合成一个
  	// 下面写法，其实是 @ViewBuilder var body: some View {} 
    var body: some View {
      	
    }
        
}
```

body中描绘UI，下面是条件、循环的写法

```swift
struct DemoView: View {
    @State private var isLoggedIn = false
    @State private var role: Role = .user
    @State private var fruits = ["🍎 苹果", "🍌 香蕉", "🍊 橙子", "🍇 葡萄"]

    enum Role {
        case admin, user, guest
    }

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 20) {

                // ========== 1. 条件判断 if / else ==========
                if isLoggedIn {
                    Text("✅ 已登录，欢迎回来！")
                        .foregroundStyle(.green)
                } else {
                    Text("❌ 未登录，请先登录")
                        .foregroundStyle(.red)
                }

                Button(isLoggedIn ? "退出登录" : "登录") {
                    isLoggedIn.toggle()
                }

                Divider()

                // ========== 2. 多分支 switch ==========
                switch role {
                case .admin:
                    Label("管理员面板", systemImage: "person.badge.key.fill")
                        .foregroundStyle(.red)
                case .user:
                    Label("普通用户面板", systemImage: "person.fill")
                        .foregroundStyle(.blue)
                case .guest:
                    Label("游客模式", systemImage: "person.crop.circle.badge.questionmark")
                        .foregroundStyle(.gray)
                }

                Picker("角色", selection: $role) {
                    Text("管理员").tag(Role.admin)
                    Text("普通用户").tag(Role.user)
                    Text("游客").tag(Role.guest)
                }
                .pickerStyle(.segmented)

                Divider()

                // ========== 3. 循环 ForEach，不支持for in/while ==========
                ForEach(fruits, id: \.self) { fruit in
                    HStack {
                        Text(fruit)
                        Spacer()
                        Image(systemName: "checkmark.circle")
                            .foregroundStyle(.green)
                    }
                    .padding(.vertical, 4)
                }

                Divider()

                // ========== 4. 带索引的循环 ==========
                ForEach(Array(fruits.enumerated()), id: \.offset) { index, fruit in
                    Text("第 \(index + 1) 个：\(fruit)")
                }

                Divider()

                // ========== 5. 条件 + 循环 组合 ==========
                if fruits.isEmpty {
                    Text("暂无数据")
                        .foregroundStyle(.gray)
                } else {
                    ForEach(fruits, id: \.self) { fruit in
                        Text("🏷️ \(fruit)")
                    }
                }
            }
            .padding()
        }
    }
}
```

最常见的是前端通过 struct 来声明视图，其实也可以通过函数返回

```swift
// 如果返回多个View，需要使用@ViewBuilder修饰
func makeCard(title: String, subtitle: String) -> some View {
    VStack(alignment: .leading) {
        Text(title).font(.headline)
        Text(subtitle).font(.subheadline)
    }
    .padding()
    .background(.gray.opacity(0.2))
    .cornerRadius(10)
}

// 使用
var body: some View {
    makeCard(title: "标题", subtitle: "副标题")
}
```

### 数据通讯

数据处理使用主流的 `@State`、`@Binding`、`@Observable`、`@Bindable` 和`@Environment`

```swift
// @Observable + Class
// Class是引用类型任何位置都是修改同一份数据，@Observable让修改对象属性修改出发视图更新
@Observable
final class AppState {
    var name: String
}

struct MyView: View {
    // ✅ let 外部传入，内部只读
    let title: String
    
    // var 外部传入，内部可改但改了不会触发刷新
    var subtitle: String
    
    // ✅ 属性包装器参数（外部传入，内部可读写，触发视图刷新）
  	@State var count: Int = 0  // 虽然语法上可传入数据源，但是不建议。一般用来持有视图自己的数据，比如创建AppState实例，注意：@State是监听变量变化，@Observable是监听对象内部属性的变化
    
  	@Binding var isOn: Bool    // 接收外部传入Binding<xxx>，例如父级 @State isOn: Boole，传入$isOn。修改同步影响外部
    
    @Bindable var model: Model // 接收外部传入Observable实例。修改同步影响外部
  
    @Environment(AppState.self) var appState // 接收全局的环境变量，如果接收Observable实例，直接修改就能更新
}


// 默认变量，除了@State外都是组件的必传属性。如果设置了下面2种情况也可以不传
// 1、可选属性：通过类型控制，例如 let title: String?
// 2、默认属性：let title = "xxxx"
MyView(title: 'xx', subtitle: 'xxx', isOn: true)
```

#### 最佳实践

业务数据（相当于 Store）

```swift
// LandmarkModel.swift

// 1、使用 @Observable + Class ，跨 View 传递
@Observable
final class LandmarkModel {
    var name: String
    var isFavorite: Bool
}
```

APP 入口

```swift
// LandmarksApp.swift
import SwiftUI

@main
struct LandmarksApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}


// View/ContentView.swift
import SwiftUI

struct ContentView: View {
    @Environment(ModelData.self) var modelData
    
    var body: some View {
      	// 2、注入业务数据，子 View 共享业务数据
        LandmarkListView().environment(LandmarkModel())
    }
        
}
```

列表页面

```swift
// Views/LandmarkListView.swift
struct LandmarkListView: View {

  	// 3、页面状态使用 @State +  private 私有 (值类型，只读时直接使用showFavoritesOnly，如需双向绑定使用$showFavoritesOnly，本质返回了Binding<Bool>)
    @State private var showFavoritesOnly = false
  
  	// 4、业务数据使用 @Observable + Class （Class 是引用类型，无需$）
  	@Environment(LandmarkModel.self) var models // 读取注入的业务数据

    var filtered: [LandmarkModel] { // ⚠️ 计算属性处理后的值，仍然是引用，所有具有响应性
        showFavoritesOnly
            ? models.filter { $0.isFavorite }
            : models
    }

    var body: some View {
        List {
          	// 组件类型1:
          	// Toggle组件切换开关，会修改父级状态
          	// 传入 $XXX 传递引用，内部@Binding绑定到子视图变量，修改该变量可影响源数据
            Toggle("Favorites only", isOn: $showFavoritesOnly)

            ForEach(filtered) { model in
                NavigationLink {
                  	// 组件类型2: 例子参考下面“详情页面”
                  	// 修改的是引用类型，内部 @Bindable 绑定到子视图变量，修改该变量可影响源数据
                    LandmarkDetail(model: model)
                } label: {
                    LandmarkRow(model: model)
                }
            }
          
          	// 组件类型3: 例子参考下面“草稿页面”
            // 传入引用类型，子视图一旦改动就会更新源数据。可以子视图 init 中创建新实例作为子视图状态初始值。这样 子视图修改数据都不会影响源数据 （ 用于编辑视图，保存再去更新元数据）
        }
    }
}

```

详情页面

```swift
// Views/LandmarkDetail.swift
struct LandmarkDetail: View {
  	// 5、对于 @Observable + Class 数据，需要 @Bindable 绑定后使用 （@Observable只是监听对象，@Bindable是绑定到子视图变量 var model，这样才能操作数据）
    @Bindable var model: LandmarkModel

    var body: some View {
        Toggle("Favorite", isOn: $model.isFavorite) // 数据是双向数据绑定，可以直接更新源数据
    }
}
```

草稿页面

```swift
// Views/Draft.swift
struct Draft: View {
  	// @State 必须给默认值
    @State private var draft: LandmarkModel = LandmarkModel(
        name: "",
        isFavorite: false
    )
  	init(landmarkModel: LandmarkModel) {
      // @State 变量不能直接操作，必须 _xxx = State(initialValue: 数据)
      _draft = State(
        initialValue: LandmarkModel(
          name: landmarkModel.name
          isFavorite: landmarkModel.isFavorite
        )
    }
      )
    var body: some View {
        // 操作 draft 不会影响源数据
    }
}
```

#### @Observable

Class 是引用类型，可以直接修改数据，但是如果希望触发视图更新显示新数据，就必须借用 @Observable

```swift
@Observable
final class LandmarkModel {
  	// Observable 可以感知值类型变更
    var name: String
    var isFavorite: Bool
  	var friends: [String] 
  	var coordinates: Coordinates
    struct Coordinates: Hashable { 
        let latitude: Double
        let longitude: Double
    }
  
  	// 如果是引用类型，则必须用@Observable修饰
  	var scoreList: [Score]  // 数组操作不必 Observable，但是对引用类型元素就必须 Observable
}

@Observable
final class Score {
  var name: String
  var level: String
}
```

如果接口返回的数据是个很深的 json 数据，难道要一层一层的写 @Observable 吗？

Vue 中一般直接使用全量接口数据，而 Swift 不推荐将全局数据写入 Model，而是按需使用返回值构造数据，只在需要的地方 @Observable 

```swift
// 使用第三方库请求数据，在 Package.swift 加入如下依赖
.package(url: "https://github.com/Alamofire/Alamofire.git", from: "5.6.0")

// 定义 DTO 描述接口
import Foundation

struct LandmarkDTO: Decodable {
    let id: Int
    let name: String
}


// 定义 Entity 数据 （数据不一定和 DTO 一致，自己按照业务构造）
import Foundation
import Observation

@Observable
final class LandmarkEntity {
    let id: Int
    var name: String
    
    init(dto: LandmarkDTO) {
        self.id = dto.id
        self.name = dto.name
    }
}


// 在 Model 中请求数据，DTO -> Entity
import Foundation
import Alamofire

@Observable
final class ModelData {
    var landmarks: [LandmarkEntity] = []
    
    func fetchLandmarks() {
        let url = "https://example.com/api/landmarks"
        
        AF.request(url)
            .validate()
            .responseDecodable(of: [LandmarkDTO].self) { response in
                switch response.result {
                case .success(let dtos):
                    // DTO -> Entity
                    self.landmarks = dtos.map { LandmarkEntity(dto: $0) }
                case .failure(let error):
                    print("Error fetching landmarks: \(error)")
                }
            }
    }
}

```

### 预设

尺寸预设，设置通过 font 可以设置字体大小

```swift
Text("Large Title").font(.largeTitle);
Text("Title").font(.title);
Text("Title 2").font(.title2)
Text("Title 3").font(.title3);
Text("Headline").font(.headline);
Text("Subheadline").font(.subheadline)
Text("Body").font(.body);
Text("Callout").font(.callout);
Text("Footnote").font(.footnote)
Text("Caption").font(.caption);
Text("Caption 2").font(.caption2)

//
Text("自定义尺寸").font(.system(size:10))
```

![image-20260920002402676](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/202609200024037waEoM.png)

颜色预设：primary、secondary、tertiary 从深到浅定义了三级颜色，会根据深浅模式系统自动分配实际颜色

```swift
Text("主要颜色").foregroundStyle(.primary)
Text("次要颜色").foregroundStyle(.secondary)
Text("三级颜色").foregroundStyle(.tertiary)

// 
Text("自定义颜色").foregroundStyle(.blue)
```

![image-20260921145101465](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20260921145102dGEpjl.png)

### 基础组件

#### 文案

Text 文案

```swift
// 尺寸为文字宽度，如果操过父容器，文字会换行
Text("你好")
	.bold()  //加粗
	.italic() // 斜体
	.underline() // 下划线
	.font(.system(size: 20)) // 字号20
	.foregroundStyle(.primary) // 字颜色
	.lintLimit(2) // 设置行数，超出部分显示...
	.multilineTextAlignment(TextAlignment.center) // 文字不满一行位置，leading靠左、center中间、trailing靠右
	.textSelection() // 设置文字可选

// 格式化显示
Text(12345.67, format: .currency(code: "CNY"))
```

Label 图标+文案

```swift
Label("收藏", systemImage: "star.fill")
	.foregroundStyle(.blue)
	.font(.title)
```

LabeledContent 标签和值

![image-20260920001236753](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20260920001237hjVxg2.png)

```swift
LabeledContent("版本", value: "1.0.0")

// 自定义value
LabeledContent("状态") { 
	Label("已连接", systemImage: "checkmark.circle.fill").foregroundStyle(.green) 
}

// 自定义label & value
LabeledContent { ProgressView(value: 0.72) } label: { Text("存储空间") }
```

#### 图片

Image

```swift
Image(systemName: "cloud.sun.rain.fill")
	.font(.system(size: 46))
	.symbolRenderingMode(.multicolor)

Image(systemName: "wifi", variableValue: 0.1)
	.font(.system(size: 46))
	.foregroundStyle(AtlasStyle.accent)

// 图片
Image(systemName: "photo.artframe")
	.resizable()  // 默认图片尺寸，resizable可以
	.scaledToFit()
	.frame(height: 100)
	.foregroundStyle(AtlasStyle.accent.gradient)
```

#### 交互组件

##### Toggle

```swift
Toggle("通知", isOn: $enabled).onChange(of: enabled) { oldValue, newValue in
   // 监听enabled变化                                                    
}

Toggle(isOn: $enabled) { 
 	// 自定义
  Label("同步到云端", systemImage: "icloud") 
}.toggleStyle(.switch)

// 按钮样式
Toggle("按钮样式", isOn: $enabled).toggleStyle(.button)
```

![image-20260920003832775](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20260920003833ol2Qio.png)

##### Button

Button、EditButton 

```swift
Button("文案", systemImage: "sparkles") {  // 图标可省略
  count += 1  // 触发逻辑
}
	.controlSize(.small) // 设置尺寸
	.buttonStyle(.borderedProminent) // .plain、.bordered、.borderedProminent 样式如下
```

![image-20260920005433122](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20260920005433arhgiP.png)

##### ShareLink

分享按钮

```swift
ShareLink(
    item: "分享的文案",  // 分享的内容：文案、链接、图片、文件URL
  	// item: Image(systemName: "swift")
    preview: SharePreview("我的分享标题") // 分享菜单标题
) {
    Label("分享", systemImage: "square.and.arrow.up")
}
```

![image-20261008144032193](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20261008144100Apmd6B.png)

#### 其他

Divider 分割线、Spacer 占据父容器剩余空间



### 导航 & 工具组件

#### Navigation

NavigationStack

```swift
struct NavigationLinkExamples: View {
    var body: some View {
      	// NavigationStack 是页面栈，内部的NavigationLink定义下一个入栈页
      	// navigationDestination 是NavigationStack的方法，接收内部NavigationLink传出的值
          NavigationStack {
            VStack(spacing: 16) {
              	// 方式1: 设置按钮文案，点击进入二级页面
                NavigationLink("按钮1") { 
                  Text("二级页面").font(.largeTitle)
                }
              	// 方式2:
                NavigationLink(value: 42) {
   									// 自定义的按钮，点击后把value传到外层的navigationDestination
                    Label("值驱动：42", systemImage: "number")
                }
          }.navigationDestination(for: Int.self) { 
              // 方式2的二级页面在这这里
              Text("数值：\($0)") 
          }.padding()
        }.frame(minHeight: 220)
    }
}
```

NavigationSplitView

```swift
struct ContentView: View {
    @State private var list: [String] = ["收件箱", "收藏", "归档"]
    @State private var selected: String? = "收件箱"
  
  	@State private var contentList: [(String, String)] = [
        ("收件箱", "测试数据1"),
        ("收件箱", "测试数据2"),
    ]
    var body: some View {
        NavigationSplitView {
            // 侧边栏
            List(list, id: \.self, selection: $selected) {
              Label($0, systemImage: "folder")
            }
          
        } content: {
              // 二级栏 (可省略这列)
          		// 一般都是通过读取第一个选中的，计算content列数据
          		// var selectedList: [(String, String)] = contentList.filter {$0.0 == selection}
              ContentUnavailableView("暂无", systemImage: "tray.full")
          
        } detail: {
              // 内容区
              ContentUnavailableView("收件箱", systemImage: "tray.full")
        }
    }
}
```

Macos：

![image-20260919232713405](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20260919232714M2JNcZ.png)

IOS：类型IOS备忘录，打开APP展示Sider，点击某项导航到Content，再点击某项导航到Detail

#### List

List 入参可迭代对象，id必须是子元素

```swift
@State private var list: [String] = ["收件箱", "收藏", "归档"]
// id 是路径，表示点击子项后，把哪个值给$selected 
List(list, id: \.self, selection: $selected) {
  Label($0, systemImage: "folder")
}
```

如果遍历的枚举元素不是简单类型，需要 tag 指定点击后赋值给 $selected 的值

```swift
@State private var list: [(int,String)] = [
  	(1, "收件箱"), 
  	(2, "收藏"), 
  	(3, "归档")
]

// List不指定id
List(list, selection: $selected) {
  Label($0, systemImage: "folder").tag($0.0)
}

// ForEach
List(selection: $selected) {
    ForEach(list, id: \.0) { 
        Label($0.1, systemImage: "folder")
            .tag(item.0) // 设计点击后的id
    }
}
```

#### TabView

```swift
struct TabExamples: View {
    @State private var selection = "home"
    var body: some View {
        TabView(selection: $selection) {
            Tab("首页", systemImage: "house", value: "home") { 
              ContentUnavailableView("首页", systemImage: "house.fill") 
            }
            Tab("收藏", systemImage: "star", value: "favorite") { 
              ContentUnavailableView("收藏", systemImage: "star.fill") 
            }
            Tab("设置", systemImage: "gear", value: "settings") { 
              ContentUnavailableView("设置", systemImage: "gearshape.fill") 
            }
        }.frame(minHeight: 300)
    }
}
```

Macos：

![image-20260915195251141](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20260915195251wgXCSa.png)

IOS：

![image-20260920000746901](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20260920000747fT7ZEJ.png)

#### ToolBar

```swift
NavigationStack {
        ContentUnavailableView("工具栏示例", systemImage: "wrench.and.screwdriver")
            .toolbar {
                ToolbarItem { 
                  Button("新增", systemImage: "plus") {} 
                }
                ToolbarItemGroup { 
                  Button("上移", systemImage: "chevron.up") {}; 
                  Button("下移", systemImage: "chevron.down") {} }
            }
            .navigationTitle("标题") // 配置标题
    }
    .frame(height: 300)
```

![image-20260915201534047](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20260915201534gADNUQ.png)

#### Search

### 提示组件

#### Menu

```swift
// 嵌套的菜单
Menu("排序", systemImage: "arrow.up.arrow.down") { 
  Button("按名称") {}; 
  Button("按日期") {}; 
  Divider();  // 分割线

	Menu("方向") { 
    Button("升序") {}; 
    Button("降序") {} 
	} 
}
```

![image-20260920003459487](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20260920003459kvYjai.png)



#### Alert

```swift
struct AlertExamples: View {
    @State private var showing = false
    var body: some View {
        Button("显示 Alert", systemImage: "exclamationmark.triangle") { 
          showing = true 
        }
      	.buttonStyle(.borderedProminent)
        .alert("保存更改？", isPresented: $showing) { // 弹窗标题， 控制是否出现
            Button("保存") {}
            Button("取消", role: .cancel) {}
        } message: { 
          Text("更改会同步到其他设备。")  // 弹窗内容
        }
    }
}
```

![image-20260920001808592](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20260920001808LEprLO.png)



#### Sheet

```swift

```

### 容器组件

HStack（水平）、VStack（竖直）、ZStack （层叠）

LazyHStack、LazyVStack 懒加载

Grid 网格布局、LazyGrid懒加载

```swift
```



ScrollView 超出滚动、ScrollViewReader

```
```



#### Section

放在 List、Form里，分割开不同的功能区

```swift
Section { 
  Text("账户"); 
  Text("通知") 
} header: { 
  Text("设置") 
} footer: { 
  Text("Section 为 List 和 Form 提供语义分区。") 
}
```

（原图未随仓库提供：`image-20260928155758269.png`）

### 条件编译

平台名

```
iOS
macOS
```

限制平台

```swift
#if os(iOS)
  xxxx         
#else
	yyyy
#endif
```

限制版本

```swift
// 函数、类、结构体等
@available(iOS 26, *) // * 表示其他平台不做版本限制
func useNewFeature() {
    
}

// 视图内部
if #available(iOS 26, *) {
    
}
```



## XCode

```shell
command + R  # 重新run
command + Shift + L 打开文档弹窗
command + Shift + Option + L 独立窗口打开文档
```

