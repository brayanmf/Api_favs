const sendResponse = require("../../utils/sendResponse");
const { add, find, update, remove, findAll } = require("./fav.services");
/**
 * @description: create fav
 * @param {req} request object with title and userId
 * @returns {json}}
 * @author : Brayanmf
 */
exports.createFav = async (req, res, next) => {
  try {
    const fav = await add(req.body, req.user, next);
    sendResponse(fav, "Created favorite", 201, res);
  } catch (err) {
    next(err);
  }
};
/**
 * @description: get fav by
 * @param {req} request object  params id
 * @returns {json}}
 * @author : Brayanmf
 */
exports.getFav = async (req, res, next) => {
  try {
    const fav = await find(req.params, next);

    sendResponse(fav, "Favorite", 200, res);
  } catch (err) {
    next(err);
  }
};
/**
 * @description: update fav
 * @param {req} request object params id and body title
 * @returns {json}}
 * @author : Brayanmf
 */
exports.updateFav = async (req, res, next) => {
  try {
    const fav = await update(req.params, req.body);
    sendResponse(fav, "Favorite Updated", 200, res);
  } catch (err) {
    next(err);
  }
};
/**
 * @description: get fav by user
 * @param {req} request object  params id
 * @returns {json}}
 * @author : Brayanmf
 */

exports.deleteFav = async (req, res, next) => {
  try {
    const fav = await remove(req.params);

    sendResponse(fav, "Favorite Deleted", 200, res);
  } catch (err) {
    next(err);
  }
};
/**
 *@description:get all fav
 *@returns {json}}
 *@author : Brayanmf
 */
exports.getAllFav = async (req, res, next) => {
  try {
    const favs = await findAll();
    sendResponse(favs, "Favorites List", 200, res);
  } catch (err) {
    next(err);
  }
};
