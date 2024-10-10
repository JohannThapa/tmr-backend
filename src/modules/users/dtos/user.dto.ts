import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { ICreateUser, ISocial, IUser } from 'src/shared/interfaces';
import { BaseEntityDto } from 'src/shared/dtos';
import {
  EAdminRole,
  ECreatorRole,
  EReaderRole,
  EUserRole,
  EUserStatus,
} from 'src/shared/enums';
import { SocialDto } from './social.dto';
import { AddressDto } from 'src/modules/address/dtos';
import { UserAddressDto } from './user-address.dto';

export class UserDto extends BaseEntityDto implements IUser {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    example: 'johndoe',
    description: 'Username of the user',
    required: true,
  })
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    example: 'John',
    description: 'User first name',
    required: true,
  })
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    example: 'Doe',
    description: 'User last name',
    required: true,
  })
  lastName: string;

  @IsEmail({}, { message: 'Email is invalid' })
  @MaxLength(50, { message: 'Email is too long' })
  @ApiProperty({
    type: 'string',
    example: 'example@gmail.com',
    required: true,
  })
  email: string;

  // @IsNotEmpty()
  // @ApiProperty({
  //   enum: EUserRole,
  //   example: EUserRole.READER,
  //   description: 'Role of the user',
  //   required: true,
  // })
  // role: EUserRole;

  @IsArray()
  @IsEnum(EUserRole, { each: true })
  @ApiProperty({
    description: 'Roles assigned to the user',
    enum: EUserRole,
    isArray: true,
  })
  roles: EUserRole[];

  @IsOptional()
  @ApiProperty({
    enum: EAdminRole,
    example: EAdminRole.ADMIN,
    description: 'Administration',
    required: false,
  })
  admin?: EAdminRole;

  @IsOptional()
  @ApiProperty({
    enum: EReaderRole,
    example: EReaderRole.STUDENT,
    description: 'Student',
    required: false,
  })
  reader?: EReaderRole;

  @IsOptional()
  @ApiProperty({
    enum: ECreatorRole,
    example: ECreatorRole.AUTHOR,
    description: 'Author',
    required: false,
  })
  creator?: ECreatorRole;

  @IsOptional()
  @ApiProperty({
    type: () => SocialDto,
    description: 'Social media profiles of the user',
  })
  social?: SocialDto;

  @IsOptional()
  @ApiProperty({
    type: () => UserAddressDto,
    description: 'Address of the user',
  })
  address?: UserAddressDto;

  @IsOptional()
  @ApiProperty({
    enum: EUserStatus,
    example: EUserStatus.ACTIVE,
    description: 'Status of the user',
    required: false,
  })
  status?: EUserStatus;

  @IsOptional()
  @ApiProperty({
    type: 'string',
    description: 'User phone number',
    required: false,
  })
  phone?: string;

  @IsOptional()
  @ApiProperty({
    type: 'string',
    description: 'User description',
    required: false,
  })
  description?: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    type: 'boolean',
    example: true,
    description: 'Indicates if the user is verified',
    required: false,
  })
  isVerified?: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    type: 'boolean',
    example: false,
    description: 'Indicates if the user is deleted',
    required: false,
  })
  deleted?: boolean;

  @IsOptional()
  @ApiProperty({
    type: 'boolean',
    required: false,
    description: 'Indicates if two-factor authentication is enabled',
  })
  twoFactorEnabled?: boolean;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: 'string',
    required: false,
    description: 'Two-factor authentication secret',
  })
  twoFactorSecret?: string;
}

export class CreateUserDto extends UserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    example: 'securePassword123',
    required: true,
    description: 'User password',
  })
  password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
