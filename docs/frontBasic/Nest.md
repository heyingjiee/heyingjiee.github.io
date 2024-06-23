# Nest

## 简介

Nest是一个用于构建高效可扩展的一个基于Node js 服务端 应用程序开发框架

其默认使用的HTTP框架是express，也可以切换为Fastify

## 学习资源

中文文档：https://nest.nodejs.cn/

官方文档：https://docs.nestjs.com/

awesome-nestjs：https://github.com/nestjs/awesome-nestjs?mode=light#open-source





CSDN的一位做Node的博主：https://blog.csdn.net/qq1195566313?type=blog

## 前置知识

### IOC、DI

控制反转（Inversion of Control，IOC）：高层模块不应该依赖低层模块，二者都应该依赖其抽象

依赖注入（Dependency Injection，DI）：IOC是一种设计原则，而DI是IOC原则的具体实现方式，即通过容器管理依赖

例子:

```ts
class A {
   	name: string
    constructor(name: string) {
      this.name=name
    } 
}
 
class B {
    modeul:A
    constructor () {
        this.model = new A('A的实例')
    }
}

const b = new B()
 
console.log(b.modeul.name) // A的实例
```

这个例子A依赖于实例B，如果实例B构造函数发生变化，A的代码也需要变化，耦合度非常高

使用依赖注入的例子：

```ts
//容器用于解耦
class Container {
    modeuls: any
    constructor() {
        this.modeuls = {}
    }
    provide(key: string, modeuls: any) {
        this.modeuls[key] = modeuls
    }
    get(key) {
        return this.modeuls[key]
    }
}
 
const container = new Container()
container.provide('a', new A('实例1'))
 
// B不在直接依赖A，而是依赖容器Container。A发生变化只影响容器
class B {
    a: any
    constructor(container: Container) {
        this.a = container.get('a')
    }
}
 
const b = new B(container)
```

### TS装饰器

tsconfig中开启装饰器属性

```json
{
  "compilerOptions":{
    "experimentalDecorators": true
	}
}
```

#### 类装饰器

```ts
const classDecorator:ClassDecorator=(target)=>{
 target.prototype.name='tom'
}

@classDecorator
class Person {
  constructor () {
  }
}

const tom:any = new Person()
console.log(tom.name) // tom


```



#### 属性装饰器

```ts
const propertyDecorator:PropertyDecorator=(target, propertyKey)=>{
  // target 类的原型
  // propertyKey 属性
  // 创建实例时触发
  console.log(target,propertyKey) // {} name
}


class Person {
  // 修饰属性
  @propertyDecorator
  public name:string
  
  constructor (name:string) {
    this.name=name
  }
}

const tom:any = new Person('tom')
```

#### 方法装饰器

```ts
const methodDecorator:MethodDecorator=(target,propertyKey,descriptor)=>{
  console.log(target) //{}
  console.log(propertyKey) // getName  函数名
  console.log(descriptor)
  // value属性是函数引用
  //{
  //   value: [Function: getName],
  //   writable: true,
  //     enumerable: false,
  //     configurable: true
  // }

}

class Person {
  constructor (public name:string) {
  }
  @methodDecorator
  getName(){
    return this.name
  }
}

const tom:Person = new Person('tom')

```

#### 参数装饰器

```ts
const parameterDecorator:ParameterDecorator=(target,propertyKey,parameterIndex)=>{
  console.log(target)  //{}
  console.log(propertyKey) // setName  函数名
  console.log(parameterIndex) //  0  参数位置
}

class Person {
  constructor (public name:string) {
  }
  setName(@parameterDecorator name:string){
    this.name=name
  }
}

const tom:Person = new Person('tom')

```

#### 应用

```ts
import axios from 'axios'

const methodDecorator:MethodDecorator=(target,propertyKey,descriptor)=>{

}

const Get=(url:string):MethodDecorator=>{
  return  (target:Object,propertyKey:string|symbol,descriptor:PropertyDescriptor)=>{
    const callback=descriptor.value
    axios(url).then((res)=>{
       callback(res ?? null)
     })
  }
}

class Person {
  constructor (public name:string) {
  }
  
  @Get('https://httpbin.org/get?name=tom')
  getName(res:string){ // 自动发起请求
    console.log(res)
  }
}

const tom:Person = new Person('tom')
```

## Nest脚手架

创建启动项目

```shell
npm i -g @nestjs/cli

nest new 项目名

cd 项目目录

nest start:dev # 命令：nest start --watch
```

生成各个模块

```shell
nest g -h  # 查看支持的模块
```

![image-20240602015848468](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/202406020158494RM236.png)

```shell
# 生成一个resource。在src下生成一整套文件，其app.module.ts中会自动引入person这个模块
nest g resource person --no-spec # --no-spec 是不生成测试文件

# 选择API风格
? What transport layer do you use? (Use arrow keys)
❯ REST API 
  GraphQL (code first) 
  GraphQL (schema first) 
  Microservice (non-HTTP) 
  WebSockets 
```

![image-20240602020102115](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20240602020102hq3pkB.png)

### Nest结构

```
src
├── app.controller.spec.ts // 针对控制器的单元测试
├── app.controller.ts // 带有单个路由的基本控制器
├── app.module.ts // 应用程序的根模块（root module）
├── app.service.ts // 具有单一方法的基本服务（service）
├── app.service.spec.ts // 针对服务的单元测试
├── main.ts // 应用程序的入口文件

```

**main.ts**项目的入口

```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
```

app resource项目的根资源

* controller
* service
* module

项目从根module开始加载，将service注入到controller中。这样在controller中可直接调用service的方法

imports字段写的是其他加载的模块

```ts
// app.controller.ts
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  // 注入方式1： 构造函数自动注入
  constructor(private readonly appService: AppService) {}
  
  // 注入方式2：通过装饰器注入类的属性中
  // @Inject('PersonService')
  // private readonly personService: PersonService;

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}


// app.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}



// app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [], // 如果nest ge resource person，这里会引入PersonModule模块
  controllers: [AppController],
  providers: [AppService], // 将AppService的注入到AppController中
})
export class AppModule {}

```

## Nest生命周期（待补充）

实际场景：项目有warmup的状态，在warmup时间内初始化资源，待warnup完成后才对外提供服务

## 注入相关

### 获取注入

```ts
@Controller()
export class PersonController {
  // 1、构造函数注入。PersonService会被自动注入到变量中
  constructor(private readonly personService: PersonService) {}
  
  
  // 2、属性注入
  @Inject(PersonService)
  private readonly personService:PersonService
  
  
  // 3、可选注入 @Optional() 修饰，如果没有该注入也不会报错
  // 在nest中是可以通过字符串名字注入的，可能会存在没有对应的注入
  @Optional() 
  @Inject('注入名')
  private readonly personService:PersonService
}
```

### 注入类

Modle的作用就是清晰的维护注入

