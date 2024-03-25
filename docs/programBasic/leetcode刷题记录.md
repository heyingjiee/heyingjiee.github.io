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

## 贪心算法

### [122. 买卖股票的最佳时机 II](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-ii/)

```js
var maxProfit = function(prices){
    let maxProfit=0
    for(let i=1;i<prices.length;i++){
        maxProfit=maxProfit+Math.max(0,prices[i]-prices[i-1])
    }
    return maxProfit
};
```

有动态规划解法



### [455. 分发饼干](https://leetcode.cn/problems/assign-cookies/)

优先用尺寸大的饼干，来满足大胃口的孩子

```js
var findContentChildren = function(g, s) {
    //从小到大
    g=g.sort((a,b)=>a-b)
    s=s.sort((a,b)=>a-b)

    //
    let j=s.length-1
    let res=0
    for(let i=g.length;i>=0;i--){
        if(s[j]>=g[i]&&j>=0){
            res++
            j--
        }
    }
    return res

};
```

### [435. 无重叠区间](https://leetcode.cn/problems/non-overlapping-intervals/)

只考虑右端是否能和下一个元素的左端重叠，不重叠就更新最新的右侧端点，并计数1次，表示无重叠区间个数

![image-20220907001938814](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/LeetCode/20220907001939%20.png)

```js
var eraseOverlapIntervals = function(intervals) {
    //根据每个区间右侧端点元素，从小到大
    intervals=intervals.sort((a,b)=>a[1]-b[1])
    
    let right=intervals[0][1] 
    let res=1 //不重叠的区间个数
    for(let i=1;i<intervals.length;i++){
        if(right<=intervals[i][0]){ //无重叠
            right=intervals[i][1]
            res++
        }
    }
    return intervals.length-res
    
};
```

有动态规划解法

### [55. 跳跃游戏](https://leetcode.cn/problems/jump-game/)

**动态规划解法**

dp[i]表示：索引为i的位置是否可达的

```js
var canJump = function(nums) {
    let dp=new Array(nums.length).fill(false)
    dp[0]=true //只有一个值得时候一定是可达的
    for(let i=0;i<nums.length;i++){
        for(let j=0;j<i;j++){
            if(dp[j]===true&&j+nums[j]>=i){
                dp[i]=true
                break
            }
        }  
    }
    return dp[nums.length-1]
};
```

**贪心解法**

只考虑每个分段，合成的区间是否能覆盖到全部 

![image-20220907001653278](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/LeetCode/20220907001653%20.png)

```js
var canJump = function(nums) {
    let right=0
    for(let i=0;i<nums.length;i++){
        if(right>=i){ //只有最右侧索引覆盖到num[i]，才表示num[i]是可达的，否则这里都到不了
            right=Math.max(nums[i]+i,right)
        } 
    }
    return right>=nums.length-1 //能覆盖的右侧索引>=数组最大索引，才能跳到最后一位
};
```

### [881. 救生艇](https://leetcode.cn/problems/boats-to-save-people/)

按体重从小到大排序(题目显示所以人体重小于等于limit)

* 体重最大的 = limit ，则他自己乘坐一艘船
* 体重最大的 < limit ， 体重最小的+体重最大的<=limit则两人乘坐一艘船

![image-20220912165813208](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/LeetCode/20220912165813%20.png)

```JS
var numRescueBoats = function(people, limit) {
    people=people.sort((a,b)=>{
        return a-b
    })

    let left=0
    let right=people.length-1
    let res=0
    while(left<=right){
        if(people[left]+people[right]>limit&&people[right]<=limit){
            right--
            res++
        }else if(people[left]+people[right]<=limit){
            left++
            right--
            res++
        }

    }
    return res

};
```

### [452. 用最少数量的箭引爆气球](https://leetcode.cn/problems/minimum-number-of-arrows-to-burst-balloons/)

