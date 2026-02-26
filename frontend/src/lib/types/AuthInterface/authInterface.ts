export interface LoginUser {
    email: string;
    password: string;
}

export interface SignupUser extends LoginUser {
    fullname: string,
    email: string,
    password: string,
    gender: string
}




