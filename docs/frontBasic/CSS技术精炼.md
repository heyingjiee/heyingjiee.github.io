# CSS技术精炼

## 参考资料

[CSS参考手册](http://css.doyoe.com/)

[腾讯云学习文档](https://cloud.tencent.com/developer/section/1071827)

[后盾人学习文档](https://doc.houdunren.com/css/1%20%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.html)

菜鸟教程

[1.5 万字 CSS 基础拾遗](https://juejin.cn/post/6941206439624966152)：个人强烈推荐有时间可以读一读

[彻底搞懂CSS层叠上下文、层叠等级、层叠顺序、z-index](https://juejin.cn/post/6844903667175260174)

## 盒子模型

![image-20220217154442918](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220217154442918%20.png)

### 盒子模型

标准盒子模型(浏览器默认)：`box-sizing:content-box;`，设置的宽/高是content的大小，如果给盒子增加padding/border/margin都会使得盒子的尺寸变大

怪异盒子模型：`box-sizing: border-box;`，设置的宽/高是border+padding+content的大小，如果给盒子增加padding/border/margin，盒子的尺寸不变，content缩小 

**注意**：

* 当不设置宽/高时，则padding/border/margin会撑开。如果设置了，还是保持怪异盒子的逻辑，向内挤压空间

* 当padding\*2就已经大于宽/高时，即content为0时都会超出了设置的宽高时，`box-sizing: border-box;`失效。看下面例子，宽/高都被撑到140px了，设置的宽/高才100px，所以还是被撑到140了）

![image-20210814235552645](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/%E8%B8%A9%E5%9D%91/image-20210814235552645%20.png)

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<style>
		.a1{
			width: 100px;
			height: 100px;
			background-color: yellow;
		}
		.a2{
			box-sizing:border-box;
      
			width: 100px;
			height: 100px;
			background-color: red;
			padding: 50px;
      
			border: 20px solid black;
		}
		</style>
	</head>
		
	<body>
		<div class="a1"></div>
		<div class="a2"></div>
	</body>
</html>

```



**进一步理解盒子模型的不同**

***背景设置***

两种盒子模型，设置`background`相关的属性（background-color,background-image等），默认都是填充content+padding+border的位置，只不过我们通常是使用`border: 20px solid black;`把border设置实线，所以看到是broder部分不是背景色，其实使用`border: 20px dashed black;`这种点线就能露出来背景色了 。例子是设置背景色为红色，border部分也露出来红色的背景

![image-20210815004319605](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/%E8%B8%A9%E5%9D%91/image-20210815004319605%20.png)

***绝对定位***

设置父元素`position:relative`,设置子元素`position:absolute; top:0;right:0`就能看出来，两种盒子模型都会以padding的左上角作为坐标起点定位的

***width与heigh为100%或者不设置***

总结：

* 宽度100%，继承父级元素content宽度。默认最外层body和html宽度是整个视口宽度。

* 高度100%，继承父级元素高度。默认最外层body和html高度为0。故body下一级的div设置`height:100%`,是没有高度的，可以使用100vh占据整个视口高度

  ```html
  <!DOCTYPE html>
  <html>
  	<head>
  		<meta charset="utf-8" />
  		<meta name="viewport" content="width=device-width, initial-scale=1">
  		<title></title>
  	</head>
  	<style> 
  	 *{
  		 padding: 0;
  		 margin: 0;
  	 }
  		main{
  			width: 100%;
  			height: 100%; /*高度是0*/
  			background-color: #00FFFF;
  			
  		}
  	</style>
  	<body>
  		<main></main>
  	</body>
  </html>
  ```

* 如果div不设置宽高，块级元素默认宽为100%，高为0。当存在元素时,内部的元素的会**撑起来div的高度**，但是**宽度仍然是继承父元素的100%**，不会被内部元素的宽高影响

  <img src="https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/%E8%B8%A9%E5%9D%91/image-20211012165042255%20.png" alt="image-20211012165042255" style="zoom:50%;" />

  **注意**:内部元素的外边距(margin范围)也是会撑起高度的

* 两种不同盒子宽高对应不同的位置，故设置宽高100%存在一些细节情况。但是始终记住：

  * 默认标准盒子宽高是content大小，也就是说子元素宽高设置100%，如果子元素加了`padding`,那实际子元素盒子border围成的宽高**大于**了继承的宽高。

  * 怪异盒子模型的盒子宽高是content+padding大小，也就是说子元素宽高设置100%，如果子元素加了`padding`,那实际盒子border围成的宽高还是**等于**了继承的宽高。

  * 遇到较多的情况：子元素宽度是100%，因为子元素内部需要用padding撑开间距，下面就会出现子元素顶出父元素区域的问题，加`box-sizing:border-box`解决

    ```
    .parent{
    	width:200px
    	height:200px
    }
    child:{
    	width:100%
    	padding:20px
    }
    ```


### 盒子垂直外边距重叠

垂直方向上，两个盒子的**上下外边距**如果挨上，就会发生重叠，间距变为其中最大的那个外边距值。

注意：

* **BFC**容器内：如果**情况一**中的两个盒子处于BFC（后面会讲到）中时，会继续存在盒子外边距重叠的情况。但是在**情况二**中，如果父盒子是BFC容器，子盒子的撒上边框和父盒子的上边框不会出现外边距重叠的情况
* **FFC**容器内：不存在盒子垂直外边距重叠的情况 

**情况一**：两个盒子相离的关系，上下边距会合并

![image-20211015094858916](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/%E8%B8%A9%E5%9D%91/image-20211015094858916%20.png)

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
	</head>
	<style>	
		*{
			padding: 0;
			margin: 0;
		}
		.container {
			width: 100%;
			height: 300px;
		}

		.first {
			width: 50px;
			height: 50px;
			background-color: red;
			margin-bottom: 20px;
		}
		.second {
			width: 50px;
			height: 50px;
			background-color: blue;
			margin-top: 30px;
		}
	</style>
	<body>
		<div class="container">
			<div class="first">1</div>
			<div class="second">2</div>
		</div>
	</body>
</html>

```

**情况二**：两个盒子是包含的关系，一个在外部，一个在内部，这时候子盒子靠在父盒子的左边框和上边框.只有两个盒子设置上边距会合并,设置左边距不会合并

![image-20220218113629144](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220218113629144%20.png)

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
	</head>
	<style>		
		*{
			padding: 0;
			margin: 0;
		}
		.parent {
			width: 100px;
			height: 100px;
			background-color: red;
		}

		.child {
			width: 50px;
			height: 50px;
			background-color: blue;
			margin-top: 25px;
		}
	</style>
	<body>

		<div class="parent">
			<div class="child"></div>
		</div>
	</body>
</html>


```

解决方案给parent加一个padding-top: 0.1px即可

**BFC**

在**情况二**的父元素中添加`overflow:hidden;`将父元素转化为BFC容器

![image-20220218114632865](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220218114632865%20.png)

**FFC内部不存在外边距塌陷**

使用flex布局,转化为弹性盒子模型(主轴水平)

![image-20211015095257320](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/%E8%B8%A9%E5%9D%91/image-20211015095257320%20.png)

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
	</head>
	<style>
		.first{
			width: 50px;
			height: 50px;
			background-color: red;
			margin-right: 20px;
		}
		.second{
			width: 50px;
			height: 50px;
			background-color: blue;
			margin-left: 30px;
		}
		.container{
			display: flex;
			flex-direction: row;
		}
		
	</style>
	<body>
		<div class="container">
			<div class="first">1</div>
			<div class="second">2</div>
		</div>
	</body>
</html>

```

使用flex布局,转化为弹性盒子模型(主轴竖直)

![image-20220218143410520](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220218143410520%20.png)

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
	</head>
	<style>
			
		*{
			padding: 0;
			margin: 0;
		}
		.first{
			width: 50px;
			height: 50px;
			background-color: red;
			margin-top: 10px;
			margin-bottom: 20px;
		}
		.second{
			width: 50px;
			height: 50px;
			background-color: blue;
			margin-top: 30px;
		}
		.container{
			display: flex;
			flex-direction: column;
			background-color: yellow;
		}
		
	</style>
	<body>
		<div class="container">
			<div class="first">1</div>
			<div class="second">2</div>
		</div>
	</body>
</html>
```

### 盒子背景

**background**

复合属性，建议使用这个数据定义下面所有的

![image-20221207115952522](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/20221207115952%20.png)

```css
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title></title>
</head>
<style>
    .all{
        width: 900px;
        height: 100px;
        padding: 100px;
        border: dotted 30px black;
        background:url(https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/%E5%8D%9A%E5%AE%A2%E5%A4%B4%E5%83%8F/avatar.png)  no-repeat left top/cover local padding-box  padding-box;
      
      /*
      	url()定义背景图
      
      	no-repeat:当图片不能填充满元素时，不重复（默认是重复的）
      
      	left top/cover：这是background-positon/background-size，可以单独定义background-positon，但是如果想定义background-size，必须用这种形式。left top是指左上角(background-origin值是border-box，所以是边框的左上角)。cover是等比例填充满
      
      	local：是background-attachment
      	
      	剩下的两个要求顺序：border-box padding-box ，第一个是background-origin(放置图片的区域)，第二个是background-clip（放置完图片后，进行裁切时，保留的区域）
      	
         	
      */
    }


</style>
<body>
    <div class="all"></div>
</body>
</html>
```

补充下：默认background-origin默认值是padding-box;默认background-clip默认值是border-box。前面的代码所以不设置这两个属性，就会出现下面的效果，图片从padding的左上角放置，但是高度超出了父元素，但是因为裁切保留border内的图片，下边框底下会压住图片

![image-20221207121658149](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/20221207121658%20.png)

**background-color**
设置元素背景颜色，默认值：transparent

| 常用可选值   | 含义                          |
| ------------ | ----------------------------- |
| 十六进制     | 如：#ffffff                   |
| rgb，rgba    | 如：rgba(255,255,255,0.1)     |
| 颜色关键字   | 如：red                       |
| currentcolor | 设置颜色为当前div中的文字颜色 |
| transparent  | 透明                          |



**background-image**

设置元素背景图片，可设置多张背景图片，用逗号分隔，越靠前面的处于越上层的位置（这样可以叠加多层图片）

| 常用可选值                                                   | 含义                             |
| ------------------------------------------------------------ | -------------------------------- |
| url( )                                                       | 设置背景图片(图片地址不用加引号) |
| linear-gradient(to top left,red,yellow)、radial-gradient()、repeating-linear-gradient()、repeating-radial-gradient() | 渐变图像（详见，css函数部分）    |

```css
{
			  width: 100%;
			  height: 400px;
			  background-image: url(https://mdn.mozillademos.org/files/11305/firefox.png),
			      url(https://mdn.mozillademos.org/files/11307/bubbles.png),
			      linear-gradient(to right, rgba(30, 75, 115, 1), rgba(255, 255, 255, 0));
			  background-repeat: no-repeat,
			      no-repeat,
			      no-repeat;
			  background-position: bottom right,
			      left,
			      right;
			
}
```

效果图：分别指定了3张图

![image-20211130161443584](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Vue%E7%9B%B8%E5%85%B3/image-20211130161443584%20.png)



**background-attachment**：如果指定了 `background-image` ，那么 `background-attachment`决定背景是在视口中固定的还是随包含它的区块滚动的，默认值scroll

```
fixed 以窗口为基准。随元素滚动

scroll 以元素为基准。元素内部滚动，背景图不动

local 以元素为基准。元素内部滚动,背景跟随滚动不动
```





**background-origin**、**background-position**、**background-size**、**background-size**、**background-clip**

* background-origin：先指定图片放置的范围（默认：padding-box）

  | 常用可选值  | 含义                             |
  | ----------- | -------------------------------- |
  | border-box  | 背景范围：content+padding+border |
  | padding-box | 背景范围：content+padding        |
  | content-box | 背景范围：content                |

* background-position：在这个范围内，再指定图片从哪个位置开始放置（默认为left top，或者 0 0）

  | 常用可选值                                     | 含义                                                         |
  | ---------------------------------------------- | ------------------------------------------------------------ |
  | left\|right\|top\|bottom\|center               | 1、两个参数时，第一个为水平方向，第二个为竖直方向；<br />2、一个参数时，就是水平方向，竖直方向默认为center |
  | 数值、百分比（可为负数，百分比以父元素为参考） | 1、两个参数时，第一个为水平方向距左侧距离，第二个为竖直方向距顶部距离；<br />2、一个参数时，就是水平方向距左侧距离，竖直方向默认为还是为center |

* background-size：指定了图片放置的起始位置了，该来指定图片的大小了（默认值auto）

  | 可选值个数 | 含义                                                         |
  | ---------- | ------------------------------------------------------------ |
  | 单个值     | 1、cover：保持宽高比，覆盖整个元素区域（可能会超出被裁剪）<br />2、contain：保持宽高比，整个图片全部包含在元素区域（可能会留白）<br /><br />3、auto：背景图像的真实大小<br />4、数字、百分比（不允许负数，百分比以父元素为参考）：指定为图片宽度，默认保持宽高比自动设置高度 |
  | 多个值     | 数字、百分比（不允许负数，百分比以父元素为参考），分别设置宽、高 |

* background-repeat：前面设置图片尺寸了，但是其中也提到了元素填充背景图后，可能会留白
  默认情况会在水平和竖直两个方向重复这个图片直到填充满，效果如下：

  ![image-20221207125141369](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/20221207125142%20.png)

  也可以设置不填充，效果如下

  ![image-20221207125336977](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/20221207125337%20.png)

  | 单值      | 等价的双值（第一个值是水平，第二个值是垂直） | 含义                                                     |
  | :-------- | :------------------------------------------- | -------------------------------------------------------- |
  | repeat-x  | repeat no-repeat                             | 仅水平方向留白重复填充                                   |
  | repeat-y  | no-repeat repeat                             | 仅竖直方向留白重复填充                                   |
  | repeat    | repeat repeat                                | 水平、竖直方向留白重复填充                               |
  | space     | space space                                  | 当背景图像不能以整数次平铺时，会用空白间隙填充在图像周围 |
  | round     | round round                                  | 当背景图像不能以整数次平铺时，会根据情况缩放图像         |
  | no-repeat | no-repeat no-repeat                          | 不重复                                                   |

* background-clip：前面两部把图片放置好后，才轮到裁切（默认为border-box）

  属性值与background-origin相同

  这是一个background-origin为border-box的例子（黑色的点是border），background-clip默认也为border-box

  ![image-20221207123522494](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/20221207123522%20.png)

  修改background-clip为padding-box

  ![image-20221207123653878](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/20221207123654%20.png)



**技巧**

```
总想着 background-origin、background-clip 两个属性如何展示，如何裁切心智太重

一般开发中，很少需要裁剪图片，所以，这两个值都设置成一样的，分成两种情况:

* 图片需要显示到padding+content :设置为padding-box

* 图片需要显示到content :设置为content-box
```



###  盒子边框

**border**

边框复合属性，下面三个属性的合并

```css
border:solid 1px red; 
/*
	border-style 边框样式：solid是是实线
	border-width 边框宽度
	border-color 边框颜色
*/
```

边框样式还有几个重要的值：

* none：无边框，即边框宽度为0

* hidden：隐藏边框

* dotted：点状轮廓 

* dashed：虚线轮廓

* solid：实线轮廓

**border-radius**

边框圆角

一组值： `水平半径/垂直半径`，如果只有一个参数值，默认第二个参数和第一个相同

一般情况下我们只指定一组值，则4个圆角都是同一样的，例子如下：

![image-20221207151110452](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/20221207151111%20.png)

**border-image**

很多时候，默认的边框并不能满足需求，这时候就需要使用图片作为边框了

显示图片边框的前提，必须设置宽边的样式和宽度。当图片加载不出来就会显示这个边框

```
border: solid 30px;
```



border-image

复合属性

```css
border-image：border-image-source || border-image-slice [ / border-image-width | / border-image-width ? / border-image-outset ]? || border-image-repeat
```



border-image-source

指定边框资源

![背景图1-2](http://c.biancheng.net/uploads/allimg/210809/1532491419-0.png)

```css
border-image-source:url(http://c.biancheng.net/uploads/allimg/210809/1532491419-0.png)
```



border-image-slice

指定数字（没单位，默认单位为像）

![image-20221208100926238](/Users/yc/Library/Application Support/typora-user-images/image-20221208100926238.png)

边框图为下图：

![背景图1-2](http://c.biancheng.net/uploads/allimg/210809/1532491419-0.png)

指定`border-image-slice:27`就能顺利的把4个蓝色的菱形分割下来，下面的属性讲的是怎么显示这4条边

border-image-width

指的是图片的宽度，这里border的宽度设置为30px，border-image-width设置为40px，可看出图片边框的宽度大于border的宽度时，是向内延伸的。小于时，是紧靠边框外侧的

![image-20221208095117839](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/20221208095118%20.png)

border-image-outset

指定在上一步的基础上，四边向外偏移的距离



border-image-repeat

指定border-image-slice分隔出来的四条边，如何显示在边框上，默认stretch

| 常用可选值 | 含义                                                         |
| ---------- | ------------------------------------------------------------ |
| stretch    | 将被分割出来的4个边，分别使用拉伸的方式来填充满边框区域      |
| repeat     | 将被分割出来的4个边，重复平铺的方式来填充满边框区域，当图像碰到边界时，超出的部分会被截断 |
| round      | 将被分割出来的4个边，重复平铺的方式来填充满边框区域，当背景图像不能以整数次平铺时，会根据情况缩放图像 |
| space      | 将被分割出来的4个边，重复平铺的方式来填充满边框区域，当背景图像不能以整数次平铺时，会用空白间隙填充在图像周围 |

例子中，分割出来的四条边都是一个蓝色的菱形，分别使用不同的值效果如下

stretch（默认值）

![image-20221208100600108](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/20221208100600%20.png)

repeat

![image-20221208100623234](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/20221208100623%20.png)

round

![image-20221208100653489](/Users/yc/Library/Application Support/typora-user-images/image-20221208100653489.png)

space

![image-20221208100725036](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/20221208100725%20.png)

### 盒子阴影

**box-shadow**：盒子阴影，可以描述一个或多个阴影效果（多个时，用逗号分隔）

外阴影：offset-x指盒子右边框向外扩展，offset-y 指盒子下边框向下扩展，

```javascript
box-shadow：offset-x | offset-y | blur-radius（模糊程度） | spread-radius（扩散程度） | color (如果未定义color阴影颜色将默认取当前最近的文本颜色)
```

内阴影：再加一个inset属性



头像发光边框效果：

![image-20221209144705834](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/20221209144706%20.png)

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title></title>
</head>
<style>
    .all{
        width: 200px;
        height: 200px;
        border-radius: 50%;
				
      	/*padding就是外侧的白圈*/
        padding: 20px;
        background: white;
      
      	/*外侧的发光效果*/
        box-shadow:0 0 30px #ddd;
    }
    img{
        width: 100%;
        height: 100%;
      	/*图片设置成圆形，带边框*/
        border-radius: 50%; 
        border: solid 1px black;
    }
</style>
<body style="background: black">
    <div class="all">
        <img src="https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/%E5%8D%9A%E5%AE%A2%E5%A4%B4%E5%83%8F/avatar.png"/>
    </div>
</body>
</html>
```



### 格式上下文（简略版）

格式化上下文（Formatting Context）是 CSS2.1 规范中的一个概念，大概说的是页面中的一块渲染区域，规定了渲染区域内部的子元素是如何排版以及相互作用的。不同类型的盒子有不同格式化上下文，大概有这 4 类：

- BFC (Block Formatting Context) 块级格式化上下文；
- IFC (Inline Formatting Context) 行内格式化上下文；
- FFC (Flex Formatting Context) 弹性格式化上下文；
- GFC (Grid Formatting Context) 格栅格式化上下文；

下面的视觉格式化类型具体讲述不同类型的盒子参与哪种上下文

## 视觉格式化模型

视觉格式化模型（Visual formatting model）是用来处理和在视觉媒体上显示文档时使用的计算规则。CSS 中一切皆盒子，而视觉格式化模型简单来理解就是规定这些盒子应该怎么样放置到页面中去，这个模型在计算的时候会依赖到很多的因素，比如：盒子尺寸、盒子类型、定位方案（是浮动还是定位）、兄弟元素或者子元素以及一些别的因素

### display

**盒子类型**由 display 决定，每一个元素都有默认的display值，也可以手动设置 display ，display值决定盒子的显示类型：

* **inner display type**（对内显示）：其实就相当于把该元素当成了容器，规定容器内部是什么上下文。

- **outer display type**（对外显示）：决定了该元素本身是如何布局的，即元素能否参与到所在容器的格式化上下文中【span建立的是IFC，其中就不能放置div，因为div只能参与到BFC中

### inner display type

对内方面，其实就是把元素当成了容器，里面包裹着文本或者其他子元素。容器（ container box ）的类型分为 4 种：

- block container ：建立 BFC 或 IFC
- flex container ：建立 FFC
- grid container ：建立 GFC
- ruby container ：非常少见，不做介绍

### outer display type

对外显示方面，盒子类型可以分成 2 类：块级盒子 和行内级盒子

- **块级盒子**：display 为 block、list-item、table、flex、grid、flow-root 等；所有块级盒子都会对外参与 BFC，呈现垂直排列
- **行内级盒子**：display 为 inline、inline-block、inline-table 等；所有行内级盒子都会对外参与 IFC，呈现水平排列

### html元素

html元素都有默认的display值，基本分为三类：

**block**

- 占满一行，默认继承父元素的宽度；多个块元素将从上到下进行排列 
- 设置 width/height 将会生效
- 设置 padding 和 margin 将会生效

**inline**

- 不会占满一行，宽度随着内容而变化；多个 inline 元素将按照从左到右的顺序在一行里排列显示，如果一行显示不下，则自动换行
- 设置 width/height 将不会生效
- 设置竖直方向上的 padding 和 margin 将不会生效

**inline-block**

- 是行内块元素，不单独占满一行，可以看成是能够在一行里进行左右排列的块元素
- 设置 width/height 将会生效
- 设置 padding 和 margin 将会生效

元素默认值对应的视觉模型

* div元素：默认为block，对外参与BFC；**div默认不是BFC容器，如何将div变成BFC容器，详见章节 “格式上下文（详细版）” **
* span元素：默认inline，对外参与IFC，对内作为容器建立IFC，只能放置行内盒子
* img元素：默认inline-block， img 即使使用display申明为 block 也是不会产生 container box 的（不能作为容器），因为 img 设计的初衷就仅仅是通过 src 把内容替换成图片，完全没考虑过会把它当成容器

## 元素默认类型

这里是对上一部分**html元素**的详细介绍

### 行级元素

![image-20210410003844069](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/%E9%9D%A2%E8%AF%95%E7%9B%B8%E5%85%B3/image-20210410003844069.png)

如：a标签是行内元素，为了看的更清晰，给三个行内元素都加了红色的边框。

* 行内元素不是独占一行，且没有`height`和`width`属性，长宽都是紧随内部文字的长宽，不存在内部的水平居中和垂直居中的问题
* 有`line-height`的概念,元素中线距上下各二分之一行高的长度
* vertical-align是行内元素的独占属性，该属性定义行内元素的基线相对于该元素所在行的基线的垂直对齐。

```html
<style>
  a { 
    	border: solid 1px red;
      line-height: 100px;
   }
</style>

<hr>
	<a href="">MYSQL</a>
	<a href="">LINUX</a>
	<a href="">PHP</a>
<hr>
```



### 块级元素

![image-20210410004406761](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/%E9%9D%A2%E8%AF%95%E7%9B%B8%E5%85%B3/image-20210410004406761.png)

如：div标签是行内元素。这里使用`display:block`将a标签转化为块级元素。

* 块级元素独占一行，有`height`和`width`属性。通过`text-align:center`使实现块级元素内部水平居中。通过使`height`和`line-height`的值一样，实现块级元素内部垂直居中
* 有`line-height`的概念,元素中线距上下各二分之一行高的长度

```html
a {
     display: block;
     border: solid 1px red;

     width: 100px;
     height: 100px;
     line-height: 100px;
     text-align: center;
 }

<a href="">MYSQL</a>
<a href="">LINUX</a>
<a href="">PHP</a>

```

### 行级块元素

如：使用`display:inline-block`将a标签转化为inline-block元素。

* 实现块级元素不独占一行的效果，有`height`和`width`属性。通过`text-align:center`使实现块级元素内部水平居中。通过使`height`和`line-height`的值一样，实现块级元素内部垂直居中
* 有`line-height`的概念,元素中线距上下各二分之一行高的长度

后面的章节**浮动盒子**、**弹性盒子**、**定位盒子**、**栅格盒子**讲述，使用display属性，更改元素默认盒子类型

## 浮动盒子

（现在基本很少使用浮动布局了，故这里不做介绍）

浮动会脱离文档流，BFC块会能感知到float元素，

## 弹性盒子

### 弹性盒子属性

| 属性            | 作用                                                         |
| --------------- | ------------------------------------------------------------ |
| flex-direction  | 指定子元素的主轴方向                                         |
| flex-wrap       | 指定子元素溢出是否换行。默认不换行，压缩子元素大小           |
| justify-content | 指定子元素在主轴上的布局方式。flex-start\|flex-end\|center\|space-between\|space-around\|space-evenly |
| align-items     | 控制交叉轴上的布局方式。stretch（默认拉伸子元素，但是必须保证子元素没有设置height）\|center\|flex-start\|flex-end |
| align-content   | 控制交叉轴上的布局方式。stretch\|center\|flex-start\|flex-end\|space-between\|space-around\|space-evenly |

`align-items`和`align-content`都是控制交叉轴的。两个有什么区别吗？

* 以下是`align-items=center`的效果。是对一行元素在交叉轴上的布局进行控制，只有4个参数。遇到多行子元素，只能控制多行中的某一行子元素。所以多行时，需要使用`align-content`

  ![image-20210411160717638](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/%E9%9D%A2%E8%AF%95%E7%9B%B8%E5%85%B3/image-20210411160717638.png)

* `align-content`是实现多行元素在垂直轴上的布局。可以通过`space-between|space-around|space-evenly`等属性实现均分的布局

  ![image-20210411162215655](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/%E9%9D%A2%E8%AF%95%E7%9B%B8%E5%85%B3/image-20210411162215655.png)

**巧用`space-between`和flex-grow**

顶部和底部设置高度，中心主体部分不设置高度，然后设置中心主体的权重`flex-grow=1`,就会直接占用了剩下的空间

![image-20210411165520455](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/%E9%9D%A2%E8%AF%95%E7%9B%B8%E5%85%B3/image-20210411165520455.png)

```html
    <article>
        <div>顶部</div>
        <div>中心主体</div>
        <div>底部</div>
    </article>
     <style>
        *{
            margin:0;
            padding: 0;
        }
        body{
            padding:200px 200px;
        }
        article{
            border:black solid 1px;
            display: flex;
            width: 250px;
            height: 400px;
            flex-direction: column;
            justify-content: space-between;
   
        }
        div:nth-child(1){
            border: red solid 1px;
            height: 50px;
        }
        div:nth-child(2){
            border: red solid 1px;
            flex-grow: 1;
           
        }
        div:nth-child(3){
            border: red solid 1px;
            height: 50px;

        }

    </style>
```

### 弹性盒子中子元素属性

| 属性       | 作用                                                         |
| ---------- | ------------------------------------------------------------ |
| align-self | 单独指定添加该属性的子元素的布局。stretch\|flex-start\|flex-end\|center |
| flex       | flex是flex-grow、flex-shrink 、flex-basis缩写组合。第一个参数是剩余空间的扩张比例。第二个参数是剩余空间的收缩比例，设置为0，则一行子元素溢出父元素，子元素将不会压缩大小，默认不写，会自动压缩。第三个参数，flex-basis的 优先级大于 width、height，指定了该参数，子元素大小则不会随着窗口大小自适应。 |
| order      | 默认为 order:0， 数值越小越在前面，可以负数或整数。          |

flex属性的使用

* flex:1是flex:1 1 auto的简写,会让子元素平分主轴空间

注意：子元素，可以是div，span这种Dom元素，还可以是文本。所有元素都是一个个部分，不区分块级元素和行级元素，都是按照flex的属性进行布局

![image-20210411180524596](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/%E9%9D%A2%E8%AF%95%E7%9B%B8%E5%85%B3/image-20210411180524596.png)

```html
    <article>
        <div>第一部分</div>
        中间文字
        <div>第二部分</div>
    </article>

     <style>
        *{
            margin:0;
            padding: 0;
        }
        body{
            padding:200px 200px;
        }
        article{
            border:black solid 1px;
            display: flex;
            width:300px;
            height: 200px;
            flex-direction: row;

        }
        div{
            border: red solid 1px;
            height: 50px;       
            background-color: blueviolet;

        }

    </style>
```

### flex盒子指定宽度，且开启换行

开启换行，盒子不再压缩，如果空间不够就会换行，如果一行的剩余空间不够一个盒子的宽度，那么就会留下空隙

![image-20220114104016386](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220114104016386%20.png)

这种情况下，可以使用`justify-content`属性。使用`justify-content: space-evenly`让一行内的盒子平均分布

![image-20220106161634332](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Vue%E7%9B%B8%E5%85%B3/image-20220106161634332%20.png)

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
	</head>
	<style type="text/css">
			
		.parent{
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: space-evenly;
		}
			
		.child{
			width: 100px;
			height: 100px;
			background-color: #FF0000;
			margin: 2px;
		}
	</style>
	<body>
		<div class="parent">
			<div class="child"></div>
			<div class="child"></div>
			<div class="child"></div>
			<div class="child"></div>
			<div class="child"></div>
			<div class="child"></div>
		</div>
	</body>
</html>

```

### 如何让3个盒子，中间的盒子居中

flex水平布局，使用`justify-content`属性并不是居中，而是两端对齐，默认情况下，下图中，左右盒子的宽度是根据内部文字撑开的，所以左右两个盒子的大小是不一样的，中间盒子也不是居中的。

![image-20220113192443448](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220113192443448%20.png)

但是使用一下方法就可以实现居中：

* 代码中的`flex-basis:100%;`或`width:1px`的目的是使的两边的盒子宽度大小一样，具体值设置多少都可以。
* 盒子的`flex-grow: 1;flex-shrink: 1;`决定了盒子会自动伸缩，两个盒子始终平分，中间盒子剩下的空间。两边盒子即使内容太多，也不会挤压中间盒子

![image-20220113192633748](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220113192633748%20.png)

```html
<!DOCTYPE html>
<html>
	<head>
		<link rel="stylesheet" href="animate.min.css">
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title></title>
	</head>
	
	<style>
			
		.parent{
			width: 100%;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
		}
			
		.child{
			flex-grow: 1;
			flex-shrink: 1;
			flex-basis:100%;/*或者width:1px; 这里的两种写法，值写成多少都可以，盒子的flex-grow: 1;flex-shrink: 1;决定了盒子会自动伸缩，左右两个盒子始终平分，中间盒子剩下的空间*/
			background-color: red;
			border:solid 1px black;
		}
		.midlle{
			background-color: yellow;
		}
	</style>
	<body>
		<div class="parent">
			<div class="child">
				事实上收拾收拾收拾收拾宿舍拾收拾
			</div>
			<div class="midlle">1234456</div>
			<div class="child">我哈</div>
		</div>
	</body>
	<script>
		
	
	</script>
</html>

```

对于有些场景，也会加入以下代码，实现超出隐藏

```css
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
```

可以看出啊文字省略有效果了![image-20220117181914348](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220117181914348%20.png)

一行超出隐藏的前提是，必须使用了`flex-basis`或`width`确定了长度，否则超长的文字会尽可能的撑起来盒子，破坏原本的比例

![image-20220117182310508](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220117182310508%20.png)

实际需求场景：要求左右两侧两端对齐，中间的类型居中。考虑两个问题

1. 又有两侧文字有最大宽度，使用`max-width`，虚线的长短和文字的长短两个加起来应该是固定的
2. 中间的类型始终居中（使用上面的方法）



![image-20220114094922604](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220114094922604%20.png)

具体代码实现：

```html
<!DOCTYPE html>
<html>
	<head>
		<link rel="stylesheet" href="animate.min.css">
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title></title>
	</head>

	<style>
		.container {
			width: 100%;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
		}

		.left {
			flex-basis: 1px;
			flex-grow: 1;
			flex-shrink: 1;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: flex-start;
		}

		.center {}

		.right {
			flex-basis: 1px;
			flex-grow: 1;
			flex-shrink: 1;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: flex-end;
		}

		/* 虚线 */
		.dashLine {
			flex-grow: 1;
			border-top: dashed 1px #cccccc;
		}

		/* 文字字体 */
		.compareValue {
			max-width: 81px;
			font-family: AvenirNextCondensed-DemiBold, serif;
			font-size: 16px;
			color: #222222;
			font-weight: 600;
		}

		.centerValue {
			font-size: 12px;
			color: #646464;
			text-align: center;
			font-weight: 400;
			flex-shrink: 0;
			margin: 0 13px;
		}
	</style>
	<body>
		<div class="container">
			<div class="left ">
				<div class="compareValue" style="margin-right:12px;text-align:left;">
					你好反反复复方法你好反反复复方法
				</div>
				<div class="dashLine"></div>
			</div>
			<div class="center centerValue">1234456</div>
			<div class="right">
				<div class="dashLine"></div>
				<div class="compareValue" style="margin-left:12px;text-align: right;">
					我哈
				</div>

			</div>
		</div>
	</body>
	<script>


	</script>
</html>

```

实现效果：

![image-20220114103905000](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220114103905000%20.png)

## 定位盒子 

### relative

使用`position:relative`，元素在文档流中原本所在位置仍然被占据，元素浮动起来，`top|bottom|left|right`是是以元素原本的位置为参考系

### absolute

使用`display:absolute`，若父级没有设置`position`则根据页面左上角为参考系来定位。若父级有`position`属性，则以父级左上角为参考系进行定位（根据父级的padding+content区域，即以padding左上角为定位点）【页面超过一页长度，上下翻动，随着页面滚动】

### fixed

使用`display:fixed`，当设置`top|bottom|left|right`时，是根据视窗为参考系来定位。不设置时，是按照父级元素定位的【页面超过一页长度，上下翻动，使用fixed的元素不会移动】

**如果想要fixed不以窗口为参考系**

添加了`transform`这个属性的元素会变成一个独立的图层，这个元素内部的`fixed`就感知不到了窗口了，只能感知到这个独立图层

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
	</head>
	<style type="text/css">		
			
		*{
			margin: 0;
			padding: 0;
		}
			
		.container{
			width: 300px;
			height: 200px;
			border: solid 3px  red;
			position: relative;
			overflow-y: scroll;
		
		}
			
		.child{
			width:100%;
			height: 400px;
			background-color: #00FFFF;
			transform: scale(1,1);
			
		}
			
		.child-footer{
			
			background-color: red;
			position: fixed;
			bottom: 0;
		}
	</style>
	<body>
		<div class="container">
			<div class="child">
				<div class="child-footer">eee</div>
			</div>
		</div>
	</body>
</html>
```

![image-20220209151433029](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220209151433029%20.png)

### sticky

使用`display:sticky`，给需要吸附效果的元素设置，以父容器为参考系(父元素不必设置position)，必须设置`top|bottom|left|right`，否则无效果。

例如：`top:10px`即元素上顶部到距离父容器顶部`10px`的位置就吸附

有两种情况需要知道：

* 一、多个吸附元素，属于同级关系时，向下滑动，下面的吸附元素会盖住，之前吸顶的元素

  ![image-20220209154228624](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220209154228624%20.png)

  ```html
  <!DOCTYPE html>
  <html>
  	<head>
  		<meta charset="utf-8">
  		<title></title>
  	</head>
  	<style type="text/css">		
  			
  		*{
  			margin: 0;
  			padding: 0;
  		}
  			
  		.container{
  			width: 300px;
  			height: 200px;
  			border: solid 3px  blue;
  			overflow-y: scroll;
  		}
  			
  		.item1{
  			width: 100%;
  			height: 50px;
  			background-color: red;
  			position: sticky;
  			top: 0;
  		}
  		.item2{
  			width: 100%;
  			height: 50px;
  			background-color: green;
  			position: sticky;
  			top: 0;
  		}
  		.item3{
  			width: 100%;
  			height: 50px;
  			background-color: yellow;
  			position: sticky;
  			top: 0;
  		}
  			
  		.detail{
  			width: 100%;
  			height:200px ;
  		}	
  		
  	</style>
  	<body>
  		<div class="container">
  			<div class="item1">1</div>
  			<div class="detail"></div>
  			
  			<div class="item2">2</div>
  			<div class="detail"></div>
  			
  			<div class="item3">3</div>
  			<div class="detail"></div>
  		</div>
  	</body>
  </html>
  ```
  
* 二、多个吸附元素，不属于属于同级关系时，会把前面已吸附的元素挤走

  ![image-20220209154058830](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220209154058830%20.png)

  ```html
  <!DOCTYPE html>
  <html>
  	<head>
  		<meta charset="utf-8">
  		<title></title>
  	</head>
  	<style type="text/css">
  		* {
  			margin: 0;
  			padding: 0;
  		}
  
  		.container {
  			width: 300px;
  			height: 200px;
  			border: solid 3px blue;
  			overflow-y: scroll;
  		}
  
  		.item1 {
  			width: 100%;
  			height: 60px;
  			background-color: red;
  			position: sticky;
  			top: 0;
  		}
  
  		.item2 {
  			width: 100%;
  			height: 50px;
  			background-color: green;
  			position: sticky;
  			top: 0;
  		}
  
  		.item3 {
  			width: 100%;
  			height: 50px;
  			background-color: yellow;
  			position: sticky;
  			top: 0;
  		}
  
  		.detail {
  			width: 100%;
  			height: 300px;
  		}
  	</style>
  	<body>
  		<div class="container">
  			<div class="detail">
  				<div class="item1">1</div>
  				<div>你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好</div>
  			</div>
  			
  			<div class="detail">
  				<div class="item2">2</div>
  				<div>我好我好我好我好我好我好我好我好我好我好我好我好我好我好我好我好我好我好我好我好</div>
  			</div>
  
  
  			<div class="detail">
  				<div class="item3">3</div>
  			</div>
  		</div>
  	</body>
  </html>
  
  ```
  
* 三、吸顶失效

  其实（二）中的情况就是吸顶失效的情况。只要原因是，**吸顶元素不能超出他的父元素，父元素完全滚动出屏幕时，会带着吸顶子元素一起滚动出屏幕 **，（二）中`item2`所在父级元素`detail`已经随着滚动，逐渐向上离开了屏幕，同时带着绿色的吸顶元素一起离开

  简化的例子：黄色块长度超出屏幕，滚动时，蓝色会先吸顶，然后当红色块在屏幕中剩下的高度和蓝色块相同时，如果继续滑动，蓝色块就会跟着红色块滑出屏幕
  
  ![image-20220217140916615](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220217140916615%20.png)
  
  ![image-20220217141124282](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220217141124282%20.png)
  
  ```html
  <!DOCTYPE html>
  <html>
  	<head>
  		<meta charset="utf-8">
  		<title></title>
  	</head>
  	<style type="text/css">
  		* {
  			margin: 0;
  			padding: 0;
  		}
  
  		.block1 {
  			width: 200px;
  			height: 200px;
  			background-color: red;
  		}
  
  		.block2 {
  			width: 200px;
  			height: 1000px;
  			background-color: yellow;
  		}
  
  
  		.position-block1 {
  			width: 100px;
  			height: 100px;
  			background-color: blue;
  			position: sticky;
  			top: 0;
  		}
  	</style>
  	<body>
  		<div class="block1">块级元素1
  			<div class="position-block1">定位元素1</div>
  		</div>
  		<div class="block2">块级元素2</div>
  	</body>
  </html>
  
  ```
  
  

**z-index失效**

https://blog.csdn.net/weixin_41342585/article/details/79484879

## 网格布局

将页面划分为网格，分为行和列，就像一块地图，可以将元素任意放置在这些块或者块组成的区域中

![image-20220416173918496](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220416173918496.png)

### 网格基础

这里写一个Html模版，父元素里有6个子元素。后面的样式都是添加到这里，查看效果

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>

<body>
    <div class="container">
        <div class="box">11</div>
        <div class="box">22</div>
        <div class="box">33</div>
        <div class="box">44</div>
        <div class="box">55</div>
        <div class="box">66</div>
    </div>
</body>
<style>
     这里写样式
</style>
</html>
```

**网格布局**

父级元素设置display属性为grid，则其子元素变为网格子元素

```css
display:grid;
```

**网格间距**

```css
/*列间距*/
grid-column-gap:10px;

/*行间距*/
grid-row-gap:10px;

/*列、行间距*/
grid-gap:10px;
```

以上写法已经不推荐了

```css
/*列间距*/
columns-gap 

/*行间距*/
row-gap  

/*列、行间距*/
gap 
```



**网格分为显式网格、隐式网格**

* 显式网格

  通过下面属性显式的设置行、列

  ```css
  /*设置两行，第一行的高为50px，第二行的高为50px*/
  grid-template-rows:50px 50px; 
  
  /*设置两列，第一列宽为100px，第二列宽为100px*/
  grid-template-columns:100px 100px; 
  
  
  /*简写,行列之间用斜杠分隔*/
  grid-template:50px 50px/100px 100px
  ```

  实际例子:

  可以看出来，网格子元素按照从左到右排列（看下元素的编号）。共有四个是宽100px，高50px的网格子元素

  剩下两个子元素，继续排列，这时候就是隐式网格了：

  隐式网格的列还是grid-template-columns定义的个数和尺寸

  隐式网格的行会自动增加，高度由内部撑开

  ```css
  .container{
      display: grid;
      grid-template-columns:100px 100px;
      grid-template-rows:50px 50px;
      grid-gap: 10px;
  }
  ```

  ![image-20230119141740957](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Go/20230119141741%20.png)

  

* 隐式网格自动宽高

  隐式：指不设置`grid-template-columns`或`grid-template-rows`

  

  自动宽高：指不设置`grid-auto-columns`、`grid-auto-rows`不设置值，默认为auto，每个网格子元素其根据内容撑开（注意：第1行的第1列元素撑起了高度，整个第1行高度都会被撑起来）

  

  综合起来：

  隐式网格的列：不设置默认1列、隐式列宽度为100%。设置了就按照设置的来

  隐式网格的行：如果未超出了定义的网格个数，就按照设置的来。超出了定义的网格个数，会自动增加行，高度由内部撑开

  例子：不设置列、行

  ```
  .container{
      display: grid;
      grid-gap: 10px;
  }
  ```

  ![image-20230119142932537](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/20230119142932%20.png)

  例子：设置列、不设置行（网格个数为0，子元素的行高是撑开的）

  ```css
  .container{
      display: grid;
      grid-template-columns:100px 100px;
      grid-gap: 10px;
  }
  ```

  ![image-20230119143513993](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/20230119143514%20.png)

  

* 隐式网格手动设置宽高

  如下例子，列宽为100px，列高50px

  ```css
  .container{
      display: grid;
      grid-auto-columns: 100px;
    	grid-auto-rows: 50px;
      grid-gap: 10px;
  }
  ```

  

  

**（显、隐）网格列、行宽高单位**

设置值可以使用像素、百分比

```css
/*设置两列，第一列宽为100px，第二列宽为100px*/
grid-template-columns:100px 100px; 


/*设置两行，第一行的高为50px，第二行的高为50px*/
grid-template-rows:50px 50px; 
```

剩余空间按比例分配

```css
/*第1列宽100px。剩余的宽度分成3分，第二列占1份，第三列占2份*/
grid-template-columns:100px 1fr 2fr;
```

repeat函数重复分配。参数1：重复次数；参数2：尺寸

```css
/*repeat(2,1fr)等价于1fr 1fr*/
grid-template-columns:repeat(2,1fr)
/*repeat(2,1fr 2fr)等价于1fr 2fr 1fr 2fr*/
grid-template-columns:repeat(2,1fr 2fr)


/*参数1，除了指定具体数字外，还有几个特殊的属性：auto-fill、auto-fit
	所以，reapeat函数可以实现自适应效果。自动生成网格的列数
	后面会详细讲解
*/

grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
```

内容撑起

```css
/*行宽度 最少是100px，最大是200px*/
grid-template-rows: minmax(100px, 200px);
/*行宽度 最少是100px，内容可以被撑起来*/
grid-template-rows: minmax(100px, auto);
```



**repeat函数**

* 第一个参数：表示轨道个数

  数字、auto-fill、auto-fit

  ```css
  /*含义：
  	auto-fill让一行内，尽可能有更多的列，这时是按照最小宽度200px分配空间的。
  	如果一行中最后剩余空间不足200px，即不能再放下一个列了，就会把剩余空间平均分配到每一列上（这是每列也就大于了200px）
  	
  	
  	auto-fill与auto-fit只有一个差别：
  	比如，我有3个网格元素，占据屏幕3*200 =600px；两个gap占据2*20=40px 。共计640px
  	如果，此时屏幕宽度为840px
  	auto-fill会有4列，只不过最后一列是空的
  	auto-fit会有3列，它会将没有被占用的列的宽，分配给已存在的3列
  */
  
  .container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-auto-rows: minmax(100px, auto);
    grid-gap: 20px;
  }
  ```

  ![2023-01-19 16.25.13](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/20230119162624%20.gif)

* 第二个参数：表示轨道尺寸

  尺寸（10px、1fr）、minmax函数

  minmax函数可以让轨道具有动态变化的尺寸，是一种更灵活的方式

  ```
  minmax(最小值，最大值)
  
  //参数取值：(参考：https://blog.csdn.net/taotaomin99/article/details/73076771)
  //尺寸（10px、1fr）
  //max-content  容纳全部内容的理想宽度（文字不会换行，而是直接撑起轨道）
  //min-content  单元格最小宽度，可以不让内容溢出单元格
  //auto  如果用于最大值，那么auto值相当于max-content值；如果用于最小值，那么auto值相当于min-content
  ```

  







### 网格主轴

grid-auto-flow：row（默认）、column

例子：主轴水平，子元素大于定义的网格数量会自动增加行（隐式行）

```css
grid-auto-flow: row; /*默认值，可以不写*/
```

![image-20230322100003994](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/20230322100004%20.png)

例子：主轴竖直，子元素大于定义的网格数量会自动增加列（隐式列）

```
grid-auto-flow: column;
```

![image-20230322095752363](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/20230322095752%20.png)

### 子网格分布

注意Grid网格放置方式，与主轴无关。例如：不会像Flex布局，在Flex布局中justify-content指定主轴分布，主轴会变化。而Grid中永远指定的是水平方向的布局

`justify-*`水平分布

`align-*`竖直分布

`place-*`简写

* **justify-item、align-item、place-item（前两个的简写）属性**

  子元素在所属网格中的位置

  ```
  值：start | end | center | stretch
  ```

  水平、竖直都是start

  ![image-20230323003750945](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/20230323003751%20.png)

  水平、竖直都是center

  ![image-20230323003846741](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/20230323003847%20.png)

  

- **justify-content、align-content、place-content（前两个的简写）属性**

  所有网格在Grid父元素中的位置

  ```
  值：start | end | center | stretch | space-around | space-between | space-evenly
  ```

  水平、竖直居中

  ![image-20230323004851619](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/20230323004851%20.png)

  水平、竖直都是space-around

  ![image-20230323005005540](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/20230323005005%20.png)

  水平space-between

  ![image-20230317140954614](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Go/20230317140955%20.png)

  一行内的两个子网格，靠两边

  ```
  .good-container{
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2,328rpx);
    justify-item: space-between;
  }
  ```

  

### 默认放置子元素

`grid-auto-flow`默认为row时：子元素会按照水平方向，一行一行的放置

![image-20230322100003994](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/20230322100004%20.png)



`grid-auto-flow`默认为column时：子元素会按照竖直方向，一列一列的放置

![image-20230322095752363](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/20230322095752%20.png)

### 按区域放置子元素

定义完网格，我们就可以在其中放置元素了。（可以指定多个相邻的网格为一个区域，放置元素）

这里有个很好的例子可以参考：https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid-template-areas

```css
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>

<body>
    <div class="container">
        <div class="header">头</div>
        <div class="aside">侧边栏</div>
        <div class="main">主体</div>
        <div class="footer">底部</div>
    </div>
</body>
<style>
    *{
        margin: 0;
        padding: 0;
    }
    .container {
        width: 100vw;
        height: 100vh;
        display: grid;
        grid-template-columns: 1fr 4fr;
        grid-template-rows:1fr 4fr 1fr;
				
      	/*定义的网格是 2*3 的，这里需要给每个网格元素命名*/
        grid-template-areas:
                "header header"
                "aside main"
                "footer footer";

    }

    .header {
      	/*这里将网格元素的名字，给对应的元素设置上。这些元素就会放置到这些网格中*/
        grid-area: header;
        background-color: red;
    }
    .aside{
        grid-area: aside;
        background-color: yellow;
    }
    .main{
        grid-area: main;
        background-color: green;
    }
    .footer{
        grid-area: footer;
        background-color: blue;
    }
</style>
</html>

```

效果：

![image-20230119164536215](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/20230119164536%20.png)

### 按网格编号放置子元素

![image-20230404170612696](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/JS/20230404170613%20.png)

网格水平和竖直的编号从1开始

如果指定的元素区域刚好覆盖网格间距，则占用间距，否则不占用。例如：

```
元素放置在：水平1到3，竖直1到4

中间的间距会被占用
```

![image-20230404171059738](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/JS/20230404171100%20.png)

```css
/*水平开始、结束编号*/
grid-row-start:1;
grid-row-end: 3;

/*竖直开始、结束编号*/
grid-column-end:1;
grid-column-end:4;
```

简写：

```css
/*
grid-area: grid-row-start / grid-column-start / grid-row-end / grid-column-end | itemname;
*/
grid-area: 4/1/3/4;
```

span关键字

```css
/*span 2表示跨越2个网格，因为在参数grid-row-end的位置，所以是从上到下*/
/*span 3表示跨越3个网格因为在参数grid-column-end的位置，所以是从左到右*/
grid-area: 2 / 1 / span 2 / span 3;
```



### 网格中使用定位

经过测试对网格中的子元素使用absolut、fixed，使得定位的盒子脱离文档流想当于该子元素脱离了网格，不再占据网格中的位置

经过测试sticky属性，能更简单实现下面的布局。而不必给中间主体内容div设置上下padding

![image-20230322104006628](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/20230322104007%20.png)

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>

<body>
    <div class="container">
        <div class="header">header</div>
        <div class="content">
盒子垂直外边距重叠垂直方向上，两个盒子的上下外边距如果挨上，就会发生重叠，间距变为其中最大的那个外边距值。注意：BFC容器内：如果情况一中的两个盒子处于BFC（后面会讲到）中时，会继续存在盒子外边距重叠的情况。但是在情况二中，如果父盒子是BFC容器，子盒子的撒上边框和父盒子的上边框不会出现外边距重叠的情况
FFC容器内：不存在盒子垂直外边距重叠的情况情况一：两个盒子相离的关系，上下边距会合并
outer display type对外显示方面，盒子类型可以分成 2 类：块级盒子 和行内级盒子
块级盒子：display 为 block、list-item、table、flex、grid、flow-root 等；所有块级盒子都会对外参与 BFC，呈现垂直排列
行内级盒子：display 为 inline、inline-block、inline-table 等；所有行内级盒子都会对外参与 IFC，呈现水平排列
#html元素html元素都有默认的display值，基本分为三类：block占满一行，默认继承父元素的宽度；多个块元素将从上到下进行排列
设置 width/height 将会生效设置 padding 和 margin 将会生效不会占满一行，宽度随着内容而变化；多个 inline 元素将按照从左到右的顺序在一行里排列显示，如果一行显示不下，则自动换行
设置 width/height 将不会生效
设置竖直方向上的 padding 和 margin 将不会生效
是行内块元素，不单独占满一行，可以看成是能够在一行里进行左右排列的块元素
设置 width/height 将会生效
设置 padding 和 margin 将会生效
元素默认值对应的视觉模型
        </div>
        <div class="footer">footer</div>
    </div>
</body>
<style>
    div{
        font-size: 100px;
    }
    .container {
        min-height: 100vh;
        display: grid;
        grid-auto-flow: column;
        grid-template-columns: 100%;
      	/*min-content代表按照内容撑起来*/
        grid-template-rows: min-content 1fr min-content; 
      	/*这句可有可无，因为grid-auto-flow为column，网格默认按照子元素顺序从上至下放置元素*/
        grid-template-areas: 
                        "header"
                        "content"
                        "footer";

    }
    .header{
        width: 100%;  
        background-color: red;
        position: sticky;
        top: 0;
        left: 0;
    }
    .footer{
        position: sticky;
        bottom: 0;
        background-color: blue;
    }
</style>

</html>
```

### 类似BootStrap的栅格系统

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style type="text/css">
        .container {
            width: 100vw;
            display: grid;
            grid-template-columns:repeat(12, 1fr);
            border: solid 1px red;

        }

        .col-1 {
            grid-column-end: span 1;
        }

        .col-2 {
            grid-column-end: span 2;
        }

        .col-3 {
            grid-column-end: span 3;
        }

        .col-4 {
            grid-column-end: span 4;
        }


        .container div[class^='col'] {
            background-color: yellow;
            background-clip: content-box;
            border: solid 1px black;
            padding: 5px;
            grid-row-end: span 2;
            grid-column-end: span 2;
        }
    </style>
</head>
<body>
<div class="container">
    <div class="col-2">1</div>
    <div class="col-4">2</div>
    <div class="col-4">3</div>
    <div class="col-2">4</div>
</div>
</body>
</html>
```



## 格式上下文（详细版）

回一下前面讲的4类格式上下文：BFC 、IFC 、FFC 、GFC，这里详细的讲解下

### BFC

图是从[这篇文章](https://juejin.cn/post/6941206439624966152)拿的，仔细看，html内为BFC上下文，body内可建立BFC或IFC

![image-20220217171648420](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220217171648420%20.png)

**如何创建 BFC？**

- 根元素html内部默认为BFC
- 设置浮动的元素内部默认为BFC，元素的float属性默认为 none，需要设置为为left｜right
- 非溢出的可见元素内部默认为BFC，可见元素的overflow 默认为为 visible，需要设置为hidden｜scroll
- 定位元素内部默认为BFC，position 默认为static，需要设置为 absolute 或 fixe
- display 为 **inline-block**、table-cells、**flex**

以上条件只要满足一个，元素内部就是BFC。

还要注意`div`元素默认不是BFC容器，需要使用上面的方式，变成BFC容器，比如添加`overflow:hidden`

**BFC 渲染规则**

- BFC容器内部的盒子会在垂直方向，一个接一个地放置
- BFC容器内部的盒子垂直方向的距离由 margin 决定，属于同一个 BFC 的两个相邻子盒子的 margin 会发生重叠
- 每个内部盒子的左外边距（margin-left），与BFC容器的左边框（left-border）相接触(对于从左往右的格式化，否则相反)，即使存在浮动也是如此
- BFC 的区域不会与 float 盒子重叠
- BFC 就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此
- 计算 BFC 的高度时，浮动元素也参与计算

BFC容器内部均符合以上效果

**BFC 应用场景或造成的问题**

一、BFC块能感应到浮动元素 （可实现2栏自适应布局）

​		左侧固定宽度的浮动元素，右侧BFC元素占据剩余宽度。分析下这种现象的成因：

* 左侧浮动盒子已经脱离文档流，BFC元素就与左侧盒子占据了同一行
* 但是BFC能感知到脱离文档流的浮动元素，这就会产生以一种现象，即使两个盒子处在同一行，BFC块也不会占据浮动元素的位置
* 增加窗口宽度，左侧宽度不变，右侧BFC元素宽度随页面宽度增加。BFC元素默认宽度仍然遵循盒子模型的规则，即继承父元素的宽度，只不是出去左侧浮动元素后的宽度

![image-20210411222840116](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/%E9%9D%A2%E8%AF%95%E7%9B%B8%E5%85%B3/image-20210411222840116.png)

```html
<div class="left">LEFT</div>
<div class="right">RIGHT</div>

<style>
  *{
        margin: 0;
        padding: 0;
    }
    body {
        width: 100%;
        position: relative;
    }
    
 .left {
        width: 100px;
        height: 150px;
        float: left;
        background: rgb(139, 214, 78);
        text-align: center;
        line-height: 150px;
        font-size: 20px;
    }
 
    .right {
        overflow: hidden;
        height: 300px;
        background: rgb(170, 54, 236);
        text-align: center;
        line-height: 300px;
        font-size: 40px;
    }
</style>
```

二、解决盒子处置外边距重叠

将两个盒子分别放入两个BFC容器中，BFC容器内是独立区域，两个BFC不会垂直方向外边距重叠

![image-20220218182040150](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220218182040150%20.png)

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
	</head>
	<style>
		* {
			padding: 0;
			margin: 0;
		}

		.container {
			width: 100%;
			height: 300px;
		}
			
		.BFC-box{
			overflow: hidden;
		}

		.first {
			width: 50px;
			height: 50px;
			background-color: red;
			margin-bottom: 20px;
		}

		.second {
			width: 50px;
			height: 50px;
			background-color: blue;
			margin-top: 30px;
		}
	</style>
	<body>
		<div class="container">
			<div class="BFC-box">
				<div class="first">1</div>
			</div>
			<div class="BFC-box">
				<div class="second">2</div>
			</div>
		</div>
	</body>
</html>

```

三、浮动塌陷问题

浮动元素脱离文档流，父容器无法被撑起来，入下图所示

![image-20220218182821052](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220218182821052%20.png)

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
	</head>
	<style>
		* {
			padding: 0;
			margin: 0;
		}

		.container {
			width: 100%;
			border: solid 2px blue;
		}
			
		.float-box{
			width:100px;
			height: 100px;
			background-color: red;
			float: left;
			
		}
			
		
	</style>
	<body>
		<div class="container">
			<div class="float-box">浮动</div>
		</div>
	</body>
</html>

```

给父容器添加属性`overflow: hidden;`，就变成了BFC容器，就能撑起父容器

![image-20220218183104133](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220218183104133%20.png)

### IFC

IFC 的形成条件非常简单，块级元素中仅包含内联级别元素，需要注意的是当IFC中有块级元素插入时，会产生两个匿名块将父元素分割开来，产生两个 IFC。

## 层叠上下文



## CSS选择器

用于选中某个元素，然后就可以给这个元素添加样式了

### 选择器列表

文档地址：http://css.doyoe.com/selectors/index.htm

![image-20220410005859770](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220410005859770.png)

下面仅对常用的选择器进行介绍

### 选择器基础

* 一个元素可添加多个class，空格分隔。多个class中，如果出现重复属性，后面的覆盖前面的

  ```html
  <div class="content-block box-font"></div>
  .content-block{}
  .box-font{}
  ```

* 选择器可以叠加使用，最后确定选中的元素

  ```css
  .school .class>h2+h1{
    
  }
  ```

* 多个选择器，可以使用一个样式集合，逗号分隔

  ```html
  .content-block,.box-font{
  }
  ```

### 元素选择器

* **元素名**

  ```html
  <div></div>
  div{}
  ```

* **id选择器和类选择器**

  ```html
  <div id="t-box" class="t-box-c"></div>
  #t-box{}
  .t-box-c{}
  ```

### 关系选择器

我们以一下这段HTML为例子，看看不同选择器的选择效果

```html
<div class="container">
    <h1>test1</h1>
    <div>
        <h1>test2</h1>
        <h2>test3</h2>
    </div>
    <h2>test4</h2>
</div>
```

* **后代选择器（空格）**

  只能选择container下的后代元素（孩子+孙子+...）中的所有h1【可以看到test2这个元素能被选中】

  ```html
  .container h1{
      color: red;
  }
  ```

  ![image-20220416001630258](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220416001630258.png)

* **孩子选择器（>）**

  只能选择container下的孩子元素中的所有h1

  ```
  .container>h1{
      color: red;
  }
  ```

  ![image-20220416001658747](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220416001658747.png)

* **兄弟选择器（～）**

  前面已经说了`>h1`选中了内容为`test1`的元素，`~h2`则是选中这个元素的兄弟中所有的`h2`

  ```
  .container>h1~h2{
      color: red;
  }
  ```

  ![image-20220416001944779](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220416001944779.png)

* **临近兄弟选择器**

  这个例子，HTML更换为

  ```html
  <div class="container">
      <h2>上面的兄弟</h2>
      <h1>test1</h1>
      <h2>下面的兄弟</h2>
      <div></div>
      <h2>下面的稍远的兄弟</h2>
  </div>
  ```

  仅能选中h1下面紧挨着的是h2才能被选中

  ```css
  .container>h1+h2{
      color: red;
  }
  ```

  ![image-20220416002605230](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220416002605230.png)

### 属性选择器

* **按照属性名选择**

  选中元素是E且其包含属性att的元素

  ```html		
  <div name></div>
  div[name]
  ```

  ```html
  <div name title></div>
  div[name][title]{ /*选中包含name和title属性的元素*/
  	
  } 
  ```

* **按照属性名和属性值选择**

  ```
  div[name="btn"] 属性值是btn
  
  div[name^="btn"] 属性值是btn开头的
  
  div[name$="btn"] 属性值是btn结尾的
  
  div[name*="btn"] 属性值中包含btn的 ,比如  <div name="elbtnee"></div>
  
  div[name～="btn"] 属性值中包含"btn"单独的一个词的（空格区分开），比如  <div name="el btn ee"></div>
  
  div[name|="btn"] 属性是btn和以btn-开始的
  ```

### 伪类选择器

对于不确定存在的元素 或 元素的某种状态进行选择

* **状态选择器**

  给`<a>`可以添加一下选择器，但是需要注意，书写需要按照一定顺序才会生效

  ![image-20220416110330256](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220416110330256.png)

  ```text
  :link  /*选中a链接最初的状态*/
  :visited     /*选中a链接被点击完成，松开鼠标点击的状态*/
  :hover  /*选中鼠标悬浮在a链接上的状态*/
  :active /*选中链接被点击下的状态*/
  ```

  其中 `:hover`和`:active`可以用在`<a>`标签以外的元素

  **还有**

  `:fouce` 获取焦点的状态

* **结构伪类选择器**

  `E:伪类选择器`，前的E可有可无，加上不过多了，只能选中E这个限

  例如：

  ```vue
  <template>
  	<div class="score-box">
    	<div class="item">项目1</div>
    	<span>备注</span>
    	<div class="item">项目2</div>
    	<div class="item">项目3</div>
  	<div>
  </template>
  
  <style>
    /*不指定元素，就选中.score-box下第二个子元素，即span标签*/
  	.score-box :nth-of-type(2) {
    	color:red
  	}
    /*就选中.score-box下的div元素，且是第二个div，即`项目2`*/
    .score-box div:nth-of-type(2) {
    	color:green
  	}
  </style>  
  ```

  **首位位置选择**

  ```text
  E:first-child /*E是其所在父元素内部的,且其排在第一个位置，才会被选中*/
  E:last-child 同理
  ```

  ```html
  <div class="container">
      <h1>test1</h1>
      <div>
          <h1>test2</h1>
          <h2>test3</h2>
      </div>
      <h2>test4</h2>
  </div>
  
  <style>
  	.container :first-child{ /*选中内容为test1和test2的元素*/
     		color: red;
  	}
  </style>
  ```

  ```css
  <div class="container">
  		<h2>1111</h2>
      <h1>test1</h1>
      <div>
          <h1>test2</h1>
          <h2>test3</h2>
      </div>
      <h2>test4</h2>
  </div>
  
  <style>
  	.container h1:first-child{ /*选中内容为test2的元素，test1不是在其所在的层级里不是第一个，所以不能被选中*/
      	color: red;
  	}
  </style>
  ```

  ****

  ```text
  E:first-of-type /*E是其所在父元素中，不必排在第一个位置，从上到下找到的第一个E即可；如果一个层级出现多个，仅会选中第一个E*/
  E:last-of-type 同理
  ```

  ```html
  <div class="container">
  		<h2>1111</h2>
      <h1>test1</h1>
      <div>
          <h1>test2</h1>
          <h2>test3</h2>
      </div>
      <h2>test4</h2>
  </div>
  
  <style>
  	.container h2:first-of-type{ /*选中内容为1111和test3的元素，注意test4不会被选到，因为这个层级里第一次出现的h2的内容是1111的元素*/
      	color: red;
  	 }
  </style>
  ```

  **指定位置选择**

  ```text
  E:nth-child(参数x) /*E是其所在父元素中，且第x个位置就是E，才会被选中*/
  
  参数
  - n：取值范围从1开始到无穷，也就是所有位置中是E的选中（特别注意n从1开始）
  - 含n的表达：比如n+3，表示从3个开始都选中；-n+3，表示从1到选中
  - 1，2... ：指定第几个位置
  -	odd：奇数位置，比如1、3、5，等同于2n-1
  -	even：偶数位置，比如2、4、6，等同于2n
  
  E:nth-last-child 同理
  ```

  ```text
  E:nth-of-type(参数x) /*与前面的first-of-type一样，参数x不是位置，而是选中第x个E*/
  ```

  **唯一选择**

  ```text
  E:only-of-type /*E是其所在父元素中，唯一一个E，才会选中*/
  ```

  ```html
  <div class="container">
      <h2>test1</h2>
      <h1>test2</h1>
      <h2>test3</h2>
  </div>
  <style>
  	.container>h1:only-of-type{/*未选中任何元素*/
      color: red;
  	}
  	.container>h2:only-of-type{/**选中test1的元素/
      color: red;
  	}
  </style>
  ```

  **排除选择**

  ```
  E:not(选择器)
  ```

  ```html
  <div class="container">
      <h2>test1</h2>
      <h2>test2</h2>
      <h2>test3</h2>
  </div>
  <style>
  	.container :nth-child(n):not(:nth-child(2)){ /*选中test1和test2*/
      	color:red
  	}
  </style>
  ```

* **其他选择器**

  根选择器

  ```text
  :root /*选中所有元素*/
  ```

  空选择器

  ```
  :empty
  ```

  ```html
  .container{
      width: 200px;
      height: 200px;
      border: red solid 1px;
  }
  .container :empty{ /*注意这里的空格，是后代选择器，在所有后代中的空元素*/
      width: 100%;
      height: 20px;
      background-color: green;
  }
  
  <div class="container">
      <div>11</div>
      <div></div>
  </div>
  ```

  ![image-20220416111546282](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220416111546282.png)
  
* **`::before` 和 `::after`**

  通过伪类选择器（`::before` 和 `::after`），给目标元素添加一个伪元素。伪元素顾名思义，不是真正的dom元素，而是一个通过伪类，给目标元素添加一个假的元素

  **使用规则**
  
  * `::before` 和 `::after`前的元素是目标元素

  * 一个目标元素只能有一个`::before` 和一个 `::after`

    ![image-20220408000851569](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220408000851569.png)
  
    ```html
    <!DOCTYPE html>
    <html>
    	<style type="text/css">
    		.box{
    			position: relative;
    		}
    		
    		.box::after {
    			content: "1";
    			position: absolute;
    			width: 50px;
    			height: 50px;
    			background-color: red;
    
    		}
        /*第二个after会覆盖第一个*/
    		.box::after {
    			content: "2";
    			position: absolute;
    			width: 50px;
    			height: 50px;
    			background-color: red;
    		}
    		
    			
    	</style>
    	<body>
    		<div class="box"></div>
    	</body>
    </html>
    ```
  
  * 必须要有content属性，content可以为文字，也可为空字符
  
  * 目标元素添加`position: relative;`，伪元素添加`position: absolute;`，伪类元素转换为块级元素，可设置宽高，且以**目标元素**的左上角为参考系
  
  **例子**
  
  ![image-20220407231554582](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/image-20220407231554582.png)
  
  ```html
  <!DOCTYPE html>
  <html>
  	<style type="text/css">
  		.box::before {
  			content: "方块";
  			position: absolute;
  			top: 50px;
  			width: 100px;
  			height: 100px;
  			border-radius: 2px;
  			background-color: red;
  
  			display: flex;
  			flex-direction: row;
  			justify-content: center;
  			align-items: center;
  
  			font-size: 30px;
  			color: white;
  		}
  			
  	</style>
  	<body>
  		<div class="box" style="width:200px;height:200px;background-color: blue; position: relative;"></div>
  	</body>
  </html>
  ```
  
  **注意**：普通选择器无法选中伪元素的，必须要使用伪类选择器（`::before` 、`::after`）选中目标元素
  
  `.box:hover::after{}`就是给`class=box`的元素添加hover选择器，然后再找到`::after`伪类
  
  ![2022-04-07 23.56.15](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/2022-04-07%2023.56.15.gif)
  
  ```html
  <!DOCTYPE html>
  <html>
  	<style type="text/css">
  			
  		
  		.box{
  			position: relative;
  		}
  		
  		
  		.box::after {
  			content: "";
  			position: absolute;
  			width: 200px;
  			height: 200px;
  			background-color: red;
  			transition: 2s;		
  		}
  			
  		.box:hover::after{
  			transform: rotate(360deg);
  		}
  			
  	</style>
  	<body>
  		<div class="box"></div>
  	</body>
  </html>
  ```
  

​	

### 注意hover

将鼠标放到目标元素上，被操作元素就会执行css代码

如果不写**被操作元素**，默认被操作元素就是目标元素

```
目标元素选择器:hover 被操作元素选择器{
	控制被操作元素的css样式
}
```

例如:

选择控制兄弟元素`.box1:hover+.box2`

![2022-04-09 20.04.30](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/2022-04-09%2020.04.30.gif)

```html
<!DOCTYPE html>
<html>
	<style type="text/css">
			
		.box1{
			width: 200px;
			height: 100px;
			background-color: red;
		}
			
		.box2{
			width: 200px;
			height: 100px;
			background-color: blue;
			margin-top: 10px;
		}
		
		.box1:hover+.box2{
			transition-duration: 2s;
			transform: translateX(1000px)
			
		}
	</style>
	<body>
		<div class="box1"></div>
		<div class="box2"></div>
	</body>
</html>
```

## table

**table默认单元格之间有间距**

```text
border-collapse: separate; //默认为separate单元格之间有间距，collapse取消间距
border-spacing:10px 20px;//设置单元格间距
```

![image-20220423191555042](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220423191555042.png)

```html
<style>
	table{
    border: 1px solid black;
	}
  td{
      border: 1px solid black;
  }
</style>
<table>
    <tr>
        <td>112222</td>
        <td>
            <div>
                诗，汉语一级字，读作shī，最早见于战国文字，其本义是把心中的思想表达出来的语言，后延伸至比喻美妙而富于生活情趣或能引发人强烈感情的事物等。《说文解字》认为是“心志”。
            </div>
        </td>
    </tr>
</table>
```

**踩坑**

当设置单元格内文字不换行时，如果文字过多，给table和td设置的width就可能会失效。下图表格就超出100vw的宽度，第一个单元格也被压缩了

![image-20220423193133607](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220423193133607.png)

使用这个属性，强制宽度生效（表格保持100vw的宽度，第一个单元格宽度正常）

```css
table-layout:fixed; //默认为auto
```

![image-20220423193431809](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220423193431809.png)

```html
<!DOCTYPE html>
<html>
<head>

    <meta charset="utf-8">
    <style type="text/css">
        *{
            padding: 0;
            margin: 0;
        }
        table{
            width:100vw;
            background-color: red;
            border-collapse: collapse;
            table-layout:fixed;
        }
        td{
            border: 1px solid black;
        }

    </style>
    <script>
    </script>
</head>
<body>
<div>
    <table>
        <tr>
            <td  style="width: 200px; ">112222</td>
            <td>
                <div style="white-space: pre; overflow: scroll">
                    诗，汉语一级字，读作shī，最早见于战国文字，其本义是把心中的思想表达出来的语言，后延伸至比喻美妙而富于生活情趣或能引发人强烈感情的事物等。《说文解字》认为是“心志”。
                </div>
            </td>
        </tr>
    </table>
</div>
</body>
</html>
```

## 图像



## 变形与透视

### 属性列表

|                             属性                             | 版本 | 继承性 |                 描述                 |
| :----------------------------------------------------------: | :--: | :----: | :----------------------------------: |
|                          transform                           | CSS3 |   无   |            设置对象的变换            |
|                       transform-origin                       | CSS3 |   无   |      设置对象发生变换的参照原点      |
| [transform-style](http://css.doyoe.com/properties/transform/transform-style) | CSS3 |   无   | 指定某元素的子元素是否位于三维空间内 |
| [perspective](http://css.doyoe.com/properties/transform/perspective.htm) | CSS3 |   无   |    指定观察者与「z=0」平面的距离     |
| [perspective-origin](http://css.doyoe.com/properties/transform/perspective-origin.htm) | CSS3 |   无   |           指定透视点的位置           |
| [backface-visibility](http://css.doyoe.com/properties/transform/backface-visibility.htm) | CSS3 |   无   |    指定元素背面面向用户时是否可见    |

### transform

平面的轴线，除了图中的X、Y轴，还有Z轴，**Z轴垂直于屏幕，正方向指向屏幕外**

![image-20220410111700895](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220410111700895.png)

* **平面移动**：translate、translateX、translateY

  ```css
translateX(100px); /*参数正数：水平右移；负数：水平左移*/
  
  translateY(100px); /*参数正数：水平下移；负数：水平上移*/
  
  translate(100px,100px); /*水平竖直同时移动，第一个参数是水平，第二个是竖直*/
  ```
  
  **参数为百分比时，表示的是自身的宽高的百分比**

* **缩放**：scale、scaleX、scaleY

  ```css
  scaleX(2)  /*放大为自身宽度的2倍*/
  scaleY(2)  /*放大为自身高度的2倍*/
  scale(2,0.5) 	/*宽高同时缩放，宽度放大2倍，高度缩小0.5倍 */
  ```

  **旋转**：rotate、rotateX、rotateY

  参数是角度，一般使用度数（deg），还有其他角度单位

  |                      角度单位                      | 版本 |       描述       |
  | :------------------------------------------------: | :--: | :--------------: |
  |  [deg](http://css.doyoe.com/values/angle/deg.htm)  | CSS3 |  度（Degrees）   |
  | [grad](http://css.doyoe.com/values/angle/grad.htm) | CSS3 | 梯度（Gradians） |
  |  [rad](http://css.doyoe.com/values/angle/rad.htm)  | CSS3 | 弧度（Radians）  |
  | [turn](http://css.doyoe.com/values/angle/turn.htm) | CSS3 | 转、圈（Turns）  |
  
  rotateX和rotateY分别绕 X轴和Y轴旋转
  
  ```css
  {
    /* 以X轴为旋转轴，旋转45deg*/
  	transform:rotateX(45deg)
  }
  ```
  
  rotate是以Z为轴，在2d平面旋转，正数是顺时针旋转
  
  ```css
  .box:hover{
     transform: rotate(45deg); /*查看下图的效果*/
  }
  ```
  
  ![2022-04-10 16.33.28](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/2022-04-10%2016.33.28.gif)

* **倾斜**：skew、skewX、skewY

  参数是角度

  举个例子：

  ![2022-04-10 16.39.50](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/2022-04-10%2016.39.50.gif)

  ```css
  .box:hover{
     transform: skew(45deg);
  }
  ```

### transform-origin

变形的参考点，

可选值：第一个参数是水平位置，第二个是竖直位置【以元素左上角为参考点】

```
[<length>|<percentge>|left|center①|right] [<length>|<percentge>|left|center②|right ]
```

默认值为元素中心，即 `transform-origin:center center`或者`transform-origin:50% 50%`

例子：

![2022-04-10 16.37.05](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/2022-04-10%2016.37.05.gif)

```html
<!DOCTYPE html>
<html>
    <style type="text/css">
        .container{
            width: 100vw;
            height: 100vh;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
        }

        .box{
            width: 200px;
            height: 200px;
            background-color: red;
            margin-right: 10px;
            transform-origin: left top;
            transition: 2s;
        }
        .box:hover{
            transform: rotate(45deg);
        }

    </style>
    <body>
        <div class="container">
            <div class="box"></div>

        </div>
    </body>
</html>
```



### 案例

#### 图集案例

![2022-04-10 13.01.21](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/2022-04-10%2013.01.21.gif)

```html
<!DOCTYPE html>
<html>
<style type="text/css">
    .container{
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .box{
        width: 200px;
        height: 100px;
        background-color: red;
        margin-right: 10px;
    }
    .box img{
        width: 100%;
        height: 100%;
        transition: 2s;
    }
    .box:hover img{
        transform: scale(1.5);
    }



</style>
<body>
    <div class="container">
        <div class="box"><img src="https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/%E5%8D%9A%E5%AE%A2%E5%A4%B4%E5%83%8F/avatar.png"></div>
        <div class="box"><img src="https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/%E5%8D%9A%E5%AE%A2%E5%A4%B4%E5%83%8F/avatar.png"></div>
        <div class="box"><img src="https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/%E5%8D%9A%E5%AE%A2%E5%A4%B4%E5%83%8F/avatar.png"></div>
    </div>
</body>
</html>
```



## 过渡（transition）

上一章节学习了变形，过渡就是同一Dom元素在两种不同形态之间变化的过程。transition属性，可以控制过渡的时间和过渡的效果

### 属性列表

|            属性            | 继承性 |                             描述                             |
| :------------------------: | :----: | :----------------------------------------------------------: |
|         transition         |   无   |                           复合属性                           |
|    transition-property     |   无   | 设置对象中哪些属性参与过渡效果（默认值all：所有属性都参与过渡效果） |
|    transition-duration     |   无   |               过渡持续的时间（默认无过渡时间）               |
| transition-timing-function |   无   | 过渡变化的速度趋势（比如：过渡速度由快到慢，默认值为ease：慢-快-慢） |
|      transition-delay      |   无   |          设置对象延迟固定时间才开始过渡（默认为0s）          |

### 过渡基础

![2022-04-02 20.22.46](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/2022-04-02%2020.22.46.gif)

* 当鼠标移动到图形上时：正方形——>圆形；当鼠标移动开时：圆形——>正方形

* 给两种状态之间设置过渡，需要给**结束状态**增加`transtion`属性

* 例子

  **上图的例子**

  hover选择器继承了box中的所有transition相关的属性，所以相当于hover中也有`transition:2s;`所以当鼠标进入div区域时，会花费2s变成圆形。我们也可以单独控制变成圆形的过渡效果，即给`.box：hover`设置`transition`属性

  ```html
  <!DOCTYPE html>
  <html>
  	<style type="text/css">
  		.box{
  			width: 100px;
  			height: 100px;
  			background-color: red;
  			transition:2s;/*恢复正方形花费2s*/
  		}
  		.box:hover{
  			border-radius: 50%;/*变成圆形 花费2s（继承.box中的transition属性）*/
  		}
  	</style>
  	<body>
  		<div class="box"></div>
  	</body>
  </html>
  ```

  **分开设置：（正方形——>圆形） 和 （圆形——>正方形） 过渡**

  ![2022-04-08 00.37.50](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/2022-04-08%2000.37.50.gif)

  ```html
  <!DOCTYPE html>
  <html>
  	<style type="text/css">
  		.box{
  			width: 100px;
  			height: 100px;
  			background-color: red;
  			transition:2s; /*恢复正方形花费2s*/
  		}
  		.box:hover{
  			border-radius: 50%;
  			transition:0.5s; /*变成圆形 花费0.5s*/
  		}
  	</style>
  	<body>
  		<div class="box"></div>
  	</body>
  </html>
  ```

  **只设置：（正方形——>圆形） 过渡**

  ![2022-04-10 12.20.48](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/2022-04-10%2012.20.48.gif)

  ```html
  <!DOCTYPE html>
  <html>
  <style type="text/css">
      .box{
          width: 100px;
          height: 100px;
          background-color: red;
  
      }
      .box:hover{
          border-radius: 50%;
          transition:2s; /*变成圆形 花费2s*/
      }
  </style>
  <body>
  <div class="box"></div>
  </body>
  </html>
  
  ```

  记忆小技巧：transtion属性在哪个选择器设置，那个选择器中的属性，就是结束状态呈现的效果

### transition基础属性

**transition-property** 设置对象中哪些属性参与过渡效果（默认值all：所有属性都参与过渡效果），未设置的属性仍然发生变化，只不过没有tranistion属性设置的过渡效果，是瞬间完成变化

**transition-duration** 过渡持续的时间（针对transition-property指定的属性起作用）

**transition-delay** 延迟指定时间，开始过渡效果（针对transition-property指定的属性起作用）

例子中：

状态（正方形，红色）——>（圆形，蓝色）

设置border-radius参与过渡效果，过渡持续时间为2s。背景色不参与过渡效果，过渡时间设置无效





![2022-04-02 20.36.52](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/2022-04-02%2020.36.52.gif)

```html
<!DOCTYPE html>
<html>
	<style type="text/css">
		.box{
			width: 100px;
			height: 100px;
			background-color: red;
			
			transition-property: border-radius;
      transition-duration:2s;
		}
		.box:hover{
      transition-duration:3s;
      
			border-radius: 50%;
			background-color: blue;
		}
	</style>
	<body>
		<div class="box"></div>
	</body>
</html>

```

**注意**：三个属性，如果有多个值，用逗号分隔。有几种情况需要注意：

```css
/*两个属性个数对应，
	则 width变化过渡2s，height变化过渡1s
	transition-delay同理
*/
.box{
  transition-property: width,height;
	transition-duration:2s,1s;
  transition-delay:2s,3s;
}

/*两个属性个数不对应，属性个数>时间个数，则会从第一个时间开始继续分配给剩下的属性
  则width变化过渡2s，height变化过渡1s，background-color变化过渡2s
	transition-delay同理
*/
.box{
  transition-property: width,height,background-color;
	transition-duration:2s,1s;
  transition-delay:2s,3s;
}

/*两个属性个数不对应，属性个数<时间个数,多出来的时间没有作用的属性，则无效
  则width变化过渡2s，height变化过渡1s
	transition-delay同理
*/
.box{
  transition-property: width,height;
	transition-duration:2s,1s,3s;
}
```

### transition-timing-function

**transition-timing-function** 过渡变化的速度趋势（比如：过渡速度由快到慢）。默认值为ease，速度：慢-快-慢

**可选值**

* 预设的贝塞尔曲线：`ease`、`linear`、`ease-in`、`ease-out`、`ease-in-out`

* 贝塞尔曲线cubin-bezier()描述速度变化

  使用[贝塞尔曲线](https://cubic-bezier.com/#0,0,.58,1)这个网站，生成自己想要的贝塞尔曲线值

  ![image-20220408005602972](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220408005602972.png)

* step过渡

  前两种都是线性变化，而step是一步一步的变化

  * steps(n,start) 表示把过渡时间分为n份，在每份时间的**开始**，发生变化

  * steps(n,end) 表示把过渡时间分为n份，在每份时间的**结束**，发生变化

    下面的例子：steps(3,start)为把3s的过渡到时间分为3份，一份为1s，鼠标放上去的瞬间，就完成第一秒的变化。如果使用steps(3,end)，鼠标放上去第一秒结束的瞬间，才会完成第一秒的变化

    ![2022-04-09 19.00.25](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/2022-04-09%2019.00.25.gif)

    ```html
    <!DOCTYPE html>
    <html>
    	<style type="text/css">
    		.box{
    			width: 100px;
    			height: 100px;
    			background-color: red;
    		}
    		.box:hover{
    			border-radius: 50%;
    			transition-duration:3s;
    			transition-timing-function: steps(3,start);
    		}
    	</style>
    	<body>
    		<div class="box"></div>
    	</body>
    </html>
    ```

  *  step-start 和  step-end

    相当于 steps(1,start) 和steps(1,end) ，把过渡时间分为1份，即在开始或结尾，变化一次

### transtion

**transition** 复合属性，所有的transition相关的属性都可以用这一个属性定义

**只需要注意**：

出现一个时间，默认为transtion-duration属性；出现两个时间，按先后顺序分别为transtion-duration、transition-delay属性

其他属性没有顺序限制，写在任意位置，不写就为默认值

* 一个过渡效果

  ```css
  {
    transition: 3s 1s linear background;
  }
  ```

* 多个过渡效果，用逗号分隔

  ```css
  {
    transition: border-raduis 3s 1s linear ,
    	color 3s 1s linear ,
    	background-color 3s 1s linear ,
    ;
  }
  ```

### 过渡事件

通过Dom事件，在过渡完成后，给另一个元素添加过渡

![2022-04-08 00.15.19](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/2022-04-08%2000.15.19.gif)

```html
<!DOCTYPE html>
<html>
	<style type="text/css">
		div {
			width: 200px;
			height: 200px;
			position: relative;

		}

		div::before {
			content: "方块";
			position: absolute;
			width: 200px;
			height: 200px;
			border-radius: 2px;
			background-color: red;

			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;

			font-size: 30px;
			color: white;

			transition: 2s;
		}


		div:hover::before {
			transform: rotate(360deg);
		}

		div::after {
			content: "hello world";
			position: absolute;
			width: 200px;
			bottom: -30px;
			text-align: center;

			transform: translateX(-999px) skew(45deg);
			transition: 1s;
		}

		div.move::after {
			transform: translateX(0) skew(0deg);
		}
	</style>
	<body>
		<div></div>
	</body>
	<script type="text/javascript">
		document.querySelector('div').addEventListener("transitionend",(e)=>{
			document.querySelector('div').className='move'
		})
	</script>
</html>
```

### 点赞案例

![2022-04-10 01.40.52](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/2022-04-10%2001.40.52.gif)

```html
<!DOCTYPE html>
<html>
	<link rel="stylesheet" href="http://apps.bdimg.com/libs/fontawesome/4.2.0/css/font-awesome.min.css">
    <script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>
    <style type="text/css">
		.container{
			position: relative;
			top: 20px;
			left: 20px;
		}

		.box1{
			color: red;
			position: absolute;
		}
		.box2{
			color: gray;
			position: absolute;
		}

		.change{
			transition: 2s ease-in-out;
			transform: scale(3);
			opacity: 0;
			color: red;
		}
	</style>
	<body>
		<div class="container" onclick="heart()">
			<div class="box1"><i class="fa fa-heart" aria-hidden="true"></i></div>
			<div class="box2"><i class="fa fa-heart" aria-hidden="true"></i></div>
		</div>
	</body>
    <script>
        function heart() {
            $('.box2').toggleClass('change')
        }
    </script>
</html>
```



## 动画

### 参考

B站这个UP发布了很多关于CSS动画效果的视频，推荐学习

https://space.bilibili.com/451368848

![image-20230827194520322](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20230827194520%20.png)

### 动画属性

|                             属性                             | 版本 | 继承性 |                   描述                   |
| :----------------------------------------------------------: | :--: | :----: | :--------------------------------------: |
| [animation](http://css.doyoe.com/properties/animation/animation.htm) | CSS3 |   无   | 复合属性。检索或设置对象所应用的动画特效 |
| [animation-name](http://css.doyoe.com/properties/animation/animation-name.htm) | CSS3 |   无   |      检索或设置对象所应用的动画名称      |
| [animation-duration](http://css.doyoe.com/properties/animation/animation-duration.htm) | CSS3 |   无   |       检索或设置对象动画的持续时间       |
| [animation-timing-function](http://css.doyoe.com/properties/animation/animation-timing-function.htm) | CSS3 |   无   |       检索或设置对象动画的过渡类型       |
| [animation-delay](http://css.doyoe.com/properties/animation/animation-delay.htm) | CSS3 |   无   |       检索或设置对象动画延迟的时间       |
| [animation-iteration-count](http://css.doyoe.com/properties/animation/animation-iteration-count.htm) | CSS3 |   无   |       检索或设置对象动画的循环次数       |
| [animation-direction](http://css.doyoe.com/properties/animation/animation-direction.htm) | CSS3 |   无   |  检索或设置对象动画在循环中是否反向运动  |
| [animation-play-state](http://css.doyoe.com/properties/animation/animation-play-state.htm) | CSS3 |   无   |         检索或设置对象动画的状态         |
| [animation-fill-mode](http://css.doyoe.com/properties/animation/animation-fill-mode.htm) | CSS3 |   无   |     检索或设置对象动画时间之外的状态     |

**注意**

animation是多个属性的缩写属性。其他属性值，没有先后顺序，

只需要注意，如果设置时间：

`1s`，则作为定义了animation-duration

`1s 2s`，则第一个时间为animation-duration、第二个时间为animation-delay



### popup弹出动画案例

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
	</head>
	<style>
		* {
			padding: 0;
			margin: 0;
		}

		.container {
			width: 100vw;
			height: 70vh;
			background-color: red;
			transform: translateY(100vh);
			animation: 0.4s forwards ease-in-out popup-enter;
		}
			
    
		@keyframes popup-enter { 
		  from {
		    transform: translateY(100vh); /* 表示盒子的上边框位置距离浏览器框100vh */
		  }
		  to {
		    transform: translateY(calc(100vh - 100%)); /* 表示盒子的上边框位置距离浏览器框100vh - 自己的高度 = 30vh*/
		  }
		}
	</style>
	<body>
		<div class="container">
			
		</div>
	</body>
</html>

```

![image-20220315103542379](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220315103542379%20.png)



### 跳动动画案例

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title></title>
</head>
<style>
    .globe {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: red;
        animation: beat 2s linear infinite;
    }

    @keyframes beat {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.4);
        }
        100% {
            transform: scale(1);
        }
    }


</style>
<body>
<div class="globe"></div>
</body>
</html>

```

### loading动画案例

![image-20221023145927157](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/20221023145927%20.png)

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title></title>
</head>
<style>
    .toast {
        width: 100px;
        background-color: rgba(0, 0, 0, 0.5);
        color: white;
        border-radius: 8px;
        padding: 10px 15px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

    }

    .cricle {
        width: 15px;
        height: 15px;
        margin-right: 10px;
        border: dotted 3px white;
        border-radius: 100%;
        animation: tr 2s linear infinite;
    }

    @keyframes tr {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }


</style>
<body>
	<div class="toast">
    <div class="cricle"></div>
    加载中...
	</div>
</body>
</html>

```



### 骨架屏幕案例

地址：https://codepen.io/hyj199678/pen/LYMEyMG

效果图：

![image-20230824014445238](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20230824014445%20.png)

<p class="codepen" data-height="300" data-theme-id="dark" data-default-tab="html" data-slug-hash="LYMEyMG" data-user="hyj199678" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/hyj199678/pen/LYMEyMG">
  骨架屏幕</a> by h (<a href="https://codepen.io/hyj199678">@hyj199678</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

### IOS卡片展开效果

地址：https://codepen.io/hyj199678/pen/WNdMyGp

效果图：

![image-20230827183908188](/Users/yc/Library/Application Support/typora-user-images/image-20230827183908188.png)

记录：

```
过渡贝塞尔曲线：cubic-bezier(0, 1, 0.95, 1.05)

图片地址：https://source.unsplash.com/900x600/?nature,water,1
```



<p class="codepen" data-height="300" data-theme-id="dark" data-default-tab="html" data-slug-hash="WNdMyGp" data-user="hyj199678" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/hyj199678/pen/WNdMyGp">
  iOS卡片展开特效</a> by h (<a href="https://codepen.io/hyj199678">@hyj199678</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

### 打字机效果

知识点：

```plain
ch单位
```

地址：https://codepen.io/hyj199678/pen/zYyrGbJ

<p class="codepen" data-height="300" data-theme-id="dark" data-default-tab="html" data-slug-hash="zYyrGbJ" data-user="hyj199678" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/hyj199678/pen/zYyrGbJ">
  Untitled</a> by h (<a href="https://codepen.io/hyj199678">@hyj199678</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

### 文字弹出效果

地址：https://codepen.io/hyj199678/pen/dywGMQE?editors=1111

<p class="codepen" data-height="300" data-theme-id="dark" data-default-tab="html" data-slug-hash="dywGMQE" data-user="hyj199678" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/hyj199678/pen/dywGMQE">
  弹出文字效果</a> by h (<a href="https://codepen.io/hyj199678">@hyj199678</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

### 高度展开动画

* 利用`grid-template-row:0fr`
* 子元素设置`min-height:0`

```html
<div class="question">
  <div>问题？</div>
  <div class="answer">
    <!--
				answer用的grid布局，通过改变grid-template-rows，可以触发动画
				其子元素必须套一个盒子，指定min-height:0 ； overflow: hidden;
		-->
    <div class="fold-area">
      <div>选项</div>
      <div>选项</div>
      <div>选项</div>
    </div>
  </div>
</div>

.question {
  border-radius: 6px;
  overflew: hidden;
  padding: 5px 20px;
  box-sizing: border-box;
  background: #eee;
}
.question:hover .answer {
  grid-template-rows: 1fr;
}
.answer {
  display: grid;
  grid-template-rows: 0fr;
  overflow: hidden;
  transition: 1s;
}
.fold-area {
  min-height: 0;
}

```



<p class="codepen" data-height="300" data-theme-id="dark" data-default-tab="html" data-slug-hash="XWoKBYY" data-user="hyj199678" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/hyj199678/pen/XWoKBYY">
  Untitled</a> by h (<a href="https://codepen.io/hyj199678">@hyj199678</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>



### 滚动视差

本质：

```css
background: url("https://source.unsplash.com/900x600/?nature,water,1")
    no-repeat center/cover;

/*文字以外的部分裁剪掉*/
-webkit-background-clip: text;

/*文字内的部分，设置颜色透明，就会漏出背景图*/
-webkit-text-fill-color: transparent;


/*滚动时，修改背景图的background-position的水平、竖直值，就会出现文字内部是变化的*/
```

视差：

正常情况下，向下滚动页面，页面元素随着页面向上滚动出屏幕。视差就是通过 获取 window.scrollTop 知道页面向上滚动了多少，同时设置页面元素的位置不等于该值（window.scrollTop），比如设置元素margin-top是window.scrollTop*2，那你就会发现该元素会不随着屏幕滚动，而是向下移动
比如这个例子：https://www.bilibili.com/video/BV14A411o7Kd/?spm_id_from=333.999.0.0&vd_source=e46d9099be60057b5a16a45fac0d5248



<p class="codepen" data-height="300" data-theme-id="dark" data-default-tab="html" data-slug-hash="VwqPMvv" data-user="hyj199678" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/hyj199678/pen/VwqPMvv">
  滚动视差效果</a> by h (<a href="https://codepen.io/hyj199678">@hyj199678</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## 小知识点 

### 计数器伪类

```html
<div class="suggest-item">第一段</div>
<div class="suggest-item">第二段</div>
<div class="suggest-item">第三段</div>
<div class="suggest-item">第四段</div>
```

```css
.suggest-item{
  text-align: left;
  counter-increment: row; /* 指定了自增变量row */
}
.suggest-item::before{
  content: counter(row)'、'; /* counter(row) 对应每一个 1、2、3.... , 如需要拼接内容直接加引号  */
}
```

### not选择器的使用

最后一个子项没有下划线

![image-20230616165222944](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/JS/20230616165223%20.png)

使用伪类添加下划线

```css
/*  E:not(:last-child) 表示选中，除去最后一个detail-list-item的其他子项 */

.detail-list-item:not(:last-child)::after{
  content: '';
  width:630rpx;
  height: 2rpx;
  background-color: #eeeeee;
  position: absolute;
  bottom:0;
  left: 50%;
  transform: translateX(-50%);
  
}
```



### 强烈安利的sticky属性

sticky有一个特点是其他所有定位属性，不具备的点，非常重要的点：

**可被普通元素感知**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body style="font-size: 100px">
  <div style="height:20vh;position:sticky;top:0;background: red">header</div>
  <div style="height:200vh;background: yellow">body</div>
</body>
</html>
```

![image-20230317174135823](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/20230317174136%20.png)

换成fixed吸顶的话，头部脱离文档流漂浮了起来，会压住底部的黄色。过去的解决方案通常是，给黄色加个`padding-top`撑开一定的空间

sticky在实现类似下面这种吸顶组件时，省去了通过js获取吸顶栏高度的过程

![image-20230317174321958](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/20230317174322%20.png)



### 被撑起来的高度

当高度是被子元素撑起来的，子元素设置高度100%是不生效的

情景：父元素不设置高度，子元素A有不固定的高度（比如由内部文字撑开，具体多高不一定），要求子元素B会根据父元素高度自适应

![image-20220801142013118](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/JS/20220801142013%20.png)



例如：

![image-20220929181242762](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/20220929181243%20.png)

实现(微信小程序使用view标签):

注意`height: auto`和`align-items: stretch;`的使用

```html
<view class="container">
  <view class="left-right-box">
    <view class="left-part">
      <view class="left-part__title">广汽丰田致炫劲速版车型上市 售9.13-10.13万元</view>
      <view class="left-part__extra-info">旭子说车 <span>#Giulia</span></view>
    </view>
    <view class="right-part"></view>
  </view>
</view>
```

```css
.container{
  padding:32rpx 40rpx;
}
.left-right-box{
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
}
.left-part{
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
}
.left-part__title{
  font-family: PingFangSC-Regular;
  font-size: 34rpx;
  color: #222222;
  line-height: 44rpx;
  font-weight: 400;
}
.left-part__extra-info{
  font-family: PingFangSC-Regular;
  font-size: 24rpx;
  color: #999999;
  letter-spacing: 0;
  font-weight: 400;
}
.left-part__extra-info span{
  font-family: PingFangSC-Regular;
  font-size: 24rpx;
  color: #646464;
  letter-spacing: 0;
  font-weight: 400;
  margin-left: 16rpx;
}
.right-part{
  flex-shrink: 0;
  width:240rpx;
  height:160rpx;
  background-color: #eee;
}
```



### flex中的文本省略

大前提：

```
想要文本省略... ，必须要求盛放文字的盒子有宽度
```



情景1：

右侧固定宽高、左侧占据剩余宽度。***文字超出省略***

可是，左测flex子元素是通过设置flex-grow实现自动占据空余空间的，并没有设置宽度

![image-20230323180047341](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/20230323180047%20.png)







可以设置通过下面的方式左侧的盒子默认为最大宽度，且子元素能感知到其宽度

```
左flex子元素设置 width:1px;flex-grow: 1;
```

例子：

view是小程序的标签与div一样

```html
<view class="container">
    <view class="left-right-box">
      	<!--左侧盒子-->
        <view class="left-part">
            <view class="left-part__title">{{title}}</view>
            <view class="extra-info">
                <view class="left-part__extra-info--first">{{作者}} <span>#{{社区名}}</span></view>
                <view class="left-part__extra-info--second">
                    <image src="https://xxxxxx.png"/>
                    <span>{{2000}}</span>
                </view>
            </view>
        </view>
      	<!--右侧侧盒子-->
        <view class="right-part">
            <image src="xxxx" />
        </view>
    </view>   
</view>

```

```css
.container{
  margin:0 40rpx;
  padding:32rpx 0;
  border-bottom: 1rpx solid #f6f6f6;
}
.left-right-box{
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
}
/*左侧盒子设置 flex-grow: 1; display: flex;*/
.left-part{
  height: auto;
  width:1px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
}

.left-part__title{
  font-family: PingFangSC-Regular;
  font-size: 34rpx;
  color: #222222;
  line-height: 44rpx;
  font-weight: 400;

  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

/*底部的区域*/
.extra-info{ 
  width: 100%;
  font-family: PingFangSC-Regular;
  font-size: 24rpx;
  color: #999999;
  letter-spacing: 0;
  font-weight: 400;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
}
/*左侧，这里这里的方式*/
.left-part__extra-info--first{ 
  flex-shrink: 0;
  flex-grow: 1;
  width: 1px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: PingFangSC-Regular;
  font-size: 24rpx;
  color: #646464;
  letter-spacing: 0;
  font-weight: 400;

}
.left-part__extra-info--first span{
  margin-left: 16rpx;
}
/*右侧*/
.left-part__extra-info--second{
  flex-shrink: 0;
  flex-grow:0;
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #222222;
  font-weight: 400;
}
.left-part__extra-info--second image{
  width:32rpx;
  height: 32rpx;
  margin-right: 8rpx;
  vertical-align: bottom;
}
.right-part{
  flex-shrink: 0;
  width:240rpx;
  height:160rpx;
  background-color: #eee;
  border-radius: 10rpx;
  margin-left: 24rpx;
  overflow: hidden;
}
.right-part image{
  width: 100%;
  height: 100%;
}
```



情景2：

还是左右布局，右侧固定，左侧第一行【文字】+【标签】，标签靠左挨着文字。文字占据标签剩余的空间，超出隐藏

![image-20230323194100352](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/20230323194100%20.png)

![image-20230323191331863](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/20230323191332%20.png)

```html
<view class="m-flex-row m-flex-row--bottom coupon-list_top-block">
  	<!--左侧盒子=> flex-grow:1;width: 1px;-->
    <view class="m-flex-col m-flex-col--start m-flex-col--bottom m-flex-grow-1 coupon-item__title-detail">
      <!--核心1：第一行内容，宽度设置100%，占据左侧盒子全部宽度；子元素flex布局靠左-->
      <view class="m-flex-row m-flex-row--left" style="width: 100%;">
        <!--white-space: nowrap;overflow: hidden;text-overflow: ellipsis;-->
       	<view class="coupon-item__title"> {{优惠券标题}}</view>
        <!--核心3：标签设置不可以压缩；flex-shrink -->
       	<view class="m-flex-no-shrink feature-label">首单券</view>
       	<view class="m-flex-no-shrink feature-label">x天后过期</view>
      </view>
      <view class="coupon-item_desc" style="margin-top: 36rpx;">优惠券的描述优</view>
      <view class="coupon-item_desc" style="margin-top: 20rpx;">
      	2023.03.023-2023.04.01
      </view>
    </view>
  
  	<!--右侧盒子=> 不可压缩-->
    <view class="display:flex;flex-shrink:0;">
     	xxxx忽略
    </view>
  </view>
```



情景3：

在修改这块代码时出现过一种现象：绿色盒子区域正常，内部的两个蓝色盒子溢出了父级区域。后来发现，第一个绿色盒子加上

```js
width: 1px;
flex-grow:1;
flex-shrink:0;
```

就好了

记住这种内部盒子溢出的场景

![image-20230512162848121](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/JS/20230512162848%20.png)

### 子元素的宽度

**父元素是行内元素**

* 子元素是块级元素（不能这么写）

* 子元素是行内元素（只能是非img、input的行内元素）

  不可设置宽高属性，由其自身的内容撑起来

  

**父元素是块级元素**

* 子元素是块级元素

  子元素宽度默认为父元素宽度的100%（准确说是，子元素宽度=父元素content部分的宽度）

  ![image-20220801154354870](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/JS/20220801154355%20.png)

  ```html
  <div style="border:red solid 1px;">
      <div style="background-color: yellow;">询价按钮</div>
  </div>
  ```

* 子元素是行内元素

  * 可替换元素（只有img和input两种）

    以img为例子，默认按照图片实际大小展示，不受外部div影响。设置img宽度（高度），其会按照图片宽高比例自动设置高度（宽度）。

    一般习惯上设置img宽高均为100%，这样就会填充父级div

    ```html
    <div style="width:200px; height:100px;border:red solid 1px;">
        <img src="https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/%E5%8D%9A%E5%AE%A2%E5%A4%B4%E5%83%8F/avatar.png">
    </div>
    ```

    

  * 不可替换元素（span、p等等）

    不可设置宽高属性，由其自身的内容撑起来



**父、子都是块级元素，子元素脱离文档流**

relative时，子元素继承父元素宽度（准确说是，子元素宽度=父元素content部分的宽度）

![image-20220801172029272](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/JS/20220801172029%20.png)

```html
<div style="width:200px;height:200px;border:red solid 1px;">
    <div style="background-color:red; position: relative">子元素</div>
</div>
```

absolute、fixed时，由其内部撑起来

![image-20220801172052296](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/JS/20220801172052%20.png)

```html
<div style="width:200px;height:200px;border:red solid 1px;">
    <div style="background-color:red; position: absolute">子元素</div>
</div>
```

**父、子都是块级元素，父元素脱离文档流**

没影响，positon值是哪个，子元素都会继承父元素宽度

### white-space

重点关注white-space的不同属性，对于

* 文本中的空格、制表符
* 文本中的回车
* 文本遇到父元素边界是否自适应换行

等方面的影响

| 属性         | 作用                                                     |
| ------------ | -------------------------------------------------------- |
| normal(默认) | 所有空格、回车、制表符都合并成一个空格，文本自适应换行   |
| nowrap       | 所有空格、回车、制表符都合并成一个空格，文本不换行       |
| pre          | 所有东西原样输出，文本不自适应换行                       |
| pre-wrap     | 所有东西原样输出，文本自适应换行                         |
| pre-line     | 所有空格、制表符合并成一个空格，回车换行，文本自适应换行 |

pre-line是我很喜欢的属性，在下面例子中，标题是一样的字体但是分为了两行。采用pre-line就可以在文本中加入`\n`来实现换行

![image-20230119131650735](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Go/20230119131651%20.png)

### 三角形和梯形

**三角形**

三角形的原理就是当一个div的宽高为0时，四边的border就会变成三角形

![image-20220702160617596](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/20220702160617%20.png)

只留下底border，其他位置设置为透明

```css
.wrap {
   width: 0px;
   height: 0px;
   border:200px solid transparent;
   border-bottom-color: red;
}
```

![image-20220702161039306](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/20220702161039%20.png)

**梯形**

梯形的原理就是，设置宽高时，四边的border就是梯形

![image-20220702160831488](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/20220702160832%20.png)

同理，只留底边就是梯形

```css
.wrap {
    width: 250px;
    height: 0px;
    border:200px solid transparent;
    border-bottom-color: red;
}
```

![image-20220702161333562](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/20220702161334%20.png)

### 幽灵节点

**现象**

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <style>

            .wrap {
               background-color: red;
            }
            span{
                display: inline-block;
            }
        </style>
    </head>
    <body>
        <div class="wrap">
            <span></span>
        </div>
    </body>
</html>
```

使用chorme查看html样式，发现span的高度是0。但是，div被一种无形的东西撑起到22.5px，这个无形的节点，就是幽灵节点（官方翻译为行内元素的支柱）。幽灵节点无法查看，但是又确实存在

![image-20220702163949667](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/20220702163950%20.png)

![image-20220702163606132](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/20220702163606%20.png)

**出现条件**

块级元素中出现行级元素或inline-block元素

最为常见的场景就是，【图片+文字】的组合，如下：

![image-20230105100454264](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/JS/20230105100454%20.png)

![image-20230105100618425](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/JS/20230105100618%20.png)

**解决**

父级盒子设置font-size为零

```css
.wrap {
   background-color: red;
   font-size: 0;
}           
```

### 百分比

CSS中使用百分比绝大部分是父元素的百分比，且横向是父元素宽的百分比，纵向的是父元素高的百分比。举个例子：

元素的`margin-left：50%`含义就是左外边距是父元素宽度的50%

元素的`margin-top：50%`含义就是上外边距是父元素高度的50%

**注意有两个特殊的地方**

* transform的translate、translateX、translateY使用百分比，指的是自己的宽高的百分比
* padding的百分比，无论是上下左右都边距，都是自己宽度的百分比

### 固定宽高比 

需求：盒子宽度自适应，一行3个盒子,平分一行，超出换行。盒子宽高比为2:1

![image-20211215155845687](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Vue%E7%9B%B8%E5%85%B3/image-20211215155845687%20.png)

```html
<!DOCTYPE html>
<html>
	<head>
		<link rel="stylesheet" href="animate.min.css">
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title></title>
	</head>
	
	<style>
		.all-container{
			width: 100%;
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			flex-wrap: wrap;
		}
			
		.item{
			background-color: red;
			width: 31%;
			margin: 10px 1.1%;
			padding-bottom: 15.5%; 
			position: relative;
			
		}
			
		img{
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
		
		}
			
		.other{
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			background-color: #FFFF00
		}
	</style>
	<body>
		<div class="all-container">
			<div class="item">
				<img src="https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Vue%E7%9B%B8%E5%85%B3/image-20211130161443584%20.png">
			</div>
			<div class="item">
				<img src="https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Vue%E7%9B%B8%E5%85%B3/image-20211130161443584%20.png">
			</div>
			<div class="item">
				<div class="other">
					
				</div>
			</div>
			<div class="item">
				<!-- <img src="https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Vue%E7%9B%B8%E5%85%B3/image-20211130161443584%20.png"> -->
			</div>
		
		</div>
	</body>
	<script>
		
	
	</script>
</html>
```

几点注意：

* 3个盒子如何平分一行，需要自己手动计算百分比，这里每个盒子31%，3个盒子就是93%，剩余7%的空间给他们之间的margin，水平方向不会合并外边距（详见BFC内容），所以一行的margin分成6份，一份是1.1%，
* 如何保证宽高比2:1，padding的值是百分数时，无论是上下左右哪个内边距都是宽度的百分之几。
  * 利用这特性，当`width:31%`，设置`padding-bottm:15.5%`（**图上红色的块**）；这时候直接设置`background:url("")`即可将图片占据整个图形（**backgound默认占据content+padding的空间**）
  * 如果盒子的子元素是 img 或 div，则 处理有一点不同，参见代码

### 全屏div

使得div宽高定为浏览器视窗大小。如果内容高度超过一个视窗大小，就会没有被遮盖住且不能上下滚动

```
.bg {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: blue;
}
```

### 背景图片

情景：屏幕中间一个固定高为150px的div，一张蓝色背景图，最短时为整个屏幕高度，当内部元素比较大时，超出屏幕，则撑开背景图，则最外层背景div设置`min-height:100%`

因为如果设置`height:100%`,表示高度为屏幕高度，但是，当用户屏幕高度较小时，中部150px的div会撑出来，撑出来的部分底部没有背景

### 文本省略

**注意**：无论是单行文本还是多行文本，当设置div高度后，如果高度比较小，可能会出现，`...`因为超出盒子而被盖住

单行文字,超出部分用`...`代替

```css
width: 100%;
background-color: yellow;
overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis;
```

多行省略

```css
width:100%;
overflow: hidden;
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 3;
```

### 居中问题

* 块级元素居中

  利用margin实现水平居中，记住该块级元素必须有宽度

  ```
  margin:0 auto;
  ```

* 行内元素

  ```
  //父级盒子增加这个属性，可使的内部文本居中
  text-align:center;
  
  //行内元素行高=父级盒子高度
  height:100px;
  line-height:100px
  ```

* flex

* 绝对布局（实现居中）

![image-20210410175834199](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/%E9%9D%A2%E8%AF%95%E7%9B%B8%E5%85%B3/image-20210410175834199.png)

自己计算。手动设置 `left:50px; top:50px;`

```html
    <style>
       .red{
           background-color: red;
           height: 200px;
           width: 200px;
           /* 父元素得有position，子元素的位置才是相对于父元素变化 */
           position: relative;
       }
       .blue{
           background-color: blue;
           height: 100px;
           width: 100px;
           position:absolute;
           top:50px;
           left: 50px;
       }
    </style>   

   <div class="red">
       <div class="blue"></div>
   </div>
```

自动计算。直接设置 `left:50%; top:50%;`,然后设置transform属性向左向上，移动居中元素的高和宽的一半

```html
<style>
    .red{
        background-color: red;
        height: 200px;
        width: 200px;
        /* 父元素得有position，子元素的位置才是相对于父元素变化 */
        position: relative;
    }
    .blue{
        background-color: blue;
        height: 100px;
        width: 100px;
        position:absolute;
        /*父元素 高，宽的一半*/
        top:50%;
        left: 50%;

        /*blue块的高，宽的一半*/
        transform: translate(-50%,-50%);

    }
</style>
<div class="red">
    <div class="blue"></div>
</div>

```

如果子元素的宽高不确定（比如子元素的宽高是内部撑出来的），将`margin-left`换成`transform:translateX(-50%)`，注意tanslateX的参数如果是百分比，表示的是自己的宽度的百分比，同理，tanslateY，为自己高度的百分比

行级元素使用绝对布局后，会变成块级元素。可以设置`height`和`width`

![image-20210410184213796](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/%E9%9D%A2%E8%AF%95%E7%9B%B8%E5%85%B3/image-20210410184213796.png)

图上的左上的角标是行内元素span，但是可以控制宽高

```html
  <style>
       .red{
           background-color: orange;
           height: 200px;
           width: 200px;
           position: relative;
       }
       
       span{
           background-color:red;
           border-radius: 50%;
           position: absolute;
           left: 5px;
           top:5px;
           height: 50px;
           width: 50px;
           text-align: center;
           line-height: 50px;
       }
    </style>

    <div class="red"> 
        <span>新</span>
    </div>
```

### filter(滤镜效果) 

[菜鸟教程](https://www.runoob.com/cssref/css3-pr-filter.html)

```css
.parent{
			height: 500px;
			background:linear-gradient(to right,rgba(0,0,0,0.9),rgba(0,0,0,0.01)),url('./IMG_0490.JPG');
			filter: blur(3px);
			/* transform: scale(1.4); */
			overflow: hidden;
			background-size: cover;
			background-repeat:no-repeat; 
			position: relative;
		}
			
		.parent::before{
			content: "";
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			/* background: inherit; */
			transform: translate(-50%);
			background-image: linear-gradient(to right,rgba(0,0,0,0.9),rgba(0,0,0,0.01));
			filter: blur(7px);
		}
```

### CSS函数

[菜鸟教程](https://www.runoob.com/cssref/css-functions.html)

| 函数                                                         | 描述                                                         | CSS 版本 |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :------- |
| [attr()](https://www.runoob.com/cssref/func-attr.html)       | 返回选择元素的属性值。                                       | 2        |
| [calc()](https://www.runoob.com/cssref/func-calc.html)       | 允许计算 CSS 的属性值，比如动态计算长度值。                  | 3        |
| [cubic-bezier()](https://www.runoob.com/cssref/func-cubic-bezier.html) | 定义了一个贝塞尔曲线(Cubic Bezier)。                         | 3        |
| [hsl()](https://www.runoob.com/cssref/func-hsl.html)         | 使用色相、饱和度、亮度来定义颜色。                           | 3        |
| [hsla()](https://www.runoob.com/cssref/func-hsla.html)       | 使用色相、饱和度、亮度、透明度来定义颜色。                   | 3        |
| [linear-gradient()](https://www.runoob.com/cssref/func-linear-gradient.html) | 创建一个线性渐变的图像                                       | 3        |
| [radial-gradient()](https://www.runoob.com/cssref/func-radial-gradient.html) | 用径向渐变创建图像。                                         | 3        |
| [repeating-linear-gradient()](https://www.runoob.com/cssref/func-repeating-linear-gradient.html) | 用重复的线性渐变创建图像。                                   | 3        |
| [repeating-radial-gradient()](https://www.runoob.com/cssref/func-repeating-radial-gradient.html) | 类似 radial-gradient()，用重复的径向渐变创建图像。           | 3        |
| [rgb()](https://www.runoob.com/cssref/func-rgb-css.html)     | 使用红(R)、绿(G)、蓝(B)三个颜色的叠加来生成各式各样的颜色。  | 2        |
| [rgba()](https://www.runoob.com/cssref/func-rgba.html)       | 使用红(R)、绿(G)、蓝(B)、透明度(A)的叠加来生成各式各样的颜色。 | 3        |
| [var()](https://www.runoob.com/cssref/func-var.html)         | 用于插入自定义的属性值。                                     | 3        |

### CSS自定义变量

[深入学习CSS自定义属性(CSS变量)](https://www.w3cplus.com/css3/css-properties-in-depth.html)

```css
/* 定义 */
:root{
  --color:yellow
}

/* 使用 */
div{
	background-color:var(--color)
}
```

### 预定义样式

工作后，我发现，每天都在反复的使用flex布局，在一个css文件中，我可能反复写十几遍flex

```css
display:flex;
flex-direction:row;
....
```

这也太繁琐了，怎么解决呢?

我可以在项目中预定义一些class，通过给div增加class，来简化

```css
/* flex 主轴水平 */
.m-flex-row{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.m-flex-row--top{
    align-items: flex-start !important;
}
.m-flex-row--bottom{
    align-items: flex-end !important;
}
.m-flex-row--left {
    justify-content: flex-start !important;
}
.m-flex-row--right {
    justify-content: flex-end !important;
}
.m-flex-row--between {
    justify-content: space-between !important;
}
.m-flex-row--center{
    justify-content: center !important;
}
.m-flex-row--around{
  justify-content: space-around;
}

/*flex换行*/
.m-flex-row-wrap {
    flex-wrap: wrap;
}

/*flex 主轴竖直*/
.m-flex-col {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}
.m-flex-col--left {
    align-items: flex-start !important;
}
.m-flex-col--right {
    align-items: flex-end !important;
}
.m-flex-col--top {
    justify-content: flex-start !important;
}
.yc-flex-col--bottom {
  justify-content: flex-end !important;
}
.m-flex-col--center {
    justify-content: center !important;
}

/*flex shrink和grow*/
.m-flex-no-shrink {
    flex-shrink: 0 !important;
}
.m-flex-grow-1 {
    flex-grow: 1 !important;
}
.m-flex-1 {
    flex: 1;
}


/* start--文本行数限制--start */
.m-line-1, .yc-line-1 {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.m-line-2, .yc-line-2 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
}
```

如何使用？

* 微信小程序中：直接将预定义样式写在`app.wxss`，在page中可以直接使用，如果是在component中使用，需要在组件的js中增加以下代码

  ```js
  Component({
  	options:{
      addGlobalClass:true
  	}
  })
  ```

* 在Vue中，只需要在main.js中引入，在任何页面都可以使用

  ```
  import 'xxx.css'
  ```

### CSS层叠上下文(补充flex的关系)

[CSS堆叠上下文（The stacking context）](https://www.jianshu.com/p/2bc43e9680bc)

文档中的层叠上下文由满足以下任意一个条件的元素形成（加粗的是我经常用到的会触发层叠上下文情况）：

- 根元素 (HTML),
- **z-index 值不为 "auto"的 绝对/相对定位**
- 一个 z-index 值不为 "auto"的 flex 项目 (flex item)，即：父元素 display: flex|inline-flex的元素
- **opacity 属性值小于 1 的元素（参考 the specification for opacity）**
- **transform 属性值不为 "none"的元素**
- mix-blend-mode 属性值不为 "normal"的元素，
- filter值不为“none”的元素，
- perspective值不为“none”的元素，
- isolation 属性被设置为 "isolate"的元素，
- position: fixed
- 在 will-change 中指定了任意 CSS 属性
- -webkit-overflow-scrolling 属性被设置 "touch"的元素

**块级元素与行内元素**



两个块级元素，将第二个向上移动50px，效果如下图，同级别元素，后来者居上

![image-20220217115516362](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220217115516362%20.png)

```
.block1{
	width: 200px;
	height: 200px;
	background-color: red;
}

.block2{
	width: 100px;
	height: 100px;
	background-color: yellow;
	margin-top: -50px;
}

<body>
	<div class="block1"></div>
	<div class="block2"></div>
	<div class="position-block">定位元素</div>
</body>

```

**块级元素与定位元素**

定位元素脱离文档流，层级更高

![image-20220217120145986](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220217120145986%20.png)

```html
.block{
	width: 200px;
	height: 200px;
	background-color: red;
	position:relative;
}
.position-block{
	width: 100px;
	height: 100px;
	background-color: blue;
	position: absolute;
	top: 70px;
}

<body>
	<div class="block">块级元素</div>
	<div class="position-block">定位元素</div>
</body>
```

**同级别块级元素中的定位元素层级关系**

因为黄色块级元素和红色块级元素同层次，黄色后来者在上，黄色>红色（蓝色），又因为绿色>黄色，所以绿色>红色（蓝色）

![image-20220217121831534](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220217121831534%20.png)

```html
.block1{
	width: 200px;
	height: 200px;
	background-color: red;
	position: relative;
}
.block2{
	width: 200px;
	height: 200px;
	background-color: yellow;
	position: relative;
}


.position-block1{
	width: 100px;
	height: 100px;
	background-color: blue;
	position: absolute;
	top: 70px;
}
.position-block2{
	width: 100px;
	height: 100px;
	background-color: green;
	position: absolute;
	top: -70px;
}

<body>
	<div class="block1">块级元素1
		<div class="position-block1">定位元素1</div>
	</div>
	<div class="block2">块级元素2
		<div class="position-block2">定位元素2</div>
	</div>
</body>
```



**结论**：

1. 普通块级元素中，z轴元素的堆叠顺序如下：
    **正z-index > 定位元素（z-index：auto）>内联元素 > 浮动元素 > 块级元素 > border > background >负z-index**

2. 堆叠上下文中，z轴元素的堆叠顺序如下：
    **正z-index > 内联元素 > 浮动元素 > 块级元素 > 负z-index > border > background**

3. z轴顺序遵循两个原则：

   - **谁大谁上**

   - **大小一样，后来居上**

     ![image-20211201162048703](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Vue%E7%9B%B8%E5%85%B3/image-20211201162048703%20.png)

     ```html
     <style>
     .parent1 {
     			width: 100px;
     			height: 100px;
     			background: yellow;
     }
     		
     .parent2 {
     			width: 100px;
     			height: 100px;
     			background: blue;
     			margin-top: -50px;	
     }
     </style>
     
     <div class="parent1"></div>
     <div class="parent2"></div>
     ```

     

### 文档流

文档流只能决定元素是否占据正常文档流的空间，是否被其他元素遮盖是由**“层叠上下文”**决定的

脱离文档流：position:absolute和float两种，position:relative虽然位置变化了，但是原位置还是被占据的

**需注意**：BFC能感知到浮动元素

脱离文档流的表现：

* 其他的元素都感知不到脱离文档流的元素（除了BFC）

​		例子 ：正常，父元素被自元素撑起来，能感知到子元素

![image-20211201155207659](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Vue%E7%9B%B8%E5%85%B3/image-20211201155207659%20.png)

```html
<div class="parent">
	<div class="child"></div>
</div>
<style>
  .parent{
    background:yellow;
	}
  .child{
    width:100px;
    height:100px;
    background:blue;
	}
</style>
```

.child添加`position: absolute;`后，父元素感知不到子元素了，所有不能撑起来了![image-20211201155422009](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Vue%E7%9B%B8%E5%85%B3/image-20211201155422009%20.png)

* 但是它能感知到其他元素（包括脱离/未脱离文档流的元素）

  例子：正常，两个块级元素各自占据一行，上下排列

  

  ![image-20211201160118290](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Vue%E7%9B%B8%E5%85%B3/image-20211201160118290%20.png)

```html
<div class="parent1"></div>
		<div class="parent2"></div>
</div>
<style>
.parent1 {
			width: 100px;
			height: 100px;
			background: yellow;
}
		

.parent2 {
			width: 100px;
			height: 100px;
			background: blue;
}
</style>
```

如果，给.parent1添加`position: absolute;`parent1脱离的文档流，parent2感知不到parent1，就会占据前面的空余位置。由于（css层递上下文的规则：定位元素>块级元素，故黄色的在上面）

![image-20211201160319460](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Vue%E7%9B%B8%E5%85%B3/image-20211201160319460%20.png)

如果，给.parent2添加`position: absolute;`，parent2脱离的文档流，但是可以感知到parent1

![image-20211201161408653](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Vue%E7%9B%B8%E5%85%B3/image-20211201161408653%20.png)

### flex的大坑之纵向布局无法撑开父元素宽度

目标效果

![image-20221110114445868](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/20221110114446%20.png)

正常思路：

红色块设置高度，黄色块纵向排列，填满则换行

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title></title>
</head>
<style>
.all{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;

}
.globe{
    flex-shrink: 0;

    height: 100px;
    background: red;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: flex-start;
    margin-right: 10px;
}
.item{
    width: 50px;
    background: yellow;
    margin: 10px;
    writing-mode: horizontal-tb;
}
</style>
<body>
<div class="all">
    <div class="globe">
        <div class="item" >111</div>
        <div class="item" >111</div>
        <div class="item" >111</div>
        <div class="item" >111</div>
        <div class="item" >111</div>
    </div>
    <div class="globe">
        <div class="item" >222</div>
        <div class="item" >222</div>
        <div class="item" >222</div>
        <div class="item" >222</div>
        <div class="item" >222</div>
    </div>
</div>
</body>
</html>
```

实际效果：

![image-20221110114846834](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/20221110114847%20.png)

利用chrome浏览器隐藏第二个红色块及其子元素：可明细看出来，纵向排列无法撑起父元素宽度

![image-20221110114932278](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/20221110114932%20.png)

最终实现：利用`writing-mode`属性。

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title></title>
</head>
<style>
.all{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
}
.globe{
    flex-shrink: 0;

    height: 100px;
    background: red;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: flex-start;
    margin-right: 10px;
    writing-mode: vertical-lr;  /* 指定黄色块，竖直从上至下排列，从左到右列一列的排*/
}
.item{
    width: 50px;
    background: yellow;
    margin: 10px;
    writing-mode: horizontal-tb; /*每个黄色块内部的文字也会被垂直，需要再次指定文字从上到下*/
}
</style>
<body>
<div class="all">
    <div class="globe">
        <div class="item" >111</div>
        <div class="item" >111</div>
        <div class="item" >111</div>
        <div class="item" >111</div>
        <div class="item" >111</div>
    </div>
    <div class="globe">
        <div class="item" >222</div>
        <div class="item" >222</div>
        <div class="item" >222</div>
        <div class="item" >222</div>
        <div class="item" >222</div>
    </div>
</div>
</body>
</html>

```

### 水波增长动画

html

```html
<view class="upload-animation-wrapper">
  <view style="animation: rollover 10s linear infinite, moveup {{duration}} ease-out forwards;" class="progress-wave"></view>
  <image
    class="big-cloud-bg"
    src="https://mocard-1251489075.cos.ap-beijing.myqcloud.com/charge-mini-program/orderUploading/icon-big-cloud.png">
  </image>
  <image
    class="icon-blue-arrow-up"
    src="https://mocard-1251489075.cos.ap-beijing.myqcloud.com/charge-mini-program/orderUploading/icon-blue-arrow-up.png">
  </image>
</view>

```

css

```css
.upload-animation-wrapper {
  width: 220rpx;
  height: 156rpx;
  position: relative;
  margin: 238rpx auto 40rpx;
  overflow: hidden;
  background-color: #EAF1FF;
}

.progress-wave {
  position: absolute;
  top: 156rpx;
  left: 50%;
  width: 600rpx;
  margin-left: -300rpx;
  height: 600rpx;
  border-radius: 43%;
  z-index: 1;
  background-color: #C7D9FE;
}

.big-cloud-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
}

.icon-blue-arrow-up {
  width: 80rpx;
  height: 74rpx;
  position: absolute;
  top: 62rpx;
  left: 72rpx;
  z-index: 3;
  animation: bounce 1s ease-in-out infinite alternate;
}

@keyframes bounce {
  from {}

  50% {
    top: 42rpx;
  }

  to {
    top: 62rpx;
  }
}

@keyframes rollover {
  from {}

  to {
    transform: rotateZ(360deg);
  }
}

@keyframes moveup {
  from {}

  to {
    top: 0;
  }
}

```

核心是

```
.progress-wave这个元素边旋转、边上升
```



## 回流与重绘

[【开发必看】你真的了解回流和重绘吗？](https://zhuanlan.zhihu.com/p/54811712)

* 浏览器渲染页面的过程

  1. 浏览器把获取到的HTML代码解析成**DOM树**【根节点就是我们常用的document对象。DOM树里包含了所有HTML标签，包括display:none隐藏，还有用JS动态添加的元素等】

  2. 浏览器把所有样式(用户定义的CSS和用户代理)解析成**样式结构体**【在解析的过程中会去掉浏览器不能识别的样式，比如IE会去掉-moz开头的样式，而FF会去掉_开头的样式】
  3. DOM树和样式结构体组合后构建**render tree**

  4. 一旦render tree构建完毕后，浏览器就可以根据render tree来绘制页面了。

* **DOM树**和**render tree**区别：render tree类似于DOM tree，但区别很大，render tree能识别样式，render tree中每个NODE都有自己的style，而且 **render tree不包含隐藏的节点** (比如display:none的节点，还有head节点)，因为这些节点不会用于呈现，而且不会影响呈现的，所以就不会包含到 render tree中。

  **注意**： visibility:hidden隐藏的元素还是会包含到 render tree中的，因为visibility:hidden 会影响布局(layout)，会占有空间。

* 回流（重排），重绘的概念、触发条件，避免回流重绘的操作

  注意：display:none触发回流， visibility:hidden触发重绘。

  **注意**：回流必将引起重绘，而重绘不一定会引起回流。

  **1)回流（重排）**

  \- 当 render tree 中的一部分 因为元素的 **规模尺寸**， **布局**，**隐藏** 等改变 而需要重新构建。这就称之为回流(reflow) 。比如 ，下面这些属性改变时，会发生回流。

  ![img](https://pic3.zhimg.com/80/v2-d9f7a287bd3393e74f93f1cd1eb96b9a_720w.jpg)

  以下几种情况触发回流的情况常考：

  1、添加或者删除可见的DOM元素；

  2、元素位置改变；

  3、元素尺寸改变——边距、填充、边框、宽度和高度

  4、内容改变——比如文本改变或者图片大小改变而引起的计算值宽度和高度改变；

  5、页面渲染初始化；

  6、浏览器窗口尺寸改变——resize事件发生时；

  **2)重绘**

  render tree 的一些元素更新属性 ,这些属性只是影响元素的外观,风格 ,而不影响布局.比如:

  ![img](https://pic4.zhimg.com/80/v2-57c35d7b8d27ef4e52791636a22ebf57_720w.jpg)

  **flush队列**

  回流和重绘的开销很大，所以很多浏览器都会优化这些操作，浏览器会维护1个队列，把所有会引起回流、重绘的操作放入这个队列，等队列中的操作到了一定的数量或者到了一定的时间间隔，浏览器就会flush队列，进行一个批处理。这样就会让多次的回流、重绘变成一次回流重绘。但是！**当你获取布局信息的操作的时候，会强制队列刷新**，比如当你访问以下属性或者使用以下方法：

  - offsetTop、offsetLeft、offsetWidth、offsetHeight
  - scrollTop、scrollLeft、scrollWidth、scrollHeight
  - clientTop、clientLeft、clientWidth、clientHeight
  - getComputedStyle()
  - getBoundingClientRect

  **translate()是否会触发重绘,怎么避免触发重绘**

  不会，因为 GPU 进程会为其开启一个新的复合图层（硬件加速），不会影响默认复合图层（就是普通文档流），所以并不会影响周边的 DOM 结构，而属性的改变也会交给 GPU 处理，不会进行重排。

  【使 GPU 进程开启一个新的复合图层的方式还有 3D 动画，过渡动画，以及 opacity 属性，还有一些标签，这些都可以创建新的复合图层。这些方式叫做硬件加速方式。

  降低重排的方式：要么减少次数，要么降低影响范围

  **绝对布局**

  绝对布局脱离了文档流，不会影响普通文档流的 render tree，不会引起普通文档流的重绘和重排，但是会引起整个浮动图层的重绘和重排

## 硬件加速

使用transform（3D变换相关的值，translate3d、rotate3d、scale3d）、opacity、filters等属性，浏览器会启用css3硬件加速这些动画不会引起回流重绘 

## 适配相关知识

![1857BE33-B6AC-4D8C-8CE6-FDCC8C7CF397](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Vue%E7%9B%B8%E5%85%B3/1857BE33-B6AC-4D8C-8CE6-FDCC8C7CF397%20.png)

