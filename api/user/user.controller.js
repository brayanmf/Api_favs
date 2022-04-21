const User = require("./user.model");
const sendToken = require("../../utils/jwtToken");
const errorHandler = require("../../utils/errorHandler");

exports.registerUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(
      new errorHandler(
        "El  correo electrónico y contraseña son requeridos",
        400
      )
    );
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
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      sucess: false,
      message: "Ingrese correo electrónico y contraseña",
    });
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({
      sucess: false,
      message: "Correo electrónico o contraseña no válidos",
    });
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return res.status(401).json({
      sucess: false,
      message: "Correo electrónico o contraseña no válidos",
    });
  }

  sendToken(user, 200, res);
};

exports.logout = async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Desconectado",
  });
};

exports.getAllUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
};
/**
 * @description: Update user data
 * @param {req} request object
 * @param {res} response object
 * @returns {json}}
 * @author : Brayanmf
 */
exports.updateProfile = async (req, res) => {
  const { ...data } = req.body;
  const { file } = req;
  if (!file) {
    try {
      const user = await User.findByIdAndUpdate(
        req.user._id,
        { ...data },
        { new: true }
      );
      return res.status(200).json({
        success: true,
        user,
      });
    } catch {
      return res.status(400).json({
        success: false,
        error,
      });
    }
  }

  const size = file.size / 1024 / 1024;
  if (size > 3) {
    return res.status(400).json({
      success: false,
      message: "El archivo es muy grande",
    });
  }

  try {
    await cloudinary.uploader.destroy(req.user.avatar.public_id, {
      resource_type: "image",
    });
    const result = await cloudinary.uploader.upload(file.path, {
      tags: "user_profile",
    });

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { ...data, avatar: { public_id: result.public_id, url: result.url } },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error,
    });
  } finally {
    fs.unlinkSync(file.path);
  }
};
