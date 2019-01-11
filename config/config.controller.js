/*
 * @Author: kele 
 * @Date: 2019-01-11 15:30:58 
 * @Last Modified by:   kele 
 * @Last Modified time: 2019-01-11 15:30:58 
 */
const fs = require('fs');
const yamljs = require('yamljs');

let config_controller = yamljs.parse(fs.readFileSync(__dirname + '/setting.yml').toString());
let setConfig = yamljs.parse(
	fs.readFileSync(__dirname + '/setting/' + config_controller.USE_CONFIG + '.yml').toString()
);
exports.setConfig = setConfig;
