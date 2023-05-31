const { Sequelize } = require("sequelize");
const db = require("../configs/database");
const Siswa = require("./siswa-model");
const WaliKelas = require("./wali-kelas-model");

const { DataTypes } = Sequelize;

const Kelas = db.define(
   "kelas",
   {
      kode_kelas: {
         type: DataTypes.STRING(5),
         allowNull: true,
      },
      nama_kelas: {
         type: DataTypes.STRING(5),
         allowNull: true,
      },
   },
   {
      freezeTableName: true,
   }
);

module.exports = Kelas;
