const express = require("express");
const tokenVerify = require("../../middlewares/token-verify");
const { index } = require("../controllers/index");
const { create, nis } = require("../controllers/nis");
const { classroom, createClassroom } = require("../controllers/classroom");
const { teachers, teacher, teacherUpdate } = require("../controllers/teacher");
const { users, user, update } = require("../controllers/users");
const { students, student, studentUpdate } = require("../controllers/student");
const { admins } = require("../controllers/admin");
const { jadwal, createJadwal, updateJadwal } = require("../controllers/jadwal");

const router = express.Router();

router.get("/admin", tokenVerify, index);
router.get("/admin/nis", tokenVerify, nis);

router.get("/admin/users", tokenVerify, users);
router.post("/admin/users", tokenVerify, update);
router.get("/admin/user/:nickname", tokenVerify, user);

router.get("/admin/students", tokenVerify, students);
router.post("/admin/students", tokenVerify, studentUpdate);
router.get("/admin/student/:nis", tokenVerify, student);

router.get("/admin/admins", tokenVerify, admins);
router.get("/admin/schedule", tokenVerify, jadwal);
router.post("/admin/schedule", tokenVerify, createJadwal);
router.post("/admin/schedule/update", tokenVerify, updateJadwal);

router.get("/admin/teachers", tokenVerify, teachers);
router.post("/admin/teachers", tokenVerify, teacherUpdate);
router.get("/admin/teachers/:nip", tokenVerify, teacher);

router.post("/admin/nis/add", tokenVerify, create);
router.post("/admin/classroom/add", tokenVerify, createClassroom);
router.get("/admin/classroom", tokenVerify, classroom);

module.exports = router;
