const dotenv = require("dotenv");
const path = require("path");

const envPath = path.join(__dirname, "../../.env");

dotenv.config({ path: envPath });

module.exports = {
  port: process.env.PORT,
  databaseURI: process.env.DATABASE_URI,
  jwtSecret: process.env.JWT_SECRET,
};
