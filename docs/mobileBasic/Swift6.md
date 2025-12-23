# Swift6

## Swift6语法

* 中文文档：https://doc.swiftgg.team/documentation/the-swift-programming-language
* Array、Dictionary 类型的方法：https://developer.apple.com/documentation/swift/array

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

    var filtered: [LandmarkModel] { // 计算属性处理后的值，仍然是引用，所有具有响应性
        showFavoritesOnly
            ? models.filter { $0.isFavorite }
            : models
    }

    var body: some View {
        List {
            Toggle("Favorites only", isOn: $showFavoritesOnly)

            ForEach(filtered) { model in
                NavigationLink {
                    LandmarkDetail(model: model)
                } label: {
                    LandmarkRow(model: model)
                }
            }
        }
    }
}

```

详情页面

```swift
// Views/LandmarkDetail.swift
struct LandmarkDetail: View {
  	// 5、对于 @Observable + Class 数据，需要 @Bindable 绑定后使用 （@Observable只是监听对象，@Bindable是绑定视图，这样对象变化视图才能更新）
    @Bindable var model: LandmarkModel

    var body: some View {
        Toggle("Favorite", isOn: $model.isFavorite) // 数据是双向数据绑定，可以直接更新源数据
    }
}
```

不推荐的用法：

```
Swift6 推荐"是否可变"不再是调用点的责任，而是类型的责任

虽然 List 中 @State 也可以通过$取到引用传递子组件，然后子组件使用 @Binding 绑定到视图，但是不推荐 
调用时加不加$会影响子组件更新源数据，这不符合 Swift6 思想
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

