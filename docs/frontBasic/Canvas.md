# Canvas

参考资料：

* Canvas API ：https://www.canvasapi.cn/
* Suika 作者的文章
  * 集合：https://blog.fstars.wang/graphics-editor/archive.html
  * Canvas 相关：https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzI0NTc2NTEyNA==&action=getalbum&album_id=2254820309096906756&scene=173&subscene=&sessionid=svr_4f7cb89e66e&enterid=1755068512&from_msgid=2247483942&from_itemidx=1&count=3&nolastread=1#wechat_redirect

## 尺寸与坐标系

**尺寸**

* style尺寸：页面显示的画布尺寸
* Canvas尺寸：单位是 CSS 像素（px），如果包含小数会自动取整

Canvas 尺寸会缩放到 style 尺寸，可以想象成 图片实际尺寸被缩放到 style 指定的宽高。建议保持一致

通常 Canvas 绘制会出现模糊，这主要是因为设备像素与 CSS 像素不匹配导致的：

```js
const ratio = window.devicePixelRatio || 1;  // 设备像素比=物理像素/css像素（即1个css像素，占据几个实际像素）

// 将 Canvas 尺寸放大
canvas.width = 315 * ratio;
canvas.height = 464 * ratio;

// 绘制的内容默认放大
ctx.scale(ratio, ratio);

// 因为都是等比例放大的，后续 Canvas API 的坐标仍然使用原始坐标
// 例如 : 绘制点(315,0) 仍然是画布右上角（scale会自动按ratio放大到对应位置）
```

**坐标系**

以  Canvas 左上角为原点，水平向右为 x 轴正向，竖直向下为 y 轴正向。Canvas API 中传入的入参 x、y 值都是是 Canvas 尺寸

![canvas坐标系](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/JS/20230506170147%20.png)

```html
<canvas 
    style="width:100px; height:100px"
    width="500" height="500"   
></canvas>
```

## 绘制

### 绘制样式

前面绘制图像里只是简单的设置 填充、描边的颜色，这里列举出来其他属性

#### 填充 fill

设置填充颜色后，使用 fill 、fillRect 、fillText 方法填充

**填充纯色**

```js
ctx.fillStyle = 'red';
```

**填充图片**

```js
let img = new Image(); 
img.src = 'path/to/your/image.jpg'; // 设置图像源

img.onload = function() {
  
  	// 方式 1：创建图案对象
    let pattern = ctx.createPattern(img, 'repeat'); 
  	// 参数1: 支持 <img>元素、<video>元素，例如捕获摄像头视频产生的图像信息、<canvas>、CanvasRenderingContext2D、ImageBitmap、ImageData、Blob
  	// 参数2: 重复方式 repeat、repeat-x、repeat-y、none-repeat 。 不支持类似 cover|contain 拉伸方式
    ctx.fillStyle = pattern; // 将填充样式设置为图案对象
    
    // 绘制并填充一个矩形
    ctx.fillRect(10, 10, 150, 100); // 使用设置的图案对象作为填充样式来绘制矩形
  
  	// 方式2：参考后面的【绘制图片】章节。 将图片绘制到 canvas ，然后传入createPattern绘制到指定区域
};
```

**线性渐变**

```js
let gradient = ctx.createLinearGradient(100, 100, 300, 100)
// 参数：(起点x、起点y)，(终点x、终点y)

gradient.addColorStop(0, 'red') 	// 0 是设置起点颜色
gradient.addColorStop(1, 'green') // 1 是设置终点颜色，  
																	// 两点连线区域是过渡区，起点左侧是红色、终点右侧是绿色

//指定填充区域颜色
ctx.fillStyle = gradient

//绘制矩形填充区域
ctx.fillRect(100, 100, 200, 200)
```

![线性渐变](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/JS/20230506175502%20.png)

**径向渐变**

