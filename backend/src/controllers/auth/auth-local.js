const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const User = require("../../models/user-model");
const Session = require("../../models/session-model");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const { template } = require("../../configs/nodemailer-email-template");
const Emailverify = require("../../models/email-verify-model");

const transport = nodemailer.createTransport({
   host: "smtp.gmail.com",
   port: 587,
   auth: {
      user: "hayugawe.official@gmail.com",
      pass: "dcpnshpnynqobwjc",
   },
});

exports.register = async (req, res) => {
   try {
      const user = await User.create({
         nickname: req.body.nickname,
         email: req.body.email,
         password: await argon2.hash(req.body.password),
      });
      if (!user) return res.send("register error");

      const verifyLink = crypto.randomBytes(128).toString("hex");

      await Emailverify.create({ uid: user.uid, link: verifyLink });

      const mailOptions = {
         from: '"Qite Team" <qite@example.com>',
         to: req.body.email,
         subject: "Qite email verification",
         text: "Hey there, thank you for register in Qite",
         html: template(
            "http://localhost:5000/email/verify/token=" +
               verifyLink +
               "/uid=" +
               user.uid
         ),
      };

      transport.sendMail(mailOptions, (error, info) => {
         if (error) {
            return console.log(error);
         }
         console.log("Message sent to: " + req.body.email);
      });

      res.redirect(
         "/email/send/token=" +
            verifyLink +
            "/email=" +
            req.body.email +
            "/uid=" +
            user.uid
      );
   } catch (error) {
      if (error.original.code === "ER_DUP_ENTRY")
         return res.send(error.original.sqlMessage);
   }
};

exports.emailVerify = async (req, res) => {
   const result = await Emailverify.findOne({
      where: {
         link: req.params.token,
      },
   });
   if (!result) return res.send("error from email verify");

   // console.log([result.expires, Math.round(Date.now() / 1000)]);
   // console.log(result < Math.round(Date.now() / 1000));
   if (result.expires < Math.round(Date.now() / 1000))
      return res.redirect(
         "/email/verify/token=" +
            req.params.token +
            "/uid=" +
            req.params.uid +
            "/expired"
      );

   await User.update(
      { emailVerifiedAt: Date.now() },
      { where: { uid: req.params.uid } }
   );

   // =========================
   const sessionId = Math.random().toString(36).substring(2, 36) + Date.now();

   const user = await User.findOne({
      where: {
         uid: req.params.uid,
      },
   });

   if (!user) {
      res.status(404).send("User not found");
      return;
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

   console.log("from email verify " + sessionId);
   await Session.create({ session_id: sessionId, uid: user.uid });

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

   // res.redirect("/home");
   res.redirect("/home"); // redirect ke home tanpa melalui login. buat token ketika register dan verify email
};

exports.expiredEmailVerify = async (req, res) => {
   res.send(
      "Sorry, your email token verify is expired. Send email again please.."
   );
};

exports.sendEmail = async (req, res) => {
   res.send(
      `<h1>Thank you we already sent you an email. please confirm!</h1> <a href='/resend/${req.params.email}/${req.params.uid}'>re-send email</a>`
   );
};

exports.resendEmail = async (req, res) => {
   const verifyLink = crypto.randomBytes(128).toString("hex");

   await Emailverify.update(
      {
         link: verifyLink,
         expires: Math.round(Date.now() / 1000) + 100,
      },
      {
         where: {
            uid: req.params.uid,
         },
      }
   );

   const mailOptions = {
      from: '"Qite Team" <qite@example.com>',
      to: req.params.email,
      subject: "Qite email verification",
      text: "Hey there, thank you for register in Qite",
      html: template(
         "http://localhost:5000/email/verify/token=" +
            verifyLink +
            "/uid=" +
            req.params.uid
      ),
   };

   transport.sendMail(mailOptions, (error, info) => {
      if (error) {
         return console.log(error);
      }
      console.log("Message re-sent to: " + req.params.email);
   });

   res.send("success");
};

exports.login = async (req, res) => {
   const sessionId = Math.random().toString(36).substring(2, 36) + Date.now();

   const user = await User.findOne({
      where: {
         email: req.body.email,
      },
   });

   if (!user) {
      res.status(404).send("User not found");
      return;
   }

   if (!user.emailVerifiedAt) return res.redirect("/email/verify=false");

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
