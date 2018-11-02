const nodemailer = require("nodemailer");
const { email: emailConfig } = require("../configs/default");
const emailOption = require("../static/register_content");

//邮件配置初始化
const transporter = nodemailer.createTransport(emailConfig);

module.exports = function(to, code) {
  let mailOption = Object.assign({}, { to }, emailOption(code));
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOption, (err, info) => {
      if (err) {
        reject(err);
      } else {
        resolve(info);
      }
    });
  });
};
