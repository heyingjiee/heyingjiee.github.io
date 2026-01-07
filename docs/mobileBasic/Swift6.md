# Swift6

## Swift6语法

* 中文文档：https://doc.swiftgg.team/documentation/the-swift-programming-language
* Array、Dictionary 类型的方法：https://developer.apple.com/documentation/swift/array

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
* 当异步函数 A 完成后，会继续执行剩余代码（Swift 是多线程的，唤醒哪个线程继续执行是由**运行时任务调度器 **）

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

在 JS 中异步任务的最终来源都是语言内置的 API，例如 setTimeout 、fetch。而 Swift 中开发者可以通过创建任务、Actor 来创造异步函数

### 并发

引入任务/任务组 的概念，Swift 以任务为单位，并发执行任务

将 异步/同步函数加入任务即可实现并发

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

默认实现了 Sendable 的类型肯定不会发生数据竞争，而像 Class 这种引用类型则需要开发者自己保证

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

* **脱离 MainActor 的并发执行**

  MainActor是个特殊的 Actor，它绑定到主线程（main thread）

  UI上下文运行在 MainActor 上

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

* **@Sendable 闭包**

  ```swift
  let closure: @Sendable () -> Void = {
      print(sharedData) // sharedData 必须是 Sendable
  }
  ```

* **全局函数与异步上下文之间**

  ```swift
  // 如果这个全局变量会被多个 Task/actor 读写
  var globalCache: [String: MyData] = [:] // ← MyData 必须是 Sendable
  ```

##### 自动实现了 Sendable

| 类型                       | 是否自动 Sendable | 条件                                                         |
| :------------------------- | ----------------- | ------------------------------------------------------------ |
| **值类型（struct, enum）** | ✅ 是              | 所有存储属性都是 `Sendable`                                  |
| **元组（tuple）**          | ✅ 是              | 所有元素都是 `Sendable`                                      |
| **基本类型**               | ✅ 是              | `Int`, `String`, `Bool`, `Double` 等                         |
| **Array, Dictionary, Set** | ✅ 是              | 元素/键值都是 `Sendable`                                     |
| **类（class）**            | ❌ 否              | **除非显式声明为 `final` 且所有属性 `Sendable`，并手动 conform** |
| **闭包**                   | ❌ 否              | 除非标记为 `@Sendable`                                       |

##### 实践遇到的问题

实践中遇到一种情况，使用 AlarmKit 中的

```swift
@observable 
final class xx {
  private let alarmManager = AlarmManager.shared
  
  func requestAuthorization11() async throws -> AlarmManager.AuthorizationState{
     return try await alarmManager.requestAuthorization()
     // 报错
     // Sending main actor-isolated 'self.alarmManager' to @concurrent instance method 'requestAuthorization()' risks causing data races between @concurrent and main actor-isolated uses
    
    // self.alarmManager 从  MainActor 到 @concurrent（通用并发执行域）
  }
}
```

补充下：在 Swift6 中，没有在 Actor 中的 async 异步方法，都视为 @concurrent 即并发执行域

## Swift UI 

### 视图数据通讯 - 最佳实践

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
        LandmarkList().environment(LandmarkModel())
    }
        
}
```

列表页面

```swift
// Views/LandmarkListView.swift
struct LandmarkListView: View {

  	// 3、页面状态使用 @State +  private 私有（值类型需通过$获取引用）
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
          	// 需要修改父级状态，则 $XXX 传递引用，内部 @Binding 绑定到子视图变量，修改该变量可影响源数据
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



### 数据层结构 - 最佳实践

```
```

### @Observable

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

