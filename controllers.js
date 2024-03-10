const express = require("express");
const router = express.Router();
const User = require("./models");
const passport = require("passport");
const bcrypt = require("bcrypt");
const { Klub, Kategorie, Sponzor } = require('./item');
const fs = require('fs');
const path = require('path');

// User registration route
router.post("/register", async (req, res) => {
  const { username, email, password, confirmpassword } = req.body;

  if (!username || !email || !password || !confirmpassword) {
    return res
      .status(403)
      .render("admin_views/register", { error: "Nejsou vyplněna všechna pole" });
  }

  if (confirmpassword !== password) {
    return res
      .status(403)
      .render("admin_views/register", { error: "Hesla se musi schodovat" });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ where: { username } });

    if (existingUser) {
      return res
        .status(409)
        .render("admin_views/register", { error: "Jméno již existuje" });
    }

    // Hash the password before saving it to the database
    const salt = await bcrypt.genSalt(15);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save the new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return res.redirect("/sprava");
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// User login route
router.post("/login", (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      // Autentizace selhala, přesměrujeme na stránku s přihlášením
      return res.render("admin_views/login", { error: "prihlasit se nepovedlo" });
    }
    req.logIn(user, { session: false }, (err) => {
      if (err) {
        return next(err);
      }
      // Uložíme uživatelské jméno do session
      req.session.name = req.body.username;
      req.session.save();

      // Přesměrujeme na stránku "/sprava"
      return res.redirect("/sprava");
    });
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/sprava");
});

router.post("/sprava_klubu", async (req, res) => {
  const { cname, icon, logo } = req.body;
  const kluby = await Klub.findOne();
  const pathL = './public/img/' + kluby.logo;
  const pathI = './public/img/' + kluby.icona;

  if (cname || icon || logo ) {
    if(cname != kluby.jmeno){
      try {
        await Klub.update({ jmeno: cname }, { where: { id_klub: kluby.id_klub } });
      } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
      }
    }
    if (logo) {
      if (kluby.logo) {
        try {
          fs.unlinkSync(path.join(__dirname, pathL));
        } catch (err) {
          console.error(err);
          return res.status(500).json({ message: err.message });
        }
      }
      try {
        await Klub.update({ logo: logo }, { where: { id_klub: kluby.id_klub } });
      } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
      }
    }
  }
  return res.redirect("/sprava");
});


module.exports = router;