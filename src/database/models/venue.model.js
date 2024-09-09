const { Schema, model } = require("mongoose");

const venueSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minLength: 3,
    maxLength: 25,
    unique: true,
  },
  location: {
    type: String,
    minLength: 3,
    required: [true, "Please provide location"],
  },
  lctname: {
    type: String,
  },
  capacity: {
    type: Number,
    min: [0, 'Age must be a positive number'],
    required: [true, "Please provide capacity"],
  },
  description: {
    type: String,
    minLength: 5,
    required: [true, "Please provide description"],
  },
});

venueSchema.pre("save", function (next) {
  this.lctname =  this.location.toLowerCase().replace(" ", "_");
  next();
});

const Venue = model("venue", venueSchema);

module.exports = Venue;
