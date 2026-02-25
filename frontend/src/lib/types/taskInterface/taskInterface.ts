import { Types } from 'mongoose'

export interface Tasks {
    taskTitle: string,
    taskDesc: string,
    status: 'Upcoming' | 'Current' | 'Completed',
    category: 'Design' | 'Development' | 'Management' | 'Finance' | 'Operations' | 'Sales' | 'Other',
}


