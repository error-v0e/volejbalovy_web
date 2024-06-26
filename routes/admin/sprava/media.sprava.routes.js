const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { Klub, Prispevek, Tym, Tag, Img, Tags } = require('../../../item');

router.get('/', async function(req, res) {
  if (req.session.name) { 
    var name = req.session.name; 
    try {
      const kluby = await Klub.findOne();
      const tag = await Tag.findAll();
      const tags = await Tym.findAll({
        include: [{
          association: "tag",
          attributes: ['nazev']
        }]
      });
      const prispevky = await Prispevek.findAll({
        include: [{
          model: Img,
          as: 'imgs',
          required: false,
          attributes: ['id_img', 'img'],
        },
        {
          model: Tag,
          as: 'tags',
          required: false,
          attributes: ['id_tag'],
        }],
        order: [
          ['cas_pridani', 'DESC']
        ]
      });

      res.render('admin_views/media_sprava', {res, kluby, tag, tags, prispevky, name });
    } catch (error) {
      console.error(error);
      res.status(500).send('Chyba serveru');
    }
  } else {
    return res.redirect("/login");
  }
});
module.exports = router; 