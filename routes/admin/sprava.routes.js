const express = require('express');
const router = express.Router();

const home_routes = require('./sprava/home.sprava.routes');
const media_routes = require('./sprava/media.sprava.routes');
const tymy_routes = require('./sprava/tymy.sprava.routes');

router.use('/', home_routes);
router.use('/media', media_routes);
router.use('/tymy', tymy_routes);

module.exports = router; 