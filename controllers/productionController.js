const { ProductionHouse } = require('../models/index');

class ProductionController {
    static home (req, res) {
        ProductionHouse.findAll({
            order: [
                ['name_prodHouse', 'ASC']
            ]
        })
        .then( data => {
            res.render('productionHouse', {data})
        })
        .catch( err => {
            res.render('error', {msg : err})
        })
    };
};

module.exports = ProductionController;
