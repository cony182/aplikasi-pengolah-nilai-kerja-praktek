const { Op } = require("sequelize");
const Guru = require("../../models/guru-model");
const Mapel = require("../../models/mapel-model");
const User = require("../../models/user-model");

exports.teachers = async (req, res) => {
   try {
      const guru = await Guru.findAll({
         include: [
            { model: User, attributes: ["id", "nickname", "picture"] },
            { model: Mapel, attributes: ["nama_mapel"] },
         ],
         where: {
            [Op.or]: {
               nama: {
                  [Op.like]: "%" + req.query.search + "%",
               },
               NIP: {
                  [Op.like]: "%" + req.query.search + "%",
               },
            },
         },
      });
      if (!guru) return res.status(404).json({ message: "Data tidak ditemukan" });
      res.status(200).json(guru);
   } catch (error) {
      console.log(error);
   }
};

exports.teacher = async (req, res) => {
   try {
      console.log(req.params.nip);
      const guru = await Guru.findOne({
         include: [
            { model: User, attributes: ["picture"] },
            { model: Mapel, attributes: ["nama_mapel"] },
         ],
         where: { NIP: req.params.nip },
      });

      const mapel = await Mapel.findAll({ attributes: ["id", "nama_mapel"] });

      res.status(200).json({ guru: guru, mapel: mapel });
   } catch (error) {
      console.log(error);
   }
};

exports.teacherUpdate = async (req, res) => {
   try {
      await Guru.update({ mapelId: req.body.mapelid }, { where: { id: req.body.id } });
      res.status(200).json({ message: "Data berhasil di update" });
   } catch (error) {
      console.log(error);
   }
};
