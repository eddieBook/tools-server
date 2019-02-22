/*
 * @Author: kele 
 * @Date: 2019-02-22 22:16:48 
 * @Last Modified by:   kele 
 * @Last Modified time: 2019-02-22 22:16:48 
 */
const koaRouter = require('koa-router');
const router = new koaRouter();

router.post('/register', async (ctx, next) => {

    for (let i in ctx.body) {
        if (ctx.body[i].length < 1 || ctx.body[i] == '') {
            ctx.body = {
                message: '元素缺失',
                code: -1,
            }
        }
    }
});

module.exports = router;