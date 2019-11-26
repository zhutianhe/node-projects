'use strict'

var Promise = require('bluebird')
var request = Promise.promisify(require('request'))
var util = require('./util')
var fs = require('fs')

var prefix = 'https://api.weixin.qq.com/cgi-bin/'
var api = {
  accessToken: prefix + 'token?grant_type=client_credential',
  upload: prefix + 'media/upload?',
  group: {

  },
  menu: {
    create: prefix + 'menu/create?',
    get: prefix + 'menu/get?',
    del: prefix + 'menu/delete?',
    current: prefix + 'get_current_selfmenu_info?',
  }
}

function Wechat(opts) {
  var that = this
  this.appID = opts.appID
  this.appSecret = opts.appSecret
  this.getAccessToken = opts.getAccessToken
  this.saveAccessToken = opts.saveAccessToken

  this.fetchAccessToken()
}

Wechat.prototype.fetchAccessToken = function() {
  var that = this
  console.log('=============Wechat=============')
  console.log(this)
  if (this.access_token && this.expires_in) {
    if (this.isValidAccessToken(this)) {
      return Promise.resolve(this)
    }
  }

  return this.getAccessToken() 
    .then(function(data) {
      try {
        data = JSON.parse(data)
      } 
      catch(e) {
        return that.updateAccessToken()
      }

      if (that.isValidAccessToken(data)) {
        return Promise.resolve(data)
      }
      else {
        return that.updateAccessToken()
      }
    })
    .then(function(data) {
      that.access_token = data.access_token
      that.expires_in = data.expires_in
      that.saveAccessToken(data)
      return Promise.resolve(data)
    })
}

Wechat.prototype.isValidAccessToken = function(data) {
  if (!data || !data.access_token || !data.expires_in) {
    return false
  } 

  var access_token = data.access_token
  var expires_in = data.expires_in
  var now = (new Date().getTime())

  if (now < expires_in) {
    return true
  }
  else {
    return false
  }
}

Wechat.prototype.updateAccessToken = function() {
  var appID = this.appID
  var appSecret = this.appSecret
  var url = api.accessToken + '&appid=' + appID + '&secret=' + appSecret
  return new Promise(function(resolve, reject) {
    request({url: url, json: true}).then(function(response) {
      var data = response.body
      var now = (new Date().getTime())
      var expires_in = now + (data.expires_in - 20) * 1000
      data.expires_in = expires_in
      resolve(data)
    })
  })
}

/**
 * 上传素材
 *
 */

Wechat.prototype.uploadMaterial = function(type, filepath) {
  console.log('上传素材')
  var that = this
  var form = {
    media: fs.createReadStream(filepath)
  }

  return new Promise(function(resolve, reject) {
    that
      .fetchAccessToken()
      .then(function(data) {
        var url = api.upload + '&access_token=' + data.access_token + '&type=' + type
        request({method: 'POST', url: url, formData: form, json: true}).then(function(response) {
          var _data = response.body
          console.log('=============结果集=============')
          console.log(_data)
          if (_data) {
            resolve(_data)
          }
          else {
            throw new Error('upload material fails')
          }
        })
        .catch(function(err) {
          reject(err)
        })
      })
  })
}


/**
 * 自定义菜单
 */
Wechat.prototype.createMenu = function(menu){
  console.log('创建菜单')
  var that = this
  return new Promise(function(resolve, reject) {
    that
      .fetchAccessToken()
      .then(function(data) {
        var url = api.menu.create + 'access_token=' + data.access_token
        request({method: 'POST', url: url, body: menu, json: true}).then(function(response) {
          var _data = response.body
          console.log('=============结果集=============')
          console.log(_data)
          if (_data) {
            resolve(_data)
          }
          else {
            throw new Error('Create menu fails')
          }
        })
        .catch(function(err) {
          reject(err)
        })
      })
  })
}

Wechat.prototype.getMenu = function(){
  console.log('获取菜单')
  var that = this
  return new Promise(function(resolve, reject) {
    that
      .fetchAccessToken()
      .then(function(data) {
        var url = api.menu.get + 'access_token=' + data.access_token
        request({url: url, json: true}).then(function(response) {
          var _data = response.body
          console.log('=============结果集=============')
          console.log(_data)
          if (_data) {
            resolve(_data)
          }
          else {
            throw new Error('Get menu fails')
          }
        })
        .catch(function(err) {
          reject(err)
        })
      })
  })
}

Wechat.prototype.deleteMenu = function(){
  console.log('删除菜单')
  var that = this
  return new Promise(function(resolve, reject) {
    that
      .fetchAccessToken()
      .then(function(data) {
        var url = api.menu.del + 'access_token=' + data.access_token
        request({url: url, json: true}).then(function(response) {
          var _data = response.body
          console.log('=============结果集=============')
          console.log(_data)
          if (_data) {
            resolve(_data)
          }
          else {
            throw new Error('Delete menu fails')
          }
        })
        .catch(function(err) {
          reject(err)
        })
      })
  })
}

Wechat.prototype.getCurrentMenu = function(){
  console.log('自定义菜单配置')
  var that = this
  return new Promise(function(resolve, reject) {
    that
      .fetchAccessToken()
      .then(function(data) {
        var url = api.menu.current + 'access_token=' + data.access_token
        request({url: url, json: true}).then(function(response) {
          var _data = response.body
          console.log('=============结果集=============')
          console.log(_data)
          if (_data) {
            resolve(_data)
          }
          else {
            throw new Error('Get current menu fails')
          }
        })
        .catch(function(err) {
          reject(err)
        })
      })
  })
}

/**
 * 自动回复
 */
Wechat.prototype.reply = function(){
  var content = this.body
  var message = this.weixin
  var xml = util.tpl(content,message)

  this.status = 200
  this.type = 'application/xml'
  this.body = xml
}

module.exports = Wechat