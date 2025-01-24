import mongoose from 'mongoose';

beforeAll(async () => {
  await mongoose.connect(process.env.DB_TEST_URI_LOCAL!, {});
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
