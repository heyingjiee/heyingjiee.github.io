# Rxjs

最近在看 Rxjs 时，一直在思考如此陡峭的学习曲线，究竟能给业务开发带来多大提升，通过这篇文章[到底什么时候用得上rxjs，总结6个高频rxjs应用场景](https://juejin.cn/post/7379059228105097268)提供的场景发现 Rxjs 的能力还是很强的

学习参考：https://juejin.cn/post/7331676854913351730?searchId=202410120957427D63EE074118EF76217B

## 安装

```shell
pnpm i rxjs
```

## 基本概念

### 角色关系

```js
import {map, Observable} from "rxjs";

let count=0

// 1、可观察对象 Observable，产生数据流 ⚠️ 回调函数observer才是可观察对象
const observable$=new Observable(observer => {
  setInterval(() => {
    observer.next(count++)
  },1000)
})

// 2、pipe 管道处理数据流
observable$.pipe(
   	tap(()=>{ console.log('日志') }), // tap 不做任何数据处理，通常用来输出日志信息
    map(val => val * 2), // map 是操作符，用于映射新的数据值
)

// 3、观察者 Observer ⚠️：subscribe的入参对象是才是观察者
observable$.subscribe({
  next(val){console.log(val)},
  complete(){ clearInterval(timer)},
  error(err){console.log('error',err)}
})
```

**总结**

* Observable

  可通过 next 方法可主动发送值。rxjs 中提供了大量创建Observable 的方式

* pipe

  管道中可传入多个 Operator（操作符），数据流按Operator 的顺序处理数据

* Observer  

  可通过next、complete、error 接收Observable 发出的数据、结束、错误信息

### 观察者类型

#### Cold Observable

⚠️：上例Observable 属于 code Observabel

除去下面提到的 `Hot Observables` ，其余都属于 `Cold Observables` ，即每次订阅时都会重新创建它的生产者，导致重新输出数据流

```js
import { timer } from "rxjs";
import { tap } from "rxjs/operators";

const cold$ = timer(1000)

cold$.subscribe(val => console.log(`Observer 1: ${val}`));
cold$.subscribe(val => console.log(`Observer 2: ${val}`));

// 自这个 Cold Observable 启动，副作用就执行两次，一次是给 subscription

// 输出
// Observer 1: 0
// Observer 2: 0

```

#### Hot Observable

如果 hot`Observable` 不管我们订阅了多少次，副作用将只执行**一次**

在 rxjs 中

* 提供 Subject 类型创建Hot Observable
* 也可以在 pipe 中经过特定操作符将Cold Observable 转化为 Hot Observable

参考：https://juejin.cn/post/7174713617596547132?searchId=2024102515585998DCC4BEE8933D7A7766



## 可观察对象(Observable)

```js
import {Observable} from "rxjs";

let timer=null
let count=0
// 创建 Observable 对象
const observer=new Observable((subscriber)=>{
  timer=setInterval(()=>{
    subscriber.next(count++)
  },1000)
})

// 订阅 Observable 对象
const subscription=observer.subscribe({
  next(val){console.log(val)},
  complete(){ clearInterval(timer)},
  error(err){console.log('error',err)}
})

setTimeout(()=>{
  subscription.unsubscribe()
  clearTimeout(timer)
},10*1000)
```

⚠️ 在 RxJS 中，Observable 是惰性的（lazy）。这意味着在没有订阅的情况下，Observable 不会开始发出数据。只有当某个订阅者调用 `subscribe` 方法时，Observable 才会开始执行其内部的逻辑并发出值。

## 管道(pipe)

`pipe` 是Observable的实例方法，入参是 1 个或多个操作符，可以用于操作数据流

```js
import {map, Observable} from "rxjs";

let count=0
const observer=new Observable(observer => {
  setInterval(() => {
    observer.next(count++)
  },1000)
}).pipe(
    map(val => val * 2), // map 是操作符，用于映射新的数据值
)
observer.subscribe({
  next(val){
    console.log('next -->',val)} // 0 2 6 ...
})
```

实现原理

```js
function pipe(...operators){
	return function(source){
		return operators.reduce((pre,operator)=>operator(pre),source)
	}
}
```



## 操作符(Operator)

### 自定义操作符

实现一个自动去除首位空格的操作符

```js
import {Observable} from "rxjs";

function customOperator(input){
  return new Observable(observer => {
    observer.next(input.replace(/^\s|\s$/,''))
  })
}
customOperator(' hello   ').subscribe({
  next(val){
    console.log('next -->',val)}
})

```

### 创建流

返回值是 Observable 类型

#### 时间

##### interval 

创建的 Observable 每个时间间隔都发出 1 个自增数（从 0 开始）

```js
import {interval} from "rxjs";

const subscription=interval(2000).subscribe({ // ⚠️ 与 JS 一致，先等 2s 才输出第一个元素0
  next(val){console.log(val)},
  complete(){console.log('complete')},
  error(err){console.log('error',err)}
})

setTimeout(()=>{
  subscription.unsubscribe()
},10*1000)

// 主动取消订阅不会执行 complete
```

##### timer 

创建的 Observable 根据入参不同有些差异

```js
import {timer} from "rxjs";

// 1 个参数是时间间隔。等待时间间隔后输出 0
timer(3000).subscribe({
  next(val){console.log(val)},
  complete(){console.log('complete')},
  error(err){console.log('error',err)}
}) // 3s 后输出 0 complete

// 参数 1 是起始时间、参数 2 是时间间隔。 Observable 会立即输出 0，后续每隔固定时间发出值（自增 1）
```


##### defer 

cold observable只有被订阅时才返回数据流

但是普通 observable 都是单播的，即每个订阅者都是独立的接收值，互不影响
```js
import { of, Observable } from 'rxjs';

let counter = 0;

const source = new Observable(subscriber => {
  counter++;
  subscriber.next(`Subscription ${counter}`);
});

source.subscribe(value => {
  console.log(value); // 输出 "Subscription 1"
});

source.subscribe(value => {
  console.log(value); // 输出 "Subscription 1"
});
```
虽然 defer 创建的 Observable 还是单播，但是因为其会返回新的 observable，这就使得每次订阅的都是上一次返回的流

```js
import { defer } from 'rxjs';

let counter = 0;

const deferredSource = defer(() => {
  counter++;
  return of(`Subscription ${counter}`);
});

deferredSource.subscribe(value => {
  console.log(value); // 输出 "Subscription 1"
});

deferredSource.subscribe(value => {
  console.log(value); // 输出 "Subscription 2"
});
```

#### 静态数据

⚠️：创建的流按顺序输出数据，且即使数据是异步任务也不会等待完成输出

##### of

```js
import {of} from "rxjs";
const of$=of(10,20,30)
of$.subscribe({
  next(val){console.log(val)},
  complete(){console.log('complete')},
  error(err){console.log('error',err)}
}) 
// 输出 10 20 30 complete
```

##### range

```js
import {range} from "rxjs";
const range$=range(0,3)
range$.subscribe({
  next(val){console.log(val)},
  complete(){console.log('complete')},
  error(err){console.log('error',err)}
}) // 输出 0 1 2 complete
```

##### generate

```js
import {generate} from "rxjs";
const result$=generate({
  initialState:0,
  condition(val){
    return val<3
  },
  iterate(val){
    return val+1
  },
  resultSelector(val){
    return val*1000
  }
})
result$.subscribe({
  next(val){console.log(val)},
  complete(){console.log('complete')},
  error(err){console.log('error',err)}
}) // 输出 0 1000 2000 complete
```

##### from 

注意：form 支持将数组、Promise、Iterable 转为 Observable

```js
import {from} from "rxjs";
const result$=from([1,2,3]) // from(fetch('xxx').then(res=>res.json())) 支持把请求转化为 Observable
result$.subscribe({
  next(val){console.log(val)},
  complete(){console.log('complete')},
  error(err){console.log('error',err)}
}) // 输出 1 2 3 complete
```

#### 事件

##### fromEvent

```js
import {fromEvent} from "rxjs";
import {EventEmitter} from 'emitter' // 浏览器端没有emitter，可以安装 npm i emitter
// Node端可以使用自带的event库 ,import EventEmitter from 'events' 

const emitter=new EventEmitter()
const result$=fromEvent(emitter, 'some-event')
result$.subscribe({
  next(val){console.log(val)},
  complete(){console.log('complete')},
  error(err){console.log('error',err)}
}) // 输出 1 2 3 complete
emitter.emit('some-event', 1)
```

##### fromEventPattern(待补充)

```
```

#### 请求

##### ajax

只能在浏览器里用

```js
import {ajax} from "rxjs/ajax";
ajax.getJSON('https://api.github.com/users?per_page=1').subscribe({
  next(val){console.log(val)},
  complete(){console.log('complete')},
  error(err){console.log('error',err)}
})
// 打印接口返回值 （ 没有http 请求接口，仅仅是接口数据）
```

#### 回调

##### bindCallback 

将回调函数转变为 Observable

```js
import {bindCallback} from "rxjs";

function someFunc(n,callback){
  console.log('传入数据n -->',n)
  setTimeout(()=>{
    callback('回调数据')
  },2000)
}
const boundFunc=bindCallback(someFunc)

const funcObservable=boundFunc(100)// 传入回调函数参数

funcObservable .subscribe({
  next(val){console.log(val)},
  complete(){console.log('complete')},
  error(err){console.log('error',err)}
})
// 输出 传入数据n --> 100   回调数据    complete
```

##### bindNodeCallback 

将 Node 的回调 API 转化为Observable

```js
import {bindNodeCallback} from 'rxjs'
import fs from 'fs'

const  boundReadFile=bindNodeCallback(fs.readFile)

const readFileAsObservable=boundReadFile('./tmp.txt','utf-8')

readFileAsObservable.subscribe({
    next(val){console.log(val)},
    complete(){console.log('complete')},
    error(err){console.log('error',err)}
})
// 输出  文件内容 complete
```

#### empty

```js
import {EMPTY} from 'rxjs'
EMPTY.subscribe({
    next(val){console.log(val)},
    complete(){console.log('complete')},
    error(err){console.log('error',err)}
})
// 输出 complete
```

#### throwError

```js
import {throwError} from 'rxjs'

const errorObservable = throwError(()=>{
    throw new Error('error')
})
errorObservable.subscribe({
    next(val){console.log(val)},
    complete(){console.log('complete')},
    error(err){console.log('error',err)}
})
// 输出 error Error 信息
```

#### iff 

通过第一个函数返回值判断走哪个分支，类似 if

```js
import {iif,of} from 'rxjs'

let controller
const businessProcess = iif(
    ()=>controller,
    of('分支1'),
    of(' 分支2')
)

// 如果这里订阅就是走 分支1

controller = true
businessProcess.subscribe({
    next(val){console.log(val)},
    complete(){console.log('complete')},
    error(err){console.log('error',err)}
})
// 输出 分支1 complete
```

### 过滤流数据
下面这些操作符会对每一个observable发出的值就行处理

#### audit

包括：audit、auditTime

从输出的数据流中指定采样频率

```js
// 通过其他Observable函数
interval(1000).pipe(
    audit(()=>interval(2000)),
).subscribe((value)=>{
    console.log(value)
})

// 按时间周期取样
interval(1000).pipe(
    auditTime(2000),
).subscribe((value)=>{
    console.log(value)
})
```

#### delay
为 Observable 发出的每个一个值增加延时
```js
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

const source = of('Hello', 'World');

source.pipe(
  delay(1000) // 延迟 1000 毫秒
).subscribe(value => {
  console.log(value); // 1秒后输出 "Hello", 再过1秒输出 "World"
});
```

#### debounce、throttle

防抖包括：debounce入参是函数返回Observable控制防抖、debounceTime支持传入时间

```js
import {debounce, debounceTime, fromEvent} from "rxjs";
import EventEmitter from 'events' // 浏览器端没有emitter，可以安装 npm i emitter

const emitter=new EventEmitter()
//.pipe(debounce(()=>timer(300)))
fromEvent(emitter, 'some-event').pipe(debounceTime(300)).subscribe((value)=>{
    console.log(value)
}) // 输出 3

emitter.emit('some-event', 1)
emitter.emit('some-event', 2)
emitter.emit('some-event', 3)

```

#### distinct

数据去重，包括distinct、distinctUntilChanged、distinctUntilKeyChanged

```js
// ----- distinct 保证整体唯一性，id 为 1 的只出现一次 -----
from([{id:1,name:'jack'},{id:1,name:'tom'},{id:2,name:'hdd'},{id:1,name:'mars'}]).pipe(
    distinct(item=>item.id),
).subscribe(val=>console.log(val))
// 输出：{ id: 1, name: 'jack' } { id: 2, name: 'hdd' }

// ---- distinctUntilChanged 只和前一个对比，id 为 1 的出现了多次 ----- 
from([{id:1,name:'jack'},{id:1,name:'tom'},{id:2,name:'hdd'},{id:1,name:'mars'}]).pipe(
    distinctUntilChanged((pre,cur)=>pre.id===cur.id), // 函数返回 true 则过滤
).subscribe(val=>console.log(val))
// 输出：{ id: 1, name: 'jack' } { id: 2, name: 'hdd' } { id: 1, name: 'mars' }

// distinctUntilKeyChanged 也是对比前一个，只不过入参可以直接指定key
from([{id:1,name:'jack'},{id:1,name:'tom'},{id:2,name:'hdd'},{id:1,name:'mars'}]).pipe(
    distinctUntilKeyChanged('id'),
).subscribe(val=>console.log(val))

```

#### sample

用来控制事件流的频率

只要`notifier` Observable 发出一个值， `sample` 会去源 Observable 取出最新的一个值

```js
interval(1000).pipe(
  	// 0-2s 之间是第一个采样区间，区间内第一个值就是采样点
    sample(timer(0,2000)), // timer 从 0s 触发后，每隔 2s 触发一次。 
).subscribe(val=>console.log(val)) // 输出 0 2 4
```

#### take、skip

* take系列用于控制输出流的元素数量。包括：控制take、takeLast、takeUtil、takeWhile

  ⚠️ 取出对应数据后 Observable 流就结束了，会触发 complete 事件

  ```js
  // take 取出前两个数据
  interval(1000).pipe(take(2)).subscribe((value)=> console.log(value));
  
  
  // takeLast 取出后两个数据 （如果从 interval 取 后两个数据呢？ 会一直阻塞因为定时器会一直运行）
  from([1,2,3,4]).pipe(takeLast(2)).subscribe((value)=> console.log(value));
  
  
  // takeUntil 一直取值，直到 notify Observable 流输出时结束
  interval(1000).pipe(
      takeUntil(timer(3000))
  ).subscribe((value)=>console.log(value))
  
  
  // 传入函数，根据条件取值
  interval(1000).pipe(
      takeWhile(val=>val<5)
  ).subscribe((value)=>console.log(value))
  
  ```

* skip 跳过与 take 类似，也包括 skip、skipLast、skipUtil、skipWhile

#### first、last

选取第一个/最后一个元素后结束数据流

```js
from([1,2,3]).pipe(
    first(),
).subscribe({
    next:val=>console.log(val),
    complete:()=>console.log('complete')
})
// 输出 1 complete
```



### 处理流（高级用法）

#### buffer类

包括：buffer 、bufferWhen、bufferCount、bufferTime、bufferToggle

指定缓冲区输出时机，将数据存储在缓冲区（数组），输出后 buffer 可重现装载数据

```js
import {buffer,interval} from "rxjs";
// 主流。应该是 1s 输出一次
const mainObservable=interval(1000) 


//----------- buffer-----------
// 由其他流通知buffer收集数据结束，输出数据 （closeNotifyObservable每次输出就是一次通知）
const closeNotifyObservable=interval(2500) // 通知结束流
mainObservable.pipe(buffer(closeNotifyObservable)).subscribe((value)=>{
    console.log(value)
})
// 输出 [ 0, 1 ]  [ 2, 3 ]  [ 4, 5, 6 ] ...
 
//----------- bufferWhen-----------
// 支持通过函数通知缓存结束
const closeNotifyObservableFun=()=>timer(3000)
mainObservable.pipe(bufferWhen(closeNotifyObservableFun)).subscribe((value)=>{
    console.log('value -->',value)
})


//----------- bufferCount-----------
// 指定 buffer 缓存数据容量，满了就输出
mainObservable.pipe(bufferCount(3)).subscribe((value)=>{
    console.log(value)
}) // 输出 [ 0, 1, 2 ] [ 3, 4, 5 ] ...

//----------- bufferTime-----------
// 由时间控制 buffer 输出
mainObservable.pipe(bufferTime(1500)).subscribe((value)=>{
    console.log(value)
})


//----------- bufferToggle-----------
// 指定buffer通知开始、通知结束的流。这期间数据组成的数组
// 这是唯一可以指定开始缓存 buffer位置的操作符
const openNotifyObservable=timer(1000)
const closeNotifyObservable=()=>timer(3000)

mainObservable.pipe(bufferToggle(openNotifyObservable,closeNotifyObservable)).subscribe((value)=>{
    console.log(value)
}) // 输出 [0,1,2]
```

#### window 类

包括：window 、windowWhen、windowCount、windowTime、windowToggle

其函数形式与 buffer 一致，区别是 buffer 是将数据放在数组中输出，而 window 将数据放在新 Observable 中输出

#### map 类（最常用）

* switchMap 

  每个值映射为一个新流，只要有一个新的流就立即订阅，并取消上一个流

  ```js
  fromEvent(inputElement, 'input')
    .pipe(
      debounceTime(300), // 延迟300毫秒后才发射值，防止用户快速打字导致频繁请求
      map(event => event.target.value),
      switchMap(searchText => 
        searchText ? axios.get(`https://api.example.com/search?q=${searchText}`) : Observable.empty()
      )
    )
    .subscribe(response => {
      console.log('Search results:', response.data);
    });
  ```

* mergeMap 并发

  每个值映射为一个新流，并发处理流，最后会合并为一个流
  
  ```js
  // 适合并发处理，最后收集结果
  const MAX_CONCURRENT_REQUESTS=10 // 并发量
  from([1,2,3]).pipe(
      mergeMap(val=>of(val).pipe(delay(1000)),MAX_CONCURRENT_REQUESTS),
  ).subscribe(val=>console.log(val))
  // 等待 1s，同时输出 1 2 3
  ```
  
* concatMap 串行

  与mergeMap 一样都是将每个值映射为一个新流分别做处理后最后合并为一个流，但是 mergeMap 是并发处理每个流，而concat是按照输入流的元素顺序执行完一个再进行下一个

  ⚠️串行调用一旦报错会立即传播到最终的订阅者，并且整个链路会被中断，后续的 Observables 将不会被执行

  ```js
  from([1,2,3]).pipe(
      concatMap(val=>of(val).pipe(delay(1000))), // delay 是延迟操作符
  ).subscribe(val=>console.log(val))
  // 每隔 1s 输出一个值
  ```

* exhaustMap

  ```js
  
  ```

* map、mapTo

  ```js
  ```

  

#### 其他

expand、groupBy、pairwise、partition、pluck、scan

```js
```



### Join操作符

### 流错误处理

#### retry、retryWhen

retry用于在Observable 抛出错误时进行重试。retry会重新订阅原始Observable

```
```

### 处理多个流

#### combineLatest 

合并多个Observable 的流。⚠️只有最后一个 Observable 结束才触发complete

```js
import {combineLatest,of} from 'rxjs'

