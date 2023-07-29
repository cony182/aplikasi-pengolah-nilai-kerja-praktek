const express = require("express");
const tokenVerify = require("../../middlewares/token-verify");
const { index } = require("../../controllers/guest/Index");
const { reguler, registration } = require("../../controllers/guest/Index");

const router = express.Router();

router.get("/", index);
router.get("/reguler", tokenVerify, reguler);
router.post("/registration", tokenVerify, registration);

module.exports = router;
