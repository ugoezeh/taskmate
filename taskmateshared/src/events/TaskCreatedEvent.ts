import { Subjects } from './subjects';

export interface TaskCreatedEvent {
  subject: Subjects.taskCreated;
  data: {
    id: string;
    version: number;
    userId: string;
    content: string;
  };
}
