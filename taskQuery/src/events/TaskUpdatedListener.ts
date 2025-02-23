import { Message } from 'node-nats-streaming';
import { Subjects, BaseListener, TaskUpdatedEvent } from '@taskmate/shared';

import { queueGroupName } from './queueGroupName';
import Task from '../models/Task';

export class TaskUpdatedListener extends BaseListener<TaskUpdatedEvent> {
  subject: Subjects.taskUpdated = Subjects.taskUpdated;
  queueGroupName = queueGroupName;

  async onMessage(data: TaskUpdatedEvent['data'], msg: Message): Promise<void> {
    const { id, content, userId, version } = data;
    const foundTask = await Task.findByEventData({ id, userId, version });
    console.log('TaskQuery - TaskUpdatedListener: Task found', foundTask);

    if (!foundTask) {
      throw new Error('Task not found');
    }

    foundTask.set({ content });
    await foundTask.save();

    console.log('TaskQuery - TaskUpdatedListener: Task updated', foundTask);

    msg.ack();
  }
}
