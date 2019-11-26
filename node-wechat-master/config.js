'use strict'

var path = require('path')
var util = require('./libs/util.js')
var wechat_file = path.join(__dirname, './config/wechat.txt')

var config = {
  wechat: {
    // 产品share
    // appID: 'wxfcc493ce50b0f8ce',
    // appSecret: '287a950a1d37b24630be93955cc77fd0',
    // token: 'elink_wechat',
    
    // 农耕宝
    appID: 'wxf48753231c128d2c',
    appSecret: 'd8566b96da97f6447b15da87156b3062',
    token: 'elink_wechat',
    
    getAccessToken: function() {
      return util.readFileAsync(wechat_file)
    },
    saveAccessToken: function(data) {
      data = JSON.stringify(data)
      return util.writeFileAsync(wechat_file, data)
    }
  }
}

module.exports = config 