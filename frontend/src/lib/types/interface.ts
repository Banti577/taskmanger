export interface AuthUser {
  id: string,
  fullName: string,
  fullname?: string,
  email: string,
  gender: string,
  iat: number

}
export interface AuthState {
  user: AuthUser | null,
  accessToken: string | null,
  isLoading: boolean,
  isChecked: boolean

}

export interface User {
  id: string,
  fullName?: string,
  email: string,
  gender: string,
  exp: number,
  iat: number,
}

export interface AuthResponse {
  msg: string;
  user: User;
  accessToken: string
}



export interface FormErrorsInterface {
  fullname?: string;
  email: string;
  password: string;
  gender?: string;
}