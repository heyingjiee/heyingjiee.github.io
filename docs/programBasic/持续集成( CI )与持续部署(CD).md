# 持续集成( CI )与持续部署(CD)

## 介绍

简单来说，开发人员每次合并代码上传代码仓库后，自动将最新的代码编译打包，自动发布到对应的环境（生产或测试）

![image-20220807235250312](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Go/20220807235250%20.png)

## Travis CI

注意：Travis CI只支持Github

### 使用步骤

* 进入Travis CI官网 https://www.travis-ci.org/

* 注册登录，并授权Github

  ![image-20220808000832852](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/JS/20220808000833%20.png)

* 进入首页后，页面中有使用提示，按照步骤来即可

  基本就是先授权读取Github仓库，在仓库根目录放置 `.travis.yml`，

  ![image-20220808001514642](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/JS/20220808001514%20.png)

  

  

  

  

  

