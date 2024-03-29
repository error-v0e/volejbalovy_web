const express = require('express');
const router = express.Router();
const { Klub, Kategorie, Sponzor, Prispevek, Sit, Tym } = require('../item');
const id_kategorie = 1;

router.get('/', async (req, res) => {
  try {
    const kluby = await Klub.findOne();
    const kategorie = await Kategorie.findAll({
      attributes: ['id_kategorie','nazev', 'href'],
      order: [['poradi', 'ASC']]
    });
    const sponzori = await Sponzor.findAll();
    const tags = await Tym.findAll({
      include: [{
        association: "tag",
        attributes: ['nazev']
      }]
    });
    const prispevky = await Prispevek.findAll({
      limit: 2,
      order: [['cas_pridani', 'DESC']]
    });
    const site = await Sit.findAll();
    res.render('public_views/index', {res, kluby, kategorie, sponzori, tags, prispevky, site, id_kategorie});
  } catch (error) {
    console.error(error);
    res.status(500).send('Chyba serveru');
  }
});

module.exports = router;