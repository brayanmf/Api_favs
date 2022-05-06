const User = require("./user.model");
const errorHandler = require("../utils/errorHandler");

exports.add = async ({ email, password }, next) => {
  if (!email || !password) {
    return next(new errorHandler("Email and password are required", 400));
  }
  const user = await User.create({
    email,
    password,
  });

  return user;
};

exports.find = async ({ email, password }, next) => {
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

  return user;
};
exports.cookie = async (res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  return res;
};
exports.findAll = async () => {
  const users = await User.find();
  return users;
};
