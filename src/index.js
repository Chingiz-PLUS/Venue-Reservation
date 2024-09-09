const express = require("express");
const cors = require("cors");
const config = require("./config/config");
const router = require("./routes");
const errorMiddleware = require("./middlewares/error.middleware");
require("./database");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", router);

app.use(errorMiddleware);
app.listen(config.port, () =>
  console.log(`server started on port: ${config.port}`)
);
