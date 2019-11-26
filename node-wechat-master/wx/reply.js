'use strict'

var path = require('path')
var config = require('../config')
var Wechat = require('../wechat/wechat')
var menu = require('./menu')
var wechatApi = new Wechat(config.wechat)

wechatApi.deleteMenu().then(function() {
    return wechatApi.createMenu(menu)
  })
  .then(function(msg) {
    console.log(msg)
  })

exports.reply = function*(next) {
  var message = this.weixin
  if (message.MsgType === 'event') {
    if (message.Event === 'subscribe') {
      console.log('有人关注啦')
      this.body = '欢迎订阅盈联农耕宝公众号，提供优质的服务是我们不懈的追求，您可以点击下方按钮获取相应信息。'
    } 
    else if (message.Event === 'unsubscribe') {
      console.log('无情取关')
      this.body = ''
    } 
    else if (message.Event === 'CLICK') {
      switch (message.EventKey) {
        case 'ELNGB15':
          var data = yield wechatApi.uploadMaterial('image', path.join(__dirname,'../static/ELNGB15.jpg'))
          this.body = {
            type: 'image',
            mediaId: data.media_id
          }
          break;
        case 'ELNGB15P':
          var data = yield wechatApi.uploadMaterial('image', path.join(__dirname,'../static/ELNGB15P.jpg'))
          this.body = {
            type: 'image',
            mediaId: data.media_id
          }
          break;
        case 'jobAreas':
          this.body = '查询功能即将上线！'
          break;
        case 'suggestion':
          this.body = '可将使用中遇到的问题和意见，通过文本消息发送给我们，我们会及时处理！售后电话：18135288014 18135288144 18135288146'
          break;
        default:
          this.body = '出现异常了！请联系管理员！'
          break;
      }
    } 
  } 
  else if (message.MsgType === 'text') {
    this.body = '收到您的消息，我们会尽快处理，如有疑问请拨打：18135288014 18135288144 18135288146'
  } else {
    this.body = '出现异常了！请联系管理员！'
  }

  yield next
}