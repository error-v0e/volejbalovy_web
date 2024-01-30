const express = require('express');
const router = express.Router();
const { Klub, Kategorie, Sponzor, Tym, Prispevek, Sit } = require('../item');

router.get('/', async (req, res) => {
  try {
    const kluby = await Klub.findAll();
    const kategorie = await Kategorie.findAll();
    const sponzori = await Sponzor.findAll();
    const tymy = await Tym.findAll();
    const prispevky = await Prispevek.findAll({
      limit: 2,
      order: [['createdAt', 'DESC']]
    });
    const site = await Sit.findAll();
    res.render('index', { kluby, kategorie, sponzori, tymy, prispevky, site });
  } catch (error) {
    console.error(error);
    res.status(500).send('Chyba serveru');
  }
});

module.exports = router;