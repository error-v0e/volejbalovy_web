const express = require('express');
const router = express.Router();
const { Klub, Kategorie, Sponzor, Tym, Prispevek, Sit, Tag } = require('../item');
const id_kategorie = 2;


router.get('/:tym', async function(req, res) {
  var tym = req.params.tym;
  var tag = await Tag.findAll();
  var tagTymu = tag.find(t => t.nazev == tym );

  if (tagTymu) {
    try {
      const kluby = await Klub.findOne();
      const kategorie = await Kategorie.findAll({
        attributes: ['id_kategorie','nazev', 'href'],
        order: [['poradi', 'ASC']]
      });
      const sponzori = await Sponzor.findAll();
      const tymy = await Tym.findAll();
      const prispevky = await Prispevek.findAll({
        limit: 2,
        order: [['cas_pridani', 'DESC']]
      });
      const site = await Sit.findAll();
      res.render('public_views/index', {res, kluby, kategorie, sponzori, tymy, prispevky, site, id_kategorie});
    } catch (error) {
      console.error(error);
      res.status(500).send('Chyba serveru');
    }
  } else {
    // vrátí chybu 404, pokud tag neexistuje
    res.status(404).send('Not found');
  }
});



module.exports = router;