const observable1 = of(1)
const observable2 = of(2)
combineLatest([observable1, observable2]).subscribe({
    next(val){console.log(val)},
    complete(){console.log('complete')},
    error(err){console.log('error',err)}
})
// 输出 [ 1, 2 ] complete
```

```js
// 合并接口
import {combineLatest,from} from 'rxjs'

const url='https://api.github.com/users?per_page=1'
const observable1=from(fetch(url).then(res=> res.json()))
const observable2=from(fetch(url).then(res=> res.json()))
combineLatest([observable1, observable2]).subscribe({
    next(val){console.log(val)},
    complete(){console.log('complete')},
    error(err){console.log('error',err)}
})
// 输出 [ 接口返回值, 接口返回值 ] complete
```

#### concat 

串行合并 Observable，只有前一个 Observable 完成才会触发下一个 Obsverable 

```js
import {concat, from, interval, take} from 'rxjs'

const url='https://api.github.com/users?per_page=1'
const observable1=interval(1000).pipe(take(3)) // 输出 3 个值后终止
const observable2=from(fetch(url).then(res=> res.json()))
concat(observable1, observable2).subscribe({
    next(val){console.log(val)},
    complete(){console.log('complete')},
    error(err){console.log('error',err)}
})
// 输出 0 1 2 接口返回值  complete （输出 3 个数花费 3s 后，才请求接口）
```

#### forkJoin、race

forkJoin 类似 Promise.all，所有 Observable 并发执行，全部结束才输出

race 类似 Promise.race，返回 最先输出数据的Observable

````js
import { forkJoin , interval, take} from 'rxjs'

const url='https://api.github.com/users?per_page=1'
const observable1=interval(1000).pipe(take(1))
const observable2=interval(1000).pipe(take(2))
forkJoin([observable1, observable2]).subscribe({
    next(val){console.log(val)},
    complete(){console.log('complete')},
    error(err){console.log('error',err)}
})
// 2s后输出 [ 0, 1 ] complete
````

#### merge

将多个 Observable 流合并为一个流，按照数据输出的顺序，合并后的 Observable依次输出

```js
import {merge, interval, take, map} from 'rxjs'

