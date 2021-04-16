const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const { User } = require("../models/User");
const key = require("./key");
// const FacebookStrategy = require("passport-facebook").Strategy;
passport.serializeUser((user, done) => {
  console.log("aaaa");
  console.log(user);
  return done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: key.google.clientID,
      clientSecret: key.google.clientSecret,
      callbackURL: "/auth/google/redirect",
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ email: profile.emails[0].value }, async (err, doc) => {
        if (err) {
          return done(err, null);
        }
        if (!doc) {
          const newUser = new User({
            email: profile.emails[0].value,
            password: profile.id,
          });
          await newUser.save();
          done(null, newUser);
        }
        done(null, doc);
      });
      console.log("access");
      console.log(accessToken);
      console.log("prooooooo");
      console.log(profile);

      console.log("cbbbb");
      console.log(done);
      // done(null, profile);
    }
  )
);

// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: key.facebook.clientID,
//       clientSecret: key.facebook.clientSecret,
//       callbackURL: "/auth/facebook/redirect",
//     },
//     (accessToken, refreshToken, profile, done) => {
//       // User.findOne({ email: profile.emails[0].value }, async (err, doc) => {
//       //   if (err) {
//       //     return done(err, null);
//       //   }
//       //   if (!doc) {
//       //     const newUser = new User({
//       //       email: profile.emails[0].value,
//       //       password: profile.id,
//       //     });
//       //     await newUser.save();
//       //     done(null, newUser);
//       //   }
//       //   done(null, doc);
//       // });
//       console.log("access");
//       console.log(accessToken);
//       console.log("prooooooo");
//       console.log(profile);

//       return done(null, profile);
//     }
//   )
// );

// passportController.userExists = async (email, done) => {
//   let query = {
//     text: "SELECT * FROM users WHERE email = $1",
//     values: [email],
//   };

//   try {
//     const { rows } = await pool.query(query);
//     if (rows.length) return done(null, rows[0]);
//   } catch (error) {
//     console.error(error);
//     return done(null, {});
//   }
// };

// passportController.verify = (req, res, next) => {
//   if (req.user) {
//     const { username, email, photo, id } = req.user;
//     res.locals.payload = {
//       id,
//       username,
//       email,
//       photo,
//     };
//     return next();
//   } else res.send();
// };

// module.exports = passportController;
