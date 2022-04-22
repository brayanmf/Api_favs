const { Router } = require("express");
const { isAuthenticated } = require("../../middleware/auth");
const {
  registerFav,
  getAllFav,
  getFav,
  updateFav,
  deleteFav,
} = require("./fav.controller");
const router = Router();

router
  .post("/favs", isAuthenticated, registerFav)
  .get("/favs", isAuthenticated, getAllFav);
router
  .get("/favs/:id", isAuthenticated, getFav)
  .put("/favs/:id", isAuthenticated, updateFav)
  .delete("/favs/:id", isAuthenticated, deleteFav);

module.exports = router;
