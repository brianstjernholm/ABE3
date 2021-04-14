const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  name: { type: String },
  date: { type: String },
  hotel: { type: String},
  roomnumber: { type: Number },
  email: { type: String },
  phonenumber: {type: String},
  id: { type: String }
});

module.exports = mongoose.model("Reservation", reservationSchema);
