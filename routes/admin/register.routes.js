const express = require("express"); 
const router = express.Router(); 
const { Klub } = require('../../item');
  
router.get("/", async (req, res) => { 
    if (req.session.name) { 
        const kluby = await Klub.findOne();
        return res.render("admin_views/register", { error: null, kluby }); 
    } 
    return res.redirect("login");
}); 
module.exports = router; 