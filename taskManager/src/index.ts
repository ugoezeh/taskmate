import mongoose from 'mongoose';

import app from './app';

const PORT = process.env.PORT || 4001;

const start = async (): Promise<void> => {
  await mongoose.connect(process.env.TASKMATE_MANAGER_DB_URI!, {});
  console.log('Connected to Databse');
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
};

start();
