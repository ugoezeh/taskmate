import { Router, Request, Response } from 'express';
import { requireAuthentication, NotAuthorizedError } from '@taskmate/shared';

import User from '../models/user';

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
