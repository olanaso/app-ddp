/**
 * @swagger
 * resourcePath: /Usuarios
 * description: All about API
 */

const sequelize = require('sequelize');

const comentarios = require('../models').comentarios;


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
    
    comentarios.create(req.body)
        .then(comentarios => {
            res.status(200).json(comentarios);
        })
        .catch(error => {
            res.status(400).send(error)
        })

}

function actualizar(req, res) {
    req.body.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    req.body.tipodispositivo=req.header('user-agent');
    
    comentarios.findOne({
        where: {id: req.body.id}

    })
        .then(comentarios => {
                comentarios.update(req.body)
                    .then(comentarios => res.status(200).json(comentarios))
                    .catch(error => res.status(400).send(error))
            }
        )
        .catch(error => res.status(400).send(error));
}

function eliminar(req, res) {

    return comentarios
        .findOne({
            where: {id: req.body.id}
        })
        .then(comentarios => {
                comentarios.destroy();
                res.status(200).json(comentarios);
            }
        )
        .catch(error => res.status(400).send(error));
}


function listar(req, res) {

    comentarios.sequelize.query(`
       select * from comentarios where fecha>='${req.params.fechainicio}' and fecha<='${req.params.fechafin}'
    
    `, {type: sequelize.QueryTypes.SELECT})
        .then(resultset => {
            res.status(200).json(resultset)
        })
        .catch(error => {
            res.status(400).send(error)
        })
}