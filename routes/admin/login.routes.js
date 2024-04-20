const express = require("express"); 
const router = express.Router(); 
const { Klub } = require('../../item');
  
router.get("/", async (req, res) => { 
    if (req.session.name) { 
        res.redirect("sprava"); 
    } 
    const kluby = await Klub.findOne();
    return res.render("admin_views/login", { error: null, kluby }); 
}); 
module.exports = router; 