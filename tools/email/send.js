const nodemailer = require('nodemailer')
const config = require('./config')

const transporter = nodemailer.createTransport(config);

// setup e-mail data, even with unicode symbols
let mailOptions = {
    from: 'chj.ymh@outlook.com', // sender address (who sends) 
    subject: 'hello', // Subject line  
};

// send mail with defined transport object

exports.sendMail = function (sendMessage) {
    mailOptions = Object.assign(mailOptions, sendMessage)
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                reject(error)
            }
            resolve(info)
        });
    });

}