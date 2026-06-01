# AI大模型

## 资料

IDEA官方的课程：https://academy.jetbrains.com/course/28816?utm_source=marketo&utm_medium=email&utm_campaign=general&utm_content=newsletter?map=2&mkt_tok=NDI2LVFWRC0xMTQAAAGhSVJk7b1zeSpuTF0bO4cCr2uyt-f4X6bdqvaR9PcX9eMKFFMnsjWTMmoALiRrNEUOWzx9oxVWIWfAw0pC1kso7L975i4CAAbf4X_nEHjO-__9FwUd

Agent 转型文章：https://juejin.cn/post/7631007870080073770?share_token=142CE4BD-70BB-4449-8CD9-B71146AA3D08

Agent 工具聚合搜索的网站：https://sofindai.com/

## Pyhton极速入门

Python for JavaScript Developers 文章： https://www.valentinog.com/blog/python-for-js ，对比两种语言的差异，帮助 JS 开发者转型

Python官方文档：https://docs.python.org/zh-cn/3.14/tutorial/index.html

菜鸟教程：https://m.runoob.com/python/ 

### 注意点

```python
# get只有没有key的时候才会返回第2个参数，如果name有是None就不会命中兜底
stu.get("name", "")

# 不写第2个参数，没有返回None，这是用or兜底
stu.get("name") or ""
```



### 包管理、版本管理

* **pip + venv**

  pip 是官方的包安装器，随 python 编译器一起安装，用来安装三方包。但是 pip 只能安装纯 Python 包、Wheel 包（其他语言的包可以编译成 Wheel文件）

  venv 是创建虚拟环境的工具 `pip install venv` 安装
  
  ```shell
  python -m venv .venv # -m 从环境变量中找到 venv 工具，在项目下创建.venv 目录 , 注意这个目录很大，不要提到git上

  一般 python 项目使用 `requirements.txt`  ，但是它不是官方标准，只是用来记录项目的依赖包名称和版本号的文本文件

  ```shell
  # 根据 requirements.txt 安装项目依赖
  pip install -r requirements.txt
  
  # 导出（requirements.txt不是官方规范，pip无法区分项目的边界，所以需要在根目录执行，他会导出所有子目录中的 python 包依赖）
pip freeze > requirements.txt
  ```

* **uv**

  自身支持包管理、虚拟环境

  * pyproject.toml   记录依赖信息
  * uv.lock      记录具体的安装版本

  ```shell
  pip install uv # 安装uv
  
  uv init [项目名] # 自动创建 pyproject.toml、.python-version
  
  cd [项目名]
  uv sync # 激活环境、安装依赖
  ```

  安装依赖

  ```
  uv add <包名> # 安装包
  uv add --dev <包名> # 安装到开发依赖
  uv remove <包名> # 移除包
  ```

  安装项目配置文件的依赖

  ```python
  # pyproject.toml 文件
  # 生产依赖
  dependencies = [
      "openai>=1.0",
      "rich>=13.0",
      "prompt_toolkit>=3.0",
      "python-dotenv>=1.0",
  ]
  # 开发依赖
  [dependency-groups]
  dev = [
      "pytest>=9.0.3",
  ]
  # 可选依赖
  [project.optional-dependencies]
  litellm = ["litellm>=1.60.0,<2.0.0"]
  
  
  uv sync # 激活环境，安装生产、开发依赖，默认不安装可选依赖
  uv sync --extra litellm      # 必须，只装 litellm
  uv sync --all-extras         # 全部装
  
  ```

  脚本

  ```python
  uv run <命令> # 根据pyproject.toml指定的python版本，运行命令
  # 案例：
  # pyproject.toml 可以指定脚本
  # [project.scripts]
  # start = "evolve.cli:app"
  # uv run start 启动脚本
  ```

* **conda**

  跨语言的包管理器（支持安装非Python包，例如：编译好的二进制文件）、环境管理工具

  安装 conda

  ```shell
  1、清华镜像站 https://mirrors.tuna.tsinghua.edu.cn/anaconda/miniconda/ 有所有版本
  
  2、安装 
  ## 下载并执行安装脚本 -b是批量安装，默认都选择yes
  curl -O https://repo.anaconda.com/miniconda/Miniconda3-latest-MacOSX-arm64.sh && bash Miniconda3-latest-MacOSX-arm64.sh -b
  
  ## 在zsh中添加环境变量
  ~/miniconda3/bin/conda init zsh
  
  ## 刷新环境变量
  source ～/.zshrc
  
  3、验证是否安装成功
  ## 输出版本
  conda --version 
  ## 终端会多一个（base），这是 conda 创建的默认虚拟环境名
  (base) xxx@yyy ~ %
  ```

  安装依赖包

  ```shell
  conda install -c conda-forge pynini # -c 指定源conda-forge，pynini是包名
  ```

  创建环境，在环境中可以安装独立的python版本

  ```shell
  # 创建独立的虚拟环境，-n 指定环境名为 enva，环境中需要安装python3.11
  conda create -n enva python=3.11
  
  # 激活环境 。补充删除环境命令 conda env remove -n enva
  conda activate enva # 终端多一个(enva)前缀
  ```


补充：

```shell
# 我的项目
|- evolve
			|- __init__.py
			|- __main__.py
			|- cli.py  # app函数
|- pyproject.toml

##### uv脚本启动 #####
# pyproject.toml 
[project.scripts]
start = "evolve.cli:app" # 配置一个启动脚本，格式 模块:函数
# 脚本启动（项目目录下）
uv run start # 如果提示没有脚本，就 uv sync 同步下
# 注意脚本启动入口是 __init__.py，需要引入模块 from evolve import cli


##### python模块启动 #####
# 必须有__main__.py ，它是模块启动入口

# 项目根目录启动
python -m evolve 
# 如果需要全局任意目录下启动
pip install -e . # 把项目符号链接到全局Python模块下（site-packages），-e就是符号链接，否则默认是拷贝，如果项目改动全局不会跟随变化。 目录下会生成 xxx.egg-info/，请添加到git忽略文件 `*.egg-info/`
python -m evolve   # 任意目录启动
```



### 模块化

包：目录下有 ` __init__.py `  就被识别为包，一个包可包含多个模块（每个文件就是一个模块）

```
my_project/
├── main.py
└── my_package/
    ├── __init__.py 
    └── utils.py  (里面有 def hello(): ...)
```

模块导出:

```python
# utils.py

# 默认都是公开的，自动导出
PI = 3.14  

def add(a, b):
    return a + b 

# 私有，约定俗成不被导入
_internal_var = 100 

# 每个模块都有一个 __name__ 属性
# `python utils.py` 这种直接运行的，__name = __main__
# import 引入触发，__name = 模块名
if __name__ == "__main__":
  print('脚本直接执行时触发')
else:
  print('模块引入触发')
```

```python
# main.py  
def main():
    print("Hello from cc-learn!")

# 项目入口一般都是直接运行，所以这样写
if __name__ == "__main__":
  	main()
```

包导出：

```python
# 1、__init__.py  可以为空，仅作为包的标识

# 2、也可以简化导入
from .utils import add # 导入包下希望暴露的成员


# 定义“白名单”，from my_package import * 时，只有add被导入
__all__ = ['add'] 
```

导入很灵活:

```python
# 导入整个模块
import math
print(math.sqrt(16)) 

# 导入整个模块起别名
import pandas as pd
df = pd.DataFrame() 

# 只导入确定成员
from math import sqrt, pi
sqrt(156)

# 导入所有成员，不推荐容易造成同名冲突
from 模块名 import *
```

包：前面import导入的是模块，但是其实 import 也支持导入包

```python
# 在包外，希望导入包内的模块
from my_package.utils import hello
utils()

from my_package import utils
utils.hello()

# 在包内，使用相对路径
from .utils import hello
```

### 基础语法

#### 操作符

```python
"a"+"b"  # "ab" 字符串拼接

"a"*3    # "aaa" 字符串重复

["ab"]+["cd"] # ['ab', 'cd'] 列表合并
```

#### 流程控制

if

```python
None、"" 、0、[]、{}  # 都视为False
```

```python
num = 10
if num < 0 :
	print("命中if")
elif num >= 0 and num <10 :
	print("命中elif")
else:
	print("命中else")
```

for

```python
# range范围左开右闭，区间[0,10)
for item in range(10): 
  print(item)

# 遍历字符串
for item in "abc": 
  print(item)

# 遍历列表
for item in ["a", "b", "c"]:
  print(item)

# 遍历字典
stu = {
    "name": "tom",
    "age": 29
}
for key in dict1:
	print(key)
```

while

```python
num = 10
while num > 0:
  num = num-1
print("while")
```

match

```python
score = 'B'

match score:
    case 'A':
        print('优秀！')
    case 'B':
        print('良好。')
    case 'C':
        print('及格。')
    case _: # 通配符，类似 else，匹配所有其他情况
        print('无效分数。')
```

#### 三元表达式

```python
# 如果条件成立返回A，否则返回B
A if condition else B

# 如果args为真，调用handler，返回值给output，否则返回None
output = handler(args) if args else None
```

#### 作用域

python只有函数作用域，没有块级作用域的概念

```python
def x():
	if condition:
    output = 1
  else:
    output = 2
  print(output)
```

全局变量

```python
_config = None  # 这是一个全局变量

def configure(config):
  	# global 声明_config是全局变量
    global _config  
    _config = config  # 修改全局变量的值

configure(my_config)
print(_config)

# ✅ 结果：全局变量被成功修改了，后续其他函数也能用到这个配置
```

#### with 语法

自动关闭文件

```python
# 自动关闭，否则需要手动 path.close()
path = Path("a/b.txt")
with path.open("w") as handle:
		handle.write("xxx")  
```

自己实现一个数据库类型，要支持 with 自动关闭

```python
class MyDatabase:
    def __init__(self, db_name):
        self.db_name = db_name
        self.connection = None

    # 1. 进入 with 代码块时调用
    def __enter__(self):
        print(f"🔗 正在连接到 {self.db_name}...")
        self.connection = f"连接对象({self.db_name})"
        return self.connection  # 这个返回值会赋给 'as conn' 中的 conn

    # 2. 离开 with 代码块时调用（无论是否报错）
    def __exit__(self, exc_type, exc_val, exc_tb):
        print("🔌 正在断开连接...")
        self.connection = None
        # 如果返回 True，异常会被吞掉（不推荐）；返回 False 或 None 则正常抛出异常
        return False 

# --- 使用你的类 ---

# 正常情况
with MyDatabase("用户数据库") as conn:
    print(f"✅ 使用 {conn} 查询数据...")

# 异常情况（即使报错，也会执行 __exit__）
try:
    with MyDatabase("订单数据库") as conn:
        print(f"✅ 使用 {conn} 操作...")
        raise ValueError("模拟一个错误！")
except ValueError:
    print("❌ 捕获到了错误，但连接已经自动关闭了！")
```

### 内置类型

#### 数字

分为四种类型：int 整型、long 长整型、float 浮点型、复数类型

方法：

```python
# 四舍五入，第2个参数是保留小数
print(round(80.235, 2)) # 80.24
print(max(1, 2, 3, 5)) # 5 最大值
print(min(1, 2, 3, 5)) # 1 最小值

# math库
import math
print(math.floor(2.6)) # 2.0 向下取整

# random库
import random 
print(random.random()) # [0,9) 随机数
print(random.choice(range(5))) # 从range范围随机选一个
```

#### 字符串

```python
s = "python"

# 索引访问
print(s[0]) # p

# for in 遍历
for item in s:
  print(item)
```

其他字符串

```python
#多行字符串
s = """python
yy
zz
""" 

# 模板字符串
name = "tom"
print(f"你好 {name}") 

# 会自动拼接，如果希望换行可以加\n
# 注意这里有个特坑的点：千万一行末尾加逗号，会被识别为tuple的
def xxx:
  return (
    "hello"
    "world\n" 
    f"你好 {name}"
	)
```

操作

```python
s = "python"

print(s.strip()) # 输出:python  去掉收尾空格
print(s.capitalize()) # 输出:Python 返回首字母大写
print(s.count("on")) # 输出:1 on出现次数
print(s.startswith("p"))  #  输出:True  是否p开头
print(s.endswith("n"))  # 输出:True  是否n结尾
print(s[:3])  # 输出:pyt  切片，方位左闭右开，即[0,3)
print("t" in s) # 输出:True  相当于JS的includes

# 注意
print("a,b,c".split("t"))  # 输出:['a', 'b', 'c']  分割字符串
print("a,b,c".split("t",1))  # 输出:['a', 'bc']  分割字符串

print("a b".split()) # 输出:['a', 'b'] 默认没参数，相当于任意个数空白符分割
"hello \n\n world\t\tfoo".split() # 输出['hello', 'world', 'foo']

print(s.split("")) # ❌报错，不能把字符串拆成单个字母的list
print(list(s))  # 输出:['p', 'y', 't', 'h', 'o', 'n']
print([item for item in s]) # 输出:['p', 'y', 't', 'h', 'o', 'n']
```

补充下拼接

```python
# 拼接列表、元组
my_list = ["a", "b", "c"]
my_tuple = ("a", "b", "c")
'-'.join(my_list) # 输出:a-b-c
'-'.join(my_tuple) # 输出:a-b-c
```

正则

```python
# \n \t 在字符串中都只转义字符，有特定含义

