/*
 * @Author: kele 
 * @Date: 2019-01-11 15:30:58 
 * @Last Modified by: kele
 * @Last Modified time: 2019-03-01 13:10:45
 */
const fs = require('fs');
const yamljs = require('yamljs');


//线上dev，本地local
let config_controller = process.env.NODE_ENV === 'production' ? 'dev' : 'local';
let setConfig = yamljs.parse(
	fs.readFileSync(__dirname + '/setting/' + config_controller.USE_CONFIG + '.yml').toString()
);
exports.setConfig = setConfig;