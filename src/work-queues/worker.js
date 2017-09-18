#!/usr/bin/env node

// import amqp
const amqp = require('amqplib/callback_api');

// connect to RabbitMQ
amqp.connect('amqp://localhost', (err, conn) => {

  // create a channel
  conn.createChannel((err, ch) => {

    // set up a queue
    const queue = 'task';

    // assert a queue ({durable: true})
    // make sure that RabbitMQ will never lose our queue.
    ch.assertQueue(queue, { durable: true });

    // This tells RabbitMQ not to give more than one message to a worker at a time
    ch.prefetch(1);

    console.log('Waiting for tasks...');

    // wait for tasks
    ch.consume(queue, (task) => {
      console.log(`Received: ${task.content.toString()}`);
      ch.ack(task);
    }, { noAck: false });
  });
});
