# C++学习笔记

## Dec-c++

dev-c++进行debug时

直接查看vector时，使用`*(&v[0])@3`是查看v的3位

## 函数传递的参数

```
void fun(int a[])//传递数组

void fun(LNode * L1) //传递结构体指针
```

## 读入与输出

### 输入

#### 头文件`#include<iostream>`

cin读入数据

* 不能读入空格，遇到空格结束读入当前变量
* 遇到回车结束读入当前变量，如果是读入的是最后一个变量，则结束所有输入。
* 遇到EOF结束输入【自己在调试中输入"ctrl+z"，回车即可】

例子：

```c++
int a,b,c;
cout<<"请输入： " ;
cin>>a>>b>>c;
```

![image-20210422212618452](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/C++%E7%9B%B8%E5%85%B3/image-20210422212618452.png)

读普通变量

```c++
int a;
cin>>a;

//输入多个数，以空格隔开，回车。只有前两个数读入了
int a,b;
cin>>a>>b;
```

读数组

```c++
int a[100];
for(int i=0;i<3;i++){
   cin>>a[i]; 
}
```

读string 

​	不用引入`#include<string>`,string是内置类型

```c++
//输入 aaa空格bbb ，就会s1="aaa",s2="bbb"
string s1,s2;
cin>>s1>>s2;

	
//读取一行中间带空格的字符串
string str;
getline(cin,str);
```

读入不定长度的vector

*  方法一**（推荐）**：输入多个数据到vector中用空格，分开。输入回车，结束输入。

  ```c++
  vector<int> A;
  while (1) {
  	cin >> number;
  	A.push_back(number);
  	if (cin.get() == '\n')
  	   break;
  }
  ```

* 方法二：读入不定长度的vector，oj判题系统会在样例结束输入EOF，自己在调试中输入"ctrl+z"，输入回车，即可结束while。【输入EOF后cin会检测到结束循环】

  ```c++
  vector<int> b;
  int a;
  while(cin>>a){//ctrl+z输入EOF结束符停止
     b.push_back(a);
  }
  ```

读入多行字符串（这里的字符串可以含有空格），以"ctrl+z"和回车，结束输入

```c++
while(getline(cin,str)) {
	cout<<" "<<str;
}
```



### 格式化输出

#### 头文件 `#include<iomanip>`

```c++
//输出换行
int a=1;
cout<<a<<endl;
//或者,dev调试有bug，输出endl会卡死，推荐这种写法
cout<<a<<"\n"

//可以连续输出
int a=1,b=2;
cout<<a<<"和"<<b
    
//指定输出宽度（小数点算一位长度）,数字长度不够用空格填充，数字长度比设置宽度大，则不受宽度限制
float a=1.235;
cout<<setw(10)<<a;   

//指定填充符号为*，必须用单引号引起来
cout<<setfill('*')<<setw(10)<<a; 

//除setw外，以下其他设置，如setfill,setprecision,fixed对流的影响是永久的
//setws是临时的，且setw只对紧跟其后的第一个变量起作用
float a=1.235;
cout<<setfill('*')<<setw(10)<<a<<endl; 
cout<<setw(6)<<a; 
//输出结果
//*****1.235
//*1.235

//浮点是指定有效位数输出
float a=12.1834b5
float b=12.8765432;
cout<<setprecision(3)<<a;//参数指的是输出的有效数字位数（整数位+小数位）超出部分四舍五入，输出：12.2
cout<<fixed<<setprecision(3)<<b;//有的时候如果数字过大，会转换为科学计数法输出，fixed保证以小数形式输出，setprecision(3)中的参数是小数点后保留的位数 ，输出：12.876
//注意：其实可以直接写成cout<<fixed<<b即可，因为之前的setprecision处理a时，对流的影响是永久的


```

**注意**：如果cout的格式化输出记不住，要知道cin>>输入的值可以printf配合占位符(比如：%d,%f,%c)等输出，除了cin读入string类型，不可以用printf("%s",str)输出，可以用printf("%c",s[i])循环输出



## 数据类型的范围

| 类型                  |定义方式         | 表示范围                |
| ------------------------------|-------------- | ----------------------- |
| int(默认是signed int,即有正负) | int x; |占用字节4；-2147483648~2147483647（-2^31~2^31-1）|
| long int                       | long x;       | 同上                                                         |
| long long                      | long long x; |占用字节8；\- 9223372036854775808 ~ 9223372036854775807（-2^63~2^63-1）|

