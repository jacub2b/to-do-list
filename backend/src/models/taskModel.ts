import mongoose, { Document, Schema } from 'mongoose';

export interface TaskDocument extends Document {
  text: string;
  completed: boolean;
  id: string;
}

const taskSchema = new Schema<TaskDocument>(
  {
    text: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

taskSchema.virtual('id').get(function (this: TaskDocument) {
  return this._id.toHexString();
});

taskSchema.set('toJSON', {
  virtuals: true,
});

const Task = mongoose.model<TaskDocument>('Task', taskSchema);

export default Task;
