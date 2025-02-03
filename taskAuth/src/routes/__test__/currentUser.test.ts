import request from 'supertest';

import app from '../../app';

import { getCookieAfterSignup } from '../../test/setup';

it('Returns an object with currentUser set to null if cookie is not set', async () => {
  const response = await request(app)
    .get('/api/users/currentuser')
    .send()
    .expect(200);
  expect(response.body.currentUser).toBeNull();
});

it('Returns an object with currentUser defined, when cookie is set', async () => {
  const cookie = await getCookieAfterSignup(
    'chika',
    'chika@chika.com',
    'password'
  );

  const response = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie!)
    .send()
    .expect(200);
  expect(response.body.currentUser).toBeDefined();
  expect(response.body.currentUser.username).toEqual('chika');
  expect(response.body.currentUser.email).toEqual('chika@chika.com');
});
