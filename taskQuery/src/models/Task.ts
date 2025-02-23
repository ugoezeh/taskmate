import { Schema, model, Model, Document } from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

interface TaskDetails {
  _id: string;
  userId: string;
  content: string;
}

interface TaskDocument extends Document {
  content: string;
  userId: string;
  completed: boolean;
  version: number;
}

interface TaskModel extends Model<TaskDocument> {
  createNewTask(props: TaskDetails): TaskDocument;
  findByEventData(eventData: {
    id: string;
    version: number;
    userId: string;
  }): Promise<TaskDocument | null>;
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
    _id: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
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

taskSchema.set('versionKey', 'version');
taskSchema.plugin(updateIfCurrentPlugin);

taskSchema.statics.findByEventData = (eventData: {
  id: string;
  version: number;
  userId: string;
}) => {
  return Task.findOne({
    _id: eventData.id,
    version: eventData.version - 1,
    userId: eventData.userId,
  });
};
taskSchema.statics.createNewTask = (props: TaskDetails) => {
  return new Task(props);
};

const Task = model<TaskDocument, TaskModel>('Task', taskSchema);

export default Task;
