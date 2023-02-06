import request from 'supertest';
import { app } from '../../app';

const signupRoute = '/api/users/signup';
const signinRoute = '/api/users/signin';

it('fails when an incorrect password is supplied', async () => {
  const email = 'test@test.com';
  const password1 = 'pass1234';
  const password2 = 'pass';
  await request(app)
    .post(signupRoute)
    .send({ email: email, password: password1 })
    .expect(201);

  return request(app)
    .post(signinRoute)
    .send({ email: email, password: password2 })
    .expect(400);
});
