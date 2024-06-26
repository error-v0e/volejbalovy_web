const express = require('express');
const router = express.Router();
const { Klub, Kategorie, Sponzor, Tag, Akce } = require('../../../item');
const { Op } = require('sequelize');

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
            const akce = await Akce.findAll({
                include: [
              {
                model: Tag,
                as: 'tags',
                required: false,
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
            res.render('admin_views/home_sprava', {res, kluby, tag, kategorie, sponzori, akce, name});
        } catch (error) {
            console.error(error);
            res.status(500).send('Chyba serveru');
        }
    } else {
        return res.redirect("/login");
    }
});
module.exports = router; 