const express = require("express");
const {
   register,
   emailVerify,
   expiredEmailVerify,
   resendEmail,
   sendEmail,
   login,
   logout,
} = require("../../controllers/auth/auth-local");
const router = express.Router();

router.post("/register", register);
router.get("/email/verify/token=:token/uid=:uid", emailVerify);
router.get("/email/verify/token=:token/uid=:uid/expired", expiredEmailVerify);
router.get("/email/send/token=:token/email=:email/uid=:uid", sendEmail);
router.get("/resend/:email/:uid", resendEmail);
router.post("/login", login);
router.get("/logout", logout);

module.exports = router;
