const { Driver, Team } = require('../models/index.models');
const { Op } = require("sequelize");

const postDrivers = async (req, res) => {
  try {
    const { forename, surname, nationality, dob, teams, image, description } = req.body;

    // Verificar si el conductor ya existe en la base de datos
    const existingDriver = await Driver.findOne({
      where: {
        forename,
        surname,
        nationality,
        dob,
      },
    });

    if (existingDriver) {
      return res.status(400).json({ error: 'Driver already exists in the database.' });
    }

    // Si el conductor no existe, crearlo
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

    res.status(201).json(driverCreate); // Cambiar a un estado 201 para indicar que se creó correctamente
  } catch (error) {
    res.status(500).json(error.message);
  }
}

module.exports = { postDrivers };
