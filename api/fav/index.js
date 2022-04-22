const { Router } = require("express");
const { isAuthenticated } = require("../../middleware/auth");
const {
  createFav,
  getAllFav,
  getFav,
  updateFav,
  deleteFav,
} = require("./fav.controller");
const router = Router();

router
  .post("/favs", isAuthenticated, createFav)
  .get("/favs", isAuthenticated, getAllFav);
router
  .get("/favs/:id", isAuthenticated, getFav)
  .put("/favs/:id", isAuthenticated, updateFav)
  .delete("/favs/:id", isAuthenticated, deleteFav);

module.exports = router;
