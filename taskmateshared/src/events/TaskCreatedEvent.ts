import Subjects from './subjects';

interface TaskCreatedEvent {
  subject: Subjects.taskCreated;
  data: {
    id: string;
    version: number;
    userId: string;
    content: string;
  };
}

export default TaskCreatedEvent;