* providers所有类可以向controllers类中注入

* providers类之间可以互相注入

```ts
//-------- app.module.ts --------
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {BService} from './B/b.service'

@Module({
  imports: [PersonModule],
  controllers: [AppController],
  providers: [AppService,BService] 是其简写方式
})
export class AppModule {}

```

@Injectable()装饰器表示该类可以注入，可以被注入

```ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return 'hello';
  }
}

```

#### 自定义providers注入名

一般都是使用简写方式

```ts
//-------- app.module.ts --------
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [PersonModule],
  controllers: [AppController],
  
  // providers: [AppService] 是其简写方式
  providers: [
    {
      provide: 'ABC', // 服务名
      useClass: AppService, // 服务类
    },
  ],
})
export class AppModule {}


//-------- app.controller.ts --------
import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  // 这里必须使用@Inject指定名字（注意是字符串）注入
  constructor(@Inject('ABC') private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

```

#### 自定义providers注入名、值

这种方式适用于注入一些配置选项。再结合后面的**全局模块**，就可以在其他模块中直接注入配置

```ts
//-------- app.module.ts --------
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    {
      provide: 'Config',
      useValue:{
        baseUrl:'xxx/xxx'
      }
    },
  ],
})
export class AppModule {}


//-------- app.controller.ts --------
import { Controller, Get, Inject } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  // 使用名字，将数组注入到了变量中
  @Inject('Config') private readonly config:any;

  @Get()
  getHello(): string[] {
    return this.config.baseUrl; 
  }
}

```

#### providers工厂模式

```ts
//-------- app.module.ts --------
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonService } from './person/person.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    PersonService, // 这里注入了，才能注入到工厂函数
    {
      provide: 'ABC',
      // 可以注入其他的服务。注意：这里注入的服务必须在providers中存在
      inject: [PersonService],
      // 注入到工厂函数中，使用其他服务
      // 注意:useFactory也支持用async修饰，使用异步函数
      useFactory(personService: PersonService) {
        console.log(personService.findAll());
        return 111;
      },
    },
  ],
})
export class AppModule {}


//-------- app.controller.ts --------
import { Controller, Get, Inject } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Inject('ABC') private readonly val: number;

  @Get()
  getHello(): number {
    return this.val; 
  }
}

```

### 注入模块

一般我们通过providers注入类

其实模块可以明确export哪个类，我们可以把整个模块导出的类注入

#### 基础写法

目前有person、user两个resource。目标是在user中使用person的服务

在person中exports导出服务

```ts
//-------- person.module.ts --------
import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';

@Module({
  controllers: [PersonController],
  providers: [PersonService],
  exports: [PersonService], // 这里与providers相同，也支持定义注入名、值，工厂函数
})
export class PersonModule {}

```

在user中，import引入模块。注意：引入的模块中必须导出服务，才能被app的controller使用

```ts
//-------- user.module.ts --------
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PersonModule } from '../person/person.module';

@Module({ 
  imports: [PersonModule], // 第一步：这里必须引入person模块
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}


//-------- user.controller.ts --------
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PersonService } from '../person/person.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly personService: PersonService, //第二步： 这里注入person的服务
  ) {}

  @Get()
  findAll() {
    return this.personService.findAll();
  }
}

```

注意：Nest是从app模块开始加载项目的，所以切记必须在这里引入项目的所有模块（使用nest g resource xx 创建会自动引入）

```ts
//-------- app.module.ts --------
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './person/person.module';
import { UserModule } from './user/user.module';
@Module({
  imports: [PersonModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

```

#### 全局模块

使用@Global修饰person模块

```ts
//-------- person.module.ts --------
import { Global, Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';

@Global()
@Module({
  controllers: [PersonController],
  providers: [PersonService],
  exports: [PersonService], // 注意：全局模块仍然需要导出
})
export class PersonModule {}

```

在user模块中不必在引入person模块了

```ts
//-------- user.module.ts --------
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  // imports: [PersonModule], 对于全局模块，这里不必在引入了
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}

```

UserModule不是全局模块，所以一定要记得在app模块中引入UserModule

```ts
//-------- app.module.ts --------import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

```

#### 动态模块

前面遇到的模块都是下面这种，通过@Module定义了模块的特性，但是class UserModule是空的

```ts
//-------- person.module.ts --------
import { Global, Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';

@Global()
@Module({
  controllers: [PersonController],
  providers: [PersonService],
  exports: [PersonService], // 注意：需要导出
})
export class PersonModule {}
```

在其他模块通过import引入时，是固定的功能

```ts
//-------- user.module.ts --------
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [PersonModule], // 引导静态的模块
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
```

其实我们可以给模块类，增加静态方法。在其他模块import导入该模块时，可以通过给静态方法传入参数来动态改变模块的功能，这就是**动态模块**

静态方法叫什么名字都可以，但是Nest内约定了3个函数名，代表不同类型的功能

* forRoot

  用于那些只需要在整个应用生命周期中初始化一次的全局服务或配置

* register

  每次使用都需要重新调用

* forFeature

  在forRoot的基础上，在项目局部增加新功能。例如：用 forRoot 指定了数据库链接信息，再用 forFeature 指定某个模块访问哪个数据库和表。TypeORM是典型的这种方式，详见【TypeORM】章节

例子：

```ts
//-------- app.module.ts --------
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './person/person.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    // 注意这里的模块是动态的，可以接受参数
    ConfigModule.forRoot({
      path: 'xxx',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

```

```ts
import { DynamicModule, Global, Module } from '@nestjs/common';

interface Options {
  path: string;
}

@Module({})
export class ConfigModule {
  // 定义静态函数
  static forRoot(options: Options): DynamicModule {
    return {
      // 静态函数只比@Module多了一个module属性，module属性为类名
      module: ConfigModule,
      providers: [
        {
          provide: 'Config',
          useValue: { baseApi: '/api' + options.path },
        },
      ],
      exports: [
        {
          provide: 'Config',
          useValue: { baseApi: '/api' + options.path },
        },
      ],
    };
  }
}

```

### 注入失败

依赖自动注入其实是通过Nest容器来管理依赖的结果，@Injectable修饰表示可注入、被注入

Nest会自动创建对象，并放入容器

如果手动new创建对象，则依赖注入失效

```ts
@Injectable()
class xxx{
	@Inject(name)
  private readonly name:string
}


// 通过这种方式创建对象，name不会被注入成功
new xxx()
```



## 发起请求

### Get、POST

