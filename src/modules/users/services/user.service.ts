import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { IUser } from 'src/shared/interfaces';
import { BaseService } from 'src/shared/services/base.service';

@Injectable()
export class UserService {
  private supabase: SupabaseClient;

  constructor(private readonly supabaseService: BaseService) {}

  async getUserById(userId: string): Promise<IUser | null> {
    const supabase = this.supabaseService.getClient();
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
    if (error) {
      throw new Error('User not found');
    }
    return data;
  }

  // async createUser(userData: Partial<IUser>): Promise<IUser | null> {
  //   const supabase = this.supabaseService.getClient();
  //   const { data, error } = await supabase.from('users').insert(userData).single();
  //   if (error) {
  //     throw new Error('Error creating user');
  //   }
  //   return data;
  // }

  // async updateUser(userId: string, userData: Partial<IUser>): Promise<IUser> {
  //   const supabase = this.supabaseService.getClient();
  //   const { data, error } = await supabase.from('users').update(userData).eq('id', userId).single();
  //   if (error) {
  //     throw new Error('Error updating user');
  //   }
  //   return data;
  // }
  // Find a user by ID in Supabase
  public async findUserById(id: string): Promise<IUser | null> {
    const { data, error } = await this.supabase
      .from('users') // Ensure the table name matches your Supabase schema
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      throw new NotFoundException('User not found');
    }

    return data;
  }

  // Find user by username
  public async findUserByUsername(username: string): Promise<IUser | null> {
    const { data, error } = await this.supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .single();

    if (error || !data) {
      throw new NotFoundException('User not found');
    }

    return data;
  }

  // Validate a user (this can be used for login)
  public async validateUser(
    username: string,
    password: string,
  ): Promise<IUser | null> {
    const { data, error } = await this.supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .single();

    if (error || !data || data.password !== password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return data;
  }
}
