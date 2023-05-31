const express = require("express");
const { loginIndex, login } = require("../../controllers/authentication/login");
const {
   googleLogin,
} = require("../../controllers/authentication/login-google-oauth");
const { logout } = require("../../controllers/authentication/logout");

const router = express.Router();

router.get("/login", loginIndex);
router.post("/login", login);
router.post("/login/google/auth", googleLogin);
router.get("/logout", logout);

module.exports = router;
