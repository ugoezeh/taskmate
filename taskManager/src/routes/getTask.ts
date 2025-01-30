import { Router, Request, Response } from 'express';
import {
  requireAuthentication,
  NotFoundError,
  NotAuthorizedError,
} from '@taskmate/shared';

import Task from '../model/task';

const getTask = (): Router => {
  const getTaskRouter: Router = Router();

  getTaskRouter.get(
    '/:taskId',
    requireAuthentication,
    async (req: Request, res: Response) => {
      const { taskId } = req.params;
      const task = await Task.findById(taskId);

      if (!task) {
        throw new NotFoundError('The requested task could not be found!');
      }

      if (task.userId !== req.user.id) {
        throw new NotAuthorizedError(
          'The requested task is not yours and cannot be viewed be you.'
        );
      }

      res.status(200).json(task);
    }
  );

  return getTaskRouter;
};

export default getTask;
