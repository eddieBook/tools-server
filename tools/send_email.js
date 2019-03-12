/*
 * @Author: kele 
 * @Date: 2019-02-28 13:20:17 
 * @Last Modified by: kele
 * @Last Modified time: 2019-03-12 18:13:30
 */
const nodemailer = require('nodemailer')
const config = module.exports = {
    host: "smtp.qq.com", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
        ciphers: 'SSLv3'
    },
    auth: {
        user: 'chj.ymh@qq.com',
        pass: 'yagdqgldpbyzdbec'
    }
}

const transporter = nodemailer.createTransport(config);
// send mail with defined transport object

const sendMail = ({
    from = config.auth.user,
    subject = "Send By Kele",
    to = "",
    text = "",
    html = ""

}, ...rest) => {
    return new Promise((resolve, reject) => {
        transporter.sendMail({
            from, //发出地址
            subject, //主题
            to, //接受地址,以分号隔开
            text, //正文
            html, //html,
            ...rest //其他如附件
        }, (error, info) => {
            if (error) {
                reject(error)
            }
            resolve(info)
        });
    });

}

module.exports = sendMail