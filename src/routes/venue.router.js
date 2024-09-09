const { Router } = require("express");
const validateBody = require("../middlewares/validate.middleware");
const venueSchema = require("../validations/venue.schema");
const venueController = require("../controllers/venue.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const venueRouter = Router();

venueRouter.post(
  "/",
  authMiddleware("admin"),
  validateBody(venueSchema.createVenue),
  venueController.create
);
venueRouter.get("/", venueController.getAll);
venueRouter.get("/:id", venueController.getOne);
venueRouter.put("/:id", authMiddleware("admin"), validateBody(venueSchema.updateVenue), venueController.update);
venueRouter.delete("/:id", authMiddleware("admin"), venueController.delete)

module.exports = venueRouter;
