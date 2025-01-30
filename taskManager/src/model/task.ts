import { Schema, model, Model, Document } from 'mongoose';

interface TaskDetails {
  userId: string;
  content: string;
}

interface TaskDocument extends Document {
  content: string;
  userId: string;
}

interface TaskModel extends Model<TaskDocument> {
  createNewTask(props: TaskDetails): TaskDocument;
}

const taskSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

taskSchema.statics.createNewTask = (props: TaskDetails) => {
  return new Task(props);
};

const Task = model<TaskDocument, TaskModel>('Task', taskSchema);

export default Task;
