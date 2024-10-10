import {
  Column,
  Entity,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { BaseEntity } from '../base.entity';
import {
  EAdminRole,
  ECreatorRole,
  EReaderRole,
  EUserRole,
  EUserStatus,
} from 'src/shared/enums';
import { SocialEntity } from './social.entity';
import { UserAddressEntity } from './user-address.entity';

@Entity('users')
export class UsersEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 50, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 100 })
  firstName: string;

  @Column({ type: 'varchar', length: 100 })
  lastName: string;

  @Column({ type: 'varchar', length: 150, unique: true })
  email: string;

  // @Column({ type: 'enum', enum: EUserRole })
  // role: EUserRole;

  @Column('simple-array')
  roles: EUserRole[];

  @Column({ type: 'enum', enum: EAdminRole, nullable: true })
  admin?: EAdminRole;

  @Column({ type: 'enum', enum: EReaderRole, nullable: true })
  reader?: EReaderRole;

  @Column({ type: 'enum', enum: ECreatorRole, nullable: true })
  creator?: ECreatorRole;

  @OneToOne(() => SocialEntity, { nullable: true, cascade: true })
  @JoinColumn()
  social?: SocialEntity;

  @OneToOne(() => UserAddressEntity, { nullable: true, cascade: true })
  @JoinColumn()
  address?: UserAddressEntity;

  @Column({ type: 'enum', enum: EUserStatus, nullable: true })
  status?: EUserStatus;

  @Column({ type: 'varchar', nullable: true })
  phone?: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'boolean', default: false })
  isVerified?: boolean;

  @Column({ type: 'boolean', default: false })
  deleted?: boolean;

  @Column({ type: 'boolean', default: false })
  twoFactorEnabled?: boolean;

  @Column({ type: 'varchar', nullable: true })
  twoFactorSecret?: string;

  @Column({ type: 'varchar', select: false })
  password: string;
}
