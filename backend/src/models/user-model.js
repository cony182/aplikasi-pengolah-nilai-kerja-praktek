const { Sequelize } = require("sequelize");
const db = require("../configs/database");
const Siswa = require("./siswa-model");
const Guru = require("./guru-model");

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
         allowNull: false,
         unique: true,
      },
      fullname: {
         type: DataTypes.STRING(50),
         allowNull: true,
      },
      googleId: DataTypes.STRING(50),
      facebookId: DataTypes.STRING(50),
      role: {
         type: DataTypes.ENUM("siswa", "guru", "reguler", "admin"),
         defaultValue: "reguler",
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
      isReguler: {
         type: DataTypes.BOOLEAN,
         defaultValue: 1,
      },
      emailVerifiedAt: {
         type: DataTypes.DATE,
         allowNull: true,
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
            fields: ["uid"],
         },
      ],
   },
   {
      freezeTableName: true,
   }
);

User.hasOne(Guru);
Guru.belongsTo(User);

User.hasOne(Siswa);
Siswa.belongsTo(User);

module.exports = User;
