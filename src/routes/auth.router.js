const { Router } = require("express");
const validateBody = require("../middlewares/validate.middleware");
const authSchema = require("../validations/auth.schema");
const authController = require("../controllers/auth.controller");

const authRouter = Router();

authRouter.post(
  "/register",
  validateBody(authSchema.register),
  authController.register
);

authRouter.post("/login", authController.login);

module.exports = authRouter;
