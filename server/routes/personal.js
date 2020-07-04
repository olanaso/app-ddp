const personal    = require('../controllers').personal;

module.exports = (app) => {
    app.get('/api/personal', personal.listar)
    app.get('/api/personaldni/:dni', personal.consultar)
    /*==========GET=========*/
    app.post('/api/personal',  personal.guardar)
    app.put('/api/personal',personal.actualizar)
    app.delete('/api/personal',  personal.eliminar)
    /*==========DELETE=========*/
};

