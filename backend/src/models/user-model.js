const { Sequelize } = require("sequelize");
const db = require("../configs/database");

const { DataTypes } = Sequelize;

const random = String(Math.round(Date.now()));

const User = db.define(
   "users",
   {
      uid: {
         type: DataTypes.UUID,
         defaultValue: DataTypes.UUIDV4,
      },
      nickname: {
         type: DataTypes.STRING(50),
         defaultValue: "user " + random,
      },
      googleId: DataTypes.STRING(50),
      facebookId: DataTypes.STRING(50),
      role: {
         type: DataTypes.ENUM("general", "pro"),
         defaultValue: "general",
      },
      email: {
         type: DataTypes.STRING,
         allowNull: false,
         unique: true,
         validate: {
            isEmail: {
               msg: "Must be a valid email address",
            },
         },
      },
      picture: DataTypes.STRING,
      password: {
         type: DataTypes.STRING,
         require: true,
      },
   },
   {
      indexes: [
         {
            fields: ["email"],
         },
      ],
   },
   {
      freezeTableName: true,
   }
);

module.exports = User;
