import request from 'supertest';

import app from '../../app';

it('returns 401 if the user is not loggged in', async () => {
  const { body } = await request(app).get('/api/users').send().expect(401);
});
it("returns 401 if the user's role is not admin", async () => {
  const { body } = await request(app).get('/api/users').send().expect(401);
});
