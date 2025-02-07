import mongoose from 'mongoose';
import request from 'supertest';

import app from '../app';

beforeAll(async () => {
  await mongoose.connect(process.env.TASKMATE_AUTH_DB_URI_TEST!, {});
});

beforeEach(async () => {
  if (mongoose.connection.db) {
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
      await collection.deleteMany({});
    }
  }
});

afterAll(async () => {
  await mongoose.connection.close();
});

export const getCookieAfterSignup = async (
  username: string,
  email: string,
  password: string
) => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({ username, email, password });

  const cookie = response.get('Set-Cookie');
  return cookie;
};
