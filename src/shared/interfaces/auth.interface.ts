import { EAuthTokenType } from '../enums/auth.enum';
import { EUserRole } from '../enums/user.enum';
import { IUser } from './user.interface';

export interface IAuthUser {
  tokenId: string;
  user: IUser;
  tokenType: EAuthTokenType;
  token: string;
  role: EUserRole;
  expiresAt: Date;
  createdAt: Date;
  lastLogin?: Date;
}

export interface IAuthRefreshToken {
  refreshToken: string;
}

export type IAuthInfoToken = {
  userId: string;
};

export interface IRefreshToken {
  id: string;
  userId: string;
  isRevoked: boolean;
  expiresAt: Date;
}

// Payloads

export interface IPayload {
  userId: string;
  username: string;
  roles: EUserRole;
}
export interface IJwtPayload {
  sub: string; // User ID
  username: string;
  roles: string[];
}
export interface TokenPayload extends IPayload {
  // userId: string;
  // username: string;
  // roles: string[];
  exp?: number;
  iat?: number;
}
export interface ILoginPayload {
  email: string;
  password: string;
}

export interface IAuthRefreshToken {
  refreshToken: string;
}

export interface IRegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: EUserRole;
}

export interface IResetPasswordPayload {
  token: string;
  newPassword: string;
  confirmPassword: string;
}
export interface IForgotPasswordPayload {
  email: string;
}

export interface EmailVerificationPayload {
  token: string;
}

export interface RefreshTokenPayload {
  refreshToken: string;
}

export interface IForgotPasswordPayload {
  email: string;
}

// Response
export interface LoginResponse {
  token: string;
  refreshToken?: string;
  user: IAuthUser;
}
export interface RegisterResponse {
  success: boolean;
  message: string;
  user: IAuthUser;
}

export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
}
export interface ResetPasswordResponse {
  success: boolean;
  message: string;
}

export interface EmailVerificationResponse {
  success: boolean;
  message: string;
}

export interface RefreshTokenResponse {
  token: string;
  refreshToken?: string;
}

export interface IJwtTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface ILoginResult {
  user: IAuthUser;
  tokens: IJwtTokenResponse;
}

export interface IDuplicateResult {
  isExisting: boolean;
  message: string;
  user?: IUser;
}
