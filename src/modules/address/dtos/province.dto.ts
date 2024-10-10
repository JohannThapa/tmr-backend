import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { ADDRESS_ERRORS } from 'src/const/message/errors';
import { IProvince, IProvinceData } from 'src/shared/interfaces';
import { CreateDistrictDto } from './district.dto';
import { BaseEntityDto } from 'src/shared/dtos';

export class ProvinceDto extends BaseEntityDto implements IProvinceData {
  @IsString()
  @ApiProperty({
    type: 'string',
    example: 'Koshi',
    required: true,
  })
  @IsNotEmpty({ message: ADDRESS_ERRORS.name_required })
  name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateDistrictDto)
  @ApiProperty({
    type: [CreateDistrictDto],
    example: [
      {
        name: 'Kathmandu',
        cities: ['Budhanilkantha', 'Kirtipur', 'Tokha'],
      },
      {
        name: 'Lalitpur',
        cities: ['Godawari'],
      },
    ],
    description: 'List of districts with their cities',
  })
  districts: CreateDistrictDto[];
}

export class CreateProvinceDto implements IProvince {
  @IsString()
  @ApiProperty({
    type: 'string',
    example: 'Koshi',
    required: true,
  })
  @IsNotEmpty({ message: ADDRESS_ERRORS.name_required })
  name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateDistrictDto)
  @ApiProperty({
    type: [CreateDistrictDto],
    example: [
      {
        name: 'Kathmandu',
        cities: ['Budhanilkantha', 'Kirtipur', 'Tokha'],
      },
      {
        name: 'Lalitpur',
        cities: ['Godawari'],
      },
    ],
    description: 'List of districts with their cities',
  })
  districts: CreateDistrictDto[];
}

export class UpdateProvinceDto extends PartialType(CreateProvinceDto) {}
