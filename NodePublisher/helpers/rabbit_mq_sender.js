var amqp = require("amqplib/callback_api");

module.exports = {
  sendToMq,
};

async function sendToMq(message, mq) {
  //  Connecting to RabbitMQ server
  amqp.connect("amqp://localhost", function (connectError, connection) {
    if (connectError) {
      throw connectError;
    }
    connection.createChannel(function (channelError, channel) {
      if (channelError) {
        throw channelError;
      }

      var queue = mq;
      var msg = message;

      channel.assertQueue(queue, {
        durable: false,
      });
      channel.sendToQueue(queue, Buffer.from(msg));

      console.log(" [x] Sent %s", msg);
    });
    setTimeout(function () {
      connection.close();
    }, 500);
  });
}
