const express = require("express");
const userAuthRoute = require("./src/routes/auth/login-with-auth");
const CookieParser = require("cookie-parser");
const cron = require("node-cron");
const verifyToken = require("./src/middlewares/verify-token");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(CookieParser());
app.use(
   express.urlencoded({
      extended: true,
   })
);
app.use(userAuthRoute);

app.get("/", (req, res) => {
   res.send("from app.js");
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

app.get("/login", (req, res) => {
   res.send(`
   <form action="/login" method="POST">
   <h1>Sign In</h1>
   <hr>
   <input type="text" name="email" required>
   <input type="password" name="password" required>
   <button type="submit">Sign Up</button>
   </form>
`);
});

app.get("/home", verifyToken, (req, res) => {
   console.log(req.user.nickname + " mengakses /home");

   // console.log(req.cookies.__secure_refresh_token);

   res.send(`
   <h1>Data</h1>
   <hr>
   <p>Nickanme : ${req.user.nickname}</p>
   <p>Role : ${req.user.role}</p>
   <p>Email : ${req.user.email}</p>
   <p>Date : ${req.user.date}</p>
   <p>iat : ${req.user.iat}</p>
   <p>exp : ${req.user.exp}</p>
   <a href="/protected">Go To Protected Page</a>
   <a href="/logout">Logout</a>
   `);
});

app.get("/protected", verifyToken, (req, res) => {
   if (req.user.role == "general") {
      res.send(
         req.user.nickname +
            " is " +
            req.user.role +
            ` account from protected <a href="/logout">Logout</a>`
      );
   }
   if (req.user.role == "pro") {
      res.send(
         req.user.nickname +
            " is " +
            req.user.role +
            ` special account from protected <a href="/logout">logout</a>`
      );
   }

   console.log(req.user.role);
});

// console.log(Math.round(Date.now() / 1000));
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

// Migrate table Users
// const User = require("./src/models/user-model");
// async function migrate() {
//  await User.sync({ force: true });
//  console.log("all models were sync successfully");
// }
// migrate();

// const Session = require("./src/models/session-model");
// async function migrate() {
//    await Session.sync({ force: true });
//    console.log("all session models were sync successfully");
// }
// migrate();
