const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { Klub, Kategorie, Universal } = require('../../../item');

router.get('/', async function(req, res) {
  if (req.session.name) { 
    var name = req.session.name; 
    try {
      const kluby = await Klub.findOne();
      const kategorie = await Kategorie.findAll({
        attributes: ['id_kategorie','nazev', 'href', 'universal_ano', 'active'],
        include: {
          model: Universal,
          attributes: ['obsah'],
          required: false
        },
        order: [['poradi', 'ASC']]
      });
      res.render('admin_views/kategorie_sprava', {res, kluby, kategorie});
    } catch (error) {
      console.error(error);
      res.status(500).send('Chyba serveru');
    }
  } else {
    return res.redirect("/login");
  }
});
module.exports = router; 