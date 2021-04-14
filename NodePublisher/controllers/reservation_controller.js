const rabbitSender = require("../helpers/rabbit_mq_sender");

const reservationService = require("../services/reservation_service");
module.exports = {
  reserve,
};

function reserve(req, res, next) {
  reservationService
    .reserve(req.body)
    .then((user) =>
      user
        ? res.json(user)
        : res.status(400).json({ message: " Server cannot process request" })
    )
    .catch((err) => next("Unable to create reservation"));
}


// exports.reserve = function(action, resource) {
//   return async (req, res, next) => {
//    try {
//     let newReservation = {
//       name: req.body.name,
//       date: req.body.date,
//       hotel: req.body.hotel,
//       roomnumber: req.body.roomnumber,
//       email: req.body.email,
//       phonenumber: req.body.phonenumber
//     };
//     rabbitSender.sendToMq(JSON.stringify(newReservation), "Reservations");
//     console.log(newReservation);
//     //return "Reservation send to mq";
//     next()
//    } catch (error) {
//     next(error)
//    }
//   }
// }
