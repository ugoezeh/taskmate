import mongoose from 'mongoose';

import app from './app';
const port = process.env.PORT || 8080;

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URI_LOCAL!, {});
    console.log('Connected to database');
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.error(error);
  }
};

start();
