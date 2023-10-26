const { Driver, Team } = require("../models/index.models");
const axios = require("axios");
const { Op } = require("sequelize");

const cleanArrApi = (arr) =>
  arr.map((elem) => {
    return {
      id: elem.id,
      forename: elem.name.forename,
      surname: elem.name.surname,
      dob: elem.dob,
      image: elem.image.url,
      teams: elem.teams,
      nationality: elem.nationality,
      description: elem.description,
      created: false,
    };
  });

const cleanArrDB = (arr) =>
  arr.map((elem) => {
    const teamNames = elem.teams.map((team) => team.name).join(", "); // Unir nombres de equipos con comas
    return {
      id: elem.id,
      forename: elem.forename,
      surname: elem.surname,
      dob: elem.dob,
      image: elem.image,
      teams: teamNames, // Convertir la lista de equipos en una cadena de texto
      nationality: elem.nationality,
      description: elem.description,
      created: true,
    };
  });

const searchDrivers = async (req, res) => {
  const dbDataRaw = await Driver.findAll({
    include: Team,
  });

  const driversFromDB = cleanArrDB(dbDataRaw);

  const apiDataRaw = (await axios.get("http://localhost:5000/drivers")).data;
  const driversFromApi = cleanArrApi(apiDataRaw);
  const combinedData = [...driversFromApi, ...driversFromDB];
  return combinedData;
};

const searchDriverByName = async (name) => {
  const lowerCaseName = name.toLowerCase(); // Convertir el nombre de búsqueda a minúsculas
  const dbDrivers = await Driver.findAll({
    where: {
      forename: {
        [Op.iLike]: `%${lowerCaseName}%`, // Usar Op.iLike para consultas insensibles a mayúsculas/minúsculas
      },
    },
  });

  const apiDrivers = (await axios.get("http://localhost:5000/drivers")).data;

  // Filtrar insensiblemente a mayúsculas/minúsculas
  const filteredDrivers = apiDrivers.filter(
    (driver) => driver.name.forename.toLowerCase() === lowerCaseName
  );

  return [...filteredDrivers, ...dbDrivers];
};

const getDrivers = async (req, res) => {
  const { name } = req.query;
  const results = name ? await searchDriverByName(name) : await searchDrivers();

  res.status(200).json(results);
};

module.exports = { getDrivers };
