export interface IUser {
  _id: string
  name: string
  email: string
  createdAt: Date
  role: string
}

export interface IUserResponse {
  success: boolean
  accessToken: string
  user: IUser
}

export interface IUserLogin {
  username: string
  password: string
}

export interface IUserNewPassword {
  password: string
  newPassword: string
}

export interface IUserRegister extends IUserLogin {
  email: string
  name: string
}

export interface IUsersResponse {
  success: boolean
  found: number
  users: IUser[]
}
