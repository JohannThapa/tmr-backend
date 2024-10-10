import { Column, Entity, ManyToOne } from 'typeorm';
import { ProvinceEntity } from './province.entity';
import { DistrictEntity } from './district.entity';
import { BaseEntity } from '../base.entity';
import { IBaseEntity } from 'src/shared/interfaces';

@Entity('address')
export class AddressEntity extends BaseEntity implements IBaseEntity {
  @ManyToOne(() => ProvinceEntity)
  province: ProvinceEntity;

  @ManyToOne(() => DistrictEntity)
  district: DistrictEntity;

  @Column('varchar', { nullable: false, length: 255, name: 'city' })
  city: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  street?: string;

  @Column({ nullable: true })
  zip_code?: string;

  @Column({ nullable: true })
  country: string;
}
