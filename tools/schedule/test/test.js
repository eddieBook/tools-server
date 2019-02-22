const ScheduleBase = require('../schedule_base');

function app(params) {
	console.log(new Date().toLocaleTimeString());
}

const Test = new ScheduleBase('test', '* * * * * * *', app);
module.exports = Test;
