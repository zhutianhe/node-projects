const router = require('koa-router')()
const axios = require('axios')
const querystring = require('querystring')

// 配置第三方认证服务地址, 这里以github为例
const oauth = {
  codePath: 'https://github.com/login/oauth/authorize',
  tokenPath: 'https://github.com/login/oauth/access_token',
  apiPath: 'https://api.github.com'
}

// 配置客户端信息
const clientInfo = {
  client_id: '73a4f730f2e8cf7d5fcf',
  client_secret: '74bde1aec977bd93ac4eb8f7ab63352dbe03ce48'
}

// 用户登录，重定向到认证接口
router.post('/oauth/login', async ctx => {
  // 定义第三方认证地址
  var path = oauth.codePath
  path += '?client_id=' + clientInfo.client_id

  // 转发到第三方认证服务器
  ctx.redirect(path)
})

// 提供给认证服务器的回调请求，并使用授权码想认证服务器索取token
router.get('/oauth/callback', async ctx => {
  // 获取授权码
  const code = ctx.query.code
  const params = { ...clientInfo, code: code }

  // 获取token
  let res = await axios.post(oauth.tokenPath, params)
  const access_token = querystring.parse(res.data).access_token

  // 获取需认证的api资源
  res = await axios.get(oauth.apiPath + '/user?access_token=' + access_token)

  console.log('userAccess:', res.data)
  ctx.body = `
        <h1>Hello ${res.data.login}</h1>
        <img src="${res.data.avatar_url}" alt=""/>
    `
})

module.exports = router
