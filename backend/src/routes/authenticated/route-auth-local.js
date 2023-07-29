const express = require("express");
const { emailVerify, expiredEmailVerify, resendEmail, sendEmail, login, logout, googleLogin } = require("../../controllers/authentication/register");

const router = express.Router();

router.get("/email/verify/token=:token/uid=:uid", emailVerify);
router.get("/email/verify/token=:token/uid=:uid/expired", expiredEmailVerify);
router.get("/email/send/token=:token/email=:email/uid=:uid", sendEmail);
router.get("/resend/:email/:uid", resendEmail);
router.post("/login", login);
router.get("/logout", logout);
router.post("/login/google/auth", googleLogin);

module.exports = router;
