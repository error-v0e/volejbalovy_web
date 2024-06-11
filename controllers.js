const express = require("express");
const router = express.Router();
const User = require("./models");
const passport = require("passport");
const bcrypt = require("bcrypt");
const { Klub, Sponzor, Prispevek, Tag, Tags, Img, Tym, Akce, AkceTag, Universal, Kategorie } = require('./item');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { Op } = require('sequelize');
const crypto = require('crypto');

function generateUniqueName(originalName) {
  const uniqueName = crypto.randomBytes(16).toString('hex');

  const ext = path.extname(originalName);

  return `${uniqueName}${ext}`;
}

const storage = multer.diskStorage({
  destination: './public/img/', 
  filename: (req, file, cb) => {
    cb(null, generateUniqueName(file.originalname)); 
  }
});

const upload = multer({ storage });

const sponzorStorage = multer.diskStorage({
  destination: './public/img/sponzor/', 
  filename: (req, file, cb) => {
    cb(null, generateUniqueName(file.originalname)); 
  }
});

const uploadSponzor = multer({ storage: sponzorStorage });

const prispevekStorage = multer.diskStorage({
  destination: './public/img/prispevky/', 
  filename: (req, file, cb) => {
    cb(null, generateUniqueName(file.originalname)); 
  }
});

const uploadPrispevek = multer({ storage: prispevekStorage });

const tymStorage = multer.diskStorage({
  destination: './public/img/tymy/', 
  filename: (req, file, cb) => {
    cb(null, generateUniqueName(file.originalname)); 
  }
});

const uploadTym = multer({ storage: tymStorage });

function normalizeString(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '_');
}

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
    const existingUser = await User.findOne({ where: { username } });

    if (existingUser) {
      return res
        .status(409)
        .render("admin_views/register", { error: "Jméno již existuje", kluby  });
    }

    const salt = await bcrypt.genSalt(15);
    const hashedPassword = await bcrypt.hash(password, salt);

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

router.post("/login", async (req, res, next) => {
  const kluby = await Klub.findOne();
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.render("admin_views/login", { error: "prihlasit se nepovedlo", kluby });
    }
    req.logIn(user, { session: false }, (err) => {
      if (err) {
        return next(err);
      }
      req.session.name = req.body.username;
      req.session.save();

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
  const logo = req.files['logo'] ? req.files['logo'][0] : null; 
  const icon = req.files['icon'] ? req.files['icon'][0] : null; 
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
        await Klub.update({ logo: logo.filename }, { where: { id_klub: kluby.id_klub } });
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
        await Klub.update({ icona: icon.filename }, { where: { id_klub: kluby.id_klub } });
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
        await Sponzor.update({ logo: logo.filename }, { where: { id_sponzor: id } });
      } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
      }
    }
  return res.redirect("/sprava");
});

router.post("/sponzori_new_popup", uploadSponzor.fields([{ name: 'logo', maxCount: 1 }]), async (req, res) => {
  const { odkaz } = req.body;
  const logo = req.files['logo'] ? req.files['logo'][0] : null; 

  if (odkaz || logo ) {
    try {
      const newSponzor = await Sponzor.create({ 
        odkaz: odkaz, 
        logo: logo ? logo.filename : null 
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: err.message });
    }
  }
  return res.redirect("/sprava");
});
router.post('/del_sponzor', async (req, res) => {
  const { id_sponzor_to_del } = req.body;

  const sponzor = await Sponzor.findByPk(id_sponzor_to_del);

  if (!sponzor) {
    return res.status(404).send('Sponzor not found');
  }
  fs.unlink(path.join(__dirname, './public/img/sponzor/', sponzor.logo), err => {
    if (err) {
      console.error(err);
      return;
    }
  });

  await sponzor.destroy();

  return res.redirect("/sprava");
});

router.post("/add_prispevek", uploadPrispevek.fields([{ name: 'foto', maxCount: 1 }]), async (req, res) => {
  const { nadpis, popisek, tag } = req.body;
  const foto = req.files['foto'] ? req.files['foto'][0].filename : null; // Get the filename of the uploaded file

  if (nadpis && popisek && foto) {
    const prispevek = await Prispevek.create({
      nadpis,
      popisek,
    });

    if(tag){
      const allTags = await Tag.findAll({
        where: {
          id_tag: tag 
        }
      });
      for (let t of allTags) {
        const newTag = await Tags.create({
          id_prispevek: prispevek.id_prispevek,
          id_tag: t.id_tag
        });
      }
    }

    if (foto) {
      // Create a new Img
      const img = await Img.create({
        img: foto,
        id_prispevek: prispevek.id_prispevek 
      });
    }
  }

  return res.redirect("/sprava/media");
});

