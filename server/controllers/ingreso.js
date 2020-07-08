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
    listar,
    obtenerpendiente,
    listarfiltros
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
       select * from "avp"."ingreso"
        
    `, {type: sequelize.QueryTypes.SELECT})
        .then(resultset => {
            res.status(200).json(resultset)
        })
        .catch(error => {
            res.status(400).send(error)
        })
}

function listarfiltros(req, res) {
    let valordni;
    if(req.params.dni) {
        valordni = req.params.dni;
    } else {
        valordni = '%';
    }

    ingreso.sequelize.query(`select * from "avp"."ingreso" where fecha_registro>='${req.params.fechainicio}' and fecha_registro<='${req.params.fechafin}'
       and dni like '${valordni}' order by dni, fecha_registro desc
    `, {type: sequelize.QueryTypes.SELECT})
        .then(resultset => {
            res.status(200).json(resultset)
        })
        .catch(error => {
            res.status(400).send(error)
        })
}

function obtenerpendiente(req, res) {
    ingreso.sequelize.query(`select * from avp.ingreso where (hora_salida IS NULL OR hora_salida = '00:00') AND dni = '${req.params.dni}'
    order by fecha_registro DESC LIMIT 1 
    `, {type: sequelize.QueryTypes.SELECT})
        .then(resultset => {
            res.status(200).json(resultset)
        })
        .catch(error => {
            res.status(400).send(error)
        })
}