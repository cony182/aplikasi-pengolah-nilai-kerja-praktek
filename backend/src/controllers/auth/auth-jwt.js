const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const User = require("../../models/user-model");
const Session = require("../../models/session-model");

exports.register = async (req, res) => {
   const user = new User({
      nickname: req.body.nickname,
      email: req.body.email,
      password: await argon2.hash(req.body.password),
   });

   user.save((err, user) => {
      if (err) {
         return res.status(500).send({ message: err });
      } else {
         res.status(200).send({
            message: "User registered successfully",
         });
      }
   });

   res.redirect("/login");
};

exports.login = async (req, res) => {
   const sessionId = Math.random().toString(36).substring(2, 36);

   const user = await User.findOne({
      where: {
         email: req.body.email,
      },
   });

   if (!user) {
      res.status(404).send("User not found");
      return;
   }

   const passwordIsValid = await argon2.verify(
      user.password,
      req.body.password
   );

   if (!passwordIsValid) {
      return res
         .status(401)
         .send({ accessToken: null, message: "Invalid password" });
   }

   const refreshToken = jwt.sign(
      {
         _session_id: sessionId,
         // _unique_secret_id: user.uid,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
         expiresIn: 1000 * 60 * 60,
      }
   );

   const session = new Session({
      session_id: sessionId,
      uid: user.uid,
   });

   // console.log(sessionId);

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
         uid: user.uid,
         nickname: user.nickname,
         role: user.role,
         email: user.email,
         date: user.createdAt,
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
};

exports.logout = async (req, res) => {
   const decoded = jwt.verify(
      req.cookies.__secure_refresh_token,
      process.env.REFRESH_TOKEN_SECRET
   );
   console.log(decoded);
   console.log(decoded._session_id);
   await Session.destroy({
      where: {
         session_id: decoded._session_id,
      },
   });

   res.clearCookie("__main_access_token");
   res.clearCookie("__secure_refresh_token");

   console.log(
      "Success Logged out and destroy session id = " + decoded._session_id
   );

   res.redirect("/login");
};
