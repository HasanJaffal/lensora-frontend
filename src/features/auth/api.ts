import { apiClient } from '@/lib/api-client'

import { type LoginRequest, type LoginResponse, type UserDto } from './types'

export function login(body: LoginRequest): Promise<LoginResponse> {
  return apiClient.post<LoginResponse>('/auth/login', body)
}

export function fetchCurrentUser(): Promise<UserDto> {
  return apiClient.get<UserDto>('/auth/me')
}
