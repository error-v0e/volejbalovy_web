const express = require("express"); 
const router = express.Router(); 
const { Klub, Kategorie, Sponzor } = require('./item');
  
router.get("/sprava", async (req, res) => { 
    if (req.session.name) { 
        var name = req.session.name; 
        try {
            const kluby = await Klub.findOne();
            const kategorie = await Kategorie.findAll({
              attributes: ['id_kategorie','nazev', 'href'],
              order: [['poradi', 'ASC']]
            });
            const sponzori = await Sponzor.findAll();
            res.render('admin_views/sprava', {res, kluby, kategorie, sponzori});
        } catch (error) {
            console.error(error);
            res.status(500).send('Chyba serveru');
        }
    } else {
        return res.redirect("login");
    }
}); 
router.get("/login", (req, res) => { 
    if (req.session.name) { 
        res.redirect("sprava"); 
    } 
    return res.render("admin_views/login", { error: null }); 
}); 
router.get("/register", (req, res) => { 
    if (req.session.name) { 
        return res.render("admin_views/register", { error: null }); 
    } 
    return res.redirect("login");
}); 
module.exports = router; 