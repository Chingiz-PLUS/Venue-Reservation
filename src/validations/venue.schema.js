const Joi = require("joi");

const venueSchema = {
  createVenue: Joi.object({
    name: Joi.string().min(3).max(25).required(),
    location: Joi.string().min(5).required(),
    capacity: Joi.number().min(0).required(),
    description: Joi.string().min(5).required(),
  }),
  updateVenue: Joi.object({
    name: Joi.string().min(3).max(25),
    location: Joi.string().min(5),
    capacity: Joi.number().min(0),
    description: Joi.string().min(5),
  }),
};

module.exports = venueSchema;
