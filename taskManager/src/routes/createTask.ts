import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import { requireAuthentication, userInputValidation } from '@taskmate/shared';

import Task from '../model/task';
import { TaskCreatedPublisher } from '../events/TaskCreatedPublisher';
import natsWrapper from '../natsWrapper';

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
      await new TaskCreatedPublisher(natsWrapper.client).publish({
        id: newTask.id,
        userId: newTask.userId,
        content: newTask.content,
        version: newTask.version,
      });

      res.status(201).json(newTask);
    }
  );

  return createTaskRouter;
};

export default createTask;
