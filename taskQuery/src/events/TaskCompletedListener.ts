import { Message } from 'node-nats-streaming';
import { Subjects, BaseListener, TaskCompletedEvent } from '@taskmate/shared';

import Task from '../models/Task';
import { queueGroupName } from './queueGroupName';

export class TaskCompletedListener extends BaseListener<TaskCompletedEvent> {
  subject: Subjects.TaskCompleted = Subjects.TaskCompleted;
  queueGroupName = queueGroupName;

  async onMessage(
    data: TaskCompletedEvent['data'],
    msg: Message
  ): Promise<void> {
    const { id, userId, version } = data;
    const foundTask = await Task.findByEventData({ id, userId, version });

    if (!foundTask) {
      throw new Error('Task not found');
    }

    foundTask.set({ completed: true });
    await foundTask.save();

    console.log('TaskQuery - TaskCompletedListener: Task completed', foundTask);

    msg.ack();
  }
}
