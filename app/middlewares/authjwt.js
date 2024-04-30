const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
  const token = req.cookie.token;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "token not found",
    });
  }
  const decode = jwt.verify(token, process.env.JWT_SECRET);
  console.log(decode);
  req.user = decode;
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.user.role != "admin") {
    return res.status(401).json({
      success: false,
      message: "you are not admin",
    });
  } else {
    return res.status(402).json({
      success: false,
      message: "you are not admin",
    });
  }
};
exports.isModrate = (req, res, next) => {
  if (req.user.role != "modrate") {
    return res.status(401).json({
      success: false,
      message: "you are not admin",
    });
  } else {
    return res.status(402).json({
      success: false,
      message: "you are not modrate",
    });
  }
};
