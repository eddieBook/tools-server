/*
 * @Author: kele 
 * @Date: 2019-01-11 15:30:25 
 * @Last Modified by: kele
 * @Last Modified time: 2019-02-22 22:01:44
 */
const koa = require('koa');
const koaStatic = require('koa-static');
const koaCors = require('@koa/cors');
const koaLogger = require('koa-logger');
const koaBodyparser = require('koa-bodyparser');
const setConfig = require('./config/config.controller').setConfig;
const localLog = require('./tools/record/err_log');
const routerController = require('./routers/router_controller');

const app = new koa();
// 配置静态文件
app.use(koaStatic(__dirname + '/static'));
// 配置跨域访问
if (setConfig.ALLOW_ORIGIN) {
	app.use(koaCors());
}
// 配置控制台日志
app.use(koaLogger());
//本地文件日志
app.use(localLog());
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