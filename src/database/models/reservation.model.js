const { Schema, model } = require("mongoose");

const reservationSchema = new Schema({
  venueId: {
    type: Schema.Types.ObjectId,
    ref: "venue",
  },
  userId:{
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  date: {
    type: Date,
    required: [true, "Please provide date"],
  },
  time: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /([01]\d|2[0-3]):([0-5]\d)/.test(v);
      },
      message: (props) => `${props.value} is not a valid time format! Use HH:mm.`,
    },
  },
  numberOfPeople: {
    type: Number,
    min: [0, 'number of people must be greater than or equal to 1'],
    required: [true, "Please provide number of people"],
  },
});


const Reservation = model("reservation", reservationSchema);

module.exports = Reservation;
