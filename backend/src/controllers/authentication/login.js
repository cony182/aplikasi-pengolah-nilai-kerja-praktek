const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const User = require("../../models/user-model");
const Session = require("../../models/session-model");
const crypto = require("crypto");
const { template } = require("../../configs/nodemailer-email-template");
const EmailVerify = require("../../models/email-verify-model");
const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
   host: "smtp.gmail.com",
   port: 587,
   auth: {
      user: "hayugawe.official@gmail.com",
      pass: "dcpnshpnynqobwjc",
   },
});

// Cek apakah user dalam kondisi sudah login atau belum dengan mengecek refresh token pada user.
// Jika user mempunyai refresh token maka user dianggap sudah melakukan login dan server akan mengembalikan response 200.
// Jika user tidak mempunyai refresh token maka server akan mengembalikan response 202
exports.loginIndex = (req, res) => {
   req.cookies.__secure_refresh_token ? res.status(200).json({ message: "already login" }) : res.status(202).json({ message: "not logged in" });
};

/* 
1. Validasi ekstra jika user mencoba login dengan tidak mengisi form yang ada pada frontend, maka user akan menerima
   response 400 dari server. Dengan begitu mau tidak mau user harus mengisi form yang ada pada frontend.
2. Jika query berhasil dan mendapatkan email yang diinginkan, maka cek apakah email pada kredensial tersebut sudah
   melakukan verifikasi pada email atau belum. jika belum maka user dengan email tersebut akan dimintai untuk melakukan
   verifikasi email terlebih dahulu dan menerima response 404
3. Cek apakah email cocok dengan password yang di masukkan. jika tidak maka client akan menerima response 404
4. Tanda tangani JWT dengan format payload {uid, nickname, fullname, role, email, date}
5. Berikan response cookie __main_access_token dan __secure_refresh_token pada client.
6. Kembalikan response json dari accessToken
*/
exports.login = async (req, res) => {
   if (!req.body.email || !req.body.password) return res.status(400).json({ message: "Mohon isi form dengan benar" });

   try {
      const sessionId = Math.random().toString(36).substring(2, 36) + Date.now();

      const user = await User.findOne({
         where: {
            email: req.body.email,
         },
      });

      if (!user) {
         return res.status(404).json({ message: "Email or password is incorrect" });
      }

      if (!user.emailVerifiedAt) {
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

         return res.status(202).json({ url: encode });
      }

      const passwordIsValid = await argon2.verify(user.password, req.body.password);

      if (!passwordIsValid) {
         return res.status(404).send({ message: "Email or password is incorrect" });
      }

      const refreshToken = jwt.sign(
         {
            _session_id: Buffer.from(sessionId).toString("base64"), // encode
            // _unique_secret_id: user.uid,
         },
         process.env.REFRESH_TOKEN_SECRET
      );

      const accessToken = jwt.sign(
         {
            id: user.id,
            uid: user.uid,
            role: user.role,
         },
         process.env.ACCESS_TOKEN_SECRET
      );

      await Session.create({
         session_id: sessionId,
         uid: user.uid,
      });

      res.cookie("__secure_refresh_token", refreshToken, {
         maxAge: 1000 * 60 * 60,
         httpOnly: true,
         sameSite: "Strict",
      });

      res.cookie("__main_access_token", accessToken, {
         maxAge: 1000 * 180,
         httpOnly: true,
         sameSite: "Strict",
      });

      // res.redirect("/home");
      res.status(200).json({
         accessToken: accessToken,
      });
   } catch (error) {
      console.log(error);
   }
};
