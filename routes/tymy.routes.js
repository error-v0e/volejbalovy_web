const express = require('express');
const router = express.Router();
const { Klub, Kategorie, Sponzor, Tag, Prispevek, Sit, Tym } = require('../item');
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
      const tymy = await Tym.findOne({
        where: {
          id_tag: tagTymu.id_tag
        }
      });
      const sponzori = await Sponzor.findAll();
      const prispevky = await Prispevek.findAll({
        limit: 2,
        order: [['cas_pridani', 'DESC']]
      });
      const site = await Sit.findAll();
      res.render('public_views/tym', {res, kluby, kategorie, tagTymu, sponzori, tymy, tag, prispevky, site, id_kategorie});
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