const express = require("express");
const router = express.Router();
const User = require("./models");
const passport = require("passport");
const bcrypt = require("bcrypt");
const { Klub, Sponzor, Prispevek, Tag, Tags, Img } = require('./item');
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

const prispevekStorage = multer.diskStorage({
  destination: './public/img/prispevky/', // Specify the directory where the files will be saved
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Generate a unique file name
  }
});

const uploadPrispevek = multer({ storage: prispevekStorage });

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

router.post("/add_prispevek", uploadPrispevek.fields([{ name: 'foto', maxCount: 1 }]), async (req, res) => {
  const { nadpis, popisek, tag } = req.body;
  const foto = req.files['foto'] ? req.files['foto'][0].originalname : null; // Get the filename of the uploaded file

  if (nadpis && popisek && foto) {
    // Create new Prispevek
    const prispevek = await Prispevek.create({
      nadpis,
      popisek,
      // Add other Prispevek fields if necessary
    });

    if(tag){
      // Get all tags from the database
      const allTags = await Tag.findAll({
        where: {
          id_tag: tag // Assuming `tag` is an array of tag IDs
        }
      });
      for (let t of allTags) {
        const newTag = await Tags.create({
          id_prispevek: prispevek.id_prispevek,
          id_tag: t.id_tag
        });
      }
    }

    // If a photo was uploaded, save its filename to the database
    if (foto) {
      // Create a new Img
      const img = await Img.create({
        img: foto, // This will now be the filename
        id_prispevek: prispevek.id_prispevek // Add this line
      });
    }
  }

  return res.redirect("/sprava/media");
});

router.post("/edit_prispevek", uploadPrispevek.fields([{ name: 'foto_to_edit', maxCount: 1 }]), async (req, res) => {

  // zkontolovat (tagy zmena hlavne), tagy vybarvit 


  const { id_prispevek_to_edit, nadpis_to_edit, popisek_to_edit, tag_to_edit } = req.body;
  const foto_to_edit = req.files['foto_to_edit'] ? req.files['foto_to_edit'][0].originalname : null; // Get the filename of the uploaded file
  console.log(id_prispevek_to_edit);
  if (id_prispevek_to_edit) {
    // Find the Prispevek
    const prispevek = await Prispevek.findByPk(id_prispevek_to_edit);

    if (!prispevek) {
      return res.status(404).send({ message: "Prispevek not found" });
    }

    // Update Prispevek
    prispevek.nadpis = nadpis_to_edit;
    prispevek.popisek = popisek_to_edit;
    // Update other Prispevek fields if necessary
    await prispevek.save();
    await prispevek.setTags([]);

    if(tag_to_edit){
      // Get all tags from the database
      const allTags = await Tag.findAll({
        where: {
          id_tag: tag_to_edit // Assuming `tag` is an array of tag IDs
        }
      });
      for (let t of allTags) {
        const newTag = await Tags.create({
          id_prispevek: prispevek.id_prispevek,
          id_tag: t.id_tag
        });
      }
    }

    // If a photo was uploaded, update its filename in the database
    if (foto_to_edit) {
      // Find the Img
      const img = await Img.findOne({
        where: {
          id_prispevek: prispevek.id_prispevek
        }
      });
      fs.unlink(path.join(__dirname, './public/img/prispevky/', img.img), err => {
        if (err) {
          console.error(err);
          return;
        }
      });

      if (img) {
        // Update the Img
        img.img = foto_to_edit; // This will now be the filename
        await img.save();
      } else {
        // If no Img was found, create a new one
        const newImg = await Img.create({
          img: foto_to_edit, // This will now be the filename
          id_prispevek: prispevek.id_prispevek // Add this line
        });
      }
    }
  }

  return res.redirect("/sprava/media");
});

router.post('/del_prispevek', async (req, res) => {
  const { id_prispevek_to_del } = req.body;

  // Fetch the post from the database
  const prispevek = await Prispevek.findByPk(id_prispevek_to_del, {
    include: [
      {
        model: Img,
        as: 'imgs',
      }
    ]
  });

  // If the post does not exist, return an error
  if (!prispevek) {
    return res.status(404).send('Prispevek not found');
  }

  // Remove all images associated with the post
  for (let img of prispevek.imgs) {
    // Remove the image from the local storage
    fs.unlink(path.join(__dirname, './public/img/prispevky/', img.img), err => {
      if (err) {
        console.error(err);
        return;
      }
    });
    await img.destroy();
  }
  await prispevek.setTags([]);

  // Remove the post itself
  await prispevek.destroy();

  return res.redirect("/sprava/media");
});

module.exports = router;