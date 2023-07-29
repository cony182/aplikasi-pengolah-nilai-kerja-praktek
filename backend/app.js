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
const admin = require("./src/admin/routes/index");

const app = express();

app.use(
   cors({
      // URL dari frontend
      origin: "http://localhost:5173",
      credentials: true,
   })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(CookieParser());
app.use(fileUpload());
app.use(express.static("public"));
app.use(guest, login, register, resetPassword);
app.use(authenticatedIndex, admin);

const db = require("./src/configs/database");
const User = require("./src/models/user-model");
const Siswa = require("./src/models/nilai-model");
// const db = require("./src/models/tahun-ajaran");
// const db2 = require("./src/models/post-model");

// (async () => {
//    // await db2.sync({ force: true });
//    await db.sync({ force: true });
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

const decimal = Math.random().toString(32).substring(2, 7);
async function run() {
   for (let index = 11; index < 1000; index++) {
      await Siswa.create({
         NIS: 2020 + index,
         nama: "user" + index,
         thn_masuk: new Date().getFullYear(),
         thn_tempuh: new Date().getFullYear(),
         kelaId: 1,
         waliKelaId: 1,
         userId: 11 + index,
      });
   }
}

const argon2 = require("argon2");

async function runi() {
   await User.create({
      nickname: "kaka",
      fullname: "kaka",
      email: "kaka@gmail.com",
      password: await argon2.hash("asd"),
   });
}

// runi();
// console.log(decimal);

// const hex = Math.floor(Math.random() * 16777215).toString(16);
// console.log(hex);

app.listen(process.env.APP_PORT, "0.0.0.0", () => {
   // console.clear();
   console.log("\033[34mApp URL " + process.env.APP_BASE_URL + ":" + process.env.APP_PORT + "\n\n");
   console.log("\033[33mServer up and running...");
});
