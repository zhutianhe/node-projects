'use strict'

var Promise = require('bluebird')
var createXML = require('./createXML')
var config = require('../config')
var Wechat = require('./wechat')
var menu = require('./menu')
var wechatApi = new Wechat(config.wechat)

wechatApi.deleteMenu().then(function() {
  return wechatApi.createMenu(menu)
})
.then(function(msg) {
  console.log(msg)
})

function autoReply(message, wechat) {
  console.log('进入自动回复函数')
  if (message.MsgType === 'event') {
    if (message.Event === 'subscribe') {
      if (message.EventKey) {
        console.log('扫码进入');
      }
      return Promise.resolve(createXML({
        ToUserName: message.FromUserName,
        FromUserName: message.ToUserName,
        MsgType: 'text',
        Content: 'Hello!!'
      }));
    } 
    else if (message.Event === 'unsubscribe') {
      console.log('取关');
      return Promise.resolve('');
    }
  }
  else if (message.MsgType === 'text') {
    var content = message.Content
    var reply = '额，你说的' + message.Content + '，我没看懂'

    if (content === '1') {
      reply = '您说的是数字1'
    }
    else if (content === '2') {
      reply = '您说的是数字2'
    }
    else if (content === '3') {
      reply = [
        {
          Title: '技术改变世界',
          Description: '技术改变世界技术改变世界技术改变世界技术改变世界',
          PicUrl: __dirname + '/timg.jpg',
          Url: 'http://server.zol.com.cn/686/6868500.html'
        }
      ]

      return Promise.resolve(createXML({
        ToUserName: message.FromUserName,
        FromUserName: message.ToUserName,
        MsgType: 'news',
        Articles: reply
      }));
    }
    else if (content === '4') {
      var data = wechatApi.uploadMaterial('image', __dirname + '/timg.jpg')
      reply = data.media_id
      console.log(data)
      console.log(reply)

      return Promise.resolve(createXML({
        ToUserName: message.FromUserName,
        FromUserName: message.ToUserName,
        MsgType: 'image',
        MediaId: reply
      }));
    }
    return Promise.resolve(createXML({
      ToUserName: message.FromUserName,
      FromUserName: message.ToUserName,
      MsgType: 'text',
      Content: reply
    }));
  }
}

module.exports = autoReply