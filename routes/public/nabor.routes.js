const express = require('express');
const router = express.Router();
const { Klub, Kategorie, Sponzor, Tym, Prispevek, Sit, Universal} = require('../../item');
const id_kategorie = 5;

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
    const universal = await Universal.findOne({
      where: {
        id_kategorie: id_kategorie
      }
    });
    const site = await Sit.findAll();
    res.render('public_views/universal', { kluby, kategorie, sponzori, tags, prispevky, site, universal, id_kategorie });
  } catch (error) {
    console.error(error);
    res.status(500).send('Chyba serveru');
  }
});

module.exports = router;