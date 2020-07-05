const express = require('express')
const castController = require('../controllers/castController')

const router = express.Router()

router.get('/', castController.home)
router.get('/add', castController.add)
router.post('/add', castController.addPost)
router.get('/edit/:id', castController.edit)
router.post('/edit/:id', castController.editPost)
router.get('/delete/:id', castController.delete)
router.get('/movies/:id', castController.seeMovies)

module.exports = router