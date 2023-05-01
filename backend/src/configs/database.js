const { Sequelize } = require("sequelize");

const db = new Sequelize("express", "root", "", {
   host: "localhost",
   dialect: "mysql",
});

module.exports = db;
