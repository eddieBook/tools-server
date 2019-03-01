const Task = require('./Task')
const morning = require('./list/morning')

exports.morning = () => {
    return new Task('Good Morning', '10 10 9 * * * *', morning)
}


exports.running = () => {
    new Task('Good Morning', '10 10 9 * * * *', morning).start()
}