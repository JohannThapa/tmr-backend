import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { AUTH_ERRORS } from 'src/const/message/errors';
import { IAuthRefreshToken } from 'src/shared/interfaces';

export class AuthRefreshTokenDto implements IAuthRefreshToken {
  @IsString()
  @ApiProperty({
    type: 'string',
    example: 'xxx',
    required: true,
  })
  @IsNotEmpty({ message: AUTH_ERRORS.refresh_token_required })
  refreshToken: string;
}
