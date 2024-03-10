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
  * for循环移动right指针时，每轮for循环实际上right都右移了
  * 
* set、hash集合始终记录窗口内的数据(操作窗口时，记得维护set、hash数据)



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

## 递归与分治

递归三元素

* 递归终止条件
* 递归每一层逻辑
* 递归函数及其参数

```js
function recursion(level,param1,param2){
  // 递归终止条件
	if(level>MAX_LEVEL){
    return xxx
  }
  
  // 当前层处理逻辑
  process_data(level,data,...)
        
  // 下一层             
  recursion(level+1,p1,...)
  
  // 重置状态(回溯)
  reverse_state(level)
}
```

例子：

* 阶乘

  ```js
  function factorial(n){
  	if(n===1) return 1
    return n*factorial(n-1)
  }
  ```

  

* 斐波那契 F(n)=F(n-1)+F(n-2)

  ```js
  function fib(n){
    if(n===0||n===1){
      return n
    }
    return fib(n-1)+fib(n-2)
  }
  ```

  



分治：

将大问题拆为小问题，然后逐个解决、合并。例如：快速排序、归并排序

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

### [50. Pow(x, n)](https://leetcode.cn/problems/powx-n/)

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

### [169. 多数元素](https://leetcode.cn/problems/majority-element/)

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

### [124. 二叉树中的最大路径和](https://leetcode.cn/problems/binary-tree-maximum-path-sum/)

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



### 广度优先（BFS）

```
    3
   / \
  9  20
    /  \
   15   7
```

需要辅助队列

思想：从根节点开始寻找子节点，先遍历寻找兄弟节点，依次从上往下，按层级依次搜索

代码实现：根节点入队，之后出队节点x，会将其左右子节点入队，然后继续循环出队，入队子节点的流程，直到队列为空

模拟过程：

* 第一次入队根节点  3   【3】
* 3 出队，9、20入队  【9,20】
* 9 出队 ，没有子节点入队  【20】
* 20出队 ，入队 15、7 【15,7】
* 出队 15
* 出队 7
* 队空结束

### 深度优先（DFS）

需要辅助栈、数组、递归DFS函数

思想：从根开始，遇到一个节点，就先查询的它未被访问过的子节点，如果子节点还有未被访问过的子节点就继续往下寻找直到最后没有为止，再从根子节点的兄弟节点开始依次向下寻找节点

代码实现：根节点入栈，如果有子节点（优先入栈左孩子）就记录下下访问过后，继续入栈。直到没有子节点可以入栈了，就开始出栈每一个出栈的节点检查其是否还有未被访问过的孩子，如果有就录下访问过后，入栈该孩子节点，直到栈空结束

模拟过程：



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

