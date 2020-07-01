/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('sitiosinteres', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },

            denominacion: {
                type: DataTypes.STRING,
                allowNull: true
            },
            descripcion: {
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
            zoom: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            foto01: {
                type: DataTypes.STRING,
                allowNull: true
            },
            foto02: {
                type: DataTypes.STRING,
                allowNull: true
            },
            foto03: {
                type: DataTypes.STRING,
                allowNull: true
            },
            autor: {
                type: DataTypes.STRING,
                allowNull: true
            }

        },
        {
            timestamps: false
        }
    );
};
