import mongoose from 'mongoose';

import app from './app';
import natsWrapper from './natsWrapper';

const PORT = process.env.PORT || 4001;

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
    console.log(
      'Nats Cluster Id, Client Id, Url: ',
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );
    console.log('Connecting to NATS Index');
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

    // await mongoose.connect(process.env.TASKMATE_MANAGER_DB_URI!, {});
    // console.log('Connected to the database.');
  } catch (err) {
    console.log('Error connecting to NATS: ', err);
  }

  app.listen(PORT, async () => {
    await mongoose.connect(process.env.TASKMATE_MANAGER_DB_URI!, {});
    console.log('Connected to the database taskmatemanager.');
    console.log(`Server is running on port: ${PORT}`);
  });
};

start();
