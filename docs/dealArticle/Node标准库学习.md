# Node标准库

这篇文章主要记录我使用过的一些Node标准库中提供的函数，

[Node的中文文档](http://nodejs.cn/)



## 执行Shell命令

同步：**[`child_process.execSync(command[, options])`](http://nodejs.cn/api/child_process.html#child_process_child_process_execsync_command_options)**

异步：**[`child_process.exec(command[, options][, callback])`](http://nodejs.cn/api/child_process.html#child_processexeccommand-options-callback)**

Node会新开一个子线程调用shell命令

```shell
var process = require('child_process');  
process.exec('shell命令', function(err, stdout, errout){  
    // err是执行结果，是否有错  
    // stdout是标准输出，即shell命令执行后的结果  
    // errout是错误输出  
});  
 
```

```js
var process = require('child_process');  
let res=process.exec('shell命令');  
```

## 读取文件

```
// 1. 导入 fs 模块，来操作文件
const fs = require('fs')
 
// 2. 调用 fs.readFile() 方法读取文件
//     参数1：读取文件的存放路径
//     参数2：读取文件时候采用的编码格式，一般默认指定 utf8
//     参数3：回调函数,拿到读取失败和成功的结果 err(失败) dataStr(成功)
 
// 如果读取成功,err的值为null，dataStr为数据
// 如果失败，err为错误对象，dataStr为undefined
fs.readFile('./files/1.text','utf8',function (err, dataStr) {

  
})
```

## Buffer