const observable1=interval(700).pipe(map(x=>`observable1 返回值${x}`),take(2))
const observable2=interval(1000).pipe(map(x=>`observable2 返回值${x}`),take(2))
const subscription=merge(observable1,observable2).subscribe({
    next(val){console.log(val)},
    complete(){console.log('complete')},
    error(err){console.log('error',err)}
})


// 输出 
// observable1 返回值0
// observable2 返回值0
// observable1 返回值1
// observable2 返回值1
// complete
```

#### partition

用于将 Observable 拆分为两个 Observable，一个满足特定条件，另一个不满足该条件。

返回数组，第一个Observable是挑出来的数据；剩下来的数据放到第二个 Observable。

数组 filter

```js
import {from, partition} from 'rxjs'
const observable=from([1,2,3,4,5])
const [even$,odd$]=partition(observable,val=>val%2===0)
even$.subscribe({
    next(val){console.log(val)},
    complete(){console.log('complete')},
    error(err){console.log('error',err)}
})
odd$.subscribe({
    next(val){console.log(val)},
    complete(){console.log('complete')},
    error(err){console.log('error',err)}
})

// 输出 2 4 complete 1 3 5 complete
```

接口按成功、失败分流

```js
import {from, mergeMap, partition} from 'rxjs'
const url='https://api.github.com/users?per_page=1'
const observable=from(fetch(url))

