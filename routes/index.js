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
    email
  } = req.body;
  console.log(req.body)
  if (email != undefined) {
    const content = `
    <h1 style="text-align:center">验证码是<em>${10000 + Math.random().toFixed(4) * 90000}</em></h1> 
    `
    sendEmail(email, '邮箱注册', content)
    res.send({
      code: 0,
      msg: '邮件发送成功'
    })
  } else {
    res.send({
      code: 1,
      msg: '元素缺失'
    })
  }
});


module.exports = router;