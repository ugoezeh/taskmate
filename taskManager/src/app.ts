import { config } from 'dotenv';
config();
import 'express-async-errors';
import express, { Application } from 'express';
import cookieSession from 'cookie-session';
import morgan from 'morgan';

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
app.use(cookieSession({ signed: false, secure: false }));
app.use(
  cookieSession({
    secure: isProduction,
    sameSite: 'lax',
    maxAge: 12 * 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_SECRET!],
  })
);

export default app;
