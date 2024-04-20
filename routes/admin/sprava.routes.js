const express = require('express');
const router = express.Router();

const home_routes = require('./sprava/home_sprava.routes');
const media_routes = require('./sprava/media_sprava.routes');

router.use('/', home_routes);
router.use('/media', media_routes);

module.exports = router; 