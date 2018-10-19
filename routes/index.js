var express = require('express');
var router = express.Router();
var sendEmail = require('../tools/sendEmail')

router.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  if (req.method == 'OPTIONS') {
    res.send(200);
    /让options请求快速返回/
  } else {
    next();
  }
});


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

// 注册用户
router.post('/register', function (req, res, next) {
  const {
    email,
    nickname,
    pass
  } = req.body;
  console.log(req.body)
  console.log(email)
  console.log(nickname)
  console.log(pass)

  if (email != undefined && nickname != undefined && pass != undefined) {
    sendEmail(email, '邮箱注册', '兄迭，没搞额')
    res.send({
      code: 0,
      msg: '注册成功'
    })
  } else {
    res.send({
      code: 1,
      msg: '元素缺失'
    })
  }
});


module.exports = router;