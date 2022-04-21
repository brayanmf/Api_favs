const User = require("./user.model");
const sendToken = require("../utils/jwtToken");
const errorHandler = require("../utils/errorHandler");
const sendResponse = require("../utils/sendResponse");
/**
 * @description: register user
 * @param {req} request object
 * @returns {json}}
 * @author : Brayanmf
 */
exports.registerUser = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new errorHandler("Email and password are required", 400));
  }
  try {
    const user = await User.create({
      email,
      password,
    });

    sendToken(user, 201, res);
  } catch (err) {
    next(err);
  }
};
/**
 * @description: login user
 * @param {req} request object
 * @returns {json}}
 * @author : Brayanmf
 */
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new errorHandler("Email and password are required", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new errorHandler("Invalid email", 401));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new errorHandler("Invalid password", 401));
  }
  sendToken(user, 200, res);
};
/**
 *@description:logout user
 *@returns {json}}
 *@author : Brayanmf
 */
exports.logout = async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  sendResponse(null, "Logout SuccessFully", 200, res);
};
/**
 *@description:get all user
 *@returns {json}}
 *@author : Brayanmf
 */
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    sendResponse(users, "Users List", 200, res);
  } catch (err) {
    next(err);
  }
};