# 用r"xxxx" 写啥就是啥，\n是普通字符串，没有特殊含义，

r"你好\n"

# 常用于正则表达式，当匹配转义字符时，就不用在转义变成普通字符串了
"你好\\n"
r"你好\n"

# match最常用的是捕获组
import re

text = """---
title: 我的文章
---
这是正文"""

# 使用分组 (.*) 来分别捕获元数据和正文
match = re.match(r"^---\n(.*)\n---\n(.*)", text)

if match:
    # .group(0) 是匹配到的整个字符串
    print("完整匹配:\n", match.group(0))
    
    # .group(1) 是第一个括号 (.*?) 匹配到的内容
    print("\n元数据部分:\n", match.group(1))
    
    # .group(2) 是第二个括号 (.*) 匹配到的内容
    print("\n正文部分:\n", match.group(2))   
    
    
# search 匹配不到返回None
text = "version 3.11"
print(re.search(r"\d+.\d+", text).group()) # 3.11
```

fnmatch

```python
import fnmatch

file_names = ["report.txt", "data.csv", "image.png", "notes.txt"]

print(fnmatch.filter(file_names, "*.txt")) # ['report.txt', 'notes.txt']
print(fnmatch.fnmatch("report.txt", "*.txt")) # True
```

第二个参数：

| 通配符   | 含义                            | `pat` 示例        | 匹配的 `name` 示例         |
| -------- | ------------------------------- | ----------------- | -------------------------- |
| `*`      | 匹配任意长度的字符（包括0个）   | `*.txt`           | `report.txt`, `data.txt`   |
| `?`      | 匹配任意单个字符                | `image?.png`      | `image1.png`, `imageA.png` |
| `[seq]`  | 匹配 `seq` 中的任意一个字符     | `log[123].txt`    | `log1.txt`, `log2.txt`     |
| `[!seq]` | 匹配不在 `seq` 中的任意一个字符 | `image[!0-9].jpg` | `imageA.jpg`               |

#### 列表

展开

```python
list1 = [1, 2]
list2 = [3, 4]

# 合并列表
combined_list = [*list1, *list2]

# 函数传参
def add(a, b, c):
    return a + b + c

numbers = [1, 2, 3]
result = add(*numbers)
```

访问

```python
list = ["a", "b", "c"]
list[0] # 通过索引访问
```

遍历

```python
list = ["a", "b", "c"]

# 遍历的是元素
for item in list:
  print(item)  # "a", "b", "c" ， 与 JS 是遍历索引

# 遍历索引+元素
for index, item in enumerate(list): # enumerate(list)返回迭代器，元素是元组(index,item)
  print(index, item)  
  
# a, b = (1, 2)  这里是元组的解构语法
```

组合 zip 

```python
names = ['Alice', 'Bob', 'Charlie']
ages = [24, 30, 35]

# 将名字和年龄一一对应打包 ，
# 入参：可迭代对象，例如：str、list、tuple、dict、set、range生成的序列
# 返参：迭代器
zipped = zip(names, ages)

# 可以for in , 只能遍历一遍因为迭代器对象消费完了就空了
for name, age in zip(names, ages):
    print(f"{name},{age}")

# 如果两个list长度不一致，会停在最短的位置

# 分离
zipped_list = [(1, 'a'), (2, 'b'), (3, 'c')]
numbers, letters = zip(*zipped_list)
```

过滤 filter

```python
numbers = [1, 2, 3, 4, 5, 6]

# 筛选出所有偶数 ，前两种方式返回的是迭代器，需要用 list() 转成列表

# 方式1：lambda是用来声明匿名函数的  参数: 一行表达式
even_numbers = list(filter(lambda x: x%2==0, numbers))

# 方式2：如果多行建议 def 定义函数
def isEven(x):
  return x%2==0
even_numbers = list(filter(is_even, numbers))
```

映射map

```python
[表达式 for 元素 in 可迭代对象 if 条件]
numbers = [1, 2, 3, 4, 5]

# 将每个数字平方， ** 是平方
squared_numbers = map(lambda x: x ** 2, numbers)

# 将迭代器转换为列表
result = list(squared_numbers)
```

还可以用列表推导式 （最推荐的写法），参考下一节

修改自身

| 方法名         | 功能描述                       | 返回值 | 典型场景                           |
| -------------- | ------------------------------ | ------ | ---------------------------------- |
| `append(x)`    | 在末尾添加一个元素             | `None` | 像栈一样收集数据                   |
| `extend(L)`    | 将另一个列表的所有元素追加进来 | `None` | 合并两个列表                       |
| `insert(i, x)` | 在指定索引 `i` 处插入元素      | `None` | 需要在中间插入数据                 |
| `remove(x)`    | 删除第一个匹配的元素 `x`       | `None` | 删除找的的第一个x                  |
| `pop([i])`     | 删除并返回指定索引的元素       | 元素值 | 删除末尾或指定位置，并需要使用该值 |
| `index(x)`     | 返回元素 `x` 第一次出现的索引  | 整数   | 查找位置（找不到会报错）           |
| `count(x)`     | 统计元素 `x` 出现的次数        | 整数   | 统计频率                           |
| `sort()`       | 对列表进行原地排序             | `None` | 整理数据顺序                       |
| `reverse()`    | 将列表原地反转                 | `None` | 倒序排列                           |
| `clear()`      | 清空列表所有元素               | `None` | 重置列表                           |
| `copy()`       | 返回列表的浅拷贝               | 新列表 | 备份数据（防止修改原列表）         |

排序

```python
# list自带方法，操作原列表，无法返回值
list.sort() 

# 内置排序函数支持 list、dict，不修改原数组，返回新的排序数组
sorted(list)

# 支持 key、reverse 参数，默认：reverse=False升序，list的key默认元素，dict的key默认就是它的key
list = ["tom", "jack"]
sort(numbers, key=len, reverse=True) # 按长度，降序排列

students = [
    {'name': 'Alice', 'age': 20, 'score': 88},
    {'name': 'Bob', 'age': 20, 'score': 95},
    {'name': 'Charlie', 'age': 19, 'score': 92}
]

# 按 'age' 升序
sorted_students = sorted(students, key=lambda x: x['age'])
# 先按 'age' 升序，再按 'score' 升序
sorted_students = sorted(students, key=lambda x: (x['age'], x['score']))
```

#### 字典

```python
person = {"name": "tom", "age": 25, "weight": 100}

# 访问
person["name"] # 访问不存的key会报错
person.get("name") # 访问不存在的 key，返回 None
person.get("name","没有") # 第2个参数，没有时返回的默认值

# 插入
person.setdefault("age", 18) # 如果 age 不存在，设置默认值 18。这个在 leetcode 里计数时最常用
person['city'] = 'Beijing'

# 可以一次性改多个
person.update({
    "name": "jack",
    "age": 10
})

# 移除
person.pop("name") # 返回"tom" , 移除数据
person.clear()

# 判断有没有
if 'name' in person:
    print("键 'name' 存在")
    
if 'name' not in person:
    print("键 'name' 存在")    

# 遍历 key
for key in person:
	print(key)
  
# 遍历 key  
for key in person.keys():
	print(key)
  
# 遍历 value  
for value in person.values():
	print(value)
  
# 遍历 value  
for key, value in person.items():
	print(key, value)
  
# ⚠️ keys，values，items 返回的是视图迭代器对象，即原始字典的视图，原字典变化也会跟着变化，使用上和列表相同
```

**深/浅拷贝**

```python
import copy

person = {
  "name": "tom",
  "age": 20
}

# 入参支持 dict、list、set、自定义类的实例
# 浅拷贝
new_person = copy.copy(person)
# 深拷贝
deep_person = copy.deepcopy(person)
```

合并字典

```python
stu1 = {"name": "tom"}
stu2 = {"age": 18}

# 合并字典
stu = {**stu1, **stu2} 

# 函数传参
def greet(name, age):
    print(f"你好，{name}，今年{age}岁。")

person_info = {'name': 'Alice', 'age': 25}
result = greet(**person_info)
```

`**` 作为合并数组用，有个限制：字典键是数字、元组，或者包含特殊字符（如 `"user-id"`），直接解包会报错

下面更现代的写法没有这个限制，建议采用

```python
# 合并字典
stu = stu1|stu2

# 原地合并到 stu1
stu1 |= stu2
```

#### 集合Set

```python
# 字面量
s = { "a", "b", "c"}

# 构造函数创建
s = set()

# 相当于has方法
print("a" in s) 
```

### 解构

```python
# ---------- 列表解构 ---------
list1 = [1, 2, 3]
a, b, c = list1
print(a, b, c) # 输出: 1 2 3

# 收集剩余元素
list2 = [1, 2, 3, 4, 5]
first, *middle, last = list2
print(first, middle, last) # 输出: 1 [2, 3, 4] 5

# 嵌套
list3 = [1, [2, 3]]
a, (b, c) = list3
print(a, b, c) # 输出: 1 2 3

# ---------- 元组解构（完全一样） ---------
my_tuple = (10, 20)
x, y = my_tuple
print(x, y) # 输出: 10 20

# ---------- 字典解构 ----------
person = {'name': 'tom', 'age': 25}

# 字典解构拿到的是key
k1, k2 = person
print(k1, k2) # 输出: name age

# 最常用的是拿值
v1, v2 = person.values()
print(v1, v2) # 输出 tom 25

# 嵌套
person = {"name": "tom", "score": { "math": 100, "english": 90}} 
name, (math, english) = person.values() # 这里其中转化为了数组嵌套
```

### 推导式

列表  

```python
# [ 表达式 for 变量 in 可迭代对象 if 条件 ]

numbers = [1, 2, 3, 4, 5]
# 过滤
even_numbers = [x for x in numbers if x%2==0]
# 映射
squared_numbers = [x**2 for x in numbers] 
# 过滤加映射
result = [x**2 x in numbers if x%2==0]
```

字典

```python
#  { 表达式 for 变量 in 可迭代对象 if 条件 }

block = {
    "name": "tom",
    "age": 20,
    "math": 100,
    "english": 100,
}

# 过滤
result = {k: v for k, v in block.items() if k not in ["math", "english"]}
print(result) # {'name': 'tom', 'age': 20}

# 字典与列表合并的写法
[
    {k: v for k, v in block.items()
        if k not in ("_internal", "_source", "_timestamp")}
    for block in msg["content"]
]
```

生成器 （Generator），注意：返回的不是tuple，是生成器（惰性的可得迭代对象）

```python
(x * 2 for x in [1, 2, 3])

# 求和完成工作的人，
#  列表会先计算出完整的列表再去求
#  而省生成器在调用时才去求和，性能更好 

completed = sum([1 for item in work_list if item.status == "completed"])

completed = sum(1 for item in work_list if item.status == "completed")
# 生成器作为唯一入参，可以省略括号

```

### 函数

![image-20260501161925080](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20260501161925gDHy5o.png)

```python
# 不定参数时
def wrapper(*args, **kwargs): 
	print(args, kwargs)
	
wrapper(1, 2, 3, name="tom", age=18) 
# 输出：(1, 2, 3) {'name': 'tom', 'age': 18}
```

### 类

```python
import datetime

# 1. 定义一个父类（基类）
class BankAccount:
    """银行账户基类"""
    
    # --- 类属性 (所有实例共享) ---
    bank_name = "Python 银行"  # 类属性
    interest_rate = 0.02       # 默认利率

    # --- 构造方法 ---
    def __init__(self, owner, balance=0):
        # --- 实例属性 ---
        self.owner = owner           # 公有属性
        self.__balance = balance     # 私有属性 (双下划线开头)，演示【封装】
        self._transaction_count = 0  # 受保护属性 (单下划线开头)，供子类使用

    # --- 实例方法 ---
    def deposit(self, amount):
        """存款方法"""
        if amount > 0:
            self.__balance += amount
            self._transaction_count += 1
            print(f"✅ {self.owner} 存入: {amount}, 当前余额: {self.__balance}")
        else:
            print("❌ 存款金额必须大于 0")

    def withdraw(self, amount):
        """取款方法 (基类逻辑)"""
        if 0 < amount <= self.__balance:
            self.__balance -= amount
            self._transaction_count += 1
            print(f"💸 {self.owner} 取出: {amount}, 当前余额: {self.__balance}")
        else:
            print("❌ 余额不足或金额无效")

    # --- 魔术方法 (Magic Methods) ---
    def __str__(self):
        """定义对象的字符串表示，打印对象时自动调用"""
        return f"账户持有人: {self.owner}, 余额: {self.__balance}"

    def __eq__(self, other):
        """重载 == 运算符，比较两个账户余额是否相等"""
        if isinstance(other, BankAccount):
            return self.__balance == other.__balance
        return False

    # --- 类方法 (@classmethod) ---
    @classmethod
    def set_interest_rate(cls, rate):
        """修改类属性（利率）"""
        cls.interest_rate = rate
        print(f"🏦 {cls.bank_name} 利率调整为: {rate}")

    @classmethod
    def from_string(cls, account_str):
        """工厂方法：从字符串创建对象"""
        # 假设格式是 "Name-Balance"
        owner, balance = account_str.split('-')
        return cls(owner, int(balance))

    # --- 静态方法 (@staticmethod) ---
    @staticmethod
    def is_valid_amount(amount):
        """与类状态无关的工具方法"""
        return isinstance(amount, (int, float)) and amount > 0


