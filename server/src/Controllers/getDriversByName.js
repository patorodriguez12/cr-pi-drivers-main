const { Driver, Team } = require('../db');
const axios = require('axios');
const { Op } = require('sequelize');

const getDriversByName = async (req, res) => {
    try {
        // Obten el valor del parámetro 'name' de la consulta y conviértelo a minúsculas
        const name = (req.query.name || '').toLowerCase();

        // Realiza la búsqueda en la API
        const apiResponse = await axios.get('http://localhost:5000/drivers');

        // Realiza la búsqueda en la base de datos
        const databaseDrivers = await Driver.findAll({
            where: {
                forename: {
                    [Op.iLike]: `%${name}%`,
                },
            },
            limit: 15, // Limita a 15 resultados
        });
        // Filtra los conductores de la API que coinciden con el nombre
        const driversFromAPI = apiResponse.data.filter(driver => driver.name.forename.toLowerCase().includes(name));

        // Combina los resultados de la base de datos y la API
        const allDrivers = [...databaseDrivers, ...driversFromAPI];

        if (apiResponse.data) {
            const driversFromAPI = apiResponse.data.filter(driver => driver.name.forename.toLowerCase().includes(name));
            // Resto del código...
        } else {
            // Manejo de error si no se obtuvieron datos de la API
            res.status(500).json({ error: 'Error al obtener datos de la API' });
        }

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