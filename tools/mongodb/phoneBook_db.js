const mongodb = require('mongodb').MongoClient;
const dbConf = require('./db_conf');

exports.connect = (params) => {
	return new Promise((resolve, reject) => {
		const url = `mongodb://${dbConf.ip}:${dbConf.port}/${dbConf.database.phoneBook.db}`;
		mongodb.connect(
			url,
			{
				useNewUrlParser: true
			},
			(err, db) => {
				if (err) {
					reject(err);
				}
				resolve(db);
			}
		);
	});
};

exports.insertOne = async (db, myobj) => {
	return new Promise((resolve, reject) => {
		let database = db.db(dbConf.database.phoneBook.db);
		database.collection(dbConf.database.phoneBook.table).insertOne(myobj, (err, res) => {
			if (err) {
				console.log(err);
				reject(err);
			}
			resolve(res);
			console.log(res);
		});
	});
};
