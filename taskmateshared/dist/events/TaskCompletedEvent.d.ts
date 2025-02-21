import { Subjects } from './subjects';
export interface TaskCompletedEvent {
    subject: Subjects.TaskCompleted;
    data: {
        id: string;
        version: number;
    };
}
