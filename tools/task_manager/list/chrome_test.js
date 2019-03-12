const puppeteer = require('puppeteer')

module.exports = async (params) => {

    // const browser = await puppeteer.launch({
    //     args: ['--no-sandbox', '--disable-setuid-sandbox']
    // });
    const browser = await puppeteer.launch({
        headless: false,

    });
    const page = await browser.newPage();
    page.setViewport({
        width: 1920,
        height: 1080
    })
    await page.goto('https://9coin.pro');
    setTimeout(async () => {
        const divsCounts = await page.$$eval('.list-content a', (el) => Array.from(el).map(el => el.innerText));
        divsCounts.forEach(element => {
            console.log(element);
        });
    }, 2000);

    // Get the "viewport" of the page, as reported by the page.

    // await browser.close();

}