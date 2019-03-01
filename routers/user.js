/*
 * @Author: kele 
 * @Date: 2019-02-22 22:16:48 
 * @Last Modified by: kele
 * @Last Modified time: 2019-02-26 17:40:48
 */
const koaRouter = require('koa-router');
const validator = require('validator');
const send = require('../tools/send_email');
const userDb = require('../tools/mongodb/user_db');

const router = new koaRouter();

router.post('/login', async (ctx, next) => {
    if (!validator.isEmpty(ctx.body.email) && !validator.isEmpty(ctx.body.password)) {
        try {
            let db = await userDb.connect();
            let userInfo = await userDb.getOneInfo(db, {
                email: ctx.body.email,
                password: ctx.body.password
            });
            if (userInfo != null && userInfo.code) {
                ctx.body = {
                    code: 0,
                    message: '登陆成功'
                }
            } else {
                ctx.body = {
                    message: '登陆失败'
                }
            }
            db.close()
        } catch (error) {
            throw error
        }

    } else {
        ctx.body = {
            message: '登陆失败'
        }
    }

})


router.post('/register', async (ctx, next) => {
    for (let i in ctx.body) {
        if (validator.isEmpty(ctx.body[i])) {
            ctx.body = {
                message: '缺东西',
                code: -1,
            }
            return
        }
    }
    try {
        let db = await userDb.connect();
        let userInfo = await userDb.getOneInfo(db, {
            email: ctx.body.email
        })
        if (userInfo != null && userInfo.code) {
            if (Number(ctx.body.code) == userInfo.code && !validator.isEmpty(ctx.body.password)) {
                await userDb.createUser(db, {
                    email: ctx.body.email,
                    code: userInfo.code,
                    password: ctx.body.password
                })
                db.close()
                ctx.body = {
                    code: 0,
                    message: '注册成功'
                }
            } else {
                ctx.body = {
                    message: '注册失败,确认验证码和密码'
                }
            }
        } else {
            ctx.body = {
                message: '没获取过验证码'
            }
        }
    } catch (error) {
        throw error
    }




});
router.post('/getCode', async (ctx, next) => {
    if (!validator.isEmail(ctx.body.email)) {
        return ctx.body = {
            message: '邮箱格式不正确'
        }
    }
    let code = parseInt(Math.random() * 10000)
    let sendMessage = {
        to: ctx.body.email,
        html: `验证码为<b>${code}</b>,<br/>此验证码一直有效直到下次获取`
    }
    try {
        let db = await userDb.connect();
        await userDb.createUser(db, {
            email: ctx.body.email,
            code
        })
        db.close()
        await send.sendMail(sendMessage)
        ctx.body = {
            code: 0,
            message: '获取验证码成功'
        }
    } catch (error) {
        ctx.throw('500', error)
    }

});
module.exports = router;