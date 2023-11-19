const Application = require('./index')

const app = new Application()

app.use(async (ctx, next) => {
  console.log('1. 这是外层的开始')
  await next()
  console.log('5. 这是外层的结束')
})

// 第二个中间件
app.use(async (ctx, next) => {
  console.log('2. 这是内层的开始')
  await next()
  console.log('4. 这是内层的结束')
})

// 响应
app.use(async (ctx) => {
  console.log('3. 触发响应')
  ctx.body = 'Hello World'
})

app.listen(3000, () => {
  console.log('🚀 server is running at http://localhost:3000')
})
