import { Router, Request, Response } from 'express';

import Task from '../model/task';
import { NotAuthorizedError, NotFoundError } from '@taskmate/shared';

const deleteTask = (): Router => {
  const deleteTaskRouter: Router = Router();

  deleteTaskRouter.delete('/:taskId', async (req: Request, res: Response) => {
    const { taskId } = req.params;

    const foundTask = await Task.findById(taskId);

    if (!foundTask) {
      throw new NotFoundError('The requested task could not be found.');
    }

    if (foundTask.userId !== req.user.id) {
      throw new NotAuthorizedError('You can only delete your own resource');
    }

    foundTask.completed = true;
    await foundTask.save();

    res.status(200).json({});
  });
  return deleteTaskRouter;
};

export default deleteTask;
