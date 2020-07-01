const sitiosinteres = require('../controllers').sitiosinteres;

module.exports = (app) => {

    app.get('/api/sitiosinteres/:fechainicio/:fechafin', sitiosinteres.listar)
    /*==========GET=========*/
    app.post('/api/sitiosinteres',  sitiosinteres.guardar)
    app.put('/api/sitiosinteres',sitiosinteres.actualizar)
    app.delete('/api/sitiosinteres',  sitiosinteres.eliminar)
    /*==========DELETE=========*/

};