# 2. 定义子类，演示【继承】和【多态】
class SavingsAccount(BankAccount):
    """储蓄账户（子类）"""
    
    def __init__(self, owner, balance=0, bonus=100):
        # 调用父类构造方法
        super().__init__(owner, balance)
        self.bonus = bonus

    # 方法重写 (Override) - 演示【多态】
    def withdraw(self, amount):
        """储蓄账户取款有特殊规则：取款前先加奖金"""
        # 模拟特殊逻辑：取款前先把奖金加进去（仅作演示）
        print(f"🎁 触发储蓄账户特权，发放奖金: {self.bonus}")
        # 注意：这里为了演示多态，我们暂时不修改内部余额逻辑，
        # 实际开发中通常会修改 self._BankAccount__balance (不推荐) 或通过父类方法调整
        super().withdraw(amount)


# --- 教学演示区域 ---

print("--- 1. 基础实例化与属性访问 ---")
acc1 = BankAccount("Alice", 1000)
acc1.deposit(500)          # 调用实例方法
print(acc1)                # 调用 __str__ 魔术方法

print("\n--- 2. 封装与私有属性 ---")
# print(acc1.__balance)    # 这行代码会报错，因为 __balance 是私有的
# 正确访问方式是通过方法，或者使用名称改写（不推荐）：acc1._BankAccount__balance

print("\n--- 3. 类方法与静态方法 ---")
# 调用类方法（修改类属性）
BankAccount.set_interest_rate(0.05)
# 调用静态方法（工具函数）
print(f"100 是有效金额吗? {BankAccount.is_valid_amount(100)}")
# 调用工厂方法
acc2 = BankAccount.from_string("Bob-2000")
print(acc2)

print("\n--- 4. 继承与多态 ---")
savings_acc = SavingsAccount("Charlie", 500)
# 调用子类重写的方法
savings_acc.withdraw(100)  

print("\n--- 5. 运算符重载 ---")
acc3 = BankAccount("Dave", 1000)
print(f"acc1 和 acc3 余额相等吗? {acc1 == acc3}") # 调用 __eq__
```

@dataclass 注解会自动为类实现样板代码（注意其改变了类的写法）

其核心定位是**数据容器**或**数据载体**。它的最佳使用场景是那些主要用来存储和传递数据的类

```python
from dataclasses import dataclass, field

@dataclass
class LoopState:
  	# 只要标记类型的都是实例属性，默认生成def __init__(self,message,turn_count,transition_reason)
    
    # 实例属性
    message: list = field(default_factory=list) #默认设置为空数组/空对象会导致每次创建都用同一个，这个标识用list构造函数生成空数组
    reason: str 

# 支持顺序、关键字传参
LoopState(message=[], reason="end")    
LoopState([], "end") 
```

安全访问

```python
# block对象的text属性，
# 如果没有设置第三个参数，且text不存在会抛出AttributeError
# 所以，用就一定得甚至兜底的None
text = getattr(block, "text", None)

hasattr(block, "text")
```

### 类型相关

python是动态类型，但是目前已经支持类似TS的类型标记能力，编译器直接忽略。类型检查依赖例如 **Pylance** 语言服务器的检查

基础类型

```python
# int整数	、float浮点数
age: int = 18
price: float = 9.9

# bool布尔值	
is_valid: bool = True

# str字符串	
name: str = "Alice"

# None空值	
result: None = None

# Any任意类型	,相当于关闭检查
data: Any = ... 
```

容器类型

```python
# 固定字面量 ，只能是a或者c
Literal["a", "c"] 

# list[类型]列表，里面全是某种类型	
scores: list[int] = [1, 2]

# dict[键, 值]字典，指定键和值的类型	，类似 TS 的 Record
user: dict[str, int] = {"age": 18}

# 定义dict具体字段
## 实现方式1：类
from dataclasses import dataclass
@dataclass
class User:
    name: str
    age: int

u1: User = User(name="jack", age=18) # 关键字传参
u2: User = User("tom", 20) # 顺序传参
print(u1.name, u1.age) # 点访问属性
print(u2.name, u2.age)

## 实现方式2：字典
from typing import TypedDict
class User(TypedDict): # 默认生成构造函数
    name: str
    age: int
# 标注字典
u3: User = {
    "name": "jack",
    "age": 20
}
# 也支持对象,但只支持关键字传参
u4: User = User(name="jack", age=18) 

## 实现方式3：pydantic包（推荐）

u5 = User(**{
    "name": "jack",
    "age": 20
})



# Tuple[类型]	元组，可以指定每个位置的类型	
point: tuple[int, int] = (10, 20)

# Set[类型]	集合	
tags: set[str] = {"a", "b"}
```

特殊类型

```python
from typing import Optional, Union, Callable

# Optional[类型]可以是该类型，也可以是 None	
nickname: Optional[str] = None


class Context(TypedDict):
  name: NotRequired[str]  # 不是必传字段

#Union[类型1, 类型2]	可以是类型1 或 类型2	
id: Union[int, str] = 1001
id: int|str # 更现代的写法

# Callable[[参数], 返回值]	函数类型	
func: Callable[[int], str]

# 注释类型，第2个元素是注释
name: Annotated[str, "名字是字符串"]
```

类型断言

```python
from typing import cast

# 将 value 直接返回，类型标记为Message
value = cast(Message, value)
```

泛型

```python
from pydantic import BaseModel

class Response[T](BaseModel):
    code: int
    data: T
    msg: str
```

注意类型推导：

```python
# 警告，值被推到位 list[dict]，虽然dict结构的确是ChatCompletionMessageParam
messages: list[ChatCompletionMessageParam] = [{"role": "user", "content": "你是谁"}]

#
```



VSCode的Pylance设置：

![image-20260501160314232](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20260501160418b1nlCK.png)

### 异常

抛出

```python
raise ValueError("除数不能为0") # 抛出异常
```

常见的Exception异常类型

| 异常           | 场景             |
| -------------- | ---------------- |
| `ValueError`   | 值不合法         |
| `TypeError`    | 类型错误         |
| `KeyError`     | dict key 不存在  |
| `IndexError`   | 下标越界         |
| `RuntimeError` | 泛用运行时错误   |
| `IOError`      | 输入输出操作失败 |

自定义Exception 

```python
class NetworkError(Exception):
    def __init__(self, message, code=None, retryable=False):
      	# super()获取父级代理对象，调用__init__构造函数
        super().__init__(message)
        self.code = code
        self.retryable = retryable
        
raise NetworkError("请求失败", code=500, retryable=True)        
```

捕获 Exception

```python
try:
  # xxxx
except:
	# 所有异常都能捕获
finally:
  # 一定会执行的
  
#-------------  
try:
  # xxxx
except xxError:
	# 捕获一个错误
except (zzError, vvError):
  # 捕获多个错误
except yyError as yy:
  print(yy) # 打印相当于自动调用 str(yy)
except Exception as e:
  # 所有异常
finally:
  # 一定会执行的
```

```python
async def fetch():
    # 假设请求失败
    raise NetworkError("连接超时", code="TIMEOUT", retryable=True)
    
async def service():
    try:
        return await fetch()
    # 捕获 NetworkError 异常， as e 是把异常绑定到变量e
    except NetworkError as e: 
        if e.retryable:
            # 重试逻辑
            return await fetch()
        else:
            raise # 继续抛出错误
    # 支持多个except
    # 捕获ValueError异常
    except ValueError:
    		print("value error")       
            
# 创建 Event loop            
asyncio.run(service())
```

### 装饰器

可以在**不修改原函数代码**的情况下，为函数添加额外的功能

**本质：接收函数作为参数，并返回一个新函数**的高阶函数

```python
from functools import wraps

# 定义装饰器
def my_decorator(func):
    @wraps(func)  # 这一行至关重要！
    def wrapper(*args, **kwargs):
        print("函数执行前")
        result = func(*args, **kwargs)
        print("函数执行后")
        return result # 返回func返回值

    return wrapper

# 使用装饰器
@my_decorator
def calc(a: float, b: float) -> float:
  	"""求和计算"""
    return a+b

# 1、wrapper包一层会导致calc原始的属性丢失，需要 @wraps(func) 
print(calc.__name__) # calc
print(calc.__doc__) # 求和计算

# 2、
print(calc(1,2))
# 函数执行前
# 函数执行后
# 3
```

带参数的装饰器，从上面看到装饰器入参是被包装的函数。如果希望传入额外参数，那就再包一层函数返回装饰器

```python
def repeat_decorator(num_times):  # 1. 最外层：接收装饰器参数
    def actual_decorator(func):   # 2. 中间层：接收被装饰的函数
        @wraps(func)
        def wrapper(*args, **kwargs): # 3. 最内层：执行逻辑
            for _ in range(num_times):
                result = func(*args, **kwargs)
            return result
        return wrapper
    return actual_decorator

# 使用
@repeat_decorator(num_times=3)
def greet(name):
    print(f"Hello, {name}!")

greet("World")
```

### 线程、进程、异步

GIL（Global Interpreter Lock）全局解释器锁：整个 Python 解释器同一时刻只能有一个进程里的一个线程运行

#### 线程

GIL会轮流给线程执行权，所以不能利用多核性能

但是**网络请求、文件读写、sleep、数据库、subprocess 等待、socket ** 这些IO操作时，不会占用GIL锁，其它线程就能运行。所以线程适合IO密集型任务

```python
import threading

def worker(p1, p2):
    print(p1, p2, "开始")
    time.sleep(2)
    print(p1, p2, "结束")

if __name__ == "__main__":
  	
    thread = threading.Thread(
        target=worker, # 函数引用
        args=(p1, p2), # 元组形式传入入参
        daemon=True, # 默认False，父进程结束如果当前线程没结束就阻塞父进程退出。True表示父进程结束立即终止当前线程
    )
    # 启动线程
    thread.start()
    # 加入父进程
    t.join()
    print("主线程结束")
```

线程失去执行权的时机不一定，可能运行到中间某部就暂停了，移交到其他线程

所以，线程之间存在数据竞争，可以加锁解决

```python
import threading

counter = 0
lock = threading.Lock()

def worker():
    global counter

    for _ in range(100000):
      	# 加锁，用with会自动释放
        with lock:
          	# 加锁后只有一个线程能访问
            counter += 1 
```

线程池

```python
import time
from concurrent.futures import ThreadPoolExecutor


def fetch(url: str, name: str):
    print("开始",url, name)
    time.sleep(2)
    return name


argvs = [
    ("https://example.com", "example"),
    ("https://python.org", "python"),
    ("https://github.com", "github"),
]

# max_workers指定并行2个线程
with ThreadPoolExecutor(max_workers=2) as executor:
    tasks = []
    for url, name in argvs:
        # submit 提交到线程池，有空闲就直接运行，没有就排队
        # 返回 Future 类型
        tasks.append(executor.submit(fetch, url, name))

# result是阻塞等待任务完成，顺序就是入队顺序
results = [task.result() for task in tasks]
```

#### 异步

asyncio 标准库，是python内置的用于异步编程的模块。python中异步就是协程

```python
补充：async函数中耗时函数支持异步（async函数），使用await可以，如果耗时函数是同步的那真的会阻塞一直执行下去。 request请求库是同步的，aiohttp请求库就是支持异步的
```

async

```python
# async 修饰的函数称为：协程函数
async def func():
  pass

# 协程函数执行返回协程对象，注意协程函数内部逻辑并不会执行，只是返回协程对象
result = func()

