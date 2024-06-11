const express = require('express');
const router = express.Router();
const { Klub, Kategorie, Sponzor, Tag, Prispevek, Sit, Tym, Img, Akce } = require('../../item');
const { Op } = require('sequelize');
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
        where: { id_tag: tagTymu.id_tag }
      });
      const tags = await Tym.findAll({
        include: [{
          association: "tag",
          attributes: ['nazev']
        }]
      });
      const sponzori = await Sponzor.findAll();
      const { Op } = require('sequelize'); 

const prispevky = await Prispevek.findAll({
  limit: 2,
  order: [['cas_pridani', 'DESC']],
  include: [{
    model: Img,
    as: 'imgs',
    required: false,
    attributes: ['id_img', 'img'],
  }, {
    model: Tag,
    through: 'Tags',
    as: 'tags',
    where: { 
      [Op.or]: [
        { id_tag: tagTymu.id_tag },
        { id_tag: 1 }
      ]
    },
    required: true
  }]
});

const akce = await Akce.findAll({
  include: [{
    model: Tag,
    through: 'AkceTag',
    as: 'tags',
    where: { 
      [Op.or]: [
        { id_tag: tagTymu.id_tag },
        { id_tag: 1 }
      ]
    },
    required: true,
    attributes: ['id_tag'],
  }],
  where: {
    konec: {
      [Op.gte]: new Date()
    }
  },
  order: [
    ['start', 'ASC']
  ]
});
      const site = await Sit.findAll();
      res.render('public_views/tym', {res, kluby, kategorie, tagTymu, sponzori, tymy, tags, prispevky, site, id_kategorie, akce});
    } catch (error) {
      console.error(error);
      res.status(500).send('Chyba serveru');
    }
  } else {
    res.status(404).send('Not found');
  }
});



module.exports = router;