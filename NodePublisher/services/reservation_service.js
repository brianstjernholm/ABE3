const rabbitSender = require("../helpers/rabbit_mq_sender");

module.exports = {
  reserve,
};

async function reserve({ name, date, hotel, roomnumber, email, phonenumber }) {
  let newReservation = {
    name: name,
    date: date,
    hotel: hotel,
    roomnumber: roomnumber,
    email: email,
    phonenumber: phonenumber
  };

  try {
    // her skal der sendes til message queue
    rabbitSender.sendToMq(JSON.stringify(newReservation), "Reservations");
    console.log(JSON.stringify(newReservation));
    return "Reservation send to mq";
  } catch {}
}
