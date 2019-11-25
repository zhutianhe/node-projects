const router = require('koa-router')()
const jwt = require('jsonwebtoken')
const jwtAuth = require('koa-jwt')

const secret = 'secret'

// 用户登录，获取token
router.post('/login-token', async ctx => {
  const { body } = ctx.request

  // 登录逻辑...

  // 设置token
  const userInfo = body.username
  ctx.body = {
    message: '登录成功',
    user: userInfo,
    // 生成一个token 返回给客户端
    token: jwt.sign(
      {
        data: userInfo,
        // token的过期时间为一小时
        exp: Math.floor(Date.now() / 1000) + 60 * 60
      },
      secret
    )
  }
})

// 获取认证资源  用户信息
router.get('/getUser-token', jwtAuth({ secret }), async ctx => {
  // 验证通过
  console.log(ctx.state.user)

  ctx.body = {
    message: '获取数据成功',
    userInfo: ctx.state.user.data
  }
})

module.exports = router
