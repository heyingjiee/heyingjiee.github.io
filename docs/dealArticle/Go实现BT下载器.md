# BT下载器

B站的[Go手写BT下载器](https://www.bilibili.com/video/BV13P4y1378F/?spm_id_from=333.999.0.0&vd_source=e46d9099be60057b5a16a45fac0d5248)

## 原理概述



![image-20221121235542516](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20221121235542%20.png)



![image-20221121235610001](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20221121235610%20.png)

**问题1**

tracker(一个中心化的站点)，存储着某个资源的peer（每个下载过资源的用户信息）的列表

早期的BT网站站点，就是tracker，其中存储着众多的peer的列表

**问题2**

把一个资源分成若干个piece，每个peer下载不同的piece，最后组装成一个完整的资源，还要提供一个完整性校验的功能



##  Torrent File格式

Torrent File（种子文件）的格式：

![image-20221122000436548](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20221122000436%20.png)

Bencode协议，其规定了4中类型。Torrent File字段中的值都是这4种类型之一

* string类型

  ```
  格式：len:xxxx
  
  例如：10:helloworld
  ```

* int类型

  ```
  格式：ixxxe
  
  例如：i789e
  ```

* list类型

  想象成切片

  ```
  格式：
  l 
  	xxx 
  e
  
  例如：
  l
  	i123e 
  	i456e 
  e
  ```

* dict类型

  想象成map类型，值为多个key和value

  ```
  格式：
  d
   xxx xxx
  e
  
  例如：
  d
   4:name 
   	3:Tom
   6:length 
   	i789e
  e
  
  上面例子可以看成
  {
  	name:Tom,
  	length:789
  }
  ```

  下面是一个Torrent File的例子：

  ![image-20221122002350870](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20221122002351%20.png)

## 项目思路

![image-20221122000934600](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20221122000934%20.png)

1. 实现一个Bencode库，实现一个序列化（将Torrent File中的内容序列化为Go语言的结构）与反序列化（将Go语言的结构生成一个Torrent File）
2. 实现一个torrent的解析库，用于解析经过Bencode库序列化后的Torrent File数据，比如：获取tracker和info字段
3. 实现tracker模块，用来获取peer信息列表
4. downloadd模块，用来下载每一个piece和校验每一个piece
5. assembler模块，组装所有piece成完整的文件

## Bencode

