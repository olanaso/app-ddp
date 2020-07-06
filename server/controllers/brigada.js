/**
 * @swagger
 * resourcePath: /Brigada
 * description: All about API
 */

const sequelize = require('sequelize');

const brigada = require('../models').brigada;


//var pgp = require("pg-promise")( /*options*/ );
//var db = pgp("postgres://postgres:valeria_1@200.121.128.47:5432/cchannel");

module.exports = {
    guardar,
    actualizar,
    eliminar,
    listar
};


function guardar(req, res) {

    req.body.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    req.body.tipodispositivo=req.header('user-agent');
    
    brigada.create(req.body)
        .then(brigada => {
            res.status(200).json(brigada);
        })
        .catch(error => {
            res.status(400).send(error)
        })

}

function actualizar(req, res) {
    req.body.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    req.body.tipodispositivo=req.header('user-agent');
    
    brigada.findOne({
        where: {id: req.body.id}

    })
        .then(brigada => {
                brigada.update(req.body)
                    .then(brigada => res.status(200).json(brigada))
                    .catch(error => res.status(400).send(error))
            }
        )
        .catch(error => res.status(400).send(error));
}

function eliminar(req, res) {

    return brigada
        .findOne({
            where: {id: req.body.id}
        })
        .then(brigada => {
                brigada.destroy();
                res.status(200).json(brigada);
            }
        )
        .catch(error => res.status(400).send(error));
}

function listar(req, res) {

    brigada.sequelize.query(`
       select * from  "avp"."brigada"
    `, {type: sequelize.QueryTypes.SELECT})
        .then(resultset => {
            res.status(200).json(resultset)
        })
        .catch(error => {
            res.status(400).send(error)
        })
}