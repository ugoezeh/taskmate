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

it('Should return a status code of 401 if the email already exist', async () => {
  await request(app).post('/api/users/create').send({
    username: 'ucheche',
    firstName: 'fisrtName',
    lastName: 'lastName',
    email: 'email@email.com',
    password: 'password',
  });
  await request(app)
    .post('/api/users/create')
    .send({
      username: 'ucheche',
      firstName: 'fisrtName',
      lastName: 'lastName',
      email: 'email@email.com',
      password: 'password',
    })
    .expect(401);
});
