const { where } = require("sequelize");
const Guru = require("../../models/guru-model");
const Jadwal = require("../../models/jadwal-model");
const Kelas = require("../../models/kelas-model");
const Mapel = require("../../models/mapel-model");
const Nilai = require("../../models/nilai-model");
const Posts = require("../../models/post-model");
const Siswa = require("../../models/siswa-model");
const User = require("../../models/user-model");
const WaliKelas = require("../../models/wali-kelas-model");
const ThnAjaran = require("../../models/tahun-ajar");

exports.token = async (req, res) => {
   res.status(200).json(req.user);
};

exports.profile = async (req, res) => {
   if (!req.user) return res.status(403).json({ message: "Not a valid token data" });

   try {
      if (req.user.role === "siswa") {
         const user = await User.findOne({
            include: [
               {
                  model: Siswa,
                  attributes: ["NIS", "nama", "tgl_lahir", "tmpt_lahir", "kelamin", "alamat", "thn_masuk", "semester", "thn_tempuh", "telp"],
                  include: [
                     { model: Kelas, attributes: ["kode_kelas", "nama_kelas"] },
                     {
                        model: WaliKelas,
                        attributes: ["tahun", "kelas", "guruId", "siswaId"],
                        include: [{ model: Guru, attributes: ["NIP", "nama"] }],
                     },
                  ],
               },
            ],
            attributes: ["uid", "nickname", "fullname", "email", "role", "picture"],
            where: {
               id: req.user.id,
            },
         });
         res.status(200).json(user);
      } else {
         const user = await User.findOne({
            include: Guru,
            attributes: ["uid", "nickname", "fullname", "email", "role"],
            where: {
               id: req.user.id,
            },
         });
         res.status(200).json(user);
      }
   } catch (error) {
      res.status(403).json({ message: "Not a valid token data" });
   }
};

exports.profileUpdate = async (req, res) => {
   try {
      const user = await User.findOne({ attributes: ["nickname"], where: { uid: req.user.uid } });
      if (user.nickname === req.body.user.nickname) return res.status(400).json({ message: "Nickname tidak tersedia" });

      await User.update(
         {
            nickname: req.body.user.nickname,
            fullname: req.body.user.fullname,
         },
         { where: { uid: req.user.uid } }
      );

      if (req.user.role == "guru") {
         await Guru.update(
            {
               nama: req.body.role.nama,
               alamat: req.body.role.alamat,
               telp: req.body.role.telp,
            },
            { where: { userId: req.user.id } }
         );
         res.status(200).json({ message: "Data guru telah diperbarui" });
      } else {
         await Siswa.update(
            {
               nama: req.body.role.nama,
               alamat: req.body.role.alamat,
               telp: req.body.role.telp,
            },
            { where: { userId: req.user.id } }
         );
         res.status(200).json({ message: "Data siswa telah diperbarui" });
      }
   } catch (error) {
      console.log(error);
   }
};

exports.nilaiGuru = async (req, res) => {
   try {
      const guru = await Guru.findOne({ attributes: ["id", "mapelId"], where: { userId: req.user.id } });
      const nilai = await Nilai.findAll({
         include: [
            { model: Mapel, attributes: ["nama_mapel"] },
            { model: Siswa, attributes: ["nama"] },
         ],
         where: { guruId: guru.id, mapelId: req.query.mapel, tahun: req.query.tahun, semester: req.query.semester },
      });

      const waliKelas = await WaliKelas.findOne({ where: { guruId: guru.id } });

      const siswa = await Siswa.findAll({ where: { waliKelaId: waliKelas.id } });

      const mapel = await Mapel.findAll({ attributes: ["id", "nama_mapel"] });
      const tahun = await ThnAjaran.findAll();
      res.status(200).json({ nilai: nilai, mapel: mapel, tahun: tahun, siswa: siswa });
   } catch (error) {
      console.log(error);
   }
};

exports.nilaiGuruUpdate = async (req, res) => {
   try {
      await Nilai.update(
         {
            nilai_kehadiran: req.body.kehadiran,
            nilai_tugas: req.body.tugas,
            nilai_uts: req.body.uts,
            nilai_uas: req.body.uas,
            nilai_opsi: req.body.opsi,
         },
         { where: { id: req.body.id } }
      );
      res.status(200).json({ message: "OK" });
   } catch (error) {
      console.log(error);
   }
};

