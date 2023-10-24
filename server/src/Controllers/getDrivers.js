const { searchDrivers, searchDriverByName } = require('./searchDrivers');

const getDrivers = async (req, res) => {
    const { name } = req.query;
    const results = name ? await searchDriverByName(name) : await searchDrivers();

    res.status(200).json(results)
};

module.exports = { getDrivers };