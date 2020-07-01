const comentarios    = require('../controllers').comentarios;

module.exports = (app) => {
    app.get('/api/comentarios/:fechainicio/:fechafin', comentarios.listar)
    /*==========GET=========*/
    app.post('/api/comentarios',  comentarios.guardar)
    app.put('/api/comentarios',comentarios.actualizar)
    app.delete('/api/comentarios',  comentarios.eliminar)
    /*==========DELETE=========*/
};

