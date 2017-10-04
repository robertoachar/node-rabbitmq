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

  // assert a queue
  ch.assertQueue(queue, { durable: true });

  console.log('Waiting for messages...');

  // wait for messages
  ch.consume(queue, (message) => {
    const content = message.content.toString();

    const data = JSON.parse(content);

    console.log(data);

    ch.ack(message);
  });
}

start();
