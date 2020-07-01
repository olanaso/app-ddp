/**
 * @swagger
 * resourcePath: /Usuarios
 * description: All about API
 */

const sequelize = require('sequelize');

const sitiosinteres = require('../models').sitiosinteres;


//var pgp = require("pg-promise")( /*options*/ );
//var db = pgp("postgres://postgres:valeria_1@200.121.128.47:5432/cchannel");

module.exports = {
    guardar,
    actualizar,
    eliminar,
    listar
};


function guardar(req, res) {
    sitiosinteres.create(req.body)
        .then(sitiosinteres => {
            res.status(200).json(sitiosinteres);
        })
        .catch(error => {
            res.status(400).send(error)
        })

}

function actualizar(req, res) {
    sitiosinteres.findOne({
        where: {id: req.body.id}

    })
        .then(sitiosinteres => {
                sitiosinteres.update(req.body)
                    .then(sitiosinteres => res.status(200).json(sitiosinteres))
                    .catch(error => res.status(400).send(error))
            }
        )
        .catch(error => res.status(400).send(error));
}

function eliminar(req, res) {

    return sitiosinteres
        .findOne({
            where: {id: req.body.id}
        })
        .then(sitiosinteres => {
                sitiosinteres.destroy();
                res.status(200).json(sitiosinteres);
            }
        )
        .catch(error => res.status(400).send(error));
}


function listar(req, res) {
    sitiosinteres.sequelize.query(`
       select * from sitiosinteres where fecharegistro>='${req.params.fechainicio}' and fecharegistro<='${req.params.fechafin}'
    
    `, {type: sequelize.QueryTypes.SELECT})
        .then(resultset => {
            res.status(200).json(resultset)
        })
        .catch(error => {
            res.status(400).send(error)
        })
}