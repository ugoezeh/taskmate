import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import { requireAuthentication, userInputValidation } from '@taskmate/shared';

import Task from '../model/task';

const createTask = () => {
  const createTaskRouter = Router();

  createTaskRouter.post(
    '/',
    [
      body('task')
        .notEmpty()
        .isLength({ min: 3, max: 300 })
        .withMessage('Task content is required'),
    ],
    userInputValidation,
    requireAuthentication,
    async (req: Request, res: Response) => {
      const { task } = req.body;

      const newTask = Task.createNewTask({
        content: task,
        userId: req.user!.id,
      });
      await newTask.save();

      res.status(201).json(newTask);
    }
  );

  return createTaskRouter;
};

export default createTask;
