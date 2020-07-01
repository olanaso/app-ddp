
module.exports = (app) =>{
    require('./consultas')(app),
    require('./comentarios')(app),
    require('./sitiosinteres')(app),
    require('./personal')(app),
    require('./actividadcampo')(app),
    require('./ingreso')(app)
};