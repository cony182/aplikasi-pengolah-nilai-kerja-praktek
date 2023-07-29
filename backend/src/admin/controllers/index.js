const Guru = require("../../models/guru-model");
const Kelas = require("../../models/kelas-model");
const Siswa = require("../../models/siswa-model");
const User = require("../../models/user-model");
const WaliKelas = require("../../models/wali-kelas-model");
const NIS = require("../../models/nis-model");

exports.index = async (req, res) => {
   try {
      if (req.user.role !== "admin") return res.status(403).json({ message: "Anda bukan admin" });

      const usersCount = (await User.findAll()).length;
      const adminCount = (await User.findAll({ where: { role: "admin" } })).length;
      const guruCount = (await Guru.findAll()).length;
      const siswaCount = (await Siswa.findAll()).length;
      const recentUsers = await User.findAll({ attributes: ["id", "nickname", "fullname", "email"], order: [["id", "DESC"]], limit: 5 });
      const waliKelas = await WaliKelas.findAll({
         include: { model: Guru, attributes: ["nama"] },
         attributes: ["id", "kelas"],
         order: [["id", "DESC"]],
         limit: 5,
      });

      const nis = await NIS.findAll({
         attributes: ["id", "nis", "expires"],
         order: [["id", "DESC"]],
         limit: 5,
      });

      const kelas = await Kelas.findAll({
         attributes: ["id", "nama_kelas", "kode_kelas"],
         order: [["id", "DESC"]],
         limit: 5,
      });

      const guru = await Guru.findAll({
         attributes: ["id", "nama", "userId"],
         order: [["id", "DESC"]],
         limit: 5,
      });

      res.status(200).json({
         totalUser: usersCount,
         totalAdmin: adminCount,
         totalGuru: guruCount,
         totalSiswa: siswaCount,
         recentUsers: recentUsers,
         waliKelas: waliKelas,
         nis: nis,
         kelas: kelas,
         guru: guru,
      });
   } catch (error) {
      console.log(error);
   }
};
