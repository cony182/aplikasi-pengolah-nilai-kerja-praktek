const jwt = require("jsonwebtoken");
const Session = require("../../models/session-model");
const express = require("express");
const passport = require("passport");

const app = express();

app.get(
   "/auth/google",
   passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
   "/google/callback",
   passport.authenticate("google", {
      failureRedirect: "/fail",
      session: false,
   }),
   async (req, res) => {
      const sessionId = Math.random().toString(36).substring(2, 36);

      const refreshToken = jwt.sign(
         {
            _session_id: sessionId,
         },
         process.env.REFRESH_TOKEN_SECRET,
         {
            expiresIn: 1000 * 60 * 60,
         }
      );

      const session = new Session({
         session_id: sessionId,
         uid: req.user.uid,
      });

      session.save((err, sessionId) => {
         if (err) {
            return res.status(500).send({ message: err });
         } else {
            res.status(200).send({
               message: "session ID" + sessionId + "registered successfully",
            });
         }
      });

      const accessToken = jwt.sign(
         {
            uid: req.user.uid,
            googleId: req.user.googleId,
            facebookId: req.user.facebookId,
            nickname: req.user.nickname,
            role: req.user.role,
            email: req.user.email,
            date: req.user.createdAt,
         },
         process.env.ACCESS_TOKEN_SECRET,
         {
            expiresIn: 1000 * 60,
         }
      );

      res.cookie("__secure_refresh_token", refreshToken, {
         maxAge: 1000 * 60 * 60,
         httpOnly: true,
         secure: true,
      });

      res.cookie("__main_access_token", accessToken, {
         maxAge: 1000 * 180,
         httpOnly: true,
         secure: true,
      });

      res.redirect("/home");
   }
);

app.get("/auth/google/failure", (req, res) => {
   res.send("something wrong");
});

module.exports = app;
