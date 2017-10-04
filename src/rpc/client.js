#!/usr/bin/env node

// import amqp
const amqp = require('amqplib/callback_api');

// connect to RabbitMQ
amqp.connect('amqp://localhost', (err, conn) => {

  // create a channel
  conn.createChannel((err, ch) => {

    // set up a queue
    const queue = 'rpc.task';
    const reply_queue = 'rpc.task.reply';

    // set up a task
    const task = 'New Task';

    // set up UUID
    const uuid = '1234567890';

    // assert a queue ({durable: true})
    // make sure that RabbitMQ will never lose our queue.
    ch.assertQueue(queue, { durable: true });
    ch.assertQueue(reply_queue, { durable: true });

    // send a task
    ch.sendToQueue(queue, new Buffer(task), { persistent: true, correlationId: uuid, replyTo: reply_queue });

    // wait for reply
    ch.consume(reply_queue, (msg) => {
      console.log(msg.properties.correlationId);

      if (msg.properties.correlationId === uuid) {
        console.log(`Reply: ${msg.content.toString()}`);
        ch.ack(msg);
      }
    }, { noAck: false });
  });
});
