const { Sequelize } = require("sequelize");

const db = new Sequelize("express", "root", "", {
   host: "localhost",
   dialect: "mysql",
   define: {
      freezeTableName: true,
   },
});

module.exports = db;
