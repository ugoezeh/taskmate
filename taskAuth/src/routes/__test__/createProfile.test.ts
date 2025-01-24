import request from 'supertest';

import app from '../../app';

it('Should return a status code of 400 if the right arguments are not passed', async () => {
  await request(app)
    .post('/api/users/create')
    .send({
      username: 'ucheche',
      firstName: 'fisrtName',
      lastName: 'lastName',
      email: 'email@email.com',
      password: '',
    })
    .expect(400);
});

it('Should return a status code of 201 if the right arguments are passed', async () => {
  const { body } = await request(app)
    .post('/api/users/create')
    .send({
      username: 'ucheche',
      firstName: 'fisrtName',
      lastName: 'lastName',
      email: 'email@email.com',
      password: 'password',
    })
    .expect(201);
});

it('Should return a status code of 400 if the email already exists', async () => {
  await request(app)
    .post('/api/users/create')
    .send({
      username: 'ucheche',
      firstName: 'fisrtName',
      lastName: 'lastName',
      email: 'uche@email.com',
      password: 'password',
    })
    .expect(201);
  await request(app)
    .post('/api/users/create')
    .send({
      username: 'ucheche',
      firstName: 'fisrtName',
      lastName: 'lastName',
      email: 'uche@email.com',
      password: 'password',
    })
    .expect(400);
});
