const { Router } = require("express");
const router = Router();

const { getDrivers } = require('../Controllers/getDrivers');
const { getDriverById } = require('../Controllers/getDriverById');
const { getDriversByName } = require('../Controllers/getDriversByName');
const { postDrivers } = require('../Controllers/postDrivers');
const { postTeams } = require('../Controllers/postTeams');

router.get('/drivers', getDrivers);
router.get('/drivers/:idDriver', getDriverById);
router.get('/drivers/name?="..."', getDriversByName);
// router.post('/drivers', postDrivers);
// router.post('/teams', postTeams);


module.exports = router;
