const mongoose = require("mongoose");
const config = require("../config/config");

mongoose
  .connect(config.databaseURI)
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log(err);
  });
