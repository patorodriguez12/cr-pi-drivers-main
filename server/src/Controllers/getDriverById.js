const { Driver, Team } = require("../models/index.models");
const axios = require("axios");

const cleanArrApi = (arr) => {
  return {
    id: arr.id,
    forename: arr.name.forename,
    surname: arr.name.surname,
    dob: arr.dob,
    image: arr.image.url,
    teams: arr.teams,
    nationality: arr.nationality,
    description: arr.description,
    created: false,
  };
};

const cleanArrDB = (arr) => {
  const teamNames = arr.teams.map(team => team.name).join(', ')
  return {
    id: arr.id,
    forename: arr.forename,
    surname: arr.surname,
    dob: arr.dob,
    image: arr.image,
    nationality: arr.nationality,
    description: arr.description,
    teams: teamNames,
    created: true,
  };
};

const driverId = async (id, source) => {
  const driver =
    source === "api"
      ? cleanArrApi(
          (await axios.get(`http://localhost:5000/drivers/${id}`)).data
        )
      : cleanArrDB(await Driver.findByPk(id, {
          include: Team,
        }));

  return driver;
};

const getDriverById = async (req, res) => {
  const { id } = req.params;
  const source = isNaN(id) ? "bdd" : "api";

  try {
    const driver = await driverId(id, source);
    res.status(200).json(driver); // Return as an array to match the format of getDrivers
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = getDriverById;
