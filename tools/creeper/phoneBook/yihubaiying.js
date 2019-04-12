const crawler = require('crawler');
const puppeteer = require('puppeteer');
const phoneBookDb = require('../../mongodb/phoneBook_db');

const insertMongo = async (info) => {
	let db = await phoneBookDb.connect();
	await phoneBookDb.insertOne(db, info);
	db.close();
};

const findDetail = new crawler({
	maxConnections: 10,
	callback: function(error, res, done) {
		if (error) {
			console.log(error);
		} else {
			let $ = res.$;
			let company = $('.gsinfocon ul').eq(0).find('.gslir span').text();

			if (company) {
				let business = $('.gsinfocon ul').eq(2).find('.gslir').text(); //主营
				let product = $('.gsinfocon ul').eq(3).find('.gslir').text(); //服务
				let addr = $('.gslxcon ul').eq('0').find('.gslxr').text();
				let phone = $('.gslxcon ul').eq('1').find('.gslxr').text();
				let call = $('.gslxcon ul').eq('3').find('.gslxr').text();
				let person = $('.gslxcon ul').eq('4').find('.gslxr').text();

				let info = { company, business, product, addr, phone, call, person };
				insertMongo(info).then;
			}
		}
		done();
	}
});

const getlog = async (url) => {
	const brower = await puppeteer.launch({
		args: [ '--no-sandbox', '--disable-setuid-sandbox' ]
	});
	const page = await brower.newPage();
	await page.setRequestInterception(true);
	//过滤不用文件
	page.on('request', (interceptedRequest) => {
		if (interceptedRequest.url().endsWith('.png') || interceptedRequest.url().endsWith('.jpg'))
			interceptedRequest.abort();
		else interceptedRequest.continue();
	});
	//设置浏览器
	// await page.setUserAgent(
	// 	'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299'
	// );
	await page.goto(url);
	await page.waitForSelector('#content > div > ul > li > a');
	while (page.$('#digg > a:nth-child(8)')) {
		console.log('in');
		let list = await page.$$eval('#content > div > ul > li > a', (links) =>
			links.map((el) => {
				return {
					href: el.href.trim(),
					content: el.innerText
				};
			})
		);
		list.forEach((item) => {
			findDetail.queue(item.href);
		});
		// page.$$eval('#content', (links) => {
		// 	console.log(links);
		// 	// links.forEach((el) => {
		// 	// 	let url = 'http://qiye.youboy.com' + el.href.trim();
		// 	// 	console.log(url);
		// 	// 	// findDetail.queue(url);
		// 	// });
		// });
		page.click('#digg > a:nth-child(7)');
	}

	// await brower.close();
};

exports.start = () => {
	let page = 1;
	getlog('http://qiye.youboy.com/pro8_1.html');
};
