const express = require("express");
const userAuthRoute = require("./src/routes/auth/login-with-auth");
const CookieParser = require("cookie-parser");
const cron = require("node-cron");
const verifyToken = require("./src/middlewares/verify-token");
const passport = require("passport");
require("dotenv").config();
require("./src/controllers/auth/auth-google-strategy");
const googleAuthLogin = require("./src/controllers/auth/auth-google");

const app = express();

app.use(express.json());
app.use(CookieParser());
app.use(
   express.urlencoded({
      extended: true,
   })
);
app.use(userAuthRoute);
app.use(googleAuthLogin);

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

// app.get(
//    "/auth/google",
//    passport.authenticate("google", { scope: ["email", "profile"] })
// );

// const jwt = require("jsonwebtoken");
// const Session = require("./src/models/session-model");
// app.get(
//    "/google/callback",
//    passport.authenticate("google", {
//       failureRedirect: "/fail",
//       session: false,
//    }),
//    async (req, res) => {
//       console.log("from app.js");
//       const sessionId = Math.random().toString(36).substring(2, 36);

//       const refreshToken = jwt.sign(
//          {
//             _session_id: sessionId,
//          },
//          process.env.REFRESH_TOKEN_SECRET,
//          {
//             expiresIn: 1000 * 60 * 60,
//          }
//       );

//       const session = new Session({
//          session_id: sessionId,
//          uid: req.user.uid,
//       });

//       // console.log(sessionId);

//       session.save((err, sessionId) => {
//          if (err) {
//             return res.status(500).send({ message: err });
//          } else {
//             res.status(200).send({
//                message: "session ID" + sessionId + "registered successfully",
//             });
//          }
//       });

//       const accessToken = jwt.sign(
//          {
//             uid: req.user.uid,
//             googleId: req.user.googleId,
//             facebookId: req.user.facebookId,
//             nickname: req.user.nickname,
//             role: req.user.role,
//             email: req.user.email,
//             date: req.user.createdAt,
//          },
//          process.env.ACCESS_TOKEN_SECRET,
//          {
//             expiresIn: 1000 * 60,
//          }
//       );

//       res.cookie("__secure_refresh_token", refreshToken, {
//          maxAge: 1000 * 60 * 60,
//          httpOnly: true,
//          secure: true,
//       });

//       res.cookie("__main_access_token", accessToken, {
//          maxAge: 1000 * 180,
//          httpOnly: true,
//          secure: true,
//       });

//       res.redirect("/home");
//    }
// );

// app.get("/auth/google/failure", (req, res) => {
//    res.send("something wrong");
// });

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

// Migrate table Users
// const User = require("./src/models/user-model");
// async function migrate() {
//    await User.sync({ force: true });
//    console.log("all models were sync successfully");
// }
// migrate();

// const Session = require("./src/models/session-model");
// async function migrate() {
//    await Session.sync({ force: true });
//    console.log("all session models were sync successfully");
// }
// migrate();
