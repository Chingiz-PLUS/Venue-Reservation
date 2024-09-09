const authService = require("../services/auth.service");

const registerController = async (req, res, next) => {
  try {
    let result = await authService.register(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
const loginController = async (req, res, next) => {
  try {
    let result = await authService.login(req.body);
    res.json({message: "Login successful!", ...result});
  } catch (error) {
    next(error);
  }
};

const authController = {
  login: loginController,
  register: registerController,
};

module.exports = authController;
