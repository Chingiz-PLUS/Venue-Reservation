const Joi = require("joi");

const reservationSchema = {
  reservation: Joi.object({
    venueId: Joi.string().required(),
    date: Joi.date().required(),
    time: Joi.string()
      .regex(/^([0-9]{2})\:([0-9]{2})$/)
      .required(),
    numberOfPeople: Joi.number().min(1).required(),
  }),
};

module.exports = reservationSchema;
