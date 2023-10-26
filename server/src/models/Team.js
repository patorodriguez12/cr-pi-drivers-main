const { DataTypes } = require('sequelize');
const { sequelize } = require('../db')
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
const Team = sequelize.define('teams', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {timestamps: false})

module.exports = { Team };