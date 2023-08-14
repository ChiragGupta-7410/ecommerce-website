const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./database/databaseConnect");

dotenv.config({ path: "backend/config/config.env" });

connectDatabase();

const port = process.env.PORT;

app.listen(port, (err) => {
  if (err) console.log(err);
  console.log(`Server is working on http://localhost:${port}`);
});
