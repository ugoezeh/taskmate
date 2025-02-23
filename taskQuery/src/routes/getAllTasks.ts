import { Request, Response, Router } from 'express';
import { requireAuthentication } from '@taskmate/shared';

import Task from '../models/Task';

const getAllTasks = (): Router => {
  const getAllTasksRouter = Router();

  getAllTasksRouter.get(
    '/',
    requireAuthentication,
    async (req: Request, res: Response) => {
      const tasks = await Task.find({ userId: req.user!.id, completed: false });

      res.status(200).json(tasks);
    }
  );

  return getAllTasksRouter;
};

export default getAllTasks;
