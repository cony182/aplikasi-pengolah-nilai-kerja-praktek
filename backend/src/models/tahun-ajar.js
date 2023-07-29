const { Sequelize } = require("sequelize");
const db = require("../configs/database");

const { DataTypes } = Sequelize;

const ThnAjaran = db.define(
   "thn_ajar",
   {
      tahun: DataTypes.INTEGER(4),
      semester: DataTypes.INTEGER(2),
   },
   {
      freezeTableName: true,
   }
);

module.exports = ThnAjaran;