# 1、创建事件循环， 2、事件循环去执行协程对象
asyncio.run(result)
```

await

await + 可等待对象 （协程对象、Task、Future）

* 协程对象

  ```python
  import asyncio
  # 协程函数
  async def other():
      await asyncio.sleep(2)
      return "返回值"
  
  async def func():
      print("开始")
      res = await other()  # 等待协程对象
      print("结束", res)
  
  
  asyncio.run(func())
  ```

* Task对象 （将多个协程对象包装成 Task，可以同时等待结果）

  ```python
  import asyncio
  
  # 协程函数
  async def other():
      await asyncio.sleep(2)
      return "返回值"
  
  async def func():
      print("开始")
      task_lists = [
          asyncio.create_task(other(), name="task1"),
          asyncio.create_task(other(), name="task2"),
      ]
      print("结束")
      done, pending = await asyncio.wait(task_lists)
      # wait支持timeout参数设置超时时间，如果异步函数没执行完毕，pending就会有值
      # done、pending都是set类型
      print(done)
      # 输出
      # {<Task finished name='task1' coro=<other() done, defined at /Users/heyingjie/Desktop/py-langgraph/main.py:5> result='返回值'>, <Task finished name='task2' coro=<other() done, defined at /Users/heyingjie/Desktop/py-langgraph/main.py:5> result='返回值'>}
      print(pending)
      # 输出 set()
  	
    	# 因为set是无序的，取值很麻烦
      for task in done:
          if task.get_name() == "task1":
              # 使用 .result() 获取协程的返回值
              result = task.result() 
              print(f"task1 的结果是: {result}")
  
  asyncio.run(func())
  ```

  另一种写法

  ```python
  async def func():
      print("开始")
      tasks = {
          "task1": asyncio.create_task(other()),
          "task2": asyncio.create_task(other()),
      }
      print("结束")
  
      await asyncio.wait(tasks.values())
      print("task1 的结果:", tasks["task1"].result())
  
  asyncio.run(func())
  ```

  gather 

  ```python
  import asyncio
  
  async def other(name, delay):
      if name == "A":
          raise ValueError("xxx")
      await asyncio.sleep(delay)
      return f"{name} 完成"
  
  async def main():
      # 并发执行三个任务
      # gather默认一个失败，就立即终止并报错。设置 return_exceptions=True 即使报错也会全部执行
      results = await asyncio.gather(
          other("A", 2),
          other("B", 1),
          other("C", 3),
          return_exceptions=True
      )
      
      
      # 即使 B 最先做完，结果依然按照 A, B, C 的顺序排列
      print(results)  
      # 输出: [ValueError('xxx'), 'B 完成', 'C 完成']
  
  asyncio.run(main())
  ```

  如果瞬间大量并发执行，会出问题，一般会限制并发量

  ```python
  import asyncio
  
  # 定义一个全局的信号量，假设我们限制最大并发数为 2
  semaphore = asyncio.Semaphore(2)
  
  async def other(name, delay):
      # 使用 async with 获取信号量（拿钥匙）
      # 如果当前已有 2 个任务在执行，这里会自动阻塞等待
      async with semaphore:
          print(f"🚀 任务 {name} 开始执行")
          await asyncio.sleep(delay)
          print(f"✅ 任务 {name} 执行完毕")
          return f"{name} 完成"
  
  
  async def main():
      # 依然保留 return_exceptions=True 防止单个失败导致整体崩溃
      results = await asyncio.gather(
          other("A", 2), other("B", 1), other("C", 3), return_exceptions=True
      )
  
      # 打印最终结果
      print(results)
  
  
  asyncio.run(main())
  
  ```

  

* Future对象

  是底层的可等待的对象，其是Task的基类，await 实际上等待底层的Future对象

* 不支持异步的函数 

  requests 是同步阻塞请求，下面实际上是线程池并发运行，效果和async/await一样，只不过真的会阻塞每个现场

  ```python
  import asyncio
  import requests
  
  
  async def download(url):
      print("开始下载", url)
  
      # 1. 获取当前运行的事件循环 (更现代的写法)
      loop = asyncio.get_running_loop()
  
      # 2. 将同步的 requests.get 交给线程池执行
      # run_in_executor 返回一个 asyncio.Future，可以被 await
      future = loop.run_in_executor(None, requests.get, url)
      response = await future
  
      print("下载完成", url)
  
      # 3. 修复了文件名提取逻辑 (原链接没有 '_'，这里简单用 url 最后几位做文件名)
      # 原代码: url.rsplit("_")[-1] 会直接得到原 url，因为 url 中没有 '_'
      file_name = url.split("/")[-1]
  
      # 4. 修复了 response.cntent 的拼写错误
      with open(file_name, mode="wb") as file:
          file.write(response.content)
  
  
  async def main():
      url_list = [
          "https://www.baidu.com/img/flexible/logo/pc/result@2.png",
          "https://www.baidu.com/img/flexible/logo/pc/result@2.png",
          "https://www.baidu.com/img/flexible/logo/pc/result@2.png",
      ]
  
      # 5. 使用 asyncio.gather 更简洁地并发任务
      await asyncio.gather(*[download(url) for url in url_list])
  
  
  # 6. 使用 asyncio.run 启动 (Python 3.7+ 推荐写法)
  if __name__ == "__main__":
      asyncio.run(main())
  
  ```

  







### 测试框架

`pytest` 是目前最主流的方案，同时配合使用标准库`unittest` 提供的工具

```python
# 安装 pip install pytest

# test_math_utils.py
from math_utils import add

def test_add(): 
    assert add(2, 3) == 5 # assert是python内置的断言函数
    assert add(-1, 1) == 0
```

`unittest` 提供的工具

```python
# my_module.py
import requests

def get_user_name(user_id):
    response = requests.get(f"https://api.example.com/users/{user_id}")
    return response.json()['name']
  
# test_my_module.py
from unittest.mock import patch
from my_module import get_user_name

# 使用 @patch 装饰器，把 my_module 中的 requests.get 替换为 mock_get 
@patch('my_module.requests.get')
def test_get_user_name(mock_get):
   	# MagicMock对象用来模拟返回值
    mock_response = MagicMock()
    mock_response.json.return_value = {'name': 'Bob'} # 设置调用json方法的返回值
    
    # 这里是requests.get替换后的引用，设置为 MagicMock 对象
    mock_get.return_value = mock_response

    # 这里调用测试函数，实际上内部的请求已经被替换了
    name = get_user_name(456) 

    # 验证结果
    assert name == 'Bob'
    
    # 4. 验证 requests.get 是否被正确调用
    mock_get.assert_called_once_with("https://api.example.com/users/456")
```

### 标准库

#### 文件IO

```python
# 终端输入
s = input()
print(s)
```

os包文件读写

```python
# 操作文件时，会涉及路径。脚本在不同目录执行，会相对导致路径不一致，所以要使用绝对路径
root_dir = os.path.dirname(os.path.abspath(__file__))
file_path = os.path.join(root_dir, "demo/b.txt")

# 修改文件名
# os.rename(file_path, os.path.join(root_dir, "demo/b.txt"))

# 移除文件
# os.remove(file_path)

# 打开文件
file = open(file_path,'a+', encoding='utf-8')
# 一定要显式指定utf-8,否则会自动使系统默认，造成跨平台问题
# 模式：
# r\w\a 这些并不是直接写入入参，而是做了转换，例如\n实际上变成了换行符。如果是图片等非文本文件不能允许自动转化，使用 rb\wb\ab

# r : file.read，不存在抛出FileNotFoundError，游标在文件开头（默认） 
# r+: file.read、file.write，不存在抛出FileNotFoundError，游标在文件开头
# rb、rb+ : 区别是原模原样读取，适合图片这种非文本文件 

# w : file.write，不存在创建文件，存在则清空文件，游标在文件开头
# w+: file.read、file.write，不存在创建文件，存在则清空文件，游标在文件开头
# wb、wb+ : 区别是原模原样写入，适合图片这种非文本文件 


# a :	file.write（追加），不存在创建文件，存在则把游标放在文件尾部
# a+: file.read、file.write，不存在创建文件，存在则把游标放在文件尾部
# ab、ab+: 也是原模原样追加

print(f"name:{file.name}, mode:{file.mode}")

# 写数据
# file.write("写入数据")

# 读数据，
# print(file.read()) # read(10)是读10个字符
# print(file.readline()) # 读取一行，包含\n

# 刷新缓冲区里还没写入的信息，并关闭该文件
# file.close()
```

os.path是路径字符串，这里的Path更现代，它是对象，携带了路径、文件操作的方法

```python
from pathlib import Path

# ---- 目录路径
# ⚠️ glob匹配文件，Path必须是目录路径，不是文件。返回生成器，for变量或转成list使用
Path("/home/user/").glob("*.py") # 匹配当前目录下符合条件的路径
Path("/home/user/").rglob("*.py") # 递归匹配

for file in Path("/home/user/").glob("*.py"):
  print(item, item.name) # 输出文件名字符串，但是请一定注意：item是Path对象，实现了__str__ 这里会打印文件名
  

# ---- 目录/文件路径
# 初始化为Path对象
basePath = Path("/home/user/project/a.txt")

# 是否为文件，返回bool值
basePath.is_file()

# 返回文件/目录的元信息
file_stat = path.stat()
file_stat.st_mtime # 时间戳，单位秒。场景：读取目录下所有文件，sorted排序安装时间戳就能获取最后被修改的文件是哪个

# 如果路径使用~，用这个会替换为真实路径
Path("~/aa").expanduser() 

print(basePath.name, basePath.stem) # name文件/目录名，文件带后缀。stem是没有后缀的

# 当前所在的绝对路径
WORKDIR = Path.cwd()
print(WORKDIR)
# 相当于拼接路径 xxx/src , 本质是运算符/重载
print(WORKDIR/'src') 

# 父级路径
print(basePath.parent) # 返回新的Path，Path("/home/user/project")
print(basePath.parents) # Path("/home/user/project")、Path("/home/user")、Path("/home")、Path("/") 组成的序列（像list可以索引、遍历、len()、*xx 展开传参，但这不是list）

# 路径名（例如 /a/b 输出 b， /a/c.txt 输出c.txt）
print(basePath.name)

# 规范化路径，相对路径、/a/b/../c、 软连接这些转为绝对路径，
print(WORKDIR.resolve())

# 判断basePath是否在WORKDIR内部
basePath.is_relative_to(WORKDIR)

# basePath 相对 WORKDIR的 路径
basePath.relative_to(WORKDIR)

# 判断文件/目录是否存在
basePath.exists()
```

```python
# 读（文件不存在报错FileNotFoundError）
# Path的读写比较简单，file = open() 这种更底层
if basePath.exists(): # 读前判断
	basePath.read_text()

# 写(文件不存，自动创建后写；存在会覆盖原本的内容。如果路径都没有抛出FileNotFoundError)
basePath.parent.mkdir(parents=True, exist_ok=True) # 写前需要调用，防止父级路径不存在
basePath.write_text("hello world") 

#
```

```python
# 打开文件， write_text相当于w
handler =basePath.open("w")
handler.write("xxxx")
handler.close() # 一定记得关闭，或者使用with语法
```

#### 执行命令

```python
import subprocess

env = dict(os.environ) # 浅拷贝环境变量，不能直接修改环境变量否则会影响主程序
env["tool_name"] = "xxx"
  
res = subprocess.run(
    command,  # 命令
    cwd=global_config.WORKDIR, # 执行目录
    env=env, # 默认读取系统环境变量，可以自己传入字典
    shell=True, # 使用系统Shell
    capture_output=True, # 默认False，stdout、stderr会输出到终端。True会被拦截到res.stdout、res.stderr 中
    text=True, # 默认False, res.stdout是字节，设为True输出字符串
  	timeout=HOOK_TIMEOUT # 超时时间，单位秒
)

print(res.returncode) # 退出码，类型是int
print(res.stdout+res.stderr) # 输出内容
```



#### JSON

序列化字符串

```python
# ensure_ascii默认True，需要设置为False，才能转中文
print(json.dumps({"name": "李明", "age": 20}, ensure_ascii=False))

# 指定格式
print(json.dumps({"name": "李明", "age": 20}, ensure_ascii=False, sort_keys=True, indent=4, separators=(',', ': ')))
#输出：
#{
#    "age": 20,
#    "name": "tom"
#}

# json.dumps(xxx, default = str) 遇到无法识别的不会报错，而是直接转成字符串
```

反序列化成Python的dict

```python
print(json.loads('{"name":"tom", "age":18}'))

# 如果是非JSON，抛出 JSONDecodeError
json.loads("xxx")
```

#### 时间

time 包适合获取时间戳

```python
import time

# 秒级时间戳，浮点数
time.time()
# 休眠
time.sleep()

# monotonic 返回的不是时间，只是换一个没意义的数值，重要的是他不受系统时间影响，随时间递增。用它计算耗时最精准，差值是秒
start = time.monotonic()
time.sleep(2) 
end = time.monotonic()

print(f"程序运行耗时: {end - start:.4f} 秒")
# :.4f 冒号是说明符 `.4`是保留4位小数，`f`强制使用小数形式
# 例子
num = 0.0001234
# 不加 f，Python 觉得太短了，自动用了科学计数法
print(f"{num:.4}")   
# 输出: 0.0001234 (或者直接变成 1.234e-04，取决于具体版本和环境)
```

datetime 包获取日期、格式化日期、日期加减运算、时区转换

```python
from datetime import datetime, date, time, timedelta, timezone

# 当前本地时间（不含时区）
now = datetime.now() # 输出: 2026-05-13 16:12:36.xxxxxx
now.strftime('%Y-%m-%d %H:%M:%S')        # '2026-05-13 16:12:36'
now.strftime('%Y年%m月%d日 %H时%M分')     # '2026年05月13日 16时12分'
now.strftime('%A')                      # 'Wednesday'（星期全称）
now.strftime('%a') 											# 'Wed'（星期简称）
now.isoformat()         							  # '2026-05-13T16:12:36'
now.year      # 2026
now.month     # 5
now.day       # 13
now.hour      # 16
now.minute    # 12
now.second    # 36
now.microsecond  # 微秒
now.weekday() # 2（0=周一，2=周三）
now.isoweekday() # 3（1=周一，3=周三）

