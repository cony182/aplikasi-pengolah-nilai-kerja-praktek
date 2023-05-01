const { Sequelize } = require("sequelize");
const db = require("../configs/database");

const { DataTypes } = Sequelize;

const Session = db.define(
   "session",
   {
      session_id: DataTypes.STRING(12),
      uid: DataTypes.STRING,
      expires: {
         type: DataTypes.INTEGER(16),
         defaultValue: Math.round(Date.now() / 1000) + 100,
      },
   },
   {
      indexes: [
         {
            fields: ["session_id"],
         },
      ],
   },
   {
      freezeTableName: true,
   }
);

module.exports = Session;
