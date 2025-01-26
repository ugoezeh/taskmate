import request from 'supertest';

import app from '../../app';

it('should sign a user out', async () => {
  const response = await request(app)
    .post('/api/users/signout')
    .send({})
    .expect(200);
});
