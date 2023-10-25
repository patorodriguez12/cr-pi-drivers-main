const { Driver } = require('../db');
const axios = require('axios');

const cleanDriver = (driver) => {
    return {
        id: driver.id,
        forename: driver.name.forename,
        surname: driver.name.surname,
        nationality: driver.nationality,
        dob: driver.dob,
        teams: driver.teams,
        image: driver.image.url,
        description: driver.description,
        created: false,
    };
};

const driverId = async (id, source) => {
    const driver = source === "api"
        ? cleanDriver((await axios.get(`http://localhost:5000/drivers/${id}`)).data)
        : cleanDriver(await Driver.findByPk(id));

    return driver;
};

const getDriverById = async (req, res) => {
    const { id } = req.params;
    const source = isNaN(id) ? "bdd" : "api";

    try {
        const driver = await driverId(id, source);
        res.status(200).json([driver]); // Return as an array to match the format of getDrivers
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = getDriverById;