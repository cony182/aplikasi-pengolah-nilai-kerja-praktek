const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const User = require("../../models/user-model");
const argon2 = require("argon2");

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
               where: { googleId: profile.id, email: profile.email },
            });

            console.log(created);
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
            console.log("from auth google = " + error);
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
