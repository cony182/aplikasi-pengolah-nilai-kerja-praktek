const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const User = require("../../models/user-model");
const Session = require("../../models/session-model");
const EmailVerify = require("../../models/email-verify-model");
const { template } = require("../../configs/nodemailer-email-template");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const { Op } = require("sequelize");

const transport = nodemailer.createTransport({
   host: "smtp.gmail.com",
   port: 587,
   auth: {
      user: "hayugawe.official@gmail.com",
      pass: "dcpnshpnynqobwjc",
   },
});

exports.forgotPassword = async (req, res) => {
   console.log(req.body.email);
   if (!req.body.email)
      return res.status(400).json({ message: "Masukkan email" });
   try {
      const user = await User.findOne({
         where: {
            email: req.body.email,
         },
      });

      if (!user) return res.status(404).json({ message: "User not found" });

      const verifyLink = crypto.randomBytes(128).toString("hex");

      await EmailVerify.create({
         uid: user.uid,
         link: verifyLink,
         expires: Math.round(Date.now() / 1000) + 60,
      });

      const payload = {
         message: "Email sent to: " + req.body.email,
         verifyLink: verifyLink,
         email: req.body.email,
         uid: user.uid,
      };

      const payloadToString = JSON.stringify(payload);

      const encode = Buffer.from(payloadToString).toString("base64url"); // encode

      const mailOptions = {
         from: '"Qite Team" <qite@example.com>',
         to: req.body.email,
         subject: "Qite email verification",
         text: "Hey there, thank you for register in Qite",
         html: template("http://localhost:5173/reset/password/" + encode),
      };

      transport.sendMail(mailOptions, (error, info) => {
         if (error) {
            return console.log(error);
         }
         console.log("Email sent to: " + req.body.email);
      });

      res.status(200).json({ url: encode });
   } catch (error) {
      console.log(error);
      res.status(500).json({
         message:
            "Sorry, we can't verify your email. Server error with 500 status code.",
      });
   }
};

exports.resetPasswordVerify = async (req, res) => {
   if (!req.body.token)
      return res.status(400).json({ message: "Invalid token" });

   try {
      const token = req.body.token;

      const decode = Buffer.from(token, "base64url").toString("ascii");

      const jsonParse = JSON.parse(decode);

      const result = await EmailVerify.findOne({
         where: {
            link: jsonParse.verifyLink,
         },
      });

      if (!result)
         return res
            .status(404)
            .json({ message: "Email verify link not found" });

      if (Math.round(Date.now() / 1000) > result.expires) {
         return res.status(403).json({ message: "Your token is expired" });
      }

      res.status(200).json({
         message: "Password Reset link verified",
      });
   } catch (error) {
      console.log(error);
      res.status(500).json({
         message:
            "Sorry, we can't verify your reset password email. Server error with 500 status code.",
      });
   }
};

exports.resetPassword = async (req, res) => {
   if (!req.body.newPassword || !req.body.newConfirmPassword)
      return res.status(400).json({ message: "Isi password baru" });

   if (req.body.newPassword !== req.body.newConfirmPassword)
      return res
         .status(400)
         .json({ message: "Password and confirm password do not match" });

   try {
      const token = req.body.token;

      const decode = Buffer.from(token, "base64url").toString("ascii");

      const jsonParse = JSON.parse(decode);

      const result = await EmailVerify.findOne({
         where: {
            link: jsonParse.verifyLink,
         },
      });

      if (!result)
         return res
            .status(404)
            .json({ message: "Email verify link not found" });

      if (Math.round(Date.now() / 1000) > result.expires) {
         return res.status(403).json({ message: "Your token is expired" });
      }

      const user = await User.findOne({
         where: {
            [Op.and]: [{ uid: req.body.uid }, { email: req.body.email }],
         },
      });

      if (!user)
         return res
            .status(404)
            .json({ message: "User with id and email not found" });

      const hash = await argon2.hash(req.body.newPassword);

      await User.update(
         { password: hash },
         {
            where: {
               [Op.and]: [{ uid: req.body.uid }, { email: req.body.email }],
            },
         }
      );

      await EmailVerify.destroy({
         where: {
            link: jsonParse.verifyLink,
         },
      });

      res.status(200).json({
         message: "Password updated successfully",
      });
   } catch (error) {
      console.log(error);
      res.status(500).json({
         message:
            "Sorry, we can't verify your email. Server error with 500 status code.",
      });
   }
};
