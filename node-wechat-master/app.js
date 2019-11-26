'use strict'

var Koa = require('koa')
var wechat = require('./wechat/g')
var config = require('./config')
var reply = require('./wx/reply')

var app = new Koa()
// 方式一
app.use(wechat(config.wechat, reply.reply))

// 方式二
// app.use(wechat(config.wechat))

app.listen(80)
console.log('Listening: 80')