const [success$,fail$]=partition(observable,response=>response.status>=200 && response.status<300)
success$.pipe(
    mergeMap(res=>res.json()),
).subscribe({
    next(val){console.log('success',val)},
    complete(){console.log('success complete')},
    error(err){console.log('success error',err)}
})
fail$.pipe(
    mergeMap(res=>res.json()),
).subscribe({
    next(val){console.log('fail',val)},
    complete(){console.log('fail complete')},
    error(err){console.log('fail error',err)}
})
// 输出 fail complete   success 接口返回值    success complete
```

#### zip

将多个 Observables 的数据配对合并成一个新的 Observable，从数据角度，等待每个输入 Observable 相应位置的输出数据组成一个数组就先返回。直到其中一个结束了，整体就结束

看起来可以用来同步多个输出流的数据

```js
import {from, of, timer, zip} from 'rxjs'
const url='https://api.github.com/users?per_page=1'
const observable1=timer(3000)
const observable2=from(['A','B'])
zip(observable1,observable2).subscribe({
    next(val){console.log(val)},
    complete(){console.log('complete')},
    error(err){console.log('error',err)}
})


// 3s后输出 [ 0, 'A' ] complete
// observable1只输出了一个数据 0，所以observable2 只有 A 被组装成一个数组
```



### 总结

* mergeMap、 concatMap 是将 Observable 输出数据分解成多个Observable 后再合并，其回调函数返回 Observable

* map 是将Observable 的数据映射为新的数据，其回调函数返回 值

如果通过throwError 手动抛出错误只能用mergeMap、 concatMap

通过 throw new Error 手动抛出错误可以用 map 等其他操作符

```js
from([1,2,3]).pipe(
    concatMap(val=>{
        return val>2?throwError(()=>new Error('大于2,重试')):of(val)
    }),
    retry(3)

).subscribe({
    next:val=>console.log(val),
    complete:()=>console.log('complete'),
    error:err=>console.log(err)
})
// 输出 1 2  1 2  1 2 Error: 大于2,重试 报错栈信息

