const { DataTypes } = require("sequelize");
const db = require("../configs/database");
const Kelas = require("./kelas-model");
const Guru = require("./guru-model");
const WaliKelas = require("./wali-kelas-model");
const User = require("./user-model");
const Nilai = require("./nilai-model");

const Siswa = db.define("siswa", {
   NIS: {
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
   thn_masuk: {
      type: DataTypes.INTEGER(4),
      allowNull: true,
   },
   semester: {
      type: DataTypes.INTEGER(2),
      allowNull: true,
   },
   thn_tempuh: {
      type: DataTypes.INTEGER(4),
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
});

Siswa.hasMany(Nilai);
Nilai.belongsTo(Siswa);

Kelas.hasMany(Siswa);
Siswa.belongsTo(Kelas);

WaliKelas.hasMany(Siswa);
Siswa.hasMany(WaliKelas);

module.exports = Siswa;
