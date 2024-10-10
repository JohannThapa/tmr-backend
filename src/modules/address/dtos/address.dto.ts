import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateProvinceDto } from './province.dto';
import { CreateDistrictDto } from './district.dto';
import { BaseEntityDto } from 'src/shared/dtos';
import { IAddress } from 'src/shared/interfaces';

export class AddressDto extends BaseEntityDto implements IAddress {
  @IsNotEmpty()
  @ApiProperty({
    type: () => CreateProvinceDto,
    description: 'Province details',
    required: true,
  })
  province: CreateProvinceDto;

  @IsNotEmpty()
  @ApiProperty({
    type: () => CreateDistrictDto,
    description: 'District details',
    required: true,
  })
  district: CreateDistrictDto;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    example: 'Kathmandu',
    description: 'City name',
    required: true,
  })
  city: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: 'string',
    example: 'Main Street',
    description: 'Street name',
    required: false,
  })
  street?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: 'string',
    example: '44600',
    description: 'Zip code',
    required: false,
  })
  zip_code?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    example: 'Nepal',
    description: 'Country name',
    required: true,
  })
  country: string;
}

export class CreateAddressDto extends AddressDto {}

export class UpdateAddressDto extends PartialType(CreateAddressDto) {}
