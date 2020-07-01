/**
 * @swagger
 * resourcePath: /Usuarios
 * description: All about API
 */

const sequelize = require('sequelize');

const personal = require('../models').personal;


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
    
    personal.create(req.body)
        .then(personal => {
            res.status(200).json(personal);
        })
        .catch(error => {
            res.status(400).send(error)
        })

}

function actualizar(req, res) {
    req.body.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    req.body.tipodispositivo=req.header('user-agent');
    
    personal.findOne({
        where: {id: req.body.id}

    })
        .then(personal => {
                personal.update(req.body)
                    .then(personal => res.status(200).json(personal))
                    .catch(error => res.status(400).send(error))
            }
        )
        .catch(error => res.status(400).send(error));
}

function eliminar(req, res) {

    return personal
        .findOne({
            where: {id: req.body.id}
        })
        .then(personal => {
                personal.destroy();
                res.status(200).json(personal);
            }
        )
        .catch(error => res.status(400).send(error));
}


function listar(req, res) {

    personal.sequelize.query(`
       select * from personal
    `, {type: sequelize.QueryTypes.SELECT})
        .then(resultset => {
            res.status(200).json(resultset)
        })
        .catch(error => {
            res.status(400).send(error)
        })
}