// 第1次执行+2次重试
```



## 实践

### 取消订阅

如果 Observable 自动走到 complelte 就不用取消订阅，但是为了避免内存泄露，最佳实践还是手动取消订阅

```js
observable$.unsubscribe()
```

### 并发及重试

```js
import {delay, from, lastValueFrom, mergeMap, of, retry, tap} from "rxjs";

function makeLimitedConcurrentRequests(filePathList) {
    // 并发
    const MAX_CONCURRENT_REQUESTS =2 ;
    // 重试5次
    const RETRY_COUNT = 5;


    const makeUpload = (file) => of(file).pipe(
        tap(() => console.log(`开始上传 ${file.path}`)),
        delay(file.delay), // 加了延迟模拟耗时
      	tap(() => console.log(`完成上传 ${file.path}`)),
        retry(RETRY_COUNT) // 重试过程是吧上传重新执行一遍，不会有任何提示，直到重试超过次数到 error、或者成功到 complete
    );

    const concurrentUpload = from(filePathList).pipe(
        mergeMap(url => makeUpload(url), MAX_CONCURRENT_REQUESTS) // 并发请求
    );


    return lastValueFrom(concurrentUpload,{ defaultValue: 'No value emitted' });
}

makeLimitedConcurrentRequests([
    { path: 'pathA', delay: 1000}, 
    { path: 'pathB', delay: 4000},
    { path: 'pathC', delay: 2500},
]).then((res) => {
    console.log(res);
}).catch((err) => {console.log(err)})

