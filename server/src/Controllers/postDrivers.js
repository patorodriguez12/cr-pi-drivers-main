const { Driver, Team } = require('../db');
const { Op } = require("sequelize")

const postDrivers = async (req, res) => {
  const { id, forename, surname, nationality, dob, teams, image, description } = req.body;
  const driverCreate = await Driver.create({
    forename,
    surname,
    nationality,
    dob,
    image,
    description,
  });
  const teamsDB = await Team.findAll({
    where: { name: teams },
  })

  driverCreate.addTeam(teamsDB);
  res.send("Personaje creado con exito")
}


module.exports = { postDrivers };
