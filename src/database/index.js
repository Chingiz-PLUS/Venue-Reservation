const mongoose = require("mongoose");
const config = require("../config/config");

mongoose
  .connect(config.databaseURI)
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(err);
  });
