var mysql = require("mysql");
var config = require("../configs/default");

var pool = mysql.createPool({
  host: config.database.HOST,
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE,
  port: config.database.port
});

let query = (sql, values) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
          connection.release();
        });
      }
    });
  });
};

/**
 * 用户表
 */
let users = `
create table if not exists users(
     id INT NOT NULL AUTO_INCREMENT,
     name VARCHAR(100) NOT NULL COMMENT '用户名',
     pass VARCHAR(100) NOT NULL COMMENT '密码',
     avator VARCHAR(100) COMMENT '头像',
     moment VARCHAR(100) NOT NULL COMMENT '注册时间',
     PRIMARY KEY ( id )
    );`;

/**
 * 验证用表
 */
let verifyCode = `
create table if not exists verify(
  id INT NOT NULL AUTO_INCREMENT,
  email INT NOT NULL COMMENT '用户邮箱',
  code INT NOT NULL COMMENT '验证用code', 
  PRIMARY KEY ( id )
);
`;

let createTable = sql => query(sql, []);
createTable(users);
createTable(verifyCode);

exports.insertVerifyCode = values => {
  let _sql = `insert into verify set email=?,code=?;`;
  return query(_sql, values);
};

exports.updateVerifyCode = values => {
  let _sql = `update verify set code=? where email=?;`;
  return query(_sql, values);
};

exports.findVerifyCode = email => {
  let _sql = `select * from verify where email="${email}";`;
  console.log(_sql);
  return query(_sql);
};

exports.insertUser = values => {
  let _sql = `insert into users set name=?,pass=?,avator=?,moment=?;`;
  return query(_sql, values);
};
