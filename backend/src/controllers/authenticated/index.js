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

exports.token = async (req, res) => {
   res.status(200).json(req.user);
};

exports.profile = async (req, res) => {
   if (!req.user) return res.status(403).json({ message: "Not a valid token data" });

   console.log(req.user);
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

exports.nilaiSiswa = async (req, res) => {
   if (!req.user) return res.status(403).json({ message: "Not a valid token data" });

   try {
      if (req.user.role == "guru") return res.status(403).json({ message: "Anda guru" });

      const siswa = await Siswa.findOne({
         include: [{ model: Kelas, attributes: ["kode_kelas", "nama_kelas"] }],
         attributes: ["NIS", "nama", "tgl_lahir", "tmpt_lahir", "kelamin", "alamat", "thn_masuk", "semester", "thn_tempuh", "telp"],
         where: {
            id: req.user.id,
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

   res.status(200).json([jadwal, role]);
};

exports.news = async (req, res) => {
   const post = await Posts.findAll({
      include: [{ model: User, attributes: ["nickname", "role"], include: [{ model: Siswa, attributes: ["nama"] }] }],
   });
   res.json(post);
};
