import request from 'supertest';

import app from '../../app';

it('should return 400 if the task is not provided', async () => {
  await request(app).post('/api/tasks/create').send({}).expect(400);
});

it('should return 401 if the person is not logged in', async () => {
  await request(app)
    .post('/api/tasks/create')
    .send({ task: 'Just a random task' })
    .expect(401);
});
