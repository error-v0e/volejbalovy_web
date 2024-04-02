const express = require("express");
const router = express.Router();
const User = require("./models");
const passport = require("passport");
const bcrypt = require("bcrypt");
const { Klub, Kategorie, Sponzor } = require('./item');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: './public/img/', // Specify the directory where the files will be saved
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Generate a unique file name
  }
});

const upload = multer({ storage });

const sponzorStorage = multer.diskStorage({
  destination: './public/img/sponzor/', // Specify the directory where the files will be saved
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Generate a unique file name
  }
});

const uploadSponzor = multer({ storage: sponzorStorage });


// User registration route
router.post("/register", async (req, res) => {
  const { username, email, password, confirmpassword } = req.body;
  const kluby = await Klub.findOne();

  if (!username || !email || !password || !confirmpassword) {
    return res
      .status(403)
      .render("admin_views/register", { error: "Nejsou vyplněna všechna pole", kluby  });
  }

  if (confirmpassword !== password) {
    return res
      .status(403)
      .render("admin_views/register", { error: "Hesla se musi schodovat", kluby  });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ where: { username } });

    if (existingUser) {
      return res
        .status(409)
        .render("admin_views/register", { error: "Jméno již existuje", kluby  });
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
router.post("/login", async (req, res, next) => {
  const kluby = await Klub.findOne();
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      // Autentizace selhala, přesměrujeme na stránku s přihlášením
      return res.render("admin_views/login", { error: "prihlasit se nepovedlo", kluby });
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

router.post("/sprava_klubu", upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'icon', maxCount: 1 }]), async (req, res) => {
  const { cname } = req.body;
  const logo = req.files['logo'] ? req.files['logo'][0] : null; // Získání nahrávaného souboru
  const icon = req.files['icon'] ? req.files['icon'][0] : null; // Získání nahrávaného souboru
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
      console.log(logo);
      if (kluby.logo) {
        try {
          fs.unlinkSync(path.join(__dirname, pathL));
        } catch (err) {
          console.error(err);
          return res.status(500).json({ message: err.message });
        }
      }
      try {
        await Klub.update({ logo: logo.originalname }, { where: { id_klub: kluby.id_klub } });
      } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
      }
    }
    if (icon) {
      if (kluby.icona) {
        try {
          fs.unlinkSync(path.join(__dirname, pathI));
        } catch (err) {
          console.error(err);
          return res.status(500).json({ message: err.message });
        }
      }
      try {
        // Uložení cesty k souboru do databáze místo obsahu souboru
        await Klub.update({ icona: icon.originalname }, { where: { id_klub: kluby.id_klub } });
      } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
      }
    }
  }
  return res.redirect("/sprava");
});

router.post("/sponzori_popup", uploadSponzor.fields([{ name: 'logo', maxCount: 1 }]), async (req, res) => {
  const { odkaz, id } = req.body;
  const logo = req.files['logo'] ? req.files['logo'][0] : null; 
  const sponzor = await Sponzor.findOne({
    where: { id_sponzor: id }
  });
  const pathL = './public/img/sponzor/' + sponzor.logo;

  if (odkaz || logo ) {
    if(odkaz != sponzor.odkaz){
      try {
        await Sponzor.update({ odkaz: odkaz }, { where: { id_sponzor: id } });
      } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
      }
    }
    if (logo) {
      if (sponzor.logo) {
        try {
          fs.unlinkSync(path.join(__dirname, pathL));
        } catch (err) {
          console.error(err);
          return res.status(500).json({ message: err.message });
        }
      }
      try {
        await Sponzor.update({ logo: logo.originalname }, { where: { id_sponzor: id } });
      } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
      }
    }
  }
  return res.redirect("/sprava");
});

module.exports = router;