var express = require("express");
var router = express.Router();
var user_center = require("../tools/user_center");

router.all("*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild"
  );
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");

  if (req.method == "OPTIONS") {
    res.send(200);
    /让options请求快速返回/;
  } else {
    next();
  }
});

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", {
    title: "Express"
  });
});

// 注册用户
router.post("/user/getCode", user_center.getCode);
router.post("/user/addUser", user_center.addUser);
router.post("/user/login", user_center.login);

module.exports = router;