```js
let radialGradient= ctx.createRadialGradient(200,200,0,200,200,150)
// 前3个参数：内圆的x坐标、y坐标、半径
// 后3个参数：外圆的x坐标、y坐标、半径

radialGradient.addColorStop(0,'red') 		// 0 是内圆，表示内圆内部红色
radialGradient.addColorStop(1,'green') 	// 1 是外圆，表示外圆外部是绿色，
																				// 两圆直接过渡区域是红->绿渐变


ctx.fillStyle=radialGradient

ctx.fillRect(100, 100, 200, 200)
```

![image-20230506180727228](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/JS/20230506180727%20.png)

**锥形渐变**

```js
let conicGradient= ctx.createConicGradient(0*(Math.PI/180),200,200)
// 参数：起始弧度（公式：PI/180*目标度数=目标弧度）、中心x坐标、y坐标
// 从起始弧度顺时针旋转到起始位置

conicGradient.addColorStop(0,'red') // 0 是设置起点颜色
conicGradient.addColorStop(1,'green') // 1 是设置终点颜色，中间是过渡区

ctx.fillStyle=conicGradient

ctx.fillRect(100, 100, 200, 200)
```

![image-20230506182608800](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/JS/20230506182609%20.png)

#### 描边 stroke

设置描边样式后，使用 stroke 、strokeRect 、strokeText 方法绘制

```js
// 描边颜色 
ctx.strokeStyle = "color";  // 同样支持 颜色、渐变、图片（通过 createPattern）

// 描边线宽 
ctx.lineWidth = 4;  // 宽 4px

// 线条末端样式 
ctx.lineCap =   // butt 平头(默认) 、round 突出圆角 、 square 突出平头 https://www.canvasapi.cn/CanvasRenderingContext2D/lineCap
  
// 2 个线条相交时，拐角样式
ctx.lineJoin =  // round 圆角、 bevel 平头 、 miter 尖头(默认)  https://www.canvasapi.cn/CanvasRenderingContext2D/lineJoin#&syntax
  
// 线条 默认实线，也可设置为虚线
ctx.setLineDash([10, 5]);  //  [实线长度, 间隙长度]
ctx.lineDashOffset = 0; // 实线位置偏移
```

#### 剪裁 clip

```js
const img = new Image();
img.src = './xxx.jpg';
img.onload = function () {
    // 剪裁路径是三角形
    ctx.beginPath();
    ctx.moveTo(20, 20);
    ctx.lineTo(200, 80);
    ctx.lineTo(110, 150);
    // 剪裁区域，后续操作只有区域内可以显示 。 向前找最近 1 次 beginPath() 绘制的区域为裁剪区域
    ctx.clip();
  
    // 填充图片 （只有三件形区域的图片显示出来）
    ctx.drawImage(img, 0, 0, 250, 167);
};
```

### 绘制图形

Canvas API 只提供了矩形（Rect）相关的绘制函数，其他图形需要通过 **线段绘制区域 **的方式

```js
// 获取上下文 
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d'); // 后续绘制操作都是基于这个上下文
```

#### 矩形框

```js
ctx.fillStyle = 'red'; // 设置填充颜色
ctx.fillRect(10 , 10, 200, 100); // 绘制矩形框 + 填充 （参数：起点x、起点y、宽、高）

ctx.strokeStyle = 'black'; // 设置描边颜色
ctx.strokeRect(10, 10, 200, 100); // 绘制矩形描边（参数：起点x、起点y、宽、高）
```

#### 绘制直线形状

```js
ctx.beginPath(); 

// 绘制区域
ctx.moveTo(20, 20); // 抬起笔，否则会和上一个点连在一起
ctx.lineTo(60, 20); // 画直线，起点是上一个点，重点是(60, 20)
ctx.lineTo(40, 40); 

// 填充
ctx.fill();

// 描边
ctx.stroke(); 

ctx.closePath();
```

#### 绘制圆形曲线

