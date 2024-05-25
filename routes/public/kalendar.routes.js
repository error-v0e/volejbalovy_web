const express = require('express');
const router = express.Router();
const { Klub, Kategorie, Sponzor, Sit, Akce, Tym } = require('../../item');
const id_kategorie = 3;

router.get('/', async (req, res) => {
  try {
    const events = await Akce.findAll();
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
    const site = await Sit.findAll();
    res.render('public_views/kalendar', { events, kluby, kategorie, sponzori, tags, site, id_kategorie });
  } catch (error) {
    console.error(error);
    res.status(500).send('Chyba serveru');
  }
});

module.exports = router;