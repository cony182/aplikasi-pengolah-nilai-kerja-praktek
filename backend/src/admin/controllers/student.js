const { Op } = require("sequelize");
const Siswa = require("../../models/siswa-model");
const Kelas = require("../../models/kelas-model");
const WaliKelas = require("../../models/wali-kelas-model");
const Guru = require("../../models/guru-model");
const User = require("../../models/user-model");

exports.students = async (req, res) => {
   try {
      const limit = req.query.limit || 20;
      const lastId = req.query.lastId || 0;
      let students = [];
      if (lastId < 1) {
         const student = await Siswa.findAll({
            include: [
               { model: User, attributes: ["picture"] },
               { model: WaliKelas, include: [{ model: Guru, attributes: ["nama"] }] },
               { model: Kelas, attributes: ["nama_kelas"] },
            ],
            where: {
               [Op.or]: {
                  NIS: { [Op.like]: "%" + req.query.search + "%" },
                  nama: { [Op.like]: "%" + req.query.search + "%" },
               },
            },
            limit: 20,
            order: [["id", "DESC"]],
         });

         students = student;
      } else {
         const student = await Siswa.findAll({
            include: [
               { model: User, attributes: ["picture"] },
               { model: WaliKelas, include: [{ model: Guru, attributes: ["nama"] }] },
               { model: Kelas, attributes: ["nama_kelas"] },
            ],
            where: {
               id: { [Op.lt]: lastId },
               [Op.or]: {
                  NIS: { [Op.like]: "%" + req.query.search + "%" },
                  nama: { [Op.like]: "%" + req.query.search + "%" },
               },
            },
            limit: 20,
            order: [["id", "DESC"]],
         });

         students = student;
      }

      res.status(200).json({
         siswa: students,
         lastId: students.length ? students[students.length - 1].id : 0,
         hasMore: students.length >= limit ? true : false,
      });
   } catch (error) {
      console.log(error);
   }
};

exports.student = async (req, res) => {
   try {
      const siswa = await Siswa.findOne({
         include: [
            { model: User, attributes: ["picture"] },
            { model: WaliKelas, include: [{ model: Guru, attributes: ["nama"] }] },
         ],
         where: { nis: req.params.nis },
      });
      if (!siswa) return res.status(404).json({ message: "User tidak ditemukan" });

      const kelas = await Kelas.findAll({ attributes: ["id", "nama_kelas", "kode_kelas"] });
      const waliKelas = await Guru.findAll({ attributes: ["id", "nama"] });
      res.status(200).json({ siswa: siswa, kelas: kelas, waliKelas: waliKelas });
   } catch (error) {
      console.log(error);
   }
};

exports.studentUpdate = async (req, res) => {
   try {
      console.log(req.body);
      const kelasId = req.body.kelasId || 1;
      const kelas = await Kelas.findOne({ attributes: ["nama_kelas"], where: { id: kelasId } });
      if (!kelas) await Kelas.create({ kode_kelas: 1, nama_kelas: "A0" });

      const siswaExist = await WaliKelas.findOne({ where: { siswaId: req.body.id } });

      if (siswaExist) {
         await WaliKelas.update({ kelas: kelas.nama_kelas, guruId: req.body.waliKelasId }, { where: { siswaId: req.body.id } });

         await Siswa.update({ waliKelaId: siswaExist.id, kelaId: req.body.kelasId }, { where: { id: req.body.id } });

         return res.status(200).json({ message: "Data berhasil di update" });
      }

      const waliKelas = await WaliKelas.create({ kelas: kelas.nama_kelas, guruId: req.body.waliKelasId, siswaId: req.body.id });

      await Siswa.update({ waliKelaId: waliKelas.id, kelaId: req.body.kelasId }, { where: { id: req.body.id } });

      res.status(200).json({ message: "Data berhasil di update" });
   } catch (error) {
      console.log(error);
   }
};
