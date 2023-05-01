const { Sequelize } = require("sequelize");
const db = require("../configs/database");

const { DataTypes } = Sequelize;

const User = db.define(
   "users",
   {
      uid: {
         type: DataTypes.UUID,
         defaultValue: DataTypes.UUIDV4,
      },
      nickname: DataTypes.STRING(20),
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
