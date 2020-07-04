/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('ingreso', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            profesional: {
                type: DataTypes.STRING,
                allowNull: true
            },
            dni: {
                type: DataTypes.STRING,
                allowNull: true
            },
            hora_ingreso: {
                type: DataTypes.STRING,
                allowNull: true
            },
            hora_salida: {
                type: DataTypes.STRING,
                allowNull: true
            },
            nombre_conductor: {
                type: DataTypes.STRING,
                allowNull: true
            },
            placa: {
                type: DataTypes.STRING,
                allowNull: true
            },
            destino: {
                type: DataTypes.STRING,
                allowNull: true
            },
            objeto_salida: {
                type: DataTypes.STRING,
                allowNull: true
            },
            lat: {
                type: DataTypes.STRING,
                allowNull: true
            },
            lon: {
                type: DataTypes.STRING,
                allowNull: true
            },
           
        },
        {
            timestamps: false,
            schema: "avp"
        }
    );
};
