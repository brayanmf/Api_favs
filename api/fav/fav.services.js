const Fav = require("./fav.model");
const errorHandler = require("../../utils/errorHandler");

exports.add = async ({ title, ...data }, { _id }, next) => {
  if (!title) {
    return next(new errorHandler("Title is required", 400));
  }
  const fav = await Fav.create({
    title,
    ...data,
    user: _id,
  });
  return fav;
};
exports.find = async ({ id }, next) => {
  const fav = await Fav.findById({ _id: id });
  if (!fav) {
    return next(new errorHandler(`product ${id} not found `, 404));
  }
  return fav;
};
exports.update = async ({ id }, { title, ...data }) => {
  const fav = await Fav.findByIdAndUpdate(
    id,
    { title, ...data },
    { new: true }
  );
  return fav;
};
exports.remove = async ({ id }) => {
  const fav = await Fav.findByIdAndDelete(id);
  return fav;
};
exports.findAll = async () => {
  const favs = await Fav.find();
  return favs;
};
