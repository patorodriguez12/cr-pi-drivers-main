const { Router } = require("express");

const { getTeams } = require("../Controllers/Teams/getTeams");
const teamsRoutes = Router();

teamsRoutes.get("/", getTeams);

module.exports = teamsRoutes;
