const { Wechaty } = require("wechaty");
const request = require("superagent");

Wechaty.instance()
  .on("scan", (url, code) => {
    if (!/201|200/.test(String(code))) {
      let loginUrl = url.replace(/\/qrcode\//, "/l/");
      require("qrcode-terminal").generate(loginUrl);
    }
    console.log(`${url}\n[${code}] Scan QR Code in above url to login: `);
  })
  .on("login", user => console.log(`User ${user.name()} logined`))
  .on("message", async message => {
    const contact = message.from();

    const content = message.content();

    const room = message.room();

    if (room) {
      let roomName = room.payload.topic;
      if (roomName == "学习强国") {
        const request = require("superagent");
      }
      console.log(room.payload.topic);
    } else {
      console.log(`Contact: ${contact.name()} Content: ${content}`);
    }

    // 不处理自己发的消息

    if (message.self()) {
      return;
    }
  })
  .init();