# 今天日期
today = date.today() # 输出: 2026-05-13
today.isoformat() # 输出: '2026-05-13'

# UTC时区时间
utc_now = datetime.now(timezone.utc) # 输出: 2026-05-13 08:12:36+00:00
shanghai_time = utc_now.astimezone(shanghai_tz) # 转成上海时区


# 时间运算
date(2026, 5, 13) > date(2026, 5, 1)   # True
today + timedelta(days=7)    # 7天后：2026-05-20
today - timedelta(days=3)    # 3天前：2026-05-10
```

#### md5

```python
import hashlib

def convert_md5(input_str: str, encoding = 'utf-8') -> str:
    """ 把字符串转成 md5 """
    # 转成bytes
    str_bytes = input_str.encode(encoding)
    # md5对象
    md5_obj = hashlib.md5()
    # 传入字符串
    md5_obj.update(str_bytes)
    return md5_obj.hexdigest()  # 获取十六进制md5值

```

#### 动态加载模块

python也可以和JS一样，把模块动态加载运行。可以实现插件系统

```python
import importlib.util
import sys

def load_module_from_path(module_name, file_path):
    # 1. 创建模块规范 (ModuleSpec)
    # 这一步只是告诉 Python 模块叫什么，文件在哪里，怎么加载
    spec = importlib.util.spec_from_file_location(module_name, file_path)
    
    if spec is None:
        raise ImportError(f"无法为 {file_path} 创建模块规范")

    # 2. 创建一个空的模块对象
    module = importlib.util.module_from_spec(spec)

    # 3. (可选) 将模块注册到 sys.modules
    # 这样其他代码就能通过名字导入它，也能避免重复加载
    sys.modules[module_name] = module

    # 4. 执行模块代码
    # 这一步真正运行了 .py 文件里的代码，填充了模块的内容
    spec.loader.exec_module(module)
    
    return module

# --- 使用示例 ---
# 假设同目录下有一个 plugin.py 文件
plugin = load_module_from_path("my_plugin", "plugin.py")

# 现在可以像普通导入的模块一样使用它
# plugin.some_function()
```

### 三方库

#### typer 、prompt_toolkit、Textual

终端工具 https://pypi.org/project/typer/

![image-20260523012902639](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20260523012902FUMhEB.png)

Rich 丰富的终端样式， Textual好像封装了Rich



#### pydantic

类型相关工具

```python
from pydantic import BaseModel, Field, ValidationError

# 1. 定义数据模型（蓝图）
class User(BaseModel):
    id: int
    name: str = Field(min_length=1, description="用户姓名")  # 可以加约束和描述
    age: int = Field(gt=0, lt=150)  # 年龄必须大于0且小于150
    is_active: bool = True  # 设置默认值

# 2. 正常实例化（会自动进行类型转换）
try:
    # 注意这里 age 传的是字符串 "25"，Pydantic 会自动把它转成整数 25
    user = User(id=1, name="张三", age="25") 
    print(user.name)  # 输出: 张三
    print(user.age)   # 输出: 25 (已经是 int 类型)
    
    # 3. 序列化为字典或 JSON
    print(user.model_dump())        # 转成 Python 字典 {'id': 1, 'name': '张三', ...}
    print(user.model_dump_json())   # 转成 JSON 字符串
except ValidationError as e:
    print(e.json())
```



## LLM概览

### 命名规则

![image-20260424215811586](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20260424215812E3dk2V.png)

### Ollama本地部署

运行大模型的本地工具

官网：https://ollama.com/

安装：

```shell
curl -fsSL https://ollama.com/install.sh | sh
```

```shell
ollama -h # 查看所有命令
```

搜索支持安装哪些模型：https://ollama.com/search ，提供各个参数规模的模型命令

```shell
# 在终端运行qwen大模型（首次运行会先下载安装），模型会一直运行
ollama run qwen2.5:0.5b 

# 查看运行中的大模型
ollama ps

# 停止大模型
ollama stop qwen2.5:0.5b 
```

![image-20260424142910721](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20260424142910fB1f7d.png)

启动服务，就能通过 API 形式调用运行中的大模型

```shell
# 启动 Ollama 服务 (默认端口 11434)， 访问 http://localhost:11434/ 显示 ollama is running
ollama serve
```

### API服务商

智谱、mini-max、claude code、openAI 都可以去对应的官网购买 token 额度，提供API调用

也有 [阿里云百炼](https://bailian.console.aliyun.com/) 这种聚合了多种大模型API的平台，百炼提供了一定的免费额度，可以白嫖

![image-20260426143823051](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/2026042614382341cCBn.png)

## Claude Code

这里指的是 Claude Code CLI工具，文档：https://code.claude.com/docs/zh-CN/overview

### 安装配置

安装命令行工具

```shell
# brew 安装
brew install claude-code
# pnpm 安装
pnpm i -g @anthropic-ai/claude-code
```

因为 Claude Code 不对国内开放，没法调用它的模型，所以一般使用其他兼容 anthropic 协议的大模型替换。我是用的是 mini-max，下面以它为例子

* 新建/编辑 `~/.claude/settings.json`  ，添加如下配置

  ```json
  {
     "env": {
       "ANTHROPIC_BASE_URL": "https://api.minimaxi.com/anthropic", // mini-max的地址
       "ANTHROPIC_AUTH_TOKEN": "MINIMAX_API_KEY", // mini-max 开通后提供的调用 key
       "API_TIMEOUT_MS": "3000000",
       "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": "1",
       "ANTHROPIC_MODEL": "MiniMax-M2.7",
       "ANTHROPIC_DEFAULT_SONNET_MODEL": "MiniMax-M2.7",
       "ANTHROPIC_DEFAULT_OPUS_MODEL": "MiniMax-M2.7",
       "ANTHROPIC_DEFAULT_HAIKU_MODEL": "MiniMax-M2.7"
     }
   }
  ```

* 新建/编辑 `~.claude.json` ，添加如下配置

  **欺骗 CLI，用户已经完成了新手指引，新手指引时会校验地区限制**，因为中国区域不开放，所以需要开启这个

  ```json
  {
  	"hasCompletedOnboarding": true 
  }
  ```

在项目目录下，启动

```shell
claude
```

![image-20260426150758906](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20260426150759RfMWoR.png)

### 三种模式

```shell
# shift+tab 切换三种模式

? for shortcuts  # 创建/修改文件前，询问用户
⏵⏵ accept edits on (shift+tab to cycle) # 本次授权操作文件，不会询问
⏸ plan mode on (shift+tab to cycle) # 只讨论，不修改文件 
```

![image-20260426151148344](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20260426151148Of5QS8.png)

### Skills

![image-20260426190143105](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20260426190143m95JjZ.png)

#### 写 Skills

请参考文档：https://agentskills.io/home ，文档中有规范+最佳实践

claude官方的Skill实现：https://github.com/anthropics/claude-agent-sdk-demos

Skills 项目的基本结构

```shell
my-skill/
├── SKILL.md          # 核心文件（必选）
├── scripts/          # 脚本（可选）
├── references/       # 参考文档（可选）
├── assets/           # 模板/静态资源 （可选）
└── ...               # 其他（可选，不做限制）
```

SKILL.md ，启动 name、description 必须有 ，且 name与目录名一致

````markdown
---
name: roll-dice
description: Roll dice using a random number generator. Use when asked to roll a die (d6, d20, etc.), roll dice, or generate a random dice roll.
---

To roll a die, use the following command that generates a random number from 1
to the given number of sides:

```bash
echo $((RANDOM % <sides> + 1))
```

```powershell
Get-Random -Minimum 1 -Maximum (<sides> + 1)
```

Replace `<sides>` with the number of sides on the die (e.g., 6 for a standard
die, 20 for a d20).
````

上面的是一个 Skills 的标准目录结构，实际上很多 Skills 项目内部都包含多个 Skills

以 [langchain-skills](https://github.com/langchain-ai/langchain-skills) 项目为例子， 但是其实官方没有要求目录结构，只要有 SKILL.md 文件，`npx  skills` 都能识别出来并安装好

```
my-skill/
├── config
			├── skills        
				    ├── deep-agents-core
				    ├── deep-agents-memory
				    ├── deep-agents-orchestration
				    ├── ...
			├── AGENTS.md       
├── .gitignore
├── README.md
└── ...      
```

编写 Skills

* 自己安装 Skill 的规范、格式编写
* 直接描述功能让 AI 生成 Skill，或者让 AI 把历史上下文的流程总结为 Skill

案例：

```markdown
帮我生成一个 commit skill，功能：当提交时总结改动，生成一段简短的 commit message，要符合 Converntional Commit 规范      
```

直接在 Claude Co 的终端输入 `git commit` ，就会自动激活 

![image-20260426200844481](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20260426200844svncXO.png)

#### 安装 Skills

**安装**

安装目录：`~/.claude/skills`（全局生效） 、 `项目/.claude/skills` （只在项目生效）

安装方式：

* 直接把 Skills 文件拷贝放置在安装目录

* 使用 skills 工具安装

  ```shell
  # 示例
  # 官方
  npx skills add langchain-ai/langchain-skills --skill '*' --yes
  
  # 从地址下载 skill
  npx skills add https://github.com/github/awesome-copilot --skill chrome-devtools
  
  
  ## --skill xxx 指定安装哪个skills
  ## --yes 是跳过所有询问
  ```

* 安装 Claude Code 插件， 插件是 MCP、Skill、Hooks等工具的集合。安装插件其携带的Skills也会被安装

  ```shell
  # 示例, 需要在 Claude code 输入框中输入，展示交互界面
  /pugins
  
  # 官方市场的插件
  /plugin install superpowers@claude-plugins-official
  
  # 三方市场的插件，需要先添加市场
  /plugin marketplace add langchain-ai/langchain-skills
  /plugin install langchain-skills@langchain-skills
  ```

  ![image-20260426201357975](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20260426201358eXtRmI.png)



**查看安装的 Skills**

```
/skills 
```

![image-20260426185107690](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20260426185107P4PlBa.png)

#### 触发 Skills 

* agent根据上下文对话，自动触发

* 手动触发

  ```
  ---
  name: xxx
  description: xxxx
  
  注意下面两个字段
  disable-model-invocation: true # 只能通过/命令触发
  user-invocable: false # 只能通过上下文触发
  ---
  ```

#### Skills市场

https://github.com/anthropics/skills  skill官方的Skill实现

https://github.com/anthropics/claude-plugins-official?spm=5176.28103460.0.0.193b2988dsTNvp 官方插件仓库

* Claude Code 的 `/plugin` 

  ![image-20260426201357975](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20260426201358eXtRmI.png)

* https://skills.sh/

* https://skillsmp.com/

* https://claudeskills.info/

  
  
  

### 补充

当前启动会话，默认跳过每次的权限确认

```shell
claude --dangerously-skip-permissions -c 
# 中断会话，执行跳过权限确认，-c 会让你重新回到过去上下文
```

### 必装插件

https://mp.weixin.qq.com/s/n_3S4qC8OR6CIUCQJiNsYw



## 提示词工程（Prompt）

### 万能公式

![image-20260424230516483](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20260424230516rtRo7N.png)

旅游攻略案例：



![image-20260424230631625](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/202604242306312I10df.png)

周报案例：

你是一位资深的前端架构师，帮我写一份约400字的周报。本周我做了.... 。要突出数据成果，周报要提交给领导看，所以需要避免空话、套话。周报整体包括：工作总结、成果、反思、下周计划共四个部分

### 进阶提示词

* 引导推理： **请一步一步分析，给出推理过程及最终结果**

* 提供样例：**请参考 xxx 例子/格式，输出类似风格的结果**

* 自我验证：**确认结果符合 xxx 、yyy 的场景**

### 积累

```
你是一个SQL分析专家

## 规则/工作流程:
- 一步一步分析
- 当你需要分析数据时，可以调用 `execute_sql` 工具
- 只能做只读操作，禁止出现 insert、delete、update、alter、drop、create 等破坏性操作  
	# 注意：不能完全信任大模型，工具里最好对这种危险操作引入人工审批
- select
- 如果 `execute_sql` 工具返回 Error，修正SQL后重试

## 
```



```markdown
# 交代角色、工作区、工作方式：行动后，清晰上报
# 调用工具完成任务
# 记忆
# 指明 Skill工具，用代码动态拼接的工具

# ------下面是提示词------

SYSTEM = f"""You are a coding agent at {global_config.WORKDIR}.

Use tools to solve tasks. Act first, then report clearly.
// 备用提示词：Use the provided tools to explore, read, write, and edit files
Always verify before assuming. Prefer reading files over guessing.

# Available tools

When to save memories:
- User states a preference ("I like tabs", "always use pytest") -> type: user
- User corrects you ("don't do X", "that was wrong because...") -> type: feedback
- You learn a project fact that is not easy to infer from current code alone
  (for example: a rule exists because of compliance, or a legacy module must
  stay untouched for business reasons) -> type: project
- You learn where an external resource lives (ticket board, dashboard, docs URL)
  -> type: reference
When NOT to save:
- Anything easily derivable from code (function signatures, file structure, directory layout)
- Temporary task state (current branch, open PR numbers, current TODOs)
- Secrets or credentials (API keys, passwords)

Skills available:
{tools.SKILL_REGISTRY.describe_available()}
"""
```

做摘要的提示词

```markdown
 "Summarize this conversation for continuity. Include:\n"
    "1) Task overview and success criteria\n"
    "2) Current state: completed work, files touched\n"
    "3) Key decisions and failed approaches\n"
    "4) Remaining next steps\n"
    "Be concise but preserve critical details.\n\n"
