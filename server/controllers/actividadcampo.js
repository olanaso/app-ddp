/**
 * @swagger
 * resourcePath: /Usuarios
 * description: All about API
 */

const sequelize = require('sequelize');

const actividadcampo = require('../models').actividadcampo;


//var pgp = require("pg-promise")( /*options*/ );
//var db = pgp("postgres://postgres:valeria_1@200.121.128.47:5432/cchannel");

module.exports = {
    guardar,
    actualizar,
    eliminar,
    listar
};


function guardar(req, res) {
    actividadcampo.create(req.body)
        .then(actividadcampo => {
            res.status(200).json(actividadcampo);
        })
        .catch(error => {
            res.status(400).send(error)
        })

}

function actualizar(req, res) {
    actividadcampo.findOne({
        where: {id: req.body.id}

    })
        .then(actividadcampo => {
                actividadcampo.update(req.body)
                    .then(actividadcampo => res.status(200).json(actividadcampo))
                    .catch(error => res.status(400).send(error))
            }
        )
        .catch(error => res.status(400).send(error));
}

function eliminar(req, res) {

    return actividadcampo
        .findOne({
            where: {id: req.body.id}
        })
        .then(actividadcampo => {
                actividadcampo.destroy();
                res.status(200).json(actividadcampo);
            }
        )
        .catch(error => res.status(400).send(error));
}


function listar(req, res) {
    actividadcampo.sequelize.query(`
       select * from "avp"."actividadcampo" where fecharegistro>='${req.params.fechainicio}' and fecharegistro<='${req.params.fechafin}'
    
    `, {type: sequelize.QueryTypes.SELECT})
        .then(resultset => {
            res.status(200).json(resultset)
        })
        .catch(error => {
            res.status(400).send(error)
        })
}