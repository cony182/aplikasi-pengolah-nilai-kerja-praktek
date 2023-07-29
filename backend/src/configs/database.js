const { Sequelize } = require("sequelize");

const db = new Sequelize("express", process.env.DB_USERNAME, process.env.DB_PASSWORD, {
   host: "localhost",
   dialect: "mysql",
   define: {
      freezeTableName: true,
   },
});

module.exports = db;
