# 算法

## 动态规划

### 介绍

动态规划（Dynamic Programming，简称DP）

**动态规划的特点**：

* 具有重叠子问题
* 最优子结构
* 状态转移方程

**动态规划的解题方法**：

- 递归+记忆化(自顶向下)
- 动态规划（自底向上）

**解动态规划题目的步骤**：

1. 根据重叠子问题定义状态
2. 寻找最优子结构推导状态转移方程
3. 确定dp初始状态
4. 确定输出值

### 斐波那契

[leetcode题号509](https://leetcode.cn/problems/fibonacci-number/)

![image-20220823232736614](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Vue/20220823232737%20.png)



自顶向下：

* 递归

  ```js
  var fib = function(n) {
      if(n===0){
          return 0
      }
      if(n===1){
          return 1
      }
      return fib(n-2)+fib(n-1)
  
  };
  ```

* 递归+记忆化

  单纯的递归效率较低，例如图中的绿色部分f(3)会多次计算。所以将运算结果存储下来，会进一步提高效率

  使用数据将f(n)的值存在res[n]中

  ```js
  var fib = function(n) {
      let res=[0,1]
      if(n===0){
          return 0
      }
      if(n===1){
          return 1
      }
      if(res[n]!==undefined){
          return res[n]
      }
      res[n]=fib(n-2)+fib(n-1)
      return res[n]
  };
  ```



自底向上（动态规划）：

* 常规解法

  dp数组保存了从0到n中所有斐波那契数，而实际上我们只需要f(n)。那就可以将o(n)的空间复杂度继续优化

  ```js
  var fib = function(n) {
      if(n<=1){
          return n
      }
    	//dp初始状态
      let dp=[0,1]
      for(let i=2;i<=n;i++){
        	//状态转移方程
          dp[i]=dp[i-2]+dp[i-1]
      }
    	//确定输出值为dp[0]
      return dp[n]
  };
  ```

* 动态规划的压缩

  实际上，只需要保存两个变量即可，pre上一个值，cur当前值

  ```js
  var fib = function(n) {
      if(n<=1){
          return n
      }
      let pre=0,cur=1
      for(let i=2;i<=n;i++){
          [pre,cur]=[cur,pre+cur]
        	//f(2)=f(0)+f(1) , pre=f(0),cur=f(1)
        	//f(3)=f(1)+f(2) , cur=pre+cur
        
      }
      return cur
  };
  ```

  

### 不同路径

[leetcode题号62](https://leetcode.cn/problems/unique-paths/)

这题很难看出来是动规划

* 根据重叠子问题定义状态

  到达每个单元格只能是从（左侧+上侧）来的，到达该单元格的路径条数也只能是 （到达左侧单元格的路径条数+到达上侧单元格的路径条数）

  ![image-20220823235806496](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Vue/20220823235806%20.png)

* 寻找最优子结构推导状态转移方程

  r是行索引、c是列索引、`dp[r][c]`是记录到达该单元格的路径条数

  ```
  dp[r][c]=dp[r-1][c]+dp[r][c-1]
  ```

* 确定dp初始状态

  第一行的单元格只能=到达左侧单元格的路径条数=1

  第一列的单元格只能=到达上侧单元格的路径条数=1

  ![image-20220823235938030](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Vue/20220823235938%20.png)

* 确定输出值

  动态规划常规解法： 时间复杂度o(mn) 、 空间复杂度o(mn) 

  ```js
  var uniquePaths = function(m, n) {
      let dp=new Array(m).fill(0).map(()=>{ //语法补充Array(m)必须填充数字，map才能将每个元素替换为数组
          return new Array(n).fill(0)
      })
      //初始化第一行，第一列都是1
      dp[0]=new Array(n).fill(1)
      for(let i=0;i<m;i++){
          dp[i][0]=1
      }
     
     	//动态规划，自底向上
      for(let i=1;i<m;i++){
          for(let j=1;j<n;j++){
              dp[i][j]=dp[i][j-1]+dp[i-1][j]
          }
      }
      return dp[m-1][n-1]
  
  };
  ```

  动态规划的压缩

  原本的dp数据是个二维数组，但是这里可以压缩一维数组，每一个dp数组记录的是当前行的单元格的路径数

  ```js
  dp[w]=dp[w]+dp[w-1] //w是列索引
  ```

  通过状态转移方程，可以一层一层的向下转移状态。新的绿色的dp[3]=新的绿色的dp[2]+旧的红色的dp[3]

  ![image-20220824005735025](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Vue/20220824005735%20.png)

  ```js
  var uniquePaths = function(m, n) {
      dp=new Array(n).fill(1)
      
     
      for(let i=1;i<m;i++){
          for(let j=1;j<n;j++){
              dp[j]=dp[j]+dp[j-1]
          }
      }
      return dp[n-1]
  
  };    
  ```

### 爬楼梯

[leetcode题号70](https://leetcode.cn/problems/climbing-stairs/)

```js
var climbStairs = function(n) {
    if(n<=2){
        return n
    }
    let dp=[undefined,1,2] //数组索引就是楼梯阶数，没有0阶楼梯，座所以这里用undefined占位一下
    for(let i=3;i<=n;i++){
        dp[i]=dp[i-1]+dp[i-2]
    }
    return dp[n]
};
```

压缩dp数组

```js
var climbStairs = function(n) {
    if(n<=2){
        return n
    }
    let pre=1
    let cur=2

    for(let i=3;i<=n;i++){
        [cur,pre]=[cur+pre,cur]
    }
    return cur
};
```



###  完全平方数

[leetcode题号279](https://leetcode.cn/problems/perfect-squares/)

相对于前面的题目，从这题开始，后面的题目全部涉及最优子结构，题目中一般表现为 "最少"、"最小"、"最短"等字眼

* 根据重叠子问题定义状态

  

* 寻找最优子结构推导状态转移方程

  n是数，dp[n]存的是**和为 `n` 的完全平方数的最少数量**

  `dp[n]`：初始化为最多的情况，即dp[n]=n（n个1的平方相加）

  `dp[n-j*j]+1 `：`n-j*j`这个数的最少平方数+1个平方数(`j*j`)

  两者取最小的就是当前n这个数的最小平方数

  ```
  dp[n]=Math.min(dp[n-j*j]+1,dp[n]) 
  ```

* 确定dp初始状态

  dp[n]=n，

  这里注意n是从1开始的，`j=1`来时循环

  `dp[0]=0`和`i-j*j>=0`这个边界比难理解，假设n=9，其实只需要1个平方数3*3即可，这时候`j=3`，`dp[9-3*3]+1=1`

* 确定输出值

  dp[n]

```js
var numSquares = function(n){ 
    let dp=[]//先把所有位置放置0
    for(let i=1;i<=n;i++){
        dp[i]=i //初始化为最多的情况，比如：dp[2]=2，就是1^2+1^2,共两个平方数
        for(let j=1;i-j*j>=0;j++){ 
             dp[i]=Math.min(dp[i],dp[i-j*j]+1)
        }
       
    }
    return dp[n]
};
```



### 三角形最小路径和

[leetcode题号120](https://leetcode.cn/problems/triangle/)

这题也涉及最优子结构

![image-20220827155259582](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/LeetCode/20220827155300%20.png)

```js
var minimumTotal = function(triangle) {
    //动态规划 dp[n]=min(dp[n],dp[n+1])
    let row=triangle.length
 
    let dp=new Array(row).fill(0).map(()=>{
        return new Array(triangle[row-1].length)
    })
     
    //dp[row-1]=triangle[row-1] 一般不要这样初始化倒数第一行 ，实际上只是把triangle最后一行的指针指向了dp
    //可以写成这样 
   
    for(let i=row-1;i>=0;i--){ //倒数第一行应该被初始化，从倒数第二行开始计算
        for(let j=0;j<triangle[i].length;j++){
            if(i===row-1){
                dp[i][j]=triangle[i][j]
            }else{
                dp[i][j]=Math.min(dp[i+1][j],dp[i+1][j+1])+triangle[i][j]
            }        
        }
    }
     
     return dp[0][0]
};
```



上面dp数组和参数triangle数组大小一样

因为dp每个元素保存的是到该点的最小路径值，我们只需要第一行的值即可，所以，我们可以压缩为一维数组，不必保存所有的值

```js
var minimumTotal = function(triangle) {
    //动态规划 dp[n]=min(dp[n],dp[n+1])
    let row=triangle.length
 
    //倒数第一行初始化
    let dp=new Array(triangle[row-1].length).fill(0).map((_,index)=>{
        return triangle[row-1][index]
    })
    

    for(let i=row-2;i>=0;i--){ //倒数第一行已经被初始化了，这里从倒数第二行开始遍历
        for(let j=0;j<triangle[i].length;j++){
            dp[j]=Math.min(dp[j],dp[j+1])+triangle[i][j]     
        }
    }
     
     return dp[0]
};
```



### 乘积最大子数组（存疑）

[leetcode题号152](https://leetcode.cn/problems/maximum-product-subarray/)

这个的特殊点在于，数组元素可以为负值。两个负值乘积就成了正数，这个题存储最小值就是这个原因

dp[n]的含义：最后一位的索引是n连续子数组的**最大值**、**最小值**、**当前值**

```js
var maxProduct = function(nums) {
    let dp=new Array(nums.length).fill(0).map((_,index)=>{
        return {
            min:nums[index],
            max:nums[index],
            cur:nums[index]
        }
    })


    for(let i=1;i<nums.length;i++){
        let curValue=dp[i].cur   //其实也可以不在dp中存当前值,直接 let curValue=nums[i]
        dp[i].max=Math.max(curValue,curValue*dp[i-1].min,curValue*dp[i-1].max)
        dp[i].min=Math.min(curValue,curValue*dp[i-1].min,curValue*dp[i-1].max)
    }
     
  	//dp数组中存储了所有最小值、最大值，这里是遍历取最大值
    return dp.reduce((preItem,curItem)=>{
        return curItem.max>preItem.max?curItem:preItem
    }).max
    

};
```

压缩dp数组，使用2个变量保存状态



**有疑问**

leetcode运行显示代码输出的是72，但实际上我本地运行就是正确答案12，暂时不清楚原因，记录下

![image-20220827184219920](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/LeetCode/20220827184220%20.png)

```js
var maxProduct = function(nums) {
    let preMax=nums[0]
    let preMin=nums[0]
    let res=nums[0]

    for(let i=1;i<nums.length;i++){
        let curValue=nums[i] 
        preMax=Math.max(curValue,curValue*preMax,curValue*preMin)
        preMin=Math.min(curValue,curValue*preMax,curValue*preMin)
        res=Math.max(preMax,res)
    }
    return res
};
```

### 零钱兑换

[leetcode题号322](https://leetcode.cn/problems/coin-change/)

```js
var coinChange = function(coins, amount) {
    //dp[0]本身无意义，但是如果amount=10，coins=[10]，coins刚好有一个10，下面的循环中dp[i-coinItem]+1就能保证是1
    let dp=new Array(amount+1).fill(Infinity)
    dp[0]=0

    for(let i=1;i<=amount;i++){
        for(coinItem of coins){
            if(parseInt(coinItem)<=i){
                 dp[i]=Math.min(dp[i],dp[i-coinItem]+1)
            }         
        }       
    }
    return dp[amount]===Infinity?-1:dp[amount]

};
```

### 编辑距离（跳过）

[leetcode题号72](https://leetcode.cn/problems/edit-distance/)

```js
```



