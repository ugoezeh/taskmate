import { Subjects, BasePublisher, TaskUpdatedEvent } from '@taskmate/shared';

class TaskUpdatedPublisher extends BasePublisher<TaskUpdatedEvent> {
  subject: Subjects.taskUpdated = Subjects.taskUpdated;
}

export default TaskUpdatedPublisher;
