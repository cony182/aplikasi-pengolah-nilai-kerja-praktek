const express = require("express");
const {
   forgotPassword,
   resetPassword,
   resetPasswordVerify,
} = require("../../controllers/authentication/reset-password");

const router = express.Router();

router.post("/forgot/password", forgotPassword);
router.post("/reset/password", resetPassword);
router.post("/reset/password/verify", resetPasswordVerify);

module.exports = router;
