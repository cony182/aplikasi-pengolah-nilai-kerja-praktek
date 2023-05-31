const { Sequelize } = require("sequelize");
const Guru = require("./guru-model");
const db = require("../configs/database");
const Kelas = require("./kelas-model");
const Mapel = require("./mapel-model");

const { DataTypes } = Sequelize;

const Jadwal = db.define(
   "jadwal",
   {
      tahun: {
         type: DataTypes.INTEGER(4),
      },
      semester: {
         type: DataTypes.INTEGER(2),
      },
      hari: {
         type: DataTypes.STRING(12),
      },
      jam_mulai: {
         type: DataTypes.STRING(12),
      },
      jam_akhir: {
         type: DataTypes.STRING(12),
      },
   },
   {
      freezeTableName: true,
   }
);

Kelas.hasMany(Jadwal);
Jadwal.belongsTo(Kelas);

Mapel.hasMany(Jadwal);
Jadwal.belongsTo(Mapel);

Guru.hasMany(Jadwal);
Jadwal.belongsTo(Guru);

module.exports = Jadwal;
