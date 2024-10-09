import { IsEmail, IsUUID } from 'class-validator';
import { IRequireEmail } from '../interfaces';
import { ApiProperty } from '@nestjs/swagger';

export class RequireEmailDto implements IRequireEmail {
  @IsEmail()
  @ApiProperty({
    type: 'string',
    example: '',
    required: false,
  })
  email: string;
}

export class RequireIdDto implements RequireIdDto {
  @IsUUID()
  @ApiProperty({
    type: 'uuid',
    example: 'uuid',
    required: true,
  })
  id: string;
}
