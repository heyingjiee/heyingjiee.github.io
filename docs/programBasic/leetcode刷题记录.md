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



