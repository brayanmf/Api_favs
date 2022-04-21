const { Router } = require("express");
const { isAuthenticated } = require("../middleware/auth");
const {
  registerUser,
  loginUser,
  logout,
  getAllUsers,
} = require("./user.controller");
const router = Router();

router.post("/register", registerUser);
router.get("/logout", logout);
router.post("/login", loginUser);
router.get("/getAllUsers", isAuthenticated, getAllUsers);
module.exports = router;
