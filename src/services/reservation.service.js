const Reservation = require("../database/models/reservation.model");
const { AppError, NotFoundError } = require("../errors");
const { Types } = require("mongoose");
const ForbiddenError = require("../errors/forbidden.error");
const Venue = require("../database/models/venue.model");

const reservationService = {
  create: async (body, user) => {
    const venue = await Venue.findById(body.venueId);

    if (!venue) throw new NotFoundError("The venue does not exist!");

    const haveReservation = await Reservation.findOne({
      venueId: body.venueId,
      date: body.date,
      time: body.time,
    }).lean();
    if (haveReservation)
      throw new AppError("The reservation is already exist in this time", 409);

    console.log("hey");
    const reservation = await Reservation.create({
      userId: user._id,
      ...body,
    });
    console.log("reservation");
    return reservation;
  },

  getUserReservations: async (user) => {
    const reservations = await Reservation.find({ userId: user._id }).lean();

    if (reservations.length==0)
      throw new NotFoundError("This user doesn't have any reservations");
    
    return reservations;
  },

  getReservation: async (params, user) => {
    const { id } = params;
    let reservation = await Reservation.findById(id).lean();

    if (!reservation) throw new NotFoundError("The reservation is not found!");

    const userId = new Types.ObjectId(user._id);
    if (user.role == "admin") return reservation;

    if (userId.equals(reservation.userId)) return reservation;

    throw new ForbiddenError();
  },

  delete: async (params, user) => {
    const { id } = params;
    const userId = new Types.ObjectId(user._id);

    let reservation = await Reservation.findById(id).lean();

    if (!reservation) throw new NotFoundError("The reservation is not found!");

    if (user.role == "admin") return reservation;

    if (userId.equals(reservation.userId)) return reservation;

    throw new ForbiddenError();
  },
};

module.exports = reservationService;
