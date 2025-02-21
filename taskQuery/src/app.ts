import { config } from 'dotenv';
config();

import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import cookieSession from 'cookie-session';
import { NotFoundError, errorHandler, confirmUser } from '@taskmate/shared';

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
    sameSite: 'lax',
    maxAge: 12 * 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_SECRET!],
  })
);
app.use(confirmUser);

app.all('*', (req: Request, res: Response) => {
  throw new NotFoundError('The requested resource could not be found.');
});

app.use(errorHandler);

export { app };
