const dotenv = require("dotenv");
const path = require("path");

const envPath = path.join(__dirname, "../../.env");

dotenv.config({ path: envPath });

module.exports = {
  port: process.env.PORT,
  databaseURI: process.env.DATABASE_URI,
  jwtSecret: process.env.JWT_SECRET,
  redisUrl: process.env.REDIS_URL,
  smtp: {
    from: process.env.SMTP_FROM,
    host: process.env.SMTP_HOST,
    username: process.env.SMTP_USERNAME,
    password: process.env.SMTP_PASSWORD,
    port: process.env.SMTP_PORT,
  },
};
