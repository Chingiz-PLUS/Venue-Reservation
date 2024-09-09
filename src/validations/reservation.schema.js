const Joi = require("joi");

const reservationSchema = {
  reservation: Joi.object({
    venueId: Joi.string().required(),
    date: Joi.date().required(),
    time: Joi.string()
      .regex(/^([01][0-9]|2[0-3]):([0-5][0-9])$/)
      .required()
      .messages({
        "string.pattern.base":
          "Time must be in the format HH:mm and between 00:00 and 23:59",
        "any.required": "Time is required",
      }),
    numberOfPeople: Joi.number().min(1).required(),
  }),
};

module.exports = reservationSchema;
