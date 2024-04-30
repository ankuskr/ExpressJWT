const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth.controller");
const { auth, isAdmin, isModrate } = require("../middlewares/authjwt");

router.post("/signup", controller.signup);
// router.post("/signupMany", controller.signupMany);
router.post("/signin", controller.signin);

router.get("/isAdmin", auth, isAdmin, (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "You are an admin",
  });
});
router.get("/isModrate", auth, isModrate, (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "You are Modrate",
  });
});

module.exports = router;
