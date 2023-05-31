const { Sequelize } = require("sequelize");
const db = require("../configs/database");
const User = require("./user-model");
const Kelas = require("./kelas-model");

const { DataTypes } = Sequelize;

const Posts = db.define(
   "posts",
   {
      title: {
         type: DataTypes.STRING,
      },
      slug: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      content: {
         type: DataTypes.TEXT("medium"),
         validate: {
            min: 3,
         },
      },
      likes: {
         type: DataTypes.INTEGER,
      },
   },
   {
      freezeTableName: true,
   }
);

User.hasMany(Posts);
Posts.belongsTo(User);

module.exports = Posts;
