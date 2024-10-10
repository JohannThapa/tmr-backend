import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ISocial } from 'src/shared/interfaces';

export class SocialDto implements ISocial {
  @IsString()
  @IsOptional()
  @ApiProperty({
    type: 'string',
    example: 'https://www.facebook.com/',
    description: 'Facebook URL',
    required: false,
  })
  facebook?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: 'string',
    example: 'https://www.facebook.com/',
    description: 'Facebook URL',
    required: false,
  })
  x?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: 'string',
    example: 'https://www.facebook.com/',
    description: 'Facebook URL',
    required: false,
  })
  youtube?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: 'string',
    example: 'https://www.facebook.com/',
    description: 'Facebook URL',
    required: false,
  })
  linkedin?: string;
}
