const server = require("./src/server");
const { conn } = require("./src/db");
const PORT = process.env.PORT;

server.listen(PORT, async () => {
  await conn.sync({ force: false });
  console.log(`Server is listening at ${PORT}`);
  console.log("*** Drivers Project ***");
});
