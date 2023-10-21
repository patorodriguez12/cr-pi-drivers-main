const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('Team', {
      id: {
        type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
      },
  
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false, tableName: "teams" });
  };