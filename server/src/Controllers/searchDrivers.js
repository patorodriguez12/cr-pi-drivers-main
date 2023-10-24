const { Driver } = require('../db');
const axios = require('axios');


const cleanArray = (arr) => arr.map((elem) => {
    return {
        id: elem.id,
        forename: elem.name.forename,
        surname: elem.name.surname,
        nationality: elem.nationality,
        dob: elem.dob,
        teams: elem.teams,
        image: elem.image.url,
        description: elem.description,
        created: false,
    }
})


const searchDrivers = async () => {
    // buscar en bdd
    const dbDrivers = await Driver.findAll();

    // buscar en API
    const apiDriversRaw = (await axios.get("http://localhost:5000/drivers")).data;
    const apiDrivers = cleanArray(apiDriversRaw);

    return [...dbDrivers, ...apiDrivers];
};

const searchDriverByName = async (name) => {
    const dbDrivers = await Driver.findAll({where: {forename: name}});
    const apiDriversRaw = (await axios.get("http://localhost:5000/drivers")).data;
    const apiDrivers = cleanArray(apiDriversRaw);

    const filteredDrivers = apiDrivers.filter(driver => driver.forename === name);

    return [...filteredDrivers, ...dbDrivers];

};

module.exports = { searchDrivers, searchDriverByName };