const config = {
  port: 3000,
  database: {
    DATABASE: "tools",
    USERNAME: "root",
    PASSWORD: "Windows10",
    PORT: "3306",
    HOST: "localhost"
  },
  email: {
    service: "qq",
    port: 465, // SMTP 端口
    secureConnection: true, // 使用 SSL
    auth: {
      user: "3241990245@qq.com",
      pass: "bpklrxlqkscddajc"
    }
  }
};
module.exports = config;
