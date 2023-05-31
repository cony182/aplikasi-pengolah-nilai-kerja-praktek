const { Sequelize } = require("sequelize");
const db = require("../configs/database");

const { DataTypes } = Sequelize;

const Emailverify = db.define(
   "email_verify",
   {
      uid: DataTypes.STRING,
      link: DataTypes.TEXT,
      expires: {
         type: DataTypes.INTEGER(16),
         // defaultValue: Math.round(Date.now() / 1000) + 60,
         allowNull: false,
      },
   },
   {
      freezeTableName: true,
   }
);

module.exports = Emailverify;

// const EmailVerify = require("./src/models/email-verify-model");
// async function migrate() {
//    await EmailVerify.sync({ force: true });
//    console.log("all email verify models were sync successfully");
// }
// migrate();
