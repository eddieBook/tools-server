const sendEmail = require('../../send_email')
const logger = require('../../../logger')
const getWeather = require('../helper/getWeather')
const userDb = require('../../mongodb/user_db')

module.exports = async () => {
    //大清早发个天气预报
    let users = await userDb.findAllUsers()
    users.forEach(async (item) => {
        let data;
        //根据订阅内容来组织发送内容
        if (item.subscription) {
            if (item.subscription.includes('weather')) {
                data += await getWeather(item.name, item.city);
            }
        }
        if (data && item.email) {
            sendEmail({
                // to: 'chj.ymh@outlook.com',
                to: item.email,
                subject: 'Good Morning',
                text: data
            }).catch((err) => {
                logger.warn(err)
            });
        }

    });
}