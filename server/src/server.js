// requerimos express para poder levantar el servidor
const express = require("express");

const router = require("./routes");
const morgan = require("morgan");
const cors = require("cors");

require('./db.js');

// Levantamos el servidor
const server = express();

// usamos las middlewares, con el .use le decimos a la request que pase por, por ejemplo, morgan
server.use(morgan("dev"));      
server.use(express.json());
server.use(cors());
server.use(router);

module.exports = server;