```ts
//person.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseInterceptors,
  UploadedFile,
  Inject,
  Version,
} from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { AppController } from '../app.controller';

@Controller('api/person')
export class PersonController {
  // 构造函数注入。PersonService会被注入到变量中
  constructor(private readonly personService: PersonService) {}
  
  // get 请求获取query
  @Get('find')
  handleQuery(@Query('name') name: string, @Query('age') age: number) {
    return `received: name=${name},age=${age}`;
  }

  // get 请求获取url参数
  @Get(':id')
  handleUrlParam(@Param('id') id: string) { // @Param() 注入的是对象{id:xxx}
    return `received: id=${id}`;
  }

  // post 请求获取请求体
  // CreatePersonDto是在dto（data transfer object，数据传输对象，用于存储请求体数据的结构）目录下定义的class，定义请求体参数结构
  // export class CreatePersonDto {
  //  name: string;
  //  age: number;
  // }
  // 
  // @Body('name') name: string 也支持取单个字段
  @Post('hello')
  handlePost(@Body() createPersonDto: CreatePersonDto) { 
    return `${JSON.stringify(createPersonDto)}`;
  }

  @Post('file')
  @UseInterceptors(
    AnyFilesInterceptor({
      dest: 'uploads/',
    }),
  )
  body2(
    @Body() createPersonDto: CreatePersonDto,
    @UploadedFile() file: Array<Express.Multer.File>,
  ) {
    console.log(file);
    return `${JSON.stringify(createPersonDto)}`;
  }

  
}

```

### 上传接口



### 下载接口

```ts
// controller 文件
import { Controller, Get, Res } from '@nestjs/common';
import { UploadService } from './upload.service';
import { Response } from 'express';
import * as path from 'node:path';
import { zip } from 'compressing';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  // 下载图片
  @Get('export')
  download(@Res() res: Response) {
    const destPath = path.resolve(__dirname, '../../file/test.png');
    res.download(destPath);
  }

  // 下载图片（流的方式）  pnpm i compressing
  @Get('stream')
  async streamDownload(@Res() res: Response) {
    const destPath = path.resolve(__dirname, '../../file/test.png');
    const tarStream = new zip.Stream();
    tarStream.addEntry(destPath);

    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment;filename=123`); //可指定文件名

    tarStream.pipe(res);
  }
}

```

### 其他请求相关

```ts
// 请求体、响应体
//@Request()简写@Req()、@Response简写为@Res()
// 注意：一旦使用@Response， Nest 就不会再把 handler 返回值作为响应内容了，需要手动设置返回值
// 方案1：开启passthrough:true，仍然会以return值作为返回值
// 方案2：res.end('结束');
import { NextFunction, Request, Response } from 'express';// 使用express中的类型
@Get('find')
handleQuery(@Request() req: Request, @Response({passthrough:true}) res: Response) { 
    console.log(req, res);
  	// req.hostname、req.url等属性
    return `返回值`;
}


// 设置响应头 
@Get('find')
@Header('name', 'tom')// 响应头多了一组name=tom
handler() {
  return 'handler2';
}

// 获取请求头
@Get('find')
handleQuery(@Headers() headers: Headers) {
    console.log(headers);
    return `返回值`;
}


// 获取IP
@Get('find')
handleQuery(@Ip() ip: string) {
  console.log(ip); // ::ffff:127.0.0.1
  return ip;
}


// 设置返回状态码
@Get('find')
@HttpCode(500)
handleQuery(@Query('age') age: number) {
    return `返回值`;
}

// 重定向
@Get('find')
@Redirect('http://juejin.cn')
handleQuery() {
    
}


// 转发到其他路由
// 打印handler1、handler2，前端返回值为handler2
@Get('find')
handler1(@Next() next: NextFunction) {
  console.log('handler1');
  next();// 这里转发到了新的路由
  return 'handler1'; // 这里被忽略了
}

@Get('find')
handler2() {
  console.log('handler2');
  return 'handler2';
}
```

### 版本控制

```ts
// main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 启用版本控制
  app.enableVersioning({
    type: VersioningType.URI, //
  });

  await app.listen(3000);
}
bootstrap();

```

整个controller添加

```ts
// person.controller.ts
@Controller({
  path: 'api/person',
  version: '1', // 这里多了一个version属性
})

// 请求 xxx/v1/api/persion 才能打到这个Controller上的路由 。路径多了v加上版本号这段
export class PersonController {
  
  @Get('find')
  handleQuery(@Query('name') name: string, @Query('age') age: number) {
    return `received: name=${name},age=${age}`;
  }
}
```

单独给一个路由增加版本号

```ts
// person.controller.ts
@Controller('api/person')

// 请求 xxx/v1/api/persion 才能打到这个Controller上的路由 。路径多了v加上版本号这段
export class PersonController {
  
  @Get('find')
  @Version('1')
  handleQuery(@Query('name') name: string, @Query('age') age: number) {
    return `received: name=${name},age=${age}`;
  }
}
```

## Nest AOP核心

 AOP （面向切面编程）。AOP 的好处是可以把一些通用逻辑分离到切面中，保持业务逻辑的纯粹性，这样切面逻辑可以复用，还可以动态的增删。 Nest 实现 AOP 的方式共有五种，包括 Middleware、Guard、Pipe、Interceptor、ExceptionFilter。

![image-20240602225438779](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/202406022254403LkKR1.png)

### 中间件(middleware)

增加中间件

```shell
nest g middleware xxx --flat --no-spec # --flat 是不生成 xxx 目录，--no-spec 是不生成测试文件
```

```ts
// index.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express'; // 提供类型。默认使用的web框架是express，这里需要标记清楚

@Injectable() // 从这里可知，中间件是可以注入的
export class IndexMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('命中中间件逻辑 before');
    next();
    console.log('命中中间件逻辑 after');
  }
}
```

局部注册。只能精确到Module级别

```ts
// 只在user模块中注册使用中间件，就只在UserModule中注册
import { Module, NestModule } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MiddlewareConsumer } from '@nestjs/common/interfaces/middleware/middleware-consumer.interface';
import { IndexMiddleware } from '../middleware/index.middleware';

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule implements NestModule { // 需要实现NestModule
  configure(consumer: MiddlewareConsumer) {
    
    // 方式1：指定哪个路由使用该中间件。所有user开头的都会命中。支持正则例如：user/*
    consumer.apply(IndexMiddleware).forRoutes('user');
    
    // 方式2：可以限制哪些方法使用
    consumer
      .apply(IndexMiddleware)
      .forRoutes({ path: 'user', method: RequestMethod.GET });
    
    // 方式3：可以指定哪个controller使用
    consumer.apply(IndexMiddleware).forRoutes(UserController);
  }
  
}
```

全局注册。（注意：IndexMiddleware如果注入了变量，则new IndexMiddleware的形式会导致注入失效而报错）

```ts
// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IndexMiddleware } from './middleware/index.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(new IndexMiddleware().use); 

  await app.listen(3000);
}
bootstrap();

