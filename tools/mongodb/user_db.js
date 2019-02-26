const mongodb = require('mongodb').MongoClient;
const dbConf = require('./db_conf');

exports.connect = (params) => {
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
exports.createUser = (db, {
    email,
    code,
    password = ""
}) => {
    return new Promise((resolve, reject) => {
        let database = db.db(dbConf.database.users.db);
        database.collection(dbConf.database.users.table).updateOne({
            email
        }, {
            $set: {
                code,
                password
            }
        }, {
            upsert: true,
        }, (err, res) => {
            if (err) {
                reject(err)
            }
            resolve(res)

        })
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