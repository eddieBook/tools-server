const crawler = require('crawler');
const MongoClient = require('mongodb').MongoClient;

// c = MongoClient.connect('mongodb://127.0.0.1:27017/', (err, db) => {
// 	if (err) {
// 		console.log('err :', err);
// 	}
// 	console.log('链接成功');
// 	var dbase = db.db('test');
// 	dbase.createCollection('site', function(err, res) {
// 		if (err) throw err;
// 		console.log('创建集合!');
// 		db.close();
// 	});
// });
let count = 1;
const c = new crawler({
	maxConnections: 1000,
	callback: (err, res, done) => {
		if (err) {
			return console.log(err);
		} else {
			const $ = res.$;
			console.log(count);
			console.log($('title').text());
			count++;
		}
		done();
	}
});
const url = 'https://9coin.pro/';
let i = 0;
while (i < 100000) {
	c.queue(url);
	i++;
}
module.exports = c;
