const { Driver } = require('../db');
const axios = require('axios');


const driverId = async (id, source) => {
    const driver = source === "api" ?
    (await axios.get(`http://localhost:5000/drivers/${id}`)).data :
    await Driver.findByPk(id);

    return driver;
};


const getDriverById = async (req, res) => {
    const { id } = req.params;
    const source = isNaN(id) ? "bdd" : "api";

    try {
        const driver = await driverId(id, source);
        res.status(200).json(driver);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = getDriverById;