// 测并发。pathA、pathB执行，pathA先执行结束，这个坑位执行pathC，最后pathB 结束

开始上传 pathA
开始上传 pathB
完成上传 pathA
开始上传 pathC
完成上传 pathC
完成上传 pathB
{ path: 'pathB', delay: 4000 }

```

lastValueFrom

```
// 将 Observable 转换为一个 Promise，并返回最后一个发出的值
    // 如何没有发出值，可以通过defaultValue指定
    // 注意：如果 Observable 在完成前抛出了一个错误 或者 Observable 没有发出任何值且没有提供默认值，返回 rejected Promise 
    // return lastValueFrom(concurrentUpload,{ defaultValue: 'No value emitted' });
```

### 缓存

场景：页面需要定位信息、定位改变页面需要能收到通知

以前想的是一个单例+订阅发布，页面订阅单例，如果定位变化就能通知页面了

但是订阅发布存在一个弊端：订阅必须在发布之前，假设冷启动获取定位后立即通知页面，这是正常的，如果再进入下一个页面呢？下一个页面的定位信息从哪里来？

订阅发布存在时效性，rxjs 有能力缓存上一次的状态 （replayPublish 操作符）

参考：https://juejin.cn/post/7174713617596547132?searchId=2024102515585998DCC4BEE8933D7A7766
参考：https://juejin.cn/post/7114106871249633311?searchId=2024111515204767EF933AEB1ECABFAEDA#heading-1

```

