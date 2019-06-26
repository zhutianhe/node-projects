var express = require('express');
var router = express.Router();
var Mock = require('mockjs');
var Random = Mock.Random;

// 获取轮播图路劲
router.get('/getlunbo', function(req, res, next) {
  var data = Mock.mock({
    'list|5': [{
      'id|+1': 1,
      'src|+1': ['../../static/img/banner01.png','../../static/img/banner02.png','../../static/img/banner03.png','../../static/img/banner04.png','../../static/img/banner05.png']
    }]
  });

  res.send({
    meta: {
      message: 'success'
    },
    status: true,
    data: data.list
  })
});

// 获取新闻列表
router.get('/getnewslist', function(req, res, next) {
  var data = Mock.mock({
    'list|20': [{
      'id|+1': 1 ,
      'title': '@ctitle',
      'add_time': '@datetime',
      'zhaiyao': '@csentence',
      'click': '@integer(60, 100)',
      'img_src|1': ['../../static/img/banner01.png','../../static/img/banner02.png','../../static/img/banner03.png','../../static/img/banner04.png','../../static/img/banner05.png']
    }]
  });

  res.send({
    meta: {
      message: 'success'
    },
    status: true,
    data: data.list
  })
});

// 获取新闻详情
router.get('/getnews/:id', function(req, res, next) {
  var data = Mock.mock({
    'list|1': [{
      'id|+1': 1 ,
      'title': '@ctitle',
      'click': '@integer(60, 100)',
      'add_time': '@datetime',
      'content': '@cparagraph(100)'
    }]
  });

  res.send({
    meta: {
      message: 'success'
    },
    status: true,
    data: data.list
  })
});

// 获取图文分类
router.get('/getimgcategory', function(req, res, next) {
  var data = Mock.mock({
    'list|8': [{
      'id|+1': 1 ,
      'title': '@ctitle(4)',
    }]
  });

  res.send({
    meta: {
      message: 'success'
    },
    status: true,
    data: data.list
  })
});

// 获取分类下图文
router.get('/getimages/:cateId', function(req, res, next) {
  var data = Mock.mock({
    'list|10': [{
      'id|+1': 1 ,
      'title': '@ctitle',
      'img_url': Random.image('200x100', Random.color(), 'Image' + Random.integer(1, 10)),
      'zhaiyao': '@csentence'
    }]
  });

  res.send({
    meta: {
      message: 'success'
    },
    status: true,
    data: data.list
  })
});

// 获取图文详情
router.get('/getimageinfo/:id', function(req, res, next) {
  var data = Mock.mock({
    'list|1': [{
      'id|+1': 1 ,
      'title': '@ctitle',
      'click': '@integer(60, 100)',
      'add_time': '@datetime',
      'content': '@cparagraph(100)'
    }]
  });

  res.send({
    meta: {
      message: 'success'
    },
    status: true,
    data: data.list
  })
})

// 获取图文中的缩略图详情
router.get('/getthumimages/:id', function(req, res, next) {
  var data = Mock.mock({
    'list|3-9': [{
      'id|+1': 1 ,
      'src': Random.image('100x100', Random.color(), 'Image' + Random.integer(1, 10)),
    }]
  });

  res.send({
    meta: {
      message: 'success'
    },
    status: true,
    data: data.list
  })
})

// 获取预览图片
router.get('/getimagepreview', function(req, res, next) {
  var data = Mock.mock({
    'list|5': [{
      'id|+1': 1,
      'src|+1': ['../../static/img/banner01.png','../../static/img/banner02.png','../../static/img/banner03.png','../../static/img/banner04.png','../../static/img/banner05.png'],
      'w': 600,
      'h': 400
    }]
  });

  res.send({
    meta: {
      message: 'success'
    },
    status: true,
    data: data.list
  })
});

// 获取图片评论
router.get('/getcomments/:id', function(req, res, next) {
  var data = Mock.mock({
    'list|10': [{
      'id|+1': 1 ,
      'user_name': '@cname',
      'content': '@cparagraph(1)',
      'add_time': '@datetime'
    }]
  });

  res.send({
    meta: {
      message: 'success'
    },
    status: true,
    data: data.list
  })
});

module.exports = router;
