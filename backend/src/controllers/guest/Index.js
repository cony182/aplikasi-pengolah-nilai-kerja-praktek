const NIS = require("../../models/nis-model");
const Siswa = require("../../models/siswa-model");
const User = require("../../models/user-model");
const argon2 = require("argon2");
const WaliKelas = require("../../models/wali-kelas-model");
const Kelas = require("../../models/kelas-model");
const Guru = require("../../models/guru-model");

exports.index = (req, res) => {
   req.cookies.__secure_refresh_token ? res.status(200).json({ message: "already login" }) : res.status(202).json({ message: "not logged in" });
};

exports.reguler = async (req, res) => {
   res.send(req.user);
};

exports.registration = async (req, res) => {
   console.log(req.user);
   try {
      const kelas = await Kelas.findOne({ attributes: ["id"], where: { id: 1 } });
      if (!kelas) await Kelas.create({ nama_kelas: "A0" });

      const guru = await Guru.findOne({ attributes: ["id"], where: { id: 1 } });
      if (!guru) await Guru.create({ NIP: 0, nama: "Kosong" });

      const waliKelas = await WaliKelas.findOne({ attributes: ["id"], where: { id: 1 } });
      if (!waliKelas) await WaliKelas.create({ id: 1, guruId: 1 });

      const nis = await NIS.findOne({ where: { nis: req.body.nis } });
      if (!nis) return res.status(404).json({ message: "NIS tidak tersedia" });

      const user = await User.findOne({ attributes: ["id", "nickname", "password"], where: { uid: req.user.uid } });
      if (!user) return res.status(404).json({ message: "User tidak ditemukan" });

      const passwordIsValid = await argon2.verify(user.password, req.body.password);
      if (!passwordIsValid) return res.status(404).send({ message: "Email or password is incorrect" });

      await User.update({ role: "siswa", isReguler: 0 }, { where: { uid: req.user.uid } });

      const siswa = await Siswa.create({
         NIS: nis.nis,
         nama: user.nickname,
         thn_masuk: new Date().getFullYear(),
         thn_tempuh: new Date().getFullYear(),
         kelaId: kelas.id,
         waliKelaId: waliKelas.id,
         userId: user.id,
      });

      await WaliKelas.create({ kelas: "A0", guruId: guru.id, siswaId: siswa.id });

      res.clearCookie("__main_access_token");

      res.status(200).json({ message: "Berhasil" });

      await NIS.destroy({ where: { nis: req.body.nis } });
   } catch (error) {
      console.log(error);
   }
};
