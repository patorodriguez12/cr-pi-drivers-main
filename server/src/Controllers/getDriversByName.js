const { Driver, Team } = require('../db');
const axios = require('axios');
const { sequelize } = require('sequelize');

const getDriversByName = async (req, res) => {
    try {
        // Obtiene el valor del parámetro 'name' de la consulta y conviértelo a minúsculas
        const name = (req.query.name || '').toLowerCase();

        // Realiza la búsqueda en la base de datos
        const databaseDrivers = await Driver.findAll({
            where: sequelize.where(sequelize.fn('LOWER', sequelize.col('forename')), 'LIKE', `%${name}%`),
            limit: 15, // Limita a 15 resultados
        });

        // Realiza la búsqueda en la API
        const apiResponse = await axios.get(`http://localhost:5000/drivers?name.forename=${name}`);

        // Combina los resultados de la base de datos y la API
        const driversFromAPI = apiResponse.data;
        const allDrivers = [...databaseDrivers, ...driversFromAPI];

        if (allDrivers.length > 0) {
            res.status(200).json(allDrivers);
        } else {
            res.status(404).json({ error: 'No se encontraron conductores con el nombre proporcionado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al buscar conductores por nombre' });
    }
};

module.exports = { getDriversByName };