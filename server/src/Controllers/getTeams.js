const { Team } = require("../models/index.models");
const axios = require("axios");

const addTeams = async () => {
  try {
    const teams = await Team.findAll();
    if (teams.length == 0) {
      var arrayTeams = [];

      // 2. Obtener equipos de la API
      const apiResponse = await axios.get("http://localhost:5000/drivers");
      const apiTeams = apiResponse.data; // Supongamos que los equipos se encuentran en el arreglo apiTeams

      // 3. Extraer la propiedad "teams" de los datos de la API
      apiTeams.forEach((element) => {
        if (element.teams != undefined) {
          const results = element.teams.split(",");
          results.forEach((t) => {
            arrayTeams.push(t.trim());
          });
        }
      });

      const arrayFinal = arrayTeams.filter((items, index) => {
        return arrayTeams.indexOf(items) === index;
      });

      arrayFinal.forEach(async (element) => {
        await Team.create({
          name: element,
        });
      });

    } else {
      console.log("La base de datos esta llena");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Hubo un error al obtener los equipos." });
  }
};

const getTeams = async (req, res) => {
  const teams = await Team.findAll();
  const teamNames = teams.map((team) => team.name); // Extraer nombres de equipos
  res.status(200).json(teamNames);
};

module.exports = { getTeams, addTeams };
