const axios = require("axios");
const server = require("./src/server");       // nos traemos el servidor
const { conn } = require('./src/db.js');
const PORT = 3001;


// ponemos a escuchar el servidor en el puerto 3001
conn.sync({ force: true }).then(() => {
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})
}).catch(error => console.error(error))
