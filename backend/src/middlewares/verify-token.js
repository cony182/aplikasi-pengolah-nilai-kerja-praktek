const jwt = require("jsonwebtoken");
const User = require("../models/user-model");
const Session = require("../models/session-model");

// Check nilai cookie, jika ada verify token
async function isVerify(req, res, next) {
   if (
      !req.cookies.__main_access_token &&
      !req.cookies.__secure_refresh_token
   ) {
      return res.redirect("/login");
   }

   if (!req.cookies.__secure_refresh_token && req.cookies.__main_access_token) {
      res.clearCookie("__main_access_token");
      res.clearCookie("__secure_refresh_token");
      return res.redirect("/login");
   }

   try {
      let newAccessToken; // Untuk access token yang baru

      if (
         req.cookies.__secure_refresh_token &&
         !req.cookies.__main_access_token
      ) {
         const decoded = jwt.verify(
            req.cookies.__secure_refresh_token,
            process.env.REFRESH_TOKEN_SECRET
         );
         console.log(decoded);
         console.log(decoded._session_id);

         const session = await Session.findOne({
            where: {
               session_id: decoded._session_id,
            },
         });

         if (!session) {
            res.clearCookie("__secure_refresh_token");
            return res.redirect("/login");
         }

         // console.log(session);

         const user = await User.findOne({
            where: {
               uid: session.uid,
            },
         });

         // const refreshToken = jwt.sign(
         //    {
         //       _unique_secret_id: user.uid,
         //    },
         //    process.env.REFRESH_TOKEN_SECRET,
         //    {
         //       expiresIn: 1000 * 60 * 60,
         //    }
         // );

         const payload = {
            nickname: user.nickname,
            role: user.role,
            email: user.email,
            date: user.createdAt,
         };

         const accessToken = jwt.sign(
            payload,
            process.env.ACCESS_TOKEN_SECRET,
            {
               expiresIn: 1000 * 60,
            }
         );

         // res.cookie("__secure_refresh_token", refreshToken, {
         //    maxAge: 1000 * 60 * 60,
         //    httpOnly: true,
         // });

         res.cookie("__main_access_token", accessToken, {
            maxAge: 1000 * 180,
            httpOnly: true,
         });

         newAccessToken = accessToken;
      }

      const newToken = req.cookies.__main_access_token || newAccessToken; // Ambil token dari client, jika tidak ada ambil dari access token baru

      jwt.verify(
         newToken,
         process.env.ACCESS_TOKEN_SECRET,
         function (err, data) {
            if (err) return res.send("Invalid Token");
            req.user = data;
         }
      );

      next();
   } catch (error) {
      console.log("Internal Server Error " + error);
   }
}

module.exports = isVerify;
