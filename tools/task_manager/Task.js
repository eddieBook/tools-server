const nodeSchedule = require('node-schedule');

class Base {
    constructor(name, rule, callback) {
        this.name = name;
        this.schedule = Symbol(name);
        this.rule = rule;
        this.callback = callback;
    }
    start() {
        this[this.schedule] = nodeSchedule.scheduleJob(this.rule, this.callback);
        console.log(`${this.name}定时器开启`);
    }
    stop() {
        console.log(`${this.name}定时器关闭`);
        this[this.schedule].cancel();
    }
}
module.exports = Base;