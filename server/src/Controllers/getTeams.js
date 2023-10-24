const { Team } = require('../db');
const axios = require('axios');

const getTeams = async (req, res) => {
  try {
    // 1. Obtener equipos de la base de datos
    const databaseTeams = await Team.findAll();

    // 2. Obtener equipos de la API
    const apiResponse = await axios.get('http://localhost:5000/drivers');
    const apiTeams = apiResponse.data; // Supongamos que los equipos se encuentran en el arreglo apiTeams

    // 3. Extraer la propiedad "teams" de los datos de la API
    const apiTeamNames = apiTeams.map((team) => team.teams);

    // 4. Combinar los equipos de la base de datos y la propiedad "teams" de la API
    const allTeams = [...databaseTeams, ...apiTeamNames];

    // 5. Dividir los nombres de los equipos en una sola cadena, incluyendo comas sin espacios
    const allTeamsString = allTeams.join(',');

    // 6. Dividir la cadena en un arreglo de nombres de equipos
    const allTeamParts = allTeamsString.split(',')
      .map((team) => team.trim())
      .filter((team) => team !== null && team !== "");

    // 7. Ordenar los nombres de equipos alfabéticamente
    allTeamParts.sort();

    // 8. Eliminar duplicados después de la ordenación
    const uniqueTeams = [...new Set(allTeamParts)];

    // 9. Enviar la respuesta al cliente
    res.json(uniqueTeams);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error al obtener los equipos.' });
  }
};

module.exports = { getTeams };

