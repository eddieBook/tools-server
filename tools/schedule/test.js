const nodeSchedule = require('node-schedule');

exports.test = () => {
	nodeSchedule.scheduleJob('30 * * * * *', function() {
		console.log('scheduleCronstyle:' + new Date());
	});
};
