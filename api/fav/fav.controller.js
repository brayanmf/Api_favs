const Fav = require("./fav.model");
const sendResponse = require("../../utils/sendResponse");

exports.registerFav = async (req, res, next) => {
  const { title, ...data } = req.body;
  const { _id } = req.user;
  if (!title) {
    return next(new errorHandler("Title is required", 400));
  }
  try {
    const fav = await Fav.create({
      title,
      ...data,
      user: _id,
    });
    sendResponse(fav, "Created favorite", 201, res);
  } catch (err) {
    next(err);
  }
};

exports.getAllFav = async (req, res, next) => {
  try {
    const favs = await Fav.find();
    sendResponse(favs, "Favorites List", 200, res);
  } catch (err) {
    next(err);
  }
};
