const puppeteer = require('puppeteer')

module.exports = async (params) => {

    const browser = await (puppeteer.launch({
        headless: false
    }));
    const page = await browser.newPage();
    page.setViewport({
        width: 750,
        height: 1300
    })
    await page.goto('http://map.winkey.vip/index');
    await page.focus('.header-top .relative input');
    await page.keyboard.sendCharacter('test');
    await page.screenshot({
        path: 'jianshu.png',
        type: 'png',
        // quality: 100, 只对jpg有效
        fullPage: true,
        // 指定区域截图，clip和fullPage两者只能设置一个
        // clip: {
        //   x: 0,
        //   y: 0,
        //   width: 1000,
        //   height: 40
        // }
    });
    browser.close();

}