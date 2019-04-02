/*
 * @Author: kele 
 * @Date: 2019-03-13 11:42:56 
 * @Last Modified by: kele
 * @Last Modified time: 2019-04-01 17:56:35
 */
const Task = require('./Task');
const morning = require('./list/morning');

exports.running = () => {
	// chromeTest()
	// getCsdnNews()

	// morning()
	new Task('Good Morning', '0 0 6 * * * *', morning).start();
};

// exports.morning = () => {
//     return new Task('Good Morning', '50 59 8 * * * *', morning)
// }
