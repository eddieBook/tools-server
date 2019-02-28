/*
 * @Author: kele 
 * @Date: 2019-01-11 15:30:25 
 * @Last Modified by: kele
 * @Last Modified time: 2019-02-27 17:49:11
 */
const koa = require('koa');
const koaStatic = require('koa-static');
const koaCors = require('@koa/cors');
const koaBodyparser = require('koa-bodyparser');
const log4Js = require('log4js');
const setConfig = require('./config/config.controller').setConfig;
const routerController = require('./routers/router_controller');
const logConf = require('./log.config');

const app = new koa();
// 配置静态文件
app.use(koaStatic(__dirname + '/static'));
// 配置跨域访问
if (setConfig.ALLOW_ORIGIN) {
	app.use(koaCors());
}
// 配置控制台日志 
log4Js.configure(logConf);
const logFile = log4Js.getLogger('log_file');
logFile.trace('this is a log')




app.use(koaBodyparser());
app.use(async (ctx, next) => {
	ctx.body = ctx.request.body;
	await next()
})


app.use(routerController.routes())
app.on('error', (err) => {
	console.error(err);
});

app.listen(setConfig.PORT);