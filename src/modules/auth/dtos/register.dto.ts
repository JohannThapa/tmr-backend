import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { AUTH_ERRORS } from 'src/const/message/errors';
import { EUserRole } from 'src/shared/enums';
import {
  EmailVerificationPayload,
  IRegisterPayload,
} from 'src/shared/interfaces';

export class AuthRegisterDto implements IRegisterPayload {
  @IsString()
  @ApiProperty({
    type: 'string',
    example: 'Hari',
    required: true,
  })
  @IsNotEmpty({ message: AUTH_ERRORS.firstname_required })
  firstName: string;

  @IsString()
  @ApiProperty({
    type: 'string',
    example: 'Hari',
    required: true,
  })
  @IsNotEmpty({ message: AUTH_ERRORS.firstname_required })
  lastName: string;

  @IsString()
  @ApiProperty({
    type: 'string',
    example: 'example@gmail.com',
    required: true,
  })
  @IsNotEmpty({ message: AUTH_ERRORS.email_required })
  email: string;

  @IsString()
  @ApiProperty({
    type: 'string',
    example: 'xxx',
    required: true,
  })
  @IsNotEmpty({ message: AUTH_ERRORS.password_required })
  password: string;

  @IsString()
  @ApiProperty({
    enum: EUserRole,
    example: EUserRole.READER,
    required: false,
  })
  @IsOptional()
  role?: EUserRole;
}

export class AuthConfirmRegisterDto implements EmailVerificationPayload {
  @IsString()
  @ApiProperty({
    type: 'string',
    example: 'xxx',
    required: true,
  })
  @IsNotEmpty({ message: AUTH_ERRORS.token_required })
  token: string;
}
