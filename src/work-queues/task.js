#!/usr/bin/env node

// import amqp
const amqp = require('amqplib/callback_api');

// connect to RabbitMQ
amqp.connect('amqp://localhost', (err, conn) => {

  // create a channel
  conn.createChannel((err, ch) => {

    // set up a queue
    const queue = 'task';

    // set up a task
    const task = 'New Task';

    // assert a queue ({durable: true})
    // make sure that RabbitMQ will never lose our queue.
    ch.assertQueue(queue, { durable: true });

    // send a task
    ch.sendToQueue(queue, new Buffer(task), { persistent: true });

    // show confirmation
    console.log(`Published ${task}`);
  });

  // close connection
  setTimeout(() => {
    conn.close();
    process.exit(0);
  }, 1000);
});
