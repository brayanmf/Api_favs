const sendToken = require("../utils/jwtToken");
const sendResponse = require("../utils/sendResponse");
const { add, find, cookie, findAll } = require("./user.services");
/**
 * @description: register user
 * @param {req} request object
 * @returns {json}}
 * @author : Brayanmf
 */
exports.registerUser = async (req, res, next) => {
  try {
    const user = await add(req.body, next);
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
exports.loginUser = async (req, res, next) => {
  try {
    const user = await find(req.body);
    sendToken(user, 200, res);
  } catch (err) {
    next(err);
  }
};
/**
 *@description:logout user
 *@returns {json}}
 *@author : Brayanmf
 */
exports.logout = async (req, res) => {
  try {
    const response = await cookie(res);
    sendResponse(null, "Logout SuccessFully", 200, response);
  } catch (err) {
    next(err);
  }
};
/**
 *@description:get all user
 *@returns {json}}
 *@author : Brayanmf
 */
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await findAll();
    sendResponse(users, "Users List", 200, res);
  } catch (err) {
    next(err);
  }
};
