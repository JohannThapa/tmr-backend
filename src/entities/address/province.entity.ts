import { Column, Entity, OneToMany } from 'typeorm';
import { DistrictEntity } from './district.entity';
import { BaseEntity } from '../base.entity';
import { IBaseEntity } from 'src/shared/interfaces';

@Entity('province')
export class ProvinceEntity extends BaseEntity implements IBaseEntity {
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @OneToMany(() => DistrictEntity, (district) => district.province)
  districts: DistrictEntity[];
}
