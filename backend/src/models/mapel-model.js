const { Sequelize } = require("sequelize");
const Guru = require("./guru-model");
const db = require("../configs/database");
const Nilai = require("./nilai-model");
const Kelas = require("./kelas-model");

const { DataTypes } = Sequelize;

const Mapel = db.define(
   "mapel",
   {
      kode_mapel: {
         type: DataTypes.STRING(5),
      },
      nama_mapel: {
         type: DataTypes.STRING(20),
      },
      jam: {
         type: DataTypes.STRING(32),
      },
   },
   {
      freezeTableName: true,
   }
);

Mapel.hasMany(Nilai);
Nilai.belongsTo(Mapel);

// Kelas.hasMany(Mapel);
// Mapel.belongsTo(Kelas);

module.exports = Mapel;
