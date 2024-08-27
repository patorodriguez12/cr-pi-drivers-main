const { Op } = require("sequelize");
const { Drivers } = require("../../db");
const axios = require("axios");
const { validate: isUUID } = require("uuid");

// Define the parseTeams function
const parseTeams = (teamsString) =>
  teamsString.split(",").map((team) => team.trim().toLowerCase());

const arrayFilterAPI = (arr, filters) => {
  return arr
    .filter((elem) => {
      let matches = true;

      if (filters.forename_filter) {
        matches =
          matches &&
          elem.name.forename
            .toLowerCase()
            .includes(filters.forename_filter.toLowerCase());
      }

      if (filters.id_filter) {
        matches = matches && elem.id === parseInt(filters.id_filter, 10);
      }

      if (filters.teams_filter) {
        const teamsFilter = parseTeams(filters.teams_filter);
        const driverTeams = parseTeams(elem.teams || "");

        matches =
          matches &&
          teamsFilter.every((team) =>
            driverTeams.some((driverTeam) => driverTeam.includes(team))
          );
      }

      // Filtro por nationality
      if (filters.nationality_filter) {
        matches =
          matches &&
          elem.nationality
            .toLowerCase()
            .includes(filters.nationality_filter.toLowerCase());
      }

      return matches;
    })
    .sort((a, b) => {
      if (filters.dob_order === "asc") {
        return new Date(a.dob) - new Date(b.dob);
      } else if (filters.dob_order === "desc") {
        return new Date(b.dob) - new Date(a.dob);
      }
      return 0; // Si no hay orden específico, no se realiza ninguna acción
    })
    .map((elem) => {
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
};

const getDrivers = async (req, res) => {
  try {
    const { filters = {}, page, itemsPerPage } = req.body;

    const queryOptions = {
      where: {},
      order: [], // Añadir lógica de orden si es necesario
      limit: itemsPerPage,
      offset: 0,
      ...(page && { offset: (page - 1) * itemsPerPage }),
    };

    let APIDataClean = [];
    let dbData = { count: 0, rows: [] };

    if (filters.id_filter && filters.id_filter !== "") {
      if (isUUID(filters.id_filter)) {
        queryOptions.where.id = {
          [Op.eq]: filters.id_filter,
        };
        dbData = await Drivers.findAndCountAll(queryOptions);
      } else {
        try {
          const APIDataRaw = (await axios.get("http://localhost:5000/drivers"))
            .data;
          APIDataClean = arrayFilterAPI(APIDataRaw, filters);
        } catch (apiError) {
          console.warn(
            "Error fetching data from external API:",
            apiError.message
          );
        }
      }
    } else {
      if (filters.forename_filter) {
        queryOptions.where.forename = {
          [Op.iLike]: `%${filters.forename_filter}%`,
        };
      }

      if (filters.teams_filter) {
        const teamsFilter = parseTeams(filters.teams_filter);

        queryOptions.where.teams = {
          [Op.and]: teamsFilter.map((team) => ({
            [Op.iLike]: `%${team}%`,
          })),
        };
      }

      // Filtro por nationality en la base de datos
      if (filters.nationality_filter) {
        queryOptions.where.nationality = {
          [Op.iLike]: `%${filters.nationality_filter}%`,
        };
      }

      // Ordenamiento por fecha de nacimiento (dob)
      if (filters.dob_order) {
        queryOptions.order.push(["dob", filters.dob_order.toUpperCase()]);
      }

      dbData = await Drivers.findAndCountAll(queryOptions);

      try {
        const APIDataRaw = (await axios.get("http://localhost:5000/drivers"))
          .data;
        APIDataClean = arrayFilterAPI(APIDataRaw, filters);
      } catch (apiError) {
        console.warn(
          "Error fetching data from external API:",
          apiError.message
        );
      }
    }

    const result = {
      total: dbData.count + APIDataClean.length,
      drivers: [...dbData.rows, ...APIDataClean],
    };

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener los drivers: ",
      error: error.message,
    });
  }
};

module.exports = {
  getDrivers,
};