## string

**引入头文件`#include<string>`**

* 基本运算

  ![image-20210422213820176](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/C++%E7%9B%B8%E5%85%B3/image-20210422213820176.png)

  注意：

  * s1[i]的类型是char型
  * 运算符是两个string之间的运算，如果是string s1和char a运算，可以用索引，比如s1[0]=‘a’【用单引号】，可以改变字符串指定位置的字符;

* string长度

  ```c++
  string s="abc";
  s.length();//输出3
  s.size();//输出3
  ```

* 插入

  插入一个字符

    ```c++
  //尾部插入，一个字符（单引号）
  s.push_back('a');
    
  //指定位插入字符（单引号），第一个参数是位置（从0开始），第二个参数是插入字符的重复次数
  string s="aa";
  s.insert(0,1,'h');//haa
  s.insert(2,3,'h');//输出aahhh
    
    ```

    插入字符串

    ```c++
  //在指定位置插入字符串
  string s="aa";
  s.insert(0,"he");
  cout<<s; //heaa
    
  //提醒：所有函数的参数都可变量化，例子
  string s1="aa";
  string s2="he";
  int i=0;
    
  s1.insert(i,s2);//输出heaa
    ```
  
* 删除

  按位删除

  ```c++
  //第一个参数，删除位置（从0开始），第二个参数从该位置开始删除多少个元素
  string s="abcde";
  s.erase(1,1);
  cout<<s;//输出acde
  ```

  按值删除

  ```c++
  //例子，删除指定元素a
  string s="abcde";
  for(int i=0;i<s.length();i++){
     if(s[i]=='a'){
        s.erase(i,1);
      }
  }
  cout<<s;//输出bcde
  ```

* 修改

  通过索引修改

  ```c++
  string s="abcde";
  char a='h';
  s[1]=a;
  cout<<s; //输出 ahcde
  ```

  replace函数

  ​	替换字符

  ```c++
  //第一个参数：string中替换的位置（从0开始）
  //第二个参数：string中从替换位置起的长度；
  //第三个参数：替换成的 字符 重复的次数
  //第四个参数：要替换成的 字符
  string s="abcde";
  s.replace(0,2,1,'h');
  cout<<s;//输出hcde
  ```

  ​	替换字符串

  ```c++
  //第一个参数：string中的位置
  //第二个参数：string中从替换位置起的长度；
  //第三个参数：替换成的 字符串
  string s="abcde";
  string s2="hh";
  s.replace(0,1,s2);
  cout<<s;//输出hhabcde
  ```

* 查找

  ```c++
  //find（第一个参数为字符或字符串，第二的参数是查询起始地点）
  string s="abcde";
  int k=s.find('b',0);
  int m=s.find("de",0);
  cout<<k<<" "<<m;
  //输出 1 3
  ```

* 截取,**注意substr不能对原来的字符串造成改变**

  ```c++
  //substr,第一个参数截取开始的位置（角标），第二个参数是截取的位数
  string s="abcdef";
  cout<<s.substr(2,3);//输出cde
  ```

* 大小写转换 tolower,toupper

  **注意：**参数是char，不是string类型
  
  ```c++
  //不能直接改变string，需要赋值回去才行
  string s="ABCD";
  s[0]=tolower(s[0]);
  cout<<s[0]<<"\n";//输出a
  
  
  //注意：需要强制类型转化下
  cout<<tolower(s[0])<<"\n";//输出 97 
  cout<<(char)tolower(s[0]);//输出 a 
  ```

## 类型转换

> c++11中有很多的新特性有利于我们解决字符串问题，但是dev c++,需要配置下才可以支持c++11.
>
> 在⼯具-编译选项-编译器-编译时加⼊这个命令 `-std=c++11`

## 头文件`#include<string>`

* to_string() ,可以把int，float，double类型的数字转化为字符串并作为返回值返回，不改变原本类型

  ```c++
  int a=1;
  string s=to_string(a);
  cout<<s;//输出1
  ```

* stoi 和stod，把string转为int或是double并作为返回值返回,不改变原类型

  ```c++
  string s="123"
  cout<<stoi(s);//输出123
  
  string s2="1.23"
  cout<<stod(s2)//输出1.23
  ```
  
  **注意：**stoi和stod的参数都是字符串，所以stoi(str[1])这种会报错，因为str[1]是字符类型
  
