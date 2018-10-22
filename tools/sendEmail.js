var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'qq',
    port: 465, // SMTP 端口
    secureConnection: true, // 使用 SSL
    auth: {
        user: '3241990245@qq.com',
        pass: 'bpklrxlqkscddajc'
    }
});

module.exports = function (url, title, content, attachments) {
    var mailOptions = {
        from: '3241990245@qq.com', // 发件地址
        to: url, // 收件列表
        subject: title, // 标题  
        html: content, // html 内容
        attachments: attachments
    };
    console.log(mailOptions)
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);

    });
}