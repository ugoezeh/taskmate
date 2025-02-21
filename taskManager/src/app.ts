import { config } from 'dotenv';
config();
import 'express-async-errors';
import express, { Application, Request, Response } from 'express';
import cookieSession from 'cookie-session';
import morgan from 'morgan';
import { NotFoundError, confirmUser, errorHandler } from '@taskmate/shared';

import createTask from './routes/createTask';
import updateTask from './routes/updateTask';
import getTask from './routes/getTask';
import deleteTask from './routes/deleteTask';
import getAllTasks from './routes/getAllTasks';
import deleteAllTasks from './routes/deleteAllTasks';

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

app.use('/api/tasks', getTask());
app.use('/api/tasks', updateTask());
app.use('/api/tasks', deleteTask());
app.use('/api/tasks', getAllTasks());
app.use('/api/tasks', createTask());
app.use('/api/tasks', deleteAllTasks());

app.all('*', async (req: Request, res: Response) => {
  throw new NotFoundError('The requested resource could not be found.');
});

app.use(errorHandler);

export default app;
