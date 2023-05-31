const express = require("express");
const { like } = require("../../controllers/authenticated/post");
const tokenVerify = require("../../middlewares/token-verify");

const router = express.Router();

router.post("/news/like", tokenVerify, like);

module.exports = router;
