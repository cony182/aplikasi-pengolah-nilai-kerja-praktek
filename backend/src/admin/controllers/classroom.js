const Kelas = require("../../models/kelas-model");

exports.classroom = async (req, res) => {
   try {
      const kelas = await Kelas.findAll({
         attributes: ["id", "nama_kelas", "kode_kelas"],
         order: [["id", "DESC"]],
         limit: 5,
      });
      res.status(200).json(kelas);
   } catch (error) {
      console.log(error);
   }
};

exports.createClassroom = async (req, res) => {
   try {
      await Kelas.create({ kode_kelas: req.body.kode_kelas, nama_kelas: req.body.nama_kelas });
      res.status(200).json({ message: "Classroom added successfully" });
   } catch (error) {
      console.log(error);
   }
};
