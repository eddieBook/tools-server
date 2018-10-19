var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    //https://github.com/andris9/nodemailer-wellknown#supported-services 支持列表
    service: 'qq',
    port: 465, // SMTP 端口
    secureConnection: true, // 使用 SSL
    auth: {
        user: '324190245@qq.com',
        //这里密码不是qq密码，是你设置的smtp密码
        pass: 'bzciycmrrryqcihd'
    }
});

// NB! No need to recreate the transporter object. You can use
// the same transporter object for all e-mails

// setup e-mail data with unicode symbols


// send mail with defined transport object


module.exports = function (url, title, content) {
    var mailOptions = {
        from: '3241990245@qq.com', // 发件地址
        to: url, // 收件列表
        subject: title, // 标题
        //text和html两者只支持一种
        text: 'Hello world ?',
        html: content // html 内容
    };
    console.log(mailOptions)
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);

    });
}