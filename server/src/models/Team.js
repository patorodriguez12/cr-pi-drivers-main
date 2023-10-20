const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('Team', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
  
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false, tableName: "teams" });
  };