const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
const Driver = sequelize.define(
  "drivers",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    forename: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    surname: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    dob: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    nationality: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: false }
);

module.exports = { Driver };
