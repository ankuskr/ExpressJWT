require("dotenv").config();
const { options } = require("mongoose");
const User = require("../models/user.model");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  const { username, email, password, role } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      success: false,
      msg: "User already exists",
    });
  }
  let hashPassword;
  hashPassword = await bcrypt.hashSync(password, 10);
  const user = await User.create({
    username,
    email,
    password: hashPassword,
    role,
  });
  return res.status(200).json({
    success: true,
    msg: "User created successfully",
  });
};
// exports.signupMany = async (req, res) => {
//   try {
//     const { email } = req.body;
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({
//         success: false,
//         message: "User already exists",
//       });
//     }
//     const records = req.body;
//     const dataToSave = await User.insertMany(records);
//     res.json(dataToSave);
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({ message: error.message });
//   }
// };

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      msg: "Please provide email and password",
    });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({
      success: false,
      msg: "email does not exist goto signup first",
    });
  }
  payload = {
    id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
  };
  if (await bcrypt.compareSync(password, user.password)) {
    let token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    // console.log(token);
    user.password = undefined;
    // user.token = token;
    // user.token="token";
    // user["token"] = token;

    const options = {
      expires: new Date(Date.now() + 2 * 60 * 60 * 1000),
      httpOnly: true,
      secure: false,
    };
    res
      .cookie("token", token, options)
      .status(200)
      .json({
        success: true,
        token,
        user,
        user: { ...user.toObject(), token },
        msg: "User logged in successfully",
      });
  } else {
    return res.status(404).json({
      success: false,
      msg: "Password does not match",
    });
  }
};
