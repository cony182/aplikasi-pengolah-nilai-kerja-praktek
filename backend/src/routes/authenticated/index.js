const express = require("express");
const tokenVerify = require("../../middlewares/token-verify");

const {
   profile,
   profileUpdate,
   nilaiSiswa,
   token,
   jadwal,
   news,
   nilaiGuru,
   nilaiGuruTambah,
   nilaiGuruCreate,
   nilaiGuruUpdate,
} = require("../../controllers/authenticated/index");
const { avatarDelete, avatarUpdate } = require("../../controllers/authenticated/update-profile-image");

const router = express.Router();

router.get("/:role/profile", tokenVerify, profile);
router.get("/:role/news", tokenVerify, news);
router.get("/siswa/nilai", tokenVerify, nilaiSiswa);
router.get("/guru/nilai", tokenVerify, nilaiGuru);
router.post("/guru/nilai/update", tokenVerify, nilaiGuruUpdate);
router.get("/guru/nilai/tambah", tokenVerify, nilaiGuruTambah);
router.post("/guru/nilai/tambah", tokenVerify, nilaiGuruCreate);
router.get("/:role/jadwal", tokenVerify, jadwal);
router.get("/token", tokenVerify, token);
router.post("/update/profile/avatar/delete", tokenVerify, avatarDelete);
router.post("/update/profile/avatar", tokenVerify, avatarUpdate);
router.post("/update/profile", tokenVerify, profileUpdate);

module.exports = router;
