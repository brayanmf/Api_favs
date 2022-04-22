const Fav = require("./fav.model");
const sendResponse = require("../../utils/sendResponse");

exports.createFav = async (req, res, next) => {
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
exports.getFav = async (req, res, next) => {
  const { id } = req.params;
  try {
    const fav = await Fav.findById({ _id: id });
    sendResponse(fav, "Favorite", 200, res);
  } catch (err) {
    next(err);
  }
};
exports.updateFav = async (req, res, next) => {
  const { id } = req.params;
  const { title, ...data } = req.body;
  try {
    const fav = await Fav.findByIdAndUpdate(
      id,
      { title, ...data },
      { new: true }
    );
    sendResponse(fav, "Favorite Updated", 200, res);
  } catch (err) {
    next(err);
  }
};
exports.deleteFav = async (req, res, next) => {
  const { id } = req.params;
  try {
    const fav = await Fav.findByIdAndDelete(id);
    sendResponse(fav, "Favorite Deleted", 200, res);
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
