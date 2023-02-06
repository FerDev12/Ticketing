import request from 'supertest';
import { app } from '../../app';

const route = '/api/users/signup';

it('returns a 201 on successful signup', async () => {
  return request(app)
    .post(route)
    .send({
      email: 'test@test.com',
      password: 'pass1234',
    })
    .expect(201);
});

it('returns a 400 with an invalid email', async () => {
  return request(app)
    .post(route)
    .send({
      email: 'test.com',
      password: 'pass1234',
    })
    .expect(400);
});

it('returns a 400 with an invalid password', async () => {
  return request(app)
    .post(route)
    .send({
      email: 'test@test.com',
      password: 'pa',
    })
    .expect(400);
});

it('returns a 400 with an empty request body', async () => {
  return request(app).post(route).send({}).expect(400);
});

it('disallows duplicate emails', async () => {
  const body = { email: 'test@test.com', password: 'pass1234' };
  await request(app).post(route).send(body).expect(201);

  return request(app).post(route).send(body).expect(400);
});

it('sets a cookie after successful signup', async () => {
  const res = await request(app)
    .post(route)
    .send({ email: 'test@test.com', password: 'pass1234' })
    .expect(201);

  expect(res.get('Set-Cookie')).toBeDefined();
});
