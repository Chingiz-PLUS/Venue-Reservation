const Joi = require("joi");
const authSchema = {
  register: Joi.object({
    username: Joi.string().min(3).max(15).required(),
    password: Joi.string()
      .min(8)
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/)
      .required()
      .messages({
        "string.pattern.base":
          "Password needs at least one uppercase and one number",
        "string.min.base": "Password must be at least 8 characters long."
      }),
    confirmPassword: Joi.any()
      .valid(Joi.ref("password"))
      .required()
      .messages({ "any.only": "Confirm password is not same with password" }),
    email: Joi.string().email(),
  }),
};

module.exports = authSchema;
