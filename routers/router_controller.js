/*
 * @Author: kele 
 * @Date: 2019-01-11 15:30:32 
 * @Last Modified by: kele
 * @Last Modified time: 2019-02-22 21:38:17
 */
const koaRouter = require('koa-router');
const router = new koaRouter();

const user = require('./user');

router.use('/user', user.routes(), user.allowedMethods());
module.exports = router;
