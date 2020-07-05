const { Movie } = require('../models')
const { ProductionHouse } = require('../models')
const { Cast } = require('../models')
const { MovieCast } = require('../models')

class MovieController{
    static home(req, res){
        const alert = req.query
        Movie.findAll({
            include: [{model : ProductionHouse}],
            order : [ 
                ['released_year', 'DESC']
            ]
        })
        .then( data => {
            res.render('movie', {data, alert})
        })
        .catch( err => {
            res.render('error', {msg : err})
        })
    }

    static add(req, res){
        ProductionHouse.findAll()
        .then( data => {
            res.render('addMovie', {data})
        })
        .catch( err => {
            res.render('error', {msg: err})
        })
    }

    static addPost(req, res){
        let rating 
        if(!req.body.rating){
            rating = null
        } else {
            rating = Number(req.body.rating)
        }
        Movie.create({
            name: req.body.name,
            released_year: req.body.released_year,
            genre: req.body.genre,
            ProductionHouseId: req.body.ProductionHouseId,
            rating : rating
        })
        .then( () => {
            res.redirect(`/movies`)
        })
        .catch( err => {
            const msg = err.errors[0].message
            res.redirect(`/movies?msg=${msg}`)
        })
    }

    static delete(req, res){
        Movie.destroy({
            where:{
                id: Number(req.params.id)
            }
        })
        .then( () => {
            return MovieCast.destroy({
                where: {
                    MovieId : Number(req.params.id)
                }
            })
        })
        .then( () => {
            res.redirect(`/movies`)
        })
        .catch( err =>{
            res.render('error', {msg: err})
        })
    }

    static edit(req, res){
        let dataProductionHouse
        ProductionHouse.findAll()
        .then( data => {
            dataProductionHouse = data
            return Movie.findByPk(Number(req.params.id))
        })
        .then( data => {
            res.render('editMovie', {data, dataProductionHouse})
        })
        .catch( err => {
            res.render('error', {msg: err})
        })
    }

    static editPost(req, res){
        let rating 
        if(!req.body.rating){
            rating = null
        } else {
            rating = Number(req.body.rating)
        }
        Movie.update(
            {
                name: req.body.name,
                released_year: req.body.released_year,
                genre: req.body.genre,
                ProductionHouseId : req.body.ProductionHouseId,
                rating : rating
            },
            {
                where: {
                    id: Number(req.params.id)  
                }
            }
        )
        .then( () => {
            res.redirect(`/movies`)
        })
        .catch( err => {
            const msg = err.errors[0].message
            res.redirect(`/movies?msg=${msg}`)
        })
    }

    static addMovieCast(req, res){
        const alert = req.query
        let dataCast
        let data
        Cast.findAll()
        .then( data => {
            dataCast = data
            return Movie.findByPk(Number(req.params.id), {include : {model: Cast}})
        })
        .then( dataMovie => {
            data = dataMovie
            return MovieCast.findAll({
                where: {
                    MovieId : req.params.id
                }
            })
        })
        .then( dataMovieCast => {
            res.render('addMovieCast', {data, dataCast, dataMovieCast, alert})
        })
        .catch( err => {
            res.render('error', {msg : err})
        })
    }

    static addMovieCastPost(req, res){
        MovieCast.create({
            MovieId: req.body.MovieId,
            CastId: req.body.CastId,
            role: req.body.role
        })
        .then( () => {
            res.redirect(`/movies/addcast/${req.params.id}`)
        })
        .catch( err => {
            const msg = []
            for(let i = 0; i < err.errors.length; i++){
                msg.push(err.errors[i].message)
            }
            res.redirect(`/movies/addcast/${req.params.id}?msg=${msg.join(', ')}&type=danger`)
        })
    }
}

module.exports = MovieController