export interface UserInterface {
    fullname?: string,
    email: string,
    password: string,
    gender?: string

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

