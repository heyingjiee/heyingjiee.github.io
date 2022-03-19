# WebStrom

## Eslint

[ESlint相关文档](https://www.jetbrains.com/help/webstorm/eslint.html#ws_js_linters_eslint_import_code_style_from_eslint)

* 前提：插件依赖于Eslint的npm包，首先得确保安装了Eslint包

* ESlint配置的读取规则

  * 如果项目中不存在ESlint的相关配置，那么ESlint就不会生效

  * WebStrom会在项目启动时，自动查找eslint的项目配置文件，并应用

  * 右键ESlint配置文件，应用ESlint代码样式规则

    ![image-20220315173214288](https://gitee.com/hyj1270433876/blog-img/raw/master/Css%E7%9B%B8%E5%85%B3/image-20220315173214288%20.png)

* 应用ESlint修复

  * 在文件中右键

    ![image-20220315173829847](https://gitee.com/hyj1270433876/blog-img/raw/master/Css%E7%9B%B8%E5%85%B3/image-20220315173829847%20.png)

  * 如果觉得麻烦，可以设置，保存时，自动执行ESlint修复

    ![image-20220315173915201](https://gitee.com/hyj1270433876/blog-img/raw/master/Css%E7%9B%B8%E5%85%B3/image-20220315173915201%20.png)

* webstorm对于文件的检查提示和ESlint无关，但是其设置内默认对于JS和TS的代码质量检查，使用ESLint的配置文件的规则，所以如果代码出现违背ESlint配置文件的地方，就会划出红色/黄色波浪线提示

  ![image-20220315173031464](https://gitee.com/hyj1270433876/blog-img/raw/master/Css%E7%9B%B8%E5%85%B3/image-20220315173031464%20.png)

  ![image-20220315172858191](https://gitee.com/hyj1270433876/blog-img/raw/master/Css%E7%9B%B8%E5%85%B3/image-20220315172858191%20.png)

## Prettier

[Prettier相关](https://www.jetbrains.com/help/webstorm/prettier.html)

* 前提：插件依赖于Prettier的npm包

* Prettier配置的读取规则

  * 如果没有Prettier的相关配置文件，Prettier会遵循默认的Prettier规则
  * **是否会自动查找项目下的Prettier配置文件**官方文档未提及
  * 可以右键配置文件，选择应用"Prettier代码样式规则"

* 应用Prettier修复

  * 在文件中右键

    ![image-20220315175144496](https://gitee.com/hyj1270433876/blog-img/raw/master/Css%E7%9B%B8%E5%85%B3/image-20220315175144496%20.png)

  * 如果觉得麻烦，可以设置保存时，触发

    ![image-20220315174658304](https://gitee.com/hyj1270433876/blog-img/raw/master/Css%E7%9B%B8%E5%85%B3/image-20220315174658304%20.png)

* WebStrom的规则检查中，没有对与Prettier规则的检查，即使代码风格违背Prettier也不会有任何提示

* 格式化（⌥ ⌘ L）可以指定为使用Prettier格式化

  ![image-20220315174720761](https://gitee.com/hyj1270433876/blog-img/raw/master/Css%E7%9B%B8%E5%85%B3/image-20220315174720761%20.png)

  

## 格式化

格式化（⌥ ⌘ L）只是将代码按照某种格式整理代码的一种方式

格式化默认使用设置中的**代码样式**的规则

![image-20220315180811961](https://gitee.com/hyj1270433876/blog-img/raw/master/Css%E7%9B%B8%E5%85%B3/image-20220315180811961%20.png)

* 可以在设置中，对每种语言进行自定义设置

* 也可以，启用EditorConfig支持，在项目下添加  `.editorconfig`配置文件，WebStrom会参照配置文件来格式化（启用EditorConfig，会覆盖默认配置）

* 也可以将Prettier设置为格式化程序（经过测试，如果设置了Prettier为格式化程序，editorconfig和prettier冲突的字段，prettier的优先级更高）

  

  ![image-20220315174720761](https://gitee.com/hyj1270433876/blog-img/raw/master/Css%E7%9B%B8%E5%85%B3/image-20220315174720761%20.png)

  

  



