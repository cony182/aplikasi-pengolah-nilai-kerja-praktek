const express = require("express");
const {
   registerIndex,
   register,
   sendEmail,
   emailVerify,
   resendEmail,
} = require("../../controllers/authentication/register");

const router = express.Router();

router.get("/register", registerIndex);
router.post("/register", register);
router.get("/email/verify/:token", emailVerify);
// router.get("/email/send/token=:token/email=:email/uid=:uid", sendEmail);
router.post("/resend/email", resendEmail);
// router.get("/email/verify/token=:token/uid=:uid/expired", expiredEmailVerify);

module.exports = router;
