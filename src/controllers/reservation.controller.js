const reservationService = require("../services/reservation.service");

const createReservationController = async (req, res, next) => {
  try {
    const reservation = await reservationService.create(req.body, req.user);
    res.status(201).json({
      reservation,
    });
  } catch (error) {
    next(error);
  }
};
const getUserReservationsController = async (req, res, next) => {
  try {
    const reservations = await reservationService.getUserReservations(req.user);
    res.json({
      reservations,
    });
  } catch (error) {
    next(error);
  }
};

const getReservationController = async (req, res, next) => {
  try {
    const reservation = await reservationService.getReservation(
      req.params,
      req.user
    );
    res.json({
      reservation,
    });
  } catch (error) {
    next(error);
  }
};

const deleteReservationController = async (req, res, next) => {
  try {
    const reservation = await reservationService.delete(req.params, req.user);
    res.json({
      message: "Selected Reservation is deleted",
    });
  } catch (error) {
    next(error);
  }
};

const reservationController = {
  create: createReservationController,
  getUserReservations: getUserReservationsController,
  getReservation: getReservationController,
  delete: deleteReservationController,
};

module.exports = reservationController;
