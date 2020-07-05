const { Cast } = require('../models')
const { Movie } = require('../models')
const { MovieCast } = require('../models')
const formatAge = require('../helpers/formatAge')

class CastController{
    static home(req, res){
        Cast.findAll()
        .then(data => {
            res.render('cast', {data})
        })
        .catch(err => {
            res.render('error', {msg: err})
        })
    }

    static add(req, res){
        const alert = req.query
        res.render('addCast', {alert})
    }   

    static addPost(req, res){
        let year
        if(!req.body.birth_year){
            year = null
        } else {
            year = Number(req.body.birth_year)
        }
        Cast.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            birth_year: year,
            phone_number: req.body.phone_number,
            gender: req.body.gender
        })
        .then( () => {
            res.redirect(`/casts`)
        })
        .catch( err => {
            const msg = []
            for(let i = 0; i < err.errors.length; i++){
                msg.push(err.errors[i].message)
            }
            res.redirect(`/casts/add?msg=${msg.join(', ')}`)
        })
    }

    static delete(req, res){
        Cast.destroy({
            where:{
                id: Number(req.params.id)
            }
        })
        .then( () => {
            return MovieCast.destroy({
                where: {
                    CastId: Number(req.params.id)
                }
            })
        })
        .then( () => {
            res.redirect(`/casts`)
        })
        .catch( err =>{
            res.render('error', {msg: err})
        })
    }

    static edit(req, res){
        Cast.findByPk(Number(req.params.id))
        .then( data =>{
            res.render('editCast', {data})
        })
        .catch ( err => {
            res.render('error', {msg:err})
        })
    }

    static editPost(req, res){
        Cast.update(
            {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                birth_year: req.body.birth_year,
                phone_number: req.body.phone_number,
                gender: req.body.gender
            },
            {
                where: {
                    id: Number(req.params.id)  
                }
            }
        )
        .then( () => {
            res.redirect(`/casts`)
        })
        .catch( err => {
            res.send('error', {msg : err})
        })
    }

    static seeMovies(req, res){
        Cast.findByPk(Number(req.params.id), {
            include: [{ model : Movie}]
        })
        .then( data => {
            res.render('castMovie', {data, formatAge})
        })
        .catch( err => {
            res.send(err)
        })
    }
}

module.exports = CastController