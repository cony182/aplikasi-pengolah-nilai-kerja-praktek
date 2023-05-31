const express = require("express");
const { index } = require("../../controllers/guest/Index");

const router = express.Router();

router.get("/", index);

module.exports = router;
