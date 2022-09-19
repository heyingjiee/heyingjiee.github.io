# Node使用基础

这部分主要是对Node中的内置包进行学习，掌握Node基本的使用方法，参照一些项目，实现一些简单的脚本

初步的设想是和Gulp结合，实现前端自动化

[Node的中文文档](http://nodejs.cn/)

## readline 

参考文章：[node之readline(逐行读取)](https://www.jianshu.com/p/02c93c8e8977?utm_campaign=maleskine&utm_content=note&utm_medium=seo_notes&utm_source=recommendation)

**作用**：读取项目下的`package.json`文件修改版本号

```js
const readline =require('readline')
const pkg = require('./package.json');
const VERSION_REG = /\d+\.\d+\.\d+/;
const fs = require('fs');
function updateVersion() {
    return new Promise((resolve) => {
        const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

        rl.setPrompt(`当前 package.json 版本号为: ${pkg.version}\n请输入本次要发布的版本号:(可按回车跳过)\n`);
        rl.prompt();

        // eslint-disable-next-line consistent-return
        rl.on('line', (input) => {
            let newVersion = '';
            if (!input) {
                newVersion = pkg.version.replace(/(\d+\.\d+\.)(\d+)/, (verion, $1, $2) => $1 + (Number($2) + 1));
            } else if (!VERSION_REG.test(input)) {
                console.log('\x1B[31m%s\x1B[0m', '\n⚡ 不要搞事年轻人，请输入正确版本号格式!\n');
                rl.prompt();
                return;
            } else {
                newVersion = input;
            }
            const newPkg = JSON.stringify(Object.assign({}, pkg, { version: newVersion }), null, 2);
            fs.writeFileSync('package.json', `${newPkg}\n`, 'utf8');
            console.log('\x1B[32m%s\x1B[0m', '\n🎉 good job! package.json 文件已更新.\n');
            rl.close();
        });

        rl.on('close', resolve);
    });
}

updateVersion()
```

## fs

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

