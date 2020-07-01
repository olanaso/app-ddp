const personal    = require('../controllers').personal;

module.exports = (app) => {
    app.get('/api/personal', personal.listar)
    /*==========GET=========*/
    app.post('/api/personal',  personal.guardar)
    app.put('/api/personal',personal.actualizar)
    app.delete('/api/personal',  personal.eliminar)
    /*==========DELETE=========*/
};

