const router                = require('express').Router();
const homeController        = require('../controllers/homeController');

const ProductionHouseRoute = require('./productionhouse')
const MovieRoute = require('./movie')
const CastRoute = require('./cast')

router.get('/', homeController.home)
router.use('/productionHouse', ProductionHouseRoute)
router.use('/movies', MovieRoute)
router.use('/casts', CastRoute)
router.get('/*', homeController.getError)

module.exports = router;