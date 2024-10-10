import {
  EAdminRole,
  ECreatorRole,
  EReaderRole,
  EUserRole,
  EUserStatus,
} from '../enums/user.enum';
// import { IAddress } from './address.interface';
import { IBaseEntity } from './base.interface';
// import { IMediaBase } from './media.interface';
import { ISocial } from './social.interface';

export interface IUserAddress {
  street?: string;
  city: string;
  provinceId: string;
  districtId: string;
  country?: string;
  zip_code?: string;
}

export interface IUser extends IBaseEntity {
  email?: string;
  firstName: string;
  lastName: string;
  username?: string;
  address?: IUserAddress;
  phone?: string;
  password?: string;
  description?: string;
  status?: EUserStatus;
  roles: EUserRole[];
  creator?: ECreatorRole;
  reader?: EReaderRole;
  admin?: EAdminRole;
  social?: ISocial;
  isVerified?: boolean;
  deleted?: boolean;
  // avatar?: IMediaBase;
  twoFactorEnabled?: boolean;
  twoFactorSecret?: string;
}

export interface ICreateUser extends IBaseEntity {
  email: string;
  firstName: string;
  lastName: string;
  username?: string;
  password?: string;
  // avatar?: string;
  role?: EUserRole;
  creator?: ECreatorRole;
  reader?: EReaderRole;
  admin?: EAdminRole;
  status?: EUserStatus;
  address?: string;
  phone?: string;
  description?: string;
  isVerified?: boolean;
}

export interface IUpdateUser extends Partial<ICreateUser> {
  id: string;
}
