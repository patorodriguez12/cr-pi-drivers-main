require("dotenv").config();
const { Sequelize } = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const Drivers = require("./models/Drivers");
const Teams = require("./models/Teams");

const sequelize = new Sequelize("drivers", DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "postgres",
  logging: false,
});

Drivers(sequelize);
Teams(sequelize);

const models = sequelize.models;

models.Drivers.hasMany(models.Teams, { foreignKey: "id" });
models.Teams.hasMany(models.Drivers, { foreignKey: "id" });

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
