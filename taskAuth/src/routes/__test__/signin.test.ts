import request from 'supertest';

import app from '../../app';

it('Should return a status code of 400 if the right arguments are not passed', async () => {
  const signupResponse = await request(app)
    .post('/api/users/signup')
    .send({ email: 'uche@uche.com', username: 'ucheche', password: 'password' })
    .expect(201);

  const signinResponse = await request(app)
    .post('/api/users/signin')
    .send({
      email: signupResponse.body.email,
      password: 'passwor',
    })
    .expect(400);
});

it('Should return a status code of 200 if the right arguments are passed', async () => {
  const signupResponse = await request(app)
    .post('/api/users/signup')
    .send({ email: 'uche@uche.com', username: 'ucheche', password: 'password' })
    .expect(201);

  const signinResponse = await request(app)
    .post('/api/users/signin')
    .send({
      email: signupResponse.body.email,
      password: 'password',
    })
    .expect(200);
});

it('Sets cookie after a successful signin', async () => {
  const signupResponse = await request(app)
    .post('/api/users/signup')
    .send({ email: 'uche@uche.com', username: 'ucheche', password: 'password' })
    .expect(201);

  const signinResponse = await request(app)
    .post('/api/users/signin')
    .send({
      email: signupResponse.body.email,
      password: 'password',
    })
    .expect(200);
  expect(signinResponse.get('Set-Cookie')).toBeDefined();
});
