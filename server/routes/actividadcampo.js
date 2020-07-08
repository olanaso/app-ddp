const actividadcampo    = require('../controllers').actividadcampo;

module.exports = (app) => {
    app.get('/api/actividadcampo/:fechainicio/:fechafin', actividadcampo.listar)
    app.get('/api/actividadcampodni/:dni', actividadcampo.obtenerpendiente)
    app.get('/api/actividadcampofiltros/:fechainicio/:fechafin', actividadcampo.listarfiltros)
    /*==========GET=========*/
    app.post('/api/actividadcampo',  actividadcampo.guardar)
    app.put('/api/actividadcampo',actividadcampo.actualizar)
    app.delete('/api/actividadcampo',  actividadcampo.eliminar)
    /*==========DELETE=========*/
};

