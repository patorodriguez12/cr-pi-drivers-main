const { Driver } = require('../db');
const axios = require('axios');

const getDrivers = async (req, res) => {
    try {
        // Hacemos la solicitud GET a la API
        const response = await axios.get('http://localhost:5000/drivers');

        // Verificamos si se realizo el pedido de manera correcta
        if (response.status === 200) {
            const driversFromAPI = response.data;
            const driversFromDB = await Driver.findAll();
            const allDrivers = [...driversFromAPI, ...driversFromDB];
            res.status(200).json(allDrivers);
        } else {
            res.status(500).json({ error: 'Error al obtener los conductores desde la API' })
        }
    } catch (error) {
        res.status(500).json({ error: error.msg })
    }
};

module.exports = { getDrivers };