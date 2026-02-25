import { Types } from 'mongoose';
import { Document } from 'mongoose';

export interface ITask {
    taskTitle: string,
    taskDesc: string,
    status: 'Upcoming' | 'Current' | 'Completed',
    category: 'Design' | 'Development' | 'Management' | 'Finance' | 'Operations' | 'Sales' | 'Other',
    createdBy: Types.ObjectId,

}

export interface MTask extends ITask, Document { }