* 字符类型和数字运算

  ```c++
  cout<<'A'-1;//输出64
  
  //自动把字符转化为ASC码，A的asc码是65
  ```

* 把asc码转化为对应的字符

  ```c++
  cout<<(char)65;	 //输出 A
  ```

* 把字符转成数字

  ```c++
  cout<<'2'-1 //输出1
  
  //
  cout<<(int)'2'-1 //输出 49 int强制类型转换，转化为对应asc码
  ```


## STL

**注意：**

vector,set,map,stack,queue 这些在c++中都称之为**容器**，都可以通过`.size()`获取长度，通过迭代器遍历`for(auto it = c.begin(); it != c.end(); it++)`，`*it`是容器元素

迭代器指向位置，begin()指向第一个元素。end()-1才是指向最后一个元素

begin+1访问第一个元素，这种用法可以出现在vector,set中，但是**不能在map中使用**

### vector

**引入头文件 `#include<vector>`**

对读不定长度的字符，我们有string。对于其他输入不定个数的数据我们可以用vector

* 定义，初始化

  ```c++
  //1.定义⻓度为10的int数组，自动初始化10个元素值都为0
  vector<int> v(10);
  
  vector<int> v={1,2,3,4}//初始化为1，2，3，4
  //2.或者不指定长度
  vector<int> v1;
  //然后将⻓度resize设置大小为8，自动初始化8个元素都是0
  v1.resize(8); 
  
  
  //3.在定义的时候就可以对vector变量进⾏初始化
  vector<int> v3(100, 9);// 把100⻓度的数组中所有的值都初始化为9
  ```

* size()

  ```c++
  #include <iostream>
  #include<vector>
  #include<string>
  using namespace std;
  int main(int argc, char** argv) {	
  	vector<int> b(10);
  	cout<<b.size();//输出 10
  }
  ```

* 插入

  * push_back() :从尾部插入数据

    ```c++
    #include <iostream>
    #include<vector>
    #include<string>
    using namespace std;
    int main(int argc, char** argv) {	
    	vector<int> A;
    	while (1) {
    		cin >> number;
    		A.push_back(number);
    		if (cin.get() == '\n')
    	   		break;
    	}
    }
    ```

  * insert() :向指定位置插入数据

    第一个参数(迭代器类型)：vector.begin+插入位置的角标

    第二个参数：插入的数据

    ```c++
    #include <iostream>
    #include<vector>
    #include<string>
    using namespace std;
    int main(int argc, char** argv) {	
    	vector<int> b(5);
        int i=1;
    	b.insert(b.begin()+i,45);
        
    	for(int i=0;i<b.size();i++){
    		cout<<b[i]<<"\n";	
    	}
    }
    ```

* 删除

  * 按位删除元素【vector.erase】

    第一个参数(迭代器类型)：删除元素的位置

    ```c++
    #include <iostream>
    #include<vector>
    #include<string>
    using namespace std;
    int main(int argc, char** argv) {	
    	vector<int> b;
    	int temp;
    	while(1){
    		cin>>temp;
    		b.push_back(temp);
    		if(cin.get()=='\n') break;
    	}
    	
        int i=1;
    	b.erase(b.begin()+i);//这里是角标为1的那个元素
        
    	for(int i=0;i<b.size();i++){
    		cout<<b[i]<<"\n";	
    	}
    }
    ```

  * 删除指定范围的元素【vector.erase】

    第一个参数(迭代器类型)：起始元素角标
    
    第二个参数(迭代器类型)：也是元素角标
    
    【删除范围是从第一个参数位置，到第二个参数位置的前一个】
    
    ```c++
    #include <iostream>
    #include<vector>
    #include<string>
    using namespace std;
    int main(int argc, char** argv) {	
    	vector<int> b;
    	int temp;
    	while(1){
    		cin>>temp;
    		b.push_back(temp);
    		if(cin.get()=='\n') break;
    	}
    	
      
    	b.erase(b.begin(),b.begin()+2);//删除角标是0，1的元素
    	
        
    	for(int i=0;i<b.size();i++){
    		cout<<b[i]<<"\n";	
    	}
    }
    ```

* 修改：可直接通过索引赋值修改

  ```c++
  #include <iostream>
  #include<vector>
  #include<string>
  using namespace std;
  int main(int argc, char** argv) {	
  	vector<int> v(4,0);
  	v[0]=5;
  	for(int i=0;i<v.size();i++){
  		cout<<v[i]<<" ";	
  	}//输出 5 0 0 0
  }
  ```

