const { Team } = require('../db');
const axios = require('axios');

const getTeams = async (req, res) => {
    try {
        // Intenta buscar los equipos en la base de datos
        const teamsFromDB = await Team.findAll();

        if (teamsFromDB.length === 0) {
            // Si no se encontraron equipos en la base de datos, intenta obtenerlos de la API
            const apiResponse = await axios.get('http://localhost:5000/drivers');

            if (apiResponse.status === 200) {
                const teamsFromAPI = apiResponse.data.map(driver => (driver.teams || '').split(', '));
                // Guarda los equipos en la base de datos
                // Esto debe implementarse en tu código para almacenar los equipos en la base de datos
                // Por ejemplo: teamsFromAPI.forEach(team => Team.create({ name: team }));
                res.status(200).json(teamsFromAPI);
            } else {
                res.status(500).json({ error: 'Error al obtener los equipos desde la API' });
            }
        } else {
            res.status(200).json(teamsFromDB);
        }
    } catch (error) {
        console.error(error); // Registra el error en la consola para depuración
        res.status(500).json({ error: 'Error al obtener los equipos' });
    }
};

module.exports = { getTeams };