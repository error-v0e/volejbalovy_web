const express = require('express');
const router = express.Router();
const { Klub, Kategorie, Sponzor, Tym, Prispevek, Sit, Tag, Img } = require('../../item');
const id_kategorie = 4;

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
      order: [['cas_pridani', 'DESC']],
      include: [{
        model: Img,
        as: 'imgs',
        required: false,
        attributes: ['id_img', 'img'],
      }]
    });
    const site = await Sit.findAll();
    res.render('public_views/media', { kluby, kategorie, sponzori, tags, prispevky, site, id_kategorie });
  } catch (error) {
    console.error(error);
    res.status(500).send('Chyba serveru'); 
  }
});

module.exports = router;