const { Sequelize } = require("sequelize");
const db = require("../configs/database");

const { DataTypes } = Sequelize;

const Session = db.define(
   "session",
   {
      session_id: DataTypes.STRING(32),
      uid: DataTypes.STRING,
      expires: {
         type: DataTypes.INTEGER(16),
         defaultValue: Math.round(Date.now() / 1000 + 60 * 60 * 24),
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

// const Session = require("./src/models/session-model");
// async function migrate() {
//    await Session.sync({ force: true });
//    console.log("all session models were sync successfully");
// }
// migrate();
