const ingreso    = require('../controllers').ingreso;

module.exports = (app) => {
    app.get('/api/ingreso', ingreso.listar)
    app.get('/api/ingresodni/:dni', ingreso.obtenerpendiente)
    /*==========GET=========*/
    app.post('/api/ingreso',  ingreso.guardar)
    app.put('/api/ingreso',ingreso.actualizar)
    app.delete('/api/ingreso',  ingreso.eliminar)
    /*==========DELETE=========*/
};

