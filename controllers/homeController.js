class HomeController {
    static home(req, res){
        res.render('home')
    }
    static getNoImplement(req, res){
        res.render('cast')
    }

    static getError(req, res){
        res.render('error', {msg: '404 ERROR - PAGE NOT FOUND'})
    }
}
;
module.exports = HomeController;
