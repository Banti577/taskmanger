import { Types } from 'mongoose'

export interface Tasks {
    taskTitle: string,
    taskDesc: string,
    status: 'Upcoming' | 'Current' | 'Completed',
    category: 'Design' | 'Development' | 'Management' | 'Finance' | 'Operations' | 'Sales' | 'Other',
}


export interface AuthUser {
    id: string,
    fullname: string,
    email: string,
    gender: string,
    iat: number

}
export interface AuthState {
    user: AuthUser | null,
    isLoading: boolean,
    isChecked: boolean

}

export interface FormErrorsInterface {
    fullname?: string;
    email: string;
    password: string;
    gender?: string;
}

export interface Task {
    taskTitle: string,
    taskDesc: string,
    status: string,
    category: string,
}

export interface TaskDocument extends Task {
    createdAt: string,
    createdBy: string,
    updatedAt: string,
    _id: string,
    __v: string
}
export interface TaskCardProps {
    tasks: TaskDocument[];
}






