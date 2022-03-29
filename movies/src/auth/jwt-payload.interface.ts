export enum UserRole {
  BASIC = 'basic',
  PREMIUM = 'premium',
}

export interface JwtPayload {
  userId: number,
  name: string,
  role: UserRole,
}
