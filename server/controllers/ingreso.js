/**
 * @swagger
 * resourcePath: /Usuarios
 * description: All about API
 */

const sequelize = require('sequelize');

const ingreso = require('../models').ingreso;


//var pgp = require("pg-promise")( /*options*/ );
//var db = pgp("postgres://postgres:valeria_1@200.121.128.47:5432/cchannel");

module.exports = {
    guardar,
    actualizar,
    eliminar,
    listar
};


function guardar(req, res) {
    ingreso.create(req.body)
        .then(ingreso => {
            res.status(200).json(ingreso);
        })
        .catch(error => {
            res.status(400).send(error)
        })

}

function actualizar(req, res) {
    ingreso.findOne({
        where: {id: req.body.id}

    })
        .then(ingreso => {
                ingreso.update(req.body)
                    .then(ingreso => res.status(200).json(ingreso))
                    .catch(error => res.status(400).send(error))
            }
        )
        .catch(error => res.status(400).send(error));
}

function eliminar(req, res) {

    return ingreso
        .findOne({
            where: {id: req.body.id}
        })
        .then(ingreso => {
                ingreso.destroy();
                res.status(200).json(ingreso);
            }
        )
        .catch(error => res.status(400).send(error));
}


function listar(req, res) {
    ingreso.sequelize.query(`
       select * from ingreso '
        
    `, {type: sequelize.QueryTypes.SELECT})
        .then(resultset => {
            res.status(200).json(resultset)
        })
        .catch(error => {
            res.status(400).send(error)
        })
}