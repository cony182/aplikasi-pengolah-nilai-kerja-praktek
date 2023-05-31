const { Sequelize } = require("sequelize");
const db = require("../configs/database");

const { DataTypes } = Sequelize;

const Nilai = db.define(
   "nilai",
   {
      tahun: {
         type: DataTypes.INTEGER(4),
      },
      semester: {
         type: DataTypes.INTEGER(2),
         allowNull: true,
      },
      thn_ajaran: {
         type: DataTypes.STRING(12),
         allowNull: true,
      },
      nilai_kehadiran: {
         type: DataTypes.INTEGER(3),
         allowNull: true,
      },
      nilai_tugas: {
         type: DataTypes.INTEGER(3),
         allowNull: true,
      },
      nilai_uts: {
         type: DataTypes.INTEGER(3),
         allowNull: true,
      },
      nilai_uas: {
         type: DataTypes.INTEGER(3),
         allowNull: true,
      },
      nilai_opsi: {
         type: DataTypes.INTEGER(3),
         allowNull: true,
      },
   },
   {
      freezeTableName: true,
   }
);

module.exports = Nilai;
