import { Request, Response, Router } from 'express';
import { requireAuthentication, NotFoundError } from '@taskmate/shared';

import Task from '../models/Task';

const getTask = (): Router => {
  const getTaskRouter: Router = Router();

  getTaskRouter.get(
    '/:queryId',
    requireAuthentication,
    async (req: Request, res: Response) => {
      const task = await Task.findOne({
        _id: req.params.queryId,
        userId: req.user!.id,
        completed: false,
      });

      if (!task) {
        throw new NotFoundError('The requested task could not be found.');
      }

      res.status(200).json(task);
    }
  );

  return getTaskRouter;
};

export default getTask;
