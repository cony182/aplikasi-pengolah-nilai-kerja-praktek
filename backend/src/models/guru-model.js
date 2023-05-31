const { Sequelize } = require("sequelize");
const db = require("../configs/database");
const Kelas = require("./kelas-model");
const Nilai = require("./nilai-model");
const WaliKelas = require("./wali-kelas-model");
const Siswa = require("./siswa-model");
const User = require("./user-model");
const Mapel = require("./mapel-model");

const { DataTypes } = Sequelize;

const Guru = db.define(
   "guru",
   {
      NIP: {
         type: DataTypes.STRING(16),
         allowNull: false,
      },
      nama: {
         type: DataTypes.STRING(32),
         allowNull: false,
      },
      tgl_lahir: {
         type: DataTypes.STRING(32),
         allowNull: true,
      },
      tmpt_lahir: {
         type: DataTypes.STRING(32),
         allowNull: true,
      },
      kelamin: {
         type: DataTypes.ENUM("L", "P", "U"),
         defaultValue: "U",
      },
      alamat: {
         type: DataTypes.STRING(64),
         allowNull: true,
      },
      pendidikan: {
         type: DataTypes.STRING(16),
         allowNull: true,
      },
      telp: {
         type: DataTypes.STRING(16),
         allowNull: true,
      },
      email: {
         type: DataTypes.STRING(32),
      },
      picture: DataTypes.STRING,
   },
   {
      freezeTableName: true,
   }
);

Mapel.hasOne(Guru);
Guru.belongsTo(Mapel);

Guru.hasMany(Nilai);
Nilai.belongsTo(Guru);

module.exports = Guru;
