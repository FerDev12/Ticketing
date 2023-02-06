import http from 'http';
import mongoose from 'mongoose';
import { app } from './app';

const server = http.createServer(app);

function start() {
  // Environment Variable checks
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }

  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }
  const APPPORT = 3000;

  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log(`Connected to auth mongo`);
      server.listen(APPPORT, () => console.log(`Listening on port ${APPPORT}`));
    })
    .catch((err) => console.log(err));
}

start();
