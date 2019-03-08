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
            今天是${today.week},     ${today.type},
            ${city}最${today.high},最${today.low},${today.notice},
            ------------------------------------------
            明天是${tomorrow.week},     ${tomorrow.type}
            ${city}最${tomorrow.high},最${tomorrow.low},${tomorrow.notice},
            `
            resolve(msg)
        })
    });
}