router.post("/edit_prispevek", uploadPrispevek.fields([{ name: 'foto_to_edit', maxCount: 1 }]), async (req, res) => {
  const { id_prispevek_to_edit, nadpis_to_edit, popisek_to_edit, tag_to_edit } = req.body;
  const foto_to_edit = req.files['foto_to_edit'] ? req.files['foto_to_edit'][0].filename : null; 
  console.log(id_prispevek_to_edit);
  if (id_prispevek_to_edit) {
    const prispevek = await Prispevek.findByPk(id_prispevek_to_edit);

    if (!prispevek) {
      return res.status(404).send({ message: "Prispevek not found" });
    }

    prispevek.nadpis = nadpis_to_edit;
    prispevek.popisek = popisek_to_edit;
    await prispevek.save();
    await prispevek.setTags([]);

    if(tag_to_edit){
      const allTags = await Tag.findAll({
        where: {
          id_tag: tag_to_edit 
        }
      });
      for (let t of allTags) {
        const newTag = await Tags.create({
          id_prispevek: prispevek.id_prispevek,
          id_tag: t.id_tag
        });
      }
    }

    if (foto_to_edit) {
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
        img.img = foto_to_edit; 
        await img.save();
      } else {
        const newImg = await Img.create({
          img: foto_to_edit, 
          id_prispevek: prispevek.id_prispevek
        });
      }
    }
  }

  return res.redirect("/sprava/media");
});

router.post('/del_prispevek', async (req, res) => {
  const { id_prispevek_to_del } = req.body;

  const prispevek = await Prispevek.findByPk(id_prispevek_to_del, {
    include: [
      {
        model: Img,
        as: 'imgs',
      }
    ]
  });

  if (!prispevek) {
    return res.status(404).send('Prispevek not found');
  }

  for (let img of prispevek.imgs) {
    fs.unlink(path.join(__dirname, './public/img/prispevky/', img.img), err => {
      if (err) {
        console.error(err);
        return;
      }
    });
    await img.destroy();
  }
  await prispevek.setTags([]);

  await prispevek.destroy();

  return res.redirect("/sprava/media");
});

router.post("/add_tym", uploadTym.fields([{ name: 'foto', maxCount: 1 }]), async (req, res) => {
  const { nazev, popisek } = req.body;
  const foto = req.files['foto'] ? req.files['foto'][0].filename : null; 

  if (nazev && foto) {
    const tym = await Tym.create({
      photo: foto,
      popisek,
      id_klub: 1,
    });

    const tag = await Tag.create({
      nazev: nazev, 
    });

    await tym.setTag(tag);
  }

  return res.redirect("/sprava/tymy");
});
router.post("/edit_tym", uploadTym.fields([{ name: 'foto', maxCount: 1 }]), async (req, res) => {
  const { id_tym_to_edit, nazev, popisek } = req.body;
  const foto = req.files['foto'] ? req.files['foto'][0].filename : null;

  if (id_tym_to_edit) {
    const tym = await Tym.findByPk(id_tym_to_edit);

    if (!tym) {
      return res.status(404).send({ message: "Tym not found" });
    }

    const tag = await Tag.findByPk(tym.id_tag);
    if (tag) {
      tag.nazev = nazev;
      await tag.save();
    }

    tym.popisek = popisek;
    await tym.save();

    if (foto) {
      fs.unlink(path.join(__dirname, './public/img/tymy/', tym.photo), err => {
        if (err) {
          console.error(err);
          return;
        }
      });

      tym.photo = foto;
      await tym.save();
    }
  }

  return res.redirect("/sprava/tymy");
});
router.post('/del_tym', async (req, res) => {
  const { id_tym_to_del } = req.body;
  console.log(1)

  const tym = await Tym.findByPk(id_tym_to_del, {
  });
  console.log(2)

  if (!tym) {
    return res.status(404).send('Tym not found');
  }
  console.log(3)

  const tag = await Tag.findByPk(tym.id_tag);

if (tag) {
  const tags = await Tags.findOne({ where: { id_tag: tag.id_tag } });
  if (tags) {
    await tags.destroy();
  }

  await tym.setTag(null);

  await tag.destroy();
}

fs.unlink(path.join(__dirname, './public/img/tymy/', tym.photo), err => {
  if (err) {
    console.error(err);
    return;
  }
});

await tym.destroy();

return res.redirect("/sprava/tymy");
});

