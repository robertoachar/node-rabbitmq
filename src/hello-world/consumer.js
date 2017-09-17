#!/usr/bin/env node

// import amqp
const amqp = require('amqplib/callback_api');

// connect to RabbitMQ
amqp.connect('amqp://localhost', (err, conn) => {

  // create a channel
  conn.createChannel((err, ch) => {

    // set up a queue
    const queue = 'hello';

    // assert a queue
    ch.assertQueue(queue, { durable: false });

    console.log('Waiting for messages...');

    // wait for messages
    ch.consume(queue, (message) => {
      console.log(`Received: ${message.content.toString()}`);
    }, { noAck: true });
  });
});
