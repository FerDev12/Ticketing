import express from 'express';
import cookieSession from 'cookie-session';
import { NotFoundError, errorHandler } from '@fertickets/common-2';

const app = express();

// Trust our Ingess-nginx proxy
app.set('trust proxy', true);

// GLOBAL MIDDLEWARE
// Parse the body of incoming requests
app.use(express.json());
app.use(
  // Creates a session object on req.session that can be acccessed on every request
  cookieSession({
    // Not encrypted to avoid problems if we have another server
    // written in different language
    signed: false,
    secure: process.env.NODE_ENV !== 'test', // httpOnly
  })
);

// Routes

// Handle non existing routes
app.all('*', () => {
  throw new NotFoundError();
});

// Global error handling
app.use(errorHandler);

export { app };
