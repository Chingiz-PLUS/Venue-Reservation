const Reservation = require("../database/models/reservation.model");
const { AppError, NotFoundError } = require("../errors");
const ForbiddenError = require("../errors/forbidden.error");
const Venue = require("../database/models/venue.model");
const { sendMail } = require("../utils/mailer.util");
const dateFns = require("date-fns");

const reservationService = {
  create: async (body, user) => {
    const venue = await Venue.findById(body.venueId);

    if (!venue) throw new NotFoundError("The venue does not exist!");

    const haveReservation = await Reservation.findOne({
      venueId: body.venueId,
      date: body.date,
      time: body.time,
    });
    if (haveReservation)
      throw new AppError("The reservation is already exist in this time", 409);

    const reservation = await Reservation.create({
      ...body,
      userId: user._id,
    });

    const formattedDate = dateFns.format(body.date, "yyyy-MM-dd");
    await sendMail({
      to: user.email,
      subject: "Reservation created",
      text: `
        Conguratulations! Your reservation for ${venue.name} is activated for ${formattedDate} ${body.time}
      `,
    }).catch(() => false);

    return reservation;
  },

  getUserReservations: async (user) => {
    const reservations = await Reservation.find({ userId: user._id });
    return reservations;
  },

  getReservation: async (params, user) => {
    const { id } = params;
    const reservation = await Reservation.findById(id);

    if (!reservation) throw new NotFoundError("The reservation is not found!");

    if (!user._id.equals(reservation.userId) && user.role != "admin")
      throw new ForbiddenError();

    return reservation;
  },

  delete: async (params, user) => {
    const { id } = params;

    const reservation = await Reservation.findById(id);

    if (!reservation) throw new NotFoundError("The reservation is not found!");

    if (!user._id.equals(reservation.userId) && user.role != "admin")
      throw new ForbiddenError();

    await reservation.deleteOne();
    return reservation;
  },
};

module.exports = reservationService;
