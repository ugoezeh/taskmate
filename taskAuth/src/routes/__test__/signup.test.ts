import request from 'supertest';

import app from '../../app';

it('Should return a status code of 400 if the right arguments are not passed to the request body', async () => {
  const { body } = await request(app)
    .post('/api/users/signup')
    .send({
      username: 'ucheche',
      email: 'email@email.com',
      password: 'pa',
    })
    .expect(400);
});

it('Should return a status code of 201 if the right arguments are passed to the request body', async () => {
  const { body } = await request(app)
    .post('/api/users/signup')
    .send({
      username: 'ucheche',
      email: 'email@email.com',
      password: 'password',
    })
    .expect(201);
});

it('Should return a status code of 400 if the email already exists', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      username: 'ucheche',
      email: 'uche@email.com',
      password: 'password',
    })
    .expect(201);
  await request(app)
    .post('/api/users/signup')
    .send({
      username: 'ucheche',
      email: 'uche@email.com',
      password: 'password',
    })
    .expect(400);
});

it('Sets a cookie after a successfull signup', async () => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({ username: 'edu', email: 'edu@email.com', password: 'password' })
    .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();
  console.log(response.get('Set-Cookie'));
});
