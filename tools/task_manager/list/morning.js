const sendEmail = require('../../send_email')
const logger = require('../../../logger')
const getWeather = require('../helper/getWeather')

module.exports = async () => {
    //大清早发个天气预报
    let data = await getWeather()
    sendEmail({
        to: "chj.ymh@outlook.com",
        subject: 'Good Morning',
        text: data
    })
}