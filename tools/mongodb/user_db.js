const mongodb = require('mongodb').MongoClient;
const dbConf = require('./db_conf');

const connect = (params) => {
    return new Promise((resolve, reject) => {
        const url = `mongodb://${dbConf.ip}:${dbConf.port}/${dbConf.database.users.db}`
        mongodb.connect(url, {
            useNewUrlParser: true
        }, (err, db) => {
            if (err) {
                reject(err)
            }
            resolve(db)
        })
    });
};
exports.findAllUsers = async (where = {}) => {
    const db = await connect();
    return new Promise((resolve, reject) => {
        const database = db.db(dbConf.database.users.db);
        database.collection(dbConf.database.users.table).find(where).toArray(function (err, res) { // 返回集合中所有数据
            if (err) {
                reject(err)
            };
            db.close();
            resolve(res)
        });
    });

}


exports.getOneInfo = (db, where) => {
    return new Promise((resolve, reject) => {
        let database = db.db(dbConf.database.users.db);
        database.collection(dbConf.database.users.table).findOne(where, (err, res) => {
            if (err) {
                reject(err)
            }
            resolve(res)
        })
    });
}