* 访问（无find函数,只能遍历整个vector，用if判断）

### set

**引入头文件`include <set>`**

set是集合，set中的元素都不同，⽽且set会按照元素进⾏从⼩到⼤排序.

所以有自动去重和排序的作用

**注意：**set中没有角标的概念，所以：①查看，不能通过索引查看和修改set，遍历只能用迭代器②没有修改，只有按值删除和插入元素③删除只能是按值删除

* 定义，初始化

  ```c++
  #include <iostream>
  #include<set>
  using namespace std;
  int main(int argc, char** argv) {	
  	set<int> s;
  	s.insert(6);
  	s.insert(5);
  	for (auto it = s.begin(); it != s.end(); it++) { 
   		cout << *it << " ";
      }//输出 5 6
  }
  ```

* size()

  ```c++
  #include <iostream>
  #include<set>
  using namespace std;
  int main(int argc, char** argv) {	
  	set<int> s;
  	s.insert(5);
  	s.insert(6);
  	cout<<s.size(); //输出 2
  }
  ```

* 插入

  ```c++
  //使用insert，查看前两个例子。插入的元素，会自动排序，使用迭代器，遍历是有序的
  ```

* 删除：只能按值删除

  ```c++
  #include <iostream>
  #include<set>
  using namespace std;
  int main(int argc, char** argv) {	
  	set<int> s;
  	s.insert(5);
  	s.insert(6);
  	s.insert(7);
  	s.erase(5);//删除set中的5
  	for(auto it=s.begin();it!=s.end();it++){
  		cout<<*it<<" ";
  	}//输出 6 7
  }
  ```

  **注意：**s.erase是有返回值的，当删除的元素不存在时，返回0。当删除的元素，成功删除后，返回1

* 修改（不能直接修改，只能删除+插入）

* 访问（特别注意，set不可用下标查询，但是可以用迭代器。遍历只可以用迭代器）

  find函数，返回值是迭代器。使用以下的办法，判断是否查找到

  ```c++
  #include <iostream>
  #include <set>
  using namespace std;
  int main(){
      set<int> s;
      cin>>i;
      s.insert(i);//插入数据
      
      // ⽤迭代器遍历集合s
      for (auto it = s.begin(); it != s.end(); it++) { 
   		cout << *it << " ";
      }
      
      cout <<  (s.find(2) != s.end()) ;//find找到了就输出1，如果没找到就和s.end()相等了.返回0
      
      s.erase(1);//删除1
  }
  ```

  输出指定位置的元素

  ```c++
  #include <iostream>
  #include<set>
  using namespace std;
  int main(int argc, char** argv) {	
  	set<int> s;
  	s.insert(5);
  	s.insert(6);
  	s.insert(7);
  	cout<<*s.begin()+2; //输出第三个元素，第一个元素是*s.begin()
  }
  ```
  
  遍历set(只能使用迭代器)
  
  ```c++
  #include <iostream>
  #include<set>
  using namespace std;
  int main(int argc, char** argv) {	
  	set<int> s;
  	s.insert(5);
  	s.insert(6);
  	s.insert(7);
  
  	for(auto it=s.begin();it!=s.end();it++){
  		cout<<*it<<" ";
  	}//输出 5 6 7
  }
  ```

### map

**引入头文件`#include<map>`**

map是键值对，会⾃动将所有的键值对按照键从⼩到⼤排序，

* 定义

  ```c++
  #include <iostream>
  #include <map>
  #include <string>
  using namespace std;
  int main() {
  	map<string, int> m; // 定义⼀个空的map m，键是string类型的，值是int类型的
      
   	m["hello"] = 2; // 将key为"hello", value为2的键值对(key-value)存⼊map中
      //如果key不存在，则返回0
   	cout << m["hello"] << endl; // 访问map中key为"hello"的value, 
  	m["world"] = 3; // 将"world"键对应的值修改为3
  }
  ```

* size()

  ```c++
  #include <iostream>
  #include <map>
  #include <string>
  using namespace std;
  int main() {
  	map<string, int> m; 
   	m["hello"]=2; 
   	m["world"]=4;
  	cout<<m.size(); //输出2
  }
  ```

* 插入

  ```c++
  #include <iostream>
  #include <map>
  #include <string>
  using namespace std;
  int main() {
  	map<string, int> m; 
   	m["hello"]=2; 
   	m["world"]=4;
  }
  ```

