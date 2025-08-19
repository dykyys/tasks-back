import { Schema, model } from 'mongoose';

const taskSchema = new Schema(
  {
    title: String,
    description: String,
    status: {
      type: String,
      enum: ['todo', 'in-progress', 'review', 'done', 'blocked', 'canceled'],
      default: 'todo',
    },
    dueDate: Date,
    userId: Schema.Types.ObjectId,
  },
  { versionKey: false, timestamps: true },
);

taskSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  },
});

export const TasksCollection = model('task', taskSchema);
