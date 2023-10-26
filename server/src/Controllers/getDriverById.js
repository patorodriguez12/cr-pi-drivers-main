const { Driver } = require("../models/index.models");
const axios = require("axios");

const driverId = async (id, source) => {
  const driver =
    source === "api"
      ? (await axios.get(`http://localhost:5000/drivers/${id}`)).data
      : await Driver.findByPk(id);

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
