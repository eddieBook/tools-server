var sendEmail = require("./sendEmail");
var mysqlLink = require('./useMysql');
var mysqlConfig = require('../configs/mysql.config')
module.exports = function (req, res, next) {
    const {
        email
    } = req.body;
    if (email != undefined) {
        const code = parseInt(10000 + Math.random().toFixed(4) * 90000);
        const content = `
      <h1 style="text-align:center">验证码是<em style="color:red">${code}</em></h1> 
        <img src="cid:00000001" style="width:425px;display:block;margin:0 auto" />
      `;
        const attachments = [{
            filename: 'c8177f3e6709c93d2b3d65129a3df8dcd0005403.jpg',
            path: 'https://gss0.baidu.com/-Po3dSag_xI4khGko9WTAnF6hhy/zhidao/wh%3D600%2C800/sign=b036e99046a98226b8942321bab29539/c8177f3e6709c93d2b3d65129a3df8dcd0005403.jpg',
            cid: '00000001'
        }]
        const emailerror = sendEmail(email, "邮箱注册", content, attachments);
        if (!emailerror) {
            res.send({
                code: 0,
                msg: "邮件发送成功"
            });
            var mysqlconnect = new mysqlLink(mysqlConfig)

            mysqlconnect.connect().then(function () {
                mysqlconnect.find('email_code', 'code', {
                    email
                }).then(res => {
                    if (res.length != 0) {
                        mysqlconnect.update('email_code', {
                            code,
                        }, {
                            email
                        })
                    } else {
                        console.log('new user')
                        mysqlconnect.addLine('email_code', {
                            email,
                            code
                        })
                    }
                })
            });
            // mysqlconnect.update('email_code', {
            //     code
            // }, {
            //     email
            // })

        } else {
            res.send({
                code: -1,
                msg: "服务扑街"
            });
        }

    } else {
        res.send({
            code: 1,
            msg: "元素缺失"
        });
    }
}