* 删除【erase参数可以是键名，也可以是指向删除位置的迭代器】

  按关键字删除

  ```c++
  #include <iostream>
  #include <map>
  #include <string>
  using namespace std;
  int main() {
  	map<int,string> m;
  	m[1]="a";
  	m[2]="b";
  	m[3]="c";
  	m[4]="d";
  	m.erase(2);
  	for (auto it = m.begin(); it != m.end(); it++) {
  		cout << it->first << " " << it->second << endl;
  	}
  }
  //输出
  //1 a
  //3 c
  //4 d
  ```

  find找到指定键名，返回迭代器，按照迭代器删除

  【m.find(x)！=m.end() ; 代表找到了x】

  ```c++
  #include <iostream>
  #include <map>
  #include <string>
  using namespace std;
  int main() {
  	map<int,string> m;
  	m[1]="a";
  	m[2]="b";
  	m[3]="c";
  	m[4]="d";
  	auto it=m.find(2);
  	m.erase(it);
  	for (auto it = m.begin(); it != m.end(); it++) {
  		cout << it->first << " " << it->second << endl;
  	}
  }
  //输出
  //1 a
  //3 c
  //4 d
  ```

* 修改

  ```c++
  #include <iostream>
  #include <map>
  #include <string>
  using namespace std;
  int main() {
  	map<int,string> m;
  	m[1]="a";
  	m[1]="b";
      for (auto it = m.begin(); it != m.end(); it++) {
  		cout << it->first << " " << it->second << endl;
  	}
  }
  //输出 1 b
  ```

* 访问

  find函数，用来查找键值，返回迭代器。如果没有找到，返回迭代器指向end()

  ```c++
  #include <iostream>
  #include <map>
  #include <string>
  using namespace std;
  int main() {
  	map<int,string> m;
  	m[1]="a";
  	m[2]="b";
  	m[3]="c";
  	m[4]="d";
  	if(m.find(2)==m.end()){
  		cout<<"没找打" ;
  	} else{
  		cout<<"找到了"; 
  	} 
  }
  ```

  遍历map

  ```c++
  #include <iostream>
  #include <map>
  #include <string>
  using namespace std;
  int main() {
  	map<int,string> m;
  	m[1]="a";
  	m[2]="b";
  	m[3]="c";
  	m[4]="d";
  
       // ⽤迭代器遍历，输出map中所有的元素，键⽤it->first获取，值⽤it->second获取
       for (auto it = m.begin(); it != m.end(); it++) {
       	cout << it->first << " " << it->second << endl;
       }
       // 访问map的第⼀个元素begin()，输出它的键和值
       cout << m.begin()->first << " " << m.begin()->second << endl;
       // 访问map的最后⼀个元素rbegin()，输出它的键和值
       cout << m.rbegin()->first << " " << m.rbegin()->second << endl;
       // 输出map的元素个数
   	 
  }
  ```

### stack

**引用头文件`#include<stack>`**

* 定义，初始化

* size()
* push()入栈
* pop()出栈【注意这个函数没有返回值】
* top取栈顶

```c++
#include <iostream>
#include <stack>
using namespace std;
int main() {
 	stack<int> s; // 定义⼀个空栈s
	for (int i = 0; i < 6; i++) {
    s.push(i); // 将元素i压⼊栈s中
    }
    cout << s.top() << endl; // 访问s的栈顶元素
    cout << s.size() << endl; // 输出s的元素个数
    s.pop(); // 移除栈顶元素
    return 0;
}

```

### queue

* push队尾入队
* pop队首出队【无返回值】
* front获取队首元素

```c++
#include <queue>
using namespace std;
int main() {
    queue<int> q;
    q.push(1);
    q.push(2);
    q.push(3);
    q.pop();//出队
   	cout<<q.front();//输出2
}
```

## 结构体

## 建立链表

```c++
#include <iostream>
using namespace std;

//定义结构体 
struct node{
		int num;
		struct node *next;
	};
int main(int argc, char** argv) {	
	//读入第一个结点 
	int temp;
	cin>>temp; 
	node *L=(node*)malloc(sizeof(node));
	L->num=temp;
	L->next=NULL;
	//循环创建多个结点 
	node *r=L;//永远指向尾结点 
	while(cin>>temp){
		node *s=(node*)malloc(sizeof(node));
		s->num=temp;
		s->next=NULL;
		r->next=s;
		r=s;
		 
	}
	cout<<"---------------遍历链表--------------------"<<"\n";
	
    node *p=L;
	while(p!=NULL){
		cout<<p->num;
		p=p->next; 
	}
	
	return 0;
}
```

