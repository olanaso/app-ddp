
module.exports = (app) =>{
    require('./consultas')(app),
    require('./comentarios')(app),
    require('./sitiosinteres')(app)
};