```

拿到摘要后，拼接的用户返回信息

```markdown
continuation = (
        "This session continues from a previous conversation that was compacted. "
        f"Summary of prior context:\n\n{summary}\n\n"
        "Continue from where we left off without re-asking the user."
    )
```

## RAG

RAG（检索增强生成，Retrieval-Augmented Generation）

简单来说，就是给大模型配了一个**“实时搜索引擎”**或**“外接知识库”**，让它回答问题前先去查阅资料，而不是只靠“脑子”里训练好的旧知识瞎编

RAG 就是为了解决这大语言模型（如 GPT-4、Claude、Qwen）本身有两个主要缺陷：

1. **知识滞后**：模型训练完那一刻，知识就“冻结”了。它不知道昨天发生了什么新闻，也不知道你公司内部今天发布的新规定
2. **一本正经胡说八道（幻觉）**：如果你问它一个它不知道的专业问题，它可能会编造一个看起来很真的答案

流程图：

![image-20260524233907456](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20260524233907e3u0oP.png)

总体选型

![image-20260425123816514](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20260425123816j9MYEs.png)

向量数据库：Milvus相对主流

![image-20260425124406307](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20260425124406qNvVv4.png)

### 补充基础

1、向量化

使用 Embedding Model 把文本向量化

例如： text-embedding-v1 模型可以给文本生成 1536 维的向量，生成的维度越多，做语义匹配就越精准

![image-20260525000234905](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20260525000235ct93Zt.png)

2、余弦相似度

向量夹角越小，余弦相似度越接近1，表示语义越相似

计算公式：（例子是二维的，高维原理一致）

![image-20260525000739566](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20260525000739sfWf3T.png)

A、B两点方向一致，长度不同。从计算结果可以看出来，只要方向一致相似度就是1

## LangChain

文档：https://docs.langchain.com/oss/javascript/langchain/install

MCP Server 提供文档查询：https://docs.langchain.com/use-these-docs

Skills 提供辅助编程：https://github.com/langchain-ai/langchain-skills

### Agent

```ts
import { createAgent, createMiddleware, ToolMessage, tool } from "langchain";
import { InMemoryStore } from "@langchain/langgraph";
import { ChatOpenAI } from "@langchain/openai";
import { z } from "zod/v4";
import { StateSchema, MemorySaver } from "@langchain/langgraph";


// 处理工具调用错误 - 中间件
const handleToolErrors = createMiddleware({
  name: "HandleToolErrors",
  // 调用tool触发
  wrapToolCall: async (request, handler) => {
    try {
      
      // 调用 tool 前
      const response = await handler(request); // handler 调用 tool
      // 调用 tool 后
      return response
      
      // ---------- 很适合加些动态逻辑 ---------------
      // 1、动态选择模型
      // const messageCount = request.messages.length;
      // return handler({
      //   ...request,
      //   model: messageCount > 10 ? advancedModel : basicModel,
    	// });
      
      // 2、动态选择加载工具
      // let filteredTools = request.tools.filter(() => 筛选逻辑 )
      // return handler({ ...request, tools: filteredTools });
      
      // 3、动态设置systemPrompt
      // const userRole = request.runtime.context?.userRole || "user";
      // const basePrompt = "You are a helpful assistant.";
      // let finalPrompt = basePrompt;

      // if (userRole === "expert") {
      //    finalPrompt = `${basePrompt} Provide detailed technical responses.`;
      //  } else if (userRole === "beginner") {
      //    finalPrompt = `${basePrompt} Explain concepts simply and avoid jargon.`;
       // }
      
      // ---------- request 常用字段 ---------------
      // request 是 ToolCallRequest 类型
      // request.tool_call.name  // tool名
      // request.tool_call.args  // tool参数
      // request.tool_call.id    // tool id
      
      
      
    } catch (error) {
      // 处理工具调用错误
      return new ToolMessage({
        content: `Tool error: Please check your input and try again. (${error})`,
        tool_call_id: request.toolCall.id!, // tool 的 id
      });
    }
  },
});

// 工具
// langchain 提供500+常用工具，参考 ：https://docs.langchain.com/oss/javascript/integrations/tools/composio 
const getWeather = tool(
  ({ location }, config: ToolRuntime) => {
    // 参数：
    // creatAgent的参数contextSchema => 通过config.context读取。启动时注入的上下文
    // creatAgent的参数stateSchema =>通过config.configurable 写入/读取。对话中记录用户偏好信息
    // config.executionInfo 插件执行信息，包含字段 threadId、runId、nodeAttempt尝试次数
    
    // 返回值支持 字符串、对象、命令。 参考：https://docs.langchain.com/oss/javascript/langchain/tools
    return `Weather in ${location}: Sunny, 72°F` // 工具函数
  }
  { 
    name: "get_weather",
    description: "Get weather information for a location",
    schema: z.object({
      location: z.string().describe("The location to get weather for"), // 校验
    }),
  } // 工具信息
);

// 定义更详细的模型参数
const basicModel = new ChatOpenAI({
  model: "gpt-5.4-mini",
  temperature: 0.1,
  maxTokens: 1000,
  timeout: 30
});
const advancedModel = new ChatOpenAI({ 
  model: "gpt-5.4",
  temperature: 0.1,
  maxTokens: 1000,
  timeout: 30
});


// 输出 JSON 格式
const format = z.object({
  content: z.string(),
});


const stateSchema = new StateSchema({
  userId: z.string(),
  userPreferences: z.record(z.string(), z.string()),
});

const contextSchema = new StateSchema({
  userId: z.string(),
  userPreferences: z.record(z.string(), z.string()),
});


// 内存记忆
// await store.put(["users"], user_id, { name, age, email });  // 存储，["users"]是 namespace，后面才是 key、value
// const value = await store.get(["users"], user_id); // 获取   
const store = new InMemoryStore();

// 检查点
// 内存
const checkpointer = new MemorySaver();
// 生产环境中，一般存在数据库
// import { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";
// const DB_URI = "postgresql://postgres:postgres@localhost:5442/postgres?sslmode=disable";
// const checkpointer = PostgresSaver.fromConnString(DB_URI);

// --------- 创建 Agent --------- 
const agent = createAgent({
  // Agent名字，在多Agent系统中需要用名字调用对应子Agent。建议命名格式 snake_case，防止有些模型供应商不支持某些特殊命名
  name: 'research_assistant' 
  // "openai:gpt-5.4" 也支持字符串，但是无法配置详细模型参数
  model: basicModel, 
  // 工具
  tools: [getWeather],
  // 中间件                      
  middleware: [handleToolErrors], 
  
  // 定义Agent输出格式（LLM 输出很不稳定，Langchain 做的实现）
  responseFormat: format, 
    
  // 内存记忆，存储在运行内存，程序停止就丢失了
 	store,   
  
  // 检查点记忆
  checkpointer，  
	
	// 自定义记忆，在对话中记录额外的信息，例如用户的偏好
  //（Agent实例默认自动维护 message state，是短期记忆 ）
  // 在 tool、middleware 中通过 config.configurable 读取/写入需要记忆的信息
  stateSchema
    
  // 运行时上下文，其不会被放到 prompt 传递给大模型，通常注入当前用户的身份信息
  // 注入：agent.invoke的第二个参数注入
  // 使用：在 tool、middleware 中通过 config.context 读取（只读）
  contextSchema
});


// --------- 调用 Agent ---------
const result = await agent.invoke(
  // message 是数组，LLM 是无状态，Langchain会自动维护message state作为短期记忆
  // role = user 表示这是用户发送的信息，
  // role = assistant 表示上一轮 AI 的回答
  { messages: [{ role: "user", content: "Explain machine learning" }] },
  
  // 每次调用是注入，中间件可以通过 request.runtime 访问到这个对象
  { context: { user_name: "tom" } }
);

console.log(result.messages.at(-1)?.content) // 返回 result.messages 是所有message的数组，取最后一个
console.log(result.structuredResponse); // 输出responseFormat定义的json结构


// --------- Streaming方式调用 Agent ---------
// invoke只返回最后结果，Streaming将思考的过程也返回

const stream = await agent.stream(
  {
    messages: [{ role: "user", content: "Search for AI news and summarize the findings"}],
  },
  { streamMode: "values" }
);

for await (const chunk of stream) {
  // 每个 chunk 都是完整的信息，详见下面
  const latestMessage = chunk.messages.at(-1);
  if (latestMessage?.content) {
    console.log(`Agent: ${latestMessage.content}`);
  } else if (latestMessage?.tool_calls) {
    // 有 tool_calls 字段表示模型决定调用的工具
    const toolCallNames = latestMessage.tool_calls.map((tc) => tc.name);
    console.log(`Calling tools: ${toolCallNames.join(", ")}`);
  }
}
```

返回信息的结构，我们可以提取需要的信息

```js
{
  messages: [
  	// 系统提示词message
    SystemMessage {
      "id": "470428fe-3371-4e5c-a319-0fd188558923",
      "content": "你是一个 agent 助手，使用中文回答任何问题",
      "additional_kwargs": {},
      "response_metadata": {}
    },
    // 用户message
    HumanMessage {
      "id": "43a88602-ac23-4014-aa9f-28a197930f84",
      "content": "Search for AI news and summarize the findings",
      "additional_kwargs": {},
      "response_metadata": {}
    },
    // LLM 返回的message
    AIMessage {
      "id": "f3973df0-a3a8-491f-8e95-7cb0fd2d7786",
      // 回答的内容
      "content": "Sure! To provide you with an accurate summary of AI news, I need to know where you are located. Could you please specify which country or region you're interested in? Additionally, if possible, share the location details so we can get a more precise search query. If not specified, let's assume you have your own specific topic or area of interest for the AI news.\n\nPlease provide me with this information so I can assist you further.",
      // Agent助手的名字。多 Agent 的时候很重要
      "name": "research_assistant",
      "additional_kwargs": {},
      "response_metadata": {
        "model_provider": "ollama",
        "model": "qwen2.5:0.5b",
        "created_at": "2026-05-01T15:56:41.686561Z",
        "done": true,
        "done_reason": "stop",
        "total_duration": 1337801958,
        "load_duration": 71646750,
        "prompt_eval_count": 158,
        "prompt_eval_duration": 30967917,
        "eval_count": 90,
        "eval_duration": 1093670633
      },
      // 如果返回调用工具，这里就有
      "tool_calls": [],
      "invalid_tool_calls": [],
      // 这里是 token 用量
      "usage_metadata": {
        "input_tokens": 158,
        "output_tokens": 90,
        "total_tokens": 248,
        "input_token_details": {},
        "output_token_details": {}
      }
    }
  ]
}
```

### Message 短期记忆裁剪

Message 随着对话会逐渐增多，Lanchain 提供了四种方案精简上下文

https://docs.langchain.com/oss/javascript/langchain/short-term-memory#before-model

### 核心能力

这个 Agent 系统其实很精简，很多复杂的能力都是通过：

* 工具，在工具中可以读取运行时数据/ message 等，把这些作为依据实现工具本身能力。langchain 提供500+常用工具，参考 ：https://docs.langchain.com/oss/javascript/integrations/tools/composio 

* 中间件，在中间件中操作流程。参考 [内置的中间件](https://docs.langchain.com/oss/javascript/langchain/middleware/built-in) 就会发现：

  * message 信息摘要
  * Human in the loop 
  * 围栏：PII 身份信息检查、大模型分析敏感词
  * 子代理生成

  这些能力都是中间件实现的

#### 工具

主要分析，第一个参数即工具函数的入参（工具能读取的数据）与返参

```typescript
import { createAgent, tool } from "langchain";
import * as z from "zod";
import { type ToolRuntime } from "@langchain/core/tools";

// ----- 运行时上下文 -------

// 上下文对象，invoke时写入，工具、中间件只读
const contextSchema = z.object({
    userName: z.string()
});

// 状态管理，对话中可由工具、中间件读写，记录运行过程中的一些数据
const stateSchema = new StateSchema({
  userPreferences: z.record(z.string(), z.string()),
});

// ----- 运行时上下文 -------

const getWeather = tool(
  // 工具实现
  ({ location }, runtime: ToolRuntime<any, typeof contextSchema>) => {
    // 1、参数：
    // 数据 runtime.state，
    // 格式：{ message:[对话历史], lg_tool_call: { name:名字,args:参数, id:每次调用生成一个id, type: 'tool_call'}                         
    // 运行时信息：runtime.context 只读 , contextSchema注入类型
    // 状态管理：runtime.configurable，                                   
    // 执行信息、服务器信息：runtime.executionInfo
                              
    
    // 2、返回值支持 
    // 字符串、对象、命令。 参考：https://docs.langchain.com/oss/javascript/langchain/tools
    return `Weather in ${location}: Sunny, 72°F` // 工具函数
  },
  // 工具信息
  { 
    name: "get_weather",
    description: "Get weather information for a location",
    schema: z.object({
      location: z.string().describe("The location to get weather for"), // 校验
    }),
  } 
);

