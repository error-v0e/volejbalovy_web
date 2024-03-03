const express = require("express"); 
const router = express.Router(); 
  
router.get("/sprava", (req, res) => { 
    if (req.session.name) { 
        var name = req.session.name; 
        res.render("admin_views/sprava", { name: name }); 
    } 
    return res.redirect("login");
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