## 建立树

## 其他头文件，常用内容

### 不需要引入头文件

max和min函数,但是参数只能是int型

```c++
#include <iostream>
using namespace std;
int main(int argc, char** argv) {
	cout<<max(5,2);//输出5
    cout<<max(-1,-2);//输出 -1=0
	return 0;
}
```

### `#include<cmath>`

* sqrt开方
* pow(底数，指数)
* 求Π

```c++
#include <iostream>
#include <stdio.h>
#include <math.h>
#include<iomanip>
using namespace std;
int main()
{
    cout<<fixed<<setprecision(40)<<acos(-1);
}
```

### `#include<algorithm>`

* sort()  :对⼀个数组进⾏排序，默认从小到大（int arr[]数组或者vector数组都⾏），vector是容器，要⽤v.begin()和v.end()表示头尾；⽽int arr[]⽤arr表示数组的⾸地址，arr+n表示尾部【会对数组造成改变】

```c++
//
sort(v.begin(), v.end());
//
bool cmp(int a, int b) { // cmp函数返回的值是bool类型
 	return a > b; // 从⼤到⼩排列
}
sort(arr, arr + 10, cmp);
```

结构体例子

```c++
#include <iostream>
using namespace std;
struct stu { // 定义⼀个结构体stu，number表示学号，score表示分数
 int number;
 int score;
}
bool cmp(stu a, stu b) { // cmp函数，返回值是bool，传⼊的参数类型应该是结构体stu类型
     if (a.score != b.score) // 如果学⽣分数不同，就按照分数从⼤到⼩排列
     	return a.score > b.score;
     else // 如果学⽣分数相同，就按照学号从⼩到⼤排列
     	return a.number < b.number;
}
// 有时候这种简单的if-else语句我喜欢直接⽤⼀个C语⾔⾥⾯的三⽬运算符表示～
bool cmp(stu a, stu b) {
	 return a.score != b.score ? a.score > b.score : a.number <b.number;
}
```

## 常见思路

### 质数

### 进制转换

### 数组做哈希

用数组h[127]做哈希，asc码0到127，是所有可显示字符。

**题目描述**

编写一个函数，计算字符串中含有的不同字符的个数。字符在ACSII码范围内(0~127)，换行表示结束符，不算在字符里。不在范围内的不作统计。多个相同的字符只计算一次

例如，对于字符串abaca而言，有a、b、c三种不同的字符，因此输出3。

**示例1**

输入

```
abc
```

输出

```
3
```

**答案**

```c++
#include<iostream>
using namespace std;
int main(){
	string str;
	cin>>str;
	char h[127]={0};
	int count=0;
	for(int i=0;i<str.size();i++){
		h[str[i]]++;
		
	}
	for(int i=0;i<127;i++){
		if(h[i]!=0)
			count++;
	}
	cout<<count;
}
```

### 数组最大值

这里面定义的maxEle会自动初始化为第一个元素，然后会一个一个比较，如果比maxEle大的元素或被赋值给maxEle，始终保持max最大

```c++
#include<iostream>
using namespace std;
int main(){
	int a[5]={5,8,6,9,4};
	int maxEle=a[0];
	for(int i=0;i<5;i++){
	maxEle=max(maxEle,a[i]);
	 
	cout<<maxEle;
}
```

比较low的写法

```c++
#include<iostream>
using namespace std;
int main(){
	int a[5]={5,8,6,9,4};
	int maxEle=a[0];
	for(int i=0;i<5;i++){
		if(a[i]>maxEle){
            maxEle=a[i];
        }
	 
	cout<<maxEle;
}
```

### 最大公约数

