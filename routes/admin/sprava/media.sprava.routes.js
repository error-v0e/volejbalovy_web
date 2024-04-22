const express = require('express');
const router = express.Router();
const { Klub, Prispevek, Tym, Tag } = require('../../../item');

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
              limit: 6,
              order: [['cas_pridani', 'DESC']]
            });
            res.render('admin_views/media_sprava', {res, kluby, tag, tags, prispevky });
        } catch (error) {
            console.error(error);
            res.status(500).send('Chyba serveru');
        }
    } else {
        return res.redirect("/login");
    }
});
module.exports = router; 