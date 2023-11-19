// http模块，构建服务
const http = require('http')

/**
 * 洋葱模型的核心实现：递归地调用所有的中间件
 * @param {array} middlewares 
 * @returns {function} fn(ctx)
 */
function compose(middlewares) {
  return (ctx) => {
    const dispatch = (i) => {
      const middleware = middlewares[i]
      if (i == middlewares.length) {
        return
      }
      // app.use((ctx, next) => {})
      return middleware(ctx, () => dispatch(i + 1))
    }

    return dispatch(0)
  }
}

// 这是Koa中的上下文对象，代理了原生的req和res对象，能更方便地操作请求和响应。
class Context {
  constructor(req, res) {
    this.req = req
    this.res = res
  }
}

class Application {
  constructor() {
    this.middlewares = []
  }

  // 在 listen 中处理请求并监听端口号
  listen(...args) {
    const server = http.createServer(this.callback())
    server.listen(...args)
  }

  callback() {
    return async (req, res) => {
      const ctx = new Context(req, res)
      // 用compose函数合成中间件，中间件一般用于处理请求和响应
      const fn = compose(this.middlewares)
      try {
        await fn(ctx)
      } catch (err) {
        // 异常处理
        console.log(err)
        ctx.res.statusCode = 500
        ctx.res.end('Internal Server Error')
      }
      ctx.res.end(ctx.body)
    }
  }

  use(middleware) {
    this.middlewares.push(middleware)
  }
}

module.exports = Application
