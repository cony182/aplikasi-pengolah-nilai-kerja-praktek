const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const User = require("../../models/user-model");
const Session = require("../../models/session-model");
const { Op } = require("sequelize");

exports.googleLogin = async (req, res) => {
   try {
      const user = await User.findOne({
         where: {
            [Op.or]: [{ googleId: req.body.googleId }, { email: req.body.email }],
         },
      });

      // Buffer('SGVsbG8sIHdvcmxkIQ==', 'base64').toString('ascii') // decode
      // Buffer.from('SGVsbG8sIHdvcmxkIQ==').toString("base64"); // encode
      const sessionId = Math.random().toString(36).substring(2, 36) + Date.now();

      if (!user) {
         const hash = await argon2.hash(Math.random().toString(36).substring(2, 36));

         const newUser = await User.create({
            googleId: req.body.googleId,
            nickname: req.body.nickname,
            email: req.body.email,
            emailVerifiedAt: Date.now(),
            password: hash,
         });

         const refreshToken = jwt.sign(
            {
               _session_id: Buffer.from(sessionId).toString("base64"), // encode
               // _unique_secret_id: user.uid,
            },
            process.env.REFRESH_TOKEN_SECRET,
            {
               expiresIn: 1000 * 60 * 100,
            }
         );

         await Session.create({
            session_id: sessionId,
            uid: newUser.uid,
         });

         const accessToken = jwt.sign(
            {
               uid: newUser.uid,
               nickname: newUser.nickname,
               role: newUser.role,
               email: newUser.email,
               date: newUser.createdAt,
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
               expiresIn: 1000 * 60,
            }
         );

         res.cookie("__secure_refresh_token", refreshToken, {
            maxAge: 1000 * 60 * 100,
            httpOnly: true,
            secure: true,
         });

         res.cookie("__main_access_token", accessToken, {
            maxAge: 1000 * 60 * 5,
            httpOnly: true,
            secure: true,
         });

         return res.json({
            accessToken: accessToken,
         });
      }

      await Session.create({
         session_id: sessionId,
         uid: user.uid,
      });

      const refreshToken = jwt.sign(
         {
            _session_id: Buffer.from(sessionId).toString("base64"), // encode
            // _unique_secret_id: user.uid,
         },
         process.env.REFRESH_TOKEN_SECRET,
         {
            expiresIn: 1000 * 60 * 100,
         }
      );

      const accessToken = jwt.sign(
         {
            id: user.id,
            uid: user.uid,
            role: user.role,
         },
         process.env.ACCESS_TOKEN_SECRET,
         {
            expiresIn: 1000 * 60,
         }
      );

      res.cookie("__secure_refresh_token", refreshToken, {
         maxAge: 1000 * 60 * 100,
         httpOnly: true,
         secure: true,
         sameSite: "None",
      });

      res.cookie("__main_access_token", accessToken, {
         maxAge: 1000 * 60 * 5,
         httpOnly: true,
         secure: true,
         sameSite: "None",
      });

      return res.json({
         accessToken: accessToken,
      });
   } catch (error) {
      console.log(
         "Server error with status code 500. Try to login with another account or create an account instead. Login with google account no response. " +
            error
      );
   }
};
