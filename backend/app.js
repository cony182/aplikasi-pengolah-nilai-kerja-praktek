const express = require("express");
const cors = require("cors");
const CookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cron = require("node-cron");
require("dotenv").config();
require("./src/configs/auth-google-strategy");
const login = require("./src/routes/authentication/login");
const register = require("./src/routes/authentication/register");
const resetPassword = require("./src/routes/authentication/reset-password");
const guest = require("./src/routes/guest/Index");
const authenticatedIndex = require("./src/routes/authenticated/index");
const news = require("./src/routes/authenticated/news");

const app = express();

app.use(
   cors({
      origin: "http://192.168.100.2:5173",
      credentials: true,
   })
);
app.use(
   express.urlencoded({
      extended: true,
   })
);
app.use(express.json());
app.use(CookieParser());
app.use(fileUpload());
app.use(express.static("public"));
app.use(guest, login, register, resetPassword);
app.use(authenticatedIndex, news);

// const db = require("./src/configs/database");
// const db = require("./src/models/guru-model");
// const db2 = require("./src/models/post-model");

// (async () => {
//    await db2.sync({ force: true });
//    // await db.sync({ force: true });
//    // Code here
// })();

// const session = require("./src/models/session-model");
// const { Op } = require("sequelize");
// // SET TO "0 1 * * *" WILL EXECUTE EVERY DAY AT 1.AM
// cron.schedule("*/10 * * * * *", function () {
//    console.log(10);
//    // write your login here, delete your records
//    session.destroy({
//       where: {
//          expires: { [Op.lt]: Math.round(Date.now() / 1000) },
//       },
//    });
// });
// const sequelize = require("./src/configs/database");
// const a = require("./src/models/siswa-model");
// (async () => {
//    await a.sync({ alter: true });
//    console.log("jane.toJSON()");
// })();

// const { Op, Sequelize } = require("sequelize");
// const Nilai = require("./src/models/nilai-model");
// const Siswa = require("./src/models/siswa-model");
// app.get("/d", async (req, res) => {
//    const k = await Nilai.findAll({
//       include: [Siswa],
//       where: {
//          siswaId: 1,
//       },
//    });

//    res.json(k);
// });

// const authentication = async (req, res, next) => {
//    if (req.user.role == "guru" || req.user.role == "siswa") next();
//    req.user = "Authorization failure";
//    next();
// };

// const authentication = require("./src/middlewares/role-authentication");
// app.use(authentication);

// const authentication = (req, res, next) => {
//    if (req.user.role == "guru" || req.user.role == "siswa") next();
//    req.user = "Authorization failure";
//    next();
// };

// app.get("/:role/dashboard", tokenVerify, authentication, async (req, res) => {
//    console.log(req.user);
//    res.send("from backend :)");
// });

const decimal = Math.random().toString(32).substring(2, 7);
// console.log(decimal);

// const hex = Math.floor(Math.random() * 16777215).toString(16);
// console.log(hex);

// const argon2 = require("argon2");

// const a = async () => {
//    const b = await argon2.hash("paradox");
//    console.log(b);
// };

// console.log(a());

app.listen(process.env.APP_PORT, "0.0.0.0", () => {
   console.log(`app running on port ${process.env.APP_PORT}..`);
});
