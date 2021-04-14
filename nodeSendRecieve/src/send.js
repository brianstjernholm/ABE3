var amqp = require("amqplib/callback_api");

module.exports = {
  sendToQueue,
};

async function sendToQueue(message, mq) {
  amqp.connect("amqp://localhost", function (connectionError, connection) {
    if (connectionError) {
      throw error0;
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
