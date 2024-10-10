import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
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
    example: 'Hello182',
    required: true,
  })
  @IsNotEmpty({ message: AUTH_ERRORS.username_required })
  userName: string;

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

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty({ message: AUTH_ERRORS.role_required })
  @ApiProperty({
    type: [String],
    enum: EUserRole,
    example: [EUserRole.READER],
    required: false,
  })
  roles?: EUserRole[];
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