```js
ctx.beginPath(); // 开始绘制 beginPath、closePath  为一对，建议每个图形都用它们包裹起来

// 绘制区域
ctx.arc(100, 40, 20, 0, Math.PI * 2); // 绘制圆形曲线 

// 填充
ctx.fillStyle = 'red'; // 设置填充颜色。默认黑色
ctx.fill(); 

// 描边
ctx.strokeStyle='green' // 设置描边颜色。默认黑色
ctx.stroke(); 

ctx.closePath();
```

arc 函数绘制曲线

```js
arc(x,y,radius,startAngle,endAngle,counterclockwise)

  * x,y 圆心
	* radius 半径
  * startAngle、endAngle 起/终点角度 （0 对应圆最右侧的点 ）
  * counterclockwise 默认 false 顺时针
```

#### 绘制贝塞尔曲线

参考：https://mp.weixin.qq.com/s?__biz=MzI0NTc2NTEyNA==&mid=2247483942&idx=1&sn=a69f52b3edc2fe1fb505173832441b9b&chksm=e948c74dde3f4e5b6529c57114742d3784658559c37bc6bcf05cd89e19b904bd1f5a0c21453c&scene=178&cur_album_id=2254820309096906756&search_click_id=#rd

### 绘制图片

drawImage 非常强大，参数信息：

* image 图像 （必传参数）
* dx，dy，dWidth，dHeight ，表示在Canvas画布上划出一片区域用来放置图片
	* dx，dy 为区域左上角坐标（必传参数）
	* dWidth，dHeight 区域宽高（可选参数，默认为下面参数指定裁剪后的图片尺寸），图片会被拉伸满足这个区域的宽高
* sx，sy，sWidth，sHeight，你可以理解为对原始图片的剪裁（可选参数）
  * sx，sy 以图片左上角为原点，设置裁剪区域左上角
  * sWidth和sHeight 为裁剪图片的尺寸
  * 默认值：不指定就是不裁剪

示意图：

