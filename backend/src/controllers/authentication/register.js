const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const User = require("../../models/user-model");
const Session = require("../../models/session-model");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const { template } = require("../../configs/nodemailer-email-template");
const Emailverify = require("../../models/email-verify-model");
const { Op, json } = require("sequelize");

const transport = nodemailer.createTransport({
   host: "smtp.gmail.com",
   port: 587,
   auth: {
      user: "hayugawe.official@gmail.com",
      pass: "dcpnshpnynqobwjc",
   },
});

/*
Cek apakah user dalam kondisi sudah login atau belum dengan mengecek refresh token pada user.
Jika user mempunyai refresh token maka user dianggap sudah melakukan login dan server akan mengembalikan response 200.
Jika user tidak mempunyai refresh token maka server akan mengembalikan response 202 
*/
exports.registerIndex = (req, res) => {
   req.cookies.__secure_refresh_token
      ? res.status(200).json({ message: "Already login" })
      : res.status(202).json({ message: "Not logged in" });
};

/*
1. Validasi ekstra jika client mencoba register dengan tidak mengisi form yang ada pada frontend, maka client akan menerima
   response 400 dari server. Dengan begitu mau tidak mau client harus mengisi form yang ada pada frontend.
2. Cek ketersediaan email, jika email sudah digunakan maka server akan mengembalikan response konflik 409.
3. Jika email belum digunakan maka data akan dibuat.
4. Membuat verifyLink dengan menggunakan crypto yang akan membuat 128 karakter acak, kemudian akan disimpan ke database
   dengan ketentuan {uid, verifyLink, expires}. Uid akan didapat dari data user sebelumnya,  verifyLink, dan expires dengan
   ketentuan 60 detik waktu kedaluarsa.
5. Payload akan dibuat dengan format json dan memiliki ketentuan {message, verifyLink, email, fullname, uid} yang akan di ubah
   bentuknya menjadi string dengan JSON.Stringify() dan akan di encode oleh base64url
6. Mengirim link menggunakan email dengan nodemailer. Email akan berisi tombol CTA (call to action) yang akan mengarah pada
   http://localhost:5173/email/verify/ + payload yang sudah di encode menggunakan base64url
7. Jika ketentuan di atas sudah terpenuhi, maka client akan menerima response 200 dengan data url yang berisi payload
   yang sudah di encode menjadi base64url yang akan digunakan untuk mem-verifikasi apakah link yang terdapat di dalam
   payload sudah kedaluarsa (expire) atau belum 
*/
exports.register = async (req, res) => {
   if (
      !req.body.fullname ||
      !req.body.email ||
      !req.body.password ||
      !req.body.confirmPassword
   )
      return res.status(400).json({ message: "Form not full" });

   try {
      const userExist = await User.findOne({
         where: {
            email: req.body.email,
         },
      });

      if (userExist)
         return res.status(409).json({ message: "Email not available" });

      const user = await User.create({
         fullname: req.body.fullname,
         email: req.body.email,
         password: await argon2.hash(req.body.password),
      });

      if (!user) return res.status(400).json({ message: "register error" });

      const verifyLink = crypto.randomBytes(128).toString("hex");

      await Emailverify.create({
         uid: user.uid,
         link: verifyLink,
         expires: Math.round(Date.now() / 1000) + 60,
      });

      const payload = {
         message: "Email sent to: " + req.body.email,
         verifyLink: verifyLink,
         email: req.body.email,
         fullname: req.body.fullname,
         uid: user.uid,
      };

      const payloadToString = JSON.stringify(payload);

      const encode = Buffer.from(payloadToString).toString("base64url"); // encode

      const mailOptions = {
         from: '"Qite Team" <qite@example.com>',
         to: req.body.email,
         subject: "Qite email verification",
         text: "Hey there, thank you for register in Qite",
         html: template("http://localhost:5173/email/verify/" + encode),
      };

      transport.sendMail(mailOptions, (error, info) => {
         if (error) {
            return console.log(error);
         }
         console.log("Email sent to: " + req.body.email);
      });

      res.status(200).json({ url: encode });
   } catch (error) {
      res.status(500).json({
         message: "Cannot register. Server error with status code 500",
      });
   }
};

