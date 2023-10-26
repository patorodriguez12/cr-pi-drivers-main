const { Driver, Team } = require('../models/index.models');
const { Op } = require("sequelize");

const postDrivers = async (req, res) => {
  try {
    const { forename, surname, nationality, dob, teams, image, description } = req.body;
    
    const driverCreate = await Driver.create({
      forename,
      surname,
      nationality,
      dob,
      description,
      image, // Si la estructura de tu modelo espera 'image' como un objeto con 'url'
    });

    const teamsDB = await Team.findAll({
      where: {
        name: {
          [Op.or]: teams,
        },
      },
    });

    await driverCreate.setTeams(teamsDB); // Usamos setTeams para establecer la relación con los equipos

    res.json(driverCreate);
  } catch (error) {
    res.status(500).json(error.message);
  }
}

module.exports = { postDrivers };
