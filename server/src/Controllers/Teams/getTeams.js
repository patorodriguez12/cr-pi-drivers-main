const { Drivers } = require("../../db");
const axios = require("axios");

// Define la función para extraer los equipos únicos de una cadena de equipos
const extractUniqueTeams = (drivers) => {
  const teamsSet = new Set();
  drivers.forEach((driver) => {
    const teams = driver.teams ? driver.teams.split(",").map(team => team.trim().toLowerCase()) : [];
    teams.forEach(team => teamsSet.add(team));
  });
  return Array.from(teamsSet);
};

const getTeams = async (req, res) => {
  try {
    let teams = [];

    // Obtener equipos de la base de datos
    try {
      const dbDrivers = await Drivers.findAll({ attributes: ['teams'] });
      const dbTeams = extractUniqueTeams(dbDrivers);
      teams = teams.concat(dbTeams);
    } catch (dbError) {
      console.warn("Error fetching data from the database:", dbError.message);
    }

    // Obtener equipos de la API externa
    try {
      const APIDataRaw = (await axios.get("http://localhost:5000/drivers")).data;
      const apiTeams = extractUniqueTeams(APIDataRaw);
      teams = teams.concat(apiTeams);
    } catch (apiError) {
      console.warn("Error fetching data from external API:", apiError.message);
    }

    // Eliminar equipos duplicados
    const uniqueTeams = Array.from(new Set(teams));

    return res.status(200).json({ teams: uniqueTeams });
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener los equipos: ",
      error: error.message,
    });
  }
};

module.exports = {
  getTeams,
};