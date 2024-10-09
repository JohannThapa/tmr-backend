import { EMediaSource, EMediaType } from '../enums/media.enum';
import { IBaseEntity } from './base.interface';
import { IUser } from './user.interface';

export interface IMediaBase extends IBaseEntity {
  fileName: string;
  fileType: string;
  fileSize: number;
  uploadedAt: Date;
  fileUrl: string;
  alt?: string;
  ext?: string;
  hash?: string;
  width?: number;
  height?: number;
  size?: number;
  url?: string;
  createdById?: string;
  createdBy?: IUser;
  type?: EMediaType;
  source?: EMediaSource;
}
