const auth = require('../server/middlewares/auth')
const vendors = 'vendors~perfil~puntos_criticos~puntos_seguridad~usuario.bundle.js'


module.exports = function (app) {

    app.get('/',  (req, res) => {
        res.render('pages/login' )
    })

    //Pagina Reporte geo
    app.get('/clear-channel', (req, res) => {

       res.render('pages/mod01-reporte-geo', { user:{nombres:'ClearChannel'} })
       //   res.render('pages/mod01-reporte-geo')
    })



}