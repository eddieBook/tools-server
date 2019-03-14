/*
 * @Author: kele 
 * @Date: 2019-03-13 09:42:37 
 * @Last Modified by: kele
 * @Last Modified time: 2019-03-14 10:07:45
 */
const puppeteer = require('puppeteer');
module.exports = async (params) => {
    let back_html = `
    <dl>
        <dt>CSDN文章推荐：</dt>
    `;
    const brower = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })
    const page = await brower.newPage();
    await page.setRequestInterception(true);
    //过滤不用文件
    page.on('request', interceptedRequest => {
        if (interceptedRequest.url().endsWith('.png') || interceptedRequest.url().endsWith('.jpg'))
            interceptedRequest.abort();
        else
            interceptedRequest.continue();
    });
    //设置浏览器
    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299")
    await page.goto('https://blog.csdn.net/nav/cloud');
    await page.waitForSelector('#feedlist_id li[data-type="blog"] div.list_con .title>h2>a');
    let data = await page.$$eval('#feedlist_id li[data-type="blog"] div.list_con .title>h2>a', links => links.map(el => {
        return {
            href: el.href.trim(),
            content: el.innerText
        }
    }));
    await brower.close();
    data.length = 5
    data.forEach(item => {
        back_html += `<dd><a href="${item.href}">${item.content}</a></dd>`
    });
    back_html += '</dl><hr />'

    return back_html

}