```

第三方中间件

* 跨域

  ```ts
  pnpm i  cors @types/cors
  
  // 在main.ts中使用
  import * as cors from 'cors';
  
  async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(cors());
    await app.listen(3000);
  }
  ```

### 路由守卫(guard)

guard 用于在调用某个 Controller 之前判断权限，返回 true 或者 false 来决定是否放行

当返回false时，会自动抛出ForbiddenException

Nest 的 Guard 集成 RxJS，用来处理响应

```shell
nest g guard login --no-spec --flat
```

```ts
// login.guard.ts
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable() // 可注入
export class LoginGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    console.log('login check')
    return false; // 不放行
  }
}
```

局部使用。在路由、Controller上

```ts
import { LoginGuard } from './common/login.guard';

@Get()
@UseGuards(LoginGuard)
handler(){
  
}
```

全局注册

方式1：（注意：LoginGuard如果注入了变量，则new LoginGuard的形式会导致注入失效而报错）

```ts
// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoginGuard } from './common/login.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // 注册全局拦截器
  app.useGlobalGuards(new LoginGuard());

  await app.listen(3000);
}
bootstrap();

```

方式2：直接将LoginGuard注入app模块。这种方式是由IOC容器创建实例，Guard内部就能正常使用其他注入了

```ts
//-------- app.module.ts --------
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginGuard } from './common/login.guard';

@Module({
  imports: [PersonModule],
  controllers: [AppController],
  
  providers: [
    AppService,
    {
      provide: 'APP_GUARD', // 服务名
      useClass: LoginGuard, // 服务类
    },
  ],
})
export class AppModule {}
```



### 拦截器(interceptor)

Nest 的 interceptor 与Guard一样也集成了 RxJS，用来给请求到达Controller之前、之后增加统一的逻辑。例如：统计接口耗时、返回统一响应结构

Rxjs文章：https://zhuanlan.zhihu.com/p/583539989

```shell
 nest g interceptor response --no-spec --no-flat # 生成文件response.interceptor.ts
```

```ts
// response.interceptor.ts
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

interface Data<T> {
  data: T;
}

@Injectable() // 从这里可知，是可以注入的
export class ResponseInterceptor<T> implements NestInterceptor {
  // context包含了执行上下文信息，可以从中获取请求、响应等对象
  // next代表被拦截的控制器处理程序的下一个处理步骤，即实际要执行的业务逻辑
  intercept(context: ExecutionContext, next: CallHandler): Observable<Data<T>> {
    // next.handle()前面都是请求前处理
    // next.handle() 表示执行controller
    // next.handle()是请求后处理
    return next.handle().pipe(
      map((data) => { // data就是在handler中return的值
        return {
          code: 0,
          data,
          msg: 'ok',
        };
      }),
    );
  }
}

```

局部使用。支持在路由、controller上局部使用

```ts
import { ResponseInterceptor } from './common/response.interceptor';

@Controller()
@UseInterceptors(ResponseInterceptor)

@Get()
@UseInterceptors(ResponseInterceptor)
xxx(){
  
}
```

全局注册

方式1：（注意：ResponseInterceptor如果注入了变量，则new ResponseInterceptor的形式会导致注入失效而报错）

```ts
// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './common/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // 注册全局拦截器
  app.useGlobalInterceptors(new ResponseInterceptor());

  await app.listen(3000);
}
bootstrap();

```

方式2：下面的方式可以保证ResponseInterceptor内注入的数据正常

```ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ResponseInterceptor } from './common/response.interceptor';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_INTERCEPTOR', // 在AppModule中注入，provide名可以任意
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}

```

#### tap

tap不会改变数据，只是额外执行一段逻辑

```ts
intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    return next.handle().pipe(tap((data) => {
      this.logger.log(`${Date.now() - now}ms`);
    }))
}
```

#### catchError

Controller抛出错误会被 exception filter 捕获处理，我们可以在exception filter 捕获之前使用interceptor处理

```ts
intercept (context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(catchError(err => {
     	// 这个err就是Controller抛出的错误
      // throwError可以继续抛出错误，我们可以改变这个错误，exception filter会捕获这个再次抛出的错误
      return throwError(() => err)
    }))
}
```

#### timeout

timeout给接口增加超时响应

```ts
intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      // 设置超时时间，超时后抛出TimeoutError错误
      timeout(3000),
      // 捕获错误
      catchError(err => {
        if(err instanceof TimeoutError) {
          console.log(err);
          return throwError(() => new RequestTimeoutException());
        }
        return throwError(() => err);
      })
    )
}
```



#### 与middleware的区别

* interceptor 里是可以用 rxjs 的操作符来组织响应处理流程的

* 参数不同

  ```ts
  // 中间件函数签名
  use(req: Request, res: Response, next: NextFunction)
  
  // 拦截器函数签名
  intercept(context: ExecutionContext, next: CallHandler): Observable<Data<T>>
  ```

  intercept的入参ExecutionContext 里可以拿到目标 class 和 handler，进而通过 reflector 拿到handler的 metadata 等信息的，这些是 middleware 做不到的

### 管道(pipe)

Pipe 是在参数传给 handler 之前对参数做一些验证和转换的类。

注意：

* 如果转换类型失败，Controller函数不会被触发，而是自动抛出BadRequestException，如果定义了**exception Filter**就会被捕获
* 默认参数不传也会抛出BadRequestException，但是可以通 new xxxPipe 的optional只能参数可选

Nest内置的Pipe：

#### ParseIntPipe 、ParseBoolPipe 、ParseFloatPipe 

转换为整数、布尔值、float类型。下面以ParseIntPipe为例子讲解

普通用法

```ts
@Get()
handleUrlParam(@Query('id',ParseIntPipe) id: number) {
  console.log(id, typeof id);  // ParseIntPipe可以将参数id转换为数字。如果id不是数字或没有id字段，默认都会抛出BadRequestException
}
```

构造函数用法：可以传入选项自定义更多功能

```ts
// 默认如果id不是数字，则默认会抛出BadRequestException，我们也可以手动更改抛出的异常
// 通过new ParseIntPipe的方式，3个参数都是可选的。还可以设置是否可选。上面的用法如果不传递id直接抛出异常
@Get()
handleUrlParam(
  @Query(
    'id',
    new ParseIntPipe({
      // 指定校验失败，请求返回的http错误码
      errorHttpStatusCode: HttpStatus.NOT_FOUND,  
      // 这个函数可以拦截处理异常，抛出自己需要的异常
      exceptionFactory: (error: string) => {
        console.log(error); // Validation failed (numeric string is expected)
        throw new NotFoundException();
      },
      // 参数是否可选
      optional: true,
    }),
  )
  id: string,
) {
  console.log(111, id, typeof id);
}
```

#### ParseArrayPipe

使用这个会提示缺少`class-validator`、`class-transformer`

```shell
 pnpm install -D class-validator class-transformer
