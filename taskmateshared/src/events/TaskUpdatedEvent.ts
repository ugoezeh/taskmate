import { Subjects } from './subjects';

export interface TaskUpdatedEvent {
  subject: Subjects.taskUpdated;
  data: {
    id: string;
    version: number;
    userId: string;
    content: string;
  };
}
