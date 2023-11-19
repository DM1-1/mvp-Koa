# 实现最小版的Koa

Koa是我第一次接触的Node框架，是最受欢迎的服务端框架之一。它的源码非常简单，却非常优雅，它的中间件机制也是非常有意思的。这篇文章将会实现一个最小版的Koa，来学习Koa的源码。

## 运行

```bash
npm run test
```

## 演示

一个体现了koa核心功能-洋葱模型的例子

```js
const Koa = require('koa');
const app = new Koa();

// 第一个中间件
app.use(async (ctx, next) => {
  console.log('1. 这是外层的开始');
  await next();
  console.log('5. 这是外层的结束');
});

// 第二个中间件
app.use(async (ctx, next) => {
  console.log('2. 这是内层的开始');
  await next();
  console.log('4. 这是内层的结束');
});

// 响应
app.use(async ctx => {
  console.log('3. 触发响应');
  ctx.body = 'Hello Koa';
});

app.listen(3000);
```

需要实现的模块：

* Application：服务器框架
* Context：http请求解析以及相应
* Middleware：中间件，洋葱模型实现

## 步骤

```js
const Koa = require('koa')
const app = new Koa()

app.use(ctx => {
  ctx.body = 'Hello Koa'
})

app.listen(3000)
```

运行简单的示例，断点调试，
