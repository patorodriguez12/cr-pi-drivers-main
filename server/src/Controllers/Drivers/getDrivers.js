const { Op } = require("sequelize");
const { Drivers } = require("../../db");
const axios = require("axios");
const { validate: isUUID } = require("uuid");

const parseTeams = (teamsString) =>
  teamsString.split(",").map((team) => team.trim().toLowerCase());

const arrayFilterAPI = (arr, filters) => {
  return arr
    .filter((elem) => {
      let matches = true;

      // Asegurarse de que todos los datos de la API tengan `created: false`
      elem.created = false;

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

      // Filtro por created (booleano)
      if (
        filters.created_filter !== undefined &&
        filters.created_filter !== null
      ) {
        matches = matches && elem.created === filters.created_filter;
      }

      return matches;
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
      order: [],
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
      // Filtros
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

      if (filters.nationality_filter) {
        queryOptions.where.nationality = {
          [Op.iLike]: `%${filters.nationality_filter}%`,
        };
      }

      if (
        filters.created_filter !== undefined &&
        filters.created_filter !== null
      ) {
        queryOptions.where.created = {
          [Op.eq]: filters.created_filter,
        };
      }

      // Ordenar por dob
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

    // Combinar los datos de la DB y la API
    let combinedData = [...dbData.rows, ...APIDataClean];

    // Aplicar el orden de dob a los datos combinados si hay un orden
    if (filters.dob_order) {
      combinedData = combinedData.sort((a, b) => {
        const dateA = new Date(a.dob);
        const dateB = new Date(b.dob);
        return filters.dob_order === "asc" ? dateA - dateB : dateB - dateA;
      });
    }

    // Devolver los datos combinados paginados
    const result = {
      total: combinedData.length,
      drivers: combinedData,
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
