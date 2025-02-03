import { Router, Request, Response } from 'express';
import { requireAuthentication } from '@taskmate/shared';

import Task from '../model/task';

const deleteAllTasks = (): Router => {
  const deleteAllTasksRouter: Router = Router();

  deleteAllTasksRouter.delete(
    '/',
    requireAuthentication,
    async (req: Request, res: Response) => {
      const taskDeleteResponse = await Task.deleteMany({ userId: req.user.id });

      res.status(200).json(taskDeleteResponse);
    }
  );

  return deleteAllTasksRouter;
};

export default deleteAllTasks;
