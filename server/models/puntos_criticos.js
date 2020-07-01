/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('puntos_criticos', {
    idpuntos_criticos: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    idusuario: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'usuario',
        key: 'idusuario'
      }
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    latitud: {
      type: DataTypes.STRING,
      allowNull: true
    },
    longitud: {
      type: DataTypes.STRING,
      allowNull: true
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: true
    },
    denominacion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    icono: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    color: {
      type: DataTypes.STRING,
      allowNull: true
    },
    referencia: {
      type: DataTypes.STRING,
      allowNull: true
    },
    geometria: {
      type: DataTypes.GEOMETRY('POINT', 4326) ,
      allowNull: true
    }
  },
  {
      timestamps: false
  }
  );
};