```

普通用法

```ts
// 请求 xxx/xxx?list=123,456 。 list是数组['123','456']
@Get()
handleUrlParam(@Query('list', ParseArrayPipe) list: string[]) {
  console.log(list); 
}
```

构造函数用法

```ts
// 上面请求，元素是字符串。new XXXX形式的参数items: Number，可以将字符串转换为数字
@Get()
handleUrlParam(@Query('list',new ParseArrayPipe({items: Number})) list: string[]){
    console.log(list);
}


// 请求 xxx/xxx?list=123...456...789 。可以用separator指定分隔符。默认分隔符是逗号
@Get()
handleUrlParam(@Query('list',new ParseArrayPipe({items: Number,separator: '...'})) list: string[]){
    console.log(list);
}

// 还支持是否可选参数
optional: false,
```

#### ParseEnumPipe

ParseEnumPipe只有new ParseEnumPipe的形式

枚举类型有几个很好用的地方

* 限定参数的范围。如果type不在枚举类型内，也会抛出BadRequestException
* 参数接收变量后，直接就是枚举类型UserType

只有构造函数用法

```ts
enum UserType {
  MEMBER = 'member',
  ADMIN = 'admin',
}


// 请求 xxx/xxx?type=member能请求通。但是type不是member、admin就会抛出异常
@Get()
handleUrlParam(
    @Query('type', new ParseEnumPipe(UserType)) type: UserType,
) {
    console.log(type);
}

// 构造函数的其他参数
new ParseEnumPipe(枚举类型,ParseEnumPipeOptions)
export interface ParseEnumPipeOptions {
    optional?: boolean;
    errorHttpStatusCode?: ErrorHttpStatusCode;
    exceptionFactory?: (error: string) => any;
}
```

#### ParseUUIDPipe

```ts
// pnpm i uuid @types/uuid
import * as uuid from 'uuid'
console.log(uuid.v4());// v4是通过随机数生成的uuid。用这个uuid发起请求才能请求通，例如： 71e7b3a2-109d-4987-a155-adaec16f0ed5
```

普通用法：

```js
@Get(':id')
handleUrlParam(@Param('id',ParseUUIDPipe) id: number) {
  console.log(id, typeof id);  // ParseUUIDPipe校验uuid
}
```

构造函数用法：参数如下

```ts
new ParseUUIDPipeOptions(ParseUUIDPipeOptions)
export interface ParseUUIDPipeOptions {
    version?: '3' | '4' | '5';
    errorHttpStatusCode?: ErrorHttpStatusCode;
    exceptionFactory?: (errors: string) => any;
    optional?: boolean;
}
```

#### DefaultValuePipe

指定字段默认值。默认字段是可选的，即不传也不会报错，而是直接使用默认值

只有构造函数用法:

```ts
@Get()
  handleUrlParam(
    @Query('type', new DefaultValuePipe('11'))
    type: UserType,
  ) {
    console.log(type);
}
```

#### ValidationPipe(Post)

前面的Pipe一般是将单个字段转换为整形、浮点数、枚举等

但是Post的请求体都是直接注入存在dto对象中，对象中包含很多字段，使用前面的Pipe就不太合适了。ValidationPipe可以在对象类型定义中为对象的每个字段增加校验规则

与ParseArrayPipe一样，还是需要安装下面的两个依赖

```
pnpm install -D class-validator class-transformer
```

```ts
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePersonDto {
  // 一个字段可以被多个装饰器修饰
  // 校验不通过抛出异常携带的信息是英语， message可以手动设置抛出的信息
  @IsString({
    message: 'name字段不是字符串',
  })
  @IsNotEmpty({
    message: 'name字段必传',
  })
  name: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;
}

```

其他装饰器：https://www.npmjs.com/package/class-validator#validation-decorators

再补充几个常用的吧

```ts
// 限制长度
@Length(6, 10,{message:'长度在6-10个字符之间'})

// 正则匹配
@Matches(/^[a-zA-Z0-9#$%_-]+$/, {
    message: '用户名只能是字母、数字或者 #、$、%、_、- 这些字符'
})
```

使用

```ts
@Post('post')
  handlePost(@Body(ValidationPipe) person: CreatePersonDto) {
    console.log(person);
}
```

异常处理

前面提到一旦参数校验不通过会抛出异常，异常会被exception filter捕获。后面会提到如何捕获

```ts
const exceptionRes = exception.getResponse() 
console.log(exceptionRes)


// 输出--------
message: [
    'name字段必传',
    'name字段不是字符串',
    'age must be a number conforming to the specified constraints',
    'age should not be empty'
  ],

```

这里只需注意：message可以设置抛出异常携带的信息。多个装饰器修饰一个字段，如果都不满足会有多条错误信息。错误信息顺序是就近原则

```
@IsString() // 然后输出这里的错误
@IsNotEmpty() // 先输出这里的错误
name: string;
```



#### ParseFilePipe

#### 自定义Pipe

```shell
nest g pipe custom --flat --no-spec 
# 生成 custom.pipe.ts ，自定义的Pipe名为CustomPipe

# 注：AaaBbb 生成 aaa-bbb.pipe.ts ,自定义的Pipe名为AaaBbbPipe
```

定义Pipe

```ts
// custom.pipe.ts
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class CustomPipe implements PipeTransform {
  // 注意：
  // 假设用法：handler(@Query(id,CustomPipe) res:string){} 
  // 这个例子特意将请求中的参数id注入到res中，两个不同名，避免下面介绍出现歧义
  // value 是接收到的值，即id的值
  // metadata 是一个对象，可以看下面例子的打印结果。包含：
  //  		metatype: res的类型 ，例如 [Function: String]
  // 			type: 装饰器类型，即type='query'
  //   		data: 字段名 ，即data='id'
  transform(value: any, metadata: ArgumentMetadata) {
    return value; // 这里返回的是处理value后的值。也可以抛出 BadRequestException 异常 （其他内置的Pipe都是抛出这个异常，所以建议自定义Pipe也抛出这个）
  }
}
```

使用Pipe

局部使用：直接引入就可以使用

```ts
import { Controller, Get, Param, Query } from '@nestjs/common';
import { PersonService } from './person.service';

import { CustomPipe } from '../common/custom-pipe.pipe'; 

@Controller('api/person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  // 请求： xxx/api/person?role=111
  // pipe打印 111 { metatype: [Function: String], type: 'query', data: 'role' }
  @Get()
  handleUrlQuery(@Query('role', CustomPipe) role: string) {
    return null;
  }

  
  // 请求： xxx/api/person/222
  // pipe打印 222 { metatype: [Function: String], type: 'param', data: 'id' }
  @Get(':id')
  handleUrlParam(@Param('id', CustomPipe) id: string) {
    return null;
  }
}

```

全局注册：注意很少这样使用，全局注册后Controller什么都不用加，所有请求都会经过Pipe，请求参数处理不明确

方式1：这种方式CustomPipe内部不能有其他注入

```ts
// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomPipe } from '../common/custom-pipe.pipe'; 

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // 注册全局拦截器
  app.useGlobalPipes(new CustomPipe());

  await app.listen(3000);
}
bootstrap();

