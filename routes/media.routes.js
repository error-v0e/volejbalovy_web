const express = require('express');
const router = express.Router();
const { Klub, Kategorie, Sponzor, Tym, Prispevek, Sit } = require('../item');
const id_kategorie = 4;

router.get('/', async (req, res) => {
  try {
    const kluby = await Klub.findOne();
    const kategorie = await Kategorie.findAll({
      attributes: ['id_kategorie','nazev', 'href'],
      order: [['poradi', 'ASC']]
    });
    const sponzori = await Sponzor.findAll();
    const tymy = await Tym.findAll();
    const prispevky = await Prispevek.findAll({
      limit: 6,
      order: [['cas_pridani', 'DESC']]
    });
    const site = await Sit.findAll();
    res.render('public_views/media', { kluby, kategorie, sponzori, tymy, prispevky, site, id_kategorie });
  } catch (error) {
    console.error(error);
    res.status(500).send('Chyba serveru'); 
  }
});

module.exports = router;