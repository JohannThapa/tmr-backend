import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { AUTH_ERRORS } from 'src/const/message/errors';
import { RequireEmailDto } from 'src/shared/dtos';
import { ILoginPayload } from 'src/shared/interfaces';

export class AuthLoginDto extends RequireEmailDto implements ILoginPayload {
  @IsString()
  @ApiProperty({
    type: 'string',
    example: 'xxx',
    required: true,
  })
  @IsNotEmpty({ message: AUTH_ERRORS.password_required })
  password: string;
}
