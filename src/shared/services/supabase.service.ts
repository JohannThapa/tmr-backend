import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PostgrestError } from '@supabase/supabase-js';
import { SupabaseConfig } from '../../configs/services/supabase.config';

@Injectable()
export class SupabaseService {
  constructor(private readonly supabaseConfig: SupabaseConfig) {}

  private handleError(error: PostgrestError): never {
    // Custom error handling logic
    throw new InternalServerErrorException(error.message);
  }

  async query<T>(table: string, query: any): Promise<T[]> {
    const { data, error } = await this.supabaseConfig
      .getClient()
      .from(table)
      .select(query);
    if (error) this.handleError(error);
    return data as T[]; // Type assertion, assuming the data can be of type T[]
  }

  async insert<T>(table: string, data: T): Promise<T> {
    const { data: insertedData, error } = await this.supabaseConfig
      .getClient()
      .from(table)
      .insert(data);
    if (error) this.handleError(error);
    if (!insertedData) {
      throw new InternalServerErrorException(
        'Insert operation failed: no data returned',
      );
    }
    return insertedData[0];
  }
  async update<T>(table: string, data: T, id: string): Promise<T> {
    const { data: updatedData, error } = await this.supabaseConfig
      .getClient()
      .from(table)
      .update(data)
      .eq('id', id);
    if (error) this.handleError(error);
    if (!updatedData) {
      throw new InternalServerErrorException(
        'Update operation failed: no data returned',
      );
    }
    return updatedData[0];
  }
  async delete(table: string, id: string): Promise<void> {
    const { error } = await this.supabaseConfig
      .getClient()
      .from(table)
      .delete()
      .eq('id', id);
    if (error) this.handleError(error);
  }
}
