# 代码分析

## 编译流程

ESlint、Prettier、JS转译等功能，实际上都是通过下面的流程，实现分析代码，在中间的AST（语法树）进行修改或者校验语法树节点，来实现其功能

![image-20221106114757789](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20221106114757%20.png)

其中，我们使用的最多的部分就是AST，所以需要对AST语法树有基本的了解

## 可视化工具

[AST explorer](https://astexplorer.net/)：一个可视化的网站，可以将代码转化为抽象语法树

![image-20221106115231433](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20221106115231%20.png)

解析器（parser）：将tokens转化为AST（语法树）的工具。AST explorer支持众多的JS解析器，如下图：

![image-20221106115343120](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20221106115343%20.png)

他们之间的关系：

* esprima：是最早的解析器
* acorn：对esprima进行了重新的设计，后期的解析器基本都是基于acorn进行的扩展
* @babel/parser（早期叫babylon）:基于acorn开发
* espree：最初从esprima中fork出来的，后来也改为了基于acorn开发

目前JS编译器遵循的通用规范是espree，不同的工具都是基于此AST（语法树）的结构进行了相应的拓展

## Babel

AST语法树，首先应该明确它是一个树形结构，代码中的每个部分都会生成树的一个节点

使用不同的parse（解析器）生成的AST节点会有差异

这篇文章我们学习使用Babel，Babel为我们提供了大量的工具来处理AST

## 实战

```js
import parser from '@babel/parser'
import traverse from '@babel/traverse'
import generate from '@babel/generator'

const sourceCode = `console.log(1);`;

const ast = parser.parse(sourceCode, {
  sourceType: 'unambiguous'
});

traverse(ast, {
    CallExpression(path, state) {

    }
});

const { code, map } = generate(ast);
console.log(code);
```



### 为console打印添加信息



### 修改函数名

安装依赖

```shell
pnpm install esprima estraverse escodegen
```

* esprima生成语法树的工具
* estraverse遍历语法树的工具
* escodegen将语法树转化为代码的工具

代码实现

```js
const esprima = require('esprima')
const estraverse = require('estraverse')
const escodegen = require('escodegen')

let code = 'function a(){}'
//1、解析成ast(语法树)
const ast = esprima.parseScript(code)
console.log(' ast --> ', ast)

//2、遍历ast节点.（访问器方式,深度遍历每一个节点，自行判断type名，来确定是不是我们要修改的节点）
estraverse.traverse(ast, {
    enter(node) {
        // console.log('enter --> ',node.type)
        if (node.type === 'FunctionDeclaration') {
            node.id.name = 'ast'
        }

    },
    leave(node) {
        // console.log('leave --> ',node.type)
    }
})

//3、将ast转为代码
console.log('代码 --> ',escodegen.generate(ast)) //代码 -->  function ast() {}

```



### 箭头函数转换

将es6的箭头函数转化为es5的普通函数

安装依赖

```shell
pnpm install @babel/core @babel/types babel-plugin-transform-es2015-arrow-functions
```

* babel的中文手册https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/README.md
* @babel/core ：babel的编译器，其中可以加入很多插件，来实现各种功能
* @babel/types 处理ast节点的工具库插件，用于创建节点、判断节点类型
* babel-plugin-transform-es2015-arrow-functions 箭头函数转化插件

代码实现

```js
const babel =require('@babel/core')
const types=require('@babel/types')
const transformFunction=require('babel-plugin-transform-es2015-arrow-functions')

let code='const sum=(a,b)=>a+b'
const result=babel.transform(code, {
    plugins:[transformFunction] //指定插件
})
console.log('result --> ',result.code)
result -->  const sum = function (a, b) {
    return a + b;
};
```

代码实现（不使用箭头函数转换插件）

```js
//考虑的情况
//可能的形式1：const sum=()=>a+b
//可能的形式2(使用代码块，在代码块汇中return)：const sum=()=>{ return a+b }
//可能的形式3(出现this，考虑this的指向)：function a(){ const sum=()=>console.log(this) }

const babel = require('@babel/core')
const types = require('@babel/types')
//发布订阅模式，指定我们要找的type类型，一旦找到就会触发函数
const transformFunction = {
    visitor: {
        ArrowFunctionExpression(path) {
            let {node} = path;
            // console.log(node)
            node.type = 'FunctionExpression'
            let body = node.body

            //所以需要判断下是否是body是块语句，如果不是，就是形式1：const sum=()=>a+b
            if (!types.isBlockStatement(body)) {
                node.body = types.blockStatement([types.returnStatement(body)])//创建blockStatement节点，参数是该节点的body字段，是个数组
            }
            //this替换为 _this, 在找到祖先节点中是普通函数的节点，增加var _this=this
            hoistFunction(path)
        }

    }

}

function getThisPath(path) {
    let arr = []
    path.traverse({
        ThisExpression(path) {//this表达式
            arr.push(path)
        }
    })
    return arr
}

function hoistFunction(path) {
    const bindingThis = '_this'
    //深度变量获取所有的this表达式，将this替换为_this
    const thisPaths = getThisPath(path)
    thisPaths.forEach(path => {
        //repalceWith替换函数
        path.replaceWith(types.identifier(bindingThis))
    })

    //findParent查找父节点（不是箭头函数）或找到了顶级Program
    const thisEnv = path.findParent((parent) => {
        return (parent.isFunction() && !parent.isArrowFunctionExpression()) || parent.isProgram()
    })
    thisEnv.scope.push({
        id:types.identifier(bindingThis),//types构造identifier节点，参数是name字段的值，这里替换为_this
        init:types.thisExpression()//types构造thisExpression节点
    })
}

let code = 'function a(){ const sum=()=>console.log(this) }'
const result = babel.transform(code, {
    plugins: [transformFunction]
})
console.log('result --> ', result.code)
```



## 参考

https://juejin.cn/post/6953963506693570573