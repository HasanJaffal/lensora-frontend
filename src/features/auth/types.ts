export type UserDto = {
  id: string
  email: string
  displayNameEn: string
  displayNameAr: string
  role: string
}

export type LoginRequest = {
  email: string
  password: string
}

export type LoginResponse = {
  accessToken: string
  user: UserDto
}
