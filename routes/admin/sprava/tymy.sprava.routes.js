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
      const tymy = await Tym.findAll({
        include: Tag
      });
      res.render('admin_views/tymy_sprava', {res, kluby, tymy });
    } catch (error) {
      console.error(error);
      res.status(500).send('Chyba serveru');
    }
  } else {
    return res.redirect("/login");
  }
});
module.exports = router; 