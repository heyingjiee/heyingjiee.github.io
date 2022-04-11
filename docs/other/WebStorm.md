# WebStorm

## Eslint

[ESlint相关文档](https://www.jetbrains.com/help/webstorm/eslint.html#ws_js_linters_eslint_import_code_style_from_eslint)

* 前提：插件依赖于Eslint的npm包，首先得确保安装了Eslint包

* ESlint配置的读取规则

  * 如果项目中不存在ESlint的相关配置，那么ESlint就不会生效

  * WebStorm会在项目启动时，自动查找eslint的项目配置文件，并应用

  * 右键ESlint配置文件，应用ESlint代码样式规则

    ![image-20220315173214288](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220315173214288%20.png)

* 应用ESlint修复

  * 在文件中右键

    ![image-20220315173829847](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220315173829847%20.png)

  * 如果觉得麻烦，可以设置，保存时（快捷键 command+s），自动执行ESlint修复

    注意：如果文件中存在ESLint报错，但是代码也没有变动需要保存时，使用command+s是无法触发ESLint修复的
    
    ![image-20220315173915201](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220315173915201%20.png)

* webstorm对于文件的检查提示和ESlint无关，但是其设置内默认对于JS和TS的代码质量检查，使用ESLint的配置文件的规则，所以如果代码出现违背ESlint配置文件的地方，就会划出红色/黄色波浪线提示

  ![image-20220315173031464](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220315173031464%20.png)

  ![image-20220315172858191](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220315172858191%20.png)

## Prettier

[Prettier相关](https://www.jetbrains.com/help/webstorm/prettier.html)

* 前提：插件依赖于Prettier的npm包

* Prettier配置的读取规则

  * 如果没有Prettier的相关配置文件，Prettier会遵循默认的Prettier规则
  * **是否会自动查找项目下的Prettier配置文件**官方文档未提及
  * 可以右键配置文件，选择应用"Prettier代码样式规则"

* 应用Prettier修复

  * 在文件中右键

    ![image-20220315175144496](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220315175144496%20.png)

  * 如果觉得麻烦，可以设置保存时，触发

    ![image-20220315174658304](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220315174658304%20.png)

* WebStorm的规则检查中，没有对与Prettier规则的检查，即使代码风格违背Prettier也不会有任何提示

* 格式化（⌥ ⌘ L）可以指定为使用Prettier格式化

  ![image-20220315174720761](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220315174720761%20.png)

  

## 格式化

格式化（⌥ ⌘ L）只是将代码按照某种格式整理代码的一种方式

格式化默认使用设置中的**代码样式**的规则

![image-20220315180811961](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220315180811961%20.png)

* 可以在设置中，对每种语言进行自定义设置

* 也可以，启用EditorConfig支持，在项目下添加  `.editorconfig`配置文件，WebStorm会参照配置文件来格式化（启用EditorConfig，会覆盖默认配置）

* 也可以将Prettier设置为格式化程序（经过测试，如果设置了Prettier为格式化程序，editorconfig和prettier冲突的字段，prettier的优先级更高）

  

  ![image-20220315174720761](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220315174720761%20.png)

  

## 实时模版（live templates）

实时模版就是在代码中输入指定缩写，按下tab，会自动生成设置好的代码

偏好设置——>编辑器——>实时模版，也可以使用快捷键 `command`+`,`，就可以进入实时模版的设置界面

![image-20220409111617658](/Users/yc/Library/Application Support/typora-user-images/image-20220409111617658.png)

可以看出WebStorm根据语言区分了不同组，这里称作**实时模版组**

从中选一个我们比较熟悉的语言，点击**JavaScript组**找到**log**这个实时模版

这个**实时模版**就是当我们在代码中输入`log`后，按下`tab`键，会自动按照预设的模版生成代码

![image-20220409112102533](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/image-20220409112102533.png)

在代码中输入log时，弹出提示框，我们在定义实时模版时，填写的内容会在这里显示

![image-20220409133108768](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/image-20220409133108768.png)

**实时模版文本**中可以定义变量，形式是`$变量名$`，可以让自动生成的代码是动态的

* WebStorm中预定义的变量

  | 预定义变量 | 描述                                                         |
  | ---------- | ------------------------------------------------------------ |
  | `$VAR$`    | 可以定义一个变量                                             |
  | `$ARRAY$`  | 可输入一个数组                                               |
  | `$PARAM$`  | 可变长度参数                                                 |
  | `$END$`    | 光标结束符号。生成代码后，输入光标放置的位置。比如默认的log模版中的`console.log($END$)`的含义就是，生成代码后，输入光标在括号中 |

* 自定义变量，形式也是`$变量名$`，WebStorm提供了一些预定义函数，这些函数可以返回值并赋值给自定义的变量【[函数列表](https://www.jetbrains.com/help/webstorm/template-variables.html#ws_example_live_template_variables)】

**如何使用？举个例子**

我们改造下log这个实时模版

![image-20220409121821829](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/image-20220409121821829.png)

在模版文本中，定一个了一个变量`$METHODNAME$`，这个变量不是预定义的变量，这时候右侧的**编辑变量**的弹窗中可以编辑这个变量的初始值

![image-20220409160825253](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/image-20220409160825253.png)

**简单记就是**，有定义，看勾选；无定义，光标一定留在变量位置。定义多个变量时，如果有多个变量都会使光标停留在变量位置，实际上，光标会停留在第一个满足条件的变量的位置，可以使用`tab`键，切换到下一个满足条件的变量所在的位置

所以，一般自定义变量，从两个角度考虑

* 需要用户输入的变量，不设置表达式和默认值，光标位置一定在变量位置
* 返回值的变量
  * 设置处理的表达式+无默认值 +不勾选"如果定义则跳过" ，这种如果表达式返回失败，会让用户手动输入
  * 设置处理的表达式+默认值+勾选，这种变量值要么是表达式，要么是默认值，且光标不会停在变量位置

**使用模版**

jsMethodName()函数成功返回函数名func1

![2022-04-09 14.53.46](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/2022-04-09%2014.53.46.gif)

jsMethodName()函数返回失败，无法获取函数名（因为我这里用的是匿名函数），且无默认值，所以属于无定义，输入光标一定会停留在变量位置，输入完成后，按`tab`键，跳转到下一个光标停留位置，即`$END$`

![2022-04-09 15.45.58](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/2022-04-09%2015.45.58.gif)

## 终端启动

* 创建命令行启动器

  完成下面的步骤，进入`/usr/local/bin`目录，就可以看到在`bin`文件夹创建了一个`webstorm`文件

  ![image-20220321150206974](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/WebStorm/image-20220321150206974%20.png)

  ![image-20220321150230479](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/WebStorm/image-20220321150230479%20.png)

* 启动项目

  在终端中进入要启动的项目的目录，输入下面的内容，就会启动项目

  ```shell
  webstorm .
  ```

## 外部库

WebStorm的项目窗口一直有一个**外部库**的功能，这个功能是干啥的呢？

![image-20220410011712876](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220410011712876.png)

在WebStorm中内置了一部分`*.d.ts`文件，这些文件是用来提示语法的，比如你输入`math.floor()`，当你输入`.`时，就会有函数提示，其中还包括了提示文档

但是，对于一些WebStorm中没有预制的库，怎么办呢？

* Webstorm会读取项目下的node_modules文件夹，如果你使用了其中的依赖中某些函数，仍然能做到提示

  比如，下面这个项目，通过npm安装了axios的包，WebStrom能找到axios的函数。这时可以注意到，WebStorm会自动在node_modules目录旁，标记上`library root`

  ![image-20220410012802634](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220410012802634.png)

* 对于不在node_module中的

  * 比如，在页面使用CDN的方式引入Jquery，但是使用Jquery的方法没有提示。点击下载库，就能看到项目窗口的外部库中，有了下载的Jquery，编写代码中就有了Jquery相关方法提示了

    ![image-20220410013300776](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220410013300776.png)

    ![image-20220410013505041](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220410013505041.png)

  * 想要WebStorm支持Node的Api，可以按照下面的方式配置

    ![image-20220410013822129](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220410013822129.png)

    ![image-20220410013843397](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220410013843397.png)

## 插件推荐

### Chinese Language Pack

![image-20220409104239506](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220409104239506.png)

给WebStorm提供汉化的插件

### GitToolBox

![image-20220409095349796](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220409095349796.png)

WebStorm内置的Git工具已经非常强大了，但是这款Git插件提供一个比较有意思的功能是，可以在代码中用灰色问题提示当前行代码的提交记录，代码出现问题方便定位提交者

![image-20220409100427467](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220409100427467.png)

安置插件后，可以在设置里找到插件的配置菜单，因为我只需要在编辑器中显示，所以只勾选了一个

![image-20220409101525136](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220409101525136.png)

### Indent Rainbow

![image-20220409101836441](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220409101836441.png)

以不同的颜色显示锁进，就像彩虹一样

![image-20220409102109682](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220409102109682.png)

安装插件后，在这里配置相关功能

![image-20220409102341061](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220409102341061.png)

### Translation

![image-20220409102431316](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220409102431316.png)

一款翻译插件，最nice的一个功能是给变量起英文名字

安装后，在代码中输入文字，右键，菜单出现了两个选项

![image-20220409102613457](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220409102613457.png)

**翻译**

根据选中的文字自动翻译，用的做多的就是查一下代码中英语单词的含义（当然也可查别的语言，默认中文会翻译成英语）

![image-20220409102819900](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220409102819900.png)

![image-20220409102923159](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220409102923159.png)

**翻译并替换**

这个才是杀手级功能啊，插件会根据翻译，给你起一个驼峰形式的变量名，选中后，会自动把中文替换为选中的英语变量名

![image-20220409103245652](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220409103245652.png)

**最后，也是最重要的**

日常使用时，请使用快捷键

![image-20220409103554137](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220409103554137.png)

使用快捷键时，输入光标不用选中文字，只光标在单词后，就可以自动识别前面的一个单词

![image-20220409103827091](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220409103827091.png)

安装插件后，在这里配置相关功能

![image-20220409104147262](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220409104147262.png)
