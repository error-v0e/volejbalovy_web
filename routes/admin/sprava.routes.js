const express = require('express');
const router = express.Router();

const home_routes = require('./sprava/home.sprava.routes');
const media_routes = require('./sprava/media.sprava.routes');

router.use('/', home_routes);
router.use('/media', media_routes);

module.exports = router; 