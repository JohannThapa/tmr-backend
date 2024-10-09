import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService extends NestConfigService {
  constructor() {
    super();
  }

  public getSupabaseUrl(): string {
    return this.get<string>('SUPABASE_URL');
  }

  public getSupabaseKey(): string {
    return this.get<string>('SUPABASE_KEY');
  }

  public getAccessTokenSecret(): string {
    return this.get<string>('ACCESS_TOKEN_SECRET');
  }

  public getRefreshTokenSecret(): string {
    return this.get<string>('REFRESH_TOKEN_SECRET');
  }

  public getS3BucketUrl(): string {
    return this.get<string>('S3_BUCKET_URL');
  }

  public getS3AccessKey(): string {
    return this.get<string>('S3_ACCESS_KEY');
  }

  public getS3SecretKey(): string {
    return this.get<string>('S3_SECRET_KEY');
  }

  public getPostgresConnection(): string {
    return this.get<string>('POSTGRES_CONNECTION');
  }
}
