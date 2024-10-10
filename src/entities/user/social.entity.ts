import { Column, Entity, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { UsersEntity } from './users.entity';
import { ISocial } from 'src/shared/interfaces';

@Entity('socials')
export class SocialEntity extends BaseEntity implements ISocial {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: true })
  facebook?: string;

  @Column({ type: 'varchar', nullable: true })
  x?: string;

  @Column({ type: 'varchar', nullable: true })
  instagram?: string;

  @Column({ type: 'varchar', nullable: true })
  linkedin?: string;

  @OneToOne(() => UsersEntity, (user) => user.social)
  user: UsersEntity;
}