exports.nilaiGuruTambah = async (req, res) => {
   console.log(req.query);
   try {
      const guru = await Guru.findOne({ attributes: ["id", "mapelId"], where: { userId: req.user.id } });

      const waliKelas = await WaliKelas.findOne({ where: { guruId: guru.id } });

      const siswa = await Siswa.findAll({ include: [{ model: Kelas }], where: { waliKelaId: waliKelas.id } });

      const mapel = await Mapel.findAll({ attributes: ["id", "nama_mapel"] });
      const tahun = await ThnAjaran.findAll();
      res.status(200).json({ mapel: mapel, tahun: tahun, siswa: siswa });
   } catch (error) {
      console.log(error);
   }
};

exports.nilaiGuruCreate = async (req, res) => {
   console.log(req.body);
   try {
      const guru = await Guru.findOne({ attributes: ["id"], where: { userId: req.user.id } });

      await Nilai.create({
         tahun: req.body.tahun,
         semester: req.body.semester,
         nilai_kehadiran: req.body.kehadiran,
         nilai_tugas: req.body.tugas,
         nilai_uts: req.body.uts,
         nilai_uas: req.body.uas,
         nilai_opsi: req.body.opsi,
         mapelId: req.body.mapelId,
         siswaId: req.body.siswaId,
         guruId: guru.id,
      });
      res.status(200).json({ message: "Nilai berhasil ditambahkan" });
   } catch (error) {
      console.log(error);
   }
};

exports.nilaiSiswa = async (req, res) => {
   if (!req.user) return res.status(403).json({ message: "Not a valid token data" });

   try {
      if (req.user.role == "guru") return res.status(403).json({ message: "Anda guru" });

      const siswa = await Siswa.findOne({
         include: [{ model: Kelas, attributes: ["kode_kelas", "nama_kelas"] }],
         attributes: ["NIS", "nama", "tgl_lahir", "tmpt_lahir", "kelamin", "alamat", "thn_masuk", "semester", "thn_tempuh"],
         where: {
            userId: req.user.id,
         },
      });

      const nilai = await Nilai.findAll({
         include: [{ model: Mapel, attributes: ["kode_mapel", "nama_mapel"] }],
         attributes: [
            "id",
            "tahun",
            "semester",
            "thn_ajaran",
            "nilai_kehadiran",
            "nilai_tugas",
            "nilai_uts",
            "nilai_uas",
            "nilai_opsi",
            "guruId",
            "siswaId",
            "mapelId",
         ],
         where: {
            siswaId: req.user.id,
            tahun: siswa.thn_tempuh,
            semester: siswa.semester,
         },
      });

      res.json([nilai, siswa]);
   } catch (error) {
      console.log(error);
   }
};

exports.jadwal = async (req, res) => {
   if (req.user.isReguler || req.user.role == "admin") return res.status(403).json({ message: "Anda tidak memiliki akses" });

   if (req.user.role == "siswa") {
      const siswa = await Siswa.findOne({
         attributes: ["kelaId"],
         where: {
            userId: req.user.id,
         },
      });

      const jadwal = await Jadwal.findAll({
         include: [
            { model: Mapel, attributes: ["nama_mapel"] },
            { model: Guru, attributes: ["nama"] },
         ],
         attributes: ["id", "hari", "jam_mulai", "jam_akhir"],
         where: {
            kelaId: siswa.kelaId,
         },
      });

      const role = req.user.role;

      res.status(200).json({ jadwal: jadwal, role: role });
   }

   if (req.user.role == "guru") {
      const guru = await Guru.findOne({
         attributes: ["id"],
         where: {
            userId: req.user.id,
         },
      });

      const jadwal = await Jadwal.findAll({
         include: [
            { model: Mapel, attributes: ["nama_mapel"] },
            { model: Guru, attributes: ["nama"] },
         ],
         attributes: ["id", "hari", "jam_mulai", "jam_akhir"],
         where: {
            guruId: guru.id,
         },
      });

      const role = req.user.role;

      res.status(200).json({ jadwal: jadwal, role: role });
   }
};

exports.news = async (req, res) => {
   const post = await Posts.findAll({
      include: [{ model: User, attributes: ["nickname", "role"], include: [{ model: Siswa, attributes: ["nama"] }] }],
   });
   res.json(post);
};
