const { Driver, Team } = require('../db');
const axios = require('axios'); // Para realizar solicitudes HTTP a la API

const getDriverById = async (req, res) => {
    try {
        // Obtén el ID del conductor desde los parámetros de la URL
        const { idDriver } = req.params;

        // Intenta buscar el conductor en la base de datos
        const driverFromDatabase = await Driver.findByPk(idDriver, {
            include: Team, // Incluye los datos del equipo asociado al conductor
        });

        if (driverFromDatabase) {
            // Si se encuentra en la base de datos, enviamos los datos de la base de datos como respuesta
            res.status(200).json(driverFromDatabase);
        } else {
            // Si no se encuentra en la base de datos, intenta obtenerlo desde la API
            const apiResponse = await axios.get(`http://localhost:5000/drivers/${idDriver}`);

            // Verifica si se obtuvo una respuesta de la API
            if (apiResponse.data) {
                // Envía los datos de la API como respuesta
                res.status(200).json(apiResponse.data);
            } else {
                // Si no se encuentra en la API, responde con un error
                res.status(404).json({ error: 'Conductor no encontrado' });
            }
        }
    } catch (error) {
        res.status(500).json({ error });
    }
};

module.exports = { getDriverById };