```

方式2：CustomPipe内部可以有其他注入

```ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomPipe } from '../common/custom-pipe.pipe'; 

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_PIPE', // 在AppModule中注入，provide名可以任意
      useClass: CustomPipe,
    },
  ],
})
export class AppModule {}

```



### 异常过滤(exception Filter)

Exception Filter 是在 Nest 应用抛异常的时候，捕获它并返回一个对应的响应，所以也叫异常拦截器

#### 错误类型

* JS的内置错误类型

  ```js
  new Error('错误信息')
  ```

* HttpException

  HttpException也继承了Error对象

  ```ts
  export declare class HttpException extends Error
    
  // 创建异常对象
  new HttpException()
  new HttpException('错误内容',HttpStatus.NOT_FOUND) // 支持传入错误内容、http状态码
  new HttpException('错误内容',HttpStatus.NOT_FOUND,{
    cause:new Error('触发错误的原因')
  }) 
  ```

  HttpException的子类

  ![image-20240603003000955](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/2024060300300168Y7ca.png)


#### 抛出错误（待补充）

不建议直接抛出Error对象，推荐抛出HttpException类型的错误

Nest内置的 Exception Filter 会捕获错误对象，根据其中的信息生成的返回值

这些信息Error是没有的（如果抛出了Error对象，message字段会读取Error对象的message）

```json
{
	"statusCode": 400, // HttpException的状态码
	"message": "错误描述" // HttpException的错误信息
}
```

错误来源：

* Controller主动抛出一个错误

  ```ts
  @Get()
  handleUrlParam() {
    throw new HttpException('错误描述', HttpStatus.BAD_REQUEST); 
    return `get 方法`;
  }
  ```

* 中间件、路由守卫、拦截器、管道抛出（待补充）

* JS错误对象，比如 语法报错

  ```
  throw Error('错误')
  ```

#### 自定义处理

使用Exception Filter 

```shell
nest g filter hello --flat --no-spec # 生成 exception.filter.ts
```

注意下面的错误处理只能处理HttpException，因为里面有exception.getStatus获取http状态码的逻辑

普通的Error对象是没有的

```ts
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class Filter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    // const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    // 如果Error对象不小心漏到这里，是没有getStatus方法的，默认返回服务器内部错误
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let msg = '服务器内部错误';

    // 确定抛出的是HttpException
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionRes = exception.getResponse() as
        | string
        | { message: string[] | string };

      if (typeof exceptionRes === 'object') {
        if (typeof exceptionRes.message === 'string') {
          // throw抛出具体的HttpException子类，例如NotFoundException、BadRequestException
          msg = exceptionRes.message;
        }
        if (Array.isArray(exceptionRes.message)) {
          // ValidationPipe 校验参数错误，抛出的是BadRequestException，exception.message是Bad Request Exception。
          // 不能显示具体哪些字段错误了，但是有个response.message是个数组其中是ValidationPipe验证错误的提示。
          msg = exceptionRes.message[0];
        }
      } else {
        // throw抛出的HttpException
        msg = exceptionRes;
      }
    }

    response.status(status).json({
      code: -1,
      data: null,
      msg,
    });
  }
}

```

全局注册

```ts
// main.ts的bootstrap函数中添加
app.useGlobalFilters(new HttpFilter());
```

局部注册

```ts
// 加在 controller
@Controller()
@UseFilter(HttpFilter)
export class AppController{
	
}

// 加在 handler 
@Controller()
export class AppController{
	@Get()
  @UseFilter(HttpFilter)
  handlerGet(){
    
  }
}

```

使用Exception Filter 后的返回值

```json
{
	"code": -1,
	"data": null,
	"msg": "xxx" //接口url
}
```

注意：

```ts
// filter的@Catch()
@Catch(BadRequestException)可指定我们创建的filter代码处理哪些错误。不指定就是所有错误

我们可以定义多种内部错误类型，并定义对应的filter，从而针对每种错误返回特定的json
```

## Dto对象（待补充）

用于接收Post参数、函数之间传递数据的对象

```ts
import { PartialType } from '@nestjs/mapped-types';
import { RegisterUserDto } from './register-user.dto';


// PartialType、PickType、OmitType、IntersectionType 四个函数可以实现LoginUserDto继承RegisterUserDto的字段，同时RegisterUserDto使用的装饰器也会继承下来
// 注意：RegisterUserDto的每个字段都需要至少一个装饰器
export class LoginUserDto extends PartialType(RegisterUserDto) {}
```

## 基础集成

### 配置文件

### 日志

### Swagger

### Compoddoc

## TypeORM

TypeORM中文网：https://typeorm.bootcss.com/

### Nest集成

```shell
npm install --save @nestjs/typeorm typeorm mysql2 

# typeorm 是orm工具，依赖于驱动mysql2

# @nestjs/typeorm 是对typeorm的封装，对外暴露了 **动态模块TypeOrmModule**
```

第一步：全部引入动态模块TypeOrmModule，在其中配置数据库连接信息。项目启动时就会自动连接数据库

```ts
// --------- app.module.ts ---------
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './person/person.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from './person/entities/person.entity';

