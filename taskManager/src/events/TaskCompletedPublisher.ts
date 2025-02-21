import { Subjects, TaskCompletedEvent, BasePublisher } from '@taskmate/shared';

export class TaskCompletedPublisher extends BasePublisher<TaskCompletedEvent> {
  subject: Subjects.TaskCompleted = Subjects.TaskCompleted;
}
