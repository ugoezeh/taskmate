import { config } from 'dotenv';
config();
import 'express-async-errors';
import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import cookieSession from 'cookie-session';
import { confirmUser, errorHandler, NotFoundError } from '@taskmate/shared';

import getUsers from './routes/getUsers';
import createProfile from './routes/signup';
import signinToProfile from './routes/signin';
import signoutOfProfile from './routes/signout';
import getUserProfile from './routes/currentUser';

const app: Application = express();

const isProduction = process.env.NODE_ENV === 'production';

if (isProduction) {
  app.set('trust proxy', 1);
}

if (!isProduction) {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    secure: isProduction,
    maxAge: 12 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_SECRET!],
  })
);

app.use(confirmUser);

app.use('/api/users/signup', createProfile());
app.use('/api/users/signin', signinToProfile());
app.use('/api/users/signout', signoutOfProfile());
app.use('/api/users/currentuser', getUserProfile());
app.use('/api/users', getUsers());

app.all('*', (req: Request, res: Response) => {
  throw new NotFoundError('The requested resource could not be found.');
});

app.use(errorHandler);

export default app;
