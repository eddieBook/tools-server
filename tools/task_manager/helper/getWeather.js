const request = require('superagent')
const cityList = require('./city.json')

module.exports = async (user, city) => {
    let cityCode = cityList.find(n => n.city_name === city).city_code;
    return new Promise((resolve, reject) => {
        request.get(`http://t.weather.sojson.com/api/weather/city/${cityCode}`).end((err, res) => {
            if (err) {
                logger.warn(err);
                reject()
            }
            let {
                data: {
                    forecast: [today, tomorrow]
                }
            } = JSON.parse(res.text);

            let msg = ` 
    早上好,${user}同志:
            今天【${today.week}】,天气【${today.type}】,温差【${today.low} /${today.high} 】
            太阳下山时间${today.sunset},${today.notice}.
            ------------------------------------------
            明天【${tomorrow.week}】,天气【${tomorrow.type}】,温差【${tomorrow.low} /${tomorrow.high} 】
            太阳下山时间${tomorrow.sunset},${tomorrow.notice}.
            `
            resolve(msg)
        })
    });
}