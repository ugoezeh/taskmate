import request from 'supertest';

import app from '../../app';

import { personOneCookie } from '../../test/setup';

it('Should return the status code of 401 when not logged in', async () => {
  await request(app).get('/api/tasks').send({}).expect(401);
});

it('Should return a status code of 200 when authenticated', async () => {
  await request(app)
    .post('/api/tasks')
    .set('Cookie', personOneCookie())
    .send({ task: 'A Random Task' })
    .expect(201);
  await request(app)
    .post('/api/tasks')
    .set('Cookie', personOneCookie())
    .send({ task: 'A Random Task' })
    .expect(201);

  const allTasks = await request(app)
    .get('/api/tasks')
    .set('Cookie', personOneCookie())
    .send({})
    .expect(200);

  expect(allTasks.body).toHaveLength(2);

  await request(app)
    .delete('/api/tasks')
    .set('Cookie', personOneCookie())
    .send({});

  const allTasks2 = await request(app)
    .get('/api/tasks')
    .set('Cookie', personOneCookie())
    .send({})
    .expect(200);

  expect(allTasks2.body).toHaveLength(0);
});
