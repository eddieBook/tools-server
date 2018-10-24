/**
 * mysql 操作
 * 初始化
 *      host = 'localhost',
        user = 'root',
        port = '3306',
        password: null,
        database: null
 */
var mysql = require('mysql');

module.exports = class OperationMysql {
    constructor(options = {
        host: 'localhost',
        user: 'root',
        port: '3306',
        password: null,
        database: null
    }) {
        this.options = options;
        this.connection = mysql.createConnection(this.options);
    }
    connect() {
        return new Promise((resolve, reject) => {
            this.connection.connect(e => {
                if (e) {
                    console.log('connect faild')
                    reject(e)
                } else {
                    console.log('connect success')
                    resolve()
                }
            });
        })

    };
    addLine(table, change_values) {
        let keys = [],
            insert_value = [];
        for (let i in change_values) {
            keys.push(i);
            insert_value.push(change_values[i]);
        }
        let insert_key = keys.join(',');
        let fills = (new Array(keys.length).fill('?')).join(',');


        let add_sql = `INSERT INTO ${table}(${insert_key}) VALUES(${fills})`;
        this.connection.query(add_sql, insert_value, (err, result) => {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message);
                return;
            }
        })
    };
    update(table, newInfo, condition) {
        var self = this;
        let setInfo = [],
            condition_array = [],
            insert_value = []
        for (let i in newInfo) {
            setInfo.push(`SET ${i} = ?`)
            insert_value.push(newInfo[i])
        }
        for (let i in condition) {
            condition_array.push(`${i} = '${condition[i]}'`)
        }
        let add_sql = `UPDATE ${table} ${setInfo.join(',')} WHERE ${condition_array.join(',')}`;
        this.connection.query(add_sql, insert_value, (err, result) => {
            if (err) {
                console.log(err)
                return;
            }
        })
    };
    find(table, key, condition) {
        return new Promise((resolve, reject) => {
            let condition_array = []
            for (let i in condition) {
                condition_array.push(`${i} = '${condition[i]}'`)
            }
            let sql = `SELECT ${key} FROM ${table} WHERE ${condition_array.join('AND')}`;

            this.connection.query(sql, (err, result) => {
                if (err) {
                    console.log(err)
                    reject(err)
                }
                resolve(result)
            })
        })

    }
}