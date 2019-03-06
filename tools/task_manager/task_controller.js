const Task = require('./Task')
const morning = require('./list/morning')

exports.morning = () => {
    return new Task('Good Morning', '50 59 8 * * * *', morning)
}


exports.running = () => {
    new Task('Good Morning', '50 59 8 * * * *', morning).start()
}