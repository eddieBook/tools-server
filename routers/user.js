/*
 * @Author: kele 
 * @Date: 2019-02-22 22:16:48 
 * @Last Modified by: kele
 * @Last Modified time: 2019-02-23 12:17:23
 */
const koaRouter = require('koa-router');
const validator = require('validator');
const send = require('../tools/email/send');

const router = new koaRouter();

router.post('/register', async (ctx, next) => {

    for (let i in ctx.body) {
        if (validator.isEmpty(ctx.body[i])) {
            ctx.body = {
                message: '缺东西',
                code: -1,
            }
        }
    }
});
router.post('/getCode', async (ctx, next) => {
    if (!validator.isEmail(ctx.body.address)) {
        return ctx.body = {
            code: 2,
            message: '邮箱格式不正确'
        }
    }
    let sendMessage = {
        to: ctx.body.address,
        html: 'hello world'
    }
    try {
        await send.sendMail(sendMessage)
        ctx.body = {
            code: 0,
            msg: 'success'
        }
    } catch (error) {
        ctx.body = {
            code: -1,
            msg: error
        }
    }

})

module.exports = router;