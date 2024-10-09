import { EUserRole, EUserStatus } from '../enums/user.enum';

export type IUserRole = (typeof EUserRole)[keyof typeof EUserRole];

export type IUserStatus = (typeof EUserStatus)[keyof typeof EUserStatus];
