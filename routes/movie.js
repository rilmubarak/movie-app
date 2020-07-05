const router            = require('express').Router();
const movieController   = require('../controllers/movieController');

router.get('/', movieController.home)
router.get('/add', movieController.add)
router.post('/add', movieController.addPost)
router.get('/edit/:id', movieController.edit)
router.post('/edit/:id', movieController.editPost)
router.get('/delete/:id', movieController.delete)
router.get('/addcast/:id', movieController.addMovieCast)
router.post('/addcast/:id', movieController.addMovieCastPost)


module.exports = router;
