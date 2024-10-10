import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IUserAddress } from 'src/shared/interfaces';

export class UserAddressDto implements IUserAddress {
  @IsString()
  @IsOptional()
  @ApiProperty({
    type: 'string',
    example: 'Main Street',
    description: 'Street name',
    required: false,
  })
  street?: string;

  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    example: 'Kathmandu',
    description: 'Name of the selected City',
    required: true,
  })
  city: string;

  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    example: 'provinceId',
    description: 'ID of the selected province',
    required: true,
  })
  provinceId: string;

  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    example: 'districtId',
    description: 'ID of the selected district',
    required: true,
  })
  districtId: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: 'string',
    example: 'Nepal',
    description: 'Country name',
    required: false,
  })
  country?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: 'string',
    example: '44600',
    description: 'Zip code',
    required: false,
  })
  zip_code?: string;
}
