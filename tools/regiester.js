var sendEmail = require("./sendEmail");
var mysql = require('mysql');
module.exports = function (req, res, next) {
    const {
        email
    } = req.body;
    if (email != undefined) {
        const content = `
      <h1 style="text-align:center">验证码是<em style="color:red">${10000 +
        Math.random().toFixed(4) * 90000}</em></h1> 
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
            var connection = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: 'Windows10',
                port: '3306',
                database: 'tools',
            });
            connection.connect(e => {
                if (e) {
                    console.log(e)
                    console.log('connect faild')
                } else {
                    console.log('connect success')
                }
            });
            var addSql = 'INSERT INTO user(user_id,email,nick_name,register_time,code,password) VALUES(0,?,?,?,?,?)';
            var addSqlParams = ['813941626@qq.com', 'kele', '2014/3/12', '23453', '1111'];
            connection.query(addSql, addSqlParams, function (err, result) {
                if (err) {
                    console.log('[INSERT ERROR] - ', err.message);
                    return;
                }

                console.log('--------------------------INSERT----------------------------');
                //console.log('INSERT ID:',result.insertId);        
                console.log('INSERT ID:', result);
                console.log('-----------------------------------------------------------------\n\n');
            });
            connection.end();
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