import { Column, Entity, OneToOne } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { IUserAddress } from 'src/shared/interfaces';
import { UsersEntity } from './users.entity';

@Entity('user_address')
export class UserAddressEntity extends BaseEntity implements IUserAddress {
  @Column({ type: 'varchar', nullable: true })
  street?: string;

  @Column({ type: 'varchar', nullable: false })
  city: string;

  @Column({ type: 'varchar', nullable: false })
  provinceId: string;

  @Column({ type: 'varchar', nullable: false })
  districtId: string;

  @Column({ type: 'varchar', nullable: true })
  country?: string;

  @Column({ type: 'varchar', nullable: true })
  zip_code?: string;

  @OneToOne(() => UsersEntity, (user) => user.address)
  user: UsersEntity;
}
