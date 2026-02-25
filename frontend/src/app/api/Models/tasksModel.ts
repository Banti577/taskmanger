import mongoose from 'mongoose'; 

import { MTask } from '@/lib/types/ModelInterface/taskmodel.interface';

const taskSchema = new mongoose.Schema <MTask>({
  taskTitle: {
    type: String,
    required: true,
  },
  taskDesc: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Upcoming', 'Current', 'Completed'],
    default: 'Upcoming',
    required: true
  },
  category: {
    type: String,
    enum: ['Design', 'Development', 'Management', 'Finance', 'Operations', 'Sales', 'Other'],
    default: 'Other',
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  }
}, {
  timestamps: true
});

export default mongoose.models.task || mongoose.model <MTask>('task', taskSchema);
