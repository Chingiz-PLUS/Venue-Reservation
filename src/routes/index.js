const { Router } = require("express");
const authRouter = require("./auth.router");
const venueRouter = require("./venue.router");
const reservationRouter = require("./reservation.router");

const router = Router();

router.use("/auth", authRouter);
router.use("/venues", venueRouter);
router.use("/reservations", reservationRouter);

module.exports = router;
