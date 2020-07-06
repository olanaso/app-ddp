const brigada    = require('../controllers').brigada;

module.exports = (app) => {
    app.get('/api/brigada', brigada.listar)
    /*==========GET=========*/
    app.post('/api/brigada',  brigada.guardar)
    app.put('/api/brigada',brigada.actualizar)
    app.delete('/api/brigada',  brigada.eliminar)
    /*==========DELETE=========*/
};

