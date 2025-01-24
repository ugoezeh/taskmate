import request from 'supertest';

import User from '../../models/user';

import app from '../../app';

it('returns 401 if the user is not loggged', async () => {
  const { body } = await request(app).get('/api/users').send().expect(401);
  console.log(body);
});
it("returns 401 if the user's role is not admin", async () => {
  const { body } = await request(app).get('/api/users').send().expect(401);
  console.log(body);
});
