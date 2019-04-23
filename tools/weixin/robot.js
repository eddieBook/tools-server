const {
    Wechaty
} = require('wechaty')

Wechaty.instance()
    .on('scan', (url, code) => {
        if (!/201|200/.test(String(code))) {
            let loginUrl = url.replace(/\/qrcode\//, '/l/')
            require('qrcode-terminal').generate(loginUrl)
        }
        console.log(`${url}\n[${code}] Scan QR Code in above url to login: `)
    })
    .on('login', user => console.log(`User ${user.name()} logined`))
    .on('message', async (message) => {

        const contact = message.from()

        const content = message.content()

        const room = message.room()

        if (room) {

            console.log(`Room: ${room.topic()} Contact: ${contact.name()} Content: ${content}`)

        } else {

            console.log(`Contact: ${contact.name()} Content: ${content}`)

        }

        // 不处理自己发的消息

        if (message.self()) {

            return

        }

        if (/cc/.test(content)) {

            message.say('2333333333333        -来自微信robote')

        }

    })
    .init()