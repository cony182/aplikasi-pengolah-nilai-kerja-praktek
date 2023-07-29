const { Sequelize } = require("sequelize");
const db = require("../configs/database");

const { DataTypes } = Sequelize;

const NIS = db.define(
   "nis",
   {
      nis: DataTypes.BIGINT,
      expires: {
         type: DataTypes.BIGINT,
         // defaultValue: Math.round(Date.now() / 1000) + 60,
         allowNull: false,
      },
   },
   {
      freezeTableName: true,
   }
);

module.exports = NIS;
