const express = require("express");
const tokenVerify = require("../../middlewares/token-verify");

const { profile, profileUpdate, nilaiSiswa, token, jadwal, news } = require("../../controllers/authenticated/index");
const { avatarDelete, avatarUpdate } = require("../../controllers/authenticated/update-profile-image");

const router = express.Router();

router.get("/:role/profile", tokenVerify, profile);
router.get("/:role/news", tokenVerify, news);
router.get("/:role/nilai", tokenVerify, nilaiSiswa);
router.get("/:role/jadwal", tokenVerify, jadwal);
router.get("/token", tokenVerify, token);
router.post("/update/profile/avatar/delete", tokenVerify, avatarDelete);
router.post("/update/profile/avatar", tokenVerify, avatarUpdate);
router.post("/update/profile", tokenVerify, profileUpdate);

module.exports = router;
