var send_email = require("../lib/email");
var mysql = require("../lib/mysql");

module.exports = {
  getCode: function(req, res, next) {
    const { email } = req.body;
    const code = parseInt(10000 + Math.random().toFixed(4) * 90000);
    mysql.findUser(email).then(user => {
      if (user.length == 0) {
        send_email(email, code)
          .then(async () => {
            res.send({ code: 0, msg: "邮件发送成功" });
            let user = await mysql.findVerifyCode(email);
            if (user.length > 0) {
              mysql.updateVerifyCode([code, email]);
            } else {
              mysql.insertVerifyCode([email, code]);
            }
          })
          .catch(e => {
            res.send({ code: -1, msg: `邮件发送失败，reason: ${e.message}` });
          });
      } else {
        res.send({ code: 1, msg: "用户已经注册" });
      }
    });
  },
  addUser: function(req, res, next) {
    const { email, code, nickname, pass } = req.body;
    mysql
      .findUser(email)
      .then(async user => {
        if (user.length > 0) {
          res.send({ code: 1, msg: "用户已经注册" });
        } else {
          let verifyCode = await mysql.findVerifyCode(email);
          if (Number(verifyCode[0].code) == code) {
            mysql
              .insertUser([email, pass, nickname, null])
              .then(() => {
                res.send({ code: 0, msg: "用户添加成功" });
              })
              .catch(e => {
                res.send({ code: -1, msg: `err reason: ${e.message}` });
              });
          } else {
            res.send({ code: 1, msg: "验证码错误" });
          }
        }
      })
      .catch(err => {
        res.send({ code: -1, msg: err.message });
      });
  },
  login: async function(req, res, next) {
    const { email, pass } = req.body;
    let user = await mysql.findUser(email);
    if (user.length == 0) {
      res.send({ code: 1, msg: "用户尚未注册" });
    } else {
      if (user[0].pass == pass) {
        console.log(req.session.userId);
        req.session.userId = req.body.email;

        res.send("ok");
      } else {
        res.send("fail");
      }
    }
  }
};
