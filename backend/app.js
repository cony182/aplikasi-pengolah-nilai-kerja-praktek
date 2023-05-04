const express = require("express");
const cors = require("cors");
const userAuthRoute = require("./src/routes/auth/route-auth-local");
const CookieParser = require("cookie-parser");
const cron = require("node-cron");
const verifyToken = require("./src/middlewares/verify-token");
require("dotenv").config();
require("./src/configs/auth-google-strategy");
const googleAuthLogin = require("./src/controllers/auth/auth-google");
const User = require("./src/models/user-model");
const argon2 = require("argon2");

const app = express();

app.use(cors());
app.use(express.json());
app.use(CookieParser());
app.use(
   express.urlencoded({
      extended: true,
   })
);
app.use(userAuthRoute);
app.use(googleAuthLogin);

const sessionId = Math.random().toString(36).substring(2, 36) + Date.now();
console.log(sessionId);

const { Op } = require("sequelize");
app.get("/", async (req, res) => {
   console.log(Date.now());
   const user = await User.findAll({ limit: 10 });
   // const user = await User.destroy({
   //    where: {
   //       email: "erikbagja@gmail.com",
   //    },
   // });
   // async function gen() {
   //    for (let i = 0; i < 5000; i++) {
   //       const random = Math.random().toString(36).substring(2, 36);
   //       User.create({
   //          nickname: "user" + random,
   //          email: random + "@gmail.com",
   //          password: await argon2.hash(random),
   //       });
   //    }
   // }
   // const run = gen();
   // if (!run) console.log("DB failed!");
   // console.log(user);
   console.log(Date.now());
   res.send(user);
});

app.get("/register", (req, res) => {
   res.send(`
   <form action="/register" method="POST">
   <h1>Sign Up</h1>
   <hr>
   <input type="text" name="email" required>
   <input type="password" name="password" required>
   <button type="submit">Sign Up</button>
   </form>
`);
});

app.get("/email/verify=false", (req, res) => {
   res.send("please verify email first..");
});

app.get("/login", (req, res) => {
   res.send(`
   <body style="background-color: #3F4E4F; color: #A5C9CA;">
   <form action="/login" method="POST">
   <h1>Sign In</h1>
   <hr>
   <input type="text" name="email" required style="background-color: #A5C9CA; color: #A5C9CA;">
   <input type="password" name="password" required style="background-color: #A5C9CA; color: #000000;">
   <button type="submit" style="background-color: #A5C9CA; color: #000000;">Sign Up</button>
   </form>
   <a href="/auth/google" style="color: #1597BB">Login with Google</a>
   </body>
`);
});

app.get("/home", verifyToken, (req, res) => {
   console.log(req.user.nickname + " mengakses /home");

   // console.log(req.cookies.__secure_refresh_token);

   res.send(`
   <body style="background-color: #3F4E4F; color: #A5C9CA;">
   <h1>Data</h1>
   <hr>
   <p>Nickname : ${req.user.nickname}</p>
   <p>Google ID : ${req.user.googleId}</p>
   <p>Facebook ID : ${req.user.facebookId}</p>
   <p>Role : ${req.user.role}</p>
   <p>Email : ${req.user.email}</p>
   <p>Date : ${req.user.date}</p>
   <p>iat : ${req.user.iat}</p>
   <p>exp : ${req.user.exp}</p>
   <a href="/protected" style="color: #1597BB">Go To Protected Page</a>
   <a href="/logout" style="color: #1597BB">Logout</a>
   </body>
   `);
});

// const EmailVerify = require("./src/models/email-verify-model");
// async function migrate() {
//    await EmailVerify.sync({ force: true });
//    console.log("all email verify models were sync successfully");
// }
// migrate();

app.get("/protected", verifyToken, (req, res) => {
   res.send(req.user);
});

// console.log(String(Math.round(Date.now())).slice(-8));
// console.log(Math.round(Date.now() / 10));
// console.log(Math.round(Date.now() / 1000) + 50);

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

app.listen(process.env.APP_PORT, () => {
   console.log(`app running on port ${process.env.APP_PORT}..`);
});
