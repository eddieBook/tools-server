const nodemailer = require('nodemailer')
const config = require('./config')

const transporter = nodemailer.createTransport(config);

// setup e-mail data, even with unicode symbols
let mailOptions = {
    from: 'chj.ymh@outlook.com', // sender address (who sends)
    to: '', // list of receivers (who receives)
    subject: 'hello', // Subject line 
    html: 'hello' // html body
};

// send mail with defined transport object

exports.sendMail = function (sendMessage) {
    mailOptions = Object.assign(mailOptions, sendMessage)
    return new Promise((resolve, reject) => {
        console.log('mail :', mailOptions);
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                reject(error)
            }
            resolve(info)
        });
    });

}