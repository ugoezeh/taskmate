import mongoose from 'mongoose';

import { app } from './app';
import natsWrapper from './natsWrapper';
import { TaskCreatedListener } from './events/TaskCreatedListener';
import { TaskUpdatedListener } from './events/TaskUpdatedListener';
import { TaskCompletedListener } from './events/TaskCompletedListener';

const PORT = process.env.PORT || 4002;

const start = async (): Promise<void> => {
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error('NATS_CLIENT_ID must be defined');
  }
  if (!process.env.NATS_URL) {
    throw new Error('NATS_URL must be defined');
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error('NATS_CLUSTER_ID must be defined');
  }

  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );
    natsWrapper.client.on('close', () => {
      console.log('Nats connection closed ');
      process.exit();
    });
    console.log('Connected to NATS Index');

    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());

    new TaskCreatedListener(natsWrapper.client).listen();
    new TaskUpdatedListener(natsWrapper.client).listen();
    new TaskCompletedListener(natsWrapper.client).listen();
  } catch (err) {
    console.log('Error connecting to NATS: ', err);
  }

  app.listen(PORT, async () => {
    try {
      await mongoose.connect(process.env.TASKMATE_QUERY_DB_URI!, {});
      console.log('Connected to the database.');
    } catch (err) {
      console.log(err);
    }
    console.log(`Server started onn port: ${PORT}`);
  });
};

start();
