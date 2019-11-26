'use strict'

module.exports = {
  'button': [
    {
      // 'name': '使用说明',
      // 'sub_button': [{
      //       'name': '农耕宝1.5',
      //       'type': 'click',
      //       'key': 'ELNGB15'
      //   }, {
      //       'name': '农耕宝1.5Plus',
      //       'type': 'click',
      //       'key': 'ELNGB15P'
      //   }]
        'name': '使用说明',
        'sub_button': [{
            'name': '农耕宝1.5',
            'type': 'click',
            'key': 'ELNGB15'
        }, {
            'name': '农耕宝1.5Plus',
            'type': 'click',
            'key': 'ELNGB15P'
        }]
    }, {
      'name': '查询亩数',
      'type': 'view',
      'url': 'http://wx.elinkchina.net:3000/wechat/jobQuery'
      // 'url': 'http://www.nongji315.cn'
    }, {
      'name': '投诉建议',
      'type': 'click',
      'key': 'suggestion'
    }
  ]
}