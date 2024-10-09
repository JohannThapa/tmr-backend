import { ECreatorRole, EUserRole, EUserStatus } from '../enums/user.enum';
import { IAddress } from './address.interface';
import { IBaseEntity } from './base.interface';
import { IMediaBase } from './media.interface';

export interface IUser extends IBaseEntity {
  email?: string;
  firstName: string;
  lastName: string;
  username?: string;
  address?: IAddress;
  phone?: string;
  description?: string;
  status?: EUserStatus;
  roles: EUserRole;
  creator?: ECreatorRole;
  social?: string;
  isVerified?: boolean;
  deleted?: boolean;
  avatarId?: string;
  avatar?: IMediaBase;
  twoFactorEnabled?: boolean;
  twoFactorSecret?: string;
}