const agent = createAgent({
  name: 'research_assistant' 
  model: 'gpt-5.4', 
  tools: [getWeather],
  contextSchema,
  stateSchema
});
const result = await agent.invoke(
  { 
    messages: [{ role: "user", content: "Explain machine learning" }] 
  },
  
  // 每次调用是注入
  { context: { user_name: "tom" } }
);

```

#### 中间件

一共 6 个时机，在一次会话中， Agent Loop 会导致这些钩子多次触发

*  before_agent、after_agent 在每次 invock 开始结束触发
* before_model、after_model 在每次调用模型触发
* wrap_tool_call 、 wrap_model_call 是调用工具、模型时触发

![image-20260502024325857](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20260502024326JjMU3e.png)

每个钩子的入参、返回值

```ts
import { createMiddleware } from "langchain";
import { HumanMessage, AIMessage } from "@langchain/core/messages";

// 1. 创建一个多功能中间件
const productionMiddleware = createMiddleware({
  name: "MyProductionMiddleware", // 可选：中间件名称
  
  // ---  Agent invoke调用前/后 ---
  // 用途：guardrails护栏，做 PPI身份检测、基于模型的敏感内容分析
  // beforeAgent/ afterAgent 都是两种签名
  // async (state, runtime) => {}
  // { hook: (state, runtime) => {}, canJumpTo: []}
  beforeAgent: {
    hook: async (state, runtime) => {
      // 可以拿到对话历史
      const firstContent = state.messages[0].content.toString().toLowerCase();
  		if (firstContent.includes(敏感词)) {
        // 返回信息
        return {
              messages: [
                new AIMessage("我无法处理包含不当内容的请求")
              ],
              jumpTo: "end", //  跳到结束
            };
      }
      // 返回 undefined 会继续执行
      return; 
      
    },
     canJumpTo: ['end']  // 可选值，表示可以跳到到的节点，值"model", "tools", "end"
  },
  

  // ---  模型调用后 ---
  // 用途：日志记录、动态修改 Prompt、权限检查
  // 签名：和前面一致
  beforeModel: {
    hook: (state, runtime) => {
    
  	},
    canJumpTo: []
  }

  // --- 钩子 2: 模型调用后 ---
  // 用途：成本计算、内容审查、缓存写入
  // 签名：和前面一致
  afterModel: async (state, runtime) => {
    console.log(`🔵 [After Model] 收到响应`);
    
    // 示例：检查 Token 用量 (假设有 usage 字段)
    const tokens = response.usage_metadata?.total_tokens || 0;
    console.log(`💰 [Cost] 本次消耗 Token: ${tokens}`);

    return response;
  },

  // --- 包装工具调用 ---
  // 用途：工具的重试机制、超时控制、错误处理
  wrapToolCall: async (request, handler) => {
    const startTime = Date.now();
    console.log(`🔧 [Tool Start] 调用工具: ${request.toolCall.name}`);

    try {
      // 执行前，处理request
      const result = await handler(request);// 执行
      //执行后
      console.log(`✅ [Tool End] 工具执行成功，耗时: ${Date.now() - startTime}ms`);
      return result // 返回结果
    } catch (error) {
      console.error(`❌ [Tool Error] 工具执行失败:`, error);
      // 可以选择重新抛出错误，或者返回一个默认值
      throw error; 
    }
  },
  
  // --- 包装模型调用 (高级) ---
  // 用途：完全接管模型调用逻辑（如缓存、降级）
  wrapModelCall: async (request, handler) => {
      console.log("🚀 [Wrap Model] 开始拦截模型调用");
      try {
          return await handler(request);
      } catch (e) {
          console.error("模型调用崩溃，尝试降级...");
          // 这里可以写降级逻辑，比如换一个便宜的模型重试
          throw e;
      }
  }
});
```

通过装饰器定义会更简洁

![image-20260526102813042](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20260526102813qeNkIp.png)

### LangGraph

agent服务

```shell
# langgraph-cli 开发脚手架
pip install "langgraph-cli[inmem]"

# 创建项目
langgraph new project_name

# 默认用uv
uv sync

# 启动开发服务器(存在内存)， 根据项目根的 langgraph.json
langgraph dev
# 构建docker镜像
langgraph build

# pyproject.toml是记录项目依赖的
# pip install -e . # -e 在全局的仓库中，创建当前项目的链接
```

客户端：现在sdk后链接服务端地址，就能交互了

```shell
pip install langgraph-sdk
npm install @langchain/langgraph-sdk
```

## 低代码开发

Dify、Coze、n8n 都是目前主流的低代码 **LLM 应用** 开发平台，这里使用 Dify 进行讲解

### Xinference部署

Xinference 可以轻松部署运行多种模型，适合需要处理文本、图像、音频等多模态任务

**使用 conda 部署**

> conda 创建独立的 python 环境（不使用系统的），还自带 pip
>
> conda install、pip install 都能安装依赖包，但是 conda 安装的都是编译好的二进制，而 pip 通过源码安装，如果缺失依赖就会报错

1、安装 conda

```shell
1、清华镜像站 https://mirrors.tuna.tsinghua.edu.cn/anaconda/miniconda/ 有所有版本

2、安装 
## 下载并执行安装脚本 -b是批量安装，默认都选择yes
curl -O https://repo.anaconda.com/miniconda/Miniconda3-latest-MacOSX-arm64.sh && bash Miniconda3-latest-MacOSX-arm64.sh -b

## 在zsh中添加环境变量
~/miniconda3/bin/conda init zsh

## 刷新环境变量
source ～/.zshrc

3、验证是否安装成功
## 输出版本
conda --version 
## 终端会多一个（base），这是 conda 创建的默认虚拟环境名
(base) xxx@yyy ~ %
```

2、安装 xinference

```shell
# 创建独立的虚拟环境，-n 指定环境名为 xinference，环境中需要安装python3.11
conda create -n xinference python=3.11

# 激活环境 。补充删除环境命令 conda env remove -n xinference
conda activate xinference # 终端多一个(xinference)前缀

# 在虚拟环境中安装xinference包
conda install -c conda-forge pynini # -c 从conda-forge渠道安装pynini包。安装后下面 pip 才能顺利安装 xinference
pip install "xinference[all]"

# 启动
xinference-local --host localhost --port 9997
```

访问``http://localhost:9997``

**使用 docker部署(推荐)**

```shell
docker run -p 9997:9997 --name xinference -d xprobe/xinference:latest xinference-local -H 0.0.0.0
```

打开 `http://0.0.0.0:9997` ，就能看到启动的服务了

![image-20260421130718801](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20260421130720Qrl3Yx.png)

选择一个设置配置后，进行部署

![image-20260421131314984](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/202604211313152sntwS.png)

部署完成后，就能看到了。 点击操作里第一个是打开模型对话页面

![image-20260421131520178](/Users/heyingjie/Library/Application%20Support/typora-user-images/image-20260421131520178.png)



### Dify部署

Github地址：https://github.com/langgenius/dify

官网文档：https://docs.dify.ai/zh/use-dify/getting-started/introduction

![image-20260420204809886](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20260420204810yDv5Mi.png)

**使用 docker 部署**

```shell
# 下载项目
git clone https://github.com/langgenius/dify.git

# 项目 docker 目录下提供了 docker-compose.yaml 
cd docker
cp .env.example .env # 用示例最为环境变量
docker-compose up -d # 构建镜像后，启动容器
```

访问 `http://localhost/install` ，就能看到启动的服务了

![image-20260421002852471](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20260421002852gpVIEy.png)

这里设置初始管理员账户，这里需要记住账户密码否则后续会很麻烦

```
邮箱：hedaodao@123.com
用户名：hedaodao
密码：hedaodao123
```

### Dify聊天助手

创建

![image-20260421131910785](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20260421131911K53PLJ.png)

配置添加 Xinference 中部署的 qwen3 模型

![image-20260421132147954](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20260421132148oNoe4B.png)

![image-20260421145721371](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20260421145721iupvZe.png)

![image-20260421145808761](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20260421145808hMj2XX.png)

![image-20260421150312335](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20260421150312Fw6utf.png)

## Harness

Harness Engineering 目的是构建一套系统让 AI 在有边界、有约束、有反馈的环境中持续、可靠、高质量的交付代码

### 本质

Harness 的核心要素：上下文工程、架构约束、持续治理  

```
┌─────────────────────────────────────────────────────┐
│              Harness Engineering 三支柱              │
├─────────────────┬─────────────────┬─────────────────┤
│  上下文工程       │  架构约束        │  持续治理         │
│  Context Eng.   │  Architecture   │  Governance     │
├─────────────────┼─────────────────┼─────────────────┤
│ · 长/短期记忆     │ · Agent 编排模式 │ · 质量门禁       │
│ · 知识检索注入    │ · 状态机设计      │ · 知识生命周期    │
│ · 渐进式披露      │ · 降级策略       │ · 自动衰减        │
│ · 上下文防火墙    │ · 安全边界        │ · 持续进化       │
└─────────────────┴─────────────────┴─────────────────┘
```

### 知识沉淀（腾讯）

