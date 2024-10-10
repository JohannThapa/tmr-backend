import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProvinceEntity } from './province.entity';

@Entity('district')
export class DistrictEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column('simple-array')
  cities: string[];

  @ManyToOne(() => ProvinceEntity, (province) => province.districts)
  province: ProvinceEntity;
}
