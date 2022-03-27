# charles的学习笔记

## charles的原理

charles时一款**代理**抓包工具，即所有的请求经过charles，charles会捕获到数据

![image-20220108143439414](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Charles%E7%9B%B8%E5%85%B3/image-20220108143439414%20.png)

##  charles的功能

* 支持Http/Https的代理
* 支持浏览控制【可以做一些弱网环境测试】
* 支持接口并发请求【可以用来做接口的性能测试】
* 支持重发网络请求
* 支持断点调试【在发送请求和接受返回时修改数据，可以在测试过程中构建一些异常的测试场景】

## 安装就激活教程

[charles官网下载地址](https://www.charlesproxy.com/download/)

[安装并激活Charles](https://zhuanlan.zhihu.com/p/72138226)

## 界面介绍

下载后打开主界面（我这里下载的是v4.6.2版本）

![image-20220108150350055](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Charles%E7%9B%B8%E5%85%B3/image-20220108150350055%20.png)



顶部导航栏图标含义

![image-20220108145014636](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Charles%E7%9B%B8%E5%85%B3/image-20220108145014636%20.png)

左侧请求栏

**Structure**表示按照域名展示请求

![image-20220108151118009](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Charles%E7%9B%B8%E5%85%B3/image-20220108151118009%20.png)

**Sequence**表示按照请求的时间展示请求

![image-20220108150844707](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Charles%E7%9B%B8%E5%85%B3/image-20220108150844707%20.png)

右侧请求框

`Overview`选项：会展示该请求的一个大体情况

![image-20220130122958669](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/%E8%B8%A9%E5%9D%91/image-20220130122958669%20.png)

`Content`选项：请求和响应的具体内容

![image-20220130123453063](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/%E8%B8%A9%E5%9D%91/image-20220130123453063%20.png)

`Summary`选项：也是展示请求的大体资源分布情况

![image-20220130123848881](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/%E8%B8%A9%E5%9D%91/image-20220130123848881%20.png)

`Chart`选项：以表格形式告诉我们一个响应时间的分布情况

![image-20220130124554030](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/%E8%B8%A9%E5%9D%91/image-20220130124554030%20.png)

`Notes`：点击之后可以对该请求添加笔记，方便后续查看该接口的用途。添加后，可在`Overview`中查看到

![image-20220130124200192](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/%E8%B8%A9%E5%9D%91/image-20220130124200192%20.png)

![image-20220130124420160](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/%E8%B8%A9%E5%9D%91/image-20220130124420160%20.png)

## 设置代理

只有将设备设置了代理，才能让该设备的所有请求经过charles发出去

**注意**：安装了charles的电脑，默认已经配置好代理了，这台电脑的所有网络访问都会经过charles。如果**安装charles的设备**和**需要抓包的设备**不是同一台那就需要设置代理了

**1.获取charles所在设备的IP地址和端口号**

![image-20220130124844584](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/%E8%B8%A9%E5%9D%91/image-20220130124844584%20.png)

弹出框中的地址就是本机IP地址

![image-20220116193359025](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Charles%E7%9B%B8%E5%85%B3/image-20220116193359025%20.png)

**2.修改charles的端口号**

如果端口号冲突了，可以进行修改。如果不冲突，一般不用修改的

![image-20220108151846811](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Charles%E7%9B%B8%E5%85%B3/image-20220108151846811%20.png)

![image-20220108152045980](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Charles%E7%9B%B8%E5%85%B3/image-20220108152045980%20.png)

**3.给其他设备设置代理**

可以为android/ios或者其他win/mac设备设置代理（安装了charles的本机已经默认设置好代理了，不用再设置了）

步骤：把其他设备接入**安装了charles的设备**所在的局域网，并设置设备的代理为手动代理，地址是第一步获得的IP和端口（不同设备可能略有差异，但是总体思路都是，找到设备接入的局域网设置，找到代理并设置为手动，输入charles所在电脑的IP和端口）

以IOS设备为例：

![image-20220116202000807](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Charles%E7%9B%B8%E5%85%B3/image-20220116202000807%20.png)

![image-20220116202309394](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Charles%E7%9B%B8%E5%85%B3/image-20220116202309394%20.png)



**4.安装证书（可以是android/ios 或者win/mac设备，本机发出的https包，若要查看也要安装charles证书）**

配置完代理后，charles能正常抓取http和https的包，但是https的包，会有一个小锁的标志，数据也显示unknown，content是乱码。需要给要抓包的设备安装证书，开启https代理才行

![image-20220116200209818](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Charles%E7%9B%B8%E5%85%B3/image-20220116200209818%20.png)

**win或mac安装证书**（以mac为例）

两个系统略有差异,但是主要思路就是把charles软件的证书安装到对应的设备上

打开`Help`---->`SSL Proxing`的菜单下，有多个`install`开头的选项，这些都是安装charles证书到不同的位置（具体安装到哪里，取决于你要抓包的设备是哪个）

这里`Install Charles Root Certificate`是把证书直接下载到本机

![image-20220116200515851](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Charles%E7%9B%B8%E5%85%B3/image-20220116200515851%20.png)

![image-20220116201332656](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Charles%E7%9B%B8%E5%85%B3/image-20220116201332656%20.png)

![image-20220116201223399](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Charles%E7%9B%B8%E5%85%B3/image-20220116201223399%20.png)

**手机安装证书**（以IOS为例）

注意：必须使用safari浏览器

手机的https网络请求，会通过charles代理

![image-20220118142246482](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/%E8%B8%A9%E5%9D%91/image-20220118142246482%20.png)

![image-20220118142438885](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/%E8%B8%A9%E5%9D%91/image-20220118142438885%20.png)

选择允许

![image-20220118142646254](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/%E8%B8%A9%E5%9D%91/image-20220118142646254%20.png)

下一步，进入设置——>通用——>VPN与设备管理，找到刚才下载的描述文件，然后安装

![image-20220118150437189](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/%E8%B8%A9%E5%9D%91/image-20220118150437189%20.png)

![image-20220118150543541](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/%E8%B8%A9%E5%9D%91/image-20220118150543541%20.png)

最后一步，进入设置——>通用——>关于本机——>证书信任配置，找到Charles Proxy CA开启信任

![image-20220118150224914](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/%E8%B8%A9%E5%9D%91/image-20220118150224914%20.png)

**5.设置证书代理**

![image-20220118143031376](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/%E8%B8%A9%E5%9D%91/image-20220118143031376%20.png)

![image-20220118143053070](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/%E8%B8%A9%E5%9D%91/image-20220118143053070%20.png)

![image-20220118143124755](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/%E8%B8%A9%E5%9D%91/image-20220118143124755%20.png)

![image-20220118143140779](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/%E8%B8%A9%E5%9D%91/image-20220118143140779%20.png)

这个`*`代表所有来源的请求，都会使用证书

## 设置访问控制

控制特定IP地址才能通过Charles访问网络

![image-20220116190112680](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Charles%E7%9B%B8%E5%85%B3/image-20220116190112680%20.png)

![image-20220116190546619](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Charles%E7%9B%B8%E5%85%B3/image-20220116190546619%20.png)

提示出现，点击允许

![image-20220130120332316](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/%E8%B8%A9%E5%9D%91/image-20220130120332316%20.png)

## 设置流量控制

流量控制可以通过控制网络情况，来实现弱网测试

![image-20220130120430396](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/%E8%B8%A9%E5%9D%91/image-20220130120430396%20.png)



![image-20220130120901980](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/%E8%B8%A9%E5%9D%91/image-20220130120901980%20.png)

## 断点的使用







## 常见问题
> 安装charles的电脑，不能抓到自己的包

安装charles的电脑默认已经配置了代理 （未安装ssl证书 ，需要手动安装），如果不能抓到包，很有可能是电脑安装了其他的代理工具（VPN），或者是使用的浏览器安装了某些代理插件导致的

> 给手机配置好代理以后，部分App无法联网或报网络错误

想要理解这个原因，就需要对[证书的原理](https://blog.csdn.net/huangyaa729/article/details/88175425?spm=1001.2101.3001.6650.1&utm_medium=distribute.wap_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-1.wap_blog_relevant_default&depth_1-utm_source=distribute.wap_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-1.wap_blog_relevant_default)有一定的了解，抓包工具之所以能够通过给手机安装证书的方式，解析https包的内容，其原理类似于**中间人攻击的手段**，即，将charles证书安装到手机系统中，当服务端返回信息被charles截获后，charles获取了真正的公钥，同时charles生成了一对假的公钥/私钥，再将信息使用假的私钥加密，发送到手机，手机的**浏览器/App**会从系统受信任证书中寻找charles证书，完成数据签名的校验和解密。

注意，因为google和apple开始重视安全因素，所以引入了SSL-Pinning技术：开发者预先把证书相关信息预置到App中再打包，这样在https通讯过程中，App会在**内置证书和系统默认预置证书**中查找服务器返回的证书，然后做签名校验，但是我们下载的charles证书是第三方证书，App根本找不到服务器返回的证书对应的本地证书，那么就被判定可能为**中间人攻击（比如Fiddler/Charles抓包工具）**，App客户端就会终止https链接，所以显示无法联网或报网络错误

解决方案：https://blog.csdn.net/w08023176/article/details/120333337
