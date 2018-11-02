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
     email VARCHAR(100) NOT NULL COMMENT '邮箱',
     pass VARCHAR(100) NOT NULL COMMENT '密码',
     nickname VARCHAR(100) COMMENT '昵称',
     avator VARCHAR(100) COMMENT '头像', 
     PRIMARY KEY ( id )
    );`;

/**
 * 验证用表
 */
let verifyCode = `
create table if not exists verify(
  id INT NOT NULL AUTO_INCREMENT,
  email VARCHAR(100) NOT NULL COMMENT '用户邮箱',
  code INT NOT NULL COMMENT '验证用code', 
  PRIMARY KEY ( id )
);
`;
//插入一条数据到用户表
exports.insertUser = values => {
  let _sql = `insert into users set email=?,pass=?,nickname=?,avator=?;`;
  return query(_sql, values);
};
exports.findUser = email => {
  let _sql = `select * from users where email="${email}";`;
  return query(_sql);
};

let createTable = sql => query(sql, []);
createTable(users);
createTable(verifyCode);

//插入一条验证码数据
exports.insertVerifyCode = values => {
  let _sql = `insert into verify set email=?,code=?;`;
  return query(_sql, values);
};
//更新一条验证码数据
exports.updateVerifyCode = values => {
  let _sql = `update verify set code=? where email=?;`;
  return query(_sql, values);
};
//查找验证码数据
exports.findVerifyCode = email => {
  let _sql = `select * from verify where email="${email}";`;
  return query(_sql);
};