![mdn 上示意图](https://www.canvasapi.cn/assets/images/docs/drawImage/explain.jpg)

参数 1图像的来源主要分为 2 类：

* image、video、canvas 

  渲染图片

  ```js
  const img = new Image();  // 创建 HTMLImageElement 对象，等价于 <img> 
  img.src = './watermelon.jpg';
  
  img.onload = function() {
    ctx.drawImage(img, 300, 0); // 将图片绘制到画布的 (300, 0) 位置。
  }
  ```

  视频截图

  ```html
  <video id="video" width="180" height="314" autoplay autobuffer muted>
      <source src="./sing-song.mp4" type="video/mp4">
  </video>
  <input type="button" id="button" value="截取视频">
  <canvas id="canvas" width="180" height="314"></canvas>
  
  <script>
  var context = canvas.getContext('2d');
  // 按钮
  button.addEventListener('click', function () {
      context.clearRect(0, 0, 180, 314);
      context.drawImage(video, 0, 0, 180, 314); 
    	// video 是 HTMLVideoElement ，可以 new video() 创建，也可以读取 dom 元素
    	// 注意：在现代浏览器中，如果一个 HTML 元素有 id 属性，浏览器会自动在 window 对象上创建一个同名的全局变量，并将其指向该 DOM 元素
  
  });
  </script>
  ```

* ImageBitmap

  ImageBitmap 是位图图像，通过 [createImageBitmap()](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/createImageBitmap)创建 。Canvas 渲染这种数据是无延迟、高性能的。这主要是因为：

  * 浏览器拿到了压缩的图像字节流（如 JPEG, PNG 的数据），需要将这些压缩数据**解码**成 GPU 能直接处理的像素数据（通常是 RGBA 格式）。这个**解码过程是 CPU 密集型的**，对于大图或高分辨率图，可能需要几十甚至上百毫秒
  * 上传到 GPU：解码后的像素数据需要从 CPU 内存复制到 GPU 显存，这个过程也可能有开销

  ImageBitmap 显然少了解码这个过程

  

模拟实现 contain、cover、fill 填充：

本质是改变 image 宽高已适配绘制区域宽高，参考[文章](https://mp.weixin.qq.com/s?__biz=MzI0NTc2NTEyNA==&mid=2247483971&idx=1&sn=e67ee2754c2cd19c5538bd43d0067bfc&chksm=e948c728de3f4e3ee9e0f749ad4edb49ff080142c181b184d13b182908fbdb1aa5263329f69b&scene=178&cur_album_id=2254820309096906756&search_click_id=#rd)

### 绘制文字

在Canvas中绘制文字，可以实现  **阻止用户复制**  的需求

* Canvas 提供 measureText 方法，可以返回文字宽度。这是 Dom做不澳大

```js
// 其他字体属性
ctx.font = '48px serif'; // css font 一致，必须指定font-size 和 font-family 
ctx.textBaseline = 'top'; // 基线

// 填充
ctx.fillStyle = '#5391F5'; // 蓝色
ctx.fillText('Hello Canvas!', 10, 10); // 填充文字

// 描边
ctx.lineWidth = 2;
ctx.strokeText('Hello Canvas!', 10, 10); // 描边文字

// 对齐
ctx.textAlign ='left' // left 、right 、 center


// 返回文字布局信息，例如：字宽
ctx.measureText("你好")  // 返回值TextMetrics对象。 https://developer.mozilla.org/zh-CN/docs/Web/API/TextMetrics
```

### 绘制重叠

#### 重叠效果

ctx.globalCompositeOperation 是用来设置绘制重叠的效果

默认是：新绘制的内容覆盖就的内容

其他属性值参考：https://www.canvasapi.cn/CanvasRenderingContext2D/globalCompositeOperation#&examples

常见的刮刮卡效果、橡皮擦除效果，可以设置为 **destination-out** ，就能保证用户新绘制的内容有擦除效果

#### 擦除区域

相同区域多次绘制，默认情况下会出现重叠现象，一般会擦除画布后在绘制新的内容

```js
// 擦除指定矩形区域
ctx.clearRect(x, y, width, height);

// 擦除整个 canvas
ctx.clearRect(0, 0, canvas.width, canvas.height);
```

### 属性存档、还原

Canvas API 设计中，设置大量全局属性后才调用绘制，而不是在绘制函数中传入属性

```js
ctx.fillStyle = 'red';
ctx.fillRect() 
```

这会导致每次绘制完1个图形后，需要重新设置下1个图形的属性信息

Canvas支持通过 save 保存属性信息，通过 restore 还原属性历史信息 （底层就是通过栈记录）

```js
ctx.fillStyle = 'blue'; // 蓝色

ctx.save(); // 存档

ctx.fillStyle = 'yellow'; // 黄色
ctx.fillRect(20, 80, 20, 20);

ctx.restore(); // 回档，fillStyle 重新变回蓝色
ctx.fillRect(50, 80, 20, 20);
```

## 位置检测

isPointInPath 、isPointInStroke



## 平移变换

* transform、translate、rotate、scale
* setTransform



## Canvas 内容

ImageData 表示 Canvas 中的像素信息

* getImageData()

  ```js
  // 获取 canvas 指定范围内的像素数据 （返回ImageData）
  const imageData = ctx.getImageData(sx, sy, sw, sh); 
  // sx, sy 是相对画布左上角的起点
  // sw, sh 指定宽高范围
  ```

* createImageData()

## 离屏Canvas

## web work



## 图形学算法

### 矩阵运算



### 位置检测

Canvas 内的操作全部都需要开发者自行完成，用鼠标如何点击选中 Canvas 中众多小方块中的 1 个呢 ?

Click 事件可以返回点击坐标信息，但是如何判断选中了哪个？

https://mp.weixin.qq.com/s?__biz=MzI0NTc2NTEyNA==&mid=2247486426&idx=1&sn=08c42c5382094679781fd74c4fa64f9c&chksm=e948ceb1de3f47a7ac4e604e4ae3ce97f2be2e2f137116b9c29d11b8c5a09dd99a61b401e8c4&scene=178&cur_album_id=2254820309096906756&search_click_id=#rd

### 脏矩形渲染