[**c/c++语言求最大公约数、最小公倍数**](https://blog.csdn.net/huyr_123/article/details/81670972)

a，b两个数的最大公约数：①更相减损法②辗转相除法

a，b两个数的最小公倍数=(a\*b)/a和b的最大公约数

更相减损法

拿两个数中的较大值减去较小值，然后在减数、被减数、差之间选取两个较小值继续相减，直到减数和被减数相等，得出的数就是最大公约数。

```c++
//8 10的最大公约数

//10 - 8=2

//8 - 2= 6

//6-2=4

//4-2=2

//2==2于是最大公约数就是2



\#include<iostream>

using namespace std;



int main(){

  //用更相减损法求最大公约数

  int a,b;

  cin>>a>>b;

  while(a!=b) {

   if(a>b) a=a-b;

   else b=b-a;

 }

  cout<<"(a,b)最大公约数为："<<a<<endl; 



 return 0;   

}
```

## 核心代码模式

刷leetcode时，发现编译器直接规定了类和函数以及对应的参数，不允许修改。不用自己读入数据，oj系统会自动调用函数并将数据传入函数，输出也仅仅是自己在代码补全后，将代码结果return即可。这造成了一个很蛋疼的问题，就是，这些代码根本在本地无法运行起来，因为根本没有输入输出的地方

**题目描述**

输入一个链表，反转链表后，输出新链表的表头。

示例1

**输入**

```
{1,2,3}
```

**返回值**

```
{3,2,1}
```

**编译器核心模式默认代码**

```c++
/*
struct ListNode {
	int val;
	struct ListNode *next;
	ListNode(int x) :
			val(x), next(NULL) {
	}
};*/
class Solution {
public:
    ListNode* ReverseList(ListNode* pHead) {
      //代码写在这里
    }
    
};
```

**正确答案**

```c++
/*
struct ListNode {
	int val;
	struct ListNode *next;
	ListNode(int x) :
			val(x), next(NULL) {
	}
};*/
class Solution {
public:
    ListNode* ReverseList(ListNode* pHead) {
       if(pHead==NULL){
           return pHead;
        }
       ListNode* p=NULL;
       ListNode* q=pHead;
        while(q!=NULL){
            pHead=pHead->next;
            q->next=p;
            p=q;
            q=pHead;
        }
        return p;
    }
};
```

这里只定义了类方法，无法在本地运行，需要补全调用函数代码

**如果现在本地调试，需要补全**

* 创建输入数据的数据结构，并填入用例
* 实例化类，调用类的函数

```c++
#include<iostream>
using namespace std;


struct ListNode {
	int val;
	struct ListNode *next;
	ListNode(int x) :
			val(x), next(NULL) {
	}
};
class Solution {
public:
    ListNode* ReverseList(ListNode* pHead) {
       if(pHead==NULL){
           return pHead;
        }
       ListNode* p=NULL;
       ListNode* q=pHead;
        while(q!=NULL){
            pHead=pHead->next;
            q->next=p;
            p=q;
            q=pHead;
        }
        return p;
    }
};

int main(){
	//自己按照用例，创建一个链表
	int x;
	cin>>x;
	ListNode* L=(ListNode*)malloc(sizeof(ListNode)); 
	L->val=x;
	L->next=NULL;
	ListNode* r=L;
	while(cin>>x){
		ListNode* s=(ListNode*)malloc(sizeof(ListNode));
		s->val=x;
		s->next=NULL; 
		r->next=s;
		r=s;	
	}
	//创建类调用函数 
	Solution solution;
	ListNode* head=solution.ReverseList(L);
	//遍历L
	ListNode *p=head;
	while(p!=NULL){
		cout<<p->val<<" ";
		p=p->next;
	} 
}
```

**不在本地编译器调试：我发现牛客网在练习模式下，有调试模式，可以直接在网页上查看程序的数据变化，不用建立复杂的输入用例的数据结构**

## 经典必会算法

### 合并有序数组

```c++
#include<iostream>
using namespace std;

int main() {
	int a[4]={1,5,8,9};
	int b[7]={2,5,7,10,11,15,48};
	int i=0,j=0,k=0;
	int lena=sizeof(a)/sizeof(int),lenb=sizeof(b)/sizeof(int);
	int res[lena+lenb];
	
	while(i<lena&&j<lenb){
		if(a[i]<b[j]){
			res[k]=a[i];
			i++;
			k++;
		}else{
			res[k]=b[j];
			j++;
			k++;
		}
	}
	while(i<lena){
		res[k]=a[i];
		i++;
		k++;
	}
	while(j<lenb){
		res[k]=b[j];
		j++;
		k++;
	}
	
	for(int i=0;i<lena+lenb;i++){
		cout<<res[i]<<' ';
	}//输出 1 2 5 5 7 8 9 10 11 15 48 

}
```

### 冒泡排序

从小到大排序

这题换成数组也行，注意数组的长度是：`sizeof(a)/sizeof(int)`

```c++
#include<iostream>
#include<vector>
using namespace std;

int main() {
	vector<int> a={8,4,6,7,2,7,1};
	int temp;
	for(int i=0;i<=a.size()-2;i++){
		for(int j=0;j<=a.size()-2-i;j++){
			if(a[j]>a[j+1]){
				temp=a[j];
				a[j]=a[j+1];
				a[j+1]=temp;
			}
		}
	}
	for(int i=0;i<a.size();i++){
		cout<<a[i]<<' ';
	}
}
```

### 快速排序

```c++
#include<iostream>
using namespace std;
//以第一个元素做枢轴，快排，返回最终枢轴所在的位置
int partition(int a[],int low,int high) {
	int pivot=a[low];
	while(low<high) {
		while(low<high&&a[high]>=pivot)
			high--;
		a[low]=a[high];
		while(low<high&&a[low]<pivot)
			low++;
		a[high]=a[low];

	}
	a[low]=pivot;
	return low;
}
//递归执行多次快排
void quickSort(int a[],int low,int high){
	if(low<high){
		int pivotpos=partition(a,low,high);
		quickSort(a,low,pivotpos-1);
		quickSort(a,pivotpos+1,high);
	}
} 
int main() {
	int a[5]={4,5,8,6,9};
	quickSort(a,0,4);
	for(int i=0;i<sizeof(a)/sizeof(int);i++){
		cout<<a[i]<<" ";
	}

}
```

### 反转链表

[牛客网——题目](https://www.nowcoder.com/practice/75e878df47f24fdc9dc3e400ec6058ca?tpId=117&tqId=37777&rp=1&ru=%2Factivity%2Foj&qru=%2Fta%2Fjob-code-high%2Fquestion-ranking&tab=answerKey)

### 遍历二叉树

```c++
//
//二叉树的最大深度
//给定一个二叉树，找出其最大深度。
//
//二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。
//
//说明: 叶子节点是指没有子节点的节点。
//
//示例：
//给定二叉树 [3,9,20,null,null,15,7]，
//
//    3
//   / \
//  9  20
//    /  \
//   15   7
//返回它的最大深度 3 。
#include <iostream>
using namespace std;

struct TreeNode {
	int val;
	TreeNode *lchild;
	TreeNode *rchild;
};

//树的深度 
int dep(TreeNode *T){
	if(T==NULL){
		return 0;
	}else{
		int left=dep(T->lchild);
		int right=dep(T->rchild);
		return left>=right?left+1:right+1;
	}
}
//先序遍历 
void preOrder(TreeNode *p){
	if(p!=NULL){
		cout<<p->val<<" ";
		preOrder(p->lchild);
		preOrder(p->rchild);
	}
} 
 
//中序遍历
void inOrder(TreeNode *p){
	if(p!=NULL){
		inOrder(p->lchild);
		cout<<p->val<<" ";
		inOrder(p->rchild);
	}
} 
//后序遍历
void postOrder(TreeNode *p){
	if(p!=NULL){
		postOrder(p->lchild);
		postOrder(p->rchild);
		cout<<p->val<<" ";
	}
}  

int main() {
    //按照测试用例建立树
	TreeNode *p1=(TreeNode *)malloc(sizeof(TreeNode));
	p1->val=3;
	TreeNode *p2=(TreeNode *)malloc(sizeof(TreeNode));
	p2->val=9;
	TreeNode *p3=(TreeNode *)malloc(sizeof(TreeNode));
	p3->val=20;
	TreeNode *p4=(TreeNode *)malloc(sizeof(TreeNode));
	p4->val=15;
	TreeNode *p5=(TreeNode *)malloc(sizeof(TreeNode));
	p5->val=7;
	p1->lchild=p2;
	p1->rchild=p3;
	p2->lchild=NULL;
	p2->rchild=NULL;
	p3->lchild=p4;
	p3->rchild=p5;
	p4->lchild=NULL;
	p4->rchild=NULL;
	p5->lchild=NULL;
	p5->rchild=NULL;
	
    //树深 
	cout<<dep(p1);
	//树的遍历
	cout<<"\n"<<"先序遍历:"<<"\n"; 
	preOrder(p1);
	cout<<"\n"<<"中序遍历:"<<"\n" ;
	inOrder(p1);
	cout<<"\n"<<"后序遍历:"<<"\n" ;
	postOrder(p1); 
}
```
