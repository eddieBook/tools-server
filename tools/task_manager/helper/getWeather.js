/*
 * @Author: kele 
 * @Date: 2019-03-13 09:42:44 
 * @Last Modified by: kele
 * @Last Modified time: 2019-03-13 11:29:23
 */
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
            <div>
                <h3>早上好,${user}同志:</h3>
                <p>
                今天是<strong>${today.week}</strong>,天气<strong style="color:red;font-size:24px">${today.type}</strong>,温差<strong>${today.low} /${today.high} </strong>
                太阳下山时间${today.sunset},${today.notice}.</p>
                <p>
                明天是<strong>${tomorrow.week}</strong>,天气<strong style="color:red;font-size:24px">${tomorrow.type}</strong>,温差<strong>${tomorrow.low} / ${tomorrow.high}</strong>
                太阳下山时间${tomorrow.sunset},${tomorrow.notice}.</p>
            </div><hr />
      `
            resolve(msg)
        })
    });
}