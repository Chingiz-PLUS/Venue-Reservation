const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const validateBody = require("../middlewares/validate.middleware");
const reservationSchema = require("../validations/reservation.schema");
const reservationController = require("../controllers/reservation.controller");

const reservationRouter = Router();

reservationRouter.post(
  "/",
  authMiddleware("user"),
  validateBody(reservationSchema.reservation),
  reservationController.create
);
reservationRouter.get(
  "/",
  authMiddleware("user"),
  reservationController.getUserReservations
);
reservationRouter.get(
  "/:id",
  authMiddleware("user/admin"),
  reservationController.getReservation
);
reservationRouter.delete(
  "/:id",
  authMiddleware("user/admin"),
  reservationController.delete
);

module.exports = reservationRouter;
