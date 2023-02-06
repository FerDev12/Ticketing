import request from 'supertest';
import { app } from '../../app';

const signupRoute = '/api/users/signup';
const signoutRoute = '/api/users/signout';

it('clears the cookie after signing out', async () => {
  const res = await request(app)
    .post(signupRoute)
    .send({ email: 'test@test.com', password: 'pass1234' })
    .expect(201);

  expect(res.get('Set-Cookie')).toBeDefined();

  const res2 = await request(app).post(signoutRoute).send({}).expect(200);

  expect(res2.get('Set-Cookie')[0]).toEqual(
    'session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly'
  );
});
