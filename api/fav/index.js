const { Router } = require("express");
const { isAuthenticated } = require("../../middleware/auth");
const { registerFav, getAllFav } = require("./fav.controller");
const router = Router();

router
  .post("/favs", isAuthenticated, registerFav)
  .get("/favs", isAuthenticated, getAllFav);

module.exports = router;
