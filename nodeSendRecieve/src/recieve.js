require("./db");
const rabbitsender = require("./send");
const Reservation = require("./models/reservation");

const amqp = require("amqplib/callback_api");
const { json } = require("express");
//  Connecting to RabbitMQ server
amqp.connect("amqp://localhost", function (connectionError, connection) {
  if (connectionError) {
    throw connectionError;
  }
  connection.createChannel(function (channelError, channel) {
    if (channelError) {
      throw channelError;
    }
    var queue = "Reservations";

    channel.assertQueue(queue, {
      durable: false,
    });
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

    channel.consume(
      queue,
      async function (msg) {
        console.log(" [x] Received %s", msg.content.toString());
        var object = JSON.parse(msg.content);

        //checking for double booking
        let docs = await Reservation.findOne({hotel: object.hotel, roomnumber: object.roomnumber, date: object.date});
                
        if(docs) {
            console.log('reservation already exists')
        }else{
            let createdReservation = await Reservation.create(JSON.parse(msg.content));
            rabbitsender.sendToQueue(
                JSON.stringify(createdReservation) + " Your reservation has been confirmed", "Confirmations"
            )
        }
      },
      {
        noAck: true,
      }
    );
  });
});
