const { Router } = require("express");
const router = Router();

const { getDrivers } = require('../Controllers/getDrivers');
const { getDriverById } = require('../Controllers/getDriverById');
const { getDriversByName } = require('../Controllers/getDriversByName');
const { postDrivers } = require('../Controllers/postDrivers');
const { getTeams } = require('../Controllers/getTeams');

router.get('/', (req, res) => {
    res.send("¡Bienvenido a la API de conductores!");
  });
router.get('/drivers', getDrivers);
router.get('/drivers/:idDriver', getDriverById);
router.get('/drivers/name', getDriversByName);
router.post('/drivers', postDrivers);
router.get('/teams', getTeams);


module.exports = router;
