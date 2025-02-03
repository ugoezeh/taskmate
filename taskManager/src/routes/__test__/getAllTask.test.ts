import request from 'supertest';

import app from '../../app';

import { personOneCookie } from '../../test/setup';

it('Should return a status code of 401 if the user is not logged in', async () => {
  await request(app).get('/api/tasks').send({}).expect(401);
});

it('Should return an array of objects with each object being a separate task', async () => {
  const respOne = await request(app)
    .post('/api/tasks')
    .set('Cookie', personOneCookie())
    .send({ task: 'Just a random task' })
    .expect(201);
  const respTwo = await request(app)
    .post('/api/tasks')
    .set('Cookie', personOneCookie())
    .send({ task: 'Just a random task' })
    .expect(201);

  const allTasksResp = await request(app)
    .get('/api/tasks')
    .set('Cookie', personOneCookie())
    .send({})
    .expect(200);

  expect(allTasksResp.body).toHaveLength(2);
});