> 腾讯技术文章：[Harness不是目的，知识才是护城河 —— 一个AI工程交付团队的知识沉淀实践](https://mp.weixin.qq.com/s/Xy8NwrHZRWv301eTZz4Dpw)
>
> 文中反复提及 Karpathy 的 LLM Wiki 方法论，这是一篇26年4月3日发布在x平台的[推文](https://x.com/karpathy/status/2039805659525644595) ，核心思想：不必用RAG，而是把markdown文件作为知识库，让LLM持续不断把积累的知识写入文件。开发人员的任务不再是写代码而是和LLM一起维护视口
>
> 知乎分析这篇推文的文章：https://zhuanlan.zhihu.com/p/2024765496160003417

模型会迭代，工具链会更新（Skill、Agent），工作流会重构。但你的团队在一个特定业务领域积累的**领域模型、架构决策、最佳实践、已知陷阱、业务流程**——这些知识是永恒的，是不会因为模型换代而失效的

形成一套可以不断进化的知识库

**1、知识的维度**

使用 markdown 文件沉淀知识，之所以分为三个维度，是为了 Agent 能按需加载，防止超过上下文 （文章中成为三级渐进式索引）

知识成熟度：

```
draft（新提取，单一来源）  -> verified（单项目验证） ->  proven（成熟/可信赖）

// 成熟度晋升、衰减规则：
// 1、在1个项目中被验证升级为 verified，在 ≥2 个不同项目中被验证升级为 proven
// 2、proven 条目12个月未被引用降级为 verified，verified 条目 6 个月未被引用draft，draft 条目持续未引用 + Lint 标记 （ 这是因为知识会过时，必须涉及衰减策略 ）
```

知识存储：

知识可以向上提升。Layer 3 的项目知识，如果被判定为跨项目通用，会自动提升到 Layer 1 或 Layer 2

| 类型          | 目录                          | 级别             | 例子                                                         |
| ------------- | ----------------------------- | ---------------- | ------------------------------------------------------------ |
| **Layer 0-P** | 个人偏好 (~/.ai-team/)        | 纯本地，不共享   | 个人偏好 4 空格缩进还是 2 空格？偏好函数式还是面向对象？     |
| **Layer 0-T** | 团队约定 (team-conventions/)  | 团队级，Git 共享 | 代码规范、Commit 规范、Review 标准。这是团队层面的"宪法"，相对稳定 |
| **Layer 1**   | 技术知识 (tech-wiki/)         | 团队级，跨项目   | 跨项目通用的技术经验。比如"Spring Boot 多租户拦截器设计模式"、"Optional 依赖传递陷阱"。 |
| **Layer 2**   | 业务知识 (biz-wiki/{domain}/) | 团队级，按领域   | 特定业务领域的领域模型、业务规则、业务流程。比如"广告审核流程：提交→机审→人审→上 |
| **Layer 3**   | 项目知识 (docs/knowledge/)    | 项目级，随项目走 | 仅在当前项目有意义的上下文。比如本项目用的数据库             |

知识类型：

|     类型      |                  定义                   |                         示例                          |
| :-----------: | :-------------------------------------: | :---------------------------------------------------: |
|   **model**   |       实体定义、数据结构、关系图        |     "广告计划包含预算/出价/投放时段三个核心字段"      |
| **decision**  |        技术选型、架构决策及理由         | "选择事件驱动而非 RPC 同步，因为广告状态变更需要解耦" |
| **guideline** | 推荐做法 (recommend) 或禁止做法 (avoid) |      recommend: "公共模块变更后的兼容性检查清单"      |
|  **pitfall**  |      已知风险、故障模式、排查步骤       |            "广告预算扣减在高并发下会超扣"             |
|  **process**  |       业务流程、状态机、操作步骤        |            "广告审核：提交→机审→人审→上线"            |

**2、知识共享与更新**

采用独立仓库维护知识

* 知识是 harness 的核心资产，不应该因为某个项目废弃，而被丢弃
* 多项目可以共享知识 （ Layer0-T、Layer1、Layer2），对于 Layer0-P、Layer3 都放在具体项目下

目录结构：

```
team-knowledge.git                        ← 独立 Git 仓库
├── knowledge-catalog.md                  ← 全景目录（Agent 查询入口）
├── .knowledge-config.yaml                ← 团队配置（成员、冲突策略）
├── team-conventions/                     ← Layer 0-T: 团队约定
│   ├── coding-standards.md
│   └── commit-conventions.md
├── tech-wiki/                            ← Layer 1: 技术知识
│   ├── catalog.md                        ← 分类清单
│   ├── patterns/TK-PAT-001.md
│   └── anti-patterns/TK-AP-001.md
├── biz-wiki/                             ← Layer 2: 业务知识
│   └── {domain}/
│       ├── catalog.md
│       ├── entities/BK-AD-E001.md
│       └── pitfalls/BK-AD-P001.md
├── project-profiles/                     ← 项目画像
└── contributions/                        ← 贡献暂存区
    ├── pending/
    └── conflicts/
```

使用 log.md 记录提交的知识，只能追加不能修改，逐条记录每条贡献的 `贡献者`、`时间`、`会话哈希`

设计策略：成熟度晋升、知识冲突通知 leader 裁决

```
## [2026-04-09] ingest | [Steven] | 门店履约视图归档 | +1 decision, +2 guideline | #a3f8c2
- 新增 DEC-005: 地图组件选型（腾讯地图 GL JS SDK）
- 新增 GL-012: fitBounds 在 flexbox 布局中的替代方案 (polarity=recommend)

## [2026-04-12] verify | [Alice] | 跨项目验证 | maturity↑ 2 | #c5f0e2
- TK-SB-003 "分页查询延迟关联优化" (verified→proven, 2 projects)
```

**3、在工作流中沉淀知识**

在工作流中让 Agent 去完成知识的维护，在工具流的每个阶段 Agent 会访问特定维度的知识，防止超过上下文窗口

腾讯的16阶段工作流 ，从图中可以看出来每步有对应的Agent去负责

```
INIT 初始化 -> ANALYSE_PRODUCT 产品分析 -> ANALYSE_PRODUCT 技术分析

-> ARCHITECT 架构设计 -> IMPLEMENT 实现 

-> BUILD_VERIFY 构建验证 -> VISUAL_REVIEW 视觉验证 

-> ARCHIVE 总结知识 ->  DONE 结束
```

通过SKILL命令来触发对应工作流程，在工作流的特定阶段去维护知识库（知识总结提交、成熟度晋升等）

* 冷启动

  ```
  第一启动工作流 /flow-import 触发
  
  按照一定规则产出，成熟度标记为 draft，后续的 /flow-run 会验证这条知识
  ```

* 常规启动

  ```
  每次需求 /flow-run 触发：注意在下面两个阶段维护知识库
  	1、INIT阶段 >> git pull知识仓库、注入查询入口（仓库的knowledge-catalog.md）、根据三级索引按需查询知识库
  	2、其他中间阶段 >> 消费知识
  	3、ARCHIVE >> 知识提取为 verified + 进一步做提升判定
  
  下一个需求使用 /flow-run 触发，自动拿到历史积累的知识
  ```

除了触发工作流中的 Skills，还是有 

```
/flow-status  进度查看

/evolve  分析Bug改进
```

**4、Agent 按需加载知识**

```
Step 1: 读全景目录 knowledge-catalog.md（~50 行，零成本）
  → 了解知识库有什么分类、每类多少条
  → 定位当前阶段推荐查阅的 catalog.md 路径

Step 2: 读分类清单 catalog.md（~100-300 行，低成本）
  → 每条知识一行摘要
  → 按 tags / applicable_phases 过滤相关条目

Step 3: 读完整条目（按需，每条 50-200 行）
  → 获取完整知识内容

Step 4: 读原始产物（深入，可选）
  → 沿 source_references 追溯原始推导过程
```

读取后在输出产物中记录，访问了哪些知识，用于更新记录某条知识被 xxx 需要验证，用于成熟度晋升

**总结**

![image-20260428171800311](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/202604281718003i9KAY.png)

![image-20260428180244064](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20260428180244aQyEiL.png)



## 扫盲

### 主流的Agent运行模式

* 单智能体使用 ReAct 模式： 思考  - 行动 - 观察

* langchain 提出的 Plan and Execute 模式，即先规划在执行

  ![image-20260501165351627](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20260501165351gK5wk7.png)

* 多智能体协作模式： 通过编排机制，让不同的 Agent 扮演不同的角色（如架构师、程序员、测试员、安全专家）。它们之间可以通过共享任务列表、互相发消息（Agent-to-Agent, A2A）来协同完成大任务

  主流的 4 种多智能体编排模式：[参考视频](https://www.bilibili.com/video/BV19D9eB9Etg/?spm_id_from=333.788.top_right_bar_window_history.content.click&vd_source=78cb1ae1cd045dd0ff0d749cd5f181fb)

  * Supervisor：总管模式，一个主 Agent 负责任务划分，并分配多个专家 Agent，每个专家 Agent 返回处理摘要）

  * Workflow ：工作流模式，适合固定工作流 。缺点：不够灵活，必须有确定的工作流

  * Handoff ：交接模式，每次只有一个 Agent 处理，如果发现处理不了，就交接给两个 Agent/。缺点：日志和可观测性是工程难题

    ![image-20260501163414285](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20260501163414S39kKN.png)

  * Council：议会模式，多个 Agent 共同去做，最后由一个 Agent 去做汇总。常见场景是：多个 QA Agent 去做评审，然后最后汇总结果。优势：结果的质量高，适合做审核相关工作。缺点：多个 Agent 同时做一个工作 token 花费很多

  实际场景中，这 4 种方式都会用到

  ![image-20260501164012598](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20260501164012JWWGZB.png)

  

* Harness 模式：让 Agent 在一个有边界、有约束、有反馈的环境中持续迭代项目，根据反馈自我进化

### Function call 与 MCP

**Function Calling**：是大语言模型（LLM）自带的一项核心功能。指的是大模型“输出调用意图”的能力。OpenAI文档：https://developers.openai.com/api/docs/guides/function-calling

流程：开发者在Agent工具中定义工具函数（例如查询天气get_weather ），当用户询问北京天气时，大模型会分析调用哪个函数以及参数，Agent工具去做具体的调用 。 每个Agent定义的工具函数是不通用的



**MCP**： 为 AI 设计的**通用连接协议**。流程：将工具封装成一个独立的 **MCP Server**，Server遵循MCP协议提供一系列接口，仍然是 Agent 与 Server 通讯

| 核心能力 | 对应接口动作                                                 | 理解                                                         |
| -------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 工具     | `tools/list` (获取工具列表）<br /> `tools/call` (调用具体的工具) | “帮我做件事” (如：查天气、发邮件)                            |
| 资源     | `resources/list` (获取资源列表)<br /> `resources/read` (读取具体的资源) | “给我看个文件” (如：文档) ，很多工具都开发了 MCP Server 来提供文档。注意资源是只读的 |
| 提示词   | `prompts/list` (预设的 Prompt 模板列表) `prompts/get` (获取具体的模板) | “用这个模板说话” (如：标准化指令)                            |

例子：https://docs.langchain.com/mcp 是 langchain 通过的 MCP Server ，直接访问返回的

![image-20260423121309030](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20260423121309kEq4SV.png)

这个 MCP 定义了 2 个工具去告诉 Agent 如何查询文档，而不是直接在 resources 中暴露出来所有文档



**MCP的三种通讯模式**

* Stdio 标准输入输出：适合调用本地工具，例如：读取本地文件
* SSE 模式：远程访问服务器，服务端可以主动推送
* HTTP模式

### Langchain相关

ReAct 是一种架构范式：**思考-行动-观察循环**

例如：

1. **思考 (Thought / Reasoning):**
   模型首先分析当前的任务目标和已有的信息，然后用自然语言“自言自语”，推理出下一步应该做什么。例如：“用户想知道明天的天气，但我没有实时数据，所以我需要调用天气查询工具。”
2. **行动 (Act / Acting):**
   根据上一步的思考，模型会生成一个具体的行动指令，比如调用一个预设的工具或API。例如：`search_weather(city="北京", date="明天")`
3. **观察 (Observe / Observation):**
   行动执行后，系统会将工具的返回结果（即观察）反馈给模型。例如，工具返回：“北京明天：晴，25°C”。这个观察结果会成为模型下一轮思考的输入

优点：

- **减少模型幻觉:** 通过与外部工具交互获取真实数据，而不是仅依赖模型内部的训练知识，大大降低了编造信息的可能性
- **提升可解释性:** 整个“思考”过程是可见的，你可以清楚地看到 AI 是如何一步步分析问题并做出决策的，就像一个透明的“白盒”
- **解决复杂任务:** 能够自主拆解和规划多步骤任务，动态调整策略，处理那些无法一步到位的复杂问题

langchain、deepagent 都是基于 langgraph 构建的，langsmith 提供可观察性和评估功能 

LangChain 是基于 ReAct 思想设计的

### ACP 协议

智能体客户端协议 (Agent Client Protocol)，它专门用来解决 **代码编辑器（如 VS Code, Neovim）** 和 **编码智能体（如 Codex, Claude Code）** 之间的通信标准

类似于 LSP（语言服务器协议）标准化了代码高亮和跳转，ACP 标准化了“智能体如何操作编辑器”。它让任何支持 ACP 的智能体都能在任何支持 ACP 的编辑器里运行，打破了工具之间的绑定


与 MCP 协议一样，也是基于 JSON-RPC 2.0，支持本地（stdio）和远程通信。

MCP 是 Agent 与MCP工具之间的协议，ACP 是Agent 与编辑器之间的协议



### 如何设计一套上下文的取舍方案

上下文过大导致的问题：

* 上下文过大导致响应变慢
* 消耗大量 token
* 污染上下文，无关信息太多导致指令偏移

保留哪些？

* 时效性：优先保留最近的上下文
* 相关性：与当前语义最贴近的上下文
* 重要性：关键的决策依据、系统指令
* 多样性：保留不同路径的思考过程

取舍策略：

* 动态滑动窗口：保留最近的N轮对话，维持基础的连贯性
* 层级化总结：对历史对话进行滚动压缩，将长对话转化为精炼摘要
* RAG外部存储：把非必要信息移除Prompt，存入向量数据库，之后按需检索
* Token剪枝与脱水：剔除Tool Call冗余的中间结果

如何评价取舍后的效果：

* 任务成功率
* 推理首字延迟
* Token节省率

### 主流工具

* https://github.com/multica-ai/andrej-karpathy-skills

  

## 学习项目

* Pi 是TS 实现的 Agent 底层引擎（我感觉像是插件系统），OpenClaw就是基于这套系统实现的

  地址：https://github.com/badlogic/pi-mono

* 基于TS构建的工作流平台

  地址： https://github.com/FlowiseAI/Flowise/blob/main/i18n/README-ZH.md

  ![image-20260425004611986](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20260425004612y4oZ0S.png)

* 基于 TS 的 Agent 平台

  地址：https://github.com/ChatGPTNextWeb/NextChat/blob/main/README_CN.md

  我看了下源码发现，这个项目没有使用 Langchain 这种工具，而是自己实现的 message state、agent loop 这些内容，很适合用来学习

  ![image-20260425004028234](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20260425004028L4qbLS.png)

* Agent CLI

  mini-max 推出的 Mini-Agent 工具， python 实现

  文档：https://platform.minimaxi.com/docs/solutions/mini-agent#mini-agent-%E6%A1%86%E6%9E%B6%E7%AE%80%E4%BB%8B

  项目地址：https://github.com/MiniMax-AI/Mini-Agent/tree/main

  Mini-Agent 的核心功能：

  ![](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20260423200838tFEbzT.png)

* TS实现的极简 Agent

  https://github.com/lqqyt2423/qiangclaw/blob/main/src/index.ts
  
* claude agent sdk 示例代码库，示例很多建议学习

  https://github.com/anthropics/claude-agent-sdk-demos
  
* anthropic的 plugin 仓库，学习下

  https://github.com/anthropics/claude-plugins-official/tree/e73e9a6257ac5285a7218dc5e7e99b1ae2dc65e7/plugins/typescript-lsp
  
* langchain 文档里提到的项目

  https://github.com/langchain-ai/agent-chat-ui.git
  
  https://github.com/langchain-ai/deepagents/blob/main/examples/README.md

## 临时记录

harness工程：

![image-20260428150510745](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20260428150511iEFc14.png)

python入门

https://www.valentinog.com/blog/python-for-js/#python-data-types%3A-dictionaries-and-javascript-objects

agent 支持子任务

https://github.com/lqqyt2423/qiangclaw/blob/main/src/index.ts

langchain文档

https://docs.langchain.com/oss/python/langchain/models

工作流怎么编排？ "Agent 怎么协同？
