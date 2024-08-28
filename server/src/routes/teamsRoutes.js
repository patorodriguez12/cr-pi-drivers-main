const { Router } = require("express");

const { getTeams } = require("../Controllers/Teams/getTeams");
const teamsRoutes = Router();

teamsRoutes.post("/", getTeams);

module.exports = teamsRoutes;
