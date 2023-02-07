import request from 'supertest';
import { app } from '../../app';

const path = '/api/tickets';

const createTicket = async () =>
  await request(app)
    .post(path)
    .set('Cookie', global.signin())
    .send({ title: Math.random().toString(), price: 20 });

// GET ALL TICKETS
it('can fetch a list of tickets', async () => {
  await createTicket();
  await createTicket();
  await createTicket();

  const { body } = await request(app).get(path).send().expect(200);

  expect(body.length).toEqual(3);
});

// CREATE NEW TICKET
it('has a route handler listening to /api/tickets for post requests', async () => {
  const res = await request(app).post(path).send({});

  expect(res.status).not.toEqual(404);
});

it('can only be accessed if the user is signed in', async () => {
  await request(app).post(path).send({}).expect(401);
});

it('returns a status other than 401 if the user is signed in', async () => {
  // Sign user in
  const cookie = global.signin();

  const res = await request(app).post(path).set('Cookie', cookie).send({});

  expect(res.status).not.toEqual(401);
});

it('returns an error if an invalid title is provided', async () => {
  const cookie = global.signin();

  await request(app)
    .post(path)
    .set('Cookie', cookie)
    .send({ title: '', price: 10 })
    .expect(400);

  await request(app)
    .post(path)
    .set('Cookie', cookie)
    .send({ price: 10 })
    .expect(400);
});

it('returns an error if an invalid price is provided', async () => {
  const cookie = global.signin();

  await request(app)
    .post(path)
    .set('Cookie', cookie)
    .send({ title: 'asdf', price: -10 })
    .expect(400);

  await request(app)
    .post(path)
    .set('Cookie', cookie)
    .send({ title: 'fdsa' })
    .expect(400);
});

it('creates a ticket with valid paramters', async () => {
  // Add in check to make sure a ticket was saved
  let { body: tickets } = await request(app).get(path).expect(200);

  expect(tickets.length).toEqual(0);

  const cookie = global.signin();

  const [title, price] = ['asdf', 20];

  await request(app)
    .post(path)
    .set('Cookie', cookie)
    .send({ title, price })
    .expect(201);

  const { body } = await request(app).get(path).expect(200);
  tickets = body;

  expect(tickets.length).toEqual(1);
  expect(tickets[0].price).toEqual(price);
  expect(tickets[0].title).toEqual(title);
});

it('returns an error if a ticket with the same title already exists', async () => {
  const cookie = global.signin();

  let { body: tickets } = await request(app).get(path).expect(200);

  expect(tickets.length).toEqual(0);

  const [title, price] = ['asdf', 20];

  await request(app)
    .post(path)
    .set('Cookie', cookie)
    .send({ title, price })
    .expect(201);

  const { body } = await request(app).get(path).expect(200);
  tickets = body;

  expect(tickets.length).toEqual(1);
  expect(tickets[0].price).toEqual(price);
  expect(tickets[0].title).toEqual(title);

  await request(app)
    .post(path)
    .set('Cookie', cookie)
    .send({ title, price })
    .expect(400);
});
