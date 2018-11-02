var createError = require("http-errors");
var express = require("express");
var path = require("path");
var logger = require("morgan");
var session = require("express-session");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(
  session({
    name: "tools",
    secret: "keyboard cat",
    cookie: ("name",
    "value",
    { path: "/", httpOnly: true, secure: false, maxAge: 60000 }),
    //重新保存：强制会话保存即使是未修改的。默认为true但是得写上
    resave: true,
    //强制“未初始化”的会话保存到存储。
    saveUninitialized: true
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
