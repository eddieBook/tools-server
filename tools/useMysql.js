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


export default class OperationMysql {
    constructor(options = {
        host = 'localhost',
        user = 'root',
        port = '3306',
        password: null,
        database: null
    }) {
        this.options = options;
        this.connection = mysql.createConnection(this.options);
    }
    connect() {
        connection.connect(err => {
            if (err) {
                console.error('error connecting: ' + err.stack);
                return;
            }

            console.log('connected as id ' + connection.threadId);
        });
    }
    addLine(table, changeValues) {
        const addSql = ``
    }
}