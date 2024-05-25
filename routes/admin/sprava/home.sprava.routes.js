const express = require('express');
const router = express.Router();
const { Klub, Kategorie, Sponzor, Tag} = require('../../../item');

router.get('/', async function(req, res) {
    if (req.session.name) { 
        var name = req.session.name; 
        try {
            const tag = await Tag.findAll();
            const kluby = await Klub.findOne();
            const kategorie = await Kategorie.findAll({
              attributes: ['id_kategorie','nazev', 'href'],
              order: [['poradi', 'ASC']]
            });
            const sponzori = await Sponzor.findAll();
            res.render('admin_views/home_sprava', {res, kluby, tag, kategorie, sponzori});
        } catch (error) {
            console.error(error);
            res.status(500).send('Chyba serveru');
        }
    } else {
        return res.redirect("login");
    }
});
module.exports = router; 