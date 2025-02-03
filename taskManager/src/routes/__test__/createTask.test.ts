import request from 'supertest';

import app from '../../app';

import { personOneCookie } from '../../test/setup';

it('should return a status of 400 if the task is not provided', async () => {
  await request(app).post('/api/tasks').send({}).expect(400);
});

it('should return a status of 401 if the person is not logged in', async () => {
  await request(app)
    .post('/api/tasks')
    .send({ task: 'Just a random task' })
    .expect(401);
});

it('should return status of 201 if the person is logged in', async () => {
  const response = await request(app)
    .post('/api/tasks')
    .set('Cookie', personOneCookie())
    .send({ task: 'Just a random task' })
    .expect(201);
});
