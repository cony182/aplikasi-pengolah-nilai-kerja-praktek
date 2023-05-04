const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const User = require("../models/user-model");
const argon2 = require("argon2");
const { Op } = require("sequelize");

passport.use(
   new GoogleStrategy(
      {
         clientID: process.env.GOOGLE_CLIENT_ID,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
         callbackURL: "http://localhost:5000/google/callback",
         passReqToCallback: true,
      },
      async function (request, accessToken, refreshToken, profile, done) {
         try {
            const [user, created] = await User.findOrCreate({
               where: {
                  [Op.or]: [{ googleId: profile.id }, { email: profile.email }],
               },
            });

            if (created) {
               const hash = await argon2.hash(
                  Math.random().toString(36).substring(2, 36)
               );

               await User.update(
                  {
                     password: hash,
                  },
                  {
                     where: {
                        googleId: profile.id,
                     },
                  }
               );
            }

            return done(null, user);
         } catch (error) {
            console.log(
               "Server error. Try to login with another account or create an account instead. " +
                  error
            );
         }
      }
   )
);

passport.serializeUser(function (user, done) {
   done(null, user);
});

passport.deserializeUser(function (user, done) {
   done(null, user);
});
