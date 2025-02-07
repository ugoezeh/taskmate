import mongoose from 'mongoose';

beforeAll(async () => {
  await mongoose.connect(process.env.TASKMATE_MANAGER_DB_URI_TEST!, {});
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

export const personOneCookie = (): string[] => {
  return [
    'session=eyJqd3QiOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKcFpDSTZJalkzT1dKaU1qa3lOelUwTTJWak5HWmxOV1JtTnpCbE1TSXNJblZ6WlhKdVlXMWxJam9pZFdOb1pTSXNJbVZ0WVdsc0lqb2lkV05vWlVCMVkyaGxMbU52YlNJc0luSnZiR1VpT2lKMWMyVnlJaXdpYVdGMElqb3hOek00TWpVM01EUXlmUS5qZkpIS3VoRmpJT3IydlVaMWF2c0l5bk5pTnlnR1FRWE9Ua0JXdXJGTnJnIn0=; path=/; expires=Tue, 11 Feb 2025 17:10:42 GMT; httponly',
    'session.sig=Aow-fVuKQnbpnDVaEf9UXtZuGGM; path=/; expires=Tue, 11 Feb 2025 17:10:42 GMT; httponly',
  ];
};

export const personTwoCookie = (): string[] => {
  return [
    'session=eyJqd3QiOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKcFpDSTZJalkzT1dKaVlXTTJZVFpoTURJMk9EQTVNelZpTURBeE15SXNJblZ6WlhKdVlXMWxJam9pWldSMUlpd2laVzFoYVd3aU9pSmxaSFZBWlcxaGFXd3VZMjl0SWl3aWNtOXNaU0k2SW5WelpYSWlMQ0pwWVhRaU9qRTNNemd5TlRreE5ETjkuSk9jNXc1TGd2c2V6MGVjdGpreTBMVnFNeTNVbWJ0aFFobmhaMngxR0kzNCJ9; path=/; expires=Tue, 11 Feb 2025 17:45:43 GMT; httponly',
    'session.sig=hkF9yKkO3UEZoDXLBGkc7BxDOMY; path=/; expires=Tue, 11 Feb 2025 17:45:43 GMT; httponly',
  ];
};
