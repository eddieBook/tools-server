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
/**
 * toEmail:收件人
 * title:邮箱标题
 * content：邮件内容
 * attachments：附件
 */
module.exports = function (toEmail, title, content, attachments) {
    var mailOptions = {
        from: '3241990245@qq.com', // 发件地址
        to: toEmail, // 收件列表
        subject: title, // 标题  
        html: content, // html 内容
        attachments: attachments
    };
    transporter.sendMail(mailOptions, function (error, info) {
        return error
    });
}