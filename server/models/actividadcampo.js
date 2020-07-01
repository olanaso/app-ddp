/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('actividadcampo', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },

            nombres: {
                type: DataTypes.STRING,
                allowNull: true
            },
            // apellidos: {
            //     type: DataTypes.STRING,
            //     allowNull: true
            // },
            dni: {
                type: DataTypes.STRING,
                allowNull: true
            },
            inicioactividades_area_estudio: {
                type: DataTypes.STRING,
                allowNull: true
            },
            termino_actividades_area_estudio: {
                type: DataTypes.STRING,
                allowNull: true
            },
            grupo_trabajo: {
                type: DataTypes.STRING,
                allowNull: true
            },
            fecha: {
                type: DataTypes.STRING,
                allowNull: true
            },
            area_est_tramo: {
                type: DataTypes.STRING,
                allowNull: true
            },
            area_est_sector: {
                type: DataTypes.STRING,
                allowNull: true
            },
            tipo_via: {
                type: DataTypes.STRING,
                allowNull: true
            },
            nombre: {
                type: DataTypes.STRING,
                allowNull: true
            },
            cuadras: {
                type: DataTypes.STRING,
                allowNull: true
            },
            referencia: {
                type: DataTypes.STRING,
                allowNull: true
            },
            tipo_actividad: {
                type: DataTypes.STRING,
                allowNull: true
            },
            detalle_activ: {
                type: DataTypes.STRING,
                allowNull: true
            },
            equipo_utilizado: {
                type: DataTypes.STRING,
                allowNull: true
            },
            coordinaciones: {
                type: DataTypes.STRING,
                allowNull: true
            },
            otrasincidencias: {
                type: DataTypes.STRING,
                allowNull: true
            },
            fecharegistro: {
                type: DataTypes.STRING,
                allowNull: true
            },
            ip: {
                type: DataTypes.STRING,
                allowNull: true
            },
            equipo: {
                type: DataTypes.STRING,
                allowNull: true
            }
            
           
        },
        {
            timestamps: false,
            schema: "avp"
        }
    );
};
