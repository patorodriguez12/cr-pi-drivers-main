const { Driver, Team } = require('../db');
const axios = require('axios');

const getDriversByName = async (req, res) => {
    try {
        const name = req.query.name || ''; // No es necesario convertir a minúsculas

        // Realiza la búsqueda en la base de datos utilizando ILIKE (insensible a mayúsculas/minúsculas)
        const databaseDrivers = await Driver.findAll({
            where: {
                forename: {
                    [Op.iLike]: `%${name}%`,
                },
            },
            include: Team,
            limit: 15,
        });

        // Realiza la búsqueda en la API
        const apiResponse = await axios.get(`http://localhost:5000/drivers?name.forename=${name}`);

        // Combina los resultados de la base de datos y la API
        const drivers = [...databaseDrivers, ...apiResponse.data];

        if (drivers.length > 0) {
            res.status(200).json(drivers);
        } else {
            res.status(404).json({ error: 'No se encontraron conductores con el nombre proporcionado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al buscar conductores por nombre' });
    }
};

module.exports = { getDriversByName };