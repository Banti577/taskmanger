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

export interface User {
  id: string;
  fullname: string;
  email: string;
  gender: string;
  exp: number;
  iat: number;
}

export interface AuthResponse {
  msg: string;
  user: User;
}



export interface FormErrorsInterface {
    fullname?: string;
    email: string;
    password: string;
    gender?: string;
}