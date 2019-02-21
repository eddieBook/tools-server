/*
 * @Author: kele 
 * @Date: 2019-01-11 15:30:25 
 * @Last Modified by: kele
 * @Last Modified time: 2019-02-21 22:14:32
 */
const koa = require('koa');
const koaStatic = require('koa-static');
const koaCors = require('@koa/cors');
const koaLogger = require('koa-logger');
const setConfig = require('./config/config.controller').setConfig;
const record = require('./tools/record/err_log');

const app = new koa();
// 配置静态文件
app.use(koaStatic(__dirname + '/static'));
// 配置跨域访问
if (setConfig.ALLOW_ORIGIN) {
	app.use(koaCors());
}
// 配置日志
app.use(koaLogger());
app.use(record);

app.use(async (ctx, next) => {
	ctx.body = 'hello';
});
app.on('error', (err) => {
	console.error('server error', err);
});

app.listen(setConfig.PORT);
