const Guru = require("../../models/guru-model");
const Jadwal = require("../../models/jadwal-model");
const Kelas = require("../../models/kelas-model");
const Mapel = require("../../models/mapel-model");
const ThnAjaran = require("../../models/tahun-ajar");

exports.jadwal = async (req, res) => {
   try {
      const sortBy = req.query.sort || new Date().getFullYear();

      const jadwal = await Jadwal.findAll({
         include: [
            { model: Mapel, attributes: ["id", "nama_mapel"] },
            { model: Kelas, attributes: ["id", "nama_kelas"] },
            { model: Guru, attributes: ["id", "nama"] },
         ],
         where: { tahun: sortBy },
      });

      const pelajaran = await Mapel.findAll({ attributes: ["id", "nama_mapel"] });
      const kelas = await Kelas.findAll({ attributes: ["id", "nama_kelas"] });
      const guru = await Guru.findAll({ attributes: ["id", "nama"] });
      const tahun = await ThnAjaran.findAll({ attributes: ["id", "tahun", "semester"] });

      res.status(200).json({ jadwal: jadwal, pelajaran: pelajaran, kelas: kelas, guru: guru, tahun: tahun });
   } catch (error) {
      console.log(error);
   }
};

exports.createJadwal = async (req, res) => {
   try {
      await Jadwal.create({
         tahun: req.body.tahun,
         semester: req.body.semester,
         hari: req.body.hari,
         jam_mulai: req.boody.jamMulai,
         jam_akhir: req.body.jamAkhir,
         kelaId: req.body.kelasId,
         guruId: req.body.guruId,
         mapelId: req.body.mapelId,
      });
      res.status(200).json({ message: "Berhasil menambahkan jadwal" });
   } catch (error) {
      console.log(error);
   }
};

exports.updateJadwal = async (req, res) => {
   try {
      await Jadwal.update(
         {
            tahun: req.body.tahun,
            semester: req.body.semester,
            hari: req.body.hari,
            jam_mulai: req.body.jamMulai,
            jam_akhir: req.body.jamAkhir,
            kelaId: req.body.kelasId,
            guruId: req.body.guruId,
            mapelId: req.body.mapelId,
         },
         { where: { id: req.body.id } }
      );
      res.status(200).json({ message: "Berhasil menambahkan jadwal" });
   } catch (error) {
      console.log(error);
   }
};
