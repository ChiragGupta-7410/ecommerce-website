const app = require("./app.js");
const dotenv = require("dotenv");
const connectDatabase = require("./database/databaseConnect.js");

// Handling Uncaught Exception

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Server Shutting Down Due To Uncaught Exception`);

  process.exit(1);
});

dotenv.config({ path: "backend/config/config.env" });

connectDatabase();

const port = process.env.PORT;

const server = app.listen(port, (err) => {
  if (err) console.log(err);
  console.log(`Server is working on http://localhost:${port}`);
});

// Handling Unhandled Promise Rejection Error

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Server Shutting Down Due To Unhandled Promise Rejection`);

  server.close(() => process.exit(1));
});
