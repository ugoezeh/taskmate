import Subjects from './subjects';

interface TaskCompletedEvent {
  subject: Subjects.TaskCompleted;
  data: {
    id: string;
    version: number;
  };
}
