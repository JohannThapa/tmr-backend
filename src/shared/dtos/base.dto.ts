import { IsDate, IsOptional, IsString } from 'class-validator';
import { IBaseEntity } from '../interfaces';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { transformDate } from '../utils';

export class BaseEntityDto implements IBaseEntity {
  @ApiProperty({
    type: 'string',
    example: '1',
    required: false,
  })
  @IsOptional()
  @IsString()
  id: string;

  @ApiProperty({
    type: 'date',
    example: new Date().toISOString(),
    required: false,
  })
  @IsOptional()
  @IsDate()
  @Transform(({ value }) => transformDate(value))
  createdAt: Date;

  @ApiProperty({
    type: 'date',
    example: new Date().toISOString(),
    required: false,
  })
  @IsOptional()
  @IsDate()
  @Transform(({ value }) => transformDate(value))
  updatedAt: Date;

  @ApiProperty({
    type: 'date',
    example: new Date().toISOString(),
    required: false,
  })
  @IsOptional()
  @IsDate()
  @Transform(({ value }) => transformDate(value))
  deletedAt: Date;
}
