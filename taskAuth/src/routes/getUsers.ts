import { Router, Request, Response } from 'express';

import User from '../models/user';
import requireAuthentication from '../middlewares/requireAuthentication';
import NotAuthorizedError from '../errors/NotAuthorizedError';

const getUsers = (): Router => {
  const getUsersRouter = Router();

  getUsersRouter.get(
    '/',
    requireAuthentication,
    async (req: Request, res: Response): Promise<void> => {
      if (req.user && req.user.role === 'admin') {
        const users = await User.find({});
        res.status(200).json(users);
        return;
      }
      throw new NotAuthorizedError(
        'You are not authorized to view this resource'
      );
    }
  );

  return getUsersRouter;
};

export default getUsers;