@Module({
  imports: [
    PersonModule,
    TypeOrmModule.forRoot({
      type: 'mysql', // 数据库类型，TypeORM目前支持mysql、 postgres、oracle、sqllite等
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'hedaodao',
      database: 'nest_practice', // 数据库名（也叫schema）。这里指定的数据库需要存在，否则会报错
      synchronize: true, // 是否自动同步entities内的实体到数据库
      migrations: [], // synchronize:true自动将表结构的变动同步到数据库，这十分不安全的。migrations会生成sql文件，我们手动执行sql文件来修改数据库
      logging: true, // 打印生成的sql语句
      entities: [Person], // 支持glob ['./**/entities/*.ts']、导入的Class对象
      subscribers: [],
      poolSize: 10, // 连接池中连接的最大数量
      connectorPackage: 'mysql2', // 指定用什么驱动包。这里用的是mysql2，所以需要安装 npm install --save mysql2
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

```

第二步：定义数据库实体对象（表结构）。这个文件放在了Person模块的entities目录下

全部装饰器文档：https://typeorm.bootcss.com/decorator-reference

```ts
// --------- src/person/entities/person.entity.ts ---------
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity() // 默认表名规则 （首字母小写，下划线链接，例如类名为AdminUser，表名为admin_user） ， 也可以手动传入{name: 'person'}设置
export class Person {
  // 主键自增列
  @PrimaryGeneratedColumn()
  id: number;

  // 列
  // 常用字段如下:
  // name:string 数据库字段名（默认为变量名）
  // type:string 数据库字段类型（默认js类型会对应一个数据库类型，例如string对应 VARCHAR(255)）
  // length:number 字段长度（仅针对于Mysql的特点类型，比如变量类型是string,设置长度为50，数据库存的类型就是VARCHAR(50)）
  // unique:boolean 是否唯一，默认false
  // nullable:boolean 是否可为空，默认值false
  // default:any  默认值
  // comment:string 注释
  @Column({
    length: 50,
  })
  name: string;

  @Column({})
  age: number;
  
  // 自动维护创建时间，更新时间
  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
}

```

第三步：定义接口

dto对象，描述请求体的结构

```ts
// --------- src/person/dto/create-person.dto.ts ---------
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePersonDto {
  // 注意下面修饰name的两个，装饰器会触
  @IsString({
    message: 'name字段不是字符串',
  })
  @IsNotEmpty({
    message: 'name字段必传',
  })
  name: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;
}


// --------- src/person/dto/update-person.dto.ts ---------
import { PartialType } from '@nestjs/mapped-types';
import { CreatePersonDto } from './create-person.dto';
import { IsNumber } from 'class-validator';

export class UpdatePersonDto extends PartialType(CreatePersonDto) {
  @IsNumber()
  id: number;
}

```

```ts
// --------- src/person/person.controller.ts ---------
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { PersonService } from './person.service';
import { responseError, responseSuccess } from '../utils/responseUtil';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';

@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  // 查询
  @Get()
  async findAllUser() {
    try {
      const res = await this.personService.findAll();
      return responseSuccess(res);
    } catch (err) {
      return responseError(err);
    }
  }

  // 更新
  @Post('update')
  async updateUser(@Body(ValidationPipe) person: UpdatePersonDto) {
    try {
      const { name, age } = person;
      const res = await this.personService.update(person.id, { name, age }); 
      return responseSuccess(res);
    } catch (err) {
      return responseError(err);
    }
  }

  // 这里写死id是null，save就是新增，主键id设置的自增。传入的id如果存在就是更新
  @Post('save')
  async saveUser(@Body(ValidationPipe) person: CreatePersonDto) {
    try {
      const res = await this.personService.save(null, person); 
      return responseSuccess(res);
    } catch (err) {
      return responseError(err);
    }
  }

  // 删除
  @Delete(':id')
  async removeUser(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.personService.remove(id);
      return responseSuccess(null);
    } catch (err) {
      responseError(err);
    }
  }
}

```

第四步：在服务中调用数据库操作

* 方式1：@InjectEntityManager注入ORM管理器，缺点是每次操作都必须传入Person，才能确定是对Person表进行操作

  ```ts
  // --------- src/person/person.service.ts ---------
  import { Injectable } from '@nestjs/common';
  import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
  import { EntityManager, Repository } from 'typeorm';
  import { UpdatePersonDto } from './dto/update-person.dto';
  import { Person } from '../entities/person.entity';
  import { CreatePersonDto } from './dto/create-person.dto';
  
  @Injectable()
  export class PersonService {
    @InjectEntityManager()
    private readonly manager: EntityManager;
  
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>;
  
    // 查找
    findAll() {
      return this.personRepository.findBy({
        id: 1,
      });
    }
  
    // 更新
    update(id: number, createPersonDto: CreatePersonDto) {
      return this.personRepository.update(id, createPersonDto);
    }
  
    // id存在就是更新，不存在就是增加
    save(id: number, createPersonDto: CreatePersonDto) {
      return this.personRepository.save({ id, ...createPersonDto });
    }
  
    // 删除
    remove(id: number) {
      return this.personRepository.delete(id);
    }
  }
  
  ```

* 方式2：forFeature方法，在服务中使用@InjectRepository(Person)指定表为Person

  动态模块TypeOrmModule除了提供forRoot来初始化数据库连接，还提供了forFeature设置操作哪张表

  在Person模块中注入

  ```ts
  // --------- src/person/person.module.ts ---------
  import { Global, Module } from '@nestjs/common';
  import { PersonService } from './person.service';
  import { PersonController } from './person.controller';
  import { TypeOrmModule } from '@nestjs/typeorm';
  import { Person } from './entities/person.entity';
  
  @Global()
  @Module({
    imports: [TypeOrmModule.forFeature([Person])],
    controllers: [PersonController],
    providers: [PersonService],
    exports: [PersonService],
  })
  export class PersonModule {}
  
  
  
  // --------- src/person/person.service.ts --------
  import { Injectable } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { EntityManager, Repository } from 'typeorm';
  import { UpdatePersonDto } from './dto/update-person.dto';
  import { Person } from './entities/person.entity';
  
  @Injectable()
  export class PersonService {
   
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>;
  
    // 查找
    findAll() {
      return this.personRepository.find();
    }
  
    // 增加
    update(id: number, updatePersonDto: UpdatePersonDto) {
      return this.personRepository.save({
        id,
        ...updatePersonDto,
      });
    }
  
    // 删除
    remove(id: number) {
      return this.personRepository.delete(id);
    }
  }
  
  ```

### Nest集成迁移

参考：https://article.juejin.cn/post/7175519060468170810

TypeORM的设置字段migrations单独拿出来讲下

synchronize设置为true，只要代码中entity发生变化就会立即修改表结构，这十分危险，所以生产环境一般还是使用migrations

typeorm的CLI提供了命令生成表结构文件，其中提供两个方法up、down

* up就是表结构改变的SQL语句
* down是运行up修改表结构后的恢复SQL语句

我们可以手动复制up函数中的SQL去数据库执行表结构

第一步：把orm配置单独提出来

```ts
// --------- src/config/db.config.ts ---------
import { Person } from '../person/entities/person.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

const baseConfig: DataSourceOptions = {
  type: 'mysql', // 数据库类型，TypeORM目前支持mysql、 postgres、oracle、sqllite等
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'hedaodao',
  database: 'nest_practice', // 数据库名（也叫schema）。这里指定的数据库需要存在，否则会报错
  synchronize: false, // 是否自动同步entities内的实体到数据库
  migrations: ['./migrations'], // synchronize:true自动将表结构的变动同步到数据库，这十分不安全的。migrations会生成sql文件，我们手动修改数据库
  logging: true, // 打印生成的sql语句
  entities: [Person], // 支持glob ['./**/entities/*.ts']、导入的Class对象
  subscribers: [],
  poolSize: 10, // 连接池中连接的最大数量
  connectorPackage: 'mysql2', // 指定用什么驱动包。这里用的是mysql2，所以需要安装 npm install --save mysql2
};

// orm全局模块配置
const ormConfig = baseConfig;

// package脚本中typeorm生成migrations文件使用
const ormConfigForCLI = new DataSource(baseConfig);

export { ormConfig };

export default ormConfigForCLI;

```

第二步：app模块中引入，配置到orm上

```ts
// --------- src/app.module.ts ---------
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './person/person.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './config/db.config';

@Module({
  imports: [PersonModule, TypeOrmModule.forRoot(ormConfig)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

```

第三步：在package.json中配置脚本

```ts
{
  	// typeorm-ts-node-esm是typeorm cli在esm、ts中使用的命令
  	// -d 配置的是导出 export default ormConfigForCLI 的文件
  	"typeorm-cli": "typeorm-ts-node-esm -d ./src/config/db.config.ts",
    
  	// 生成迁移文件。
    // typeorm-cli是上面指定输入配置的脚本
    // 需要路径，路径最后一层是文件后缀名，如下：
    // 运行后，在根目录自动生成migrations目录，目录下生成文件的名：`时间戳-alert-table.ts`
    // 多次执行后生成多个文件，但是每个文件的变动都是执行时的entity定义与当前数据库对比后生成的。所以，一定要在迁移数据库之前再生成，避免使用了旧的
  	"migration:generate": "npm run typeorm-cli migration:generate ./migrations/alert-table",
    
    // 执行表结构变更的SQL。其根据ormConfigForCLI配置的migrations字段查找迁移文件，选取最新的文件执行
    "migration:run": "npm run typeorm-cli migration:run",
    // 撤回表变更SQL。也是读取migrations字段
    "migration:revert": "npm run typeorm-cli migration:revert",
}
```

第四步：

使用脚本：migration:generate，生成文件

```ts
// --------- migrations/1718697302609-alert-table.ts ---------
import { MigrationInterface, QueryRunner } from "typeorm";

export class AlertTable1718697302609 implements MigrationInterface {
    name = 'AlertTable1718697302609'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`person\` CHANGE \`score\` \`score\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`person\` CHANGE \`score\` \`score\` int NULL`);
    }

}
```

migration:run可以执行表结构改变的SQL，但是很多公司不允许直接操作线上数据库，所以可以直接复制迁移文件中up函数中SQL提交数据库变更工单

### 增删改查

以上面Nest例子中personRepository为例子，即查询person表

```ts
// person 是实体对象 {id:number,name:string}


// 显示查询数据在不在，存在则更新，不存在就插入
personRepositor.save(person) 


// 查询多条
personRepositor.find() // 不传参数是全部数据，入参是对象可以做很细致的查询，详细查看d.ts定义文件(官方文档：https://typeorm.bootcss.com/find-options)
personRepositor.findBy({id:1}) // 根据条件查询
const [users, count] = await personRepositor.findAndCount() // 额外返回数据条数
personRepositor.findAndCountBy({id:1})// 根据条件查询

// 查询后仅返回一条
personRepositor.findOne({ 
   			select: {
            firstName: true,
            age: true
        },
        where: {
            id: 4
        },
        order: {
            age: 'ASC'
        }
})
personRepositor.findOneBy({id:1}) // 根据条件查询

// 默认查询不到也不会报错，findOneOrFail查不到会抛出错误
personRepositor.findOneOrFail({
  where:{id:1}
})

// 删除
personRepositor.delete(person,1) // 删除id为1的
personRepositor.delete(person,[1,2]) // 批量删除id为1、2的
personRepositor.remove(person) // remove不是通过id删除，而是直接传入person对象

```

### 关联查询



### 树形实体

官方文档：https://typeorm.bootcss.com/tree-entities

第一步：新建City实体

```ts
// --------- src/entities/city.entity.ts ---------
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';

@Entity({
  name: 'city',
})
@Tree('closure-table') // 推荐使用closure-table（闭合表）这种方式，其他方式查询官方文档
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

 	// 孩子节点是数组
  @TreeChildren()
  children: City[];

  // 父亲节点
  @TreeParent()
  parent: City;
}

```

第二步：controller中添加接口就省略了啊。这里直接把service中如何使用typeorm写出来

注意：使用树实体没法用装饰器直接注入这个实体，只能@InjectEntityManager注入实体管理器

```ts
// --------- src/person/person.service.ts ---------
import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Person } from '../entities/person.entity';
import { CreatePersonDto } from './dto/create-person.dto';
import { City } from '../entities/city.entity';

@Injectable()
export class PersonService {
  @InjectEntityManager()
  private readonly manager: EntityManager;

  // 插入节点
  async addCity() {
    // 保存节点
    const city = new City();
    city.name = '河南';
    await this.manager.save(City, city); 

    // 查出来，添加到子节点的parent字段，再保存
    const parent = await this.manager.findOne(City, {
      where: {
        name: '河南',
      },
    });

    if (parent) {
      childCity.parent = parent;
    }

    const childCity = new City();
    childCity.name = '郑州';
    await this.manager.save(City, childCity); // 保存节点
  }

  // 查找一级节点
  findRoots() {
    return this.manager.getTreeRepository(City).findRoots();
  }
  
  // 其他的详见文档：https://typeorm.bootcss.com/tree-entities#%E9%97%AD%E5%90%88%E8%A1%A8
}

```

## Redis







## 部署

### docker

```dockerfile
# build stage
FROM node:18 as build-stage

WORKDIR /app

COPY package.json .

RUN npm config set registry https://registry.npmmirror.com/

RUN npm install

COPY . .

RUN npm run build

# production stage
FROM node:18 as production-stage

# 修改时区
ENV TZ=Asia/Shanghai
RUN apk update \
    && apk add tzdata \
    && echo "${TZ}" > /etc/timezone \
    && ln -sf /usr/share/zoneinfo/${TZ} /etc/localtime \
    && rm /var/cache/apk/*

COPY --from=build-stage /app/dist /app
COPY --from=build-stage /app/package.json /app/package.json

WORKDIR /app

RUN npm install --production

EXPOSE 3000

# docker run xxx:xx prod  生产环境
# docker run xxx:xx qa 测试环境

CMD ["dev"]
ENTRYPOINT ["pm2-runtime", "ecosystem.config.js", "--env"]
# 通过npm启动pm2会报错 PM2 error: TypeError: One of the pids provided is invalid
```

ecosystem.config.js：PM2的配置文件，用于指定应用名、环境变量

```js
module.exports = {
  apps: [
    {
      name: 'live-streaming-service', //  name 唯一，不能有冲突
      script: 'app.js',
      env_qa: {
        NODE_ENV: 'qa',
      },
      env_prod: {
        NODE_ENV: 'prod',
      },
    },
  ],
};

```

### 虚拟机

虚拟机需要安装好node、PM2

在package.json中启动下面脚本

```json
{
  "scripts": {
    "dev": "cross-env NODE_ENV=dev nodemon app.js",
    "vm:qa": "pm2 start --env qa",
    "vm:prod": "pm2 start --env prod"
  }
}

```

## 疑问

* 在Nest中对于业务异常是否作为Exception来处理？
* 现在服务都是多节点部署，如果服务需要持有资源，例如直播服务预约会加载素材到服务机器上，如何保证开播时的机器就是预约的机器？
* Nest默认脚手架的package.json、tsconfig中配置都是commonjs，但是项目中仍然可以用ESM

 
