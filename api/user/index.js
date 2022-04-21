const { Router } = require("express");
const { registerUser, loginUser, logout } = require("./user.controller");
const router = Router();

router.post("/register", registerUser);
router.get("/logout", logout);
router.post("/login", loginUser);

module.exports = router;