```

### 限位窗口
场景：请求 A 拿到页面刷新数据，如果返回数据数据耗时 requestTime 在 500ms - 1000ms 时间区间返回立即停止刷新样式 ; requestTime < 500ms 则在 500ms 时停止刷新样式；requestTime > 1000ms 则在 1000ms时停止刷新样式，且数据即使返回也直接丢弃
场景：loading 页加载数据也是这种逻辑，有上限超时时间，但又为了用户能感知 loading 页所以设置下限时间

```js

function mockRequest(delay){
    return  timer(delay??Math.random()*10*1000).pipe(map(val=> ({name:'tom'})))
}

from([
    timer(3000),
    mockRequest(5000),
    timer(7000),
]).pipe(
    mergeMap((observable)=>observable),
    bufferCount(2),
    take(1),
    filter(value => value!==0)
).subscribe((value)=>{
    // [ 0, 0 ] 超时
    // [ { name: 'tom' }, 0 ] 3s之前返回数据
    // [ 0, { name: 'tom' } ]  3 - 7s 之内返回数据
    console.log(value)

    // 如果是做 mockRequest 是其他耗时操作，无需返回值就不用处理
    // 如果需要返回值，就需要提在这里提取数据了
})

```


### 竞争态问题

switchMap 操作符非常适合处理一些特定的场景，例如：

**搜索框输入**：用户快速输入时，只需要处理最新的输入并发起请求，而忽略之前的输入发起的请求。（之前的并不是取消了，而是忽略了之前请求的结果）

```js
fromEvent(inputElement, 'input')
  .pipe(
    debounceTime(300), // 延迟300毫秒后才发射值，防止用户快速打字导致频繁请求
    map(event => event.target.value),
    switchMap(searchText => 
      searchText ? axios.get(`https://api.example.com/search?q=${searchText}`) : Observable.empty()
    )
  )
  .subscribe(response => {
    console.log('Search results:', response.data);
  });
```

**远程协作**：本地修改、远程修改以最新的作基准

```js
const merged$ = merge(localInput$, remoteInput$);

// 处理合并后的事件流
merged$.pipe(
  switchMap(data => updateUI(data)) // 更新页面
).subscribe(value => {
    console.log(value)
});
```



