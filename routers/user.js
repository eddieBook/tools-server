/*
 * @Author: kele 
 * @Date: 2019-02-22 22:16:48 
 * @Last Modified by: kele
 * @Last Modified time: 2019-02-26 10:42:06
 */
const koaRouter = require('koa-router');
const validator = require('validator');
const mongodb = require('mongodb').MongoClient;
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
        html: `验证码为<b>${parseInt(Math.random() * 10000)}</b>,<br/>此验证码一直有效直到下次获取`
    }
    try {
        let url = 'mongodb://localhost:27017/test';
        mongodb.connect(url, {
            useNewUrlParser: true
        }, (err, db) => {
            if (err) {
                throw (err)
            }
            let database = db.db('test');
            let obj = {
                name: 'zhangteng'
            };
            database.collection('user').insertOne(obj, (err, res) => {
                if (err) {
                    throw (err)
                };
                console.log('res :', res);
            })
        })






        // await send.sendMail(sendMessage)
        ctx.body = {
            code: 0,
            msg: 'success'
        }
    } catch (error) {
        ctx.throw('500', error)
    }

})

module.exports = router;