/*
1. Cek token, jika tidak ada server akan mengembalikan response 400
2. Jika token ada, maka token akan di decode dari base64url kemudian akan diubah bentuknya
   menjadi format json dengan menggunakan JSON.parse()
3. Cari link pada model, jika tidak ditemukan maka server akan mengembalikan response 404
4. Bandingkan antara waktu sekarang dengan tanggal kedaluarsa link. Jika waktu sekaranng melebihi waktu
   yang ada pada field expires, maka token dianggap kedaluarsa dan sudah tidak berlaku lagi.
5. Jika semua pengecekan di atas lulus, maka update field verified_at menjadi waktu sekarang.
6. Buat session id dan simpan di database, tanda tangani JWT, buat cookie, dan kembalikan response 200. 
*/
exports.emailVerify = async (req, res) => {
   //Ubah method jadi post jangan get
   try {
      if (!req.params.token)
         return res.status(400).json({ message: "Invalid token" });

      const decode = Buffer.from(req.params.token, "base64url").toString(
         "ascii"
      ); // decode

      const jsonParse = JSON.parse(decode);

      const result = await Emailverify.findOne({
         where: {
            link: jsonParse.verifyLink,
         },
      });
      if (!result)
         return res.status(404).json({ message: "error from email verify" });

      if (Math.round(Date.now() / 1000) > result.expires) {
         return res.status(403).json({ message: "Your token is expired" });
      }

      await User.update(
         { emailVerifiedAt: Date.now() },
         { where: { uid: jsonParse.uid } }
      );

      // ======= REDIRECT TO AUTHENTICATED PAGE =======
      const sessionId =
         Math.random().toString(36).substring(2, 36) + Date.now();

      const user = await User.findOne({
         where: {
            uid: jsonParse.uid,
         },
      });

      if (!user) {
         return res.status(404).json({ message: "User not found" });
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
         sameSite: "Strict",
      });

      res.cookie("__main_access_token", accessToken, {
         maxAge: 1000 * 180,
         httpOnly: true,
         secure: true,
         sameSite: "Strict",
      });

      res.status(200).json({
         message: "User with email " + user.email + "grant authorized",
      });
   } catch (error) {
      res.status(500).json({
         message:
            "Sorry, we can't verify your email. Server error with 500 status code.",
      });
   }
};

/*
1. Meminta token yang digunakan sebelumnya. Jika pengecekan dari token sebelumnya lulus
   maka link pada uid tersebut akan diperbarui dan expires dengan uid tersebut akan di update
   dengan waktu sekarang + 60 detik. (pengecekan meliputi pencarian link dan mendecode dari
   base64url mejadi json)
2. Jika ketentuan diatas terpenuhi, maka update link dari uid tersebut dan kirim email kembali
   dan kembalikan response 200.
*/
exports.resendEmail = async (req, res) => {
   if (!req.body.token)
      return res.status(400).json({ message: "Invalid or token not found" });

   try {
      const token = req.body.token;
      const decode = Buffer.from(token, "base64url").toString("ascii");
      const jsonParse = JSON.parse(decode);
      const verifyLink = crypto.randomBytes(128).toString("hex");

      const findLink = await Emailverify.findOne({
         where: {
            link: jsonParse.verifyLink,
         },
      });

      if (!findLink) return res.status(404).json({ message: "Link not found" });

      await Emailverify.update(
         {
            link: verifyLink,
            expires: Math.round(Date.now() / 1000) + 60,
         },
         {
            where: {
               uid: jsonParse.uid,
            },
         }
      );

      const payload = {
         message: "Email sent to: " + jsonParse.email,
         verifyLink: verifyLink,
         email: jsonParse.email,
         fullname: jsonParse.fullname,
         uid: jsonParse.uid,
      };

      const payloadToString = JSON.stringify(payload);

      const encode = Buffer.from(payloadToString).toString("base64url"); // encode

      const mailOptions = {
         from: '"Qite Team" <qite@example.com>',
         to: jsonParse.email,
         subject: "Qite email verification",
         text: "Hey there, thank you for register in Qite",
         html: template("http://localhost:5173/email/verify/" + encode),
      };

      transport.sendMail(mailOptions, (error, info) => {
         if (error) {
            return console.log(error);
         }
         console.log("Message re-sent to: " + jsonParse.email);
      });

      res.status(200).json({
         message: "Success re-send email to " + jsonParse.email,
      });
   } catch (error) {
      console.log(error);
   }
};
