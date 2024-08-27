const { Router } = require("express");
const routes = Router();

const driversRoutes = require("./driversRoutes");
const teamsRoutes = require("./teamsRoutes");

routes.use("/drivers", driversRoutes);
routes.use("/teams", teamsRoutes);

module.exports = routes;
