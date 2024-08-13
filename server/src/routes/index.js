const { Router } = require("express");
const router = Router();

const { getDrivers } = require("../Controllers/getDrivers");
const getDriverById = require("../Controllers/getDriverById");
const { postDrivers } = require("../Controllers/postDrivers");
const { getTeams } = require("../Controllers/getTeams");

router.get("/drivers", getDrivers);
router.get("/drivers/:id", getDriverById);
router.post("/drivers", postDrivers);
router.get("/teams", getTeams);

module.exports = router;
