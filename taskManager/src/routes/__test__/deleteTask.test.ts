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

it('returns a status code of 401 if not your task', async () => {
  const taskToDelete = await request(app)
    .post('/api/tasks')
    .set('Cookie', personOneCookie())
    .send({ task: 'Some random task' });
  expect(201);

  await request(app)
    .delete(`/api/tasks/${taskToDelete.body.id}`)
    .set('Cookie', personTwoCookie())
    .send({})
    .expect(401);
});

it("returns a status code of 200 if logged in and it's your task", async () => {
  const taskToDelete = await request(app)
    .post('/api/tasks')
    .set('Cookie', personOneCookie())
    .send({ task: 'Some random task' });
  expect(201);

  await request(app)
    .delete(`/api/tasks/${taskToDelete.body.id}`)
    .set('Cookie', personOneCookie())
    .send({})
    .expect(200);
});
