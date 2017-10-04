#!/usr/bin/env node

// import amqp
const amqp = require('amqplib');

async function start() {
  // connect to RabbitMQ
  const connection = await amqp.connect('amqp://localhost');

  // create a channel
  const ch = await connection.createChannel();

  // set up a queue
  const queue = 'promise';

  // set up a message
  const message = { message: 'Hello World' };

  // stringify message
  const data = JSON.stringify(message);

  // assert a queue
  ch.assertQueue(queue, { durable: true });

  // send a message
  ch.sendToQueue(queue, new Buffer(data), {
    contentType: 'application/json',
    persistent: true
  });

  // show confirmation
  console.log(message);

  // close connection
  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 1000);
}

start();
