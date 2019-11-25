const Koa = require('koa')
const app = new Koa()
const bodyparser = require('koa-bodyparser')
const cors = require('koa2-cors')
const session = require('koa-session')

const index = require('./routes/index')
const loginToken = require('./routes/login-token')
const loginSession = require('./routes/login-session')

// 配置session的中间件
app.use(
  cors({
    credentials: true
  })
)
app.keys = ['some secret']

// 配置请求转换中间件
app.use(bodyparser())

// 配置静态资源的中间件
app.use(require('koa-static')(__dirname + '/public'))

app.use(session(app))
app.use((ctx, next) => {
  if (ctx.url.indexOf('login') > -1) {
    next()
  } else {
    console.log('session', ctx.session.userInfo)
    if (!ctx.session.userInfo) {
      ctx.body = {
        message: '登录失败'
      }
    } else {
      next()
    }
  }
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(loginToken.routes(), loginToken.allowedMethods())
app.use(loginSession.routes(), loginSession.allowedMethods())

module.exports = app
