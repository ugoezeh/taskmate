import { app } from './app';
import mongoose from 'mongoose';

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
    await mongoose.connect(process.env.TASKMATE_QUERY_DB_URI!, {});
    console.log('Connected to the database.');
  } catch (err) {
    console.log(err);
  }
  app.listen(PORT, () => {
    console.log(`Server started onn port: ${PORT}`);
  });
};

start();
