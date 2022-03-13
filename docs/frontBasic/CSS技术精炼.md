# CSS技术精炼

## 参考资料

[css参考手册](http://css.doyoe.com/)

[腾讯云学习文档](https://cloud.tencent.com/developer/section/1071827)

[后盾人学习文档](https://doc.houdunren.com/css/1%20%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.html)

菜鸟教程

[1.5 万字 CSS 基础拾遗](https://juejin.cn/post/6941206439624966152)：个人强烈推荐有时间可以读一读

[彻底搞懂CSS层叠上下文、层叠等级、层叠顺序、z-index](https://juejin.cn/post/6844903667175260174)

## 盒子模型

![image-20220217154442918](https://gitee.com/hyj1270433876/blog-img/raw/master/Css%E7%9B%B8%E5%85%B3/image-20220217154442918%20.png)

### 盒子模型

标准盒子模型(浏览器默认)：`box-sizing:content-box;`，设置的宽/高是content的大小，如果给盒子增加padding/border/margin都会使得盒子的尺寸变大

怪异盒子模型：`box-sizing: border-box;`，设置的宽/高是border+padding+content的大小，如果给盒子增加padding/border/margin，盒子的尺寸不变，content缩小 

**注意**：

* 当不设置宽/高时，则padding/border/margin会撑开。如果设置了，还是保持怪异盒子的逻辑，向内挤压空间

* 当padding\*2就已经大于宽/高时，即content为0时都会超出了设置的宽高时，`box-sizing: border-box;`失效。看下面例子，宽/高都被撑到140px了，设置的宽/高才100px，所以还是被撑到140了）

![image-20210814235552645](https://gitee.com/hyj1270433876/blog-img/raw/master/%E8%B8%A9%E5%9D%91/image-20210814235552645%20.png)

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

![image-20210815004319605](https://gitee.com/hyj1270433876/blog-img/raw/master/%E8%B8%A9%E5%9D%91/image-20210815004319605%20.png)

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

  <img src="https://gitee.com/hyj1270433876/blog-img/raw/master/%E8%B8%A9%E5%9D%91/image-20211012165042255%20.png" alt="image-20211012165042255" style="zoom:50%;" />

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

![image-20211015094858916](https://gitee.com/hyj1270433876/blog-img/raw/master/%E8%B8%A9%E5%9D%91/image-20211015094858916%20.png)

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

![image-20220218113629144](https://gitee.com/hyj1270433876/blog-img/raw/master/Css%E7%9B%B8%E5%85%B3/image-20220218113629144%20.png)

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

![image-20220218114632865](https://gitee.com/hyj1270433876/blog-img/raw/master/Css%E7%9B%B8%E5%85%B3/image-20220218114632865%20.png)

**FFC内部不存在外边距塌陷**

使用flex布局,转化为弹性盒子模型(主轴水平)

![image-20211015095257320](https://gitee.com/hyj1270433876/blog-img/raw/master/%E8%B8%A9%E5%9D%91/image-20211015095257320%20.png)

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

![image-20220218143410520](https://gitee.com/hyj1270433876/blog-img/raw/master/Css%E7%9B%B8%E5%85%B3/image-20220218143410520%20.png)

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

`background`可用于对一个或多个设置值：`background-clip`，`background-color`，`background-image`，`background-origin`，`background-position`，`background-repeat`，`background-size`，和`background-attachment`

当不指定属性值时，采用初始默认值：

- `background-image`: `none` 
- `background-position`: `0% 0%` 
- `background-size`: `auto auto` 
- `background-repeat`: `repeat` 
- `background-origin`: `padding-box` 
- `background-clip`: `border-box` 
- `background-attachment`: `scroll` 
- `background-color`: `transparent`

**background-attachment**：如果指定了 `background-image` ，那么 `background-attachment`决定背景是在视口中固定的还是随包含它的区块滚动的

**background-clip**: 背景剪裁，默认值：border-box

| 常用可选值  | 含义                             |
| ----------- | -------------------------------- |
| border-box  | 背景范围：content+padding+border |
| padding-box | 背景范围：content+padding        |
| content-box | 背景范围：content                |

**background-origin**：背景图片左上角，放置在父元素的位置，默认值：padding-box

| 常用可选值  | 含义                             |
| ----------- | -------------------------------- |
| border-box  | 背景范围：content+padding+border |
| padding-box | 背景范围：content+padding        |
| content-box | 背景范围：content                |

注意：当使用`background-attachment`为fixed时，该属性将被忽略不起作用。

background-clip和backgound-origin一起使用时，先看背景图放置的位置是哪里，然后再看clip的值是什么，对背景图进行裁剪

**background-color**：背景颜色，默认值：transparent

| 常用可选值   | 含义                          |
| ------------ | ----------------------------- |
| 十六进制     | 如：#ffffff                   |
| rgb，rgba    | 如：rgba(255,255,255,0.1)     |
| 颜色关键字   | 如：red                       |
| currentcolor | 设置颜色为当前div中的文字颜色 |
| transparent  | 透明                          |

**background-image**：背景图片，默认值：没有图片

| 常用可选值                                                   | 含义                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| url( )                                                       | 设置背景图片(图片地址不用加引号)                             |
| linear-gradient(to top left,red,yellow)、radial-gradient()、repeating-linear-gradient()、repeating-radial-gradient() | 渐变图像（详见，css函数部分）                                |
| 值，值，值                                                   | 设置多个背景图片，越靠前面的处于越上层的位置（这样可以叠加多层图片） |

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

![image-20211130161443584](https://gitee.com/hyj1270433876/blog-img/raw/master/Vue%E7%9B%B8%E5%85%B3/image-20211130161443584%20.png)



**background-position**：背景位置，这个初始位置是相对于以background-origin定义的背景位置图层来说的

[background-positon-x,background-positon-y]

| 常用可选值                       | 含义                                                         |
| -------------------------------- | ------------------------------------------------------------ |
| left｜right，top｜bottom，center | 设置背景图片所处的位置，两个参数时，指定水平和竖直位置；一个参数时，未指定的是默认为center |
| 百分比                           | 设置多个背景图片，越靠前面的处于越上层的位置                 |
| 数值                             | background-position:10px 20px;为距离左边距（background-origin定义图片放置位置，默认是padding-box，10px就是到左边框的距离）为10px，上边距（同上）为20px |

**background-repeat**:背景重复，默认值：repeat，背景图像可以沿着水平轴，垂直轴，两个轴重复，直到填充满元素，最后的元素会被剪裁

| 单值      | 等价的双值（第一个值是水平，第二个值是垂直） |
| :-------- | :------------------------------------------- |
| repeat-x  | repeat no-repeat                             |
| repeat-y  | no-repeat repeat                             |
| repeat    | repeat repeat                                |
| space     | space space                                  |
| round     | round round                                  |
| no-repeat | no-repeat no-repeat                          |

| 常用可选值 | 含义                                                         |
| :--------- | :----------------------------------------------------------- |
| repeat     | 图像会按需重复来覆盖整个背景图片所在的区域， 如果最后一个图像，它的大小不合适的，会被裁剪 |
| space      | 图像会尽可能得重复, 但是不会裁剪。 第一个和最后一个图像会被固定在元素(element)的相应的边上, 同时空白会均匀地分布在图像之间<br />如果图像太大了，甚至没有足够的空间来完整显示一个图像才会裁剪。background-position会被忽略 |
| round      | **随着允许的空间在尺寸上的增长, 被重复的图像将会伸展(没有空隙), 直到有足够的空间来添加一个图像. 当下一个图像被添加后, 所有的当前的图像会被压缩来腾出空间. 例如, 一个图像原始大小是260px, 重复三次之后, 可能会被伸展到300px, 直到另一个图像被加进来. 这样他们就可能被压缩到225px.** |
| no-repeat  | 图像不会被重复                                               |

**background-size**：背景大小，图像可以保留其自然大小，拉伸到一个新的大小，或约束，以适应可用空间，同时保持其固有的比例

| 常用可选值  | 含义                                                         |
| ----------- | ------------------------------------------------------------ |
| cover       | 在保留其固有比例的同时，覆盖整个背景定位区域（可能会超出被裁剪） |
| contain     | 在保留其固有比例的同时，包含在背景区域内部（不会超出）       |
| 百分比/数值 |                                                              |
| 值,值,值    | 定义多个背景图时，使用逗号分隔                               |

**复合效果**

我们在业务中常常遇到，需要加载图片和视频的需求，网络因素的不确定性，导致图片或者视频时常加载失败，所以我们通常会把图片在放在一个容器中，把容器的背景设置为公司的logo。

可以往往背景色和logo图标是分开的（不能做成一张图，因为不同位置的图片/视频容器的宽高比坑不同，logo会被压缩/拉伸），好在我们的background是支持多图层的，还可以给每个图层分别配置属性

```html
<div class="img-content">
  <image src="">
</div>
```



![image-20220214215532410](https://gitee.com/hyj1270433876/blog-img/raw/master/Css%E7%9B%B8%E5%85%B3/image-20220214215532410%20.png)

`background-image`和`background`同时设置，默认图片在上层

```css
.img-content {
  width: 113px;
  height: 75px;
  border: 0 solid rgba(123, 123, 123, 0.2);
  border-radius: 3.77px;
  overflow: hidden;
  
  
  background: #dddddd;
  background-image: url(https://image.bitautoimg.com/yc-h5mp/hm-atom-h5/newCenter/yc-placeholder.png);
  background-size: 80%, 100%;  //默认background-image属性在上background之上，所以80%是设置图片的宽度，高度默认auto
  background-repeat: no-repeat;
  background-position: center;
}
```

### 盒子边框

border，border-width，border-style，border-color，border-radius属性跳过

**border-image**：边框图片

| 常用可选值                                | 含义 |
| ----------------------------------------- | ---- |
| image-source \| height \| width \| repeat |      |

**box-shadow**：盒子阴影，可以描述一个或多个阴影效果（多个时，用逗号分隔）

外阴影：offset-x指盒子右边框向外扩展，offset-y 指盒子下边框向下扩展

```javascript
box-shadow：offset-x | offset-y | blur-radius（模糊程度） | spread-radius（扩散程度） | color 
```

内阴影：offset-x指盒子左边框向内扩展，offset-y 指盒子上边框向内扩展

```
box-shadow：inset offset-x | offset-y | blur-radius（模糊程度） | spread-radius（扩散程度） | color 
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

![image-20210410003844069](https://gitee.com/hyj1270433876/blog-img/raw/master/%E9%9D%A2%E8%AF%95%E7%9B%B8%E5%85%B3/image-20210410003844069.png)

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

![image-20210410004406761](https://gitee.com/hyj1270433876/blog-img/raw/master/%E9%9D%A2%E8%AF%95%E7%9B%B8%E5%85%B3/image-20210410004406761.png)

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

（待补充）

浮动会脱离文档流，BFC块会能感知到float元素，

## 弹性盒子

### 弹性盒子属性

| 属性            | 作用                                                         |
| --------------- | ------------------------------------------------------------ |
| flex-direction  | 指定子元素的主轴方向。                                       |
| flex-wrap       | 指定子元素溢出是否换行。不写，则默认不换行，压缩子元素大小   |
| justify-content | 指定子元素在主轴上的布局方式。flex-start\|flex-end\|center\|space-between\|space-around\|space-evenly |
| align-items     | 控制交叉轴上的布局方式。stretch（默认拉伸子元素，但是必须保证子元素没有设置height）\|center\|flex-start\|flex-end |
| align-content   | 控制交叉轴上的布局方式。stretch\|center\|flex-start\|flex-end\|space-between\|space-around\|space-evenly |

`align-items`和`align-content`都是控制交叉轴的。两个有什么区别吗？

* 以下是`align-items=center`的效果。是对一行元素在交叉轴上的布局进行控制，只有4个参数。遇到多行子元素，只能控制多行中的某一行子元素。所以多行时，需要使用`align-content`

  ![image-20210411160717638](https://gitee.com/hyj1270433876/blog-img/raw/master/%E9%9D%A2%E8%AF%95%E7%9B%B8%E5%85%B3/image-20210411160717638.png)

* `align-content`是实现多行元素在垂直轴上的布局。可以通过`space-between|space-around|space-evenly`等属性实现均分的布局

  ![image-20210411162215655](https://gitee.com/hyj1270433876/blog-img/raw/master/%E9%9D%A2%E8%AF%95%E7%9B%B8%E5%85%B3/image-20210411162215655.png)

**巧用`space-between`和flex-grow**

顶部和底部设置高度，中心主体部分不设置高度，然后设置中心主体的权重`flex-grow=1`,就会直接占用了剩下的空间

![image-20210411165520455](https://gitee.com/hyj1270433876/blog-img/raw/master/%E9%9D%A2%E8%AF%95%E7%9B%B8%E5%85%B3/image-20210411165520455.png)

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

![image-20210411180524596](https://gitee.com/hyj1270433876/blog-img/raw/master/%E9%9D%A2%E8%AF%95%E7%9B%B8%E5%85%B3/image-20210411180524596.png)

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

![image-20220114104016386](https://gitee.com/hyj1270433876/blog-img/raw/master/Css%E7%9B%B8%E5%85%B3/image-20220114104016386%20.png)

这种情况下，可以使用`justify-content`属性。使用`justify-content: space-evenly`让一行内的盒子平均分布

![image-20220106161634332](https://gitee.com/hyj1270433876/blog-img/raw/master/Vue%E7%9B%B8%E5%85%B3/image-20220106161634332%20.png)

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

![image-20220113192443448](https://gitee.com/hyj1270433876/blog-img/raw/master/Css%E7%9B%B8%E5%85%B3/image-20220113192443448%20.png)

但是使用一下方法就可以实现居中：

* 代码中的`flex-basis:100%;`或`width:1px`的目的是使的两边的盒子宽度大小一样，具体值设置多少都可以。
* 盒子的`flex-grow: 1;flex-shrink: 1;`决定了盒子会自动伸缩，两个盒子始终平分，中间盒子剩下的空间。两边盒子即使内容太多，也不会挤压中间盒子

![image-20220113192633748](https://gitee.com/hyj1270433876/blog-img/raw/master/Css%E7%9B%B8%E5%85%B3/image-20220113192633748%20.png)

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

可以看出啊文字省略有效果了![image-20220117181914348](https://gitee.com/hyj1270433876/blog-img/raw/master/Css%E7%9B%B8%E5%85%B3/image-20220117181914348%20.png)

一行超出隐藏的前提是，必须使用了`flex-basis`或`width`确定了长度，否则超长的文字会尽可能的撑起来盒子，破坏原本的比例

![image-20220117182310508](https://gitee.com/hyj1270433876/blog-img/raw/master/Css%E7%9B%B8%E5%85%B3/image-20220117182310508%20.png)

实际需求场景：要求左右两侧两端对齐，中间的类型居中。考虑两个问题

1. 又有两侧文字有最大宽度，使用`max-width`，虚线的长短和文字的长短两个加起来应该是固定的
2. 中间的类型始终居中（使用上面的方法）



![image-20220114094922604](https://gitee.com/hyj1270433876/blog-img/raw/master/Css%E7%9B%B8%E5%85%B3/image-20220114094922604%20.png)

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

![image-20220114103905000](https://gitee.com/hyj1270433876/blog-img/raw/master/Css%E7%9B%B8%E5%85%B3/image-20220114103905000%20.png)

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

![image-20220209151433029](https://gitee.com/hyj1270433876/blog-img/raw/master/Css%E7%9B%B8%E5%85%B3/image-20220209151433029%20.png)

### sticky

使用`display:sticky`，给需要吸附效果的元素设置，以父容器为参考系，必须设置`top|bottom|left|right`，否则无效果。

例如：`top:10px`即元素上顶部到距离父容器顶部`10px`的位置就吸附

有两种情况需要知道：

* 一、多个吸附元素，属于同级关系时，向下滑动，下面的吸附元素会盖住，之前吸顶的元素

  ![image-20220209154228624](https://gitee.com/hyj1270433876/blog-img/raw/master/Css%E7%9B%B8%E5%85%B3/image-20220209154228624%20.png)

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

  ![image-20220209154058830](https://gitee.com/hyj1270433876/blog-img/raw/master/Css%E7%9B%B8%E5%85%B3/image-20220209154058830%20.png)

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
  
  ![image-20220217140916615](https://gitee.com/hyj1270433876/blog-img/raw/master/Css%E7%9B%B8%E5%85%B3/image-20220217140916615%20.png)
  
  ![image-20220217141124282](https://gitee.com/hyj1270433876/blog-img/raw/master/Css%E7%9B%B8%E5%85%B3/image-20220217141124282%20.png)
  
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

## 栅格布局

## 格式上下文（详细版）

回一下前面讲的4类格式上下文：BFC 、IFC 、FFC 、GFC，这里详细的讲解下

### BFC

图是从[这篇文章](https://juejin.cn/post/6941206439624966152)拿的，仔细看，html内为BFC上下文，body内可建立BFC或IFC

![image-20220217171648420](https://gitee.com/hyj1270433876/blog-img/raw/master/Css%E7%9B%B8%E5%85%B3/image-20220217171648420%20.png)

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

![image-20210411222840116](https://gitee.com/hyj1270433876/blog-img/raw/master/%E9%9D%A2%E8%AF%95%E7%9B%B8%E5%85%B3/image-20210411222840116.png)

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

![image-20220218182040150](https://gitee.com/hyj1270433876/blog-img/raw/master/Css%E7%9B%B8%E5%85%B3/image-20220218182040150%20.png)

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

![image-20220218182821052](https://gitee.com/hyj1270433876/blog-img/raw/master/Css%E7%9B%B8%E5%85%B3/image-20220218182821052%20.png)

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

![image-20220218183104133](https://gitee.com/hyj1270433876/blog-img/raw/master/Css%E7%9B%B8%E5%85%B3/image-20220218183104133%20.png)

### IFC

IFC 的形成条件非常简单，块级元素中仅包含内联级别元素，需要注意的是当IFC中有块级元素插入时，会产生两个匿名块将父元素分割开来，产生两个 IFC。

## 层叠上下文



## CSS选择器

| 选择器                                                       | 示例                  | 示例说明                                                   | CSS  |
| :----------------------------------------------------------- | :-------------------- | :--------------------------------------------------------- | :--- |
| [.*class*](https://www.runoob.com/cssref/sel-class.html)     | .intro                | 选择所有class="intro"的元素                                | 1    |
| [#*id*](https://www.runoob.com/cssref/sel-id.html)           | #firstname            | 选择所有id="firstname"的元素                               | 1    |
| [*](https://www.runoob.com/cssref/sel-all.html)              | *                     | 选择所有元素                                               | 2    |
| *[element](https://www.runoob.com/cssref/sel-element.html)*  | p                     | 选择所有`<p>`元素                                          | 1    |
| *[element,element](https://www.runoob.com/cssref/sel-element-comma.html)* | div,p                 | 选择所有`<div>`元素和`<p>`元素                             | 1    |
| [*element* *element*](https://www.runoob.com/cssref/sel-element-element.html) | div p                 | 选择`<div>`元素内的所有`<p>`元素                           | 1    |
| [*element*>*element*](https://www.runoob.com/cssref/sel-element-gt.html) | div>p                 | 选择所有父级是 `<div>` 元素的` <p> `元素                   | 2    |
| [*element*+*element*](https://www.runoob.com/cssref/sel-element-pluss.html) | div+p                 | 选择所有紧跟在 `<div>` 元素之后的第一个 `<p> `元素         | 2    |
| [[*attribute*\]](https://www.runoob.com/cssref/sel-attribute.html) | [target]              | 选择所有带有target属性元素                                 | 2    |
| [[*attribute*=*value*\]](https://www.runoob.com/cssref/sel-attribute-value.html) | [target=-blank]       | 选择所有使用target="-blank"的元素                          | 2    |
| [[*attribute*~=*value*\]](https://www.runoob.com/cssref/sel-attribute-value-contains.html) | [title~=flower]       | 选择标题属性包含单词"flower"的所有元素                     | 2    |
| [[*attribute*\|=*language*\]](https://www.runoob.com/cssref/sel-attribute-value-lang.html) | [lang\|=en]           | 选择 lang 属性等于 **en**，或者以 **en-** 为开头的所有元素 | 2    |
| [:link](https://www.runoob.com/cssref/sel-link.html)         | a:link                | 选择所有未访问链接                                         | 1    |
| [:visited](https://www.runoob.com/cssref/sel-visited.html)   | a:visited             | 选择所有访问过的链接                                       | 1    |
| [:active](https://www.runoob.com/cssref/sel-active.html)     | a:active              | 选择活动链接                                               | 1    |
| [:hover](https://www.runoob.com/cssref/sel-hover.html)       | a:hover               | 选择鼠标在链接上面时                                       | 1    |
| [:focus](https://www.runoob.com/cssref/sel-focus.html)       | input:focus           | 选择具有焦点的输入元素                                     | 2    |
| [:first-letter](https://www.runoob.com/cssref/sel-firstletter.html) | p:first-letter        | 选择每一个`<p>`元素的第一个字母                            | 1    |
| [:first-line](https://www.runoob.com/cssref/sel-firstline.html) | p:first-line          | 选择每一个`<p>`元素的第一行                                | 1    |
| [:first-child](https://www.runoob.com/cssref/sel-firstchild.html) | p:first-child         | 指定只有当`<p>`元素是其父级的第一个子级的样式。            | 2    |
| [:before](https://www.runoob.com/cssref/sel-before.html)     | p:before              | 在每个`<p>`元素之前插入内容                                | 2    |
| [:after](https://www.runoob.com/cssref/sel-after.html)       | p:after               | 在每个`<p>`元素之后插入内容                                | 2    |
| [:lang(*language*)](https://www.runoob.com/cssref/sel-lang.html) | p:lang(it)            | 选择一个lang属性的起始值="it"的所有`<p>`元素               | 2    |
| [*element1*~*element2*](https://www.runoob.com/cssref/sel-gen-sibling.html) | p~ul                  | 选择p元素之后的每一个ul元素                                | 3    |
| [[*attribute*^=*value*\]](https://www.runoob.com/cssref/sel-attr-begin.html) | a[src^="https"]       | 选择每一个src属性的值以"https"开头的元素                   | 3    |
| [[*attribute*$=*value*\]](https://www.runoob.com/cssref/sel-attr-end.html) | a[src$=".pdf"]        | 选择每一个src属性的值以".pdf"结尾的元素                    | 3    |
| [[*attribute**=*value*\]](https://www.runoob.com/cssref/sel-attr-contain.html) | a[src*="runoob"]      | 选择每一个src属性的值包含子字符串"runoob"的元素            | 3    |
| [:first-of-type](https://www.runoob.com/cssref/sel-first-of-type.html) | p:first-of-type       | 选择每个p元素是其父级的第一个p元素                         | 3    |
| [:last-of-type](https://www.runoob.com/cssref/sel-last-of-type.html) | p:last-of-type        | 选择每个p元素是其父级的最后一个p元素                       | 3    |
| [:only-of-type](https://www.runoob.com/cssref/sel-only-of-type.html) | p:only-of-type        | 选择每个p元素是其父级的唯一p元素                           | 3    |
| [:only-child](https://www.runoob.com/cssref/sel-only-child.html) | p:only-child          | 选择每个p元素是其父级的唯一子元素                          | 3    |
| [:nth-child(*n*)](https://www.runoob.com/cssref/sel-nth-child.html) | p:nth-child(2)        | 选择每个p元素是其父级的第二个子元素                        | 3    |
| [:nth-last-child(*n*)](https://www.runoob.com/cssref/sel-nth-last-child.html) | p:nth-last-child(2)   | 选择每个p元素的是其父级的第二个子元素，从最后一个子项计数  | 3    |
| [:nth-of-type(*n*)](https://www.runoob.com/cssref/sel-nth-of-type.html) | p:nth-of-type(2)      | 选择每个p元素是其父级的第二个p元素                         | 3    |
| [:nth-last-of-type(*n*)](https://www.runoob.com/cssref/sel-nth-last-of-type.html) | p:nth-last-of-type(2) | 选择每个p元素的是其父级的第二个p元素，从最后一个子项计数   | 3    |
| [:last-child](https://www.runoob.com/cssref/sel-last-child.html) | p:last-child          | 选择每个p元素是其父级的最后一个子级。                      | 3    |
| [:root](https://www.runoob.com/cssref/sel-root.html)         | :root                 | 选择文档的根元素                                           | 3    |
| [:empty](https://www.runoob.com/cssref/sel-empty.html)       | p:empty               | 选择每个没有任何子级的p元素（包括文本节点）                | 3    |
| [:target](https://www.runoob.com/cssref/sel-target.html)     | #news:target          | 选择当前活动的#news元素（包含该锚名称的点击的URL）         | 3    |
| [:enabled](https://www.runoob.com/cssref/sel-enabled.html)   | input:enabled         | 选择每一个已启用的输入元素                                 | 3    |
| [:disabled](https://www.runoob.com/cssref/sel-disabled.html) | input:disabled        | 选择每一个禁用的输入元素                                   | 3    |
| [:checked](https://www.runoob.com/cssref/sel-checked.html)   | input:checked         | 选择每个选中的输入元素                                     | 3    |
| [:not(*selector*)](https://www.runoob.com/cssref/sel-not.html) | :not(p)               | 选择每个并非p元素的元素                                    | 3    |
| [::selection](https://www.runoob.com/cssref/sel-selection.html) | ::selection           | 匹配元素中被用户选中或处于高亮状态的部分                   | 3    |
| [:out-of-range](https://www.runoob.com/cssref/sel-out-of-range.html) | :out-of-range         | 匹配值在指定区间之外的input元素                            | 3    |
| [:in-range](https://www.runoob.com/cssref/sel-in-range.html) | :in-range             | 匹配值在指定区间之内的input元素                            | 3    |
| [:read-write](https://www.runoob.com/cssref/sel-read-write.html) | :read-write           | 用于匹配可读及可写的元素                                   | 3    |
| [:read-only](https://www.runoob.com/cssref/sel-read-only.html) | :read-only            | 用于匹配设置 "readonly"（只读） 属性的元素                 | 3    |
| [:optional](https://www.runoob.com/cssref/sel-optional.html) | :optional             | 用于匹配可选的输入元素                                     | 3    |
| [:required](https://www.runoob.com/cssref/sel-required.html) | :required             | 用于匹配设置了 "required" 属性的元素                       | 3    |
| [:valid](https://www.runoob.com/cssref/sel-valid.html)       | :valid                | 用于匹配输入值为合法的元素                                 | 3    |
| [:invalid](https://www.runoob.com/cssref/sel-invalid.html)   | :invalid              | 用于匹配输入值为非法的元素                                 |      |

## 变换

|                             属性                             | 版本 | 继承性 |                 描述                 |
| :----------------------------------------------------------: | :--: | :----: | :----------------------------------: |
| [transform](http://css.doyoe.com/properties/transform/transform.htm) | CSS3 |   无   |         检索或设置对象的变换         |
| [transform-origin](http://css.doyoe.com/properties/transform/transform-origin.htm) | CSS3 |   无   |  检索或设置对象中的变换所参照的原点  |
| [transform-style](http://css.doyoe.com/properties/transform/transform-style) | CSS3 |   无   | 指定某元素的子元素是否位于三维空间内 |
| [perspective](http://css.doyoe.com/properties/transform/perspective.htm) | CSS3 |   无   |    指定观察者与「z=0」平面的距离     |
| [perspective-origin](http://css.doyoe.com/properties/transform/perspective-origin.htm) | CSS3 |   无   |           指定透视点的位置           |
| [backface-visibility](http://css.doyoe.com/properties/transform/backface-visibility.htm) | CSS3 |   无   |    指定元素背面面向用户时是否可见    |

## 过渡

|                             属性                             | 版本 | 继承性 |                   描述                   |
| :----------------------------------------------------------: | :--: | :----: | :--------------------------------------: |
| [transition](http://css.doyoe.com/properties/transition/transition.htm) | CSS3 |   无   | 复合属性。检索或设置对象变换时的过渡效果 |
| [transition-property](http://css.doyoe.com/properties/transition/transition-property.htm) | CSS3 |   无   |     检索或设置对象中的参与过渡的属性     |
| [transition-duration](http://css.doyoe.com/properties/transition/transition-duration.htm) | CSS3 |   无   |       检索或设置对象过渡的持续时间       |
| [transition-timing-function](http://css.doyoe.com/properties/transition/transition-timing-function.htm) | CSS3 |   无   |        检索或设置对象中过渡的类型        |
| [transition-delay](http://css.doyoe.com/properties/transition/transition-delay.htm) | CSS3 |   无   |       检索或设置对象延迟过渡的时间       |

## 动画

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

## canvas

[学习 HTML5 Canvas 这一篇文章就够了](https://www.runoob.com/w3cnote/html5-canvas-intro.html)

canvas就是使用js来绘制图片的方式

**绘制虚线框**

用 `setLineDash` 方法和 `lineDashOffset` 属性来制定虚线样式。 `setLineDash` 方法接受一个数组，来指定线段与间隙的交替；`lineDashOffset`属性设置起始偏移量。

```js
function draw(){
    var canvas = document.getElementById('tutorial');
    if (!canvas.getContext) return;
    var ctx = canvas.getContext("2d");
 
    ctx.setLineDash([20, 5]);  // [实线长度, 间隙长度]
    ctx.lineDashOffset = -0;
    ctx.strokeRect(50, 50, 210, 210);
}
draw();
```

![img](https://www.runoob.com/wp-content/uploads/2018/12/2805401035-5b74dd8e6833c_articlex.png)

## 小知识点 

### 固定宽高比 

需求：盒子宽度自适应，一行3个盒子,平分一行，超出换行。盒子宽高比为2:1

![image-20211215155845687](https://gitee.com/hyj1270433876/blog-img/raw/master/Vue%E7%9B%B8%E5%85%B3/image-20211215155845687%20.png)

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
				<img src="https://gitee.com/hyj1270433876/blog-img/raw/master/Vue%E7%9B%B8%E5%85%B3/image-20211130161443584%20.png">
			</div>
			<div class="item">
				<img src="https://gitee.com/hyj1270433876/blog-img/raw/master/Vue%E7%9B%B8%E5%85%B3/image-20211130161443584%20.png">
			</div>
			<div class="item">
				<div class="other">
					
				</div>
			</div>
			<div class="item">
				<!-- <img src="https://gitee.com/hyj1270433876/blog-img/raw/master/Vue%E7%9B%B8%E5%85%B3/image-20211130161443584%20.png"> -->
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

### 文本

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

* 行高和高度相等，可实现div中文字的垂直居中
* flex

* 绝对布局（实现居中）

![image-20210410175834199](https://gitee.com/hyj1270433876/blog-img/raw/master/%E9%9D%A2%E8%AF%95%E7%9B%B8%E5%85%B3/image-20210410175834199.png)

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

自动计算。直接设置 `left:50%; top:50%;`,然后设置`margin-top`和`margin-left`为居中元素的高和宽的一半

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
           margin-top: -50px;
           margin-left: -50px;

       }
    </style>
   <div class="red">
       <div class="blue"></div>
   </div>
```

如果子元素的宽高不确定（比如子元素的宽高是内部撑出来的），将`margin-left`换成`transform:translateX(-50%)`，注意tanslateX的参数如果是百分比，表示的是自己的宽度的百分比，同理，tanslateY，为自己高度的百分比

行级元素使用绝对布局后，会变成块级元素。可以设置`height`和`width`

![image-20210410184213796](https://gitee.com/hyj1270433876/blog-img/raw/master/%E9%9D%A2%E8%AF%95%E7%9B%B8%E5%85%B3/image-20210410184213796.png)

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
:root{
  --a:yellow
}
```

### 伪类元素

less中使用伪类添加图片。

```less
span{
  &::before {
     content: '';
     display: inline-block;
     background: url('./img/oval-1.png');
     background-size: cover;
     width: 0.5rem;
     height: 0.5rem;
     position: absolute;
     top: 0;
     left: -0.3rem;
	}
}
```

[也可以](https://blog.csdn.net/hbiao68/article/details/105157237)

```less
content:url('./img/oval-1.png)
```

**::before和::after的注意事项**

* 默认display:inline
* 必须设置content属性，否则一切都是无用功；
* 默认user-select:none，就是::before和::after的内容无法被用户选中的；

**content的值**

* content:"普通字符串";

* content:attr(父元素的html属性名称);

* content:url(图片、音频、视频等资源的url);

* content:"\21e0";【使用unicode字符集，采用4位16进制编码】

* content:"'"attr(title)"'";【 content的多个值可以任意组合，各部分通过空格分隔】

**给伪类元素添加绝对定位**

给伪类添加`position`属性后，伪类元素隐式转换为块级元素，且以**原本的元素**的左上角为坐标系



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

![image-20220217115516362](https://gitee.com/hyj1270433876/blog-img/raw/master/Css%E7%9B%B8%E5%85%B3/image-20220217115516362%20.png)

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

![image-20220217120145986](https://gitee.com/hyj1270433876/blog-img/raw/master/Css%E7%9B%B8%E5%85%B3/image-20220217120145986%20.png)

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

![image-20220217121831534](https://gitee.com/hyj1270433876/blog-img/raw/master/Css%E7%9B%B8%E5%85%B3/image-20220217121831534%20.png)

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

     ![image-20211201162048703](https://gitee.com/hyj1270433876/blog-img/raw/master/Vue%E7%9B%B8%E5%85%B3/image-20211201162048703%20.png)

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

![image-20211201155207659](https://gitee.com/hyj1270433876/blog-img/raw/master/Vue%E7%9B%B8%E5%85%B3/image-20211201155207659%20.png)

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

.child添加`position: absolute;`后，父元素感知不到子元素了，所有不能撑起来了![image-20211201155422009](https://gitee.com/hyj1270433876/blog-img/raw/master/Vue%E7%9B%B8%E5%85%B3/image-20211201155422009%20.png)

* 但是它能感知到其他元素（包括脱离/未脱离文档流的元素）

  例子：正常，两个块级元素各自占据一行，上下排列

  

  ![image-20211201160118290](https://gitee.com/hyj1270433876/blog-img/raw/master/Vue%E7%9B%B8%E5%85%B3/image-20211201160118290%20.png)

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

![image-20211201160319460](https://gitee.com/hyj1270433876/blog-img/raw/master/Vue%E7%9B%B8%E5%85%B3/image-20211201160319460%20.png)

如果，给.parent2添加`position: absolute;`，parent2脱离的文档流，但是可以感知到parent1

![image-20211201161408653](https://gitee.com/hyj1270433876/blog-img/raw/master/Vue%E7%9B%B8%E5%85%B3/image-20211201161408653%20.png)

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

![1857BE33-B6AC-4D8C-8CE6-FDCC8C7CF397](https://gitee.com/hyj1270433876/blog-img/raw/master/Vue%E7%9B%B8%E5%85%B3/1857BE33-B6AC-4D8C-8CE6-FDCC8C7CF397%20.png)
