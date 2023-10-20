const axios = require('axios');
const { Driver } = require('../db');

const getApiData = async () => {
    try {
        let allDrivers = [];
        let apiData = await axios(`http://localhost:5000/drivers`);
        const apiDataFiltered = apiData.data.map( driver => {
            return {
                id: driver.id,
                forename: driver.name?.forename,
                surename: driver.name?.surename,
                description: driver.description,
                image: driver.image?.url,
                nationality: driver.nationality,
                dob: driver.dob,
            };
        });
        allDrivers = [...allDrivers, ...apiDataFiltered];
        return allDrivers;
    } catch (error) {
        return { msg: error.message };
    }
};

const saveApiData = async () => {
    try {
        const allDrivers = await getApiData();
        await Driver.bulkCreate(allDrivers);
        return allDrivers;
    } catch (error) {
        return { msg: error.message };
    }
};

module.exports = saveApiData;