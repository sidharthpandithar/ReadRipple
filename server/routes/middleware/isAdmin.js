const User = require("D:/ReadRipple-GIT/server/models/User");
const mongoose = require("mongoose");

function isAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.isAdmin === true) {
    return next();
  }
  return res.status(403).json({ message: "Access denied. Admins only." });
}

module.exports = isAdmin;
