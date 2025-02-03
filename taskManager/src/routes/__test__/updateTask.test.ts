import request from 'supertest';
import mongoose from 'mongoose';

import app from '../../app';

import { personOneCookie, personTwoCookie } from '../../test/setup';

it('returns a status code of 404 if the task does not exist', async () => {
  const fakeTaskId = new mongoose.Types.ObjectId().toString('hex');

  await request(app)
    .get(`/api/tasks/${fakeTaskId}`)
    .set('Cookie', personOneCookie())
    .send({})
    .expect(404);
});

it('returns a status code of 401 if the person is not logged in', async () => {
  const createdTask = await request(app)
    .post('/api/tasks')
    .set('Cookie', personOneCookie())
    .send({ task: 'Created Task' })
    .expect(201);

  const updatedTask = await request(app)
    .patch(`/api/tasks/${createdTask.body.id}`)
    .send({ task: 'updated Task' })
    .expect(401);
});
it('returns a status code of 400 if task is not provided', async () => {
  const createdTask = await request(app)
    .post('/api/tasks')
    .set('Cookie', personOneCookie())
    .send({ task: 'Created Task' })
    .expect(201);

  const updatedTask = await request(app)
    .patch(`/api/tasks/${createdTask.body.id}`)
    .set('Cookie', personOneCookie())
    .send({})
    .expect(400);
});

it("returns a status code of 401 if you tried to update another's task", async () => {
  const createdTask = await request(app)
    .post('/api/tasks')
    .set('Cookie', personOneCookie())
    .send({ task: 'Created Task' })
    .expect(201);

  const updatedTask = await request(app)
    .patch(`/api/tasks/${createdTask.body.id}`)
    .set('Cookie', personTwoCookie())
    .send({ task: 'updated Task' })
    .expect(401);
});

it('returns a status code of 200 if the person is logged in', async () => {
  const createdTask = await request(app)
    .post('/api/tasks')
    .set('Cookie', personOneCookie())
    .send({ task: 'Created Task' })
    .expect(201);

  const updatedTask = await request(app)
    .patch(`/api/tasks/${createdTask.body.id}`)
    .set('Cookie', personOneCookie())
    .send({ task: 'updated Task' })
    .expect(200);
});
