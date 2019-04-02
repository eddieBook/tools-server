/*
 * @Author: kele 
 * @Date: 2019-03-13 11:42:54 
 * @Last Modified by: kele
 * @Last Modified time: 2019-04-01 17:52:56
 */
const sendEmail = require('../../send_email');
const logger = require('../../../logger');
const getWeather = require('../helper/getWeather');
const userDb = require('../../mongodb/user_db');
const getCsdnNews = require('../helper/getCsdnNews');

module.exports = async () => {
	//大清早发个天气预报
	let users = await userDb.findAllUsers();
	//csdn
	let csdnNews = await getCsdnNews();
	users.forEach(async (item) => {
		let html = '';
		//根据订阅内容来组织发送内容
		if (item.subscription) {
			//加载通用订阅
			if (item.subscription.includes('commen')) {
				//天气
				html += await getWeather(item.name, item.city);
			}
			if (item.subscription.includes('csdn')) {
				html += csdnNews;
			}
		}
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
