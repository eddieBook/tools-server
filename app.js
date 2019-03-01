/*
 * @Author: kele 
 * @Date: 2019-01-11 15:30:25 
 * @Last Modified by: kele
 * @Last Modified time: 2019-02-28 17:19:51
 */
const koa = require('koa');
const koaStatic = require('koa-static');
const koaCors = require('@koa/cors');
const koaBodyparser = require('koa-bodyparser');
const setConfig = require('./config/config.controller').setConfig;
const routerController = require('./routers/router_controller');
const logger = require('./logger');
const taskController = require('./tools/task_manager/task_controller');

const app = new koa();


// 配置静态文件
app.use(koaStatic(__dirname + '/static'));
// 配置跨域访问
if (setConfig.ALLOW_ORIGIN) {
	app.use(koaCors());
}

taskController.running()

app.use(koaBodyparser());
app.use(async (ctx, next) => {
	ctx.body = ctx.request.body;
	await next()
})

//备用访问路由
app.use(routerController.routes())
app.on('error', (err) => {
	logger.warn(err)
});

app.listen(setConfig.PORT);