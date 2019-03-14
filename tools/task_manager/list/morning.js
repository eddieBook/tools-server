/*
 * @Author: kele 
 * @Date: 2019-03-13 11:42:54 
 * @Last Modified by: kele
 * @Last Modified time: 2019-03-14 10:58:33
 */
const sendEmail = require('../../send_email');
const logger = require('../../../logger');
const getWeather = require('../helper/getWeather');
const userDb = require('../../mongodb/user_db');
const getCsdnNews = require('../helper/getCsdnNews');

module.exports = async () => {
	//大清早发个天气预报
	let users = await userDb.findAllUsers();
	let csdnNews = await getCsdnNews()
	users.forEach(async (item) => {
		let html = '';
		//根据订阅内容来组织发送内容
		if (item.subscription) {
			//加载通用订阅
			if (item.subscription.includes('commen')) {
				//天气
				html += await getWeather(item.name, item.city);
				html += csdnNews;
			}
		}
		// console.log('html :', html);
		// sendEmail({
		//     to: 'chj.ymh@outlook.com',
		//     subject: 'Good Morning',
		//     html
		// }).catch((err) => {
		//     logger.warn(err)
		// });
		if (html && item.email) {
			sendEmail({
				to: item.email,
				subject: 'Good Morning',
				html
			}).catch((err) => {
				logger.warn(err);
			});
		}
	});
};