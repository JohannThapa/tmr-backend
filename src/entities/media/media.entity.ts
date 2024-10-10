import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('media')
export class MediaEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  url: string;

  @Column({ type: 'varchar', nullable: false })
  key: string; // S3 key

  @Column({ type: 'varchar', nullable: true })
  mimeType?: string;

  @Column({ type: 'varchar', nullable: true })
  fileName?: string;
}
