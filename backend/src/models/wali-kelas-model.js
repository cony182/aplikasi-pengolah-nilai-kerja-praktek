const { Sequelize } = require("sequelize");
const Guru = require("./guru-model");
const db = require("../configs/database");

const { DataTypes } = Sequelize;

const WaliKelas = db.define(
   "wali_kelas",
   {
      tahun: {
         type: DataTypes.INTEGER(4),
      },
      kelas: {
         type: DataTypes.STRING(8),
      },
   },
   {
      freezeTableName: true,
   }
);

Guru.hasOne(WaliKelas);
WaliKelas.belongsTo(Guru);

module.exports = WaliKelas;
