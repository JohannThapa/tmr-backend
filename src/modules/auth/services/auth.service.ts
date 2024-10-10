import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SupabaseService } from 'src/shared/services/supabase.service';
import { AuthRegisterDto } from '../dtos/register.dto';
import { EUserRole } from 'src/shared/enums';
import { AuthLoginDto } from '../dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async register(dto: AuthRegisterDto) {
    const { email, password, firstName, lastName, roles } = dto;
    const userData = {
      email,
      password,
      firstName,
      lastName,
      roles: roles || [EUserRole.READER],
    };

    const insertedUser = await this.supabaseService.insert('users', userData);

    return insertedUser;
  }

  async login(dto: AuthLoginDto) {
    const { email, password } = dto;

    const result = await this.supabaseService.signInWithEmail(email, password);

    if (!result || !result.user) {
      throw new UnauthorizedException('Login failed');
    }

    return result.user;
  }

  async resetPassword(dto: any) {
    const { email } = dto;

    const data = await this.supabaseService.resetPassword(email);

    if (!data) {
      throw new UnauthorizedException('Password reset failed');
    }

    return data;
  }
}