这个题和[leetcode题号435](https://leetcode.cn/problems/non-overlapping-intervals/)思路一样，基本上就是确定重叠区间

这种情况可以考虑下，是需要两只箭的

![image-20220912182503675](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/LeetCode/20220912182503%20.png)

```js
var findMinArrowShots = function(points) {
  points=points.sort((a,b)=>a[1]-b[1])

  let right=points[0][1]
  let resCount =1
  for(let i=1;i<points.length;i++){
      if(right<points[i][0]){ //不重叠
          resCount++
          right=points[i][1]
      } 
  }
  return resCount
};
```

### [134. 加油站（跳过）](https://leetcode.cn/problems/gas-station/)



## 二分查找

二分查找要求数据必须有序

模版: 

```js
function xx(arr,target){
  // 这里需要包含等于。即 left=right时，需要判断是否就是target
  while(left<=right){
    // 向下取整。 
    // 偶数个元素：[3,4]。(0+1)/2=0 （中间两个元素中的前一个元素）
    // 奇数个元素：[3,4,5]。(0+2)/2=1 （中间元素）
		const mid=Math.floor((left+right)/2) 
  	if(arr[mid]===target){
   	 return 结果
  	}else if(arr[mid]<target){
    	left=mid+1
  	}	else{
    	right=mid-1
  	}
	}
  
  return 没找到，输出
  // 注意：
  // 无论元素个数是奇还是偶，都会走到left===right的情况
  // 情况1：如果arr[mid]===target，最终结果===> mid位置就是所在位置
  // 情况2：如果不等于，那么mid在 left===right 的位置，right、left有一个位置会变化。注意mid的值可能溢出数组了，例如arr=[1],target=2。最终结果===> 由while外部的return输出
  //   2-1 arr[mid]<target , left后移一位

  //   2-2 target<arr[mid] , right前移一位
  
  
  // 最后一轮 left===right ，(target)表示
     mid=l=r
     	 |
  x    y        z
  
  // arr[mid]!==target的情况也很有价值（35、69题），数组中没有target了，下面（target）表示其应该防止的文职
  // 2-1
       mid=r          l
     	   |            |
  x      y  (target)  z
  
  // 2-2
  r           mid=l
  |    	        |
  x (target)    y      z
  
  // 总结最后一轮： target左侧是r，右侧是l
  
}
```

### [704. 二分查找](https://leetcode.cn/problems/binary-search)

题目

```js
//给定一个 n 个元素有序的（升序）整型数组 nums 和一个目标值 target ，写一个函数搜索 nums 中的 target，如果目标值存在返回下标，否
//则返回 -1。
//
// 示例 1:
//
// 输入: nums = [-1,0,3,5,9,12], target = 9
//输出: 4
//解释: 9 出现在 nums 中并且下标为 4
//
//
// 示例 2:
//
// 输入: nums = [-1,0,3,5,9,12], target = 2
//输出: -1
//解释: 2 不存在 nums 中因此返回 -1
//
//
//
//
// 提示：
//
//
// 你可以假设 nums 中的所有元素是不重复的。
// n 将在 [1, 10000]之间。
// nums 的每个元素都将在 [-9999, 9999]之间。
//
//
// Related Topics 数组 二分查找 👍 1532 👎 0
```

二分法：

```js
var binarySearch = function(nums, target) {
    let left=0,right=nums.length-1
    while(left<=right){
        const mid=Math.floor((left+right)/2)
        if(nums[mid]===target){
            return mid
        }else if(nums[mid]<target){
            left=mid+1
        }else {
            right=mid-1
        }
    }
    return -1
};
```

### [35. 搜索插入位置](https://leetcode.cn/problems/search-insert-position)

题目

```js
//给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。 
//
// 请必须使用时间复杂度为 O(log n) 的算法。 
//
// 
//
// 示例 1: 
//
// 
//输入: nums = [1,3,5,6], target = 5
//输出: 2
// 
//
// 示例 2: 
//
// 
//输入: nums = [1,3,5,6], target = 2
//输出: 1
// 
//
// 示例 3: 
//
// 
//输入: nums = [1,3,5,6], target = 7
//输出: 4
// 
//
// 
//
// 提示: 
//
// 
// 1 <= nums.length <= 10⁴ 
// -10⁴ <= nums[i] <= 10⁴ 
// nums 为 无重复元素 的 升序 排列数组 
// -10⁴ <= target <= 10⁴ 
// 
//
// Related Topics 数组 二分查找 👍 2264 👎 0
```

二分法

```js
var searchInsert = function(nums, target) {
    let left=0,right=nums.length-1
    let mid=0
    while (left<=right){
        mid=Math.floor((left+right)/2)
        if (nums[mid]===target) {
            return mid
        }else {
            if (nums[mid]<target){
                left=mid+1
            }else {
                right=mid-1
            }
        }
    }

    return left

};
```

### [69. x 的平方根 ](https://leetcode.cn/problems/sqrtx/)

题目

```js
//给你一个非负整数 x ，计算并返回 x 的 算术平方根 。
//
// 由于返回类型是整数，结果只保留 整数部分 ，小数部分将被 舍去 。
//
// 注意：不允许使用任何内置指数函数和算符，例如 pow(x, 0.5) 或者 x ** 0.5 。
//
//
//
// 示例 1：
//
//
//输入：x = 4
//输出：2
//
//
// 示例 2：
//
//
//输入：x = 8
//输出：2
//解释：8 的算术平方根是 2.82842..., 由于返回类型是整数，小数部分将被舍去。
//
//
//
//
// 提示：
//
//
// 0 <= x <= 2³¹ - 1
//
//
// Related Topics 数学 二分查找 👍 1511 👎 0


```

二分法

```js
var mySqrt = function(x) {
    //x=0
    let left=1,right=x
    // mid*mid===x  mid
    // mid*mid<x  mid
    // mid*mid>x  mid-1
    while (left<=right){
        const mid=Math.floor((left+right)/2)
        if(mid*mid===x){
            return mid
        }else if (mid*mid<x){
            left= mid+1
        }else {
            right=mid-1
        }
    }
    //  x就相当于target ， 最后一轮一定是：right target left  
  	//  返回right是因为返回的平方根要取整
    return right
};
```



### [300. 最长递增子序列](https://leetcode.cn/problems/longest-increasing-subsequence)

题目

```js
//给你一个整数数组 nums ，找到其中最长严格递增子序列的长度。 
//
// 子序列 是由数组派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序。例如，[3,6,2,7] 是数组 [0,3,1,6,2,2,7] 的子
//序列。 
//
// 示例 1： 
//
// 
//输入：nums = [10,9,2,5,3,7,101,18]
//输出：4
//解释：最长递增子序列是 [2,3,7,101]，因此长度为 4 。
// 
//
// 示例 2： 
//
// 
//输入：nums = [0,1,0,3,2,3]
//输出：4
// 
//
// 示例 3： 
//
// 
//输入：nums = [7,7,7,7,7,7,7]
//输出：1
// 
//
// 
//
// 提示： 
//
// 
// 1 <= nums.length <= 2500 
// -10⁴ <= nums[i] <= 10⁴ 
// 
//
// 
//
// 进阶： 
//
// 
// 你能将算法的时间复杂度降低到 O(n log(n)) 吗? 
// 
//
// Related Topics 数组 二分查找 动态规划 👍 3567 👎 0


```

动态规划

```js
var lengthOfLIS = function(nums) {
    // dp[i] : 0-i元素中最长递增子序列值
    let dp=new Array(nums.length).fill(1)

    for (let i=1;i<nums.length;i++){
        for (let j = 0; j < i; j++) {
            // 一直在更新dp[i]
            if (nums[j]<nums[i]){
                dp[i]=Math.max(dp[i],dp[j]+1)
            }
        }
    }
    return  Math.max(...dp)
};
```

二分+贪心

这种方式可以求出最长递增子序列是什么，动态规格只能求出来结果的长度

```js
var lengthOfLIS = function(nums) {
		
  	// 35题，left就是最终插入的位置
    function getInsertIndex(arr,target){
        let left=0,right=arr.length-1
        while (left<=right){
            const mid=Math.floor((left+right)/2)
            if(arr[mid]===target){
                return mid
            }else if(arr[mid]<target){
                left=mid+1
            }else {
                right=mid-1
            }
        }
        return left  // right target left
    }

    if (nums.length===0){
        return 0
    }

    let resArr=[nums[0]]
    for (let i=1;i<nums.length;i++){
       if(nums[i]>resArr[resArr.length-1]){
           // 追加到末尾
           resArr.push(nums[i])
       }else{
           // 二分插入
           const index=getInsertIndex(resArr,nums[i])
           // 覆盖 right (target) left，target插入的是left的位置，所以数组中left被替换为更小的值target。（贪心，换的更小，更有机会组成最长的子序列）
           resArr[index]=nums[i]
       }
    }

    return  resArr.length

};
```

### [4. 寻找两个正序数组的中位数](https://leetcode.cn/problems/median-of-two-sorted-arrays)

题目

```js
//给定两个大小分别为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。请你找出并返回这两个正序数组的 中位数 。
//
// 算法的时间复杂度应该为 O(log (m+n)) 。
//
//
//
// 示例 1：
//
//
//输入：nums1 = [1,3], nums2 = [2]
//输出：2.00000
//解释：合并数组 = [1,2,3] ，中位数 2
//
//
// 示例 2：
//
//
//输入：nums1 = [1,2], nums2 = [3,4]
//输出：2.50000
//解释：合并数组 = [1,2,3,4] ，中位数 (2 + 3) / 2 = 2.5
//
//
//
//
//
//
// 提示：
//
//
// nums1.length == m
// nums2.length == n
// 0 <= m <= 1000
// 0 <= n <= 1000
// 1 <= m + n <= 2000
// -10⁶ <= nums1[i], nums2[i] <= 10⁶
//
//
// Related Topics 数组 二分查找 分治 👍 7017 👎 0

```

二分

```js
var findMedianSortedArrays = function(nums1, nums2) {
    const len1=nums1.length
    const len2=nums2.length

    let ptr1=0,ptr2=0
    let composeList=[]
    // 合并
    while (ptr1<=len1-1&&ptr2<=len2-1){
        if(nums1[ptr1]<=nums2[ptr2]){
            composeList.push(nums1[ptr1])
            ptr1++
        }else {
            composeList.push(nums2[ptr2])
            ptr2++
        }
    }

    if (ptr1<=len1-1){
        composeList.push(...nums1.slice(ptr1))
    }else {
        composeList.push(...nums2.slice(ptr2))
    }

    // 算中位数
    const mid=Math.floor((composeList.length-1)/2)//mid计算工时，注意left索引，right索引加和后除以2向下取整,算出来的mid是中间数字的`索引`
    if (composeList.length%2===0){
        return  (composeList[mid]+composeList[mid+1])/2
    }else {
        return  composeList[mid]
    }

};

```



### [162. 寻找峰值](https://leetcode.cn/problems/find-peak-element/)

题目

```js
//峰值元素是指其值严格大于左右相邻值的元素。 
//
// 给你一个整数数组 nums，找到峰值元素并返回其索引。数组可能包含多个峰值，在这种情况下，返回 任何一个峰值 所在位置即可。 
//
// 你可以假设 nums[-1] = nums[n] = -∞ 。 
//
// 你必须实现时间复杂度为 O(log n) 的算法来解决此问题。 
//
// 
//
// 示例 1： 
//
// 
//输入：nums = [1,2,3,1]
//输出：2
//解释：3 是峰值元素，你的函数应该返回其索引 2。 
//
// 示例 2： 
//
// 
//输入：nums = [1,2,1,3,5,6,4]
//输出：1 或 5 
//解释：你的函数可以返回索引 1，其峰值元素为 2；
//     或者返回索引 5， 其峰值元素为 6。
// 
//
// 
//
// 提示： 
//
// 
// 1 <= nums.length <= 1000 
// -2³¹ <= nums[i] <= 2³¹ - 1 
// 对于所有有效的 i 都有 nums[i] != nums[i + 1] 
// 
//
// Related Topics 数组 二分查找 👍 1259 👎 0

```

暴力模拟

```js
var findPeakElement = function(nums) {
    if(nums.length===1){
        return 0
    }

    nums.push(-Infinity)
    nums.unshift(-Infinity)

    let left=0,right=1
    while(right<nums.length){
       if( nums[left] < nums[right]){
            left++
            right++
            // 最后一个元素使无穷小，这个一定能命中
            if(nums[left] > nums[right]){
               return left-1 // 因为数组在开头补了一个负无穷，这里需要-1
            }

       }else {
           left++
           right++
       }
    }
};
```

二分法 [题解](https://leetcode.cn/problems/find-peak-element/solutions/2570305/javapython3cer-fen-cha-zhao-bu-man-zu-fe-93il)
```js
var findPeakElement = function(nums) {

    nums.push(-Infinity)
    nums.unshift(-Infinity)

    let left=0,rigth=nums.length-1
    while (left<=rigth){
        const mid=Math.floor((left+rigth)/2)
        if(nums[mid-1]<nums[mid]&&nums[mid]>nums[mid+1]){
            return mid-1 // 数组开头补了一个负无穷
        }else if(nums[mid-1]>nums[mid]){
           rigth=mid-1
        }else {
            left=mid+1
        }
    }
  
  	// 代码一定不会走到这里。
    // 题目限制了：对于所有有效的 i 都有 nums[i] != nums[i + 1] 和 假设 nums[-1] = nums[n] = -∞ 。

};
```

找最大值，其两侧一定是小于最大值的

```js
var findPeakElement = function(nums) {
    let maxIdex=0

    for(let i=0;i<nums.length;i++){
        if(nums[i]>nums[maxIdex]){
            maxIdex=i
        }
    }
    return maxIdex
};
```

### [74. 搜索二维矩阵](https://leetcode.cn/problems/search-a-2d-matrix/)

题目

```js
//给你一个满足下述两条属性的 m x n 整数矩阵：
//
//
// 每行中的整数从左到右按非严格递增顺序排列。
// 每行的第一个整数大于前一行的最后一个整数。
//
//
// 给你一个整数 target ，如果 target 在矩阵中，返回 true ；否则，返回 false 。
//
//
//
// 示例 1：
//
//
//输入：matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
//输出：true
//
//
// 示例 2：
//
//
//输入：matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13
//输出：false
//
//
//
//
// 提示：
//
//
// m == matrix.length
// n == matrix[i].length
// 1 <= m, n <= 100
// -10⁴ <= matrix[i][j], target <= 10⁴
//
//
// Related Topics 数组 二分查找 矩阵 👍 901 👎 0


```

二分法

```js
var searchMatrix = function(matrix, target) {
    function searchIndex(nums,target){
        let left=0,right=nums.length-1
        while (left<=right){
            const mid=Math.floor((left+right)/2)
            if(nums[mid]===target){
                return {index:mid,status:true}
            }else if (nums[mid]<target){
                left=mid+1
            }else {
                right=mid-1
            }
        }
        return  {index:right,status:false}
    }

    // 先用二分法确定在哪行
    let firstList=[]
    for (let row of matrix){
        firstList.push(row[0])
    }

    const {index,status}=searchIndex(firstList,target)
    if (status){
        return true
    }else if (index<firstList.length&&index>=0){
        return searchIndex(matrix[index],target).status
    }else {
        return false
    }
};
```

### [34. 在排序数组中查找元素的第一个和最后一个位置](https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/)

题目

```js
//给你一个按照非递减顺序排列的整数数组 nums，和一个目标值 target。请你找出给定目标值在数组中的开始位置和结束位置。
//
// 如果数组中不存在目标值 target，返回 [-1, -1]。
//
// 你必须设计并实现时间复杂度为 O(log n) 的算法解决此问题。
//
//
//
// 示例 1：
//
//
//输入：nums = [5,7,7,8,8,10], target = 8
//输出：[3,4]
//
// 示例 2：
//
//
//输入：nums = [5,7,7,8,8,10], target = 6
//输出：[-1,-1]
//
// 示例 3：
//
//
//输入：nums = [], target = 0
//输出：[-1,-1]
//
//
//
// 提示：
//
//
// 0 <= nums.length <= 10⁵
// -10⁹ <= nums[i] <= 10⁹
// nums 是一个非递减数组
// -10⁹ <= target <= 10⁹
//
//
// Related Topics 数组 二分查找 👍 2630 👎 0

```

二分

```js
var searchRange = function(nums, target) {
    function search(nums,target){
        let left=0,right=nums.length
        while (left<=right){
            const mid=Math.floor((left+right)/2)
            if (target===nums[mid]){
                return {status:true,index: mid}
            }else if(target<nums[mid]){
                right=mid-1
            }else {
                left=mid+1
            }
        }
        return  {status:false,index: -1}
    }

    const {status,index}=search(nums,target)
    if (status){

        let rightOffset=index
        while (nums[rightOffset]===nums[rightOffset+1]){
            rightOffset++
        }

        let leftOffset=index
        while (nums[leftOffset]===nums[leftOffset-1]){
            leftOffset--
        }

        return [leftOffset,rightOffset]

    }else {
        return [-1,-1]
    }

};
```

### [153. 寻找旋转排序数组中的最小值](https://leetcode.cn/problems/find-minimum-in-rotated-sorted-array/)

题目

```js
//给你一个按照非递减顺序排列的整数数组 nums，和一个目标值 target。请你找出给定目标值在数组中的开始位置和结束位置。
//
// 如果数组中不存在目标值 target，返回 [-1, -1]。
//
// 你必须设计并实现时间复杂度为 O(log n) 的算法解决此问题。
//
//
//
// 示例 1：
//
//
//输入：nums = [5,7,7,8,8,10], target = 8
//输出：[3,4]
//
// 示例 2：
//
//
//输入：nums = [5,7,7,8,8,10], target = 6
//输出：[-1,-1]
//
// 示例 3：
//
//
//输入：nums = [], target = 0
//输出：[-1,-1]
//
//
//
// 提示：
//
//
// 0 <= nums.length <= 10⁵
// -10⁹ <= nums[i] <= 10⁹
// nums 是一个非递减数组
// -10⁹ <= target <= 10⁹
//
//
// Related Topics 数组 二分查找 👍 2630 👎 0

```

排序

```js
var findMin = function(nums) {
    return nums.sort((a,b)=>a-b)[0]
};
```

二分

![image-20240229225705008](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20240229225705rnlPrh.png)

旋转后的图

```js
// [a[n-1], a[0], a[1], a[2], ..., a[n-2]]
//  最小值a[0]小于左侧、右侧，且只有他一个值符合这种条件


var findMin = function(nums) {
    let left=0,right=nums.length-1
    // 这里没有使用<=。像这种收缩区间的逻辑，最后必然会有left===right的情况
  
    // 二分查找是while (left<=right)，是因为需要再 left===right验证下结果是否是target
    // 这里left<right时循环，循环结束时left===right，直接输出了 nums[left]或nums[right]
    while (left<right){ 
        const mid=Math.floor((left+right)/2)
        // 题目有元素值互不相同的要求，所以没有等于的情况
        if(nums[mid]<nums[right]){
            right=mid
        }else if (nums[mid]>nums[right]) {
            left=mid+1
        }
    }
    return nums[left]
};
```

### [374. 猜数字大小](https://leetcode.cn/problems/guess-number-higher-or-lower/)

题目

```js
//猜数字游戏的规则如下： 
//
// 
// 每轮游戏，我都会从 1 到 n 随机选择一个数字。 请你猜选出的是哪个数字。 
// 如果你猜错了，我会告诉你，你猜测的数字比我选出的数字是大了还是小了。 
// 
//
// 你可以通过调用一个预先定义好的接口 int guess(int num) 来获取猜测结果，返回值一共有 3 种可能的情况（-1，1 或 0）： 
//
// 
// -1：我选出的数字比你猜的数字小 pick < num 
// 1：我选出的数字比你猜的数字大 pick > num 
// 0：我选出的数字和你猜的数字一样。恭喜！你猜对了！pick == num 
// 
//
// 返回我选出的数字。 
//
// 
//
// 示例 1： 
//
// 
//输入：n = 10, pick = 6
//输出：6
// 
//
// 示例 2： 
//
// 
//输入：n = 1, pick = 1
//输出：1
// 
//
// 示例 3： 
//
// 
//输入：n = 2, pick = 1
//输出：1
// 
//
// 示例 4： 
//
// 
//输入：n = 2, pick = 2
//输出：2
// 
//
// 
//
// 提示： 
//
// 
// 1 <= n <= 2³¹ - 1 
// 1 <= pick <= n 
// 
//
// Related Topics 二分查找 交互 👍 336 👎 0

```

二分
```js
var guessNumber = function(n) {
    let left=1,right=n
    while (left<=right){
        const mid=Math.floor((left+right)/2)
        const res=guess(mid)
        if (res===0){
            return mid
        }else if (res===1){
            left=mid+1
        }else {
            right=mid-1
        }
    }

    // 挑选的值一定在 1-n之间，代码不会走到这里
};
```

### 总结

```
while(left<right)
  162、153都是通过二分收缩区间，最后返回left===right的那个值，不必再进行if判断了

while(left<=right)
	其他题都是，在二分区间找target值，需要left===right时对比下是否是target

```

## 双指针

类型

* 对撞指针：两个指针向中间收紧（二分法也是）
* 普通指针：两个指针同向、背向移动 
* 快慢指针：两个指针一快一慢

总结（参考[这里](https://leetcode.cn/problems/linked-list-cycle/solutions/175734/yi-wen-gao-ding-chang-jian-de-lian-biao-wen-ti-h-2)）

链表的两个劣势：无法高效获取长度，无法根据偏移快速访问元素

但是面试的时候经常碰见取倒数第k个元素，获取中间位置的元素，判断链表是否存在环，判断环的长度等和长度与位置有关的问题。这些问题都可以双指针来解决

* 倒数第k个元素的问题

  ```
  初始：设有两个指针 p 和 q，初始时均指向头结点
  
  步骤：
  	1、先让 p 沿着 next 移动 k 次。此时，p 指向第 k+1个结点，q 指向头节点，两个指针的距离为 k 
  
  	2、同时移动 p 和 q，直到 p 指向空，此时 q 即指向倒数第 k 个结点
  ```

  

* 获取中间元素的问题

  ```js
  初始：设有两个指针 fast 和 slow，初始时指向头节点。
  
  步骤：
  	每次移动时，fast向后走两次，slow向后走一次，直到 fast 无法向后走两次。这使得在每轮移动之后。fast 和 slow 的距离就会增加1
    （设链表有 n 个元素，那么最多移动 n/2 轮。
    	当 n 为奇数时，slow 恰好指向中间结点
      当 n 为 偶数时，slow 恰好指向中间两个结点的前一个还是后一个，和判断条件相关。876题要求返回靠后的一个
      ）
  ```

  偶数个

  ![image-20240303235232491](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20240303235232fyiPbg.png)

  奇数个

  ![image-20240303235319933](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20240303235320N0ZLxq.png)

* 是否存在环问题

  ```
  初始：设有两个指针 fast 和 slow，初始时指向头节点。
  
  步骤：
  	每次移动时，fast向后走两次，slow向后走一次，直到 fast 无法向后走两次。这使得在每轮移动之后。fast 和 slow 的距离就会增加1
   
    (这就变成了追及相遇问题，一旦进入环中循环，快的总会追上慢的)
  ```

* 如果存在环，如何判断环的长度

  ```
  快慢指针相遇后继续移动，直到第二次相遇。两次相遇间的移动次数即为环的长度。
  ```

  



### [141. 环形链表](https://leetcode.cn/problems/linked-list-cycle/)

题目

```js
//给你一个链表的头节点 head ，判断链表中是否有环。 
//
// 如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。 为了表示给定链表中的环，评测系统内部使用整数 pos 来表示链表尾连接到
//链表中的位置（索引从 0 开始）。注意：pos 不作为参数进行传递 。仅仅是为了标识链表的实际情况。 
//
// 如果链表中存在环 ，则返回 true 。 否则，返回 false 。 
//
// 
//
// 示例 1： 
//
// 
//
// 
//输入：head = [3,2,0,-4], pos = 1
//输出：true
//解释：链表中有一个环，其尾部连接到第二个节点。
// 
//
// 示例 2： 
//
// 
//
// 
//输入：head = [1,2], pos = 0
//输出：true
//解释：链表中有一个环，其尾部连接到第一个节点。
// 
//
// 示例 3： 
//
// 
//
// 
//输入：head = [1], pos = -1
//输出：false
//解释：链表中没有环。
// 
//
// 
//
// 提示： 
//
// 
// 链表中节点的数目范围是 [0, 10⁴] 
// -10⁵ <= Node.val <= 10⁵ 
// pos 为 -1 或者链表中的一个 有效索引 。 
// 
//
// 
//
// 进阶：你能用 O(1)（即，常量）内存解决此问题吗？ 
//
// Related Topics 哈希表 链表 双指针 👍 2113 👎 0

```

天秀解法：[题解地址](https://leetcode.cn/problems/linked-list-cycle/solutions/716263/shi-chuan-yi-jiu-de-javsscripttian-xiu-j-u8kv) ，leetcode上看到了很有意思的三种解法，这三种解法都是因为js的特性

```js
var hasCycle = function(head) {
    while(head!==null){
        if(!head.tag){
            head.tag=true // 没有标记的节点，增加一个标记
            head=head.next
        }else{
            return true
        }
        
    }
    return false
};
```

哈希记录节点
```js
var hasCycle = function(head) {
    let m=new Map()
    while(head!==null){
        if(!m.has(head)){
            m.set(head,1) // 存的是节点的引用
            head=head.next
        }else{
            return true
        }
        
    }
    return false

};
```

快慢指针

```js
var hasCycle = function(head) {
    let fast=head,slow=head
    // 之所以有fast.next这个条件，可以想下[1] 这个例子
    while (fast&&fast.next){
        fast=fast.next.next
        slow=slow.next
        if(fast===slow){
            return true
        }
    }
    return false

};
```

### [142. 环形链表 II](https://leetcode.cn/problems/linked-list-cycle-ii/)

题目

```js
//给定一个链表的头节点 head ，返回链表开始入环的第一个节点。 如果链表无环，则返回 null。
//
// 如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。 为了表示给定链表中的环，评测系统内部使用整数 pos 来表示链表尾连接到
//链表中的位置（索引从 0 开始）。如果 pos 是 -1，则在该链表中没有环。注意：pos 不作为参数进行传递，仅仅是为了标识链表的实际情况。
//
// 不允许修改 链表。
//
//
//
//
//
//
// 示例 1：
//
//
//
//
//输入：head = [3,2,0,-4], pos = 1
//输出：返回索引为 1 的链表节点
//解释：链表中有一个环，其尾部连接到第二个节点。
//
//
// 示例 2：
//
//
//
//
//输入：head = [1,2], pos = 0
//输出：返回索引为 0 的链表节点
//解释：链表中有一个环，其尾部连接到第一个节点。
//
//
// 示例 3：
//
//
//
//
//输入：head = [1], pos = -1
//输出：返回 null
//解释：链表中没有环。
//
//
//
//
// 提示：
//
//
// 链表中节点的数目范围在范围 [0, 10⁴] 内
// -10⁵ <= Node.val <= 10⁵
// pos 的值为 -1 或者链表中的一个有效索引
//
//
//
//
// 进阶：你是否可以使用 O(1) 空间解决此题？
//
// Related Topics 哈希表 链表 双指针 👍 2479 👎 0


```

哈希记录节点

```js
var detectCycle = function(head) {
    let m=new Map()
    while(head){
        if(m.has(head)){
            return head
        }else {
            m.set(head,true)
            head=head.next
        }

    }
    return null
};
```

快慢指针(略)

### [15. 三数之和](https://leetcode.cn/problems/3sum/)

数组从小到大排序。

使用i、L、R三个指针

* i 从头遍历
* L=i+1
* R=len-1

L到R框选了剩余的数字集合

* L+R>-i ，那就缩小一点，即R=R-1
* L+R<-i ，那就放大一点，即L=L+1
* L+R=-i ，就加入结果集合

还有就是三元组不能重复，所以还要有一些判重逻辑

![image-20240303215756192](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20240303215756mA44V5.png)

```js
var threeSum = function(nums) {
  let res=[]
  nums.sort((a,b)=>a-b)
  for (let i=0;i<nums.length;i++){
    // 防止重复
    if(i>0&&nums[i]===nums[i-1]){
      continue
    }
    // i指针数字>0，数组从小到大排序的，所以加上L、R肯定不等于0
    if (nums[i]>0){
      return res
    }

    let L=i+1,R=nums.length-1

    while (L<R){

      if(nums[i]+nums[L]+nums[R]===0){
        res.push([nums[i],nums[L],nums[R]])

        // 必须要过滤一下
        //  例如：[-1,0,0,1,1] ，res=[-1,0,1],这时候就不能让L继续为0，R继续为1
        let historyValue=nums[R]
        while (historyValue===nums[R]&&L<R){
          R--
        }

        historyValue=nums[L]
        while (historyValue===nums[L]&&L<R){
          L++
        }
      }else if(nums[i]+nums[L]+nums[R]>0){
        R--
      }else {
        L++
      }
    }

  }
  return res
};
```

### [11. 盛最多水的容器](https://leetcode.cn/problems/container-with-most-water/)

```js
//给定一个长度为 n 的整数数组 height 。有 n 条垂线，第 i 条线的两个端点是 (i, 0) 和 (i, height[i]) 。 
//
// 找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。 
//
// 返回容器可以储存的最大水量。 
//
// 说明：你不能倾斜容器。 
//
// 
//
// 示例 1： 
//
// 
//
// 
//输入：[1,8,6,2,5,4,8,3,7]
//输出：49 
//解释：图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。 
//
// 示例 2： 
//
// 
//输入：height = [1,1]
//输出：1
// 
//
// 
//
// 提示： 
//
// 
// n == height.length 
// 2 <= n <= 10⁵ 
// 0 <= height[i] <= 10⁴ 
// 
//
// Related Topics 贪心 数组 双指针 👍 4864 👎 0

```

解答

容量取决于最小高度的边，尝试移动最小边是否会获得更大的容量

```js
var maxArea = function(height) {
  let left=0,right=height.length-1

  let maxCapcity=0
  while (left<right){
    maxCapcity=Math.max((right-left)*Math.min(height[left],height[right]),maxCapcity)

    if (height[left]<height[right]){
      left++
    }else {
      right--
    }
  }
  return maxCapcity

};
```

### [160. 相交链表](https://leetcode.cn/problems/intersection-of-two-linked-lists/)

题目

```js
//给你两个单链表的头节点 headA 和 headB ，请你找出并返回两个单链表相交的起始节点。如果两个链表不存在相交节点，返回 null 。 
//
// 图示两个链表在节点 c1 开始相交： 
//
// 
//
// 题目数据 保证 整个链式结构中不存在环。 
//
// 注意，函数返回结果后，链表必须 保持其原始结构 。 
//
// 自定义评测： 
//
// 评测系统 的输入如下（你设计的程序 不适用 此输入）： 
//
// 
// intersectVal - 相交的起始节点的值。如果不存在相交节点，这一值为 0 
// listA - 第一个链表 
// listB - 第二个链表 
// skipA - 在 listA 中（从头节点开始）跳到交叉节点的节点数 
// skipB - 在 listB 中（从头节点开始）跳到交叉节点的节点数 
// 
//
// 评测系统将根据这些输入创建链式数据结构，并将两个头节点 headA 和 headB 传递给你的程序。如果程序能够正确返回相交节点，那么你的解决方案将被 视
//作正确答案 。 
//
// 
//
// 示例 1： 
//
// 
//
// 
//输入：intersectVal = 8, listA = [4,1,8,4,5], listB = [5,6,1,8,4,5], skipA = 2, 
//skipB = 3
//输出：Intersected at '8'
//解释：相交节点的值为 8 （注意，如果两个链表相交则不能为 0）。
//从各自的表头开始算起，链表 A 为 [4,1,8,4,5]，链表 B 为 [5,6,1,8,4,5]。
//在 A 中，相交节点前有 2 个节点；在 B 中，相交节点前有 3 个节点。
//— 请注意相交节点的值不为 1，因为在链表 A 和链表 B 之中值为 1 的节点 (A 中第二个节点和 B 中第三个节点) 是不同的节点。换句话说，它们在内
//存中指向两个不同的位置，而链表 A 和链表 B 中值为 8 的节点 (A 中第三个节点，B 中第四个节点) 在内存中指向相同的位置。
// 
//
// 
//
// 示例 2： 
//
// 
//
// 
//输入：intersectVal = 2, listA = [1,9,1,2,4], listB = [3,2,4], skipA = 3, skipB = 
//1
//输出：Intersected at '2'
//解释：相交节点的值为 2 （注意，如果两个链表相交则不能为 0）。
//从各自的表头开始算起，链表 A 为 [1,9,1,2,4]，链表 B 为 [3,2,4]。
//在 A 中，相交节点前有 3 个节点；在 B 中，相交节点前有 1 个节点。
// 
//
// 示例 3： 
//
// 
//
// 
//输入：intersectVal = 0, listA = [2,6,4], listB = [1,5], skipA = 3, skipB = 2
//输出：null
//解释：从各自的表头开始算起，链表 A 为 [2,6,4]，链表 B 为 [1,5]。
//由于这两个链表不相交，所以 intersectVal 必须为 0，而 skipA 和 skipB 可以是任意值。
//这两个链表不相交，因此返回 null 。
// 
//
// 
//
// 提示： 
//
// 
// listA 中节点数目为 m 
// listB 中节点数目为 n 
// 1 <= m, n <= 3 * 10⁴ 
// 1 <= Node.val <= 10⁵ 
// 0 <= skipA <= m 
// 0 <= skipB <= n 
// 如果 listA 和 listB 没有交点，intersectVal 为 0 
// 如果 listA 和 listB 有交点，intersectVal == listA[skipA] == listB[skipB] 
// 
//
// 
//
// 进阶：你能否设计一个时间复杂度 O(m + n) 、仅用 O(1) 内存的解决方案？ 
//
// Related Topics 哈希表 链表 双指针 👍 2377 👎 0

```

哈希计数：把链表A路过的节点存下，在遍历链表B，查找是否存在

```js
var getIntersectionNode = function(headA, headB) {
    let m=new Map()
    while (headA){
      if (!m.has(headA)){
        m.set(headA,true)
      }
      headA=headA.next
    }

  while (headB){
    if (m.has(headB)){
      return headB
    }
    headB=headB.next
  }

  return null

};
```

双指针

A指针走到头后，再从B的位置开始走到c1，一共是8个节点

![image-20240303230723256](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20240303230723CMdpqx.png)

B指针走到头后，再从A的位置开始走到c1，也是8个节点

所以他们相遇点就是交点

```js
var getIntersectionNode = function(headA, headB) {
  let A=headA,B=headB

  // 如果链表不相交，最后headA=headB=null，也会结束循环
  while (headA!==headB){
    if (headA){
      headA=headA.next
    }else {
      headA=B
    }

    if (headB){
      headB=headB.next
    }else {
      headB=A
    }

  }

  return headA

};
```

### [876. 链表的中间结点](https://leetcode.cn/problems/middle-of-the-linked-list/)

题目

```js
//给你单链表的头结点 head ，请你找出并返回链表的中间结点。 
//
// 如果有两个中间结点，则返回第二个中间结点。 
//
// 
//
// 示例 1： 
// 
// 
//输入：head = [1,2,3,4,5]
//输出：[3,4,5]
//解释：链表只有一个中间结点，值为 3 。
// 
//
// 示例 2： 
// 
// 
//输入：head = [1,2,3,4,5,6]
//输出：[4,5,6]
//解释：该链表有两个中间结点，值分别为 3 和 4 ，返回第二个结点。
// 
//
// 
//
// 提示： 
//
// 
// 链表的结点数范围是 [1, 100] 
// 1 <= Node.val <= 100 
// 
//
// Related Topics 链表 双指针 👍 975 👎 0

```

双指针（注意如果节点个数是偶数个，这题要求返回的是中间两个节点中，靠后的一个）

```js
var middleNode = function(head) {
  let left=head,right=head
  while (right&&right.next){
    left=left.next
    right=right.next.next
  }
  return left
};
```

## 滑动窗口

* 滑动窗口 ，使用左右指针限制窗口大小
  
  for循环移动right指针时
  
  * 每轮for循环实际上right都右移了，加入窗口
  
  * 每轮都判断left是否需要收缩窗口
* set、hash集合始终记录窗口内的数据(操作窗口时，记得维护set、hash数据)

题目特征：连续的，求最值

### [3. 无重复字符的最长子串](https://leetcode.cn/problems/longest-substring-without-repeating-characters/)

题目

```js
//给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。 
//
// 
//
// 示例 1: 
//
// 
//输入: s = "abcabcbb"
//输出: 3 
//解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
// 
//
// 示例 2: 
//
// 
//输入: s = "bbbbb"
//输出: 1
//解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
// 
//
// 示例 3: 
//
// 
//输入: s = "pwwkew"
//输出: 3
//解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
//     请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
// 
//
// 
//
// 提示： 
//
// 
// 0 <= s.length <= 5 * 10⁴ 
// s 由英文字母、数字、符号和空格组成 
// 
//
// Related Topics 哈希表 字符串 滑动窗口 👍 10006 👎 0

```

滑动窗口

注意：这个题描述的不准确，应该是连续子串。连续子串才能用滑动窗口

```js
var lengthOfLongestSubstring = function(s) {
  let left=0,right=0
  let resSet=new Set()
  let maxLen=0

  for (;right<s.length ; right++)  {
    if (!resSet.has(s[right])){
      resSet.add(s[right])
      maxLen=Math.max(maxLen,resSet.size)

    }else {
      // 一直删除都没有
      while (resSet.has(s[right])){
        resSet.delete(s[left])
        left++
      }
      // 再把right加入集合
      resSet.add(s[right])
      maxLen=Math.max(maxLen,resSet.size)
      
    }
  }
  return maxLen
};
```

### [219. 存在重复元素 II](https://leetcode.cn/problems/contains-duplicate-ii/)

题目

```js
//给你一个整数数组 nums 和一个整数 k ，判断数组中是否存在两个 不同的索引 i 和 j ，满足 nums[i] == nums[j] 且 abs(i 
//- j) <= k 。如果存在，返回 true ；否则，返回 false 。 
//
// 
//
// 示例 1： 
//
// 
//输入：nums = [1,2,3,1], k = 3
//输出：true 
//
// 示例 2： 
//
// 
//输入：nums = [1,0,1,1], k = 1
//输出：true 
//
// 示例 3： 
//
// 
//输入：nums = [1,2,3,1,2,3], k = 2
//输出：false 
//
// 
//
// 
//
// 提示： 
//
// 
// 1 <= nums.length <= 10⁵ 
// -10⁹ <= nums[i] <= 10⁹ 
// 0 <= k <= 10⁵ 
// 
//
// Related Topics 数组 哈希表 滑动窗口 👍 690 👎 0

```

滑动窗口

```js
var containsNearbyDuplicate = function(nums, k) {
    // 一个元素
    if (nums.length===1){
        return false
    }

    // 大于1个元素
    let s=new Set()
    let left=0,right=1

    s.add(nums[0])

    for (;right<nums.length;right++){
      	// 不管if是否为true，实际上每一轮right都移动了
        if (right-left<=k){
            if (s.has(nums[right])){
                return true
            }
            s.add(nums[right])
        }else {
            s.delete(nums[left])
            left++

          	// 同if中的逻辑
            if (s.has(nums[right])){
                return true
            }
            s.add(nums[right])
        }
    }

    return false
};
```

提出共同逻辑，简化下

```js
var containsNearbyDuplicate = function(nums, k) {
    // 一个元素
    if (nums.length===1){
        return false
    }

    // 大于1个元素
    let s=new Set()
    let left=0,right=1

    s.add(nums[0])

    for (;right<nums.length;right++){
      	// 如果本次右移超过了窗口最大值，立即收紧left
      	// 这个必须写在前面，因为这里不收紧left，下面的if判断区间的大小就不在 k 之间了
        if (right-left>k){
            s.delete(nums[left])
            left++
        }

      	// 每次right右移都做的逻辑
        if (s.has(nums[right])){
            return true
        }
        s.add(nums[right])
    }

    return false
};
```



### [438.找到字符串中所有字母异位词](https://leetcode.cn/problems/find-all-anagrams-in-a-string)

```js
//给定两个字符串 s 和 p，找到 s 中所有 p 的 异位词 的子串，返回这些子串的起始索引。不考虑答案输出的顺序。
//
// 异位词 指由相同字母重排列形成的字符串（包括相同的字符串）。
//
//
//
// 示例 1:
//
//
//输入: s = "cbaebabacd", p = "abc"
//输出: [0,6]
//解释:
//起始索引等于 0 的子串是 "cba", 它是 "abc" 的异位词。
//起始索引等于 6 的子串是 "bac", 它是 "abc" 的异位词。
//
//
// 示例 2:
//
//
//输入: s = "abab", p = "ab"
//输出: [0,1,2]
//解释:
//起始索引等于 0 的子串是 "ab", 它是 "ab" 的异位词。
//起始索引等于 1 的子串是 "ba", 它是 "ab" 的异位词。
//起始索引等于 2 的子串是 "ab", 它是 "ab" 的异位词。
//
//
//
//
// 提示:
//
//
// 1 <= s.length, p.length <= 3 * 10⁴
// s 和 p 仅包含小写字母
//
//
// Related Topics 哈希表 字符串 滑动窗口 👍 1392 👎 0

```

滑动 

窗口中可能出现重复字符，不能使用Set存储。我们使用Hash计数存储

为了判断 **窗口中的字符**与**p是否为异位词**，我们把p也转换为哈希存储，这样就可以对比了

```js
var findAnagrams = function(s, p) {

    function isSetIncludeStr(winHash,needHash){
        for(let key of Object.keys(needHash)){
            if(winHash[key]!==needHash[key]){
                return false
            }
        }
        return true
    }

    if (s.length<p.length){
        return []
    }
    // 把p转成哈希（这是因为窗口也是哈希，便于比较两者是否包含相同且数量一致的字符）
    let needHash={}
    for (let val of p){
        if(!needHash[val]){
            needHash[val]=0
        }
        needHash[val]++
    }

    // 窗口宽度 起始
    let left=0,right=0
    // 窗口内容
    let winHash={}
    // 结果
    let res=[]
    for (;right<s.length;right++){
        // 记录窗口内部的数据
        if(!winHash[s[right]]){
            winHash[s[right]]=0
        }
        winHash[s[right]]++


        // 维护滑动窗口宽度。这里用if执行一次，就可以维护好窗口
      	// 904题用while需要循环才能维护好
        if (right-left+1>p.length){
            winHash[s[left]]--

            left++
        }

        //---- 一般题目都是这里处理逻辑 -----
        // 这个题窗口宽度是p.length是才可能是异位词。
        if (right-left+1===p.length){
          // 判断是否为异位词 
            if (isSetIncludeStr(winHash,needHash)){
                res.push(left)
            }
        }

    }
    return res
};
```

### [1456. 定长子串中元音的最大数目](https://leetcode.cn/problems/maximum-number-of-vowels-in-a-substring-of-given-length/)

题目

```js
//给你字符串 s 和整数 k 。
//
// 请返回字符串 s 中长度为 k 的单个子字符串中可能包含的最大元音字母数。
//
// 英文中的 元音字母 为（a, e, i, o, u）。
//
//
//
// 示例 1：
//
// 输入：s = "abciiidef", k = 3
//输出：3
//解释：子字符串 "iii" 包含 3 个元音字母。
//
//
// 示例 2：
//
// 输入：s = "aeiou", k = 2
//输出：2
//解释：任意长度为 2 的子字符串都包含 2 个元音字母。
//
//
// 示例 3：
//
// 输入：s = "leetcode", k = 3
//输出：2
//解释："lee"、"eet" 和 "ode" 都包含 2 个元音字母。
//
//
// 示例 4：
//
// 输入：s = "rhythms", k = 4
//输出：0
//解释：字符串 s 中不含任何元音字母。
//
//
// 示例 5：
//
// 输入：s = "tryhard", k = 4
//输出：1
//
//
//
//
// 提示：
//
//
// 1 <= s.length <= 10^5
// s 由小写英文字母组成
// 1 <= k <= s.length
//
//
// Related Topics 字符串 滑动窗口 👍 92 👎 0

```

解

```js
var maxVowels = function(s, k) {
    let left=0,right=0
    let winHash={}
    let targetList= ['a','e','i','o','u']
    let max=0
    for (;right<s.length;right++){
        // 记录窗口内部的数据
        if (!winHash[s[right]]){
            winHash[s[right]]=0
        }
        winHash[s[right]]++


        // 维护滑动窗口宽度
        if (right-left+1>k){
            winHash[s[left]]--
            left++

        }

      	// 窗口宽度在这个区间内部，做逻辑处理
        if (right-left+1>=k){
            let temp=0
            for (let val of targetList){
                if(winHash[val]){
                    temp+=winHash[val]
                }

            }
            max=Math.max(max,temp)
        }

    }
    return max
};
```



### [76. 最小覆盖子串](https://leetcode.cn/problems/minimum-window-substring)

```js
//给你一个字符串 s 、一个字符串 t 。返回 s 中涵盖 t 所有字符的最小子串。如果 s 中不存在涵盖 t 所有字符的子串，则返回空字符串 "" 。 
//
// 
//
// 注意： 
//
// 
// 对于 t 中重复字符，我们寻找的子字符串中该字符数量必须不少于 t 中该字符数量。 
// 如果 s 中存在这样的子串，我们保证它是唯一的答案。 
// 
//
// 
//
// 示例 1： 
//
// 
//输入：s = "ADOBECODEBANC", t = "ABC"
//输出："BANC"
//解释：最小覆盖子串 "BANC" 包含来自字符串 t 的 'A'、'B' 和 'C'。
// 
//
// 示例 2： 
//
// 
//输入：s = "a", t = "a"
//输出："a"
//解释：整个字符串 s 是最小覆盖子串。
// 
//
// 示例 3: 
//
// 
//输入: s = "a", t = "aa"
//输出: ""
//解释: t 中两个字符 'a' 均应包含在 s 的子串中，
//因此没有符合条件的子字符串，返回空字符串。 
//
// 
//
// 提示： 
//
// 
// m == s.length 
// n == t.length 
// 1 <= m, n <= 10⁵ 
// s 和 t 由英文字母组成 
// 
//
// 
//进阶：你能设计一个在 
//o(m+n) 时间内解决此问题的算法吗？
//
// Related Topics 哈希表 字符串 滑动窗口 👍 2840 👎 0

```

滑动窗口

left-right范围包含t，left收紧区间，一旦区间不再能包含t了，right放大区间

```js
var minWindow = function(s, t) {

    function isWinIncludeAllStr(winHash,needHash){
        for (let val of Object.keys(needHash)){
            if (!winHash[val]||winHash[val]<needHash[val]){
                return false
            }
        }
        return true
    }

    // 把t转行为哈希
    let needHash={}
    for (let val of t){
        if(!needHash[val]){
            needHash[val]=0
        }
        needHash[val]++
    }


    // 窗口
    let left=0,right=0
    let winHash={}

    // 最小时，左右指针（初始值为最大的数）
    let res=[0,Infinity]

    for (;right<s.length;right++){
        // 记录窗口内部的数据
        if(!winHash[s[right]]){
            winHash[s[right]]=0
        }
        winHash[s[right]]++


       // 维护滑动窗口宽度
        while(isWinIncludeAllStr(winHash,needHash)){
						// 这题的逻辑判断，放在了调整窗口内部了
            // 这是因为放在同级，还需要再调用下isWinIncludeAllStr，比较浪费
            if(res[1]-res[0]>right-left){
                res=[left,right]
            }

						
            winHash[s[left]]--
            if(winHash[s[left]]===0){
                delete winHash[s[left]] // 因为没有用到 Object.keys()。所以这里不清除也行
            }
            left++


        }
    }

    if (res[1]-res[0]<Infinity){
        return s.slice(res[0],res[1]+1)

    }else {
        return ''
    }


};
```

### [904. 水果成篮](https://leetcode.cn/problems/fruit-into-baskets/)

题目

这个题好像出错了，题目要求返回最大的水果数，实际上应该是：取最大的水果数时，树的个数

```js
//你正在探访一家农场，农场从左到右种植了一排果树。这些树用一个整数数组 fruits 表示，其中 fruits[i] 是第 i 棵树上的水果 种类 。
//
// 你想要尽可能多地收集水果。然而，农场的主人设定了一些严格的规矩，你必须按照要求采摘水果：
//
//
// 你只有 两个 篮子，并且每个篮子只能装 单一类型 的水果。每个篮子能够装的水果总量没有限制。
// 你可以选择任意一棵树开始采摘，你必须从 每棵 树（包括开始采摘的树）上 恰好摘一个水果 。采摘的水果应当符合篮子中的水果类型。每采摘一次，你将会向右移动到
//下一棵树，并继续采摘。
// 一旦你走到某棵树前，但水果不符合篮子的水果类型，那么就必须停止采摘。
//
//
// 给你一个整数数组 fruits ，返回你可以收集的水果的 最大 数目。
//
//
//
// 示例 1：
//
//
//输入：fruits = [1,2,1]
//输出：3
//解释：可以采摘全部 3 棵树。
//
//
// 示例 2：
//
//
//输入：fruits = [0,1,2,2]
//输出：3
//解释：可以采摘 [1,2,2] 这三棵树。
//如果从第一棵树开始采摘，则只能采摘 [0,1] 这两棵树。
//
//
// 示例 3：
//
//
//输入：fruits = [1,2,3,2,2]
//输出：4
//解释：可以采摘 [2,3,2,2] 这四棵树。
//如果从第一棵树开始采摘，则只能采摘 [1,2] 这两棵树。
//
//
// 示例 4：
//
//
//输入：fruits = [3,3,3,1,2,1,1,2,3,3,4]
//输出：5
//解释：可以采摘 [1,2,1,1,2] 这五棵树。
//
//
//
//
// 提示：
//
//
// 1 <= fruits.length <= 10⁵
// 0 <= fruits[i] < fruits.length
//
//
// Related Topics 数组 哈希表 滑动窗口 👍 626 👎 0

```

解

```js
var totalFruit = function(fruits) {
    let left=0,right=0
    let hash= {}
    // 最大水果数
    let fruitsMax=0
    // 取得最大水果数时，用了几棵树
    let treeNum=0
    for (;right<fruits.length;right++){
        if (!hash[fruits[right]]){
            hash[fruits[right]]=0
        }
        hash[fruits[right]]++

        // 维护窗口。 特别注意,hash存储的特点是：例如hash['a']=0，即使没有数据a了，仍然能遍历到这个值，所以推荐为0后，删除该key
        while (Object.keys(hash).length>2){
            hash[fruits[left]]--

            if (hash[fruits[left]]===0){
                delete hash[fruits[left]]
            }

            left++
        }

        // 逻辑处理
        // 一开始写的 Object.keys(hash).length===2 ，一个数一定小于两个数，所以觉得最大值一定出在等于2的时候
        // 用例 [0] ，即只有一个树的时候
        if (Object.keys(hash).length<=2){
            let temp=0
            for (let count of Object.values(hash)){
                temp+=count
            }
            if (temp>fruitsMax){
                fruitsMax=temp
                treeNum=right-left+1
            }
        }
    }
    return treeNum
};
```

## 递归问题

### 递归分析

递归是什么？

递归是一种编程技巧，代码上具体表现为自己调用自己。**分治算法**、**回溯算法**都是应用递归技巧的具体案例



递归问题的核心？

写一层逻辑，这一层逻辑反复执行（类似for循环），本层将结果向上层return



代码逻辑分析：

* 最后一层（根据条件判断是否为最后一层，return最后一层结果），也叫递归终止条件

  最后一层找不到？看下递归函数 f(n)->f(n-1)，看下递归的入参一层层下移最后会变成啥，就是最后一层的条件

* 其余每层公用的逻辑（return是返回上一层的结果）

* 层与层之间的通讯
  * **return通讯**： n+1层 ---> n层 发送数据。这个数据会最终返回最顶层（2-1注释）
  
    注意并不是所有题的答案都必须return到顶层。有可能定义个全局变量，然后在每一层中做逻辑，最后答案是这个值。例如，定义全局变量max，每层比较大小存入最大值，最后返回这个最大值
  
  * **递归入参通讯**：n+1层 <--- n层 发送数据。每一层的入参，一般都用来标识本层的一些信息，比如自己是第几层（2-2注释）

很多题是很难看出来每一层是什么，所以将递归问题转换为层次图，会更为直观分析


```js
recursion(params)// 这里是顶层，即0层

function recursion(params){ 
  
  // 1、最后一层的处理逻辑 
	if(最后一层){
    return xxx
  }
  
  // 2、其余任意一层的处理逻辑 （这里能看到两层，既然是任意层，为了方便，假设当前层为0层）
  // 2-1 这一层的递归函数recursion，就是第1层。latter就是1层返回的值
  const latter=recursion(params)  // 我们可以对上一层的参数params进行处理，传入下一层
  // 2-1 这里是当前层的逻辑，即0层
  return 处理latter后的数据
}
```

#### 斐波那契 

F(n)=F(n-1)+F(n-2)

层次图

![image-20240313012348899](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20240313012349rFRvQc.png)

```js
function fin(n){
  // 最后一层 ，fin(n) ->fin(n-1)、fi(n-2)，n会一步一步变成0、1
  if(n===0||n==1){
    return n
  }
  
  // 本层。这里直接return就行（写latter是为了更清晰）
  const latter=fin(n-1)+fi(n-2)
  return latter
  
}
```

#### 阶乘 

`n!=n*(n-1)*(n-2)...*1`

这题看不出来树状层次，需要我们抽象出来函数。`f(n)=n*f(n-1)=n*(n-1)*f(n-2)z`h

![image-20240313013124039](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20240313013124XZqTPF.png)

```js
function factorial(n){
	if(n===1) return 1
  return n*factorial(n-1)
}
```

#### [104. 二叉树的最大深度](https://leetcode.cn/problems/maximum-depth-of-binary-tree/)

return通讯，将结果返回顶层

```js
var maxDepth = function(root) {// 0 层
    // 最后一层 （root -> root.left、root.right，一步步下移为null）
    if(root===null){
        return 0
    }
  
    // 其它层（假设是1层）
  	// maxDepth(root.left)\maxDepth(root.right)是第2层
  	// 这里计算的是1层的结果
    const latter=Math.max(maxDepth(root.left),maxDepth(root.right)) // n+1层结果做逻辑处理。这里是取最大值
    return 1+latter
};
```

参数通讯

注意：

* leetcode给的模板`var maxDepth = function(root){}`，如果使用maxDepth作为递归函数，那就没法自定义每层的参数。所以，我们可以在自定义一个全新的递归函数

* 参数想下传递最后无法取出，所以我们一般定义个全局的变量去收集每层的数据

```js
var maxDepth = function(root) {
    let ans=0
    function recursion(root,count){
        // 最后一层
        if(root===null){
            return 0
        }

        // 其余层
        count++
        ans=Math.max(count,ans)
        recursion(root.left,count)
        recursion(root.right,count)
    }
    recursion(root,0)

    return ans

};
```



### 分治

分治将一个较大的问题分解成多个相对较小的子问题，这些子问题通常与原始问题具有相同的结构。然后，将子问题的解合并起来，形成原始问题的解

例如：快速排序、归并排序

模板：

这里就可以看出来分治算法使用的是递归技巧，其核心是在当前层 **合并**下一层，即前面提到的**return通讯**

```js
function divide_conquer(problem, param1, param2, ...){
  if(problem === null){
    // return result
  }

  //分割问题
  subproblem = split_problem(problem, data)

  //计算子问题
  subResult1 = divide_conquer(subproblem[0], p1, ...)
  subResult2 = divide_conquer(subproblem[1], p1, ...)
  subResult3 = divide_conquer(subproblem[2], p1, ...)
  ...

  result = process_resule(subResult1, subResult2, subResult3,...)
}
```



#### [50. Pow(x, n)](https://leetcode.cn/problems/powx-n/)

题目

```js
//实现 pow(x, n) ，即计算 x 的整数 n 次幂函数（即，xⁿ ）。
//
//
//
// 示例 1：
//
//
//输入：x = 2.00000, n = 10
//输出：1024.00000
//
//
// 示例 2：
//
//
//输入：x = 2.10000, n = 3
//输出：9.26100
//
//
// 示例 3：
//
//
//输入：x = 2.00000, n = -2
//输出：0.25000
//解释：2-2 = 1/22 = 1/4 = 0.25
//
//
//
//
// 提示：
//
//
// -100.0 < x < 100.0
// -231 <= n <= 231-1
// n 是一个整数
// 要么 x 不为零，要么 n > 0 。
// -104 <= xⁿ <= 104
//
//
// Related Topics 递归 数学 👍 1316 👎 0

```

解

```js
var myPow = function(x, n) {
    if (n===0){
        return 1
    }else if (n===1){
        return x
    }else if (n<0){
        return myPow(1/x,-n)
    }else{
        if (n%2===0){
            return myPow(x*x,n/2)
        }else {
            return x*myPow(x,n-1)
        }

    }
};
```

#### [169. 多数元素](https://leetcode.cn/problems/majority-element/)

题目

```js
//给定一个大小为 n 的数组 nums ，返回其中的多数元素。多数元素是指在数组中出现次数 大于 ⌊ n/2 ⌋ 的元素。 
//
// 你可以假设数组是非空的，并且给定的数组总是存在多数元素。 
//
// 
//
// 示例 1： 
//
// 
//输入：nums = [3,2,3]
//输出：3 
//
// 示例 2： 
//
// 
//输入：nums = [2,2,1,1,1,2,2]
//输出：2
// 
//
// 
//提示：
//
// 
// n == nums.length 
// 1 <= n <= 5 * 10⁴ 
// -10⁹ <= nums[i] <= 10⁹ 
// 
//
// 
//
// 进阶：尝试设计时间复杂度为 O(n)、空间复杂度为 O(1) 的算法解决此问题。 
//
// Related Topics 数组 哈希表 分治 计数 排序 👍 2150 👎 0

```

哈希计数

```js
var majorityElement = function(nums) {
    let hash={}
    for(let val of nums){
        if(!hash[val]){
            hash[val]=0
        }
        hash[val]++
    }
    for (let key of Object.keys(hash)){
        if (hash[key]>Math.floor(nums.length/2)){
            return key
        }
    }
    return ''


};
```

#### [124. 二叉树中的最大路径和](https://leetcode.cn/problems/binary-tree-maximum-path-sum/)

题目

```js
//二叉树中的 路径 被定义为一条节点序列，序列中每对相邻节点之间都存在一条边。同一个节点在一条路径序列中 至多出现一次 。该路径 至少包含一个 节点，且不一定
//经过根节点。
//
// 路径和 是路径中各节点值的总和。
//
// 给你一个二叉树的根节点 root ，返回其 最大路径和 。
//
//
//
// 示例 1：
//
//
//输入：root = [1,2,3]
//输出：6
//解释：最优路径是 2 -> 1 -> 3 ，路径和为 2 + 1 + 3 = 6
//
// 示例 2：
//
//
//输入：root = [-10,9,20,null,null,15,7]
//输出：42
//解释：最优路径是 15 -> 20 -> 7 ，路径和为 15 + 20 + 7 = 42
//
//
//
//
// 提示：
//
//
// 树中节点数目范围是 [1, 3 * 10⁴]
// -1000 <= Node.val <= 1000
//
//
// Related Topics 树 深度优先搜索 动态规划 二叉树 👍 2181 👎 0

```

解

```js
var maxPathSum = function(root) {

    let max=-Infinity
    const dfs=(root)=>{
        // 如果本层是递归出口，返回上层的值
        if (root===null){
            return 0
        }

        // 本层计算结果的逻辑
        let leftChildMax=dfs(root.left)
        let rightChildMax=dfs(root.right)
        max= Math.max(max,root.val+leftChildMax+rightChildMax)

        // 本层返回上层的值 ( 本层的最大值 )
        const curValue=root.val+Math.max(leftChildMax,rightChildMax)
        return curValue>0?curValue:0
      	// 注意这里为啥小于0，return 0 呢。参考下面用例：
      	// [2,-1] 正确结果2。如果不设置这句，直接返回curValue，结果就是1
      	// 因为这题要求最大值，返回给上层的一定不能是负数
    }

    dfs(root)

    return max

};
//  // res=:2
```

#### [53. 最大子数组和](https://leetcode.cn/problems/maximum-subarray/)

题目

```js
//给你一个整数数组 nums ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
//
// 子数组 是数组中的一个连续部分。
//
//
//
// 示例 1：
//
//
//输入：nums = [-2,1,-3,4,-1,2,1,-5,4]
//输出：6
//解释：连续子数组 [4,-1,2,1] 的和最大，为 6 。
//
//
// 示例 2：
//
//
//输入：nums = [1]
//输出：1
//
//
// 示例 3：
//
//
//输入：nums = [5,4,-1,7,8]
//输出：23
//
//
//
//
// 提示：
//
//
// 1 <= nums.length <= 10⁵
// -10⁴ <= nums[i] <= 10⁴
//
//
//
//
// 进阶：如果你已经实现复杂度为 O(n) 的解法，尝试使用更为精妙的 分治法 求解。
//
// Related Topics 数组 分治 动态规划 👍 6565 👎 0

```

滑动窗口：

这个题难在如何维护窗口

```js
var maxSubArray = function(nums) {
    let left=0,right=0
    let sum=0,max=-Infinity
    for (;right<nums.length;right++){
        // 加入滑动窗口
        sum+=nums[right]
        max=Math.max(max,sum)

        // 维护窗口  即要保证right之前的不能包含负数，nums[right]>sum就是这个含义
      	// 一开始错误的想法：一直判断left指向的值，小于0就一直收缩窗口。
        // [1,-2]这种情况，left是正数，但是窗口内仍有负数-2
        while (nums[right]>sum){
            sum-=nums[left]
            left++
            max=Math.max(max,sum)
        }

    }
    return max
};
```

动态规划

```js
var maxSubArray = function(nums) {

    // dp[i] 是 0-i 范围子数组的最大和
    // dp[0]=nums[0]

    let dp=new Array(nums.length).fill(-Infinity)
    dp[0]=nums[0]
    for (let i = 0; i < nums.length; i++) {
        if (dp[i]>0){
            dp[i+1]=dp[i]+nums[i+1] // nums[i+1] 无论正负，都要加上，否则后续的dp就不连续了
        }else {
            dp[i+1]=nums[i+1]
        }
    }
    dp.sort((a,b)=>b-a)
    return dp[0]
};
```

#### [938. 二叉搜索树的范围和](https://leetcode.cn/problems/range-sum-of-bst/)

题目

```js
//给定二叉搜索树的根结点 root，返回值位于范围 [low, high] 之间的所有结点的值的和。
//
//
//
// 示例 1：
//
//
//输入：root = [10,5,15,3,7,null,18], low = 7, high = 15
//输出：32
//
//
// 示例 2：
//
//
//输入：root = [10,5,15,3,7,13,18,1,null,6], low = 6, high = 10
//输出：23
//
//
//
//
// 提示：
//
//
// 树中节点数目在范围 [1, 2 * 10⁴] 内
// 1 <= Node.val <= 10⁵
// 1 <= low <= high <= 10⁵
// 所有 Node.val 互不相同
//
//
// Related Topics 树 深度优先搜索 二叉搜索树 二叉树 👍 369 👎 0

```

递归

```js
var rangeSumBST = function(root, low, high) {
    if (root===null){
        return 0
    }

    if (root.val<low){
        return rangeSumBST(root.right,low,high)
    }
    if (root.val>high){
        return rangeSumBST(root.left,low,high)
    }

    if(root.val>=low&&root.val<=high){
        return root.val+rangeSumBST(root.right,low,high)+rangeSumBST(root.left,low,high)
    }

    return max

};
```

### 回溯

[b站大佬的讲解视频](https://www.bilibili.com/video/BV1mG4y1A7Gu/?spm_id_from=333.788&vd_source=e46d9099be60057b5a16a45fac0d5248)

```js
// 问题1：从str1、str2各选一个字符，共有多少组合？
let str1='abc'
let str2='def'

// 答：常规思路，双层for循环嵌套
for(let val1 of str1){
  for(let val2 of str2){
  
	}
}

// 问题2：从str1、str2、....strn中各选一个字符，共有多少组合？
// n层for循环怎么写？可见单纯的for表达能力有限，递归与for循环相似

```

下面这种增量构建答案的思路就是回溯

一般用变量path存储一条完整的路径，将其推入结果变量ans中，重复下去直到所有path都被推入ans

如下图，[a,d]、[a,e]、[a,f] 等都是完整的路径。结果path中包含全部的路径

代码如何实现？

* 前面提到过递归的通讯方式有一种是入参：我们可以传入[]作为path，在每层依次收集路径上的元素（选1个加入path），到最后一层推入ans即可

* for循环一行 a、b、c，每个元素都是一个同级的递归函数。每个递归函数分别下下一级递归（这种思路显著与传统递归思路不同，传统递归思路都是一个递归函数，一直向下一级递归）

  这里在语法上有个易错点，需要将path拷贝一份推入ans中。path是个引用类型，拷贝可以避免其他递归分治修改path导致ans变化的情况

* 创建多个同级的递归，如果存在不满足题意的递归，我们可以不创建提高效率（这就是枝剪，这个词有些误导，我们只能设置递归终止，但是并不可以中断递归过程；所谓枝剪只是不创建不符合题意的递归）

![image-20240316000454556](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/202403160004558GsTBy.png)

回溯是一种试探性的搜索算法，它会尝试增量构建一个解，如果解不可行就回退到之前的状态并尝试其他选项（剪枝，回溯本质=DFS+剪枝，）

分治是将大问题分解为结构一样的小问题求解，小问题合并为新的解，最后保留一个解

而回溯是其他问题的解增量构建为新的解。保留多个解的集合



回溯模板

```js
ans = [];

function backtrack (level,path) {
    if (最后收尾) // 判断此时path已收集完整
        ans.push(path);
        return // 这里的return只是结束递归。
    }

		// 其余任意层(假设为0层)
		// 在回溯中通过ans、path记录答案。不必通过return来传递数据
		// 创建多个同级的递归函数
		// 任意层核心是维护path，将符合添加的数据加入path
		
		path.push(xxx)
    backtrack(level+1,path) // 1层的递归

		backtrack(level+1,path) // 1层的递归
    
}

backtrack(0,[])
```

回溯问题分为求子集、求组合、求排列回溯

#### 子集型

两种思路（选取哪种思路还有根据题而确定）

* 从输入角度。每一个输入值**选**、**不选**两种可能（对应就是集合中有、没有这个值）
* 从答案角度。叶子节点是答案（完整的path就是从根到叶子节点的路径上的所有点）

78题的图，输入角度看线、答案角度看方块

![image-20240318012854051](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20240318012854N4729h.png)

##### [78. 子集](https://leetcode.cn/problems/subsets/)

题目

```js
//给你一个整数数组 nums ，数组中的元素 互不相同 。返回该数组所有可能的子集（幂集）。
//
// 解集 不能 包含重复的子集。你可以按 任意顺序 返回解集。
//
//
//
// 示例 1：
//
//
//输入：nums = [1,2,3]
//输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
//
//
// 示例 2：
//
//
//输入：nums = [0]
//输出：[[],[0]]
//
//
//
//
// 提示：
//
//
// 1 <= nums.length <= 10
// -10 <= nums[i] <= 10
// nums 中的所有元素 互不相同
//
//
// Related Topics 位运算 数组 回溯 👍 2261 👎 0

```

递归思路：在return放置每层的结果。这里的参数是辅助通知当前层是哪层

```js
var subsets = function(nums) {
   function recursion(curIndex){// 0层
       // 最后一层
       if (curIndex===nums.length-1){
           return [[],[nums[curIndex]]]
       }

       // 其余层（假设当前为1层）
       // 2层
       const latterList=recursion(curIndex+1) //如果分不清latterList到底啥样子，可以看下最后一层的返回值
       // 1层 （nums[curIndex]有和没有两种情况）
       let temp=[]
       for (let itemList of latterList){
           temp.push([nums[curIndex],...itemList])
       }
       return [...temp,...latterList]

   }

   return recursion(0)
};

subsets([0])
```

递归思路：全员变量存储

```js
var subsets = function(nums) {
   let ans=[]
   function recursion(curIndex){
       // 最后一层
       if (curIndex===nums.length-1){
           ans= [[],[nums[curIndex]]]
           return
       }

       // 其余层（假设当前为0层）
       // 1层
       recursion(curIndex+1)
       // 0层 （nums[curIndex]有和没有两种情况）
       let temp=[]
       for (let itemList of ans){
           temp.push([nums[curIndex],...itemList])
       }
       ans = [...temp,...ans]

   }

    recursion(0)

    return ans
};
```

回溯解法1：从输入的角度（选、不选）

![image-20240318012854051](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20240318012854N4729h.png)

注意：为什么这题有恢复现场的逻辑，而17没有呢？

17题不是push数据到path中，而是通过path[i]=xx覆盖path中的值，这样每一层递归都是覆盖

时间复杂度：`o(n*2^n)` ，可以看**其余层**代码，这一层执行了2个同级递归（实际含义：每层选、不选两种情况，共n层，就是`2^n`），注意还有 slice 拷贝的复杂度`o(n)`，最后就是`o(n*2^n) `了

空间复杂度：`o(n)`

```js
var subsets = function(nums) {
    let ans=[]

    function backtrace(curIndex,path){
        // 最后一层
        if (curIndex===nums.length){ // 与17题一致，都是因为num最后一个数与前面的处理逻辑一致，所以这里多补了一层用来将path存入ans
            ans.push(path.slice())
            return
        }

        // 其余层
      	// 例如 nums=[1,2],curIndex=0。第一个数是否加入path？这里就出现了2个同级递归函数
      	// 不选，跳过
        backtrace(curIndex+1,path) 
				// 选，加入path
        path.push(nums[curIndex])
        backtrace(curIndex+1,path)
        path.pop() 
      	// 为啥pop？一些文章里称这里为“恢复现场”，这里pop出来的是什么，不太好想。我们可以假设当前层是`倒数第2层`，push推入了最后一个数，backtrace完成了将path推入ans，pop就是将最后一个数推出。这样`倒数第3层`的path就是正常的。pop就是回溯的核心，即每一层都是尝试一个分支，然后再回退

    }

    backtrace(0,[])

    return ans
};
```

回溯解法2：从答案的角度，因为答案是子集，每次每次递归的path都是一个解（求[1、2、3]的子集，如果[1]是一个子集，[1、2]也是一个子集）

```js
var subsets = function(nums) {
    let ans=[]

    function backtrace(curIndex,path){
				// 每一层递归都是一个解，推入ans中
        ans.push(path.slice())

        // 最后一层
        if (curIndex===nums.length){
            return
        }

        // 其余层
        for (let i=curIndex;i<nums.length;i++){
            path.push(nums[i])
            backtrace(i+1,path) // 下一层起始点为i+1,每次都只往后找，这是为了避免重复
            path.pop()
        }

    }

    backtrace(0,[])

    return ans
};
```

##### [17. 电话号码的字母组合](https://leetcode.cn/problems/letter-combinations-of-a-phone-number/)

题目

```js
//给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。答案可以按 任意顺序 返回。
//
// 给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。
//
// 示例 1：
//
//
//输入：digits = "23"
//输出：["ad","ae","af","bd","be","bf","cd","ce","cf"]
//
//
// 示例 2：
//
//
//输入：digits = ""
//输出：[]
//
//
// 示例 3：
//
//
//输入：digits = "2"
//输出：["a","b","c"]
//
//
//
//
// 提示：
//
//
// 0 <= digits.length <= 4
// digits[i] 是范围 ['2', '9'] 的一个数字。
//
//
// Related Topics 哈希表 字符串 回溯 👍 2777 👎 0

```

层次图：

![image-20240314002343237](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/202403140023439rzIuR.png)

递归思路：在return放置每层的结果，这里的参数是辅助通知当前层是哪层

```js
var letterCombinations = function(digits) {
    const m={
        2:'abc',
        3:'def',
        4:'ghi',
        5:'jkl',
        6:'mno',
        7:'pqrs',
        8:'tuv',
        9:'wxyz'
    }

    function recursion(curIndex){
        // 最后一层逻辑
        if (curIndex===digits.length-1){
            return m[digits[digits.length-1]].split('')
        }

        // 其余层公用逻辑（假设在0层）
      	// 1层
        const latterList=recursion(curIndex+1) 
        // 0层
        let temp=[]
        for (let val1 of m[digits[curIndex]]){
            for (let val2 of latterList){
                temp.push(val1+val2) // 0层按键对应的几个字母，依次和1层的结果拼接
            }
        }
        return temp

    }
  
		// 本题入口
    if (digits===''){
        return []
    }else {
        // 递归
        return recursion(0)
    }
```

递归思路：全局变量ans数组存储结果

```js
var letterCombinations = function(digits) {
    const m={
        2:'abc',
        3:'def',
        4:'ghi',
        5:'jkl',
        6:'mno',
        7:'pqrs',
        8:'tuv',
        9:'wxyz'
    }
    let ans=[]


    function recursion(curIndex){// 0层
        // 最后一层逻辑
        if (curIndex===digits.length-1){
            ans=m[digits[digits.length-1]].split('')
            return // 啥也不返回
        }

        // 其余层公用逻辑（假设在1层）
        // 2层
        recursion(curIndex+1)
        // 1层 （2层执行了ans才有那层的结果）
        let temp=[]
        for (let val1 of m[digits[curIndex]]){
            for (let val2 of ans){
                temp.push(val1+val2)
            }
        }
        ans=temp
        return

    }

    if (digits===''){
        return []
    }else {
        // 递归
        recursion(0)
        return ans
    }

};
```

回溯法：通过递归入参收集path，将所有path推入ans中。

前两种是单一递归函数向下级递归，所以需要一级中循环出所有结果（temp变量存储的），比较复杂。而回溯法通过for循环创建多个同级递归函数，分别向下递归，每个同级递归函数处理自己的

```js
var letterCombinations = function(digits) {
    const m={
        2:'abc',
        3:'def',
        4:'ghi',
        5:'jkl',
        6:'mno',
        7:'pqrs',
        8:'tuv',
        9:'wxyz'
    }
    let ans=[]

    function backtrace(curIndex,path){
        // 最后一层  
      	// 注意这里很重要：正常当curIndex指向digits最后一位时就是最后一层了，但是整体最后一层和前的层逻辑是一样的，所以这里又多加了一层，用于处理最后推入ans的逻辑
        if (curIndex===digits.length){
            ans.push(path.join(''))// 最后一层把path，存入ans
            return
        }

        // 其余层
        // 创建多个同级的递归函数
        // 例如用户按2，这里就是对于a、b、c分别创建3个同级的递归函数，每个同级递归函数继续执行递归
        for (let [index,val] of Object.entries(m[digits[curIndex]])){
            path[curIndex]=val //本层维护path . 注意：这里需要赋值到位置i。每个同级递归函数都用的同一个path，如果push到path中同级递归函数直接会互相影响
            backtrace(curIndex+1,path) // 下层继续迭代维护path
        }

    }

    if (digits===''){
        return []
    }else {
        backtrace(0,[])
        return ans
    }

};
```

##### [131. 分割回文串](https://leetcode.cn/problems/palindrome-partitioning/)

回溯1：输入视角，每两个连续字符之间逗号选与不选

![image-20240317233708846](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20240317233709kOqJ6A.png)

这题需要记录下起点和终点，判断两个之间是否为回文。所以入参有两个index

```js
var partition = function(s) {
   let ans=[]
    function backtrace(startIndex,curIndex,path){
        // 最后一层
        if (curIndex===s.length){
            ans.push(path.slice())
            return
        }

        // 任意层
        // 不加逗号 
        if (curIndex<s.length-1){
          	// 当到最后一个(curIndex===s.length-1)时，字符串结束，相当于是必加逗号。所以用if扣掉这种情况
            backtrace(startIndex,curIndex+1,path)
        }

        // 加逗号
        const temp=s.slice(startIndex,curIndex+1) // 例如结果为[ [xxx],[yyy] ]，判断xxx是回文才加入path
        if (temp===temp.split('').reverse().join('')){ // 是回文
            path.push(temp)
            backtrace(curIndex+1,curIndex+1,path)
            path.pop()
        }


    }

     backtrace(0,0,[])

     return ans
}
```

回溯2：答案视角。记录字符串结束位置

例如：输入aab 

* 结束位置是a的，判断是回文，加入path迭代剩下的
  * a，判断是回文，加入path
  * b，判断是回文，加入path。得到结果[a,a,c]
* 结束位置是aa的，判断是回文，加入path迭代剩下的
  * b ，判断是回文，加入path。得到结果[aa,b]
* 结束位置是aab的，判断不是回文剪枝了

```js
var partition = function(s) {
    let ans=[]
    function backtrace(endIndex,path){ // endIndex每个子串结束的位置
        // 最后一层
        if (endIndex===s.length){
            ans.push(path.slice())
            return
        }

        // 任意层
        for (let i=endIndex;i<s.length;i++){
            const temp=s.slice(endIndex,i+1)
            if (temp===temp.split('').reverse().join('')){ // 是回文
                path.push(temp)
                backtrace(i+1,path)
                path.pop()
            }
        }
        
    }

    backtrace(0,[])

    return ans
};
```



#### 组合型

组合型问题本质就是长度固定的子集型问题

##### [77. 组合](https://leetcode.cn/problems/combinations/)

题目

```js
//给定两个整数 n 和 k，返回范围 [1, n] 中所有可能的 k 个数的组合。
//
// 你可以按 任何顺序 返回答案。
//
//
//
// 示例 1：
//
//
//输入：n = 4, k = 2
//输出：
//[
//  [2,4],
//  [3,4],
//  [2,3],
//  [1,2],
//  [1,3],
//  [1,4],
//]
//
// 示例 2：
//
//
//输入：n = 1, k = 1
//输出：[[1]]
//
//
//
// 提示：
//
//
// 1 <= n <= 20
// 1 <= k <= n
//
//
// Related Topics 回溯 👍 1597 👎 0

```

递归思路：return返回每层结果。这题难点在其余层的公用逻辑。这题存入全局变量的解法与前面都是一致的就省略了

```js
var combine = function(n, k) {
    let targetList=[]
    for (let i=0;i<n;i++ ){
        targetList.push(i+1)    }

    function recursion(k){
        // 最后一层
        if (k===1){
            // 例如n=4，k=1。这里就应该是[[1],[2],[3],[4]]
            let temp=[]
            for (let i=0;i<n;i++ ){
 								// 必须让数据从小到大。在其余层中也要保持这个规律
                temp.push([i+1])
            }
            return temp
        }

      
      	//-------------------
      			这里举个例子讲下思路：
            	假设 n=4,k=3
      				
      				k=2时，结果为 [[1,2], [1,3], [1,4],[2,3]，[2,4], [3,4]]
            	
      				k=3时，
              	* 以下一层第1个元素[1,2]为例子，剩下的元素为3、4。k=3时能组合成[1,2,3]、[1,2,4]
      					* 以下一层第2个元素[1,3]为例子，剩下的元素为2、4。k=3时能组合成[1,3,2]、[1,3,4]。这里重点，这里的[1,3,2]与上一个中的[1,2,3]重复了，所以我们要保持每一层的子数组必须从小到大，然后找剩下元素中大于子数组最后元素的加入
           
       
      	//-------------------
                
        // 其余层
        latterList=recursion(k-1) // 1层 ，latterList的结构分不清，可以假设1层就是最后一层，看下最后一层的返回值
        let temp=[]
        for (let itemList of latterList){
          	// 这里比较复杂，需要看下举的例子
            const restList=targetList.filter(item=>{
                return item>itemList[itemList.length-1]
            })

            for (let rest of restList){
                temp.push([...itemList,rest])
            }

        }
        return temp

    }

    return recursion(k)

};
```

回溯1：从输入角度，每一层都是分为当前元素是否选择加入path

![image-20240316015426599](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20240316015427NU4hb6.png)

题目中需要剪枝，思路就是下面这个 `n-(k-path.length)+1`

![image-20240318010841931](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/2024031801084252jkEv.png)



```js
var combine = function(n, k) {

    let ans=[]
    function backtrace(curIndex,path){
        // 最后一层
        if (path.length===k){
            ans.push(path.slice())
            return
        }

        // 其余任意层
        // 是否选curIndex位置的数字，加入path

				// 在当其层，restLen是凑够k个，还剩余的个数
        let restLen= k-path.length
        // 这个if做了枝剪，符合的递归才会创建
        // n-restLen+1是 最后一个符合条件数的到第1个数的长度
        // (n-restLen+1)-1 是把长度变成索引
        if (curIndex<=(n-restLen+1)-1){
            // 不加入
            backtrace(curIndex+1,path)

            // 加入
            path.push(curIndex+1) // curIndex+1 是 curIndex 位置的数字
            backtrace(curIndex+1,path)
            path.pop()
        }

    }

    backtrace(0,[])

    return ans

};
```

回溯2：从答案角度，答案的curIndex位置可能的值 ，for循环枚举出来（curIndex-1位置为2是，枚举出来的是2后面的数，否则就有重复了，详见上面的图）

```js
var combine = function(n, k) {

    let ans=[]
    function backtrace(curIndex,path){
        // 最后一层
        if (path.length===k){
            ans.push(path.slice())
            return
        }

        // 其余任意层
        let restLen= k-path.length
        for (let i=curIndex;i<=(n-restLen+1)-1;i++){
            path.push(i+1) // 当前层 for 循环把所有可能都枚举了
            backtrace(i+1,path)
            path.pop()
        }

    }

    backtrace(0,[])

    return ans

};
```

##### [216. 组合总和 III](https://leetcode.cn/problems/combination-sum-iii/)

题目

```js
//找出所有相加之和为 n 的 k 个数的组合，且满足下列条件：
//
//
// 只使用数字1到9
// 每个数字 最多使用一次
//
//
// 返回 所有可能的有效组合的列表 。该列表不能包含相同的组合两次，组合可以以任何顺序返回。
//
//
//
// 示例 1:
//
//
//输入: k = 3, n = 7
//输出: [[1,2,4]]
//解释:
//1 + 2 + 4 = 7
//没有其他符合的组合了。
//
// 示例 2:
//
//
//输入: k = 3, n = 9
//输出: [[1,2,6], [1,3,5], [2,3,4]]
//解释:
//1 + 2 + 6 = 9
//1 + 3 + 5 = 9
//2 + 3 + 4 = 9
//没有其他符合的组合了。
//
// 示例 3:
//
//
//输入: k = 4, n = 1
//输出: []
//解释: 不存在有效的组合。
//在[1,9]范围内使用4个不同的数字，我们可以得到的最小和是1+2+3+4 = 10，因为10 > 1，没有有效的组合。
//
//
//
//
// 提示:
//
//
// 2 <= k <= 9
// 1 <= n <= 60
//
//
// Related Topics 数组 回溯 👍 812 👎 0

```

回溯：输入角度，选不选

输入角度第一个解法是每凑够一个path才判断一次

而第二种解法将sum作为参数，每次都计算，不符合要求的分支被提前剪枝，理论性能更优秀。推荐第二种方法，在递归构成中剪枝

```js
var combinationSum3 = function(k, n) {
    let ans=[]
    function backtrace(startIndex,path){
        // 最后一层
        if (path.length===k){
          	// 这里计算了一下path元素之和是否为n
            let temp=0
            for (let i=0;i<k;i++){
                temp+=path[i]
            }
            if (temp===n){
                ans.push(path.slice())
            }

            return
        }

        // 其余任意层
        if(startIndex<=(9-(k-path.length)+1)-1){//剪枝。与77剪枝思路一致
            // 不选
            backtrace(startIndex+1,path)

            // 选
            path.push(startIndex+1)
            backtrace(startIndex+1,path)
            path.pop()

        }

    }
    backtrace(0,[])
    return ans
};


// 也可以把数组求和的sum，一层一层传下去。比上面多了一个剪枝规则
var combinationSum3 = function(k, n) {

    let ans=[]
    function backtrace(startIndex,sum,path){
        // 最后一层
        if (path.length===k){
            if (sum===n){
                ans.push(path.slice())
            }

            return
        }

        // 其余任意层
        if(startIndex<=(9-(k-path.length)+1)-1){//剪枝。与77剪枝思路一致
            // 不选
            backtrace(startIndex+1,sum,path)

            // 选
            if (sum<=n){//剪枝。如果path元素和超过了n，不符合题意需要剪枝下
                path.push(startIndex+1)
                sum+=(startIndex+1)
                backtrace(startIndex+1,sum,path)
                path.pop()
                sum-=(startIndex+1)
            }


        }

    }
    backtrace(0,0,[])
    return ans
};

```

答案角度：剩下的选一个加入path，for循环剩下的，把所有答案尝试下

```js
var combinationSum3 = function(k, n) {

    let ans=[]
    function backtrace(startIndex,sum,path){
        // 最后一层
        if (path.length===k){
            // 这里计算了一下path元素之和是否为n

            if (sum===n){
                ans.push(path.slice())
            }
            return
        }

        // 其余任意层
        for (let i=startIndex;i<=(9-(k-path.length)+1)-1;i++){//剪枝
            if(sum<=n){// 剪枝
                path.push(i+1)
                sum+=(i+1)
                backtrace(i+1,sum,path)
                path.pop()
                sum-=(i+1)

            }
        }
    }
    backtrace(0,0,[])
    return ans
};
```

##### [22. 括号生成](https://leetcode.cn/problems/generate-parentheses/)

问题

```js
//数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。 
//
// 
//
// 示例 1： 
//
// 
//输入：n = 3
//输出：["((()))","(()())","(())()","()(())","()()()"]
// 
//
// 示例 2： 
//
// 
//输入：n = 1
//输出：["()"]
// 
//
// 
//
// 提示： 
//
// 
// 1 <= n <= 8 
// 
//
// Related Topics 字符串 动态规划 回溯 👍 3532 👎 0

```

回溯解法：

从输入角度，选`( `或者选 `)`

原本我的解法是在最后一层中通过栈来判断是否满足括号匹配（有左括号就入栈，遇到右括号就出栈，最后栈为，则证明括号匹配）。递归过程中仅仅剪枝了 **右括号数<左括号数，才能加入有括号** 这一个条件，结果Maximum call stack size exceeded（栈溢出了）

看了题解后发现，还要剪枝左括号、右括号都<n，这时候path就一定是满足括号匹配的了，虽然不知道为什么但是自己归纳了一下，确实找不到反例

```js
var generateParenthesis = function(n) {
    let ans=[]
    // curIndex 当其第几个元素
    // leftBracketCount 左括号的个数。与216输入视角的第二种解法思路一样，通过参数在各层之间统计数据，提前剪枝
    
    // path 收集路径上的节点
    function backtrace(curIndex,leftBracketCount,path){
     
        // 最后一层
        if (curIndex===2*n){
            ans.push(path.join(''))
          	return
        }

        // 其余任意层

        // 选(
        if (leftBracketCount<n){// 剪枝
            path.push('(')
            leftBracketCount++
            backtrace(curIndex+1,leftBracketCount,path)
            path.pop()
            leftBracketCount--
        }



        // 选)
       const rightBracketCount= path.length-leftBracketCount
        if (rightBracketCount<n&&rightBracketCount<leftBracketCount) {//剪枝，只有左括号数>右括号数，才仍加入右括号
            path.push(')')
            backtrace(curIndex + 1, leftBracketCount, path)
            path.pop()
        }


    }

    backtrace(0,0,[])

    return ans
}
```

从答案视角：

[题解地址](https://leetcode.cn/problems/generate-parentheses/solutions/2071015/hui-su-bu-hui-xie-tao-lu-zai-ci-pythonja-wcdw) 枚举左括号的位置，没太看明白，后续研究下

#### 排列型

##### [6. 全排列](https://leetcode.cn/problems/permutations/)

从输入角度，每个位置只能有nums.length个可能（剪枝掉一些情况，实际会小于这个值）

```js
var permute = function(nums) {
    let ans=[]
    function backtrace(curIndex,path){
        // 最后一层
        if (curIndex===nums.length){
            ans.push(path.slice())
          	return
        }

        // 其余任意层
        for (let val of nums){
            if (!path.includes(val)){ // 剪枝 。例如 [1,x,x]，第一位是1了，后面两位就不能出现1了
                path.push(val)
                backtrace(curIndex+1,path)
                path.pop()
            }

        }


    }
    backtrace(0,[])
    return ans
};
```

排列型问题，curIndex位置应该是在剩余集合中选元素。例如 [1,x,x]，第一位是1了，后面两位就不能出1了。后面一位，只用枚举nums中就要剔除1剩余的元素

上面解法用户include方法判断，只枚举path中不存在的元素

我们还可以利用 **递归的入参通讯，把剩余数据传递到每一层**

题目说了nums内容不重复，所以可用set，但是该思路用JS实现会超时

```js
var permute = function(nums) {
    let ans=[]
    function backtrace(curIndex,restSet,path){
        // 最后一层
        if (curIndex===nums.length){
            ans.push(path.slice())
            return
        }


        // 其余任意层
        for (let val of restSet){
            path.push(val)
            restSet.delete(val)
            backtrace(curIndex+1,restSet,path)
            path.pop()
            restSet.add(val)
        }


    }
    backtrace(0,new Set(nums),[])
    return ans
};
```

思路是一样的，我们也可以不使用set，使用一个数组记录是否访问过。 visitList[i]为true，代表nums[i]被访问过

```js
var permute = function(nums) {
    let ans=[]
    function backtrace(curIndex,visitList,path){
        // 最后一层
        if (curIndex===nums.length){
            ans.push(path.slice())
            return
        }


        // 其余任意层
        for (let index in visitList){
            if (visitList[index]){
                path.push(nums[index])
                visitList[index]=false
                backtrace(curIndex+1,visitList,path)
                path.pop()
                visitList[index]=true
            }


        }


    }


    const visitList = new Array(nums.length).fill(true)
    backtrace(0,visitList,[])
    return ans
};
```

## 动态规划

记忆化搜索=递归+保存每一层递归结果

以下图斐波那契递归为例子，递归会将所有可能尝试一遍，其中存在大量重复的。我们可以将结果存在下来，来提高性能

![image-20240323010711645](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/202403230107150fQ8of.png)

因为要时间记忆化（存储）每层结果，所以必须使用**return通讯**，将每层的结果返回出来并存储



**动态规划**其实就是记忆化搜索的一种形式

### [198. 打家劫舍](https://leetcode.cn/problems/house-robber/)

题目

```js
//你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上
//被小偷闯入，系统会自动报警。
//
// 给定一个代表每个房屋存放金额的非负整数数组，计算你 不触动警报装置的情况下 ，一夜之内能够偷窃到的最高金额。
//
//
//
// 示例 1：
//
//
//输入：[1,2,3,1]
//输出：4
//解释：偷窃 1 号房屋 (金额 = 1) ，然后偷窃 3 号房屋 (金额 = 3)。
//     偷窃到的最高金额 = 1 + 3 = 4 。
//
// 示例 2：
//
//
//输入：[2,7,9,3,1]
//输出：12
//解释：偷窃 1 号房屋 (金额 = 2), 偷窃 3 号房屋 (金额 = 9)，接着偷窃 5 号房屋 (金额 = 1)。
//     偷窃到的最高金额 = 2 + 9 + 1 = 12 。
//
//
//
//
// 提示：
//
//
// 1 <= nums.length <= 100
// 0 <= nums[i] <= 400
//
//
// Related Topics 数组 动态规划 👍 2946 👎 0

```

回溯：这题用回溯从输入角度会超时，因为回溯用的是**递归入参数通讯**，所以没法记忆化每层的结果

尝试剪枝仍然超时

```js
var rob = function(nums) {

    let max=0
    function backtrace(curIndex,sum){
        // 最后一层
        if (curIndex>=nums.length){
            max=Math.max(sum,max)
            return
        }

        // 其余层
        if (curIndex<=nums.length-1){
            // 选
            sum+=nums[curIndex]
            backtrace(curIndex+2,sum)
            sum-=nums[curIndex]

            // 不选
            backtrace(curIndex+1,sum)
        }


    }
    backtrace(0,0)

    return max
};
```

用最经典的递归思路，加上记忆化，就不会超时了

```js
var rob = function(nums) {

    let cache=new Array(nums.length).fill(-1)
    function recursion(endIndex){
        // 最后一层
        if (endIndex<0){
            return 0
        }

        // 其余层

        if (cache[endIndex]===-1){
            cache[endIndex] = Math.max(recursion(endIndex-1),recursion(endIndex-2)+nums[endIndex])
        }
        return cache[endIndex]
        
    }

    return recursion(nums.length-1)
};
```

其实这等同于动态规划的思路

```js
var rob = function(nums) {
    if (nums.length===1){
        return nums[0]
    }

    let dp=new Array(nums.length).fill(-1)
    dp[0]=nums[0]
    dp[1]=Math.max(nums[0],nums[1])
    //因为地推中dp[i-2]，i最小就是2，所以从2开始
    for (let i=2;i<nums.length;i++){
       dp[i]= Math.max(dp[i-1],dp[i-2]+nums[i])
    }
    return dp[dp.length-1]

};
```

### 背包问题

有0-1背包、完全背包两类问题

* 0-1背包

  ```
  Capacity:背包容量
  w[i]: 第i件物品的体积
  v[i]: 第i件物品的价值
  
  求：所选物品不超过Capacity的情况下，获取最大价值
  ```

  ```js
  思路：枚举选与不选两种可能，
  ```

  ![image-20240325010454074](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20240325010455vY47lO.png)

  





## 深度/广度优先

![image-20240311235231416](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20240311235231eneoRX.png)

**广度优先（BFS）**

![image-20240311235935826](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20240311235936isP9Zr.png)

需要辅助队列

思想：从根节点开始寻找子节点，先遍历寻找兄弟节点，依次从上往下，按层级依次搜索

代码实现：根节点入队，之后出队节点x，会将其左右子节点入队，然后继续循环出队，入队子节点的流程，直到队列为空

模拟过程：

* 第一次入队根节点  1   【1】
* 1 出队，2、3入队  【2、3】
* 2 出队 ，4、5入队  【3、4、5】
* 3出队 ， 6、7入队 【4、5、6、7】
* 4出队，无子节点入队了
* 5出队
* 6出队
* 7出队

模板：

```js
/**
 * function ListNode(val) {
 *     this.val = val;
 *     this.left = null;
 *		 this.right = null;
 * }
 */

function bfs(root){
  let queue=[root.val]
  while(queue.length!==0){
    // temp 不断遍历整个树
    const temp=queue.shift()
    if(temp.left){
      queue.push(temp.left)
    }
    if(temp.right){
      queue.push(temp.right)
    }  
  }
}
```



**深度优先（DFS）**

![image-20240312000421191](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20240312000421fmWqDF.png)

需要辅助栈（使用递归DFS函数的思路，可以不用辅助栈）

思想：从根开始，遇到一个节点，就先查询的它未被访问过的子节点，如果子节点还有未被访问过的子节点就继续往下寻找直到最后没有为止，再从根子节点的兄弟节点开始依次向下寻找节点

代码实现：根节点入栈，如果有子节点（优先入栈左孩子）就记录下下访问过后，继续入栈。直到没有子节点可以入栈了，就开始出栈每一个出栈的节点检查其是否还有未被访问过的孩子，如果有就录下访问过后，入栈该孩子节点，直到栈空结束

模拟过程：

* 1入栈 【1】
* 2入栈 【1、2】
* 4入栈 【1、2、4】
* 没有可以入栈的子节点了，4出栈 【1、2】
* 2出栈，2有右子节点，所以5入栈 【1、5】
* 出栈【1】
* 3入栈【1、3】
* 6入栈【1、3、6】
* 6出栈【1、3】
* 3出栈，3有右子节点，所以7入栈 【1、7】
* 7出栈
* 1出栈

模板：

```js
/**
 * function ListNode(val) {
 *     this.val = val;
 *     this.left = null;
 *		 this.right = null;
 * }
 */


```



## 数组

### 总结

* 283 数组挑出2个阵营
* 75 数组挑出3个阵营 

### [283. 移动零](https://leetcode.cn/problems/move-zeroes/)

![image-20230625235011335](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/LeetCode/20230625235011%20.png)

考虑边界

```
输入：[1]

输出：[1]
```

方式一：时间复杂度o(n)

挑出非零值，由于[0,j-1]都是非零值，所以手动将[j,最后]补零

```js
var moveZeroes = function(nums) {
    //i能按照顺序一直把非零的数放到最前面，这会导致前面的都是非零值，j记录了[0,j-1]都是非零值
    let j=0 
    let len=nums.length
    for(let i=0;i<len;i++){
        if(nums[i]!==0){ 
            nums[j]=nums[i]
            j++
        }
        
    }

    for(;j<=len-1;j++){
        nums[j]=0
    }

    return nums
};
```

方式二：**双指针法**。时间复杂度o(n)，但是只循环一次

right按数组顺序遍历，找到第一个不为零的（right前都是零）和前面的零交换。交换后，left向后移1位，表示[0,j-1]都是交换过去的非零值

```js
let left=0,right=0
while(right<nums.length){
    if(nums[right]!==0){
        let temp=nums[left]
        nums[left]=nums[right]
        nums[right]=temp

        left++
    }
    right++

}
return nums
```

### [75. 颜色分类](https://leetcode.cn/problems/sort-colors/)

**双指针法**

```js
var sortColors = function(nums) {

    // 利用快排的思想
    // [0,left) 都是0
    // [left,i) 都是1 (i是从0开始++的，s[i]相当于视口，判断其值并放入对应区间)
    // (right,nums.length] 都是2
    function swap(nums,left,right){
        temp=nums[left]
        nums[left]=nums[right]
        nums[right]=temp
    }

    let left=0,right=nums.length-1
    let i=0


    while(i<right){
        if(nums[i]===0){
            swap(nums,left,i)

            left++
            // 换到i的值一定是 1，可以放心++
            i++
        }
        if(nums[i]===1){
            i++
        }
        if(nums[i]===2){
            // 交换
            swap(nums,i,right)

            right--
            // 注意这里没有i++，换到i的值有可能还是2
        }

    }

};
```





### [167.两数之和 II - 输入有序数组](https://leetcode.cn/problems/two-sum-ii-input-array-is-sorted/)

循环解决

```js
var twoSum = function(numbers, target) {
    let len=numbers.length
    for(let i=0;i<len;i++){
        for(let j=0;j<len;j++){
            if(numbers[i]+numbers[j]===target&&i!==j){
                return [i+1,j+1]
            }
        }
    }
};
```

**二分法**

题目强调有序数组

### [1.两数之和](https://leetcode.cn/problems/two-sum/)

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    let m={}
    for(let index in nums){
        let curItem=nums[index]
        if(m[target-curItem]!==undefined){
            return [index,m[target-curItem]]
        }else{
            m[curItem]=index
        }
    }
};
```



### [209. 长度最小的子数组](https://leetcode.cn/problems/minimum-size-subarray-sum/)

滑动窗口

```js
```



### [350. 两个数组的交集 II](https://leetcode.cn/problems/intersection-of-two-arrays-ii/)

map计数器。原本想要将数据都放入map中计数，最后判断map[key]>0的元素，但是需要考虑下面的情况

```text
[1,1,2,3]与 [1,1]

==>[1,1]
```

代码：

```js
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersect = function(nums1, nums2) {
    let res=[]
    //将长度小的赋值给num1.这里创建的map也小
    if(nums1.length>nums2.length){
        [nums1,nums2]=[nums2,nums1]
    }

    let map={}
    //用num1建立计数器
    for(value of nums1){
        if(map[value]){
            map[value]++
        }else{
            map[value]=1
        }
    }

    //遍历nums
    for(let value of nums2){
        if(map[value]>0){ //num2中元素在map中有
            map[value]-- //计数器减1
            res.push(value) //加入res
        }
    }
    return res
};
```

### [88. 合并两个有序数组](https://leetcode.cn/problems/merge-sorted-array/)

双指针

```js
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {
    let i=m-1,j=n-1
    let lateIndex=n+m-1
    while(i>=0&&j>=0){
        if(nums1[i]>nums2[j]){
            nums1[lateIndex]=nums1[i]
            i--
        }else{
            nums1[lateIndex]=nums2[j]
            j--
        }
        lateIndex--
    }


    //num2剩下了
    while(j>=0){
            nums1[lateIndex]=nums2[j]
            lateIndex--
            j--
    }
    
};
```

### [LCR 007. 三数之和](https://leetcode.cn/problems/1fGaJU/)

想要用指针，数组先有序

for循环，每次固定一个数据。x[左指针.....右指针]。两个指针对撞

特征：数组+有序

```js
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  const len = nums.length;
  //1、从小到大
  num = nums.sort((a, b) => {
    return a - b;
  });

  let left, right;
  let res = [];
  //2、例子：[1,1,1] i是第3个数，left=i+1就是第四个数，会出现数组越界。所以遍历到【0，len-2】
  for (let i = 0; i < len - 1; i++) {
    //3、重复跳过
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue;
    }
    left = i + 1;
    right = len - 1;
    while (left < right) {
      if (nums[i] + nums[left] + nums[right] > 0) {
        right--;
      } else if (nums[i] + nums[left] + nums[right] < 0) {
        left++;
      } else {
        res.push([nums[i], nums[left], nums[right]]);
        left++;
        right--;

        //3、 处理左指针元素重复的情况
        while (left < right && nums[left] === nums[left - 1]) {
          left++;
        }

        //3、 处理右指针元素重复的情况
        while (left < right && nums[right] === nums[right + 1]) {
          right--;
        }
      }
    }
  }

  return res;
};
```



### [905. 按奇偶排序数组](https://leetcode.cn/problems/sort-array-by-parity/)



### [347. 前 K 个高频元素](https://leetcode.cn/problems/top-k-frequent-elements)

暴力

```js
var topKFrequent = function(nums, k) {
  // hash计数
  let hash={}

  for(let value of nums){
    if(!hash[value]){
      hash[value]=1
    }else {
      hash[value]++
    }
  }

  //[ [key,value],.... ]
  let entriesList= Object.entries(hash)
  entriesList.sort((a,b)=>b[1]-a[1]) // 按次数从大到小排序

  return entriesList.slice(0,k).map(item=>item[0]) // 截取前k个，返回值

};
```

前k个，可以用堆实现，时间复杂度o(nlogn)，但是JS中需要自己实现堆

### [692. 前K个高频单词](https://leetcode.cn/problems/top-k-frequent-words/)

```js
var topKFrequent = function(words, k) {

    // hash计数
    let hash={}

    for(let value of words){
        if(!hash[value]){
            hash[value]=1
        }else {
            hash[value]++
        }
    }

    //[ [key,value],.... ]
    let entriesList= Object.entries(hash)
    entriesList.sort((a,b)=>{
        if(b[1]===a[1])
            return a[0].localeCompare(b[0]) 
      			// 如果 string 在字典顺序上位于 compareString 之前，则返回负数
        return b[1]-a[1]
    }) // 按次数从大到小排序

    return entriesList.slice(0,k).map(item=>item[0]) // 截取前k个，返回值
};
```

### [933. 最近的请求次数](https://leetcode.cn/problems/number-of-recent-calls)

其实这里是双端队列

```js
RecentCounter.prototype.ping = function(t) {
    this.queue.push(t)
    while(this.queue[0]<t-3000){
        this.queue.shift()
    }
    return this.queue.length
};
```

### [622. 设计循环队列](https://leetcode.cn/problems/design-circular-queue/)

数据结构课本讲过

核心：front与rear指针重合时，无法区分是空还是满。所以，需要空出来一个位置。长度为n的循环队列，使用长度n+1的数组存储

* 空  front=rear，
* 满  front=（rear+1）%n，n是长度

```
```





## 栈

### [739. 每日温度](https://leetcode.cn/problems/daily-temperatures/)

单调栈思路

```
```



### [20. 有效的括号](https://leetcode.cn/problems/valid-parentheses)

```js
var isValid = function(s) {
  let stack=[]
  for(let i=0;i<s.length;i++){
    if(s[i]==='('||s[i]==='{'||s[i]==='['){
      stack.push(s[i])
    }
    if(s[i]===')'&&stack.pop()!=='('){
      return false
    }
    if(s[i]==='}'&&stack.pop()!=='{'){
      return false
    }
    if(s[i]===']'&&stack.pop()!=='['){
      return false
    }
  }
  // 最后栈为空，才是有效的串
  return stack.length===0?true:false

};
```

简化下

```js
var isValid = function(s) {
  let pairs=new Map([
    ['(',')'],
    ['{','}'],
    ['[',']']
  ])
  let stack=[]
  for(let i=0;i<s.length;i++){
    if(pairs.has(s[i])){ // 左括号
      stack.push(s[i])
    }else{// 右括号
      if(stack.length===0||pairs.get(stack[stack.length-1])!==s[i]){
        // 特别注意：当输入为)时，栈里为空，取栈顶会报错
        return false
      }
      stack.pop()//栈里有数据，且栈顶和右括号匹配上，这时候就pop
    }
  }
  return stack.length===0?true:false

};
```

### [232. 用栈实现队列](https://leetcode.cn/problems/implement-queue-using-stacks)

```js
var MyQueue = function() {
  this.stack1=[]
  this.stack2=[]
};

/**
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function(x) {
  this.stack1.push(x)
};

/**
 * @return {number}
 */
MyQueue.prototype.pop = function() {
  if(this.stack2.length===0){
    while (this.stack1.length!==0){
      this.stack2.push(this.stack1.pop())
    }
  }

  return this.stack2.pop()
};

/**
 * @return {number}
 */
MyQueue.prototype.peek = function() {
  if(this.stack2.length===0){
    while (this.stack1.length!==0){
      this.stack2.push(this.stack1.pop())
    }
  }

  const res=this.stack2.pop()
  this.stack2.push(res)
  return res
};

/**
 * @return {boolean}
 */
MyQueue.prototype.empty = function() {
  return this.stack1.length===0&&this.stack2.length===0
};
```



## 字符串

涉及回文，可以优先思考使用left、right指针指向字符串的两侧

通过 while限制条件，满足条件可以缩小范围

直到left、right相遇为止（也可能是其他条件结束）

### [5. 最长回文子串](https://leetcode.cn/problems/longest-palindromic-substring/)

暴力枚举法：

```js
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {

    // 校验是否为回文子串
    function validPalindrome(s,left,right){
        while (left<=right){//注意：等于情况
            if(s[left]!==s[right]){
                return false
            }
            left++
            right--
        }
        return true
    }

    // 最大回文子串长度
    let maxCount=1// 一个字母，也是一个回文子串。所以maxCount初始为1
    // 最大回文子串开始索引
    let begin=0


    for(let i=0;i<s.length-1;i++){// 注意：这里到倒数第二位为止
        for(let j=i;j<s.length;j++){
            if(validPalindrome(s,i,j)){
                let span=j-i+1
                if(span>maxCount){
                    maxCount= span
                    begin=i
                }

            }
        }
    }

    return s.slice(begin,begin+maxCount)

};
```

中心扩散法：有对称性的可以用

```js
var longestPalindrome = function(s) {
    // xyx（回文串为奇数） 、 xx（回文串为偶数） 两种情况

    // 最大回文子串长度
    let maxCount=1// 一个字母，也是一个回文子串。所以maxCount初始为1
    // 最大回文子串开始索引
    let begin=0

    let n=s.length


    // 从中心扩展开
    function h(left,right){
        // (left>=0||right<=n-1) 防止溢出数组
        while((left>=0||right<=n-1) && s[left]===s[right]){
            if(right-left+1>maxCount){
                maxCount=right-left+1
                begin=left
            }

            left--
            right++

        }
    }

    for(let i =0;i<n;i++){
        // 假设i为最长回文子串的中心
        // 如果为奇数
        h(i-1,i+1) // i=0时，i-1溢出边界；i=n-1时，i+1溢出边界；都需在h中处理
        // 如果为偶数
        h(i,i+1)
    }
    return s.slice(begin,begin+maxCount)
};
```



动态规划法：

![image-20240115131407055](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20240115131408ZP4HK2.png)

状态转移方程：

```js
// 初始：i指向target数组最左侧，j从i到target.length
// dp[i][j] 表示 i~j 之间是否为回文子串
dp[i][j]= target[i]===target[j]&&(j-i<=1||dp[i+1][j-1]) //j-i<=1  表示i、j之间只有一个数 + i、j指向一个数，直接算为回文
```



### [680. 验证回文串 II](https://leetcode.cn/problems/valid-palindrome-ii/)

删除一个如何做？ 验证如果 i~j 之间的字符串不是回文，不要结束，再增加一个判断 即 i+1~j 和 i~j-1判断是否为回文

这个比较简单的点在于最多删除一个。301题难度高，是因为不限制删除个个数

```js
var validPalindrome = function(s) {
    // 是否为回文字符串
    function isPalindrome(s,left,right){
        while (left<=right){
            if(s[left]!==s[right]){
                return false
            }
            left++
            right--
        }
        return true
    }

    let left=0,right=s.length-1
    while (left<=right){
        // 找到第一个不相等的，删除这个。计算剩下的是否为回文字符串
        if(s[left]!==s[right]){
            // 这里left+1、rigth-1可能会越界，但是这种情况只有长度为1时会发生，s[0]一定等于s[0]，不会进入这个逻辑里；
            // 只要长度大于1，left+1、rigth-1的范围就会向内缩
            return  isPalindrome(s,left+1,right)||isPalindrome(s,left,right-1)
        }
        left++
        right--
    }
    return true

};
```

### [32. 最长有效括号](https://leetcode.cn/problems/longest-valid-parentheses/)

错误解法：这种解法不是求最长的子串，子串需要连续

用例：`"()(()"`，代码输出4，实际结果为2

```
var longestValidParentheses = function(s) {
    let stackList=[]
    for(let i=0;i<s.length;i++){
        if(s[i]==='('){ // 遇到（
            stackList.push('(')
        }else {//遇到 ）
            if(stackList.length>0&&stackList[stackList.length-1]==='('){
                stackList.pop()
            }else{
                stackList.push(')')
            }
        }
    }
    return s.length-stackList.length
};
```

解答：

```js
var longestValidParentheses = function(s) {
    // 栈是做括号匹配的好帮手，但是我们需要找到合法的连续子串，栈无法记录是否连续
    // 这里我们使用
  	// 1、栈，入栈元素为s中字母的索引。（ s[index]才能获取实际元素 ）
  	// 2、辅助数组asset=[0,1,1,1,0]，1表示可以匹配的括号，0表示不可匹配的括号
    let stack=[]
    let asset=[]

    for (let i=0;i<s.length;i++){
        if(s[i]==='('){
            stack.push(i)
            asset[i]=0
        }else{
          	// 这里比较绕，如果当前是 ），如果栈顶是（，则直接出栈
            let tackTop=stack[stack.length-1] // 栈里是字符串索引

            if(i>=1&&s[tackTop]==='('){
                stack.pop()
                asset[i]=1
                asset[tackTop]=1
            }else{
                stack.push(i)
                asset[i]=0
            }
        }
    }

    let maxCount=0
    let temp=0

    for (let i=0;i<asset.length;i++){
        if(asset[i]===1){
            temp++
            maxCount=Math.max(maxCount,temp)
        }else {
            temp=0
        }

    }

    return maxCount

};
```



动态规划解法：略

### [301. 删除无效的括号](https://leetcode.cn/problems/remove-invalid-parentheses/)（难度大，跳过）

返回所有最优的解

bfs 广度优先遍历

视频：https://xiaochen1024.com/series/6196129fc1553b002e57bef5/6197453ddafc4b002e653728 第一个题



### [387. 字符串中的第一个唯一字符](https://leetcode.cn/problems/first-unique-character-in-a-string/)

```js
var firstUniqChar = function(s) {
    // 哈希计数
    // 因为这个题是返回索引，并不是字符。所以map的value除了计数外还有存索引
    let m= new Map()
    for(let i=0;i<s.length;i++){
        if(m.has(s[i])){
            let {count,index}=m.get(s[i])
            m.set(s[i],{
                count:count+1,
                index:index+','+i
            })
        }else {
            m.set(s[i],{
                count:1,
                index:i
            })
        }
    }
    //
    for(let value of m.values()){
        if(value.count===1){
            return value.index
        }
    }
    return -1


};
```

### [14. 最长公共前缀](https://leetcode.cn/problems/longest-common-prefix/)（待补充前缀树解法）

横向扫描：

```js
var longestCommonPrefix = function(strs) {
  	// 为啥排序? 用例： ['abc','ab']，我们应该以最短的作为基准，在最后return sortList[0]是返回的是应该是ab
    const sortList=strs.sort((a,b)=>a.length-b.length)

    let minLen=200
    for (let i=0;i<sortList.length;i++){
        minLen=Math.min(minLen,sortList[i].length)
    }

    for(let j=0;j<=minLen;j++){//索引位置
        let temp=''
        for(let i=0;i<sortList.length;i++){//遍历所有子元素
            if(i===0){
                temp=sortList[0][j]
                //0或1个元素情况： ['']结果'' 、 ['a']结果'a'的情况
                if(sortList.length<=1){
                    return sortList[0]
                }
            }else{
                if(temp!==sortList[i][j]){
                    return sortList[0].slice(0,j)
                }
            }
        }
    }
    return sortList[0]

};
```



前缀树（字典树）

gin框架的路由使用的就是前缀树

```js
```



### [151. 反转字符串中的单词](https://leetcode.cn/problems/reverse-words-in-a-string/)

这中解法依赖于JS中存在的trim函数，去除首尾空格

slplit函数分割

```js
"1 2".split(" ")  // ['1','2']

"1  2".split(" ")  //1与2之间两个空格， ['1','','2']
```

解法：

```js
var reverseWords = function(s) {
    // 这里需要先把字符串首尾的空格去掉。 
    // 例如：输入"   a b c"，如果不加trim，a不是arr中的第一个元素，无法命中if(i===0)逻辑，最后结果会多一个空格： "c b a "
    const arr=s.trim().split(' ') 
    let res=''
    for (let i=arr.length-1;i>=0;i--){
        if(arr[i]===''){
            continue
        }
        if(i===0){
            res+=arr[0].trim()
        }else {
            res+=`${arr[i].trim()} `
        }

    }
    return res
};
```

快慢指针

```js
var reverseWords = function(s) {
    s=s.trim()
    let resArr=[]

    let left=s.length-1
    let right=left

    while(left>=0){
        while (left>=0&&s[left]!==' '){
            left--
        }
        resArr.push(s.slice(left+1,right+1))
        while (left>=0&&s[left]===' '){
            left--
        }
        right=left
    }

		// "xxx yyy zzz"，由于最后一个单词没有空格，其他单词有尾空格，还需要判断，不如直接用join
    return resArr.join(' ')

};
```

### [557. 反转字符串中的单词 III](https://leetcode.cn/problems/reverse-words-in-a-string-iii)

解答：

```js
var reverseWords = function(s) {
    let res=[]
    let arr=s.split(' ')
    arr.forEach(item=>{
        res.push(item.split('').reverse().join(''))
    })
    return res.join(' ')
};
```

双指针

```js
var reverseWords = function(s) {
    let len=s.length
    let left=0,right=0

    let res=''

    function reverseStr(s){
        return s.split('').reverse().join('')
    }

    while (right<=len-1){
        while (right<=len-1&&s[right]!==' '){
            right++
        }
        res+=reverseStr(s.slice(left,right))
        while (right<=len-1&&s[right]===' '){
            right++
            res+=' '
        }
        left=right
    }

    return res

};
```



### [1143. 最长公共子序列](https://leetcode.cn/problems/longest-common-subsequence/)

动态规划

```js
dp[i][j] 表示 `text1从第一个到第i个字符` 与 `text2从第一个到第i个字符` 最长公共子串的长度
```

有两种情况： 关键是text1与text2的下一个字符，是否一样。

* 一样的话，公共子序列个数+1
* 不一样的话，需要比较两个情况哪个大

![image-20240119235952587](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20240119235954ZSk85d.png)



解法：与图的索引有些出入，但是思路一致
```js
var longestCommonSubsequence = function(text1, text2) {

    dp=new Array(text1.length).fill(0).map(()=>new Array(text2.length).fill(0))
    // 初始值
    if(text1[0]===text2[0]){
        dp[0][0]=1
    }

		// test1[0]逐一与test2的每一个元素对吧，发现有一样的，后面就都是1了
    for(let i=0;i<text2.length;i++){
        if(text1[0]===text2[i]){
            while (i<text2.length){
                dp[0][i]=1
                i++
            }
            break
        }
    }

    for(let i=0;i<text1.length;i++){
        if(text1[i]===text2[0]){
            while (i<text1.length){
                dp[i][0]=1
                i++
            }
            break
        }
    }

    for(let i=1;i<text1.length;i++){
        for (let j=1;j<text2.length;j++){
            // 这个判断有关很严重的问题
            // 第二次循环 i=2，j=1时，
            if(text1[i]===text2[j]){
                dp[i][j]=dp[i-1][j-1]+1 // 需要初始值dp[0][0]
            }else {
                dp[i][j]=Math.max(dp[i-1][j],dp[i][j-1])// 需要初始值dp[1][0]、dp[0][1]
            }

        }
    }

    return dp[text1.length-1][text2.length-1]

};
longestCommonSubsequence('ezupkr','ubmrapg')
```

### [115. 不同的子序列](https://leetcode.cn/problems/distinct-subsequences/)



```js
dp[i][j] 表示 s[0~(i-1)]包含t[0~(j-1)]的个数

情况1：s[i-1]!==t[j-1] 
	dp[i][j]=dp[i-1][j] // 那直接扣掉s[i-1]对结果一定影响都没有，例子： ab与a，第一个串扣掉b


情况2：s[i-1]===t[j-1]
	s[0~(i-1)]包含t[0~(j-1)]的个数分成两种情况:
		t[0~(j-1)]包含s[i-1]的有a个      a=dp[i-1][j-1] //s[i]===t[j]，需要一下扣掉两个s[i-1]、t[j-1]
		t[0~(j-1)]不包含s[i-1]的有b个    b=dp[i-1][j] // i-1就是扣掉s[i-1]
	两种情况加起来就是 dp[i][j] = a+b = dp[i-1][j-1] + dp[i-1][j]
  	
	
```

解法
```js
var numDistinct = function(s, t) {
    dp=new Array(s.length+1).fill(0).map(()=>new Array(t.length+1).fill(0))
    // 初始值
    dp[0][0]=1 // 空字符串包含1个空字符串

    for(let i=0;i<=s.length;i++){
        // 其实这个在i=0时，已经包含dp[0][0]=1了
        // 空字符串在任何字符串中都出现一次
        dp[i][0]=1
    }

    for (let i=1;i<=s.length;i++){
        for (let j=1;j<=t.length;j++){
            if(s[i-1]!==t[j-1]){
                dp[i][j]=dp[i-1][j]
            }else {
                dp[i][j]=dp[i-1][j]+dp[i-1][j-1]
            }
        }
    }


    return dp[s.length][t.length]
};
```

需要注意:

```
s中第i个字母是s[i-1]，t中第j个字母是t[j-1]

s中前i个字母包含t中前j个字母的个数是 dp[i][j]，也就是dp[0][0]这个位置跳过去了，这是因为考虑了空字符串dp[0][0]是s中空、t中空
```



![image-20240120233449183](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20240120233450cbYG3D.png)

### [125. 验证回文串](https://leetcode.cn/problems/valid-palindrome/)

```js
var isPalindrome = function(s) {

    function isValid(str){
        return /^[A-Za-z0-9]+$/.test(str)
    }

    let left=0,right=s.length-1
    while (left<right){ // 注意这里和下面都不能用left<=right ,输入" "，会出现left=0，right=0，符合left<=right进入循环，会出现left++变为1的情况，这样就数组越界了
        while (left<right&&!isValid(s[left])){// 遇到过这种情况，注意外层while的条件，在内层改变，这种情况必须在内存限制外层的条件left<right。否则，内层一直left++很有可能内部已经不满足left<=right了
            left++
        }
        while (left<right&&!isValid(s[right])){
            right--
        }
        if(s[left].toLowerCase()!==s[right].toLowerCase()){
            return false
        }
        left++
        right--
    }
    return true
};
```

### [796. 旋转字符串](https://leetcode.cn/problems/rotate-string/)

暴力

```js
var rotateString = function(s, goal) {
    let arr=s.split('')

    let len=arr.length


    for (let i=0;i<len;i++){
        if(arr.join('')===goal){
            return true
        }
        arr.push(arr.shift())
    }

    return false

};
```

官方解答

如果符合条件，那么s长度一定等于goal，且s+s的连续子串一定包含goal

```js
var rotateString = function(s, goal) {
    return s.length === goal.length && (s + s).indexOf(goal) !== -1;
};

作者：力扣官方题解
链接：https://leetcode.cn/problems/rotate-string/solutions/1398076/xuan-zhuan-zi-fu-chuan-by-leetcode-solut-4hlp/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```

### [844. 比较含退格的字符串](https://leetcode.cn/problems/backspace-string-compare/)

```js
var backspaceCompare = function(s, t) {
    function actualStr(str){
        let res=[]
        for (let i=0;i<str.length;i++){
            if(str[i]==='#'){
                res.pop()
            }else{
                res.push(str[i])
            }
        }
        return res.join('') // join没有参数，默认使用逗号连接
    }

    if(actualStr(s)===actualStr(t)){
        return true
    }
    return false
};
```



### 394

## 位运算

[leetcode总结](https://leetcode.cn/circle/discuss/CaOJ45/)

![1686879866-VArRlW-Binar_Fundamentals_00](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20240314093709smkIYq.png)

## 补充

很多东西都是大学是数据结构学的，但是时间太过久远了，很多东西都忘记了，这里整理下遇到的吧

### KMP

https://leetcode.cn/circle/discuss/yCI2iS/

看下面例子：

```
// |表示匹配上了，x表示没匹配上

abbaabbaaba  总串
||||||x
abbaaba      子串

// 一般思路是:重新从总串[1]开始继续和子串[0]匹配，这样之前总串[0]与[0]比较的前6位相等的计算就浪费了。可以看下动图
abbaabbaaba  总串

 abbaaba      子串

// KML思路是尽可能少回退比较
// 第一次匹配上了前6位，这前六位是abbaab，他自己和自己有首位有重叠部分
abbaab
		||
		abbaab
		
// 我们直接把		
abbaabbaaba
||||||x
abbaaba // 第一次匹配  
		||  
    abbaaba  // 我们直接子串开头的ab，顶到把"匹配上的串(前6位) 的重叠部分


```

一般思路：

![KMP-前后缀](https://pic.leetcode-cn.com/582531e394be21276cda1339a815dd1f9cd853db912b9c91989e0c7bb1688415.gif)

具体实现参考：https://leetcode.cn/circle/discuss/VMJeMU/

```
```



Go模版：

```js
func KMP(src, pat string) int {
	if pat == "" {
		return 0
	}
	ls := len(src)
	lp := len(pat)
	next := make([]int, lp)
	for i, j := 1, 0; i < lp; i++ {
		for j > 0 && pat[i] != pat[j] {
			j = next[j-1]
		}
		if pat[i] == pat[j] {
			j++
		}
		next[i] = j
	}
	for i, j := 0, 0; i < ls; i++ {
		for j > 0 && src[i] != pat[j] {
			j = next[j-1]
		}
		if src[i] == pat[j] {
			j++
		}
		if j == lp {
			return i - lp + 1
		}
	}
	return -1
}
```



### 前缀树

[208. 实现 Trie (前缀树)](https://leetcode.cn/problems/implement-trie-prefix-tree/)

```
https://mp.weixin.qq.com/s/_4K-zDZgCPvSBmjHbj6GGA
```

```go
package main

import "fmt"

type TrieNode struct {
	//next      [26]*TrieNode // 这个设计很精巧，没有存储单词的值，而是用索引表示。下一个找a，就去next[0]
	next      map[rune]*TrieNode
	passCount int
	end       bool
}
type Trie struct {
	root *TrieNode
}

func NewTrie() *Trie {
	return &Trie{
		root: &TrieNode{},
	}
}

func (t *Trie) Insert(word string) {
	move := t.root
	for _, letter := range word {
		if _, ok := move.next[letter]; !ok {
			//没有,就直接插入
			if move.next == nil {
				move.next = make(map[rune]*TrieNode)
			}
			move.next[letter] = &TrieNode{}
		}
		move = move.next[letter]
		move.passCount++

	}
	move.end = true
}

func (t *Trie) Search(word string) bool {
	move := t.root
	for _, value := range word {
		if _, ok := t.root.next[value]; !ok {
			//没有
			return false
		} else {
			//有
			move = move.next[value]
		}
	}

	if move.end {
		return true
	}
	return false

}

func main() {
	searchStr := []string{"abc", "ac", "c"}

	trie := NewTrie()

	for _, value := range searchStr {
		trie.Insert(value)
	}

	res := trie.Search("ac")

	fmt.Printf("%v", res)

}
```







### 堆(Heap)

https://blog.csdn.net/Twinkle_sone/article/details/129580158

堆一定是完全二叉树，所以可以使用数组数据存储

核心实现：

* 插入节点，向上调整节点 
* 出堆（大顶堆为最大值；小顶堆为最小值）

n个节点构成的堆（完全二叉树）调整时间复杂度为o(nlogn)

```
     0
    / \
   1   2
  / \
 3   4

用数组的索引代表树的节点。实际节点值存储在数组中


节点n 
=>父节点  Math.floor((n - 1) / 2);
=>左子节点 n * 2 + 1;
=>右子节点 (n + 1) * 2 = 左节点 + 1;
```



```js
/**
 *  堆排序
 *  @param Array array 用于初始化的数组
 *  @param Function compareFun 自定义比较函数
 *  @returns {Heap}
 *  */ 
class Heap {
    constructor(array = [], compareFun = null) {
      this.queue = [];
      if (compareFun) {
        this.compareFun = compareFun;
      }
      for (let index = 0; index < array.length; index++) {
        this.push(array[index]);
      }
    }
  	// 默认的比较函数，小顶堆
    compareFun(node1, node2) { // node1是父、node2是子节点
      return node1 < node2;
    }
  	// 取堆顶数据
   	front() {
      if (this.queue.length == 0) return null;
      return this.queue[0];
    }
  	// 出堆
    pop() {
      if (this.queue.length == 0) return null;
      if (this.queue.length == 1) return this.queue.pop();
      const top = this.queue[0];
      this.queue[0] = this.queue.pop();
      this.sink();
      return top;
    }
  	// 入堆
    push(node) {
      this.queue.push(node);
      this.swim();
    }
    //下沉
    sink() {
      let curIdx = 0;
      let minInd = this.getMinInd(curIdx);
      while (this.compareFun(this.queue[curIdx], this.queue[minInd])) {
        [this.queue[curIdx], this.queue[minInd]] = [
          this.queue[minInd],
          this.queue[curIdx],
        ];
        curIdx = minInd;
        minInd = this.getMinInd(curIdx);
      }
    }
    getMinInd(curIdx) {
      let leftInd = curIdx * 2 + 1;
      let rightInd = leftInd + 1;
      let minInd = leftInd;
      if (
        rightInd < this.queue.length &&
        this.compareFun(this.queue[leftInd], this.queue[rightInd])
      )
        minInd = rightInd;
      return minInd;
    }
    //上浮
    swim() {
      let curIdx = this.queue.length - 1;
      let fatherIdx = Math.floor((curIdx - 1) / 2); // 注意：只有一个节点的时候，curIdx、fatherIdx都是0
      while (this.compareFun(this.queue[fatherIdx], this.queue[curIdx])<0) {
        [this.queue[curIdx], this.queue[fatherIdx]] = [
          this.queue[fatherIdx],
          this.queue[curIdx],
        ];
        curIdx = fatherIdx;
        fatherIdx = Math.floor((curIdx - 1) / 2);
      }
    }
   
  }
  
```

