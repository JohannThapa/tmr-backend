import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateDistrictDto {
  @IsString()
  @ApiProperty({
    type: 'string',
    example: 'Kathmandu',
    description: 'Name of the district',
    required: true,
  })
  @IsNotEmpty({ message: 'District name is required' })
  name: string;

  @IsArray()
  @IsString({ each: true })
  @ApiProperty({
    type: [String],
    example: ['Budhanilkantha', 'Kirtipur', 'Tokha'],
    description: 'List of cities in the district',
    required: true,
  })
  @IsNotEmpty({ message: 'Cities list is required' })
  cities: string[];
}

export class UpdateDistrictDto extends PartialType(CreateDistrictDto) {}
