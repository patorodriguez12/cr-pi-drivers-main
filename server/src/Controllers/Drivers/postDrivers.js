const { Drivers } = require("../../db");
const { validateName, validateImageLink } = require("../../utils/validations");

const postDrivers = async (req, res) => {
  try {
    const {
      id,
      forename,
      surname,
      image,
      dob,
      nationality,
      teams,
      description,
    } = req.body;

    if (!validateName(forename)) {
      return res.status(400).json({ error: "Nombre invalido" });
    }

    if (!validateName(surname)) {
      return res.status(400).json({ error: "Apellido invalido" });
    }

    if (!validateImageLink(image)) {
      return res.status(400).json({ error: "Link de imagen incorrecto" });
    }

    const newDriver = await Drivers.create({
      id,
      forename,
      surname,
      image,
      dob,
      teams,
      nationality,
      description,
    });

    return res.status(201).json(newDriver);
  } catch (error) {
    console.error("Error al crear el driver: ", error);
    return res
      .status(500)
      .json({ error: "Error interno del servidor al crear el driver " });
  }
};

module.exports = {
  postDrivers,
};
