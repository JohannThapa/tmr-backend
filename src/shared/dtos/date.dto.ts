import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate } from 'class-validator';
import { transformDate } from '../utils';

export class DateRangeDto {
  @IsDate()
  @ApiProperty({
    type: 'date',
    example: new Date().toISOString(),
    required: false,
  })
  @Transform(({ value }) => transformDate(value))
  startDate: Date;

  @IsDate()
  @ApiProperty({
    type: 'date',
    example: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    required: false,
  })
  @Transform(({ value }) => transformDate(value))
  endDate: Date;
}
