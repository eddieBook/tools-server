const Task = require('./Task')
const morning = require('./list/morning')
const chromeTest = require('./list/chrome_test')


exports.running = () => {


    chromeTest()


    // new Task('Good Morning', '0 0 6 * * * *', morning).start()
}

// exports.morning = () => {
//     return new Task('Good Morning', '50 59 8 * * * *', morning)
// }