/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('brigada', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            nombre_brigada: {
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
