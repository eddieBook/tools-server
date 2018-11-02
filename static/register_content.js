module.exports = function(code) {
  //邮件默认发送内容
  const html = `
      <h1 style="text-align:center">验证码是<em style="color:red">${code}</em></h1> 
        <img src="cid:00000001" style="width:425px;display:block;margin:0 auto" />
      `;
  //邮件默认发送附件
  const attachments = [
    {
      filename: "c8177f3e6709c93d2b3d65129a3df8dcd0005403.jpg",
      path:
        "https://gss0.baidu.com/-Po3dSag_xI4khGko9WTAnF6hhy/zhidao/wh%3D600%2C800/sign=b036e99046a98226b8942321bab29539/c8177f3e6709c93d2b3d65129a3df8dcd0005403.jpg",
      cid: "00000001"
    }
  ];
  const subject = "renegade code";
  const from = "3241990245@qq.com";
  return { from, html, attachments, subject };
};
