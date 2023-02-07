import request from 'supertest';
import { app } from '../../app';

const path = '/api/tickets';
const fakeObjectId = '63e24ff3f2ad43bc378604b9';

// GET TICKET BY ID
it('returns a 400 if the pass id is an invalid ObjectId', async () => {
  await request(app).get(`${path}/asdf`).send().expect(400);
});

it('returns a 404 if the ticket is not found', async () => {
  await request(app).get(`${path}/${fakeObjectId}`).send().expect(404);
});

it('returns the ticket if the ticket is found', async () => {
  const cookie = global.signin();
  const [title, price] = ['asdf', 20];

  const { body } = await request(app)
    .post(path)
    .set('Cookie', cookie)
    .send({ title, price })
    .expect(201);

  const foundTicket = await request(app)
    .get(`${path}/${body.id}`)
    .send()
    .expect(200);

  expect(foundTicket.body.title).toEqual(title);
  expect(foundTicket.body.price).toEqual(price);
});

// UPDATE TICKET BY ID
it('returns a 404 if the proided Id does not exist', async () => {
  const cookie = global.signin();

  await request(app)
    .patch(`${path}/${fakeObjectId}`)
    .set('Cookie', cookie)
    .send({ title: 'asd', price: 20 })
    .expect(404);
});

it('returns a 401 if the user is not authenticated.', async () => {
  await request(app)
    .patch(`${path}/${fakeObjectId}`)
    .send({ title: 'asd', price: 20 })
    .expect(401);
});

it('returns a 401 if the user does not own the ticket', async () => {
  const user1 = global.signin();
  const user2 = global.signin();

  const { body: ticket1 } = await request(app)
    .post(path)
    .set('Cookie', user1)
    .send({ title: 'asd', price: 20 })
    .expect(201);

  await request(app)
    .patch(`${path}/${ticket1.id}`)
    .set('Cookie', user2)
    .send({ title: 'asdf', price: 20 })
    .expect(401);
});

it('returns a 400 if the user provides an invalid title or price', async () => {
  const user = global.signin();

  const { body } = await request(app)
    .post(path)
    .set('Cookie', user)
    .send({ title: 'asdf', price: 20 })
    .expect(201);

  await request(app)
    .patch(`${path}/${body.id}`)
    .set('Cookie', user)
    .send({ title: '', price: 20 })
    .expect(400);

  await request(app)
    .patch(`${path}/${body.id}`)
    .set('Cookie', user)
    .send({ title: 'asdf', price: 0 })
    .expect(400);
});

it('updates the ticket when provided valid inputs', async () => {
  const user = global.signin();

  const [t1, p1] = ['asd', 10];
  const [t2, p2] = ['fda', 20];

  const { body: ticket } = await request(app)
    .post(path)
    .set('Cookie', user)
    .send({ title: t1, price: p1 })
    .expect(201);

  expect(ticket.title).toEqual(t1);
  expect(ticket.price).toEqual(p1);

  const { body: updatedTicket } = await request(app)
    .patch(`${path}/${ticket.id}`)
    .set('Cookie', user)
    .send({ title: t2, price: p2 })
    .expect(200);

  expect(updatedTicket.title).toEqual(t2);
  expect(updatedTicket.price).toEqual(p2);
});
