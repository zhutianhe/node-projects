const router = require('koa-router')()
const session = require('koa-session')
const cors = require('koa2-cors')

const secret = 'secret'

// 用户登录，设置session
router.post('/login-session', async ctx => {
  const { body } = ctx.request

  // 登录逻辑...

  // 设置session
  const userInfo = body.username
  ctx.session.userInfo = userInfo
  ctx.body = {
    message: '登录成功'
  }
})

// 用户登出，删除session
router.post('/logout-session', async ctx => {
  delete ctx.session.userInfo
  ctx.body = {
    message: '登出系统'
  }
})

// 获取认证资源  用户信息
router.get('/getUser-session', async ctx => {
  ctx.body = {
    message: '获取数据成功',
    userInfo: ctx.session.userInfo
  }
})

module.exports = router
