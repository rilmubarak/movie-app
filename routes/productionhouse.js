const router                    = require('express').Router();
const productionController      = require('../controllers/productionController');

router.get('/', productionController.home);

module.exports = router;