router.post("/add_akce", async (req, res) => {
  const { nadpis, tag, start, end } = req.body;
  if (nadpis && start && end) {
    const newAkce = await Akce.create({
      nazev: nadpis,
      start: start,
      konec: end
    });

    if (tag) {
      for (let i = 0; i < tag.length; i++) {
        const newAkceTag = await AkceTag.create({
          id_akce: newAkce.id_akce,
          id_tag: tag[i]
        });
      }
    }
  }

  return res.redirect("/sprava/");
});
router.post("/edit_akce", async (req, res) => {
  const { id_akce_to_edit, nadpis, start, end, tag } = req.body;

  if (id_akce_to_edit) {
    const akce = await Akce.findByPk(id_akce_to_edit);

    if (!akce) {
      return res.status(404).send({ message: "Akce not found" });
    }

    akce.nazev = nadpis;
    akce.start = new Date(start);
    akce.konec = new Date(end);
    await akce.save();

    await AkceTag.destroy({ where: { id_akce: id_akce_to_edit } });
    if (tag) {
      for (let i = 0; i < tag.length; i++) {
        const newAkceTag = await AkceTag.create({
          id_akce: akce.id_akce,
          id_tag: tag[i]
        });
      }
    }
  }

  return res.redirect("/sprava/");
});
router.post('/del_akce', async (req, res) => {
  const akceId = req.body.id_akce_to_del;

  await AkceTag.destroy({ where: { id_akce: akceId } });

  await Akce.destroy({ where: { id_akce: akceId } });

  res.redirect('/sprava/');
});

router.post("/add_kategorii", async (req, res) => {
  const { nazev, obsah } = req.body;

  if (nazev && obsah) {
    const maxPoradi = await Kategorie.max('poradi');

    const kategorie = await Kategorie.create({
      nazev: nazev,
      href: normalizeString(nazev), 
      poradi: maxPoradi ? maxPoradi + 1 : 1, 
      universal_ano: 1, 
      active: true,
      id_klub: 1,
    });
    
    const universal = await Universal.create({
      id_kategorie: kategorie.id_kategorie,
      obsah: obsah, 
    });
  }

  return res.redirect("/sprava/kategorie");
});
router.post("/edit_kategorii", async (req, res) => {
  const { id_kategorie_to_edit, nazev, obsah } = req.body;

  const kategorie = await Kategorie.findByPk(id_kategorie_to_edit);
  if (kategorie) {
    kategorie.nazev = nazev;

    if (obsah) {
      const universal = await Universal.findOne({ where: { id_kategorie: id_kategorie_to_edit } });
      if (universal) {
        kategorie.href = normalizeString(nazev);
        universal.obsah = obsah;
        await universal.save();
      }
    }
    await kategorie.save();
  }

  return res.redirect("/sprava/kategorie");
});
router.post("/del_kategorie", async (req, res) => {
  const { id_kategorie_to_del } = req.body;

  const kategorie = await Kategorie.findByPk(id_kategorie_to_del);
  if (kategorie) {
    const universals = await Universal.findAll({ where: { id_kategorie: id_kategorie_to_del } });
    for (let universal of universals) {
      await universal.destroy();
    }

    const higherOrderCategories = await Kategorie.findAll({ where: { poradi: { [Op.gt]: kategorie.poradi } } });

    for (let higherOrderCategory of higherOrderCategories) {
      higherOrderCategory.poradi -= 1;
      await higherOrderCategory.save();
    }

    await kategorie.destroy();
  }

  return res.redirect("/sprava/kategorie");
});
router.post("/up", async (req, res) => {
  const { id_kategorie } = req.body;

  const kategorie = await Kategorie.findByPk(id_kategorie);
  if (kategorie && kategorie.poradi > 0) {
    const lowerPoradi = kategorie.poradi - 1;

    const lowerKategorie = await Kategorie.findOne({ where: { poradi: lowerPoradi } });
    if (lowerKategorie) {
      lowerKategorie.poradi += 1;
      await lowerKategorie.save();

      kategorie.poradi -= 1;
      await kategorie.save();
    }
  }

  return res.redirect("/sprava/kategorie");
});
router.post("/down", async (req, res) => {
  const { id_kategorie } = req.body;

  const maxPoradi = await Kategorie.max('poradi');

  const kategorie = await Kategorie.findByPk(id_kategorie);
  if (kategorie && kategorie.poradi < maxPoradi) {
    const higherPoradi = kategorie.poradi + 1;

    const higherKategorie = await Kategorie.findOne({ where: { poradi: higherPoradi } });
    if (higherKategorie) {
      higherKategorie.poradi -= 1;
      await higherKategorie.save();

      kategorie.poradi += 1;
      await kategorie.save();
    }
  }

  return res.redirect("/sprava/kategorie");
});


module.exports = router;