const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models");
const bcrypt = require("bcrypt");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ where: { username } });

      if (!user) {
        return done(null, false, { error: "Incorrect username" });
      }

      const passwordsMatch = await bcrypt.compare(
        password,
        user.password
      );

      if (passwordsMatch) {
        return done(null, user);
      } else {
        return done(null, false, { error: "Incorrect password" });
      }
    } catch (err) {
        console.error(err);
        return done(err);
      }
  })
);