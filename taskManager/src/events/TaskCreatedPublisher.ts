import { Subjects, TaskCreatedEvent, BasePublisher } from '@taskmate/shared';

export class TaskCreatedPublisher extends BasePublisher<TaskCreatedEvent> {
  subject: Subjects.taskCreated = Subjects.taskCreated;
}
