#!/usr/bin/env node

// import amqp
const amqp = require('amqplib/callback_api');

// connect to RabbitMQ
amqp.connect('amqp://localhost', (err, conn) => {

  // create a channel
  conn.createChannel((err, ch) => {

    // set up a queue
    const queue1 = 'multiple1';

    // assert a queue
    ch.assertQueue(queue1, { durable: false });

    console.log('Waiting for messages...');

    // wait for messages
    ch.consume(queue1, (message) => {
      console.log(queue1);
      console.log(`Received: ${message.content.toString()}`);
    }, { noAck: true });

    // set up a queue
    const queue2 = 'multiple2';

    // assert a queue
    ch.assertQueue(queue2, { durable: false });

    console.log('Waiting for messages...');

    // wait for messages
    ch.consume(queue2, (message) => {
      console.log(queue2);
      console.log(`Received: ${message.content.toString()}`);
    }, { noAck: true });
  });
});
