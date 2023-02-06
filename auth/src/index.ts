import http from 'http';
import mongoose from 'mongoose';
import { app } from './app';

const server = http.createServer(app);

function start() {
  // Environment Variable checks
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }

  const SRVNAME = 'auth-mongo-cluster-ip-service:27017';
  const DBNAME = 'auth';
  const APPPORT = 3000;

  mongoose
    .connect(`mongodb://${SRVNAME}/${DBNAME}`)
    .then(() => {
      console.log(`Connected to auth mongo`);
      server.listen(APPPORT, () => console.log(`Listening on port ${APPPORT}`));
    })
    .catch((err) => console.log(err));
}

start();
