import { Request, Response, Router } from 'express';
import { body } from 'express-validator';
import {
  userInputValidation,
  requireAuthentication,
  NotFoundError,
  NotAuthorizedError,
} from '@taskmate/shared';
import Task from '../model/task';

const updateTask = (): Router => {
  const updateTaskRouter: Router = Router();

  updateTaskRouter.patch(
    '/:taskId',
    [
      body('task')
        .notEmpty()
        .isLength({ min: 3, max: 300 })
        .withMessage('Task content is required'),
    ],
    userInputValidation,
    requireAuthentication,
    async (req: Request, res: Response) => {
      const { taskId } = req.params;
      const foundTask = await Task.findById(taskId);
      const { task } = req.body;

      if (!foundTask) {
        throw new NotFoundError('The requested Task could not be found');
      }

      if (foundTask.userId !== req.user.id) {
        throw new NotAuthorizedError(
          'You are not authorized to update this resource, resource not yours'
        );
      }

      foundTask['content'] = task;

      await foundTask.save();
      res.status(200).json(foundTask);
    }
  );

  return updateTaskRouter;
};

export default updateTask;
