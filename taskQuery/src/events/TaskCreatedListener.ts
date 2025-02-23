import { Message } from 'node-nats-streaming';
import { Subjects, BaseListener, TaskCreatedEvent } from '@taskmate/shared';

import Task from '../models/Task';
import { queueGroupName } from './queueGroupName';

export class TaskCreatedListener extends BaseListener<TaskCreatedEvent> {
  subject: Subjects.taskCreated = Subjects.taskCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: TaskCreatedEvent['data'], msg: Message): Promise<void> {
    const { id, content, userId } = data;
    const task = Task.createNewTask({
      _id: id,
      content,
      userId,
    });
    await task.save();

    console.log('TaskQuery: Task created', task);

    msg.ack();
  }
}
