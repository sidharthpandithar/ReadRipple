var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.send("<h1>Hello</h1>");
});

module.exports = router;
