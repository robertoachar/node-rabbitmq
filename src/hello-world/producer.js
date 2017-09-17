#!/usr/bin/env node

// import amqp
const amqp = require('amqplib/callback_api');

// connect to RabbitMQ
amqp.connect('amqp://localhost', (err, conn) => {

  // create a channel
  conn.createChannel((err, ch) => {

    // set up a queue
    const queue = 'hello';

    // set up a message
    const message = 'Hello World';

    // assert a queue
    ch.assertQueue(queue, { durable: false });

    // send a message
    ch.sendToQueue(queue, new Buffer(message));

    // show confirmation
    console.log(`Published ${message}`);
  });

  // close connection
  setTimeout(() => {
    conn.close();
    process.exit(0);
  }, 500);
});
