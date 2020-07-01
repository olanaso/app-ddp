/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('personal', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                //autoIncrement: true
            },

            nombres_apellidos: {
                type: DataTypes.STRING,
                allowNull: true
            },
            dni: {
                type: DataTypes.STRING,
                allowNull: true
            },
            telefonos: {
                type: DataTypes.STRING,
                allowNull: true
            },
            correos: {
                type: DataTypes.STRING,
                allowNull: true
            },
            skype: {
                type: DataTypes.STRING,
                allowNull: true
            },
            edad: {
                type: DataTypes.STRING,
                allowNull: true
            },
            perfil: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        {
            timestamps: false,
            schema: dvp
        }
    );
};
