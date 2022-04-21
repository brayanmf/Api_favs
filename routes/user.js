const express = require("express");
// const { isAuthenticateUser, authorizeRoles } = require("../middleware/auth");
const { registerUser, loginUser } = require("../controllers/userController");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

module.exports = router;
