// const express = require("express");
// const jwt = require("jsonwebtoken");
// const Session = require("../../models/session-model");
// const User = require("../../models/user-model");

// const app = express();

// app.get("/email/verify/token/:token/uid/:uid", async (req, res) => {
//    const result = await Emailverify.findOne({
//       where: {
//          link: req.params.token,
//       },
//    });
//    if (!result) return res.send("error from result");

//    await User.update(
//       { emailVerifiedAt: Date.now() },
//       { where: { uid: req.params.uid } }
//    );

//    // =========================
//    const sessionId = Math.random().toString(36).substring(2, 36);

//    const user = await User.findOne({
//       where: {
//          uid: req.params.uid,
//       },
//    });

//    if (!user) {
//       res.status(404).send("User not found");
//       return;
//    }

//    const refreshToken = jwt.sign(
//       {
//          _session_id: sessionId,
//          // _unique_secret_id: user.uid,
//       },
//       process.env.REFRESH_TOKEN_SECRET,
//       {
//          expiresIn: 1000 * 60 * 60,
//       }
//    );

//    const session = new Session({
//       session_id: sessionId,
//       uid: user.uid,
//    });

//    // console.log(sessionId);

//    session.save((err, sessionId) => {
//       if (err) {
//          return res.status(500).send({ message: err });
//       } else {
//          res.status(200).send({
//             message: "session ID" + sessionId + "registered successfully",
//          });
//       }
//    });

//    const accessToken = jwt.sign(
//       {
//          uid: user.uid,
//          nickname: user.nickname,
//          role: user.role,
//          email: user.email,
//          date: user.createdAt,
//       },
//       process.env.ACCESS_TOKEN_SECRET,
//       {
//          expiresIn: 1000 * 60,
//       }
//    );

//    res.cookie("__secure_refresh_token", refreshToken, {
//       maxAge: 1000 * 60 * 60,
//       httpOnly: true,
//       secure: true,
//    });

//    res.cookie("__main_access_token", accessToken, {
//       maxAge: 1000 * 180,
//       httpOnly: true,
//       secure: true,
//    });

//    // res.redirect("/home");
//    res.redirect("/home"); // redirect ke home tanpa melalui login. buat token ketika register dan verify email
// });

// app.get("/email/sent", (req, res) => {
//    res.send("Thank you we already sent you an email. please confirm!");
// });

// module.exports = app;
