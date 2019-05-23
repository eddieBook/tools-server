/*
 * @Author: kele 
 * @Date: 2019-01-11 15:30:58 
 * @Last Modified by: kele
 * @Last Modified time: 2019-05-23 14:15:32
 */
const fs = require('fs');
const yamljs = require('yamljs');


console.log(process.env)
//线上dev，本地local
let config_controller = {
	USE_CONFIG: process.env.NODE_ENV === 'production' ? 'dev' : 'local'
}
console.log(config_controller.USE_CONFIG);

let setConfig = yamljs.parse(
	fs.readFileSync(__dirname + '/setting/' + config_controller.USE_CONFIG + '.yml').toString()
);
exports.setConfig = setConfig;