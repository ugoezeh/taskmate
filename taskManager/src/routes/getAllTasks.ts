import { Router, Request, Response } from 'express';
import { requireAuthentication } from '@taskmate/shared';

import Task from '../model/task';

const getAllTasks = (): Router => {
  const getAllTaskRouter: Router = Router();

  getAllTaskRouter.get(
    '/',
    requireAuthentication,
    async (req: Request, res: Response) => {
      const foundTasks = await Task.find({ userId: req.user.id });

      res.status(200).json(foundTasks);
    }
  );

  return getAllTaskRouter;
};

export default getAllTasks;
