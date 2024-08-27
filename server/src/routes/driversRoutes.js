const { Router } = require("express");

const { getDrivers } = require("../Controllers/Drivers/getDrivers");
const { postDrivers } = require("../Controllers/Drivers/postDrivers");
const driversRoutes = Router();

driversRoutes.post("/create", postDrivers);
driversRoutes.get("/", getDrivers);

module.exports = driversRoutes;
