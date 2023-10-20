const { Driver } = require('../db');

const postDrivers = async (req, res) => {
    try {
        // Obten los datos del conductor y los equipos asociados desde el cuerpo de la solicitud
        const { forename, surename, description, image, nationality, dob, teamIds } = req.body;

        // Verifica que se hayan proporcionado al menos un equipo
        if (!teamIds || teamIds.length === 0) {
            return res.status(400).json({ error: 'Debe seleccionar al menos un equipo para el conductor' });
        }

        // Crea el conductor en la base de datos
        const newDriver = await Driver.create({
            forename,
            surename,
            description,
            image,
            nationality,
            dob,
        });

        // Relaciona el conductor con los equipos proporcionados
        await newDriver.setTeams(teamIds);

        res.status(201).json(newDriver);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el conductor' });
    }
};

module.exports = { postDrivers };