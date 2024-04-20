const express = require("express"); 
const router = express.Router(); 

const sprava_routes = require('./routes/admin/sprava.routes');
const login_routes = require('./routes/admin/login.routes');
const register_routes = require('./routes/admin/register.routes');
  
router.use('/sprava/', sprava_routes);
router.use("/login", login_routes); 
router.use("/register", register_routes); 

module.exports = router; 