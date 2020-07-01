/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('comentarios', {
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
            correos: {
                type: DataTypes.STRING,
                allowNull: true
            },
            observacion: {
                type: DataTypes.STRING,
                allowNull: true
            },
            ip: {
                type: DataTypes.STRING,
                allowNull: true
            },
            tipodispositivo: {
                type: DataTypes.STRING,
                allowNull: true
            }
           
        },
        {
            timestamps: false
        }
    );
};
