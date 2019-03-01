const request = require('superagent')

module.exports = async (cityCode = 101191101) => {
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
            今天是${today.week},${today.type},
            常州最${today.high},最${today.low},${today.notice},
            ------------------------------------------
            明天是${tomorrow.week},${tomorrow.type}
            常州最${tomorrow.high},最${tomorrow.low},${tomorrow.notice},
            
            `
            resolve(msg)
        })
    });
}